import { Node } from 'cc';
import type { BusController } from './BusController';
import { ColorManager } from './ColorManager';

export class BusBoardingManager {
    private _bus: BusController;

    constructor(bus: BusController) {
        this._bus = bus;
    }

    public autoDiscoverSeats(): void {
        if (this._bus.passengerSeats.length > 0) return;

        const findSittingNodes = (node: Node) => {
            for (const child of node.children) {
                const name = child.name.toLowerCase();
                if (name.includes('sit') || name.includes('passenger') || name.includes('seat') || name.includes('stickman')) {
                    if (!child.getComponent('BusStop') && !child.getComponent('BusController')) {
                        this._bus.passengerSeats.push(child);
                    }
                } else {
                    findSittingNodes(child);
                }
            }
        };
        findSittingNodes(this._bus.node);
        this._bus.passengerSeats.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
    }

    public hideAllSeats(): void {
        for (const seat of this._bus.passengerSeats) {
            if (seat) seat.active = false;
        }
    }

    /**
     * Bắt đầu quá trình đón khách.
     */
    public startBoarding(): void {
        this._bus.isBoardingPassengers = true;
        this._bus.isParked = false;
        this._bus.scheduleOnce(() => this._boardNextPassenger(), 0.1);
    }

    /**
     * Xử lý đón từng khách lên xe theo tuần tự.
     */
    private _boardNextPassenger(): void {
        if (!this._bus.node?.isValid) return;

        // Nếu xe đầy -> Kết thúc
        if (this._bus.currentPassengers >= this._bus.maxPassengers) {
            this._onBoardingComplete(true);
            return;
        }

        // Tìm trạm tương ứng
        const stop = this._bus.routeManager.currentBusStop || this._bus.busStop;
        if (!stop || stop.isEmpty()) {
            this._onBoardingComplete(false);
            return;
        }

        // Kiểm tra xem khách đầu tiên có đúng màu không
        const front = stop.peekFront();
        if (!front || front.passengerColor !== this._bus.busColor) {
            // Không có khách hoặc khách đầu tiên khác màu -> đi tìm bến khác hoặc về bãi
            this._onBoardingComplete(false);
            return;
        }

        // Cho khách lên xe
        const passenger = stop.popFront()!;
        this._bus.currentPassengers++;

        passenger.boardBus(this._bus.node.worldPosition.clone(), () => {
            this._activateSeat(this._bus.currentPassengers - 1);

            if (passenger.node?.isValid) {
                passenger.node.destroy();
            }

            // Gọi đệ quy đón khách tiếp theo sau khoảng delay
            this._bus.scheduleOnce(() => this._boardNextPassenger(), this._bus.boardingDelay);
        });
    }

    /**
     * Được gọi khi xe đã đầy hoặc trạm hết khách.
     */
    private _onBoardingComplete(isFull: boolean): void {
        this._bus.isBoardingPassengers = false;

        if (isFull || this._bus.currentPassengers >= this._bus.maxPassengers) {
            this._bus.routeManager.driveToExit();
        } else {
            const nextStopIdx = this._bus.routeManager.findNextStopIdx(this._bus.routeManager.currentStopIdx);
            if (nextStopIdx >= 0) {
                this._bus.routeManager.driveToNextStop(nextStopIdx);
            } else {
                this._bus.routeManager.driveToParking();
            }
        }
    }

    /**
     * Kích hoạt mesh nhân vật ngồi trên ghế tương ứng.
     */
    private _activateSeat(seatIdx: number): void {
        const seatNode = this._bus.passengerSeats[seatIdx];
        if (!seatNode) return;

        seatNode.active = true;

        if (ColorManager.instance) {
            ColorManager.instance.applyStickmanColor(seatNode, this._bus.busColor);
        }

        const animCtrl = seatNode.getComponent('StickmanAnimationController') ||
            seatNode.addComponent('StickmanAnimationController');
        if (animCtrl) {
            (animCtrl as any).playSit(0);
        }
    }
}

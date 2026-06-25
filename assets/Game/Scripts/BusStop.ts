import { _decorator, Component, Vec3, tween, Label } from 'cc';
import { PassengerController } from './Controller/PassengerController';
import { BusColor } from './GameEnums';
import { ColorManager } from './Controller/ColorManager';
import { PassengerSpawner } from './PassengerSpawner';

const { ccclass, property } = _decorator;

/**
 * Bến xe – nơi sinh ra hành khách, đứng nối nhau thành 1 hàng.
 * index 0 = đầu hàng (gần đường nhất).
 */
@ccclass('BusStop')
export class BusStop extends Component {

    @property({ type: [PassengerController], tooltip: 'Danh sách hành khách (kéo thả thủ công)' })
    public passengers: PassengerController[] = [];

    @property({ type: Label, tooltip: 'Text hiển thị số lượng stickman' })
    public countLabel: Label | null = null;

    @property({ tooltip: 'Khoảng cách giữa hành khách' })
    public spacing: number = 0.55;

    @property({ tooltip: 'Hướng hàng kéo dài' })
    public queueDirection: Vec3 = new Vec3(1, 0, 0);

    @property({ tooltip: 'Waypoint index tương ứng trên đường' })
    public waypointIndex: number = -1;

    @property({ tooltip: 'Vị trí xe dừng đón (world)' })
    public busStopWorldPos: Vec3 = new Vec3();

    start(): void {
        const cm = ColorManager.instance;
        this.passengers.forEach((p, i) => {
            if (!p) return;

            this._alignPassenger(p, i);

            if (cm?.randomizeColors) {
                p.passengerColor = cm.getRandomConfiguredColor();
                cm.applyStickmanColor(p.node, p.passengerColor);
            }
        });
        this._updateCountLabel();
    }

    // ─── public API ──────────────────────────────

    public addPassenger(p: PassengerController): void {
        const idx = this.passengers.length;
        this.passengers.push(p);
        p.node.setParent(this.node);
        this._alignPassenger(p, idx);
        this._updateCountLabel();
    }

    public peekFront(): PassengerController | null {
        return this.passengers[0] ?? null;
    }



    public hasPassengerColor(c: BusColor): boolean {
        return this.passengers.some(p => p.passengerColor === c);
    }

    public popFront(): PassengerController | null {
        if (!this.passengers.length) return null;

        const p = this.passengers.shift()!;
        this._slideForward();
        PassengerSpawner.instance?.onPassengerDeparted(this);
        this._updateCountLabel();

        return p;
    }

    public isEmpty(): boolean {
        return this.passengers.length === 0;
    }

    public count(): number {
        return this.passengers.length;
    }

    // ─── internal ────────────────────────────────

    private _updateCountLabel(): void {
        if (this.countLabel) {
            let total = this.passengers.length;
            if (PassengerSpawner.instance) {
                total += PassengerSpawner.instance.getRemainingCount(this);
            }
            this.countLabel.string = total.toString();
        }
    }

    private _slideForward(): void {
        this.passengers.forEach((p, i) => {
            p.playWalk();
            tween(p.node)
                .to(0.1, { position: this._getSlotLocalPosition(i) }, { easing: 'sineInOut' })
                .call(() => p.playIdle())
                .start();
        });
    }

    private _getSlotLocalPosition(index: number): Vec3 {
        return new Vec3(
            this.queueDirection.x * index * this.spacing,
            0,
            this.queueDirection.z * index * this.spacing
        );
    }

    // ─── Bus Jam helpers ─────────────────────────



    public getMatchingCount(color: BusColor): number {
        return this.passengers.filter(p => p.passengerColor === color).length;
    }

    private _alignPassenger(p: PassengerController, index: number): void {
        p.node.setPosition(this._getSlotLocalPosition(index));

        const faceDir = new Vec3(-this.queueDirection.x, 0, -this.queueDirection.z);
        if (faceDir.lengthSqr() > 0.01) {
            const angle = Math.atan2(faceDir.x, faceDir.z) * (180 / Math.PI);
            p.node.setRotationFromEuler(0, angle, 0);
        }
    }
}

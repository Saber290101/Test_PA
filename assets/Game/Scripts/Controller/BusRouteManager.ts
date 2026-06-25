import { director, Vec3 } from 'cc';
import { BusController } from './BusController';
import { BusStop } from '../BusStop';
import { GateCheck } from '../Point/GateCheck';
import { Gamecontroller } from './Gamecontroller';
import { PathBuilder } from '../PathBuilder';
import { BusState } from '../GameEnums';

/** Index bắt đầu lane trái khi quay về từ parking */
const LEFT_LANE_START_IDX = 2;

/**
 * Phụ trách logic tìm đường, quyết định bến đỗ, điểm parking, và điểm ra (Exit) của xe buýt.
 */
export class BusRouteManager {
    private _bus: BusController;

    private _gateCheck: GateCheck | null = null;
    private _stopIdx: number = -1;
    private _parkingDivertIdx: number = -1;
    private _allBusStops: BusStop[] = [];
    private _currentStopIdx: number = -1;
    private _currentBusStop: BusStop | null = null;
    constructor(bus: BusController) {
        this._bus = bus;
    }

    public get gateCheck(): GateCheck | null { return this._gateCheck; }
    public get currentStopIdx(): number { return this._currentStopIdx; }
    public get currentBusStop(): BusStop | null { return this._currentBusStop; }
    public get stopIdx(): number { return this._stopIdx; }

    /**
     * Cache lại danh sách tất cả các trạm trong scene.
     */
    public initializeStops(): void {
        this._allBusStops = director.getScene()!.getComponentsInChildren(BusStop);
    }

    public setGateCheckInfo(gateCheck: GateCheck, stopIdx: number): void {
        this._gateCheck = gateCheck;
        this._stopIdx = stopIdx;
        this._bus.setState(BusState.RUNNING);
        this._bus.setCollidersEnabled(true);
    }

    public onReachStopPoint(targetWpIdx?: number): void {
        this._bus.setState(BusState.PICKING);
        this._currentStopIdx = targetWpIdx !== undefined ? targetWpIdx : this._stopIdx;
        this._currentBusStop = this._findBusStopByWpIdx(this._currentStopIdx);
        this._bus.setLipActive(false);
        this._bus.boardingManager.startBoarding();
    }

    // ─── Drive Actions ──────────────────────────────

    public driveToExit(): void {
        this._bus.setState(BusState.EXITING);
        this._bus.setLipActive(true);

        const startIdx = this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;
        if (this._gateCheck && startIdx >= 0) {
            this._gateCheck.moveCharFromStopToExit(this._bus.node, startIdx);
        } else {
            Gamecontroller.instance.busCompleted();
            Gamecontroller.instance.checkCharCanMove();
            this._bus.node.destroy();
        }
    }

    public driveToParking(): void {
        this._bus.setState(BusState.RETURNING);
        this._bus.setCollidersEnabled(true);

        if (!this._bus.parkingManager) return;

        const slotIndex = this._bus.parkingManager.findFreeSlot();
        if (slotIndex < 0) {
            console.log("GAME LOSE: Parking is full and no more passengers can be picked up. / THUA");
            Gamecontroller.instance.endGame();
            return;
        }

        this._bus.parkingSlotIndex = slotIndex;
        this._bus.parkingManager.occupySlot(slotIndex, this._bus);
        const slotPos = this._bus.parkingManager.getSlotPosition(slotIndex);

        const fromIdx = this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;
        if (this._gateCheck && fromIdx >= 0) {
            const { points, wpIndices, divertIdx } = PathBuilder.buildPathToParking(
                this._gateCheck, this._bus.node.worldPosition, fromIdx, slotPos,
            );
            this._parkingDivertIdx = divertIdx;
            this._movePath(points, wpIndices, () => this._onParked(slotIndex));
        } else {
            this._moveTo(slotPos, () => this._onParked(slotIndex));
        }
    }

    public driveToNextStop(nextStopIdx: number): void {
        this._bus.setState(BusState.RUNNING);
        // this._bus.setLipActive(true);

        if (this._gateCheck && this._currentStopIdx >= 0) {
            const { points, wpIndices } = PathBuilder.buildWaypointPath(
                this._gateCheck, this._bus.node.worldPosition, this._currentStopIdx, nextStopIdx,
            );
            this._currentStopIdx = nextStopIdx;
            this._currentBusStop = this._findBusStopByWpIdx(nextStopIdx);
            this._movePath(points, wpIndices, () => this._onArriveAtStop());
        }
    }

    public handleDriveFromParking(): void {
        if (this._gateCheck && this._stopIdx >= 0) {
            let divertIdx = this._parkingDivertIdx;
            if (divertIdx < 0) {
                divertIdx = PathBuilder.findClosestWaypointIdx(
                    this._gateCheck, this._bus.node.worldPosition,
                );
            }

            if (divertIdx >= 0) {
                let targetStopIdx = this.findAvailableStopIdx();
                if (targetStopIdx < 0) targetStopIdx = this._stopIdx;

                const { points, wpIndices } = PathBuilder.buildPathFromParking(
                    this._gateCheck, this._bus.node.worldPosition,
                    divertIdx, targetStopIdx, LEFT_LANE_START_IDX,
                );

                this._currentStopIdx = targetStopIdx;
                this._currentBusStop = this._findBusStopByWpIdx(targetStopIdx);
                this._movePath(points, wpIndices, () => this._onArriveAtStop());
                return;
            }
        }

        // Fallback: đi thẳng đến stop node
        const stopPos = this.getStopWorldPos();
        if (stopPos) {
            this._moveTo(stopPos, () => this._onArriveAtStop());
        }
    }

    // ─── Private Query & Helpers ─────────────────────

    private _movePath(points: Vec3[], wpIndices: number[], onComplete: () => void): void {
        this._bus.pathFollower.startPath(points, this._bus.speed, wpIndices, onComplete);
    }

    private _moveTo(targetPos: Vec3, onComplete: () => void): void {
        const path = [this._bus.node.worldPosition.clone(), targetPos];
        this._bus.pathFollower.startPath(path, this._bus.speed, [-1, -1], onComplete);
    }

    private _onParked(slotIndex: number): void {
        this._bus.isParked = true;
        this._bus.setState(BusState.PARKED);
        this._bus.setRigidBodyGroup(2);
    }

    private _onArriveAtStop(): void {
        this._bus.setState(BusState.PICKING);
        this._bus.setLipActive(false);
        this._bus.boardingManager.startBoarding();
    }

    private _findBusStopByWpIdx(wpIdx: number): BusStop | null {
        return this._allBusStops.find(s => this._getStopWaypointIndex(s) === wpIdx) || this._bus.busStop;
    }

    private _getStopWaypointIndex(stop: BusStop): number {
        if (stop.waypointIndex >= 0) return stop.waypointIndex;
        if (!this._gateCheck) return -1;
        return PathBuilder.findClosestWaypointIdx(this._gateCheck, stop.node.worldPosition);
    }

    public findNextStopIdx(currentIdx: number): number {
        if (!this._gateCheck) return -1;

        let bestIdx = -1;
        let minWp = Infinity;

        for (const stop of this._allBusStops) {
            const wpIdx = this._getStopWaypointIndex(stop);
            if (wpIdx > currentIdx && wpIdx < minWp && stop.hasPassengerColor(this._bus.busColor)) {
                minWp = wpIdx;
                bestIdx = wpIdx;
            }
        }
        return bestIdx;
    }

    public findAvailableStopIdx(): number {
        if (!this._gateCheck) return -1;

        let bestIdx = -1;
        let minWp = Infinity;

        for (const stop of this._allBusStops) {
            const wpIdx = this._getStopWaypointIndex(stop);
            if (wpIdx >= 0 && wpIdx < minWp &&
                stop.hasPassengerColor(this._bus.busColor) &&
                !this._isStopOccupied(wpIdx)) {
                minWp = wpIdx;
                bestIdx = wpIdx;
            }
        }

        return bestIdx >= 0 ? bestIdx : this.findNextStopIdx(-1);
    }

    private _isStopOccupied(stopWpIdx: number): boolean {
        const scene = director.getScene();
        if (!scene) return false;

        for (const other of scene.getComponentsInChildren(BusController)) {
            if (other === this._bus) continue;

            if (other.state === BusState.PICKING) {
                const idx = other.routeManager.currentStopIdx >= 0 ? other.routeManager.currentStopIdx : other.routeManager.stopIdx;
                if (idx === stopWpIdx) return true;
            }

            if (other.state === BusState.RUNNING || other.state === BusState.ENTERING) {
                if (other.routeManager.getTargetStopWaypointIndex() === stopWpIdx) return true;
            }
        }
        return false;
    }

    public getTargetStopWaypointIndex(): number {
        switch (this._bus.state) {
            case BusState.PICKING:
            case BusState.RUNNING:
            case BusState.ENTERING:
                return this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;
            case BusState.PARKED:
                if (this._bus.isParked) {
                    const idx = this.findNextStopIdx(-1);
                    return idx >= 0 ? idx : this._stopIdx;
                }
                return this._stopIdx;
            default:
                return -1;
        }
    }

    public getStopWorldPos(): Vec3 | null {
        if (this._bus.stopNode) return this._bus.stopNode.worldPosition.clone();
        if (this._bus.busStop) {
            return this._bus.busStop.busStopWorldPos.lengthSqr() > 0.01
                ? this._bus.busStop.busStopWorldPos.clone()
                : this._bus.busStop.node.worldPosition.clone();
        }
        return null;
    }
}

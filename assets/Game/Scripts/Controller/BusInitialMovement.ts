import { easing, Node, tween, Vec3 } from 'cc';
import type { BusController } from './BusController';
import { Gamecontroller } from './Gamecontroller';
import { RaycastUtils } from '../Movement/RaycastUtils';
import { GateCheck } from '../Point/GateCheck';

/** Cường độ rung khi va chạm */
const SHAKE_INTENSITY = 0.15;

/**
 * Phụ trách logic di chuyển ban đầu (chạy thẳng theo raycast)
 * và xử lý va chạm cơ bản (shake effect).
 */
export class BusInitialMovement {
    private _bus: BusController;

    private _isMoving: boolean = false;
    private _moveDir: Vec3 = new Vec3();
    private _startPos: Vec3 = new Vec3();
    private _targetDist: number = 0;
    private _distMoved: number = 0;
    private _nodeClosest: Node | null = null;
    private _isHitGate: boolean = false;
    private _gateCheck: GateCheck | null = null;

    constructor(bus: BusController) {
        this._bus = bus;
    }

    public get isMoving(): boolean {
        return this._isMoving;
    }

    public startMove(): void {
        this._isMoving = true;
        this._distMoved = 0;
        this._isHitGate = false;
        this._gateCheck = null;
        this._nodeClosest = null;

        const { result, direction, origin } = RaycastUtils.sweepScan(this._bus.startNode, this._bus.node);
        this._moveDir.set(direction);
        this._startPos = this._bus.node.worldPosition.clone();

        if (!result) {
            // Không đâm gì → xe bay ra khỏi map
            this._bus.setRigidBodyGroup(16);
            this._targetDist = RaycastUtils.MAX_SCAN_DISTANCE;
            this._bus.viewportChecker.startChecking();
        } else {
            const gateCheck = result.collider.node.getComponent(GateCheck);
            const otherBus = result.collider.node.getComponent('BusController') as any;

            if (otherBus) {
                // Đâm xe khác
                this._nodeClosest = result.collider.node;
                const safeDist = Math.max(0, result.distance - this._bus.safeDistance);
                this._targetDist = safeDist + this._bus.crashOffset;
            } else if (gateCheck) {
                // Đâm gate → delegate cho GateCheck sau khi đến
                this._isHitGate = true;
                this._gateCheck = gateCheck;
                this._bus.setRigidBodyGroup(16);
                this._targetDist = result.distance;
            } else {
                // Đâm obstacle → destroy sau khi đến
                this._nodeClosest = result.collider.node;
                this._bus.setCollidersEnabled(false);
                const safeDist = Math.max(0, result.distance - this._bus.safeDistance);
                this._targetDist = safeDist + this._bus.crashOffset;

                this._bus.scheduleOnce(() => {
                    Gamecontroller.instance.checkCharCanMove();
                    this._bus.node.destroy();
                }, result.distance / this._bus.moveSpeed);
            }
        }

        Gamecontroller.instance.checkCharCanMove();
    }

    private _cachedMoveVec = new Vec3();
    private _cachedPos = new Vec3();

    public update(dt: number): void {
        if (!this._isMoving) return;

        const remaining = this._targetDist - this._distMoved;
        const moveAmount = Math.min(this._bus.moveSpeed * dt, remaining);

        Vec3.multiplyScalar(this._cachedMoveVec, this._moveDir, moveAmount);
        this._cachedPos.set(this._bus.node.worldPosition);
        this._cachedPos.add(this._cachedMoveVec);
        this._bus.node.setWorldPosition(this._cachedPos);
        this._distMoved += moveAmount;

        if (this._distMoved >= this._targetDist) {
            this._isMoving = false;
            this._onReachInitialTarget();
        }
    }

    private _onReachInitialTarget(): void {
        if (this._isHitGate && this._gateCheck) {
            this._bus.setLipActive(false);
            if (!this._bus.isOneWay) {
                this._gateCheck.moveCharTotarget(this._bus.node);
            } else {
                this._gateCheck.moveWithOneWay(this._bus.node);
            }
        } else {
            // Va chạm xe khác hoặc obstacle → lùi về vị trí ban đầu bằng Tween
            Gamecontroller.instance.checkCharCanMove();

            tween(this._bus.node)
                .to(0.15, { worldPosition: this._startPos }, { easing: easing.quadOut })
                .start();

            if (this._nodeClosest) {
                this._shakeOnImpact(this._nodeClosest, this._moveDir);
            }
        }
    }

    private _shakeOnImpact(targetNode: Node, impactDirection: Vec3): void {
        if (!targetNode?.isValid) return;

        const origin = targetNode.worldPosition.clone();
        const dir = impactDirection.clone();
        dir.y = 0;
        dir.normalize();

        const offsets = [1, -0.6, 0.3, -0.15, 0];
        const durations = [0.05, 0.05, 0.04, 0.04, 0.03];

        let t = tween(targetNode);
        for (let i = 0; i < offsets.length; i++) {
            const pos = origin.clone().add(dir.clone().multiplyScalar(SHAKE_INTENSITY * offsets[i]));
            t = t.to(durations[i], { worldPosition: pos }, { easing: easing.quadOut });
        }
        t.start();
    }
}

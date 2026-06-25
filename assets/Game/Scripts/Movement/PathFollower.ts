import { _decorator, Component, Vec3, Tween, director, Collider } from 'cc';
import type { BusController } from '../Controller/BusController';
import { BusState } from '../GameEnums';

const { ccclass, property } = _decorator;

/**
 * PathFollower – Component điều khiển di chuyển theo path.
 *
 * Nhiệm vụ chính:
 * - Di chuyển tịnh tiến theo danh sách Vec3
 * - Collision detection (isPathBlocked)
 * - Xoay mặt theo hướng di chuyển
 *
 * Gắn cùng node với BusController.
 */
@ccclass('PathFollower')
export class PathFollower extends Component {

    // ─── Path State ─────────────────────────────

    private _path: Vec3[] = [];
    private _wpIndices: number[] = [];
    private _pathIdx: number = -1;
    private _speed: number = 10;
    private _onComplete: (() => void) | null = null;

    // ─── Cached Vec3 (tránh GC mỗi frame) ───────

    private _cachedDir = new Vec3();
    private _cachedEuler = new Vec3();
    private _cachedMoveVec = new Vec3();
    private _cachedSnapPos = new Vec3();

    /**
     * Callback được gọi mỗi khi xe đến một waypoint trên path.
     * Truyền vào pathIdx và wpIdx (chỉ số waypoint gốc trong GateCheck).
     */
    public onReachWaypoint: ((pathIdx: number, wpIdx: number) => void) | null = null;

    /** Đang di chuyển? */
    public get isMoving(): boolean {
        return this._path.length > 0 && this._pathIdx >= 0 && this._pathIdx < this._path.length;
    }

    /** Mảng chỉ số waypoint gốc */
    public get wpIndices(): number[] { return this._wpIndices; }

    /**
     * Bắt đầu di chuyển theo path.
     */
    public startPath(path: Vec3[], speed: number, wpIndices: number[], onComplete: () => void): void {
        Tween.stopAllByTarget(this.node);
        this._path = path;
        this._wpIndices = wpIndices;
        this._pathIdx = 0;
        this._speed = speed;
        this._onComplete = onComplete;

        if (path.length > 0) {
            this._rotateTowardsInstant(path[0]);
        }
    }

    /**
     * Dừng path hiện tại (không gọi onComplete).
     */
    public stopPath(): void {
        this._path = [];
        this._pathIdx = -1;
        this._onComplete = null;
    }

    // ─── Update Loop ────────────────────────────

    private _tempStopDuration: number = 0;

    /** Tạm dừng di chuyển trong thời gian nhất định và tắt tạm thời collider */
    public tempStop(duration: number): void {
        this._tempStopDuration = duration;

        const busCtrl = this.node.getComponent('BusController') as any;
        if (busCtrl && typeof busCtrl.setCollidersEnabled === 'function') {
            busCtrl.setCollidersEnabled(false);

            this.unschedule(this._reEnableColliders);
            this.scheduleOnce(this._reEnableColliders, duration);
        }
    }

    private _reEnableColliders(): void {
        const busCtrl = this.node.getComponent('BusController') as any;
        if (busCtrl && typeof busCtrl.setCollidersEnabled === 'function') {
            if (this.isMoving) {
                busCtrl.setCollidersEnabled(true);
            }
        }
    }

    update(dt: number): void {
        if (this._tempStopDuration > 0) {
            this._tempStopDuration -= dt;
            return;
        }

        if (!this.isMoving) return;

        let remainingMove = this._speed * dt;

        while (remainingMove > 0 && this.isMoving) {
            if (this._isPathBlocked()) return;

            const targetPos = this._path[this._pathIdx];
            const currentPos = this.node.worldPosition;

            Vec3.subtract(this._cachedDir, targetPos, currentPos);
            this._cachedDir.y = 0;

            const distance = this._cachedDir.length();

            if (distance <= remainingMove) {
                this._cachedSnapPos.set(targetPos);
                this._cachedSnapPos.y = currentPos.y;
                this.node.setWorldPosition(this._cachedSnapPos);
                remainingMove -= distance;

                const wpIdx = this._wpIndices[this._pathIdx];
                if (this.onReachWaypoint) {
                    this.onReachWaypoint(this._pathIdx, wpIdx);
                }

                this._pathIdx++;
                if (this._pathIdx >= this._path.length) {
                    this._path = [];
                    const cb = this._onComplete;
                    this._onComplete = null;
                    if (cb) cb();
                    return;
                }
            } else {
                this._cachedDir.normalize();
                const targetAngle = Math.atan2(this._cachedDir.x, this._cachedDir.z) * 180 / Math.PI;
                this.node.worldRotation.getEulerAngles(this._cachedEuler);

                let deltaAngle = targetAngle - this._cachedEuler.y;
                if (deltaAngle > 180) deltaAngle -= 360;
                if (deltaAngle < -180) deltaAngle += 360;

                const turnRatio = 25 * dt;
                const newY = this._cachedEuler.y + deltaAngle * Math.min(turnRatio, 1.0);
                this.node.setRotationFromEuler(this._cachedEuler.x, newY, this._cachedEuler.z);

                Vec3.multiplyScalar(this._cachedMoveVec, this._cachedDir, remainingMove);
                this._cachedSnapPos.set(currentPos);
                this._cachedSnapPos.add(this._cachedMoveVec);
                this.node.setWorldPosition(this._cachedSnapPos);
                remainingMove = 0;
            }
        }
    }

    // ─── Collision Detection ────────────────────

    private _cachedBuses: BusController[] | null = null;
    private _busCacheTime: number = 0;

    private _isPathBlocked(): boolean {
        const scene = director.getScene();
        if (!scene) return false;

        // Cache danh sách xe mỗi 0.2s thay vì quét scene graph mỗi frame
        this._busCacheTime -= 0.016;
        if (this._busCacheTime <= 0 || !this._cachedBuses) {
            this._cachedBuses = scene.getComponentsInChildren('BusController') as any;
            this._busCacheTime = 0.2;
        }

        const myPos = this.node.worldPosition;
        if (!this.isMoving) return false;

        const myBus = this.node.getComponent('BusController') as any;
        const safeDist = myBus ? myBus.safeDistance : 1.5;
        const myHalfLen = safeDist / 2;
        const pFront = this.getPointAhead(myHalfLen + 0.1);
        const safeRadius = 0.35;

        for (const other of this._cachedBuses) {
            if (!other?.node?.isValid) continue;
            if (other.node === this.node) continue;
            if (other.state === BusState.PARKED && other.parkingSlotIndex < 0) continue;
            if (other.isParked) continue;

            const otherPathFollower = other.node.getComponent(PathFollower);
            if (!otherPathFollower) continue;

            const otherPos = other.node.worldPosition;
            const otherEuler = new Vec3();
            other.node.worldRotation.getEulerAngles(otherEuler);

            const otherHalfLen = other.safeDistance / 2;
            const distFrontToOther = this._distToBusBody(pFront, otherPos, otherEuler.y, otherHalfLen);

            if (distFrontToOther < safeRadius) {
                if (otherPathFollower.isMoving) {
                    const opFront = otherPathFollower.getPointAhead(otherHalfLen + 0.1);
                    const myEuler = new Vec3();
                    this.node.worldRotation.getEulerAngles(myEuler);

                    const otherFrontToMe = this._distToBusBody(opFront, myPos, myEuler.y, myHalfLen);

                    if (otherFrontToMe < safeRadius) {
                        if (this.node.uuid > other.node.uuid) {
                            return true;
                        } else {
                            continue;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }

    // ─── Advanced Geometry Helpers ────────────────────────

    /** Lấy một điểm dự đoán trên quỹ đạo di chuyển uốn cong */
    public getPointAhead(lookAhead: number): Vec3 {
        let traveled = 0;
        let currentPoint = this.node.worldPosition.clone();

        if (!this._path || this._pathIdx < 0 || this._pathIdx >= this._path.length) {
            const forward = new Vec3();
            const euler = new Vec3();
            this.node.worldRotation.getEulerAngles(euler);
            const rad = euler.y * Math.PI / 180;
            forward.set(Math.sin(rad), 0, Math.cos(rad));
            return currentPoint.add(forward.multiplyScalar(lookAhead));
        }

        for (let i = this._pathIdx; i < this._path.length; i++) {
            const nextPoint = this._path[i];
            const segmentVec = new Vec3();
            Vec3.subtract(segmentVec, nextPoint, currentPoint);
            segmentVec.y = 0;
            const segmentLen = segmentVec.length();

            if (segmentLen === 0) continue;

            if (traveled + segmentLen >= lookAhead) {
                const remaining = lookAhead - traveled;
                segmentVec.normalize();
                segmentVec.multiplyScalar(remaining);
                currentPoint.add(segmentVec);
                return currentPoint;
            } else {
                traveled += segmentLen;
                currentPoint = nextPoint.clone();
            }
        }

        return currentPoint;
    }

    /** Tính khoảng cách từ 1 điểm đến khung thân xe (Line Segment) dựa trên halfLength thực tế */
    private _distToBusBody(point: Vec3, busPos: Vec3, busRotY: number, halfLen: number): number {
        const rad = busRotY * Math.PI / 180;
        const fwd = new Vec3(Math.sin(rad), 0, Math.cos(rad));

        const a = new Vec3();
        const b = new Vec3();

        // Thu gọn segment 1 chút (0.1m) ở hai đầu để tính toán capsule mượt mà hơn
        const segmentHalf = Math.max(0.1, halfLen - 0.1);

        Vec3.subtract(a, busPos, fwd.clone().multiplyScalar(segmentHalf));
        Vec3.add(b, busPos, fwd.clone().multiplyScalar(segmentHalf));

        const ab = new Vec3();
        Vec3.subtract(ab, b, a);
        const ap = new Vec3();
        Vec3.subtract(ap, point, a);

        const lenSqr = ab.lengthSqr();
        if (lenSqr === 0) return Vec3.distance(point, a);

        let t = Vec3.dot(ap, ab) / lenSqr;
        t = Math.max(0, Math.min(1, t));

        const closest = new Vec3();
        ab.multiplyScalar(t);
        Vec3.add(closest, a, ab);

        return Vec3.distance(point, closest);
    }

    private _rotateTowardsInstant(targetPos: Vec3): void {
        const dir = new Vec3();
        Vec3.subtract(dir, targetPos, this.node.worldPosition);
        dir.y = 0;
        if (dir.lengthSqr() > 0.01) {
            const targetAngle = Math.atan2(dir.x, dir.z) * 180 / Math.PI;
            const currentEuler = new Vec3();
            this.node.worldRotation.getEulerAngles(currentEuler);
            this.node.setRotationFromEuler(currentEuler.x, targetAngle, currentEuler.z);
        }
    }

    // ─── Lifecycle / Collision ──────────────────

    onLoad(): void {
        const colliders = this.node.getComponents(Collider);
        for (const c of colliders) {
            c.on('onCollisionEnter', this._onCollisionEnter, this);
        }
        const childColliders = this.node.getComponentsInChildren(Collider);
        for (const c of childColliders) {
            if (c.node !== this.node) {
                c.on('onCollisionEnter', this._onCollisionEnter, this);
            }
        }
    }

    private _onCollisionEnter(event: any): void {
        const otherCollider = event.otherCollider;
        if (!otherCollider) return;

        const otherNode = otherCollider.node;
        const otherBus = otherNode.getComponent('BusController') || otherNode.getComponentInParent('BusController');
        if (!otherBus) return;

        const otherPathFollower = otherBus.node.getComponent(PathFollower);
        if (!this.isMoving || !otherPathFollower || !otherPathFollower.isMoving) return;

        const myPos = this.node.worldPosition;
        const otherPos = otherBus.node.worldPosition;
        const distBetween = Vec3.distance(myPos, otherPos);

        console.log(`[Collision] Va chạm vật lý giữa 2 xe: ${this.node.name} và ${otherBus.node.name}. Khoảng cách: ${distBetween.toFixed(2)}m`);

        // Bỏ qua logic so sánh distanceToDestination vì nó gây lỗi khi xe có điểm đến khác nhau.
        // Dùng UUID để làm tie-breaker dứt khoát tránh deadlock hai xe chờ nhau
        if (this.node.uuid > otherBus.node.uuid) {
            console.log(`[Collision] UUID lớn hơn -> Xe ${this.node.name} chủ động nhường đường (dừng 0.2s).`);
            this.tempStop(0.2);
        }
    }
}

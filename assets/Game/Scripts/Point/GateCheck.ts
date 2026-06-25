import { _decorator, Component, easing, Node, tween, Vec3 } from 'cc';
import { Gamecontroller } from '../Controller/Gamecontroller';
import type { BusController } from '../Controller/BusController';
import { PathBuilder } from '../Movement/PathBuilder';

const { ccclass, property } = _decorator;

@ccclass('GateCheck')
export class GateCheck extends Component {
    @property(Node)
    endPos: Node = null;

    @property
    speed: number = 10;

    @property([Node])
    wayPoints: Node[] = [];

    /**
     * Xe vào gate → build path đến stop (nếu là bus) hoặc đi hết waypoints → destroy.
     */
    moveCharTotarget(char: Node): void {
        const busCtrl = char.getComponent('BusController') as any;
        const stopIdx = busCtrl ? this._resolveStopIdx(busCtrl) : -1;

        const lastIdx = (busCtrl && stopIdx >= 0) ? stopIdx : this.wayPoints.length - 1;
        const { points, wpIndices } = PathBuilder.buildEntryPath(this, char.worldPosition, lastIdx);

        if (busCtrl && stopIdx >= 0) {
            busCtrl.setGateCheckInfo(this, stopIdx);
            busCtrl.startMovingAlongPath(points, this.speed, wpIndices, () => {
                busCtrl.onReachStopPoint();
            });
        } else {
            this._tweenAlongPath(char, points, () => {
                const bc = char.getComponent('BusController') as any;
                if (bc) {
                    Gamecontroller.instance.busCompleted();
                }
                bc?.checkAndDestroyIfOutOfViewport();
                char.destroy();
                Gamecontroller.instance.checkCharCanMove();
            });
        }
    }

    /**
     * Xe one-way → nếu bus thì delegate sang moveCharTotarget, nếu không thì đi thẳng.
     */
    moveWithOneWay(char: Node): void {
        if (char.getComponent('BusController')) {
            this.moveCharTotarget(char);
            return;
        }

        const dis = Vec3.distance(char.worldPosition, this.endPos.worldPosition);
        const moveTime = dis / this.speed;
        tween(char)
            .to(moveTime, { worldPosition: this.endPos.worldPosition }, { easing: 'linear' })
            .call(() => {
                const bc = char.getComponent('BusController') as any;
                bc?.checkAndDestroyIfOutOfViewport();
                char.active = false;
            })
            .start();
    }

    /**
     * Xe từ stop → exit (đi hết waypoints còn lại + endPos → destroy).
     */
    moveCharFromStopToExit(char: Node, stopIdx: number): void {
        const { points, wpIndices } = PathBuilder.buildPathToExit(
            this, char.worldPosition, stopIdx, this.endPos,
        );

        const busCtrl = char.getComponent('BusController') as any;
        if (busCtrl) {
            busCtrl.startMovingAlongPath(points, this.speed, wpIndices, () => {
                busCtrl.checkAndDestroyIfOutOfViewport();
                Gamecontroller.instance.busCompleted();
                char.destroy();
                Gamecontroller.instance.checkCharCanMove();
            });
        } else {
            this._tweenAlongPath(char, points, () => {
                char.destroy();
                Gamecontroller.instance.checkCharCanMove();
            });
        }
    }

    // ─── Private ────────────────────────────────

    private _resolveStopIdx(busCtrl: BusController): number {
        const stopPos = busCtrl.stopNode
            ? busCtrl.stopNode.worldPosition.clone()
            : (busCtrl.busStop
                ? (busCtrl.busStop.busStopWorldPos.lengthSqr() > 0.01
                    ? busCtrl.busStop.busStopWorldPos.clone()
                    : busCtrl.busStop.node.worldPosition.clone())
                : null);

        if (!stopPos) return -1;
        return PathBuilder.findClosestWaypointIdx(this, stopPos);
    }

    /**
     * Tween non-bus chars along path (rotation + linear movement).
     */
    private _tweenAlongPath(char: Node, points: Vec3[], onComplete: () => void): void {
        let moveTween = tween(char);

        for (let i = 0; i < points.length - 1; i++) {
            const startPos = points[i];
            const endPos = points[i + 1];
            const distance = Vec3.distance(startPos, endPos);
            const moveTime = distance / this.speed;

            moveTween
                .call(() => {
                    const dir = new Vec3();
                    Vec3.subtract(dir, endPos, char.worldPosition);
                    dir.y = 0;
                    if (dir.lengthSqr() > 0.01) {
                        const targetAngle = Math.atan2(dir.x, dir.z) * 180 / Math.PI;
                        const currentEuler = new Vec3();
                        char.worldRotation.getEulerAngles(currentEuler);
                        let deltaAngle = targetAngle - currentEuler.y;
                        if (deltaAngle > 180) deltaAngle -= 360;
                        if (deltaAngle < -180) deltaAngle += 360;
                        tween(char)
                            .by(0.1, { eulerAngles: new Vec3(0, deltaAngle, 0) }, { easing: easing.quadOut })
                            .start();
                    }
                })
                .to(moveTime, { worldPosition: endPos }, { easing: 'linear' });
        }

        moveTween.call(onComplete).start();
    }
}

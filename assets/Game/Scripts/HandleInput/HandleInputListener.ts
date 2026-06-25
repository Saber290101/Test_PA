import { _decorator, Camera, Component, EventTouch, geometry, Input, input, Node, ParticleSystem, PhysicsSystem, tween, Tween, Vec2, Vec3 } from 'cc';
import { Gamecontroller } from '../Controller/Gamecontroller';
const { ccclass, property } = _decorator;

@ccclass('HandleInputListener')
export class HandleInputListener extends Component {

    @property(Camera)
    readonly cameraCom!: Camera;
    private _ray: geometry.Ray = new geometry.Ray();

    private _lastTouchPosition: Vec2 = new Vec2();
    private _isDragging: boolean = false;
    public _targetCameraPosition: Vec3 = new Vec3();

    @property(Node)
    effectTouch: Node = null;
    @property(ParticleSystem)
    listParticle: ParticleSystem[] = [];

    onEnable() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        this.showEffectAtTouchPosition(event.touch!);
        this.playParticle();
        const touch = event.touch!;
        this._isDragging = true;
        this._lastTouchPosition.set(touch.getLocationX(), touch.getLocationY());
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
    }

    onTouchEnd(event: EventTouch) {
        Gamecontroller.instance.startCountTime = true;
        const touch = event.touch!;
        if (this._isDragging == false) return;
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        const mask = (1 << 1);
        if (PhysicsSystem.instance.raycastClosest(this._ray, mask)) {
            const result = PhysicsSystem.instance.raycastClosestResult;
            const nodeOther = result.collider.node;
            const item = nodeOther.getComponent('BusController') as any;
            if (item) {
                Gamecontroller.instance.increaseMove();
                item.onClick();
            }
        }

        this._isDragging = false;
    }

    playParticle() {
        this.listParticle.forEach(particle => {
            particle.clear();
            particle.play();
        });

        Tween.stopAllByTarget(this.node);
        tween(this.node)
            .delay(0.3)
            .call(() => {
                this.listParticle.forEach(particle => {
                    particle.stop();
                    particle.clear();
                });
            })
            .start()
    }

    showEffectAtTouchPosition(touch: any) {
        if (!this.effectTouch) return;

        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        const distance = -this._ray.o.y / this._ray.d.y;
        const worldPos = new Vec3();
        Vec3.scaleAndAdd(worldPos, this._ray.o, this._ray.d, distance);
        worldPos.y = 2;
        this.effectTouch.setWorldPosition(worldPos);
        this.effectTouch.active = true;
        Tween.stopAllByTarget(this.effectTouch);
        tween(this.effectTouch)
            .delay(0.3)
            .call(() => {
                this.effectTouch.active = false;
            })
            .start();
    }

    showWin() {
        this.node.active = false;
    }
}

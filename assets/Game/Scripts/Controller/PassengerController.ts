import { _decorator, Component, Node, Vec3, tween, Color, MeshRenderer, SkeletalAnimation, Enum } from 'cc';
import { BusColor, COLOR_RGB } from '../GameEnums';
import { ColorManager } from './ColorManager';
import { StickmanAnimationController } from '../StickmanAnimationController';

const { ccclass, property } = _decorator;

Enum(BusColor);

/**
 * Hành khách - mỗi người chỉ có một màu.
 * Chỉ lên xe khi: (1) đứng đầu hàng, (2) xe trùng màu, (3) xe chưa hết chỗ.
 */
@ccclass('PassengerController')
export class PassengerController extends Component {

    /** Màu hành khách */
    @property({ type: Enum(BusColor), tooltip: 'Màu hành khách' })
    public passengerColor: BusColor = BusColor.RED;

    /** Đã lên xe chưa */
    public isBoarded: boolean = false;

    private _animCtrl: StickmanAnimationController | null = null;

    onLoad(): void {
        this._animCtrl = this.getComponent(StickmanAnimationController) || this.addComponent(StickmanAnimationController);
        this.playIdle();

        if (ColorManager.instance) {
            ColorManager.instance.applyStickmanColor(this.node, this.passengerColor);
        } else {
            this.applyColor();
        }
    }

    /** Khởi tạo hành khách với màu */
    public init(color: BusColor): void {
        this.passengerColor = color;
        if (ColorManager.instance) {
            ColorManager.instance.applyStickmanColor(this.node, this.passengerColor);
        } else {
            this.applyColor();
        }
    }

    /** Gán màu lên toàn bộ MeshRenderer con (stickman.effect shader) */
    public applyColor(): void {
        const cd = COLOR_RGB[this.passengerColor];
        if (!cd) return;

        const bodyColor = new Color(cd.r, cd.g, cd.b, 255);
        const outlineColor = new Color(
            Math.max(0, cd.r - 80),
            Math.max(0, cd.g - 80),
            Math.max(0, cd.b - 80),
            255,
        );

        const renderers = this.node.getComponentsInChildren(MeshRenderer);
        for (const mr of renderers) {
            const passCount = mr.sharedMaterials.length;

            // Pass 0: body (mainColor)
            const mat0 = mr.getMaterialInstance(0);
            if (mat0) {
                try { mat0.setProperty('mainColor', bodyColor); } catch (_) { }
            }

            // Pass 3: outline (baseColor) – stickman.effect có 4 passes
            if (passCount >= 4) {
                const mat3 = mr.getMaterialInstance(3);
                if (mat3) {
                    try { mat3.setProperty('baseColor', outlineColor); } catch (_) { }
                }
            }
        }
    }

    // ─── Animation Helpers ──────────────────────────

    public playIdle(fadeTime?: number): void {
        if (this._animCtrl) {
            this._animCtrl.playIdle(fadeTime);
        }
    }

    public playWalk(fadeTime?: number): void {
        if (this._animCtrl) {
            this._animCtrl.playWalk(fadeTime);
        }
    }

    public playSit(fadeTime?: number): void {
        if (this._animCtrl) {
            this._animCtrl.playSit(fadeTime);
        }
    }

    /**
     * Animation hành khách đi lên xe rồi biến mất.
     * @param targetWorldPos vị trí xe (world)
     * @param callback gọi sau khi xong
     */
    public boardBus(targetWorldPos: Vec3, callback?: () => void): void {
        this.isBoarded = true;
        const target = targetWorldPos.clone();

        this.playWalk(0);

        // Xoay mặt về phía xe buýt
        const dir = new Vec3();
        Vec3.subtract(dir, target, this.node.worldPosition);
        dir.y = 0;
        if (dir.lengthSqr() > 0.01) {
            const angle = Math.atan2(dir.x, dir.z) * (180 / Math.PI);
            this.node.setRotationFromEuler(0, angle, 0);
        }

        tween(this.node)
            .to(0.1, { worldPosition: target }, { easing: 'sineOut' })
            .call(() => {
                this.node.active = false;
                callback?.();
            })
            .start();
    }
}

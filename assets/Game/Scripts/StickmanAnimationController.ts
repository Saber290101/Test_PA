import { _decorator, Component, SkeletalAnimation } from 'cc';

const { ccclass, property } = _decorator;

/**
 * StickmanAnimationController – Quản lý animation cho Stickman.
 * Hỗ trợ chuyển đổi mượt mà (crossFade) giữa các trạng thái Idle, Walk, Sit.
 */
@ccclass('StickmanAnimationController')
export class StickmanAnimationController extends Component {

    private _anim: SkeletalAnimation | null = null;
    private _currentClip: string = '';

    onLoad(): void {
        this._anim = this.getComponent(SkeletalAnimation) || this.getComponentInChildren(SkeletalAnimation);
        if (!this._anim) {
            console.warn(`[StickmanAnim] ⚠️ SkeletalAnimation component not found on ${this.node.name} or its children!`);
        }
    }

    start(): void {
        this.playIdle(0);
    }

    /**
     * Chạy animation Idle
     * @param fadeTime Thời gian chuyển tiếp mượt (giây)
     */
    public playIdle(fadeTime: number = 0.25): void {
        this.playAnimation('Idle', fadeTime);
    }

    /**
     * Chạy animation Walk
     * @param fadeTime Thời gian chuyển tiếp mượt (giây)
     */
    public playWalk(fadeTime: number = 0.2): void {
        this.playAnimation('Walk', fadeTime);
    }

    /**
     * Chạy animation Sit
     * @param fadeTime Thời gian chuyển tiếp mượt (giây)
     */
    public playSit(fadeTime: number = 0.25): void {
        this.playAnimation('Sit', fadeTime);
    }

    /**
     * Phát một animation bất kỳ bằng tên với hiệu ứng chuyển tiếp mượt (crossFade)
     * @param name Tên clip animation
     * @param fadeTime Thời gian chuyển tiếp mượt (giây)
     */
    public playAnimation(name: string, fadeTime: number = 0.2): void {
        if (!this._anim) return;

        // Bỏ qua nếu clip đó đang được chạy rồi
        if (this._currentClip === name) {
            const state = this._anim.getState(name);
            if (state && state.isPlaying) {
                return;
            }
        }

        const state = this._anim.getState(name);
        if (state) {
            this._currentClip = name;
            // Dùng crossFade để chuyển tiếp mượt mà giữa các animation
            this._anim.crossFade(name, fadeTime);
        } else {
            // Fallback nếu không hỗ trợ crossFade cho clip này
            this._currentClip = name;
            this._anim.play(name);
        }
    }
}

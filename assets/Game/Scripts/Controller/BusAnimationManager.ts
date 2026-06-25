import { _decorator, Node, Tween, tween, Vec3 } from 'cc';
import { BusState } from '../GameEnums';
import { BusController } from './BusController';

/**
 * Quản lý các hiệu ứng animation (nhún, lắc lư) của xe buýt.
 * Đã được tối ưu để tránh khởi động lại tween không cần thiết và tránh lỗi khóa trục quay Y.
 */
export class BusAnimationManager {
    private _bus: BusController;
    private _visualNode: Node | null = null;
    
    private _animTween: Tween<Node> | null = null;
    private _wobbleTween: Tween<Node> | null = null;

    private _originalScale: Vec3 = new Vec3(1, 1, 1);
    private _originalEuler: Vec3 = new Vec3();

    // Trạng thái hiện tại để tránh restart animation liên tục gây giật lag
    private _currentState: BusState | null = null;

    constructor(bus: BusController) {
        this._bus = bus;
    }

    public initialize(): void {
        // Ưu tiên tìm node con chứa model thực sự để tween (tránh làm lệch collider/hướng của node gốc)
        this._visualNode = this._bus.node.getChildByName("Visual") || 
                           this._bus.node.getChildByName("Model") || 
                           this._bus.node.children[0] || 
                           null;

        if (this._visualNode) {
            this._originalScale.set(this._visualNode.scale);
            this._originalEuler.set(this._visualNode.eulerAngles);
        }
    }

    public updateState(state: BusState): void {
        // Tối ưu 1: Nếu trạng thái không thay đổi, bỏ qua để tránh việc reset animation liên tục
        if (this._currentState === state) return;
        this._currentState = state;

        const target = this._visualNode || this._bus.node;

        this._stopCurrentAnimations();
        this._resetToOriginalTransform(target);

        // Phân loại animation theo state
        const isIdle = (state === BusState.PARKED || state === BusState.PICKING);
        const isMoving = (state === BusState.RUNNING || state === BusState.ENTERING || state === BusState.EXITING || state === BusState.RETURNING);

        if (isIdle) {
            this._playIdleAnimation(target);
        } else if (isMoving) {
            this._playMoveAnimation(target);
        }
    }

    private _stopCurrentAnimations(): void {
        if (this._animTween) {
            this._animTween.stop();
            this._animTween = null;
        }
        if (this._wobbleTween) {
            this._wobbleTween.stop();
            this._wobbleTween = null;
        }
    }

    private _resetToOriginalTransform(target: Node): void {
        target.setScale(this._originalScale);
        
        // Tối ưu 2: Chỉ reset trục Z (do hiệu ứng lắc lư) và X. 
        // Tuyệt đối KHÔNG reset trục Y vì trục Y quyết định hướng di chuyển của xe (có thể đang xoay ngang/dọc)
        target.setRotationFromEuler(this._originalEuler.x, target.eulerAngles.y, 0); 
    }

    private _playIdleAnimation(target: Node): void {
        // Hiệu ứng nổ máy xe đứng yên (co giãn trục Y nhẹ)
        const scaleUp = new Vec3(this._originalScale.x, this._originalScale.y * 1.01, this._originalScale.z);
        const scaleDown = new Vec3(this._originalScale.x, this._originalScale.y * 0.98, this._originalScale.z);

        this._animTween = tween(target)
            .to(0.6, { scale: scaleDown }, { easing: 'sineInOut' })
            .to(0.6, { scale: scaleUp }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
    }

    private _playMoveAnimation(target: Node): void {
        // 1. Nhún rung liên tục do xe chạy trên đường
        const moveScaleUp = new Vec3(this._originalScale.x, this._originalScale.y * 1.02, this._originalScale.z);
        const moveScaleDown = new Vec3(this._originalScale.x, this._originalScale.y * 0.97, this._originalScale.z);

        this._animTween = tween(target)
            .to(0.15, { scale: moveScaleUp }, { easing: 'sineInOut' })
            .to(0.15, { scale: moveScaleDown }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();

        // 2. Lắc lư trái phải (Wobble) quanh trục Z (quay xe)
        // Tối ưu 3: Dùng by() thay vì to() để cộng dồn góc xoay Z. 
        // Việc này ngăn lỗi khóa cứng trục Y (bị kẹt góc quay cũ) trong lúc xe đang rẽ ngoặt.
        this._wobbleTween = tween(target)
            .by(0.15, { eulerAngles: new Vec3(0, 0, 2) }, { easing: 'sineInOut' })
            .by(0.3,  { eulerAngles: new Vec3(0, 0, -4) }, { easing: 'sineInOut' }) // Lắc ngược lại 4 độ (-2 so với gốc)
            .by(0.15, { eulerAngles: new Vec3(0, 0, 2) }, { easing: 'sineInOut' })  // Trả về 0
            .union()
            .repeatForever()
            .start();
    }
}

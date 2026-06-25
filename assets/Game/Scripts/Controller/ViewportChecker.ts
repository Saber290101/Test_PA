import { Camera, Node, view } from 'cc';
import { Gamecontroller } from './Gamecontroller';

/**
 * Phụ trách kiểm tra xem một Node có bay ra khỏi màn hình (Viewport) hay không.
 */
export class ViewportChecker {
    private static _mainCamera: Camera | null = null;
    private _isChecking: boolean = false;
    private _isDestroying: boolean = false;
    private _node: Node;

    constructor(node: Node) {
        this._node = node;
    }

    public startChecking(): void {
        this._isChecking = true;
    }

    public update(): void {
        if (this._isChecking && !this._isDestroying) {
            this._checkAndDestroyIfOutOfViewport();
        }
    }

    private _checkAndDestroyIfOutOfViewport(): void {
        if (!this._node.isValid) return;

        if (this._isNodeOutOfViewport()) {
            this._isDestroying = true;
            this._isChecking = false;
            Gamecontroller.instance.checkCharCanMove();
            this._node.destroy();
        }
    }

    private _isNodeOutOfViewport(): boolean {
        // Cache camera để tối ưu (chỉ tìm 1 lần)
        if (!ViewportChecker._mainCamera) {
            const rootNode = this._node.scene?.getChildByName('Canvas')?.getChildByName('Camera');
            if (rootNode) ViewportChecker._mainCamera = rootNode.getComponent(Camera);
        }

        if (!ViewportChecker._mainCamera) return false;

        const screenPos = ViewportChecker._mainCamera.worldToScreen(this._node.worldPosition);
        const { width, height } = view.getVisibleSize();
        const margin = 50;

        return screenPos.x < -margin || screenPos.x > width + margin ||
            screenPos.y < -margin || screenPos.y > height + margin;
    }
}

System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Camera, view, Gamecontroller, ViewportChecker, _crd;

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "./Gamecontroller", _context.meta, extras);
  }

  _export("ViewportChecker", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Camera = _cc.Camera;
      view = _cc.view;
    }, function (_unresolved_2) {
      Gamecontroller = _unresolved_2.Gamecontroller;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "61bdfTOqzdPeqla6vlfh8b2", "ViewportChecker", undefined);

      __checkObsolete__(['Camera', 'Node', 'view']);

      /**
       * Phụ trách kiểm tra xem một Node có bay ra khỏi màn hình (Viewport) hay không.
       */
      _export("ViewportChecker", ViewportChecker = class ViewportChecker {
        constructor(node) {
          this._isChecking = false;
          this._isDestroying = false;
          this._node = void 0;
          this._node = node;
        }

        startChecking() {
          this._isChecking = true;
        }

        update() {
          if (this._isChecking && !this._isDestroying) {
            this._checkAndDestroyIfOutOfViewport();
          }
        }

        _checkAndDestroyIfOutOfViewport() {
          if (!this._node.isValid) return;

          if (this._isNodeOutOfViewport()) {
            this._isDestroying = true;
            this._isChecking = false;
            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();

            this._node.destroy();
          }
        }

        _isNodeOutOfViewport() {
          // Cache camera để tối ưu (chỉ tìm 1 lần)
          if (!ViewportChecker._mainCamera) {
            var _this$_node$scene;

            const rootNode = (_this$_node$scene = this._node.scene) == null || (_this$_node$scene = _this$_node$scene.getChildByName('Canvas')) == null ? void 0 : _this$_node$scene.getChildByName('Camera');
            if (rootNode) ViewportChecker._mainCamera = rootNode.getComponent(Camera);
          }

          if (!ViewportChecker._mainCamera) return false;

          const screenPos = ViewportChecker._mainCamera.worldToScreen(this._node.worldPosition);

          const {
            width,
            height
          } = view.getVisibleSize();
          const margin = 50;
          return screenPos.x < -margin || screenPos.x > width + margin || screenPos.y < -margin || screenPos.y > height + margin;
        }

      });

      ViewportChecker._mainCamera = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fe977ba92fc4731e7bce5cf2b7a2f6a7e3580430.js.map
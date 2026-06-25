System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, tween, Vec3, BusState, BusAnimationManager, _crd;

  function _reportPossibleCrUseOfBusState(extras) {
    _reporterNs.report("BusState", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "./BusController", _context.meta, extras);
  }

  _export("BusAnimationManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BusState = _unresolved_2.BusState;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f0fe0+FNI1EabafDqxyn987", "BusAnimationManager", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Tween', 'tween', 'Vec3']);

      /**
       * Quản lý các hiệu ứng animation (nhún, lắc lư) của xe buýt.
       * Đã được tối ưu để tránh khởi động lại tween không cần thiết và tránh lỗi khóa trục quay Y.
       */
      _export("BusAnimationManager", BusAnimationManager = class BusAnimationManager {
        constructor(bus) {
          this._bus = void 0;
          this._visualNode = null;
          this._animTween = null;
          this._wobbleTween = null;
          this._originalScale = new Vec3(1, 1, 1);
          this._originalEuler = new Vec3();
          // Trạng thái hiện tại để tránh restart animation liên tục gây giật lag
          this._currentState = null;
          this._bus = bus;
        }

        initialize() {
          // Ưu tiên tìm node con chứa model thực sự để tween (tránh làm lệch collider/hướng của node gốc)
          this._visualNode = this._bus.node.getChildByName("Visual") || this._bus.node.getChildByName("Model") || this._bus.node.children[0] || null;

          if (this._visualNode) {
            this._originalScale.set(this._visualNode.scale);

            this._originalEuler.set(this._visualNode.eulerAngles);
          }
        }

        updateState(state) {
          // Tối ưu 1: Nếu trạng thái không thay đổi, bỏ qua để tránh việc reset animation liên tục
          if (this._currentState === state) return;
          this._currentState = state;
          var target = this._visualNode || this._bus.node;

          this._stopCurrentAnimations();

          this._resetToOriginalTransform(target); // Phân loại animation theo state


          var isIdle = state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED || state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PICKING;
          var isMoving = state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).RUNNING || state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).ENTERING || state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).EXITING || state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).RETURNING;

          if (isIdle) {
            this._playIdleAnimation(target);
          } else if (isMoving) {
            this._playMoveAnimation(target);
          }
        }

        _stopCurrentAnimations() {
          if (this._animTween) {
            this._animTween.stop();

            this._animTween = null;
          }

          if (this._wobbleTween) {
            this._wobbleTween.stop();

            this._wobbleTween = null;
          }
        }

        _resetToOriginalTransform(target) {
          target.setScale(this._originalScale); // Tối ưu 2: Chỉ reset trục Z (do hiệu ứng lắc lư) và X. 
          // Tuyệt đối KHÔNG reset trục Y vì trục Y quyết định hướng di chuyển của xe (có thể đang xoay ngang/dọc)

          target.setRotationFromEuler(this._originalEuler.x, target.eulerAngles.y, 0);
        }

        _playIdleAnimation(target) {
          // Hiệu ứng nổ máy xe đứng yên (co giãn trục Y nhẹ)
          var scaleUp = new Vec3(this._originalScale.x, this._originalScale.y * 1.01, this._originalScale.z);
          var scaleDown = new Vec3(this._originalScale.x, this._originalScale.y * 0.98, this._originalScale.z);
          this._animTween = tween(target).to(0.6, {
            scale: scaleDown
          }, {
            easing: 'sineInOut'
          }).to(0.6, {
            scale: scaleUp
          }, {
            easing: 'sineInOut'
          }).union().repeatForever().start();
        }

        _playMoveAnimation(target) {
          // 1. Nhún rung liên tục do xe chạy trên đường
          var moveScaleUp = new Vec3(this._originalScale.x, this._originalScale.y * 1.02, this._originalScale.z);
          var moveScaleDown = new Vec3(this._originalScale.x, this._originalScale.y * 0.97, this._originalScale.z);
          this._animTween = tween(target).to(0.15, {
            scale: moveScaleUp
          }, {
            easing: 'sineInOut'
          }).to(0.15, {
            scale: moveScaleDown
          }, {
            easing: 'sineInOut'
          }).union().repeatForever().start(); // 2. Lắc lư trái phải (Wobble) quanh trục Z (quay xe)
          // Tối ưu 3: Dùng by() thay vì to() để cộng dồn góc xoay Z. 
          // Việc này ngăn lỗi khóa cứng trục Y (bị kẹt góc quay cũ) trong lúc xe đang rẽ ngoặt.

          this._wobbleTween = tween(target).by(0.15, {
            eulerAngles: new Vec3(0, 0, 2)
          }, {
            easing: 'sineInOut'
          }).by(0.3, {
            eulerAngles: new Vec3(0, 0, -4)
          }, {
            easing: 'sineInOut'
          }) // Lắc ngược lại 4 độ (-2 so với gốc)
          .by(0.15, {
            eulerAngles: new Vec3(0, 0, 2)
          }, {
            easing: 'sineInOut'
          }) // Trả về 0
          .union().repeatForever().start();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1a787cb0f2bc71746989eb7e4c4378ef11b7c730.js.map
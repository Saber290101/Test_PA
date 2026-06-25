System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, SkeletalAnimation, _dec, _class, _crd, ccclass, property, StickmanAnimationController;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      SkeletalAnimation = _cc.SkeletalAnimation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f02b4OUi2ZHJbbZ3bTLAE4/", "StickmanAnimationController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'SkeletalAnimation']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * StickmanAnimationController – Quản lý animation cho Stickman.
       * Hỗ trợ chuyển đổi mượt mà (crossFade) giữa các trạng thái Idle, Walk, Sit.
       */

      _export("StickmanAnimationController", StickmanAnimationController = (_dec = ccclass('StickmanAnimationController'), _dec(_class = class StickmanAnimationController extends Component {
        constructor() {
          super(...arguments);
          this._anim = null;
          this._currentClip = '';
        }

        onLoad() {
          this._anim = this.getComponent(SkeletalAnimation) || this.getComponentInChildren(SkeletalAnimation);

          if (!this._anim) {
            console.warn("[StickmanAnim] \u26A0\uFE0F SkeletalAnimation component not found on " + this.node.name + " or its children!");
          }
        }

        start() {
          this.playIdle(0);
        }
        /**
         * Chạy animation Idle
         * @param fadeTime Thời gian chuyển tiếp mượt (giây)
         */


        playIdle(fadeTime) {
          if (fadeTime === void 0) {
            fadeTime = 0.25;
          }

          this.playAnimation('Idle', fadeTime);
        }
        /**
         * Chạy animation Walk
         * @param fadeTime Thời gian chuyển tiếp mượt (giây)
         */


        playWalk(fadeTime) {
          if (fadeTime === void 0) {
            fadeTime = 0.2;
          }

          this.playAnimation('Walk', fadeTime);
        }
        /**
         * Chạy animation Sit
         * @param fadeTime Thời gian chuyển tiếp mượt (giây)
         */


        playSit(fadeTime) {
          if (fadeTime === void 0) {
            fadeTime = 0.25;
          }

          this.playAnimation('Sit', fadeTime);
        }
        /**
         * Phát một animation bất kỳ bằng tên với hiệu ứng chuyển tiếp mượt (crossFade)
         * @param name Tên clip animation
         * @param fadeTime Thời gian chuyển tiếp mượt (giây)
         */


        playAnimation(name, fadeTime) {
          if (fadeTime === void 0) {
            fadeTime = 0.2;
          }

          if (!this._anim) return; // Bỏ qua nếu clip đó đang được chạy rồi

          if (this._currentClip === name) {
            var _state = this._anim.getState(name);

            if (_state && _state.isPlaying) {
              return;
            }
          }

          var state = this._anim.getState(name);

          if (state) {
            this._currentClip = name; // Dùng crossFade để chuyển tiếp mượt mà giữa các animation

            this._anim.crossFade(name, fadeTime);
          } else {
            // Fallback nếu không hỗ trợ crossFade cho clip này
            this._currentClip = name;

            this._anim.play(name);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c9d472c1dcd6058df0089033a7ded8a5c1cf0c1c.js.map
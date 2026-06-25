System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, Color, MeshRenderer, Enum, BusColor, COLOR_RGB, ColorManager, StickmanAnimationController, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, PassengerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBusColor(extras) {
    _reporterNs.report("BusColor", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLOR_RGB(extras) {
    _reporterNs.report("COLOR_RGB", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorManager(extras) {
    _reporterNs.report("ColorManager", "./ColorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStickmanAnimationController(extras) {
    _reporterNs.report("StickmanAnimationController", "../StickmanAnimationController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      Color = _cc.Color;
      MeshRenderer = _cc.MeshRenderer;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      BusColor = _unresolved_2.BusColor;
      COLOR_RGB = _unresolved_2.COLOR_RGB;
    }, function (_unresolved_3) {
      ColorManager = _unresolved_3.ColorManager;
    }, function (_unresolved_4) {
      StickmanAnimationController = _unresolved_4.StickmanAnimationController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3b081fXMrpLPbEzVyVRjICC", "PassengerController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'Color', 'MeshRenderer', 'SkeletalAnimation', 'Enum']);

      ({
        ccclass,
        property
      } = _decorator);
      Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
        error: Error()
      }), BusColor) : BusColor);
      /**
       * Hành khách - mỗi người chỉ có một màu.
       * Chỉ lên xe khi: (1) đứng đầu hàng, (2) xe trùng màu, (3) xe chưa hết chỗ.
       */

      _export("PassengerController", PassengerController = (_dec = ccclass('PassengerController'), _dec2 = property({
        type: Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
          error: Error()
        }), BusColor) : BusColor),
        tooltip: 'Màu hành khách'
      }), _dec(_class = (_class2 = class PassengerController extends Component {
        constructor(...args) {
          super(...args);

          /** Màu hành khách */
          _initializerDefineProperty(this, "passengerColor", _descriptor, this);

          /** Đã lên xe chưa */
          this.isBoarded = false;
          this._animCtrl = null;
        }

        onLoad() {
          this._animCtrl = this.getComponent(_crd && StickmanAnimationController === void 0 ? (_reportPossibleCrUseOfStickmanAnimationController({
            error: Error()
          }), StickmanAnimationController) : StickmanAnimationController) || this.addComponent(_crd && StickmanAnimationController === void 0 ? (_reportPossibleCrUseOfStickmanAnimationController({
            error: Error()
          }), StickmanAnimationController) : StickmanAnimationController);
          this.playIdle();

          if ((_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) {
            (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
              error: Error()
            }), ColorManager) : ColorManager).instance.applyStickmanColor(this.node, this.passengerColor);
          } else {
            this.applyColor();
          }
        }
        /** Khởi tạo hành khách với màu */


        init(color) {
          this.passengerColor = color;

          if ((_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) {
            (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
              error: Error()
            }), ColorManager) : ColorManager).instance.applyStickmanColor(this.node, this.passengerColor);
          } else {
            this.applyColor();
          }
        }
        /** Gán màu lên toàn bộ MeshRenderer con (stickman.effect shader) */


        applyColor() {
          const cd = (_crd && COLOR_RGB === void 0 ? (_reportPossibleCrUseOfCOLOR_RGB({
            error: Error()
          }), COLOR_RGB) : COLOR_RGB)[this.passengerColor];
          if (!cd) return;
          const bodyColor = new Color(cd.r, cd.g, cd.b, 255);
          const outlineColor = new Color(Math.max(0, cd.r - 80), Math.max(0, cd.g - 80), Math.max(0, cd.b - 80), 255);
          const renderers = this.node.getComponentsInChildren(MeshRenderer);

          for (const mr of renderers) {
            const passCount = mr.sharedMaterials.length; // Pass 0: body (mainColor)

            const mat0 = mr.getMaterialInstance(0);

            if (mat0) {
              try {
                mat0.setProperty('mainColor', bodyColor);
              } catch (_) {}
            } // Pass 3: outline (baseColor) – stickman.effect có 4 passes


            if (passCount >= 4) {
              const mat3 = mr.getMaterialInstance(3);

              if (mat3) {
                try {
                  mat3.setProperty('baseColor', outlineColor);
                } catch (_) {}
              }
            }
          }
        } // ─── Animation Helpers ──────────────────────────


        playIdle(fadeTime) {
          if (this._animCtrl) {
            this._animCtrl.playIdle(fadeTime);
          }
        }

        playWalk(fadeTime) {
          if (this._animCtrl) {
            this._animCtrl.playWalk(fadeTime);
          }
        }

        playSit(fadeTime) {
          if (this._animCtrl) {
            this._animCtrl.playSit(fadeTime);
          }
        }
        /**
         * Animation hành khách đi lên xe rồi biến mất.
         * @param targetWorldPos vị trí xe (world)
         * @param callback gọi sau khi xong
         */


        boardBus(targetWorldPos, callback) {
          this.isBoarded = true;
          const target = targetWorldPos.clone();
          this.playWalk(0); // Xoay mặt về phía xe buýt

          const dir = new Vec3();
          Vec3.subtract(dir, target, this.node.worldPosition);
          dir.y = 0;

          if (dir.lengthSqr() > 0.01) {
            const angle = Math.atan2(dir.x, dir.z) * (180 / Math.PI);
            this.node.setRotationFromEuler(0, angle, 0);
          }

          tween(this.node).to(0.1, {
            worldPosition: target
          }, {
            easing: 'sineOut'
          }).call(() => {
            this.node.active = false;
            callback == null || callback();
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "passengerColor", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).RED;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=13b4ee04ed97d724cf47716f69f332cc2528b11e.js.map
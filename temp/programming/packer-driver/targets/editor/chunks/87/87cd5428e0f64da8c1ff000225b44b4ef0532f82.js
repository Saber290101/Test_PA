System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Component, Label, screen, view, sys, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, ResizeCam;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Camera = _cc.Camera;
      Component = _cc.Component;
      Label = _cc.Label;
      screen = _cc.screen;
      view = _cc.view;
      sys = _cc.sys;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d22f9xrwwVAK5TXUcHKk3JP", "ResizeCam", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Component', 'Label', 'screen', 'view', 'sys']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ResizeCam", ResizeCam = (_dec = ccclass('ResizeCam'), _dec2 = property(Camera), _dec3 = property(Label), _dec4 = property({
        tooltip: 'Sai số nhận diện aspect'
      }), _dec(_class = (_class2 = class ResizeCam extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "camera", _descriptor, this);

          _initializerDefineProperty(this, "label", _descriptor2, this);

          // ✅ Sai số nhận diện aspect (hạ xuống 0.015 nếu muốn chặt hơn)
          _initializerDefineProperty(this, "epsilonDefault", _descriptor3, this);

          // ✅ Bật log model đã nhận diện (debug)
          _initializerDefineProperty(this, "logDetectedProfile", _descriptor4, this);

          // Tỷ lệ tham chiếu theo thiết kế gốc 1080x1920
          this.refPortraitAspect = 1080 / 1920;
          // ~0.5625
          this.refLandscapeAspect = 1920 / 1080;
          // ~1.7778
          this._lastAspect = -1;
          // ===================== PROFILES =====================
          this.DEVICE_PROFILES = [// ------- iPad -------
          {
            name: 'iPad 9th/10th (4:3)',
            aspectLandscape: 4 / 3,
            aspectPortrait: 3 / 4,
            kLandscape: 10.0,
            kPortrait: 17.5
          }, {
            name: 'iPad Pro 12.9 (2732×2048)',
            aspectLandscape: 4 / 3,
            aspectPortrait: 3 / 4,
            kLandscape: 15.0,
            kPortrait: 17.0,
            epsilon: 0.015
          }, {
            name: 'iPad Air/Pro 11 (2360×1640)',
            aspectLandscape: 2360 / 1640,
            aspectPortrait: 1640 / 2360,
            kLandscape: 15.2,
            kPortrait: 17.2
          }, {
            name: 'iPad Pro 11 (2388×1668)',
            aspectLandscape: 2388 / 1668,
            aspectPortrait: 1668 / 2388,
            kLandscape: 15.2,
            kPortrait: 17.2
          }, {
            name: 'iPad mini 6 (2266×1488)',
            aspectLandscape: 2266 / 1488,
            aspectPortrait: 1488 / 2266,
            kLandscape: 15.4,
            kPortrait: 17.4
          }, // ------- Android Tablets 16:10 -------
          {
            name: 'Galaxy Tab S9/S9+/Ultra',
            aspectLandscape: 2560 / 1600,
            aspectPortrait: 1600 / 2560,
            kLandscape: 12.3,
            kPortrait: 15.3
          }, {
            name: 'Galaxy Tab A (16:10)',
            aspectLandscape: 1920 / 1200,
            aspectPortrait: 1200 / 1920,
            kLandscape: 15.2,
            kPortrait: 15.2
          }, {
            name: 'Xiaomi Pad 6/7 (2880×1800)',
            aspectLandscape: 2880 / 1800,
            aspectPortrait: 1800 / 2880,
            kLandscape: 15.3,
            kPortrait: 15.3
          }, {
            name: 'Lenovo Tab P11 (2000×1200)',
            aspectLandscape: 2000 / 1200,
            aspectPortrait: 1200 / 2000,
            kLandscape: 13.3,
            kPortrait: 15.2
          }, // ------- Tablet 3:2 / 5:3 -------
          {
            name: 'Surface Pro (3:2)',
            aspectLandscape: 3 / 2,
            aspectPortrait: 2 / 3,
            kLandscape: 15.0,
            kPortrait: 16.0
          }, {
            name: 'Lenovo Tab (5:3)',
            aspectLandscape: 5 / 3,
            aspectPortrait: 3 / 5,
            kLandscape: 15.2,
            kPortrait: 15.2
          }, // ------- iPhone X → 15 series -------
          {
            name: 'iPhone X / XS / 11 Pro',
            aspectLandscape: 2436 / 1125,
            aspectPortrait: 1125 / 2436,
            kLandscape: 16.0,
            kPortrait: 12.0
          }, {
            name: 'iPhone 11 / XR',
            aspectLandscape: 1792 / 828,
            aspectPortrait: 828 / 1792,
            kLandscape: 16.1,
            kPortrait: 11.1
          }, {
            name: 'iPhone 12/13/14',
            aspectLandscape: 2532 / 1170,
            aspectPortrait: 1170 / 2532,
            kLandscape: 16.2,
            kPortrait: 11.2
          }, {
            name: 'iPhone 12/13/14 Pro',
            aspectLandscape: 2556 / 1179,
            aspectPortrait: 1179 / 2556,
            kLandscape: 14.2,
            kPortrait: 14.2
          }, {
            name: 'iPhone 12/13/14 Pro Max',
            aspectLandscape: 2778 / 1284,
            aspectPortrait: 1284 / 2778,
            kLandscape: 16.3,
            kPortrait: 12.3
          }, {
            name: 'iPhone 15 / 15 Plus',
            aspectLandscape: 2796 / 1290,
            aspectPortrait: 1290 / 2796,
            kLandscape: 16.3,
            kPortrait: 12.8
          }, {
            name: 'iPhone 15 Pro / Pro Max',
            aspectLandscape: 2796 / 1290,
            aspectPortrait: 1290 / 2796,
            kLandscape: 14.3,
            kPortrait: 14.3
          }, // ------- iPhone classic 16:9 -------
          {
            name: 'iPhone 6/7/8 / SE2/SE3',
            aspectLandscape: 1334 / 750,
            aspectPortrait: 750 / 1334,
            kLandscape: 13,
            kPortrait: 14.5
          }, {
            name: 'iPhone 6/7/8 Plus',
            aspectLandscape: 2208 / 1242,
            aspectPortrait: 1242 / 2208,
            kLandscape: 15.5,
            kPortrait: 14.5
          }, // ------- Android phone – 20:9 / 19.5:9 / 19:9 / 18:9 -------
          {
            name: 'Android 20:9 (2400×1080)',
            aspectLandscape: 2400 / 1080,
            aspectPortrait: 1080 / 2400,
            kLandscape: 16.2,
            kPortrait: 11.2
          }, {
            name: 'Android 20:9 (2340×1080)',
            aspectLandscape: 2340 / 1080,
            aspectPortrait: 1080 / 2340,
            kLandscape: 16.2,
            kPortrait: 11.2
          }, {
            name: 'Android 19.5:9 (2688×1242)',
            aspectLandscape: 2688 / 1242,
            aspectPortrait: 1242 / 2688,
            kLandscape: 14.2,
            kPortrait: 14.2
          }, {
            name: 'Android 19:9 (2280×1080)',
            aspectLandscape: 2280 / 1080,
            aspectPortrait: 1080 / 2280,
            kLandscape: 16.5,
            kPortrait: 12.3
          }, {
            name: 'Android 18:9 (2160×1080)',
            aspectLandscape: 2160 / 1080,
            aspectPortrait: 1080 / 2160,
            kLandscape: 15,
            kPortrait: 12.4
          }, // ------- Foldables -------
          {
            name: 'Galaxy Z Fold Cover (~21:9)',
            aspectLandscape: 2316 / 904,
            aspectPortrait: 904 / 2316,
            kLandscape: 14.1,
            kPortrait: 16.1
          }, {
            name: 'Galaxy Z Fold Inner (~1.2:1)',
            aspectLandscape: 2176 / 1812,
            aspectPortrait: 1812 / 2176,
            kLandscape: 15.6,
            kPortrait: 11.6
          }];

          this.applyResize = () => {
            const {
              width,
              height
            } = screen.windowSize;
            if (!height) return;
            const aspect = width / height;
            if (Math.abs(aspect - this._lastAspect) < 0.0005) return;
            this._lastAspect = aspect;
            const isLandscape = width >= height;
            const refAspect = isLandscape ? this.refLandscapeAspect : this.refPortraitAspect;
            const picked = this.pickProfile(aspect, isLandscape);
            const k = isLandscape ? picked.kLandscape : picked.kPortrait;
            const newOrthoHeight = k * (refAspect / aspect);
            if (this.camera) this.camera.orthoHeight = newOrthoHeight;

            if (this.label) {
              this.label.string = `${aspect.toFixed(4)} ${isLandscape ? 'L' : 'P'} | ${picked.name}`;
            }

            if (this.logDetectedProfile) {
              console.log(`[ResizeCam] aspect=${aspect.toFixed(4)} ${isLandscape ? 'L' : 'P'} → ${picked.name}, k=${k.toFixed(2)}, ortho=${newOrthoHeight.toFixed(2)}`);
            }
          };
        }

        // =================== END PROFILES ===================
        onEnable() {
          this.applyResize();

          if (sys.isBrowser && typeof window !== 'undefined') {
            window.addEventListener('resize', this.applyResize, false);
            window.addEventListener('orientationchange', this.applyResize, false);
          }

          view.on('canvas-resize', this.applyResize, this);
        }

        onDisable() {
          if (sys.isBrowser && typeof window !== 'undefined') {
            window.removeEventListener('resize', this.applyResize, false);
            window.removeEventListener('orientationchange', this.applyResize, false);
          }

          view.off('canvas-resize', this.applyResize, this);
        }

        pickProfile(aspect, isLandscape) {
          var _bestInEps;

          let bestInEps = null;
          let bestGlobal = null;

          for (const p of this.DEVICE_PROFILES) {
            var _p$epsilon;

            const target = isLandscape ? p.aspectLandscape : p.aspectPortrait;
            const diff = Math.abs(aspect - target);
            const eps = (_p$epsilon = p.epsilon) != null ? _p$epsilon : this.epsilonDefault;
            if (!bestGlobal || diff < bestGlobal.diff) bestGlobal = {
              p,
              diff
            };

            if (diff <= eps) {
              if (!bestInEps || diff < bestInEps.diff) bestInEps = {
                p,
                diff
              };
            }
          }

          return ((_bestInEps = bestInEps) != null ? _bestInEps : bestGlobal).p;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "epsilonDefault", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.02;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "logDetectedProfile", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=87cd5428e0f64da8c1ff000225b44b4ef0532f82.js.map
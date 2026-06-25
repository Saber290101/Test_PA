System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Material, Enum, Color, MeshRenderer, BusColor, COLOR_RGB, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor3, _descriptor4, _descriptor5, _class6, _crd, ccclass, property, ColorMaterialMapping, ColorManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBusColor(extras) {
    _reporterNs.report("BusColor", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCOLOR_RGB(extras) {
    _reporterNs.report("COLOR_RGB", "../GameEnums", _context.meta, extras);
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
      Material = _cc.Material;
      Enum = _cc.Enum;
      Color = _cc.Color;
      MeshRenderer = _cc.MeshRenderer;
    }, function (_unresolved_2) {
      BusColor = _unresolved_2.BusColor;
      COLOR_RGB = _unresolved_2.COLOR_RGB;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d8fdbzB8IRHh7FKy3K/Ty18", "ColorManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Material', 'Enum', 'Color', 'MeshRenderer']);

      ({
        ccclass,
        property
      } = _decorator);
      Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
        error: Error()
      }), BusColor) : BusColor);

      _export("ColorMaterialMapping", ColorMaterialMapping = (_dec = ccclass('ColorMaterialMapping'), _dec2 = property({
        type: Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
          error: Error()
        }), BusColor) : BusColor),
        tooltip: 'Màu xe / Hành khách'
      }), _dec3 = property({
        type: Material,
        tooltip: 'Vật liệu tương ứng'
      }), _dec(_class = (_class2 = class ColorMaterialMapping {
        constructor() {
          _initializerDefineProperty(this, "color", _descriptor, this);

          _initializerDefineProperty(this, "material", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).RED;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export("ColorManager", ColorManager = (_dec4 = ccclass('ColorManager'), _dec5 = property({
        type: [ColorMaterialMapping],
        tooltip: 'Danh sách Material xe buýt tương ứng với từng Màu'
      }), _dec6 = property({
        type: [ColorMaterialMapping],
        tooltip: 'Danh sách Material stickman tương ứng với từng Màu (riêng biệt với xe)'
      }), _dec7 = property({
        tooltip: 'Sinh ngẫu nhiên màu xe và khách dựa trên danh sách màu đã kéo'
      }), _dec4(_class4 = (_class5 = (_class6 = class ColorManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "colorMaterials", _descriptor3, this);

          _initializerDefineProperty(this, "stickmanMaterials", _descriptor4, this);

          _initializerDefineProperty(this, "randomizeColors", _descriptor5, this);
        }

        static get instance() {
          return ColorManager._inst;
        }

        onLoad() {
          ColorManager._inst = this;
        }

        onDestroy() {
          if (ColorManager._inst === this) {
            ColorManager._inst = null;
          }
        }

        getMaterialForColor(color) {
          var mapping = this.colorMaterials.find(m => m.color === color);
          return mapping ? mapping.material : null;
        }

        getStickmanMaterial(color) {
          var mapping = this.stickmanMaterials.find(m => m.color === color);
          return mapping ? mapping.material : null;
        }

        getRandomConfiguredColor() {
          if (this.colorMaterials.length === 0) {
            var allColors = [(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
              error: Error()
            }), BusColor) : BusColor).RED, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
              error: Error()
            }), BusColor) : BusColor).BLUE, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
              error: Error()
            }), BusColor) : BusColor).YELLOW, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
              error: Error()
            }), BusColor) : BusColor).GREEN, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
              error: Error()
            }), BusColor) : BusColor).PURPLE];
            return allColors[Math.floor(Math.random() * allColors.length)];
          }

          var randIdx = Math.floor(Math.random() * this.colorMaterials.length);
          return this.colorMaterials[randIdx].color;
        }

        applyColorToNode(root, color) {
          var customMat = this.getMaterialForColor(color);

          this._applyMaterialOrFallback(root, color, customMat);
        }

        applyStickmanColor(root, color) {
          var stickmanMat = this.getStickmanMaterial(color);

          if (stickmanMat) {
            this._applyMaterialOrFallback(root, color, stickmanMat);
          } else {
            this.applyColorToNode(root, color);
          }
        }

        _applyMaterialOrFallback(root, color, material) {
          var shadowNodes = ['Vehicle_04_S', 'Vehicle_06_S', 'Vehicle_10_S'];
          var allRenderers = root.getComponentsInChildren(MeshRenderer);

          if (material) {
            for (var mr of allRenderers) {
              if (shadowNodes.includes(mr.node.name)) continue;
              if (mr.sharedMaterials.length > 0) mr.setMaterial(material, 0);
            }
          } else {
            var cd = (_crd && COLOR_RGB === void 0 ? (_reportPossibleCrUseOfCOLOR_RGB({
              error: Error()
            }), COLOR_RGB) : COLOR_RGB)[color];
            if (!cd) return;
            var bodyColor = new Color(cd.r, cd.g, cd.b, 255);
            var outlineColor = new Color(Math.max(0, cd.r - 80), Math.max(0, cd.g - 80), Math.max(0, cd.b - 80), 255);

            for (var _mr of allRenderers) {
              // Bỏ qua các node chứa shadow cố định
              if (shadowNodes.includes(_mr.node.name)) continue;
              var passCount = _mr.sharedMaterials.length; // Pass 0: body (mainColor)

              var mat0 = _mr.getMaterialInstance(0);

              if (mat0) {
                try {
                  mat0.setProperty('mainColor', bodyColor);
                } catch (_) {}
              } // Pass 3: outline (baseColor)


              if (passCount >= 4) {
                var mat3 = _mr.getMaterialInstance(3);

                if (mat3) {
                  try {
                    mat3.setProperty('baseColor', outlineColor);
                  } catch (_) {}
                }
              }
            }
          }
        }

      }, _class6._inst = null, _class6), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "colorMaterials", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "stickmanMaterials", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "randomizeColors", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e1498b22455cb0df5abe8f3f00833e9109d052ff.js.map
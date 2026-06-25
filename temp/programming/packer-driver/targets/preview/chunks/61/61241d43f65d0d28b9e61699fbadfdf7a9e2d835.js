System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, CCBoolean, CCInteger, instantiate, Node, NodePool, Prefab, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BasePool;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      CCBoolean = _cc.CCBoolean;
      CCInteger = _cc.CCInteger;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      NodePool = _cc.NodePool;
      Prefab = _cc.Prefab;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2d91189YTdLd6KLQ3sPkAhl", "BasePool", undefined);

      __checkObsolete__(['_decorator', 'CCBoolean', 'CCInteger', 'instantiate', 'Node', 'NodePool', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", BasePool = (_dec = ccclass("BasePool"), _dec2 = property(Prefab), _dec3 = property(CCBoolean), _dec4 = property(Node), _dec5 = property(CCInteger), _dec(_class = (_class2 = class BasePool {
        constructor() {
          this.pool = void 0;

          _initializerDefineProperty(this, "Prefab", _descriptor, this);

          _initializerDefineProperty(this, "reuse", _descriptor2, this);

          _initializerDefineProperty(this, "parentNode", _descriptor3, this);

          _initializerDefineProperty(this, "Size", _descriptor4, this);

          this.pool = new NodePool(); //Khong can biet chinh xac so luong nut ban dau ta se sinh ra cac nut neu bi thieu trong thoi gian chay
          // for (let i = 0; i < this.Size; ++i) {
          //     let obj = cc.instantiate(this.Prefab); // create node instance
          //     this.pool.put(obj); // populate your pool with put method
          // }
        }

        GetObject() {
          if (this.reuse) {
            var obj = null;

            if (this.pool.size() > 0) {
              obj = this.pool.get();
              obj.active = true;
            } else {
              obj = instantiate(this.Prefab);
            }

            if (this.parentNode) {
              obj.setParent(this.parentNode);
            }

            return obj;
          } else {
            var _obj = instantiate(this.Prefab);

            if (this.parentNode) {
              _obj.setParent(this.parentNode);
            }

            return _obj;
          }
        }

        PutObject(obj) {
          if (this.reuse) {
            // Reparent về parentNode trước để node không bị destroy theo parent cũ (vd. pixel).
            if (this.parentNode && this.parentNode.isValid && obj.isValid) {
              obj.setParent(this.parentNode);
            }

            obj.active = false;
            this.pool.put(obj);
          } else {
            obj.destroy();
          }
        }

        ClearPool() {
          this.pool.clear();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "reuse", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "parentNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "Size", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=61241d43f65d0d28b9e61699fbadfdf7a9e2d835.js.map
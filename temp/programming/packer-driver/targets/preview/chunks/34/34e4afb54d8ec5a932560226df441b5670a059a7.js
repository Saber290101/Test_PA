System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, BasePool, _decorator, Enum, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _dec4, _class4, _class5, _descriptor3, _crd, ccclass, property, TypeNodePool, BasePoolInfo, PoolManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBasePool(extras) {
    _reporterNs.report("BasePool", "./BasePool", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Enum = _cc.Enum;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      BasePool = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "211201JbvRKfIVvxGJq2hUK", "PoolManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Enum', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TypeNodePool", TypeNodePool = /*#__PURE__*/function (TypeNodePool) {
        TypeNodePool[TypeNodePool["NONE"] = 0] = "NONE";
        TypeNodePool[TypeNodePool["PROJECTILE"] = 1] = "PROJECTILE";
        TypeNodePool[TypeNodePool["BLOCK"] = 2] = "BLOCK";
        TypeNodePool[TypeNodePool["PIXEL"] = 3] = "PIXEL";
        TypeNodePool[TypeNodePool["EFFECT"] = 4] = "EFFECT";
        return TypeNodePool;
      }({}));

      _export("BasePoolInfo", BasePoolInfo = (_dec = ccclass('BasePoolInfo'), _dec2 = property({
        type: Enum(TypeNodePool)
      }), _dec3 = property(_crd && BasePool === void 0 ? (_reportPossibleCrUseOfBasePool({
        error: Error()
      }), BasePool) : BasePool), _dec(_class = (_class2 = class BasePoolInfo {
        constructor() {
          _initializerDefineProperty(this, "typeNodePool", _descriptor, this);

          _initializerDefineProperty(this, "basePool", _descriptor2, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "typeNodePool", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return TypeNodePool.NONE;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "basePool", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export("default", PoolManager = (_dec4 = property([BasePoolInfo]), ccclass(_class4 = (_class5 = class PoolManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super();

          _initializerDefineProperty(this, "poolArrays", _descriptor3, this);

          PoolManager.instance = this;
        }

        onLoad() {
          super.onLoad == null || super.onLoad();
        }
        /** Trả về parentNode của pool theo type (để projectile/node reparent về đây trước khi trả pool, tránh bị destroy theo node khác). */


        getParentNodeForPool(type) {
          for (var i = 0; i < this.poolArrays.length; i++) {
            if (type === this.poolArrays[i].typeNodePool) {
              var _pool$parentNode;

              var pool = this.poolArrays[i].basePool;
              return (_pool$parentNode = pool == null ? void 0 : pool.parentNode) != null ? _pool$parentNode : null;
            }
          }

          return null;
        }

        PutNodeToPool(type, node) {
          if (!node) return;

          for (var i = 0; i < this.poolArrays.length; i++) {
            if (type == this.poolArrays[i].typeNodePool) {
              this.poolArrays[i].basePool.PutObject(node);
            }
          }
        }

        GetNodeOfPool(type) {
          var nodeReturn = null;

          for (var i = 0; i < this.poolArrays.length; i++) {
            if (type == this.poolArrays[i].typeNodePool) {
              nodeReturn = this.poolArrays[i].basePool.GetObject();
            }
          }

          try {
            if (!nodeReturn) throw new Error("Pool of this type is null");
            return nodeReturn;
          } catch (error) {
            console.error("Error: ", error);
            return null;
          }
        }

      }, (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "poolArrays", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=34e4afb54d8ec5a932560226df441b5670a059a7.js.map
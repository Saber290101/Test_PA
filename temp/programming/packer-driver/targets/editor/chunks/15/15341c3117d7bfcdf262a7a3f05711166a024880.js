System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, Component, Node, tween, Vec3, EventManager, GlobalEvent, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GameWinManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Utility/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobalEvent(extras) {
    _reporterNs.report("GlobalEvent", "../Utility/Event/GlobalEvent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      Component = _cc.Component;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      EventManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      GlobalEvent = _unresolved_3.GlobalEvent;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ac16dSkBOVGragdzWA+GMxI", "GameWinController", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component', 'Node', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameWinManager", GameWinManager = (_dec = ccclass('GameWinManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class GameWinManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "content", _descriptor, this);

          _initializerDefineProperty(this, "icon", _descriptor2, this);

          _initializerDefineProperty(this, "playNow", _descriptor3, this);
        }

        onLoad() {
          this.content.active = false;
        }

        onEnable() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.show, this);
        }

        onDisable() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.show, this);
        }

        show() {
          if (this.content.active) return;
          this.icon.active = false;
          this.icon.setScale(Vec3.ZERO);
          this.content.active = true;
          this.playNow.active = false;
          this.playNow.setScale(Vec3.ZERO);
          tween(this.node).delay(0.25).call(() => {
            this.showIcon();
          }).start();
        }

        backOut(k) {
          if (k === 0) {
            return 0;
          }

          const s = 3.5;
          return --k * k * ((s + 1) * k + s) + 1;
        }

        showIcon() {
          this.icon.active = true;
          this.icon.setScale(Vec3.ZERO);
          this.playNow.active = true;
          tween(this.icon).to(0.4, {
            scale: new Vec3(0.8, 0.8, 0.8)
          }, {
            easing: this.backOut
          }).start();
          tween(this.playNow).to(0.4, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: this.backOut
          }).call(() => {
            this.playNow.getComponent(Animation).play("Pulse_UI");
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playNow", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=15341c3117d7bfcdf262a7a3f05711166a024880.js.map
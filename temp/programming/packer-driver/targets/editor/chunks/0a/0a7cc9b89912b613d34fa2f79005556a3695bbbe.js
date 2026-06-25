System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, GameWinManager, GlobalEvent, EventManager, Global, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, UIManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameWinManager(extras) {
    _reporterNs.report("GameWinManager", "./GameWinController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobalEvent(extras) {
    _reporterNs.report("GlobalEvent", "../Utility/Event/GlobalEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Utility/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobal(extras) {
    _reporterNs.report("Global", "../Utility/Global", _context.meta, extras);
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
      Node = _cc.Node;
    }, function (_unresolved_2) {
      GameWinManager = _unresolved_2.GameWinManager;
    }, function (_unresolved_3) {
      GlobalEvent = _unresolved_3.GlobalEvent;
    }, function (_unresolved_4) {
      EventManager = _unresolved_4.default;
    }, function (_unresolved_5) {
      Global = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e16937/QQVGCrVlFeck+k/T", "UIManager", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(_crd && GameWinManager === void 0 ? (_reportPossibleCrUseOfGameWinManager({
        error: Error()
      }), GameWinManager) : GameWinManager), _dec5 = property(Node), _dec(_class = (_class2 = class UIManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "guide", _descriptor, this);

          _initializerDefineProperty(this, "winUI", _descriptor2, this);

          _initializerDefineProperty(this, "win", _descriptor3, this);

          _initializerDefineProperty(this, "btnAll", _descriptor4, this);
        }

        onLoad() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).START_GAME, this.disableGuide, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.showWin, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.activeBtnAll, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_LOSE, this.activeBtnAll, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_TUTORIAL, this.activeGuide, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_BTN_ALL, this.activeBtnAll, this);
        }

        onDisable() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).START_GAME, this.disableGuide, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.showWin, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.activeBtnAll, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_LOSE, this.activeBtnAll, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_TUTORIAL, this.activeGuide, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_BTN_ALL, this.activeBtnAll, this);
        }

        start() {
          if ((_crd && Global === void 0 ? (_reportPossibleCrUseOfGlobal({
            error: Error()
          }), Global) : Global).video) {
            this.guide.active = false;
            return;
          }
        }

        disableGuide() {
          this.guide.active = false;
        }

        activeGuide() {
          if ((_crd && Global === void 0 ? (_reportPossibleCrUseOfGlobal({
            error: Error()
          }), Global) : Global).video) {
            return;
          }

          this.guide.active = true; //  this.guide.getComponent(Animation).play("Guide");
        }

        showWin() {
          if ((_crd && Global === void 0 ? (_reportPossibleCrUseOfGlobal({
            error: Error()
          }), Global) : Global).video) {
            return;
          }

          if (this.winUI.activeInHierarchy) return; // SoundManager.Instance(SoundManager).playSound("Win");

          this.winUI.active = true;
          this.scheduleOnce(() => {
            this.win.show();
          }, 1.5);
        }

        activeBtnAll() {
          this.btnAll.active = true;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "guide", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "winUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "win", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnAll", [_dec5], {
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
//# sourceMappingURL=0a7cc9b89912b613d34fa2f79005556a3695bbbe.js.map
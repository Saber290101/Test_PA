System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Animation, input, Input, GlobalEvent, EventManager, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _crd, ccclass, property, Gamecontroller;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGlobalEvent(extras) {
    _reporterNs.report("GlobalEvent", "../Utility/Event/GlobalEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Utility/EventManager", _context.meta, extras);
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
      Animation = _cc.Animation;
      input = _cc.input;
      Input = _cc.Input;
    }, function (_unresolved_2) {
      GlobalEvent = _unresolved_2.GlobalEvent;
    }, function (_unresolved_3) {
      EventManager = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7ba0sfMj9Cb4jXUZCMWPlS", "Gamecontroller", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Animation', 'CCBoolean', 'input', 'Input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Gamecontroller", Gamecontroller = (_dec = ccclass('Gamecontroller'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Animation), _dec(_class = (_class2 = (_class3 = class Gamecontroller extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "map", _descriptor, this);

          _initializerDefineProperty(this, "store", _descriptor2, this);

          _initializerDefineProperty(this, "tapToPlay", _descriptor3, this);

          _initializerDefineProperty(this, "barrierAnim", _descriptor4, this);

          this.countMove = 0;
          this.completedBusCount = 0;
          this.listCharacter = [];
          this.isEndGame = false;
          this.startCountTime = false;
          this.hasOpenedStoreAtMove3 = false;
        }

        onLoad() {
          Gamecontroller.instance = this;
          this.pushToListChar();
        }

        pushToListChar() {
          this.listCharacter = [];
          this.map.children.forEach(generateDataNode => {
            generateDataNode.children.forEach(skModelNode => {
              var busController = skModelNode.getComponent('BusController');

              if (busController) {
                this.listCharacter.push(skModelNode);
              }
            });
          });
        }

        checkCharCanMove() {
          this.scheduleOnce(() => {
            var contCharCanMove = 0;

            for (var i = this.listCharacter.length - 1; i >= 0; i--) {
              var characterNode = this.listCharacter[i];

              if (!characterNode || !characterNode.isValid) {
                this.listCharacter.splice(i, 1);
                continue;
              }

              var busController = characterNode.getComponent('BusController');

              if (!busController) {
                this.listCharacter.splice(i, 1);
                continue;
              }

              var canMove = busController.canMove();

              if (canMove) {
                contCharCanMove++;
              }
            }

            if (this.listCharacter.length === 0) {
              if (this.isEndGame) return;
              console.log("All characters have reached the target, you win! / THẮNG");
              this.showWin();
            } else if (contCharCanMove === 0) {
              if (this.isEndGame) return;
              console.log("No characters can move, game over / THUA");
              this.endGame();
            }
          }, 0.05);
        }

        endGame() {
          if (Gamecontroller.instance.isEndGame) return;
          Gamecontroller.instance.isEndGame = true;
          console.log("GAME LOSE / THUA");
          this.store.active = true;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.emit((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_LOSE);
        }

        showWin() {
          if (Gamecontroller.instance.isEndGame) return;
          Gamecontroller.instance.isEndGame = true;
          console.log("GAME WIN / THẮNG");
          this.store.active = true;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.emit((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN);
        }

        increaseMove() {
          if (this.tapToPlay && this.tapToPlay.active) {
            this.tapToPlay.active = false;
          }

          this.countMove++;
          console.log("Count move: " + this.countMove);
        }

        busCompleted() {
          this.completedBusCount++;
          console.log("Completed bus count: " + this.completedBusCount);

          if (this.completedBusCount === 3 && !this.hasOpenedStoreAtMove3) {
            this.hasOpenedStoreAtMove3 = true;
            input.once(Input.EventType.TOUCH_START, () => {
              // this.store.active = true;
              (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
                error: Error()
              }), GlobalEvent) : GlobalEvent).instance().dispatchEvent((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
                error: Error()
              }), GlobalEvent) : GlobalEvent).OPEN_STORE);
            });
          }
        }

        playBarrierAnimation() {
          if (this.barrierAnim) {
            console.log("[Gamecontroller] 🚪 Playing barrier animation");
            this.barrierAnim.play();
          }
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "map", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tapToPlay", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "barrierAnim", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=12b5a22c084e98fadb1302d9b44f81ef7d14706b.js.map
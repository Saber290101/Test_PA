System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Component, geometry, Input, input, Node, ParticleSystem, PhysicsSystem, tween, Tween, Vec2, Vec3, BusController, Gamecontroller, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, HandleInputListener;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "../Controller/BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "../Controller/Gamecontroller", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Camera = _cc.Camera;
      Component = _cc.Component;
      geometry = _cc.geometry;
      Input = _cc.Input;
      input = _cc.input;
      Node = _cc.Node;
      ParticleSystem = _cc.ParticleSystem;
      PhysicsSystem = _cc.PhysicsSystem;
      tween = _cc.tween;
      Tween = _cc.Tween;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      BusController = _unresolved_2.BusController;
    }, function (_unresolved_3) {
      Gamecontroller = _unresolved_3.Gamecontroller;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "086eaaruXRPyo/KqpwlDex1", "HandleInputListener", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Component', 'EventTouch', 'geometry', 'Input', 'input', 'Node', 'ParticleSystem', 'PhysicsSystem', 'tween', 'Tween', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HandleInputListener", HandleInputListener = (_dec = ccclass('HandleInputListener'), _dec2 = property(Camera), _dec3 = property(Node), _dec4 = property(ParticleSystem), _dec(_class = (_class2 = class HandleInputListener extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "cameraCom", _descriptor, this);

          this._ray = new geometry.Ray();
          this._lastTouchPosition = new Vec2();
          this._isDragging = false;
          this._targetCameraPosition = new Vec3();

          _initializerDefineProperty(this, "effectTouch", _descriptor2, this);

          _initializerDefineProperty(this, "listParticle", _descriptor3, this);
        }

        onEnable() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        onDisable() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        onTouchStart(event) {
          this.showEffectAtTouchPosition(event.touch);
          this.playParticle();
          const touch = event.touch;
          this._isDragging = true;

          this._lastTouchPosition.set(touch.getLocationX(), touch.getLocationY());

          this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        }

        onTouchEnd(event) {
          (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
            error: Error()
          }), Gamecontroller) : Gamecontroller).instance.startCountTime = true;
          const touch = event.touch;
          if (this._isDragging == false) return;
          this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
          const mask = 1 << 1;

          if (PhysicsSystem.instance.raycastClosest(this._ray, mask)) {
            const result = PhysicsSystem.instance.raycastClosestResult;
            const nodeOther = result.collider.node;
            const item = nodeOther.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
              error: Error()
            }), BusController) : BusController);

            if (item) {
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.increaseMove();
              item.onClick();
            }
          }

          this._isDragging = false;
        }

        playParticle() {
          this.listParticle.forEach(particle => {
            particle.clear();
            particle.play();
          });
          Tween.stopAllByTarget(this.node);
          tween(this.node).delay(0.3).call(() => {
            this.listParticle.forEach(particle => {
              particle.stop();
              particle.clear();
            });
          }).start();
        }

        showEffectAtTouchPosition(touch) {
          if (!this.effectTouch) return;
          this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
          const distance = -this._ray.o.y / this._ray.d.y;
          const worldPos = new Vec3();
          Vec3.scaleAndAdd(worldPos, this._ray.o, this._ray.d, distance);
          worldPos.y = 2;
          this.effectTouch.setWorldPosition(worldPos);
          this.effectTouch.active = true;
          Tween.stopAllByTarget(this.effectTouch);
          tween(this.effectTouch).delay(0.3).call(() => {
            this.effectTouch.active = false;
          }).start();
        }

        showWin() {
          this.node.active = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cameraCom", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effectTouch", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "listParticle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c230d1c5035688e997d0c3e1c793fa0c98d8d3fe.js.map
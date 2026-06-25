System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, easing, Node, tween, Vec3, Gamecontroller, BusController, PathBuilder, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GateCheck;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "../Controller/Gamecontroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "../Controller/BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPathBuilder(extras) {
    _reporterNs.report("PathBuilder", "../PathBuilder", _context.meta, extras);
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
      easing = _cc.easing;
      Node = _cc.Node;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Gamecontroller = _unresolved_2.Gamecontroller;
    }, function (_unresolved_3) {
      BusController = _unresolved_3.BusController;
    }, function (_unresolved_4) {
      PathBuilder = _unresolved_4.PathBuilder;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f2ac3zroftH24T7b2YNlPd5", "GateCheck", undefined);

      __checkObsolete__(['_decorator', 'Component', 'easing', 'Node', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GateCheck", GateCheck = (_dec = ccclass('GateCheck'), _dec2 = property(Node), _dec3 = property([Node]), _dec(_class = (_class2 = class GateCheck extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "endPos", _descriptor, this);

          _initializerDefineProperty(this, "speed", _descriptor2, this);

          _initializerDefineProperty(this, "wayPoints", _descriptor3, this);
        }

        /**
         * Xe vào gate → build path đến stop (nếu là bus) hoặc đi hết waypoints → destroy.
         */
        moveCharTotarget(char) {
          const busCtrl = char.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
            error: Error()
          }), BusController) : BusController);
          const stopIdx = busCtrl ? this._resolveStopIdx(busCtrl) : -1;
          const lastIdx = busCtrl && stopIdx >= 0 ? stopIdx : this.wayPoints.length - 1;
          const {
            points,
            wpIndices
          } = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
            error: Error()
          }), PathBuilder) : PathBuilder).buildEntryPath(this, char.worldPosition, lastIdx);

          if (busCtrl && stopIdx >= 0) {
            busCtrl.setGateCheckInfo(this, stopIdx);
            busCtrl.startMovingAlongPath(points, this.speed, wpIndices, () => {
              busCtrl.onReachStopPoint();
            });
          } else {
            this._tweenAlongPath(char, points, () => {
              const bc = char.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
                error: Error()
              }), BusController) : BusController);

              if (bc) {
                (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                  error: Error()
                }), Gamecontroller) : Gamecontroller).instance.busCompleted();
              }

              bc == null || bc.checkAndDestroyIfOutOfViewport();
              char.destroy();
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            });
          }
        }
        /**
         * Xe one-way → nếu bus thì delegate sang moveCharTotarget, nếu không thì đi thẳng.
         */


        moveWithOneWay(char) {
          if (char.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
            error: Error()
          }), BusController) : BusController)) {
            this.moveCharTotarget(char);
            return;
          }

          const dis = Vec3.distance(char.worldPosition, this.endPos.worldPosition);
          const moveTime = dis / this.speed;
          tween(char).to(moveTime, {
            worldPosition: this.endPos.worldPosition
          }, {
            easing: 'linear'
          }).call(() => {
            const bc = char.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
              error: Error()
            }), BusController) : BusController);
            bc == null || bc.checkAndDestroyIfOutOfViewport();
            char.active = false;
          }).start();
        }
        /**
         * Xe từ stop → exit (đi hết waypoints còn lại + endPos → destroy).
         */


        moveCharFromStopToExit(char, stopIdx) {
          const {
            points,
            wpIndices
          } = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
            error: Error()
          }), PathBuilder) : PathBuilder).buildPathToExit(this, char.worldPosition, stopIdx, this.endPos);
          const busCtrl = char.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
            error: Error()
          }), BusController) : BusController);

          if (busCtrl) {
            busCtrl.startMovingAlongPath(points, this.speed, wpIndices, () => {
              busCtrl.checkAndDestroyIfOutOfViewport();
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.busCompleted();
              char.destroy();
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            });
          } else {
            this._tweenAlongPath(char, points, () => {
              char.destroy();
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            });
          }
        } // ─── Private ────────────────────────────────


        _resolveStopIdx(busCtrl) {
          const stopPos = busCtrl.stopNode ? busCtrl.stopNode.worldPosition.clone() : busCtrl.busStop ? busCtrl.busStop.busStopWorldPos.lengthSqr() > 0.01 ? busCtrl.busStop.busStopWorldPos.clone() : busCtrl.busStop.node.worldPosition.clone() : null;
          if (!stopPos) return -1;
          return (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
            error: Error()
          }), PathBuilder) : PathBuilder).findClosestWaypointIdx(this, stopPos);
        }
        /**
         * Tween non-bus chars along path (rotation + linear movement).
         */


        _tweenAlongPath(char, points, onComplete) {
          let moveTween = tween(char);

          for (let i = 0; i < points.length - 1; i++) {
            const startPos = points[i];
            const endPos = points[i + 1];
            const distance = Vec3.distance(startPos, endPos);
            const moveTime = distance / this.speed;
            moveTween.call(() => {
              const dir = new Vec3();
              Vec3.subtract(dir, endPos, char.worldPosition);
              dir.y = 0;

              if (dir.lengthSqr() > 0.01) {
                const targetAngle = Math.atan2(dir.x, dir.z) * 180 / Math.PI;
                const currentEuler = new Vec3();
                char.worldRotation.getEulerAngles(currentEuler);
                let deltaAngle = targetAngle - currentEuler.y;
                if (deltaAngle > 180) deltaAngle -= 360;
                if (deltaAngle < -180) deltaAngle += 360;
                tween(char).by(0.1, {
                  eulerAngles: new Vec3(0, deltaAngle, 0)
                }, {
                  easing: easing.quadOut
                }).start();
              }
            }).to(moveTime, {
              worldPosition: endPos
            }, {
              easing: 'linear'
            });
          }

          moveTween.call(onComplete).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "endPos", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wayPoints", [_dec3], {
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
//# sourceMappingURL=0d017d8d4604d68171788bb7b53a5c00e4df4200.js.map
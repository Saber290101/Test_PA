System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, easing, tween, Vec3, Gamecontroller, RaycastUtils, GateCheck, BusInitialMovement, _crd, SHAKE_INTENSITY;

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "./BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "./Gamecontroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRaycastUtils(extras) {
    _reporterNs.report("RaycastUtils", "../Movement/RaycastUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGateCheck(extras) {
    _reporterNs.report("GateCheck", "../Point/GateCheck", _context.meta, extras);
  }

  _export("BusInitialMovement", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      easing = _cc.easing;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Gamecontroller = _unresolved_2.Gamecontroller;
    }, function (_unresolved_3) {
      RaycastUtils = _unresolved_3.RaycastUtils;
    }, function (_unresolved_4) {
      GateCheck = _unresolved_4.GateCheck;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a1e9825xZlCRoOfPZ7p3XKg", "BusInitialMovement", undefined);

      __checkObsolete__(['easing', 'Node', 'tween', 'Vec3']);

      /** Cường độ rung khi va chạm */
      SHAKE_INTENSITY = 0.15;
      /**
       * Phụ trách logic di chuyển ban đầu (chạy thẳng theo raycast)
       * và xử lý va chạm cơ bản (shake effect).
       */

      _export("BusInitialMovement", BusInitialMovement = class BusInitialMovement {
        constructor(bus) {
          this._bus = void 0;
          this._isMoving = false;
          this._moveDir = new Vec3();
          this._startPos = new Vec3();
          this._targetDist = 0;
          this._distMoved = 0;
          this._nodeClosest = null;
          this._isHitGate = false;
          this._gateCheck = null;
          this._cachedMoveVec = new Vec3();
          this._cachedPos = new Vec3();
          this._bus = bus;
        }

        get isMoving() {
          return this._isMoving;
        }

        startMove() {
          this._isMoving = true;
          this._distMoved = 0;
          this._isHitGate = false;
          this._gateCheck = null;
          this._nodeClosest = null;
          const {
            result,
            direction,
            origin
          } = (_crd && RaycastUtils === void 0 ? (_reportPossibleCrUseOfRaycastUtils({
            error: Error()
          }), RaycastUtils) : RaycastUtils).sweepScan(this._bus.startNode, this._bus.node);

          this._moveDir.set(direction);

          this._startPos = this._bus.node.worldPosition.clone();

          if (!result) {
            // Không đâm gì → xe bay ra khỏi map
            this._bus.setRigidBodyGroup(16);

            this._targetDist = (_crd && RaycastUtils === void 0 ? (_reportPossibleCrUseOfRaycastUtils({
              error: Error()
            }), RaycastUtils) : RaycastUtils).MAX_SCAN_DISTANCE;

            this._bus.viewportChecker.startChecking();
          } else {
            const gateCheck = result.collider.node.getComponent(_crd && GateCheck === void 0 ? (_reportPossibleCrUseOfGateCheck({
              error: Error()
            }), GateCheck) : GateCheck);
            const otherBus = result.collider.node.getComponent('BusController');

            if (otherBus) {
              // Đâm xe khác
              this._nodeClosest = result.collider.node;
              const safeDist = Math.max(0, result.distance - this._bus.safeDistance);
              this._targetDist = safeDist + this._bus.crashOffset;
            } else if (gateCheck) {
              // Đâm gate → delegate cho GateCheck sau khi đến
              this._isHitGate = true;
              this._gateCheck = gateCheck;

              this._bus.setRigidBodyGroup(16);

              this._targetDist = result.distance;
            } else {
              // Đâm obstacle → destroy sau khi đến
              this._nodeClosest = result.collider.node;

              this._bus.setCollidersEnabled(false);

              const safeDist = Math.max(0, result.distance - this._bus.safeDistance);
              this._targetDist = safeDist + this._bus.crashOffset;

              this._bus.scheduleOnce(() => {
                (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                  error: Error()
                }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();

                this._bus.node.destroy();
              }, result.distance / this._bus.moveSpeed);
            }
          }

          (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
            error: Error()
          }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
        }

        update(dt) {
          if (!this._isMoving) return;
          const remaining = this._targetDist - this._distMoved;
          const moveAmount = Math.min(this._bus.moveSpeed * dt, remaining);
          Vec3.multiplyScalar(this._cachedMoveVec, this._moveDir, moveAmount);

          this._cachedPos.set(this._bus.node.worldPosition);

          this._cachedPos.add(this._cachedMoveVec);

          this._bus.node.setWorldPosition(this._cachedPos);

          this._distMoved += moveAmount;

          if (this._distMoved >= this._targetDist) {
            this._isMoving = false;

            this._onReachInitialTarget();
          }
        }

        _onReachInitialTarget() {
          if (this._isHitGate && this._gateCheck) {
            this._bus.setLipActive(false);

            if (!this._bus.isOneWay) {
              this._gateCheck.moveCharTotarget(this._bus.node);
            } else {
              this._gateCheck.moveWithOneWay(this._bus.node);
            }
          } else {
            // Va chạm xe khác hoặc obstacle → lùi về vị trí ban đầu bằng Tween
            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            tween(this._bus.node).to(0.15, {
              worldPosition: this._startPos
            }, {
              easing: easing.quadOut
            }).start();

            if (this._nodeClosest) {
              this._shakeOnImpact(this._nodeClosest, this._moveDir);
            }
          }
        }

        _shakeOnImpact(targetNode, impactDirection) {
          if (!(targetNode != null && targetNode.isValid)) return;
          const origin = targetNode.worldPosition.clone();
          const dir = impactDirection.clone();
          dir.y = 0;
          dir.normalize();
          const offsets = [1, -0.6, 0.3, -0.15, 0];
          const durations = [0.05, 0.05, 0.04, 0.04, 0.03];
          let t = tween(targetNode);

          for (let i = 0; i < offsets.length; i++) {
            const pos = origin.clone().add(dir.clone().multiplyScalar(SHAKE_INTENSITY * offsets[i]));
            t = t.to(durations[i], {
              worldPosition: pos
            }, {
              easing: easing.quadOut
            });
          }

          t.start();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1ba83ae2d5ffca343bd9f5c0faa8281bb85e6306.js.map
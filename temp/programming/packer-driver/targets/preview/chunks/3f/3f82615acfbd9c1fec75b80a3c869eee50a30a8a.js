System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Tween, director, Collider, BusState, _dec, _class, _crd, ccclass, property, PathFollower;

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "../Controller/BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusState(extras) {
    _reporterNs.report("BusState", "../GameEnums", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
      Tween = _cc.Tween;
      director = _cc.director;
      Collider = _cc.Collider;
    }, function (_unresolved_2) {
      BusState = _unresolved_2.BusState;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "73434aaAqVLSYbUoPVzzK9y", "PathFollower", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec3', 'Tween', 'director', 'Collider']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * PathFollower – Component điều khiển di chuyển theo path.
       *
       * Nhiệm vụ chính:
       * - Di chuyển tịnh tiến theo danh sách Vec3
       * - Collision detection (isPathBlocked)
       * - Xoay mặt theo hướng di chuyển
       *
       * Gắn cùng node với BusController.
       */

      _export("PathFollower", PathFollower = (_dec = ccclass('PathFollower'), _dec(_class = class PathFollower extends Component {
        constructor() {
          super(...arguments);
          // ─── Path State ─────────────────────────────
          this._path = [];
          this._wpIndices = [];
          this._pathIdx = -1;
          this._speed = 10;
          this._onComplete = null;
          // ─── Cached Vec3 (tránh GC mỗi frame) ───────
          this._cachedDir = new Vec3();
          this._cachedEuler = new Vec3();
          this._cachedMoveVec = new Vec3();
          this._cachedSnapPos = new Vec3();

          /**
           * Callback được gọi mỗi khi xe đến một waypoint trên path.
           * Truyền vào pathIdx và wpIdx (chỉ số waypoint gốc trong GateCheck).
           */
          this.onReachWaypoint = null;
          // ─── Update Loop ────────────────────────────
          this._tempStopDuration = 0;
          // ─── Collision Detection ────────────────────
          this._cachedBuses = null;
          this._busCacheTime = 0;
        }

        /** Đang di chuyển? */
        get isMoving() {
          return this._path.length > 0 && this._pathIdx >= 0 && this._pathIdx < this._path.length;
        }
        /** Mảng chỉ số waypoint gốc */


        get wpIndices() {
          return this._wpIndices;
        }
        /**
         * Bắt đầu di chuyển theo path.
         */


        startPath(path, speed, wpIndices, onComplete) {
          Tween.stopAllByTarget(this.node);
          this._path = path;
          this._wpIndices = wpIndices;
          this._pathIdx = 0;
          this._speed = speed;
          this._onComplete = onComplete;

          if (path.length > 0) {
            this._rotateTowardsInstant(path[0]);
          }
        }
        /**
         * Dừng path hiện tại (không gọi onComplete).
         */


        stopPath() {
          this._path = [];
          this._pathIdx = -1;
          this._onComplete = null;
        }

        /** Tạm dừng di chuyển trong thời gian nhất định và tắt tạm thời collider */
        tempStop(duration) {
          this._tempStopDuration = duration;
          var busCtrl = this.node.getComponent('BusController');

          if (busCtrl && typeof busCtrl.setCollidersEnabled === 'function') {
            busCtrl.setCollidersEnabled(false);
            this.unschedule(this._reEnableColliders);
            this.scheduleOnce(this._reEnableColliders, duration);
          }
        }

        _reEnableColliders() {
          var busCtrl = this.node.getComponent('BusController');

          if (busCtrl && typeof busCtrl.setCollidersEnabled === 'function') {
            if (this.isMoving) {
              busCtrl.setCollidersEnabled(true);
            }
          }
        }

        update(dt) {
          if (this._tempStopDuration > 0) {
            this._tempStopDuration -= dt;
            return;
          }

          if (!this.isMoving) return;
          var remainingMove = this._speed * dt;

          while (remainingMove > 0 && this.isMoving) {
            if (this._isPathBlocked()) return;
            var targetPos = this._path[this._pathIdx];
            var currentPos = this.node.worldPosition;
            Vec3.subtract(this._cachedDir, targetPos, currentPos);
            this._cachedDir.y = 0;

            var distance = this._cachedDir.length();

            if (distance <= remainingMove) {
              this._cachedSnapPos.set(targetPos);

              this._cachedSnapPos.y = currentPos.y;
              this.node.setWorldPosition(this._cachedSnapPos);
              remainingMove -= distance;
              var _wpIdx = this._wpIndices[this._pathIdx];

              if (this.onReachWaypoint) {
                this.onReachWaypoint(this._pathIdx, _wpIdx);
              }

              this._pathIdx++;

              if (this._pathIdx >= this._path.length) {
                this._path = [];
                var cb = this._onComplete;
                this._onComplete = null;
                if (cb) cb();
                return;
              }
            } else {
              this._cachedDir.normalize();

              var targetAngle = Math.atan2(this._cachedDir.x, this._cachedDir.z) * 180 / Math.PI;
              this.node.worldRotation.getEulerAngles(this._cachedEuler);
              var deltaAngle = targetAngle - this._cachedEuler.y;
              if (deltaAngle > 180) deltaAngle -= 360;
              if (deltaAngle < -180) deltaAngle += 360;
              var turnRatio = 25 * dt;
              var newY = this._cachedEuler.y + deltaAngle * Math.min(turnRatio, 1.0);
              this.node.setRotationFromEuler(this._cachedEuler.x, newY, this._cachedEuler.z);
              Vec3.multiplyScalar(this._cachedMoveVec, this._cachedDir, remainingMove);

              this._cachedSnapPos.set(currentPos);

              this._cachedSnapPos.add(this._cachedMoveVec);

              this.node.setWorldPosition(this._cachedSnapPos);
              remainingMove = 0;
            }
          }
        }

        _isPathBlocked() {
          var scene = director.getScene();
          if (!scene) return false; // Cache danh sách xe mỗi 0.2s thay vì quét scene graph mỗi frame

          this._busCacheTime -= 0.016;

          if (this._busCacheTime <= 0 || !this._cachedBuses) {
            this._cachedBuses = scene.getComponentsInChildren('BusController');
            this._busCacheTime = 0.2;
          }

          var myPos = this.node.worldPosition;
          if (!this.isMoving) return false;
          var myBus = this.node.getComponent('BusController');
          var safeDist = myBus ? myBus.safeDistance : 1.5;
          var myHalfLen = safeDist / 2;
          var pFront = this.getPointAhead(myHalfLen + 0.1);
          var safeRadius = 0.35;

          for (var other of this._cachedBuses) {
            var _other$node;

            if (!(other != null && (_other$node = other.node) != null && _other$node.isValid)) continue;
            if (other.node === this.node) continue;
            if (other.state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).PARKED && other.parkingSlotIndex < 0) continue;
            if (other.isParked) continue;
            var otherPathFollower = other.node.getComponent(PathFollower);
            if (!otherPathFollower) continue;
            var otherPos = other.node.worldPosition;
            var otherEuler = new Vec3();
            other.node.worldRotation.getEulerAngles(otherEuler);
            var otherHalfLen = other.safeDistance / 2;

            var distFrontToOther = this._distToBusBody(pFront, otherPos, otherEuler.y, otherHalfLen);

            if (distFrontToOther < safeRadius) {
              if (otherPathFollower.isMoving) {
                var opFront = otherPathFollower.getPointAhead(otherHalfLen + 0.1);
                var myEuler = new Vec3();
                this.node.worldRotation.getEulerAngles(myEuler);

                var otherFrontToMe = this._distToBusBody(opFront, myPos, myEuler.y, myHalfLen);

                if (otherFrontToMe < safeRadius) {
                  if (this.node.uuid > other.node.uuid) {
                    return true;
                  } else {
                    continue;
                  }
                }
              }

              return true;
            }
          }

          return false;
        } // ─── Advanced Geometry Helpers ────────────────────────

        /** Lấy một điểm dự đoán trên quỹ đạo di chuyển uốn cong */


        getPointAhead(lookAhead) {
          var traveled = 0;
          var currentPoint = this.node.worldPosition.clone();

          if (!this._path || this._pathIdx < 0 || this._pathIdx >= this._path.length) {
            var forward = new Vec3();
            var euler = new Vec3();
            this.node.worldRotation.getEulerAngles(euler);
            var rad = euler.y * Math.PI / 180;
            forward.set(Math.sin(rad), 0, Math.cos(rad));
            return currentPoint.add(forward.multiplyScalar(lookAhead));
          }

          for (var i = this._pathIdx; i < this._path.length; i++) {
            var nextPoint = this._path[i];
            var segmentVec = new Vec3();
            Vec3.subtract(segmentVec, nextPoint, currentPoint);
            segmentVec.y = 0;
            var segmentLen = segmentVec.length();
            if (segmentLen === 0) continue;

            if (traveled + segmentLen >= lookAhead) {
              var remaining = lookAhead - traveled;
              segmentVec.normalize();
              segmentVec.multiplyScalar(remaining);
              currentPoint.add(segmentVec);
              return currentPoint;
            } else {
              traveled += segmentLen;
              currentPoint = nextPoint.clone();
            }
          }

          return currentPoint;
        }
        /** Tính khoảng cách từ 1 điểm đến khung thân xe (Line Segment) dựa trên halfLength thực tế */


        _distToBusBody(point, busPos, busRotY, halfLen) {
          var rad = busRotY * Math.PI / 180;
          var fwd = new Vec3(Math.sin(rad), 0, Math.cos(rad));
          var a = new Vec3();
          var b = new Vec3(); // Thu gọn segment 1 chút (0.1m) ở hai đầu để tính toán capsule mượt mà hơn

          var segmentHalf = Math.max(0.1, halfLen - 0.1);
          Vec3.subtract(a, busPos, fwd.clone().multiplyScalar(segmentHalf));
          Vec3.add(b, busPos, fwd.clone().multiplyScalar(segmentHalf));
          var ab = new Vec3();
          Vec3.subtract(ab, b, a);
          var ap = new Vec3();
          Vec3.subtract(ap, point, a);
          var lenSqr = ab.lengthSqr();
          if (lenSqr === 0) return Vec3.distance(point, a);
          var t = Vec3.dot(ap, ab) / lenSqr;
          t = Math.max(0, Math.min(1, t));
          var closest = new Vec3();
          ab.multiplyScalar(t);
          Vec3.add(closest, a, ab);
          return Vec3.distance(point, closest);
        }

        _rotateTowardsInstant(targetPos) {
          var dir = new Vec3();
          Vec3.subtract(dir, targetPos, this.node.worldPosition);
          dir.y = 0;

          if (dir.lengthSqr() > 0.01) {
            var targetAngle = Math.atan2(dir.x, dir.z) * 180 / Math.PI;
            var currentEuler = new Vec3();
            this.node.worldRotation.getEulerAngles(currentEuler);
            this.node.setRotationFromEuler(currentEuler.x, targetAngle, currentEuler.z);
          }
        } // ─── Lifecycle / Collision ──────────────────


        onLoad() {
          var colliders = this.node.getComponents(Collider);

          for (var c of colliders) {
            c.on('onCollisionEnter', this._onCollisionEnter, this);
          }

          var childColliders = this.node.getComponentsInChildren(Collider);

          for (var _c of childColliders) {
            if (_c.node !== this.node) {
              _c.on('onCollisionEnter', this._onCollisionEnter, this);
            }
          }
        }

        _onCollisionEnter(event) {
          var otherCollider = event.otherCollider;
          if (!otherCollider) return;
          var otherNode = otherCollider.node;
          var otherBus = otherNode.getComponent('BusController') || otherNode.getComponentInParent('BusController');
          if (!otherBus) return;
          var otherPathFollower = otherBus.node.getComponent(PathFollower);
          if (!this.isMoving || !otherPathFollower || !otherPathFollower.isMoving) return;
          var myPos = this.node.worldPosition;
          var otherPos = otherBus.node.worldPosition;
          var distBetween = Vec3.distance(myPos, otherPos);
          console.log("[Collision] Va ch\u1EA1m v\u1EADt l\xFD gi\u1EEFa 2 xe: " + this.node.name + " v\xE0 " + otherBus.node.name + ". Kho\u1EA3ng c\xE1ch: " + distBetween.toFixed(2) + "m"); // Bỏ qua logic so sánh distanceToDestination vì nó gây lỗi khi xe có điểm đến khác nhau.
          // Dùng UUID để làm tie-breaker dứt khoát tránh deadlock hai xe chờ nhau

          if (this.node.uuid > otherBus.node.uuid) {
            console.log("[Collision] UUID l\u1EDBn h\u01A1n -> Xe " + this.node.name + " ch\u1EE7 \u0111\u1ED9ng nh\u01B0\u1EDDng \u0111\u01B0\u1EDDng (d\u1EEBng 0.2s).");
            this.tempStop(0.2);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3f82615acfbd9c1fec75b80a3c869eee50a30a8a.js.map
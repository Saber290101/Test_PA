System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, director, BusStop, Gamecontroller, BusState, PathBuilder, BusRouteManager, _crd, LEFT_LANE_START_IDX;

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "./BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusStop(extras) {
    _reporterNs.report("BusStop", "../BusStop", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGateCheck(extras) {
    _reporterNs.report("GateCheck", "../Point/GateCheck", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "./Gamecontroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusState(extras) {
    _reporterNs.report("BusState", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPathBuilder(extras) {
    _reporterNs.report("PathBuilder", "../Movement/PathBuilder", _context.meta, extras);
  }

  _export("BusRouteManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      director = _cc.director;
    }, function (_unresolved_2) {
      BusStop = _unresolved_2.BusStop;
    }, function (_unresolved_3) {
      Gamecontroller = _unresolved_3.Gamecontroller;
    }, function (_unresolved_4) {
      BusState = _unresolved_4.BusState;
    }, function (_unresolved_5) {
      PathBuilder = _unresolved_5.PathBuilder;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "abc9doaJ7lEmo6C53J/VIkg", "BusRouteManager", undefined);

      __checkObsolete__(['director', 'Vec3']);

      /** Index bắt đầu lane trái khi quay về từ parking */
      LEFT_LANE_START_IDX = 2;
      /**
       * Phụ trách logic tìm đường, quyết định bến đỗ, điểm parking, và điểm ra (Exit) của xe buýt.
       */

      _export("BusRouteManager", BusRouteManager = class BusRouteManager {
        constructor(bus) {
          this._bus = void 0;
          this._gateCheck = null;
          this._stopIdx = -1;
          this._parkingDivertIdx = -1;
          this._allBusStops = [];
          this._currentStopIdx = -1;
          this._currentBusStop = null;
          this._bus = bus;
        }

        get gateCheck() {
          return this._gateCheck;
        }

        get currentStopIdx() {
          return this._currentStopIdx;
        }

        get currentBusStop() {
          return this._currentBusStop;
        }

        get stopIdx() {
          return this._stopIdx;
        }
        /**
         * Cache lại danh sách tất cả các trạm trong scene.
         */


        initializeStops() {
          this._allBusStops = director.getScene().getComponentsInChildren(_crd && BusStop === void 0 ? (_reportPossibleCrUseOfBusStop({
            error: Error()
          }), BusStop) : BusStop);
        }

        setGateCheckInfo(gateCheck, stopIdx) {
          this._gateCheck = gateCheck;
          this._stopIdx = stopIdx;

          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).RUNNING);

          this._bus.setCollidersEnabled(true);
        }

        onReachStopPoint(targetWpIdx) {
          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PICKING);

          this._currentStopIdx = targetWpIdx !== undefined ? targetWpIdx : this._stopIdx;
          this._currentBusStop = this._findBusStopByWpIdx(this._currentStopIdx);

          this._bus.setLipActive(false);

          this._bus.boardingManager.startBoarding();
        } // ─── Drive Actions ──────────────────────────────


        driveToExit() {
          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).EXITING);

          this._bus.setLipActive(true);

          const startIdx = this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;

          if (this._gateCheck && startIdx >= 0) {
            this._gateCheck.moveCharFromStopToExit(this._bus.node, startIdx);
          } else {
            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.busCompleted();
            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();

            this._bus.node.destroy();
          }
        }

        driveToParking() {
          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).RETURNING);

          this._bus.setCollidersEnabled(true);

          if (!this._bus.parkingManager) return;

          const slotIndex = this._bus.parkingManager.findFreeSlot();

          if (slotIndex < 0) {
            console.log("GAME LOSE: Parking is full and no more passengers can be picked up. / THUA");
            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.endGame();
            return;
          }

          this._bus.parkingSlotIndex = slotIndex;

          this._bus.parkingManager.occupySlot(slotIndex, this._bus);

          const slotPos = this._bus.parkingManager.getSlotPosition(slotIndex);

          const fromIdx = this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;

          if (this._gateCheck && fromIdx >= 0) {
            const {
              points,
              wpIndices,
              divertIdx
            } = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
              error: Error()
            }), PathBuilder) : PathBuilder).buildPathToParking(this._gateCheck, this._bus.node.worldPosition, fromIdx, slotPos);
            this._parkingDivertIdx = divertIdx;

            this._movePath(points, wpIndices, () => this._onParked());
          } else {
            this._moveTo(slotPos, () => this._onParked());
          }
        }

        driveToNextStop(nextStopIdx) {
          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).RUNNING);

          if (this._gateCheck && this._currentStopIdx >= 0) {
            const {
              points,
              wpIndices
            } = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
              error: Error()
            }), PathBuilder) : PathBuilder).buildWaypointPath(this._gateCheck, this._bus.node.worldPosition, this._currentStopIdx, nextStopIdx);
            this._currentStopIdx = nextStopIdx;
            this._currentBusStop = this._findBusStopByWpIdx(nextStopIdx);

            this._movePath(points, wpIndices, () => this._onArriveAtStop());
          }
        }

        handleDriveFromParking() {
          if (this._gateCheck && this._stopIdx >= 0) {
            let divertIdx = this._parkingDivertIdx;

            if (divertIdx < 0) {
              divertIdx = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
                error: Error()
              }), PathBuilder) : PathBuilder).findClosestWaypointIdx(this._gateCheck, this._bus.node.worldPosition);
            }

            if (divertIdx >= 0) {
              let targetStopIdx = this.findAvailableStopIdx();
              if (targetStopIdx < 0) targetStopIdx = this._stopIdx;
              const {
                points,
                wpIndices
              } = (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
                error: Error()
              }), PathBuilder) : PathBuilder).buildPathFromParking(this._gateCheck, this._bus.node.worldPosition, divertIdx, targetStopIdx, LEFT_LANE_START_IDX);
              this._currentStopIdx = targetStopIdx;
              this._currentBusStop = this._findBusStopByWpIdx(targetStopIdx);

              this._movePath(points, wpIndices, () => this._onArriveAtStop());

              return;
            }
          } // Fallback: đi thẳng đến stop node


          const stopPos = this.getStopWorldPos();

          if (stopPos) {
            this._moveTo(stopPos, () => this._onArriveAtStop());
          }
        } // ─── Private Query & Helpers ─────────────────────


        _movePath(points, wpIndices, onComplete) {
          this._bus.pathFollower.startPath(points, this._bus.speed, wpIndices, onComplete);
        }

        _moveTo(targetPos, onComplete) {
          const path = [this._bus.node.worldPosition.clone(), targetPos];

          this._bus.pathFollower.startPath(path, this._bus.speed, [-1, -1], onComplete);
        }

        _onParked() {
          this._bus.isParked = true;

          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED);

          this._bus.setRigidBodyGroup(2);
        }

        _onArriveAtStop() {
          this._bus.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PICKING);

          this._bus.setLipActive(false);

          this._bus.boardingManager.startBoarding();
        }

        _findBusStopByWpIdx(wpIdx) {
          return this._allBusStops.find(s => this._getStopWaypointIndex(s) === wpIdx) || this._bus.busStop;
        }

        _getStopWaypointIndex(stop) {
          if (stop.waypointIndex >= 0) return stop.waypointIndex;
          if (!this._gateCheck) return -1;
          return (_crd && PathBuilder === void 0 ? (_reportPossibleCrUseOfPathBuilder({
            error: Error()
          }), PathBuilder) : PathBuilder).findClosestWaypointIdx(this._gateCheck, stop.node.worldPosition);
        }

        findNextStopIdx(currentIdx) {
          if (!this._gateCheck) return -1;
          let bestIdx = -1;
          let minWp = Infinity;

          for (const stop of this._allBusStops) {
            const wpIdx = this._getStopWaypointIndex(stop);

            if (wpIdx > currentIdx && wpIdx < minWp && stop.hasPassengerColor(this._bus.busColor)) {
              minWp = wpIdx;
              bestIdx = wpIdx;
            }
          }

          return bestIdx;
        }

        findAvailableStopIdx() {
          if (!this._gateCheck) return -1;
          let bestIdx = -1;
          let minWp = Infinity;

          for (const stop of this._allBusStops) {
            const wpIdx = this._getStopWaypointIndex(stop);

            if (wpIdx >= 0 && wpIdx < minWp && stop.hasPassengerColor(this._bus.busColor) && !this._isStopOccupied(wpIdx)) {
              minWp = wpIdx;
              bestIdx = wpIdx;
            }
          }

          return bestIdx >= 0 ? bestIdx : this.findNextStopIdx(-1);
        }

        _isStopOccupied(stopWpIdx) {
          const scene = director.getScene();
          if (!scene) return false;

          for (const other of scene.getComponentsInChildren('BusController')) {
            if (other === this._bus) continue;

            if (other.state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).PICKING) {
              const idx = other.routeManager.currentStopIdx >= 0 ? other.routeManager.currentStopIdx : other.routeManager.stopIdx;
              if (idx === stopWpIdx) return true;
            }

            if (other.state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).RUNNING || other.state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).ENTERING) {
              if (other.routeManager.getTargetStopWaypointIndex() === stopWpIdx) return true;
            }
          }

          return false;
        }

        getTargetStopWaypointIndex() {
          switch (this._bus.state) {
            case (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).PICKING:
            case (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).RUNNING:
            case (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).ENTERING:
              return this._currentStopIdx >= 0 ? this._currentStopIdx : this._stopIdx;

            case (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
              error: Error()
            }), BusState) : BusState).PARKED:
              if (this._bus.isParked) {
                const idx = this.findNextStopIdx(-1);
                return idx >= 0 ? idx : this._stopIdx;
              }

              return this._stopIdx;

            default:
              return -1;
          }
        }

        getStopWorldPos() {
          if (this._bus.stopNode) return this._bus.stopNode.worldPosition.clone();

          if (this._bus.busStop) {
            return this._bus.busStop.busStopWorldPos.lengthSqr() > 0.01 ? this._bus.busStop.busStopWorldPos.clone() : this._bus.busStop.node.worldPosition.clone();
          }

          return null;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4349b431a675b7c9be4f8140baa3fac74363fd5b.js.map
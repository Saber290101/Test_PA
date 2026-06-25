System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, CCFloat, CCBoolean, RigidBody, Enum, Collider, Tween, BusStop, ParkingManager, BusColor, BusState, ColorManager, RaycastUtils, Gamecontroller, BusInitialMovement, BusBoardingManager, BusRouteManager, ViewportChecker, BusAnimationManager, PathFollower, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _crd, ccclass, property, BusController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBusStop(extras) {
    _reporterNs.report("BusStop", "../BusStop", _context.meta, extras);
  }

  function _reportPossibleCrUseOfParkingManager(extras) {
    _reporterNs.report("ParkingManager", "./ParkingManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusColor(extras) {
    _reporterNs.report("BusColor", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusState(extras) {
    _reporterNs.report("BusState", "../GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorManager(extras) {
    _reporterNs.report("ColorManager", "./ColorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRaycastUtils(extras) {
    _reporterNs.report("RaycastUtils", "../Movement/RaycastUtils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGateCheck(extras) {
    _reporterNs.report("GateCheck", "../Point/GateCheck", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "./Gamecontroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusInitialMovement(extras) {
    _reporterNs.report("BusInitialMovement", "./BusInitialMovement", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusBoardingManager(extras) {
    _reporterNs.report("BusBoardingManager", "./BusBoardingManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusRouteManager(extras) {
    _reporterNs.report("BusRouteManager", "./BusRouteManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfViewportChecker(extras) {
    _reporterNs.report("ViewportChecker", "./ViewportChecker", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusAnimationManager(extras) {
    _reporterNs.report("BusAnimationManager", "./BusAnimationManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPathFollower(extras) {
    _reporterNs.report("PathFollower", "../Movement/PathFollower", _context.meta, extras);
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
      CCFloat = _cc.CCFloat;
      CCBoolean = _cc.CCBoolean;
      RigidBody = _cc.RigidBody;
      Enum = _cc.Enum;
      Collider = _cc.Collider;
      Tween = _cc.Tween;
    }, function (_unresolved_2) {
      BusStop = _unresolved_2.BusStop;
    }, function (_unresolved_3) {
      ParkingManager = _unresolved_3.ParkingManager;
    }, function (_unresolved_4) {
      BusColor = _unresolved_4.BusColor;
      BusState = _unresolved_4.BusState;
    }, function (_unresolved_5) {
      ColorManager = _unresolved_5.ColorManager;
    }, function (_unresolved_6) {
      RaycastUtils = _unresolved_6.RaycastUtils;
    }, function (_unresolved_7) {
      Gamecontroller = _unresolved_7.Gamecontroller;
    }, function (_unresolved_8) {
      BusInitialMovement = _unresolved_8.BusInitialMovement;
    }, function (_unresolved_9) {
      BusBoardingManager = _unresolved_9.BusBoardingManager;
    }, function (_unresolved_10) {
      BusRouteManager = _unresolved_10.BusRouteManager;
    }, function (_unresolved_11) {
      ViewportChecker = _unresolved_11.ViewportChecker;
    }, function (_unresolved_12) {
      BusAnimationManager = _unresolved_12.BusAnimationManager;
    }, function (_unresolved_13) {
      PathFollower = _unresolved_13.PathFollower;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "27827vpGDJG/YFYFCXYS2k/", "BusController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'CCFloat', 'CCBoolean', 'RigidBody', 'Enum', 'Collider', 'Tween', 'Vec3']); // ─── Sub-modules ────────────────────────────────


      ({
        ccclass,
        property
      } = _decorator);

      _export("BusController", BusController = (_dec = ccclass('BusController'), _dec2 = property({
        type: Node,
        tooltip: 'Node gốc chứa hướng di chuyển (forward = hướng bắn ray)'
      }), _dec3 = property({
        type: Node,
        tooltip: 'Node lip (nắp xe / indicator)'
      }), _dec4 = property({
        type: Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
          error: Error()
        }), BusColor) : BusColor),
        tooltip: 'Màu xe buýt'
      }), _dec5 = property({
        tooltip: 'Tốc độ di chuyển khi bắn thẳng (initial move)'
      }), _dec6 = property({
        tooltip: 'Khoảng cách an toàn khi bắn thẳng (raycast)'
      }), _dec7 = property(CCBoolean), _dec8 = property(CCBoolean), _dec9 = property({
        tooltip: 'Sức chứa tối đa (4, 6, hoặc 10)'
      }), _dec10 = property({
        type: Node,
        tooltip: 'Vị trí dừng đón khách (kéo Node trên đường vào)'
      }), _dec11 = property({
        type: _crd && BusStop === void 0 ? (_reportPossibleCrUseOfBusStop({
          error: Error()
        }), BusStop) : BusStop,
        tooltip: 'Bến xe tương ứng'
      }), _dec12 = property({
        type: _crd && ParkingManager === void 0 ? (_reportPossibleCrUseOfParkingManager({
          error: Error()
        }), ParkingManager) : ParkingManager,
        tooltip: 'Quản lý parking'
      }), _dec13 = property(CCFloat), _dec14 = property(CCFloat), _dec15 = property({
        tooltip: 'Delay giữa mỗi lần đón khách (giây)'
      }), _dec(_class = (_class2 = class BusController extends Component {
        constructor(...args) {
          super(...args);

          // ─── Inspector: Vehicle Identity ────────────────
          _initializerDefineProperty(this, "startNode", _descriptor, this);

          _initializerDefineProperty(this, "lip", _descriptor2, this);

          _initializerDefineProperty(this, "busColor", _descriptor3, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor4, this);

          _initializerDefineProperty(this, "safeDistance", _descriptor5, this);

          _initializerDefineProperty(this, "isOneWay", _descriptor6, this);

          _initializerDefineProperty(this, "isCharIntro", _descriptor7, this);

          // ─── Inspector: Bus Config ──────────────────────
          this.passengerSeats = [];

          _initializerDefineProperty(this, "maxPassengers", _descriptor8, this);

          _initializerDefineProperty(this, "stopNode", _descriptor9, this);

          _initializerDefineProperty(this, "busStop", _descriptor10, this);

          _initializerDefineProperty(this, "parkingManager", _descriptor11, this);

          _initializerDefineProperty(this, "speed", _descriptor12, this);

          _initializerDefineProperty(this, "crashOffset", _descriptor13, this);

          _initializerDefineProperty(this, "boardingDelay", _descriptor14, this);

          // ─── Runtime State ──────────────────────────────
          this.currentPassengers = 0;
          this.parkingSlotIndex = -1;
          this.isBoardingPassengers = false;
          this.isParked = false;
          this._state = (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED;
          this._pathFollower = null;
          // ─── Sub-modules Instances ──────────────────────
          this.initialMovement = void 0;
          this.boardingManager = void 0;
          this.routeManager = void 0;
          this.viewportChecker = void 0;
          this.animationManager = void 0;
        }

        // ─── Lifecycle ──────────────────────────────────
        onLoad() {
          this._pathFollower = this.getComponent(_crd && PathFollower === void 0 ? (_reportPossibleCrUseOfPathFollower({
            error: Error()
          }), PathFollower) : PathFollower);
          this._state = (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED; // Khởi tạo các sub-modules

          this.initialMovement = new (_crd && BusInitialMovement === void 0 ? (_reportPossibleCrUseOfBusInitialMovement({
            error: Error()
          }), BusInitialMovement) : BusInitialMovement)(this);
          this.boardingManager = new (_crd && BusBoardingManager === void 0 ? (_reportPossibleCrUseOfBusBoardingManager({
            error: Error()
          }), BusBoardingManager) : BusBoardingManager)(this);
          this.routeManager = new (_crd && BusRouteManager === void 0 ? (_reportPossibleCrUseOfBusRouteManager({
            error: Error()
          }), BusRouteManager) : BusRouteManager)(this);
          this.viewportChecker = new (_crd && ViewportChecker === void 0 ? (_reportPossibleCrUseOfViewportChecker({
            error: Error()
          }), ViewportChecker) : ViewportChecker)(this.node);
          this.animationManager = new (_crd && BusAnimationManager === void 0 ? (_reportPossibleCrUseOfBusAnimationManager({
            error: Error()
          }), BusAnimationManager) : BusAnimationManager)(this);
          this.boardingManager.autoDiscoverSeats();
          this.animationManager.initialize();
        }

        start() {
          var _instance;

          // Áp dụng màu cho xe
          (_instance = (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) == null || _instance.applyColorToNode(this.node, this.busColor);
          this.routeManager.initializeStops();
          this.boardingManager.hideAllSeats();
          this.animationManager.updateState(this._state); // Đăng ký callback khi PathFollower đến waypoint

          if (this.pathFollower) {
            this.pathFollower.onReachWaypoint = this._onReachWaypoint.bind(this);
          } // Auto-start cho intro


          if (this.isCharIntro) {
            this.scheduleOnce(() => {
              if (this.isCharIntro) this.onClick();
            }, 0.75);
          }
        }

        update(dt) {
          this.initialMovement.update(dt);
          this.viewportChecker.update();
        }

        get state() {
          return this._state;
        }

        setState(newState) {
          this._state = newState;
          this.animationManager.updateState(this._state);
        }

        get pathFollower() {
          if (!this._pathFollower) this._pathFollower = this.getComponent(_crd && PathFollower === void 0 ? (_reportPossibleCrUseOfPathFollower({
            error: Error()
          }), PathFollower) : PathFollower);
          return this._pathFollower;
        }

        onClick() {
          var _this$pathFollower;

          if (this.initialMovement.isMoving) return;
          if ((_this$pathFollower = this.pathFollower) != null && _this$pathFollower.isMoving) return;

          if (this._state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED && this.isParked) {
            this.onClickParking();
            return;
          }

          if (this._state !== (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).PARKED) return;
          Tween.stopAllByTarget(this.node);
          this.initialMovement.startMove();
        }

        onClickParking() {
          if (!this.isParked || this.isBoardingPassengers) return;
          this.isParked = false;
          this.setState((_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).ENTERING);
          this.setCollidersEnabled(true);

          if (this.parkingManager && this.parkingSlotIndex >= 0) {
            this.parkingManager.freeSlot(this.parkingSlotIndex);
            this.parkingSlotIndex = -1;
          }

          this.routeManager.handleDriveFromParking();
        }

        canMove() {
          var _this$node;

          if (!((_this$node = this.node) != null && _this$node.isValid)) return false;
          return (_crd && RaycastUtils === void 0 ? (_reportPossibleCrUseOfRaycastUtils({
            error: Error()
          }), RaycastUtils) : RaycastUtils).canMove(this.startNode, this.safeDistance);
        }

        setGateCheckInfo(gateCheck, stopIdx) {
          this.routeManager.setGateCheckInfo(gateCheck, stopIdx);
        }

        onReachStopPoint() {
          this.routeManager.onReachStopPoint();
        }

        startMovingAlongPath(path, speed, wpIndices, onComplete) {
          this.pathFollower.startPath(path, speed, wpIndices, onComplete);
        }

        checkAndDestroyIfOutOfViewport() {
          this.viewportChecker.startChecking();
        }

        setLipActive(active) {
          if (this.lip) this.lip.active = active;
        }

        setRigidBodyGroup(group) {
          const rb = this.node.getComponent(RigidBody);
          if (rb) rb.group = group;
        }

        setCollidersEnabled(enabled) {
          const colliders = this.node.getComponents(Collider);

          for (const c of colliders) {
            c.enabled = enabled;
          }

          const childColliders = this.node.getComponentsInChildren(Collider);

          for (const c of childColliders) {
            c.enabled = enabled;
          }
        }

        _onReachWaypoint(pathIdx, wpIdx) {
          const gateCheck = this.routeManager.gateCheck;

          if (this._state === (_crd && BusState === void 0 ? (_reportPossibleCrUseOfBusState({
            error: Error()
          }), BusState) : BusState).EXITING && gateCheck && gateCheck.wayPoints.length >= 2 && wpIdx === gateCheck.wayPoints.length - 2) {
            var _instance2;

            (_instance2 = (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance) == null || _instance2.playBarrierAnimation();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "busColor", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).RED;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "safeDistance", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isOneWay", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "isCharIntro", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxPassengers", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 4;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "stopNode", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "busStop", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "parkingManager", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "crashOffset", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "boardingDelay", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=29e6b9e715456973d611ed35fe85b2e1c047f3a0.js.map
System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, Label, PassengerController, ColorManager, PassengerSpawner, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, BusStop;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPassengerController(extras) {
    _reporterNs.report("PassengerController", "./Controller/PassengerController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusColor(extras) {
    _reporterNs.report("BusColor", "./GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorManager(extras) {
    _reporterNs.report("ColorManager", "./Controller/ColorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPassengerSpawner(extras) {
    _reporterNs.report("PassengerSpawner", "./PassengerSpawner", _context.meta, extras);
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
      tween = _cc.tween;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      PassengerController = _unresolved_2.PassengerController;
    }, function (_unresolved_3) {
      ColorManager = _unresolved_3.ColorManager;
    }, function (_unresolved_4) {
      PassengerSpawner = _unresolved_4.PassengerSpawner;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "02c36pVo7dMr5PmG0cO1Ks1", "BusStop", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Vec3', 'tween', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Bến xe – nơi sinh ra hành khách, đứng nối nhau thành 1 hàng.
       * index 0 = đầu hàng (gần đường nhất).
       */

      _export("BusStop", BusStop = (_dec = ccclass('BusStop'), _dec2 = property({
        type: [_crd && PassengerController === void 0 ? (_reportPossibleCrUseOfPassengerController({
          error: Error()
        }), PassengerController) : PassengerController],
        tooltip: 'Danh sách hành khách (kéo thả thủ công)'
      }), _dec3 = property({
        type: Label,
        tooltip: 'Text hiển thị số lượng stickman'
      }), _dec4 = property({
        tooltip: 'Khoảng cách giữa hành khách'
      }), _dec5 = property({
        tooltip: 'Hướng hàng kéo dài'
      }), _dec6 = property({
        tooltip: 'Waypoint index tương ứng trên đường'
      }), _dec7 = property({
        tooltip: 'Vị trí xe dừng đón (world)'
      }), _dec(_class = (_class2 = class BusStop extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "passengers", _descriptor, this);

          _initializerDefineProperty(this, "countLabel", _descriptor2, this);

          _initializerDefineProperty(this, "spacing", _descriptor3, this);

          _initializerDefineProperty(this, "queueDirection", _descriptor4, this);

          _initializerDefineProperty(this, "waypointIndex", _descriptor5, this);

          _initializerDefineProperty(this, "busStopWorldPos", _descriptor6, this);
        }

        start() {
          const cm = (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance;
          this.passengers.forEach((p, i) => {
            if (!p) return;

            this._alignPassenger(p, i);

            if (cm != null && cm.randomizeColors) {
              p.passengerColor = cm.getRandomConfiguredColor();
              cm.applyStickmanColor(p.node, p.passengerColor);
            }
          });

          this._updateCountLabel();
        } // ─── public API ──────────────────────────────


        addPassenger(p) {
          const idx = this.passengers.length;
          this.passengers.push(p);
          p.node.setParent(this.node);

          this._alignPassenger(p, idx);

          this._updateCountLabel();
        }

        peekFront() {
          var _this$passengers$;

          return (_this$passengers$ = this.passengers[0]) != null ? _this$passengers$ : null;
        }

        hasPassengerColor(c) {
          return this.passengers.some(p => p.passengerColor === c);
        }

        popFront() {
          var _instance;

          if (!this.passengers.length) return null;
          const p = this.passengers.shift();

          this._slideForward();

          (_instance = (_crd && PassengerSpawner === void 0 ? (_reportPossibleCrUseOfPassengerSpawner({
            error: Error()
          }), PassengerSpawner) : PassengerSpawner).instance) == null || _instance.onPassengerDeparted(this);

          this._updateCountLabel();

          return p;
        }

        isEmpty() {
          return this.passengers.length === 0;
        }

        count() {
          return this.passengers.length;
        } // ─── internal ────────────────────────────────


        _updateCountLabel() {
          if (this.countLabel) {
            let total = this.passengers.length;

            if ((_crd && PassengerSpawner === void 0 ? (_reportPossibleCrUseOfPassengerSpawner({
              error: Error()
            }), PassengerSpawner) : PassengerSpawner).instance) {
              total += (_crd && PassengerSpawner === void 0 ? (_reportPossibleCrUseOfPassengerSpawner({
                error: Error()
              }), PassengerSpawner) : PassengerSpawner).instance.getRemainingCount(this);
            }

            this.countLabel.string = total.toString();
          }
        }

        _slideForward() {
          this.passengers.forEach((p, i) => {
            p.playWalk();
            tween(p.node).to(0.1, {
              position: this._getSlotLocalPosition(i)
            }, {
              easing: 'sineInOut'
            }).call(() => p.playIdle()).start();
          });
        }

        _getSlotLocalPosition(index) {
          return new Vec3(this.queueDirection.x * index * this.spacing, 0, this.queueDirection.z * index * this.spacing);
        } // ─── Bus Jam helpers ─────────────────────────


        getMatchingCount(color) {
          return this.passengers.filter(p => p.passengerColor === color).length;
        }

        _alignPassenger(p, index) {
          p.node.setPosition(this._getSlotLocalPosition(index));
          const faceDir = new Vec3(-this.queueDirection.x, 0, -this.queueDirection.z);

          if (faceDir.lengthSqr() > 0.01) {
            const angle = Math.atan2(faceDir.x, faceDir.z) * (180 / Math.PI);
            p.node.setRotationFromEuler(0, angle, 0);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "passengers", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "countLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spacing", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.55;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "queueDirection", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(1, 0, 0);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "waypointIndex", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return -1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "busStopWorldPos", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3();
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c158c3fd01486ecc33cae848afdde9aefcd59a78.js.map
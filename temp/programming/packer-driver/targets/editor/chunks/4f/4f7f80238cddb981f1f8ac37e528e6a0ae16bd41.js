System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, instantiate, Enum, director, PassengerController, BusColor, ColorManager, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, PassengerSpawner;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPassengerController(extras) {
    _reporterNs.report("PassengerController", "./Controller/PassengerController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusStop(extras) {
    _reporterNs.report("BusStop", "./BusStop", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusColor(extras) {
    _reporterNs.report("BusColor", "./GameEnums", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorManager(extras) {
    _reporterNs.report("ColorManager", "./Controller/ColorManager", _context.meta, extras);
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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Enum = _cc.Enum;
      director = _cc.director;
    }, function (_unresolved_2) {
      PassengerController = _unresolved_2.PassengerController;
    }, function (_unresolved_3) {
      BusColor = _unresolved_3.BusColor;
    }, function (_unresolved_4) {
      ColorManager = _unresolved_4.ColorManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5be72+M+LVOrLsL6J6x2qmR", "PassengerSpawner", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'Vec3', 'instantiate', 'Enum', 'director']);

      ({
        ccclass,
        property
      } = _decorator);
      Enum(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
        error: Error()
      }), BusColor) : BusColor);

      _export("PassengerSpawner", PassengerSpawner = (_dec = ccclass('PassengerSpawner'), _dec2 = property({
        type: Prefab,
        tooltip: 'Prefab Stickman (phải có PassengerController)'
      }), _dec(_class = (_class2 = (_class3 = class PassengerSpawner extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "stickmanPrefab", _descriptor, this);

          this.autoSpawn = true;
          this.maxVisibleQueue = 10;
          this._remainingPassengerColors = new Map();
        }

        onLoad() {
          PassengerSpawner.instance = this;
        }

        onDestroy() {
          if (PassengerSpawner.instance === this) {
            PassengerSpawner.instance = null;
          }
        }

        start() {
          console.log(`[Spawner] 🏁 start() — autoSpawn=${this.autoSpawn}, prefab=${this.stickmanPrefab ? 'OK' : 'MISSING!'}`);

          if (this.autoSpawn) {
            // Delay 0.1s để chờ tất cả component khác (BusStop, ColorManager) init xong
            this.scheduleOnce(() => {
              this.spawnAll();
            }, 0.1);
          }
        }

        spawnAll() {
          var _director$getScene;

          const stops = ((_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.getComponentsInChildren('BusStop')) || [];

          if (stops.length === 0) {
            console.warn('[Spawner] ⚠️ Không tìm thấy BusStop nào trong Scene!');
            return;
          }

          const colorGroups = this._generateGlobalColorGroups();

          if (colorGroups.length === 0) {
            console.warn('[Spawner] ⚠️ Bể màu trống (không tìm thấy xe buýt hoặc xe không có chỗ ngồi)!');
            return;
          } // Khởi tạo hàng đợi cho từng bến


          const stopQueues = new Map();

          for (const stop of stops) {
            stopQueues.set(stop, []);
          } // Phân phối nguyên nhóm màu vào các bến luân phiên để tránh khách bị lẻ 1 màu


          let stopIdx = 0;

          for (const group of colorGroups) {
            const stop = stops[stopIdx % stops.length];
            stopQueues.get(stop).push(...group);
            stopIdx++;
          } // Lưu trữ vào _remainingPassengerColors và tiến hành sinh đợt đầu


          this._remainingPassengerColors = stopQueues;

          for (const stop of stops) {
            const queue = this._remainingPassengerColors.get(stop) || [];
            const initialSpawnCount = Math.min(queue.length, this.maxVisibleQueue);
            const initialColors = queue.splice(0, initialSpawnCount);

            for (const color of initialColors) {
              this.spawnAt(stop, color);
            }

            console.log(`[Spawner] 🧍 Khởi tạo bến "${stop.node.name}": sinh ${initialSpawnCount} khách, còn lại ${queue.length} trong hàng chờ.`);
          }
        }

        onPassengerDeparted(busStop) {
          var _this$_remainingPasse;

          const nextColor = (_this$_remainingPasse = this._remainingPassengerColors.get(busStop)) == null ? void 0 : _this$_remainingPasse.shift();

          if (nextColor !== undefined) {
            this.spawnAt(busStop, nextColor);
          }
        }

        getRemainingCount(busStop) {
          var _this$_remainingPasse2;

          return ((_this$_remainingPasse2 = this._remainingPassengerColors.get(busStop)) == null ? void 0 : _this$_remainingPasse2.length) || 0;
        }

        spawnAt(busStop, color) {
          if (!this.stickmanPrefab) return null;
          const node = instantiate(this.stickmanPrefab);
          const passenger = node.getComponent(_crd && PassengerController === void 0 ? (_reportPossibleCrUseOfPassengerController({
            error: Error()
          }), PassengerController) : PassengerController) || node.addComponent(_crd && PassengerController === void 0 ? (_reportPossibleCrUseOfPassengerController({
            error: Error()
          }), PassengerController) : PassengerController);
          passenger.passengerColor = color;
          if ((_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance.applyStickmanColor(node, color);else passenger.init(color);
          busStop.addPassenger(passenger);
          return passenger;
        }
        /**
         * Sinh nhiều khách tại 1 bến.
         */


        spawnBatch(busStop, colors) {
          const results = colors.map(color => this.spawnAt(busStop, color)).filter(p => p !== null);
          console.log(`[Spawner] 🧍 Spawned ${results.length} passengers at "${busStop.node.name}"`);
          return results;
        }
        /**
         * Sinh thêm 1 khách random tại bến.
         */


        spawnRandom(busStop) {
          return this.spawnAt(busStop, this._getRandomColor());
        } // ─── Helpers ─────────────────────────────────


        _getRandomColor() {
          if ((_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) {
            return (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
              error: Error()
            }), ColorManager) : ColorManager).instance.getRandomConfiguredColor();
          }

          const all = [(_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).RED, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).BLUE, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).YELLOW, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).GREEN, (_crd && BusColor === void 0 ? (_reportPossibleCrUseOfBusColor({
            error: Error()
          }), BusColor) : BusColor).PURPLE];
          return all[Math.floor(Math.random() * all.length)];
        }

        _generateGlobalColorGroups() {
          var _director$getScene2;

          const groups = [];
          const buses = ((_director$getScene2 = director.getScene()) == null ? void 0 : _director$getScene2.getComponentsInChildren('BusController')) || [];

          for (const bus of buses) {
            let count = bus.maxPassengers || 4;
            const color = bus.busColor; // Chia hành khách của xe này thành các nhóm nhỏ (2-4 người) để tránh lẻ tẻ 1 màu

            while (count > 0) {
              let groupSize = 2; // Mặc định

              if (count >= 4) {
                groupSize = Math.floor(Math.random() * 3) + 2; // random 2, 3, or 4
              } else if (count === 3) {
                groupSize = 3;
              } else {
                groupSize = count; // Nếu còn 1 hoặc 2 thì lấy nốt
              } // Tránh tình trạng nhóm này lấy xong làm thừa lại đúng 1 người


              if (count - groupSize === 1) {
                groupSize -= 1;
              }

              const group = Array(groupSize).fill(color);
              groups.push(group);
              count -= groupSize;
            }
          } // Trộn ngẫu nhiên các nhóm (thay vì trộn từng người lẻ)


          for (let i = groups.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [groups[i], groups[j]] = [groups[j], groups[i]];
          } // Đảm bảo nhóm màu của xe buýt đầu tiên nằm ở đầu tiên để người chơi có thể chơi ngay


          if (buses.length > 0) {
            const firstBusColor = buses[0].busColor;
            const idx = groups.findIndex(g => g[0] === firstBusColor);

            if (idx >= 0) {
              const firstGroup = groups.splice(idx, 1)[0];
              groups.unshift(firstGroup);
            }
          }

          return groups;
        }

      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stickmanPrefab", [_dec2], {
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
//# sourceMappingURL=4f7f80238cddb981f1f8ac37e528e6a0ae16bd41.js.map
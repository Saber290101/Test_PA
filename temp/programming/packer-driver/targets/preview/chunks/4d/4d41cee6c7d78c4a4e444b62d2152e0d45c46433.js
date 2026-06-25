System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, ParkingManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "./BusController", _context.meta, extras);
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
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8a217cPUq1FRLMho8cTJy1M", "ParkingManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ParkingManager", ParkingManager = (_dec = ccclass('ParkingManager'), _dec2 = property({
        type: [Node],
        tooltip: 'Danh sách các Node ô đậu xe (kéo thả từ Scene)'
      }), _dec(_class = (_class2 = class ParkingManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "parkingSlots", _descriptor, this);

          // Lưu trạng thái: slot index → BusController đang đậu (null = trống)
          this._slotOccupants = [];
        }

        onLoad() {
          this._slotOccupants = this.parkingSlots.map(() => null);
          console.log("[Parking] \uD83C\uDD7F\uFE0F Initialized " + this.parkingSlots.length + " slots");
        }
        /**
         * Tìm ô đậu trống gần nhất với vị trí cho trước.
         * @returns index slot, -1 nếu hết chỗ.
         */


        findNearestFreeSlot(worldPos) {
          var bestIdx = -1;
          var bestDist = Infinity;

          for (var i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] !== null) continue; // Đã có xe

            var slotPos = this.parkingSlots[i].worldPosition;
            var dist = Vec3.distance(worldPos, slotPos);

            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = i;
            }
          }

          return bestIdx;
        }
        /**
         * Tìm ô đậu trống bất kỳ (theo thứ tự).
         * @returns index slot, -1 nếu hết chỗ.
         */


        findFreeSlot() {
          for (var i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] === null) return i;
          }

          return -1;
        }
        /**
         * Lấy vị trí world của ô đậu.
         */


        getSlotPosition(slotIndex) {
          if (slotIndex < 0 || slotIndex >= this.parkingSlots.length) return new Vec3();
          return this.parkingSlots[slotIndex].worldPosition.clone();
        }
        /**
         * Đăng ký xe vào ô đậu.
         */


        occupySlot(slotIndex, bus) {
          if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = bus;
            console.log("[Parking] \uD83D\uDE8C Slot " + slotIndex + " occupied by bus");
          }
        }
        /**
         * Giải phóng ô đậu (khi xe rời đi).
         */


        freeSlot(slotIndex) {
          if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = null;
            console.log("[Parking] \u2705 Slot " + slotIndex + " freed");
          }
        }
        /**
         * Giải phóng ô đậu theo bus (tìm bus rồi free).
         */


        freeSlotByBus(bus) {
          var idx = this._slotOccupants.indexOf(bus);

          if (idx >= 0) {
            this.freeSlot(idx);
          }
        }
        /**
         * Số ô trống.
         */


        freeCount() {
          return this._slotOccupants.filter(b => b === null).length;
        }
        /**
         * Tổng số ô.
         */


        totalSlots() {
          return this.parkingSlots.length;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "parkingSlots", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4d41cee6c7d78c4a4e444b62d2152e0d45c46433.js.map
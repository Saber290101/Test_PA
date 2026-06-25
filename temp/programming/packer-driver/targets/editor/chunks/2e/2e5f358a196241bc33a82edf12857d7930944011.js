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
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "parkingSlots", _descriptor, this);

          // Lưu trạng thái: slot index → BusController đang đậu (null = trống)
          this._slotOccupants = [];
        }

        onLoad() {
          this._slotOccupants = this.parkingSlots.map(() => null);
          console.log(`[Parking] 🅿️ Initialized ${this.parkingSlots.length} slots`);
        }

        findFreeSlot() {
          for (let i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] === null) return i;
          }

          return -1;
        }

        getSlotPosition(slotIndex) {
          if (slotIndex < 0 || slotIndex >= this.parkingSlots.length) return new Vec3();
          return this.parkingSlots[slotIndex].worldPosition.clone();
        }

        occupySlot(slotIndex, bus) {
          if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = bus;
            console.log(`[Parking] 🚌 Slot ${slotIndex} occupied by bus`);
          }
        }

        freeSlot(slotIndex) {
          if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = null;
            console.log(`[Parking] ✅ Slot ${slotIndex} freed`);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "parkingSlots", [_dec2], {
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
//# sourceMappingURL=2e5f358a196241bc33a82edf12857d7930944011.js.map
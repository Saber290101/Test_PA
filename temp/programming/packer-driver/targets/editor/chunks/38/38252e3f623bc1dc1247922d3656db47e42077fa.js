System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _crd, CONVEYOR_SPEED_BASE, Global, eventDispatcher;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0eb13k3/GFD9pLn13pCDp+0", "Global", undefined);

      /** Tốc độ conveyor khi có block (đơn vị/giây). Khi = 10 thì mọi config time giữ nguyên; khi đổi (vd. 12) thì các time scale theo để tránh bắn lệch. */
      __checkObsolete__(['Vec2', 'Vec3']);

      CONVEYOR_SPEED_BASE = 10;
      Global = {
        video: false,
        endGame: false,
        endTut: false,
        conveyorSpeedBase: 8,
        conveyorSpeedWhenActive: 8,

        setConveyorSpeedMultiplier(mult) {
          this.conveyorSpeedWhenActive = this.conveyorSpeedBase * mult;
        },

        blockTweenDurationSecBase: 0.2,
        projectileFlightDurationSecBase: 0.1,
        shotTimeoutMultiplier: 1.5,

        getBlockTweenDurationSec() {
          return this.blockTweenDurationSecBase * (CONVEYOR_SPEED_BASE / this.conveyorSpeedWhenActive);
        },

        getProjectileFlightDurationSec() {
          return this.projectileFlightDurationSecBase * (CONVEYOR_SPEED_BASE / this.conveyorSpeedWhenActive);
        },

        getShotTimeoutSec() {
          return this.getProjectileFlightDurationSec() * this.shotTimeoutMultiplier;
        }

      };

      _export("default", Global);

      _export("eventDispatcher", eventDispatcher = new EventTarget());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=38252e3f623bc1dc1247922d3656db47e42077fa.js.map
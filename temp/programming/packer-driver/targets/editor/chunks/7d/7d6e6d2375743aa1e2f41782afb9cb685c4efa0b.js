System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, _crd, BusColor, GameState, BusState, COLOR_RGB;

  /** Helper: chuyển BusColor thành cc.Color */
  function busColorToCC(busColor) {
    const d = COLOR_RGB[busColor];
    return new Color(d.r, d.g, d.b, 255);
  }
  /** Helper: tạo màu tối hơn */


  function darkenColor(c, amount = 40) {
    return new Color(Math.max(0, c.r - amount), Math.max(0, c.g - amount), Math.max(0, c.b - amount), 255);
  }
  /** Helper: tạo màu sáng hơn */


  function lightenColor(c, amount = 40) {
    return new Color(Math.min(255, c.r + amount), Math.min(255, c.g + amount), Math.min(255, c.b + amount), 255);
  }

  _export({
    busColorToCC: busColorToCC,
    darkenColor: darkenColor,
    lightenColor: lightenColor
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9594aw2YFxHfL3Qsarprx4p", "GameEnums", undefined);

      __checkObsolete__(['Color']);

      _export("BusColor", BusColor = /*#__PURE__*/function (BusColor) {
        BusColor[BusColor["RED"] = 0] = "RED";
        BusColor[BusColor["BLUE"] = 1] = "BLUE";
        BusColor[BusColor["YELLOW"] = 2] = "YELLOW";
        BusColor[BusColor["GREEN"] = 3] = "GREEN";
        BusColor[BusColor["PURPLE"] = 4] = "PURPLE";
        return BusColor;
      }({}));
      /** Trạng thái game */


      _export("GameState", GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["IDLE"] = 0] = "IDLE";
        GameState[GameState["PLAYING"] = 1] = "PLAYING";
        GameState[GameState["WIN"] = 2] = "WIN";
        GameState[GameState["LOSE"] = 3] = "LOSE";
        return GameState;
      }({}));
      /** Trạng thái xe buýt */


      _export("BusState", BusState = /*#__PURE__*/function (BusState) {
        BusState[BusState["PARKED"] = 0] = "PARKED";
        BusState[BusState["ENTERING"] = 1] = "ENTERING";
        BusState[BusState["RUNNING"] = 2] = "RUNNING";
        BusState[BusState["PICKING"] = 3] = "PICKING";
        BusState[BusState["EXITING"] = 4] = "EXITING";
        BusState[BusState["RETURNING"] = 5] = "RETURNING";
        return BusState;
      }({}));
      /** RGB color data cho mỗi BusColor */


      _export("COLOR_RGB", COLOR_RGB = {
        [BusColor.RED]: {
          r: 231,
          g: 76,
          b: 60,
          name: 'Red'
        },
        [BusColor.BLUE]: {
          r: 52,
          g: 152,
          b: 219,
          name: 'Blue'
        },
        [BusColor.YELLOW]: {
          r: 241,
          g: 196,
          b: 15,
          name: 'Yellow'
        },
        [BusColor.GREEN]: {
          r: 46,
          g: 204,
          b: 113,
          name: 'Green'
        },
        [BusColor.PURPLE]: {
          r: 155,
          g: 89,
          b: 182,
          name: 'Purple'
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7d6e6d2375743aa1e2f41782afb9cb685c4efa0b.js.map
System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, BaseEvent, _dec, _class, _class2, _crd, ccclass, property, GlobalEvent;

  function _reportPossibleCrUseOfBaseEvent(extras) {
    _reporterNs.report("BaseEvent", "./BaseEvent", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      BaseEvent = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dfe497i5D9JJbnCs0vElEW5", "GlobalEvent", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GlobalEvent", GlobalEvent = (_dec = ccclass('GlobalEvent'), _dec(_class = (_class2 = class GlobalEvent extends (_crd && BaseEvent === void 0 ? (_reportPossibleCrUseOfBaseEvent({
        error: Error()
      }), BaseEvent) : BaseEvent) {
        constructor() {
          super();
        }

        static instance() {
          if (!GlobalEvent.event) {
            GlobalEvent.event = new GlobalEvent();
          }

          return GlobalEvent.event;
        } // Các chuỗi sự kiện


      }, _class2.event = null, _class2.START_GAME = "GlobalEvent.START_GAME", _class2.SHOW_LOSE = "GlobalEvent.SHOW_LOSE", _class2.SHOW_WIN = "GlobalEvent.SHOW_WIN", _class2.OPEN_STORE = "GlobalEvent.OPEN_STORE", _class2.ACTIVE_AUTO_OPEN_STORE = "GlobalEvent.ACTIVE_AUTO_OPEN_STORE", _class2.CHECK_PLAYABLE = "GlobalEvent.CHECK_PLAYABLE", _class2.SHOW_TUTORIAL = "GlobalEvent.SHOW_TUTORIAL", _class2.CLEAR_TUTORIAL = "GlobalEvent.CLEAR_TUTORIAL", _class2.END_GAME = "GlobalEvent.END_GAME", _class2.SHOW_BTN_ALL = "GlobalEvent.SHOW_BTN_ALL", _class2.CHECK_END_GAME = "GlobalEvent.CHECK_END_GAME", _class2.CLEAR_TUTORIAL_INTRO = "GlobalEvent.CLEAR_TUTORIAL_INTRO", _class2.GAME_RESIZE = "GlobalEvent.GAME_RESIZE", _class2.CHECK_HAS_BLOCK_STANDING_ON = "GlobalEvent.CHECK_HAS_BLOCK_STANDING_ON", _class2.RESET_BLOCK_MAP = "GlobalEvent.RESET_BLOCK_MAP", _class2.CLICK_OPEN_STORE = "GlobalEvent.CLICK_OPEN_STORE", _class2.AUTO_RELEASE = "GlobalEvent.AUTO_RELEASE", _class2.SHOW_WARNING = "GlobalEvent.SHOW_WARNING", _class2.HANDLE_GUIDE = "GlobalEvent.HANDLE_GUIDE", _class2.ACTIVE_GUIDE = "GlobalEvent.ACTIVE_GUIDE", _class2.DISABLE_GUIDE = "GlobalEvent.DISABLE_GUIDE", _class2.CARD_DIE = "GlobalEvent.CARD_DIE", _class2.ALL_ENEMIES_DIED = "GlobalEvent.ALL_ENEMIES_DIED", _class2.SHOW_CHOOSE_MANAGER = "GlobalEvent.SHOW_CHOOSE_MANAGER", _class2.CHOOSE_COMPLETE = "GlobalEvent.CHOOSE_COMPLETE", _class2.COMBAT_ROUND_COMPLETE = "GlobalEvent.COMBAT_ROUND_COMPLETE", _class2.COMBAT_ROUND_3_READY = "GlobalEvent.COMBAT_ROUND_3_READY", _class2.ALLY_SELECTED = "GlobalEvent.ALLY_SELECTED", _class2.ENEMY_SELECTED = "GlobalEvent.ENEMY_SELECTED", _class2.PICK_UNIT = "GlobalEvent.PICK_UNIT", _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=560c504e326d3de014d70cc3b37cffe39fa73b5a.js.map
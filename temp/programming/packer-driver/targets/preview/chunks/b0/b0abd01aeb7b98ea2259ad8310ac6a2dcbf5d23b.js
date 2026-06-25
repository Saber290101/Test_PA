System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EventTarget, EventManager, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7a43aEgSoFG1LCk9o83dONw", "EventManager", undefined); // EventManager.ts


      __checkObsolete__(['EventTarget']);

      EventManager = class EventManager {
        constructor() {
          this._eventTarget = void 0;
          this._eventTarget = new EventTarget();
        }

        static get instance() {
          if (!this._instance) {
            this._instance = new EventManager();
          }

          return this._instance;
        }

        emit(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          this._eventTarget.emit(event, ...args);
        }

        on(event, callback, target) {
          this._eventTarget.on(event, callback, target);
        }

        off(event, callback, target) {
          this._eventTarget.off(event, callback, target);
        }

      };
      EventManager._instance = void 0;

      _export("default", EventManager);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b0abd01aeb7b98ea2259ad8310ac6a2dcbf5d23b.js.map
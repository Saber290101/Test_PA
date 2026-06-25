System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EventTarget, _dec, _class, _crd, ccclass, property, BaseEvent;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ffc84vZtp5G050Bf9zVnD05", "BaseEvent", undefined);

      __checkObsolete__(['_decorator', 'EventTarget']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", BaseEvent = (_dec = ccclass('BaseEvent'), _dec(_class = class BaseEvent {
        constructor() {
          this.listeners = {};
          this.eventTarget = new EventTarget();
        }

        addEventListener(type, callback, target) {
          if (!this.listeners[type]) {
            this.listeners[type] = [];
          }

          this.listeners[type].push({
            target,
            callback
          });
          this.eventTarget.on(type, callback, target);
        }

        removeEventListener(type, callback, target) {
          if (!this.listeners[type]) return;
          var stack = this.listeners[type];

          for (var i = 0; i < stack.length; i++) {
            if (stack[i].target === target && stack[i].callback === callback) {
              stack.splice(i, 1);
              this.eventTarget.off(type, callback, target);
              return;
            }
          }
        }

        dispatchEvent(type, data) {
          if (data === void 0) {
            data = null;
          }

          if (!this.listeners[type]) return true;
          this.eventTarget.emit(type, data);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fef1b083ac107635ad53e5479f33696c8e133960.js.map
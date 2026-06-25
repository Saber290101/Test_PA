System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Component, Singleton, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "47a00VeqGhA0oN28yqsbCnV", "Singleton", undefined);

      __checkObsolete__(['Component']);

      _export("default", Singleton = class Singleton extends Component {
        static Instance(c) {
          if (this.instance == null) {
            this.instance = new c();
          }

          return this.instance;
        }

      });

      Singleton.instance = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0501a3ac5cbd519fb0f0c702bebd7498cb3d0960.js.map
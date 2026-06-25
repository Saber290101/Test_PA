System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Point, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, WayPoint;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPoint(extras) {
    _reporterNs.report("Point", "../Point/Point", _context.meta, extras);
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
    }, function (_unresolved_2) {
      Point = _unresolved_2.Point;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cace4It2lLia9xSgjFT0TO", "WayPoint", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'Vec3', 'Quat', 'Tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WayPoint", WayPoint = (_dec = ccclass('WayPoint'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([Node]), _dec(_class = (_class2 = class WayPoint extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "point", _descriptor, this);

          _initializerDefineProperty(this, "gateCheck", _descriptor2, this);

          _initializerDefineProperty(this, "endPos", _descriptor3, this);

          _initializerDefineProperty(this, "listWayPoints", _descriptor4, this);
        }

        start() {
          this.point.children.forEach(wayPointNode => {
            this.listWayPoints.push(wayPointNode);
          });
        }

        moveToNextWayPoint(characterNode) {
          var worldPos = characterNode.worldPosition.clone();
          var worldRot = characterNode.worldRotation.clone();

          for (var i = 0; i < this.listWayPoints.length; i++) {
            if (this.listWayPoints[i].children.length > 0) {
              continue;
            }

            characterNode.parent = this.listWayPoints[i];
            characterNode.setWorldPosition(worldPos);
            characterNode.setWorldRotation(worldRot);
            var point = this.listWayPoints[i].getComponent(_crd && Point === void 0 ? (_reportPossibleCrUseOfPoint({
              error: Error()
            }), Point) : Point);
            var busCtrl = characterNode.getComponent('BusController');

            if (!busCtrl.isOneWay) {
              point.moveWithRotation(characterNode);
            } else {
              point.moveWithOneWay(characterNode);
            }

            break;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "point", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gateCheck", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "endPos", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "listWayPoints", [_dec5], {
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
//# sourceMappingURL=dfc6b9a152bbb36d8a5cd249e3c7cd599cf4944b.js.map
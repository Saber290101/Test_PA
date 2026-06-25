System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Quat, Vec2, _decorator, Singleton, Vec3, director, UITransform, _class, _crd, ccclass, property, Utility;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Quat = _cc.Quat;
      Vec2 = _cc.Vec2;
      _decorator = _cc._decorator;
      Vec3 = _cc.Vec3;
      director = _cc.director;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7a741MclJLhbejclSrdzdR", "Utility", undefined);

      __checkObsolete__(['Quat', 'Vec2']);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      __checkObsolete__(['Canvas']);

      __checkObsolete__(['Camera']);

      __checkObsolete__(['SkeletalAnimation']);

      __checkObsolete__(['Vec3']);

      __checkObsolete__(['director']);

      __checkObsolete__(['UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("default", Utility = ccclass(_class = class Utility extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super();
          Utility.instance = this;
        }

        static VectorsSum(a, b) {
          return new Vec2(a.x + b.x, a.y + b.y);
        }

        static VectorsSubs(a, b) {
          return new Vec2(a.x - b.x, a.y - b.y);
        }

        static VectorsMult(a, b) {
          return new Vec2(a.x * b.x, a.y * b.y);
        }

        static VectorsDiv(a, b) {
          if (b.x == 0 || b.y == 0) return null;else return new Vec2(a.x / b.x, a.y / b.y);
        }

        static VectorTimes(a, x) {
          return new Vec2(a.x * x, a.y * x);
        }

        static RandomRangeFloat(lower, upper) {
          return Math.random() * (upper - lower) + lower; //return Math.floor(Math.random() * (lower - lower)) + lower;
        }

        static RandomRangeInteger(lower, upper) {
          return Math.round(Math.random() * (upper - lower) + lower);
        }

        static DistanceV2(vec1, vec2) {
          var Distance = Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
          return Distance;
        }

        static DistanceV3(vec1, vec2) {
          var Distance = Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2) + Math.pow(vec1.z - vec2.z, 2));
          return Distance;
        }

        static CaculatorDurationV2(vec1, vec2, speed) {
          var distance = this.DistanceV2(vec1, vec2);
          var duration = distance / speed;
          return duration;
        }

        static CaculatorDurationV3(vec1, vec2, speed) {
          var distance = this.DistanceV3(vec1, vec2);
          var duration = distance / speed;
          return duration;
        }

        static BetweenDegree(comVec, dirVec) {
          if (dirVec === void 0) {
            dirVec = new Vec2(0, 0);
          }

          var angleDegree = 0;
          if (dirVec == new Vec2(0, 0)) angleDegree = Math.atan2(comVec.y, comVec.x) * 180 / Math.PI;else angleDegree = Math.atan2(dirVec.y - comVec.y, dirVec.x - comVec.x) * 180 / Math.PI;
          return angleDegree;
        }

        static CaculatorDegree(Target) {
          var r = Math.atan2(Target.y, Target.x);
          var degree = r * 180 / Math.PI;
          degree = 360 - degree + 90;
          return degree;
        }

        static RotateIn3D(vecA, vecB) {
          // Giả sử `node` là node bạn muốn xoay, `pointA` là vị trí bắt đầu, và `pointB` là vị trí đích
          var pointA = vecA;
          var pointB = vecB; // Thay (x, y, z) bằng tọa độ của điểm B
          // Tính vector hướng từ A đến B

          var direction = new Vec3();
          Vec3.subtract(direction, pointB, pointA); // Chuẩn hóa vector hướng để dễ dàng sử dụng

          direction.normalize(); // Xoay node theo hướng của vector bằng cách tính quaternion từ vector hướng

          var up = new Vec3(0, 1, 0); // Vector lên (tùy thuộc vào trục y của thế giới trong môi trường 3D)

          var rotation = new Quat();
          Quat.fromViewUp(rotation, direction, up);
          return rotation;
        }

        static randomInt(low, high) {
          return Math.floor(Math.random() * (1 + high - low) + low);
        }

        static ConvertPosEventTouch(vector) {
          var pos = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(vector);
          return pos;
        }

        static ConvertPosToWorldSpace(node, localPos) {
          var worldPosition = node.getWorldPosition();
          var pos = worldPosition.add(localPos);
          return pos;
        }

        static ConvertPosToCanvasByNode(objectParent, objectChildren) {
          var pos = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(objectParent.getComponent(UITransform).convertToWorldSpaceAR(objectChildren.getPosition()));
          return pos;
        }

        static ConvertPosToCanvasByVector(objectParent, vector) {
          var pos = director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToNodeSpaceAR(objectParent.getComponent(UITransform).convertToWorldSpaceAR(vector));
          return pos;
        }

        static ConvertPosToParentByNode(objectParent, objectChildren) {
          var pos = objectParent.getComponent(UITransform).convertToNodeSpaceAR(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToWorldSpaceAR(objectChildren.getPosition()));
          return pos;
        }

        static ConvertPosToParentByVector(objectParent, vector) {
          var pos = objectParent.getComponent(UITransform).convertToNodeSpaceAR(director.getScene().getChildByName("Canvas").getComponent(UITransform).convertToWorldSpaceAR(vector));
          return pos;
        }

        static ConvertPosToHigherParentByNode(objectParentHigher, objectParent, objectChildren) {
          var pos = objectParentHigher.getComponent(UITransform).convertToNodeSpaceAR(objectParent.getComponent(UITransform).convertToWorldSpaceAR(objectChildren.getPosition()));
          return pos;
        }

        static ConvertPosToHigherParentByVector(objectParentHigher, objectParent, vector) {
          var pos = objectParentHigher.getComponent(UITransform).convertToNodeSpaceAR(objectParent.getComponent(UITransform).convertToWorldSpaceAR(vector));
          return pos;
        }

        static ShakeCam(camera, magnitude) {// camera.node.stopAllActions();
          // camera.node.x = 0;
          // camera.node.y = 0;
          // camera.node.runAction(cc.sequence(
          //     cc.moveBy(0.025, cc.v2(0, magnitude)),
          //     cc.moveBy(0.05, cc.v2(0, 0)),
          // ));
        } // static LogDurationAnimationSpine(spine: SkeletalAnimation)
        // {
        //     let animation = spine.findAnimation("Attack-01");
        //     if (animation) {
        // 		let duration = animation.duration;
        // 		console.log("Duration of animation:", duration);
        //     } else {
        // 		console.log("Animation not found");
        //     }
        // }


        static convertUIWorldTo3DWorld(cameraUI, camera3D, worldPosUI, distanceFromCamera) {
          if (distanceFromCamera === void 0) {
            distanceFromCamera = 1;
          }

          var screenPos = new Vec3();
          cameraUI.worldToScreen(worldPosUI, screenPos); // Gán khoảng cách từ camera3D đến điểm muốn đặt (trục z)
          // screenPos.z = distanceFromCamera;

          var worldPos3D = new Vec3();
          camera3D.screenToWorld(screenPos, worldPos3D);
          return worldPos3D;
        }

      }) || _class);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9968ad28bbe849a21f4321cf32dbe9397b2b04d3.js.map
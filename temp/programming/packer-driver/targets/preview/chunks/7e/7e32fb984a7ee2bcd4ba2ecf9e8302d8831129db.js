System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, geometry, PhysicsSystem, RigidBody, Vec3, RaycastUtils, _crd, RAYCAST_MASK, MAX_SCAN_DISTANCE;

  _export("RaycastUtils", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      geometry = _cc.geometry;
      PhysicsSystem = _cc.PhysicsSystem;
      RigidBody = _cc.RigidBody;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2ce1cyNe+RC0IyA16OFiX5Y", "RaycastUtils", undefined);

      /**
       * RaycastUtils – Static utility class for raycast-based movement checks.
       *
       * Extracted from LinearMovement: chỉ chứa static helpers,
       * không phải Component, không có state.
       */

      /** Bitmask loại trừ layer 4 (xe đang chạy) */
      __checkObsolete__(['_decorator', 'geometry', 'Node', 'PhysicsSystem', 'RigidBody', 'Vec3']);

      RAYCAST_MASK = 0xffffffff & ~(1 << 4);
      /** Khoảng cách scan tối đa */

      MAX_SCAN_DISTANCE = 30;

      _export("RaycastUtils", RaycastUtils = class RaycastUtils {
        /**
         * Kiểm tra xe có bị chặn bởi vật thể nào phía trước không (trừ chính nó).
         * Dùng cho win/lose check.
         */
        static canMove(startNode, safeDistance) {
          if (!(startNode != null && startNode.isValid)) return false;
          var direction = new Vec3();
          Vec3.negate(direction, startNode.forward);
          direction.normalize();
          var origin = startNode.worldPosition;
          var ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);
          var hasHit = PhysicsSystem.instance.raycast(ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false);
          if (!hasHit) return true;
          var results = PhysicsSystem.instance.raycastResults;
          results.sort((a, b) => a.distance - b.distance);

          var closest = RaycastUtils._findClosestNonSelf(results, startNode);

          if (!closest) return true;
          return closest.distance >= safeDistance + 0.5;
        }
        /**
         * Kiểm tra xe có thể di chuyển cho tutorial (cho phép qua gate).
         */


        static canMoveForTut(startNode) {
          if (!(startNode != null && startNode.isValid)) return false;
          var direction = new Vec3();
          Vec3.negate(direction, startNode.forward);
          direction.normalize();
          var origin = startNode.worldPosition;
          var ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);
          var hasHit = PhysicsSystem.instance.raycast(ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false);
          if (!hasHit) return true;
          var results = PhysicsSystem.instance.raycastResults;
          results.sort((a, b) => a.distance - b.distance);

          var closest = RaycastUtils._findClosestNonSelf(results, startNode);

          if (!closest) return true;
          return !!closest.collider.node.getComponent('GateCheck');
        }
        /**
         * Kiểm tra raycast full mask (dùng cho checkMove cũ).
         */


        static checkMoveBlocked(startNode) {
          var direction = new Vec3();
          Vec3.negate(direction, startNode.forward);
          direction.normalize();
          var origin = startNode.worldPosition;
          var ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);
          var hasHit = PhysicsSystem.instance.raycast(ray, 0xffffffff, MAX_SCAN_DISTANCE, false);
          if (!hasHit) return false;
          var results = PhysicsSystem.instance.raycastResults;
          var vehicleNode = startNode.parent;

          for (var result of results) {
            if (RaycastUtils._isSelfOrDescendant(result.collider.node, startNode, vehicleNode)) continue;
            var rb = result.collider.node.getComponent(RigidBody);

            if ((rb == null ? void 0 : rb.group) === 16 && result.distance < 4) {
              return true;
            }
          }

          return false;
        }
        /**
         * Sweep scan: tìm vật thể đầu tiên trên đường đi của xe.
         * @returns Kết quả scan gồm closestResult, hoặc null nếu không đâm gì.
         */


        static sweepScan(startNode, selfNode) {
          var origin = startNode.worldPosition.clone();
          var direction = new Vec3();
          Vec3.negate(direction, startNode.forward);
          direction.normalize();
          var ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);
          var hasHit = PhysicsSystem.instance.raycast(ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false);
          var closestResult = null;

          if (hasHit) {
            var results = PhysicsSystem.instance.raycastResults;
            results.sort((a, b) => a.distance - b.distance);

            for (var res of results) {
              if (!RaycastUtils._isSelfOrDescendant(res.collider.node, selfNode, null)) {
                closestResult = res;
                break;
              }
            }
          }

          return {
            result: closestResult,
            direction,
            origin
          };
        }
        /** Constant: khoảng cách scan tối đa */


        // ─── Private Helpers ────────────────────────
        static _isSelfOrDescendant(node, self, vehicleNode) {
          var curr = node;

          while (curr) {
            if (curr === self || vehicleNode && curr === vehicleNode) return true;
            curr = curr.parent;
          }

          return false;
        }

        static _findClosestNonSelf(results, startNode) {
          var vehicleNode = startNode.parent;

          for (var res of results) {
            if (!RaycastUtils._isSelfOrDescendant(res.collider.node, startNode, vehicleNode)) {
              return res;
            }
          }

          return null;
        }

      });

      RaycastUtils.MAX_SCAN_DISTANCE = MAX_SCAN_DISTANCE;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7e32fb984a7ee2bcd4ba2ecf9e8302d8831129db.js.map
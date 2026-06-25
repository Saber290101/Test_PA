System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, PathBuilder, _crd;

  function _reportPossibleCrUseOfGateCheck(extras) {
    _reporterNs.report("GateCheck", "../Point/GateCheck", _context.meta, extras);
  }

  _export("PathBuilder", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f1a96wNRaVBnbeY+2CezuEo", "PathBuilder", undefined);

      __checkObsolete__(['Node', 'Vec3']);
      /**
       * Kết quả build path: danh sách vị trí + chỉ số waypoint tương ứng.
       */


      /**
       * PathBuilder – Utility tĩnh xây dựng đường đi (path) từ waypoints.
       *
       * Loại bỏ code trùng lặp "tìm waypoint gần nhất", "build path từ A→B",
       * tập trung mọi logic path construction vào 1 nơi duy nhất.
       */
      _export("PathBuilder", PathBuilder = class PathBuilder {
        // ─── Core Utility ───────────────────────────

        /**
         * Tìm chỉ số waypoint gần vị trí `worldPos` nhất.
         * @param startAfter Chỉ tìm các waypoint có index > startAfter (-1 = tìm tất cả)
         */
        static findClosestWaypointIdx(gateCheck, worldPos, startAfter) {
          if (startAfter === void 0) {
            startAfter = -1;
          }

          var bestIdx = -1;
          var minDist = Infinity;

          for (var i = startAfter + 1; i < gateCheck.wayPoints.length; i++) {
            var wp = gateCheck.wayPoints[i];
            if (!wp) continue;
            var dist = Vec3.distance(wp.worldPosition, worldPos);

            if (dist < minDist) {
              minDist = dist;
              bestIdx = i;
            }
          }

          return bestIdx;
        } // ─── Helpers ──────────────────────────

        /** Gộp logic duyệt waypoint tránh lặp code */


        static _appendWaypoints(gateCheck, points, wpIndices, fromIdx, toIdx) {
          for (var i = fromIdx; i <= toIdx; i++) {
            var wp = gateCheck.wayPoints[i];

            if (wp) {
              points.push(wp.worldPosition.clone());
              wpIndices.push(i);
            }
          }
        } // ─── Path Builders ──────────────────────────

        /**
         * Build path từ vị trí hiện tại qua các waypoints [fromIdx+1 … toIdx].
         * Dùng khi xe vào đường chính hoặc chuyển bến.
         */


        static buildWaypointPath(gateCheck, currentPos, fromIdx, toIdx) {
          var points = [currentPos.clone()];
          var wpIndices = [-1];
          var start = Math.max(0, fromIdx + 1);

          PathBuilder._appendWaypoints(gateCheck, points, wpIndices, start, toIdx);

          return {
            points,
            wpIndices
          };
        }
        /**
         * Build path từ vị trí hiện tại qua tất cả waypoints [0 … lastIdx].
         * Dùng khi xe vừa vào gate.
         */


        static buildEntryPath(gateCheck, currentPos, lastIdx) {
          return PathBuilder.buildWaypointPath(gateCheck, currentPos, -1, lastIdx);
        }
        /**
         * Build path từ stop hiện tại đến parking slot.
         * Trả về thêm divertIdx (waypoint rẽ vào parking).
         */


        static buildPathToParking(gateCheck, currentPos, fromStopIdx, slotPos) {
          var points = [currentPos.clone()];
          var wpIndices = [-1];
          var divertIdx = PathBuilder.findClosestWaypointIdx(gateCheck, slotPos, fromStopIdx);

          if (divertIdx >= 0) {
            PathBuilder._appendWaypoints(gateCheck, points, wpIndices, fromStopIdx + 1, divertIdx);
          }

          points.push(slotPos.clone());
          wpIndices.push(-1);
          return {
            points,
            wpIndices,
            divertIdx
          };
        }
        /**
         * Build path từ parking slot trở lại đường chính rồi đến bến xe.
         * @param leftLaneStartIdx Index waypoint bắt đầu lane trái (mặc định = 2)
         */


        static buildPathFromParking(gateCheck, currentPos, divertIdx, targetStopIdx, leftLaneStartIdx) {
          if (leftLaneStartIdx === void 0) {
            leftLaneStartIdx = 2;
          }

          var points = [currentPos.clone()];
          var wpIndices = [-1]; // Đi từ ô đỗ lên waypoint phân nhánh

          var divertWp = gateCheck.wayPoints[divertIdx];

          if (divertWp) {
            points.push(divertWp.worldPosition.clone());
            wpIndices.push(divertIdx);
          } // Từ lane trái đi lên đến bến xe


          PathBuilder._appendWaypoints(gateCheck, points, wpIndices, leftLaneStartIdx, targetStopIdx);

          return {
            points,
            wpIndices
          };
        }
        /**
         * Build path từ stop hiện tại đến endPos (exit khỏi đường).
         */


        static buildPathToExit(gateCheck, currentPos, fromStopIdx, endPos) {
          var points = [currentPos.clone()];
          var wpIndices = [-1];

          PathBuilder._appendWaypoints(gateCheck, points, wpIndices, fromStopIdx + 1, gateCheck.wayPoints.length - 1);

          if (endPos) {
            points.push(endPos.worldPosition.clone());
            wpIndices.push(-2);
          }

          return {
            points,
            wpIndices
          };
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c76c5a51362d40705816f1d82ce76ebab3526a9c.js.map
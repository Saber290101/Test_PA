System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, PathBuilder, _crd;

  function _reportPossibleCrUseOfGateCheck(extras) {
    _reporterNs.report("GateCheck", "./Point/GateCheck", _context.meta, extras);
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

      _cclegacy._RF.push({}, "e3a4c0dr9RNJZ0O+YojX3mO", "PathBuilder", undefined);

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
        static findClosestWaypointIdx(gateCheck, worldPos, startAfter = -1) {
          let bestIdx = -1;
          let minDist = Infinity;

          for (let i = startAfter + 1; i < gateCheck.wayPoints.length; i++) {
            const wp = gateCheck.wayPoints[i];
            if (!wp) continue;
            const dist = Vec3.distance(wp.worldPosition, worldPos);

            if (dist < minDist) {
              minDist = dist;
              bestIdx = i;
            }
          }

          return bestIdx;
        } // ─── Path Builders ──────────────────────────

        /**
         * Build path từ vị trí hiện tại qua các waypoints [fromIdx+1 … toIdx].
         * Dùng khi xe vào đường chính hoặc chuyển bến.
         */


        static buildWaypointPath(gateCheck, currentPos, fromIdx, toIdx) {
          const points = [currentPos.clone()];
          const wpIndices = [-1];
          const start = Math.max(0, fromIdx + 1);

          for (let i = start; i <= toIdx; i++) {
            const wp = gateCheck.wayPoints[i];

            if (wp) {
              points.push(wp.worldPosition.clone());
              wpIndices.push(i);
            }
          }

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
          const points = [currentPos.clone()];
          const wpIndices = [-1];

          for (let i = 0; i <= lastIdx; i++) {
            const wp = gateCheck.wayPoints[i];

            if (wp) {
              points.push(wp.worldPosition.clone());
              wpIndices.push(i);
            }
          }

          return {
            points,
            wpIndices
          };
        }
        /**
         * Build path từ stop hiện tại đến parking slot.
         * Trả về thêm divertIdx (waypoint rẽ vào parking).
         */


        static buildPathToParking(gateCheck, currentPos, fromStopIdx, slotPos) {
          const points = [currentPos.clone()];
          const wpIndices = [-1];
          const divertIdx = PathBuilder.findClosestWaypointIdx(gateCheck, slotPos, fromStopIdx);

          if (divertIdx >= 0) {
            for (let i = fromStopIdx + 1; i <= divertIdx; i++) {
              const wp = gateCheck.wayPoints[i];

              if (wp) {
                points.push(wp.worldPosition.clone());
                wpIndices.push(i);
              }
            }
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


        static buildPathFromParking(gateCheck, currentPos, divertIdx, targetStopIdx, leftLaneStartIdx = 2) {
          const points = [currentPos.clone()];
          const wpIndices = [-1]; // Đi từ ô đỗ lên waypoint phân nhánh

          const divertWp = gateCheck.wayPoints[divertIdx];

          if (divertWp) {
            points.push(divertWp.worldPosition.clone());
            wpIndices.push(divertIdx);
          } // Từ lane trái đi lên đến bến xe


          for (let i = leftLaneStartIdx; i <= targetStopIdx; i++) {
            const wp = gateCheck.wayPoints[i];

            if (wp) {
              points.push(wp.worldPosition.clone());
              wpIndices.push(i);
            }
          }

          return {
            points,
            wpIndices
          };
        }
        /**
         * Build path từ stop hiện tại đến endPos (exit khỏi đường).
         */


        static buildPathToExit(gateCheck, currentPos, fromStopIdx, endPos) {
          const points = [currentPos.clone()];
          const wpIndices = [-1];

          for (let i = fromStopIdx + 1; i < gateCheck.wayPoints.length; i++) {
            const wp = gateCheck.wayPoints[i];

            if (wp) {
              points.push(wp.worldPosition.clone());
              wpIndices.push(i);
            }
          }

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
//# sourceMappingURL=67acc8d9d87797669d9c62a1cc8591e22a8609de.js.map
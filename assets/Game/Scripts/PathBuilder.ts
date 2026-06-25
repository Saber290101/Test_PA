import { Node, Vec3 } from 'cc';
import { GateCheck } from './Point/GateCheck';

/**
 * Kết quả build path: danh sách vị trí + chỉ số waypoint tương ứng.
 */
export interface PathData {
    points: Vec3[];
    wpIndices: number[];
}

/**
 * PathBuilder – Utility tĩnh xây dựng đường đi (path) từ waypoints.
 *
 * Loại bỏ code trùng lặp "tìm waypoint gần nhất", "build path từ A→B",
 * tập trung mọi logic path construction vào 1 nơi duy nhất.
 */
export class PathBuilder {

    // ─── Core Utility ───────────────────────────

    /**
     * Tìm chỉ số waypoint gần vị trí `worldPos` nhất.
     * @param startAfter Chỉ tìm các waypoint có index > startAfter (-1 = tìm tất cả)
     */
    public static findClosestWaypointIdx(
        gateCheck: GateCheck,
        worldPos: Vec3,
        startAfter: number = -1,
    ): number {
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
    }

    // ─── Path Builders ──────────────────────────

    /**
     * Build path từ vị trí hiện tại qua các waypoints [fromIdx+1 … toIdx].
     * Dùng khi xe vào đường chính hoặc chuyển bến.
     */
    public static buildWaypointPath(
        gateCheck: GateCheck,
        currentPos: Vec3,
        fromIdx: number,
        toIdx: number,
    ): PathData {
        const points: Vec3[] = [currentPos.clone()];
        const wpIndices: number[] = [-1];

        const start = Math.max(0, fromIdx + 1);
        for (let i = start; i <= toIdx; i++) {
            const wp = gateCheck.wayPoints[i];
            if (wp) {
                points.push(wp.worldPosition.clone());
                wpIndices.push(i);
            }
        }
        return { points, wpIndices };
    }

    /**
     * Build path từ vị trí hiện tại qua tất cả waypoints [0 … lastIdx].
     * Dùng khi xe vừa vào gate.
     */
    public static buildEntryPath(
        gateCheck: GateCheck,
        currentPos: Vec3,
        lastIdx: number,
    ): PathData {
        const points: Vec3[] = [currentPos.clone()];
        const wpIndices: number[] = [-1];

        for (let i = 0; i <= lastIdx; i++) {
            const wp = gateCheck.wayPoints[i];
            if (wp) {
                points.push(wp.worldPosition.clone());
                wpIndices.push(i);
            }
        }
        return { points, wpIndices };
    }

    /**
     * Build path từ stop hiện tại đến parking slot.
     * Trả về thêm divertIdx (waypoint rẽ vào parking).
     */
    public static buildPathToParking(
        gateCheck: GateCheck,
        currentPos: Vec3,
        fromStopIdx: number,
        slotPos: Vec3,
    ): PathData & { divertIdx: number } {
        const points: Vec3[] = [currentPos.clone()];
        const wpIndices: number[] = [-1];

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

        return { points, wpIndices, divertIdx };
    }

    /**
     * Build path từ parking slot trở lại đường chính rồi đến bến xe.
     * @param leftLaneStartIdx Index waypoint bắt đầu lane trái (mặc định = 2)
     */
    public static buildPathFromParking(
        gateCheck: GateCheck,
        currentPos: Vec3,
        divertIdx: number,
        targetStopIdx: number,
        leftLaneStartIdx: number = 2,
    ): PathData {
        const points: Vec3[] = [currentPos.clone()];
        const wpIndices: number[] = [-1];

        // Đi từ ô đỗ lên waypoint phân nhánh
        const divertWp = gateCheck.wayPoints[divertIdx];
        if (divertWp) {
            points.push(divertWp.worldPosition.clone());
            wpIndices.push(divertIdx);
        }

        // Từ lane trái đi lên đến bến xe
        for (let i = leftLaneStartIdx; i <= targetStopIdx; i++) {
            const wp = gateCheck.wayPoints[i];
            if (wp) {
                points.push(wp.worldPosition.clone());
                wpIndices.push(i);
            }
        }

        return { points, wpIndices };
    }

    /**
     * Build path từ stop hiện tại đến endPos (exit khỏi đường).
     */
    public static buildPathToExit(
        gateCheck: GateCheck,
        currentPos: Vec3,
        fromStopIdx: number,
        endPos: Node | null,
    ): PathData {
        const points: Vec3[] = [currentPos.clone()];
        const wpIndices: number[] = [-1];

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

        return { points, wpIndices };
    }
}

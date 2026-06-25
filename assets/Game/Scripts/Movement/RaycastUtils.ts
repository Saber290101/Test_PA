import { _decorator, geometry, Node, PhysicsSystem, RigidBody, Vec3 } from 'cc';
import { GateCheck } from '../Point/GateCheck';

/**
 * RaycastUtils – Static utility class for raycast-based movement checks.
 *
 * Extracted from LinearMovement: chỉ chứa static helpers,
 * không phải Component, không có state.
 */

/** Bitmask loại trừ layer 4 (xe đang chạy) */
const RAYCAST_MASK = 0xffffffff & ~(1 << 4);

/** Khoảng cách scan tối đa */
const MAX_SCAN_DISTANCE = 30;

export class RaycastUtils {

    /**
     * Kiểm tra xe có bị chặn bởi vật thể nào phía trước không (trừ chính nó).
     * Dùng cho win/lose check.
     */
    static canMove(startNode: Node, safeDistance: number): boolean {
        if (!startNode?.isValid) return false;

        const direction = new Vec3();
        Vec3.negate(direction, startNode.forward);
        direction.normalize();

        const origin = startNode.worldPosition;
        const ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);

        const hasHit = PhysicsSystem.instance.raycast(ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false);
        if (!hasHit) return true;

        const results = PhysicsSystem.instance.raycastResults;
        results.sort((a, b) => a.distance - b.distance);

        const closest = RaycastUtils._findClosestNonSelf(results, startNode);
        if (!closest) return true;

        return closest.distance >= safeDistance + 0.5;
    }

    /**
     * Kiểm tra xe có thể di chuyển cho tutorial (cho phép qua gate).
     */
    static canMoveForTut(startNode: Node): boolean {
        if (!startNode?.isValid) return false;

        const direction = new Vec3();
        Vec3.negate(direction, startNode.forward);
        direction.normalize();

        const origin = startNode.worldPosition;
        const ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);

        const hasHit = PhysicsSystem.instance.raycast(ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false);
        if (!hasHit) return true;

        const results = PhysicsSystem.instance.raycastResults;
        results.sort((a, b) => a.distance - b.distance);

        const closest = RaycastUtils._findClosestNonSelf(results, startNode);
        if (!closest) return true;

        return !!closest.collider.node.getComponent(GateCheck);
    }

    /**
     * Kiểm tra raycast full mask (dùng cho checkMove cũ).
     */
    static checkMoveBlocked(startNode: Node): boolean {
        const direction = new Vec3();
        Vec3.negate(direction, startNode.forward);
        direction.normalize();

        const origin = startNode.worldPosition;
        const ray = new geometry.Ray(origin.x, origin.y, origin.z, direction.x, direction.y, direction.z);

        const hasHit = PhysicsSystem.instance.raycast(ray, 0xffffffff, MAX_SCAN_DISTANCE, false);
        if (!hasHit) return false;

        const results = PhysicsSystem.instance.raycastResults;
        const vehicleNode = startNode.parent;

        for (const result of results) {
            if (RaycastUtils._isSelfOrDescendant(result.collider.node, startNode, vehicleNode)) continue;

            const rb = result.collider.node.getComponent(RigidBody);
            if (rb?.group === 16 && result.distance < 4) {
                return true;
            }
        }
        return false;
    }

    /**
     * Sweep scan: tìm vật thể đầu tiên trên đường đi của xe.
     * @returns Kết quả scan gồm closestResult, hoặc null nếu không đâm gì.
     */
    static sweepScan(startNode: Node, selfNode: Node): {
        result: any | null;
        direction: Vec3;
        origin: Vec3;
    } {
        const origin = startNode.worldPosition.clone();
        const direction = new Vec3();
        Vec3.negate(direction, startNode.forward);
        direction.normalize();

        const ray = new geometry.Ray(
            origin.x, origin.y, origin.z,
            direction.x, direction.y, direction.z,
        );
        const hasHit = PhysicsSystem.instance.raycast(
            ray, RAYCAST_MASK, MAX_SCAN_DISTANCE, false,
        );

        let closestResult = null;
        if (hasHit) {
            const results = PhysicsSystem.instance.raycastResults;
            results.sort((a, b) => a.distance - b.distance);
            for (const res of results) {
                if (!RaycastUtils._isSelfOrDescendant(res.collider.node, selfNode, null)) {
                    closestResult = res;
                    break;
                }
            }
        }

        return { result: closestResult, direction, origin };
    }

    /** Constant: khoảng cách scan tối đa */
    static readonly MAX_SCAN_DISTANCE = MAX_SCAN_DISTANCE;

    // ─── Private Helpers ────────────────────────

    private static _isSelfOrDescendant(node: Node, self: Node, vehicleNode: Node | null): boolean {
        let curr: Node | null = node;
        while (curr) {
            if (curr === self || (vehicleNode && curr === vehicleNode)) return true;
            curr = curr.parent;
        }
        return false;
    }

    private static _findClosestNonSelf(results: readonly any[], startNode: Node): any | null {
        const vehicleNode = startNode.parent;
        for (const res of results) {
            if (!RaycastUtils._isSelfOrDescendant(res.collider.node, startNode, vehicleNode)) {
                return res;
            }
        }
        return null;
    }
}

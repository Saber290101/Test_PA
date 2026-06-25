import { _decorator, Component, Node, Vec3 } from 'cc';
import { BusController } from './BusController';

const { ccclass, property } = _decorator;

@ccclass('ParkingManager')
export class ParkingManager extends Component {

    @property({ type: [Node], tooltip: 'Danh sách các Node ô đậu xe (kéo thả từ Scene)' })
    public parkingSlots: Node[] = [];

    // Lưu trạng thái: slot index → BusController đang đậu (null = trống)
    private _slotOccupants: (BusController | null)[] = [];

    onLoad(): void {
        this._slotOccupants = this.parkingSlots.map(() => null);
        console.log(`[Parking] 🅿️ Initialized ${this.parkingSlots.length} slots`);
    }

    /**
     * Tìm ô đậu trống gần nhất với vị trí cho trước.
     * @returns index slot, -1 nếu hết chỗ.
     */
    public findNearestFreeSlot(worldPos: Vec3): number {
        let bestIdx = -1;
        let bestDist = Infinity;

        for (let i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] !== null) continue; // Đã có xe

            const slotPos = this.parkingSlots[i].worldPosition;
            const dist = Vec3.distance(worldPos, slotPos);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
            }
        }

        return bestIdx;
    }

    /**
     * Tìm ô đậu trống bất kỳ (theo thứ tự).
     * @returns index slot, -1 nếu hết chỗ.
     */
    public findFreeSlot(): number {
        for (let i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] === null) return i;
        }
        return -1;
    }

    /**
     * Lấy vị trí world của ô đậu.
     */
    public getSlotPosition(slotIndex: number): Vec3 {
        if (slotIndex < 0 || slotIndex >= this.parkingSlots.length) return new Vec3();
        return this.parkingSlots[slotIndex].worldPosition.clone();
    }

    /**
     * Đăng ký xe vào ô đậu.
     */
    public occupySlot(slotIndex: number, bus: BusController): void {
        if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = bus;
            console.log(`[Parking] 🚌 Slot ${slotIndex} occupied by bus`);
        }
    }

    /**
     * Giải phóng ô đậu (khi xe rời đi).
     */
    public freeSlot(slotIndex: number): void {
        if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = null;
            console.log(`[Parking] ✅ Slot ${slotIndex} freed`);
        }
    }

    /**
     * Giải phóng ô đậu theo bus (tìm bus rồi free).
     */
    public freeSlotByBus(bus: BusController): void {
        const idx = this._slotOccupants.indexOf(bus);
        if (idx >= 0) {
            this.freeSlot(idx);
        }
    }

    /**
     * Số ô trống.
     */
    public freeCount(): number {
        return this._slotOccupants.filter(b => b === null).length;
    }

    /**
     * Tổng số ô.
     */
    public totalSlots(): number {
        return this.parkingSlots.length;
    }
}

import { _decorator, Component, Node, Vec3 } from 'cc';
import type { BusController } from './BusController';

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

    public findFreeSlot(): number {
        for (let i = 0; i < this.parkingSlots.length; i++) {
            if (this._slotOccupants[i] === null) return i;
        }
        return -1;
    }

    public getSlotPosition(slotIndex: number): Vec3 {
        if (slotIndex < 0 || slotIndex >= this.parkingSlots.length) return new Vec3();
        return this.parkingSlots[slotIndex].worldPosition.clone();
    }

    public occupySlot(slotIndex: number, bus: BusController): void {
        if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = bus;
            console.log(`[Parking] 🚌 Slot ${slotIndex} occupied by bus`);
        }
    }

    public freeSlot(slotIndex: number): void {
        if (slotIndex >= 0 && slotIndex < this._slotOccupants.length) {
            this._slotOccupants[slotIndex] = null;
            console.log(`[Parking] ✅ Slot ${slotIndex} freed`);
        }
    }


}

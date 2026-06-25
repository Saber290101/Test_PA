import { _decorator, Component, Node, Prefab, Vec3, instantiate, Enum, director } from 'cc';
import { PassengerController } from './Controller/PassengerController';
import { BusStop } from './BusStop';
import { BusColor } from './GameEnums';
import { ColorManager } from './Controller/ColorManager';
import { BusController } from './Controller/BusController';

const { ccclass, property } = _decorator;

Enum(BusColor);

/**
 * PassengerSpawner – Sinh ra hành khách (Stickman) tại các điểm sinh (BusStop).
 *
 * Cách dùng trong Editor:
 * 1. Tạo Node, thêm component PassengerSpawner.
 * 2. Kéo prefab Stickman vào trường `stickmanPrefab`.
 * 3. Khi chạy, khách tự động được sinh tại các BusStop tìm thấy trong Scene.
 *
 * Cũng có thể gọi runtime:
 *   spawner.spawnAt(busStop, BusColor.RED)
 *   spawner.spawnBatch(busStop, [RED, BLUE, RED])
 */
@ccclass('PassengerSpawner')
export class PassengerSpawner extends Component {

    public static instance: PassengerSpawner | null = null;

    @property({ type: Prefab, tooltip: 'Prefab Stickman (phải có PassengerController)' })
    public stickmanPrefab: Prefab | null = null;

    public autoSpawn: boolean = true;
    public maxVisibleQueue: number = 10;

    private _remainingPassengerColors: Map<BusStop, BusColor[]> = new Map();

    // ─── Lifecycle ───────────────────────────────

    protected onLoad(): void {
        PassengerSpawner.instance = this;
    }

    protected onDestroy(): void {
        if (PassengerSpawner.instance === this) {
            PassengerSpawner.instance = null;
        }
    }

    start(): void {
        console.log(`[Spawner] 🏁 start() — autoSpawn=${this.autoSpawn}, prefab=${this.stickmanPrefab ? 'OK' : 'MISSING!'}`);

        if (this.autoSpawn) {
            // Delay 0.1s để chờ tất cả component khác (BusStop, ColorManager) init xong
            this.scheduleOnce(() => {
                this.spawnAll();
            }, 0.1);
        }
    }

    // ─── Public API ──────────────────────────────

    /**
     * Sinh tất cả khách bằng cách tự động lấy các BusStop trong Scene
     * và phân phối đều màu sắc từ bể màu xe buýt (bể màu của màn chơi).
     */
    public spawnAll(): void {
        const stops = director.getScene()?.getComponentsInChildren(BusStop) || [];
        if (stops.length === 0) {
            console.warn('[Spawner] ⚠️ Không tìm thấy BusStop nào trong Scene!');
            return;
        }

        const colorGroups = this._generateGlobalColorGroups();
        if (colorGroups.length === 0) {
            console.warn('[Spawner] ⚠️ Bể màu trống (không tìm thấy xe buýt hoặc xe không có chỗ ngồi)!');
            return;
        }

        // Khởi tạo hàng đợi cho từng bến
        const stopQueues = new Map<BusStop, BusColor[]>();
        for (const stop of stops) {
            stopQueues.set(stop, []);
        }

        // Phân phối nguyên nhóm màu vào các bến luân phiên để tránh khách bị lẻ 1 màu
        let stopIdx = 0;
        for (const group of colorGroups) {
            const stop = stops[stopIdx % stops.length];
            stopQueues.get(stop)!.push(...group);
            stopIdx++;
        }

        // Lưu trữ vào _remainingPassengerColors và tiến hành sinh đợt đầu
        this._remainingPassengerColors = stopQueues;

        for (const stop of stops) {
            const queue = this._remainingPassengerColors.get(stop) || [];
            const initialSpawnCount = Math.min(queue.length, this.maxVisibleQueue);
            const initialColors = queue.splice(0, initialSpawnCount);

            for (const color of initialColors) {
                this.spawnAt(stop, color);
            }

            console.log(`[Spawner] 🧍 Khởi tạo bến "${stop.node.name}": sinh ${initialSpawnCount} khách, còn lại ${queue.length} trong hàng chờ.`);
        }
    }

    /**
     * Hàm được gọi từ BusStop khi 1 hành khách rời hàng đợi.
     * Sẽ sinh thêm hành khách mới từ hàng chờ nếu còn.
     */
    public onPassengerDeparted(busStop: BusStop): void {
        const nextColor = this._remainingPassengerColors.get(busStop)?.shift();
        if (nextColor !== undefined) {
            this.spawnAt(busStop, nextColor);
        }
    }

    public getRemainingCount(busStop: BusStop): number {
        return this._remainingPassengerColors.get(busStop)?.length || 0;
    }

    /**
     * Sinh 1 khách tại bến với màu chỉ định.
     */
    public spawnAt(busStop: BusStop, color: BusColor): PassengerController | null {
        if (!this.stickmanPrefab) return null;

        const node = instantiate(this.stickmanPrefab);
        const passenger = node.getComponent(PassengerController) || node.addComponent(PassengerController);
        passenger.passengerColor = color;

        if (ColorManager.instance) ColorManager.instance.applyStickmanColor(node, color);
        else passenger.init(color);

        busStop.addPassenger(passenger);
        return passenger;
    }

    /**
     * Sinh nhiều khách tại 1 bến.
     */
    public spawnBatch(busStop: BusStop, colors: BusColor[]): PassengerController[] {
        const results = colors.map(color => this.spawnAt(busStop, color)).filter(p => p !== null) as PassengerController[];
        console.log(`[Spawner] 🧍 Spawned ${results.length} passengers at "${busStop.node.name}"`);
        return results;
    }

    /**
     * Sinh thêm 1 khách random tại bến.
     */
    public spawnRandom(busStop: BusStop): PassengerController | null {
        return this.spawnAt(busStop, this._getRandomColor());
    }

    // ─── Helpers ─────────────────────────────────

    private _getRandomColor(): BusColor {
        if (ColorManager.instance) {
            return ColorManager.instance.getRandomConfiguredColor();
        }
        const all = [BusColor.RED, BusColor.BLUE, BusColor.YELLOW, BusColor.GREEN, BusColor.PURPLE];
        return all[Math.floor(Math.random() * all.length)];
    }

    private _generateGlobalColorGroups(): BusColor[][] {
        const groups: BusColor[][] = [];
        const buses = director.getScene()?.getComponentsInChildren(BusController) || [];
        for (const bus of buses) {
            let count = bus.maxPassengers || 4;
            const color = bus.busColor;
            
            // Chia hành khách của xe này thành các nhóm nhỏ (2-4 người) để tránh lẻ tẻ 1 màu
            while (count > 0) {
                let groupSize = 2; // Mặc định
                if (count >= 4) {
                    groupSize = Math.floor(Math.random() * 3) + 2; // random 2, 3, or 4
                } else if (count === 3) {
                    groupSize = 3;
                } else {
                    groupSize = count; // Nếu còn 1 hoặc 2 thì lấy nốt
                }

                // Tránh tình trạng nhóm này lấy xong làm thừa lại đúng 1 người
                if (count - groupSize === 1) {
                    groupSize -= 1; 
                }

                const group = Array(groupSize).fill(color);
                groups.push(group);
                count -= groupSize;
            }
        }

        // Trộn ngẫu nhiên các nhóm (thay vì trộn từng người lẻ)
        for (let i = groups.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [groups[i], groups[j]] = [groups[j], groups[i]];
        }

        // Đảm bảo nhóm màu của xe buýt đầu tiên nằm ở đầu tiên để người chơi có thể chơi ngay
        if (buses.length > 0) {
            const firstBusColor = buses[0].busColor;
            const idx = groups.findIndex(g => g[0] === firstBusColor);
            if (idx >= 0) {
                const firstGroup = groups.splice(idx, 1)[0];
                groups.unshift(firstGroup);
            }
        }

        return groups;
    }
}

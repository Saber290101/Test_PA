import {
    _decorator, Component, Node, CCFloat, CCBoolean, RigidBody,
    Enum, Collider, Tween, Vec3
} from 'cc';
import { BusStop } from '../BusStop';
import { ParkingManager } from './ParkingManager';
import { BusColor, BusState } from '../GameEnums';
import { ColorManager } from './ColorManager';
import { RaycastUtils } from '../Movement/RaycastUtils';
import { GateCheck } from '../Point/GateCheck';
import { Gamecontroller } from './Gamecontroller';

// ─── Sub-modules ────────────────────────────────
import { BusInitialMovement } from './BusInitialMovement';
import { BusBoardingManager } from './BusBoardingManager';
import { BusRouteManager } from './BusRouteManager';
import { ViewportChecker } from './ViewportChecker';
import { BusAnimationManager } from './BusAnimationManager';
import { PathFollower } from '../Movement/PathFollower';

const { ccclass, property } = _decorator;

@ccclass('BusController')
export class BusController extends Component {

    // ─── Inspector: Vehicle Identity ────────────────

    @property({ type: Node, tooltip: 'Node gốc chứa hướng di chuyển (forward = hướng bắn ray)' })
    public startNode: Node = null;

    @property({ type: Node, tooltip: 'Node lip (nắp xe / indicator)' })
    public lip: Node = null;

    @property({ type: Enum(BusColor), tooltip: 'Màu xe buýt' })
    public busColor: BusColor = BusColor.RED;

    @property({ tooltip: 'Tốc độ di chuyển khi bắn thẳng (initial move)' })
    public moveSpeed: number = 20;

    @property({ tooltip: 'Khoảng cách an toàn khi bắn thẳng (raycast)' })
    public safeDistance: number = 1.0;

    @property(CCBoolean)
    public isOneWay: boolean = false;

    @property(CCBoolean)
    public isCharIntro: boolean = false;

    // ─── Inspector: Bus Config ──────────────────────

    public passengerSeats: Node[] = [];

    @property({ tooltip: 'Sức chứa tối đa (4, 6, hoặc 10)' })
    public maxPassengers: number = 4;

    @property({ type: Node, tooltip: 'Vị trí dừng đón khách (kéo Node trên đường vào)' })
    public stopNode: Node | null = null;

    @property({ type: BusStop, tooltip: 'Bến xe tương ứng' })
    public busStop: BusStop | null = null;

    @property({ type: ParkingManager, tooltip: 'Quản lý parking' })
    public parkingManager: ParkingManager | null = null;

    @property(CCFloat)
    public speed: number = 20;

    @property(CCFloat)
    public crashOffset: number = 0;

    @property({ tooltip: 'Delay giữa mỗi lần đón khách (giây)' })
    public boardingDelay: number = 0.1;

    // ─── Runtime State ──────────────────────────────

    public currentPassengers: number = 0;
    public parkingSlotIndex: number = -1;
    public isBoardingPassengers: boolean = false;
    public isParked: boolean = false;

    private _state: BusState = BusState.PARKED;
    private _pathFollower: PathFollower | null = null;

    // ─── Sub-modules Instances ──────────────────────

    public initialMovement: BusInitialMovement;
    public boardingManager: BusBoardingManager;
    public routeManager: BusRouteManager;
    public viewportChecker: ViewportChecker;
    public animationManager: BusAnimationManager;


    // ─── Lifecycle ──────────────────────────────────

    onLoad(): void {
        this._pathFollower = this.getComponent(PathFollower);
        this._state = BusState.PARKED;

        // Khởi tạo các sub-modules
        this.initialMovement = new BusInitialMovement(this);
        this.boardingManager = new BusBoardingManager(this);
        this.routeManager = new BusRouteManager(this);
        this.viewportChecker = new ViewportChecker(this.node);
        this.animationManager = new BusAnimationManager(this);

        this.boardingManager.autoDiscoverSeats();
        this.animationManager.initialize();
    }

    start(): void {
        // Áp dụng màu cho xe
        ColorManager.instance?.applyColorToNode(this.node, this.busColor);

        this.routeManager.initializeStops();
        this.boardingManager.hideAllSeats();
        this.animationManager.updateState(this._state);

        // Đăng ký callback khi PathFollower đến waypoint
        if (this.pathFollower) {
            this.pathFollower.onReachWaypoint = this._onReachWaypoint.bind(this);
        }

        // Auto-start cho intro
        if (this.isCharIntro) {
            this.scheduleOnce(() => {
                if (this.isCharIntro) this.onClick();
            }, 0.75);
        }
    }

    update(dt: number): void {
        this.initialMovement.update(dt);
        this.viewportChecker.update();
    }

    public get state(): BusState { return this._state; }
    public setState(newState: BusState): void {
        this._state = newState;
        this.animationManager.updateState(this._state);
    }

    public get pathFollower(): PathFollower {
        if (!this._pathFollower) this._pathFollower = this.getComponent(PathFollower);
        return this._pathFollower!;
    }

    public onClick(): void {
        if (this.initialMovement.isMoving) return;
        if (this.pathFollower?.isMoving) return;

        if (this._state === BusState.PARKED && this.isParked) {
            this.onClickParking();
            return;
        }

        if (this._state !== BusState.PARKED) return;

        Tween.stopAllByTarget(this.node);
        this.initialMovement.startMove();
    }

    public onClickParking(): void {
        if (!this.isParked || this.isBoardingPassengers) return;

        this.isParked = false;
        this.setState(BusState.ENTERING);
        this.setCollidersEnabled(true);

        if (this.parkingManager && this.parkingSlotIndex >= 0) {
            this.parkingManager.freeSlot(this.parkingSlotIndex);
            this.parkingSlotIndex = -1;
        }

        this.routeManager.handleDriveFromParking();
    }

    public canMove(): boolean {
        if (!this.node?.isValid) return false;
        return RaycastUtils.canMove(this.startNode, this.safeDistance);
    }

    public setGateCheckInfo(gateCheck: GateCheck, stopIdx: number): void {
        this.routeManager.setGateCheckInfo(gateCheck, stopIdx);
    }

    public onReachStopPoint(): void {
        this.routeManager.onReachStopPoint();
    }

    public startMovingAlongPath(path: Vec3[], speed: number, wpIndices: number[], onComplete: () => void): void {
        this.pathFollower.startPath(path, speed, wpIndices, onComplete);
    }

    public checkAndDestroyIfOutOfViewport(): void {
        this.viewportChecker.startChecking();
    }

    public setLipActive(active: boolean): void {
        if (this.lip) this.lip.active = active;
    }

    public setRigidBodyGroup(group: number): void {
        const rb = this.node.getComponent(RigidBody);
        if (rb) rb.group = group;
    }

    public setCollidersEnabled(enabled: boolean): void {
        const colliders = this.node.getComponents(Collider);
        for (const c of colliders) {
            c.enabled = enabled;
        }
        const childColliders = this.node.getComponentsInChildren(Collider);
        for (const c of childColliders) {
            c.enabled = enabled;
        }
    }

    private _onReachWaypoint(pathIdx: number, wpIdx: number): void {
        const gateCheck = this.routeManager.gateCheck;
        if (this._state === BusState.EXITING && gateCheck &&
            gateCheck.wayPoints.length >= 2 &&
            wpIdx === gateCheck.wayPoints.length - 2) {
            Gamecontroller.instance?.playBarrierAnimation();
        }
    }
}

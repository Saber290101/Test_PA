import { _decorator, Component, Node, Animation, CCBoolean, input, Input } from 'cc';
import { GlobalEvent } from '../Utility/Event/GlobalEvent';
import EventManager from '../Utility/EventManager';
const { ccclass, property } = _decorator;

@ccclass('Gamecontroller')
export class Gamecontroller extends Component {
    public static instance: Gamecontroller = null;

    @property(Node)
    map: Node = null;

    @property(Node)
    store: Node = null;

    @property(Node)
    tapToPlay: Node = null;

    @property(Animation)
    public barrierAnim: Animation = null;
    public countMove = 0;
    public completedBusCount = 0;
    public listCharacter: Node[] = [];

    public isEndGame: boolean = false;
    public startCountTime: boolean = false;
    public hasOpenedStoreAtMove3: boolean = false;

    protected onLoad(): void {
        Gamecontroller.instance = this;
        this.pushToListChar();
    }

    private pushToListChar() {
        this.listCharacter = [];
        this.map.children.forEach(generateDataNode => {
            generateDataNode.children.forEach(skModelNode => {
                const busController = skModelNode.getComponent('BusController') as any;
                if (busController) {
                    this.listCharacter.push(skModelNode);
                }
            });
        });
    }

    public checkCharCanMove() {
        this.scheduleOnce(() => {
            let contCharCanMove = 0;

            for (let i = this.listCharacter.length - 1; i >= 0; i--) {
                const characterNode = this.listCharacter[i];

                if (!characterNode || !characterNode.isValid) {
                    this.listCharacter.splice(i, 1);
                    continue;
                }
                const busController = characterNode.getComponent('BusController') as any;
                if (!busController) {
                    this.listCharacter.splice(i, 1);
                    continue;
                }
                const canMove = busController.canMove();

                if (canMove) {
                    contCharCanMove++;
                }
            }

            if (this.listCharacter.length === 0) {
                if (this.isEndGame) return;
                console.log("All characters have reached the target, you win! / THẮNG");
                this.showWin();
            } else if (contCharCanMove === 0) {
                if (this.isEndGame) return;
                console.log("No characters can move, game over / THUA");
                this.endGame();
            }
        }, 0.05);
    }

    endGame() {
        if (Gamecontroller.instance.isEndGame) return;
        Gamecontroller.instance.isEndGame = true;
        console.log("GAME LOSE / THUA");
        this.store.active = true;
        EventManager.instance.emit(GlobalEvent.SHOW_LOSE);
    }

    showWin() {
        if (Gamecontroller.instance.isEndGame) return;
        Gamecontroller.instance.isEndGame = true;
        console.log("GAME WIN / THẮNG");
        this.store.active = true;
        EventManager.instance.emit(GlobalEvent.SHOW_WIN);
    }

    public increaseMove() {
        if (this.tapToPlay && this.tapToPlay.active) {
            this.tapToPlay.active = false;
        }
        this.countMove++;
        console.log("Count move: " + this.countMove);
    }

    public busCompleted() {
        this.completedBusCount++;
        console.log("Completed bus count: " + this.completedBusCount);
        if (this.completedBusCount === 3 && !this.hasOpenedStoreAtMove3) {
            this.hasOpenedStoreAtMove3 = true;
            input.once(Input.EventType.TOUCH_START, () => {
                this.store.active = true;
                GlobalEvent.instance().dispatchEvent(GlobalEvent.OPEN_STORE);
            });
        }
    }

    public playBarrierAnimation(): void {
        if (this.barrierAnim) {
            console.log("[Gamecontroller] 🚪 Playing barrier animation");
            this.barrierAnim.play();
        }
    }
}
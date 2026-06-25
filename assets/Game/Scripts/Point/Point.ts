import { _decorator, BoxCollider, Component, easing, ITriggerEvent, Node, Quat, Tween, tween, Vec3 } from 'cc';
import { Gamecontroller } from '../Controller/Gamecontroller';
import type { BusController } from '../Controller/BusController';
const { ccclass, property } = _decorator;

@ccclass('Point')
export class Point extends Component {
    @property(Node)
    endPos: Node = null;
    @property(Node)
    pointClose: Node = null;
    @property(Node)
    endClose: Node = null;
    @property({ tooltip: "Vận tốc di chuyển (đơn vị/giây)" })
    speed: number = 3;
    eulerAnglesY: number = 0;
    private resultEndPos: Node = null;

    public moveWithOneWay(characterNode: Node) {
        this.findAndLogNearestChild(characterNode);
        this.rotateCharacterToTarget(characterNode);
    }

    private findNearestChild(characterNode: Node): { nearestChild: Node | null, minDistance: number } {
        let nearestChild: Node = null;
        let minDistance = Infinity;

        if (this.pointClose && this.pointClose.children.length > 0) {
            const charWorldPos = characterNode.worldPosition.clone();

            this.pointClose.children.forEach((child: Node) => {
                const childWorldPos = child.worldPosition.clone();
                const dist = Vec3.distance(charWorldPos, childWorldPos);

                if (dist < minDistance) {
                    minDistance = dist;
                    nearestChild = child;
                }
            });
        }

        return { nearestChild, minDistance };
    }
    private findNearestEndChild(nearestChild: Node): { nearestChild: Node | null, minDistance: number } {
        let nearestEnd: Node = null;
        let minDistance = Infinity;
        if (this.endClose && this.endClose.children.length > 0 && nearestChild) {
            const point = nearestChild.worldPosition.clone();
            this.endClose.children.forEach((endPos: Node) => {
                const endWorldPos = endPos.worldPosition.clone();
                const dist = Vec3.distance(point, endWorldPos);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestEnd = endPos;
                }
            });
            if (nearestEnd) {
                this.resultEndPos = nearestEnd;
                console.log("Nearest End Pos: " + nearestEnd.name + ", Distance: " + minDistance.toFixed(2));
            }
        }
        return { nearestChild: nearestEnd, minDistance };
    }

    private findAndLogNearestChild(characterNode: Node): void {
        const { nearestChild, minDistance } = this.findNearestChild(characterNode);

        if (nearestChild) {
            console.log(`Node close: ${nearestChild.name}, Distance : ${minDistance.toFixed(2)}`);
        }
    }

    private rotateCharacterToTarget(characterNode: Node): void {
        const targetAngle = characterNode.eulerAngles.y < 0 ? -180 : 180;

        tween(characterNode)
            .to(0.1, { eulerAngles: new Vec3(0, targetAngle, 0) })
            .start();
    }

    private moveCharacterToEnd(characterNode: Node): void {
        const targetWorldPos = this.endPos.worldPosition.clone();
        const distance = Vec3.distance(characterNode.worldPosition, targetWorldPos);
        const moveTime = distance / this.speed;

        tween(characterNode)
            .to(moveTime, { worldPosition: targetWorldPos })
            .call(() => {
                if (characterNode.getComponent('BusController')) {
                    Gamecontroller.instance.busCompleted();
                }
                Gamecontroller.instance.checkCharCanMove();
                characterNode.destroy();
            })
            .start();
    }

    moveWithRotation(characterNode: Node) {
        console.log("Move with rotation");

        const { nearestChild, minDistance } = this.findNearestChild(characterNode);

        if (nearestChild) {
            console.log(`Node gần nhất: ${nearestChild.name}, Khoảng cách: ${minDistance.toFixed(2)}`);
        }

        const { nearestChild: nearestEnd } = this.findNearestEndChild(nearestChild);
        const radius = this.calculateRadius(characterNode);
        const rotationTime = minDistance / this.speed;

        if (nearestChild) {
            this.calculateAndSetRotationAngle(characterNode, nearestChild);
        }

        this.rotateCharacterToTangent(characterNode, radius, nearestChild, nearestEnd);
        this.scheduleNodeRotation(rotationTime, characterNode);
    }

    private calculateRadius(characterNode: Node): Vec3 {
        const radius = new Vec3();
        Vec3.subtract(radius, characterNode.worldPosition, this.node.worldPosition);
        radius.y = 0;
        return radius;
    }

    private calculateAndSetRotationAngle(characterNode: Node, nearestChild: Node): void {
        const centerWorldPos = this.node.worldPosition.clone(); // B
        const charWorldPos = characterNode.worldPosition.clone(); // A
        const nearestWorldPos = nearestChild.worldPosition.clone(); // C

        // Vector BA (từ B đến A)
        const vectorBA = new Vec3();
        Vec3.subtract(vectorBA, charWorldPos, centerWorldPos);
        vectorBA.y = 0;

        // Vector BC (từ B đến C)
        const vectorBC = new Vec3();
        Vec3.subtract(vectorBC, nearestWorldPos, centerWorldPos);
        vectorBC.y = 0;

        // Tính góc ABC bằng công thức: cos(ABC) = (BA · BC) / (|BA| * |BC|)
        const dotProduct = Vec3.dot(vectorBA, vectorBC);
        const lengthBA = vectorBA.length();
        const lengthBC = vectorBC.length();

        const cosAngle = dotProduct / (lengthBA * lengthBC);
        const angleABC_Radians = Math.acos(Math.max(-1, Math.min(1, cosAngle))); // Clamp để tránh lỗi làm tròn
        let angleABC_Degrees = angleABC_Radians * (180 / Math.PI);

        // Tính cross product để xác định chiều quay
        // Nếu BA x BC có y dương: C nằm bên trái A (quay ngược kim đồng hồ)
        // Nếu BA x BC có y âm: C nằm bên phải A (quay thuận kim đồng hồ)
        const crossProduct = new Vec3();
        Vec3.cross(crossProduct, vectorBA, vectorBC);

        if (crossProduct.y < 0) {
            // C nằm bên phải A -> quay ngược kim đồng hồ (góc âm)
            angleABC_Degrees = -angleABC_Degrees;
        }

        this.eulerAnglesY = angleABC_Degrees;
        console.log(`Góc ABC (tại tâm B): ${angleABC_Degrees.toFixed(2)}° (${crossProduct.y < 0 ? 'Ngược' : 'Thuận'} kim đồng hồ)`);
    }

    private rotateCharacterToTangent(characterNode: Node, radius: Vec3, nearestChild: Node, nearestEnd: Node): void {
        // Tính góc ABC với A = characterNode, B = nearestChild, C = nearestEnd
        let angleABC_Degrees;
        if (nearestChild && nearestEnd) {
            const posA = characterNode.worldPosition.clone(); // A
            const posB = nearestChild.worldPosition.clone();  // B
            const posC = nearestEnd.worldPosition.clone();    // C

            // Vector BA (từ B đến A)
            const vectorBA = new Vec3();
            Vec3.subtract(vectorBA, posA, posB);
            vectorBA.y = 0;

            // Vector BC (từ B đến C)
            const vectorBC = new Vec3();
            Vec3.subtract(vectorBC, posC, posB);
            vectorBC.y = 0;

            // Tính góc ABC
            const dotProduct = Vec3.dot(vectorBA, vectorBC);
            const lengthBA = vectorBA.length();
            const lengthBC = vectorBC.length();

            if (lengthBA > 0 && lengthBC > 0) {
                const cosAngle = dotProduct / (lengthBA * lengthBC);
                const angleABC_Radians = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
                angleABC_Degrees = angleABC_Radians * (180 / Math.PI);

                // console.log(`Góc ABC (A=Character, B=Point, C=End): ${angleABC_Degrees.toFixed(2)}°`);
            }
        }

        radius.normalize();

        // Tính tangent dựa trên chiều quay
        // Nếu quay thuận kim (dương): tangent = (z, 0, -x)
        // Nếu quay ngược kim (âm): tangent = (-z, 0, x)
        const tangent = this.eulerAnglesY >= 0
            ? new Vec3(radius.z, 0, -radius.x)  // Thuận kim
            : new Vec3(-radius.z, 0, radius.x); // Ngược kim

        const angle = Math.atan2(tangent.x, tangent.z);
        let targetAngle = angle * (180 / Math.PI);
        const currentAngle = characterNode.eulerAngles.y;

        let deltaAngle = targetAngle - currentAngle;
        while (deltaAngle > 180) deltaAngle -= 360;
        while (deltaAngle < -180) deltaAngle += 360;

        const finalAngle = currentAngle + deltaAngle;
        if (angleABC_Degrees <= 150) {
            tween(characterNode)
                .to(0.05, { eulerAngles: new Vec3(0, finalAngle, 0) }, { easing: easing.quadInOut })
                .start();
        }
    }

    private scheduleNodeRotation(rotationTime: number, characterNode: Node): void {
        // Chuẩn hóa góc về khoảng -180 đến 180
        let normalizedAngle = this.eulerAnglesY;
        while (normalizedAngle > 180) normalizedAngle -= 360;
        while (normalizedAngle < -180) normalizedAngle += 360;

        // Kiểm tra nếu góc gần 0 hoặc gần 180/-180 thì không cần quay
        const threshold = 15; // Ngưỡng sai số 1 độ
        if (Math.abs(normalizedAngle) < threshold || Math.abs(Math.abs(normalizedAngle) - 180) < threshold) {
            console.log(`Góc quay ${normalizedAngle.toFixed(2)}° quá nhỏ hoặc cùng hướng, bỏ qua rotation`);
            // Bỏ qua rotation, move trực tiếp
            if (this.resultEndPos) {
                this.moveCharacterToNearestEnd(characterNode);
            }
            return;
        }

        this.scheduleOnce(() => {
            tween(this.node)
                .to(rotationTime, { eulerAngles: new Vec3(0, normalizedAngle, 0) })
                .call(() => {
                    // Sau khi rotation xong, move character tới end pos gần nhất
                    if (this.resultEndPos) {
                        this.moveCharacterToNearestEnd(characterNode);
                    }
                })
                .start();
        }, 0);
    }

    private moveCharacterToNearestEnd(characterNode: Node): void {
        if (!this.resultEndPos) return;

        //    Tween.stopAllByTarget(characterNode);
        const targetWorldPos = this.resultEndPos.worldPosition.clone();
        const charWorldPos = characterNode.worldPosition.clone();

        // Tính hướng từ character tới end pos (world space)
        const direction = new Vec3();
        Vec3.subtract(direction, targetWorldPos, charWorldPos);
        direction.y = 0; // Chỉ xét trên mặt phẳng ngang

        // Tính góc quay trong world space
        const angle = Math.atan2(direction.x, direction.z);
        const targetAngleWorld = angle * (180 / Math.PI);

        // Trừ đi góc của parent để có góc local chính xác
        const parentAngle = this.node.eulerAngles.y;
        let targetAngleLocal = targetAngleWorld - parentAngle;

        // Chuẩn hóa góc về khoảng -180 đến 180
        while (targetAngleLocal > 180) targetAngleLocal -= 360;
        while (targetAngleLocal < -180) targetAngleLocal += 360;

        // Tính delta angle để tìm đường quay ngắn nhất
        const currentAngle = characterNode.eulerAngles.y;
        let deltaAngle = targetAngleLocal - currentAngle;
        while (deltaAngle > 180) deltaAngle -= 360;
        while (deltaAngle < -180) deltaAngle += 360;

        const finalAngle = currentAngle + deltaAngle;

        const distance = Vec3.distance(charWorldPos, targetWorldPos);
        const moveTime = distance / this.speed;

        // Kiểm tra nếu góc gần 0 hoặc gần 180/-180 thì không cần quay
        const threshold = 1; // Ngưỡng sai số 1 độ
        if (Math.abs(deltaAngle) < threshold || Math.abs(Math.abs(deltaAngle) - 180) < threshold) {
            console.log(`Góc quay character ${deltaAngle.toFixed(2)}° quá nhỏ hoặc cùng hướng, bỏ qua rotation`);
            // Bỏ qua rotation, move trực tiếp
            tween(characterNode)
                .to(moveTime, { worldPosition: targetWorldPos })
                .call(() => {
                    if (characterNode.getComponent('BusController')) {
                        Gamecontroller.instance.busCompleted();
                    }
                    Gamecontroller.instance.checkCharCanMove();
                    characterNode.destroy();
                    this.node.setRotation(Quat.IDENTITY);
                })
                .start();
        } else {
            // Quay character theo đường ngắn nhất, sau đó di chuyển
            console.log(`Quay character từ ${currentAngle.toFixed(2)}° đến ${finalAngle.toFixed(2)}° (delta: ${deltaAngle.toFixed(2)}°)`);
            tween(characterNode)
                .to(0.1, { eulerAngles: new Vec3(0, finalAngle, 0) }, { easing: easing.quadInOut })
                .to(moveTime, { worldPosition: targetWorldPos })
                .call(() => {
                    if (characterNode.getComponent('BusController')) {
                        Gamecontroller.instance.busCompleted();
                    }
                    Gamecontroller.instance.checkCharCanMove();
                    characterNode.destroy();
                    this.node.setRotation(Quat.IDENTITY);
                })
                .start();
        }
    }
    stopAllTween() {
        Tween.stopAllByTarget(this.node);
    }
    moveToEndPos(characterNode: Node) {
        Tween.stopAllByTarget(characterNode);
        const targetWorldPos = this.resultEndPos.worldPosition.clone();
        const distance = Vec3.distance(characterNode.worldPosition, targetWorldPos);
        const moveTime = distance / this.speed;

        tween(characterNode)
            .to(moveTime, { worldPosition: targetWorldPos })
            .call(() => {
                if (characterNode.getComponent('BusController')) {
                    Gamecontroller.instance.busCompleted();
                }
                Gamecontroller.instance.checkCharCanMove();
                characterNode.destroy();
                this.node.setRotation(Quat.IDENTITY);
            })
            .start();
    }



}



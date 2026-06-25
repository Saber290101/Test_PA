System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, easing, Node, Quat, Tween, tween, Vec3, Gamecontroller, BusController, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Point;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGamecontroller(extras) {
    _reporterNs.report("Gamecontroller", "../Controller/Gamecontroller", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "../Controller/BusController", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      easing = _cc.easing;
      Node = _cc.Node;
      Quat = _cc.Quat;
      Tween = _cc.Tween;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Gamecontroller = _unresolved_2.Gamecontroller;
    }, function (_unresolved_3) {
      BusController = _unresolved_3.BusController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "96315S+VMBDPbQuepet77qD", "Point", undefined);

      __checkObsolete__(['_decorator', 'BoxCollider', 'Component', 'easing', 'ITriggerEvent', 'Node', 'Quat', 'Tween', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Point", Point = (_dec = ccclass('Point'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property({
        tooltip: "Vận tốc di chuyển (đơn vị/giây)"
      }), _dec(_class = (_class2 = class Point extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "endPos", _descriptor, this);

          _initializerDefineProperty(this, "pointClose", _descriptor2, this);

          _initializerDefineProperty(this, "endClose", _descriptor3, this);

          _initializerDefineProperty(this, "speed", _descriptor4, this);

          this.eulerAnglesY = 0;
          this.resultEndPos = null;
        }

        moveWithOneWay(characterNode) {
          this.findAndLogNearestChild(characterNode);
          this.rotateCharacterToTarget(characterNode);
        }

        findNearestChild(characterNode) {
          let nearestChild = null;
          let minDistance = Infinity;

          if (this.pointClose && this.pointClose.children.length > 0) {
            const charWorldPos = characterNode.worldPosition.clone();
            this.pointClose.children.forEach(child => {
              const childWorldPos = child.worldPosition.clone();
              const dist = Vec3.distance(charWorldPos, childWorldPos);

              if (dist < minDistance) {
                minDistance = dist;
                nearestChild = child;
              }
            });
          }

          return {
            nearestChild,
            minDistance
          };
        }

        findNearestEndChild(nearestChild) {
          let nearestEnd = null;
          let minDistance = Infinity;

          if (this.endClose && this.endClose.children.length > 0 && nearestChild) {
            const point = nearestChild.worldPosition.clone();
            this.endClose.children.forEach(endPos => {
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

          return {
            nearestChild: nearestEnd,
            minDistance
          };
        }

        findAndLogNearestChild(characterNode) {
          const {
            nearestChild,
            minDistance
          } = this.findNearestChild(characterNode);

          if (nearestChild) {
            console.log(`Node close: ${nearestChild.name}, Distance : ${minDistance.toFixed(2)}`);
          }
        }

        rotateCharacterToTarget(characterNode) {
          const targetAngle = characterNode.eulerAngles.y < 0 ? -180 : 180;
          tween(characterNode).to(0.1, {
            eulerAngles: new Vec3(0, targetAngle, 0)
          }).start();
        }

        moveCharacterToEnd(characterNode) {
          const targetWorldPos = this.endPos.worldPosition.clone();
          const distance = Vec3.distance(characterNode.worldPosition, targetWorldPos);
          const moveTime = distance / this.speed;
          tween(characterNode).to(moveTime, {
            worldPosition: targetWorldPos
          }).call(() => {
            if (characterNode.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
              error: Error()
            }), BusController) : BusController)) {
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.busCompleted();
            }

            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            characterNode.destroy();
          }).start();
        }

        moveWithRotation(characterNode) {
          console.log("Move with rotation");
          const {
            nearestChild,
            minDistance
          } = this.findNearestChild(characterNode);

          if (nearestChild) {
            console.log(`Node gần nhất: ${nearestChild.name}, Khoảng cách: ${minDistance.toFixed(2)}`);
          }

          const {
            nearestChild: nearestEnd
          } = this.findNearestEndChild(nearestChild);
          const radius = this.calculateRadius(characterNode);
          const rotationTime = minDistance / this.speed;

          if (nearestChild) {
            this.calculateAndSetRotationAngle(characterNode, nearestChild);
          }

          this.rotateCharacterToTangent(characterNode, radius, nearestChild, nearestEnd);
          this.scheduleNodeRotation(rotationTime, characterNode);
        }

        calculateRadius(characterNode) {
          const radius = new Vec3();
          Vec3.subtract(radius, characterNode.worldPosition, this.node.worldPosition);
          radius.y = 0;
          return radius;
        }

        calculateAndSetRotationAngle(characterNode, nearestChild) {
          const centerWorldPos = this.node.worldPosition.clone(); // B

          const charWorldPos = characterNode.worldPosition.clone(); // A

          const nearestWorldPos = nearestChild.worldPosition.clone(); // C
          // Vector BA (từ B đến A)

          const vectorBA = new Vec3();
          Vec3.subtract(vectorBA, charWorldPos, centerWorldPos);
          vectorBA.y = 0; // Vector BC (từ B đến C)

          const vectorBC = new Vec3();
          Vec3.subtract(vectorBC, nearestWorldPos, centerWorldPos);
          vectorBC.y = 0; // Tính góc ABC bằng công thức: cos(ABC) = (BA · BC) / (|BA| * |BC|)

          const dotProduct = Vec3.dot(vectorBA, vectorBC);
          const lengthBA = vectorBA.length();
          const lengthBC = vectorBC.length();
          const cosAngle = dotProduct / (lengthBA * lengthBC);
          const angleABC_Radians = Math.acos(Math.max(-1, Math.min(1, cosAngle))); // Clamp để tránh lỗi làm tròn

          let angleABC_Degrees = angleABC_Radians * (180 / Math.PI); // Tính cross product để xác định chiều quay
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

        rotateCharacterToTangent(characterNode, radius, nearestChild, nearestEnd) {
          // Tính góc ABC với A = characterNode, B = nearestChild, C = nearestEnd
          let angleABC_Degrees;

          if (nearestChild && nearestEnd) {
            const posA = characterNode.worldPosition.clone(); // A

            const posB = nearestChild.worldPosition.clone(); // B

            const posC = nearestEnd.worldPosition.clone(); // C
            // Vector BA (từ B đến A)

            const vectorBA = new Vec3();
            Vec3.subtract(vectorBA, posA, posB);
            vectorBA.y = 0; // Vector BC (từ B đến C)

            const vectorBC = new Vec3();
            Vec3.subtract(vectorBC, posC, posB);
            vectorBC.y = 0; // Tính góc ABC

            const dotProduct = Vec3.dot(vectorBA, vectorBC);
            const lengthBA = vectorBA.length();
            const lengthBC = vectorBC.length();

            if (lengthBA > 0 && lengthBC > 0) {
              const cosAngle = dotProduct / (lengthBA * lengthBC);
              const angleABC_Radians = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
              angleABC_Degrees = angleABC_Radians * (180 / Math.PI); // console.log(`Góc ABC (A=Character, B=Point, C=End): ${angleABC_Degrees.toFixed(2)}°`);
            }
          }

          radius.normalize(); // Tính tangent dựa trên chiều quay
          // Nếu quay thuận kim (dương): tangent = (z, 0, -x)
          // Nếu quay ngược kim (âm): tangent = (-z, 0, x)

          const tangent = this.eulerAnglesY >= 0 ? new Vec3(radius.z, 0, -radius.x) // Thuận kim
          : new Vec3(-radius.z, 0, radius.x); // Ngược kim

          const angle = Math.atan2(tangent.x, tangent.z);
          let targetAngle = angle * (180 / Math.PI);
          const currentAngle = characterNode.eulerAngles.y;
          let deltaAngle = targetAngle - currentAngle;

          while (deltaAngle > 180) deltaAngle -= 360;

          while (deltaAngle < -180) deltaAngle += 360;

          const finalAngle = currentAngle + deltaAngle;

          if (angleABC_Degrees <= 150) {
            tween(characterNode).to(0.05, {
              eulerAngles: new Vec3(0, finalAngle, 0)
            }, {
              easing: easing.quadInOut
            }).start();
          }
        }

        scheduleNodeRotation(rotationTime, characterNode) {
          // Chuẩn hóa góc về khoảng -180 đến 180
          let normalizedAngle = this.eulerAnglesY;

          while (normalizedAngle > 180) normalizedAngle -= 360;

          while (normalizedAngle < -180) normalizedAngle += 360; // Kiểm tra nếu góc gần 0 hoặc gần 180/-180 thì không cần quay


          const threshold = 15; // Ngưỡng sai số 1 độ

          if (Math.abs(normalizedAngle) < threshold || Math.abs(Math.abs(normalizedAngle) - 180) < threshold) {
            console.log(`Góc quay ${normalizedAngle.toFixed(2)}° quá nhỏ hoặc cùng hướng, bỏ qua rotation`); // Bỏ qua rotation, move trực tiếp

            if (this.resultEndPos) {
              this.moveCharacterToNearestEnd(characterNode);
            }

            return;
          }

          this.scheduleOnce(() => {
            tween(this.node).to(rotationTime, {
              eulerAngles: new Vec3(0, normalizedAngle, 0)
            }).call(() => {
              // Sau khi rotation xong, move character tới end pos gần nhất
              if (this.resultEndPos) {
                this.moveCharacterToNearestEnd(characterNode);
              }
            }).start();
          }, 0);
        }

        moveCharacterToNearestEnd(characterNode) {
          if (!this.resultEndPos) return; //    Tween.stopAllByTarget(characterNode);

          const targetWorldPos = this.resultEndPos.worldPosition.clone();
          const charWorldPos = characterNode.worldPosition.clone(); // Tính hướng từ character tới end pos (world space)

          const direction = new Vec3();
          Vec3.subtract(direction, targetWorldPos, charWorldPos);
          direction.y = 0; // Chỉ xét trên mặt phẳng ngang
          // Tính góc quay trong world space

          const angle = Math.atan2(direction.x, direction.z);
          const targetAngleWorld = angle * (180 / Math.PI); // Trừ đi góc của parent để có góc local chính xác

          const parentAngle = this.node.eulerAngles.y;
          let targetAngleLocal = targetAngleWorld - parentAngle; // Chuẩn hóa góc về khoảng -180 đến 180

          while (targetAngleLocal > 180) targetAngleLocal -= 360;

          while (targetAngleLocal < -180) targetAngleLocal += 360; // Tính delta angle để tìm đường quay ngắn nhất


          const currentAngle = characterNode.eulerAngles.y;
          let deltaAngle = targetAngleLocal - currentAngle;

          while (deltaAngle > 180) deltaAngle -= 360;

          while (deltaAngle < -180) deltaAngle += 360;

          const finalAngle = currentAngle + deltaAngle;
          const distance = Vec3.distance(charWorldPos, targetWorldPos);
          const moveTime = distance / this.speed; // Kiểm tra nếu góc gần 0 hoặc gần 180/-180 thì không cần quay

          const threshold = 1; // Ngưỡng sai số 1 độ

          if (Math.abs(deltaAngle) < threshold || Math.abs(Math.abs(deltaAngle) - 180) < threshold) {
            console.log(`Góc quay character ${deltaAngle.toFixed(2)}° quá nhỏ hoặc cùng hướng, bỏ qua rotation`); // Bỏ qua rotation, move trực tiếp

            tween(characterNode).to(moveTime, {
              worldPosition: targetWorldPos
            }).call(() => {
              if (characterNode.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
                error: Error()
              }), BusController) : BusController)) {
                (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                  error: Error()
                }), Gamecontroller) : Gamecontroller).instance.busCompleted();
              }

              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
              characterNode.destroy();
              this.node.setRotation(Quat.IDENTITY);
            }).start();
          } else {
            // Quay character theo đường ngắn nhất, sau đó di chuyển
            console.log(`Quay character từ ${currentAngle.toFixed(2)}° đến ${finalAngle.toFixed(2)}° (delta: ${deltaAngle.toFixed(2)}°)`);
            tween(characterNode).to(0.1, {
              eulerAngles: new Vec3(0, finalAngle, 0)
            }, {
              easing: easing.quadInOut
            }).to(moveTime, {
              worldPosition: targetWorldPos
            }).call(() => {
              if (characterNode.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
                error: Error()
              }), BusController) : BusController)) {
                (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                  error: Error()
                }), Gamecontroller) : Gamecontroller).instance.busCompleted();
              }

              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
              characterNode.destroy();
              this.node.setRotation(Quat.IDENTITY);
            }).start();
          }
        }

        stopAllTween() {
          Tween.stopAllByTarget(this.node);
        }

        moveToEndPos(characterNode) {
          Tween.stopAllByTarget(characterNode);
          const targetWorldPos = this.resultEndPos.worldPosition.clone();
          const distance = Vec3.distance(characterNode.worldPosition, targetWorldPos);
          const moveTime = distance / this.speed;
          tween(characterNode).to(moveTime, {
            worldPosition: targetWorldPos
          }).call(() => {
            if (characterNode.getComponent(_crd && BusController === void 0 ? (_reportPossibleCrUseOfBusController({
              error: Error()
            }), BusController) : BusController)) {
              (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
                error: Error()
              }), Gamecontroller) : Gamecontroller).instance.busCompleted();
            }

            (_crd && Gamecontroller === void 0 ? (_reportPossibleCrUseOfGamecontroller({
              error: Error()
            }), Gamecontroller) : Gamecontroller).instance.checkCharCanMove();
            characterNode.destroy();
            this.node.setRotation(Quat.IDENTITY);
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "endPos", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pointClose", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "endClose", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "speed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6c959f1a7f4e49f2b2091f8635b66622a3f25033.js.map
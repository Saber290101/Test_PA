System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, ColorManager, BusBoardingManager, _crd;

  function _reportPossibleCrUseOfBusController(extras) {
    _reporterNs.report("BusController", "./BusController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfColorManager(extras) {
    _reporterNs.report("ColorManager", "./ColorManager", _context.meta, extras);
  }

  _export("BusBoardingManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      ColorManager = _unresolved_2.ColorManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b603VsGSBISKu4yNH4q+y+", "BusBoardingManager", undefined);

      __checkObsolete__(['Node']);

      /**
       * Phụ trách logic đón khách của xe buýt.
       * Bao gồm quản lý ghế ngồi, đếm số lượng khách, tương tác với trạm xe (BusStop).
       */
      _export("BusBoardingManager", BusBoardingManager = class BusBoardingManager {
        constructor(bus) {
          this._bus = void 0;
          this._bus = bus;
        }
        /**
         * Tự động tìm kiếm các ghế ngồi trong node con nếu Inspector chưa gắn.
         */


        autoDiscoverSeats() {
          if (this._bus.passengerSeats.length > 0) return;

          const findSittingNodes = node => {
            for (const child of node.children) {
              const name = child.name.toLowerCase();

              if (name.includes('sit') || name.includes('passenger') || name.includes('seat') || name.includes('stickman')) {
                if (!child.getComponent('BusStop') && !child.getComponent('BusController')) {
                  this._bus.passengerSeats.push(child);
                }
              } else {
                findSittingNodes(child);
              }
            }
          };

          findSittingNodes(this._bus.node);

          this._bus.passengerSeats.sort((a, b) => a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base'
          }));
        }
        /**
         * Ẩn tất cả khách khi bắt đầu game.
         */


        hideAllSeats() {
          for (const seat of this._bus.passengerSeats) {
            if (seat) seat.active = false;
          }
        }
        /**
         * Bắt đầu quá trình đón khách.
         */


        startBoarding() {
          this._bus.isBoardingPassengers = true;
          this._bus.isParked = false;

          this._bus.scheduleOnce(() => this._boardNextPassenger(), 0.1);
        }
        /**
         * Xử lý đón từng khách lên xe theo tuần tự.
         */


        _boardNextPassenger() {
          var _this$_bus$node;

          if (!((_this$_bus$node = this._bus.node) != null && _this$_bus$node.isValid)) return; // Nếu xe đầy -> Kết thúc

          if (this._bus.currentPassengers >= this._bus.maxPassengers) {
            this._onBoardingComplete(true);

            return;
          } // Tìm trạm tương ứng


          const stop = this._bus.routeManager.currentBusStop || this._bus.busStop;

          if (!stop || stop.isEmpty()) {
            this._onBoardingComplete(false);

            return;
          } // Kiểm tra xem khách đầu tiên có đúng màu không


          const front = stop.peekFront();

          if (!front || front.passengerColor !== this._bus.busColor) {
            // Không có khách hoặc khách đầu tiên khác màu -> đi tìm bến khác hoặc về bãi
            this._onBoardingComplete(false);

            return;
          } // Cho khách lên xe


          const passenger = stop.popFront();
          this._bus.currentPassengers++;
          passenger.boardBus(this._bus.node.worldPosition.clone(), () => {
            var _passenger$node;

            this._activateSeat(this._bus.currentPassengers - 1);

            if ((_passenger$node = passenger.node) != null && _passenger$node.isValid) {
              passenger.node.destroy();
            } // Gọi đệ quy đón khách tiếp theo sau khoảng delay


            this._bus.scheduleOnce(() => this._boardNextPassenger(), this._bus.boardingDelay);
          });
        }
        /**
         * Được gọi khi xe đã đầy hoặc trạm hết khách.
         */


        _onBoardingComplete(isFull) {
          this._bus.isBoardingPassengers = false;

          if (isFull || this._bus.currentPassengers >= this._bus.maxPassengers) {
            this._bus.routeManager.driveToExit();
          } else {
            const nextStopIdx = this._bus.routeManager.findNextStopIdx(this._bus.routeManager.currentStopIdx);

            if (nextStopIdx >= 0) {
              this._bus.routeManager.driveToNextStop(nextStopIdx);
            } else {
              this._bus.routeManager.driveToParking();
            }
          }
        }
        /**
         * Kích hoạt mesh nhân vật ngồi trên ghế tương ứng.
         */


        _activateSeat(seatIdx) {
          const seatNode = this._bus.passengerSeats[seatIdx];
          if (!seatNode) return;
          seatNode.active = true;

          if ((_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
            error: Error()
          }), ColorManager) : ColorManager).instance) {
            (_crd && ColorManager === void 0 ? (_reportPossibleCrUseOfColorManager({
              error: Error()
            }), ColorManager) : ColorManager).instance.applyStickmanColor(seatNode, this._bus.busColor);
          }

          const animCtrl = seatNode.getComponent('StickmanAnimationController') || seatNode.addComponent('StickmanAnimationController');

          if (animCtrl) {
            animCtrl.playSit(0);
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b14aa00b7e6da358a424aea8bff9408d2230287b.js.map
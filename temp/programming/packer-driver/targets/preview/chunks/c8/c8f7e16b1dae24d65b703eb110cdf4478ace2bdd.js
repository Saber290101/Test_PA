System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, AudioClip, CCBoolean, Singleton, EventManager, GlobalEvent, super_html_playable, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _dec3, _dec4, _dec5, _dec6, _class4, _class5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, Sound, SoundManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "./EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobalEvent(extras) {
    _reporterNs.report("GlobalEvent", "./Event/GlobalEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsuper_html_playable(extras) {
    _reporterNs.report("super_html_playable", "./super_html_playable", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioSource = _cc.AudioSource;
      AudioClip = _cc.AudioClip;
      CCBoolean = _cc.CCBoolean;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      EventManager = _unresolved_3.default;
    }, function (_unresolved_4) {
      GlobalEvent = _unresolved_4.GlobalEvent;
    }, function (_unresolved_5) {
      super_html_playable = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5531donLXJGF7y4ahBs49Vy", "SoundManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'AudioSource', 'AudioClip', 'Node', 'CCBoolean']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Sound", Sound = (_dec = ccclass('Sound'), _dec2 = property({
        type: AudioClip
      }), _dec(_class = (_class2 = class Sound {
        constructor() {
          _initializerDefineProperty(this, "name", _descriptor, this);

          _initializerDefineProperty(this, "clip", _descriptor2, this);

          _initializerDefineProperty(this, "playOnAwake", _descriptor3, this);

          _initializerDefineProperty(this, "loop", _descriptor4, this);

          _initializerDefineProperty(this, "volume", _descriptor5, this);

          this.source = null;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loop", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "volume", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      _export("SoundManager", SoundManager = (_dec3 = ccclass('SoundManager'), _dec4 = property([Sound]), _dec5 = property(AudioSource), _dec6 = property(CCBoolean), _dec3(_class4 = (_class5 = class SoundManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super();

          _initializerDefineProperty(this, "listSounds", _descriptor6, this);

          _initializerDefineProperty(this, "theme", _descriptor7, this);

          // @property(AudioSource)
          // listAudio: AudioSource[] = [];
          _initializerDefineProperty(this, "activeSound", _descriptor8, this);

          _initializerDefineProperty(this, "isPlaySoundBG", _descriptor9, this);

          SoundManager.instance = this;
        }

        onLoad() {
          // this.listAudio.push(this.theme);
          this.initializeSounds();
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_LOSE, this.stopAllTheme, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.on((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.stopAllTheme, this);
        }

        onDisable() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_LOSE, this.stopAllTheme, this);
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).instance.off((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).SHOW_WIN, this.stopAllTheme, this);
        } // protected update(dt: number): void {
        //     // Đồng bộ volume với super_html.is_audio() từ MRAID audioVolumeChange event
        //     const isAudioEnabled = super_html_playable.is_audio();
        //     // Cập nhật volume cho theme
        //     if (this.theme) {
        //         if (isAudioEnabled && this.isPlaySoundBG) {
        //             // Giữ volume theme ở mức 0.4 khi audio được bật
        //             this.theme.volume = 0.6;
        //         } else {
        //             // Tắt volume khi audio bị tắt
        //             this.theme.volume = 0;
        //         }
        //     }
        //     // Cập nhật volume cho tất cả sounds
        //     this.listSounds.forEach(sound => {
        //         if (sound.source) {
        //             if (isAudioEnabled) {
        //                 // Bật audio và set volume về giá trị ban đầu
        //                 sound.source.enabled = true;
        //                 sound.source.volume = sound.volume;
        //             } else {
        //                 // Tắt audio khi bị mute
        //                 sound.source.enabled = false;
        //                 sound.source.volume = 0;
        //             }
        //         }
        //     });
        // }


        initializeSounds() {
          this.listSounds.forEach(sound => {
            sound.source = this.node.addComponent(AudioSource); //  this.listAudio.push(sound.source);

            if (sound.clip) {
              sound.source.playOnAwake = false;
              sound.source.clip = sound.clip;
              sound.source.volume = 0;
              sound.source.loop = sound.loop; // if (sound.playOnAwake) {
              //     this.playSound(sound.name);
              // }
            }
          });
        }

        playSound(name) {
          // Chỉ phát âm thanh nếu audio được bật
          if (!(_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).is_audio()) {
            return;
          }

          var sound = this.listSounds.find(s => s.name === name);

          if (sound && sound.source) {
            sound.source.volume = sound.volume;
            sound.source.playOneShot(sound.clip, sound.volume);
          }
        }

        stop(name) {
          var sound = this.listSounds.find(s => s.name === name);

          if (sound && sound.source) {
            sound.source.stop();
          }
        }

        playTheme() {
          // Chỉ phát theme nếu audio được bật
          if (!(_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).is_audio()) {
            return;
          }

          if (this.theme && !this.isPlaySoundBG) {
            this.isPlaySoundBG = true;
            this.theme.volume = 0.4;
            this.theme.play();
          }
        }

        stopAllTheme() {
          this.theme.volume = 0;
        }

        changeVolume(volume) {
          this.listSounds.forEach(sound => {
            if (sound.source) {
              sound.source.volume = volume;

              if (volume === 0) {
                sound.source.enabled = false;
              } else {
                sound.source.enabled = true;
              }
            }
          });
        }

      }, (_descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "listSounds", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "theme", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "activeSound", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "isPlaySoundBG", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class5)) || _class4));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c8f7e16b1dae24d65b703eb110cdf4478ace2bdd.js.map
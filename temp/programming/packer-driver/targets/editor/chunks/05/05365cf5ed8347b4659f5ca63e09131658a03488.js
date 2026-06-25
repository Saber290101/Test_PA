System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, macro, GlobalEvent, Global, super_html_playable, _dec, _class, _crd, ccclass, property, androidUrl, iosUrl, PlayableAdsController;

  function _reportPossibleCrUseOfGlobalEvent(extras) {
    _reporterNs.report("GlobalEvent", "../Event/GlobalEvent", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGlobal(extras) {
    _reporterNs.report("Global", "../Global", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsuper_html_playable(extras) {
    _reporterNs.report("super_html_playable", "../super_html_playable", _context.meta, extras);
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
      macro = _cc.macro;
    }, function (_unresolved_2) {
      GlobalEvent = _unresolved_2.GlobalEvent;
    }, function (_unresolved_3) {
      Global = _unresolved_3.default;
    }, function (_unresolved_4) {
      super_html_playable = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0c0a6Z9/BNF9ZHBrU2hOE/F", "PlayableAdsController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'macro', 'sys', 'PhysicsSystem2D']);

      ({
        ccclass,
        property
      } = _decorator);
      androidUrl = "https://play.google.com/store/apps/details?id=com.ig.busybus";
      iosUrl = "";

      _export("default", PlayableAdsController = (_dec = ccclass('PlayableAdsController'), _dec(_class = class PlayableAdsController extends Component {
        constructor(...args) {
          super(...args);
          this.isBuild = false;
          this.button = null;
          this.isActiveAutoStore = false;
          this.channel = '';
        }

        onLoad() {
          this.channel = this.getChannel();
          macro.ENABLE_MULTI_TOUCH = false;
          macro.ENABLE_TRANSPARENT_CANVAS = true;
          if (this.isBuild) console.log = () => {};
          if (this.isBuild) console.warn = () => {};
          if (this.isBuild) console.error = () => {};
          window.gameReady && window.gameReady(); // super_html_playable.set_app_store_url(iosUrl);

          (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
            error: Error()
          }), super_html_playable) : super_html_playable).set_google_play_url(androidUrl);
        }

        onEnable() {
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().addEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).OPEN_STORE, this.openStore, this);
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().addEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).ACTIVE_AUTO_OPEN_STORE, this.activeAutoStore, this);
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().addEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).CHECK_PLAYABLE, this.checkOpenStorePlayable, this);
        }

        onDisable() {
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().removeEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).OPEN_STORE, this.openStore, this);
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().removeEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).ACTIVE_AUTO_OPEN_STORE, this.activeAutoStore, this);
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().removeEventListener((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).CHECK_PLAYABLE, this.checkOpenStorePlayable, this);
        }

        start() {
          window.gameReady && window.gameReady();
        }

        checkOpenStorePlayable() {
          if (this.isActiveAutoStore) (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().dispatchEvent((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).OPEN_STORE);
        }

        openStore() {
          if ((_crd && Global === void 0 ? (_reportPossibleCrUseOfGlobal({
            error: Error()
          }), Global) : Global).video) {
            return;
          }

          if (this.isBuild) {
            console.log("open store");
            (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
              error: Error()
            }), super_html_playable) : super_html_playable).game_end();
            (_crd && super_html_playable === void 0 ? (_reportPossibleCrUseOfsuper_html_playable({
              error: Error()
            }), super_html_playable) : super_html_playable).download();
            return;
          }

          let linkStore = this.getLinkStore();
          window.open(linkStore);
        }

        click() {
          console.log("autoOpenStore");
          (_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).instance().dispatchEvent((_crd && GlobalEvent === void 0 ? (_reportPossibleCrUseOfGlobalEvent({
            error: Error()
          }), GlobalEvent) : GlobalEvent).OPEN_STORE);
        }

        activeAutoStore() {
          console.log("activeAutoStore");
          this.openStore();
          this.isActiveAutoStore = true;

          if (this.button) {
            this.button.enabled = this.isActiveAutoStore;
          }
        } // protected update(dt: number): void {
        //     if (!!(window as any).IronSource) {
        //         SoundManager.instance().setAllVolume(!!(window as any).audioIronSource);
        //     }
        // }


        getChannel() {
          window.advChannels = '{{__adv_channels_adapter__}}';
          return window.advChannels;
        }

        installHandle() {
          console.log("install");
          let linkStore = this.getLinkStore();
          window.gameEnd && window.gameEnd();

          switch (this.channel) {
            case "AppLovin":
              window.mraid.open(linkStore);
              break;

            case "Facebook":
              window.FbPlayableAd.onCTAClick();
              break;

            case "Google":
              window.ExitApi.exit(linkStore);
              break;

            case "Mintegral":
              window.gameEnd && window.gameEnd();
              window.install && window.install();
              break;

            case "Unity":
              window.mraid.open(linkStore);
              break;

            case "Tiktok":
              window.playableSDK.openAppStore();
              break;

            case "IronSource":
              window.dapi.openStoreUrl();
              break;

            default:
              window.open(linkStore);
              break;
          }
        }

        getLinkStore() {
          let mobile = this.getMobileOS();

          switch (mobile) {
            case "android":
              return androidUrl;

            case "iOS":
              return iosUrl;

            default:
              return androidUrl;
          }
        }

        getMobileOS() {
          const userAgent = navigator.userAgent || navigator.vendor || window.opera;

          if (/android|Android/i.test(userAgent)) {
            return "android";
          } else if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream) {
            return "iOS";
          }

          return "unknown";
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=05365cf5ed8347b4659f5ca63e09131658a03488.js.map
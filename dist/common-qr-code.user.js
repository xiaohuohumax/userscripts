// ==UserScript==
// @name         图片二维码识别（Common QR Code）
// @namespace    xiaohuohumax/userscripts/common-qr-code
// @version      1.3.0
// @author       xiaohuohumax
// @description  右键图片，识别二维码并复制到剪贴板。
// @license      MIT
// @icon         https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-qr-code.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-qr-code.user.js
// @match        http*://*/*
// @require      https://unpkg.com/jsqr@1.4.0/dist/jsQR.js
// @require      https://unpkg.com/notiflix@3.2.8/build/notiflix-notify-aio.js
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @noframes
// ==/UserScript==

(function (notiflixNotifyAio, jsQR) {
  'use strict';

  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setClipboard = /* @__PURE__ */ (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var sweetalert_min$1 = { exports: {} };
  var sweetalert_min = sweetalert_min$1.exports;
  var hasRequiredSweetalert_min;
  function requireSweetalert_min() {
    if (hasRequiredSweetalert_min) return sweetalert_min$1.exports;
    hasRequiredSweetalert_min = 1;
    (function(module, exports) {
      !function(t, e) {
        module.exports = e();
      }(sweetalert_min, function() {
        return function(t) {
          function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = { i: o, l: false, exports: {} };
            return t[o].call(r.exports, r, r.exports, e), r.l = true, r.exports;
          }
          var n = {};
          return e.m = t, e.c = n, e.d = function(t2, n2, o) {
            e.o(t2, n2) || Object.defineProperty(t2, n2, { configurable: false, enumerable: true, get: o });
          }, e.n = function(t2) {
            var n2 = t2 && t2.__esModule ? function() {
              return t2.default;
            } : function() {
              return t2;
            };
            return e.d(n2, "a", n2), n2;
          }, e.o = function(t2, e2) {
            return Object.prototype.hasOwnProperty.call(t2, e2);
          }, e.p = "", e(e.s = 8);
        }([function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = "swal-button";
          e.CLASS_NAMES = { MODAL: "swal-modal", OVERLAY: "swal-overlay", SHOW_MODAL: "swal-overlay--show-modal", MODAL_TITLE: "swal-title", MODAL_TEXT: "swal-text", ICON: "swal-icon", ICON_CUSTOM: "swal-icon--custom", CONTENT: "swal-content", FOOTER: "swal-footer", BUTTON_CONTAINER: "swal-button-container", BUTTON: o, CONFIRM_BUTTON: o + "--confirm", CANCEL_BUTTON: o + "--cancel", DANGER_BUTTON: o + "--danger", BUTTON_LOADING: o + "--loading", BUTTON_LOADER: o + "__loader" }, e.default = e.CLASS_NAMES;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true }), e.getNode = function(t2) {
            var e2 = "." + t2;
            return document.querySelector(e2);
          }, e.stringToNode = function(t2) {
            var e2 = document.createElement("div");
            return e2.innerHTML = t2.trim(), e2.firstChild;
          }, e.insertAfter = function(t2, e2) {
            var n2 = e2.nextSibling;
            e2.parentNode.insertBefore(t2, n2);
          }, e.removeNode = function(t2) {
            t2.parentElement.removeChild(t2);
          }, e.throwErr = function(t2) {
            throw t2 = t2.replace(/ +(?= )/g, ""), "SweetAlert: " + (t2 = t2.trim());
          }, e.isPlainObject = function(t2) {
            if ("[object Object]" !== Object.prototype.toString.call(t2)) return false;
            var e2 = Object.getPrototypeOf(t2);
            return null === e2 || e2 === Object.prototype;
          }, e.ordinalSuffixOf = function(t2) {
            var e2 = t2 % 10, n2 = t2 % 100;
            return 1 === e2 && 11 !== n2 ? t2 + "st" : 2 === e2 && 12 !== n2 ? t2 + "nd" : 3 === e2 && 13 !== n2 ? t2 + "rd" : t2 + "th";
          };
        }, function(t, e, n) {
          function o(t2) {
            for (var n2 in t2) e.hasOwnProperty(n2) || (e[n2] = t2[n2]);
          }
          Object.defineProperty(e, "__esModule", { value: true }), o(n(25));
          var r = n(26);
          e.overlayMarkup = r.default, o(n(27)), o(n(28)), o(n(29));
          var i = n(0), a = i.default.MODAL_TITLE, s = i.default.MODAL_TEXT, c = i.default.ICON, l = i.default.FOOTER;
          e.iconMarkup = '\n  <div class="' + c + '"></div>', e.titleMarkup = '\n  <div class="' + a + '"></div>\n', e.textMarkup = '\n  <div class="' + s + '"></div>', e.footerMarkup = '\n  <div class="' + l + '"></div>\n';
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1);
          e.CONFIRM_KEY = "confirm", e.CANCEL_KEY = "cancel";
          var r = { visible: true, text: null, value: null, className: "", closeModal: true }, i = Object.assign({}, r, { visible: false, text: "Cancel", value: null }), a = Object.assign({}, r, { text: "OK", value: true });
          e.defaultButtonList = { cancel: i, confirm: a };
          var s = function(t2) {
            switch (t2) {
              case e.CONFIRM_KEY:
                return a;
              case e.CANCEL_KEY:
                return i;
              default:
                var n2 = t2.charAt(0).toUpperCase() + t2.slice(1);
                return Object.assign({}, r, { text: n2, value: t2 });
            }
          }, c = function(t2, e2) {
            var n2 = s(t2);
            return true === e2 ? Object.assign({}, n2, { visible: true }) : "string" == typeof e2 ? Object.assign({}, n2, { visible: true, text: e2 }) : o.isPlainObject(e2) ? Object.assign({ visible: true }, n2, e2) : Object.assign({}, n2, { visible: false });
          }, l = function(t2) {
            for (var e2 = {}, n2 = 0, o2 = Object.keys(t2); n2 < o2.length; n2++) {
              var r2 = o2[n2], a2 = t2[r2], s2 = c(r2, a2);
              e2[r2] = s2;
            }
            return e2.cancel || (e2.cancel = i), e2;
          }, u = function(t2) {
            var n2 = {};
            switch (t2.length) {
              case 1:
                n2[e.CANCEL_KEY] = Object.assign({}, i, { visible: false });
                break;
              case 2:
                n2[e.CANCEL_KEY] = c(e.CANCEL_KEY, t2[0]), n2[e.CONFIRM_KEY] = c(e.CONFIRM_KEY, t2[1]);
                break;
              default:
                o.throwErr("Invalid number of 'buttons' in array (" + t2.length + ").\n      If you want more than 2 buttons, you need to use an object!");
            }
            return n2;
          };
          e.getButtonListOpts = function(t2) {
            var n2 = e.defaultButtonList;
            return "string" == typeof t2 ? n2[e.CONFIRM_KEY] = c(e.CONFIRM_KEY, t2) : Array.isArray(t2) ? n2 = u(t2) : o.isPlainObject(t2) ? n2 = l(t2) : true === t2 ? n2 = u([true, true]) : false === t2 ? n2 = u([false, false]) : void 0 === t2 && (n2 = e.defaultButtonList), n2;
          };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(2), i = n(0), a = i.default.MODAL, s = i.default.OVERLAY, c = n(30), l = n(31), u = n(32), f = n(33);
          e.injectElIntoModal = function(t2) {
            var e2 = o.getNode(a), n2 = o.stringToNode(t2);
            return e2.appendChild(n2), n2;
          };
          var d = function(t2) {
            t2.className = a, t2.textContent = "";
          }, p = function(t2, e2) {
            d(t2);
            var n2 = e2.className;
            n2 && t2.classList.add(n2);
          };
          e.initModalContent = function(t2) {
            var e2 = o.getNode(a);
            p(e2, t2), c.default(t2.icon), l.initTitle(t2.title), l.initText(t2.text), f.default(t2.content), u.default(t2.buttons, t2.dangerMode);
          };
          var m = function() {
            var t2 = o.getNode(s), e2 = o.stringToNode(r.modalMarkup);
            t2.appendChild(e2);
          };
          e.default = m;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(3), r = { isOpen: false, promise: null, actions: {}, timer: null }, i = Object.assign({}, r);
          e.resetState = function() {
            i = Object.assign({}, r);
          }, e.setActionValue = function(t2) {
            if ("string" == typeof t2) return a(o.CONFIRM_KEY, t2);
            for (var e2 in t2) a(e2, t2[e2]);
          };
          var a = function(t2, e2) {
            i.actions[t2] || (i.actions[t2] = {}), Object.assign(i.actions[t2], { value: e2 });
          };
          e.setActionOptionsFor = function(t2, e2) {
            var n2 = (void 0 === e2 ? {} : e2).closeModal, o2 = void 0 === n2 || n2;
            Object.assign(i.actions[t2], { closeModal: o2 });
          }, e.default = i;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(3), i = n(0), a = i.default.OVERLAY, s = i.default.SHOW_MODAL, c = i.default.BUTTON, l = i.default.BUTTON_LOADING, u = n(5);
          e.openModal = function() {
            o.getNode(a).classList.add(s), u.default.isOpen = true;
          };
          var f = function() {
            o.getNode(a).classList.remove(s), u.default.isOpen = false;
          };
          e.onAction = function(t2) {
            void 0 === t2 && (t2 = r.CANCEL_KEY);
            var e2 = u.default.actions[t2], n2 = e2.value;
            if (false === e2.closeModal) {
              var i2 = c + "--" + t2;
              o.getNode(i2).classList.add(l);
            } else f();
            u.default.promise.resolve(n2);
          }, e.getState = function() {
            var t2 = Object.assign({}, u.default);
            return delete t2.promise, delete t2.timer, t2;
          }, e.stopLoading = function() {
            for (var t2 = document.querySelectorAll("." + c), e2 = 0; e2 < t2.length; e2++) {
              t2[e2].classList.remove(l);
            }
          };
        }, function(t, e) {
          var n;
          n = /* @__PURE__ */ function() {
            return this;
          }();
          try {
            n = n || Function("return this")() || (0, eval)("this");
          } catch (t2) {
            "object" == typeof window && (n = window);
          }
          t.exports = n;
        }, function(t, e, n) {
          (function(e2) {
            t.exports = e2.sweetAlert = n(9);
          }).call(e, n(7));
        }, function(t, e, n) {
          (function(e2) {
            t.exports = e2.swal = n(10);
          }).call(e, n(7));
        }, function(t, e, n) {
          "undefined" != typeof window && n(11), n(16);
          var o = n(23).default;
          t.exports = o;
        }, function(t, e, n) {
          var o = n(12);
          "string" == typeof o && (o = [[t.i, o, ""]]);
          var r = { insertAt: "top" };
          r.transform = void 0;
          n(14)(o, r);
          o.locals && (t.exports = o.locals);
        }, function(t, e, n) {
          e = t.exports = n(13)(void 0), e.push([t.i, '.swal-icon--error{border-color:#f27474;-webkit-animation:animateErrorIcon .5s;animation:animateErrorIcon .5s}.swal-icon--error__x-mark{position:relative;display:block;-webkit-animation:animateXMark .5s;animation:animateXMark .5s}.swal-icon--error__line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal-icon--error__line--left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal-icon--error__line--right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}@-webkit-keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animateErrorIcon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@-webkit-keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animateXMark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.swal-icon--warning{border-color:#f8bb86;-webkit-animation:pulseWarning .75s infinite alternate;animation:pulseWarning .75s infinite alternate}.swal-icon--warning__body{width:5px;height:47px;top:10px;border-radius:2px;margin-left:-2px}.swal-icon--warning__body,.swal-icon--warning__dot{position:absolute;left:50%;background-color:#f8bb86}.swal-icon--warning__dot{width:7px;height:7px;border-radius:50%;margin-left:-4px;bottom:-11px}@-webkit-keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulseWarning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.swal-icon--success{border-color:#a5dc86}.swal-icon--success:after,.swal-icon--success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal-icon--success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal-icon--success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px;-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}.swal-icon--success__ring{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal-icon--success__hide-corners{width:5px;height:90px;background-color:#fff;padding:1px;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal-icon--success__line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal-icon--success__line--tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:animateSuccessTip .75s;animation:animateSuccessTip .75s}.swal-icon--success__line--long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-animation:animateSuccessLong .75s;animation:animateSuccessLong .75s}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animateSuccessTip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animateSuccessLong{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}.swal-icon--info{border-color:#c9dae1}.swal-icon--info:before{width:5px;height:29px;bottom:17px;border-radius:2px;margin-left:-2px}.swal-icon--info:after,.swal-icon--info:before{content:"";position:absolute;left:50%;background-color:#c9dae1}.swal-icon--info:after{width:7px;height:7px;border-radius:50%;margin-left:-3px;top:19px}.swal-icon{width:80px;height:80px;border-width:4px;border-style:solid;border-radius:50%;padding:0;position:relative;box-sizing:content-box;margin:20px auto}.swal-icon:first-child{margin-top:32px}.swal-icon--custom{width:auto;height:auto;max-width:100%;border:none;border-radius:0}.swal-icon img{max-width:100%;max-height:100%}.swal-title{color:rgba(0,0,0,.65);font-weight:600;text-transform:none;position:relative;display:block;padding:13px 16px;font-size:27px;line-height:normal;text-align:center;margin-bottom:0}.swal-title:first-child{margin-top:26px}.swal-title:not(:first-child){padding-bottom:0}.swal-title:not(:last-child){margin-bottom:13px}.swal-text{font-size:16px;position:relative;float:none;line-height:normal;vertical-align:top;text-align:left;display:inline-block;margin:0;padding:0 10px;font-weight:400;color:rgba(0,0,0,.64);max-width:calc(100% - 20px);overflow-wrap:break-word;box-sizing:border-box}.swal-text:first-child{margin-top:45px}.swal-text:last-child{margin-bottom:45px}.swal-footer{text-align:right;padding-top:13px;margin-top:13px;padding:13px 16px;border-radius:inherit;border-top-left-radius:0;border-top-right-radius:0}.swal-button-container{margin:5px;display:inline-block;position:relative}.swal-button{background-color:#7cd1f9;color:#fff;border:none;box-shadow:none;border-radius:5px;font-weight:600;font-size:14px;padding:10px 24px;margin:0;cursor:pointer}.swal-button:not([disabled]):hover{background-color:#78cbf2}.swal-button:active{background-color:#70bce0}.swal-button:focus{outline:none;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(43,114,165,.29)}.swal-button[disabled]{opacity:.5;cursor:default}.swal-button::-moz-focus-inner{border:0}.swal-button--cancel{color:#555;background-color:#efefef}.swal-button--cancel:not([disabled]):hover{background-color:#e8e8e8}.swal-button--cancel:active{background-color:#d7d7d7}.swal-button--cancel:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(116,136,150,.29)}.swal-button--danger{background-color:#e64942}.swal-button--danger:not([disabled]):hover{background-color:#df4740}.swal-button--danger:active{background-color:#cf423b}.swal-button--danger:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(165,43,43,.29)}.swal-content{padding:0 20px;margin-top:20px;font-size:medium}.swal-content:last-child{margin-bottom:20px}.swal-content__input,.swal-content__textarea{-webkit-appearance:none;background-color:#fff;border:none;font-size:14px;display:block;box-sizing:border-box;width:100%;border:1px solid rgba(0,0,0,.14);padding:10px 13px;border-radius:2px;transition:border-color .2s}.swal-content__input:focus,.swal-content__textarea:focus{outline:none;border-color:#6db8ff}.swal-content__textarea{resize:vertical}.swal-button--loading{color:transparent}.swal-button--loading~.swal-button__loader{opacity:1}.swal-button__loader{position:absolute;height:auto;width:43px;z-index:2;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);text-align:center;pointer-events:none;opacity:0}.swal-button__loader div{display:inline-block;float:none;vertical-align:baseline;width:9px;height:9px;padding:0;border:none;margin:2px;opacity:.4;border-radius:7px;background-color:hsla(0,0%,100%,.9);transition:background .2s;-webkit-animation:swal-loading-anim 1s infinite;animation:swal-loading-anim 1s infinite}.swal-button__loader div:nth-child(3n+2){-webkit-animation-delay:.15s;animation-delay:.15s}.swal-button__loader div:nth-child(3n+3){-webkit-animation-delay:.3s;animation-delay:.3s}@-webkit-keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes swal-loading-anim{0%{opacity:.4}20%{opacity:.4}50%{opacity:1}to{opacity:.4}}.swal-overlay{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center;font-size:0;overflow-y:auto;background-color:rgba(0,0,0,.4);z-index:10000;pointer-events:none;opacity:0;transition:opacity .3s}.swal-overlay:before{content:" ";display:inline-block;vertical-align:middle;height:100%}.swal-overlay--show-modal{opacity:1;pointer-events:auto}.swal-overlay--show-modal .swal-modal{opacity:1;pointer-events:auto;box-sizing:border-box;-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s;will-change:transform}.swal-modal{width:478px;opacity:0;pointer-events:none;background-color:#fff;text-align:center;border-radius:5px;position:static;margin:20px auto;display:inline-block;vertical-align:middle;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:50% 50%;transform-origin:50% 50%;z-index:10001;transition:opacity .2s,-webkit-transform .3s;transition:transform .3s,opacity .2s;transition:transform .3s,opacity .2s,-webkit-transform .3s}@media (max-width:500px){.swal-modal{width:calc(100% - 20px)}}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1)}1%{-webkit-transform:scale(.5);transform:scale(.5)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}', ""]);
        }, function(t, e) {
          function n(t2, e2) {
            var n2 = t2[1] || "", r = t2[3];
            if (!r) return n2;
            if (e2 && "function" == typeof btoa) {
              var i = o(r);
              return [n2].concat(r.sources.map(function(t3) {
                return "/*# sourceURL=" + r.sourceRoot + t3 + " */";
              })).concat([i]).join("\n");
            }
            return [n2].join("\n");
          }
          function o(t2) {
            return "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(t2)))) + " */";
          }
          t.exports = function(t2) {
            var e2 = [];
            return e2.toString = function() {
              return this.map(function(e3) {
                var o2 = n(e3, t2);
                return e3[2] ? "@media " + e3[2] + "{" + o2 + "}" : o2;
              }).join("");
            }, e2.i = function(t3, n2) {
              "string" == typeof t3 && (t3 = [[null, t3, ""]]);
              for (var o2 = {}, r = 0; r < this.length; r++) {
                var i = this[r][0];
                "number" == typeof i && (o2[i] = true);
              }
              for (r = 0; r < t3.length; r++) {
                var a = t3[r];
                "number" == typeof a[0] && o2[a[0]] || (n2 && !a[2] ? a[2] = n2 : n2 && (a[2] = "(" + a[2] + ") and (" + n2 + ")"), e2.push(a));
              }
            }, e2;
          };
        }, function(t, e, n) {
          function o(t2, e2) {
            for (var n2 = 0; n2 < t2.length; n2++) {
              var o2 = t2[n2], r2 = m[o2.id];
              if (r2) {
                r2.refs++;
                for (var i2 = 0; i2 < r2.parts.length; i2++) r2.parts[i2](o2.parts[i2]);
                for (; i2 < o2.parts.length; i2++) r2.parts.push(u(o2.parts[i2], e2));
              } else {
                for (var a2 = [], i2 = 0; i2 < o2.parts.length; i2++) a2.push(u(o2.parts[i2], e2));
                m[o2.id] = { id: o2.id, refs: 1, parts: a2 };
              }
            }
          }
          function r(t2, e2) {
            for (var n2 = [], o2 = {}, r2 = 0; r2 < t2.length; r2++) {
              var i2 = t2[r2], a2 = e2.base ? i2[0] + e2.base : i2[0], s2 = i2[1], c2 = i2[2], l2 = i2[3], u2 = { css: s2, media: c2, sourceMap: l2 };
              o2[a2] ? o2[a2].parts.push(u2) : n2.push(o2[a2] = { id: a2, parts: [u2] });
            }
            return n2;
          }
          function i(t2, e2) {
            var n2 = v(t2.insertInto);
            if (!n2) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var o2 = w[w.length - 1];
            if ("top" === t2.insertAt) o2 ? o2.nextSibling ? n2.insertBefore(e2, o2.nextSibling) : n2.appendChild(e2) : n2.insertBefore(e2, n2.firstChild), w.push(e2);
            else {
              if ("bottom" !== t2.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
              n2.appendChild(e2);
            }
          }
          function a(t2) {
            if (null === t2.parentNode) return false;
            t2.parentNode.removeChild(t2);
            var e2 = w.indexOf(t2);
            e2 >= 0 && w.splice(e2, 1);
          }
          function s(t2) {
            var e2 = document.createElement("style");
            return t2.attrs.type = "text/css", l(e2, t2.attrs), i(t2, e2), e2;
          }
          function c(t2) {
            var e2 = document.createElement("link");
            return t2.attrs.type = "text/css", t2.attrs.rel = "stylesheet", l(e2, t2.attrs), i(t2, e2), e2;
          }
          function l(t2, e2) {
            Object.keys(e2).forEach(function(n2) {
              t2.setAttribute(n2, e2[n2]);
            });
          }
          function u(t2, e2) {
            var n2, o2, r2, i2;
            if (e2.transform && t2.css) {
              if (!(i2 = e2.transform(t2.css))) return function() {
              };
              t2.css = i2;
            }
            if (e2.singleton) {
              var l2 = h++;
              n2 = g || (g = s(e2)), o2 = f.bind(null, n2, l2, false), r2 = f.bind(null, n2, l2, true);
            } else t2.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n2 = c(e2), o2 = p.bind(null, n2, e2), r2 = function() {
              a(n2), n2.href && URL.revokeObjectURL(n2.href);
            }) : (n2 = s(e2), o2 = d.bind(null, n2), r2 = function() {
              a(n2);
            });
            return o2(t2), function(e3) {
              if (e3) {
                if (e3.css === t2.css && e3.media === t2.media && e3.sourceMap === t2.sourceMap) return;
                o2(t2 = e3);
              } else r2();
            };
          }
          function f(t2, e2, n2, o2) {
            var r2 = n2 ? "" : o2.css;
            if (t2.styleSheet) t2.styleSheet.cssText = x(e2, r2);
            else {
              var i2 = document.createTextNode(r2), a2 = t2.childNodes;
              a2[e2] && t2.removeChild(a2[e2]), a2.length ? t2.insertBefore(i2, a2[e2]) : t2.appendChild(i2);
            }
          }
          function d(t2, e2) {
            var n2 = e2.css, o2 = e2.media;
            if (o2 && t2.setAttribute("media", o2), t2.styleSheet) t2.styleSheet.cssText = n2;
            else {
              for (; t2.firstChild; ) t2.removeChild(t2.firstChild);
              t2.appendChild(document.createTextNode(n2));
            }
          }
          function p(t2, e2, n2) {
            var o2 = n2.css, r2 = n2.sourceMap, i2 = void 0 === e2.convertToAbsoluteUrls && r2;
            (e2.convertToAbsoluteUrls || i2) && (o2 = y(o2)), r2 && (o2 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r2)))) + " */");
            var a2 = new Blob([o2], { type: "text/css" }), s2 = t2.href;
            t2.href = URL.createObjectURL(a2), s2 && URL.revokeObjectURL(s2);
          }
          var m = {}, b = /* @__PURE__ */ function(t2) {
            var e2;
            return function() {
              return void 0 === e2 && (e2 = t2.apply(this, arguments)), e2;
            };
          }(function() {
            return window && document && document.all && !window.atob;
          }), v = /* @__PURE__ */ function(t2) {
            var e2 = {};
            return function(n2) {
              return void 0 === e2[n2] && (e2[n2] = t2.call(this, n2)), e2[n2];
            };
          }(function(t2) {
            return document.querySelector(t2);
          }), g = null, h = 0, w = [], y = n(15);
          t.exports = function(t2, e2) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            e2 = e2 || {}, e2.attrs = "object" == typeof e2.attrs ? e2.attrs : {}, e2.singleton || (e2.singleton = b()), e2.insertInto || (e2.insertInto = "head"), e2.insertAt || (e2.insertAt = "bottom");
            var n2 = r(t2, e2);
            return o(n2, e2), function(t3) {
              for (var i2 = [], a2 = 0; a2 < n2.length; a2++) {
                var s2 = n2[a2], c2 = m[s2.id];
                c2.refs--, i2.push(c2);
              }
              if (t3) {
                o(r(t3, e2), e2);
              }
              for (var a2 = 0; a2 < i2.length; a2++) {
                var c2 = i2[a2];
                if (0 === c2.refs) {
                  for (var l2 = 0; l2 < c2.parts.length; l2++) c2.parts[l2]();
                  delete m[c2.id];
                }
              }
            };
          };
          var x = /* @__PURE__ */ function() {
            var t2 = [];
            return function(e2, n2) {
              return t2[e2] = n2, t2.filter(Boolean).join("\n");
            };
          }();
        }, function(t, e) {
          t.exports = function(t2) {
            var e2 = "undefined" != typeof window && window.location;
            if (!e2) throw new Error("fixUrls requires window.location");
            if (!t2 || "string" != typeof t2) return t2;
            var n = e2.protocol + "//" + e2.host, o = n + e2.pathname.replace(/\/[^\/]*$/, "/");
            return t2.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(t3, e3) {
              var r = e3.trim().replace(/^"(.*)"$/, function(t4, e4) {
                return e4;
              }).replace(/^'(.*)'$/, function(t4, e4) {
                return e4;
              });
              if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r)) return t3;
              var i;
              return i = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? n + r : o + r.replace(/^\.\//, ""), "url(" + JSON.stringify(i) + ")";
            });
          };
        }, function(t, e, n) {
          var o = n(17);
          "undefined" == typeof window || window.Promise || (window.Promise = o), n(21), String.prototype.includes || (String.prototype.includes = function(t2, e2) {
            return "number" != typeof e2 && (e2 = 0), !(e2 + t2.length > this.length) && -1 !== this.indexOf(t2, e2);
          }), Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(t2, e2) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var n2 = Object(this), o2 = n2.length >>> 0;
            if (0 === o2) return false;
            for (var r = 0 | e2, i = Math.max(r >= 0 ? r : o2 - Math.abs(r), 0); i < o2; ) {
              if (function(t3, e3) {
                return t3 === e3 || "number" == typeof t3 && "number" == typeof e3 && isNaN(t3) && isNaN(e3);
              }(n2[i], t2)) return true;
              i++;
            }
            return false;
          } }), "undefined" != typeof window && function(t2) {
            t2.forEach(function(t3) {
              t3.hasOwnProperty("remove") || Object.defineProperty(t3, "remove", { configurable: true, enumerable: true, writable: true, value: function() {
                this.parentNode.removeChild(this);
              } });
            });
          }([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
        }, function(t, e, n) {
          (function(e2) {
            !function(n2) {
              function o() {
              }
              function r(t2, e3) {
                return function() {
                  t2.apply(e3, arguments);
                };
              }
              function i(t2) {
                if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof t2) throw new TypeError("not a function");
                this._state = 0, this._handled = false, this._value = void 0, this._deferreds = [], f(t2, this);
              }
              function a(t2, e3) {
                for (; 3 === t2._state; ) t2 = t2._value;
                if (0 === t2._state) return void t2._deferreds.push(e3);
                t2._handled = true, i._immediateFn(function() {
                  var n3 = 1 === t2._state ? e3.onFulfilled : e3.onRejected;
                  if (null === n3) return void (1 === t2._state ? s : c)(e3.promise, t2._value);
                  var o2;
                  try {
                    o2 = n3(t2._value);
                  } catch (t3) {
                    return void c(e3.promise, t3);
                  }
                  s(e3.promise, o2);
                });
              }
              function s(t2, e3) {
                try {
                  if (e3 === t2) throw new TypeError("A promise cannot be resolved with itself.");
                  if (e3 && ("object" == typeof e3 || "function" == typeof e3)) {
                    var n3 = e3.then;
                    if (e3 instanceof i) return t2._state = 3, t2._value = e3, void l(t2);
                    if ("function" == typeof n3) return void f(r(n3, e3), t2);
                  }
                  t2._state = 1, t2._value = e3, l(t2);
                } catch (e4) {
                  c(t2, e4);
                }
              }
              function c(t2, e3) {
                t2._state = 2, t2._value = e3, l(t2);
              }
              function l(t2) {
                2 === t2._state && 0 === t2._deferreds.length && i._immediateFn(function() {
                  t2._handled || i._unhandledRejectionFn(t2._value);
                });
                for (var e3 = 0, n3 = t2._deferreds.length; e3 < n3; e3++) a(t2, t2._deferreds[e3]);
                t2._deferreds = null;
              }
              function u(t2, e3, n3) {
                this.onFulfilled = "function" == typeof t2 ? t2 : null, this.onRejected = "function" == typeof e3 ? e3 : null, this.promise = n3;
              }
              function f(t2, e3) {
                var n3 = false;
                try {
                  t2(function(t3) {
                    n3 || (n3 = true, s(e3, t3));
                  }, function(t3) {
                    n3 || (n3 = true, c(e3, t3));
                  });
                } catch (t3) {
                  if (n3) return;
                  n3 = true, c(e3, t3);
                }
              }
              var d = setTimeout;
              i.prototype.catch = function(t2) {
                return this.then(null, t2);
              }, i.prototype.then = function(t2, e3) {
                var n3 = new this.constructor(o);
                return a(this, new u(t2, e3, n3)), n3;
              }, i.all = function(t2) {
                var e3 = Array.prototype.slice.call(t2);
                return new i(function(t3, n3) {
                  function o2(i3, a2) {
                    try {
                      if (a2 && ("object" == typeof a2 || "function" == typeof a2)) {
                        var s2 = a2.then;
                        if ("function" == typeof s2) return void s2.call(a2, function(t4) {
                          o2(i3, t4);
                        }, n3);
                      }
                      e3[i3] = a2, 0 == --r2 && t3(e3);
                    } catch (t4) {
                      n3(t4);
                    }
                  }
                  if (0 === e3.length) return t3([]);
                  for (var r2 = e3.length, i2 = 0; i2 < e3.length; i2++) o2(i2, e3[i2]);
                });
              }, i.resolve = function(t2) {
                return t2 && "object" == typeof t2 && t2.constructor === i ? t2 : new i(function(e3) {
                  e3(t2);
                });
              }, i.reject = function(t2) {
                return new i(function(e3, n3) {
                  n3(t2);
                });
              }, i.race = function(t2) {
                return new i(function(e3, n3) {
                  for (var o2 = 0, r2 = t2.length; o2 < r2; o2++) t2[o2].then(e3, n3);
                });
              }, i._immediateFn = "function" == typeof e2 && function(t2) {
                e2(t2);
              } || function(t2) {
                d(t2, 0);
              }, i._unhandledRejectionFn = function(t2) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t2);
              }, i._setImmediateFn = function(t2) {
                i._immediateFn = t2;
              }, i._setUnhandledRejectionFn = function(t2) {
                i._unhandledRejectionFn = t2;
              }, void 0 !== t && t.exports ? t.exports = i : n2.Promise || (n2.Promise = i);
            }(this);
          }).call(e, n(18).setImmediate);
        }, function(t, e, n) {
          function o(t2, e2) {
            this._id = t2, this._clearFn = e2;
          }
          var r = Function.prototype.apply;
          e.setTimeout = function() {
            return new o(r.call(setTimeout, window, arguments), clearTimeout);
          }, e.setInterval = function() {
            return new o(r.call(setInterval, window, arguments), clearInterval);
          }, e.clearTimeout = e.clearInterval = function(t2) {
            t2 && t2.close();
          }, o.prototype.unref = o.prototype.ref = function() {
          }, o.prototype.close = function() {
            this._clearFn.call(window, this._id);
          }, e.enroll = function(t2, e2) {
            clearTimeout(t2._idleTimeoutId), t2._idleTimeout = e2;
          }, e.unenroll = function(t2) {
            clearTimeout(t2._idleTimeoutId), t2._idleTimeout = -1;
          }, e._unrefActive = e.active = function(t2) {
            clearTimeout(t2._idleTimeoutId);
            var e2 = t2._idleTimeout;
            e2 >= 0 && (t2._idleTimeoutId = setTimeout(function() {
              t2._onTimeout && t2._onTimeout();
            }, e2));
          }, n(19), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate;
        }, function(t, e, n) {
          (function(t2, e2) {
            !function(t3, n2) {
              function o(t4) {
                "function" != typeof t4 && (t4 = new Function("" + t4));
                for (var e3 = new Array(arguments.length - 1), n3 = 0; n3 < e3.length; n3++) e3[n3] = arguments[n3 + 1];
                var o2 = { callback: t4, args: e3 };
                return l[c] = o2, s(c), c++;
              }
              function r(t4) {
                delete l[t4];
              }
              function i(t4) {
                var e3 = t4.callback, o2 = t4.args;
                switch (o2.length) {
                  case 0:
                    e3();
                    break;
                  case 1:
                    e3(o2[0]);
                    break;
                  case 2:
                    e3(o2[0], o2[1]);
                    break;
                  case 3:
                    e3(o2[0], o2[1], o2[2]);
                    break;
                  default:
                    e3.apply(n2, o2);
                }
              }
              function a(t4) {
                if (u) setTimeout(a, 0, t4);
                else {
                  var e3 = l[t4];
                  if (e3) {
                    u = true;
                    try {
                      i(e3);
                    } finally {
                      r(t4), u = false;
                    }
                  }
                }
              }
              if (!t3.setImmediate) {
                var s, c = 1, l = {}, u = false, f = t3.document, d = Object.getPrototypeOf && Object.getPrototypeOf(t3);
                d = d && d.setTimeout ? d : t3, "[object process]" === {}.toString.call(t3.process) ? function() {
                  s = function(t4) {
                    e2.nextTick(function() {
                      a(t4);
                    });
                  };
                }() : function() {
                  if (t3.postMessage && !t3.importScripts) {
                    var e3 = true, n3 = t3.onmessage;
                    return t3.onmessage = function() {
                      e3 = false;
                    }, t3.postMessage("", "*"), t3.onmessage = n3, e3;
                  }
                }() ? function() {
                  var e3 = "setImmediate$" + Math.random() + "$", n3 = function(n4) {
                    n4.source === t3 && "string" == typeof n4.data && 0 === n4.data.indexOf(e3) && a(+n4.data.slice(e3.length));
                  };
                  t3.addEventListener ? t3.addEventListener("message", n3, false) : t3.attachEvent("onmessage", n3), s = function(n4) {
                    t3.postMessage(e3 + n4, "*");
                  };
                }() : t3.MessageChannel ? function() {
                  var t4 = new MessageChannel();
                  t4.port1.onmessage = function(t5) {
                    a(t5.data);
                  }, s = function(e3) {
                    t4.port2.postMessage(e3);
                  };
                }() : f && "onreadystatechange" in f.createElement("script") ? function() {
                  var t4 = f.documentElement;
                  s = function(e3) {
                    var n3 = f.createElement("script");
                    n3.onreadystatechange = function() {
                      a(e3), n3.onreadystatechange = null, t4.removeChild(n3), n3 = null;
                    }, t4.appendChild(n3);
                  };
                }() : function() {
                  s = function(t4) {
                    setTimeout(a, 0, t4);
                  };
                }(), d.setImmediate = o, d.clearImmediate = r;
              }
            }("undefined" == typeof self ? void 0 === t2 ? this : t2 : self);
          }).call(e, n(7), n(20));
        }, function(t, e) {
          function n() {
            throw new Error("setTimeout has not been defined");
          }
          function o() {
            throw new Error("clearTimeout has not been defined");
          }
          function r(t2) {
            if (u === setTimeout) return setTimeout(t2, 0);
            if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t2, 0);
            try {
              return u(t2, 0);
            } catch (e2) {
              try {
                return u.call(null, t2, 0);
              } catch (e3) {
                return u.call(this, t2, 0);
              }
            }
          }
          function i(t2) {
            if (f === clearTimeout) return clearTimeout(t2);
            if ((f === o || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t2);
            try {
              return f(t2);
            } catch (e2) {
              try {
                return f.call(null, t2);
              } catch (e3) {
                return f.call(this, t2);
              }
            }
          }
          function a() {
            b && p && (b = false, p.length ? m = p.concat(m) : v = -1, m.length && s());
          }
          function s() {
            if (!b) {
              var t2 = r(a);
              b = true;
              for (var e2 = m.length; e2; ) {
                for (p = m, m = []; ++v < e2; ) p && p[v].run();
                v = -1, e2 = m.length;
              }
              p = null, b = false, i(t2);
            }
          }
          function c(t2, e2) {
            this.fun = t2, this.array = e2;
          }
          function l() {
          }
          var u, f, d = t.exports = {};
          !function() {
            try {
              u = "function" == typeof setTimeout ? setTimeout : n;
            } catch (t2) {
              u = n;
            }
            try {
              f = "function" == typeof clearTimeout ? clearTimeout : o;
            } catch (t2) {
              f = o;
            }
          }();
          var p, m = [], b = false, v = -1;
          d.nextTick = function(t2) {
            var e2 = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n2 = 1; n2 < arguments.length; n2++) e2[n2 - 1] = arguments[n2];
            m.push(new c(t2, e2)), 1 !== m.length || b || r(s);
          }, c.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, d.title = "browser", d.browser = true, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function(t2) {
            return [];
          }, d.binding = function(t2) {
            throw new Error("process.binding is not supported");
          }, d.cwd = function() {
            return "/";
          }, d.chdir = function(t2) {
            throw new Error("process.chdir is not supported");
          }, d.umask = function() {
            return 0;
          };
        }, function(t, e, n) {
          n(22).polyfill();
        }, function(t, e, n) {
          function o(t2, e2) {
            if (void 0 === t2 || null === t2) throw new TypeError("Cannot convert first argument to object");
            for (var n2 = Object(t2), o2 = 1; o2 < arguments.length; o2++) {
              var r2 = arguments[o2];
              if (void 0 !== r2 && null !== r2) for (var i = Object.keys(Object(r2)), a = 0, s = i.length; a < s; a++) {
                var c = i[a], l = Object.getOwnPropertyDescriptor(r2, c);
                void 0 !== l && l.enumerable && (n2[c] = r2[c]);
              }
            }
            return n2;
          }
          function r() {
            Object.assign || Object.defineProperty(Object, "assign", { enumerable: false, configurable: true, writable: true, value: o });
          }
          t.exports = { assign: o, polyfill: r };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(24), r = n(6), i = n(5), a = n(36), s = function() {
            for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) t2[e2] = arguments[e2];
            if ("undefined" != typeof window) {
              var n2 = a.getOpts.apply(void 0, t2);
              return new Promise(function(t3, e3) {
                i.default.promise = { resolve: t3, reject: e3 }, o.default(n2), setTimeout(function() {
                  r.openModal();
                });
              });
            }
          };
          s.close = r.onAction, s.getState = r.getState, s.setActionValue = i.setActionValue, s.stopLoading = r.stopLoading, s.setDefaults = a.setDefaults, e.default = s;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(0), i = r.default.MODAL, a = n(4), s = n(34), c = n(35), l = n(1);
          e.init = function(t2) {
            o.getNode(i) || (document.body || l.throwErr("You can only use SweetAlert AFTER the DOM has loaded!"), s.default(), a.default()), a.initModalContent(t2), c.default(t2);
          }, e.default = e.init;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(0), r = o.default.MODAL;
          e.modalMarkup = '\n  <div class="' + r + '" role="dialog" aria-modal="true"></div>', e.default = e.modalMarkup;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(0), r = o.default.OVERLAY, i = '<div \n    class="' + r + '"\n    tabIndex="-1">\n  </div>';
          e.default = i;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(0), r = o.default.ICON;
          e.errorIconMarkup = function() {
            var t2 = r + "--error", e2 = t2 + "__line";
            return '\n    <div class="' + t2 + '__x-mark">\n      <span class="' + e2 + " " + e2 + '--left"></span>\n      <span class="' + e2 + " " + e2 + '--right"></span>\n    </div>\n  ';
          }, e.warningIconMarkup = function() {
            var t2 = r + "--warning";
            return '\n    <span class="' + t2 + '__body">\n      <span class="' + t2 + '__dot"></span>\n    </span>\n  ';
          }, e.successIconMarkup = function() {
            var t2 = r + "--success";
            return '\n    <span class="' + t2 + "__line " + t2 + '__line--long"></span>\n    <span class="' + t2 + "__line " + t2 + '__line--tip"></span>\n\n    <div class="' + t2 + '__ring"></div>\n    <div class="' + t2 + '__hide-corners"></div>\n  ';
          };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(0), r = o.default.CONTENT;
          e.contentMarkup = '\n  <div class="' + r + '">\n\n  </div>\n';
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(0), r = o.default.BUTTON_CONTAINER, i = o.default.BUTTON, a = o.default.BUTTON_LOADER;
          e.buttonMarkup = '\n  <div class="' + r + '">\n\n    <button\n      class="' + i + '"\n    ></button>\n\n    <div class="' + a + '">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n\n  </div>\n';
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(4), r = n(2), i = n(0), a = i.default.ICON, s = i.default.ICON_CUSTOM, c = ["error", "warning", "success", "info"], l = { error: r.errorIconMarkup(), warning: r.warningIconMarkup(), success: r.successIconMarkup() }, u = function(t2, e2) {
            var n2 = a + "--" + t2;
            e2.classList.add(n2);
            var o2 = l[t2];
            o2 && (e2.innerHTML = o2);
          }, f = function(t2, e2) {
            e2.classList.add(s);
            var n2 = document.createElement("img");
            n2.src = t2, e2.appendChild(n2);
          }, d = function(t2) {
            if (t2) {
              var e2 = o.injectElIntoModal(r.iconMarkup);
              c.includes(t2) ? u(t2, e2) : f(t2, e2);
            }
          };
          e.default = d;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(2), r = n(4), i = function(t2) {
            navigator.userAgent.includes("AppleWebKit") && (t2.style.display = "none", t2.offsetHeight, t2.style.display = "");
          };
          e.initTitle = function(t2) {
            if (t2) {
              var e2 = r.injectElIntoModal(o.titleMarkup);
              e2.textContent = t2, i(e2);
            }
          }, e.initText = function(t2) {
            if (t2) {
              var e2 = document.createDocumentFragment();
              t2.split("\n").forEach(function(t3, n3, o2) {
                e2.appendChild(document.createTextNode(t3)), n3 < o2.length - 1 && e2.appendChild(document.createElement("br"));
              });
              var n2 = r.injectElIntoModal(o.textMarkup);
              n2.appendChild(e2), i(n2);
            }
          };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(4), i = n(0), a = i.default.BUTTON, s = i.default.DANGER_BUTTON, c = n(3), l = n(2), u = n(6), f = n(5), d = function(t2, e2, n2) {
            var r2 = e2.text, i2 = e2.value, d2 = e2.className, p2 = e2.closeModal, m = o.stringToNode(l.buttonMarkup), b = m.querySelector("." + a), v = a + "--" + t2;
            if (b.classList.add(v), d2) {
              (Array.isArray(d2) ? d2 : d2.split(" ")).filter(function(t3) {
                return t3.length > 0;
              }).forEach(function(t3) {
                b.classList.add(t3);
              });
            }
            n2 && t2 === c.CONFIRM_KEY && b.classList.add(s), b.textContent = r2;
            var g = {};
            return g[t2] = i2, f.setActionValue(g), f.setActionOptionsFor(t2, { closeModal: p2 }), b.addEventListener("click", function() {
              return u.onAction(t2);
            }), m;
          }, p = function(t2, e2) {
            var n2 = r.injectElIntoModal(l.footerMarkup);
            for (var o2 in t2) {
              var i2 = t2[o2], a2 = d(o2, i2, e2);
              i2.visible && n2.appendChild(a2);
            }
            0 === n2.children.length && n2.remove();
          };
          e.default = p;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(3), r = n(4), i = n(2), a = n(5), s = n(6), c = n(0), l = c.default.CONTENT, u = function(t2) {
            t2.addEventListener("input", function(t3) {
              var e2 = t3.target, n2 = e2.value;
              a.setActionValue(n2);
            }), t2.addEventListener("keyup", function(t3) {
              if ("Enter" === t3.key) return s.onAction(o.CONFIRM_KEY);
            }), setTimeout(function() {
              t2.focus(), a.setActionValue("");
            }, 0);
          }, f = function(t2, e2, n2) {
            var o2 = document.createElement(e2), r2 = l + "__" + e2;
            o2.classList.add(r2);
            for (var i2 in n2) {
              var a2 = n2[i2];
              o2[i2] = a2;
            }
            "input" === e2 && u(o2), t2.appendChild(o2);
          }, d = function(t2) {
            if (t2) {
              var e2 = r.injectElIntoModal(i.contentMarkup), n2 = t2.element, o2 = t2.attributes;
              "string" == typeof n2 ? f(e2, n2, o2) : e2.appendChild(n2);
            }
          };
          e.default = d;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(2), i = function() {
            var t2 = o.stringToNode(r.overlayMarkup);
            document.body.appendChild(t2);
          };
          e.default = i;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(5), r = n(6), i = n(1), a = n(3), s = n(0), c = s.default.MODAL, l = s.default.BUTTON, u = s.default.OVERLAY, f = function(t2) {
            t2.preventDefault(), v();
          }, d = function(t2) {
            t2.preventDefault(), g();
          }, p = function(t2) {
            if (o.default.isOpen) switch (t2.key) {
              case "Escape":
                return r.onAction(a.CANCEL_KEY);
            }
          }, m = function(t2) {
            if (o.default.isOpen) switch (t2.key) {
              case "Tab":
                return f(t2);
            }
          }, b = function(t2) {
            if (o.default.isOpen) return "Tab" === t2.key && t2.shiftKey ? d(t2) : void 0;
          }, v = function() {
            var t2 = i.getNode(l);
            t2 && (t2.tabIndex = 0, t2.focus());
          }, g = function() {
            var t2 = i.getNode(c), e2 = t2.querySelectorAll("." + l), n2 = e2.length - 1, o2 = e2[n2];
            o2 && o2.focus();
          }, h = function(t2) {
            t2[t2.length - 1].addEventListener("keydown", m);
          }, w = function(t2) {
            t2[0].addEventListener("keydown", b);
          }, y = function() {
            var t2 = i.getNode(c), e2 = t2.querySelectorAll("." + l);
            e2.length && (h(e2), w(e2));
          }, x = function(t2) {
            if (i.getNode(u) === t2.target) return r.onAction(a.CANCEL_KEY);
          }, _ = function(t2) {
            var e2 = i.getNode(u);
            e2.removeEventListener("click", x), t2 && e2.addEventListener("click", x);
          }, k = function(t2) {
            o.default.timer && clearTimeout(o.default.timer), t2 && (o.default.timer = window.setTimeout(function() {
              return r.onAction(a.CANCEL_KEY);
            }, t2));
          }, O = function(t2) {
            t2.closeOnEsc ? document.addEventListener("keyup", p) : document.removeEventListener("keyup", p), t2.dangerMode ? v() : g(), y(), _(t2.closeOnClickOutside), k(t2.timer);
          };
          e.default = O;
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = n(3), i = n(37), a = n(38), s = { title: null, text: null, icon: null, buttons: r.defaultButtonList, content: null, className: null, closeOnClickOutside: true, closeOnEsc: true, dangerMode: false, timer: null }, c = Object.assign({}, s);
          e.setDefaults = function(t2) {
            c = Object.assign({}, s, t2);
          };
          var l = function(t2) {
            var e2 = t2.button, n2 = t2.buttons;
            return void 0 !== e2 && void 0 !== n2 && o.throwErr("Cannot set both 'button' and 'buttons' options!"), void 0 !== e2 ? { confirm: e2 } : n2;
          }, u = function(t2) {
            return o.ordinalSuffixOf(t2 + 1);
          }, f = function(t2, e2) {
            o.throwErr(u(e2) + " argument ('" + t2 + "') is invalid");
          }, d = function(t2, e2) {
            var n2 = t2 + 1, r2 = e2[n2];
            o.isPlainObject(r2) || void 0 === r2 || o.throwErr("Expected " + u(n2) + " argument ('" + r2 + "') to be a plain object");
          }, p = function(t2, e2) {
            var n2 = t2 + 1, r2 = e2[n2];
            void 0 !== r2 && o.throwErr("Unexpected " + u(n2) + " argument (" + r2 + ")");
          }, m = function(t2, e2, n2, r2) {
            var i2 = typeof e2, a2 = "string" === i2, s2 = e2 instanceof Element;
            if (a2) {
              if (0 === n2) return { text: e2 };
              if (1 === n2) return { text: e2, title: r2[0] };
              if (2 === n2) return d(n2, r2), { icon: e2 };
              f(e2, n2);
            } else {
              if (s2 && 0 === n2) return d(n2, r2), { content: e2 };
              if (o.isPlainObject(e2)) return p(n2, r2), e2;
              f(e2, n2);
            }
          };
          e.getOpts = function() {
            for (var t2 = [], e2 = 0; e2 < arguments.length; e2++) t2[e2] = arguments[e2];
            var n2 = {};
            t2.forEach(function(e3, o3) {
              var r2 = m(0, e3, o3, t2);
              Object.assign(n2, r2);
            });
            var o2 = l(n2);
            n2.buttons = r.getButtonListOpts(o2), delete n2.button, n2.content = i.getContentOpts(n2.content);
            var u2 = Object.assign({}, s, c, n2);
            return Object.keys(u2).forEach(function(t3) {
              a.DEPRECATED_OPTS[t3] && a.logDeprecation(t3);
            }), u2;
          };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true });
          var o = n(1), r = { element: "input", attributes: { placeholder: "" } };
          e.getContentOpts = function(t2) {
            var e2 = {};
            return o.isPlainObject(t2) ? Object.assign(e2, t2) : t2 instanceof Element ? { element: t2 } : "input" === t2 ? r : null;
          };
        }, function(t, e, n) {
          Object.defineProperty(e, "__esModule", { value: true }), e.logDeprecation = function(t2) {
            var n2 = e.DEPRECATED_OPTS[t2], o = n2.onlyRename, r = n2.replacement, i = n2.subOption, a = n2.link, s = o ? "renamed" : "deprecated", c = 'SweetAlert warning: "' + t2 + '" option has been ' + s + ".";
            if (r) {
              c += " Please use" + (i ? ' "' + i + '" in ' : " ") + '"' + r + '" instead.';
            }
            var l = "https://sweetalert.js.org";
            c += a ? " More details: " + l + a : " More details: " + l + "/guides/#upgrading-from-1x", console.warn(c);
          }, e.DEPRECATED_OPTS = { type: { replacement: "icon", link: "/docs/#icon" }, imageUrl: { replacement: "icon", link: "/docs/#icon" }, customClass: { replacement: "className", onlyRename: true, link: "/docs/#classname" }, imageSize: {}, showCancelButton: { replacement: "buttons", link: "/docs/#buttons" }, showConfirmButton: { replacement: "button", link: "/docs/#button" }, confirmButtonText: { replacement: "button", link: "/docs/#button" }, confirmButtonColor: {}, cancelButtonText: { replacement: "buttons", link: "/docs/#buttons" }, closeOnConfirm: { replacement: "button", subOption: "closeModal", link: "/docs/#button" }, closeOnCancel: { replacement: "buttons", subOption: "closeModal", link: "/docs/#buttons" }, showLoaderOnConfirm: { replacement: "buttons" }, animation: {}, inputType: { replacement: "content", link: "/docs/#content" }, inputValue: { replacement: "content", link: "/docs/#content" }, inputPlaceholder: { replacement: "content", link: "/docs/#content" }, html: { replacement: "content", link: "/docs/#content" }, allowEscapeKey: { replacement: "closeOnEsc", onlyRename: true, link: "/docs/#closeonesc" }, allowClickOutside: { replacement: "closeOnClickOutside", onlyRename: true, link: "/docs/#closeonclickoutside" } };
        }]);
      });
    })(sweetalert_min$1);
    return sweetalert_min$1.exports;
  }
  var sweetalert_minExports = requireSweetalert_min();
  const Swal = /* @__PURE__ */ getDefaultExportFromCjs(sweetalert_minExports);
  const ID = "common-qr-code";
  const VERSION = "1.3.0";
  async function decodeQrCode(element) {
    return new Promise((resolve, reject) => {
      const image2 = new Image();
      image2.onload = () => {
        const results = [];
        const { width, height } = image2;
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext("2d");
        context.drawImage(image2, 0, 0);
        while (true) {
          const imageData = context.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, width, height);
          if (!code) {
            break;
          }
          const result = code.data.replace(/^\s+|\s+$/g, "");
          context.fillStyle = "white";
          context.beginPath();
          const { topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner } = code.location;
          context.moveTo(topLeftCorner.x, topLeftCorner.y);
          context.lineTo(topRightCorner.x, topRightCorner.y);
          context.lineTo(bottomRightCorner.x, bottomRightCorner.y);
          context.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
          context.lineTo(topLeftCorner.x, topLeftCorner.y);
          context.fill();
          context.closePath();
          results.push(result);
        }
        resolve(results);
      };
      image2.onerror = reject;
      if (element instanceof HTMLImageElement) {
        _GM_xmlhttpRequest({
          method: "GET",
          url: element.src,
          responseType: "blob",
          onload: (response) => {
            if (response.status !== 200) {
              reject(new Error(`Failed to load image: ${response.status} ${response.statusText}`));
              return;
            }
            image2.src = URL.createObjectURL(response.response);
          },
          onerror: reject
        });
      } else if (element instanceof HTMLCanvasElement) {
        image2.src = element.toDataURL();
      }
    });
  }
  function isUrl(url) {
    return /^https?:\/\//.test(url.trimStart());
  }
  console.log(`${ID}(v${VERSION})`);
  let image = null;
  _GM_registerMenuCommand("Decode QR Code", () => {
    if (!image) {
      return notiflixNotifyAio.Notify.warning("未选择图片, 请先右键选择图片");
    }
    decodeQrCode(image).then((results) => {
      if (results.length === 0) {
        return notiflixNotifyAio.Notify.warning("未识别到二维码, 请确认图片是否有效");
      }
      const isMultiple = results.length > 1;
      const element = document.createElement("div");
      for (const [index, result] of results.entries()) {
        const resultButton = document.createElement("button");
        resultButton.innerHTML = result;
        resultButton.style.fontSize = "16px";
        resultButton.style.maxHeight = "200px";
        resultButton.style.overflowY = "auto";
        resultButton.style.width = "100%";
        resultButton.className = "swal-button swal-button--cancel";
        if (index > 0) {
          resultButton.style.marginTop = "10px";
        }
        resultButton.dataset.result = result;
        if (isUrl(result)) {
          const div = document.createElement("div");
          const a = document.createElement("a");
          a.href = result;
          a.target = "_blank";
          a.textContent = "跳转";
          div.appendChild(resultButton);
          div.appendChild(a);
          resultButton.appendChild(div);
        } else {
          element.appendChild(resultButton);
        }
      }
      element.addEventListener("click", (event) => {
        if (event.target instanceof HTMLButtonElement && event.target.dataset.result) {
          _GM_setClipboard(event.target.dataset.result, "text");
          notiflixNotifyAio.Notify.success("已复制到剪贴板");
          Swal.close();
        }
      });
      Swal({
        icon: "success",
        title: "识别成功",
        text: isMultiple ? "识别到多个二维码, 点击文本内容可单独复制" : void 0,
        content: {
          element
        },
        buttons: {
          confirm: {
            text: isMultiple ? "全部复制到剪贴板" : "复制到剪贴板",
            value: "copy"
          }
        }
      }).then((result) => {
        if (result === "copy") {
          _GM_setClipboard(results.join("\n"), "text");
          notiflixNotifyAio.Notify.success("已复制到剪贴板");
        }
      });
    }).catch((error) => {
      notiflixNotifyAio.Notify.failure("识别失败, 请检查图片是否有效");
      console.error(error);
    }).finally(() => image = null);
  });
  document.addEventListener("contextmenu", (event) => {
    if (event.target instanceof HTMLImageElement || event.target instanceof HTMLCanvasElement) {
      image = event.target;
    }
  });

})(Notiflix, jsQR);
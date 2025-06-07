// ==UserScript==
// @name         图片二维码识别（Common QR Code）
// @namespace    xiaohuohumax/userscripts/common-qr-code
// @version      1.0.1
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
  const ID = "common-qr-code";
  const VERSION = "1.0.1";
  async function decodeQrCode(url) {
    return new Promise((resolve, reject) => {
      const image2 = new Image();
      image2.onload = () => {
        var _a;
        const { width, height } = image2;
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext("2d");
        context.drawImage(image2, 0, 0);
        const imageData = context.getImageData(0, 0, width, height);
        resolve((_a = jsQR(imageData.data, width, height)) == null ? void 0 : _a.data.replace(/^\s+|\s+$/g, ""));
      };
      image2.onerror = reject;
      _GM_xmlhttpRequest({
        method: "GET",
        url,
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
    });
  }
  console.log(`${ID}(v${VERSION})`);
  let image = null;
  _GM_registerMenuCommand("Decode QR Code", () => {
    if (!image) {
      return notiflixNotifyAio.Notify.warning("未选择图片, 请先右键选择图片");
    }
    decodeQrCode(image.src).then((data) => {
      if (data === void 0) {
        return notiflixNotifyAio.Notify.warning("未识别到二维码, 请确认图片是否有效");
      }
      notiflixNotifyAio.Notify.success("识别成功, 已复制到剪贴板");
      _GM_setClipboard(data, "text");
    }).catch((error) => {
      notiflixNotifyAio.Notify.failure("识别失败, 请检查图片是否有效");
      console.error(error);
    }).finally(() => image = null);
  });
  document.addEventListener("contextmenu", (event) => {
    if (event.target instanceof HTMLImageElement) {
      image = event.target;
    }
  });

})(Notiflix, jsQR);
// ==UserScript==
// @name         🖱右键快速复制/粘贴文本（Common Right Click Copy）
// @namespace    xiaohuohumax/userscripts/common-right-click-copy
// @version      1.0.0
// @author       xiaohuohumax
// @description  用户可以通过右键点击选中的文本，快速复制到剪贴板，然后在输入框中右键即可快速粘贴剪贴板的文本（PS：对应复制限制的网站暂不支持）。
// @license      MIT
// @icon         https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-copy.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-copy.user.js
// @match        http*://*/*
// @require      https://unpkg.com/sweetalert2@11.15.9/dist/sweetalert2.all.min.js
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// ==/UserScript==

(function (Swal) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setClipboard = /* @__PURE__ */ (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const ID = "common-right-click-copy";
  const VERSION = "1.0.0";
  const LAST_VERSION = 1;
  class Store {
    constructor() {
      __publicField(this, "config", null);
      __publicField(this, "ID", `${ID}-config`);
      __publicField(this, "listeners", []);
      this.loadConfig();
      _GM_addValueChangeListener(this.ID, (_key, _oldValue, newValue, remote) => {
        if (remote) {
          this.config = this.configFormat(newValue);
          this.listeners.forEach((listener) => listener(this.config));
        }
      });
    }
    loadConfig() {
      const config = _GM_getValue(this.ID, void 0);
      this.config = this.configFormat(config);
      !config && this.saveConfig();
      console.log("加载配置：", this.config);
    }
    saveConfig() {
      _GM_setValue(this.ID, this.config);
      this.listeners.forEach((listener) => listener(this.config));
    }
    addConfigChangeListener(listener) {
      this.listeners.push(listener);
    }
    configFormat(data) {
      const config = {
        version: LAST_VERSION,
        enableCopy: true,
        enablePaste: true,
        copyTrigger: "double",
        pasteTrigger: "double"
      };
      if (!data) {
        return config;
      }
      if (data.version === 0) ;
      return Object.assign(config, data);
    }
    get copyTrigger() {
      return this.config.copyTrigger;
    }
    set copyTrigger(value) {
      this.config.copyTrigger = value;
      this.saveConfig();
    }
    get pasteTrigger() {
      return this.config.pasteTrigger;
    }
    set pasteTrigger(value) {
      this.config.pasteTrigger = value;
      this.saveConfig();
    }
    get enableCopy() {
      return this.config.enableCopy;
    }
    set enableCopy(value) {
      this.config.enableCopy = value;
      this.saveConfig();
    }
    get enablePaste() {
      return this.config.enablePaste;
    }
    set enablePaste(value) {
      this.config.enablePaste = value;
      this.saveConfig();
    }
  }
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3e3,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  class View {
    constructor(store2) {
      __publicField(this, "config", async () => {
        const { isConfirmed, value } = await Swal.fire({
          title: "设置",
          html: `<p style="margin: 0 !important; text-align: left;">是否启用右键复制功能:</p>
      <div class="swal2-radio" style="width: 100%; margin: .75rem 0 !important; text-align: left;">
        <label style="display: inline-block; margin-left: 0 !important;"><input type="radio" name="enable-copy" value="true"><span class="swal2-label">开启</span></label>
        <label style="display: inline-block;"><input type="radio" name="enable-copy" value="false"><span class="swal2-label">关闭</span></label>
      </div>
      <p style="margin: 0 !important; text-align: left;">复制触发模式:</p>
      <select id="copy-trigger-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="double">右键双击</option>
        <option value="single">右键单击</option>
      </select>
      <p style="margin: 0 !important; text-align: left;">是否启用右键粘贴功能:</p>
      <div class="swal2-radio" style="width: 100%; margin: .75rem 0 !important; text-align: left;">
        <label style="display: inline-block; margin-left: 0 !important;"><input type="radio" name="enable-paste" value="true"><span class="swal2-label">开启</span></label>
        <label style="display: inline-block;"><input type="radio" name="enable-paste" value="false"><span class="swal2-label">关闭</span></label>
      </div>
      <p style="margin: 0 !important; text-align: left;">粘贴触发模式:</p>
      <select id="paste-trigger-mode" class="swal2-select" style="width: 100%; margin: .75rem 0 !important;">
        <option value="double">右键双击</option>
        <option value="single">右键单击</option>
      </select>`,
          willOpen: (popup) => {
            const copyTriggerMode = popup.querySelector("#copy-trigger-mode");
            const pasteTriggerMode = popup.querySelector("#paste-trigger-mode");
            copyTriggerMode.value = this.store.copyTrigger;
            pasteTriggerMode.value = this.store.pasteTrigger;
            const enableCopy = popup.querySelector(`input[name="enable-copy"][value="${this.store.enableCopy}"]`);
            enableCopy.checked = true;
            const enablePaste = popup.querySelector(`input[name="enable-paste"][value="${this.store.enablePaste}"]`);
            enablePaste.checked = true;
          },
          preConfirm: () => {
            const copyTriggerMode = document.getElementById("copy-trigger-mode");
            const pasteTriggerMode = document.getElementById("paste-trigger-mode");
            const enableCopy = document.querySelector(`input[name="enable-copy"]:checked`);
            const enablePaste = document.querySelector(`input[name="enable-paste"]:checked`);
            return {
              copyTriggerMode: copyTriggerMode.value,
              pasteTriggerMode: pasteTriggerMode.value,
              enableCopy: enableCopy.value === "true",
              enablePaste: enablePaste.value === "true"
            };
          },
          showCancelButton: true,
          confirmButtonText: "保存",
          cancelButtonText: "取消"
        });
        if (!isConfirmed) {
          await Toast.fire({
            icon: "warning",
            title: "已取消设置"
          });
          return;
        }
        this.store.copyTrigger = value.copyTriggerMode;
        this.store.pasteTrigger = value.pasteTriggerMode;
        this.store.enableCopy = value.enableCopy;
        this.store.enablePaste = value.enablePaste;
        await Toast.fire({
          icon: "success",
          title: "设置已保存"
        });
      });
      this.store = store2;
    }
  }
  const THRESHOLD = 300;
  const CLEANED = 0;
  let timer = CLEANED;
  const store = new Store();
  const view = new View(store);
  console.log(`${ID}(v${VERSION})`);
  function copy(selection) {
    selection && _GM_setClipboard(selection, "text");
  }
  async function paste(target, isContenteditable, isInput) {
    const clipboardContext = await navigator.clipboard.readText();
    if (isContenteditable) {
      const range = window.getSelection().getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(clipboardContext));
    } else if (isInput) {
      target.value = clipboardContext.trim();
    }
  }
  document.addEventListener("contextmenu", async (e) => {
    var _a;
    const target = e.target;
    if (!target) {
      return;
    }
    const selection = (_a = window.getSelection()) == null ? void 0 : _a.toString();
    const isContenteditable = target.hasAttribute("contenteditable");
    const isInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    const isCopy = !!selection && !isInput;
    if (!(isCopy && store.enableCopy || (isInput || isContenteditable) && store.enablePaste)) {
      return;
    }
    if (timer > CLEANED) {
      clearTimeout(timer);
      timer = CLEANED;
      if (store.copyTrigger === "double" && isCopy) {
        e.preventDefault();
        copy(selection);
        return;
      }
      if (store.pasteTrigger === "double" && isInput) {
        e.preventDefault();
        await paste(target, isContenteditable, isInput);
        return;
      }
      return;
    }
    if (store.copyTrigger === "single") {
      e.preventDefault();
    }
    timer = setTimeout(() => {
      timer = CLEANED;
      if (store.copyTrigger === "single" && isCopy) {
        copy(selection);
        return;
      }
      if (store.pasteTrigger === "single" && isInput) {
        paste(target, isContenteditable, isInput);
      }
    }, THRESHOLD);
  });
  _GM_registerMenuCommand("修改配置", view.config);

})(Swal);
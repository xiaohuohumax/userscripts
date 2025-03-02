// ==UserScript==
// @name         Common Right Click Tab
// @namespace    xiaohuohumax/userscripts/common-right-click-tab
// @version      1.1.0
// @author       xiaohuohumax
// @description  浏览器右键修改：超链接单击改为在新标签页打开，双击为原右键菜单
// @license      MIT
// @icon         https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js
// @match        http*://*/*
// @require      https://unpkg.com/sweetalert@2.1.2/dist/sweetalert.min.js
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @run-at       document-start
// @noframes
// ==/UserScript==

(function (swal) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const ID = "common-right-click-tab";
  const VERSION = "1.1.0";
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
        active: true
      };
      if (!data) {
        return config;
      }
      if (data.version === 0) {
        return config;
      }
      return Object.assign(config, data);
    }
    get active() {
      return this.config.active;
    }
    set active(value) {
      this.config.active = value;
      this.saveConfig();
    }
  }
  class View {
    constructor(store2) {
      __publicField(this, "toggleActive", () => {
        this.store.active = !this.store.active;
        swal(`超链接右键已切换为 [${this.store.active ? "前台" : "后台"}] 模式打开`, "", "success");
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
  document.addEventListener("contextmenu", (e) => {
    if (timer > CLEANED) {
      clearTimeout(timer);
      timer = CLEANED;
    } else {
      const element = e.target;
      const link = element.closest("a");
      if (link) {
        e.preventDefault();
        timer = setTimeout(() => {
          timer = CLEANED;
          _GM_openInTab(link.href, { active: store.active });
        }, THRESHOLD);
      }
    }
  });
  _GM_registerMenuCommand("切换超链接打开方式(前台/后台)", view.toggleActive);

})(swal);
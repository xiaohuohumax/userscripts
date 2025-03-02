// ==UserScript==
// @name         Common Right Click Tab
// @namespace    xiaohuohumax/userscripts/common-right-click-tab
// @version      1.0.0
// @author       xiaohuohumax
// @description  浏览器右键修改：超链接单击改为在新标签页打开，双击为原右键菜单
// @license      MIT
// @icon         https://raw.githubusercontent.com/xiaohuohumax/logo/refs/heads/main/logos/logo.svg
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/common-right-click-tab.user.js
// @match        http*://*/*
// @run-at       document-start
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  const ID = "common-right-click-tab";
  const VERSION = "1.0.0";
  const THRESHOLD = 300;
  const CLEANED = 0;
  let timer = CLEANED;
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
          window.open(link.href, "_blank");
        }, THRESHOLD);
      }
    }
  });

})();
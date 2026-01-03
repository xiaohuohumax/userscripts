// ==UserScript==
// @name         GitHub 仪表盘页面自动加载更多（GitHub Dashboard Auto More）
// @namespace    xiaohuohumax/userscripts/github-dashboard-auto-more
// @version      1.0.1
// @author       xiaohuohumax
// @description  我负责点，你负责看！
// @license      MIT
// @icon         https://github.githubassets.com/favicons/favicon-dark.png
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-dashboard-auto-more.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-dashboard-auto-more.user.js
// @match        https://github.com
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  const debounce = ({ delay }, func) => {
    let timer = void 0;
    let active = true;
    const debounced = (...args) => {
      if (active) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          active && func(...args);
          timer = void 0;
        }, delay);
      } else {
        func(...args);
      }
    };
    debounced.isPending = () => {
      return timer !== void 0;
    };
    debounced.cancel = () => {
      active = false;
    };
    debounced.flush = (...args) => func(...args);
    return debounced;
  };
  const ID = "github-dashboard-auto-more";
  const VERSION = "1.0.1";
  console.log(`${ID}(v${VERSION})`);
  function autoClick() {
    const selectors = ".ajax-pagination-btn.color-bg-overlay";
    const moreButton = document.querySelector(selectors);
    if (!moreButton) {
      return;
    }
    const rect = moreButton.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 2 && rect.bottom > 0;
    isVisible && moreButton.click();
  }
  const handleScroll = debounce({ delay: 100 }, autoClick);
  handleScroll();
  window.addEventListener("scroll", handleScroll);

})();
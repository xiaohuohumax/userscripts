// ==UserScript==
// @name         GitHub Commit Sort
// @namespace    xiaohuohumax/userscripts/github-commit-sort
// @version      1.0.1
// @author       xiaohuohumax
// @description  GitHub 仓库文件按提交时间排序
// @license      MIT
// @icon         https://github.githubassets.com/favicons/favicon-dark.png
// @source       https://github.com/xiaohuohumax/userscripts.git
// @downloadURL  https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-commit-sort.user.js
// @updateURL    https://raw.githubusercontent.com/xiaohuohumax/userscripts/main/dist/github-commit-sort.user.js
// @match        https://github.com/*
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
  const version = "1.0.1";
  const ID = "github-commit-sort";
  const VERSION = version;
  const SORT_BUTTON_ID = `${ID}-sort-button`;
  const SORT_ICON_MAP = {
    desc: "▴",
    asc: "▾",
    default: "="
  };
  const STATES = Object.keys(SORT_ICON_MAP);
  function createSortButton(state2, marginLeft = "") {
    const button = document.createElement("button");
    button.textContent = SORT_ICON_MAP[state2];
    button.classList.add(SORT_BUTTON_ID, "Button", "Button--iconOnly", "Button--secondary");
    button.style.width = "var(--control-xsmall-size)";
    button.style.height = "var(--control-xsmall-size)";
    button.style.marginLeft = marginLeft;
    return button;
  }
  let state = "default";
  async function main() {
    const tableElement = document.querySelector('table[aria-labelledby="folders-and-files"]');
    if (!tableElement) {
      return;
    }
    const tableBody = tableElement.querySelector("tbody");
    if (!tableBody) {
      return;
    }
    let isMainTable = true;
    let tableHead = tableElement.querySelector('tbody > tr[class^="Box-sc-"] > td > div > div:last-child');
    if (!tableHead) {
      tableHead = tableElement.querySelector("thead > tr > th:last-child > div");
      if (!tableHead) {
        return;
      }
      isMainTable = false;
      const tableHeadParent = tableHead.parentNode;
      tableHeadParent.style.width = "170px";
    }
    const sortRowsByState = () => {
      const rowElements = Array.from(tableBody.querySelectorAll('tr[class^="react-directory-row"]'));
      const rows = rowElements.map((element) => {
        const relativeTimeElement = element.querySelector("relative-time");
        const id = element.getAttribute("id");
        return {
          element,
          date: new Date(relativeTimeElement.getAttribute("datetime")),
          textContent: relativeTimeElement.shadowRoot.textContent,
          id,
          defaultIndex: Number(id.split("-").pop())
        };
      });
      const sortedRows = rows.sort((a, b) => {
        if (state === "default") {
          return a.defaultIndex - b.defaultIndex;
        }
        const aDate = a.date.getTime();
        const bDate = b.date.getTime();
        return a.textContent === b.textContent ? 0 : state === "asc" ? aDate - bDate : bDate - aDate;
      });
      const tableViewAllFilesElement = tableBody.querySelector('tr[data-testid="view-all-files-row"');
      sortedRows.forEach((row) => {
        row.element.remove();
        tableViewAllFilesElement ? tableBody.insertBefore(row.element, tableViewAllFilesElement) : tableBody.appendChild(row.element);
      });
    };
    let sortButton = tableHead.querySelector(`button.${SORT_BUTTON_ID}`);
    if (!sortButton) {
      sortButton = createSortButton("default", isMainTable ? "0" : "10px");
      tableHead.appendChild(sortButton);
      tableHead.style.display = "inline-flex";
      tableHead.style.alignItems = "center";
      sortButton.addEventListener("click", () => {
        state = STATES[(STATES.indexOf(state) + 1) % STATES.length];
        sortRowsByState();
        sortButton.textContent = SORT_ICON_MAP[state];
      });
    }
  }
  console.log(`${"github-commit-sort"}(v${VERSION})`);
  const observer = new MutationObserver(debounce({ delay: 100 }, main));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
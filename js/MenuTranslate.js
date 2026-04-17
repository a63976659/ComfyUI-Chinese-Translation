/**
 * ComfyUI-Translation-node 菜单翻译模块
 */

import { 
  isAlreadyTranslatedText, 
  nativeTranslatedSettings,
  isOptionTranslationEnabled,
  error
} from "./utils.js";

class TExe {
  static T = null;

  MT(txt) {
    if (isAlreadyTranslatedText(txt)) {
      return null;
    }
    return this.T?.Menu?.[txt] || this.T?.Menu?.[txt?.trim?.()];
  }

  constructor() {
    this.excludeClass = [
      "lite-search-item-type",
      "p-virtualscroller", // 拦截模版搜索中的虚拟滚动列表
      "p-listbox"          // 拦截 PrimeVue 列表容器
    ];
    this.observers = [];
    
    // 【核心修复 1】：内部微任务防抖队列，解决同一 Target 瞬间被触发数百次的问题
    this.pendingNodes = new Set();
    this.isScheduling = false;
  }

  tSkip(node) {
    try {
      // 性能优化：文本节点直接查父级，精准匹配黑名单组件
      const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      if (!el || typeof el.closest !== 'function') return false;
      return this.excludeClass.some((cls) => el.closest(`.${cls}`));
    } catch (e) {
      return false;
    }
  }

  translateKjPopDesc(node) {
    try {
      let T = this.T;
      if (!T) return false;
      if (!node || !node.querySelectorAll) return false;
      if (!node?.classList?.contains("kj-documentation-popup")) return false;
      
      const allElements = node.querySelectorAll("*");
      for (const ele of allElements) {
        this.replaceText(ele);
      }
      return true;
    } catch (e) {
      error("翻译KJ弹窗出错:", e);
      return false;
    }
  }

  translateAllText(node) {
    try {
      let T = this.T;
      if (!T || !node) return;
      // 过滤掉不合理的 DOM 节点
      if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

      // 把待翻译节点加入防抖队列 (应对你第3、4轮发现的 target 重复重入问题)
      this.pendingNodes.add(node);

      if (!this.isScheduling) {
        this.isScheduling = true;
        
        // 使用 queueMicrotask 在当前所有同步 Mutation 回调执行完毕后，统一收网
        queueMicrotask(() => {
          const nodesToTranslate = Array.from(this.pendingNodes);
          this.pendingNodes.clear();
          this.isScheduling = false;

          for (const targetNode of nodesToTranslate) {
            // 如果节点已经被销毁（Vue 虚拟列表频繁销毁重建），直接跳过
            if (!document.contains(targetNode) && targetNode.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
              continue;
            }

            // 【核心修复 2】：彻底移除 querySelectorAll("*") ！！
            // 直接把父容器抛给 replaceText，让它利用自带的递归完成 O(N) 的单次遍历。
            this.replaceText(targetNode);
          }
        });
      }
    } catch (e) {
      error("翻译所有文本出错:", e);
    }
  }

  replaceText(target) {
    try {
      if (!target) return;
      if (!this.T) return;
      if (this.tSkip(target)) return;
      
      if (target.textContent && nativeTranslatedSettings.includes(target.textContent)) {
        return;
      }
      
      // COMBO 下拉选项翻译开关：ContextMenu 容器内的文本受此开关控制
      if (!isOptionTranslationEnabled()) {
        const el = target.nodeType === Node.TEXT_NODE ? target.parentElement : target;
        if (el?.closest?.(".litecontextmenu")) return;
      }
      
      if (target.childNodes && target.childNodes.length) {
        const childNodes = Array.from(target.childNodes);
        for (const childNode of childNodes) {
          this.replaceText(childNode);
        }
      }
      
      if (target.nodeType === Node.TEXT_NODE) {
        if (target.nodeValue && !isAlreadyTranslatedText(target.nodeValue)) {
          const translated = this.MT(target.nodeValue);
          if (translated) {
            target.nodeValue = translated;
          }
        }
      } else if (target.nodeType === Node.ELEMENT_NODE) {
        if (target.title && !isAlreadyTranslatedText(target.title)) {
          const titleTranslated = this.MT(target.title);
          if (titleTranslated) {
            target.title = titleTranslated;
          }
        }

        if (target.nodeName === "INPUT" && target.type === "button" && 
            !isAlreadyTranslatedText(target.value)) {
          const valueTranslated = this.MT(target.value);
          if (valueTranslated) {
            target.value = valueTranslated;
          }
        }

        if (target.innerText && !isAlreadyTranslatedText(target.innerText) &&
            (!target.children || target.children.length === 0)) {
          const innerTextTranslated = this.MT(target.innerText);
          if (innerTextTranslated) {
            target.innerText = innerTextTranslated;
          }
        }
        
        if (target.nodeName === "SELECT" && isOptionTranslationEnabled()) {
          Array.from(target.options).forEach(option => {
            if (option.text && !isAlreadyTranslatedText(option.text)) {
              const optionTextTranslated = this.MT(option.text);
              if (optionTextTranslated) {
                option.text = optionTextTranslated;
              }
            }
          });
        }
      }
    } catch (e) {
      error("替换文本出错:", e);
    }
  }

  cleanupObservers() {
    try {
      this.observers.forEach(observer => {
        if (observer && typeof observer.disconnect === 'function') {
          observer.disconnect();
        }
      });
      this.observers = [];
    } catch (e) {
      error("清理观察者出错:", e);
    }
  }
}

let texe = new TExe();

export function applyMenuTranslation(T) {
  try {
    texe.cleanupObservers();
    texe.T = T;
    
    texe.translateAllText(document.querySelector(".litegraph"));
    
    let _bodyDebounceTimer = null;
    let _bodyPendingMutations = [];
    
    const bodyObserver = observeFactory(document.querySelector("body.litegraph"), (mutationsList) => {
      _bodyPendingMutations.push(...mutationsList);
      if (_bodyDebounceTimer) clearTimeout(_bodyDebounceTimer);
      _bodyDebounceTimer = setTimeout(() => {
        _bodyDebounceTimer = null;
        const mutations = _bodyPendingMutations;
        _bodyPendingMutations = [];
        
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.classList?.contains("comfy-modal")) {
              texe.translateAllText(node);
              observeModalNode(node);
            } else if (node.classList?.contains("p-dialog-mask")) {
              const dialog = node.querySelector(".p-dialog");
              if (dialog) {
                texe.translateAllText(dialog);
                observeFactory(dialog, handleSettingsDialog, dialog?.role === "dialog");
              }
            } else {
              texe.translateAllText(node);
            }
          }
        }
      }, 16);
    }, true);
    
    texe.observers.push(bodyObserver);
    
    document.querySelectorAll(".comfy-modal").forEach(node => {
      observeModalNode(node);
    });
    
    if (document.querySelector(".comfyui-menu")) {
      const menuObserver = observeFactory(document.querySelector(".comfyui-menu"), handleComfyNewUIMenu, true);
      texe.observers.push(menuObserver);
    }
    
    document.querySelectorAll(".comfyui-popup").forEach(node => {
      const popupObserver = observeFactory(node, handleComfyNewUIMenu, true);
      texe.observers.push(popupObserver);
    });
    
    handleHistoryAndQueueButtons();
    handleSettingsDialog();
    setupSearchBoxObserver();
  } catch (e) {
    error("应用菜单翻译出错:", e);
  }
}

export function observeFactory(observeTarget, fn, subtree = false) {
  if (!observeTarget) return null;
  try {
    const observer = new MutationObserver(function (mutationsList, observer) {
      fn(mutationsList, observer);
    });
    observer.observe(observeTarget, { childList: true, attributes: true, subtree: subtree });
    return observer;
  } catch (e) {
    error("创建观察者出错:", e);
    return null;
  }
}

function observeModalNode(node) {
  const observer = observeFactory(node, (mutationsList) => {
    for (let mutation of mutationsList) {
      texe.translateAllText(mutation.target);
    }
  });
  if (observer) {
    texe.observers.push(observer);
  }
}

let _menuDebounceTimer = null;
let _menuPendingMutations = [];

function handleComfyNewUIMenu(mutationsList) {
  _menuPendingMutations.push(...mutationsList);
  if (_menuDebounceTimer) clearTimeout(_menuDebounceTimer);
  _menuDebounceTimer = setTimeout(() => {
    _menuDebounceTimer = null;
    const mutations = _menuPendingMutations;
    _menuPendingMutations = [];
    
    // 去重：同一 target 只翻译一次
    const targets = new Set();
    for (const mutation of mutations) {
      targets.add(mutation.target);
    }
    for (const target of targets) {
      texe.translateAllText(target);
    }
  }, 16);
}

function handleHistoryAndQueueButtons() {
  const viewHistoryButton = document.getElementById("comfy-view-history-button");
  const viewQueueButton = document.getElementById("comfy-view-queue-button");

  [viewHistoryButton, viewQueueButton].filter(Boolean).forEach(btn => {
    const observer = observeFactory(btn, (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const translatedValue = texe.MT(mutation.target.textContent);
          if (translatedValue) {
            mutation.target.innerText = translatedValue;
          }
        }
      }
    });
    if (observer) {
      texe.observers.push(observer);
    }
  });
  
  if (document.querySelector(".comfy-menu")) {
    const menuObserver = observeFactory(document.querySelector(".comfy-menu"), handleViewQueueComfyListObserver);
    if (menuObserver) texe.observers.push(menuObserver);

    const comfyLists = document.querySelector(".comfy-menu").querySelectorAll(".comfy-list");
    if (comfyLists.length > 0) {
      const list0Observer = observeFactory(comfyLists[0], handleViewQueueComfyListObserver);
      if (list0Observer) texe.observers.push(list0Observer);
      
      if (comfyLists.length > 1) {
        const list1Observer = observeFactory(comfyLists[1], handleViewQueueComfyListObserver);
        if (list1Observer) texe.observers.push(list1Observer);
      }
    }
  }
}

function handleViewQueueComfyListObserver(mutationsList) {
  for (let mutation of mutationsList) {
    texe.replaceText(mutation.target);
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        texe.replaceText(node);
      }
    }
  }
}

function handleSettingsDialog() {
  const comfySettingDialog = document.querySelector("#comfy-settings-dialog");
  if (!comfySettingDialog) return;

  if (comfySettingDialog?.querySelector("tbody")) {
    const observer = observeFactory(comfySettingDialog.querySelector("tbody"), (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          translateSettingDialog(comfySettingDialog);
        }
      }
    });
    if (observer) texe.observers.push(observer);
  }

  const newSettingsPanels = document.querySelectorAll(".p-dialog-content, .p-tabview-panels");
  for (const panel of newSettingsPanels) {
    const observer = observeFactory(panel, handleNewSettingsObserver, true);
    if (observer) texe.observers.push(observer);
  }
  
  translateSettingDialog(comfySettingDialog);
}

function handleNewSettingsObserver(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        texe.translateAllText(node);
      }
    }
  }
}

function translateSettingDialog(comfySettingDialog) {
  if (!comfySettingDialog) return;
  
  const comfySettingDialogAllElements = comfySettingDialog.querySelectorAll("*");
  for (const ele of comfySettingDialogAllElements) {
    if (isAlreadyTranslatedText(ele.innerText) || 
        nativeTranslatedSettings.includes(ele.innerText)) {
      continue;
    }
    
    let targetLangText = texe.MT(ele.innerText);
    let titleText = texe.MT(ele.title);
    if (titleText) ele.title = titleText;
    if (!targetLangText) {
      if (ele.nodeName === "INPUT" && ele.type === "button") {
        targetLangText = texe.MT(ele.value);
        if (!targetLangText) continue;
        ele.value = targetLangText;
      }
      continue;
    }
    texe.replaceText(ele);
  }
}

function setupSearchBoxObserver() {
  const searchObserver = observeFactory(document.querySelector(".litegraph"), (mutationsList, observer) => {
    if (!observer.searchBoxObservers) {
      observer.searchBoxObservers = [];
    }
    
    for (let mutation of mutationsList) {
      if (mutation.removedNodes.length > 0 && observer.searchBoxObservers.length > 0) {
        observer.searchBoxObservers.forEach(ob => {
          if (ob && typeof ob.disconnect === 'function') {
            ob.disconnect();
          }
        });
        observer.searchBoxObservers = [];
        continue;
      }
      
      for (const sb of mutation.addedNodes) {
        if (!sb || !sb.querySelector) continue;
        const helper = sb.querySelector(".helper");
        if (!helper) continue;
        
        const helperObserver = observeFactory(helper, (mutationsList) => {
          for (let mutation of mutationsList) {
            for (const item of mutation.addedNodes) {
              if (item.innerText && texe.T.Nodes[item.innerText]) {
                item.innerText = texe.T.Nodes[item.innerText]["title"] || item.innerText;
              }
            }
          }
        });
        
        if (helperObserver) {
          observer.searchBoxObservers.push(helperObserver);
        }
        
        for (let item of helper.querySelectorAll(".lite-search-item")) {
          if (item.innerText && texe.T.Nodes[item.innerText]) {
            item.innerText = texe.T.Nodes[item.innerText]["title"] || item.innerText;
          }
        }
      }
    }
  });
  
  if (searchObserver) texe.observers.push(searchObserver);
}
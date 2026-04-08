/**
 * ComfyUI-Translation 主逻辑模块
 */

import { app } from "../../../scripts/app.js";
import { $el } from "../../../scripts/ui.js";
import { applyMenuTranslation, observeFactory } from "./MenuTranslate.js";
import {
  isAlreadyTranslatedText,
  isAlreadyTranslated,
  nativeTranslatedSettings,
  isTranslationEnabled,
  toggleTranslation,
  initConfig,
  currentConfig,
  translatedValueSet,
  saveConfig,
  error
} from "./utils.js";

export class TUtils {
  static T = {
    Menu: {},
    Nodes: {},
    NodeCategory: {},
  };

  static async syncTranslation(OnFinished = () => {}) {
    try {
      translatedValueSet.clear();
      
      if (!isTranslationEnabled()) {
        TUtils.T = { Menu: {}, Nodes: {}, NodeCategory: {} };
        OnFinished();
        return;
      }
      
      try {
        const response = await fetch("./translation_node/get_translation", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `locale=${currentConfig.locale}`
        });
        
        if (!response.ok) {
          throw new Error(`请求翻译数据失败: ${response.status} ${response.statusText}`);
        }
        
        const resp = await response.json();
        for (var key in TUtils.T) {
          if (key in resp) TUtils.T[key] = resp[key];
          else TUtils.T[key] = {};
        }

        // 合并分类到菜单中
        TUtils.T.Menu = Object.assign(TUtils.T.Menu || {}, TUtils.T.NodeCategory || {});
        
        // 提取 Node 中 key 到 Menu
        for (let key in TUtils.T.Nodes) {
          let node = TUtils.T.Nodes[key];
          if(node && node["title"]) {
            TUtils.T.Menu = TUtils.T.Menu || {};
            TUtils.T.Menu[key] = node["title"] || key;
          }
        }
        
        // ---- 构建判断用的 Set，提取所有字典内容 ----
        for (const dict of [TUtils.T.Menu, TUtils.T.NodeCategory]) {
          if (!dict) continue;
          for (const val of Object.values(dict)) {
            if (val && typeof val === 'string') translatedValueSet.add(val);
          }
        }
        for (const nodeKey in TUtils.T.Nodes) {
          const nodeDict = TUtils.T.Nodes[nodeKey];
          if (!nodeDict) continue;
          if (nodeDict.title && typeof nodeDict.title === 'string') translatedValueSet.add(nodeDict.title);
          for (const cat of ['inputs', 'outputs', 'widgets']) {
            if (nodeDict[cat]) {
              for (const val of Object.values(nodeDict[cat])) {
                 if (val && typeof val === 'string') translatedValueSet.add(val);
              }
            }
          }
        }
        
      } catch (e) {
        error("获取翻译数据失败:", e);
      }
      
      OnFinished();
    } catch (err) {
      error("同步翻译过程出错:", err);
      OnFinished();
    }
  }

  static enhandeDrawNodeWidgets() {
    try {
      let drawNodeWidgets = LGraphCanvas.prototype.drawNodeWidgets;
      LGraphCanvas.prototype.drawNodeWidgets = function (node, posY, ctx, active_widget) {
        if (!node.widgets || !node.widgets.length) {
          return 0;
        }
        const widgets = node.widgets.filter((w) => w.type === "slider");
        widgets.forEach((widget) => {
          widget._ori_label = widget.label;
          const fixed = widget.options.precision != null ? widget.options.precision : 3;
          widget.label = (widget.label || widget.name) + ": " + Number(widget.value).toFixed(fixed).toString();
        });
        let result;
        try {
          result = drawNodeWidgets.call(this, node, posY, ctx, active_widget);
        } finally {
          widgets.forEach((widget) => {
            widget.label = widget._ori_label;
            delete widget._ori_label;
          });
        }
        return result;
      };
    } catch (e) {
      error("增强节点小部件绘制失败:", e);
    }
  }

  static applyNodeTypeTranslationEx(nodeName) {
    try {
      let nodesT = this.T.Nodes;
      var nodeType = LiteGraph.registered_node_types[nodeName];
      if (!nodeType) return;
      
      let class_type = nodeType.comfyClass ? nodeType.comfyClass : nodeType.type;
      if (nodesT.hasOwnProperty(class_type)) {
        const hasNativeTranslation = nodeType.title && isAlreadyTranslatedText(nodeType.title);
        if (!hasNativeTranslation && nodesT[class_type]["title"]) {
          nodeType.title = nodesT[class_type]["title"];
        }
      }
    } catch (e) {
      error(`为节点类型 ${nodeName} 应用翻译失败:`, e);
    }
  }

  static applyVueNodeDisplayNameTranslation(nodeDef) {
    try {
      const nodesT = TUtils.T.Nodes;
      const class_type = nodeDef.name;
      if (nodesT.hasOwnProperty(class_type)) {
        const hasNativeTranslation = nodeDef.display_name && isAlreadyTranslatedText(nodeDef.display_name);
        if (!hasNativeTranslation && nodesT[class_type]["title"]) {
          nodeDef.display_name = nodesT[class_type]["title"];
        }
      }
    } catch (e) {
      error(`为Vue节点 ${nodeDef?.name} 应用显示名称翻译失败:`, e);
    }
  }

  static applyVueNodeTranslation(nodeDef) {
    try {
      const catsT = TUtils.T.NodeCategory;
      if (!nodeDef.category) return;
      const catArr = nodeDef.category.split("/");
      nodeDef.category = catArr.map((cat) => catsT?.[cat] || cat).join("/");
    } catch (e) {
      error(`为Vue节点 ${nodeDef?.name} 应用翻译失败:`, e);
    }
  }

  static applyNodeTypeTranslation(app) {
    try {
      if (!isTranslationEnabled()) return;
      for (let nodeName in LiteGraph.registered_node_types) {
        this.applyNodeTypeTranslationEx(nodeName);
      }
    } catch (e) {
      error("应用节点类型翻译失败:", e);
    }
  }

  static needsTranslation(item) {
    if (!item || !item.hasOwnProperty("name")) return false;
    
    if (isAlreadyTranslated(item.name, item.label)) {
      return false;
    }
    
    if (isAlreadyTranslatedText(item.name)) {
      return false;
    }
    
    return true;
  }

  static safeApplyTranslation(item, translation) {
    if (this.needsTranslation(item) && translation) {
      if (!item._original_name) {
        item._original_name = item.name;
      }
      item.label = translation;
    }
  }

  static restoreOriginalTranslation(item) {
    if (item._original_name) {
      item.label = item._original_name;
      delete item._original_name;
    } else if (item.label && item.name) {
      item.label = item.name;
    }
  }

  static applyNodeTranslation(node) {
    try {
      if (!node || !node.constructor) return;

      let keys = ["inputs", "outputs", "widgets"];
      let nodesT = this.T.Nodes;
      let class_type = node.constructor.comfyClass ? node.constructor.comfyClass : node.constructor.type;
      
      if (!class_type) return;

      if (!isTranslationEnabled()) {
        for (let key of keys) {
          if (!node.hasOwnProperty(key)) continue;
          if (!node[key] || !Array.isArray(node[key])) continue;
          node[key].forEach((item) => {
            if (item._original_name) {
              this.restoreOriginalTranslation(item);
            }
          });
        }
        
        if (node._original_title && !node._translation_custom_title) {
          node.title = node._original_title;
          node.constructor.title = node._original_title;
          delete node._original_title;
        }
        return;
      }
      
      if (!nodesT || !nodesT.hasOwnProperty(class_type)) return;
      
      var t = nodesT[class_type];
      if (!t) return;
      
      for (let key of keys) {
        if (!t.hasOwnProperty(key)) continue;
        if (!node.hasOwnProperty(key)) continue;
        if (!node[key] || !Array.isArray(node[key])) continue;
        
        node[key].forEach((item) => {
          if (!item || !item.name) return;
          if (item.name in t[key]) {
            const hasNativeTranslation = item.label && isAlreadyTranslatedText(item.label) && !item._original_name;
            if (!hasNativeTranslation) {
              this.safeApplyTranslation(item, t[key][item.name]);
            }
          }
        });
      }
      
      if (t.hasOwnProperty("title")) {
        const hasNativeTranslation = node.title && isAlreadyTranslatedText(node.title);
        const isCustomizedTitle = node._translation_custom_title || 
          (node.title && node.title !== (node.constructor.comfyClass || node.constructor.type) && node.title !== t["title"]);
        
        if (!isCustomizedTitle && !hasNativeTranslation) {
          if (!node._original_title) {
            node._original_title = node.constructor.comfyClass || node.constructor.type;
          }
          node.title = t["title"];
          node.constructor.title = t["title"];
        }
      }
      
      let addInput = node.addInput;
      node.addInput = function (name, type, extra_info) {
        var oldInputs = [];
        if (this.inputs && Array.isArray(this.inputs)) {
          this.inputs.forEach((i) => oldInputs.push(i.name));
        }
        var res = addInput.apply(this, arguments);
        if (this.inputs && Array.isArray(this.inputs)) {
          this.inputs.forEach((i) => {
            if (oldInputs.includes(i.name)) return;
            if (t["widgets"] && i.widget?.name in t["widgets"]) {
              TUtils.safeApplyTranslation(i, t["widgets"][i.widget?.name]);
            }
          });
        }
        return res;
      };
      
      let onInputAdded = node.onInputAdded;
      node.onInputAdded = function (slot) {
        let res;
        if (onInputAdded) {
          res = onInputAdded.apply(this, arguments);
        }
        let t = TUtils.T.Nodes[this.comfyClass];
        if (t?.["widgets"] && slot.name in t["widgets"]) {
          if (TUtils.needsTranslation(slot)) {
            slot.localized_name = t["widgets"][slot.name];
          }
        }
        return res;
      };
    } catch (e) {
      error(`为节点 ${node?.title || '未知'} 应用翻译失败:`, e);
    }
  }

  static applyNodeDescTranslation(nodeType, nodeData, app) {
    try {
      if (!isTranslationEnabled()) return;
      
      let nodesT = this.T.Nodes;
      var t = nodesT[nodeType.comfyClass];
      if (t?.["description"]) {
        nodeData.description = t["description"];
      }

      if (t) {
        var nodeInputT = t["inputs"] || {};
        var nodeWidgetT = t["widgets"] || {};
        for (let itype in nodeData.input) {
          for (let socketname in nodeData.input[itype]) {
            let inp = nodeData.input[itype][socketname];
            if (inp[1] === undefined || !inp[1].tooltip) continue;
            var tooltip = inp[1].tooltip;
            var tooltipT = nodeInputT[tooltip] || nodeWidgetT[tooltip] || tooltip;
            inp[1].tooltip = tooltipT;
          }
        }
        
        var nodeOutputT = t["outputs"] || {};
        for (var i = 0; i < (nodeData.output_tooltips || []).length; i++) {
          var tooltip = nodeData.output_tooltips[i];
          var tooltipT = nodeOutputT[tooltip] || tooltip;
          nodeData.output_tooltips[i] = tooltipT;
        }
      }
    } catch (e) {
      error(`为节点 ${nodeType?.comfyClass || '未知'} 应用描述翻译失败:`, e);
    }
  }

  static applyMenuTranslation(app) {
    try {
      if (!isTranslationEnabled()) return;
      applyMenuTranslation(TUtils.T);
      
      const dragHandle = app.ui.menuContainer.querySelector(".drag-handle");
      if (dragHandle && dragHandle.childNodes[1]) {
        observeFactory(dragHandle.childNodes[1], (mutationsList, observer) => {
          for (let mutation of mutationsList) {
            for (let node of mutation.addedNodes) {
              var match = node.data?.match(/(Queue size:) (\w+)/);
              if (match?.length == 3) {
                const t = TUtils.T.Menu[match[1]] ? TUtils.T.Menu[match[1]] : match[1];
                node.data = t + " " + match[2];
              }
            }
          }
        });
      }
    } catch (e) {
      error("应用菜单翻译失败:", e);
    }
  }

  static applyContextMenuTranslation(app) {
    try {
      if (!isTranslationEnabled()) return;
      
      var f = LGraphCanvas.prototype.getCanvasMenuOptions;
      LGraphCanvas.prototype.getCanvasMenuOptions = function () {
        var res = f.apply(this, arguments);
        let menuT = TUtils.T.Menu;
        for (let item of res) {
          if (item == null || !item.hasOwnProperty("content")) continue;
          if (item.content in menuT) {
            if (!item._originalContent) item._originalContent = item.content;
            item.content = menuT[item.content];
          }
        }
        return res;
      };
      
      const f2 = LiteGraph.ContextMenu;
      LiteGraph.ContextMenu = function (values, options) {
        if (options?.hasOwnProperty("title") && options.title in TUtils.T.Nodes) {
          options.title = TUtils.T.Nodes[options.title]["title"] || options.title;
        }
        
        var t = TUtils.T.Menu;
        var tN = TUtils.T.Nodes;
        var reInput = /Convert (.*) to input/;
        var reWidget = /Convert (.*) to widget/;
        var cvt = t["Convert "] || "Convert ";
        var tinp = t[" to input"] || " to input";
        var twgt = t[" to widget"] || " to widget";
        
        for (let value of values) {
          if (value == null || !value.hasOwnProperty("content")) continue;
          
          // 保存原始英文 content（优先保留最早的原始值，防止多次翻译覆盖）
          let originalContent = value._originalContent || value.content;
          let isTranslated = false;
          
          if (value.value in tN) {
            value.content = tN[value.value]["title"] || value.content;
            isTranslated = true;
          } else if (value.content in t) {
            value.content = t[value.content];
            isTranslated = true;
          } else {
            var extra_info = options.extra || options.parentMenu?.options?.extra;
            
            var matchInput = value.content?.match(reInput);
            if (matchInput) {
              var match = matchInput[1];
              extra_info?.inputs?.find((i) => {
                if (i.name != match) return false;
                match = i.label ? i.label : i.name;
              });
              extra_info?.widgets?.find((i) => {
                if (i.name != match) return false;
                match = i.label ? i.label : i.name;
              });
              value.content = cvt + match + tinp;
              isTranslated = true;
            } else {
              var matchWidget = value.content?.match(reWidget);
              if (matchWidget) {
                var match = matchWidget[1];
                extra_info?.inputs?.find((i) => {
                  if (i.name != match) return false;
                  match = i.label ? i.label : i.name;
                });
                extra_info?.widgets?.find((i) => {
                  if (i.name != match) return false;
                  match = i.label ? i.label : i.name;
                });
                value.content = cvt + match + twgt;
                isTranslated = true;
              }
            }
          }
          
          // 仅对实际翻译过的菜单项包装回调，执行前恢复英文、执行后恢复中文
          if (isTranslated) {
            value._originalContent = originalContent;
            
            if (typeof value.callback === "function") {
              const originalCallback = value.callback;
              value.callback = function(v, ...args) {
                const translatedContent = v.content;
                v.content = v._originalContent;
                const result = originalCallback.apply(this, [v, ...args]);
                v.content = translatedContent;
                return result;
              };
            }
          }
        }
        
        // 共享回调也需要拦截：执行前恢复英文、执行后恢复中文
        if (options && typeof options.callback === "function") {
          const originalOptCallback = options.callback;
          options.callback = function(v, ...args) {
            if (v && v._originalContent) {
              const translatedContent = v.content;
              v.content = v._originalContent;
              const result = originalOptCallback.apply(this, [v, ...args]);
              v.content = translatedContent;
              return result;
            }
            return originalOptCallback.apply(this, [v, ...args]);
          };
        }
        
        const ctx = f2.call(this, values, options);
        return ctx;
      };
      LiteGraph.ContextMenu.prototype = f2.prototype;
    } catch (e) {
      error("应用上下文菜单翻译失败:", e);
    }
  }

  static addRegisterNodeDefCB(app) {
    try {
      const f = app.registerNodeDef;
      app.registerNodeDef = async function (nodeId, nodeData) {
        var res = f.apply(this, arguments);
        res.then(() => {
          TUtils.applyNodeTypeTranslationEx(nodeId);
        });
        return res;
      };
    } catch (e) {
      error("添加节点定义注册回调失败:", e);
    }
  }

  static addPanelButtons(app) {
    try {
      if(document.getElementById("toggle-translation-button")) return;
      
      const translationEnabled = isTranslationEnabled();
      const locale = currentConfig.locale;
      
      // ⬇️【核心修复】：正确解析 ComfyUI 的全局设置 JSON 对象，保证万无一失
      let isPlain = false;
      try {
        // 方法 1: 使用 ComfyUI 官方 API 获取设置 (推荐)
        let savedStyle = app?.ui?.settings?.getSettingValue?.("🌐Language翻译语言.ButtonStyle");
        
        // 方法 2: 兜底机制，如果 API 没就绪，直接剥析 localStorage 底层数据
        if (!savedStyle) {
          const settingsStr = localStorage.getItem("Comfy.Settings");
          if (settingsStr) {
            const settingsObj = JSON.parse(settingsStr);
            savedStyle = settingsObj["🌐Language翻译语言.ButtonStyle"];
          }
        }
        
        if (savedStyle && typeof savedStyle === "string") {
          isPlain = savedStyle.includes("plain");
        }
      } catch(e) {
        console.warn("读取按钮样式配置失败，采用默认值", e);
      }
      
      const onText = `翻译开启 (${locale})`;
      const offText = `翻译关闭 (原生)`;
      
      const styleElem = document.createElement('style');
      styleElem.textContent = `
        @keyframes flowEffect {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* 原有的七彩样式 */
        .translation-active-gradient {
          background: linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff80, #0080ff, #8000ff, #ff0080, #ff0000);
          background-size: 400% 100%; color: white; border: none; animation: flowEffect 8s ease infinite;
          text-shadow: 0 1px 2px rgba(0,0,0,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.3);
          transition: all 0.3s ease; font-weight: bold;
        }
        .translation-inactive-gradient {
          background: linear-gradient(90deg, #f0f0f0, #d0d0d0, #b0b0b0, #909090, #707070, #909090, #b0b0b0, #d0d0d0, #f0f0f0);
          background-size: 300% 100%; color: #333; border: none; animation: flowEffect 6s ease infinite;
          box-shadow: 0 0 5px rgba(0,0,0,0.2); transition: all 0.3s ease; font-weight: bold;
        }
        
        /* 使用核心底层变量，抛弃带有延迟的 PrimeVue 变量 */
        .translation-active-plain {
          background-color: var(--comfy-menu-bg, #353535); 
          color: var(--input-text, #ffffff);
          border: 1px solid var(--border-color, #555555);
          transition: all 0.2s ease;
        }
        .translation-inactive-plain {
          background-color: var(--comfy-input-bg, #1e1e1e); 
          color: var(--descrip-text, #888888);
          border: 1px solid var(--border-color, #333333);
          transition: all 0.2s ease;
        }

        .translation-btn:hover {
          transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.3); cursor: pointer; filter: brightness(1.1);
        }
        .translation-btn {
          cursor: pointer; border-radius: 6px; padding: 6px 12px; font-size: 12px;
        }
      `;
      document.head.appendChild(styleElem);

      // 根据配置决定使用哪种 class
      const activeClass = isPlain ? "translation-active-plain" : "translation-active-gradient";
      const inactiveClass = isPlain ? "translation-inactive-plain" : "translation-inactive-gradient";
      
      if(document.querySelector(".comfy-menu") && !document.getElementById("toggle-translation-button")) {
        app.ui.menuContainer.appendChild(
          $el("button.translation-btn", {
            id: "toggle-translation-button",
            textContent: translationEnabled ? onText : offText,
            className: translationEnabled ? `translation-btn ${activeClass}` : `translation-btn ${inactiveClass}`,
            style: { fontWeight: isPlain ? "normal" : "bold", margin: "2px" },
            title: translationEnabled ? "已开启翻译效果" : "已使用原生语言",
            onclick: async () => { await toggleTranslation(); },
          })
        );
      }
      
      try {
        if(window?.comfyAPI?.button?.ComfyButton && window?.comfyAPI?.buttonGroup?.ComfyButtonGroup) {
          var ComfyButtonGroup = window.comfyAPI.buttonGroup.ComfyButtonGroup;
          var ComfyButton = window.comfyAPI.button.ComfyButton;
          
          var btn = new ComfyButton({
            action: async () => { await toggleTranslation(); },
            tooltip: translationEnabled ? "已开启翻译效果" : "已使用原生语言",
            content: translationEnabled ? onText : offText,
            classList: "toggle-translation-button"
          });
          
          if(btn.element) {
            btn.element.classList.add("translation-btn");
            btn.element.classList.add(translationEnabled ? activeClass : inactiveClass);
            btn.element.style.fontWeight = isPlain ? "normal" : "bold";
            btn.element.style.margin = "2px";
          }
          
          var group = new ComfyButtonGroup(btn.element);
          if(app.menu?.settingsGroup?.element) {
            app.menu.settingsGroup.element.before(group.element);
          }
        }
      } catch(e) {
        error("添加新版UI语言按钮失败:", e);
      }
    } catch (e) {
      error("添加面板按钮失败:", e);
    }
  }

  static addNodeTitleMonitoring(app) {
    try {
      if (typeof LGraphNode === 'undefined') return;
      const originalSetTitle = LGraphNode.prototype.setTitle || function(title) { this.title = title; };
      LGraphNode.prototype.setTitle = function(title) {
        if (title && title !== this.constructor.title) { this._translation_custom_title = true; }
        return originalSetTitle.call(this, title);
      };
    } catch (e) {
      error("添加节点标题监听失败:", e);
    }
  }
}

const ext = {
  name: "ComfyUI.TranslationNode",
  
  async init(app) {
    try {
      await initConfig();

      // 请求获取服务器上的语言列表
      let availableLocales = ["zh-CN", "en_US"];
      try {
          const locRes = await fetch("./translation_node/get_locales");
          if (locRes.ok) availableLocales = await locRes.json();
      } catch (e) {}

      let isSettingsRegistered = false; 

      // 1. 语言设置
      app.ui.settings.addSetting({
        id: "🌐Language翻译语言.Language",
        name: "🌐 Language settings for translation (翻译语言设置)",
        type: "combo",
        options: availableLocales,
        defaultValue: currentConfig.locale,
        onChange: async (newVal) => {
          if (!isSettingsRegistered) return; 
          
          if (newVal && newVal !== currentConfig.locale) {
            await saveConfig(currentConfig.translation_enabled, newVal, currentConfig.button_style);
            alert(`Language set to ${newVal}. The page will reload.`);
            location.reload();
          }
        }
      });

      // 2. UI 风格设置 (纯前端本地存储)
      app.ui.settings.addSetting({
        id: "🌐Language翻译语言.ButtonStyle",
        name: "🎨 Button Style (翻译按钮样式)",
        type: "combo",
        options: ["gradient (七彩渐变)", "plain (原生低调)"],
        defaultValue: "gradient (七彩渐变)", 
        onChange: (newVal) => {
          if (!isSettingsRegistered) return; 
          
          const isPlain = newVal.includes("plain");
          
          const btns = document.querySelectorAll(".translation-btn");
          btns.forEach(btn => {
            const isEnabled = currentConfig.translation_enabled;
            
            btn.classList.remove("translation-active-gradient", "translation-inactive-gradient", "translation-active-plain", "translation-inactive-plain");
            
            const activeClass = isPlain ? "translation-active-plain" : "translation-active-gradient";
            const inactiveClass = isPlain ? "translation-inactive-plain" : "translation-inactive-gradient";
            btn.classList.add(isEnabled ? activeClass : inactiveClass);
            
            btn.style.fontWeight = isPlain ? "normal" : "bold";
          });
        }
      });

      isSettingsRegistered = true; 

      TUtils.enhandeDrawNodeWidgets();
      await TUtils.syncTranslation();
    } catch (e) {
      error("扩展初始化失败:", e);
    }
  },
  
  async setup(app) {
    try {      
      TUtils.addNodeTitleMonitoring(app);
      
      if (isTranslationEnabled()) {
        TUtils.applyNodeTypeTranslation(app);
        TUtils.applyContextMenuTranslation(app);
        TUtils.applyMenuTranslation(app);
        TUtils.addRegisterNodeDefCB(app);
      }
      
      TUtils.addPanelButtons(app);
    } catch (e) {
      error("扩展设置失败:", e);
    }
  },
  
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    try {
      TUtils.applyNodeDescTranslation(nodeType, nodeData, app);
    } catch (e) {
      error(`注册节点定义前处理失败 (${nodeType?.comfyClass || '未知'}):`, e);
    }
  },
  
  beforeRegisterVueAppNodeDefs(nodeDefs) {
    try {
      if (!isTranslationEnabled()) return;
      nodeDefs.forEach(TUtils.applyVueNodeDisplayNameTranslation);
      nodeDefs.forEach(TUtils.applyVueNodeTranslation);
    } catch (e) {
      error("注册Vue应用节点定义前处理失败:", e);
    }
  },
  
  loadedGraphNode(node, app) {
    try {
      const originalTitle = node.constructor.comfyClass || node.constructor.type;
      const nodeT = TUtils.T.Nodes[originalTitle];
      const translatedTitle = nodeT?.title;
      
      if (node.title && node.title !== originalTitle && node.title !== translatedTitle) {
        node._translation_custom_title = true;
      }
      TUtils.applyNodeTranslation(node);
    } catch (e) {
      error(`加载图表节点处理失败 (${node?.title || '未知'}):`, e);
    }
  },
  
  nodeCreated(node, app) {
    try {
      TUtils.applyNodeTranslation(node);
    } catch (e) {
      error(`创建节点处理失败 (${node?.title || '未知'}):`, e);
    }
  },
};

app.registerExtension(ext);
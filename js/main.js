/**
 * ComfyUI-Translation 主逻辑模块
 */

import { app } from "../../../scripts/app.js";
import { applyMenuTranslation, observeFactory } from "./MenuTranslate.js";
import { registerSettings, addPanelButtons, setupPluginManager } from "./SettingsPanel.js";
import {
  isAlreadyTranslatedText,
  isAlreadyTranslated,
  nativeTranslatedSettings,
  isTranslationEnabled,
  isOptionTranslationEnabled,
  initConfig,
  currentConfig,
  translatedValueSet,
  error
} from "./utils.js";

export class TUtils {
  static T = {
    Menu: {},
    Nodes: {},
    NodeCategory: {},
  };

  // ===== 【石头(Q:34720803)优化更新】自定义DOM面板翻译支持 开始 =====
  // 所有节点 ui 字典的汇总，用于翻译挂到 body 下的弹窗等节点外 DOM
  static globalUiDict = {};
  // 已挂载翻译观察器的 DOMWidget 根元素
  static domObserved = new WeakSet();
  // ===== 【石头(Q:34720803)优化更新】自定义DOM面板翻译支持 结束 =====

  static async syncTranslation(OnFinished = () => {}) {
    try {
      translatedValueSet.clear();
      
      if (!isTranslationEnabled()) {
        TUtils.T = { Menu: {}, Nodes: {}, NodeCategory: {} };
        TUtils.globalUiDict = {}; // 【石头(Q:34720803)优化更新】关闭翻译时同步清空 ui 字典
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
        // 注意：跳过“恒等翻译”（值与键相同，如 "cfg": "cfg"），避免英文原名污染已翻译判定
        for (const dict of [TUtils.T.Menu, TUtils.T.NodeCategory]) {
          if (!dict) continue;
          for (const [k, val] of Object.entries(dict)) {
            if (val && typeof val === 'string' && val !== k) translatedValueSet.add(val);
          }
        }
        for (const nodeKey in TUtils.T.Nodes) {
          const nodeDict = TUtils.T.Nodes[nodeKey];
          if (!nodeDict) continue;
          if (nodeDict.title && typeof nodeDict.title === 'string' && nodeDict.title !== nodeKey) translatedValueSet.add(nodeDict.title);
          for (const cat of ['inputs', 'outputs', 'widgets']) {
            if (nodeDict[cat]) {
              for (const [k, val] of Object.entries(nodeDict[cat])) {
                 if (val && typeof val === 'string' && val !== k) translatedValueSet.add(val);
              }
            }
          }
        }

        // 【石头(Q:34720803)优化更新】
        // 汇总各节点的 ui 自定义界面字典（英文原文 -> 中文），供节点 DOM 面板及 body 弹层翻译使用
        TUtils.globalUiDict = {};
        for (const nodeKey in TUtils.T.Nodes) {
          const ui = TUtils.T.Nodes[nodeKey]?.["ui"];
          if (ui && typeof ui === "object") {
            for (const [k, val] of Object.entries(ui)) {
              if (val && typeof val === "string" && val !== k) {
                TUtils.globalUiDict[k] = val;
                translatedValueSet.add(val);
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
          // 【石头(Q:34720803)优化更新】
          // 控件被“转换为输入”后会作为 input 槽位从工作流恢复，
          // inputs 字典查不到时回退到 widgets 字典（与动态 addInput 路径行为一致）
          let trans = t[key][item.name];
          if (trans === undefined && key === "inputs" && t["widgets"]) {
            trans = t["widgets"][item.name];
          }
          if (trans !== undefined) {
            const hasNativeTranslation = item.label && isAlreadyTranslatedText(item.label) && !item._original_name;
            if (!hasNativeTranslation) {
              this.safeApplyTranslation(item, trans);
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

      // 拦截动态生成的小部件 (addWidget)，确保第三方插件动态添加的控件也能被翻译
      let addWidget = node.addWidget;
      if (addWidget && !node._addWidget_translated) {
        node.addWidget = function (type, name, value, callback, options) {
          // 先让底层创建控件
          let res = addWidget.apply(this, arguments);
          // 控件创建完毕后立刻检查翻译
          if (isTranslationEnabled() && res && res.name) {
            let class_type = this.constructor.comfyClass || this.constructor.type;
            let dict = TUtils.T.Nodes[class_type];
            if (dict && dict["widgets"] && res.name in dict["widgets"]) {
              TUtils.safeApplyTranslation(res, dict["widgets"][res.name]);
            }
          }
          return res;
        };
        node._addWidget_translated = true; // 防止重复拦截
      }

      // 【石头(Q:34720803)优化更新】
      // 第三方节点通过 addDOMWidget 挂载的自定义 HTML 面板不在 canvas 翻译范围内，
      // 在这里为其安装 DOM 子树翻译
      this.installNodeDomTranslation(node);
    } catch (e) {
      error(`为节点 ${node?.title || '未知'} 应用翻译失败:`, e);
    }
  }

  // ============================================================
  // 【石头(Q:34720803)优化更新】自定义 DOM 面板翻译（通用机制）区块 开始
  // 节点翻译条目支持 "ui": { "英文原文": "中文" }，可翻译该节点通过
  // addDOMWidget 等方式创建的 HTML 界面中的文本节点及 placeholder/title 等属性。
  // ============================================================

  // 【石头(Q:34720803)优化更新】支持翻译的元素属性白名单
  static DOM_TEXT_ATTRIBUTES = ["placeholder", "title", "aria-label"];

  // 【石头(Q:34720803)优化更新】翻译一个 DOM 子树：全等匹配文本节点与白名单属性
  static translateDomSubtree(root, dict) {
    if (!root || root.nodeType !== 1 || !dict) return;
    const has = Object.prototype.hasOwnProperty;
    // 1) 文本节点：仅当整个文本（去除首尾空白后）与字典键完全一致时替换，
    //    保留原有首尾空白；含变量拼接的动态文本因不能全等匹配而自然跳过
    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const key = n.nodeValue && n.nodeValue.trim();
          return key && has.call(dict, key) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const targets = [];
      let cur;
      while ((cur = walker.nextNode())) targets.push(cur);
      for (const tn of targets) {
        const key = tn.nodeValue.trim();
        const translated = dict[key];
        if (typeof translated === "string" && translated !== key) {
          tn.nodeValue = tn.nodeValue.replace(key, translated);
        }
      }
    } catch (e) {
      error("翻译DOM文本节点失败:", e);
    }
    // 2) 常见可翻译属性（输入框 placeholder、悬浮提示 title 等），同样要求完全一致
    try {
      const els = root.querySelectorAll ? [root, ...root.querySelectorAll("*")] : [root];
      for (const el of els) {
        if (el.nodeType !== 1) continue;
        for (const attr of this.DOM_TEXT_ATTRIBUTES) {
          const v = el.getAttribute(attr);
          if (v && has.call(dict, v) && typeof dict[v] === "string" && dict[v] !== v) {
            el.setAttribute(attr, dict[v]);
          }
        }
      }
    } catch (e) {
      error("翻译DOM属性失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】为节点的 DOMWidget 根元素安装翻译与重绘监听
  static installNodeDomTranslation(node) {
    try {
      if (!isTranslationEnabled() || !node || !Array.isArray(node.widgets)) return;
      const class_type = node.constructor?.comfyClass ? node.constructor.comfyClass : node.constructor?.type;
      if (!class_type || !this.T.Nodes[class_type]?.["ui"]) return;
      for (const w of node.widgets) {
        const el = w.element || w.domElement;
        if (!el || el.nodeType !== 1 || this.domObserved.has(el)) continue;
        this.domObserved.add(el);
        // 字典在重新同步翻译后可能整体替换，回调时按类名现取
        const repaint = () => {
          const ui = this.T.Nodes[class_type]?.["ui"];
          if (ui) this.translateDomSubtree(el, ui);
        };
        repaint();
        // 自定义面板常在交互后整体重建（replaceChildren），监听子树变化并按帧合并后幂等重翻
        const observer = new MutationObserver(() => {
          if (el._translationUiRaf) return;
          el._translationUiRaf = requestAnimationFrame(() => {
            el._translationUiRaf = null;
            repaint();
          });
        });
        observer.observe(el, { childList: true, subtree: true });
      }
    } catch (e) {
      error(`为节点 ${node?.title || '未知'} 安装DOM翻译失败:`, e);
    }
  }

  // 【石头(Q:34720803)优化更新】兜底补刷被第三方扩展覆盖/重建的节点槽位标签
  static refreshNodeSlotLabels(node) {
    try {
      const class_type = node.constructor?.comfyClass ? node.constructor.comfyClass : node.constructor?.type;
      const t = class_type && this.T.Nodes[class_type];
      if (!t) return;
      // 兜底：第三方节点可能在本插件应用翻译之后直接改名或重建输入/输出槽位，
      // 周期性补刷可覆盖所有此类时序问题；safeApplyTranslation 本身幂等，不会重复翻译
      for (const key of ["inputs", "outputs", "widgets"]) {
        const dict = t[key];
        const arr = node[key];
        if (!Array.isArray(arr)) continue;
        for (const item of arr) {
          if (!item || !item.name) continue;
          // 【石头(Q:34720803)优化更新】同上：转换为输入的控件在 inputs 中但译文在 widgets 字典里
          let trans = dict ? dict[item.name] : undefined;
          if (trans === undefined && key === "inputs" && t["widgets"]) {
            trans = t["widgets"][item.name];
          }
          if (trans !== undefined) {
            this.safeApplyTranslation(item, trans);
          }
        }
      }
    } catch (e) {
      error("补刷节点槽位翻译失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】监听 body 顶层新增元素，翻译节点挂到节点子树外的弹窗
  static installGlobalUiObserver() {
    if (this._globalUiObserverInstalled || typeof document === "undefined" || !document.body) return;
    this._globalUiObserverInstalled = true;
    try {
      // 部分节点把预览/编辑弹窗直接挂到 body（位于节点 DOM 子树之外），
      // 监听 body 顶层新增元素，用全部节点 ui 字典的汇总翻译
      const observer = new MutationObserver((mutations) => {
        if (!isTranslationEnabled()) return;
        for (const m of mutations) {
          for (const added of m.addedNodes) {
            if (added.nodeType === 1) this.translateDomSubtree(added, this.globalUiDict);
          }
        }
      });
      observer.observe(document.body, { childList: true });
    } catch (e) {
      error("安装全局UI翻译监听失败:", e);
    }
  }

  // 【石头(Q:34720803)优化更新】低频守护轮询：补挂 DOMWidget 观察器并补刷槽位名
  static startTranslationGuard(app) {
    if (this._guardStarted) return;
    this._guardStarted = true;
    try {
      // 低频守护轮询：发现晚于翻译创建的 DOMWidget 根元素并补挂观察器，
      // 同时补刷被第三方扩展覆盖的槽位名
      setInterval(() => {
        if (!isTranslationEnabled()) return;
        const nodes = app?.graph?._nodes;
        if (!Array.isArray(nodes)) return;
        for (const node of nodes) {
          if (!node || !node.constructor) continue;
          this.installNodeDomTranslation(node);
          this.refreshNodeSlotLabels(node);
        }
      }, 1000);
    } catch (e) {
      error("启动翻译守护轮询失败:", e);
    }
  }
  // ============================================================
  // 【石头(Q:34720803)优化更新】自定义 DOM 面板翻译（通用机制）区块 结束
  // ============================================================

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
          } else if (isOptionTranslationEnabled() && value.content in t) {
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
      await registerSettings(app);

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
      
      // 【石头(Q:34720803)优化更新】启动自定义DOM面板翻译：body 弹层监听 + 守护轮询
      TUtils.installGlobalUiObserver();
      TUtils.startTranslationGuard(app);

      addPanelButtons(app);
      setupPluginManager();
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
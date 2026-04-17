/**
 * ComfyUI-Translation 设置面板模块
 * 负责：设置项注册、翻译按钮、插件翻译管理面板
 */

import { $el } from "../../../scripts/ui.js";
import {
  isTranslationEnabled,
  toggleTranslation,
  currentConfig,
  saveConfig,
  error
} from "./utils.js";

// ─── 设置项注册 ───────────────────────────────────────────

/**
 * 在 ComfyUI 设置面板中注册所有翻译相关设置
 * @param {object} app - ComfyUI app 实例
 * @returns {Promise<void>}
 */
export async function registerSettings(app) {
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

  // 2. UI 风格设置
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

  // 3. COMBO 下拉选项翻译开关
  app.ui.settings.addSetting({
    id: "🌐Language翻译语言.TranslateOptions",
    name: "📋 Translate COMBO Options (下拉选项 翻译开关)",
    tooltip: "开启或关闭，节点中 COMBO 下拉框选项的翻译。关闭后下拉选项保持英文原文。修改后刷新页面生效。",
    type: "boolean",
    defaultValue: currentConfig.translate_options,
    onChange: async (newVal) => {
      if (!isSettingsRegistered) return;
      if (newVal !== currentConfig.translate_options) {
        await saveConfig(currentConfig.translation_enabled, currentConfig.locale, currentConfig.button_style, currentConfig.disabled_plugins, newVal);
        location.reload();
      }
    }
  });

  isSettingsRegistered = true;

  // 主动同步 config.json 的值到 ComfyUI Settings (localStorage)，
  // 防止用户手动编辑 config.json 后 UI 显示与实际行为不一致
  try {
    const setter = app.ui.settings.setSettingValue?.bind(app.ui.settings);
    if (setter) {
      setter("🌐Language翻译语言.Language", currentConfig.locale);
      setter("🌐Language翻译语言.TranslateOptions", currentConfig.translate_options);
    }
  } catch (e) {
    // 旧版 ComfyUI 可能不支持 setSettingValue，忽略即可
  }
}

// ─── 翻译按钮 ─────────────────────────────────────────────

/**
 * 在顶部菜单栏添加翻译切换按钮（兼容新旧 UI）
 * @param {object} app - ComfyUI app 实例
 */
export function addPanelButtons(app) {
  try {
    if (document.getElementById("toggle-translation-button")) return;

    const translationEnabled = isTranslationEnabled();
    const locale = currentConfig.locale;

    let isPlain = false;
    try {
      let savedStyle = app?.ui?.settings?.getSettingValue?.("🌐Language翻译语言.ButtonStyle");
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
    } catch (e) {
      console.warn("读取按钮样式配置失败，采用默认值", e);
    }

    const onText = `翻译开启 (${locale})`;
    const offText = `翻译关闭 (原生)`;

    const styleElem = document.createElement("style");
    styleElem.textContent = `
      @keyframes flowEffect {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
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

    const activeClass = isPlain ? "translation-active-plain" : "translation-active-gradient";
    const inactiveClass = isPlain ? "translation-inactive-plain" : "translation-inactive-gradient";

    // 旧版菜单按钮
    if (document.querySelector(".comfy-menu") && !document.getElementById("toggle-translation-button")) {
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

    // 新版 UI 按钮
    try {
      if (window?.comfyAPI?.button?.ComfyButton && window?.comfyAPI?.buttonGroup?.ComfyButtonGroup) {
        var ComfyButtonGroup = window.comfyAPI.buttonGroup.ComfyButtonGroup;
        var ComfyButton = window.comfyAPI.button.ComfyButton;

        var btn = new ComfyButton({
          action: async () => { await toggleTranslation(); },
          tooltip: translationEnabled ? "已开启翻译效果" : "已使用原生语言",
          content: translationEnabled ? onText : offText,
          classList: "toggle-translation-button"
        });

        if (btn.element) {
          btn.element.classList.add("translation-btn");
          btn.element.classList.add(translationEnabled ? activeClass : inactiveClass);
          btn.element.style.fontWeight = isPlain ? "normal" : "bold";
          btn.element.style.margin = "2px";
        }

        var group = new ComfyButtonGroup(btn.element);
        if (app.menu?.settingsGroup?.element) {
          app.menu.settingsGroup.element.before(group.element);
        }
      }
    } catch (e) {
      error("添加新版UI语言按钮失败:", e);
    }
  } catch (e) {
    error("添加面板按钮失败:", e);
  }
}

// ─── 插件翻译管理面板 ────────────────────────────────────

const SELF_NAME = "ComfyUI-Chinese-Translation";
const PANEL_ID = "tl-plugin-manager-panel";

// 注入锁：防止并发调用导致重复注入面板
let isInjecting = false;

function buildPluginPanel(parentEl) {
  // 强制去重：如果面板已存在，直接返回
  const existing = document.getElementById(PANEL_ID);
  if (existing) return;

  const disabled = new Set(currentConfig.disabled_plugins || []);

  // 先创建面板 DOM 并设置 ID，确保去重检查能正确工作
  const panel = document.createElement("div");
  panel.id = PANEL_ID;
  panel.style.cssText = "margin-top:12px;padding:10px;border:1px solid #444;border-radius:6px;background:#1e1e1e;font-size:13px;";
  panel.innerHTML = `
    <div style="font-weight:bold;font-size:14px;margin-bottom:6px;">🚫 插件翻译管理</div>
    <div style="margin-bottom:6px;color:#aaa;font-size:12px;">取消勾选可禁用对应插件的节点翻译。修改后点击「保存并刷新」生效。</div>
    <input type="text" placeholder="搜索插件..." id="tl-plugin-search"
      style="width:100%;padding:5px 8px;margin-bottom:6px;border:1px solid #555;border-radius:4px;background:#2a2a2a;color:#ddd;box-sizing:border-box;outline:none;" />
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <button id="tl-select-all" style="flex:1;padding:3px;border:1px solid #555;border-radius:4px;background:#333;color:#ddd;cursor:pointer;font-size:12px;">全选</button>
      <button id="tl-deselect-all" style="flex:1;padding:3px;border:1px solid #555;border-radius:4px;background:#333;color:#ddd;cursor:pointer;font-size:12px;">全不选</button>
    </div>
    <div id="tl-plugin-list" style="height:300px;overflow-y:auto;border:1px solid #444;border-radius:4px;padding:4px;"></div>
    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;">
      <button id="tl-save-plugins" style="padding:6px 20px;border:none;border-radius:4px;background:#4a9eff;color:#fff;cursor:pointer;font-weight:bold;">保存并刷新</button>
      <span id="tl-status" style="font-size:11px;color:#888;"></span>
    </div>
  `;

  const listEl = panel.querySelector("#tl-plugin-list");
  const searchEl = panel.querySelector("#tl-plugin-search");
  const statusEl = panel.querySelector("#tl-status");

  // 先显示加载状态
  statusEl.textContent = "正在加载插件列表...";

  // 异步加载插件列表并填充内容
  fetch("./translation_node/get_plugin_list")
    .then(resp => resp.json())
    .then(plugins => {
      plugins = plugins.filter(n => n !== SELF_NAME && n !== "internal");
      statusEl.textContent = `共 ${plugins.length} 个翻译文件，已禁用 ${disabled.size} 个`;
      
      plugins.forEach(name => {
        const checked = !disabled.has(name);
        const div = document.createElement("div");
        div.style.cssText = "padding:2px 4px;border-radius:3px;";
        div.innerHTML = `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;"><input type="checkbox" ${checked ? "checked" : ""} data-plugin="${name}" style="cursor:pointer;"> <span style="word-break:break-all;">${name}</span></label>`;
        div.addEventListener("mouseenter", () => div.style.background = "#333");
        div.addEventListener("mouseleave", () => div.style.background = "");
        listEl.appendChild(div);
      });
    })
    .catch(e => {
      error("获取插件列表失败:", e);
      statusEl.textContent = "加载插件列表失败";
    });

  // 搜索过滤
  searchEl.addEventListener("input", () => {
    const q = searchEl.value.toLowerCase();
    listEl.querySelectorAll("div").forEach(d => {
      d.style.display = d.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  // 全选 / 全不选
  panel.querySelector("#tl-select-all").addEventListener("click", () => {
    listEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
      if (cb.closest("div").style.display !== "none") cb.checked = true;
    });
  });
  panel.querySelector("#tl-deselect-all").addEventListener("click", () => {
    listEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
      if (cb.closest("div").style.display !== "none") cb.checked = false;
    });
  });

  // 保存并刷新
  panel.querySelector("#tl-save-plugins").addEventListener("click", async () => {
    const newDisabled = [];
    listEl.querySelectorAll("input[type=checkbox]").forEach(cb => {
      if (!cb.checked) newDisabled.push(cb.dataset.plugin);
    });
    await saveConfig(currentConfig.translation_enabled, currentConfig.locale, currentConfig.button_style, newDisabled, currentConfig.translate_options);
    location.reload();
  });

  parentEl.appendChild(panel);
}

function tryInjectPluginPanel() {
  // 检查注入锁，防止并发调用
  if (isInjecting) return;
  // 检查面板是否已存在
  if (document.getElementById(PANEL_ID)) return;

  isInjecting = true;
  try {
    // 持有锁后再次检查，防止并发调用已注入面板
    if (document.getElementById(PANEL_ID)) return;

    // 新版 UI
    const allSettingItems = document.querySelectorAll('[class*="setting-item"], [class*="SettingItem"], .p-fieldset, .p-panel');
    for (const item of allSettingItems) {
      if (item.textContent?.includes("Translate COMBO Options") || item.textContent?.includes("翻译下拉选项")) {
        const container = item.closest('[class*="group"], [class*="category"], .p-fieldset-content, .p-panel-content') || item.parentElement;
        if (container) buildPluginPanel(container);
        return;
      }
    }

    // 旧版 UI
    const oldDialog = document.querySelector("#comfy-settings-dialog");
    if (oldDialog) {
      const tbody = oldDialog.querySelector("tbody");
      if (tbody) {
        const rows = tbody.querySelectorAll("tr");
        for (const row of rows) {
          if (row.textContent?.includes("Translate COMBO") || row.textContent?.includes("翻译下拉")) {
            buildPluginPanel(tbody);
            return;
          }
        }
      }
    }
  } finally {
    // 同步解锁，不用 requestAnimationFrame
    isInjecting = false;
  }
}

/**
 * 监听设置面板打开，自动注入插件翻译管理面板
 */
export function setupPluginManager() {
  const observer = new MutationObserver(() => tryInjectPluginPanel());
  observer.observe(document.body, { childList: true, subtree: true });
}

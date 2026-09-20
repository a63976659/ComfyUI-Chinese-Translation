/**
 * ComfyUI-Translation-node 工具模块
 * 提供通用的工具函数和配置管理功能
 */

export function error(...args) {
    console.error("[Translation-node]", ...args);
}

export let currentConfig = {
    translation_enabled: true,
    locale: "zh-CN",
    button_style: "gradient",
    disabled_plugins: [],
    translate_options: true
};

// 存储所有翻译后的目标文本集合，用于判断是否已翻译
export const translatedValueSet = new Set();

/**
 * 检查文本是否已经被翻译过 (替代之前的中文正则判断)
 * @param {string} text 要检查的文本
 * @returns {boolean}
 */
export function isAlreadyTranslatedText(text) {
    if (!text) return false;
    return translatedValueSet.has(text) || translatedValueSet.has(text.trim());
}

/**
 * 检查节点属性是否看起来已经被翻译过
 */
export function isAlreadyTranslated(originalName, currentLabel) {
    if (!originalName || !currentLabel) return false;
    
    if (currentLabel !== originalName && isAlreadyTranslatedText(currentLabel)) {
        return true;
    }
    
    // V3 API 节点常用 display_name 作为 label（如 name: "horizontal_angle", label: "Horizontal Angle"），
    // 若 label 仅是 name 的美化形式（大小写/空格/下划线/连字符差异），不视为已翻译
    const normalize = (s) => s.toLowerCase().replace(/[\s_-]+/g, "");
    if (normalize(currentLabel) === normalize(originalName)) {
        return false;
    }
    
    if (currentLabel !== originalName && 
        currentLabel !== originalName.toLowerCase() &&
        currentLabel !== originalName.toUpperCase()) {
        return true;
    }
    
    return false;
}

export const nativeTranslatedSettings = [
    "Comfy", "画面", "外观", "3D", "遮罩编辑器",
];

async function loadConfig() {
    try {
        const response = await fetch("./translation_node/get_config");
        if (response.ok) {
            const config = await response.json();
            
            currentConfig.translation_enabled = config.translation_enabled !== false;
            currentConfig.locale = config.locale || "zh-CN";
            currentConfig.button_style = config.button_style || "gradient";
            currentConfig.disabled_plugins = config.disabled_plugins || [];
            currentConfig.translate_options = config.translate_options !== false;
            
            return currentConfig.translation_enabled;
        }
    } catch (e) {
        error("获取配置失败:", e);
    }
    return true;
}

export async function saveConfig(enabled, locale = currentConfig.locale, button_style = currentConfig.button_style, disabled_plugins = currentConfig.disabled_plugins, translate_options = currentConfig.translate_options) {
    try {
        const formData = new FormData();
        formData.append('translation_enabled', enabled.toString());
        formData.append('locale', locale);
        formData.append('button_style', button_style);
        formData.append('disabled_plugins', JSON.stringify(disabled_plugins));
        formData.append('translate_options', translate_options.toString());

        const response = await fetch("./translation_node/set_config", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                currentConfig.translation_enabled = enabled;
                currentConfig.locale = locale;
                currentConfig.button_style = button_style;
                currentConfig.disabled_plugins = disabled_plugins;
                currentConfig.translate_options = translate_options;
                return true;
            }
        }
    } catch (e) {
        error("保存配置失败:", e);
    }
    return false;
}

export function isTranslationEnabled() {
    // 仅取决于顶栏开关。英文同样需要翻译：部分插件节点以其它语言编写，
    // 需按 en-US 译文还原为英文，因此不再对英文做特殊屏蔽。
    return currentConfig.translation_enabled;
}

export function isOptionTranslationEnabled() {
    return currentConfig.translate_options;
}

/**
 * ComfyUI 官方语言码 -> 本插件语言目录名的显式映射。
 * 避免仅靠主语言子标签匹配时，"zh" 同时命中 zh-CN / zh-TW 的歧义。
 */
const COMFY_TO_PACK = {
    "zh": "zh-CN",
    "zh-tw": "zh-TW",
    "ru": "ru-RU",
    "ja": "ja-JP",
    "ko": "ko-KR",
    "fr": "fr-FR",
    "de": "de-DE",
    "es": "es-ES",
    "ar": "ar-SA",
    "tr": "tr-TR",
    "pt-br": "pt-BR",
    "fa": "fa-IR",
    "he": "he-IL",
    "it": "it-IT"
};

/**
 * 将 ComfyUI 官方 Comfy.Locale 映射到本插件自带的语言目录。
 * 返回匹配到的语言目录名；英文/未选语言/无对应翻译时返回 null（表示不启用翻译）。
 */
export function matchPackLocale(comfyLocale, availableLocales) {
    if (!comfyLocale) return null;
    const cl = String(comfyLocale).toLowerCase();
    if (cl === "en" || cl.startsWith("en-")) return null; // 英文为源语言，保持原生
    const locales = Array.isArray(availableLocales) ? availableLocales : [];
    const lowerSet = new Set(locales.map((l) => String(l).toLowerCase()));
    // 1) 显式映射优先（仅当对应语言目录确实存在时）
    const mapped = COMFY_TO_PACK[cl];
    if (mapped && lowerSet.has(mapped.toLowerCase())) return mapped;
    // 2) 完整大小写不敏感匹配（目录名恰好等于 Comfy 值）
    const exact = locales.find((l) => String(l).toLowerCase() === cl);
    if (exact) return exact;
    // 3) 主语言子标签兜底
    const primary = cl.split(/[-_]/)[0];
    if (primary === "en") return null;
    const hit = locales.find((l) => String(l).toLowerCase().split(/[-_]/)[0] === primary);
    return hit || null;
}

/**
 * 语言始终跟随 ComfyUI 官方 Comfy.Locale：把当前语言目录设为其对应语言。
 * 仅改内存中的 locale，不碰 translation_enabled（那是顶栏开关的职责）。
 * 英文/无对应翻译时回退 en-US（en-US 目录用于把其它语言的插件节点还原为英文）。
 */
export async function syncWithComfyLocale(app) {
    try {
        let available = [];
        try {
            const r = await fetch("./translation_node/get_locales");
            if (r.ok) available = await r.json();
        } catch (e) { /* 忽略，回退主语言匹配 */ }
        let comfyLocale = "en";
        try {
            comfyLocale = app?.ui?.settings?.getSettingValue?.("Comfy.Locale", "en") || "en";
        } catch (e) { /* 旧版无该设置 */ }
        currentConfig.locale = matchPackLocale(comfyLocale, available) || "en-US";
    } catch (e) {
        error("跟随 Comfy.Locale 失败:", e);
    }
}

/**
 * 监听 ComfyUI 官方语言设置 Comfy.Locale：检测到用户切换语言后自动刷新页面。
 * 刷新后 init 会重新执行 syncWithComfyLocale，翻译内容与配置界面文案同时生效。
 * （Comfy.Locale 变更不会触发页面重载，也不可拦截其 onChange，故用轮询）
 */
export function watchComfyLocale(app) {
    const read = () => {
        try {
            return app?.ui?.settings?.getSettingValue?.("Comfy.Locale", null) ?? null;
        } catch (e) {
            return null;
        }
    };
    let last = read();
    let reloading = false;
    setInterval(() => {
        const v = read();
        if (!v) return; // 旧版无该设置或商店未就绪
        if (last && v !== last && !reloading) {
            reloading = true;
            location.reload();
        }
        last = v;
    }, 1000);
}

export async function initConfig() {
    await loadConfig();
}

export async function toggleTranslation() {
    // 顶栏开关只切换启用/停用；翻译语言始终跟随 Comfy.Locale
    const newEnabled = !currentConfig.translation_enabled;
    const success = await saveConfig(newEnabled, currentConfig.locale, currentConfig.button_style, currentConfig.disabled_plugins, currentConfig.translate_options);
    if (success) {
        setTimeout(() => location.reload(), 100);
    } else {
        error("切换翻译状态失败");
    }
}
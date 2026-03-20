/**
 * ComfyUI-Translation-node 工具模块
 * 提供通用的工具函数和配置管理功能
 */

export function error(...args) {
    console.error("[Translation-node]", ...args);
}

export let currentConfig = {
    translation_enabled: true,
    locale: "zh-CN"
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
            currentConfig.translation_enabled = config.translation_enabled;
            currentConfig.locale = config.locale || "zh-CN";
            return currentConfig.translation_enabled;
        }
    } catch (e) {
        error("获取配置失败:", e);
    }
    return true;
}

export async function saveConfig(enabled, locale = currentConfig.locale) {
    try {
        const formData = new FormData();
        formData.append('translation_enabled', enabled.toString());
        formData.append('locale', locale);

        const response = await fetch("./translation_node/set_config", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                currentConfig.translation_enabled = enabled;
                currentConfig.locale = locale;
                return true;
            }
        }
    } catch (e) {
        error("保存配置失败:", e);
    }
    return false;
}

export function isTranslationEnabled() {
    return currentConfig.translation_enabled;
}

export async function initConfig() {
    await loadConfig();
}

export async function toggleTranslation() {
    const newEnabled = !currentConfig.translation_enabled;
    const success = await saveConfig(newEnabled);
    if (success) {
        setTimeout(() => location.reload(), 100);
    } else {
        error("切换翻译状态失败");
    }
}
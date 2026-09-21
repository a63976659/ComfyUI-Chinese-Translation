/**
 * ComfyUI-Translation 设置面板模块
 * 负责：设置项注册、翻译按钮、插件翻译管理面板
 */

import {
  isTranslationEnabled,
  toggleTranslation,
  currentConfig,
  saveConfig,
  syncWithComfyLocale,
  error
} from "./utils.js";

// ─── 设置项注册 ───────────────────────────────────────────

// 设置项 ID（注册与同步共用，仅作设置商店键，不参与布局）
// 分组与表头由 addSetting 的 category 数组控制（[分类, 小节]，随语言本地化），
// 小节顺序由 sortOrder 控制（前端按 sortOrder 降序排组，与语言无关）。
const SETTING_ID_STYLE = "🌐 Translation.ToggleStyle";
const SETTING_ID_OPTS = "🌐 Translation.COMBOOptions";

let registeredApp = null;
// 程序性同步防护标志：防止同步写入设置商店时触发 onChange 把值再写回磁盘
let applyingConfig = false;

// 设置对话框选择器（新旧版兼容）
const DIALOG_SELECTOR = '#comfy-settings-dialog, .p-dialog, [role="dialog"], [class*="z-1700"]';

/** 设置对话框是否打开（用于区分用户真实操作与商店 hydration 等程序性写入） */
function isSettingsDialogOpen() {
  return !!document.querySelector(DIALOG_SELECTOR);
}

/** 从服务器拉取最新 config.json 更新 currentConfig（避免多标签/多客户端下用陈旧值覆盖） */
async function refreshCurrentConfig() {
  try {
    const res = await fetch("./translation_node/get_config");
    if (!res.ok) return;
    const c = await res.json();
    currentConfig.translation_enabled = c.translation_enabled;
    currentConfig.locale = c.locale || currentConfig.locale;
    currentConfig.button_style = c.button_style || currentConfig.button_style;
    currentConfig.disabled_plugins = c.disabled_plugins || [];
    currentConfig.translate_options = c.translate_options !== false;
  } catch (e) {
    error("刷新配置失败:", e);
  }
}

/** 将当前配置回写到 ComfyUI Settings 商店，保证设置对话框显示与 config.json 一致 */
function syncSettingsFromConfig(app) {
  const setter = app.ui.settings.setSettingValue?.bind(app.ui.settings);
  if (!setter) return;
  applyingConfig = true;
  try {
    setter(SETTING_ID_STYLE, styleLabelOf(currentConfig.button_style));
    setter(SETTING_ID_OPTS, currentConfig.translate_options);
  } finally {
    applyingConfig = false;
  }
}

/** 设置对话框每次打开时，用最新配置同步一次显示值（防止对话框显示陈旧/默认值） */
function syncSettingsDialogIfOpen() {
  if (!registeredApp) return;
  const dialogEl = document.querySelector(DIALOG_SELECTOR);
  if (!dialogEl || dialogEl.dataset.tlSynced) return;
  dialogEl.dataset.tlSynced = "1";
  (async () => {
    await refreshCurrentConfig();
    // 语言始终跟随 Comfy.Locale：重新推导本次会话语言（覆盖磁盘上的上次保存值）。
    await syncWithComfyLocale(registeredApp);
    syncSettingsFromConfig(registeredApp);
  })();
}

/**
 * 在 ComfyUI 设置面板中注册所有翻译相关设置
 * @param {object} app - ComfyUI app 实例
 * @returns {Promise<void>}
 */
export async function registerSettings(app) {
  let isSettingsRegistered = false;
  registeredApp = app;

  // 行标签/表头/提示按当前语言（跟随 Comfy.Locale）本地化；ID 固定为商店键，布局由 category+sortOrder 保证跨语言统一
  const t = getPanelI18n(currentConfig.locale);

  // 1. UI 风格设置（多样式开关，持久化到 config.json，切换后实时重绘无需刷新）
  app.ui.settings.addSetting({
    id: SETTING_ID_STYLE,
    name: t.styleName,
    category: [t.cat, t.styleTitle],
    sortOrder: 2,
    type: "combo",
    options: styleOptions(currentConfig.locale),
    defaultValue: styleLabelOf(currentConfig.button_style),
    onChange: async (newVal) => {
      if (applyingConfig) return;
      if (!isSettingsRegistered) return;
      if (!isSettingsDialogOpen()) return;
      const key = parseStyleKey(newVal);
      if (key !== currentConfig.button_style) {
        await saveConfig(currentConfig.translation_enabled, currentConfig.locale, key, currentConfig.disabled_plugins, currentConfig.translate_options);
        renderToggle(app);
      }
    }
  });

  // 2. COMBO 下拉选项翻译开关
  app.ui.settings.addSetting({
    id: SETTING_ID_OPTS,
    name: t.optionsName,
    category: [t.cat, t.optionsTitle],
    sortOrder: 1,
    tooltip: t.optionsTip,
    type: "boolean",
    defaultValue: currentConfig.translate_options,
    onChange: async (newVal) => {
      if (applyingConfig) return;
      if (!isSettingsRegistered) return;
      if (!isSettingsDialogOpen()) return;
      if (newVal !== currentConfig.translate_options) {
        await saveConfig(currentConfig.translation_enabled, currentConfig.locale, currentConfig.button_style, currentConfig.disabled_plugins, newVal);
        location.reload();
      }
    }
  });

  isSettingsRegistered = true;

  // 主动同步 config.json 的值到 ComfyUI Settings (userdata)，
  // 防止用户手动编辑 config.json 后 UI 显示与实际行为不一致
  try {
    syncSettingsFromConfig(app);
  } catch (e) {
    // 旧版 ComfyUI 可能不支持 setSettingValue，忽略即可
  }

  // 商店收敛：若 hydration 晚于注册把旧值写回商店，在对话框关闭时持续纠正为 config.json 值
  startStoreConvergence(app);
}

/** 短时轮询纠正设置商店与 config.json 的分歧（仅对话框关闭时，避免干扰用户操作） */
function startStoreConvergence(app) {
  const getter = app.ui.settings.getSettingValue?.bind(app.ui.settings);
  if (!getter) return;
  let checks = 0;
  const timer = setInterval(() => {
    checks++;
    try {
      const diverged = getter(SETTING_ID_STYLE) !== styleLabelOf(currentConfig.button_style)
        || getter(SETTING_ID_OPTS) !== currentConfig.translate_options;
      if (diverged && !isSettingsDialogOpen()) {
        syncSettingsFromConfig(app);
      }
    } catch (e) { /* 旧版兼容：静默 */ }
    if (checks >= 20) clearInterval(timer); // 10 秒后停止
  }, 500);
}

// ─── 翻译按钮 ─────────────────────────────────────────────

// 开关文字多语言表（按 get_locales 返回的语言代码匹配）
const TOGGLE_I18N = {
  "zh-CN": { onFull: "翻译开启", offFull: "翻译关闭", switchOn: "开启", switchOff: "关闭", tipOn: "已开启翻译效果", tipOff: "已使用原生语言" },
  "zh-TW": { onFull: "翻譯開啟", offFull: "翻譯關閉", switchOn: "開啟", switchOff: "關閉", tipOn: "已開啟翻譯效果", tipOff: "已使用原生語言" },
  "en-US": { onFull: "Translation On", offFull: "Translation Off", switchOn: "On", switchOff: "Off", tipOn: "Translation enabled", tipOff: "Using native language" },
  "de-DE": { onFull: "Übersetzung An", offFull: "Übersetzung Aus", switchOn: "An", switchOff: "Aus", tipOn: "Übersetzung aktiviert", tipOff: "Originalsprache aktiv" },
  "fr-FR": { onFull: "Traduction On", offFull: "Traduction Off", switchOn: "On", switchOff: "Off", tipOn: "Traduction activée", tipOff: "Langue native utilisée" },
  "es-ES": { onFull: "Traducción Activada", offFull: "Traducción Desactivada", switchOn: "Activar", switchOff: "Desactivar", tipOn: "Traducción activada", tipOff: "Usando el idioma original" },
  "it-IT": { onFull: "Traduzione Attiva", offFull: "Traduzione Disattiva", switchOn: "Attiva", switchOff: "Disattiva", tipOn: "Traduzione attivata", tipOff: "Viene usata la lingua originale" },
  "pt-BR": { onFull: "Tradução Ativada", offFull: "Tradução Desativada", switchOn: "Ativar", switchOff: "Desativar", tipOn: "Tradução ativada", tipOff: "Usando o idioma original" },
  "ja-JP": { onFull: "翻訳オン", offFull: "翻訳オフ", switchOn: "オン", switchOff: "オフ", tipOn: "翻訳が有効です", tipOff: "元の言語を使用しています" },
  "ko-KR": { onFull: "번역 켜짐", offFull: "번역 꺼짐", switchOn: "켜기", switchOff: "끄기", tipOn: "번역이 활성화되었습니다", tipOff: "원본 언어를 사용 중입니다" },
  "ru-RU": { onFull: "Перевод вкл", offFull: "Перевод выкл", switchOn: "вкл", switchOff: "выкл", tipOn: "Перевод включён", tipOff: "Используется исходный язык" },
  "tr-TR": { onFull: "Çeviri Açık", offFull: "Çeviri Kapalı", switchOn: "Aç", switchOff: "Kapat", tipOn: "Çeviri etkin", tipOff: "Orijinal dil kullanılıyor" },
  "ar-SA": { onFull: "الترجمة مفعّلة", offFull: "الترجمة معطّلة", switchOn: "تفعيل", switchOff: "تعطيل", tipOn: "تم تفعيل الترجمة", tipOff: "تُستخدم اللغة الأصلية" },
  "fa-IR": { onFull: "ترجمه روشن", offFull: "ترجمه خاموش", switchOn: "روشن", switchOff: "خاموش", tipOn: "ترجمه فعال شد", tipOff: "از زبان اصلی استفاده می‌شود" },
  "he-IL": { onFull: "תרגום מופעל", offFull: "תרגום כבוי", switchOn: "הפעל", switchOff: "כבה", tipOn: "התרגום פעיל", tipOff: "נעשה שימוש בשפת המקור" },
};

/**
 * 根据语言代码获取开关文字，支持 en_US / zh 等变体的宽松匹配
 * @param {string} locale - 语言代码
 */
function getToggleI18n(locale) {
  if (TOGGLE_I18N[locale]) return TOGGLE_I18N[locale];
  const prefix = String(locale || "").slice(0, 2).toLowerCase();
  const matched = Object.keys(TOGGLE_I18N).find(k => k.toLowerCase().startsWith(prefix + "-"));
  return (matched && TOGGLE_I18N[matched]) || TOGGLE_I18N["en-US"];
}

// 配置界面文案多语言表（单一语言，跟随 Comfy.Locale；未知语言回退英文）
// 覆盖 ComfyUI 官方支持的全部语言 + de-DE；只含展示文案，不含设置项 ID（ID 语言无关）
const PANEL_I18N = {
  "zh-CN": {
    cat: "🌐 翻译设置", styleTitle: "开关样式", optionsTitle: "下拉选项",
    styleName: "🎨 开关外观", optionsName: "📋 翻译下拉选项",
    optionsTip: "开启或关闭节点中 COMBO 下拉框选项的翻译。关闭后下拉选项保持原文。修改后刷新页面生效。",
    styleOptions: ["pill (胶囊分段)", "gradient (七彩渐变)", "plain (原生低调)"],
    panel: {
      title: "🚫 插件翻译管理", hint: "取消勾选可禁用对应插件的节点翻译。修改后点击「保存并刷新」生效。",
      search: "搜索插件...", selectAll: "全选", deselectAll: "全不选", save: "保存并刷新",
      loading: "正在加载插件列表...", loaded: "共 {n} 个翻译文件，已禁用 {d} 个", loadFailed: "加载插件列表失败",
    },
  },
  "zh-TW": {
    cat: "🌐 翻譯設定", styleTitle: "開關樣式", optionsTitle: "下拉選項",
    styleName: "🎨 開關外觀", optionsName: "📋 翻譯下拉選項",
    optionsTip: "開啟或關閉節點中 COMBO 下拉框選項的翻譯。關閉後下拉選項保持原文。修改後重新整理頁面生效。",
    styleOptions: ["pill (膠囊分段)", "gradient (七彩漸層)", "plain (原生低調)"],
    panel: {
      title: "🚫 外掛翻譯管理", hint: "取消勾選可停用對應外掛的節點翻譯。修改後點擊「儲存並重新整理」生效。",
      search: "搜尋外掛...", selectAll: "全選", deselectAll: "全不選", save: "儲存並重新整理",
      loading: "正在載入外掛清單...", loaded: "共 {n} 個翻譯檔案，已停用 {d} 個", loadFailed: "載入外掛清單失敗",
    },
  },
  "en-US": {
    cat: "🌐 Translation", styleTitle: "Toggle Style", optionsTitle: "COMBO Options",
    styleName: "🎨 Toggle Appearance", optionsName: "📋 Translate COMBO Options",
    optionsTip: "Enable or disable translation of COMBO dropdown options in nodes. When off, options stay in the original text. Reload the page to apply.",
    styleOptions: ["pill", "gradient", "plain"],
    panel: {
      title: "🚫 Plugin Translation Manager", hint: "Uncheck a plugin to disable its node translation. Click \"Save & Reload\" to apply.",
      search: "Search plugins...", selectAll: "Select All", deselectAll: "Select None", save: "Save & Reload",
      loading: "Loading plugin list...", loaded: "{n} translation files, {d} disabled", loadFailed: "Failed to load plugin list",
    },
  },
  "de-DE": {
    cat: "🌐 Übersetzung", styleTitle: "Schaltflächenstil", optionsTitle: "COMBO-Optionen",
    styleName: "🎨 Aussehen der Schaltfläche", optionsName: "📋 Dropdown-Optionen übersetzen",
    optionsTip: "Aktiviert oder deaktiviert die Übersetzung der COMBO-Dropdown-Optionen in Knoten. Aus bleibt der Originaltext. Seite neu laden zum Anwenden.",
    styleOptions: ["pill (Kapsel)", "gradient (Farbverlauf)", "plain (schlicht)"],
    panel: {
      title: "🚫 Plugin-Übersetzungsverwaltung", hint: "Deaktivieren Sie das Ankreuzfeld, um die Knotenübersetzung eines Plugins zu deaktivieren. Klicken Sie auf „Speichern & neu laden“, um anzuwenden.",
      search: "Plugins durchsuchen...", selectAll: "Alle auswählen", deselectAll: "Keine auswählen", save: "Speichern & neu laden",
      loading: "Plugin-Liste wird geladen...", loaded: "{n} Übersetzungsdateien, {d} deaktiviert", loadFailed: "Laden der Plugin-Liste fehlgeschlagen",
    },
  },
  "fr-FR": {
    cat: "🌐 Traduction", styleTitle: "Style du bouton", optionsTitle: "Options COMBO",
    styleName: "🎨 Apparence du bouton", optionsName: "📋 Traduire les options déroulantes",
    optionsTip: "Active ou désactive la traduction des options déroulantes COMBO des nœuds. Désactivé, les options restent en texte d'origine. Recharger la page pour appliquer.",
    styleOptions: ["pill (capsule)", "gradient (dégradé)", "plain (simple)"],
    panel: {
      title: "🚫 Gestion des traductions de plugins", hint: "Décochez un plugin pour désactiver la traduction de ses nœuds. Cliquez sur « Enregistrer et recharger » pour appliquer.",
      search: "Rechercher des plugins...", selectAll: "Tout sélectionner", deselectAll: "Tout désélectionner", save: "Enregistrer et recharger",
      loading: "Chargement de la liste des plugins...", loaded: "{n} fichiers de traduction, {d} désactivés", loadFailed: "Échec du chargement de la liste",
    },
  },
  "es-ES": {
    cat: "🌐 Traducción", styleTitle: "Estilo del botón", optionsTitle: "Opciones COMBO",
    styleName: "🎨 Apariencia del botón", optionsName: "📋 Traducir opciones desplegables",
    optionsTip: "Activa o desactiva la traducción de las opciones desplegables COMBO de los nodos. Al desactivarlo, las opciones se mantienen en el texto original. Recarga la página para aplicar.",
    styleOptions: ["pill (pastilla)", "gradient (degradado)", "plain (simple)"],
    panel: {
      title: "🚫 Gestión de traducción de plugins", hint: "Desmarca un plugin para desactivar la traducción de sus nodos. Pulsa «Guardar y recargar» para aplicar.",
      search: "Buscar plugins...", selectAll: "Seleccionar todo", deselectAll: "Deseleccionar todo", save: "Guardar y recargar",
      loading: "Cargando lista de plugins...", loaded: "{n} archivos de traducción, {d} desactivados", loadFailed: "No se pudo cargar la lista de plugins",
    },
  },
  "it-IT": {
    cat: "🌐 Traduzione", styleTitle: "Stile del pulsante", optionsTitle: "Opzioni COMBO",
    styleName: "🎨 Aspetto del pulsante", optionsName: "📋 Traduci opzioni a tendina",
    optionsTip: "Attiva o disattiva la traduzione delle opzioni a tendina COMBO nei nodi. Se disattivo, le opzioni restano nel testo originale. Ricarica la pagina per applicare.",
    styleOptions: ["pill (pillola)", "gradient (gradiente)", "plain (semplice)"],
    panel: {
      title: "🚫 Gestione traduzione plugin", hint: "Deseleziona un plugin per disattivare la traduzione dei suoi nodi. Fai clic su \"Salva e ricarica\" per applicare.",
      search: "Cerca plugin...", selectAll: "Seleziona tutto", deselectAll: "Deseleziona tutto", save: "Salva e ricarica",
      loading: "Caricamento elenco plugin...", loaded: "{n} file di traduzione, {d} disattivati", loadFailed: "Impossibile caricare l'elenco dei plugin",
    },
  },
  "pt-BR": {
    cat: "🌐 Tradução", styleTitle: "Estilo do botão", optionsTitle: "Opções COMBO",
    styleName: "🎨 Aparência do botão", optionsName: "📋 Traduzir opções suspensas",
    optionsTip: "Ativa ou desativa a tradução das opções suspensas COMBO dos nós. Desativado, as opções permanecem no texto original. Recarregue a página para aplicar.",
    styleOptions: ["pill (pílula)", "gradient (gradiente)", "plain (simples)"],
    panel: {
      title: "🚫 Gerenciador de tradução de plugins", hint: "Desmarque um plugin para desativar a tradução de seus nós. Clique em \"Salvar e recarregar\" para aplicar.",
      search: "Pesquisar plugins...", selectAll: "Selecionar tudo", deselectAll: "Limpar seleção", save: "Salvar e recarregar",
      loading: "Carregando lista de plugins...", loaded: "{n} arquivos de tradução, {d} desativados", loadFailed: "Falha ao carregar a lista de plugins",
    },
  },
  "ja-JP": {
    cat: "🌐 翻訳設定", styleTitle: "トグルスタイル", optionsTitle: "ドロップダウン",
    styleName: "🎨 トグルの外観", optionsName: "📋 ドロップダウン項目を翻訳",
    optionsTip: "ノード内のCOMBOドロップダウン項目の翻訳を有効/無効にします。無効にすると項目は原文のままになります。変更後はページを再読み込みしてください。",
    styleOptions: ["pill (カプセル)", "gradient (グラデーション)", "plain (シンプル)"],
    panel: {
      title: "🚫 プラグイン翻訳管理", hint: "チェックを外すとそのプラグインのノード翻訳が無効になります。「保存して再読み込み」で反映。",
      search: "プラグインを検索...", selectAll: "すべて選択", deselectAll: "すべて解除", save: "保存して再読み込み",
      loading: "プラグイン一覧を読み込み中...", loaded: "{n} 件の翻訳ファイル、{d} 件が無効", loadFailed: "プラグイン一覧の読み込みに失敗",
    },
  },
  "ko-KR": {
    cat: "🌐 번역 설정", styleTitle: "토글 스타일", optionsTitle: "드롭다운",
    styleName: "🎨 토글 외형", optionsName: "📋 드롭다운 항목 번역",
    optionsTip: "노드의 COMBO 드롭다운 항목 번역을 켜거나 끕니다. 끄면 항목이 원문으로 유지됩니다. 변경 후 페이지를 새로고침하세요.",
    styleOptions: ["pill (알약형)", "gradient (그라데이션)", "plain (단순)"],
    panel: {
      title: "🚫 플러그인 번역 관리", hint: "체크를 해제하면 해당 플러그인의 노드 번역이 비활성화됩니다. 「저장 후 새로고침」을 누르면 적용됩니다.",
      search: "플러그인 검색...", selectAll: "모두 선택", deselectAll: "모두 해제", save: "저장 후 새로고침",
      loading: "플러그인 목록 불러오는 중...", loaded: "번역 파일 {n}개, 비활성화 {d}개", loadFailed: "플러그인 목록 불러오기 실패",
    },
  },
  "ru-RU": {
    cat: "🌐 Перевод", styleTitle: "Стиль переключателя", optionsTitle: "Опции COMBO",
    styleName: "🎨 Вид кнопки", optionsName: "📋 Перевод выпадающих опций",
    optionsTip: "Включает или отключает перевод выпадающих опций COMBO в узлах. Если отключено, опции остаются в исходном тексте. Перезагрузите страницу для применения.",
    styleOptions: ["pill (капсула)", "gradient (градиент)", "plain (просто)"],
    panel: {
      title: "🚫 Управление переводом плагинов", hint: "Снимите отметку, чтобы отключить перевод узлов плагина. Нажмите «Сохранить и перезагрузить» для применения.",
      search: "Поиск плагинов...", selectAll: "Выбрать все", deselectAll: "Снять все", save: "Сохранить и перезагрузить",
      loading: "Загрузка списка плагинов...", loaded: "Файлов перевода: {n}, отключено: {d}", loadFailed: "Не удалось загрузить список плагинов",
    },
  },
  "tr-TR": {
    cat: "🌐 Çeviri", styleTitle: "Anahtar stili", optionsTitle: "COMBO seçenekleri",
    styleName: "🎨 Anahtar görünümü", optionsName: "📋 Açılır menü seçeneklerini çevir",
    optionsTip: "Düğümlerdeki COMBO açılır menü seçeneklerinin çevirisini açar veya kapatır. Kapalıyken seçenekler özgün metinde kalır. Uygulamak için sayfayı yeniden yükleyin.",
    styleOptions: ["pill (hap)", "gradient (gradyan)", "plain (sade)"],
    panel: {
      title: "🚫 Eklenti çeviri yönetimi", hint: "Bir eklentinin düğüm çevirisini kapatmak için işaretini kaldırın. Uygulamak için «Kaydet ve yenile» düğmesine basın.",
      search: "Eklenti ara...", selectAll: "Tümünü seç", deselectAll: "Hiçbirini seçme", save: "Kaydet ve yenile",
      loading: "Eklenti listesi yükleniyor...", loaded: "{n} çeviri dosyası, {d} kapalı", loadFailed: "Eklenti listesi yüklenemedi",
    },
  },
  "ar-SA": {
    cat: "🌐 الترجمة", styleTitle: "نمط المفتاح", optionsTitle: "خيارات COMBO",
    styleName: "🎨 مظهر المفتاح", optionsName: "📋 ترجمة خيارات القائمة المنسدلة",
    optionsTip: "تشغيل أو إيقاف ترجمة خيارات COMBO المنسدلة في العقد. عند الإيقاف تبقى الخيارات بالنص الأصلي. أعد تحميل الصفحة للتطبيق.",
    styleOptions: ["pill (كبسولة)", "gradient (تدرج)", "plain (بسيط)"],
    panel: {
      title: "🚫 إدارة ترجمة الإضافات", hint: "ألغِ تحديد الإضافة لإيقاف ترجمة عقدها. انقر «حفظ وإعادة تحميل» للتطبيق.",
      search: "البحث في الإضافات...", selectAll: "تحديد الكل", deselectAll: "إلغاء تحديد الكل", save: "حفظ وإعادة تحميل",
      loading: "جارٍ تحميل قائمة الإضافات...", loaded: "{n} ملفات ترجمة، {d} معطّلة", loadFailed: "فشل تحميل قائمة الإضافات",
    },
  },
  "fa-IR": {
    cat: "🌐 ترجمه", styleTitle: "سبک کلید", optionsTitle: "گزینه‌های COMBO",
    styleName: "🎨 ظاهر کلید", optionsName: "📋 ترجمه گزینه‌های کشویی",
    optionsTip: "ترجمه گزینه‌های کشویی COMBO در گره‌ها را روشن یا خاموش می‌کند. وقتی خاموش باشد، گزینه‌ها با متن اصلی می‌مانند. برای اعمال، صفحه را دوباره بارگذاری کنید.",
    styleOptions: ["pill (کپسولی)", "gradient (گرادیان)", "plain (ساده)"],
    panel: {
      title: "🚫 مدیریت ترجمه افزونه‌ها", hint: "تیک یک افزونه را بردارید تا ترجمه گره‌هایش غیرفعال شود. برای اعمال روی «ذخیره و بارگذاری مجدد» کلیک کنید.",
      search: "جستجوی افزونه‌ها...", selectAll: "انتخاب همه", deselectAll: "لغو انتخاب همه", save: "ذخیره و بارگذاری مجدد",
      loading: "در حال بارگذاری فهرست افزونه‌ها...", loaded: "{n} فایل ترجمه، {d} غیرفعال", loadFailed: "بارگذاری فهرست افزونه‌ها ناموفق بود",
    },
  },
  "he-IL": {
    cat: "🌐 תרגום", styleTitle: "סגנון המתג", optionsTitle: "אפשרויות COMBO",
    styleName: "🎨 מראה המתג", optionsName: "📋 תרגם אפשרויות נפתחות",
    optionsTip: "הפעל או השבת תרגום של אפשרויות COMBO הנפתחות בצמתים. כשהוא מושבת, האפשרויות נשארות בטקסט המקורי. טען מחדש את הדף ליישום.",
    styleOptions: ["pill (גלולה)", "gradient (מדרג)", "plain (פשוט)"],
    panel: {
      title: "🚫 ניהול תרגום תוספים", hint: "בטל הסימון של תוסף כדי להשבית את תרגום הצמתים שלו. לחץ על «שמירה וטעינה מחדש» ליישום.",
      search: "חיפוש תוספים...", selectAll: "בחר הכל", deselectAll: "בטל בחירה", save: "שמור וטען מחדש",
      loading: "טוען רשימת תוספים...", loaded: "{n} קובצי תרגום, {d} מושבתים", loadFailed: "טעינת רשימת התוספים נכשלה",
    },
  },
};

/** 按语言代码获取配置界面文案，支持宽松前缀匹配，未知语言回退英文 */
function getPanelI18n(locale) {
  if (PANEL_I18N[locale]) return PANEL_I18N[locale];
  const prefix = String(locale || "").slice(0, 2).toLowerCase();
  const matched = Object.keys(PANEL_I18N).find(k => k.toLowerCase().startsWith(prefix + "-"));
  return (matched && PANEL_I18N[matched]) || PANEL_I18N["en-US"];
}

/** 从设置选项文本解析样式键，未知值回退 gradient（兼容旧配置） */
function parseStyleKey(val) {
  const s = String(val || "").toLowerCase();
  if (s.includes("pill")) return "pill";
  if (s.includes("plain")) return "plain";
  return "gradient";
}

/** 当前语言的开关样式选项（pill/gradient/plain 为固定标识，括号内说明随语言本地化） */
function styleOptions(locale = currentConfig.locale) {
  return getPanelI18n(locale).styleOptions;
}

/** 样式键 → 当前语言的选项显示文本 */
function styleLabelOf(key, locale = currentConfig.locale) {
  const k = parseStyleKey(key);
  const opts = styleOptions(locale);
  return opts.find(o => o.startsWith(k)) || opts[0];
}

/** 判断元素及其父容器是否真实可见（排除 display:none 的隐藏容器） */
function isVisibleEl(el) {
  if (!el || !el.isConnected) return false;
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return false;
  const pr = el.parentElement?.getBoundingClientRect();
  return !!pr && pr.width > 0 && pr.height > 0;
}

let styleInjected = false;
function injectToggleStyles() {
  if (styleInjected) return;
  styleInjected = true;
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
    .tl-toggle-pill {
      position: relative;
      display: inline-flex; align-items: stretch; margin: 2px;
      background: var(--comfy-input-bg, #1e1e1e);
      border: 1px solid var(--border-color, #45484c);
      border-radius: 999px; padding: 3px;
      font-size: 12px; user-select: none;
    }
    .tl-toggle-thumb {
      position: absolute; top: 3px; bottom: 3px; left: 3px; width: 0;
      background: #4a9eff; border-radius: 999px;
      box-shadow: 0 1px 4px rgba(74, 158, 255, 0.4);
      transition: left 0.25s ease, width 0.25s ease;
      cursor: pointer;
    }
    .tl-toggle-seg {
      position: relative; z-index: 1;
      padding: 5px 14px; border-radius: 999px; cursor: default;
      color: var(--descrip-text, #888888); line-height: 1.4;
      white-space: nowrap; transition: color 0.25s ease;
      pointer-events: none; /* 文字分段不响应点击，事件穿透到蓝色滑块 */
    }
    .tl-toggle-seg.active {
      color: #ffffff; font-weight: bold;
    }
  `;
  document.head.appendChild(styleElem);
}

/** 按当前配置构建开关元素（不插入 DOM） */
function buildToggle() {
  const translationEnabled = isTranslationEnabled();
  const locale = currentConfig.locale;
  const style = parseStyleKey(currentConfig.button_style);
  const i18n = getToggleI18n(locale);
  const tooltip = translationEnabled ? i18n.tipOn : i18n.tipOff;
  injectToggleStyles();

  if (style === "pill") {
    // 胶囊分段控件：蓝色滑块指示当前状态，点击蓝色滑块滑动切换（灰色文字分段不响应）
    const pill = document.createElement("div");
    pill.className = "tl-toggle-pill";
    pill.title = tooltip;

    const thumb = document.createElement("span");
    thumb.className = "tl-toggle-thumb";

    const segLeft = document.createElement("span");
    segLeft.className = "tl-toggle-seg";
    const segRight = document.createElement("span");
    segRight.className = "tl-toggle-seg";

    let on = translationEnabled;
    let sliding = false;

    const applyTexts = () => {
      segLeft.textContent = on ? i18n.onFull : i18n.switchOn;
      segRight.textContent = on ? i18n.switchOff : i18n.offFull;
      segLeft.classList.toggle("active", on);
      segRight.classList.toggle("active", !on);
    };
    applyTexts();

    // 将滑块定位到活动分段（初次渲染不动画）
    pill.initThumb = (animate) => {
      const target = on ? segLeft : segRight;
      if (!animate) thumb.style.transition = "none";
      thumb.style.left = target.offsetLeft + "px";
      thumb.style.width = target.offsetWidth + "px";
      if (!animate) {
        void thumb.offsetWidth; // 强制回流，恢复过渡供后续滑动使用
        thumb.style.transition = "";
      }
    };

    const slideAndToggle = (segIsOn) => {
      if (sliding || segIsOn === on) return;
      sliding = true;
      on = !on;
      applyTexts();
      pill.initThumb(true);
      // 先播放滑动动画，再保存并刷新
      setTimeout(() => toggleTranslation(), 320);
    };
    // 触发点仅为蓝色滑块：点击后切换到另一侧（灰色文字分段 pointer-events:none 不响应）
    thumb.addEventListener("click", () => slideAndToggle(!on));

    pill.appendChild(thumb);
    pill.appendChild(segLeft);
    pill.appendChild(segRight);
    return pill;
  }

  // 旧版按钮样式：gradient 七彩渐变 / plain 原生低调
  const isPlain = style === "plain";
  const btn = document.createElement("button");
  btn.className = "translation-btn";
  const activeClass = isPlain ? "translation-active-plain" : "translation-active-gradient";
  const inactiveClass = isPlain ? "translation-inactive-plain" : "translation-inactive-gradient";
  btn.classList.add(translationEnabled ? activeClass : inactiveClass);
  btn.textContent = translationEnabled ? i18n.onFull : i18n.offFull;
  btn.style.fontWeight = isPlain ? "normal" : "bold";
  btn.style.margin = "2px";
  btn.title = tooltip;
  btn.addEventListener("click", async () => { await toggleTranslation(); });
  return btn;
}

/**
 * 查找插入锚点：旧版可见菜单 → settingsGroup（与管理器同排） → 新版 Vue 顶栏右侧
 * 新版 ComfyUI 中 .comfy-menu 及 menuContainer 被隐藏（display:none），
 * 策略1 需检测可见性；策略2 与 ComfyUI-Manager 一致，只要元素存在即插入。
 * 返回值：'preferred' = 插入到命令栏；true = 插入到备选位置；false = 失败
 */
function insertToggle(app, el) {
  const comfyMenu = document.querySelector(".comfy-menu");
  if (comfyMenu && isVisibleEl(comfyMenu) && app.ui?.menuContainer && isVisibleEl(app.ui.menuContainer)) {
    app.ui.menuContainer.appendChild(el);
    return "preferred";
  }
  // 与 ComfyUI-Manager 同策略：只要 settingsGroup.element 存在即插入，
  // 无需等待其挂载到可见 DOM（Vue watchEffect 稍后会将父容器整体追加到命令栏）
  const settingsGroupEl = app.menu?.settingsGroup?.element;
  if (settingsGroupEl) {
    settingsGroupEl.before(el);
    return "preferred";
  }
  const topRight = document.querySelector(".workflow-tabs-container .ml-auto");
  if (topRight && isVisibleEl(topRight)) {
    topRight.prepend(el);
    return true;
  }
  const topBar = document.querySelector(".workflow-tabs-container");
  if (topBar && isVisibleEl(topBar)) {
    topBar.appendChild(el);
    return true;
  }
  return false;
}

const TOGGLE_ID = "toggle-translation-button";
let toggleWatchdog = null;

/** 低频看门狗：开关节点被顶栏重渲染移除、或插入位置不可见时自动修复；
 *  若初始仅插入到备选位置（顶栏），则持续等待命令栏 settingsGroup 就绪后搬迁 */
function startWatchdog(app, el, needsRelocate) {
  if (toggleWatchdog) clearInterval(toggleWatchdog);
  let wasConnected = el.isConnected;
  toggleWatchdog = setInterval(() => {
    // 已插入 settingsGroup 同父容器但尚未挂载到文档（等待 Vue watchEffect）——跳过
    if (!el.isConnected && el.parentElement === app.menu?.settingsGroup?.element?.parentElement) {
      return;
    }
    if (!el.isConnected || !isVisibleEl(el)) {
      el.remove();
      const result = insertToggle(app, el);
      if (result === "preferred") needsRelocate = false;
      el.initThumb?.(false);
      wasConnected = el.isConnected;
      return;
    }
    // 元素刚从“未挂载”变为“已挂载”，重新计算滑块位置
    if (!wasConnected && el.isConnected) {
      el.initThumb?.(false);
    }
    wasConnected = true;
    // 开关在备选位置（顶栏），尝试搬迁到命令栏（与管理器同排）
    if (needsRelocate) {
      const settingsGroupEl = app.menu?.settingsGroup?.element;
      if (settingsGroupEl) {
        el.remove();
        settingsGroupEl.before(el);
        needsRelocate = false;
        // 搬迁后若仍未挂载，下次 tick 再重算
        if (el.isConnected) el.initThumb?.(false);
      }
    }
  }, 2000);
}

/** 渲染（或按新样式重绘）翻译开关 */
function renderToggle(app) {
  try {
    if (toggleWatchdog) { clearInterval(toggleWatchdog); toggleWatchdog = null; }
    document.getElementById(TOGGLE_ID)?.remove();

    const el = buildToggle();
    el.id = TOGGLE_ID;

    const result = insertToggle(app, el);
    if (result) {
      el.initThumb?.(false);
      startWatchdog(app, el, result !== "preferred");
      return;
    }

    // 锚点可能尚未就绪，轮询重试（最多 30 秒）
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      const res = insertToggle(app, el);
      if (res) {
        clearInterval(timer);
        el.initThumb?.(false);
        startWatchdog(app, el, res !== "preferred");
      } else if (tries >= 60) {
        clearInterval(timer);
        error("未找到可用的顶栏锚点，翻译开关未插入");
      }
    }, 500);
  } catch (e) {
    error("添加面板开关失败:", e);
  }
}

/**
 * 在顶部菜单栏添加翻译切换开关（多样式，兼容新旧 UI）
 * @param {object} app - ComfyUI app 实例
 */
export function addPanelButtons(app) {
  renderToggle(app);
}

// ─── 插件翻译管理面板 ────────────────────────────────────

const SELF_NAME = "ComfyUI-Global-Translation";
const PANEL_ID = "tl-plugin-manager-panel";

// 注入锁：防止并发调用导致重复注入面板
let isInjecting = false;

function buildPluginPanel(parentEl) {
  // 强制去重：如果面板已存在，直接返回
  const existing = document.getElementById(PANEL_ID);
  if (existing) return;

  const disabled = new Set(currentConfig.disabled_plugins || []);
  const p = getPanelI18n(currentConfig.locale).panel;

  // 先创建面板 DOM 并设置 ID，确保去重检查能正确工作
  const panel = document.createElement("div");
  panel.id = PANEL_ID;
  // 标记为免翻译：面板文案已由 PANEL_I18N 按当前语言本地化，
  // 需屏蔽菜单/节点翻译引擎（tSkip 黑名单）对本模块的二次翻译
  panel.classList.add("tl-no-translate");
  panel.style.cssText = "margin-top:12px;padding:10px;border:1px solid #444;border-radius:6px;background:#1e1e1e;font-size:13px;";
  panel.innerHTML = `
    <div style="font-weight:bold;font-size:14px;margin-bottom:6px;">${p.title}</div>
    <div style="margin-bottom:6px;color:#aaa;font-size:12px;">${p.hint}</div>
    <input type="text" placeholder="${p.search}" id="tl-plugin-search"
      style="width:100%;padding:5px 8px;margin-bottom:6px;border:1px solid #555;border-radius:4px;background:#2a2a2a;color:#ddd;box-sizing:border-box;outline:none;" />
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <button id="tl-select-all" style="flex:1;padding:3px;border:1px solid #555;border-radius:4px;background:#333;color:#ddd;cursor:pointer;font-size:12px;">${p.selectAll}</button>
      <button id="tl-deselect-all" style="flex:1;padding:3px;border:1px solid #555;border-radius:4px;background:#333;color:#ddd;cursor:pointer;font-size:12px;">${p.deselectAll}</button>
    </div>
    <div id="tl-plugin-list" style="height:300px;overflow-y:auto;border:1px solid #444;border-radius:4px;padding:4px;"></div>
    <div style="margin-top:8px;display:flex;align-items:center;gap:8px;">
      <button id="tl-save-plugins" style="padding:6px 20px;border:none;border-radius:4px;background:#4a9eff;color:#fff;cursor:pointer;font-weight:bold;">${p.save}</button>
      <span id="tl-status" style="font-size:11px;color:#888;"></span>
    </div>
  `;

  const listEl = panel.querySelector("#tl-plugin-list");
  const searchEl = panel.querySelector("#tl-plugin-search");
  const statusEl = panel.querySelector("#tl-status");

  // 先显示加载状态
  statusEl.textContent = p.loading;

  // 异步加载插件列表并填充内容
  fetch(`./translation_node/get_plugin_list?locale=${encodeURIComponent(currentConfig.locale)}`)
    .then(resp => resp.json())
    .then(plugins => {
      plugins = plugins.filter(n => n !== SELF_NAME && n !== "internal");
      statusEl.textContent = p.loaded.replace("{n}", plugins.length).replace("{d}", disabled.size);
      
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
      statusEl.textContent = p.loadFailed;
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
    // 锚点用「📋」表情：它在所有语言的 optionsName 中保持一致，避免本地化后文案匹配失效
    const allSettingItems = document.querySelectorAll('[class*="setting-item"], [class*="SettingItem"], .p-fieldset, .p-panel');
    for (const item of allSettingItems) {
      if (item.textContent?.includes("📋")) {
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
          if (row.textContent?.includes("📋")) {
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
  const observer = new MutationObserver(() => {
    tryInjectPluginPanel();
    syncSettingsDialogIfOpen();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

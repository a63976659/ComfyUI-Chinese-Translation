<div align="center">

# 🌐 ComfyUI-Global-Translation

**A comprehensive, smart and compatible multi-language translation solution for the ComfyUI interface**

> A front-end + back-end real-time translation plugin covering nodes, menus, the settings panel, the manager and every visible text, fully compatible with ComfyUI's official native translations.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#usage)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 Language · 语言

[简体中文](README.md) · **English** · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Author: **猪的飞行梦** — This project is modified from [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) and [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation). Special thanks to these authors for their outstanding contributions to the open-source community. This project will remain open source.

</div>

---

## Table of Contents

- [Plugin Introduction](#plugin-introduction)
- [Core Features](#core-features)
- [Showcase](#showcase)
- [Installation](#installation)
- [Usage](#usage)
- [Translation Coverage](#translation-coverage)
- [Architecture](#architecture)
- [Notes](#notes)
- [Changelog](#changelog)
- [Community and Support](#community-and-support)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Plugin Introduction

ComfyUI-Global-Translation is a translation plugin designed for ComfyUI. Through front-end and back-end collaboration, it delivers real-time interface translation covering nodes, menus, the settings panel, the manager and every visible text, while staying perfectly compatible with ComfyUI's official native translation. The translation language automatically follows the official ComfyUI language setting (Settings → General → `Comfy.Locale`); the plugin's own UI strings support 15 languages.

### Why this plugin?

| Feature | This plugin | Other translation plugins |
|------|--------|-------------|
| Official translation compatible | ✅ Never overrides existing official translations | ❌ May conflict |
| Right-click menu functions | ✅ Still work after translation | ❌ Some functions break |
| Old & new UI compatible | ✅ Dual-button architecture | ❌ Single version only |
| Real-time switching | ✅ No restart needed | ❌ Restart required |
| Custom title protection | ✅ Never overrides user edits | ❌ May get overwritten |

---

## Core Features

### 🎯 Smart translation system

- **Smart detection** — automatically recognizes already-translated text, avoiding repeated translation and infinite recursion
- **Native compatibility** — coexists perfectly with ComfyUI's official translation without interference
- **Context awareness** — applies the best strategy per element type (nodes, menus, widgets, etc.)
- **Smart data merging** — when several translation files contain the same node, entries are merged complementarily instead of overwriting each other
- **Custom panel translation** — panels created inside nodes (buttons, labels, dropdowns, tooltips, popups, etc.) are also translated automatically
- **Callback safety** — after translating right-click menus, every function (disconnect, rename, etc.) keeps working

### 🎨 Beautiful user interface

- **Segmented pill control** — a rounded pill toggle with a blue slider gliding smoothly between "on/off" segments, modern look
- **Rainbow animation** — an active state shows a flowing rainbow gradient animation
- **Minimal gray design** — an inactive state uses an elegant gray gradient
- **Native low-key mode** — an optional subtle color scheme matching ComfyUI's default theme
- **Live feedback** — button text and color reflect the current translation state in real time

### 🔧 Flexible translation management

- **Real-time switching** — enable/disable translation without restarting
- **Persistent state** — settings are saved automatically and survive restarts
- **Settings-panel integration** — configure switch style and dropdown-option translation inside ComfyUI's settings (language follows the official ComfyUI setting)
- **Per-plugin toggle** — a built-in manager lets you disable translation for specific plugins
- **Add and apply instantly** — new translation files take effect without restarting

### 🛡️ Stable and reliable

- **Robust error handling** — every critical operation is wrapped
- **Graceful degradation** — falls back to the original text on failure
- **DOM safety** — translation never breaks Vue/PrimeVue event bindings
- **Multi-version support** — supports both old and new ComfyUI interfaces

---

## Showcase

### Translation toggle buttons

<img width="900" height="180" alt="new-on" src="https://github.com/user-attachments/assets/0e6751fb-4196-4f09-9a64-818bda07f343" />

<img width="1000" height="180" alt="new-off" src="https://github.com/user-attachments/assets/13810712-12df-4bea-bdfd-5e86f3d7686e" />

### Interface preview

<img width="800" height="400" alt="preview1" src="https://github.com/user-attachments/assets/aa4e4889-33b0-4860-b973-61baf1e7f57e" />
<img width="800" height="600" alt="preview2" src="https://github.com/user-attachments/assets/466e4509-af6a-4bb0-9e31-55b4cf7799e1" />
<img width="800" height="800" alt="preview3" src="https://github.com/user-attachments/assets/332d471d-85b0-4aa5-8aef-e9a674bd179d" />

---

## Installation

### Method 1: Git clone (recommended)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Restart ComfyUI after installation.

#### Method 1 — beginner-friendly walkthrough:

1. Open the plugin folder `ComfyUI\custom_nodes`
2. On Win11, right-click an empty area and choose "Open in Terminal". On Win10, type `cmd` in the address bar and press Enter.
3. Click **Code** at the top-right of this page and copy the address (you can also copy the URL).
4. In the terminal type `git clone `, paste the address and press Enter. Example: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Done — restart ComfyUI. (If the install fails, enable a proxy/VPN and retry.)



### Method 2: ComfyUI Manager

1. Open ComfyUI Manager
2. Change the data source to: Channel (Remote)
3. Click Node Manager
4. Search for **猪的飞行梦**
5. Click Install and restart ComfyUI

### Method 3: Manual download (not recommended, no updates)

1. On the GitHub page click **Code → Download ZIP**
2. Extract it to `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. Restart ComfyUI

---

## Usage

### Translation toggle

After installation a toggle button appears in the interface; click it to switch translation:

- **On** — the button shows the "on" label, and the interface text is translated into the current language (following the official ComfyUI language setting)
- **Off** — the button shows the "off" label, restoring the original English interface

### Translation language

The translation language is no longer set inside the plugin; it **automatically follows the official ComfyUI language setting** (Settings → General → Language / `Comfy.Locale`):

- Every officially supported language is matched: Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Russian, French, German, Spanish, Italian, Portuguese (Brazil), Turkish, Arabic, Persian, Hebrew; uncovered languages fall back to English
- After switching the official language in ComfyUI settings, the page refreshes automatically; the translation and the plugin's own UI strings apply together, no manual restart needed

### Settings panel

Under ComfyUI Settings → "🌐 Translation Settings" there are two options. The UI strings are localized to the current language (15 languages) with a consistent section order across languages:

| Option | Description | Choices |
|-------|------|------|
| 🎨 Switch style | Choose the toggle appearance; redraws live, no refresh | pill (segmented) / gradient (rainbow) / plain (native low-key) |
| 📋 Dropdown options | Whether to also translate text inside COMBO dropdowns | On / Off (auto-refresh on change) |

Below the options there is also a **Plugin Translation Manager**: it lists every plugin with translation files — uncheck one to disable its translation; the page refreshes on save.

> 💡 **Segmented pill (recommended)**: a rounded pill with a blue highlight slider over the current state. **Click the blue slider** to glide it to the other side; the choice is saved to the config immediately and persists after restarting ComfyUI.

### Button style reference

| Style | On | Off | Best for |
|-----|---------|---------|----------|
| **Segmented pill** | Blue slider over the "on" segment, bold white text | Blue slider slid to the "off" segment, gray text | Modern, minimal, state at a glance |
| **Rainbow gradient** | Flowing rainbow animation, bold white | Flowing gray animation, bold dark text | Want something eye-catching |
| **Native low-key** | ComfyUI theme background | Dark background, gray text | Want it to blend in |

> **Segmented pill interaction**: only the blue highlight slider is the toggle trigger — clicking it plays a slide animation (~300ms), then saves and refreshes; the gray text segment is only a state label and intentionally does nothing when clicked.

---

## Translation Coverage

### What gets translated

| Category | Coverage | Status |
|------|---------|------|
| **Node names** | Titles and display names of all workflow nodes | ✅ |
| **Node properties** | Input/output ports, widget labels, descriptions | ✅ |
| **Menus** | Main menu, right-click menu, context menu | ✅ |
| **Settings panel** | The ComfyUI settings dialog | ✅ |
| **Manager** | The ComfyUI Manager interface | ✅ |
| **Template library** | Workflow template names | ✅ |
| **UI elements** | Buttons, labels, tooltips, search box | ✅ |
| **Custom panels** | Buttons, labels, dropdowns, tooltips, popups in node-built DOM panels | ✅ |
| **Queue info** | Dynamic text such as queue size | ✅ |

### Translation file structure

```
zh-CN/
├── Nodes/          # Node translations (title, inputs, outputs, widgets, custom panels)
│   └── internal.json
├── Categories/     # Node category translations
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Menu and interface translations
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> The other language directories (`zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) share the same structure and load by the current language; `en-US/` is used to restore non-Chinese plugins' nodes to English.

### Adding custom translations

Create a JSON file under `zh-CN/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Your node display name",
    "inputs": {
      "input_name": "translated input name"
    },
    "outputs": {
      "output_name": "translated output name"
    },
    "widgets": {
      "widget_name": "translated widget name"
    },
    "ui": {
      "English text in panel": "translated panel text"
    }
  }
}
```

> **Authoring tips**
>
> - `widgets` keys must use the widget's **real name** (the parameter name in source, e.g. `target_language`), not the on-screen display_name (e.g. `Target Language`). For V3 API (io.Schema) plugins, write both the real name and the display_name as keys for best compatibility
> - The `ui` field translates English text inside custom panels (created via `addDOMWidget`); the key is the English shown on screen, the value is the translation
> - Do not add "identity translations" (value equal to key, e.g. `"cfg": "cfg"`) — they carry no meaning
> - Double-check key spelling; a key that differs from the source (e.g. an extra `t` in `perturb_atttn`) will silently fail to translate

Create a JSON file under `zh-CN/Menus/` to add menu translations:

```json
{
  "English Menu Text": "translated menu text",
  "Another Item": "another item"
}
```

> After adding translation files, no restart is needed — toggling translation applies them.

---

## Architecture

### Overall structure

```
┌──────────────────────────────────────────────────────┐
│                   ComfyUI main program                │
│                                                        │
│  Python backend (__init__.py)   Frontend JS (js/)      │
│  ├─ HTTP API routes             ├─ main.js (engine)    │
│  ├─ translation compiling       ├─ MenuTranslate.js    │
│  └─ config persistence          └─ utils.js (helpers)  │
│         │                             │                │
│         ▼                             ▼                │
│   zh-CN/ translation data       MutationObserver       │
│   ├─ Nodes/*.json               real-time DOM translate │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Core techniques

| Technique | Description |
|------|------|
| **Callback Wrapping** | Translates right-click menu text while preserving the underlying callback's `content` matching |
| **Dual-button architecture** | Supports both the legacy `.comfy-menu` and the new `.comfyui-menu` UIs |
| **MutationObserver** | Watches DOM changes in real time and auto-translates newly appearing elements |
| **translatedValueSet** | Uses a Set for O(1) checks of whether text is already translated, avoiding repeated work |
| **Leaf-node protection** | Assigns `innerText` only to childless nodes, protecting Vue event bindings |
| **Gzip transfer** | Translation data is transferred Gzip-compressed to reduce network cost |

> For full technical details, see [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Notes

### Compatibility

- **Translation-plugin conflicts** — this plugin conflicts with other translation plugins (e.g. AIGODLIKE-ComfyUI-Translation); uninstall them before use
- **Known conflicting plugin** — `ComfyUI Browser` may have compatibility issues
- **Browser support** — Chrome, Edge and 360 Browser are recommended; others are not fully tested

### Requirements

| Component | Requirement |
|------|------|
| ComfyUI | Latest (compatible with old and new UIs) |
| Python | 3.8+ |
| Browser | Chrome / Edge (recommended) |

---

## Changelog

### 2026-09-21

**Added Arabic (ar-SA), Persian (fa-IR), Hebrew (he-IL) translations**

- Completed translation packs for three RTL (right-to-left) languages covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `ar-SA` / `fa-IR` / `he-IL` to enable them automatically

### 2026-09-20

**Added Japanese (ja-JP) translation**

- Completed the Japanese translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `ja-JP` to enable the Japanese interface

**Added Spanish (es-ES) translation**

- Completed the Spanish translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `es-ES` to enable the Spanish interface

**Added Korean (ko-KR) translation**

- Completed the Korean translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `ko-KR` to enable the Korean interface

**Added Turkish (tr-TR) translation**

- Completed the Turkish translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `tr-TR` to enable the Turkish interface

**Added Italian (it-IT) translation**

- Completed the Italian translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `it-IT` to enable the Italian interface

**Added Brazilian Portuguese (pt-BR) translation**

- Completed the Brazilian Portuguese translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `pt-BR` to enable the Portuguese interface

**Added German (de-DE) translation**

- Completed the German translation pack covering nodes, categories, menus and the settings panel; set the official ComfyUI language to `de-DE` to enable the German interface

### 2026-09-19

**Language follows the official setting**

- Removed the in-plugin "translation language" option; the translation language now follows the official ComfyUI language setting (`Comfy.Locale`)
- After switching the official language the page refreshes automatically; translation and the plugin's UI strings apply together, no manual restart

**Multi-language config UI and unified layout**

- Switch labels and settings UI strings cover 15 languages (including Traditional Chinese and the RTL Arabic, Persian and Hebrew); unknown languages fall back to English
- The settings panel keeps a consistent section order across languages: switch style → dropdown options → plugin manager; section headers are translated
- The "Plugin Translation Manager" is no longer double-translated and always matches the current interface language
- The switch's on-state label drops the `(language-code)` suffix, keeping only the text

### 2026-09-12

- Fixed translations being lost when several translation files contain the same node; they are now merged complementarily
- Added custom-panel translation support: buttons, labels, dropdowns, tooltips and popups inside panels are now translated automatically
- Fixed port names staying in English after a widget is "converted to input"
- Added a translation guard so later-created nodes also get translated
- Thanks to 石头 (Q:34720803) for the optimization

### 2026-09-07

- Fixed the sidebar "Workflows" list mistranslating your own workflow names into Chinese; they are now preserved as-is

### 2026-08-20

- Added the "segmented pill" toggle style, with a blue slider gliding between on and off for a state at a glance

### 2026-07-27

**Fix: V3 API node widget translation failing**

- Fixed widgets not being translated in plugins written with the V3 API (io.Schema), e.g. ComfyUI-qwenmultiangle
- **Root cause**: V3 nodes often declare an English `display_name` for a widget (name `horizontal_angle`, label `Horizontal Angle`); the old already-translated check treated any "label ≠ name" as a native translation and skipped it
- **Fix**: `isAlreadyTranslated` adds a normalized comparison — a label that is merely a prettified name (case/space/underscore/hyphen differences) is not considered translated

**Fix: identity translations polluting the already-translated set**

- Fixed certain widgets (e.g. `cfg`) never being translated on any node
- **Root cause**: some files had identity entries (e.g. `"cfg": "cfg"`); once its value entered `translatedValueSet`, the English name was misread as "already translated" and globally blocked
- **Fix**: skip entries whose value equals their key when building the set

**Translation file corrections**

- Fixed key typos in ComfyUI-LTXVideo (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Added missing real widget-name keys to ComfyUI-qwenmultiangle (`target_language`, `prompt`)

### 2026-04-08

**Fix: right-click menu functions breaking**

- Fixed a serious bug where, with translation on, actions like "disconnect" and "rename port" on the output-slot right-click menu stopped responding
- **Root cause**: LiteGraph dispatches callbacks by matching the English `value.content`; after translation the match failed
- **Fix**: implemented Callback Wrapping — the English is temporarily restored at the moment the callback runs, then Chinese is restored, keeping both the translated display and correct behavior
- Wraps both `value.callback` (individual) and `options.callback` (shared) modes
- Added `_originalContent` multi-translation override protection so the canvas menu does not lose its original value after passing through the pipeline twice

**Fix: DOM translation breaking event bindings**

- Fixed `replaceText`'s `innerText` assignment destroying child elements and Vue/PrimeVue listeners
- **Fix**: added a leaf-node check `target.children.length === 0`, assigning `innerText` only to childless nodes

### 2025-12-20

**Rename**

- Plugin renamed from `ComfyUI-Translation-node` to `ComfyUI-Chinese-Translation`
- Display name changed from "Translation Node" to "Chinese Translation" to better match the plugin's positioning

**Enhancements**

- Rebuilt into a multi-language file architecture (version 2.0)
- Added a settings panel to configure language and button style inside ComfyUI settings
- Added the native low-key UI style option
- Fixed icon settings being lost after restart (thanks to community member 幻影 for the report)

---

## Community and Support

**Author's page**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Community group**

- **ComfyUI QQ group**: `202018000`

**Feedback and contribution**

- **Bug reports**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Contribute translations**: PRs adding translation files are welcome

**Support the author**

If you find the plugin useful, please consider a ⭐ Star and supporting the author:

- **Sponsor**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## License

This project is open-sourced under the [MIT License](LICENSE).

Copyright (c) 2025 猪的飞行梦

You are free to copy, modify and distribute this project, provided the original copyright notice is retained. See the [LICENSE](LICENSE) file for details.

---

## Disclaimer

This translation and shared content are subject to the following:

**Non-commercial**

This translation is a personal, unpaid work; no compensation or commercial benefit was received. It is intended solely for learning, discussion and knowledge sharing.

**No accuracy guarantee**

The translation strives to be faithful to the original but makes no guarantee of accuracy, completeness, timeliness or fitness for a purpose. Any risk and consequence from using or relying on this translation is borne by the user.

**Original source attribution**

Copyright of the original materials underlying this translation (including but not limited to text, images and videos) belongs to the respective authors or original rights holders. This translation claims no rights over the original content.

**Refer to the original**

For important decisions, legal effect, technical implementation or professional judgment, always consult and rely on the official original version rather than this translation.

**Rights reserved**

If a rights holder believes this translation infringes their lawful rights, please contact me promptly and I will remove or handle it accordingly.

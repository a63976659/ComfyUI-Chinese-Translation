<div align="center">

# 🌐 ComfyUI-Global-Translation

**全面、智慧、相容的 ComfyUI 介面多國語言翻譯解決方案**

> 前後端協同的即時翻譯外掛，覆蓋節點、選單、設定面板、管理器等所有可見文字，與 ComfyUI 官方原生翻譯完美相容。

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#使用說明)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 語言 · Language

[简体中文](README.md) · [English](README.en-US.md) · **繁體中文** · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> 作者：**猪的飞行梦** — 本專案基於 [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) 和 [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) 進行的修改，特別感謝大佬們對開源社群的傑出貢獻。此專案將持續保持開源。

</div>

---

## 目錄

- [外掛簡介](#外掛簡介)
- [核心特性](#核心特性)
- [效果展示](#效果展示)
- [安裝方法](#安裝方法)
- [使用說明](#使用說明)
- [翻譯覆蓋範圍](#翻譯覆蓋範圍)
- [技術架構](#技術架構)
- [注意事項](#注意事項)
- [更新記錄](#更新記錄)
- [社群與支持](#社群與支持)
- [開源許可](#開源許可)
- [免責聲明](#免責聲明)

---

## 外掛簡介

ComfyUI-Global-Translation 是一個專為 ComfyUI 設計的翻譯外掛。透過前後端協同工作，實現介面元素的即時翻譯，覆蓋節點、選單、設定面板、管理器等所有可見文字，同時與 ComfyUI 官方原生翻譯完美相容。翻譯語言自動跟隨 ComfyUI 官方語言設定（設定 → 一般 → `Comfy.Locale`），外掛自身的介面文案支援 15 種語言。

### 為什麼選擇本外掛？

| 特性 | 本外掛 | 其他翻譯外掛 |
|------|--------|-------------|
| 官方翻譯相容 | ✅ 不覆蓋官方已有翻譯 | ❌ 可能衝突 |
| 右鍵選單功能 | ✅ 翻譯後功能正常 | ❌ 部分功能失效 |
| 新舊版 UI 相容 | ✅ 雙重按鈕架構 | ❌ 僅支援單一版本 |
| 即時切換 | ✅ 無需重啟 | ❌ 需要重啟 |
| 使用者自訂標題保護 | ✅ 不覆蓋使用者修改 | ❌ 可能被覆蓋 |

---

## 核心特性

### 🎯 智慧翻譯系統

- **智慧檢測機制** — 自動識別已翻譯文字，避免重複翻譯和無限遞迴
- **原生翻譯相容** — 與 ComfyUI 官方翻譯完美共存，互不干擾
- **上下文感知** — 依不同介面元素類型（節點、選單、控件等）採用最合適的翻譯策略
- **翻譯資料智慧合併** — 多個翻譯檔案包含同名節點時自動互補合併，不再互相覆蓋遺失翻譯
- **自訂面板翻譯** — 節點內部建立的自訂面板（按鈕、標籤、下拉框、提示文字、彈窗等）也能自動翻譯
- **回呼安全保護** — 右鍵選單翻譯後所有功能（中斷連線、重新命名等）完全正常

### 🎨 美觀的使用者介面

- **膠囊分段控件** — 圓角膠囊形態的滑動開關，藍色滑塊在「開啟/關閉」兩段間平滑切換，現代感強
- **七彩動態效果** — 啟用狀態下顯示流暢的彩虹漸變動畫
- **灰色簡約設計** — 未啟用狀態下採用優雅的灰色漸變
- **原生低調模式** — 可選與 ComfyUI 預設主題一致的低調配色
- **即時狀態回饋** — 按鈕文字和顏色即時反映目前翻譯狀態

### 🔧 靈活的翻譯管理

- **即時切換** — 無需重啟即可開啟/關閉翻譯
- **狀態持久化** — 翻譯設定自動儲存，重啟後保持狀態
- **設定面板整合** — 在 ComfyUI 設定面板中可配置開關樣式與下拉選項翻譯（翻譯語言自動跟隨 ComfyUI 官方語言設定）
- **外掛級翻譯開關** — 設定面板內建外掛翻譯管理，可勾選禁用某些外掛的翻譯
- **新增翻譯即生效** — 新增新的翻譯檔案後無需重啟

### 🛡️ 穩定可靠

- **完善的異常擷取** — 所有關鍵操作都有錯誤處理
- **優雅降級** — 翻譯失敗時自動回退到原始文字
- **DOM 安全保護** — 翻譯不會破壞 Vue/PrimeVue 元件的事件綁定
- **多版本相容** — 同時支援 ComfyUI 新舊版本介面

---

## 效果展示

### 翻譯開關按鈕

<img width="900" height="180" alt="新版開" src="https://github.com/user-attachments/assets/0e6751fb-4196-4f09-9a64-818bda07f343" />

<img width="1000" height="180" alt="新版-關" src="https://github.com/user-attachments/assets/13810712-12df-4bea-bdfd-5e86f3d7686e" />

### 介面效果

<img width="800" height="400" alt="介面效果1" src="https://github.com/user-attachments/assets/aa4e4889-33b0-4860-b973-61baf1e7f57e" />
<img width="800" height="600" alt="介面效果2" src="https://github.com/user-attachments/assets/466e4509-af6a-4bb0-9e31-55b4cf7799e1" />
<img width="800" height="800" alt="介面效果3" src="https://github.com/user-attachments/assets/332d471d-85b0-4aa5-8aef-e9a674bd179d" />

---

## 安裝方法

### 方法 1：Git 複製（推薦）

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

安裝完成後重啟 ComfyUI。

#### 方法 1-新手詳細介紹版：

1. 打開外掛資料夾 ComfyUI\Custom_nodes
2. Win11 系統空白處右鍵，選擇在終端機中開啟。Win10 系統位址列輸入 cmd 迴車。
3. 點擊此網頁右上角的 code 展開，複製位址。（也可以直接複製網址）
4. 在命令視窗輸入 git 空格 clone 空格，貼上位址並迴車。輸入參考 `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. 安裝完成，重啟 ComfyUI。（安裝失敗，請開啟網路代理後重試）



### 方法 2：ComfyUI Manager

1. 打開 ComfyUI Manager
2. 資料改為：通道（遠端）
3. 點擊節點管理
4. 搜尋 **猪的飞行梦**
5. 點擊安裝，重啟 ComfyUI

### 方法 3：手動下載（不推薦，無法更新）

1. 在 GitHub 頁面點擊 **Code → Download ZIP**
2. 解壓到 `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. 重啟 ComfyUI

---

## 使用說明

### 翻譯開關

安裝後介面會出現翻譯開關按鈕，點擊即可切換翻譯狀態：

- **開啟翻譯** — 按鈕顯示 `翻譯開啟`，介面文字翻譯為目前語言（跟隨 ComfyUI 官方語言設定）
- **關閉翻譯** — 按鈕顯示 `翻譯關閉`，恢復原始英文介面

### 翻譯語言

翻譯語言不再在外掛內單獨設定，而是**自動跟隨 ComfyUI 官方語言設定**（設定 → 一般 → 語言 / `Comfy.Locale`）：

- 官方支援的語言均可匹配：中文、繁體中文、英、日、韓、俄、法、德、西、義、葡(巴西)、土、阿、波斯、希伯來；未覆蓋的語言回退英文
- 在 ComfyUI 設定中切換官方語言後，頁面會自動重新整理，翻譯內容與本外掛介面文案同時生效，無需手動重啟

### 設定面板

在 ComfyUI 設定 → 「🌐 翻譯設定」中提供兩個配置項，介面文案隨目前語言本地化（15 種語言）且各語言佈局順序一致：

| 設定項 | 說明 | 選項 |
|-------|------|------|
| 🎨 開關樣式 | 選擇開關外觀，切換後即時重繪無需重新整理 | pill (膠囊分段) / gradient (七彩漸變) / plain (原生低調) |
| 📋 下拉選項 | 是否同時翻譯下拉框（COMBO）中的選項文字 | 開 / 關（修改後自動重新整理生效） |

設定項下方還附带**外掛翻譯管理**面板：列出所有帶翻譯檔案的外掛，取消勾選即可禁用某個外掛的翻譯，儲存後自動重新整理。

> 💡 **膠囊分段（推薦）**：圓角膠囊形態，藍色高亮滑塊覆蓋目前狀態分段。**點擊藍色滑塊**即可滑動到另一側完成切換，選擇後立即儲存到設定檔，重啟 ComfyUI 後依然保持。

### 按鈕樣式說明

| 樣式 | 開啟效果 | 關閉效果 | 適用場景 |
|-----|---------|---------|----------|
| **膠囊分段** | 藍色滑塊覆蓋「開啟」段，白色粗體文字 | 藍色滑塊滑至「關閉」段，灰色文字 | 現代簡潔，狀態一目瞭然 |
| **七彩漸變** | 彩虹流動動畫，白色粗體 | 灰色流動動畫，深色粗體 | 希望直觀醒目 |
| **原生低調** | ComfyUI 主題色背景 | 深色背景，灰色文字 | 希望融入介面 |

> **膠囊分段互動說明**：僅藍色高亮滑塊是切換觸發點——點擊後滑塊先播放滑動動畫（約 300ms）再儲存並重新整理頁面；灰色文字分段僅作狀態標籤，點擊無反應屬設計行為。

---

## 翻譯覆蓋範圍

### 翻譯內容

| 類別 | 覆蓋內容 | 狀態 |
|------|---------|------|
| **節點名稱** | 所有工作流節點的標題和顯示名稱 | ✅ |
| **節點屬性** | 輸入/輸出埠、控件標籤、描述資訊 | ✅ |
| **選單系統** | 主選單、右鍵選單、上下文選單 | ✅ |
| **設定面板** | ComfyUI 設定對話框 | ✅ |
| **管理器** | ComfyUI Manager 介面 | ✅ |
| **模版庫** | 工作流模版名稱 | ✅ |
| **介面元素** | 按鈕、標籤、工具提示、搜尋框 | ✅ |
| **自訂面板** | 節點自建 DOM 面板的按鈕、標籤、下拉框、提示文字、彈窗 | ✅ |
| **佇列資訊** | 佇列大小等動態文字 | ✅ |

### 翻譯檔案結構

```
zh-CN/
├── Nodes/          # 節點翻譯（標題、輸入、輸出、控件、自訂面板）
│   └── internal.json
├── Categories/     # 節點分類翻譯
│   ├── Internal.json
│   └── Other.json
└── Menus/          # 選單和介面翻譯
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> 其他語言目錄（`zh-TW/`、`en-US/`、`ja-JP/`、`ko-KR/`、`ru-RU/`、`fr-FR/`、`de-DE/`、`es-ES/`、`it-IT/`、`pt-BR/`、`ar-SA/`、`tr-TR/`、`fa-IR/`、`he-IL/`）採用同樣結構，依目前語言自動載入；其中 `en-US/` 用於把其他語言外掛的節點還原為英文。

### 新增自訂翻譯

在 `zh-CN/Nodes/` 目錄下建立 JSON 檔案即可：

```json
{
  "YourNodeClassName": {
    "title": "節點名稱",
    "inputs": {
      "input_name": "輸入名翻譯"
    },
    "outputs": {
      "output_name": "輸出名翻譯"
    },
    "widgets": {
      "widget_name": "控件名翻譯"
    },
    "ui": {
      "English text in panel": "面板中的翻譯"
    }
  }
}
```

> **撰寫提示**
>
> - `widgets` 的鍵必須使用控件的**真實名稱**（原始碼中的參數名，如 `target_language`），而不是介面顯示的 display_name（如 `Target Language`）。對於 V3 API（io.Schema）外掛，建議真實名稱與 display_name 兩種鍵都寫上，相容性最佳
> - `ui` 欄位用於翻譯節點內部自訂面板（透過 `addDOMWidget` 建立）中的英文文字，鍵為介面顯示的英文原文，值為翻譯
> - 請勿新增「恆等翻譯」（值與鍵相同的條目，如 `"cfg": "cfg"`），此類條目沒有翻譯意義
> - 注意核對鍵名拼寫，鍵名與原始碼不一致（如 `perturb_atttn` 多打一個 t）會導致該控件翻譯不生效

在 `zh-CN/Menus/` 目錄下建立 JSON 檔案即可新增選單翻譯：

```json
{
  "English Menu Text": "選單文字翻譯",
  "Another Item": "另一個項目"
}
```

> 新增翻譯檔案後無需重啟 ComfyUI，切換翻譯開關即可生效。

---

## 技術架構

### 整體架構

```
┌──────────────────────────────────────────────────────┐
│                    ComfyUI 主程式                      │
│                                                        │
│  Python 後端 (__init__.py)     前端 JS (js/)           │
│  ├─ HTTP API 路由              ├─ main.js (翻譯引擎)   │
│  ├─ 翻譯資料編譯               ├─ MenuTranslate.js     │
│  └─ 設定持久化                 └─ utils.js (工具函式)  │
│         │                             │                │
│         ▼                             ▼                │
│   zh-CN/ 翻譯資料              MutationObserver        │
│   ├─ Nodes/*.json              即時 DOM 翻譯           │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### 核心技術

| 技術 | 說明 |
|------|------|
| **回呼包裝 (Callback Wrapping)** | 翻譯右鍵選單文字的同時保護底層回呼的 content 比對邏輯 |
| **雙重按鈕架構** | 同時相容舊版 `.comfy-menu` 和新版 `.comfyui-menu` 兩套 UI |
| **MutationObserver 監聽** | 即時偵測 DOM 變化，自動翻譯新出現的介面元素 |
| **translatedValueSet** | 使用 Set 資料結構 O(1) 判斷文字是否已翻譯，避免重複處理 |
| **葉節點保護** | `innerText` 僅對無子元素的節點賦值，保護 Vue 事件綁定 |
| **Gzip 壓縮傳輸** | 翻譯資料透過 Gzip 壓縮傳輸，減少網路開銷 |

> 完整技術細節請參考 [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## 注意事項

### 相容性

- **翻譯外掛衝突** — 本外掛會和其他翻譯外掛衝突（如 AIGODLIKE-ComfyUI-Translation），請卸載其他翻譯外掛後使用
- **已知衝突外掛** — `ComfyUI Browser` 可能存在相容性問題
- **瀏覽器支援** — 建議使用 Chrome、Edge、360 瀏覽器，其他瀏覽器未充分測試

### 環境要求

| 元件 | 要求 |
|------|------|
| ComfyUI | 最新版（相容新舊版本 UI） |
| Python | 3.8+ |
| 瀏覽器 | Chrome / Edge（推薦） |

---

## 更新記錄

### 2026-09-21

**新增阿拉伯語（ar-SA）、波斯語（fa-IR）、希伯來語（he-IL）翻譯**

- 完成三種 RTL（從右到左）語言的翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `ar-SA` / `fa-IR` / `he-IL` 即可自動啟用對應介面

### 2026-09-20

**新增日語（ja-JP）翻譯**

- 完成日語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `ja-JP` 即可自動啟用日語介面

**新增西班牙語（es-ES）翻譯**

- 完成西班牙語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `es-ES` 即可自動啟用西語介面

**新增韓語（ko-KR）翻譯**

- 完成韓語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `ko-KR` 即可自動啟用韓語介面

**新增土耳其語（tr-TR）翻譯**

- 完成土耳其語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `tr-TR` 即可自動啟用土耳其語介面

**新增義大利語（it-IT）翻譯**

- 完成義大利語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `it-IT` 即可自動啟用義大利語介面

**新增巴西葡萄牙語（pt-BR）翻譯**

- 完成巴西葡萄牙語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `pt-BR` 即可自動啟用葡語介面

**新增德語（de-DE）翻譯**

- 完成德語翻譯包，覆蓋節點、分類、選單與設定面板；將 ComfyUI 官方語言設為 `de-DE` 即可自動啟用德語介面

### 2026-09-19

**語言跟隨官方設定**

- 移除外掛內「翻譯語言」設定項，翻譯語言自動跟隨 ComfyUI 官方語言設定（`Comfy.Locale`）
- 切換官方語言後頁面自動重新整理，翻譯與外掛介面文案同時生效，無需手動重啟

**設定介面多語言與統一佈局**

- 開關文字與設定介面文案覆蓋 15 種語言（含繁體中文及阿拉伯語、波斯語、希伯來語 RTL 語言），未知語言回退英文
- 各語言下設定面板佈局順序一致：開關樣式 → 下拉選項 → 外掛翻譯管理，小節表頭隨語言翻譯
- 「外掛翻譯管理」面板不再被字典二次翻譯，始終與目前介面語言一致
- 開關啟用態文案去掉 `(語言代碼)` 後綴，只保留文案本身

### 2026-09-12

- 修復多個翻譯檔案包含同名節點時翻譯被覆蓋遺失的問題，現在會自動互補合併
- 新增節點自訂面板翻譯支援，面板裡的按鈕、標籤、下拉框、提示文字、彈窗都能自動翻譯
- 修復控件被「轉換為輸入」後埠名稱保持英文的問題
- 新增翻譯守護機制，後來建立的節點也能自動補上翻譯
- 感謝石头（Q:34720803）提供的最佳化

### 2026-09-07

- 修復側邊欄「工作流」列表裡自己起的工作流名字被誤翻譯的問題，現在會原樣保留

### 2026-08-20

- 新增「膠囊分段」翻譯開關樣式，藍色滑塊在開啟和關閉之間平滑滑動，狀態一目瞭然

### 2026-07-27

**修復：V3 API 節點控件翻譯失效問題**

- 修復了使用 V3 API（io.Schema）撰寫的外掛（如 ComfyUI-qwenmultiangle）控件不翻譯的問題
- **根因**：V3 節點常為控件宣告英文 `display_name`（如 name 為 `horizontal_angle`、label 為 `Horizontal Angle`），舊的已翻譯判定將「label ≠ name」一律視為原生翻譯而跳過
- **方案**：`isAlreadyTranslated` 增加正規化比對，label 僅是 name 的美化形式（大小寫/空格/底線/連字號差異）時不視為已翻譯

**修復：恆等翻譯條目污染已翻譯判定集合**

- 修復了個別控件（如 `cfg`）在所有節點上都無法翻譯的問題
- **根因**：某些翻譯檔案存在「恆等翻譯」條目（如 `"cfg": "cfg"`），其值被加入 `translatedValueSet` 後，控件英文原名被誤判為「已翻譯文字」，全域阻斷該名稱的翻譯
- **方案**：建立判定集合時跳過值與鍵相同的條目

**翻譯檔案修正**

- 修正 ComfyUI-LTXVideo 翻譯檔案中的鍵名拼寫錯誤（`perturb_atttn`→`perturb_attn`、`cross_atttn`→`cross_attn`、`quantize_fnn`→`quantize_ffn`）
- 補充 ComfyUI-qwenmultiangle 翻譯檔案遺失的控件真實名稱鍵（`target_language`、`prompt`）

### 2026-04-08

**修復：右鍵選單功能失效問題**

- 修復了翻譯開啟後，輸出埠右鍵選單的「中斷連線」「重新命名埠」等操作無回應的嚴重 Bug
- **根因**：LiteGraph 底層透過 `value.content` 英文文字比對來分派回呼動作，翻譯後比對失敗
- **方案**：實作回呼包裝（Callback Wrapping）機制，在回呼執行瞬間暫時恢復英文、執行後恢復原文，兼顧翻譯顯示與功能正確性
- 同時包裝 `value.callback`（獨立回呼）和 `options.callback`（共用回呼）兩種模式
- 增加 `_originalContent` 多次翻譯覆蓋保護，防止畫布選單經過兩次翻譯管線後原始值遺失

**修復：DOM 翻譯破壞事件綁定問題**

- 修復了 `replaceText` 中 `innerText` 賦值摧毀子元素及 Vue/PrimeVue 事件監聽器的問題
- **方案**：增加葉節點檢查 `target.children.length === 0`，僅對無子元素的節點執行 `innerText` 賦值

### 2025-12-20

**重新命名**

- 外掛名稱從 `ComfyUI-Translation-node` 更名為 `ComfyUI-Chinese-Translation`
- 顯示名稱從「翻譯節點」改為「中文翻譯」，更符合外掛定位

**功能增強**

- 改版為支援多國語言檔案架構（版本 2.0）
- 新增設定面板，可在 ComfyUI 設定中配置語言和按鈕樣式
- 新增原生低調 UI 樣式選項
- 修復重啟後圖示設定失效問題（感謝社群成員「幻影」回饋）

---

## 社群與支持

**作者首頁**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **哔哩哔哩**：[猪的飞行梦](https://space.bilibili.com/2114638644)
- **小紅書**：猪的飞行梦

**交流群**

- **ComfyUI 交流 QQ 群**：`202018000`

**回饋與貢獻**

- **問題回饋**：[GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **貢獻翻譯**：歡迎提交 PR 補充翻譯檔案

**支持作者**

覺得外掛不錯的話，歡迎按個 ⭐ Star 和支持作者：

- **贊助**：
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## 開源許可

本專案基於 [MIT License](LICENSE) 開源。

Copyright (c) 2025 猪的飞行梦

任何人都可以自由複製、修改和散佈本專案，但需保留原始版權聲明。詳見 [LICENSE](LICENSE) 檔案。

---

## 免責聲明

本翻譯作品及分享內容聲明如下：

**非商業性質**

本翻譯為個人無償行為，未收取任何報酬或商業利益，僅用於學習交流與知識分享。

**準確性不保證**

翻譯內容力求忠於原文，但不保證翻譯的準確性、完整性、即時性或適用性。任何因使用或依賴本翻譯內容而產生的風險與後果，由使用者自行承擔。

**原始來源歸屬**

本翻譯所依據的原始材料（包括但不限於文字、圖片、影片等）之版權屬於原作者或原始權利人所有。本翻譯不主張對原始內容的任何權利。

**建議參考原文**

若涉及重要決策、法律效力、技術實作或專業判斷等情形，請務必查閱並依賴官方原始版本，而不应以本翻譯作為依據。

**權利保留**

若原始權利人認為本翻譯侵犯其合法權益，請及時聯繫，本人將及時刪除或處理。

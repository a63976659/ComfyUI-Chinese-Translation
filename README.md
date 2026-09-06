# ComfyUI-Chinese-Translation

**ComfyUI 中文汉化插件** — 全面、智能、兼容的 ComfyUI 界面中文翻译解决方案。

[![GitHub](https://img.shields.io/github/stars/a63976659/ComfyUI-Chinese-Translation?style=flat&logo=github)](https://github.com/a63976659/ComfyUI-Chinese-Translation)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> 作者：**猪的飞行梦**
>
> 本项目基于 [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) 和 [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) 进行的修改，特别感谢大佬们对开源社区的杰出贡献。此项目将持续保持开源。

---

## 目录

- [插件简介](#插件简介)
- [核心特性](#核心特性)
- [效果展示](#效果展示)
- [安装方法](#安装方法)
- [使用说明](#使用说明)
- [翻译覆盖范围](#翻译覆盖范围)
- [技术架构](#技术架构)
- [注意事项](#注意事项)
- [更新记录](#更新记录)
- [社区与支持](#社区与支持)
- [开源许可](#开源许可)
- [免责声明](#免责声明)

---

## 插件简介

ComfyUI-Chinese-Translation 是一个专为 ComfyUI 设计的中文汉化插件。通过前后端协同工作，实现界面元素的实时中文翻译，覆盖节点、菜单、设置面板、管理器等所有可见文本，同时与 ComfyUI 官方原生翻译完美兼容。

### 为什么选择本插件？

| 特性 | 本插件 | 其他翻译插件 |
|------|--------|-------------|
| 官方翻译兼容 | ✅ 不覆盖官方已有翻译 | ❌ 可能冲突 |
| 右键菜单功能 | ✅ 翻译后功能正常 | ❌ 部分功能失效 |
| 新旧版 UI 兼容 | ✅ 双重按钮架构 | ❌ 仅支持单一版本 |
| 实时切换 | ✅ 无需重启 | ❌ 需要重启 |
| 用户自定义标题保护 | ✅ 不覆盖用户修改 | ❌ 可能被覆盖 |

---

## 核心特性

### 🎯 智能翻译系统

- **智能检测机制** — 自动识别已翻译文本，避免重复翻译和无限递归
- **原生翻译兼容** — 与 ComfyUI 官方中文翻译完美共存，互不干扰
- **上下文感知** — 根据不同界面元素类型（节点、菜单、控件等）采用最合适的翻译策略
- **回调安全保护** — 右键菜单翻译后所有功能（断开连接、重命名等）完全正常

### 🎨 美观的用户界面

- **胶囊分段控件** — 圆角胶囊形态的滑动开关，蓝色滑块在"开启/关闭"两段间平滑切换，现代感强
- **七彩动态效果** — 激活状态下显示流畅的彩虹渐变动画
- **灰色简约设计** — 未激活状态下采用优雅的灰色渐变
- **原生低调模式** — 可选与 ComfyUI 默认主题一致的低调配色
- **实时状态反馈** — 按钮文字和颜色实时反映当前翻译状态

### 🔧 灵活的翻译管理

- **实时切换** — 无需重启即可开启/关闭翻译
- **状态持久化** — 翻译设置自动保存，重启后保持状态
- **设置面板集成** — 在 ComfyUI 设置面板中可配置语言和按钮样式
- **新增翻译即生效** — 添加新的翻译文件后无需重启

### 🛡️ 稳定可靠

- **完善的异常捕获** — 所有关键操作都有错误处理
- **优雅降级** — 翻译失败时自动回退到原始文本
- **DOM 安全保护** — 翻译不会破坏 Vue/PrimeVue 组件的事件绑定
- **多版本兼容** — 同时支持 ComfyUI 新旧版本界面

---

## 效果展示

### 翻译开关按钮

<img width="900" height="180" alt="新版开" src="https://github.com/user-attachments/assets/0e6751fb-4196-4f09-9a64-818bda07f343" />

<img width="1000" height="180" alt="新版-关" src="https://github.com/user-attachments/assets/13810712-12df-4bea-bdfd-5e86f3d7686e" />

### 界面效果

<img width="800" height="400" alt="界面效果1" src="https://github.com/user-attachments/assets/aa4e4889-33b0-4860-b973-61baf1e7f57e" />
<img width="800" height="600" alt="界面效果2" src="https://github.com/user-attachments/assets/466e4509-af6a-4bb0-9e31-55b4cf7799e1" />
<img width="800" height="800" alt="界面效果3" src="https://github.com/user-attachments/assets/332d471d-85b0-4aa5-8aef-e9a674bd179d" />

---

## 安装方法

### 方法 1：Git 克隆（推荐）

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Chinese-Translation.git
```

安装完成后重启 ComfyUI。

#### 方法 1-新手详细介绍版：

1. 打开插件文件夹ComfyUI\Custom_nodes
2. Win11系统空白处右键，选择在终端中打开。Win10系统地址栏输入cmd回车。
3. 点击此网页右上角的code展开，复制地址。（也可以直接复制网址）
4. 在命令窗口输入git空格clone空格，粘贴地址并回车。输入参考`git clone https://github.com/a63976659/ComfyUI-Chinese-Translation.git`
5. 安装完成，重启ComfyUI。（安装失败，开启科学上网并重试）



### 方法 2：ComfyUI Manager

1. 打开 ComfyUI Manager
2. 数据改为：频道（远程）
3. 点击节点管理
4. 搜索 **猪的飞行梦**
5. 点击安装，重启 ComfyUI

### 方法 3：手动下载（不推荐，无法更新）

1. 在 GitHub 页面点击 **Code → Download ZIP**
2. 解压到 `ComfyUI/custom_nodes/ComfyUI-Chinese-Translation`
3. 重启 ComfyUI

---

## 使用说明

### 翻译开关

安装后界面会出现翻译开关按钮，点击即可切换翻译状态：

- **开启翻译** — 按钮显示 `翻译开启 (zh-CN)`，界面文字翻译为中文
- **关闭翻译** — 按钮显示 `翻译关闭 (原生)`，恢复原始英文界面

### 设置面板

在 ComfyUI 设置中提供两个配置项：

| 设置项 | 说明 | 选项 |
|-------|------|------|
| 🌐 翻译语言设置 | 选择翻译语言 | zh-CN（默认）等 |
| 🎨 翻译开关样式 | 选择开关外观，切换后实时重绘无需刷新 | pill (胶囊分段) / gradient (七彩渐变) / plain (原生低调) |

> 💡 **胶囊分段（推荐）**：圆角胶囊形态，蓝色高亮滑块覆盖当前状态分段。**点击蓝色滑块**即可滑动到另一侧完成切换，选择后立即保存到配置文件，重启 ComfyUI 后依然保持。

### 按钮样式说明

| 样式 | 开启效果 | 关闭效果 | 适用场景 |
|-----|---------|---------|----------|
| **胶囊分段** | 蓝色滑块覆盖"开启"段，白色粗体文字 | 蓝色滑块滑至"关闭"段，灰色文字 | 现代简洁，状态一目了然 |
| **七彩渐变** | 彩虹流动动画，白色粗体 | 灰色流动动画，深色粗体 | 希望直观醒目 |
| **原生低调** | ComfyUI 主题色背景 | 深色背景，灰色文字 | 希望融入界面 |

> **胶囊分段交互说明**：仅蓝色高亮滑块是切换触发点——点击后滑块先播放滑动动画（约 300ms）再保存并刷新页面；灰色文字分段仅作状态标签，点击无反应属设计行为。

---

## 翻译覆盖范围

### 翻译内容

| 类别 | 覆盖内容 | 状态 |
|------|---------|------|
| **节点名称** | 所有工作流节点的标题和显示名称 | ✅ |
| **节点属性** | 输入/输出端口、控件标签、描述信息 | ✅ |
| **菜单系统** | 主菜单、右键菜单、上下文菜单 | ✅ |
| **设置面板** | ComfyUI 设置对话框 | ✅ |
| **管理器** | ComfyUI Manager 界面 | ✅ |
| **模版库** | 工作流模版名称 | ✅ |
| **界面元素** | 按钮、标签、工具提示、搜索框 | ✅ |
| **队列信息** | 队列大小等动态文本 | ✅ |

### 翻译文件结构

```
zh-CN/
├── Nodes/          # 节点翻译（标题、输入、输出、控件）
│   └── internal.json
├── Categories/     # 节点分类翻译
│   ├── Internal.json
│   └── Other.json
└── Menus/          # 菜单和界面翻译
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

### 添加自定义翻译

在 `zh-CN/Nodes/` 目录下创建 JSON 文件即可：

```json
{
  "YourNodeClassName": {
    "title": "节点中文名称",
    "inputs": {
      "input_name": "输入名翻译"
    },
    "outputs": {
      "output_name": "输出名翻译"
    },
    "widgets": {
      "widget_name": "控件名翻译"
    }
  }
}
```

> **编写提示**
>
> - `widgets` 的键必须使用控件的**真实名称**（源码中的参数名，如 `target_language`），而不是界面显示的 display_name（如 `Target Language`）。对于 V3 API（io.Schema）插件，建议真实名称与 display_name 两种键都写上，兼容性最佳
> - 请勿添加"恒等翻译"（值与键相同的条目，如 `"cfg": "cfg"`），此类条目没有翻译意义
> - 注意核对键名拼写，键名与源码不一致（如 `perturb_atttn` 多打一个 t）会导致该控件翻译不生效

在 `zh-CN/Menus/` 目录下创建 JSON 文件即可添加菜单翻译：

```json
{
  "English Menu Text": "中文菜单文本",
  "Another Item": "另一个项目"
}
```

> 添加翻译文件后无需重启 ComfyUI，切换翻译开关即可生效。

---

## 技术架构

### 整体架构

```
┌──────────────────────────────────────────────────────┐
│                    ComfyUI 主程序                      │
│                                                        │
│  Python 后端 (__init__.py)     前端 JS (js/)           │
│  ├─ HTTP API 路由              ├─ main.js (翻译引擎)   │
│  ├─ 翻译数据编译               ├─ MenuTranslate.js     │
│  └─ 配置持久化                 └─ utils.js (工具函数)  │
│         │                             │                │
│         ▼                             ▼                │
│   zh-CN/ 翻译数据              MutationObserver        │
│   ├─ Nodes/*.json              实时 DOM 翻译           │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### 核心技术

| 技术 | 说明 |
|------|------|
| **回调包装 (Callback Wrapping)** | 翻译右键菜单文本的同时保护底层回调的 content 匹配逻辑 |
| **双重按钮架构** | 同时兼容旧版 `.comfy-menu` 和新版 `.comfyui-menu` 两套 UI |
| **MutationObserver 监听** | 实时检测 DOM 变化，自动翻译新出现的界面元素 |
| **translatedValueSet** | 使用 Set 数据结构 O(1) 判断文本是否已翻译，避免重复处理 |
| **叶子节点保护** | `innerText` 仅对无子元素的节点赋值，保护 Vue 事件绑定 |
| **Gzip 压缩传输** | 翻译数据通过 Gzip 压缩传输，减少网络开销 |

> 完整技术细节请参考 [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## 注意事项

### 兼容性

- **翻译插件冲突** — 本插件会和其他翻译插件冲突（如 AIGODLIKE-ComfyUI-Translation），请卸载其他翻译插件后使用
- **已知冲突插件** — `ComfyUI Browser` 可能存在兼容性问题
- **浏览器支持** — 推荐使用 Chrome、Edge、360 浏览器，其他浏览器未充分测试

### 环境要求

| 组件 | 要求 |
|------|------|
| ComfyUI | 最新版（兼容新旧版本 UI） |
| Python | 3.8+ |
| 浏览器 | Chrome / Edge（推荐） |

---

## 更新记录

### 2026-09-07

- 修复侧边栏「工作流」列表里自己起的工作流名字被误翻译成中文的问题，现在会原样保留

### 2026-08-20

- 新增「胶囊分段」翻译开关样式，蓝色滑块在开启和关闭之间平滑滑动，状态一目了然

### 2026-07-27

**修复：V3 API 节点控件翻译失效问题**

- 修复了使用 V3 API（io.Schema）编写的插件（如 ComfyUI-qwenmultiangle）控件不翻译的问题
- **根因**：V3 节点常为控件声明英文 `display_name`（如 name 为 `horizontal_angle`、label 为 `Horizontal Angle`），旧的已翻译判定将"label ≠ name"一律视为原生翻译而跳过
- **方案**：`isAlreadyTranslated` 增加归一化比对，label 仅是 name 的美化形式（大小写/空格/下划线/连字符差异）时不视为已翻译

**修复：恒等翻译条目污染已翻译判定集合**

- 修复了个别控件（如 `cfg`）在所有节点上都无法翻译的问题
- **根因**：某些翻译文件存在"恒等翻译"条目（如 `"cfg": "cfg"`），其值被加入 `translatedValueSet` 后，控件英文原名被误判为"已翻译文本"，全局阻断该名称的翻译
- **方案**：构建判定集合时跳过值与键相同的条目

**翻译文件修正**

- 修正 ComfyUI-LTXVideo 翻译文件中的键名拼写错误（`perturb_atttn`→`perturb_attn`、`cross_atttn`→`cross_attn`、`quantize_fnn`→`quantize_ffn`）
- 补充 ComfyUI-qwenmultiangle 翻译文件缺失的控件真实名称键（`target_language`、`prompt`）

### 2026-04-08

**修复：右键菜单功能失效问题**

- 修复了翻译开启后，输出接口右键菜单的「断开连接」「重命名接口」等操作无响应的严重 Bug
- **根因**：LiteGraph 底层通过 `value.content` 英文文本匹配来分发回调动作，翻译后匹配失败
- **方案**：实现回调包装（Callback Wrapping）机制，在回调执行瞬间临时恢复英文、执行后恢复中文，兼顾翻译显示与功能正确性
- 同时包装 `value.callback`（独立回调）和 `options.callback`（共享回调）两种模式
- 增加 `_originalContent` 多次翻译覆盖保护，防止画布菜单经过两次翻译管道后原始值丢失

**修复：DOM 翻译破坏事件绑定问题**

- 修复了 `replaceText` 中 `innerText` 赋值摧毁子元素及 Vue/PrimeVue 事件监听器的问题
- **方案**：增加叶子节点检查 `target.children.length === 0`，仅对无子元素的节点执行 `innerText` 赋值

### 2025-12-20

**重命名**

- 插件名称从 `ComfyUI-Translation-node` 更名为 `ComfyUI-Chinese-Translation`
- 显示名称从「翻译节点」改为「中文翻译」，更符合插件定位

**功能增强**

- 改版为支持多国语言文件架构（版本 2.0）
- 新增设置面板，可在 ComfyUI 设置中配置语言和按钮样式
- 新增原生低调 UI 样式选项
- 修复重启后图标设置失效问题（感谢群友「幻影」反馈）

---

## 社区与支持

**作者主页**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **哔哩哔哩**：[猪的飞行梦](https://space.bilibili.com/2114638644)
- **小红书**：猪的飞行梦

**交流群**

- **ComfyUI 交流 QQ 群**：`202018000`

**反馈与贡献**

- **问题反馈**：[GitHub Issues](https://github.com/a63976659/ComfyUI-Chinese-Translation/issues)
- **贡献翻译**：欢迎提交 PR 补充翻译文件

**支持作者**

如果觉得插件不错，欢迎点个 ⭐ Star 和支持作者：

![赞赏码](https://github.com/user-attachments/assets/0b1f7fc4-7820-4964-a521-8e2370642e26)

---

## 开源许可

本项目基于 [MIT License](LICENSE) 开源。

Copyright (c) 2025 猪的飞行梦

任何人都可以自由复制、修改和分发本项目，但需保留原始版权声明。详见 [LICENSE](LICENSE) 文件。

---

## 免责声明

本翻译作品及分享内容声明如下：

**非商业性质**

本翻译为个人无偿行为，未收取任何报酬或商业利益，仅用于学习交流与知识分享。

**准确性不保证**

翻译内容力求忠实于原文，但不保证翻译的准确性、完整性、时效性或适用性。任何因使用或依赖本翻译内容而产生的风险与后果，由使用者自行承担。

**原始来源归属**

本翻译所依据的原始材料（包括但不限于文字、图片、视频等）之版权归原作者或原始权利人所有。本翻译不主张对原始内容的任何权利。

**建议参考原文**

若涉及重要决策、法律效力、技术实现或专业判断等情形，请务必查阅并依赖官方原始版本，而不应以本翻译作为依据。

**权利保留**

若原始权利人认为本翻译侵犯其合法权益，请及时联系，本人将及时删除或处理。

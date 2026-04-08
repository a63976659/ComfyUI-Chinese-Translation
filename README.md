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
| 🎨 翻译按钮样式 | 选择按钮外观 | 七彩渐变 / 原生低调 |

### 按钮样式说明

| 样式 | 开启效果 | 关闭效果 | 适用场景 |
|-----|---------|---------|---------|
| **七彩渐变** | 彩虹流动动画，白色粗体 | 灰色流动动画，深色粗体 | 希望直观醒目 |
| **原生低调** | ComfyUI 主题色背景 | 深色背景，灰色文字 | 希望融入界面 |

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

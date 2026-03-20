"""
ComfyUI-Translation 插件主初始化文件
主要功能：提供多语言翻译服务的后端API，管理翻译配置和资源文件
版本: 2.0 (多国语言版)
"""

import os
import json
import platform
import sys
import shutil
import atexit
import server
import folder_paths
from aiohttp import web
from pathlib import Path

# 插件版本信息
VERSION = "2.0"
# 插件名称
ADDON_NAME = "ComfyUI-Chinese-Translation"
# ComfyUI 主程序路径
COMFY_PATH = Path(folder_paths.__file__).parent
# 当前插件路径
CUR_PATH = Path(__file__).parent


def load_config():
    config_path = CUR_PATH.joinpath("config.json")
    default_config = {"translation_enabled": True, "locale": "zh-CN", "button_style": "gradient"}
    if config_path.exists():
        try:
            config_data = try_get_json(config_path)
            default_config.update(config_data)
        except Exception:
            pass
    return default_config

# 全局配置变量 - 存储翻译启用状态和当前语言
GLOBAL_CONFIG = load_config()


def try_get_json(path: Path):
    """尝试使用不同编码读取JSON文件"""
    for coding in ["utf-8", "gbk"]:
        try:
            return json.loads(path.read_text(encoding=coding))
        except Exception:
            continue
    return {}


def get_nodes_translation(locale):
    path = CUR_PATH.joinpath(locale, "Nodes")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US", "Nodes")
    if not path.exists():
        return {}
    translations = {}
    for jpath in path.glob("*.json"):
        translations.update(try_get_json(jpath))
    return translations


def get_category_translation(locale):
    cats = {}
    for cat_json in CUR_PATH.joinpath(locale, "Categories").glob("*.json"):
        cats.update(try_get_json(cat_json))
    path = CUR_PATH.joinpath(locale, "NodeCategory.json")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US", "NodeCategory.json")
    if path.exists():
        cats.update(try_get_json(path))
    return cats


def get_menu_translation(locale):
    menus = {}
    for menu_json in CUR_PATH.joinpath(locale, "Menus").glob("*.json"):
        menus.update(try_get_json(menu_json))
    path = CUR_PATH.joinpath(locale, "Menu.json")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US", "Menu.json")
    if path.exists():
        menus.update(try_get_json(path))
    return menus


def compile_translation(locale):
    nodes_translation = get_nodes_translation(locale)
    node_category_translation = get_category_translation(locale)
    menu_translation = get_menu_translation(locale)

    return json.dumps({
        "Nodes": nodes_translation,
        "NodeCategory": node_category_translation,
        "Menu": menu_translation
    }, ensure_ascii=False)


def compress_json(data, method="gzip"):
    if method == "gzip":
        import gzip
        return gzip.compress(data.encode("utf-8"))
    return data


@server.PromptServer.instance.routes.get("/translation_node/get_locales")
async def get_locales(request: web.Request):
    """
    API端点: 获取支持的语言列表
    扫描插件目录，返回所有包含语言文件的文件夹名称
    """
    locales = []
    for item in CUR_PATH.iterdir():
        if item.is_dir() and item.name not in [".git", "js", "__pycache__"]:
            # 简单判断该目录下是否有 Nodes, Categories 或 Menu.json
            if item.joinpath("Nodes").exists() or item.joinpath("Menu.json").exists() or item.joinpath("NodeCategory.json").exists():
                locales.append(item.name)
    if not locales:
        locales = ["en_US", "zh-CN"]
    return web.Response(status=200, body=json.dumps(locales), headers={"Content-Type": "application/json"})


@server.PromptServer.instance.routes.post("/translation_node/get_translation")
async def get_translation(request: web.Request):
    post = await request.post()
    locale = post.get("locale", GLOBAL_CONFIG.get("locale", "zh-CN"))
    accept_encoding = request.headers.get("Accept-Encoding", "")
    json_data = "{}"
    headers = {}

    current_enabled = GLOBAL_CONFIG.get("translation_enabled", True)
    if not current_enabled:
        return web.Response(status=200, body=json_data, headers=headers)

    try:
        json_data = compile_translation(locale)
        if "gzip" in accept_encoding:
            json_data = compress_json(json_data, method="gzip")
            headers["Content-Encoding"] = "gzip"
    except Exception:
        pass

    return web.Response(status=200, body=json_data, headers=headers)


@server.PromptServer.instance.routes.get("/translation_node/get_config")
async def get_config(request: web.Request):
    return web.Response(status=200, body=json.dumps(GLOBAL_CONFIG), headers={"Content-Type": "application/json"})


@server.PromptServer.instance.routes.post("/translation_node/set_config")
async def set_config(request: web.Request):
    try:
        post = await request.post()
        enabled = post.get("translation_enabled", "true").lower() == "true"
        locale = post.get("locale", "zh-CN")
        button_style = post.get("button_style", "gradient") # 获取样式配置

        config_data = {"translation_enabled": enabled, "locale": locale, "button_style": button_style}
        config_path = CUR_PATH.joinpath("config.json")

        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(config_data, f, indent=2, ensure_ascii=False)

        global GLOBAL_CONFIG
        GLOBAL_CONFIG = config_data

        return web.Response(status=200, body=json.dumps({"success": True, "config": config_data}), headers={"Content-Type": "application/json"})
    except Exception as e:
        return web.Response(status=500, body=json.dumps({"success": False, "error": str(e)}), headers={"Content-Type": "application/json"})


def rmtree(path: Path):
    if not path.exists():
        return
    if Path(path.resolve()).as_posix() != path.as_posix():
        path.unlink()
        return
    if path.is_file():
        path.unlink()
    elif path.is_dir():
        if path.name == ".git":
            if platform.system() == "darwin":
                from subprocess import call
                call(['rm', '-rf', path.as_posix()])
            elif platform.system() == "Windows":
                os.system(f'rd/s/q "{path.as_posix()}"')
            return
        for child in path.iterdir():
            rmtree(child)
        try:
            path.rmdir()
        except BaseException:
            pass


def register():
    import nodes
    translation_node_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    if hasattr(nodes, "EXTENSION_WEB_DIRS"):
        rmtree(translation_node_ext_path)
        return
    
    try:
        if os.name == "nt":
            try:
                import _winapi
                _winapi.CreateJunction(CUR_PATH.as_posix(), translation_node_ext_path.as_posix())
            except WindowsError:
                shutil.copytree(CUR_PATH.as_posix(), translation_node_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
        else:
            shutil.copytree(CUR_PATH.as_posix(), translation_node_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
    except Exception:
        pass


def unregister():
    translation_node_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    try:
        rmtree(translation_node_ext_path)
    except BaseException:
        pass

register()
atexit.register(unregister)

NODE_CLASS_MAPPINGS = {}
WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "WEB_DIRECTORY"]
__version__ = VERSION
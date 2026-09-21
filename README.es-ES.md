<div align="center">

# 🌐 ComfyUI-Global-Translation

**Una solución de traducción multilingüe completa, inteligente y compatible para la interfaz de ComfyUI**

> Un complemento de traducción en tiempo real que combina front-end y back-end: cubre nodos, menús, el panel de ajustes, el gestor y todo texto visible, en perfecta compatibilidad con la traducción nativa oficial de ComfyUI.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#uso)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · **Español** · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Autor: **猪的飞行梦** — Este proyecto es una modificación basada en [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) y [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation). Agradecimiento especial a sus autores por su destacada contribución a la comunidad de código abierto. Este proyecto seguirá siendo de código abierto.

</div>

---

## Índice

- [Descripción general](#descripción-general)
- [Características principales](#características-principales)
- [Muestra](#muestra)
- [Instalación](#instalación)
- [Uso](#uso)
- [Alcance de la traducción](#alcance-de-la-traducción)
- [Arquitectura](#arquitectura)
- [Notas](#notas)
- [Registro de cambios](#registro-de-cambios)
- [Comunidad y soporte](#comunidad-y-soporte)
- [Licencia](#licencia)
- [Aviso legal](#aviso-legal)

---

## Descripción general

ComfyUI-Global-Translation es un complemento de traducción diseñado para ComfyUI. Mediante la colaboración entre front-end y back-end, realiza una traducción de la interfaz en tiempo real que cubre nodos, menús, el panel de ajustes, el gestor y todo texto visible, a la vez que coexiste perfectamente con la traducción nativa oficial de ComfyUI. El idioma de traducción sigue automáticamente el ajuste de idioma oficial de ComfyUI (Ajustes → General → `Comfy.Locale`); los textos de interfaz del propio complemento admiten 15 idiomas.

### ¿Por qué elegir este complemento?

| Característica | Este complemento | Otros complementos de traducción |
|------|--------|-------------|
| Compatible con traducción oficial | ✅ No sobrescribe las traducciones oficiales existentes | ❌ Puede entrar en conflicto |
| Funciones del menú contextual | ✅ Siguen funcionando tras traducir | ❌ Algunas funciones fallan |
| Compatible con UI antigua y nueva | ✅ Arquitectura de doble botón | ❌ Solo una versión |
| Cambio en tiempo real | ✅ Sin reiniciar | ❌ Requiere reiniciar |
| Protección de títulos personalizados | ✅ No sobrescribe los cambios del usuario | ❌ Pueden sobrescribirse |

---

## Características principales

### 🎯 Sistema de traducción inteligente

- **Detección inteligente** — reconoce automáticamente el texto ya traducido, evitando traducciones repetidas y recursión infinita
- **Compatibilidad nativa** — coexiste perfectamente con la traducción oficial de ComfyUI sin interferencias mutuas
- **Conciencia de contexto** — aplica la estrategia más adecuada según el tipo de elemento (nodos, menús, widgets, etc.)
- **Fusión inteligente de datos** — cuando varios archivos de traducción contienen el mismo nodo, las entradas se combinan de forma complementaria en lugar de sobrescribirse
- **Traducción de paneles personalizados** — los paneles creados dentro de los nodos (botones, etiquetas, desplegables, textos de ayuda, ventanas emergentes, etc.) también se traducen automáticamente
- **Protección de devoluciones de llamada** — tras traducir el menú contextual, todas las funciones (desconectar, renombrar, etc.) siguen funcionando correctamente

### 🎨 Interfaz de usuario atractiva

- **Control tipo píldora segmentada** — un interruptor redondeado tipo píldora con un control deslizante azul que se desliza suavemente entre los segmentos "activado/desactivado", aspecto moderno
- **Efecto arcoíris** — en estado activo muestra una fluida animación de degradado de arcoíris
- **Diseño gris minimalista** — en estado inactivo emplea un elegante degradado gris
- **Modo nativo discreto** — opcionalmente una paleta sobria acorde al tema predeterminado de ComfyUI
- **Retroalimentación en tiempo real** — el texto y el color del botón reflejan al instante el estado actual de la traducción

### 🔧 Gestión flexible de la traducción

- **Cambio en tiempo real** — activar/desactivar la traducción sin reiniciar
- **Estado persistente** — los ajustes se guardan automáticamente y sobreviven a los reinicios
- **Integración en el panel de ajustes** — configurar el estilo del interruptor y la traducción de opciones desplegables en los ajustes de ComfyUI (el idioma sigue el ajuste oficial de ComfyUI)
- **Interruptor por complemento** — un gestor integrado permite desactivar la traducción de complementos concretos
- **Añadir y aplicar al instante** — los nuevos archivos de traducción surten efecto sin reiniciar

### 🛡️ Estable y fiable

- **Manejo robusto de excepciones** — todas las operaciones críticas están protegidas
- **Degradación elegante** — ante un fallo de traducción se vuelve automáticamente al texto original
- **Protección del DOM** — la traducción no rompe el enlace de eventos de los componentes Vue/PrimeVue
- **Compatibilidad multi-versión** — admite las interfaces antigua y nueva de ComfyUI

---

## Muestra

### Botones de activación de la traducción

<img width="900" height="180" alt="nuevo-activado" src="https://github.com/user-attachments/assets/0e6751fb-4196-4f09-9a64-818bda07f343" />

<img width="1000" height="180" alt="nuevo-desactivado" src="https://github.com/user-attachments/assets/13810712-12df-4bea-bdfd-5e86f3d7686e" />

### Vista de la interfaz

<img width="800" height="400" alt="vista1" src="https://github.com/user-attachments/assets/aa4e4889-33b0-4860-b973-61baf1e7f57e" />
<img width="800" height="600" alt="vista2" src="https://github.com/user-attachments/assets/466e4509-af6a-4bb0-9e31-55b4cf7799e1" />
<img width="800" height="800" alt="vista3" src="https://github.com/user-attachments/assets/332d471d-85b0-4aa5-8aef-e9a674bd179d" />

---

## Instalación

### Método 1: clonar con Git (recomendado)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Reinicie ComfyUI tras la instalación.

#### Método 1 — guía detallada para principiantes:

1. Abra la carpeta de complementos `ComfyUI\custom_nodes`
2. En Win11, clic derecho en un área vacía y elija "Abrir en terminal". En Win10, escriba `cmd` en la barra de direcciones y pulse Enter.
3. Pulse **Code** arriba a la derecha de esta página y copie la dirección (también puede copiar la URL)
4. En la terminal escriba `git clone `, pegue la dirección y pulse Enter. Ejemplo: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Instalación completa, reinicie ComfyUI. (Si falla, active un proxy/VPN y reinténtelo.)



### Método 2: ComfyUI Manager

1. Abra ComfyUI Manager
2. Cambie los datos a: Canal (remoto)
3. Pulse Gestor de nodos
4. Busque **猪的飞行梦**
5. Pulse Instalar y reinicie ComfyUI

### Método 3: descarga manual (no recomendada, sin actualizaciones)

1. En la página de GitHub pulse **Code → Download ZIP**
2. Descomprima en `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. Reinicie ComfyUI

---

## Uso

### Interruptor de traducción

Tras la instalación aparece un botón de activación en la interfaz; púlselo para cambiar el estado de la traducción:

- **Traducción activada** — el botón muestra "traducción activada" y el texto de la interfaz se traduce al idioma actual (sigue el ajuste de idioma oficial de ComfyUI)
- **Traducción desactivada** — el botón muestra "traducción desactivada" y se restaura la interfaz inglesa original

### Idioma de traducción

El idioma de traducción ya no se configura dentro del complemento; **sigue automáticamente el ajuste de idioma oficial de ComfyUI** (Ajustes → General → Idioma / `Comfy.Locale`):

- Coincide con todos los idiomas admitidos oficialmente: chino simplificado, chino tradicional, inglés, japonés, coreano, ruso, francés, alemán, español, italiano, portugués (Brasil), turco, árabe, persa, hebreo; los idiomas no cubiertos recurren al inglés
- Tras cambiar el idioma oficial en los ajustes de ComfyUI, la página se actualiza automáticamente; la traducción y los textos del complemento se aplican a la vez, sin reiniciar manualmente

### Panel de ajustes

En ComfyUI Ajustes → «🌐 Ajustes de traducción» hay dos opciones. Los textos de interfaz se localizan al idioma actual (15 idiomas) con un orden de secciones coherente en todos los idiomas:

| Opción | Descripción | Elecciones |
|-------|------|------|
| 🎨 Estilo del interruptor | Elija la apariencia; se redibuja al instante sin recargar | pill (píldora segmentada) / gradient (arcoíris) / plain (nativo discreto) |
| 📋 Opciones desplegables | Si se traduce también el texto de las opciones de los desplegables COMBO | Activado / Desactivado (recarga automática al cambiar) |

Debajo de las opciones hay también un panel **Gestor de traducción de complementos**: lista todos los complementos con archivos de traducción — desmarque uno para desactivar su traducción; la página se recarga al guardar.

> 💡 **Píldora segmentada (recomendada)**: forma redondeada con un control deslizante azul resaltado sobre el estado actual. **Pulse el control deslizante azul** para que se deslice al otro lado; la elección se guarda de inmediato en el archivo de configuración y persiste tras reiniciar ComfyUI.

### Referencia de estilos de botón

| Estilo | Activado | Desactivado | Ideal para |
|-----|---------|---------|----------|
| **Píldora segmentada** | Control azul sobre el segmento "activado", texto blanco en negrita | Control azul deslizado a "desactivado", texto gris | Moderno y minimalista, estado de un vistazo |
| **Degradado arcoíris** | Animación de arcoíris fluido, blanco en negrita | Animación gris fluida, texto oscuro en negrita | Quieres algo llamativo |
| **Nativo discreto** | Fondo del color del tema de ComfyUI | Fondo oscuro, texto gris | Quieres integrarte en la interfaz |

> **Interacción de la píldora segmentada**: solo el control deslizante azul resaltado activa el cambio — al pulsarlo primero reproduce una animación de deslizamiento (~300 ms), luego guarda y recarga la página; el segmento de texto gris es solo una etiqueta de estado y que no responda al clic es un comportamiento intencionado.

---

## Alcance de la traducción

### Qué se traduce

| Categoría | Cobertura | Estado |
|------|---------|------|
| **Nombres de nodos** | Títulos y nombres visibles de todos los nodos del flujo de trabajo | ✅ |
| **Propiedades de nodos** | Puertos de entrada/salida, etiquetas de widgets, descripciones | ✅ |
| **Menús** | Menú principal, menú contextual, menús de clic derecho | ✅ |
| **Panel de ajustes** | El cuadro de diálogo de ajustes de ComfyUI | ✅ |
| **Gestor** | La interfaz de ComfyUI Manager | ✅ |
| **Biblioteca de plantillas** | Nombres de plantillas de flujo de trabajo | ✅ |
| **Elementos de interfaz** | Botones, etiquetas, textos de ayuda, cuadro de búsqueda | ✅ |
| **Paneles personalizados** | Botones, etiquetas, desplegables, textos de ayuda, ventanas emergentes en paneles DOM creados por nodos | ✅ |
| **Información de cola** | Texto dinámico como el tamaño de la cola | ✅ |

### Estructura de los archivos de traducción

```
zh-CN/
├── Nodes/          # Traducción de nodos (título, entradas, salidas, widgets, paneles personalizados)
│   └── internal.json
├── Categories/     # Traducción de categorías de nodos
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Traducción de menús e interfaz
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Los demás directorios de idioma (`zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) comparten la misma estructura y se cargan según el idioma actual; `en-US/` sirve para devolver al inglés los nodos de complementos no chinos.

### Añadir traducciones personalizadas

Cree un archivo JSON bajo `zh-CN/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Nombre visible del nodo",
    "inputs": {
      "input_name": "traducción del nombre de entrada"
    },
    "outputs": {
      "output_name": "traducción del nombre de salida"
    },
    "widgets": {
      "widget_name": "traducción del nombre del widget"
    },
    "ui": {
      "English text in panel": "texto traducido en el panel"
    }
  }
}
```

> **Consejos de redacción**
>
> - Las claves de `widgets` deben usar el **nombre real** del widget (el nombre del parámetro en el código fuente, p. ej. `target_language`), no el display_name mostrado en pantalla (p. ej. `Target Language`). Para complementos de API V3 (io.Schema), escriba ambas claves —nombre real y display_name— para la mejor compatibilidad
> - El campo `ui` traduce el texto inglés dentro de los paneles personalizados del nodo (creados con `addDOMWidget`): la clave es el inglés mostrado en pantalla, el valor es la traducción
> - No añada "traducciones idénticas" (valor igual a la clave, p. ej. `"cfg": "cfg"`) — no tienen sentido
> - Revise la ortografía de las claves; una clave distinta del código fuente (p. ej. una `t` de más en `perturb_atttn`) hará que el widget no se traduzca en silencio

Cree un archivo JSON bajo `zh-CN/Menus/` para añadir traducciones de menús:

```json
{
  "English Menu Text": "texto de menú traducido",
  "Another Item": "otro elemento"
}
```

> Tras añadir archivos de traducción no hace falta reiniciar ComfyUI — alterne el interruptor de traducción para aplicarlos.

---

## Arquitectura

### Estructura general

```
┌──────────────────────────────────────────────────────┐
│                Programa principal ComfyUI             │
│                                                        │
│  Back-end Python (__init__.py)   Front JS (js/)        │
│  ├─ Rutas API HTTP              ├─ main.js (motor)     │
│  ├─ Compilación de traducción   ├─ MenuTranslate.js    │
│  └─ Persistencia de ajustes     └─ utils.js (ayudas)   │
│         │                             │                │
│         ▼                             ▼                │
│   Datos de traducción zh-CN/     MutationObserver      │
│   ├─ Nodes/*.json              traducción DOM en vivo  │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Técnicas clave

| Técnica | Descripción |
|------|------|
| **Envoltura de devoluciones de llamada (Callback Wrapping)** | Traduce el texto del menú contextual preservando la lógica de coincidencia `content` de la devolución subyacente |
| **Arquitectura de doble botón** | Admite tanto el antiguo `.comfy-menu` como el nuevo `.comfyui-menu` |
| **Vigilancia con MutationObserver** | Detecta cambios del DOM en tiempo real y traduce automáticamente los elementos recién aparecidos |
| **translatedValueSet** | Usa un Set para comprobar en O(1) si un texto ya está traducido, evitando procesamientos repetidos |
| **Protección de nodos hoja** | Asigna `innerText` solo a nodos sin hijos, protegiendo el enlace de eventos de Vue |
| **Transferencia Gzip** | Los datos de traducción se transfieren comprimidos con Gzip para reducir la carga de red |

> Para todos los detalles técnicos, consulte [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Notas

### Compatibilidad

- **Conflictos entre complementos de traducción** — este complemento entra en conflicto con otros complementos de traducción (p. ej. AIGODLIKE-ComfyUI-Translation); desinstálelos antes de usarlo
- **Complemento con conflicto conocido** — `ComfyUI Browser` puede tener problemas de compatibilidad
- **Navegadores admitidos** — se recomiendan Chrome, Edge y 360 Browser; los demás no se han probado a fondo

### Requisitos

| Componente | Requisito |
|------|------|
| ComfyUI | Última versión (compatible con UI antigua y nueva) |
| Python | 3.8+ |
| Navegador | Chrome / Edge (recomendado) |

---

## Registro de cambios

### 2026-09-21

**Añadidos árabe (ar-SA), persa (fa-IR) y hebreo (he-IL)**

- Traducciones completadas para tres idiomas RTL (de derecha a izquierda) que cubren nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `ar-SA` / `fa-IR` / `he-IL` para activarlos automáticamente

### 2026-09-20

**Añadido japonés (ja-JP)**

- Traducción al japonés completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `ja-JP`

**Añadido español (es-ES)**

- Traducción al español completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `es-ES`

**Añadido coreano (ko-KR)**

- Traducción al coreano completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `ko-KR`

**Añadido turco (tr-TR)**

- Traducción al turco completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `tr-TR`

**Añadido italiano (it-IT)**

- Traducción al italiano completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `it-IT`

**Añadido portugués de Brasil (pt-BR)**

- Traducción al portugués (Brasil) completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `pt-BR`

**Añadido alemán (de-DE)**

- Traducción al alemán completada que cubre nodos, categorías, menús y panel de ajustes; establezca el idioma oficial de ComfyUI en `de-DE`

### 2026-09-19

**El idioma sigue el ajuste oficial**

- Eliminada la opción "idioma de traducción" dentro del complemento; el idioma ahora sigue automáticamente el ajuste de idioma oficial de ComfyUI (`Comfy.Locale`)
- Tras cambiar el idioma oficial, la página se recarga automáticamente; la traducción y los textos del complemento se aplican a la vez, sin reiniciar manualmente

**Interfaz de configuración multilingüe y diseño unificado**

- Las etiquetas del interruptor y la interfaz de ajustes cubren 15 idiomas (incluidos el chino tradicional y los idiomas RTL árabe, persa y hebreo); los idiomas desconocidos recurren al inglés
- El orden de las secciones del panel de ajustes es coherente en todos los idiomas: estilo del interruptor → opciones desplegables → gestor de traducción; los encabezados de sección se traducen
- El panel "Gestor de traducción de complementos" ya no se retraduce mediante el diccionario y siempre coincide con el idioma actual de la interfaz
- La etiqueta del estado activado del interruptor elimina el sufijo `(código de idioma)`, conservando solo el texto

### 2026-09-12

- Corregida la pérdida de traducción cuando varios archivos contienen el mismo nodo; ahora se combinan de forma complementaria
- Añadida la traducción de paneles personalizados de nodos: botones, etiquetas, desplegables, textos de ayuda y ventanas emergentes ahora se traducen
- Corregidos los nombres de puerto que permanecían en inglés tras "convertir un widget en entrada"
- Añadido un guardián de traducción: los nodos creados después también reciben traducción
- Gracias a 石头 (Q:34720803) por la optimización

### 2026-09-07

- Corregido: en la lista "Flujos de trabajo" de la barra lateral, sus propios nombres de flujo se traducían por error; ahora se conservan tal cual

### 2026-08-20

- Añadido el estilo de interruptor "píldora segmentada", con un control deslizante azul que se desliza entre activado y desactivado para ver el estado de un vistazo

### 2026-07-27

**Corrección: la traducción de widgets de nodos de API V3 fallaba**

- Corregida la falta de traducción de widgets en complementos escritos con API V3 (io.Schema), p. ej. ComfyUI-qwenmultiangle
- **Causa**: los nodos V3 a menudo declaran un `display_name` inglés para un widget (name `horizontal_angle`, label `Horizontal Angle`); la antigua detección consideraba "label ≠ name" como traducción nativa y lo omitía
- **Solución**: `isAlreadyTranslated` añade una comparación normalizada — un label que no es más que una versión embellecida del name (diferencias de mayúsculas/espacios/guiones bajos/guiones) no se considera traducido

**Corrección: traducciones idénticas contaminaban el conjunto de textos traducidos**

- Corregido que ciertos widgets (p. ej. `cfg`) no se tradujeran en ningún nodo
- **Causa**: algunos archivos contenían "traducciones idénticas" (p. ej. `"cfg": "cfg"`); una vez su valor entraba en `translatedValueSet`, el nombre inglés se interpretaba erróneamente como "ya traducido" y bloqueaba globalmente la traducción de ese nombre
- **Solución**: al construir el conjunto, omitir las entradas cuyo valor es igual a su clave

**Correcciones en archivos de traducción**

- Corregidas erratas en las claves de ComfyUI-LTXVideo (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Añadidas claves de nombres reales de widgets que faltaban en ComfyUI-qwenmultiangle (`target_language`, `prompt`)

### 2026-04-08

**Corrección: funciones del menú contextual rotas**

- Corregido un grave error por el que, con la traducción activada, las acciones "desconectar" y "renombrar puerto" del menú contextual del puerto de salida dejaban de responder
- **Causa**: LiteGraph distribuye las devoluciones de llamada mediante coincidencia del `value.content` en inglés; tras traducir, la coincidencia fallaba
- **Solución**: se implementó la envoltura de devoluciones de llamada (Callback Wrapping) — el inglés se restaura temporalmente en el instante de ejecutar la devolución, y luego se repone la traducción, conciliando la visualización traducida y el funcionamiento correcto
- Envuelve tanto `value.callback` (individual) como `options.callback` (compartido)
- Añadida la protección `_originalContent` contra sobrescrituras por traducción múltiple, para que el menú del lienzo no pierda su valor original tras pasar dos veces por el flujo

**Corrección: la traducción del DOM rompía el enlace de eventos**

- Corregido que la asignación de `innerText` en `replaceText` destruyera elementos hijos y escuchadores de Vue/PrimeVue
- **Solución**: se añadió la comprobación de nodo hoja `target.children.length === 0`, asignando `innerText` solo a nodos sin hijos

### 2025-12-20

**Cambio de nombre**

- El complemento cambió de nombre de `ComfyUI-Translation-node` a `ComfyUI-Chinese-Translation`
- El nombre visible cambió de "Translation Node" a "中文翻译" para reflejar mejor el posicionamiento del complemento

**Mejoras**

- Remodelado a una arquitectura de archivos multilingüe (versión 2.0)
- Añadido un panel de ajustes para configurar idioma y estilo de botón en los ajustes de ComfyUI
- Añadida la opción de estilo de UI nativo discreto
- Corregida la pérdida de ajustes del icono tras reiniciar (gracias al miembro de la comunidad 幻影 por el informe)

---

## Comunidad y soporte

**Página del autor**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Grupo de la comunidad**

- **Grupo QQ de ComfyUI**: `202018000`

**Comentarios y contribución**

- **Informar de errores**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Contribuir con traducciones**: se aceptan PR que añadan archivos de traducción

**Apoyar al autor**

Si el complemento le resulta útil, considere dar una ⭐ Star y apoyar al autor:

- **Apadrinar**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Licencia

Este proyecto se publica como código abierto bajo la [Licencia MIT](LICENSE).

Copyright (c) 2025 猪的飞行梦

Cualquier persona es libre de copiar, modificar y distribuir este proyecto, siempre que conserve el aviso original de derechos de autor. Consulte el archivo [LICENSE](LICENSE) para más detalles.

---

## Aviso legal

Esta traducción y el contenido compartido están sujetos a lo siguiente:

**Carácter no comercial**

Esta traducción es una labor personal y no remunerada; no se recibió compensación ni beneficio comercial alguno. Se destina únicamente al aprendizaje, el intercambio y la difusión del conocimiento.

**Sin garantía de exactitud**

La traducción se esfuerza por ser fiel al original, pero no garantiza exactitud, integridad, oportunidad ni aptitud para un fin. Todo riesgo y consecuencia derivados del uso o de la confianza en esta traducción corren a cargo del usuario.

**Pertenencia de la fuente original**

Los derechos de autor de los materiales originales en los que se basa esta traducción (incluidos, entre otros, textos, imágenes y vídeos) pertenecen a sus respectivos autores o titulares originales. Esta traducción no reclama ningún derecho sobre el contenido original.

**Se recomienda consultar el original**

Para decisiones importantes, efectos legales, implementación técnica o juicio profesional, consulte y base su criterio en la versión original oficial, y no en esta traducción.

**Reserva de derechos**

Si un titular considera que esta traducción vulnera sus derechos legítimos, contácteme a la mayor brevedad y la eliminaré o gestionaré de inmediato.

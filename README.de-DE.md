<div align="center">

# 🌐 ComfyUI-Global-Translation

**Eine umfassende, intelligente und kompatible mehrsprachige Übersetzungslösung für die ComfyUI-Oberfläche**

> Ein Echtzeit-Übersetzungs-Plugin, das Frontend und Backend kombiniert: Es deckt Knoten, Menüs, das Einstellungsfenster, den Manager und jeden sichtbaren Text ab – voll kompatibel mit der offiziellen nativen Übersetzung von ComfyUI.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#verwendung)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · **Deutsch** · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Autor: **猪的飞行梦** — Dieses Projekt ist eine auf [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) und [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) basierende Modifikation. Besonderer Dank an diese Autoren für ihren herausragenden Beitrag zur Open-Source-Community. Dieses Projekt bleibt Open Source.

</div>

---

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Hauptfunktionen](#hauptfunktionen)
- [Vorschau](#vorschau)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Abdeckung der Übersetzung](#abdeckung-der-übersetzung)
- [Architektur](#architektur)
- [Hinweise](#hinweise)
- [Änderungsverlauf](#änderungsverlauf)
- [Community und Unterstützung](#community-und-unterstützung)
- [Lizenz](#lizenz)
- [Haftungsausschluss](#haftungsausschluss)

---

## Überblick

ComfyUI-Global-Translation ist ein für ComfyUI entwickeltes Übersetzungs-Plugin. Durch das Zusammenspiel von Frontend und Backend führt es eine Echtzeit-Übersetzung der Oberfläche durch und deckt Knoten, Menüs, das Einstellungsfenster, den Manager und jeden sichtbaren Text ab – bei perfektem Zusammenspiel mit der offiziellen nativen Übersetzung von ComfyUI. Die Übersetzungssprache folgt automatisch der offiziellen Spracheneinstellung von ComfyUI (Einstellungen → Allgemein → `Comfy.Locale`); die eigenen Oberflächentexte des Plugins unterstützen 15 Sprachen.

### Warum dieses Plugin?

| Funktion | Dieses Plugin | Andere Übersetzungs-Plugins |
|------|--------|-------------|
| Kompatibel mit offizieller Übersetzung | ✅ Überschreibt keine vorhandenen offiziellen Übersetzungen | ❌ Möglichweise Konflikte |
| Rechtsklick-Menü-Funktionen | ✅ Nach Übersetzung weiterhin funktionsfähig | ❌ Einige Funktionen brechen |
| Kompatibel mit alter & neuer UI | ✅ Doppelte Schaltflächen-Architektur | ❌ Nur eine Version |
| Echtzeit-Umschaltung | ✅ Ohne Neustart | ❌ Neustart erforderlich |
| Schutz benutzerdefinierter Titel | ✅ Überschreibt keine Benutzeränderungen | ❌ Könnte überschrieben werden |

---

## Hauptfunktionen

### 🎯 Intelligentes Übersetzungssystem

- **Intelligente Erkennung** — erkennt automatisch bereits übersetzten Text und vermeidet doppelte Übersetzung und unendliche Rekursion
- **Native Kompatibilität** — besteht friedlich neben der offiziellen ComfyUI-Übersetzung ohne gegenseitige Störung
- **Kontextbewusstsein** — wendet je nach Elementtyp (Knoten, Menüs, Widgets usw.) die passende Strategie an
- **Intelligentes Daten-Merging** — enthalten mehrere Übersetzungsdateien denselben Knoten, werden Einträge ergänzend zusammengeführt statt sich gegenseitig zu überschreiben
- **Übersetzung benutzerdefinierter Panels** — in Knoten erstellte Panels (Schaltflächen, Beschriftungen, Dropdowns, Hinweistexte, Popups usw.) werden ebenfalls automatisch übersetzt
- **Rückruf-Sicherheit** — nach Übersetzung des Rechtsklick-Menüs funktionieren alle Aktionen (Trennen, Umbenennen usw.) weiterhin vollständig

### 🎨 Ansprechende Benutzeroberfläche

- **Segmentierter Pillole-Schalter** — ein abgerundeter Pillole-Schalter mit blauem Slider, der sanft zwischen „An/Aus"-Segmenten wechselt, moderner Look
- **Regenbogen-Effekt** — im aktiven Zustand wird eine flüssige Regenbogen-Verlaufsanimation angezeigt
- **Reduziertes graues Design** — im inaktiven Zustand ein eleganter grauer Verlauf
- **Dezenter nativer Modus** — optional eine unaufdringliche Farbgebung passend zum ComfyUI-Standardthema
- **Echtzeit-Rückmeldung** — Schaltflächentext und -farbe spiegeln den aktuellen Übersetzungsstatus wider

### 🔧 Flexible Übersetzungsverwaltung

- **Echtzeit-Umschaltung** — Übersetzung ohne Neustart ein-/ausschalten
- **Dauerhafter Zustand** — Einstellungen werden automatisch gespeichert und überstehen Neustarts
- **Integration ins Einstellungsfenster** — Schalterstil und Dropdown-Übersetzung in den ComfyUI-Einstellungen konfigurierbar (Sprache folgt der offiziellen ComfyUI-Einstellung)
- **Plugin-weiter Schalter** — ein integrierter Manager ermöglicht das Deaktivieren der Übersetzung bestimmter Plugins
- **Sofort wirksam** — neue Übersetzungsdateien werden ohne Neustart übernommen

### 🛡️ Stabil und zuverlässig

- **Umfassende Fehlerbehandlung** — alle kritischen Vorgänge sind abgesichert
- **Anmutiger Rückfall** — bei Übersetzungsfehlern wird automatisch zum Originaltext zurückgekehrt
- **DOM-Schutz** — die Übersetzung zerstört keine Event-Bindings von Vue/PrimeVue-Komponenten
- **Mehrversions-Kompatibilität** — unterstützt alte und neue ComfyUI-Oberflächen

---

## Vorschau
Nur die Darstellungen auf Chinesisch und Englisch werden gezeigt; prüfen Sie andere Sprachen selbst nach dem Umschalten. Der Umschalter folgt der ComfyUI-Spracheinstellung.

### Übersetzungs-Schaltflächen

<img width="150" height="100" alt="zh-schalter-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="en-schalter-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="zh-schalter-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="en-schalter-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="zh-schalter-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="en-schalter-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Verwaltungsoberfläche

<img width="2000" height="1500" alt="einstellungsoberfläche" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="einstellungsoberfläche-en" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Installation

### Methode 1: Git-Klon (empfohlen)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Nach der Installation ComfyUI neu starten.

#### Methode 1 — ausführliche Anleitung für Anfänger:

1. Öffnen Sie den Plugin-Ordner `ComfyUI\custom_nodes`
2. Win11: Rechtsklick auf eine freie Fläche und „In Terminal öffnen" wählen. Win10: `cmd` in die Adressleiste eingeben und Enter.
3. Klicken Sie oben rechts auf dieser Seite auf **Code** und kopieren Sie die Adresse (auch die URL kopieren geht)
4. Geben Sie im Terminal `git clone ` ein, fügen Sie die Adresse ein und drücken Enter. Beispiel: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Fertig — ComfyUI neu starten. (Schlägt die Installation fehl, aktivieren Sie einen Proxy/VPN und versuchen Sie es erneut.)



### Methode 2: ComfyUI Manager

1. ComfyUI Manager öffnen
2. Datenquelle auf: Kanal (Entfernt) umstellen
3. Auf Knoten-Manager klicken
4. Nach **猪的飞行梦** suchen
5. Auf Installieren klicken und ComfyUI neu starten

### Methode 3: Manueller Download (nicht empfohlen, keine Updates)

1. Auf der GitHub-Seite auf **Code → Download ZIP** klicken
2. Nach `ComfyUI/custom_nodes/ComfyUI-Global-Translation` entpacken
3. ComfyUI neu starten

---

## Verwendung

### Übersetzungs-Schalter

Nach der Installation erscheint in der Oberfläche ein Übersetzungs-Schalter; klicken Sie ihn zum Umschalten:

- **Übersetzung an** — der Schalter zeigt „Übersetzung an", der Oberflächentext wird in die aktuelle Sprache übersetzt (folgt der offiziellen ComfyUI-Spracheneinstellung)
- **Übersetzung aus** — der Schalter zeigt „Übersetzung aus", die ursprüngliche englische Oberfläche wird wiederhergestellt

### Übersetzungssprache

Die Übersetzungssprache wird nicht mehr im Plugin eingestellt; sie **folgt automatisch der offiziellen Spracheneinstellung von ComfyUI** (Einstellungen → Allgemein → Sprache / `Comfy.Locale`):

- Alle offiziell unterstützten Sprachen werden zugeordnet: Vereinfachtes/Traditionelles Chinesisch, Englisch, Japanisch, Koreanisch, Russisch, Französisch, Deutsch, Spanisch, Italienisch, Portugiesisch (Brasilien), Türkisch, Arabisch, Persisch, Hebräisch; nicht abgedeckte Sprachen fallen auf Englisch zurück
- Nach dem Wechsel der offiziellen Sprache in den ComfyUI-Einstellungen lädt die Seite automatisch neu; Übersetzung und Plugin-Oberflächentexte greifen gleichzeitig, kein manueller Neustart nötig

### Einstellungsfenster

Unter ComfyUI Einstellungen → „🌐 Übersetzungseinstellungen" gibt es zwei Optionen. Die Oberflächentexte sind in die aktuelle Sprache lokalisiert (15 Sprachen) mit einheitlicher Abschnittsreihenfolge über alle Sprachen hinweg:

| Option | Beschreibung | Optionen |
|-------|------|------|
| 🎨 Schalterstil | Aussehen des Schalters wählen; wird live neu gezeichnet, ohne Neuladen | pill (segmentierte Pillole) / gradient (Regenbogen) / plain (dezent nativ) |
| 📋 Dropdown-Optionen | Ob auch Text in COMBO-Auswahllisten übersetzt wird | An / Aus (automatisches Neuladen nach Änderung) |

Unter den Optionen befindet sich zudem ein **Plugin-Übersetzungs-Manager**: Er listet alle Plugins mit Übersetzungsdateien — deaktivieren Sie die Übersetzung eines Plugins per Abwählen; nach dem Speichern lädt die Seite neu.

> 💡 **Segmentierte Pillole (empfohlen)**: abgerundete Form mit einem blau hervorgehobenen Slider über dem aktuellen Zustand. **Klicken Sie auf den blauen Slider**, damit er auf die andere Seite gleitet; die Wahl wird sofort in die Konfigurationsdatei gespeichert und bleibt nach einem Neustart von ComfyUI erhalten.

### Schaltflächen-Stilübersicht

| Stil | An | Aus | Geeignet für |
|-----|---------|---------|----------|
| **Segmentierte Pillole** | Blauer Slider über „An", fetter weißer Text | Blauer Slider auf „Aus" geschoben, grauer Text | Modern, schlicht, Zustand auf einen Blick |
| **Regenbogen-Verlauf** | Fließende Regenbogen-Animation, weiß fett | Fließende graue Animation, dunkel fett | Auffällig und direkt gewünscht |
| **Dezent nativ** | ComfyUI-Thema-Hintergrund | Dunkler Hintergrund, grauer Text | Sich in die Oberfläche einfügen |

> **Interaktion der segmentierten Pille**: Nur der blau hervorgehobene Slider löst das Umschalten aus — nach dem Klick spielt er zuerst eine Gleitanimation (~300 ms), speichert dann und lädt die Seite neu; das graue Textsegment ist lediglich eine Zustandsetikette, und dass ein Klick darauf keine Wirkung zeigt, ist beabsichtigtes Verhalten.

---

## Abdeckung der Übersetzung

### Was übersetzt wird

| Kategorie | Abdeckung | Status |
|------|---------|------|
| **Knotennamen** | Titel und Anzeigenamen aller Workflow-Knoten | ✅ |
| **Knoteneigenschaften** | Ein-/Ausgabedaten, Widget-Beschriftungen, Beschreibungen | ✅ |
| **Menüs** | Hauptmenü, Rechtsklick-Menü, Kontextmenü | ✅ |
| **Einstellungsfenster** | Der ComfyUI-Einstellungsdialog | ✅ |
| **Manager** | Die ComfyUI-Manager-Oberfläche | ✅ |
| **Vorlagenbibliothek** | Workflow-Vorlagennamen | ✅ |
| **Oberflächenelemente** | Schaltflächen, Beschriftungen, Hinweistexte, Suchfeld | ✅ |
| **Benutzerdefinierte Panels** | Schaltflächen, Beschriftungen, Dropdowns, Hinweistexte, Popups in Knoten-DOM-Panels | ✅ |
| **Warteschlangeninfo** | Dynamischer Text wie Warteschlangengröße | ✅ |

### Struktur der Übersetzungsdateien

```
de-DE/
├── Nodes/          # Knotenübersetzung (Titel, Eingaben, Ausgaben, Widgets, benutzerdefinierte Panels)
│   └── internal.json
├── Categories/     # Übersetzung der Knotenkategorien
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Menü- und Oberflächenübersetzung
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Andere Sprachverzeichnisse (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) teilen dieselbe Struktur und laden je nach aktueller Sprache; `en-US/` dient dazu, Knoten anderer Plugins ins Englische zurückzuversetzen.

### Eigene Übersetzung hinzufügen

Erstellen Sie eine JSON-Datei unter `de-DE/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Anzeigename des Knotens",
    "inputs": {
      "input_name": "Übersetzung des Eingabenamens"
    },
    "outputs": {
      "output_name": "Übersetzung des Ausgabenamens"
    },
    "widgets": {
      "widget_name": "Übersetzung des Widget-Namens"
    },
    "ui": {
      "English text in panel": "übersetzter Text im Panel"
    }
  }
}
```

> **Hinweise zum Verfassen**
>
> - `widgets`-Schlüssel müssen den **echten Namen** des Widgets verwenden (der Parametername im Quellcode, z. B. `target_language`), nicht den angezeigten display_name (z. B. `Target Language`). Für V3-API-Plugins (io.Schema) schreiben Sie beide Schlüssel — echten Namen und display_name — für beste Kompatibilität
> - Das Feld `ui` übersetzt englischen Text in benutzerdefinierten Panels des Knotens (erstellt über `addDOMWidget`): der Schlüssel ist das angezeigte Englische, der Wert die Übersetzung
> - Fügen Sie keine „Identitätsübersetzungen" hinzu (Wert gleich Schlüssel, z. B. `"cfg": "cfg"`) — sie ergeben keinen Sinn
> - Prüfen Sie die Schlüssel-Schreibweise; eine Abweichung vom Quellcode (z. B. ein zusätzliches `t` in `perturb_atttn`) führt dazu, dass das Widget stillschweigend nicht übersetzt wird

Erstellen Sie eine JSON-Datei unter `de-DE/Menus/`, um Menüübersetzungen hinzuzufügen:

```json
{
  "English Menu Text": "übersetzter Menütext",
  "Another Item": "ein anderer Eintrag"
}
```

> Nach dem Hinzufügen von Übersetzungsdateien ist kein Neustart nötig — schalten Sie die Übersetzung um, um sie anzuwenden.

---

## Architektur

### Gesamtstruktur

```
┌──────────────────────────────────────────────────────┐
│                ComfyUI-Hauptprogramm                  │
│                                                        │
│  Python-Backend (__init__.py)     Front JS (js/)       │
│  ├─ HTTP-API-Routen              ├─ main.js (Engine)   │
│  ├─ Übersetzungs-Kompilierung    ├─ MenuTranslate.js   │
│  └─ Einstellungs-Persistenz      └─ utils.js (Helfer)  │
│         │                             │                │
│         ▼                             ▼                │
│   de-DE/ Übersetzungsdaten       MutationObserver      │
│   ├─ Nodes/*.json              Echtzeit-DOM-Übersetzung │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Kerntechniken

| Technik | Beschreibung |
|------|------|
| **Rückruf-Umwicklung (Callback Wrapping)** | Übersetzt Rechtsklick-Menütext und bewahrt zugleich die `content`-Abgleichlogik des zugrunde liegenden Rückrufs |
| **Doppelte Schaltflächen-Architektur** | Unterstützt sowohl das alte `.comfy-menu` als auch das neue `.comfyui-menu` |
| **MutationObserver-Überwachung** | Erkennt DOM-Änderungen in Echtzeit und übersetzt neu erschienene Elemente automatisch |
| **translatedValueSet** | Nutzt ein Set für O(1)-Prüfung, ob Text bereits übersetzt ist, und vermeidet doppelte Verarbeitung |
| **Blattknoten-Schutz** | Weist `innerText` nur kindlosen Knoten zu und schützt so Vue-Event-Bindings |
| **Gzip-Übertragung** | Übersetzungsdaten werden Gzip-komprimiert übertragen, um Netzlast zu senken |

> Vollständige technische Details finden Sie in [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Hinweise

### Kompatibilität

- **Konflikte mit Übersetzungs-Plugins** — dieses Plugin steht in Konflikt mit anderen Übersetzungs-Plugins (z. B. AIGODLIKE-ComfyUI-Translation); deinstallieren Sie diese vorher
- **Bekanntermaßen konfliktbehaftetes Plugin** — `ComfyUI Browser` kann Kompatibilitätsprobleme haben
- **Unterstützte Browser** — Chrome, Edge und 360 Browser empfohlen; andere wurden nicht ausreichend getestet

### Anforderungen

| Komponente | Anforderung |
|------|------|
| ComfyUI | Neueste Version (kompatibel mit alter und neuer UI) |
| Python | 3.8+ |
| Browser | Chrome / Edge (empfohlen) |

---

## Änderungsverlauf

### 2026-09-21

**Arabisch (ar-SA), Persisch (fa-IR) und Hebräisch (he-IL) hinzugefügt**

- Übersetzungspakete für drei RTL-Sprachen (rechts-nach-links) fertiggestellt, die Knoten, Kategorien, Menüs und das Einstellungsfenster abdecken; stellen Sie die offizielle ComfyUI-Sprache auf `ar-SA` / `fa-IR` / `he-IL`, um sie automatisch zu aktivieren

**Platzierung des Übersetzungsschalters im neuen ComfyUI verbessert**

- Der Schalter wird nun vorrangig in die Befehlsleiste eingesetzt (gleiche Zeile wie der Einstellungs-Button von ComfyUI-Manager); ist der Anker beim Start noch nicht bereit, versetzt ihn der Watchdog automatisch, sobald er verfügbar ist. Zusätzlich Schutz vor Flackern vor dem Mounting und automatische Neuberechnung der Position des Kapsel-Reglers nach dem Mounting

### 2026-09-20

**Japanisch (ja-JP) hinzugefügt**

- Japanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `ja-JP`

**Spanisch (es-ES) hinzugefügt**

- Spanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `es-ES`

**Koreanisch (ko-KR) hinzugefügt**

- Koreanisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `ko-KR`

**Türkisch (tr-TR) hinzugefügt**

- Türkisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `tr-TR`

**Italienisch (it-IT) hinzugefügt**

- Italienisches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `it-IT`

**Brasilianisches Portugiesisch (pt-BR) hinzugefügt**

- Portugiesisches (Brasilien) Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `pt-BR`

**Deutsch (de-DE) hinzugefügt**

- Deutsches Übersetzungspaket fertiggestellt, das Knoten, Kategorien, Menüs und das Einstellungsfenster abdeckt; stellen Sie die offizielle ComfyUI-Sprache auf `de-DE`

### 2026-09-19

**Sprache folgt der offiziellen Einstellung**

- Die Option „Übersetzungssprache" im Plugin entfernt; die Sprache folgt nun automatisch der offiziellen Spracheneinstellung von ComfyUI (`Comfy.Locale`)
- Nach dem Wechsel der offiziellen Sprache lädt die Seite automatisch neu; Übersetzung und Plugin-Texte greifen gleichzeitig, kein manueller Neustart

**Mehrsprachige Konfigurationsoberfläche und einheitliches Layout**

- Schalterbeschriftung und Einstellungsoberfläche decken 15 Sprachen ab (einschließlich Traditionellem Chinesisch sowie den RTL-Sprachen Arabisch, Persisch, Hebräisch); unbekannte Sprachen fallen auf Englisch zurück
- Die Abschnittsreihenfolge im Einstellungsfenster ist in allen Sprachen einheitlich: Schalterstil → Dropdown-Optionen → Plugin-Übersetzungs-Manager; Abschnittsüberschriften werden übersetzt
- Der „Plugin-Übersetzungs-Manager" wird nicht mehr ein zweites Mal über das Wörterbuch übersetzt und entspricht immer der aktuellen Sprache
- Die Beschriftung des Einschaltzustands lässt den Suffix `(Sprachcode)` weg und behält nur den Text

### 2026-09-12

- Behoben: Verlust von Übersetzungen, wenn mehrere Dateien denselben Knoten enthalten; sie werden nun ergänzend zusammengeführt
- Übersetzung benutzerdefinierter Knoten-Panels hinzugefügt: Schaltflächen, Beschriftungen, Dropdowns, Hinweistexte und Popups werden nun übersetzt
- Behoben: Port-Namen blieben englisch, nachdem ein Widget „in Eingabe umgewandelt" wurde
- Übersetzungs-Wächter hinzugefügt: später erstellte Knoten erhalten ebenfalls Übersetzung
- Dank an 石头 (Q:34720803) für die Optimierung

### 2026-09-07

- Behoben: In der Seitenleistenliste „Workflows" wurden eigene Workflow-Namen fälschlich übersetzt; sie bleiben nun unverändert

### 2026-08-20

- Schalterstil „segmentierte Pillole" hinzugefügt, mit blauem Slider, der sanft zwischen An und Aus gleitet für einen Zustand auf einen Blick

### 2026-07-27

**Fix: Widget-Übersetzung bei V3-API-Knoten funktionierte nicht**

- Behoben: fehlende Widget-Übersetzung bei Plugins der V3-API (io.Schema), z. B. ComfyUI-qwenmultiangle
- **Ursache**: V3-Knoten deklarieren für ein Widget oft einen englischen `display_name` (name `horizontal_angle`, label `Horizontal Angle`); die alte Prüfung wertete jedes „label ≠ name" als native Übersetzung und übersprang es
- **Lösung**: `isAlreadyTranslated` erhält einen normalisierten Vergleich — ein label, das nur eine verschönerte Form des name ist (Unterschiede in Groß/Kleinschreibung/Leerzeichen/Unterstrichen/Bindestrichen), gilt nicht als übersetzt

**Fix: Identitätsübersetzungen verschmutzten die Menge der übersetzten Werte**

- Behoben: bestimmte Widgets (z. B. `cfg`) wurden auf keinem Knoten übersetzt
- **Ursache**: manche Dateien enthielten „Identitätsübersetzungen" (z. B. `"cfg": "cfg"`); sobald ihr Wert in `translatedValueSet` gelangte, wurde der englische Name fälschlich als „bereits übersetzt" eingestuft und blockierte global die Übersetzung dieses Namens
- **Lösung**: Beim Aufbau der Menge werden Einträge übersprungen, deren Wert ihrem Schlüssel gleicht

**Korrekturen an Übersetzungsdateien**

- Tippfehler in ComfyUI-LTXVideo-Schlüsseln behoben (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Fehlende echte Widget-Namen-Schlüssel in ComfyUI-qwenmultiangle ergänzt (`target_language`, `prompt`)

### 2026-04-08

**Fix: Rechtsklick-Menü-Funktionen ausgefallen**

- Einen schweren Fehler behoben, bei dem mit aktiver Übersetzung die Aktionen „Trennen" und „Port umbenennen" im Rechtsklick-Menü des Ausgabeports nicht mehr reagierten
- **Ursache**: LiteGraph verteilt Rückrufe über den Abgleich des englischen `value.content`; nach Übersetzung schlug der Abgleich fehl
- **Lösung**: Callback Wrapping implementiert — im Moment der Rückruf-Ausführung wird kurzzeitig Englisch wiederhergestellt und nach der Ausführung die Übersetzung zurückgesetzt, was Übersetzungsanzeige und korrektes Verhalten vereint
- Umschließt sowohl `value.callback` (individuell) als auch `options.callback` (geteilt)
- Schutz `_originalContent` vor mehrfachem Übersetzungs-Überschreiben hinzugefügt, damit das Canvas-Menü seinen Originalwert nicht verliert, wenn es die Pipeline zweimal durchläuft

**Fix: DOM-Übersetzung zerstörte Event-Bindings**

- Behoben: die `innerText`-Zuweisung in `replaceText` zerstörte Kindelemente und Vue/PrimeVue-Listener
- **Lösung**: Blattknoten-Prüfung `target.children.length === 0` hinzugefügt, `innerText` nur an kindlose Knoten zugewiesen

### 2025-12-20

**Umbenennung**

- Plugin von `ComfyUI-Translation-node` in `ComfyUI-Chinese-Translation` umbenannt
- Anzeigename von „Translation Node" in „中文翻译" geändert, um der Ausrichtung des Plugins besser zu entsprechen

**Verbesserungen**

- Umstellung auf eine mehrsprachige Dateiarchitektur (Version 2.0)
- Einstellungsfenster hinzugefügt: Sprache und Schaltflächenstil in den ComfyUI-Einstellungen konfigurierbar
- Option für dezenten nativen UI-Stil hinzugefügt
- Behoben: Verlust der Symbol-Einstellungen nach Neustart (Dank an Community-Mitglied 幻影 für den Bericht)

---

## Community und Unterstützung

**Autorenseite**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Community-Gruppe**

- **ComfyUI QQ-Gruppe**: `202018000`

**Feedback und Beitrag**

- **Fehlerberichte**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Übersetzungen beisteuern**: PRs mit zusätzlichen Übersetzungsdateien sind willkommen

**Autor unterstützen**

Wenn Ihnen das Plugin gefällt, vergeben Sie gern einen ⭐ Star und unterstützen Sie den Autor:

- **Unterstützung**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Lizenz

Dieses Projekt wird unter der [MIT-Lizenz](LICENSE) open source veröffentlicht.

Copyright (c) 2025 猪的飞行梦

Jeder darf dieses Projekt frei kopieren, ändern und verbreiten, sofern der ursprüngliche Urheberrechtshinweis beibehalten wird. Details siehe Datei [LICENSE](LICENSE).

---

## Haftungsausschluss

Für diese Übersetzung und die geteilten Inhalte gilt Folgendes:

**Nicht-kommerzieller Charakter**

Diese Übersetzung ist ein persönliches, unbezahltes Werk; es wurde keine Vergütung oder kommerzieller Vorteil erhalten. Sie dient ausschließlich Lernen, Austausch und Wissensweitergabe.

**Keine Genauigkeitsgarantie**

Die Übersetzung bemüht sich um Treue zum Original, garantiert jedoch nicht Richtigkeit, Vollständigkeit, Aktualität oder Eignung für einen Zweck. Jedes Risiko und jede Folge aus Nutzung oder Verlassen auf diese Übersetzung trägt der Nutzer.

**Zugehörigkeit der Originalquelle**

Die Urheberrechte der Originalmaterialien, auf denen diese Übersetzung beruht (einschließlich, aber nicht beschränkt auf Text, Bilder und Videos), liegen bei den jeweiligen Autoren bzw. ursprünglichen Rechteinhabern. Diese Übersetzung erhebt keinen Anspruch auf die Originalinhalte.

**Original konsultieren**

Bei wichtigen Entscheidungen, rechtlicher Wirkung, technischer Umsetzung oder fachlichem Urteil konsultieren und verlassen Sie sich bitte zwingend auf die offizielle Originalversion, nicht auf diese Übersetzung.

**Rechte vorbehalten**

Sollte ein Rechteinhaber der Ansicht sein, dass diese Übersetzung seine berechtigten Rechte verletzt, kontaktieren Sie mich bitte umgehend, und ich werde sie zeitnah entfernen oder regeln.

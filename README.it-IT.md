<div align="center">

# 🌐 ComfyUI-Global-Translation

**Una soluzione di traduzione multilingue completa, intelligente e compatibile per l'interfaccia di ComfyUI**

> Un plugin di traduzione in tempo reale che unisce front-end e back-end: copre nodi, menu, pannello delle impostazioni, gestore e ogni testo visibile, in perfetta compatibilità con la traduzione nativa ufficiale di ComfyUI.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#utilizzo)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · **Italiano** · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Autore: **猪的飞行梦** — Questo progetto è una modifica basata su [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) e [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation). Un ringraziamento speciale agli autori per il loro eccezionale contributo alla community open source. Questo progetto resterà open source.

</div>

---

## Indice

- [Panoramica](#panoramica)
- [Caratteristiche principali](#caratteristiche-principali)
- [Anteprima](#anteprima)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Ambito della traduzione](#ambito-della-traduzione)
- [Architettura](#architettura)
- [Note](#note)
- [Registro delle modifiche](#registro-delle-modifiche)
- [Community e supporto](#community-e-supporto)
- [Licenza](#licenza)
- [Clausola di esclusione](#clausola-di-esclusione)

---

## Panoramica

ComfyUI-Global-Translation è un plugin di traduzione progettato per ComfyUI. Grazie alla collaborazione tra front-end e back-end, esegue la traduzione dell'interfaccia in tempo reale coprendo nodi, menu, pannello delle impostazioni, gestore e ogni testo visibile, coesistendo perfettamente con la traduzione nativa ufficiale di ComfyUI. La lingua di traduzione segue automaticamente l'impostazione linguistica ufficiale di ComfyUI (Impostazioni → Generale → `Comfy.Locale`); i testi dell'interfaccia del plugin stesso supportano 15 lingue.

### Perché scegliere questo plugin?

| Caratteristica | Questo plugin | Altri plugin di traduzione |
|------|--------|-------------|
| Compatibile con la traduzione ufficiale | ✅ Non sovrascrive le traduzioni ufficiali esistenti | ❌ Possibili conflitti |
| Funzioni del menu contestuale | ✅ Funzionano anche dopo la traduzione | ❌ Alcune funzioni si rompono |
| Compatibile con UI vecchia e nuova | ✅ Architettura a doppio pulsante | ❌ Supporta una sola versione |
| Cambio in tempo reale | ✅ Nessun riavvio | ❌ Riavvio necessario |
| Protezione dei titoli personalizzati | ✅ Non sovrascrive le modifiche utente | ❌ Potrebbero essere sovrascritte |

---

## Caratteristiche principali

### 🎯 Sistema di traduzione intelligente

- **Rilevamento intelligente** — riconosce automaticamente il testo già tradotto, evitando traduzioni ripetute e ricorsione infinita
- **Compatibilità nativa** — coesiste perfettamente con la traduzione ufficiale di ComfyUI senza reciproche interferenze
- **Consapevolezza del contesto** — applica la strategia migliore in base al tipo di elemento (nodi, menu, widget, ecc.)
- **Unione intelligente dei dati** — quando più file di traduzione contengono lo stesso nodo, le voci vengono unite in modo complementare invece di sovrascriversi
- **Traduzione dei pannelli personalizzati** — anche i pannelli creati all'interno dei nodi (pulsanti, etichette, menu a tendina, testi di aiuto, popup, ecc.) vengono tradotti automaticamente
- **Sicurezza dei callback** — dopo la traduzione del menu contestuale, tutte le funzioni (disconnetti, rinomina, ecc.) continuano a funzionare correttamente

### 🎨 Interfaccia utente curata

- **Controllo a pillola segmentata** — un interruttore arrotondato a forma di pillola con uno slider blu che scorre dolcemente tra i segmenti "attivo/disattivo", aspetto moderno
- **Effetto arcobaleno** — in stato attivo mostra una fluida animazione con gradiente arcobaleno
- **Design grigio minimalista** — in stato inattivo impiega un elegante gradiente grigio
- **Modalità nativa discreta** — facoltativamente una palette sobria coerente con il tema predefinito di ComfyUI
- **Feedback in tempo reale** — testo e colore del pulsante riflettono nell'immediato lo stato attuale della traduzione

### 🔧 Gestione flessibile della traduzione

- **Cambio in tempo reale** — attivare/disattivare la traduzione senza riavviare
- **Stato persistente** — le impostazioni vengono salvate automaticamente e sopravvivono ai riavvii
- **Integrazione nel pannello delle impostazioni** — configurare stile dell'interruttore e traduzione delle opzioni a tendina nelle impostazioni di ComfyUI (la lingua segue l'impostazione ufficiale di ComfyUI)
- **Interruttore per plugin** — un gestore integrato consente di disattivare la traduzione di singoli plugin
- **Aggiungi e applica subito** — i nuovi file di traduzione hanno effetto senza riavvio

### 🛡️ Stabile e affidabile

- **Gestione robusta delle eccezioni** — tutte le operazioni critiche sono protette
- **Degradazione elegante** — in caso di errore di traduzione si torna automaticamente al testo originale
- **Protezione del DOM** — la traduzione non danneggia il collegamento degli eventi dei componenti Vue/PrimeVue
- **Compatibilità multi-versione** — supporta sia l'interfaccia vecchia che quella nuova di ComfyUI

---

## Anteprima
Sono mostrati solo i rendering in cinese e inglese; per le altre lingue cambia e verifica tu stesso. L'interruttore segue l'impostazione linguistica di ComfyUI.

### Pulsanti di attivazione della traduzione

<img width="150" height="100" alt="interruttore-zh-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="interruttore-en-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="interruttore-zh-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="interruttore-en-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="interruttore-zh-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="interruttore-en-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Interfaccia di gestione

<img width="2000" height="1500" alt="schermata-impostazioni" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="schermata-impostazioni-en" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Installazione

### Metodo 1: clone Git (consigliato)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Riavvia ComfyUI dopo l'installazione.

#### Metodo 1 — guida dettagliata per principianti:

1. Apri la cartella dei plugin `ComfyUI\custom_nodes`
2. Su Win11, clic destro in un'area vuota e scegli "Apri nel terminale". Su Win10, digita `cmd` nella barra degli indirizzi e premi Invio.
3. Clicca **Code** in alto a destra in questa pagina e copia l'indirizzo (puoi anche copiare l'URL)
4. Nel terminale digita `git clone `, incolla l'indirizzo e premi Invio. Esempio: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Installazione completata, riavvia ComfyUI. (Se l'installazione fallisce, attiva un proxy/VPN e riprova.)



### Metodo 2: ComfyUI Manager

1. Apri ComfyUI Manager
2. Cambia i dati in: Canale (remoto)
3. Clicca Gestore nodi
4. Cerca **猪的飞行梦**
5. Clicca Installa e riavvia ComfyUI

### Metodo 3: download manuale (sconsigliato, nessun aggiornamento)

1. Nella pagina GitHub clicca **Code → Download ZIP**
2. Estrai in `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. Riavvia ComfyUI

---

## Utilizzo

### Interruttore di traduzione

Dopo l'installazione nell'interfaccia compare un pulsante di attivazione della traduzione; cliccalo per cambiare lo stato:

- **Traduzione attiva** — il pulsante mostra "traduzione attiva" e il testo dell'interfaccia viene tradotto nella lingua corrente (segue l'impostazione linguistica ufficiale di ComfyUI)
- **Traduzione disattiva** — il pulsante mostra "traduzione disattiva" e ripristina l'interfaccia inglese originale

### Lingua di traduzione

La lingua di traduzione non si imposta più nel plugin; **segue automaticamente l'impostazione linguistica ufficiale di ComfyUI** (Impostazioni → Generale → Lingua / `Comfy.Locale`):

- Corrispondenza con tutte le lingue ufficialmente supportate: cinese semplificato, cinese tradizionale, inglese, giapponese, coreano, russo, francese, tedesco, spagnolo, italiano, portoghese (Brasile), turco, arabo, persiano, ebraico; le lingue non coperte ricorrono all'inglese
- Dopo aver cambiato la lingua ufficiale nelle impostazioni di ComfyUI, la pagina si aggiorna automaticamente; la traduzione e i testi del plugin si applicano insieme, senza riavvio manuale

### Pannello delle impostazioni

In ComfyUI Impostazioni → «🌐 Impostazioni di traduzione» sono disponibili due opzioni. I testi dell'interfaccia sono localizzati nella lingua corrente (15 lingue) con un ordine delle sezioni coerente in tutte le lingue:

| Opzione | Descrizione | Scelte |
|-------|------|------|
| 🎨 Stile interruttore | Scegli l'aspetto dell'interruttore; si ridisegna subito senza ricaricare | pill (pillola segmentata) / gradient (arcobaleno) / plain (nativo discreto) |
| 📋 Opzioni a tendina | Se tradurre anche il testo delle opzioni dei menu a tendina COMBO | Attivo / Disattivo (ricaricamento automatico alla modifica) |

Sotto le opzioni è presente anche il pannello **Gestore traduzioni dei plugin**: elenca tutti i plugin con file di traduzione — deselezionane uno per disattivarne la traduzione; la pagina si ricarica dopo il salvataggio.

> 💡 **Pillola segmentata (consigliata)**: forma arrotondata con uno slider blu evidenziato sopra lo stato corrente. **Clicca lo slider blu** per farlo scorrere dall'altra parte; la scelta viene salvata immediatamente nel file di configurazione e persiste dopo il riavvio di ComfyUI.

### Riferimento degli stili dei pulsanti

| Stile | Attivo | Disattivo | Ideale per |
|-----|---------|---------|----------|
| **Pillola segmentata** | Slider blu sul segmento "attivo", testo bianco in grassetto | Slider blu scivolato su "disattivo", testo grigio | Moderno e minimale, stato a colpo d'occhio |
| **Gradiente arcobaleno** | Animazione arcobaleno fluida, bianco in grassetto | Animazione grigia fluida, testo scuro in grassetto | Vuoi qualcosa di evidente |
| **Nativo discreto** | Sfondo del colore del tema ComfyUI | Sfondo scuro, testo grigio | Vuoi mimetizzarti nell'interfaccia |

> **Interazione della pillola segmentata**: solo lo slider blu evidenziato attiva il cambio — al clic riproduce prima un'animazione di scorrimento (~300 ms), poi salva e ricarica la pagina; il segmento di testo grigio è solo un'etichetta di stato e il fatto che il clic non produca effetti è un comportamento intenzionale.

---

## Ambito della traduzione

### Cosa viene tradotto

| Categoria | Copertura | Stato |
|------|---------|------|
| **Nomi dei nodi** | Titoli e nomi visualizzati di tutti i nodi del workflow | ✅ |
| **Proprietà dei nodi** | Porte di ingresso/uscita, etichette dei widget, descrizioni | ✅ |
| **Menu** | Menu principale, menu contestuale, menu del clic destro | ✅ |
| **Pannello delle impostazioni** | La finestra di dialogo delle impostazioni di ComfyUI | ✅ |
| **Gestore** | L'interfaccia di ComfyUI Manager | ✅ |
| **Libreria di modelli** | Nomi dei modelli di workflow | ✅ |
| **Elementi dell'interfaccia** | Pulsanti, etichette, testi di aiuto, campo di ricerca | ✅ |
| **Pannelli personalizzati** | Pulsanti, etichette, menu a tendina, testi di aiuto, popup nei pannelli DOM creati dai nodi | ✅ |
| **Informazioni sulla coda** | Testo dinamico come la dimensione della coda | ✅ |

### Struttura dei file di traduzione

```
it-IT/
├── Nodes/          # Traduzione dei nodi (titolo, ingressi, uscite, widget, pannelli personalizzati)
│   └── internal.json
├── Categories/     # Traduzione delle categorie dei nodi
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Traduzione di menu e interfaccia
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Le altre cartelle linguistiche (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) condividono la stessa struttura e si caricano in base alla lingua corrente; `en-US/` serve a riportare in inglese i nodi dei plugin non cinesi.

### Aggiungere traduzioni personalizzate

Crea un file JSON sotto `it-IT/Nodes/`:

```json
{
  "YourNodeClassName": {
    "title": "Nome visualizzato del nodo",
    "inputs": {
      "input_name": "traduzione del nome di ingresso"
    },
    "outputs": {
      "output_name": "traduzione del nome di uscita"
    },
    "widgets": {
      "widget_name": "traduzione del nome del widget"
    },
    "ui": {
      "English text in panel": "testo traduito nel pannello"
    }
  }
}
```

> **Suggerimenti per la scrittura**
>
> - Le chiavi di `widgets` devono usare il **nome reale** del widget (il nome del parametro nel codice sorgente, ad es. `target_language`), non il display_name mostrato a schermo (ad es. `Target Language`). Per i plugin con API V3 (io.Schema), scrivi entrambe le chiavi — nome reale e display_name — per la massima compatibilità
> - Il campo `ui` traduce il testo inglese all'interno dei pannelli personalizzati del nodo (creati con `addDOMWidget`): la chiave è l'inglese mostrato a schermo, il valore è la traduzione
> - Non aggiungere "traduzioni identiche" (valore uguale alla chiave, ad es. `"cfg": "cfg"`) — non hanno senso
> - Controlla l'ortografia delle chiavi; una chiave diversa dal codice sorgente (ad es. una `t` di troppo in `perturb_atttn`) farà sì che il widget non venga tradotto silenziosamente

Crea un file JSON sotto `it-IT/Menus/` per aggiungere traduzioni dei menu:

```json
{
  "English Menu Text": "testo del menu tradotto",
  "Another Item": "un'altra voce"
}
```

> Dopo aver aggiunto file di traduzione non serve riavviare ComfyUI — basta alternare l'interruttore di traduzione.

---

## Architettura

### Struttura generale

```
┌──────────────────────────────────────────────────────┐
│                Programma principale ComfyUI           │
│                                                        │
│  Back-end Python (__init__.py)   Front JS (js/)        │
│  ├─ Rotte API HTTP              ├─ main.js (motore)    │
│  ├─ Compilazione traduzione     ├─ MenuTranslate.js    │
│  └─ Persistenza impostazioni    └─ utils.js (ausili)   │
│         │                             │                │
│         ▼                             ▼                │
│   Dati di traduzione it-IT/       MutationObserver     │
│   ├─ Nodes/*.json              traduzione DOM in vivo  │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Tecniche chiave

| Tecnica | Descrizione |
|------|------|
| **Incapsulamento dei callback (Callback Wrapping)** | Traduce il testo del menu contestuale preservando la logica di confronto `content` del callback sottostante |
| **Architettura a doppio pulsante** | Supporta sia il vecchio `.comfy-menu` che il nuovo `.comfyui-menu` |
| **Sorveglianza MutationObserver** | Rileva i cambiamenti del DOM in tempo reale e traduce automaticamente gli elementi appena comparsi |
| **translatedValueSet** | Usa un Set per verificare in O(1) se un testo è già tradotto, evitando elaborazioni ripetute |
| **Protezione dei nodi foglia** | Assegna `innerText` solo ai nodi senza figli, proteggendo il collegamento degli eventi Vue |
| **Trasferimento Gzip** | I dati di traduzione vengono trasferiti compressi in Gzip per ridurre il carico di rete |

> Per tutti i dettagli tecnici, consulta [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Note

### Compatibilità

- **Conflitti tra plugin di traduzione** — questo plugin è in conflitto con altri plugin di traduzione (ad es. AIGODLIKE-ComfyUI-Translation); disinstallali prima dell'uso
- **Plugin in conflitto noto** — `ComfyUI Browser` potrebbe avere problemi di compatibilità
- **Browser supportati** — si consigliano Chrome, Edge e 360 Browser; gli altri non sono stati testati a fondo

### Requisiti

| Componente | Requisito |
|------|------|
| ComfyUI | Versione più recente (compatibile con UI vecchia e nuova) |
| Python | 3.8+ |
| Browser | Chrome / Edge (consigliato) |

---

## Registro delle modifiche

### 2026-09-21

**Aggiunti arabo (ar-SA), persiano (fa-IR) ed ebraico (he-IL)**

- Traduzioni completate per tre lingue RTL (da destra a sinistra) che coprono nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `ar-SA` / `fa-IR` / `he-IL` per attivarle automaticamente

**Posizionamento del toggle di traduzione migliorato nel nuovo ComfyUI**

- Il toggle ora viene inserito in priorità nella barra dei comandi (nella stessa riga del pulsante delle impostazioni di ComfyUI-Manager); se all'avvio l'ancora non è pronta, il watchdog lo sposta automaticamente quando disponibile. Aggiunti protezione dallo sfarfallio prima del montaggio e ricalcolo automatico della posizione del cursore della capsula dopo il montaggio

### 2026-09-20

**Aggiunto giapponese (ja-JP)**

- Traduzione giapponese completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `ja-JP`

**Aggiunto spagnolo (es-ES)**

- Traduzione spagnola completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `es-ES`

**Aggiunto coreano (ko-KR)**

- Traduzione coreana completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `ko-KR`

**Aggiunto turco (tr-TR)**

- Traduzione turca completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `tr-TR`

**Aggiunto italiano (it-IT)**

- Traduzione italiana completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `it-IT`

**Aggiunto portoghese brasiliano (pt-BR)**

- Traduzione portoghese (Brasile) completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `pt-BR`

**Aggiunto tedesco (de-DE)**

- Traduzione tedesca completata che copre nodi, categorie, menu e pannello delle impostazioni; imposta la lingua ufficiale di ComfyUI su `de-DE`

### 2026-09-19

**La lingua segue l'impostazione ufficiale**

- Rimossa l'opzione "lingua di traduzione" nel plugin; la lingua ora segue automaticamente l'impostazione linguistica ufficiale di ComfyUI (`Comfy.Locale`)
- Dopo il cambio della lingua ufficiale, la pagina si ricarica automaticamente; la traduzione e i testi del plugin si applicano insieme, senza riavvio manuale

**Interfaccia di configurazione multilingue e layout unificato**

- Le etichette dell'interruttore e l'interfaccia delle impostazioni coprono 15 lingue (incluso il cinese tradizionale e le lingue RTL arabo, persiano ed ebraico); le lingue sconosciute ricorrono all'inglese
- L'ordine delle sezioni del pannello delle impostazioni è coerente in tutte le lingue: stile interruttore → opzioni a tendina → gestore traduzioni; le intestazioni di sezione vengono tradotte
- Il pannello "Gestore traduzioni dei plugin" non viene più ritradotto tramite dizionario e corrisponde sempre alla lingua corrente dell'interfaccia
- L'etichetta dello stato attivo dell'interruttore rimuove il suffisso `(codice lingua)`, mantenendo solo il testo

### 2026-09-12

- Corretta la perdita di traduzione quando più file contengono lo stesso nodo; ora si uniscono in modo complementare
- Aggiunta la traduzione dei pannelli personalizzati dei nodi: pulsanti, etichette, menu a tendina, testi di aiuto e popup vengono ora tradotti
- Corretti i nomi delle porte che restavano in inglese dopo "convertire un widget in ingresso"
- Aggiunto un guardiano della traduzione: anche i nodi creati successivamente ricevono la traduzione
- Grazie a 石头 (Q:34720803) per l'ottimizzazione

### 2026-09-07

- Corretto: nell'elenco "Workflow" della barra laterale, i tuoi nomi dei workflow venivano tradotti per errore; ora vengono conservati così come sono

### 2026-08-20

- Aggiunto lo stile dell'interruttore "pillola segmentata", con uno slider blu che scorre tra attivo e disattivo per uno stato a colpo d'occhio

### 2026-07-27

**Correzione: la traduzione dei widget dei nodi API V3 non funzionava**

- Corretta la mancata traduzione dei widget nei plugin scritti con API V3 (io.Schema), ad es. ComfyUI-qwenmultiangle
- **Causa**: i nodi V3 spesso dichiarano un `display_name` inglese per un widget (name `horizontal_angle`, label `Horizontal Angle`); il vecchio rilevamento considerava "label ≠ name" come traduzione nativa e lo saltava
- **Soluzione**: `isAlreadyTranslated` aggiunge un confronto normalizzato — un label che è solo una forma abbellita del name (differenze di maiuscole/spazi/underscore/trattini) non è considerato tradotto

**Correzione: le traduzioni identiche contaminavano l'insieme dei testi tradotti**

- Corretto che alcuni widget (ad es. `cfg`) non venissero tradotti su alcun nodo
- **Causa**: alcuni file contenevano "traduzioni identiche" (ad es. `"cfg": "cfg"`); una volta che il loro valore entrava in `translatedValueSet`, il nome inglese veniva scambiato per "già tradotto" e bloccava globalmente la traduzione di quel nome
- **Soluzione**: durante la costruzione dell'insieme, saltare le voci il cui valore è uguale alla chiave

**Correzioni dei file di traduzione**

- Corretti errori di battitura nelle chiavi di ComfyUI-LTXVideo (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Aggiunte le chiavi mancanti dei nomi reali dei widget in ComfyUI-qwenmultiangle (`target_language`, `prompt`)

### 2026-04-08

**Correzione: funzioni del menu contestuale rotte**

- Corretto un grave bug per cui, con la traduzione attiva, le azioni "disconnetti" e "rinomina porta" del menu contestuale della porta di uscita non rispondevano più
- **Causa**: LiteGraph distribuisce i callback tramite il confronto dell'inglese `value.content`; dopo la traduzione il confronto falliva
- **Soluzione**: implementato l'incapsulamento dei callback (Callback Wrapping) — l'inglese viene ripristinato temporaneamente nell'istante di esecuzione del callback, poi la traduzione viene rimessa, riconciliando la visualizzazione tradotta e il corretto funzionamento
- Incapsula sia `value.callback` (individuale) sia `options.callback` (condiviso)
- Aggiunta la protezione `_originalContent` contro la sovrascrittura per traduzione multipla, così che il menu della canvas non perda il valore originale dopo essere passato due volte nel flusso

**Correzione: la traduzione del DOM rompeva il collegamento degli eventi**

- Corretto che l'assegnazione di `innerText` in `replaceText` distruggesse gli elementi figli e i listener Vue/PrimeVue
- **Soluzione**: aggiunto il controllo del nodo foglia `target.children.length === 0`, assegnando `innerText` solo ai nodi senza figli

### 2025-12-20

**Rinomina**

- Il plugin rinominato da `ComfyUI-Translation-node` a `ComfyUI-Chinese-Translation`
- Nome visualizzato cambiato da "Translation Node" a "中文翻译" per riflettere meglio il posizionamento del plugin

**Miglioramenti**

- Ristrutturato in un'architettura di file multilingue (versione 2.0)
- Aggiunto un pannello delle impostazioni per configurare lingua e stile del pulsante nelle impostazioni di ComfyUI
- Aggiunta l'opzione di stile UI nativo discreto
- Corretta la perdita delle impostazioni dell'icona dopo il riavvio (grazie al membro della community 幻影 per la segnalazione)

---

## Community e supporto

**Pagina dell'autore**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Gruppo della community**

- **Gruppo QQ di ComfyUI**: `202018000`

**Feedback e contributo**

- **Segnalazione di bug**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Contribuire con traduzioni**: sono benvenute PR che aggiungono file di traduzione

**Supporta l'autore**

Se il plugin ti è utile, considera di dare una ⭐ Star e sostenere l'autore:

- **Sostieni**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Licenza

Questo progetto è pubblicato come open source sotto la [Licenza MIT](LICENSE).

Copyright (c) 2025 猪的飞行梦

Chiunque è libero di copiare, modificare e distribuire questo progetto, purché conservi l'avviso originale di copyright. Vedi il file [LICENSE](LICENSE) per i dettagli.

---

## Clausola di esclusione

Questa traduzione e il contenuto condiviso sono soggetti a quanto segue:

**Natura non commerciale**

Questa traduzione è un lavoro personale e non retribuito; non è stato ricevuto alcun compenso né vantaggio commerciale. È destinata esclusivamente all'apprendimento, allo scambio e alla condivisione della conoscenza.

**Nessuna garanzia di accuratezza**

La traduzione si impegna a essere fedele all'originale ma non garantisce accuratezza, completezza, tempestività o idoneità per uno scopo. Qualsiasi rischio e conseguenza derivanti dall'uso o dall'affidamento a questa traduzione ricadono sull'utente.

**Appartenenza della fonte originale**

I diritti d'autore sui materiali originali alla base di questa traduzione (inclusi, ma non limitati a, testi, immagini e video) appartengono ai rispettivi autori o titolari originali. Questa traduzione non vanta alcun diritto sui contenuti originali.

**Si consiglia di consultare l'originale**

Per decisioni importanti, efficacia legale, implementazione tecnica o giudizio professionale, consulta e affidati assolutamente alla versione originale ufficiale, non a questa traduzione.

**Riserva dei diritti**

Se un titolare ritiene che questa traduzione violi i suoi diritti legittimi, contattami tempestivamente e la rimuoverò o la gestirò sollecitamente.

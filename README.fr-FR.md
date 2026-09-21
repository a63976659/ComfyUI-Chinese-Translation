<div align="center">

# 🌐 ComfyUI-Global-Translation

**Une solution de traduction multilingue complète, intelligente et compatible pour l'interface ComfyUI**

> Un plugin de traduction en temps réel alliant front-end et back-end : il couvre les nœuds, les menus, le panneau de réglages, le gestionnaire et tout le texte visible, en parfaite compatibilité avec la traduction native officielle de ComfyUI.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#utilisation)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · **Français** · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · [Türkçe](README.tr-TR.md) · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Auteur : **猪的飞行梦** — Ce projet est une modification basée sur [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) et [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation). Merci tout particulier à ces auteurs pour leur contribution exceptionnelle à la communauté open source. Ce projet restera open source.

</div>

---

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Aperçu](#aperçu)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Portée de la traduction](#portée-de-la-traduction)
- [Architecture](#architecture)
- [Remarques](#remarques)
- [Journal des modifications](#journal-des-modifications)
- [Communauté et support](#communauté-et-support)
- [Licence](#licence)
- [Clause de non-responsabilité](#clause-de-non-responsabilité)

---

## Présentation

ComfyUI-Global-Translation est un plugin de traduction conçu pour ComfyUI. Grâce à la collaboration du front-end et du back-end, il effectue une traduction de l'interface en temps réel couvrant les nœuds, les menus, le panneau de réglages, le gestionnaire et tout le texte visible, tout en cohabitant parfaitement avec la traduction native officielle de ComfyUI. La langue de traduction suit automatiquement le réglage de langue officiel de ComfyUI (Réglages → Général → `Comfy.Locale`) ; les chaînes d'interface du plugin lui-même prennent en charge 15 langues.

### Pourquoi choisir ce plugin ?

| Fonctionnalité | Ce plugin | Autres plugins de traduction |
|------|--------|-------------|
| Compatibilité avec la traduction officielle | ✅ N'écrase jamais les traductions officielles existantes | ❌ Peut créer des conflits |
| Fonctions du menu contextuel | ✅ Fonctionnent après traduction | ❌ Certaines fonctions cassent |
| Compatibilité UI ancienne et nouvelle | ✅ Architecture à double bouton | ❌ Une seule version |
| Bascule en temps réel | ✅ Sans redémarrage | ❌ Redémarrage requis |
| Protection des titres personnalisés | ✅ N'écrase pas les modifications de l'utilisateur | ❌ Peut être écrasé |

---

## Fonctionnalités principales

### 🎯 Système de traduction intelligent

- **Détection intelligente** — reconnaît automatiquement le texte déjà traduit, évitant les traductions répétées et la récursion infinie
- **Compatibilité native** — cohabite parfaitement avec la traduction officielle de ComfyUI sans interference
- **Sensibilité au contexte** — applique la meilleure stratégie selon le type d'élément (nœuds, menus, widgets, etc.)
- **Fusion intelligente des données** — lorsque plusieurs fichiers de traduction contiennent un même nœud, les entrées sont fusionnées de façon complémentaire au lieu de s'écraser
- **Traduction des panneaux personnalisés** — les panneaux créés dans les nœuds (boutons, étiquettes, listes déroulantes, infobulles, popups, etc.) sont aussi traduits automatiquement
- **Sécurité des rappels** — après traduction du menu contextuel, toutes les fonctions (déconnecter, renommer, etc.) fonctionnent parfaitement

### 🎨 Interface utilisateur soignée

- **Contrôle pilule segmenté** — un interrupteur arrondi en forme de pilule avec un curseur bleu glissant en douceur entre les segments « activé/désactivé », look moderne
- **Effet arc-en-ciel** — un état actif affiche une fluide animation de dégradé arc-en-ciel
- **Design gris minimaliste** — un état inactif utilise un élégant dégradé gris
- **Mode natif discret** — une palette sobre assortie au thème par défaut de ComfyUI, en option
- **Retour d'état en temps réel** — le texte et la couleur du bouton reflètent en direct l'état de traduction

### 🔧 Gestion de traduction flexible

- **Bascule en temps réel** — activer/désactiver la traduction sans redémarrer
- **État persistant** — les réglages sont enregistrés automatiquement et survivent au redémarrage
- **Intégration au panneau de réglages** — configurer le style de l'interrupteur et la traduction des options déroulantes dans les réglages ComfyUI (la langue suit le réglage officiel de ComfyUI)
- **Interrupteur par plugin** — un gestionnaire intégré permet de désactiver la traduction de certains plugins
- **Ajout appliqué immédiatement** — les nouveaux fichiers de traduction prennent effet sans redémarrage

### 🛡️ Stabilité et fiabilité

- **Gestion robuste des exceptions** — chaque opération critique est encapsulée
- **Dégradation gracieuse** — en cas d'échec de traduction, retour automatique au texte d'origine
- **Protection du DOM** — la traduction ne casse pas la liaison des événements des composants Vue/PrimeVue
- **Compatibilité multi-versions** — prend en charge les interfaces anciennes et nouvelles de ComfyUI

---

## Aperçu
Seuls les rendus en chinois et en anglais sont présentés ; pour les autres langues, vérifiez vous-même en changeant de langue. Le basculement suit le paramètre de langue de ComfyUI.

### Boutons d'activation de la traduction

<img width="150" height="100" alt="interrupteur-zh-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="interrupteur-en-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="interrupteur-zh-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="interrupteur-en-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="interrupteur-zh-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="interrupteur-en-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Interface de gestion

<img width="2000" height="1500" alt="écran-de-paramètres" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="écran-de-paramètres-en" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Installation

### Méthode 1 : cloner via Git (recommandée)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Redémarrez ComfyUI après l'installation.

#### Méthode 1 — pas à pas détaillé pour débutants :

1. Ouvrez le dossier des plugins `ComfyUI\custom_nodes`
2. Sous Win11, clic droit dans une zone vide puis « Ouvrir dans le terminal ». Sous Win10, tapez `cmd` dans la barre d'adresse et appuyez sur Entrée.
3. Cliquez sur **Code** en haut à droite de cette page et copiez l'adresse (vous pouvez aussi copier l'URL)
4. Dans le terminal tapez `git clone `, collez l'adresse et appuyez sur Entrée. Exemple : `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Installation terminée, redémarrez ComfyUI. (En cas d'échec, activez un proxy/VPN et réessayez.)



### Méthode 2 : ComfyUI Manager

1. Ouvrez ComfyUI Manager
2. Réglez la source de données sur : Canal (distant)
3. Cliquez sur Gestionnaire de nœuds
4. Recherchez **猪的飞行梦**
5. Cliquez sur Installer et redémarrez ComfyUI

### Méthode 3 : téléchargement manuel (déconseillé, pas de mises à jour)

1. Sur la page GitHub, cliquez sur **Code → Download ZIP**
2. Décompressez dans `ComfyUI/custom_nodes/ComfyUI-Global-Translation`
3. Redémarrez ComfyUI

---

## Utilisation

### Interrupteur de traduction

Après l'installation, un bouton d'activation de la traduction apparaît ; cliquez dessus pour changer l'état :

- **Traduction activée** — le bouton affiche « traduction activée » et le texte de l'interface est traduit dans la langue courante (suit le réglage de langue officiel de ComfyUI)
- **Traduction désactivée** — le bouton affiche « traduction désactivée » et l'interface anglaise d'origine est restaurée

### Langue de traduction

La langue de traduction n'est plus réglée dans le plugin ; elle **suit automatiquement le réglage de langue officiel de ComfyUI** (Réglages → Général → Langue / `Comfy.Locale`) :

- Toutes les langues officiellement prises en charge sont reconnues : chinois simplifié, chinois traditionnel, anglais, japonais, coréen, russe, français, allemand, espagnol, italien, portugais (Brésil), turc, arabe, perse, hébreu ; les langues non couvertes reviennent à l'anglais
- Après avoir changé la langue officielle dans les réglages ComfyUI, la page se rafraîchit automatiquement ; la traduction et les chaînes d'interface du plugin s'appliquent ensemble, sans redémarrage manuel

### Panneau de réglages

Dans ComfyUI Réglages → « 🌐 Réglages de traduction » se trouvent deux options. Les chaînes d'interface sont localisées dans la langue courante (15 langues) avec un ordre de sections cohérent d'une langue à l'autre :

| Option | Description | Choix |
|-------|------|------|
| 🎨 Style d'interrupteur | Choisir l'apparence ; redessin en direct, sans rafraîchissement | pill (pilule segmentée) / gradient (arc-en-ciel) / plain (natif discret) |
| 📋 Options déroulantes | Traduire aussi le texte des options des listes déroulantes COMBO | Activé / Désactivé (rafraîchissement auto après modification) |

Sous les options se trouve aussi un panneau **Gestionnaire de traduction des plugins** : il liste tous les plugins disposant de fichiers de traduction — décochez-en un pour désactiver sa traduction ; la page se rafraîchit après enregistrement.

> 💡 **Pilule segmentée (recommandée)** : forme arrondie avec un curseur bleu surligné couvrant l'état courant. **Cliquez sur le curseur bleu** pour qu'il glisse de l'autre côté ; le choix est enregistré immédiatement dans le fichier de configuration et persiste après redémarrage de ComfyUI.

### Référence des styles de bouton

| Style | Activé | Désactivé | Idéal pour |
|-----|---------|---------|----------|
| **Pilule segmentée** | Curseur bleu sur le segment « activé », texte blanc gras | Curseur bleu glissé sur « désactivé », texte gris | Moderne, épuré, état d'un coup d'œil |
| **Dégradé arc-en-ciel** | Animation arc-en-ciel fluide, blanc gras | Animation grise fluide, texte foncé gras | Vouloir quelque chose de voyant |
| **Natif discret** | Fond de la couleur du thème ComfyUI | Fond sombre, texte gris | Vouloir se fondre dans l'interface |

> **Interaction de la pilule segmentée** : seul le curseur bleu surligné déclenche la bascule — au clic, il joue d'abord une animation de glissement (~300 ms), puis enregistre et rafraîchit la page ; le segment de texte gris n'est qu'une étiquette d'état et ne rien faire au clic est un comportement voulu.

---

## Portée de la traduction

### Contenu traduit

| Catégorie | Couverture | Statut |
|------|---------|------|
| **Noms des nœuds** | Titres et noms d'affichage de tous les nœuds du flux de travail | ✅ |
| **Propriétés des nœuds** | Ports d'entrée/sortie, étiquettes des widgets, descriptions | ✅ |
| **Menus** | Menu principal, menu contextuel, menus de clic droit | ✅ |
| **Panneau de réglages** | La boîte de dialogue des réglages ComfyUI | ✅ |
| **Gestionnaire** | L'interface de ComfyUI Manager | ✅ |
| **Bibliothèque de modèles** | Noms des modèles de flux de travail | ✅ |
| **Éléments d'interface** | Boutons, étiquettes, infobulles, champ de recherche | ✅ |
| **Panneaux personnalisés** | Boutons, étiquettes, listes, infobulles, popups des panneaux DOM créés par les nœuds | ✅ |
| **Infos de file d'attente** | Texte dynamique tel que la taille de la file | ✅ |

### Structure des fichiers de traduction

```
fr-FR/
├── Nodes/          # Traduction des nœuds (titre, entrées, sorties, widgets, panneaux personnalisés)
│   └── internal.json
├── Categories/     # Traduction des catégories de nœuds
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Traduction des menus et de l'interface
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Les autres répertoires de langue (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `de-DE/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `tr-TR/`, `fa-IR/`, `he-IL/`) partagent la même structure et se chargent selon la langue courante ; `en-US/` sert à rendre les nœuds des plugins non chinois en anglais.

### Ajouter une traduction personnalisée

Créez un fichier JSON sous `fr-FR/Nodes/` :

```json
{
  "YourNodeClassName": {
    "title": "Nom d'affichage du nœud",
    "inputs": {
      "input_name": "traduction du nom d'entrée"
    },
    "outputs": {
      "output_name": "traduction du nom de sortie"
    },
    "widgets": {
      "widget_name": "traduction du nom de widget"
    },
    "ui": {
      "English text in panel": "texte traduit dans le panneau"
    }
  }
}
```

> **Conseils de rédaction**
>
> - Les clés de `widgets` doivent utiliser le **vrai nom** du widget (le nom du paramètre dans le code source, par ex. `target_language`), et non le display_name affiché à l'écran (par ex. `Target Language`). Pour les plugins en API V3 (io.Schema), écrivez les deux clés — vrai nom et display_name — pour une compatibilité optimale
> - Le champ `ui` traduit le texte anglais à l'intérieur des panneaux personnalisés des nœuds (créés via `addDOMWidget`) : la clé est l'anglais affiché à l'écran, la valeur est la traduction
> - N'ajoutez pas de « traductions identitaires » (valeur égale à la clé, par ex. `"cfg": "cfg"`) — elles n'ont aucun sens
> - Vérifiez l'orthographe des clés ; une clé différente du code source (par ex. un `t` de trop dans `perturb_atttn`) empêchera silencieusement la traduction du widget

Créez un fichier JSON sous `fr-FR/Menus/` pour ajouter des traductions de menus :

```json
{
  "English Menu Text": "texte de menu traduit",
  "Another Item": "un autre élément"
}
```

> Après ajout de fichiers de traduction, aucun redémarrage n'est nécessaire — basculez l'interrupteur de traduction pour les appliquer.

---

## Architecture

### Structure générale

```
┌──────────────────────────────────────────────────────┐
│                Programme principal ComfyUI            │
│                                                        │
│  Back-end Python (__init__.py)   Front JS (js/)        │
│  ├─ Routes API HTTP             ├─ main.js (moteur)    │
│  ├─ Compilation de la traduction├─ MenuTranslate.js    │
│  └─ Persistance des réglages    └─ utils.js (helpers)  │
│         │                             │                │
│         ▼                             ▼                │
│   Données de traduction fr-FR/     MutationObserver    │
│   ├─ Nodes/*.json              traduction DOM en direct │
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Techniques clés

| Technique | Description |
|------|------|
| **Encapsulation de rappels (Callback Wrapping)** | Traduit le texte du menu contextuel tout en préservant la logique de correspondance `content` du rappel sous-jacent |
| **Architecture à double bouton** | Prend en charge à la fois l'ancien `.comfy-menu` et le nouveau `.comfyui-menu` |
| **Surveillance MutationObserver** | Détecte les changements du DOM en temps réel et traduit automatiquement les nouveaux éléments |
| **translatedValueSet** | Utilise un Set pour une vérification O(1) du texte déjà traduit, évitant les traitements répétitifs |
| **Protection des nœuds feuilles** | N'affecte `innerText` qu'aux nœuds sans enfants, protégeant la liaison d'événements Vue |
| **Transfert Gzip** | Les données de traduction sont transférées compressées en Gzip pour réduire la charge réseau |

> Pour tous les détails techniques, voir [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Remarques

### Compatibilité

- **Conflits entre plugins de traduction** — ce plugin est en conflit avec d'autres plugins de traduction (par ex. AIGODLIKE-ComfyUI-Translation) ; désinstallez-les avant usage
- **Plugin en conflit connu** — `ComfyUI Browser` peut présenter des problèmes de compatibilité
- **Navigateurs pris en charge** — Chrome, Edge et 360 Browser recommandés ; les autres ne sont pas suffisamment testés

### Prérequis

| Composant | Exigence |
|------|------|
| ComfyUI | Dernière version (compatible avec l'ancien et le nouveau UI) |
| Python | 3.8+ |
| Navigateur | Chrome / Edge (recommandé) |

---

## Journal des modifications

### 2026-09-21

**Ajout de l'arabe (ar-SA), du perse (fa-IR) et de l'hébreu (he-IL)**

- Traductions terminées pour trois langues RTL (droite à gauche) couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `ar-SA` / `fa-IR` / `he-IL` pour les activer automatiquement

### 2026-09-20

**Ajout du japonais (ja-JP)**

- Traduction japonaise terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `ja-JP`

**Ajout de l'espagnol (es-ES)**

- Traduction espagnole terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `es-ES`

**Ajout du coréen (ko-KR)**

- Traduction coréenne terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `ko-KR`

**Ajout du turc (tr-TR)**

- Traduction turque terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `tr-TR`

**Ajout de l'italien (it-IT)**

- Traduction italienne terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `it-IT`

**Ajout du portugais du Brésil (pt-BR)**

- Traduction portugaise (Brésil) terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `pt-BR`

**Ajout de l'allemand (de-DE)**

- Traduction allemande terminée couvrant nœuds, catégories, menus et panneau de réglages ; réglez la langue officielle de ComfyUI sur `de-DE`

### 2026-09-19

**La langue suit le réglage officiel**

- Suppression de l'option « langue de traduction » dans le plugin ; la langue suit désormais automatiquement le réglage de langue officiel de ComfyUI (`Comfy.Locale`)
- Après changement de la langue officielle, la page se rafraîchit automatiquement ; la traduction et les chaînes du plugin s'appliquent ensemble, sans redémarrage manuel

**Interface de configuration multilingue et mise en page unifiée**

- Les libellés de l'interrupteur et l'interface de réglages couvrent 15 langues (y compris le chinois traditionnel et les langues RTL arabe, perse et hébreu) ; les langues inconnues reviennent à l'anglais
- La mise en page du panneau de réglages garde un ordre cohérent dans toutes les langues : style d'interrupteur → options déroulantes → gestionnaire de traduction ; les en-têtes de section sont traduits
- Le panneau « Gestionnaire de traduction des plugins » n'est plus retraduit par le dictionnaire et correspond toujours à la langue de l'interface
- La libellé d'état activé de l'interrupteur retire le suffixe `(code langue)`, ne gardant que le texte

### 2026-09-12

- Correction de la perte de traduction lorsque plusieurs fichiers contiennent le même nœud ; elles sont désormais fusionnées de façon complémentaire
- Ajout de la traduction des panneaux personnalisés des nœuds : boutons, étiquettes, listes, infobulles et popups sont désormais traduits
- Correction des noms de ports restés en anglais après « conversion d'un widget en entrée »
- Ajout d'un gardien de traduction : les nœuds créés plus tard reçoivent aussi la traduction
- Merci à 石头 (Q:34720803) pour l'optimisation

### 2026-09-07

- Correction : dans la liste « Flux de travail » de la barre latérale, vos propres noms de flux de travail étaient à tort traduits en chinois ; ils sont désormais conservés tels quels

### 2026-08-20

- Ajout du style d'interrupteur « pilule segmentée », avec un curseur bleu glissant entre activé et désactivé pour un état d'un coup d'œil

### 2026-07-27

**Correction : traduction des widgets des nœuds API V3 inopérante**

- Correction de l'absence de traduction des widgets dans les plugins écrits en API V3 (io.Schema), par ex. ComfyUI-qwenmultiangle
- **Cause** : les nœuds V3 déclarent souvent un `display_name` anglais pour un widget (name `horizontal_angle`, label `Horizontal Angle`) ; l'ancienne détection considérait tout « label ≠ name » comme une traduction native et ignorait le widget
- **Solution** : `isAlreadyTranslated` ajoute une comparaison normalisée — un label qui n'est qu'une version embellie du name (différences de casse/espaces/soulignés/traits d'union) n'est pas considéré comme traduit

**Correction : les traductions identitaires polluaient l'ensemble des textes traduits**

- Correction de widgets (par ex. `cfg`) qui ne se traduisaient sur aucun nœud
- **Cause** : certains fichiers contenaient des « traductions identitaires » (par ex. `"cfg": "cfg"`) ; une fois leur valeur ajoutée à `translatedValueSet`, le nom anglais était interprété à tort comme « déjà traduit » et bloquait globalement la traduction de ce nom
- **Solution** : ignorer les entrées dont la valeur égale la clé lors de la construction de l'ensemble

**Corrections des fichiers de traduction**

- Correction de fautes de frappe dans les clés de ComfyUI-LTXVideo (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- Ajout des clés de vrais noms de widgets manquantes dans ComfyUI-qwenmultiangle (`target_language`, `prompt`)

### 2026-04-08

**Correction : fonctions du menu contextuel cassées**

- Correction d'un bug grave où, traduction activée, les actions « déconnecter » et « renommer le port » du menu contextuel de la sortie ne réagissaient plus
- **Cause** : LiteGraph distribue les rappels en comparant le `value.content` en anglais ; après traduction, la correspondance échouait
- **Solution** : implémentation de l'encapsulation de rappels (Callback Wrapping) — l'anglais est temporairement restauré à l'instant de l'exécution du rappel, puis la traduction est remise, conciliant affichage traduit et fonctionnement correct
- Enveloppe à la fois `value.callback` (individuel) et `options.callback` (partagé)
- Ajout d'une protection `_originalContent` contre l'écrasement par traduction multiple, afin que le menu du canvas ne perde pas sa valeur d'origine après être passé deux fois dans le pipeline

**Correction : la traduction du DOM cassait la liaison d'événements**

- Correction de l'affectation `innerText` dans `replaceText` qui détruisait les enfants et les écouteurs Vue/PrimeVue
- **Solution** : ajout d'une vérification de nœud feuille `target.children.length === 0`, n'affectant `innerText` qu'aux nœuds sans enfants

### 2025-12-20

**Renommage**

- Le plugin renommé de `ComfyUI-Translation-node` en `ComfyUI-Chinese-Translation`
- Nom d'affichage changé de « Translation Node » en « 中文翻译 » pour mieux correspondre au positionnement du plugin

**Améliorations**

- Refonte vers une architecture de fichiers multilingue (version 2.0)
- Ajout d'un panneau de réglages permettant de configurer langue et style de bouton dans les réglages ComfyUI
- Ajout de l'option de style d'UI natif discret
- Correction de la perte des réglages d'icône après redémarrage (merci au membre de la communauté 幻影 pour le signalement)

---

## Communauté et support

**Page de l'auteur**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili** : [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu** : 猪的飞行梦

**Groupe communautaire**

- **Groupe QQ ComfyUI** : `202018000`

**Retours et contribution**

- **Signalement de bugs** : [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Contribuer aux traductions** : les PR ajoutant des fichiers de traduction sont les bienvenues

**Soutenir l'auteur**

Si le plugin vous plaît, pensez à une ⭐ Star et à soutenir l'auteur :

- **Soutien** :
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Licence

Ce projet est publié sous [Licence MIT](LICENSE).

Copyright (c) 2025 猪的飞行梦

Chacun est libre de copier, modifier et distribuer ce projet, à condition de conserver la mention originale du droit d'auteur. Voir le fichier [LICENSE](LICENSE) pour les détails.

---

## Clause de non-responsabilité

La présente traduction et le contenu partagé sont soumis aux points suivants :

**Caractère non commercial**

Cette traduction est une démarche personnelle et bénévole ; aucune rémunération ni avantage commercial n'a été reçu. Elle sert uniquement à l'apprentissage, à l'échange et au partage du savoir.

**Aucune garantie d'exactitude**

La traduction s'efforce d'être fidèle à l'original mais ne garantit ni l'exactitude, ni l'exhaustivité, ni l'actualité, ni l'adéquation à un usage. Tout risque et toute conséquence liés à l'usage ou à la dépendance à cette traduction incombent à l'utilisateur.

**Appartenance de la source originale**

Les droits d'auteur des matériaux originaux sur lesquels cette traduction s'appuie (incluant mais sans s'y limiter textes, images et vidéos) appartiennent à leurs auteurs ou titulaires initiaux. Cette traduction ne revendique aucun droit sur le contenu original.

**Consulter l'original de préférence**

Pour toute décision importante, tout effet juridique, toute mise en œuvre technique ou tout jugement professionnel, consultez et basez-vous impérativement sur la version originale officielle, et non sur cette traduction.

**Réservation des droits**

Si un titulaire estime que cette traduction porte atteinte à ses droits légitimes, veuillez me contacter rapidement et je la supprimerai ou la traiterai sans délai.

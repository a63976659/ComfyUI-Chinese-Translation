<div align="center">

# 🌐 ComfyUI-Global-Translation

**ComfyUI arayüzü için kapsamlı, akıllı ve uyumlu çok dilli çeviri çözümü**

> Ön yüz ve arka yüzü birleştiren gerçek zamanlı çeviri eklentisi: düğümleri, menüleri, ayar panelini, yöneticiyi ve görünen her metni kapsar; ComfyUI'nin resmi yerel çevirisiyle tam uyumludur.

[![Stars](https://img.shields.io/github/stars/a63976659/ComfyUI-Global-Translation?style=social&logo=github)](https://github.com/a63976659/ComfyUI-Global-Translation)
[![Version](https://img.shields.io/badge/version-3.0.1-2f74c0)](pyproject.toml)
[![License](https://img.shields.io/badge/license-MIT-3da92f)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-15-8a2be2)](#kullanım)
[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

### 🌍 语言 · Language

[简体中文](README.md) · [English](README.en-US.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja-JP.md) · [한국어](README.ko-KR.md) · [Русский](README.ru-RU.md) · [Français](README.fr-FR.md) · [Deutsch](README.de-DE.md) · [Español](README.es-ES.md) · [Italiano](README.it-IT.md) · [Português](README.pt-BR.md) · [العربية](README.ar-SA.md) · **Türkçe** · [فارسی](README.fa-IR.md) · [עברית](README.he-IL.md)

> Yazar: **猪的飞行梦** — Bu proje, [AIGODLIKE-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-ComfyUI-Translation) ve [ComfyUI-DD-Translation](https://github.com/Dontdrunk/ComfyUI-DD-Translation) temel alınarak değiştirilmiştir. Açık kaynak topluluğuna üstün katkıları için yazarlarına özel teşekkürler. Bu proje açık kaynak olarak kalmaya devam edecek.

</div>

---

## İçindekiler

- [Eklenti Tanıtımı](#eklenti-tanıtımı)
- [Temel Özellikler](#temel-özellikler)
- [Vitrin](#vitrin)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Çeviri Kapsamı](#çeviri-kapsamı)
- [Mimari](#mimari)
- [Notlar](#notlar)
- [Değişiklik Günlüğü](#değişiklik-günlüğü)
- [Topluluk ve Destek](#topluluk-ve-destek)
- [Lisans](#lisans)
- [Yasal Uyarı](#yasal-uyarı)

---

## Eklenti Tanıtımı

ComfyUI-Global-Translation, ComfyUI için tasarlanmış bir çeviri eklentisidir. Ön yüz ve arka yüz işbirliği sayesinde düğümleri, menüleri, ayar panelini, yöneticiyi ve görünen her metni kapsayan gerçek zamanlı arayüz çevirisi sunar; ComfyUI'nin resmi yerel çevirisiyle mükemmel biçimde bir arada yaşar. Çeviri dili, ComfyUI'nin resmi dil ayarını otomatik olarak izler (Ayarlar → Genel → `Comfy.Locale`); eklentinin kendi arayüz metinleri 15 dili destekler.

### Bu eklentiyi neden seçmelisiniz?

| Özellik | Bu eklenti | Diğer çeviri eklentileri |
|------|--------|-------------|
| Resmi çeviriyle uyumlu | ✅ Mevcut resmi çevirilerin üzerine yazmaz | ❌ Çakışabilir |
| Sağ tık menüsü işlevleri | ✅ Çeviriden sonra da çalışmaya devam eder | ❌ Bazı işlevler bozulur |
| Eski ve yeni arayüz uyumu | ✅ Çift buton mimarisi | ❌ Yalnızca tek sürüm |
| Gerçek zamanlı değiştirme | ✅ Yeniden başlatma gerekmez | ❌ Yeniden başlatma gerekir |
| Özel başlık koruması | ✅ Kullanıcı düzenlemelerinin üzerine yazmaz | ❌ Üzerine yazılabilir |

---

## Temel Özellikler

### 🎯 Akıllı çeviri sistemi

- **Akıllı algılama** — zaten çevrilmiş metni otomatik olarak tanır, tekrarlayan çeviriyi ve sonsuz özyinelemeyi önler
- **Yerel uyumluluk** — ComfyUI'nin resmi çevirisiyle karşılıklı müdahale olmadan mükemmel biçimde bir arada yaşar
- **Bağlam farkındalığı** — öğe türüne göre (düğümler, menüler, widgetlar vb.) en uygun stratejiyi uygular
- **Akıllı veri birleştirme** — birden fazla çeviri dosyası aynı düğümü içerdiğinde, girdiler birbirinin üzerine yazılmak yerine bütünleyici biçimde birleştirilir
- **Özel panel çevirisi** — düğümler içinde oluşturulan panellerdeki (butonlar, etiketler, açılır menüler, ipuçları, açılır pencereler vb.) metinler de otomatik olarak çevrilir
- **Geri çağırma güvenliği** — sağ tık menüsü çevrildikten sonra tüm işlevler (bağlantıyı kes, yeniden adlandır vb.) doğru şekilde çalışmaya devam eder

### 🎨 Güzel kullanıcı arayüzü

- **Segmentli hap kontrolü** — "açık/kapalı" segmentleri arasında mavi bir kaydırıcının yumuşakça kaydığı, yuvarlak hatlı hap biçimli anahtar; modern görünüm
- **Gökkuşağı efekti** — etkin durumda akıcı bir gökkuşağı gradyan animasyonu gösterir
- **Minimal gri tasarım** — etkisiz durumda zarif bir gri gradyan kullanır
- **Sade yerel mod** — isteğe bağlı olarak ComfyUI'nin varsayılan temasına uygun sakin bir renk paleti
- **Gerçek zamanlı geri bildirim** — buton metni ve rengi, güncel çeviri durumunu anında yansıtır

### 🔧 Esnek çeviri yönetimi

- **Gerçek zamanlı değiştirme** — yeniden başlatmadan çeviriyi açma/kapama
- **Kalıcı durum** — ayarlar otomatik olarak kaydedilir ve yeniden başlatmalarda korunur
- **Ayar paneli entegrasyonu** — anahtar stilini ve açılır menü seçeneklerinin çevirisini ComfyUI ayarlarından yapılandırma (dil, ComfyUI'nin resmi ayarını izler)
- **Eklenti bazında anahtar** — yerleşik yönetici, belirli eklentilerin çevirisini devre dışı bırakmanıza olanak tanır
- **Anında ekle ve uygula** — yeni çeviri dosyaları yeniden başlatmadan geçerli olur

### 🛡️ Kararlı ve güvenilir

- **Sağlam hata yönetimi** — tüm kritik işlemler koruma altındadır
- **Zarif geri dönüş** — çeviri başarısız olursa otomatik olarak orijinal metne döner
- **DOM koruması** — çeviri, Vue/PrimeVue bileşenlerinin olay bağlarını bozmaz
- **Çoklu sürüm uyumluluğu** — ComfyUI'nin hem eski hem yeni arayüzlerini destekler

---

## Vitrin
Yalnızca Çince ve İngilizce görünümler gösterilmektedir; diğer diller için değiştirip kendiniz kontrol edin. Anahtar, ComfyUI dil ayarını izler.

### Çeviri etkinleştirme butonları

<img width="150" height="100" alt="çince-anahtar-1" src="https://github.com/user-attachments/assets/775bb652-3b66-404c-9531-e6147d1dbeff" />
<img width="150" height="100" alt="ingilizce-anahtar-1" src="https://github.com/user-attachments/assets/c1bdce29-fb07-4861-9f05-ba87049e4557" />
<img width="150" height="100" alt="çince-anahtar-2" src="https://github.com/user-attachments/assets/40c692c6-142b-4512-94a6-ba95800254d8" />
<img width="150" height="100" alt="ingilizce-anahtar-2" src="https://github.com/user-attachments/assets/18c970d0-a8f8-450d-894c-19aecbd2f80b" />
<img width="150" height="100" alt="çince-anahtar-3" src="https://github.com/user-attachments/assets/2e84be85-f06e-4bcd-9d58-bfb6f2ca6170" />
<img width="150" height="100" alt="ingilizce-anahtar-3" src="https://github.com/user-attachments/assets/bedb11e2-1e34-4558-8bdb-d11f6d3a18fe" />

### Yönetim arayüzü

<img width="2000" height="1500" alt="ayar-ekranı" src="https://github.com/user-attachments/assets/1c1607a1-9153-4f9a-aeec-cd49458dd5b4" />
<img width="2000" height="1500" alt="ayar-ekranı-ingilizce" src="https://github.com/user-attachments/assets/71d1c68a-3e3f-41a7-867b-8d42543faba1" />

---

## Kurulum

### Yöntem 1: Git ile klonlama (önerilen)

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/a63976659/ComfyUI-Global-Translation.git
```

Kurulumdan sonra ComfyUI'yi yeniden başlatın.

#### Yöntem 1 — yeni başlayanlar için ayrıntılı anlatım:

1. Eklenti klasörünü açın: `ComfyUI\custom_nodes`
2. Win11'de boş bir alana sağ tıklayıp "Terminalde Aç" seçeneğini seçin. Win10'da adres çubuğuna `cmd` yazıp Enter'a basın.
3. Bu sayfanın sağ üst köşesindeki **Code** butonuna tıklayın ve adresi kopyalayın (URL'yi de kopyalayabilirsiniz)
4. Terminale `git clone ` yazın, adresi yapıştırın ve Enter'a basın. Örnek: `git clone https://github.com/a63976659/ComfyUI-Global-Translation.git`
5. Kurulum tamamlandı, ComfyUI'yi yeniden başlatın. (Kurulum başarısız olursa bir vekil sunucu/VPN etkinleştirip tekrar deneyin.)



### Yöntem 2: ComfyUI Manager

1. ComfyUI Manager'ı açın
2. Veri kaynağını değiştirin: Kanal (Uzak)
3. Düğüm Yöneticisi'ne tıklayın
4. Şunu arayın: **猪的飞行梦**
5. Yükle'ye tıklayın ve ComfyUI'yi yeniden başlatın

### Yöntem 3: Manuel indirme (önerilmez, güncelleme yok)

1. GitHub sayfasında **Code → Download ZIP** seçeneğine tıklayın
2. `ComfyUI/custom_nodes/ComfyUI-Global-Translation` konumuna açın
3. ComfyUI'yi yeniden başlatın

---

## Kullanım

### Çeviri anahtarı

Kurulumdan sonra arayüzde bir çeviri etkinleştirme butonu belirir; çeviri durumunu değiştirmek için tıklayın:

- **Çeviri açık** — buton "çeviri açık" olarak gösterilir ve arayüz metni güncel dile çevrilir (ComfyUI'nin resmi dil ayarını izler)
- **Çeviri kapalı** — buton "çeviri kapalı" olarak gösterilir ve orijinal İngilizce arayüzü geri yüklenir

### Çeviri dili

Çeviri dili artık eklenti içinde ayarlanmıyor; **ComfyUI'nin resmi dil ayarını otomatik olarak izler** (Ayarlar → Genel → Dil / `Comfy.Locale`):

- Resmi olarak desteklenen tüm dillerle eşleşir: Basitleştirilmiş Çince, Geleneksel Çince, İngilizce, Japonca, Korece, Rusça, Fransızca, Almanca, İspanyolca, İtalyanca, Portekizce (Brezilya), Türkçe, Arapça, Farsça, İbranice; kapsanmayan diller İngilizce'ye geri döner
- ComfyUI ayarlarında resmi dil değiştirildikten sonra sayfa otomatik olarak yenilenir; çeviri ve eklenti metinleri birlikte uygulanır, elle yeniden başlatma gerekmez

### Ayar paneli

ComfyUI Ayarlar → «🌐 Çeviri Ayarları» bölümünde iki seçenek bulunur. Arayüz metinleri güncel dile yerelleştirilir (15 dil) ve tüm dillerde tutarlı bir bölüm sırası korunur:

| Seçenek | Açıklama | Seçimler |
|-------|------|------|
| 🎨 Anahtar stili | Görünümü seçin; yenilemeden anında yeniden çizilir | pill (segmentli hap) / gradient (gökkuşağı) / plain (sade yerel) |
| 📋 Açılır menü seçenekleri | COMBO açılır menülerindeki seçenek metinlerinin de çevrilip çevrilmeyeceği | Açık / Kapalı (değişiklikte otomatik yeniler) |

Seçeneklerin altında ayrıca bir **Eklenti Çeviri Yöneticisi** paneli bulunur: çeviri dosyası olan tüm eklentileri listeler — birinin çevirisini devre dışı bırakmak için işaretini kaldırın; kaydettikten sonra sayfa yenilenir.

> 💡 **Segmentli hap (önerilen)**: yuvarlak hatlı bir hap biçimi ve güncel durumun üzerinde vurgulanmış mavi bir kaydırıcı. Mavi kaydırıcıya **tıklayın** ki diğer tarafa kaysın; seçim anında yapılandırma dosyasına kaydedilir ve ComfyUI yeniden başlatıldıktan sonra da korunur.

### Buton stili referansı

| Stil | Açık | Kapalı | En uygun olduğu durum |
|-----|---------|---------|----------|
| **Segmentli hap** | "açık" segmentinin üzerinde mavi kaydırıcı, kalın beyaz metin | Mavi kaydırıcı "kapalı"ya kaymış, gri metin | Modern ve minimal, duruma tek bakışta hakimiyet |
| **Gökkuşağı gradyanı** | Akıcı gökkuşağı animasyonu, kalın beyaz | Akıcı gri animasyon, kalın koyu metin | Dikkat çekici bir şey istiyorsanız |
| **Sade yerel** | ComfyUI tema rengi arka planı | Koyu arka plan, gri metin | Arayüze karışmak istiyorsanız |

> **Segmentli hap etkileşimi**: yalnızca vurgulanmış mavi kaydırıcı değiştirmeyi tetikler — tıklandığında önce bir kayma animasyonu (~300 ms) oynatır, ardından kaydeder ve sayfayı yeniler; gri metin bölümü yalnızca bir durum etiketidir ve tıklamaya tepki vermemesi bilinçli bir davranıştır.

---

## Çeviri Kapsamı

### Neler çevrilir

| Kategori | Kapsam | Durum |
|------|---------|------|
| **Düğüm adları** | Tüm iş akışı düğümlerinin başlıkları ve görünen adları | ✅ |
| **Düğüm özellikleri** | Giriş/çıkış portları, widget etiketleri, açıklamalar | ✅ |
| **Menüler** | Ana menü, sağ tık menüsü, bağlam menüsü | ✅ |
| **Ayar paneli** | ComfyUI ayarlar penceresi | ✅ |
| **Yönetici** | ComfyUI Manager arayüzü | ✅ |
| **Şablon kitaplığı** | İş akışı şablonu adları | ✅ |
| **Arayüz öğeleri** | Butonlar, etiketler, araç ipuçları, arama kutusu | ✅ |
| **Özel paneller** | Düğüm içinde oluşturulan DOM panellerindeki butonlar, etiketler, açılır menüler, ipuçları, açılır pencereler | ✅ |
| **Kuyruk bilgisi** | Kuyruk boyutu gibi dinamik metinler | ✅ |

### Çeviri dosyası yapısı

```
tr-TR/
├── Nodes/          # Düğüm çevirileri (başlık, girişler, çıkışlar, widgetlar, özel paneller)
│   └── internal.json
├── Categories/     # Düğüm kategorisi çevirileri
│   ├── Internal.json
│   └── Other.json
└── Menus/          # Menü ve arayüz çevirileri
    ├── Comfy设置菜单及管理器菜单.json
    ├── Comfy条件选项.json
    ├── Comfy模版汉化-zdfxm.json
    └── ...
```

> Diğer dil klasörleri (`zh-CN/`, `zh-TW/`, `en-US/`, `ja-JP/`, `ko-KR/`, `ru-RU/`, `fr-FR/`, `de-DE/`, `es-ES/`, `it-IT/`, `pt-BR/`, `ar-SA/`, `fa-IR/`, `he-IL/`) aynı yapıyı paylaşır ve güncel dile göre yüklenir; `en-US/`, Çin dışı eklentilerin düğümlerini İngilizce'ye geri döndürmek için kullanılır.

### Özel çeviri ekleme

`tr-TR/Nodes/` altında bir JSON dosyası oluşturun:

```json
{
  "YourNodeClassName": {
    "title": "Düğüm görünen adınız",
    "inputs": {
      "input_name": "çevrilmiş giriş adı"
    },
    "outputs": {
      "output_name": "çevrilmiş çıkış adı"
    },
    "widgets": {
      "widget_name": "çevrilmiş widget adı"
    },
    "ui": {
      "English text in panel": "çevrilmiş panel metni"
    }
  }
}
```

> **Yazım ipuçları**
>
> - `widgets` anahtarları, widgetın **gerçek adını** (kaynaktaki parametre adı, örn. `target_language`) kullanmalıdır, ekrandaki display_name'i (örn. `Target Language`) değil. V3 API (io.Schema) kullanan eklentiler için en iyi uyumluluk adına hem gerçek adı hem de display_name'i anahtar olarak yazın
> - `ui` alanı, özel panellerdeki (`addDOMWidget` ile oluşturulan) İngilizce metinleri çevirir; anahtar ekranda görünen İngilizce metin, değer ise çevirisidir
> - "Kimlik çevirileri" (değeri anahtarına eşit, örn. `"cfg": "cfg"`) eklemeyin — hiçbir anlam taşımazlar
> - Anahtar yazımını iki kez kontrol edin; kaynakla farklı olan bir anahtar (örn. `perturb_atttn` içindeki fazladan `t`) sessizce çeviriyi başarısız kılar

`tr-TR/Menus/` altında bir JSON dosyası oluşturun ve menü çevirileri ekleyin:

```json
{
  "English Menu Text": "çevrilmiş menü metni",
  "Another Item": "başka bir öğe"
}
```

> Çeviri dosyaları eklendikten sonra yeniden başlatmaya gerek yoktur — çeviriyi değiştirmek bunları anında uygular.

---

## Mimari

### Genel yapı

```
┌──────────────────────────────────────────────────────┐
│                   ComfyUI ana programı                │
│                                                        │
│  Python arka yüzü (__init__.py)   Ön yüz JS (js/)      │
│  ├─ HTTP API rotaları             ├─ main.js (motor)   │
│  ├─ çeviri derleme                 ├─ MenuTranslate.js  │
│  └─ ayar kalıcılığı                └─ utils.js (yardımcı)│
│         │                             │                │
│         ▼                             ▼                │
│   tr-TR/ çeviri verisi         MutationObserver        │
│   ├─ Nodes/*.json              gerçek zamanlı DOM çevirisi
│   ├─ Categories/*.json                                 │
│   └─ Menus/*.json                                      │
└──────────────────────────────────────────────────────┘
```

### Temel teknikler

| Teknik | Açıklama |
|------|------|
| **Geri Çağırma Sarmalama** | Sağ tık menüsü metnini çevirirken altta yatan geri çağırmanın `content` eşleşmesini korur |
| **Çift buton mimarisi** | Hem eski `.comfy-menu` hem yeni `.comfyui-menu` arayüzlerini destekler |
| **MutationObserver** | DOM değişikliklerini gerçek zamanlı izler ve yeni beliren öğeleri otomatik çevirir |
| **translatedValueSet** | Bir metnin çevrilip çevrilmediğini O(1) hızında denetlemek için Set kullanır, tekrarlayan işlemi önler |
| **Yaprak düğüm koruması** | `innerText` atamasını yalnızca çocuğu olmayan düğümlere yapar, Vue olay bağlarını korur |
| **Gzip aktarımı** | Çeviri verisi ağ maliyetini azaltmak için Gzip sıkıştırılmış olarak aktarılır |

> Tam teknik ayrıntılar için bkz. [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## Notlar

### Uyumluluk

- **Çeviri eklentisi çakışmaları** — bu eklenti diğer çeviri eklentileriyle (örn. AIGODLIKE-ComfyUI-Translation) çakışır; kullanmadan önce onların kurulumunu kaldırın
- **Bilinen çakışan eklenti** — `ComfyUI Browser` uyumluluk sorunları yaşatabilir
- **Tarayıcı desteği** — Chrome, Edge ve 360 Browser önerilir; diğerleri tam olarak test edilmemiştir

### Gereksinimler

| Bileşen | Gereksinim |
|------|------|
| ComfyUI | En son sürüm (eski ve yeni arayüzle uyumlu) |
| Python | 3.8+ |
| Tarayıcı | Chrome / Edge (önerilir) |

---

## Değişiklik Günlüğü

### 2026-09-24

- Bir güvenlik sorunu giderildi: özenle hazırlanmış bir istekle eklentinin kendi klasörü dışındaki dosyalar okunabiliyordu; artık eklenti yalnızca kendi klasöründeki çeviri dosyalarını okuyor

### 2026-09-21

**Arapça (ar-SA), Farsça (fa-IR) ve İbranice (he-IL) çevirileri eklendi**

- Sağdan sola yazılan (RTL) üç dil için düğümleri, kategorileri, menüleri ve ayar panelini kapsayan çeviri paketleri tamamlandı; otomatik olarak etkinleştirmek için ComfyUI'nin resmi dilini `ar-SA` / `fa-IR` / `he-IL` olarak ayarlayın

**Yeni ComfyUI'de çeviri anahtarı konumu iyileştirildi**

- Anahtar artık öncelikle komut çubuğuna (ComfyUI-Manager ayar düğmesiyle aynı satıra) eklenir; başlangıçta çapa hazır değilse bekçi, hazır olduğunda onu otomatik olarak taşır. Montaj öncesi titreme koruması ve montaj sonrası kapsül kaydırıcı konumunun otomatik yeniden hesaplanması eklendi

### 2026-09-20

**Japonca (ja-JP) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Japonca çeviri paketi tamamlandı; Japonca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `ja-JP` olarak ayarlayın

**İspanyolca (es-ES) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan İspanyolca çeviri paketi tamamlandı; İspanyolca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `es-ES` olarak ayarlayın

**Korece (ko-KR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Korece çeviri paketi tamamlandı; Korece arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `ko-KR` olarak ayarlayın

**Türkçe (tr-TR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Türkçe çeviri paketi tamamlandı; Türkçe arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `tr-TR` olarak ayarlayın

**İtalyanca (it-IT) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan İtalyanca çeviri paketi tamamlandı; İtalyanca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `it-IT` olarak ayarlayın

**Brezilya Portekizcesi (pt-BR) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Brezilya Portekizcesi çeviri paketi tamamlandı; Portekçe arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `pt-BR` olarak ayarlayın

**Almanca (de-DE) çevirisi eklendi**

- Düğümleri, kategorileri, menüleri ve ayar panelini kapsayan Almanca çeviri paketi tamamlandı; Almanca arayüzü etkinleştirmek için ComfyUI'nin resmi dilini `de-DE` olarak ayarlayın

### 2026-09-19

**Dil, resmi ayarı izliyor**

- Eklenti içindeki "çeviri dili" seçeneği kaldırıldı; çeviri dili artık ComfyUI'nin resmi dil ayarını (`Comfy.Locale`) izliyor
- Resmi dil değiştirildikten sonra sayfa otomatik olarak yenilenir; çeviri ve eklenti arayüz metinleri birlikte uygulanır, elle yeniden başlatma gerekmez

**Çok dilli ayar arayüzü ve birleşik düzen**

- Anahtar etiketleri ve ayar arayüzü metinleri 15 dili kapsıyor (Geleneksel Çince ile sağdan sola yazılan Arapça, Farsça ve İbranice dahil); bilinmeyen diller İngilizce'ye geri döner
- Ayar paneli, tüm dillerde tutarlı bir bölüm sırasını korur: anahtar stili → açılır menü seçenekleri → eklenti yöneticisi; bölüm başlıkları çevrilir
- "Eklenti Çeviri Yöneticisi" artık çift çevrilmiyor ve her zaman güncel arayüz diliyle eşleşiyor
- Anahtarın açık durumundaki etiketi `(dil kodu)` sonekini bırakıyor, yalnızca metni koruyor

### 2026-09-12

- Birden fazla çeviri dosyası aynı düğümü içerdiğinde çevirilerin kaybolması düzeltildi; artık bütünleyici biçimde birleştiriliyor
- Özel panel çevirisi desteği eklendi: paneller içindeki butonlar, etiketler, açılır menüler, ipuçları ve açılır pencereler artık otomatik olarak çevriliyor
- Bir widget "girişe dönüştürüldükten" sonra port adlarının İngilizce kalması düzeltildi
- Daha sonra oluşturulan düğümlerin de çevrilmesini sağlamak için bir çeviri koruyucusu eklendi
- Optimizasyon için 石头 (Q:34720803) kullanıcısına teşekkürler

### 2026-09-07

- Kenar çubuğundaki "İş Akışları" listesinin kendi iş akışı adlarınızı Çince'ye yanlışlıkla çevirmesi düzeltildi; artık olduğu gibi korunuyor

### 2026-08-20

- Açık ve kapalı arasında kayan mavi bir kaydırıcıya sahip "segmentli hap" anahtar stili eklendi, duruma tek bakışta hakimiyet

### 2026-07-27

**Düzeltme: V3 API düğüm widget çevirisinin başarısız olması**

- V3 API (io.Schema) ile yazılmış eklentilerde widgetların çevrilmemesi düzeltildi, örn. ComfyUI-qwenmultiangle
- **Kök neden**: V3 düğümleri genellikle bir widget için İngilizce bir `display_name` bildirir (ad `horizontal_angle`, etiket `Horizontal Angle`); eski "zaten çevrilmiş" denetimi, "etiket ≠ ad" olan her şeyi yerel bir çeviri olarak yorumlayıp atlıyordu
- **Düzeltme**: `isAlreadyTranslated` normalize edilmiş bir karşılaştırma ekledi — yalnızca adı güzelleştirilmiş (büyük/küçük harf/boşluk/alt çizgi/tire farkları) bir etiket çevrilmiş sayılmaz

**Düzeltme: Kimlik çevirilerinin "zaten çevrilmiş" kümesini kirletmesi**

- Belirli widgetların (örn. `cfg`) hiçbir düğümde hiç çevrilmemesi düzeltildi
- **Kök neden**: bazı dosyalarda kimlik girdileri (örn. `"cfg": "cfg"`) vardı; değeri `translatedValueSet` içine girdiğinde, İngilizce ad "zaten çevrilmiş" olarak yanlış yorumlanıp genel olarak engelleniyordu
- **Düzeltme**: kümeyi oluştururken değeri anahtarına eşit olan girdiler atlanır

**Çeviri dosyası düzeltmeleri**

- ComfyUI-LTXVideo içindeki anahtar yazım hataları düzeltildi (`perturb_atttn`→`perturb_attn`, `cross_atttn`→`cross_attn`, `quantize_fnn`→`quantize_ffn`)
- ComfyUI-qwenmultiangle için eksik gerçek widget adı anahtarları eklendi (`target_language`, `prompt`)

### 2026-04-08

**Düzeltme: sağ tık menüsü işlevlerinin bozulması**

- Çeviri açıkken, çıkış yuvası sağ tık menüsündeki "bağlantıyı kes" ve "portu yeniden adlandır" gibi eylemlerin yanıt vermemesine yol açan ciddi bir hata düzeltildi
- **Kök neden**: LiteGraph geri çağırmaları İngilizce `value.content` ile eşleştirerek dağıtır; çeviriden sonra eşleşme başarısız oldu
- **Düzeltme**: Geri Çağırma Sarmalama uygulandı — geri çağırma çalıştırıldığı anda İngilizce geçici olarak geri yüklenir, ardından Çince geri yüklenir; böylece hem çevrilmiş gösterim hem de doğru davranış korunur
- Hem `value.callback` (bireysel) hem `options.callback` (paylaşılan) modlarını sarar
- Tuval menüsünün iş hattından iki kez geçtikten sonra orijinal değerini kaybetmemesi için `_originalContent` çoklu çeviri üzerine yazma koruması eklendi

**Düzeltme: DOM çevirisi olay bağlarını bozuyor**

- `replaceText`'in `innerText` atamasının alt öğeleri ve Vue/PrimeVue dinleyicilerini yok etmesi düzeltildi
- **Düzeltme**: bir yaprak düğüm denetimi `target.children.length === 0` eklendi; `innerText` yalnızca çocuğu olmayan düğümlere atanır

### 2025-12-20

**Yeniden adlandırma**

- Eklentinin adı `ComfyUI-Translation-node`'den `ComfyUI-Chinese-Translation` olarak değiştirildi
- Görünen ad, eklentinin konumuyla daha iyi eşleşmesi için "Translation Node"dan "Chinese Translation"a değiştirildi

**İyileştirmeler**

- Çok dilli dosya mimarisine yeniden yapıldı (sürüm 2.0)
- ComfyUI ayarları içinde dili ve buton stilini yapılandırmak için bir ayar paneli eklendi
- Sade yerel arayüz stili seçeneği eklendi
- Yeniden başlatma sonrası simge ayarlarının kaybolması düzeltildi (topluluk üyesi 幻影'in bildirimi sayesinde)

---

## Topluluk ve Destek

**Yazarın sayfası**

[![Bilibili](https://img.shields.io/badge/bilibili-猪的飞行梦-00A1D6?logo=bilibili&logoColor=white)](https://space.bilibili.com/2114638644)

- **Bilibili**: [猪的飞行梦](https://space.bilibili.com/2114638644)
- **Xiaohongshu**: 猪的飞行梦

**Topluluk grubu**

- **ComfyUI QQ grubu**: `202018000`

**Geri bildirim ve katkı**

- **Hata raporları**: [GitHub Issues](https://github.com/a63976659/ComfyUI-Global-Translation/issues)
- **Çeviriye katkı**: çeviri dosyaları ekleyen PR'lar bekleniyor

**Yazarı destekleyin**

Eklentiyi faydalı buluyorsanız, lütfen bir ⭐ Star vermeyi ve yazarı desteklemeyi düşünün:

- **Destek**:
<img width="400" height="500" alt="微信图片_20260920163034" src="https://github.com/user-attachments/assets/47f64c6e-cc45-4395-9b9e-29f464d12df2" />
<img width="400" height="500" alt="微信图片_20260920163043" src="https://github.com/user-attachments/assets/7bfb521a-6f24-4104-89c0-016dcf74834b" />

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında açık kaynak olarak yayımlanmıştır.

Telif hakkı (c) 2025 猪的飞行梦

Orijinal telif hakkı bildirimini koruduğunuz sürece bu projeyi özgürce kopyalayabilir, değiştirebilir ve dağıtabilirsiniz. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.

---

## Yasal Uyarı

Bu çeviri ve paylaşılan içerik aşağıdakilere tabidir:

**Ticari değil**

Bu çeviri kişisel, ücretsiz bir çalışmadır; hiçbir ücret veya ticari fayda alınmamıştır. Yalnızca öğrenme, tartışma ve bilgi paylaşımı amaçlıdır.

**Doğruluk garantisi yok**

Çeviri, orijinale sadık kalmaya özen gösterir ancak doğruluk, tamlık, güncellik veya bir amaca uygunluk konusunda hiçbir garanti vermez. Bu çevirinin kullanımı veya buna güvenmeden doğan her türlü risk ve sonuç kullanıcıya aittir.

**Orijinal kaynak atfı**

Bu çevirinin dayandığı orijinal materyallerin (metin, görüntü ve videolar dahil ancak bunlarla sınırlı olmamak üzere) telif hakkı ilgili yazarlara veya orijinal hak sahiplerine aittir. Bu çeviri, orijinal içerik üzerinde hak iddia etmez.

**Orijinale başvurun**

Önemli kararlar, yasal etki, teknik uygulama veya profesyonel yargı için lütfen her zaman bu çeviri yerine resmi orijinal sürüme danışın ve ona güvenin.

**Haklar saklıdır**

Bir hak sahibi, bu çevirinin yasal haklarını ihlal ettiğine inanıyorsa lütfen beni derhal bilgilendirin; uygun şekilde kaldırır veya düzeltirim.

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Second pass: prompt docs, readme prose, kit docs, residual strings."""

T2 = {
# residual card metadata
'subtitle="Durum renkleri — success primary ailesinden gelir"':
    'subtitle="Status colours — success comes from the primary family"',
"Ana metin · 16.4:1": "Body text · 16.4:1",

# ---- component prompt docs ----
"Ana eylem butonu; bir ekranda yalnızca bir tane `primary` bulunur.":
    "The main action control; only one `primary` per screen.",
"Varyantlar: primary (marka yeşili), secondary (çerçeveli), subtle (açık yeşil zemin), ghost, danger. Boyutlar small/medium/large. Yıkıcı işlemler için `danger`, onay diyaloğu ile birlikte.":
    "Variants: primary (brand green), secondary (outlined), subtle (light green ground), ghost, danger. Sizes small/medium/large. Use `danger` for destructive actions, paired with a confirmation dialog.",
"Yalnız ikon içeren dairesel buton; `label` zorunludur.":
    "A circular, icon-only button; `label` is required.",
"Varyantlar: ghost (araç çubukları), outline (kart üstü), solid (öne çıkan tekil eylem).":
    "Variants: ghost (toolbars), outline (on cards), solid (a single prominent action).",
"Durum etiketi (stok, kargo, indirim). Tıklanmaz — tıklanabilir olan `Tag`.":
    "A status label (stock, shipping, discount). Not clickable — `Tag` is the clickable one.",
"Filtre çipi. Seçiliyken primary yeşil dolgu alır.":
    "A filter chip. It takes a primary green fill when selected.",
"İçerik kabı. Listelerde `flat`, tıklanabilir ürün kartlarında `interactive`.":
    "A content container. Use `flat` in lists and `interactive` for clickable product cards.",
"Metin alanı. Hata varsa `hint` yerine `error` gösterilir.":
    "A text field. When there's an error, `error` replaces `hint`.",
"Bağımsız açık/kapalı seçimler için. Ayarların anında uygulandığı yerde `Switch` kullan.":
    "For independent on/off choices. Where a setting applies instantly, use `Switch`.",
"2–5 seçenekli tekli seçim. Daha fazlası için `Select`.":
    "Single choice among 2–5 options. Use `Select` for more.",
"Tek seçimli açılır liste; 5+ seçenekte kullanılır (altında Radio tercih edilir).":
    "A single-choice dropdown, used at 5+ options (below that, prefer Radio).",
"Anında etkili ayar anahtarı — kaydet butonu gerektiren formlarda `Checkbox` kullan.":
    "A setting toggle that applies immediately — in forms that need a save button, use `Checkbox`.",
"Aynı bağlamdaki görünümler arasında geçiş. 2–6 sekme; daha fazlası için sol menü.":
    "Switches between views in the same context. 2–6 tabs; beyond that, use a side menu.",
"Onay ve kısa görevler için modal. Eylemler sağ altta; birincil eylem en sağda.":
    "A modal for confirmations and short tasks. Actions sit bottom right, with the primary action furthest right.",
"Geçici bildirim; ekranın sağ altında 4–6 sn görünür.":
    "A transient notification; appears bottom right for 4–6 seconds.",
"Kısa açıklama balonu; tek satırı geçmez, kritik bilgi taşımaz.":
    "A short hint bubble; never more than one line, never carries critical information.",

# prompt-doc code samples
'description="Bu işlem geri alınamaz."': 'description="This can\'t be undone."',
'<Radio name="kargo" label="Standart" description="2–4 iş günü"':
    '<Radio name="shipping" label="Standard" description="2–4 business days"',
'<Select label="Kargo" options={[{value:\'std\',label:\'Standart\'},{value:\'exp\',label:\'Hızlı\'}]} />':
    '<Select label="Shipping" options={[{value:\'std\',label:\'Standard\'},{value:\'exp\',label:\'Express\'}]} />',
"label:'Tümü',count:24},{value:'new',label:'Yeni'}":
    "label:'All',count:24},{value:'new',label:'New'}",

# ---- storefront kit README ----
"Pazaryeri vitrininin 4 ekranı, tek dosyada tıklanabilir hâlde: **Home → Ürün → Sepet/Ödeme → Satıcı paneli**.":
    "Four screens of the marketplace storefront, clickable in a single file: **Home → Product → Cart/Checkout → Seller dashboard**.",
"`index.html` — React + Babel ile çalışan tıklanabilir prototip. Tokenler `../../styles.css` üzerinden gelir.":
    "`index.html` — a clickable prototype running on React + Babel. Tokens come in through `../../styles.css`.",
"Components `components/` altındaki primitiflerin görsel eşleniğidir (Button, Badge, Tag, Card, Tabs, Toast). Kit içinde yeniden yazılmış hafif kopyalarıdır; üretimde `components/` içindekiler kullanılır.":
    "The components here mirror the primitives in `components/` (Button, Badge, Tag, Card, Tabs, Toast). They're lightweight copies rewritten for the kit; in production, use the ones in `components/`.",
"Photos şeritli placeholder'dır. Gerçek görseller `assets/` altına eklenip `.ph` blokları ile değiştirilmelidir.":
    "Photos are striped placeholders. Add real images under `assets/` and swap out the `.ph` blocks.",
"İkonlar Lucide (CDN). Marka kendi ikon setini verirse değiştirilmeli.":
    "Icons are Lucide, via CDN. Replace them if the brand supplies its own icon set.",
'Akış: bir ürün kartına tıkla → ürün sayfası → "Add to cart" → sağ altta toast → "Sepete git" → "Ödemeye geç" → sipariş onayı.':
    'Flow: click a product card → product page → "Add to cart" → toast bottom right → "Go to cart" → "Checkout" → order confirmation.',
'<Avatar name="Deniz Aydın" size={40} badge="online" />': '<Avatar name="Deniz Aydin" size={40} badge="online" />',
}

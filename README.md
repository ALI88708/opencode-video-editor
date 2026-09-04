# 🎬 Virtual Data Space Project + OpenCode Video Editor

مشروع متكامل يجمع بين **نظام الذاكرة الدائمة للذكاء الاصطناعي (Virtual Data Space - VDS)** و **أداة مونتاج فيديو احترافية كاملة** مدمجة مع opencode، مبنية على **FFmpeg**. تحول مساعدك إلى مونتير فيديو محترف يرى الفيديو، يتخذ قرارات فنية، ويُنفذ المونتاج فعلياً — مع ذاكرة لا تنسى عبر الجلسات والأجهزة.

A complete AI-driven video montage system for opencode with persistent memory (VDS), built on **FFmpeg**. Turns your assistant into a professional video editor that can see videos, make creative decisions, execute real montage — with persistent memory across sessions and devices.

---

## 🧠 Virtual Data Space (VDS) — نظام الذاكرة الدائمة

نظام ذاكرة من 3 طبقات يضمن فصل البيانات الحساسة عن بيانات المستخدم:

| الملف | الامتداد | التشفير | المحتوى | لمن؟ |
|--------|----------|---------|---------|------|
| **Virtual Data Space** | `.vds` | 🔓 لا | معلومات عشوائية/عامة (مشاريع، إعدادات) | الكل |
| **Virtual Data Space User** | `.vdsu` | 🔓 لا | بيانات اليوزر فقط (هوية، تفضيلات، مسارات) | المستخدم |
| **Virtual Data Space System** | `.vdss` | 🔐 **AES-256-GCM** | ذاكرة الـ AI، أسرار، خطط، مفاتيح API | النظام/الـ Agent فقط |

**المفتاح:** يحدده المستخدم عند `vds_init` (فارغ في الريبو — `DEFAULT_MASTER_KEY = ""`)

---

## 🎬 Video Editor — أداة المونتاج الكاملة

أداة مونتاج فيديو احترافية كاملة مدمجة مع opencode، مبنية على **FFmpeg**.

---

## ✨ المميزات / Features

### VDS System (11 أداة)
- `vds_init` — تهيئة المجلد + مفتاح التشفير
- `vds_write` / `vds_read` — كتابة/قراءة `.vds` `.vdsu` `.vdss`
- `vds_list` — عرض جميع الملفات وحالتها
- `vds_delete` / `vds_reset` — حذف/مسح
- `vds_export` / `vds_import` — تصدير/استيراد (مفكك التشفير)
- `vds_encrypt` / `vds_decrypt` — تشفير/فك تشفير يدوي
- `vds_info` — معلومات النظام

### Video Montage (122+ عملية)
- 🎞️ **قص، دمج، انتقالات، سرعة، فلاتر، نصوص، جرين سكرين، ووترمارك، تثبيت، ثومبنيل، تحويل، PiP، تقسيم شاشة، عكس فيديو...**
- 👁️ **رؤية الفيديو**: استخراج إطارات كصور يقرأها النموذج
- 🎨 **نصوص عربية** عبر libass (يدعم الخطوط العربية والإنجليزية)
- 🔊 **مكتبة مؤثرات صوتية** (SFX) من مجلد المستخدم
- 🧠 **فن المونتاج**: SKILL.md يعلم القرارات الفنية (متى القص، متى الموسيقى، أنواع المونتاج ساخر/رسمي/سادة/سينمائي/هايلايتس)

---

## 📦 هيكل الحزمة / Package Structure

```
opencode-video-editor/
├── opencode.json              # إعداد opencode (تسجيل مسار السكيل)
├── skill/
│   └── SKILL.md               # كتالوج معرفة المونتاج الكامل + P.59 VDS System
├── plugin/
│   ├── video-editor.ts        # البلوجن الرئيسي (video_montage + video_preview)
│   ├── vds_core.ts            # مكتبة التشفير AES-256-GCM + VDSManager
│   ├── vds_plugin.ts          # بلوقن VDS (11 أداة)
│   └── vds_types.ts           # Types للـ .vds / .vdsu / .vdss
├── .opencode/
│   └── package.json           # اعتماديات البلوجن
└── README.md                  # هذا الملف
```

---

## 🚀 التثبيت / Installation

### المتطلبات / Requirements
1. **opencode** (النسخة الأحدث)
2. **FFmpeg** (يفضل بناء Gyan الكامل على Windows):
   ```powershell
   winget install Gyan.FFmpeg
   ```

### الخطوات / Steps
1. **انسخ ملفات الحزمة إلى مشروعك** بحيث تصبح:
   ```
   <مشروعك>/
   ├── opencode.json
   └── .opencode/
       ├── package.json
       ├── skills/video-editor/SKILL.md    ← ضع ملف السكيل هنا
       └── plugins/
           ├── video-editor.ts         ← البلوجن الرئيسي
           ├── vds_core.ts             ← مكتبة التشفير
           ├── vds_plugin.ts           # بلوقن VDS
           └── vds_types.ts            # Types
   ```

2. **شغّل التثبيت** داخل `/project/.opencode`:
   ```powershell
   cd .opencode
   npm install
   ```

3. **أعد تشغيل opencode** حتى يُحمَّل السكيل والبلوقن.

4. **تأكد أن الأدوات متوفرة**:
   - `video_montage` (ينفذ عمليات المونتاج + VDS)
   - `video_preview` (يستخرج إطارات لرؤية الفيديو)
   - `vds_init` / `vds_write` / `vds_read` / `vds_list` / `vds_delete` / `vds_export` / `vds_import` / `vds_reset` / `vds_encrypt` / `vds_decrypt` / `vds_info`

---

## 🎮 أمثلة استخدام / Usage Examples

### VDS System
```
> "شغل vds_init مع مفتاح التشفير الخاص بي"
> "خزن هويتي في .vdsu: Ali، 14، Iraq، MRSX PRO"
> "خزن خطة مشروع NEURAL في .vds"
> "خزن مفاتيح API والذاكرة الداخلية في .vdss المشفر"
```

### Video Montage
```
> "خذ هذا الفيديو، اقطع اللحظات الحماسية، أضيف موسيقى وفلتر سينمائي"
> "سوّي لي مونتاج ساخر للفيديو مع المؤثرات الصوتية المضحكة"
> "ابني هايلايتس حماسي مع slow motion عند الـ kills"
```

---

## 🗣️ أنواع المونتاج المدعومة / Montage Styles

| النمط | الوصف |
|-------|------|
| **ساخر / مضحك** (Comedy/Meme) 🤣 | مؤثرات صوتية مضحكة، زوم سريع، نصوص تهكمية |
| **رسمي / احترافي** (Professional) 🎯 | انتقالات ناعمة، ألوان موحدة، نصوص نظيفة |
| **سادة / بدون مؤثرات** (Raw) 🎬 | قص نظيف فقط، بدون إضافات |
| **سينمائي / ملحمي** (Cinematic) 🎥 | Letterbox، LUT، slow motion، موسيقى أوركسترا |
| **حماسي / هايلايتس** (Highlight/Hype) 🔥 | Beat sync، zoom punch، impact SFX، speed ramps |

---

## 🔧 حلول مشاكل معروفة / Troubleshooting

| المشكلة | الحل |
|---------|------|
| `drawtext` يسبب Crash في Windows | استخدم فلتر `subtitles=` أو `ass=` (libass) بدلاً منه |
| مسار الـ libass لا يُقرأ (`C:\...`) | استخدم مسار نسبي أو اهرس `:` كـ `C\:/` |
| تعليق الصورة / تأخر الصوت عند التسريع | المصدر بـ VFR؛ حوّل المقاطع إلى CFR: `-vf "fps=60,setpts=N/60/TB" -r 60` + `aresample=async=1` |
| `.vdss` لا يفك تشفير | تأكد من نفس المفتاح المستخدم في `vds_init` |

---

## ⚠️ مهم
**لا تستخدم Windows Media Player** — لا يعمل مع الفيديوهات التي ينتجها OpenCode لسبب غير معروف.

---

## 👤 المؤلف / Author

صُنع بواسطة **Ali (MR_ALI7685)** — 14 سنة، العراق
- **MRSX PRO** (شركة)
- **CloudMesh** (أداة توزيع الحمل)
- **opencode-video-editor** (هذا المشروع)
- **PROJECT NEURAL** (مشروع المونتاج الذكي)

باستخدام **opencode + FFmpeg + Virtual Data Space**.
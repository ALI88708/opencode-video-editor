# 🎬 opencode-video-editor

أداة مونتاج فيديو احترافية كاملة مدمجة مع opencode، مبنية على **FFmpeg**. تحوّل مساعدك إلى مونتير فيديو محترف يرى الفيديو، يتخذ قرارات فنية، ويُنفذ المونتاج فعلياً.

A complete AI-driven video montage system for opencode, built on **FFmpeg**. Turns your assistant into a professional video editor that can see videos, make creative decisions, and execute real montage.

---

## ✨ المميزات / Features

- 🎞️ **21 عملية مونتاج** جاهزة (قص، دمج، انتقالات، سرعة، فلاتر، نصوص، جرين سكرين، ووترمارك، تثبيت، ثومبنيل، تحويل، PiP، تقسيم شاشة، عكس فيديو...)
- 👁️ **رؤية الفيديو**: استخراج إطارات كصور يقرأها النموذج لفهم المحتوى قبل وبعد المونتاج
- 🎨 **نصوص عربية** عبر libass (يدعم الخطوط العربية والإنجليزية)
- 🔊 **مكتبة مؤثرات صوتية** (SFX) من مجلد المستخدم
- 🧠 **فن المونتاج**: قسم كامل في SKILL.md يعلم القرارات الفنية (متى القص، متى الموسيقى، أنواع المونتاج ساخر/رسمي/سادة/سينمائي/هايلايتس)

---

## 📦 هيكل الحزمة / Package Structure

```
opencode-video-editor/
├── opencode.json              # إعداد opencode (تسجيل مسار السكيل)
├── skill/
│   └── SKILL.md               # كتالوج معرفة المونتاج الكامل
├── plugin/
│   └── video-editor.ts        # البلوجن (أدوات video_montage + video_preview)
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
       └── plugins/video-editor.ts         ← ضع ملف البلوجن هنا
   ```

2. **شغّل التثبيت** داخل `/project/.opencode`:
   ```powershell
   cd .opencode
   npm install
   ```

3. **أعد تشغيل opencode** حتى يُحمَّل السكيل والبلوجن.

4. **تأكد أن الادوات متوفرة** — ستجد:
   - `video_montage` (ينفذ عمليات المونتاج)
   - `video_preview` (يستخرج إطارات لرؤية الفيديو)

---

## 🎮 أمثلة استخدام / Usage Examples

اطلب من المساعد بشكل طبيعي:

> "خذ هذا الفيديو، اقطع اللحظات الحماسية، أضيف موسيقى وفلتر سينمائي، وحط النتيجة في مجلد الإخراج"

أو حدد نوع المونتاج:

> "سوّي لي مونتاج **ساخر** للفيديو مع المؤثرات الصوتية المضحكة"

> "ابني **هايلايتس حماسي** مع slow motion عند الـ kills"

---

## 🗣️ أنواع المونتاج المدعومة / Montage Styles

إسأل المستخدم دائماً أي نمط:
- **ساخر / مضحك** (Comedy/Meme) 🤣
- **رسمي / احترافي** (Professional) 🎯
- **سادة / بدون مؤثرات** (Raw) 🎬
- **سينمائي / ملحمي** (Cinematic) 🎥
- **حماسي / هايلايتس** (Highlight/Hype) 🔥

---

## 🔧 حلول مشاكل معروفة / Troubleshooting

| المشكلة | الحل |
|---------|------|
| `drawtext` يسبب Crash في Windows | استخدم فلتر `subtitles=` أو `ass=` (libass) بدلاً منه |
| مسار الـ libass لا يُقرأ (`C:\...`) | استخدم مسار نسبي أو اهرس `:` كـ `C\:/` |
| تعليق الصورة / تأخر الصوت عند التسريع | المصدر بـ VFR؛ حوّل المقاطع إلى CFR: `-vf "fps=60,setpts=N/60/TB" -r 60` + `aresample=async=1` |

---

## معلومة مهمة يرجى عدم استخدام Windows Media Player لأنه لايعمل مع الفيديوات التي يمنتجها OpenCode لسبب غير معروف
## 👤 المؤلف / Author

صُنع بواسطة **MR_ALI7685** باستخدام opencode + FFmpeg.

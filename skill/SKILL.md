---
name: video-editor
description: كمبيوتر شامل للمونتاج وإنتاج الفيديو باستخدام FFmpeg. استخدم هذه المهارة عندما يطلب المستخدم إنتاج، قص، دمج، تحرير، إضافة مؤثرات، انتقالات، نصوص، ترجمة، موسيقى، مؤثرات صوتية، خلفيات خضراء، ثتبيت فيديو، تحكم بالسرعة، إضافة علامات مائية، استخراج صور مصغرة، إضافة أفكتات، أو أي عملية مونتاج فيديو. تشمل كل مهارات المونتاج الاحترافية مع معرفة كاملة بمسار ملفات المستخدم المحلية.
---

# مهارة المونتاج وإنتاج الفيديو المتكاملة

## نظرة عامة

هذه المهارة مخصصة لإنتاج وتحرير الفيديوهات بشكل احترافي باستخدام FFmpeg. تغطي كل عمليات المونتاج من الأساسيات إلى التقنيات المتقدمة، مع تكامل كامل مع مكتبة موارد المستخدم المحلية.

## ⚠️ موديل عرض الفيديو/الصور (CRITICAL)

### المشكلة
بعض الموديلات (مثل GPT-4o, Claude, etc.) **لا تدعم** عرض الصور/الفيديو مباشرة - تقرأ الملفات كـ binary وتتوقف.

### الحل: MiMo V2.5 Free
**يجب استخدام موديل `opencode/mimo-v2-free`** عند الحاجة لـ:
- مشاهدة الفيديو مباشرة (video_preview)
- قراءة صور (read on .jpg/.png)
- تحليل محتوى الفيديو بصرياً

### قاعدة مهمة
```
إذا طلب المستخدم معاينة فيديو/صورة:
1. جرّب video_preview أو read على الصورة
2. إذا ظهر "Cannot read image" أو خطأ → أخبر المستخدم:
   "الموديل الحالي لا يدعم عرض الصور. استخدم MiMo V2.5 Free من إعدادات الموديل"
3. إذا نجح → أكمل التحليل بشكل طبيعي
```

### طريقة التبديل
في opencode.json أو إعدادات الـ provider:
```json
{
  "model": "opencode/mimo-v2-free"
}
```

---

## بيئة التشغيل

- **النظام**: Windows (win32)
- **Shell**: PowerShell 5.1
- **FFmpeg**: Gyan.FFmpeg 9.0.1
- **موديل العرض**: MiMo V2.5 Free (يجب استخدامه لعرض الصور/الفيديو)

### ملاحظة مهمة عن PATH
عند فتح جلسة جديدة، يجب تحديث PATH قبل استخدام ffmpeg:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## محفوظات الملفات المحلية للمستخدم

### SFX - مؤثرات صوتية

#### SFX Click (نقرات وضغطات)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\SFX Click\`
- `click.mp3` - نقرة عامة
- `Mouse Click.mp3` - نقرة ماوس
- `Pop 1.mp3`, `Pop 2.mp3`, `pop.mp3` - أصوات فرقعة
- `Small Bell.mp3` - جرس صغير
- `Shutter Click.mp3` - صوت كاميرا
- `levelup.mp3` - صوت مستوى جديد
- `ignite.mp3` - صوت اشتعال
- `glass1.mp3` - صوت زجاج
- `anvil_land.mp3` - صوت سندان
- `fallsmall.mp3` - صوت سقوط
- `orb.mp3` - صوت كرة طاقة
- `out.mp3` - صوت خروج
- `Wood_click.mp3` - نقرة خشب
- `Smithing_Table.mp3` - صوت طاولة حدادة
- `Taking Photos.mp3` - صوت تصوير
- `Trident_return.mp3` - صوت رمح ثلاثي الشعب

#### SFX Meme (أصوات ميمز)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\SFX Meme\`
- `Angels Singing.mp3` - ملائكة تغني (لهالة)
- `Anime punch.mp3` - لكمة أنيمي
- `Anime transmission.mp3` - انتقال أنيمي
- `Anime wow.mp3` - صوت واو أنيمي
- `Badum Tsss.mp3` - بادوم تس
- `Boing.mp3` - بونغ (نطاط)
- `Boom Sound.mp3` - صوت انفجار
- `Careless whisper.mp3` - أغنية careless whisper
- `Cash Register.mp3` - آلة كاشير
- `Censor.mp3` - صوت رقابة (بيييب)
- `Chirping.mp3` - صراصير (زقزقة)
- `Crowd Booing.mp3` - صوت جمهور يستنكر
- `discordping.mp3` - صوت ديسكورد
- `Distortion .mp3` - تشويه صوتي
- `Fail 1.mp3`, `Fail 2.mp3` - أصوات فشل
- `Falling.mp3` - صوت سقوط
- `Flashback.mp3` - فلاش باك
- `Gangsters_paradise_choir.mp3` - جوقة gangsters paradise
- `GTA_mission_passed.mp3` - نجاح مهمة GTA
- `Illuminatii.mp3` - إلومناتي
- `Keyboard_spam.mp3` - ضرب لوحة مفاتيح
- `Long fart 1.mp3` - فرتة طويلة
- `Minecraft_achievement.mp3` - إنجاز ماينكرافت
- `Minecraft_eating.mp3` - أكل ماينكرافت
- `Minecraft_hit.mp3` - ضربة ماينكرافت
- `Minecraft_oof.mp3` - أوف ماينكرافت
- `Minecraft_Villager.mp3` - قروي ماينكرافت
- `Mission_Passed.mp3` - مهمة مكتملة
- `Painful Scream.mp3` - صرخة مؤلمة
- `Punch 1.mp3`, `Punch 2.mp3` - لكمات
- `Record Scratch 2.mp3` - خدش تسجيل
- `Reeeeeeeeeee.mp3` - صوت ررررريي
- `Rubber Duck.mp3` - بطة مطاط
- `Run.mp3` - صوت ركض
- `Sad Music 1.mp3`, `Sad Music 2.mp3` - موسيقى حزينة
- `Sharingan.mp3` - شارينغان (ناروتو)
- `Slap_oh.mp3` - صوت صفعة
- `Slap.mp3` - صفعة
- `Slip.mp3` - انزلاق
- `Splat.mp3` - سقوط (سلايب)
- `Tacobell_bell.mp3` - جرس تاكو بيل
- `Windows_error.mp3` - خطأ ويندوز
- `YEEEEAAAAHHHH.mp3` - صرخة ييييييياه

#### SFX Suspense (ترقب وإثارة)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\SFX Suspense\`
- `beacon_activate.mp3` - تفعيل بيقون
- `beacon_ambient.mp3` - أجواء بيقون
- `beacon_power.mp3` - قوة بيقون
- `Cinematic Boom 1.mp3` - بوم سينمائي 1
- `Cinematic Boom 2.mp3` - بوم سينمائي 2
- `Drum Roll.mp3` - رول طبول
- `Dun Dun Dun.mp3` - دن دن دن
- `Fnaf_musicbox.mp3` - صندوق موسيقى FNAF
- `Fnaf_sirens.mp3` - صفارات FNAF
- `Heartbeat.mp3` - نبض قلب
- `Impact (1-7).wav` - أصوات تأثير قوي
- `Inception.mp3` - صوت إنسيبشن (بووم)
- `Law and order .mp3` - قانون ونظام
- `Long Suspense 1-4.mp3` - ترقب طويل
- `MGS Alert.mp3` - تنبيه Metal Gear Solid
- `nether_travel.mp3` - سفر نذر
- `Reverse Cinematic Boom.mp3` - بوم سينمائي معكوس
- `Reverse Clank Bell.mp3` - جرس معكوس
- `Shocked.mp3` - صوت صدمة
- `Suspenseful Choir.mp3` - جوقة ترقب

#### SFX Transition (انتقالات صوتية)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\SFX Transition\`
- `Bassy Swoosh.wav` - حفيف ثقيل
- `Cinematic Whoosh.mp3` - حفيف سينمائي
- `Explode1.mp3`, `Explode4.mp3` - انفجارات
- `Fast swoosh down.mp3` - حفيف سريع نازل
- `Long swoosh.mp3` - حفيف طويل
- `Trident_riptide.mp3` - رمح ريب تايد
- `Whoosh 1-7.mp3` - حفيفات مختلفة

### 🆓 مصادر أصوات مجانية وشرعية (للتوسيع)
> لتكبير مكتبة الأصوات، رشّح للمستخدم هذه المصادر المجانية 100% (بدون حقوق للتجارة). تنزيلها سهل: تحميل الملف، ثم نسخه إلى المجلد المناسب (SFX Click / Meme / Suspense / Transition).

#### المواقع المجانية
| الموقع | أفضل لـ | ملاحظات |
|--------|---------|---------|
| **pixabay.com/sound-effects** | كل شيء (ميمز، انتقال، إثارة، نقرات) | مجاني تماماً، لا حاجة لحساب، بحث سهل |
| **freesound.org** | مؤثرات واقعية/سينمائية | مجاني مع ترخيص CC، يحتاج حساب |
| **zapsplat.com** | انتقالات وحفيفات | مجاني مع تسجيل موقع في الإسناد |
| **mixkit.co/free-sound-effects** | نقرات، وتمبلات جاهزة | مجاني، بدون تسجيل |
| **bigsoundbank.com** | أصوات ألعاب وضربات | مجاني أساسي |
| **orangefreesounds.com** | أفكتات متنوعة | مجاني |

#### أشهر أصوات الميمز التي يبحث عنها المستخدمون
- **Vine Boom** (صوت الطبلة بعد اللقطة)
- **Record Scratch** (عند الموقف المحرج)
- **Windows XP Error** / **Windows 7 Startup**
- **Wilhelm Scream** (صرخة سقوط)
- **Whoosh** (حفيف انتقال سريع)
- **Anime Impact / Punch** (ضربة قوية)
- **Sad Trombone** (نغمة حزينة مضحكة)
- **Drum Roll + Cymbal** (ترقب ثم كشف)
- **Bruh / Sounds** (أصوات رد فعل حديثة)
- **Sus / Among Us** لحظات الريبة

> **نصيحة للـ agent:** عندما يطلب المستخدم صوتاً غير موجود بالمكتبة، رشّح له البحث في `pixabay.com/sound-effects` عن الصوت بالاسم، وذكّره بحفظه في المجلد المناسب تحت `C:\Users\mr_ali7685\Documents\مونتاج\SFX ...`. بعد إضافة الأصوات، حدّث هذا القسم ليشملها.

### محتوى الميمز والجرين سكرين
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\ميمز\`

#### جرين سكرين ميمز
- `(Greenscreen) Wait a minute who are you - Kazoo Ki(360P).mp4`
- `GTA Mission Passed   Green Screen HD Chroma key(720P_HD).mp4`
- `Triggered - Green Screen - Chromakey - Meme Source(720P_HD).mp4`
- `داaaaaaaamn(360P).mp4`
- `Directed by _ Robert B. Weide ( REMIX 2020 )(720P_HD).mp4`
- `FBI OPEN UP MEME FULL [FULL HD _ HQ](240P).mp4`
- `GTA San Andreas - Ah shit_ here we go again(240P).mp4`
- `Jacob Zuma - In The Beginning(240P).mp4`
- `Oooohhhhh(240P).mp4`
- `Original Goat Edition Scream (Yelling Goat)(480P).mp4`
- `WHAT WHAT THE FU_K(240P).mp4`
- `why are you gay(240P).mp4`
- `Why are you running_ (Original)(240P).mp4`
- `Wide Putin walking but he_s always in frame (full version)(240P).mp4`
- `Yeah boy(240P).mp4`
- `اللهم قوي ايمانك(360P).mp4`
- `انت بتتكلم جد؟(240P).mp4`
- `تبا لك ولأمثالك----(240P).mp4`
- `تحريات كلب(360P).mp4`
- `تكسيم تكسيم تكسيم تكسيم المقطع الأصلي(360P).mp4`
- `خلي الوضع ريلاكس ------هههههه(360P).mp4`
- `رياكشن يا دكتور يا دكتور (مطلوبب)(240P).mp4`
- `سبهان الله(360P).mp4`
- `صدقني انا لو اعرف هقولك(360P).mp4`
- `قلبك عامر بالايمان(240P).mp4`
- `لا وي واثقة من نفسها(240P).mp4`
- `لاتكذب لاتكذب(360P).mp4`
- `لعنك الله خلاص تعبنا يا ولد(360P).mp4`
- `مسخرة قول السؤال تاني(240P).mp4`
- `ميمز القبر(360P).mp4`
- `نعم انها المخدرات(240P).mp4`

#### GIFs متحركة
- `71e2bc883194aad227dc32913a70b5d3.gif`
- `8C8553FD-4717-4ED1-BEB9-5D17DC4F8D91.gif`
- `awkward-side-eye.gif` - نظرة جانبية محرجة
- `blinking-eyes-man.gif` - رجل يرمش
- `clapping-leonardo-dicaprio.gif` - تصفيق ليوناردو
- `giphy.gif`
- `meme-our.gif`
- `peace-disappear.gif` - سلام السلام
- `popcat.gif`
- `skeptical-futurama.gif` - متشكك فوتوراما
- `statics-assets-upload16749868554845042550.gif`
- `think-smart.gif` - فكر بذكاء
- `trollge.gif`

### الخطوط (Fonts)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Fonts\`

#### خطوط عربية
- `alfont_com_ArbFONTS-DG-Modal3at-Bold.ttf` - خط محلات عربي
- `alfont_com_NorsalGX.ttf` - خط نورسل
- `alfont_com_VIP-Hala-Bold-1.otf (1).ttf` - خط هلا VIP
- `alfont_com_VIP-Hala-Bold-1.otf.ttf` - خط هلا VIP

#### خطوط إنجليزية
- `Arapix.otf` - أرابيكس
- `Autography.otf` - أوتوجرافي
- `Bad Boys.ttf` - باد بويز
- `Candy Beans.otf` - كاندي بينز
- `Coolvetica Rg.otf` - كولفيتيكا
- `Daydream.ttf` - داي دريم
- `Game Of Squids.ttf` - لعبة الحباري
- `KG Red Hands.ttf` - كي جي ريد هاندز
- `LEMON MILK Bold.otf` - ليمون ميلك
- `lilitaone-regular-webfont (2).ttf`
- `Luckiest Guy.ttf` - لاكيست جاي
- `Minecraft Bold Italic.otf`, `Minecraft Bold.otf`, `Minecraft Five.ttf`, `Minecraft Italic.otf`, `Minecraft Regular.otf`, `Minecraft Ten.ttf` - خطوط ماينكرافت
- `Panton Black Caps.otf` - بانتون بلاك
- `Pricedown.otf` - برايس داون (GTA)
- `Star Jedi.ttf` - ستار جيدي (حرب النجوم)
- `Stranger back in the Night.ttf` - سترينجر ثينغز
- `VCR OSD Mono.ttf` - في سي آر مونو

### خلفيات (Backgrounds)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Backgrounds\`
- `Extra Images\` - صور إضافية
- `Extra Videos\` - فيديوهات إضافية
- `Moving Blocks\` - بلوكات متحركة
- `Skies\` - سموات
- `Spinning Rays\` - أشعة دوارة
- `Textures\` - تيكستشرز
- `Video Loops\` - لوبات فيديو

### صور (Images)
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Images\`
- `Assets\` - أصول
- `Borders & Frames\` - حدود وإطارات
- `Expressions & Faces\` - تعابير ووجوه
- `Extra\` - إضافات
- `Logos\` - شعارات
- `Minecraft GUIs & more\` - واجهات ماينكرافت
- `Minecraft Item GIFs\` - أغراض ماينكرافت GIF
- `Minecraft Structures\` - هياكل ماينكرافت
- `Minecraft Titles & Mojang Studios\` - عناوين ماينكرافت
- `Particles & PVP Particles\` - جسيمات
- `Phonk Edit Faces\` - وجوه فونك إديت
- `Screen Borders\` - حدود شاشة
- `Thumbnail Lines\` - خطوط مصغرات

### أنيميشينز
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Animations\`
- `Extra\` - إضافات
- `greenscreen_effects\` - أفكتات جرين سكرين
- `Minecraft\` - أنيميشينز ماينكرافت
- `Progress Bar\` - شريط تقدم
- `Subscribe, Join Discord & more\` - اشتراك، ديسكورد

### انتقالات مرئية
المسار: `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Transitions\`
- `Extra\` - إضافات
- `Minecraft Items & Mobs\` - أغراض وماوبس ماينكرافت

## الأوامر الأساسية

### تحديث PATH (أول خطوة دائمًا)
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### الحصول على معلومات الفيديو
```bash
ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate,codec_name -of default=noprint_wrappers=1 "input.mp4"
```

### تشفير الفيديو بكفاءة عالية
التركيبة الأفضل لأداء عالي مع جودة ممتازة:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k output.mp4
```
- `-crf 18` = جودة عالية (0 = فقدان، 51 = أسوأ، 18-23 = ممتاز)
- `-preset slow` = ضغط أفضل (جودة أعلى بحجم أصغر)
- `-pix_fmt yuv420p` = توافق مع كل الأجهزة والمنصات

### تشفير سريع (للمسودات)
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset veryfast -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k output.mp4
```

## 1. قص الفيديو (Cutting)

### قص من ثانية إلى ثانية
```bash
ffmpeg -ss 00:00:10 -to 00:00:20 -i input.mp4 -c copy output.mp4
```
- `-ss` = وقت البداية (before -i for accuracy)
- `-to` = وقت النهاية
- `-c copy` = نسخ مباشر (سريع بدون إعادة تشفير)

### قص دقيق (Re-encode)
```bash
ffmpeg -i input.mp4 -ss 00:00:10 -to 00:00:20 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac output.mp4
```

### قص من البداية (اول X ثواني)
```bash
ffmpeg -i input.mp4 -t 10 -c copy output.mp4
```

## 2. دمج الفيديوهات (Merging/Concat)

### طريقة 1: concat demuxer (للفيديوهات المتشابهة - الأفضل)
أنشئ ملف `list.txt`:
```
file 'video1.mp4'
file 'video2.mp4'
file 'video3.mp4'
```
ثم:
```bash
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

### طريقة 2: إعادة تشفير موحدة (للاختلافات)
إذا كانت الفيديوهات بدقة مختلفة أو معدلات إطارات مختلفة، يجب توحيدها أولاً:
```bash
ffmpeg -i video1.mp4 -i video2.mp4 -filter_complex "[0:v]scale=1920:1080,setsar=1,fps=30[v0];[1:v]scale=1920:1080,setsar=1,fps=30[v1];[v0][0:a][v1][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow output.mp4
```

## 3. إضافة انتقالات (Transitions)

### Dissolve (ذوبان)
```bash
ffmpeg -i video1.mp4 -i video2.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1:offset=5[v]" -map "[v]" output.mp4
```

### أنواع الانتقالات المدعومة:
- `fade` - تلاشي
- `dissolve` - ذوبان
- `wipeleft`, `wiperight`, `wipeup`, `wipedown` - مسح
- `slideleft`, `slideright` - انزلاق
- `circleopen`, `circleclose` - دائرة
- `smoothleft`, `smoothright` - سلس
- `smoothup`, `smoothdown`
- `distance` - أومني
- `pixelize` - بكسل
- `radial` - شعاعي
- `spliceleft`, `spliceright` - شريط
- `squeezev`, `squeezeh` - ضغط
- `fadegrays` - تلاشي إلى رمادي
- `hblur`, `vblur` - ضبابية
- `hlwind`, etc.

ملاحظة: يجب ضبط `offset` بحيث يكون قبل نهاية الفيديو الأول بمقدار `duration`.

### مثال كامل مع الصوت
```bash
ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1:offset=5[v];[0:a][1:a]acrossfade=d=1[a]" -map "[v]" -map "[a]" output.mp4
```

---

## 🔍 تقنيات إبراز: Zoom In / Zoom Out الأسطورية

> الـ Zoom هو **أقوى أداة إبراز** في المونتاج الحديث للألعاب. يوجه عين المشاهد للحركة المهمة، ويضيف إحساساً بالسرعة والاحترافية.

> **⚠️⚠️ تحذير مهم جداً (جُرّب عملياً ويسبب فشلاً):** فلتر `zoompan` على **فيديو حقيقي متحرك** يسبب مشكلتين:
> 1. تعبير `d=X` (مثل `d=25*3`) **يضاعف الفريمات** → يطوّل الفيديو بشكل هائل (مدة 3 ثواني تصير 40+ ثانية وملف 40MB+).
> 2. تعبير `fps=30` يعيد حساب الوقت على أساس `عدد_الفريمات/30` → إذا كان مدخلك 60fps فتتضاعف المدة مرتين.
>
> **القاعدة الذهبية:** `zoompan` يعمل بشكل آمن فقط على **صورة واحدة** (بعد `-loop 1` مع `-t`) أو على مقطع قصير CFR متحكم فيه.
>
> ✅ **الطريقة الأضمن للزوم على لقطة فيديو حقيقية** = **`scale` + `crop`** (زوم ثابت سريع، يحافظ على المدة والمعدل تماماً، ويشتغل بسرعة):
> ```bash
> # زوم ثابت 1.4x على مركز الصورة (أبرز الهدف/القتل)
> ffmpeg -i clip.mp4 -vf "scale=1912:1074,crop=1366:768:273:153" -c:v libx264 -crf 18 output.mp4
> ```
> لحساب الأبعاد: بعد `scale=iw*z:ih*z`، اقصوص بـ `crop=الأصلي`.
> الإزاحة للوسط `x=(new_w-orig_w)/2` و `y=(new_h-orig_h)/2`.
> لتحديد مركز `(cx,cy)` من 0 إلى 1: `offx=cx*(new_w-orig_w)` و `offy=cy*(new_h-orig_h)`.
> الزوم الثابت هذا مثالي للستايل الساخر: على لحظة القتل نحوّل للقطة مكبّرة فجأة.

### ✔ إذا أردت zoom **متحرك** (in/out سلس) على مقطع قصير:
حوّل أولاً لمعدل ثابت ثم قيّد المدة، وأعد ضبط PTS بعد zoompan:
```bash
# زوم In متحرك من 1x إلى 1.6x خلال 2 ثانية (على مقطع قصير)
ffmpeg -i clip.mp4 -vf "fps=60,setpts=N/60/TB,zoompan=z='min(zoom+0.005,1.6)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=iw:ih,fps=60,setpts=N/60/TB" -c:v libx264 -crf 18 output.mp4
```
> معدل الزوم لكل فريم = `(الهدف-1)/(المدة×60)` لأن مدخلك 60fps.
> `setpts=N/60/TB` بعد zoompan **إلزامي** لتصحيح الوقت (وإلا المدة تتضاعف).


---

## 👑 الإنتقالة الأسطورية بين لقطتين عند القص (Cut)
> "الكات المميت" = انتقال بين لقطتين بأسلوب يجعل المشاهد يتفاعل (zoom burst + flash + whoosh صوتي). هذي الإنتقالات الأكثر انتشاراً في مونتاج الألعاب الحديثة.

### ⚡ التقنيات الأسطورية (كلها عبر `xfade`)

#### 1) Zoom Burst (تقريب + انفجار) — الأكثر شهرة 🔥
```bash
ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex \
"[0:v]zoompan=z='min(zoom+0.02,2)':d=1:s=1920x1080:fps=30[zo];\
[1:v]trim=0:0.5,setpts=PTS-STARTPTS[in2];\
[zo][in2]xfade=transition=zoomin:duration=0.4:offset=1[v]" \
-map "[v]" output.mp4
```

#### 2) Flash / White Flash (وميض أبيض) — انتقال نظيف
```bash
ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex \
"color=white:s=1920x1080:d=1,format=yuv420p[flash];\
[0:v][1:v]xfade=transition=fade:duration=0.3:offset=2, \
[flash]xfade=..." 
```

#### 3) Smooth Zoom (تقريب ناعم بين القطع) — للمشاهد الواقعية
```bash
ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex \
"[0:v]zoompan=z='min(zoom+0.004,1.2)':d=25*1.5:s=1920x1080:fps=30[c1];\
[1:v]zoompan=z='max(zoom-0.004,0.8)':d=25*1.5:s=1920x1080:fps=30[c2];\
[c1][c2]xfade=transition=fade:duration=0.5:offset=1.5[v]" \
-map "[v]" output.mp4
```

#### 4) Whip Pan / Whoosh (حركة سلسة سريعة) — انتقال مشهور
أسلوب: اللقطة الأولى "تنسحب" بسرعة أفقياً والثانية تدخل. يُنفّذ عادة بمزج عمودي مع تسارع:
```bash
ffmpeg -i v1.mp4 -i v2.mp4 -filter_complex \
"[1:v]zoompan=z='min(zoom+0.02,1.5)':d=1:s=1920x1080:fps=30[in2];\
[0:v][in2]xfade=transition=slideleft:duration=0.35:offset=1[v]" \
-map "[v]" output.mp4
```

#### 5) الأفضل عملياً: zoompan + xfade سوية مع boom صوتي
اجمع التقريب البصري مع حفيف (whoosh) انتقالي. أضف صوته عبر `adelay` كما في قسم SFX. النصيحة: عند استخدام `zoompan` بعد `xfade` يضيع المزامنة أحياناً، فالأفضل تطبيق `zoompan` على فيديو منفصل ثم ادمجه — أو استخدم قيم `d` صغيرة.

> **⚠️ قاعدة مهمة:** `xfade` يتطلب أن تبدي المقاطع الثواني التي تريد تداخل فيها — استخدم `trim`/`setpts` لكل مقطع قبل الخلط. وتحقق دائماً أن `offset = مدة القطعة الأولى - duration`.

### 🎵 الربط مع الـ SFX (اللمسة الأخيرة)
الإنتقالة البصرية بدون صوت = ناقصة. أضف `Whoosh` أو `Boom` على نقطة التبديل (سواء CUT أو xfade) عبر `adelay`.
```bash
ffmpeg -i output.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Transition\Whoosh 1.mp3" -filter_complex "[1:a]adelay=1500|1500[sfx];[0:a][sfx]amix=inputs=2[a]" -map "[a]" output_final.mp4
```

## 4. التحكم بالسرعة (Speed)

> **⚠️ مهم جداً لتفادي تعليق الصورة (VFR):** إذا كان المصدر بمعدل فريمات غير ثابت (كما في تسجيلات GeForce NOW) وقد كرّرت القص والتسريع، احرص بعد تغيير السرعة على تثبيت الفريمات إلى معدل ثابت (CFR) للحفاظ على sync:
> ```bash
> ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=PTS/2,fps=60[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" -r 60 output.mp4
> ```
> تحقق بعدها بعدد الفريمات: `ffprobe -count_frames -select_streams v -show_entries stream=nb_read_frames` — يجب أن يساوي المدة × الـ fps تقريباً.

### تسريع ×2
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=PTS/2[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mp4
```
### إبطاء ×0.5 (Slow Motion)
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### للحصول على slow motion سلس (مضاعفة الإطارات)
```bash
ffmpeg -i input.mp4 -filter_complex "minterpolate=fps=60:mi_mode=mci,setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" output.mp4
```

### Timelapse (تسريع كبير)
```bash
ffmpeg -i input.mp4 -filter_complex "[0:v]setpts=PTS/30[v];[0:a]atempo=30.0[a]" -map "[v]" -map "[a]" output.mp4
```

### تسريع الصوت فقط
```bash
ffmpeg -i input.mp4 -filter:a "atempo=1.5" output.mp4
```

## 5. الفلاتر والمؤثرات (Filters & Effects)

### تحسين الألوان (Color Grading)
```bash
ffmpeg -i input.mp4 -vf "eq=contrast=1.1:brightness=0.02:saturation=1.2" output.mp4
```
- `contrast` - التباين (0-2)
- `brightness` - سطوع (-1 إلى 1)
- `saturation` - التشبع (0-3)
- `gamma` - جاما (0.1-10)

### نيغيتف (Negative)
```bash
ffmpeg -i input.mp4 -vf "negate" output.mp4
```

### أبيض وأسود
```bash
ffmpeg -i input.mp4 -vf "hue=s=0" output.mp4
```
أو:
```bash
ffmpeg -i input.mp4 -vf "colorchannelmixer=.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3" output.mp4
```

### ضبابية (Blur)
```bash
ffmpeg -i input.mp4 -vf "boxblur=10:1" output.mp4
```
### ضبابية جانبية (فلتر ضبابية الأطراف)
```bash
ffmpeg -i input.mp4 -vf "gblur=sigma=10" output.mp4
```

### حدة (Sharpen)
```bash
ffmpeg -i input.mp4 -vf "unsharp=5:5:1.0:5:5:0.0" output.mp4
```

### فيبينيت (Vignette)
```bash
ffmpeg -i input.mp4 -vf "vignette=PI/4" output.mp4
```

### صيغة فلم (Film Grain)
```bash
ffmpeg -i input.mp4 -vf "noise=alls=10:allf=t" output.mp4
```

### VHS / ريتفو قديم
```bash
ffmpeg -i input.mp4 -vf "noise=alls=8:allf=t,equ=contrast=1.1:saturation=0.8,hue=h=10" output.mp4
```

### فلتر Vita (تدوير الصورة)
```bash
ffmpeg -i input.mp4 -vf "vflip,hflip" output.mp4
```

### تغيير الحجم والدقة
```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080" -c:v libx264 -crf 18 output.mp4
```

## 6. النصوص والترجمة (Text & Subtitles)

> #### ⚠️ مهم جداً - مشكلة fontconfig مع drawtext على هذا البناء
> بناء FFmpeg gyan (المثبت عبر winget) `--enable-fontconfig` لديه خلل: فلتر `drawtext` يهيّئ fontconfig دائماً ويُنهي العملية بشكل مفاجئ (Crash / exit code -1073741819) حتى بدون `fontfile`، بسبب خطأ `Cannot load default config file`.
>
> **النهج المعتمد الموثوق هو استخدام libass عبر فلتر `ass=` أو `subtitles=`** - فهو يعمل بشكل ممتاز (تم اختباره بنجاح). استخدمه دائماً للنصوص والترجمة.
>
> **قاعدة Escape للمسارات داخل فلتر libass:**
> لا تستخدم المسار المطلق `C:\...` مباشرةً داخل `ass=`/`subtitles=` لأن رمز `:` في `C:` يُفسر كفاصل خيارات فيقف الفلتر. الحلول الممكنة:
> - **الأنسب**: انقل/أنشئ ملف ASS/SRT باسم مختصر في نفس مجلد الإخراج واستخدم **المسار النسبي** فقط: `ass=capt.ass`
> - أو تهرّب النقطتين: `C\:/Users/...`

---

### النهج الموصى به: توليد ملف ASS ثم تطبيفه (libass)

#### إنشاء ملف ASS بسيط
`capt.ass`:
```
[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Luckiest Guy,72,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,4,1,2,40,40,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,TITLE TEXT HERE
```

#### تطبيق ملف ASS (من نفس مجلد العمل - مسار نسبي)
```bash
ffmpeg -i input.mp4 -vf "ass=capt.ass" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy output.mp4
```

---

### البديل الأسرع: ملف SRT مع نمط مخصص (ال方法 الناجحة فعلياً)

> **تم اختبار هذا النهج بنجاح** — يعمل حتى مع خطوط عربية مخصصة ويعالج مشكلة fontconfig.

#### إنشاء ملف SRT بسيط
`title.srt`:
```
1
00:00:00,500 --> 00:00:04,000
R6 SIEGE MONTAGE

2
00:00:04,500 --> 00:00:08,000
GAMEPLAY HIGHLIGHTS
```

#### تطبيق SRT مع نمط مخصص (force_style)
```bash
ffmpeg -i input.mp4 -vf "subtitles=title.srt:force_style='FontName=Courier New,FontSize=28,PrimaryColour=&H00FFFF&,OutlineColour=&H000000&,Outline=3,Shadow=2'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy output.mp4
```

#### أمثلة على force_style أنماط مختلفة
```bash
# نص كبير أصفر بحد أسود
force_style='FontSize=40,PrimaryColour=&H0000FF&,Outline=4'

# نص صغير أبيض شفاف
force_style='FontSize=20,PrimaryColour=&H80FFFFFF&,Shadow=1'

# نص كبير مائل
force_style='FontSize=50,Italic=1,PrimaryColour=&H00FFFF&,Outline=3'
```

> **ملاحظة:** `force_style` يستخدم صيغة ASS لالألوان: `&HBBGGRR&` (بدون alpha) أو `&HAABBGGRR&` (مع alpha). الألوان الشائعة: أبيض=`&HFFFFFF&`، أصفر=`&H00FFFF&`، أحمر=`&H0000FF&`، أزرق=`&HFF0000&`

---

### إضافة نص مكتوب (drawtext)
> تنبيه: `drawtext` قد يتعطل بسبب مشكلة fontconfig المذكورة أعلاه. إن واجهت Crash، استخدم نهج libass أعلاه.
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='HELLO':fontfile='C\:/path/to/font.ttf':fontsize=72:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" output.mp4
```

### نص مع الظل والحدود
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='TITLE':fontfile='...':fontsize=100:fontcolor=white:borderw=5:bordercolor=black:shadowx=5:shadowy=5:shadowcolor=black@0.5:x=(w-text_w)/2:y=100" output.mp4
```

### نص متحرك (بداية ونهاية)
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='SLIDE IN':fontfile='...':fontsize=80:fontcolor=white:x='if(lt(t,1),-w+(t*2*w),if(lt(t,3),0, (t-3)*2*w))':y=(h-text_h)/2" output.mp4
```

### نص يظهر ويختفي
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='QUOTE':fontfile='...':fontsize=60:fontcolor=white:enable='between(t,2,6)':x=(w-text_w)/2:y=(h-text_h)/2" output.mp4
```

### نص متحرك من اليسار لليمين
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='SCROLLING':fontfile='...':fontsize=60:fontcolor=white:x=mod(t*200, w+text_w)-text_w:y=100" output.mp4
```

### عنوان اليوتيوب المتداول (أعلى يسار)
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='SUBSCRIBE NOW':fontfile='...':fontsize=50:fontcolor=red:borderw=3:bordercolor=black:x=50:y=50" output.mp4
```

### استخدام خطوط المستخدم

#### خطوط عربية شائعة
```bash
# مثال مع خط هلا
ffmpeg -i input.mp4 -vf "drawtext=text='مرحبا':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/alfont_com_VIP-Hala-Bold-1.otf.ttf':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" output.mp4
```

#### خطوط إنجليزية شائعة
```bash
# لوكيست جاي (موفرة للعناوين)
ffmpeg -i input.mp4 -vf "drawtext=text='COOL TITLE':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/Luckiest Guy.ttf':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" output.mp4

# برايس داون GTA
ffmpeg -i input.mp4 -vf "drawtext=text='GTA':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/Pricedown.otf':fontsize=120:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" output.mp4

# ماينكرافت
ffmpeg -i input.mp4 -vf "drawtext=text='MINECRAFT':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/Minecraft Bold.otf':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" output.mp4
```

### نصوص متعددة في نفس الوقت
```bash
ffmpeg -i input.mp4 -vf "\
drawtext=text='TOP':fontfile='...':fontsize=60:fontcolor=yellow:x=(w-text_w)/2:y=100,\
drawtext=text='BOTTOM':fontfile='...':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=h-200" \
output.mp4
```

## 7. الترجمة الكاملة (Subtitles - SRT/ASS)

### استخدام ملف SRT
```bash
ffmpeg -i input.mp4 -i subtitles.srt -c:v libx264 -crf 18 -c:a copy -c:s mov_text output.mp4
```

### حرق الترجمة على الفيديو
```bash
ffmpeg -i input.mp4 -vf "subtitles=subtitles.srt:force_style='FontName=Liberation Sans,FontSize=24,PrimaryColour=&HFFFFFF&'" output.mp4
```

### إضافة ترجمة مع أنماط (ASS)
```bash
ffmpeg -i input.mp4 -vf "ass=subtitles.ass" output.mp4
```

## 8. جرين سكرين (Chroma Key)

### إزالة الخلفية الخضراء الأساسية
```bash
ffmpeg -i greenscreen.mp4 -i background.mp4 -filter_complex "[0:v]chromakey=color=0x00FF00:similarity=0.1:blend=0.1[fg];[1:v][fg]overlay=15:15[out]" -map "[out]" -map "1:a" output.mp4
```
- `color=0x00FF00` - لون الأخضر (يمكن تغييره)
- `similarity` - نسبة التشابه (0-1) - أعلى = أكثر إزالة
- `blend` - نعومة الحواف (0-1)

### إزالة الأخضر مع تحسين الحواف
```bash
ffmpeg -i greenscreen.mp4 -i bg.mp4 -filter_complex "[0:v]chromakey=color=green:similarity=0.15:blend=0.2[fg];[fg]format=yuva420p[fgv];[1:v][fgv]overlay=(W-w)/2:(H-h)/2[out]" -map "[out]" output.mp4
```

### حساب الإنتاج التقديري (حدد إحداثيات معينة)
```bash
ffmpeg -i greenscreen.mp4 -i bg.mp4 -filter_complex "[0:v]chromakey=green:similarity=0.1:blend=0.1[fg];[1:v][fg]overlay=x=100:y=150[out]" -map "[out]" output.mp4
```

## 9. العلامة المائية (Watermark)

### وضع صورة شعار في الزاوية
```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=W-w-20:20" output.mp4
```
- **أعلى يمين**: `W-w-20:20`
- **أعلى يسار**: `20:20`
- **أسفل يمين**: `W-w-20:H-h-20`
- **أسفل يسار**: `20:H-h-20`
- **الوسط**: `(W-w)/2:(H-h)/2`

### شعار متحرك (يظهر ويختفي)
```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[0:v][1:v]overlay=W-w-20:20:enable='between(t,5,30)'" output.mp4
```

### شعار يدور
```bash
ffmpeg -i input.mp4 -i logo.png -filter_complex "[1:v]rotate=2*PI*t:ow=iw:oh=ih[logo];[0:v][logo]overlay=W-w-20:20" output.mp4
```

## 10. ثتبيت الفيديو (Stabilization)

### تحديد التحليل الأول (2-pass)
الخطوة الأولى - تحليل الحركة:
```bash
ffmpeg -i input.mp4 -vf "vidstabdetect=stepsize=6:shakiness=8:accuracy=9:result=transforms.trf" -f null -
```
الخطوة الثانية - تطبيق التثبيت:
```bash
ffmpeg -i input.mp4 -vf "vidstabtransform=input=transforms.trf:zoom=1:smoothing=10" -c:v libx264 -crf 18 output.mp4
```

## 11. الأصوات والموسيقى (Audio)

### إضافة صوت على فيديو
```bash
ffmpeg -i input.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4
```

### دمج صوتين مع توازن
```bash
ffmpeg -i video.mp4 -i music.mp3 -i sfx.mp3 -filter_complex "[1:a]volume=0.3[m];[2:a]volume=1.0[s];[0:a][m][s]amix=inputs=3:duration=first[a]" -map "[a]" output.mp4
```

### خفض الصوت الأصلي (لخلفية الموسيقى)
```bash
ffmpeg -i input.mp4 -i music.mp3 -filter_complex "[0:a]volume=0.2[orig];[1:a]volume=0.8[mus];[orig][mus]amix=inputs=2:duration=first[a]" -map "[a]" output.mp4
```

### إضافة SFX محدد من مكتبة المستخدم
```bash
# إضافة ساوند كليك في ثانية معينة
ffmpeg -i input.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Click\click.mp3" -filter_complex "[1:a]adelay=3000|3000[sfx];[0:a][sfx]amix=inputs=2:duration=first[a]" -map "[a]" output.mp4

# إضافة ميمز ساوند
ffmpeg -i input.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Meme\Minecraft_oof.mp3" -filter_complex "[1:a]adelay=5000|5000[sfx];[0:a][sfx]amix=inputs=2:duration=first[a]" -map "[a]" output.mp4
```

### إزالة الصوت الأصلي
```bash
ffmpeg -i input.mp4 -an output.mp4
```

### استخراج صوت الفيديو
```bash
ffmpeg -i input.mp4 -vn -acodec mp3 audio.mp3
```

### رفع صوت أو خفضه
```bash
# رفع 5db
ffmpeg -i input.mp4 -af "volume=5dB" output.mp4
# خفض نصف الحجم
ffmpeg -i input.mp4 -af "volume=0.5" output.mp4
```

## 12. استخراج الصور المصغرة (Thumbnails)

### استخراج صورة من ثانية محددة
```bash
ffmpeg -ss 00:00:10 -i input.mp4 -frames:v 1 thumbnail.jpg
```

### الاستخراج التلقائي لأفضل إطار (طريقة احترافية)
```bash
ffmpeg -i input.mp4 -vf "thumbnail=300" -frames:v 1 best.jpg
```

### لوحة مصغرات (Contact Sheet)
```bash
ffmpeg -i input.mp4 -vf "select='not(mod(n,240))',scale=320:180,tile=3x2" -frames:v 1 sheet.png
```

### مصغرة بحجم يوتيوب (1280x720)
```bash
ffmpeg -ss 00:00:05 -i input.mp4 -frames:v 1 -vf "scale=1280:720" thumbnail.jpg
```

## 13. التحويل بين الصيغ (Conversion)

### MP4 → MP3 (صوت فقط)
```bash
ffmpeg -i input.mp4 -vn -acodec libmp3lame -q:a 2 audio.mp3
```

### MP4 → GIF
```bash
ffmpeg -i input.mp4 -vf "scale=480:-1,fps=15" -loop 0 output.gif
```

### GIF → MP4
```bash
ffmpeg -i input.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4
```

### MP4 → MOV
```bash
ffmpeg -i input.mp4 -c copy output.mov
```

### صورة → فيديو
```bash
ffmpeg -loop 1 -i image.png -t 10 -c:v libx264 -pix_fmt yuv420p video.mp4
```

### تحويل فيديو لـ GIF مع جودة عالية
```bash
ffmpeg -i input.mp4 -vf "fps=15,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" output.gif
```

## 14. تعديل النسبة والقص المحيطي (Crop & Aspect)

### قص محيطي (Crop)
```bash
ffmpeg -i input.mp4 -vf "crop=w=1280:h=720:x=320:y=0" output.mp4
```

### قصة عمودية (Vertical - للريلز/تيك توك 9:16)
```bash
ffmpeg -i input.mp4 -vf "crop='min(iw,ih*9/16)':'min(iw,ih*9/16)*16/9'" -vf "scale=1080:1920" output_vertical.mp4
```

### فيديو أفقي من عمودي مع خلفية ضبابية
```bash
ffmpeg -i vertical.mp4 -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=20:5[bg];[0:v]scale=1080:1920[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" output.mp4
```

### تحويل عمودي لأفقي مع خلفية
```bash
ffmpeg -i vertical.mp4 -i background.jpg -filter_complex "[1:v]scale=1920:1080[bg];[0:v]scale=-1:1080[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" output.mp4
```

## 15. تدوير وقلب
```bash
# تدوير 90 درجة
ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
# تدوير 180
ffmpeg -i input.mp4 -vf "transpose=1,transpose=1" output.mp4
# قلب أفقي
ffmpeg -i input.mp4 -vf "hflip" output.mp4
# قلب عمودي
ffmpeg -i input.mp4 -vf "vflip" output.mp4
```

## 16. إضافة لوحات وتأطير

### إضافة إطار/حدود
```bash
ffmpeg -i input.mp4 -vf "pad=iw+40:ih+40:20:20:color=black" output.mp4
```

### حدود ملونة
```bash
ffmpeg -i input.mp4 -vf "pad=iw+60:ih+60:30:30:color=red" output.mp4
```

## 17. العملية النهائية المتكاملة (وصفة كاملة)

### مثال: فيديو مزج بريميوم
تركيب فيديو رئيسي + موسيقى + ساوند إفكت + عنوان متحرك:
```bash
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

ffmpeg -i main.mp4 -i "music.mp3" -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Meme\Minecraft_achievement.mp3" -filter_complex \
"[1:a]volume=0.3[mus];\
[2:a]adelay=2000|2000[sfx];\
[0:a][mus][sfx]amix=inputs=3:duration=first[a];\
[0:v]drawtext=text='COOL VIDEO':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/Luckiest Guy.ttf':fontsize=80:fontcolor=white:borderw=5:bordercolor=black:x=(w-text_w)/2:y=50" \
-map "[a]" -map "[0:v]" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac output.mp4
```

## 18. التحسينات السريعة والاختصارات

### تصغير حجم الفيديو (ضغط)
```bash
# جودة أقل لكن حجم أصغر بكثير
ffmpeg -i input.mp4 -crf 28 -preset veryfast output.mp4
```

### تغيير fps
```bash
ffmpeg -i input.mp4 -vf "fps=60" output.mp4
```

### إضافة الفيديو في خلفية صور وفيديو آخر (PiP - Picture in Picture)
```bash
ffmpeg -i main.mp4 -i pip.mp4 -filter_complex "[1:v]scale=480:270[small];[0:v][small]overlay=W-w-20:H-h-20" output.mp4
```

### تقسيم الشاشة (Split Screen)
```bash
ffmpeg -i left.mp4 -i right.mp4 -filter_complex "[0:v]scale=960:1080[l];[1:v]scale=960:1080[r];[l][r]hstack" output.mp4
```

## 19. نصائح احترافية للمونتاج

1. **دائمًا** استخدم `-pix_fmt yuv420p` للتوافق مع كل الأجهزة والمنصات (يوتيوب، تيك توك، واتساب)
2. **للجودة العالية** استخدم `-crf 18 -preset slow`
3. **للنسخ السريعة** استخدم `-c copy` (لا يعيد تشفير، سريع جدًا)
4. **للترجمة العربية** استخدم ملفات ASS مع fontconfig
5. **عند الدمج** توحيد الدقة وfps أولاً
6. **للريلز/تيك توك** استخدم نسبة 9:16
7. **لليوتيوب** استخدم 16:9
8. **دائما** تحقق من الشكل النهائي قبل الرفع

## 20. تشخيص الأخطاء الشائعة

| المشكلة | الحل |
|---------|------|
| `No such file or directory` | تأكد من المسار، استخدم `/` أو `\` بشكل صحيح |
| `Invalid data found` | الملف تالف أو صيغة غير مدعومة |
| `Cannot allocate memory` | عدد إطارات مرتفع، قلل الدقة |
| `Filtergraph` error | أخطاء في صيغة الفلتر، تحقق من الأقواس |
| `No video stream` | الملف لا يحتوي فيديو |
| `-ss` قبل `-i` لا يعمل | استخدم `-ss` بعد `-i` لإعادة التشفير |
| الصوت لا يعمل بعد المونتاج | أضف `-c:a aac -b:a 192k` |
| الفيديو لا يفتح على تلفون | أضف `-pix_fmt yuv420p` |
| النصوص العربية تظهر بشكل خاطئ | استخدم الخطوط العربية + text_shaping |
| Crashed بسبب الخط | تأكد من تهريب `:` كالتالي `C\:/path/font.ttf` |
| **`drawtext` يسبب Crash (fontconfig)** | بناء gyan على Windows: `drawtext` يهيّئ fontconfig دائماً ويسقط بـ `Cannot load default config file`. **الحل:** استخدم فلتر `subtitles=` أو `ass=` بدلاً منه (يعمل مع libass بشكل ممتاز) |
| **`ass=` أو `subtitles=` لا يقرأ المسار** | لا تستخدم مسار مطلق `C:\...` مباشرة داخل فلتر libass — رمز `:` في `C:` يُفسر كفاصل خيارات. **الحل:** انسخ ملف ASS/SRT إلى مجلد العمل واستخدم **مسار نسبي** فقط: `ass=capt.ass` |
| **`drawtext` يعمل على Linux/Mac** | المشكلة محددة بـ Windows + بناء gyan. على أنظمة أخرى قد يعمل `drawtext` بشكل طبيعي |
| **الفيديو لا يفتح (Server execution failed)** | غالباً الملف تالف بسبب خطأ في الفلتر أثناء الإنشاء. أعد التصدير بـ `ffprobe` للتحقق أولاً |
| **الصوت يتأخر والصورة تتجمد عند فريم معين** | السبب الجذري: المصدر مسجّل بمعدل فريمات **غير ثابت (VFR)** وتصبح غير منتظمة بعد القص المتكرر. عند الدمج يقل عدد الفريمات فيعلق الفيديو مع استمرار الصوت. **الفحص:** `ffprobe -count_frames -show_entries stream=nb_read_frames` قارنه بالمدة × الـ fps. **الحل:** حوّل المقاطع إلى معدل ثابت (CFR) قبل الدمج: `-vf "fps=60,setpts=N/60/TB" -r 60` لكل مقطع، ثم ادمج مع `-af "aresample=async=1" -r 60` |

## 21. دمج SFX مع الفيديو الرئيسي (أمثلة جاهزة)

### إضافة تفاعل عند لحظة معينة
```bash
# إضافة "iluminati" عند 5 ثواني
ffmpeg -i video.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Meme\Illuminatii.mp3" -filter_complex "[1:a]adelay=5000|5000[sfx];[0:a][sfx]amix=inputs=2:duration=first[a]" -map "[a]" -c copy output.mp4
```

### إضافة انتقال صوتي
```bash
# حفيف انتقال في ثانية معينة
ffmpeg -i video.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Transition\Whoosh 1.mp3" -filter_complex "[1:a]adelay=10000|10000[sfx];[0:a][sfx]amix=inputs=2:duration=first[a]" -map "[a]" -c copy output.mp4
```

### MUSIC + SFX + فيديو
```bash
ffmpeg -i main.mp4 -i "music.mp3" -i "C:\Users\mr_ali7685\Documents\مونتاج\SFX Suspense\Heartbeat.mp3" -filter_complex "[1:a]volume=0.2[mus];[2:a]adelay=500|500[sfx];[mus][sfx]amix=inputs=2:duration=first[mix];[0:a][mix]amix=inputs=2:duration=first[a]" -map "[a]" output.mp4
```

## 22. المونتاج المتقدم (Workflow احترافي)

### المصغرات (Thumbnails) الاحترافية
1. استخرج إطار جيد من الفيديو
2. أضف نص عنوان كبير
3. أضف صورة/شعار

```bash
# استخراج الإطار
ffmpeg -ss 5 -i input.mp4 -frames:v 1 frame.png

# إضافة نص للثومبنيل
ffmpeg -i frame.png -vf "drawtext=text='EPIC VIDEO':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/Luckiest Guy.ttf':fontsize=140:fontcolor=yellow:borderw=8:bordercolor=black:x=(w-text_w)/2:y=100" thumbnail.jpg
```

### فيديو الخلفية + عنوان متحرك + موسيقى (Reels)
```bash
ffmpeg -i vertical_source.mp4 -i "music.mp3" -filter_complex \
"[0:v]scale=1080:1920[v];\
[v]drawtext=text='MOTIVATION':fontfile='C\:/Users/mr_ali7685/Documents/مونتاج/Content creation/Fonts/LEMON MILK Bold.otf':fontsize=100:fontcolor=white:borderw=6:bordercolor=black:shadowx=5:shadowy=5:x=(w-text_w)/2:y=150[v2];\
[1:a]volume=0.6[a]" \
-map "[v2]" -map "[a]" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac output_reel.mp4
```

## 23. خطوات المونتاج السريعة (Checklist)

عند عمل أي مونتاج اتبع:
1. **فحص الفيديو**: `ffprobe` للحصول على المعلومات
2. **اختيار الدقة النهائية**: 1080p، 720p، 4:5، 9:16...
3. **قص وإعداد المقاطع**
4. **دمج مع التحويلات**
5. **إضافة النصوص والعناوين**
6. **إضافة الموسيقى وSFX**
7. **تحسين الألوان**
8. **استخراج الثومبنيل**
9. **تصدير بصيغة نهائية عالية الجودة**
10. **فحص النتيجة النهائية**

## 24. أوامر متقدمة نادرة

### Picture-in-Picture مع دائرة
```bash
ffmpeg -i main.mp4 -i pip.mp4 -filter_complex "[1:v]scale=400:400,format=rgba,geq=lum='if(lte(hypot(X-W/2,Y-H/2),W/2),lum(X,Y),0)':a='if(lte(hypot(X-W/2,Y-H/2),W/2),255,0)'[cir];[0:v][cir]overlay=W-w-20:H-h-20" output.mp4
```

### زرق الخلفية الشفافة
```bash
ffmpeg -i clip.mp4 -vf "colorkey=0x00FF00:0.1:0.1" -c:v png output_alpha.mov
```

### صورة متحركة Zoom In بطيء (Ken Burns)
```bash
ffmpeg -loop 1 -i image.jpg -vf "scale=8000:-1,zoompan=z='min(zoom+0.0015,1.5)':d=25*8:s=1920x1080:fps=25" -t 8 -c:v libx264 output.mp4
```

### تقسيم الشاشة (Split Screen)
```bash
# فيديوين جنباً لجنب أفقياً
ffmpeg -i left.mp4 -i right.mp4 -filter_complex "[0:v]scale=960:1080[l];[1:v]scale=960:1080[r];[l][r]hstack" -c:v libx264 -crf 18 output.mp4

# 4 فيديوهات في شبكة
ffmpeg -i v1.mp4 -i v2.mp4 -i v3.mp4 -i v4.mp4 -filter_complex "[0:v]scale=960:540[v0];[1:v]scale=960:540[v1];[2:v]scale=960:540[v2];[3:v]scale=960:540[v3];[v0][v1]hstack[top];[v2][v3]hstack[bot];[top][bot]vstack" -c:v libx264 output_4.mp4
```

### عكس الفيديو (Reverse)
```bash
# عكس فيديو بالكامل
ffmpeg -i input.mp4 -vf "reverse" -af "areverse" -c:v libx264 -crf 18 output.mp4

# عكس جزء فقط (أول 5 ثواني)
ffmpeg -i input.mp4 -ss 0 -t 5 -vf "reverse" -af "areverse" -c:v libx264 output.mp4
```

### Slideshow من عدة صور
```bash
ffmpeg -framerate 1 -pattern_type glob -i '*.jpg' -c:v libx264 -r 30 -pix_fmt yuv420p slideshow.mp4
```

### تحويل الفيديو إلى لوحة صور
```bash
ffmpeg -i input.mp4 -vf "fps=1" frames_%04d.jpg
```

### Slow Motion مع صوت بطيء
```bash
ffmpeg -i input.mp4 -vf "setpts=2.0*PTS,minterpolate=fps=60:mi_mode=mci" -af "asetrate=44100*0.5,aresample=44100" -c:v libx264 -crf 18 output.mp4
```

## 25. دمج إطارات وخلفيات مكتبة المستخدم

### إضافة إطار (Border) من مكتبة الصور
```bash
ffmpeg -i video.mp4 -i "C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Images\Borders & Frames\frame.png" \
-filter_complex "[1:v]scale=1920:1080[frame];[0:v][frame]overlay=0:0" output.mp4
```

### استخدام خلفية من المكتبة
```bash
ffmpeg -i "C:\Users\mr_ali7685\Documents\مونتاج\Content creation\Backgrounds\Skies\sky.mp4" -i clip.mp4 \
-filter_complex "[0:v]scale=1920:1080[bg];[1:v]scale=800:450[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" output.mp4
```

## ملاحظة أخيرة
هذه المهارة شاملة لتغطية معظم احتياجات المونتاج. دائمًا استخدم FFmpeg مع `$env:Path` المُحدث، وتحقق من النتائج قبل التصدير النهائي. استخدم مكتبة المستخدم المحلية للخطوط، SFX، الخلفيات، والصور حسب الحاجة.

---

# 🔍 طريقة "رؤية الفيديو" — قبل وبعد المونتاج

> أنا كـ AI أستطيع **قراءة الصور** (الملفات: jpg/png). لذلك الحل هو: استخراج إطارات من الفيديو قراءتها كصور. هذا يibusني "أشوف" محتوى الفيديو فعلاً.

## كيف تشوف الفيديو (قبل المونتاج)

### الطريقة البسيطة (يدوية)
```bash
# استخرج 8 إطارات بالتساوي
ffmpeg -ss 0 -i video.mp4 -vf "fps=1/5" -frames:v 10 -vf "scale=640:360" preview/frame_%d.jpg
```

### الطريقة المثالية ( cleared)
```bash
# استخرج إطار كل 5 ثواني (45 ثانية = 9 إطارات)
for ($i = 0; $i -lt 45; $i += 5) {
  ffmpeg -ss $i -i video.mp4 -frames:v 1 -vf "scale=640:360" "preview/frame_${i}s.jpg"
}
```

### أو استخدم الأداة المخصصة في الـ plugin
```typescript
// من الـ plugin: video_preview
await video_preview({
  input: "C:/Users/mr_ali7685/Desktop/video.mp4",
  interval: 5,  // إطار كل 5 ثواني
  output_dir: "preview",
  size: "640:360"
})
```

## طريقة المونتاج الصحيحة (العملية الكاملة)

### الخطوة 1: شوف الفيديو الأصلي
```bash
# استخرج 8-12 إطار
ffmpeg -ss 0 -i input.mp4 -vf "fps=1/4" -frames:v 12 -vf "scale=640:360" preview/pre_%d.jpg
```

### الخطوة 2: اقرأ الإطارات وافهم المحتوى
> استخدم الـ Read tool لقراءة كل صورة. ستعرف:
> - شنو المشاهد الموجودة؟
> - هل فيه حركة؟
> - شنو الألوان؟
> - هل فيه نصوص؟
> - هل فيه جرين سكرين؟

### الخطوة 3: خطط المونتاج بناءً على الفهم
```markdown
بناءً على ما شفته:
- المشهد: [شرح المحتوى]
- الأفضل: [قرار المونتاج]
- الألوان: [هل تحتاج فلتر؟]
- النصوص: [هل ت additions تعليق؟]
```

### الخطوة 4: نفذ المونتاج
(استخدم أوامر video_montage)

### الخطوة 5: شوف النتيجة النهائية
```bash
# استخرج إطارات من الفيديو النهائي
ffmpeg -ss 0 -i output.mp4 -vf "fps=1/4" -frames:v 12 -vf "scale=640:360" preview/post_%d.jpg
```

### الخطوة 6: قارن وتأكد
> اقرأ الإطارات النهائية وتأكد:
> - هل النص ظاهر؟
> - هل الألوان صحيحة؟
> - هل الانتقالات ناعمة؟
> - هل الصوت موجود (ffprobe)?

## مثال تطبيقي: رؤية فيديو R6 Siege

```bash
# 1) شوف الأصلي (9 إطارات كل 5 ثواني)
ffmpeg -ss 0 -i "C:/Users/.../video.mp4" -vf "fps=1/5" -frames:v 10 -vf "scale=640:360" preview/pre_%d.jpg

# 2) اقرأ الصور → فهمت المحتوى

# 3) سو المونتاج...

# 4) شوف النتيجة
ffmpeg -ss 0 -i output.mp4 -vf "fps=1/5" -frames:v 10 -vf "scale=640:360" preview/post_%d.jpg

# 5) قارن وتأكد
```

---

## فلسفة المونتاج
> **المونتاج ليس تنفيذ أوامر، بل رواية قصة بإيقاعٍ متعمد.**

---

# الجزء الثاني: فن المونتاج واتخاذ القرارات 🎬

> هذا الجزء هو أهم ما يميز المونتير المحترف. لا يتعلق بالأوامر، بل بـ **متى** و **كيف** تستخدمها. اقرأه دائماً قبل التخطيط لأي مونتاج.

## 🗣️ أول خطوة دائماً: اسأل المستخدم عن **نوع المونتاج**

> قبل أن تبدأ بأي تخطيط أو تنفيذ، اسأل المستخدم (أو استنتج من سياق كلامه) أي قاعدة مونتاج يريد. هذا يحدد كل شيء: القص، الموسيقى، الأفكتات، النصوص، والمزاج.

### أنواع المونتاج وأسلوب كل نوع:

**1. مونتاج ساخر / مضحك (Comedy/Meme) 🤣**
- قص سريع ومتقطع، انتقالات مبالغ فيها
- أفكتات صوتية كوميدية: Record Scratch, Vine Boom, fail sounds, anime punch
- نصوص ساخرة / تعليقات مضحكة على الشاشة
- إيقاع متقطع عشوائي عمداً لإضحاك المشاهد
- Zoom in سريع على الوجوه/اللحظات الفظيعة للتأكيد

**2. مونتاج رسمي / احترافي (Professional/Serious) 🎯**
- قص نظيف ومنظم على المحاور
- انتقالات ناعمة (fade، dissolve)، لا انتقالات صاخبة
- موسيقى هادئة/ملحمية تليق بالعلامة التجارية
- نصوص أنيقة ومتسقة، بلا مبالغة
- إيقاع ثابت ومريح

**3. مونتاج سادة / حقيقي بدون مؤثرات (Raw) 🎬**
- الحد الأدنى من التقليم، عرض اللعب كما هو
- لا أفكتات ولا موسيقى صاخبة
- فقط قص لِلمقاطع المملة وتحسين الصوت
- للحفاظ على الأصالة والمصداقية

**4. مونتاج سينمائي / ملحمي (Cinematic/Epic) 🎥**
- فلتر سينمائي (cinematic)، letterbox (أشرطة سوداء)
- موسيقى ملحمية متصاعدة + boom عند الذروة
- Slow motion عند اللحظات الكبيرة
- إضاءة/ألوان سينمائية غنية

**5. مونتاج حماسي / هايلايتس (Highlight/Hype) 🔥**
- قص عنيف وسريع متزامن مع إيقاع الموسيقى
- تنتقلات حادة + speed ramps
- غزو + ثومبنيل جذاب
- لِهايلايتس الألعاب والقتال

### كيف تنفذ هذا عملياً؟
- إذا المستخدم ذكر كلمة مثل "مضحك/ساخر/ميمي" → استخدم النمط 1
- إذا قال "رسمي/احترافي/قناتي" → النمط 2
- إذا قال "سادة/بدون تعديل" → النمط 3
- إذا قال "سينمائي/ملحمي" → النمط 4
- إذا قال "هايلايتس/حماسي" أو أرسل لعباً بلمطالبة → النمط 5 (الأكثر شيوعاً للألعاب)

> **عند عدم التأكد الأكيد، اسأل المستخدم مباشرة بنمط جاهز:**
> "وش تريد؟ مونتاج ساخر 😂 ، رسمي 🎯 ، سادة بدون مؤثرات 🎬 ، سينمائي 🎥 ، ولا هايلايتس حماسي 🔥؟"
> هذا السؤال يحدث **دائماً** قبل البدء في أي مونتاج، وتعدّله لكل فيديو بناءً على الرد.

---

## A. فهم بنية الفيديو الناجح

## A. فهم بنية الفيديو الناجح

### الهرم الثلاثي لأي مقطع ناجح
1. **الافتتاحية (Hook)** - أول 3 ثواني تحدد هل يكمل المشاهد أم لا
2. **الجسد (Body)** - المحتوى الرئيسي مع إيقاع
3. **الختام (Climax/Outro)** - ذروة أو دعوة للتفاعل

### قاعدة 3 ثواني (Critical)
```markdown
أول 3 ثواني من الفيديو:
- يجب أن تجذب انتباه المشاهد فوراً
- حركة سريعة، تأثير قوي، أو سؤال
- لا تبدأ ببطء أو شعار طويل
```

---

## B. متى تضع الموسيقى ومتى تطفيها 🎵

### القرار الأساسي: هل الفيديو فيه حوار/كلام؟
| الحالة | القرار |
|--------|--------|
| فيديو فيه **حوار/شرح كلامي** | اخفض الموسيقى بقوة أثناء الكلام (تتحول لخلفية هادئة)، وارفعها بين الجمل |
| فيديو **بدون كلام** (موسيقى راقصة، gameplays بدون كلام، montage) | الموسيقى هي العنصر الرئيسي بلا خفض |

### خريطة الموسيقى الزمنية (Music Timeline)
```markdown
الافتتاحية (0-5 ث): موسيقى هادئة تتصاعد OR بداية قوية مفاجئة مع ضربة (impact)
الجسد: إيقاع ثابت يعكس نشاط الشاشة
الذروة (أعلى نقطة): موسيقى تصعد مع الحدث
الختام: تنتهي الموسيقى بشكل حاد أو تلاشي ناعم حسب المزاج
```

### قواعد رفع وخفض الموسيقى (Ducking)
```markdown
متى ترفع الموسيقى:
- بين الجُمل والفواصل
- في المشاهد الحماسية
- عند الانتقالات

متى تخفض (تكتم) الموسيقى:
- أثناء الحوار والكلام
- عند أي مؤثر صوتي مهم (SFX)
- في اللحظات الهادئة المؤثرة

القاعدة الذهبية: لا تتنافس الموسيقى مع الكلام أو SFX أبداً
```

### مع iOS الأوامر (الرفع/الخفض عبر volume envelope)
```bash
# رفع موسيقى تدريجياً (0 -> 0.5 خلال 3 ثواني)
ffmpeg -i video.mp4 -i music.mp3 -filter_complex \
"[1:a]afade=t=in:st=0:d=3,volume=0.5[m];[0:a][m]amix=inputs=2" output.mp4

# موسيقى تبدأ هادئة ثم ترتفع ثم تخفت في الآخر
ffmpeg -i video.mp4 -i music.mp3 -filter_complex \
"[1:a]afade=t=in:st=0:d=2:volume=1,afade=t=out:st=40:d=4,v"...
```

---

## C. متى تسوي قص (Cut) - إيقاع المونتاج ✂️

### شجرة قرارات القص (Cut Decision Tree)
```
هل هناك حركة/فعل على الشاشة؟
  ├─ نعم: انتظر اكتمال الحركة، ثم قص في أول إطار ساكن بعدها
  └─ لا (سكون/شرح): قص عند نهاية الجملة/الفكرة + اترك 0.5-1ث "تنفس"

هل الموسيقى نشطة (beat واضح)؟
  ├─ نعم: قص على النبضات (كل 1-2 نبضة)
  └─ لا: قص حسب المحتوى (فكرة → فكرة)

نوع المحتوى              | طول القطعة المثالي | أين تقص بالضبط
-------------------------|-------------------|---------------------------
Montage حماسي / Highlights| 1-3 ث              | على النبضات + نهاية الحركة
ريلز/شورتس/تيك توك       | 1.5-3 ث            | نهاية كل "فكرة بصرية" + نبضة
محتوى تعليمي/شرح        | 5-10 ث             | نهاية جملة/فكرة + انتقال طبيعي
سينمائي/قصصي           | 8-20 ث             | نهاية المشهد/اللحظة العاطفية
Raw/بث مباشر             | لا تقص إلا الممل    | فقط فترات الصمت الطويل
```

### مونتاج على إيقاع الموسيقى (Beat Sync) — الطريقة العملية
```markdown
1. حدد BPM الموسيقى: 120-128 BPM = ضربة كل 0.5ث (شائع في الفونك/تراب/هاوس)
2. ضع علامات (markers) في الفلم عند كل ضربة: اضغط M أثناء التشغيل في Premiere/CapCut
3. قص على: كل ضربة 2 أو 4 (أي كل 1-2 ثانية) — مو كل ضربة!
4. حول اللحظات الكبيرة: قص قبل 0.2ث من الضربة، واستخدم zoom/flash عند الضربة
```

### قواعد القص الذكية (محدثة)
```markdown
❌ لا تقص منتصف حركة — انتظر اكتمالها
❌ لا تقص منتصف كلمة — قطع الحديث يفقد المعنى
✅ قص عند تغير الزاوية أو حركة كبيرة
✅ قص عند نبضة موسيقية (خاصة الضربات 1 و 3 في القياس)
✅ اترك "مسافة تنفس" (0.5-1ث) بعد الذروة قبل المشهد التالي
✅ قص على الحركة (Match Cut): اربط مشهد بآخر بحركة متشابهة (يد ترفع → يد ترفع في مكان آخر)
✅ J-cut / L-cut: صوت المشهد القادم يبدأ قبل قص الصورة (0.5-1ث) — احترافي جداً
```

### جدول قرارات سريع: متى تقص؟
| الموقف | قرار القص |
|----------|-----------|
| نهاية حركة واضحة (قفزة، ضربة، استدارة) | قص فوري عند أول إطار ساكن |
| متحدث انتهى من جملة + صمت 0.3ث+ | قص عند الصمت |
| ضربة موسيقية قوية (Drop) | قص قبل 0.2ث + zoom/flash عند الـ drop |
| تغير مكان/زاوية كاميرا | قص عند أول إطار للزاوية الجديدة |
| انتقال زمني (بعد ساعات/أيام) | Fade أو hard cut + نص "بعد كذا ساعة" |
| لحظة ملل/ركود > 2ث | قص/تسريع (speed 2-3x) أو حذف |

---

## D. متى تضع الأفكتات والانتقالات ✨

### شجرة قرارات الانتقالات (Transition Decision Tree)
```
هل الانتقال ضروري للقصة/المزاج؟
  ├─ لا → استخدم Hard Cut (قطع جاف) — الأكثر احترافية
  └─ نعم → ما نوع التغيير؟
       ├─ تغير مكان/زمن كبير → Fade (0.5-1ث) أو Dissolve
       ├─ لحظة صدمة/مفاجأة/انفجار → Flash/White Flash (0.2-0.4ث)
       ├─ تركيز على تفصيلة (وجه، هدف، نص) → Circle/Zoom in (0.3-0.5ث)
       ├─ حركة سريعة متصلة (Pan/Tracking) → Whip Pan/Slide (0.2-0.4ث)
       ├─ تغير منظور/زاوية لنفس الفعل → Match Cut (لا انتقال، قص ذكي)
       └─ مونتاج ميمز/ساخر → انتقالات مبالغ فيها (Wipe, Circle, Spin) عمداً
```

### قاعدة الانتقالات الذهبية
```markdown
- 90% من الوقت: Hard Cut (قطع جاف) — أنظف وأسرع
- الانتقالات المزخرفة: للحظات قليلة فقط كتأثير خاص مقصود
- طول الانتقال الأمثل: 0.3 - 1 ثانية (فوق 1ث يظهر الهواية)
- لا تخلط أكثر من نوعين انتقالين في فيديو واحد
```

### متى تضيف المؤثرات الصوتية (SFX) — شجرة قرارات
```
هل اللحظة تحتاج تأكيد صوتي؟
  ├─ لا → لا تضف SFX (الصمت أقوى أحياناً)
  └─ نعم → ما نوع اللحظة؟
       ├─ ظهور مفاجئ / نص / أيقونة → Pop / Click / UI sound
       ├─ حركة كاميرا سريعة / انتقال حاد → Whoosh / Swoosh
       ├─ ضربة / إصابة / قتلة → Punch / Impact / Boom
       ├─ فشل / سقوط / موقف محرج → Fail / Record Scratch / Windows Error
       ├─ ترقب / رعب / صمت مخيف → Heartbeat / Suspense / Dun Dun Dun
       ├─ انتصار / إنجاز → Epic Boom / Mission Passed / Cash Register
       └─ ميمز/سخرية → Meme sounds (Vine Boom, Bruh, Anime Wow, Reee)
```

### قاعدة SFX
```markdown
- SFX واحد واضح > عدة متداخلة
- مستوى SFX: أعلى من الموسيقى بـ 3-6dB لحظة التشغيل
- لا تضع SFX على كل قص — فقط على اللحظات التي "تستاهل"
- SFX في الافتتاحية (3 ث أول): يحدد المزاج فوراً
```

---

## 🔍 Zoom Decision Tree — متى تعمل زوم؟
```
هل هناك هدف/تفصيلة يجب إبرازها؟
  ├─ لا → لا زوم (زوم عشوائي يشتت)
  └─ نعم → ما نوع التركيز؟
       ├─ "انظروا هنا!" فوري (قتلة، نص، أيقونة) → Zoom Punch ثابت (scale 1.3-1.6x، فوري)
       ├─ تركيز تدريجي درامي (بناء ترقب) → Zoom In بطيء (0.003-0.006 per frame على 60fps)
       ├─ كشف السياق من قريب لبعيد → Zoom Out (من 1.5x إلى 1x)
       ├─ مونتاج ميمز/ساخر → Zoom Punch سريع + SFX (Anime Punch/Boom)
       └─ سينمائي/ملحمي → Zoom In ناعم + موسيقى تصاعدية
```

### بارامترات الزوم العملية
| نوع الزوم | `zoom` | `zoom_duration` | `zoom_type` | مركز (cx, cy) | SFX مصاحب |
|-----------|--------|-----------------|-------------|---------------|------------|
| Punch (فوري) | 1.4-1.6 | 0.3-0.5 | punch | على الهدف (0.5,0.5 أو مخصص) | Punch/Boom/Anime Impact |
| In (بطيء) | 1.5-2.0 | 2-4 | in | على الهدف | Whoosh خفيف / لا شيء |
| Out (كشف) | 1.5→1 | 2-3 | out | مركز | Cinematic Whoosh |
| تتبع كائن | 1.3-1.5 | متغير | in | يتغير مع الكائن | لا شيء |

> **تنبيه VFR:** إذا المصدر Variable Frame Rate، حول لـ CFR قبل الزوم:
> `ffmpeg -i in.mp4 -vf "fps=60,setpts=N/60/TB" -c:v libx264 -crf 18 cfr.mp4`

---

## ⚡ Speed Decision Tree — متى تسريع/إبطاء؟
```
هل المقطع ممل/طويل؟
  ├─ نعم → هل فيه حركة؟
       ├─ حركة عادية (جري، مشي) → Speed 2-3x (تسريع)
       └─ حركة قليلة (انتظار، تفتيش) → Speed 4-8x أو احذف
  └─ لا (مقطع مهم) → هل فيه لحظة ذروة؟
       ├─ نعم (ضربة، قتلة، رد فعل) → Slow motion 0.25-0.5x على 2-3 ث حول اللحظة
       └─ لا → سرعة عادية (1x)
```

### بارامترات السرعة العملية
| الموقف | `factor` | مدة التطبيق | تعليق |
|---------|----------|-------------|-------|
| تسريع ملل | 2-4x | المقطع كامل | مع `aresample=async=1` للصوت |
| تسريع كوميدي | 4-8x | مقطع كامل | يضيف طابع ميمز |
| Slowmo ذروة | 0.25-0.5x | 2-3 ث حول الحدث | أفضل على 60fps+ |
| Speed ramp | 1→0.3→1 | منحنى | متقدم، للسينمائي |

> **تنبيه:** التسريع/الإبطاء على VFR يكسر المزامنة. حوّل لـ CFR أولاً.

---

## E. المونتاج العربي المتقن 🇸🇦

### اتجاه وترتيب النص العربي
- النص العربي يقرأ من **اليمين لليسار** دائماً
- ضع العناوين العربية على يمين الشاشة (جهة البداية) أو في الوسط
- لا تقلب اتجاه النص إطلاقاً

### اختيار الخط العربي حسب المزاج
| مزاج المحتوى | الخط المقترح |
|--------------|-------------|
| عناوين كبيرة قوية | VIP Hala Bold، DG Modal3at |
| عادي/واضح | NorsalGX |
| رياكشن/ميمز | أي خط واضح + حدود سميكة |
| كرتوني/طفولي | خطوط مستديرة |

### تنسيق النص العربي الاحترافي
```markdown
العنوان الرئيسي:
- خط كبير (70-120)
- حد (border) سميك بلون متباين (أسود على ملون)
- ظل خفيف للعمق
- الموقع: أعلى الوسط أو يمين الوسط

النص الثانوي/الشرح:
- خط أصغر (30-50)
- لون أفتح
- الموقع: أسفل الوسط أو يمين

الترجمة:
- أسفل الوسط
- مع خلفية شفافة للوضوح
```

### النموذج المخصص للترجمة العربية (نحويع SRT مع libass)
> مشكلة: حالياً libass يستخدم fontconfig للبحث. لضمان الخط العربي، استخدم ASS مع تعيين الخط مباشرة:
```markdown
في ملف ASS:
Style: Default,NorsalGX,60,&H00FFFFFF,,&H00000000,&H80000000,... 
- Fontname يمكن أن يكون اسم خط مثبت أو مسار
- يجب أن يكون النص في Dialogue مكتوباً بالعربية بشكل صحيح
```

---

## F. تصميم الثومبنيلات الاحترافية 🖼️

### القواعد الأساسية للثومبنيل اليوتيوب
```markdown
1. المقاس: 1280x720 (يوتيوب) / 1080x1920 (ريلز/شورتس)
2. نص كبير جداً - يُقرأ حتى على الشاشة الصغيرة
3. تباين عالي بين الخلفية والنص
4. تعبير وجه أو حركة واضحة
5. 3 عناصر كحد أقصى - لا تزدحم
```

### بناء الثومبنيل خطوة بخطوة
```bash
# 1) استخرج إطار مناسب
ffmpeg -ss 5 -i input.mp4 -frames:v 1 -vf "scale=1280:720" frame.jpg

# 2) أضف عنوان ضخم بحد قوي (بعدها عبر ASS/SRT)
# 3) أضف السطوع/التباين ليجذب النظر
```

### نمط الألوان الشائع (اجتذاب النظر)
| العنصر | اللون |
|--------|-------|
| النص الرئيسي | أصفر، أحمر، أبيض (ساطع) |
| الظل/الحد | أسود سميك |
| الخلفية المنفعلة | باهتة/مشبعة متوسطة |

### مثال ثومبنيل كامل
```bash
# استخرج إطار
ffmpeg -ss 3 -i gameplay.mp4 -frames:v 1 -vf "scale=1280:720" thumb.jpg

# حسّن التباين ليبرز
ffmpeg -i thumb.jpg -vf "eq=contrast=1.2:saturation=1.4" thumb_vivid.jpg

# ثم أضف العنوان عبر ASS (أصفر بحد أسود سميك)
```

---

## G. الإيقاع العام وإحساس الفيديو (The "Feel")

### وصف المزاج (Mood) - حدد قبل البدء
```markdown
قبل أي مونتاج، اسأل/حدد:
- ما المزاج؟ (مثير، مضحك، حزين، مريح، حماسي)
- ما سرعة الإيقاع؟ (سريع، متوسط، بطيء)
- ما الهدف؟ (ترفيه، تعليم، دعاية)

كل قرار تالي (قص، موسيقى، أفكت) يجب أن يخدم هذا المزاج
```

### التناقض (Contrast) يولد الاهتمام
```markdown
- مشهد سريع ثم توقف مفاجئ -> اثر قوي
- موسيقى عالية ثم صمت -> لحظة مهمة
- لون مشبع ثم أبيض/أسود -> رمزية
- لوحة مزدحمة ثم بسيطة -> تركيز

التباين المتعمد = الاهتمام
```

### القاعدة: أقل = أكثر (Minimalism)
```markdown
الاحترافية: التحكم وليس التكثير
- عدد أقل من الانتقالات
- عدد أقل من النصوص على الشاشة
- موسيقى حسب الحاجة
- SFX فقط حيث يخدم اللحظة
```

---

## H. خطة المونتاج - قبل النزول للأوامر

### قالب التخطيط (Plan First) — مع مرجع قرار سريع
```markdown
أقترح دائماً خطة قبل تنفيذ أي مونتاج:

1. **الفيديو**: المدة، الدقة، المحتوى الأساسي
2. **المزاج**: مثير/هادئ/مضحك... (يحدد كل قرارات C/D/E/F)
3. **الهيكل**: 3 ثواني افتتاحية، الجسد، الختام
4. **الموسيقى**: موسيقى كاملة؟ متى ترتفع/تنخفض (مرجع B)
5. **SFX**: 3-5 نقاط رئيسية بوضوح (مرجع D - SFX Decision Tree)
6. **النصوص**: العنوان، الترجمة، المواضع (مرجع E للعربي)
7. **الأفكتات/الانتقالات**: ما النوع ومتى (مرجع D - Transition Decision Tree)
8. **الزوم**: أين ولماذا (مرجع Zoom Decision Tree)
9. **السرعة**: أين تسريع/إبطاء (مرجع Speed Decision Tree)
10. **الثومبنيل**: صورة + عنوان
11. **التصدير**: الدقة النهائية والجودة

اعرض الخطة على المستخدم قبل التنفيذ، أو نفذها بذكاء بناءً على السياق
```

### بطاقة مرجع سريع (Quick Reference Card)
```markdown
عند أي قرار مونتاجي، اسأل نفسك:

🎬 **قص؟** ← هل انتهت الحركة/الجملة؟ هل على النبضة؟ → قص (C)
🎵 **موسيقى؟** ← هل فيه كلام؟ هل لحظة ذروة؟ → ارفع/اخفض (B)
🔊 **SFX؟** ← هل لحظة تستاهل؟ ما نوعها؟ → اختر من جدول D
✨ **انتقال؟** ← هل ضروري؟ 90% لا → Hard Cut (D)
🔍 **زوم؟** ← هل في هدف أبرزه؟ ما نوع التركيز؟ → اختر من Zoom Tree
⚡ **سرعة؟** ← ملل → أسرع. ذروة → أبطئ. (Speed Tree)
📝 **نص عربي؟** ← يمين/وسط، حد سميك، خط واضح (E)
🖼️ **ثومبنيل؟** ← أفضل لقطة + عنوان أصفر بحد أسود (F)

إذا ترددت: أقل = أكثر. لا تضف شيء إلا إذا خدم المزاج.
```

---

## I. مثال تطبيقي كامل (تخطيط حقيقي)

### سيناريو: Gameplay Montage حماسي (45 ثانية)
```markdown
الخطة المقترحة:
- الافتتاحية (0-3 ث): قص سريع حماسي + Boom SFX + موسيقى تصاعدية + Zoom Punch على أول فعل
- الجسد (3-35 ث): قص على إيقاع الموسيقى (كل 1-2 نبضة)، عدة لقطات سريعة، فلتر سينمائي، Zoom In بطيء على أفضل لحظتين
- الذروة (35-42 ث): أفضل لحظة في اللعبة + Epic impact SFX + موسيقى تصعد + Flash transition
- الختام (42-45 ث): تلاشي النهاية + شعار/نص دعوة اشتراك
- الثومبنيل: أفضل لقطة + عنوان أصفر بحد أسود

التنفيذ (تسلسل الأوامر):
1. استخرج الثومبنيل والصورة الأولى (video_preview)
2. قص المقاطع الجيدة بالمدة المطلوبة (cut)
3. حول لـ CFR إن كان VFR (fps=60,setpts)
4. طبق الفلتر السينمائي (filter)
5. أضف Zoom Punch على لقطة القتلة (zoom)
6. أضف Zoom In بطيء على لقطة الذروة (zoom)
7. أضف الموسيقى مع afade صعود وهبوط (add_music)
8. أضف SFX عند نقاط الذروة: Boom على القتلة، Whoosh على الانتقالات (add_sfx)
9. أضف النصوص عبر SRT/ASS (add_text / subtitle_burn)
10. ادمج كل شيء + انتقالات: Hard Cut للأغلب، Flash عند الذروة (merge / legendary_transition)
11. صدّر بالدقة والجودة النهائية (convert)
```

---

## J. فحص الجودة النهائي (Quality Check)

### قبل تسليم أي نتيجة، تأكد:
```markdown
1. ✅ ffprobe يقرأ الملف (متين)
2. ✅ يفتح على الجهاز / يمر على مشغل
3. ✅ المدة الصحيحة
4. ✅ الصوت واضح غير مشبع
5. ✅ النص العربي ظاهر بشكل صحيح
6. ✅ الألوان طبيعية (الفلتر لم يفسدها)
7. ✅ الانتقالات ناعمة
8. ✅ الكثافة مناسبة للشاشة (لا ازدحام)
9. ✅ CFR ثابت (إن طبقت zoom/speed) — لا VFR
10. ✅ المزامنة SFX/موسيقى صحيحة (لا delay)
```

---

## K. تقرير للمستخدم بعد التنفيذ
```markdown
بعد أي مونتاج، اشرح بعبارات واضحة:
- شنو سويت (باختصار)
- شنو القرارات الفنية اخترتها (وجوديًا)
- وين الملف النهائي
- كيف يفتح
- اقتراحات للتحسين أو الإصدار التالي
```

---

## خلاصة فلسفة المونتاج
> **المونتاج ليس تنفيذ أوامر، بل رواية قصة بإيقاعٍ متعمد.**
> كل قص، كل موسيقى، كل أفكت، كل نص، كل زوم، كل تسريع — قرار فني يخدم المزاج والهدف.
> افهم المزاج أولاً، ثم خطط الهيكل (مع Decision Trees)، ثم نفذ. التبسيط والتحكم هما علامتا الاحتراف.
> أقل = أكثر. الاحترافية: التحكم وليس التكثير.
```

---

## I. مثال تطبيقي كامل (تخطيط حقيقي)

### سيناريو: Gameplay Montage حماسي (45 ثانية)
```markdown
الخطة المقترحة:
- الافتتاحية (0-3 ث): قص سريع حماسي + Boom SFX + موسيقى تصاعدية
- الجسد (3-35 ث): قص على إيقاع الموسيقى، عدة لقطات سريعة، فلتر سينمائي
- الذروة (35-42 ث): أفضل لحظة في اللعبة + Epic impact + موسيقى تصعد
- الختام (42-45 ث): تلاشي النهاية + شعار/نص دعوة اشتراك
- الثومبنيل: أفضل لقطة + عنوان أصفر بحد أسود

التنفيذ (تسلسل الأوامر):
1. استخرج الثومبنيل والصورة الأولى
2. قص المقاطع الجيدة بالمدة المطلوبة
3. طبق الفلتر السينمائي
4. أضف الموسيقى مع afade صعود وهبوط
5. أضف SFX عند نقاط الذروة
6. أضف النصوص عبر SRT/ASS
7. ادمج كل شيء + الانتقالات
8. صدّر بالدقة والجودة النهائية
```

---

## J. فحص الجودة النهائي (Quality Check)

### قبل تسليم أي نتيجة، تأكد:
```markdown
1. ✅ ffprobe يقرأ الملف (متين)
2. ✅ يفتح على الجهاز / يمر على مشغل
3. ✅ المدة الصحيحة
4. ✅ الصوت واضح غير مشبع
5. ✅ النص العربي ظاهر بشكل صحيح
6. ✅ الألوان طبيعية (الفلتر لم يفسدها)
7. ✅ الانتقالات ناعمة
8. ✅ الكثافة مناسبة للشاشة (لا ازدحام)
```

---

## K. تقرير للمستخدم بعد التنفيذ
```markdown
بعد أي مونتاج، اشرح بعبارات واضحة:
- شنو سويت (باختصار)
- شنو القرارات الفنية اخترتها (وجوديًا)
- وين الملف النهائي
- كيف يفتح
- اقتراحات للتحسين أو الإصدار التالي
```

---

## L. أدوات متقدمة جديدة (New Plugin Actions)

### L.1 Speed Ramp (`speed_ramp`) — تسارع/إبطاء متدرج
```bash
speed_points="0:1,2:2,5:0.5,8:1"
# 0ث: سرعة عادية، 2ث: 2x، 5ث: 0.5x، 8ث: عادية
```
**متى تستخدم:** تقنيات Speed Ramping للـ highlights، drone shots، action sequences
**نصيحة:** استخدم 3-4 نقاط كحد أقصى، انتقالات ناعمة أفضل من قفزات حادة

### L.2 Color Grade (`color_grade`) — تصنيف لوني احترافي
```bash
# عبر LUT
lut="path/to/lut.cube"

# أو Presets جاهزة
color_preset="cinematic"       # تباين + دفء خفيف + توازن
color_preset="teal-orange"     # سينمائي كلاسيكي
color_preset="vintage"         # فيلم قديم
color_preset="bleach-bypass"   # تباين عالي، تشبع منخفض
color_preset="film-noir"       # أبيض/أسود عالي التباين
color_preset="hdr"             # نطاق ديناميكي عالي
color_preset="log-to-rec709"   # تحويل Log إلى Rec.709
```
**نصيحة:** لـ LUTs: ضعها في `C:\Users\mr_ali7685\Documents\مونتاج\Content creation\LUTs\`

### L.3 Audio Duck (`audio_duck`) — تخفيض الموسيقى تحت الكلام
```bash
music="path/to/music.mp3"
duck_amount=0.2      # ينزل الموسيقى لـ 20% عند وجود كلام
duck_attack=0.1      # سرعة التخفيف (ثواني)
duck_release=0.5     # سرعة العودة (ثواني)
```
**متى تستخدم:** Voiceover، commentary، podcast على موسيقى خلفية

### L.4 Normalize Audio (`normalize_audio`) — تطبيع EBU R128
```bash
target_lufs=-14      # YouTube/Spotify/Netflix standard
true_peak=-1         # يمنع التشبع
```
**مهم:** يمرر مرتين (analyze → apply) — يضمن loudness موحد للمنصات

### L.5 Auto Cut (`auto_cut`) — قص تلقائي بالصمت/المشهد
```bash
cut_threshold=0.3    # عتبة الصمت (dB)
min_scene=1          # أقل مدة مشهد (ثواني)
```
**يستخدم:** `silencedetect` + `scene` filter — جيد للمحتوى الطويل، podcasts

### L.6 Beat Sync (`beat_sync`) — قص على الإيقاع
```bash
bpm=128              # أو 140 للـ EDM، 90 للـ Hip-hop
```
**نصيحة:** احسب BPM الموسيقى أولاً، ثم القص على الـ downbeats

### L.7 Thumbnail Grid (`thumbnail_grid`) — شبكة معاينة (Contact Sheet)
```bash
# ينتج صورة واحدة 4x3 = 12 لقطة موزعة على الفيديو
```
**مفيد:** Quick preview، اختيار أفضل لحظات للـ thumbnail

### L.8 GIF Loop (`gif_loop`) — GIF متكرر بسلاسة
```bash
duration=4           # مدة الـ GIF
loop_count=0         # 0 = لا نهائي، 1 = مرة واحدة
```
**تقنية:** palettegen → paletteuse مع bayer dithering للجودة

### L.9 Waveform (`waveform`) — رسم موجة الصوت
```bash
waveform_color="white"
waveform_bg="black@0.5"
```
**مستخدم لـ:** Podcast visualization، music videos، audiograms

### L.10 Progress Bar (`progress_bar`) — شريط تقدم
```bash
progress_color="red"
progress_height=4
```
**مستخدم لـ:** Shorts/Reels/TikTok — يشير للمشاهد "كم باقي"

### L.11 Blur Face (`blur_face`) — تمويه وجوه
```bash
blur_strength=20     # قوة التمويه
```
**مهم:** هذا فلتر بسيط (boxblur على مناطق ثابتة) — للـ face detection الحقيقي تحتاج ML

### L.12 Motion Blur (`motion_blur`) — ضبابية حركة
```bash
# tmix بـ 5 إطارات = motion blur طبيعي
```
**مستخدم لـ:** تحسين الـ 60fps→30fps، stylized look

### L.13 Denoise (`denoise`) — إزالة ضوضاء
```bash
denoise_strength=0.5 # 0-1
```
**Fltr:** `hqdn3d` — جيد للفيديوهات الليلية، ISO عالي

### L.14 Lens Correction (`lens_correction`) — تصحيح عدسة
```bash
k1=-0.05             # تشويه برميل (salmon)
k2=0.01              # تشويه وسادة
```
**مستخدم لـ:** GoPro، wide-angle، drone footage

### L.15 Timecode (`timecode`) — حرق كود زمني
```bash
# خط Consolas للوضوح
```
**مستخدم لـ:** Dailies، review copies، sync reference

### L.16 Crop Detect (`crop_detect`) — كشف حواف تلقائي
```bash
# يطبع: crop=1920:800:0:140
```
**مستخدم لـ:** إزالة الحروف السوداء التلقائي

### L.17 Scene Detect (`scene_detect`) — كشف تغيير المشهد
```bash
scene_threshold=0.4  # 0.3 حساس، 0.5 أقل حساسية
```
**يخرج:** timestamps لتغييرات المشهد — جيد للـ chapter markers

### L.18 Extract Audio (`extract_audio`) — استخراج صوت فقط
```bash
format="mp3"         # أو wav, aac
```

---

## M. سير عمل متقدم (Advanced Workflows)

### M.1 Podcast/Interview كامل
```
1. extract_audio → normalize_audio → (clean في DAW خارجي)
2. auto_cut على الصمت → يدوي refine
3. add_music (intro/outro) + audio_duck تحت الكلام
4. waveform للبصرية + timecode للمراجعة
5. subtitle_burn للنصوص
```

### M.2 Gaming Montage Competitive
```
1. video_preview (عدة نقاط) → حدد أفضل اللحظات
2. cut لقطات 3-8 ثواني لكل → مرر عبر fps=60,setpts
3. color_grade "teal-orange" أو LUT خاص
4. beat_sync على موسيقى (bpm=140 للـ phonk/EDM)
5. zoom "punch" على الـ clutches/aces
6. legendary_transition "flash" بين الـ rounds
7. add_sfx: "Boom" على الـ kills، "Anime punch" على الـ headshots
8. progress_bar لـ Shorts
9. thumbnail_grid → اختر أفضل لقطة
```

### M.3 Cinematic Travel/Drone
```
1. lens_correction (k1=-0.05 للـ GoPro/drone)
2. denoise للقطات الليلية
3. color_grade "cinematic" أو LUT
4. speed_ramp: drone reveal (0:1→2:0.3→5:1)
5. motion_blur للحركة السلسة
6. add_music + afade in/out
7. thumbnail_grid للـ location scouting
```

### M.4 Educational/Tutorial
```
1. timecode للـ timestamps
2. progress_bar للمدة
3. zoom "in" على UI clicks
4. blur_face للـ privacy
5. extract_audio → normalize_audio للتعليق الصوتي
6. auto_cut على الصمت بين الشروحات
```

---

## N. Decision Trees جديدة (للأدوات الجديدة)

### N.1 Speed Ramp Decision Tree
```
هل في حركة تحتاج إبراز؟
├─ نعم: هل هي كشف/Reveal؟ → Slow in (0.25-0.5x) على لحظة الكشف
├─ نعم: هل هي Action/Impact؟ → Fast → Slow → Fast (punch)
├─ نعم: هل Drone/Fly-through؟ → Speed up على الطيران، slow على المنظر
└─ لا: لا تستخدم speed ramp (يبقى ثابت)
```

### N.2 Color Grade Decision Tree
```
ما المزاج؟
├─ سينمائي/دراما → cinematic / teal-orange / bleach-bypass
├─ كوميدي/خفيف → vibrant / hdr
├─ رعب/غموض → film-noir / vintage (desaturated)
├─ رياضي/حماسي → teal-orange / hdr
├─ وثائقي/طبيعي → log-to-rec709 / لا فلتر
└─ فيديو قديم/Retro → vintage / film-noir
```

### N.3 Audio Duck Decision Tree
```
هل في كلام (Voiceover/Commentary)؟
├─ نعم → Duck music إلى 10-30% (duck_amount=0.1-0.3)
│   ├─ كلام سريع/كثير → Attack سريع (0.05)، Release بطيء (0.8)
│   └─ كلام متباعد → Attack متوسط (0.15)، Release متوسط (0.5)
└─ لا → لا تحتاج duck
```

### N.4 Denoise Decision Tree
```
اللقطة ليلية / ISO عالي؟
├─ نعم: denoise_strength=0.3-0.7 (ابتداً 0.5، زد إن احتجت)
│   ├─ جداً مزعج → 0.7-1.0 (لكن يفقد التفاصيل)
│   └─ خفيف → 0.2-0.4
└─ لا: لا تحتاج denoise (يفقد الحدة)
```

### N.5 Lens Correction Decision Tree
```
نوع الكاميرا؟
├─ GoPro/Action Cam → k1=-0.05 إلى -0.1
├─ Drone (DJI) → k1=-0.02 إلى -0.05
├─ Wide-angle lens → k1=-0.03 إلى -0.08
├─ Fisheye → k1=-0.1 إلى -0.2, k2=0.01-0.05
└─ عادي/Phone → عادة لا يحتاج
```

---

## O. مراجع أوامر FFmpeg للأدوات الجديدة

### Speed Ramp
```bash
# منحنى سرعة سلس
ffmpeg -i in.mp4 -vf "setpts='if(lt(t,2),t/1,if(lt(t,5),2+(t-2)*0.5,t-3))'" -af "atempo=1" out.mp4
```

### Color Grade with LUT
```bash
ffmpeg -i in.mp4 -vf "lut3d='file.cube'" -c:v libx264 -crf 18 out.mp4
```

### Audio Duck (Sidechain)
```bash
ffmpeg -i voice.mp4 -i music.mp3 -filter_complex \
"[1:a]volume=0.2[ducked];[0:a][ducked]sidechaincompress=threshold=0.1:ratio=20:attack=0.1:release=0.5[a]" \
-map 0:v -map "[a]" -c:v copy -c:a aac out.mp4
```

### Normalize EBU R128 (2-pass)
```bash
# Pass 1: تحليل
ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -

# Pass 2: تطبيق (استخدم القيم المقاسة)
ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:measured_I=-18:measured_TP=-2:measured_LRA=8:measured_thresh=-28:offset=4:linear=true out.mp4
```

### Thumbnail Grid
```bash
ffmpeg -i in.mp4 -vf "select='gte(t,5)+gte(t,15)+gte(t,25)+gte(t,35)',scale=320:180,tile=2x2" -frames:v 1 grid.jpg
```

### GIF Loop مثالي
```bash
# Pass 1: palette
ffmpeg -i in.mp4 -vf "fps=15,scale=480:-1:flags=lanczos,palettegen=max_colors=256" palette.png
# Pass 2: GIF
ffmpeg -i in.mp4 -i palette.png -filter_complex "fps=15,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" -loop 0 out.gif
```

### Waveform Overlay
```bash
ffmpeg -i in.mp4 -filter_complex \
"[0:a]showwaves=s=1920x200:mode=line:rate=30:colors=white[wv];[0:v][wv]overlay=0:H-h" \
-c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy out.mp4
```

### Scene Detect
```bash
ffmpeg -i in.mp4 -vf "select='gt(scene,0.4)',showinfo" -f null - 2>&1 | grep pts_time
```

### Crop Detect
```bash
ffmpeg -i in.mp4 -vf cropdetect=24:16:0 -f null - 2>&1 | tail -1
```

---
 
## P. المؤثرات البصرية المتقدمة (Visual Effects) 🎨
 
> هذه القسم يغطي كل المؤثرات البصرية المتاحة عبر البلوقن (`video_montage` action) وأوامر FFmpeg المباشرة. استخدمها لإضافة لمسة احترافية وسينمائية لمقاطعك.
 
### P.1 فلتر الألوان والدرجات (Color Filters & Grading)
 
| الفلتر | الاستخدام | أمثلة |
|--------|----------|-------|
| `cinematic` | تباين + دفء خفيف + تشبع | افتراضي للمونتاج الاحترافي |
| `teal-orange` | سينمائي كلاسيكي (أزرق/برتقالي) | أفلام الأكشن، السفر |
| `vintage` | فيلم قديم، ألوان باهتة | ريترو، نوستالجيا |
| `bleach-bypass` | تباين عالي، تشبع منخفض | رعب، إثارة، دراما قاسية |
| `film-noir` | أبيض/أسود عالي التباين | غموض، تحقيق، أسلوب قديم |
| `hdr` | نطاق ديناميكي عالي | لقطات طبيعة، درون |
| `vibrant` | تشبع عالي، ألوان ناقطة | ميمز، محتوى مرح، أطفال |
| `vhs` | ضوضاء، تشبع منخفض، تباين | أسلوب VHS قديم |
| `negative` | ألوان معكوسة | تأثير غريب، غلتيش |
| `sharpen` | حدة تفاصيل | لقطات ضبابية، نص صغير |
| `blur` | ضبابية صندوقية | خلفية، تركيز على كائن |
| `vignette` | إظلام الأطراف | تركيز على المركز، سينمائي |
 
**عبر البلوقن:**
```typescript
await video_montage({ action: "filter", effect: "cinematic", input: "in.mp4", output: "out.mp4" })
await video_montage({ action: "color_grade", color_preset: "teal-orange", input: "in.mp4", output: "out.mp4" })
await video_montage({ action: "color_grade", lut: "C:/path/to/lut.cube", input: "in.mp4", output: "out.mp4" })
```
 
### P.2 مؤثرات السينمائية المتخصصة (Cinematic Effects)
 
| التأثير | الوصف | المعاملات |
|----------|--------|-----------|
| `lens_correction` | تصحيح تشويه العدسة (GoPro، درون) | `k1`, `k2` (مثال: `k1=-0.05`) |
| `denoise` | إزالة ضوضاء الفيديو | `denoise_strength` (0-1، افتراضي 0.5) |
| `motion_blur` | ضبابية حركة طبيعية | - |
| `film_grain` | حبيبات فيلم | `strength` |
| `light_leaks` | تسربات ضوء | - |
| `film_burn` | حرق فيلم | - |
| `scanlines` | خطوط مسح CRT | - |
| `rgb_shift` | إزاحة قنوات RGB | `amount` |
| `glitch` | غلتيش رقمي | `intensity`, `duration` |
| `chromatic_aberration` | انحراف لوني | - |
 
**أوامر FFmpeg مباشرة:**
 
```bash
# Film Grain
ffmpeg -i in.mp4 -vf "noise=alls=10:allf=t" -c:v libx264 -crf 18 out.mp4

# Lens Correction (GoPro k1=-0.05)
ffmpeg -i in.mp4 -vf "lenscorrection=k1=-0.05:k2=0.01" -c:v libx264 -crf 18 out.mp4

# Denoise (hqdn3d)
ffmpeg -i in.mp4 -vf "hqdn3d=10:10:6:6" -c:v libx264 -crf 18 out.mp4

# Motion Blur (tmix)
ffmpeg -i in.mp4 -vf "tmix=frames=5:weights=1 1 1 1 1" -c:v libx264 -crf 18 out.mp4

# RGB Shift / Glitch
ffmpeg -i in.mp4 -vf "geq=r='r(X+2,Y)':g='g(X,Y)':b='b(X-2,Y)'" -c:v libx264 -crf 18 out.mp4

# Scanlines
ffmpeg -i in.mp4 -vf "geq='if(gt(mod(Y,4),1),lum,0)'" -c:v libx264 -crf 18 out.mp4

# Chromatic Aberration
ffmpeg -i in.mp4 -vf "lenscorrection=k1=-0.02:k2=0.01" -c:v libx264 -crf 18 out.mp4
```
 
### P.3 الانتقالات البصرية المتقدمة (Visual Transitions)
 
| الانتقال | الوصف | الاستخدام |
|-----------|--------|-----------|
| `zoomin` / `zoomout` | زوم أثناء الانتقال | أكشن، أبرز لحظة |
| `smooth` / `fade` | تلاشي ناعم | عام، احترافي |
| `whippan` | حركة كاميرا سريعة | أكشن، سرعة |
| `flash` / `fadeblack` | وميض أبيض/أسود | صدمة، ذروة |
| `circle` / `circleopen` | دائرة تفتح/تغلق | تركيز على كائن |
| `wipe` / `wiperight` | مسح أفقي | تغير مشهد |
| `slideleft` / `slideright` | انزلاق | تدفق مستمر |
| `smoothleft` / `smoothright` | انزلاق سلس | سينمائي |
| `distance` | انتقال أومني | فنّي |
| `pixelize` | بكسل | غلتيش، ريترو |
| `radial` | شعاعي | علمي، تقني |
| `squeezev` / `squeezeh` | ضغط | مضحك، ميمز |
 
**عبر البلوقن:**
```typescript
await video_montage({ 
  action: "legendary_transition", 
  transition_type: "flash", 
  transition_duration: 0.3,
  input: "clip1.mp4", 
  inputs: ["clip2.mp4"], 
  output: "out.mp4" 
})
```
 
### P.4 الزوم والتتبع (Zoom & Tracking)
 
| النوع | الوصف | المعاملات |
|-------|--------|-----------|
| `punch` | تقريب فوري سريع (0.3-0.5ث) | `zoom=1.5`, `zoom_duration=0.4`, `center_x/y` |
| `in` | تقريب بطيء درامي (2-4ث) | `zoom=1.5-2.0`, `zoom_duration=3` |
| `out` | تبعيد للكشف عن السياق | `zoom=1.5→1`, `zoom_duration=2-3` |
 
**عبر البلوقن:**
```typescript
await video_montage({ 
  action: "zoom", 
  zoom_type: "punch", 
  zoom: 1.6, 
  zoom_duration: 0.4, 
  center_x: 0.5, 
  center_y: 0.5,
  input: "clip.mp4", 
  output: "zoomed.mp4" 
})
```
 
> **ملاحظة هامة:** البلوقن يستخدم `scale+crop` للزوم الثابت (يحافظ على المدة والـ FPS تماماً). للزوم المتحرك استخدم `zoompan` مع `setpts` كما موضح في القسم التقني.
 
### P.5 تأثيرات النص والطباعة (Text Effects)
 
| التأثير | الوصف | مثال |
|----------|--------|------|
| `appear` | ظهور تدريجي | عنوان رئيسي |
| `slide-in-left` | انزلاق من اليسار | نص سفلي |
| `slide-in-right` | انزلاق من اليمين | نص جانبي |
| `scroll` | تمرير أفقي | تيكير أخبار |
| `typewriter` | كتابة حرف بحرف | درامي |
| `glitch_text` | نص غلتيش | رعب، تقني |
| `neon` | نيون متوهج | سيبربانك |
| `3d_text` | نص ثلاثي الأبعاد | سينمائي |
 
**عبر البلوقن:**
```typescript
await video_montage({ 
  action: "animated_text", 
  animation: "slide-in-left",
  text: "EPIC MOMENT", 
  size: 80, 
  color: "yellow",
  font: "Luckiest Guy.ttf",
  input: "in.mp4", 
  output: "out.mp4" 
})
```
 
### P.6 مؤشرات بصرية (Visual Indicators)
 
| المؤشر | الوصف | الاستخدام |
|---------|--------|-----------|
| `waveform` | موجة صوتية في الأسفل | بودكاست، ミュージック فيديو |
| `progress_bar` | شريط تقدم | شورتس، ريلز، تيك توك |
| `timecode` | كود زمني محروق | مراجعة، دايليز |
| `thumbnail_grid` | شبكة 12 لقطة | معاينة سريعة، اختيار ثومبنيل |
 
**عبر البلوقن:**
```typescript
await video_montage({ action: "waveform", waveform_color: "white", waveform_bg: "black@0.5", input: "in.mp4", output: "out.mp4" })
await video_montage({ action: "progress_bar", progress_color: "red", progress_height: 4, input: "in.mp4", output: "out.mp4" })
await video_montage({ action: "timecode", input: "in.mp4", output: "out.mp4" })
await video_montage({ action: "thumbnail_grid", input: "in.mp4", output: "grid.jpg" })
```
 
### P.7 تأثيرات الوجه والخصوصية
 
| التأثير | الوصف |
|----------|--------|
| `blur_face` | تمويه وجوه (boxblur على مناطق ثابتة) |
| `pixelate_face` | بكسلنة وجوه |
 
> **تنبيه:** البلوقن الحالي يستخدم `geq` للتمويه البسيط. للكشف الحقيقي عن الوجوه تحتاج ML model خارجي.
 
### P.8 Decision Tree للمؤثرات البصرية (Visual Effects Decision Tree)
 
```
هل تحتاج مؤثر بصري؟
├─ لا → اتركه نظيف (أقل = أكثر)
└─ نعم → ما الهدف؟
     ├─ إبراز لحظة (قتلة، نص) → Zoom Punch + Flash/Sound
     ├─ بناء ترقب → Zoom In بطيء + Suspense SFX + Darker grade
     ├─ كشف سياق → Zoom Out + Cinematic Whoosh
     ├─ مزاج سينمائي → Color Grade (teal-orange/cinematic) + Film Grain
     ├─ مزاج ريترو/قديم → VHS + Vintage + Scanlines
     ├─ مزاج غلتيش/تقني → RGB Shift + Glitch + Negative flashes
     ├─ مزاج رعب → Film Noir + Denoise + Heartbeat SFX
     ├─ محتوى تعليمي → Zoom In على UI + Progress Bar + Timecode
     ├─ شورتس/ريلز → Progress Bar + Vibrant + Fast cuts
     └─ انتقال بين مشاهد → Legendary Transition (اختر حسب المزاج)
```
 
### P.9 وصفات جاهزة (Visual Effect Recipes)
 
#### 1. "Epic Gaming Moment" (لحظة قتلة حماسية)
```typescript
// 1. Zoom Punch على اللحظة
await video_montage({ action: "zoom", zoom_type: "punch", zoom: 1.6, zoom_duration: 0.4, center_x: 0.5, center_y: 0.4, input: "clip.mp4", output: "z.mp4" })

// 2. Flash transition للانتقال للقطعة التالية
await video_montage({ action: "legendary_transition", transition_type: "flash", transition_duration: 0.25, input: "z.mp4", inputs: ["next.mp4"], output: "trans.mp4" })

// 3. Color Grade سينمائي
await video_montage({ action: "color_grade", color_preset: "teal-orange", input: "trans.mp4", output: "grade.mp4" })

// 4. Impact SFX
await video_montage({ action: "add_sfx", category: "suspense", sfx: "Impact (1).wav", at: 0, input: "grade.mp4", output: "final.mp4" })
```
 
#### 2. "Meme/Comedy Style" (ستايل ميمز مضحك)
```typescript
// 1. Vibrant colors
await video_montage({ action: "filter", effect: "vibrant", input: "in.mp4", output: "v.mp4" })

// 2. Speed up الأجزاء المملة
await video_montage({ action: "speed", factor: 3, input: "v.mp4", output: "sp.mp4" })

// 3. Zoom Punch + Anime Punch SFX على الفشل
await video_montage({ action: "zoom", zoom_type: "punch", zoom: 1.8, zoom_duration: 0.3, input: "sp.mp4", output: "z.mp4" })
await video_montage({ action: "add_sfx", category: "meme", sfx: "Anime punch.mp3", at: 0, input: "z.mp4", output: "sfx.mp4" })

// 4. Vine Boom على الانتقال
await video_montage({ action: "add_sfx", category: "meme", sfx: "Vine Boom.mp3", at: 5, input: "sfx.mp4", output: "final.mp4" })
```
 
#### 3. "Cinematic Travel/Drone" (سفر/درون سينمائي)
```typescript
// 1. Lens Correction للـ GoPro/Drone
await video_montage({ action: "lens_correction", k1: -0.05, k2: 0.01, input: "raw.mp4", output: "corr.mp4" })

// 2. Denoise للقطات الليلية
await video_montage({ action: "denoise", denoise_strength: 0.5, input: "corr.mp4", output: "dn.mp4" })

// 3. Color Grade سينمائي
await video_montage({ action: "color_grade", color_preset: "cinematic", input: "dn.mp4", output: "grade.mp4" })

// 4. Speed Ramp للكشف عن المنظر
await video_montage({ action: "speed_ramp", speed_points: "0:1,2:0.3,6:1", input: "grade.mp4", output: "ramp.mp4" })

// 5. Motion Blur للحركة السلسة
await video_montage({ action: "motion_blur", input: "ramp.mp4", output: "final.mp4" })
```
 
#### 4. "Educational/Tutorial" (تعليمي/شروحات)
```typescript
// 1. Progress Bar
await video_montage({ action: "progress_bar", progress_color: "blue", progress_height: 4, input: "in.mp4", output: "pb.mp4" })

// 2. Timecode للمراجعة
await video_montage({ action: "timecode", input: "pb.mp4", output: "tc.mp4" })

// 3. Zoom In على النقرات
await video_montage({ action: "zoom", zoom_type: "in", zoom: 1.5, zoom_duration: 1, center_x: 0.7, center_y: 0.3, input: "tc.mp4", output: "zoom.mp4" })

// 4. Blur Face للخصوصية
await video_montage({ action: "blur_face", blur_strength: 25, input: "zoom.mp4", output: "final.mp4" })
```

### P.10 وصفات متقدمة للمؤثرات الجديدة (Advanced Visual Effect Recipes)

#### 5. "Action/Adrenaline" - Zoom Blur + Directional Blur
```typescript
// للمشاهد السريعة: مطاردات، قفزات، هجمات
await video_montage({ action: "zoom_blur", zoom: 2.5, frames: 8, center_x: 0.5, center_y: 0.5, input: "action.mp4", output: "zb.mp4" })
await video_montage({ action: "directional_blur", angle: 0, distance: 30, input: "zb.mp4", output: "db.mp4" })
await video_montage({ action: "color_grade", color_preset: "teal-orange", input: "db.mp4", output: "final.mp4" })
await video_montage({ action: "add_sfx", category: "transition", sfx: "Whoosh 1.mp3", at: 0, input: "final.mp4", output: "done.mp4" })
```

#### 6. "Horror/Thriller" - Glow + Color Isolation + Vignette
```typescript
// للرعب: توهج العيون، عزل الأحمر للدم، فينيت داكن
await video_montage({ action: "glow", threshold: 0.8, radius: 30, input: "horror.mp4", output: "glow.mp4" })
await video_montage({ action: "color_isolation", color: "red", tolerance: 0.15, input: "glow.mp4", output: "iso.mp4" })
await video_montage({ action: "vignette_advanced", shape: "ellipse", intensity: 0.7, radius: 0.6, input: "iso.mp4", output: "vig.mp4" })
await video_montage({ action: "add_sfx", category: "suspense", sfx: "Heartbeat.mp3", at: 0, input: "vig.mp4", output: "final.mp4" })
```

#### 7. "Retro/VHS Aesthetic" - Halftone + Posterize + Scanlines
```typescript
// ستايل كاريكاتير/كوميكس قديم
await video_montage({ action: "halftone", size: 6, input: "retro.mp4", output: "ht.mp4" })
await video_montage({ action: "posterize", levels: 6, input: "ht.mp4", output: "post.mp4" })
await video_montage({ action: "scanlines", input: "post.mp4", output: "sl.mp4" })
await video_montage({ action: "vhs_effect", input: "sl.mp4", output: "final.mp4" })
await video_montage({ action: "add_sfx", category: "meme", sfx: "Minecraft_oof.mp3", at: 2, input: "final.mp4", output: "done.mp4" })
```

#### 8. "Artistic/Experimental" - Solarize + Emboss + Edge Detect
```typescript
// فيديو فنّي تجريبي
await video_montage({ action: "solarize", threshold: 100, input: "art.mp4", output: "sol.mp4" })
await video_montage({ action: "emboss", input: "sol.mp4", output: "emb.mp4" })
await video_montage({ action: "edge_detect", input: "emb.mp4", output: "edg.mp4" })
await video_montage({ action: "color_grade", color_preset: "film-noir", input: "edg.mp4", output: "final.mp4" })
```

#### 9. "Cinematic Letterbox + Film Border" - سينمائي حقيقي
```typescript
// للتصدير النهائي: أشرطة سوداء + حدود فيلم 35mm
await video_montage({ action: "letterbox", aspect: "2.35:1", input: "cinematic.mp4", output: "lb.mp4" })
await video_montage({ action: "film_border", style: "35mm", input: "lb.mp4", output: "final.mp4" })
await video_montage({ action: "add_music", music: "cinematic_theme.mp3", volume: 0.25, input: "final.mp4", output: "done.mp4" })
```

#### 10. "Sci-Fi/Cyberpunk" - Prism + Chromatic Aberration + Glitch
```typescript
// ستايل سيبربانك: انقسام ألوان، غلتيش، بريزم
await video_montage({ action: "prism", offset: 8, input: "scifi.mp4", output: "pri.mp4" })
await video_montage({ action: "chromatic_aberration", amount: 8, input: "pri.mp4", output: "ca.mp4" })
await video_montage({ action: "glitch", intensity: 0.4, input: "ca.mp4", output: "gl.mp4" })
await video_montage({ action: "color_grade", color_preset: "hdr", input: "gl.mp4", output: "grade.mp4" })
await video_montage({ action: "add_sfx", category: "transition", sfx: "Explode1.mp3", at: 0, input: "grade.mp4", output: "final.mp4" })
```

#### 11. "Kaleidoscope Transition" - انتقال فنّي
```typescript
// انتقال إبداعي بين مشهدين
await video_montage({ action: "kaleidoscope", segments: 12, input: "scene1.mp4", output: "kal1.mp4" })
await video_montage({ action: "kaleidoscope", segments: 12, input: "scene2.mp4", output: "kal2.mp4" })
await video_montage({ action: "legendary_transition", transition_type: "circle", transition_duration: 0.8, input: "kal1.mp4", inputs: ["kal2.mp4"], output: "final.mp4" })
```

### P.11 سير عمل مدمجة (Visual + Audio Integrated Workflows)

#### Workflow A: Gaming Montage كامل (90 ثانية)
```typescript
// 1. استخراج أفضل اللحظات
await video_montage({ action: "scene_detect", scene_threshold: 0.4, input: "raw_gameplay.mp4", output: "scenes.json" })

// 2. قص اللقطات (3-5 ثواني لكل)
await video_montage({ action: "auto_cut", cut_threshold: 0.3, min_scene: 2, input: "raw_gameplay.mp4", output: "clips/" })

// 3. لكل لقطة: Zoom Punch + Color Grade + SFX
for (const clip of clips) {
  await video_montage({ action: "zoom", zoom_type: "punch", zoom: 1.5, zoom_duration: 0.3, input: clip, output: `z_${clip}` })
  await video_montage({ action: "color_grade", color_preset: "teal-orange", input: `z_${clip}`, output: `g_${clip}` })
  await video_montage({ action: "add_sfx", category: "suspense", sfx: "Impact (1).wav", at: 0, input: `g_${clip}`, output: `s_${clip}` })
}

// 4. Beat Sync على الموسيقى
await video_montage({ action: "beat_sync", bpm: 140, input: "music.mp3", output: "beat_points.json" })

// 5. دمج مع انتقالات أسطورية
await video_montage({ action: "legendary_transition", transition_type: "flash", transition_duration: 0.2, input: "s_1.mp4", inputs: ["s_2.mp4"], output: "merge1.mp4" })
// ... كرر لكل اللقطات

// 6. Progress Bar + Waveform للشورتس
await video_montage({ action: "progress_bar", progress_color: "red", progress_height: 6, input: "merged.mp4", output: "pb.mp4" })
await video_montage({ action: "waveform", waveform_color: "cyan", waveform_bg: "black@0.3", input: "pb.mp4", output: "wb.mp4" })

// 7. Normalize Audio للمنصات
await video_montage({ action: "normalize_audio", target_lufs: -14, true_peak: -1, input: "wb.mp4", output: "final.mp4" })

// 8. Thumbnail Grid للمعاينة
await video_montage({ action: "thumbnail_grid", input: "final.mp4", output: "thumb_grid.jpg" })
```

#### Workflow B: Podcast/Interview احترافي
```typescript
// 1. استخراج الصوت وتنظيفه
await video_montage({ action: "extract_audio", format: "wav", input: "podcast.mp4", output: "audio.wav" })
await video_montage({ action: "normalize_audio", target_lufs: -16, true_peak: -1, input: "audio.wav", output: "audio_norm.wav" })

// 2. Auto Cut على الصمت
await video_montage({ action: "auto_cut", cut_threshold: 0.2, min_scene: 3, input: "podcast.mp4", output: "cuts/" })

// 3. Audio Duck للموسيقى تحت الكلام
await video_montage({ action: "audio_duck", duck_amount: 0.15, duck_attack: 0.1, duck_release: 0.5, music: "bg_music.mp3", input: "podcast.mp4", output: "ducked.mp4" })

// 4. Waveform + Timecode + Progress Bar
await video_montage({ action: "waveform", waveform_color: "white", waveform_bg: "black@0.4", input: "ducked.mp4", output: "wv.mp4" })
await video_montage({ action: "timecode", input: "wv.mp4", output: "tc.mp4" })
await video_montage({ action: "progress_bar", progress_color: "blue", progress_height: 3, input: "tc.mp4", output: "pb.mp4" })

// 5. Subtitle Burn للنصوص
await video_montage({ action: "subtitle_burn", srt: "captions.srt", input: "pb.mp4", output: "sub.mp4" })

// 5. تصدير نهائي
await video_montage({ action: "normalize_audio", target_lufs: -16, input: "sub.mp4", output: "final_podcast.mp4" })
```

#### Workflow C: Short/Reel/TikTok (60 ثانية)
```typescript
// 1. تحويل لـ Vertical 9:16
await video_montage({ action: "crop_rotate", crop_type: "vertical-reels", input: "horizontal.mp4", output: "vertical.mp4" })

// 2. Vibrant + Speed Ramp
await video_montage({ action: "filter", effect: "vibrant", input: "vertical.mp4", output: "vib.mp4" })
await video_montage({ action: "speed_ramp", speed_points: "0:1,2:2,4:0.5,6:1", input: "vib.mp4", output: "ramp.mp4" })

// 3. Progress Bar + Waveform
await video_montage({ action: "progress_bar", progress_color: "red", progress_height: 5, input: "ramp.mp4", output: "pb.mp4" })
await video_montage({ action: "waveform", waveform_color: "yellow", waveform_bg: "black@0.5", input: "pb.mp4", output: "wb.mp4" })

// 4. نص متحرك + SFX
await video_montage({ action: "animated_text", animation: "slide-in-left", text: "WAIT FOR IT...", size: 60, color: "yellow", input: "wb.mp4", output: "txt.mp4" })
await video_montage({ action: "add_sfx", category: "meme", sfx: "Vine Boom.mp3", at: 3, input: "txt.mp4", output: "sfx.mp4" })
await video_montage({ action: "add_sfx", category: "meme", sfx: "Bruh.mp3", at: 5, input: "sfx.mp4", output: "sfx2.mp4" })

// 5. Thumbnail للريلز
await video_montage({ action: "thumbnail", at: 2, input: "sfx2.mp4", output: "reel_thumb.jpg" })

// 6. Normalize لـ -14 LUFS
await video_montage({ action: "normalize_audio", target_lufs: -14, input: "sfx2.mp4", output: "final_reel.mp4" })
```

#### Workflow D: Cinematic Travel/Drone
```typescript
// 1. Lens Correction + Denoise
await video_montage({ action: "lens_correction", k1: -0.05, k2: 0.01, input: "drone_raw.mp4", output: "corr.mp4" })
await video_montage({ action: "denoise", denoise_strength: 0.4, input: "corr.mp4", output: "dn.mp4" })

// 2. Color Grade سينمائي
await video_montage({ action: "color_grade", color_preset: "cinematic", input: "dn.mp4", output: "grade.mp4" })

// 3. Speed Ramp للكشف عن المناظر
await video_montage({ action: "speed_ramp", speed_points: "0:1,3:0.25,8:1,10:0.3,15:1", input: "grade.mp4", output: "ramp.mp4" })

// 4. Motion Blur + Letterbox
await video_montage({ action: "motion_blur", input: "ramp.mp4", output: "mb.mp4" })
await video_montage({ action: "letterbox", aspect: "2.35:1", input: "mb.mp4", output: "lb.mp4" })

// 5. موسيقى سينمائية + Audio Duck
await video_montage({ action: "add_music", music: "epic_cinematic.mp3", volume: 0.4, input: "lb.mp4", output: "mus.mp4" })
await video_montage({ action: "audio_duck", duck_amount: 0.2, duck_attack: 0.2, duck_release: 0.8, music: "epic_cinematic.mp3", input: "mus.mp4", output: "ducked.mp4" })

// 6. Film Border لللمسة النهائية
await video_montage({ action: "film_border", style: "16mm", input: "ducked.mp4", output: "final_travel.mp4" })

// 7. Thumbnail Grid للمواقع
await video_montage({ action: "thumbnail_grid", input: "final_travel.mp4", output: "locations_grid.jpg" })
```

### P.12 جداول مرجعية سريعة (Quick Reference Tables)

#### جميع المؤثرات البصرية بالبلوقن
| الفئة | المؤثرات | الاستخدام الرئيسي |
|-------|----------|------------------|
| **Glitch/Digital** | `glitch`, `rgb_shift`, `chromatic_aberration`, `prism` | سيبربانك، تقني، غلتيش |
| **Film/Retro** | `film_grain`, `vhs_effect`, `scanlines`, `halftone`, `posterize`, `film_border`, `letterbox` | نوستالجيا، فينتاج، سينمائي |
| **Blur/Motion** | `zoom_blur`, `directional_blur`, `radial_blur`, `motion_blur`, `crash_zoom` | أكشن، سرعة، تركيز |
| **Color/Grade** | `color_isolation`, `solarize`, `vignette_advanced`, `filter`, `color_grade` | مزاج، فنّي، سينمائي |
| **Artistic** | `emboss`, `edge_detect`, `kaleidoscope`, `glow` | تجريبي، إبداعي |
| **Utility** | `blur_face`, `pixelate_face`, `shake`, `lens_flare`, `particle_overlay`, `light_leaks`, `film_burn` | خصوصية، انتقالات، طبقات |

#### معاملات كل مؤثر (Parameters Quick Ref)
| المؤثر | المعاملات الأساسية | القيم الافتراضية |
|--------|-------------------|-----------------|
| `zoom_blur` | `zoom`, `frames`, `center_x`, `center_y` | 2, 5, 0.5, 0.5 |
| `directional_blur` | `angle`, `distance` | 45°, 20px |
| `radial_blur` | `strength` | 0.1 |
| `glow` | `threshold`, `radius` | 0.7, 20 |
| `color_isolation` | `color`, `tolerance` | red, 0.1 |
| `halftone` | `size` | 4 |
| `posterize` | `levels` | 4 |
| `solarize` | `threshold` | 128 |
| `vignette_advanced` | `shape`, `intensity`, `radius` | ellipse, 0.5, 0.8 |
| `letterbox` | `aspect` | 2.35:1 |
| `film_border` | `style` | 35mm |
| `kaleidoscope` | `segments` | 8 |
| `prism` | `offset` | 5 |
| `glitch` | `intensity` | 0.3 |
| `shake` | `intensity` | 10 |

### P.13 نصائح احترافية لدمج المؤثرات (Pro Tips)

```
🎯 قاعدة التركيب (Layering Order):
1. تصحيح الكاميرا (lens_correction, denoise)
2. الزوم/القص (zoom, crop_rotate)
3. الفلاتر اللونية (filter, color_grade)
4. المؤثرات الإبداعية (glitch, blur, isolation...)
5. الحدود/الإطارات (letterbox, film_border, vignette)
6. النصوص/التراكبات (add_text, animated_text)
7. الصوت (add_music, add_sfx, normalize_audio)

⚡ نصائح الأداء:
- طبق المؤثرات الثقيلة (glitch, kaleidoscope) على مقاطع قصيرة فقط
- استخدم `-crf 18 -preset slow` للجودة النهائية
- حول لـ CFR قبل المؤثرات المعتمدة على الوقت: `fps=60,setpts=N/60/TB`
- اختبر على مقطع 5 ثواني قبل التطبيق الكامل

🔊 دمج بصري+صوتي:
- كل Zoom Punch = Impact SFX
- كل Speed Ramp = Whoosh/Swoosh
- كل Color Grade change = موسيقى تتصاعد
- كل Transition = انتقال صوتي مطابق
- Normalize Audio أخير خطوة دائماً
```

---

## خلاصة فلسفة المونتاج
> **المونتاج ليس تنفيذ أوامر، بل رواية قصة بإيقاعٍ متعمد.**
> كل قص، كل موسيقى، كل أفكت، كل نص، كل زوم، كل تسريع — قرار فني يخدم المزاج والهدف.
> افهم المزاج أولاً، ثم خطط الهيكل (مع Decision Trees)، ثم نفذ. التبسيط والتحكم هما علامتا الاحتراف.
> أقل = أكثر. الاحترافية: التحكم وليس التكثير.

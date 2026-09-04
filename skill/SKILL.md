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

### P.14 ميزات احترافية جديدة - اللون والصوت (Professional Color & Audio)

#### LUT Apply - تطبيق جداول البحث اللوني
```typescript
// تطبيق LUT احترافي (.cube أو .3dl)
await video_montage({ 
  action: "lut_apply", 
  lut: "C:/LUTs/FilmLook.cube", 
  lut_strength: 0.7,  // شدة 0-1
  input: "raw.mp4", 
  output: "graded.mp4" 
})
```
> **ملاحظة:** ملفات LUT توجد مجاناً في: `groundcontrol.com/free-luts`، `lutify.me`، `cinematic-luts.com`

#### Audio Compressor - ضغط النطاق الديناميكي
```typescript
// لتسوية الصوت: رفع الهمس، خفض الصراخ
await video_montage({ 
  action: "audio_compressor", 
  compressor_threshold: -18,  // dB: ابدأ الضغط من هنا
  compressor_ratio: 4,        // 4:1 = لكل 4dB دخول، 1dB خروج
  compressor_attack: 5,       // ms: سرعة الاستجابة
  compressor_release: 100,    // ms: سرعة العودة
  input: "dialogue.mp4", 
  output: "compressed.mp4" 
})
```
**إعدادات مقترحة:**
| المحتوى | Threshold | Ratio | Attack | Release |
|----------|-----------|-------|--------|---------|
| حوار/بودكاست | -18dB | 3:1 | 10ms | 100ms |
| غناء | -12dB | 4:1 | 5ms | 50ms |
| موسيقى كاملة | -24dB | 2:1 | 30ms | 200ms |
| بث مباشر | -16dB | 5:1 | 3ms | 150ms |

#### Audio Limiter - منع القمم (Peak Limiting)
```typescript
// حماية من التشويه - ضروري قبل الرفع
await video_montage({ 
  action: "audio_limiter", 
  limiter_threshold: -1,    // dB: سقف الصوت
  limiter_release: 50,      // ms
  input: "final.mp4", 
  output: "limited.mp4" 
})
```

#### Audio EQ - معادلة صوتية بارامترية
```typescript
// تعديل ترددات محددة
await video_montage({ 
  action: "audio_eq", 
  eq_bands: "100:-3,200:2,1000:-1,3000:3,8000:2",  // تردد:كسب dB
  input: "audio.mp4", 
  output: "eqed.mp4" 
})
```
**ترددات شائعة:**
- **60-100Hz**: وزن/دفء (صوت ذكر، كيك درام)
- **200-400Hz**: طين/مبهم (قلل للوضوح)
- **1-3kHz**: حضور/وضوح كلام (ارفع للهواتف)
- **4-8kHz**: هواء/تفاصيل (صوت أنثى، هاي هات)
- **10kHz+**: لمعان/هواء (خفيف جداً)

#### Audio Gate - بوابة ضوضاء (Noise Gate)
```typescript
// قطع الصمت بين الجمل - نظّف البودكاست
await video_montage({ 
  action: "audio_gate", 
  gate_threshold: -40,   // dB: تحت هذا = صامت
  gate_ratio: 10,        // نسبة الكتم
  input: "podcast_raw.mp4", 
  output: "clean.mp4" 
})
```

---

### P.15 تصدير جاهز للمنصات (Export Presets)

```typescript
// قالب واحد للمنصة المطلوبة - لا تفكر في الكودك/البت ريت/الأبعاد
await video_montage({ 
  action: "export_preset", 
  preset: "tiktok",  // youtube, tiktok, reels, shorts, twitter, instagram, high-quality, web
  input: "final.mp4", 
  output: "tiktok_ready.mp4" 
})
```

| القالب | الدقة | الكودك | CRF | الصوت | الاستخدام |
|---------|--------|--------|-----|--------|-----------|
| `youtube` | 1920x1080 | H.264 | 18 | AAC 192k | يوتيوب قياسي |
| `tiktok` | 1080x1920 | H.264 | 22 | AAC 128k | تيك توك / ريلز |
| `reels` | 1080x1920 | H.264 | 22 | AAC 128k | إنستجرام ريلز |
| `shorts` | 1080x1920 | H.264 | 22 | AAC 128k | يوتيوب شورتس |
| `twitter` | 1280x720 | H.264 | 24 | AAC 128k | تويتر / X |
| `instagram` | 1080x1080 | H.264 | 22 | AAC 128k | بوست إنستجرام |
| `high-quality` | أصلي | H.264 | 16 | AAC 256k | أرشيف/ماستر |
| `web` | أصلي | VP9 | 30 | Opus 128k | ويب/HTML5 |

---

### P.16 إعادة تأطير ذكية (Auto-Reframe)

```typescript
// تحويل أفقي → عمودي مع تتبع الحركة
await video_montage({ 
  action: "auto_reframe", 
  reframe_aspect: "9:16",     // 9:16, 1:1, 4:5, 16:9
  reframe_tracking: "motion", // center, face, motion
  input: "horizontal.mp4", 
  output: "vertical.mp4" 
})
```
| وضع التتبع | الوصف | الأفضل لـ |
|------------|--------|-----------|
| `center` | قص من المنتصف | لقطات ثابتة، مناظر |
| `face` | تتبع الوجوه | مقابلات، فلوقات |
| `motion` | تتبع الحركة | أكشن، رياضة، رقص |

---

### P.17 سير عمل بروكسي (Proxy Workflow للـ 4K)

```typescript
// 1. أنشئ بروكسي خفيف للمونتاج
await video_montage({ 
  action: "proxy_create", 
  proxy_resolution: "1280x720",  // 960x540, 640x360
  proxy_codec: "prores",         // prores, dnxhd, h264
  input: "4K_master.mov", 
  output: "proxy.mov" 
})

// 2. منتنج على البروكسي (سريع جداً)
// ... كل عملياتك على proxy.mov ...

// 3. استبدل بالملف الأصلي للتصدير النهائي
// (يدوياً: غيّر المسار في التايملاين، أو استخدم conform)
```

**متى تحتاج بروكسي؟**
- فيديو 4K/6K/8K
- كودك ثقيل (ProRes RAW, BRAW, R3D)
- تأثيرات متعددة (LUT + Glitch + Blur)
- جهاز بمواصفات متوسطة

---

### P.18 معالجة دفعة (Batch Processing)

```typescript
// تطبيق نفس العملية على 50 فيديو
const clips = ["clip1.mp4", "clip2.mp4", "clip3.mp4", ...]  // 50 ملف

await video_montage({ 
  action: "batch_process", 
  inputs: clips,
  batch_action: "export_preset",
  batch_params: JSON.stringify({ preset: "tiktok" }),
  output: "batch_output/"  // مجلد للنتائج
})
```

**عمليات تصلح للبتش:**
- `export_preset` - تصدير للمنصات
- `normalize_audio` - توحيد اللوفس
- `filter` - فلتر موحد (vibrant, cinematic...)
- `watermark` - علامة مائية على الكل
- `subtitle_burn` - حرق ترجمة موحدة
- `letterbox` - نسبة سينمائية موحدة

---

### P.19 إعادة تعيين الزمن (Time Remapping)

```typescript
// سرعة متغيرة مع keyframes: بطيء → سريع → بطيء
await video_montage({ 
  action: "time_remap", 
  remap_points: "0:0,2:1,5:5,7:6,10:10",  // وقت_مدخل:وقت_مخرج
  input: "action.mp4", 
  output: "remapped.mp4" 
})
```
**قراءة النقاط:** `0:0` = البداية، `2:1` = عند 2ث مدخل → 1ث مخرج (2x سرعة)، `5:5` = طبيعي، `7:6` = بطيء 0.5x، `10:10` = نهاية طبيعية.

**أنماط شائعة:**
| النمط | النقاط | الوصف |
|-------|--------|-------|
| **Speed Ramp** | `0:0,2:4,4:4,6:6` | تسريع وسط، بطيء للباقي |
| **Freeze Frame** | `0:0,3:3,3:5,5:7` | تجمد عند 3ث لـ 2ث |
| **Reverse Burst** | `0:0,2:2,2:0,4:4` | تقدم → تراجع → تقدم |
| **Ramping Slow** | `0:0,5:2,10:10` | تسريع تدريجي ثم طبيعي |

---

### P.20 كروم كاي متقدم (Advanced Chroma Key)

```typescript
// جرين سكرين احترافي: كبت تسرب + حواف ناعمة
await video_montage({ 
  action: "chroma_key_advanced", 
  key_color: "green",           // green, blue, أو hex مخصص
  similarity: 0.15,             // تسامح اللون 0-1
  blend: 0.2,                   // نعومة الحواف
  spill_suppression: 0.5,       // كبت التسرب الأخضر على الموضوع 0-1
  edge_feather: 3,              // ترقيق حواف بالبيكسل
  background: "studio_bg.mp4",  // خلفية بديلة
  input: "greenscreen.mp4", 
  output: "keyed.mp4" 
})
```

**نصائح لجرين سكرين نظيف:**
1. إضاءة متساوية على الشاشة الخضراء (لا ظلال)
2. مسافة ≥ 2م بين الموضوع والشاشة (يمنع التسرب)
3. لا يرتدي الموضوع أخضر/أزرق
4. استخدم `spill_suppression: 0.5-0.8` للحواف النظيفة
5. `edge_feather: 2-5` للدمج الطبيعي

---

### P.21 تصحيح رولينغ شاتر (Rolling Shutter Correction)

```typescript
// إصلاح انحناء الخطوط العمودية في الكاميرات CMOS
await video_montage({ 
  action: "rolling_shutter", 
  rs_correction: 0.5,   // 0-1: قوة التصحيح
  input: "drone_fast.mp4", 
  output: "fixed.mp4" 
})
```
> **متى تحتاجه:** لقطات درون سريعة، كاميرات.Action، بانوراما أفقية سريعة، أي CMOS بدون global shutter.

---

### P.22 تصحيح عدسة متقدم (Lens Correction Advanced)

```typescript
// إصلاح فيش آي / وايد أنجل / تليفوتو
await video_montage({ 
  action: "lens_correction_advanced", 
  lens_model: "fisheye",      // fisheye, wide-angle, telephoto, custom
  lens_fov: 180,              // مجال الرؤية بالدرجات
  k1: -0.3,                   // معامل تشويه شعاعي رئيسي
  k2: 0.1,                    // معامل تشويه ثانوي
  input: "gopro_fisheye.mp4", 
  output: "corrected.mp4" 
})
```

| النموذج | k1 النموذجي | k2 النموذجي | الاستخدام |
|---------|-------------|-------------|-----------|
| `fisheye` | -0.3 إلى -0.5 | 0.05-0.15 | جو برو، 360 كام |
| `wide-angle` | -0.05 إلى -0.15 | 0-0.05 | درون، أكشن كام |
| `telephoto` | 0.01-0.05 | 0 | عدسات تقريب |
| `custom` | يدوي | يدوي | معايرة دقيقة |

---

### P.23 جداول محدثة (Updated Quick Reference)

#### جميع Actions بالبلوقن (77 action)
| الفئة | المؤثرات |
|-------|----------|
| **أساسي** | `info`, `cut`, `merge`, `convert`, `crop_rotate`, `reverse_video` |
| **نصوص** | `add_text`, `animated_text`, `subtitle_burn`, `timecode` |
| **صوت** | `add_sfx`, `add_music`, `audio_mix`, `audio_duck`, `normalize_audio`, `extract_audio`, `audio_compressor`, `audio_limiter`, `audio_eq`, `audio_gate` |
| **لون/فلتر** | `filter`, `color_grade`, `lut_apply`, `export_preset` |
| **بصري متقدم** | `glitch`, `rgb_shift`, `film_grain`, `light_leaks`, `film_burn`, `scanlines`, `chromatic_aberration`, `pixelate_face`, `vhs_effect`, `crash_zoom`, `shake`, `lens_flare`, `particle_overlay`, `zoom_blur`, `directional_blur`, `radial_blur`, `glow`, `color_isolation`, `halftone`, `posterize`, `solarize`, `emboss`, `edge_detect`, `kaleidoscope`, `prism`, `vignette_advanced`, `letterbox`, `film_border` |
| **حركة/زوم** | `zoom`, `speed`, `speed_ramp`, `motion_blur`, `time_remap`, `auto_reframe` |
| **جرين سكرين** | `green_screen`, `chroma_key_advanced` |
| **تصحيح** | `stabilize`, `denoise`, `lens_correction`, `lens_correction_advanced`, `rolling_shutter`, `blur_face` |
| **سير عمل** | `watermark`, `pip`, `split_screen`, `image_to_video`, `legendary_transition`, `auto_cut`, `beat_sync`, `thumbnail`, `thumbnail_grid`, `gif_loop`, `waveform`, `progress_bar`, `crop_detect`, `scene_detect`, `proxy_create`, `batch_process` |

#### معاملات الميزات الجديدة (New Parameters Quick Ref)
| المؤثر | المعاملات الأساسية | القيم الافتراضية |
|--------|-------------------|-----------------|
| `lut_apply` | `lut`, `lut_strength` | ملف .cube, 1.0 |
| `audio_compressor` | `threshold`, `ratio`, `attack`, `release` | -18dB, 4, 5ms, 100ms |
| `audio_limiter` | `threshold`, `release` | -1dB, 50ms |
| `audio_eq` | `eq_bands` | "100:0,1000:0,5000:0" |
| `audio_gate` | `threshold`, `ratio` | -40dB, 10 |
| `export_preset` | `preset` | youtube |
| `auto_reframe` | `reframe_aspect`, `reframe_tracking` | 9:16, motion |
| `proxy_create` | `proxy_resolution`, `proxy_codec` | 1280x720, prores |
| `batch_process` | `batch_action`, `batch_params` | action, JSON |
| `time_remap` | `remap_points` | "0:0,1:1" |
| `chroma_key_advanced` | `key_color`, `similarity`, `spill_suppression`, `edge_feather` | green, 0.15, 0.5, 2 |
| `rolling_shutter` | `rs_correction` | 0.5 |
| `lens_correction_advanced` | `lens_model`, `lens_fov`, `k1`, `k2` | fisheye, 180, -0.3, 0.1 |

---

### P.24 وصفات متقدمة للميزات الجديدة (Advanced Recipes)

#### Recipe: "Cinematic Film Look مع LUT"
```typescript
// 1. تصحيح العدسة
await video_montage({ action: "lens_correction_advanced", lens_model: "wide-angle", input: "raw.mp4", output: "corr.mp4" })

// 2. تطبيق LUT سينمائي
await video_montage({ action: "lut_apply", lut: "C:/LUTs/Kodak2383.cube", lut_strength: 0.8, input: "corr.mp4", output: "lut.mp4" })

// 3. حبيبات فيلم خفيفة
await video_montage({ action: "film_grain", strength: 8, input: "lut.mp4", output: "grain.mp4" })

// 4. فينيت سينمائي
await video_montage({ action: "vignette_advanced", shape: "ellipse", intensity: 0.3, input: "grain.mp4", output: "vig.mp4" })

// 5. تصدير للماستر
await video_montage({ action: "export_preset", preset: "high-quality", input: "vig.mp4", output: "master.mov" })
```

#### Recipe: "Podcast Audio Polish كامل"
```typescript
// 1. نويز جيت - قطع الصمت
await video_montage({ action: "audio_gate", gate_threshold: -45, input: "raw.mp4", output: "gated.mp4" })

// 2. كومبريسور - تسوية الحوار
await video_montage({ action: "audio_compressor", compressor_threshold: -18, compressor_ratio: 3, input: "gated.mp4", output: "comp.mp4" })

// 3. EQ - وضوح الكلام
await video_montage({ action: "audio_eq", eq_bands: "100:-2,200:1,3000:3,6000:2", input: "comp.mp4", output: "eq.mp4" })

// 4. لimiter - حماية القمم
await video_montage({ action: "audio_limiter", limiter_threshold: -1, input: "eq.mp4", output: "limited.mp4" })

// 5. نورماليز للمنصات
await video_montage({ action: "normalize_audio", target_lufs: -16, true_peak: -1, input: "limited.mp4", output: "final_podcast.mp4" })
```

#### Recipe: "Vertical Reel من أفقي - ذكي"
```typescript
// 1. Auto-reframe مع تتبع الحركة
await video_montage({ action: "auto_reframe", reframe_aspect: "9:16", reframe_tracking: "motion", input: "horizontal.mp4", output: "vertical.mp4" })

// 2. فلاتر ريلز
await video_montage({ action: "filter", effect: "vibrant", input: "vertical.mp4", output: "vib.mp4" })
await video_montage({ action: "color_grade", color_preset: "teal-orange", input: "vib.mp4", output: "grade.mp4" })

// 3. Progress Bar + Waveform
await video_montage({ action: "progress_bar", progress_color: "red", progress_height: 6, input: "grade.mp4", output: "pb.mp4" })
await video_montage({ action: "waveform", waveform_color: "white", waveform_bg: "black@0.3", input: "pb.mp4", output: "wb.mp4" })

// 4. تصدير ريلز
await video_montage({ action: "export_preset", preset: "reels", input: "wb.mp4", output: "reel_final.mp4" })
```

#### Recipe: "Green Screen Production كامل"
```typescript
// 1. كروم كاي متقدم
await video_montage({ action: "chroma_key_advanced", key_color: "green", similarity: 0.12, spill_suppression: 0.7, edge_feather: 3, background: "virtual_set.mp4", input: "talent_green.mp4", output: "keyed.mp4" })

// 2. تصحيح لون الموضوع ليتناسب مع الخلفية
await video_montage({ action: "color_grade", color_preset: "cinematic", input: "keyed.mp4", output: "matched.mp4" })

// 3. Light wrap (إضاءة خلفية تنعكس على الموضوع) - عبر overlay
await video_montage({ action: "light_leaks", overlay: "light_wrap.mp4", input: "matched.mp4", output: "wrapped.mp4" })

// 4. تصدير
await video_montage({ action: "export_preset", preset: "youtube", input: "wrapped.mp4", output: "final_green.mp4" })
```

---

### P.25 سير عمل إنتاج متكامل (Complete Production Pipelines)

#### Pipeline A: "من 4K Raw إلى يوتيوب + تيك توك + ريلز"
```typescript
// 1. بروكسي للمونتاج السريع
await video_montage({ action: "proxy_create", proxy_resolution: "1280x720", proxy_codec: "prores", input: "4K_raw.mov", output: "proxy.mov" })

// 2. مونتاج على البروكسي... (قص، ترتيب، نصوص، موسيقى)
// افترض النتيجة: "edit_proxy.mov"

// 3. Conform: استبدل بالملف الأصلي للتصدير
// (في الكود: غيّر input من proxy إلى 4K_raw في خطوات التصدير)

// 4. ماستر عالي الجودة
await video_montage({ action: "export_preset", preset: "high-quality", input: "edit_4K.mov", output: "master.mov" })

// 5. يوتيوب (16:9)
await video_montage({ action: "export_preset", preset: "youtube", input: "master.mov", output: "youtube.mp4" })

// 6. تيك توك (9:16) - Auto-reframe
await video_montage({ action: "auto_reframe", reframe_aspect: "9:16", reframe_tracking: "motion", input: "master.mov", output: "vertical.mp4" })
await video_montage({ action: "export_preset", preset: "tiktok", input: "vertical.mp4", output: "tiktok.mp4" })

// 7. ريلز (9:16)
await video_montage({ action: "export_preset", preset: "reels", input: "vertical.mp4", output: "reels.mp4" })

// 8. شورتس (9:16)
await video_montage({ action: "export_preset", preset: "shorts", input: "vertical.mp4", output: "shorts.mp4" })

// 9. ثومبنيلز
await video_montage({ action: "thumbnail_grid", input: "master.mov", output: "thumbs.jpg" })
```

#### Pipeline B: "تسليم عميل - فيديو منتج"
```typescript
// 1. تنظيف الصوت
await video_montage({ action: "audio_gate", gate_threshold: -40, input: "product_raw.mp4", output: "a1.mp4" })
await video_montage({ action: "audio_compressor", compressor_threshold: -16, compressor_ratio: 3, input: "a1.mp4", output: "a2.mp4" })
await video_montage({ action: "audio_eq", eq_bands: "100:-3,3000:2,8000:1", input: "a2.mp4", output: "a3.mp4" })
await video_montage({ action: "audio_limiter", limiter_threshold: -1, input: "a3.mp4", output: "audio_clean.mp4" })

// 2. لون المنتج (Brand Colors)
await video_montage({ action: "lut_apply", lut: "brand_lut.cube", lut_strength: 0.6, input: "product_raw.mp4", output: "color.mp4" })

// 3. نصوص/شعار
await video_montage({ action: "add_text", text: "PRODUCT NAME", font: "Pricedown.otf", size: 120, color: "white", input: "color.mp4", output: "titled.mp4" })
await video_montage({ action: "watermark", logo: "logo.png", position: "top-right", input: "titled.mp4", output: "watermarked.mp4" })

// 4. لimiter نهائي + نورماليز
await video_montage({ action: "audio_limiter", limiter_threshold: -1, input: "watermarked.mp4", output: "limited.mp4" })
await video_montage({ action: "normalize_audio", target_lufs: -14, true_peak: -1, input: "limited.mp4", output: "final_product.mp4" })

// 5. تصدير متعدد
await video_montage({ action: "export_preset", preset: "high-quality", input: "final_product.mp4", output: "delivery_master.mov" })
await video_montage({ action: "export_preset", preset: "web", input: "final_product.mp4", output: "delivery_web.webm" })
```

---

# 🚀 GAME CHANGERS - أدوات ذكية بالـ AI (20 أداة تغير اللعبة)

> هذه الأدوات تستخدم تقنيات ML/AI حقيقية (Whisper, Demucs, Optical Flow, Depth Estimation, Object Tracking). تتطلب بعض الأدوات نماذج خارجية محملة محلياً.

---

## P.26 كشف مشاهد ذكي (AI Scene Detect)

```typescript
// كشف مشاهد بالـ ML - أدق من threshold العادي
await video_montage({ 
  action: "ai_scene_detect", 
  ai_model: "content-aware",  // fast, accurate, content-aware
  ai_threshold: 0.3,          // ثقة 0-1
  input: "long_video.mp4", 
  output: "scenes.txt"  // ملف نصي بأوقات المشاهد
})
```

| النموذج | السرعة | الدقة | الاستخدام |
|---------|--------|-------|----------|
| `fast` | فائقة | جيدة | معاينة سريعة |
| `accurate` | متوسطة | عالية | مونتاج دقيق |
| `content-aware` | بطيئة | أعلى | محتوى معقد |

**النتيجة:** ملف `scenes.txt` بأوقات بداية/نهاية كل مشهد للاستخدام في `auto_cut` أو `batch_process`.

---

## P.27 ترجمة آلية محلية (Auto Captions - Whisper)

```typescript
// ترجمة بـ Whisper محلي 100% - لا إنترنت، لا خصوصية
await video_montage({ 
  action: "auto_captions", 
  caption_model: "base",      // tiny(39MB), base(74MB), small(244MB), medium(769MB), large(1550MB)
  caption_language: "ar",     // ar, en, auto, أو أي كود ISO
  caption_style: "pop-in",    // karaoke, pop-in, highlight, typewriter
  input: "video.mp4", 
  output: "captions.srt"  // أو .ass
})
```

**متطلبات:** `whisper.cpp` أو `faster-whisper` مثبت مع نماذج `.bin` في `C:/Models/whisper/`

| النموذج | الحجم | السرعة (CPU) | الدقة العربية | الاستخدام |
|---------|-------|-------------|--------------|----------|
| `tiny` | 39MB | ~10x realtime | متوسطة | مسودات سريعة |
| `base` | 74MB | ~5x realtime | جيدة | افتراضي موصى به |
| `small` | 244MB | ~2x realtime | عالية | إنتاج نهائي |
| `medium` | 769MB | ~1x realtime | عالية جداً | احترافي |
| `large` | 1550MB | ~0.5x realtime | أعلى | أرشيف/تلفزيون |

**الستايلات:**
- `pop-in`: كلمة بكلمة تظهر/تختفي
- `karaoke`: تلوين الكلمة الحالية
- `highlight`: تمييز الكلمة النشطة
- `typewriter`: كتابة حرف بحرف

---

## P.28 قص ذكي (Smart Cut)

```typescript
// يزيل تلقائياً: صمت، كلمات حشو (آآه، مممم)، تكرار
await video_montage({ 
  action: "smart_cut", 
  smart_cut_mode: "all",        // silence, filler, repetition, all
  smart_cut_threshold: -40,     // dB للصمت
  smart_cut_min_duration: 0.5,  // ثواني للاحتفاظ
  input: "raw_talk.mp4", 
  output: "cuts.txt"  // قائمة القطع للحذف/الاحتفاظ
})
```

| الوضع | ما يزيله | الاستخدام |
|--------|----------|----------|
| `silence` | فترات صامتة > threshold | بودكاست، محاضرات |
| `filler` | "آه، مم، يعني، حلو" | فلوقات، مقابلات |
| `repetition` | جمل مكررة | تسجيلات متعددة التيك |
| `all` | الكل معاً | تنظيف شامل |

---

## P.29 كشف إيقاع دقيق (Beat Detect)

```typescript
// كشف النغمات بدقة + markers للقطع على الـ beat
await video_montage({ 
  action: "beat_detect", 
  beat_sensitivity: 0.5,      // 0-1: حساسية الكشف
  beat_min_interval: 0.3,     // أقل فاصل بين النغمات (ث)
  input: "music.mp4", 
  output: "beats.txt"  // timestamps للنغمات
})
```

**النتيجة:** ملف `beats.txt` بأوقات كل نغمة → استخدم مع `beat_sync` أو قص يدوي على النغمة.

---

## P.30 مطابقة لون (Color Match)

```typescript
// يطابق لون اللقطة لصورة/فيديو مرجعي
await video_montage({ 
  action: "color_match", 
  reference_image: "reference.jpg",  // أو فيديو
  match_method: "reinhard",        // histogram, reinhard, transfer
  input: "shot.mp4", 
  output: "matched.mp4"
})
```

| الطريقة | الوصف | الأفضل لـ |
|---------|-------|----------|
| `histogram` | مطابقة توزيع الألوان | لقطات بنفس الإضاءة |
| `reinhard` | نقل متوسط/انحراف معياري | عام (افتراضي) |
| `transfer` | نقل خصائص اللون كاملة | سينمائي/فني |

---

## P.31 سلو موشن حقيقي (Optical Flow)

```typescript
// يولد إطارات جديدة بالـ AI - ليس تكرار إطارات
await video_montage({ 
  action: "optical_flow", 
  flow_model: "farneback",   // raft, farneback, deepflow
  flow_scale: 2,             // 2x, 4x, 8x أبطأ
  input: "action.mp4", 
  output: "slowmo.mp4"
})
```

| النموذج | الجودة | السرعة | متطلبات |
|---------|--------|--------|----------|
| `farneback` | جيدة | سريعة | CPU فقط |
| `deepflow` | أعلى | متوسطة | CPU فقط |
| `raft` | أعلى (SOTA) | بطيئة | GPU (CUDA) |

> **ملاحظة:** `flow_scale: 2` = 50% سرعة، `4` = 25%، `8` = 12.5%

---

## P.32 خريطة عمق (Depth Map)

```typescript
// يولد خريطة عمق لكل إطار - للـ 3D effects، fog، bokeh
await video_montage({ 
  action: "depth_map", 
  depth_model: "midas",      // midas, dpt, zoedepth
  depth_visualize: true,     // true = يصدر فيديو خريطة عمق
  input: "scene.mp4", 
  output: "depth.mp4"  // أو depth_vis.mp4
})
```

**استخدامات خريطة العمق:**
- **Bokeh خلفي:** `blur=depth_map` (ضبابية حسب البعد)
- **Fog/ضباب:** يزداد مع البعد
- **3D Parallax:** تحريك طبقات بمعدلات مختلفة
- **Relighting:** إضاءة وهمية تتبع الهندسة

| النموذج | الدقة | السرعة | الأفضل لـ |
|---------|-------|--------|----------|
| `midas` | عالية | متوسطة | عام |
| `dpt` | عالية جداً | أبطأ | تفاصيل دقيقة |
| `zoedepth` | SOTA | بطيئة | إنتاج نهائي |

---

## P.33 تتبع كائن/شخص (Object Track)

```typescript
// يتتبع وجه/شخص/كائن - نصوص/أشكال تلتصق به
await video_montage({ 
  action: "object_track", 
  track_target: "face",       // face, person, custom
  track_bbox: "100,100,200,200",  // x,y,w,h للبداية (اختياري)
  input: "person_walking.mp4", 
  output: "tracked.mp4"  // فيديو مع box تتبع
})
```

**النتائج:** إحداثيات التتبع تستخدم في:
- `smart_zoom` (زوم يتبع الوجه)
- `text_animator` (نص يلتصق بالشخص)
- `particle_system` (جسيمات تتبع الحركة)

---

## P.34 إعادة تأطير بالـ AI (Auto Reframe AI)

```typescript
// تأطير ذكي يعرف أين الموضوع مهم (ليس center بسيط)
await video_montage({ 
  action: "auto_reframe_ai", 
  ai_reframe_aspect: "9:16",   // 9:16, 1:1, 4:5
  ai_reframe_padding: 0.1,     // هامش حول الموضوع 0-1
  input: "horizontal.mp4", 
  output: "vertical.mp4"
})
```

**الفرق عن `auto_reframe`:**
| الميزة | `auto_reframe` | `auto_reframe_ai` |
|--------|---------------|-------------------|
| التتبع | center/face/motion | AI semantic (يعرف الموضوع الرئيسي) |
| تغيير الموضوع | يفشل | يتكيف تلقائياً |
| حواف آمنة | ثابتة | ديناميكية |

---

## P.35 فصل ستيمز (Stem Separate - Demucs)

```typescript
// يفصل الصوت إلى: vocals, drums, bass, other
await video_montage({ 
  action: "stem_separate", 
  stem_model: "htdemucs",      // htdemucs, htdemucs_ft, mdx_extra
  stem_output_dir: "stems/",   // مجلد الإخراج
  input: "song.mp4", 
  output: "stems_report.txt"
})
```

**النتيجة في `stems/`:**
```
stems/
├── vocals.wav      # صوت فقط
├── drums.wav       # طبول/إيقاع
├── bass.wav        # باس
└── other.wav       # باقي الآلات
```

**استخدامات:**
- **Karaoke:** احذف `vocals.wav`
- **Remix:** عدل `drums.wav` و `bass.wav`
- **Clean dialogue:** استخدم `vocals.wav` فقط
- **Music analysis:** حلل `bass.wav` للـ beat detect

---

## P.36 تحسين صوت بالـ AI (Voice Enhance)

```typescript
// يزيل ضوضاء، صدى، يحسن وضوح - أفضل من أي فلتر تقليدي
await video_montage({ 
  action: "voice_enhance", 
  enhance_model: "dfsmn",       // dfsmn, mossformer2, fullsubnet
  enhance_denoise: 0.8,         // 0-1: قوة إزالة الضوضاء
  enhance_dereverb: 0.5,        // 0-1: قوة إزالة الصدى
  input: "noisy_recording.mp4", 
  output: "clean_voice.mp4"
})
```

| النموذج | القوة | السرعة | الاستخدام |
|---------|------|--------|----------|
| `dfsmn` | متوازنة | سريعة | وقت حقيقي |
| `mossformer2` | عالية | متوسطة | إنتاج |
| `fullsubnet` | أعلى | بطيئة | استعادة أرشيف |

---

## P.37 زوم ذكي (Smart Zoom)

```typescript
// زوم يتبع الوجه/العين/الحركة تلقائياً
await video_montage({ 
  action: "smart_zoom", 
  zoom_target: "face",        // face, eyes, motion, object
  zoom_smoothness: 0.7,       // 0-1: نعومة الحركة
  zoom_max: 2.5,              // أقصى زوم
  input: "talking_head.mp4", 
  output: "smart_zoomed.mp4"
})
```

**الفرق عن `zoom`:** يتتبع الهدف ديناميكياً، لا keyframes يدوية.

---

## P.38 انتقالات ذكية (Transition AI)

```typescript
// انتقالات Morph/Flow بين لقطتين - ليس crossfade بسيط
await video_montage({ 
  action: "transition_ai", 
  transition_mode: "morph",   // morph, smooth, flow
  transition_duration: 1,     // ثواني
  inputs: ["clip1.mp4", "clip2.mp4"],  // يحتاج لقطتين
  output: "transition.mp4"
})
```

| النمط | الوصف | الاستخدام |
|-------|-------|----------|
| `morph` | يدمج البكسلات بذكاء (Optical Flow) | لقطات متشابهة |
| `smooth` | تداخل ناعم مع minterpolate | عام |
| `flow` | تدفق بصري كامل | لقطات متحركة |

---

## P.39 تقرير جودة احترافي (QC Report)

```typescript
// تقرير مطابق للمعايير: EBU R128, ATSC A/85, Netflix
await video_montage({ 
  action: "qc_report", 
  qc_standard: "ebu-r128",    // ebu-r128, atsc-a85, netflix, custom
  qc_output_format: "json",   // json, txt, html
  input: "final_master.mp4", 
  output: "qc_report.json"
})
```

**المعايير:**
| المعيار | Integrated Loudness | True Peak | LRA | الاستخدام |
|----------|-------------------|-----------|-----|----------|
| `ebu-r128` | -23 LUFS | -2 dBTP | ≤7 | بث أوروبي |
| `atsc-a85` | -24 LUFS | -2 dBTP | - | بث أمريكي |
| `netflix` | -27 LUFS | -2 dBTP | ≤5 | نتفليكس |
| `custom` | محدد يدوياً | - | - | خاص |

**التقرير يتضمن:** Loudness, True Peak, LRA, Sample Peak, Clipping, DC Offset, Silence, Phase.

---

## P.40 رندر متعدد المنصات (Multi Render)

```typescript
// رندر واحد → ماستر + يوتيوب + تيك توك + ريلز + شورتس
await video_montage({ 
  action: "multi_render", 
  render_presets: ["youtube", "tiktok", "reels", "shorts", "twitter"],  // أو ["high-quality", "web"]
  input: "master.mov", 
  output: "multi_render_report.txt"
})
```

**ينفذ تلقائياً:**
```bash
ffmpeg -i master.mov [youtube params] youtube.mp4
ffmpeg -i master.mov [tiktok params] tiktok.mp4
ffmpeg -i master.mov [reels params] reels.mp4
ffmpeg -i master.mov [shorts params] shorts.mp4
```

**يوفر ساعات** من الرندر اليدوي لكل منصة.

---

## P.41 تطبيق تمبليتات كاملة (Template Apply)

```typescript
// تمبليتات جاهزة: intro, lower-third, outro, full package
await video_montage({ 
  action: "template_apply", 
  template_name: "full",      // intro, lower-third, outro, full
  template_data: JSON.stringify({  // بيانات ديناميكية
    title: "EPIC VIDEO",
    name: "ALI",
    channel: "MRSX PRO",
    social: "@mrsxpro"
  }),
  input: "video.mp4", 
  output: "templated.mp4"
})
```

**التمبليتات المضمنة:**
| التمبليت | المحتوى |
|----------|---------|
| `intro` | عنوان كبير 3 ثوانٍ أول الفيديو |
| `lower-third` | اسم + لقب في الأسفل (5-15ث) |
| `outro` | اشتراك + سوشيال ميديا (آخر 5 ث) |
| `full` | الكل معاً + انتقالات |

---

## P.42 محرك تعبيرات (Expression Engine - مثل After Effects)

```typescript
// تعبيرات رياضية/عشوائية للتحريك - wiggle, loop, time, math
await video_montage({ 
  action: "expression_engine", 
  expression_code: "wiggle(2,50)",  // أو: "time*100", "sin(time)*50", "loopOut()"
  expression_property: "position", // position, scale, rotation, opacity, custom
  input: "layer.mp4", 
  output: "animated.mp4"
})
```

**التعبيرات المدعومة:**
| التعبير | النتيجة | الاستخدام |
|----------|---------|----------|
| `wiggle(freq, amp)` | اهتزاز عشوائي | كاميرا يدوية، نص حي |
| `time * N` | حركة خطية مع الزمن | دوران مستمر، Scroll |
| `sin(time) * A` | موجة جيبية | تردد، تنفس |
| `loopOut()` | تكرار الكيفرامات | دورات لا نهائية |
| `random(min, max)` | قيمة عشوائية | جليتش، ضوضاء |
| `clamp(val, min, max)` | تقييد قيمة | أمان |
| `linear(t, t1, t2, v1, v2)` | تداخل خطي | keyframe interpolation |

---

## P.43 نظام جسيمات قابل للبرمجة (Particle System)

```typescript
// مطر، ثلج، نار، شرر، دخان، أوراق - قابل للتخصيص كامل
await video_montage({ 
  action: "particle_system", 
  particle_type: "rain",      // rain, snow, fire, sparks, smoke, leaves, custom
  particle_count: 100,        // عدد الجسيمات
  particle_lifetime: 3,       // عمر بالثواني
  particle_physics: "gravity,wind:2,turbulence:0.5",  // فيزياء
  input: "scene.mp4", 
  output: "particles.mp4"
)
```

| النوع | الشكل | فيزياء افتراضية |
|--------|-------|----------------|
| `rain` | خطوط مائلة | gravity + wind |
| `snow` | دوائر صغيرة | gravity + turbulence |
| `fire` | لهب متحرك | turbulence + rise |
| `sparks` | نقاط مضيئة | gravity + fade |
| `smoke` | سحب شفافة | buoyancy + turbulence |
| `leaves` | أشكال أوراق | gravity + wind + spin |
| `custom` | كود `particle_physics` | مبرمج بالكامل |

**معاملات `particle_physics`:**
- `gravity:N` - جاذبية (افتراضي 1)
- `wind:N` - رياح أفقية
- `turbulence:N` - اضطراب 0-1
- `spin:N` - دوران
- `size:N` - حجم
- `color:r,g,b` - لون

---

## P.44 أنيميتور نصوص متقدم (Text Animator)

```typescript
// أنيميشن لكل حرف/كلمة/سطر - مثل After Effects Text Animator
await video_montage({ 
  action: "text_animator", 
  animator_type: "typewriter",  // typewriter, wiggle, scale, opacity, position, rotation
  animator_range: "char",       // char, word, line, 0-100%
  animator_easing: "ease-out",  // ease, ease-in, ease-out, bounce, elastic
  text: "HELLO WORLD",
  font: "Luckiest Guy.ttf",
  size: 100,
  color: "yellow",
  duration: 3000,  // ms
  input: "video.mp4", 
  output: "text_animated.mp4"
)
```

| النوع | التأثير | نطاق التطبيق |
|--------|---------|-------------|
| `typewriter` | كتابة حرف بحرف | `char`, `word` |
| `wiggle` | اهتزاز عشوائي | `char`, `word`, `line` |
| `scale` | تكبير/تصغير | `char`, `word` |
| `opacity` | ظهور/اختفاء | `char`, `word`, `line` |
| `position` | حركة موضع | `char`, `word` |
| `rotation` | دوران | `char`, `word` |

**التسارع (Easing):**
- `ease` - طبيعي
- `bounce` - قفز
- `elastic` - مرن

---

## P.45 عجلة ألوان احترافية (Color Wheel - Lift/Gamma/Gain/Offset)

```typescript
// تصحيح لوني بثلاث عجلات + Offset - مثل DaVinci Resolve
await video_montage({ 
  action: "color_wheel", 
  lift: "0,-10,-20",      // Shadows: R,G,B (-255 إلى 255)
  gamma: "5,0,-5",        // Midtones: R,G,B
  gain: "10,5,0",         // Highlights: R,G,B
  offset_cw: "0,0,0",     // Offset عام
  log_wheel: false,       // true = عجلة Log (سينمائي)
  input: "raw.mp4", 
  output: "graded.mp4"
})
```

**العجلات الثلاث:**
| العجلة | تؤثر على | الاستخدام |
|--------|----------|----------|
| **Lift (Shadows)** | الأجزاء الداكنة | لون الظلال، تبييض السواد |
| **Gamma (Midtones)** | الدرجات المتوسطة | لون البشرة، المزاج العام |
| **Gain (Highlights)** | الأجزاء المضيئة | لون الهايلايت، حماية القمم |
| **Offset** | الصورة كلها | تصحيح عام، توازن أبيض |

**مثال سينمائي (Teal-Orange):**
```typescript
lift: "-20,-10,30"      // ظلال تيال
gamma: "10,-5,-10"      // ميدتونز برتقالي خفيف
gain: "5,10,-5"         // هايلايت برتقالي
```

---

## P.46 جداول محدثة - كل الـ 97 Action

| الفئة | الـ Actions (97 إجمالي) |
|-------|------------------------|
| **أساسي** | `info`, `cut`, `merge`, `convert`, `crop_rotate`, `reverse_video` |
| **نصوص** | `add_text`, `animated_text`, `subtitle_burn`, `timecode`, `text_animator` |
| **صوت** | `add_sfx`, `add_music`, `audio_mix`, `audio_duck`, `normalize_audio`, `extract_audio`, `audio_compressor`, `audio_limiter`, `audio_eq`, `audio_gate`, `stem_separate`, `voice_enhance` |
| **لون/فلتر** | `filter`, `color_grade`, `lut_apply`, `export_preset`, `color_match`, `color_wheel` |
| **بصري/GLITCH** | `glitch`, `rgb_shift`, `film_grain`, `light_leaks`, `film_burn`, `scanlines`, `chromatic_aberration`, `pixelate_face`, `vhs_effect`, `crash_zoom`, `shake`, `lens_flare`, `particle_overlay`, `zoom_blur`, `directional_blur`, `radial_blur`, `glow`, `color_isolation`, `halftone`, `posterize`, `solarize`, `emboss`, `edge_detect`, `kaleidoscope`, `prism`, `vignette_advanced`, `letterbox`, `film_border`, `particle_system` |
| **حركة/زوم** | `zoom`, `speed`, `speed_ramp`, `motion_blur`, `time_remap`, `auto_reframe`, `auto_reframe_ai`, `smart_zoom` |
| **AI/ذكي** | `ai_scene_detect`, `auto_captions`, `smart_cut`, `beat_detect`, `optical_flow`, `depth_map`, `object_track`, `transition_ai` |
| **جرين سكرين** | `green_screen`, `chroma_key_advanced` |
| **تصحيح** | `stabilize`, `denoise`, `lens_correction`, `lens_correction_advanced`, `rolling_shutter`, `blur_face` |
| **سير عمل/إنتاج** | `watermark`, `pip`, `split_screen`, `image_to_video`, `legendary_transition`, `auto_cut`, `beat_sync`, `thumbnail`, `thumbnail_grid`, `gif_loop`, `waveform`, `progress_bar`, `crop_detect`, `scene_detect`, `proxy_create`, `batch_process`, `qc_report`, `multi_render`, `template_apply`, `expression_engine` |

---

## P.47 وصفات GAME CHANGERS

### Recipe: "Podcast إنتاج كامل بالـ AI"
```typescript
// 1. ترجمة آلية
await video_montage({ action: "auto_captions", caption_model: "base", caption_language: "ar", input: "podcast.mp4", output: "captions.srt" })

// 2. فصل ستيمز (لو فيه موسيقى خلفية)
await video_montage({ action: "stem_separate", stem_model: "htdemucs", stem_output_dir: "stems/", input: "podcast.mp4", output: "stems.txt" })

// 3. تحسين الصوت المنفصل
await video_montage({ action: "voice_enhance", enhance_model: "dfsmn", enhance_denoise: 0.8, input: "stems/vocals.wav", output: "vocals_clean.wav" })

// 4. قص ذكي (يزيل الصمت والحشو)
await video_montage({ action: "smart_cut", smart_cut_mode: "all", input: "podcast.mp4", output: "cuts.txt" })

// 5. تطبيق القطع + دمج الصوت النظيف
// (يدوي: استخدم cuts.txt لقص الفيديو، استبدل الصوت بـ vocals_clean.wav)

// 6. QC Report للنتفليكس/يوتيوب
await video_montage({ action: "qc_report", qc_standard: "netflix", qc_output_format: "html", input: "final.mp4", output: "qc.html" })

// 7. رندر متعدد للمنصات
await video_montage({ action: "multi_render", render_presets: ["youtube", "tiktok", "reels", "shorts"], input: "final.mp4", output: "done.txt" })
```

### Recipe: "Cinematic Short Film بالـ AI"
```typescript
// 1. Depth Map للـ 3D parallax
await video_montage({ action: "depth_map", depth_model: "zoedepth", depth_visualize: true, input: "shot.mp4", output: "depth.mp4" })

// 2. Optical Flow للسلو موشن
await video_montage({ action: "optical_flow", flow_model: "raft", flow_scale: 4, input: "action_shot.mp4", output: "slowmo.mp4" })

// 3. Color Match للوك سينمائي موحد
await video_montage({ action: "color_match", reference_image: "blade_runner_ref.jpg", match_method: "transfer", input: "shot.mp4", output: "matched.mp4" })

// 4. Color Wheel للتصحيح الدقيق
await video_montage({ action: "color_wheel", lift: "-15,-5,25", gamma: "8,-3,-8", gain: "5,8,-5", input: "matched.mp4", output: "graded.mp4" })

// 5. Particle System للأجواء
await video_montage({ action: "particle_system", particle_type: "rain", particle_count: 200, particle_physics: "gravity:1.2,wind:1,turbulence:0.3", input: "graded.mp4", output: "atmosphere.mp4" })

// 6. Expression Engine للكاميرا
await video_montage({ action: "expression_engine", expression_code: "wiggle(0.5,20)", expression_property: "position", input: "atmosphere.mp4", output: "handheld.mp4" })

// 7. Smart Zoom للتركيز على العين
await video_montage({ action: "smart_zoom", zoom_target: "eyes", zoom_max: 1.8, input: "handheld.mp4", output: "final.mp4" })
```

### Recipe: "Vertical Content Factory (أفقي → 4 منصات)"
```typescript
// 1. AI Scene Detect لتقسيم الفيديو الطويل
await video_montage({ action: "ai_scene_detect", ai_model: "content-aware", input: "long_horizontal.mp4", output: "scenes.txt" })

// 2. Auto Reframe AI لكل مشهد
// (حلل scenes.txt، طبق auto_reframe_ai على كل مقطع)

// 3. Beat Detect للموسيقى
await video_montage({ action: "beat_detect", beat_sensitivity: 0.6, input: "music.mp4", output: "beats.txt" })

// 4. Smart Cut للنظافة
await video_montage({ action: "smart_cut", smart_cut_mode: "all", input: "vertical_compilation.mp4", output: "clean.txt" })

// 5. Template Apply للبراندينغ
await video_montage({ action: "template_apply", template_name: "full", template_data: JSON.stringify({brand: "MRSX PRO"}), input: "clean.mp4", output: "branded.mp4" })

// 6. Multi Render دفعة وحدة
await video_montage({ action: "multi_render", render_presets: ["tiktok", "reels", "shorts", "twitter"], input: "branded.mp4", output: "all_platforms.txt" })

// 7. QC Report لكل منصة
await video_montage({ action: "qc_report", qc_standard: "ebu-r128", input: "branded.mp4", output: "qc.json" })
```

### Recipe: "Music Video Production بالـ AI"
```typescript
// 1. Stem Separate للكليب
await video_montage({ action: "stem_separate", stem_model: "htdemucs_ft", input: "song.mp4", output: "stems.txt" })

// 2. Beat Detect مزامنة دقيقة
await video_montage({ action: "beat_detect", beat_sensitivity: 0.7, input: "stems/drums.wav", output: "beats.txt" })

// 3. Auto Captions للكلمات
await video_montage({ action: "auto_captions", caption_model: "small", caption_language: "ar", caption_style: "karaoke", input: "stems/vocals.wav", output: "lyrics.ass" })

// 4. Object Track للراقص/المغني
await video_montage({ action: "object_track", track_target: "person", input: "performance.mp4", output: "tracked.mp4" })

// 5. Smart Zoom يتبع الوجه
await video_montage({ action: "smart_zoom", zoom_target: "face", zoom_smoothness: 0.8, input: "tracked.mp4", output: "zoom.mp4" })

// 6. Transition AI بين اللقطات
await video_montage({ action: "transition_ai", transition_mode: "flow", transition_duration: 1.5, inputs: ["clip1.mp4", "clip2.mp4"], output: "transition.mp4" })

// 7. Particle System للأجواء
await video_montage({ action: "particle_system", particle_type: "sparks", particle_physics: "gravity:0.5,wind:2,turbulence:0.8", input: "zoom.mp4", output: "fx.mp4" })

// 8. Text Animator للكلمات (Karaoke style)
await video_montage({ action: "text_animator", animator_type: "karaoke", animator_range: "word", text: "LYRICS HERE", input: "fx.mp4", output: "lyrics_video.mp4" })

// 9. Multi Render + QC
await video_montage({ action: "multi_render", render_presets: ["youtube", "tiktok", "reels"], input: "lyrics_video.mp4", output: "done.txt" })
```

---

# 🎬 FINAL BOSS TIER - مستوى استوديوهات هوليوود/نتفليكس (25 أداة)

> هذه الأدوات تمثل **قمة هرم الإنتاج** - ما تجده في DaVinci Resolve Studio + Nuke + After Effects + Pro Tools + Deadline + Asset Management. تتطلب Python scripts خارجية ونماذج AI محملة.

---

## P.48 خط أنابيب ثلاثي الأبعاد / VFX (3D/VFX Pipeline)

### Camera Track - حل كاميرا ثلاثي الأبعاد
```typescript
// 3D Camera Solve - يستخرج حركة الكاميرا والبعد البؤري
await video_montage({ 
  action: "camera_track", 
  camera_model: "colmap",     // opencv, colmap, meshroom
  camera_focal: 35,           // مم
  input: "drone_shot.mp4", 
  output: "camera_solve.json"  // موقع الكاميرا لكل إطار
})
```
| النموذج | الدقة | السرعة | الاستخدام |
|---------|-------|--------|----------|
| `opencv` | متوسطة | سريعة | لقطات بسيطة |
| `colmap` | عالية | متوسطة | **افتراضي موصى به** |
| `meshroom` | أعلى (SOTA) | بطيئة | إنتاج سينمائي |

**النتيجة:** JSON بموقع الكاميرا (position, rotation, focal) لكل إطار → يستخدم في `geo_export`، `planar_track`، 3D compositing.

---

### Planar Track - تتبع مستوي (Mocha-Style)
```typescript
// تتبع مستوي للمناطق المسطحة (شاشات، جدران، أرضيات)
await video_montage({ 
  action: "planar_track", 
  planar_surface: "100,100,500,100,500,400,100,400",  // x1,y1,x2,y2,x3,y3,x4,y4
  input: "screen_replace.mp4", 
  output: "planar_track.json"  // تحويل مستوي لكل إطار
})
```
**الاستخدامات:** Screen replacement، sign replacement، set extension، roto assist.

---

### Point Cloud - سحابة نقاط ثلاثية الأبعاد
```typescript
// إعادة بناء ثلاثي الأبعاد (3D Reconstruction)
await video_montage({ 
  action: "point_cloud", 
  point_density: "high",     // low, medium, high
  input: "static_scene.mp4", 
  output: "scene_points.ply"  // ملف PLY للـ 3D
})
```
| الكثافة | النقاط | الوقت | الاستخدام |
|---------|--------|-------|----------|
| `low` | ~10K | ثوانٍ | معاينة |
| `medium` | ~100K | دقائق | **افتراضي** |
| `high` | ~1M+ | طويل | إنتاج نهائي |

**الاستخدامات:** 3D set extension، virtual production، camera projection، depth-based effects.

---

### Geo Export - تصدير هندسة ثلاثية الأبعاد
```typescript
// تصدير لـ FBX/Alembic/USD/OBJ
await video_montage({ 
  action: "geo_export", 
  geo_format: "usd",        // fbx, alembic, usd, obj
  inputs: ["camera_solve.json", "scene_points.ply"], 
  output: "scene.usd"  // ملف USD كامل
})
```
| الصيغة | الاستخدام | يدعم |
|--------|----------|------|
| `fbx` | Maya/3ds Max/Unity/Unreal | Animation، Cameras |
| `alembic` | Houdini/Maya/Nuke | Caches، Deformation |
| `usd` | **Pixar USD** (المعيار الحديث) | **الكل** - Production ready |
| `obj` | بسيط/سريع | Static meshes فقط |

---

## P.49 كومبوزيتينغ متقدم (Advanced Compositing)

### Node Composite - كومبوزيت nodal
```typescript
// كومبوزيت مبني على العقد (مثل Nuke/Fusion)
await video_montage({ 
  action: "node_composite", 
  comp_script: JSON.stringify({
    nodes: [
      { id: "read1", type: "Read", file: "plate.exr" },
      { id: "read2", type: "Read", file: "cg.exr" },
      { id: "merge1", type: "Merge", operation: "over", inputs: ["read1", "read2"] },
      { id: "grade1", type: "Grade", inputs: ["merge1"], gamma: 1.1 },
      { id: "write1", type: "Write", file: "comp_output.exr", inputs: ["grade1"] }
    ]
  }),
  input: "ignored", 
  output: "comp_output.exr"
})
```
**العقد المدعومة:** Read, Write, Merge (over/under/plus/multiply/screen), Grade, ColorCorrect, Blur, Transform, Keyer, Roto, Tracker, Switch, Dissolve, Shuffle, Premult/Unpremult.

---

### Deep Composite - كومبوزيت عميق (Deep EXR)
```typescript
// كومبوزيت مع بيانات عمق لكل بكسل (Deep Compositing)
await video_montage({ 
  action: "deep_composite", 
  deep_input: "cg_deep.exr",  // ملف EXR بقنوات deep
  input: "plate.exr", 
  output: "deep_comp.exr"
})
```
**الميزة:** لا توجد حواف قاسية - التكامل صحيح فيزيائياً مع الضباب، الدخان، الشعر، الجسيمات.

---

### Cryptomatte - استخراج Mattes بالـ ID
```typescript
// استخراج ماتات تلقائي للأجسام/المواد/الأضواء
await video_montage({ 
  action: "cryptomatte", 
  crypto_layer: "rgba",      // rgba, object, material, asset
  input: "render.exr", 
  output: "crypto_mattes.exr"  // قنوات ID منفصلة
})
```
**الطبقات:** `object` (كل كائن)، `material` (كل مادة)، `asset` (كل أصل) - اختر في الكومبوزيت لل隔离 الفوري.

---

### Light Wrap - لف ضوئي (Edge Integration)
```typescript
// دمج حواف الموضوع مع إضاءة الخلفية
await video_montage({ 
  action: "light_wrap", 
  wrap_strength: 0.3,      // 0-1: قوة اللف
  wrap_blur: 5,            // بيكسل: ضبابية اللف
  background: "bg_plate.exr", 
  input: "keyed_subject.exr", 
  output: "wrapped.exr"
})
```
**لماذا؟** يزيل "الهالة السوداء" حول الكروما كي - يجعل الموضوع يبدو كأنه في المشهد فعلاً.

---

### Edge Extend - تمديد الحواف
```typescript
// تمديد حواف المات (Matte Edge Extension)
await video_montage({ 
  action: "edge_extend", 
  edge_pad: 10,            // بيكسل للتمديد
  input: "matte.exr", 
  output: "extended_matte.exr"
})
```
**الاستخدام:** إصلاح الماتات المقطوعة، منع الحواف الصلبة في الكومبوزيت.

---

## P.50 توليد بالـ AI (AI Generation)

### Text-to-Video (txt2vid)
```typescript
// توليد فيديو من نص (SVD, Gen-2, ZeroScope)
await video_montage({ 
  action: "txt2vid", 
  gen_model: "svd_xt",     // svd, svd_xt, gen2, zeroscope, animate_diff
  gen_frames: 25,          // إطارات
  gen_fps: 8,              // FPS
  text: "cinematic drone shot of mountains at sunset, photorealistic", 
  output: "generated.mp4"
})
```
| النموذج | الجودة | الطول | المتطلبات |
|---------|--------|-------|----------|
| `svd` | جيدة | 14-25 إطار | VRAM 8GB+ |
| `svd_xt` | أعلى | 25 إطار | VRAM 10GB+ |
| `zeroscope` | مفتوحة المصدر | 24 إطار | VRAM 12GB+ |
| `animate_diff` | أنيميشن | متغير | LoRA support |

---

### Image-to-Video (img2vid)
```typescript
// صورة إلى فيديو (تحريك صورة ثابتة)
await video_montage({ 
  action: "img2vid", 
  gen_model: "svd", 
  gen_frames: 25, 
  gen_fps: 8, 
  input: "keyframe.jpg", 
  output: "animated.mp4"
})
```

---

### Inpaint - إزالة كائن
```typescript
// إزالة كائن/شخص من الفيديو (Inpainting)
await video_montage({ 
  action: "inpaint", 
  inpaint_mask: "mask.exr",  // أبيض = منطقة للإزالة
  input: "shot_with_boom.mp4", 
  output: "clean_plate.mp4"
})
```
**الاستخدام:** إزالة ميكروفون، كاميرا، شخص، لوجو، أسلاك.

---

### Outpaint - توسيع كانفاس
```typescript
// توسيع الصورة خارج حدودها (Outpainting)
await video_montage({ 
  action: "outpaint", 
  outpaint_direction: "all",  // left, right, top, bottom, all
  input: "cropped_shot.jpg", 
  output: "extended.jpg"
})
```
**الاستخدام:** تحويل 16:9 إلى 21:9، إضافة سماء/أرض، set extension.

---

### Upscale - تكبير بالـ AI (4x/8x)
```typescript
// تكبير ذكي (AI Upscaling)
await video_montage({ 
  action: "upscale", 
  upscale_factor: 4,          // 2, 4, 8
  upscale_model: "realesrgan", // realesrgan, swinir, gfpgan, codeformer
  input: "1080p_shot.mp4", 
  output: "4K_shot.mp4"
})
```
| النموذج | التخصص | السرعة |
|---------|---------|--------|
| `realesrgan` | عام/فيديو | سريعة |
| `swinir` | تفاصيل/نصوص | متوسطة |
| `gfpgan` | **وجوه** | متوسطة |
| `codeformer` | وجوه تالفة/قديمة | بطيئة |

---

### Interpolate - توليد إطارات (Frame Generation)
```typescript
// توليد إطارات وسطى (Frame Interpolation)
await video_montage({ 
  action: "interpolate", 
  interp_factor: 4,        // 2x, 4x, 8x
  input: "24fps.mp4", 
  output: "96fps.mp4"      // أو سلو موشن سلس
})
```
**الفرق عن `optical_flow`:** يستخدم نماذج AI حديثة (RIFE, FLAVR, GMF) - جودة أعلى للـ large motion.

---

## P.51 خط أنابيب HDR/اللون (HDR/Color Pipeline)

### ACES Transform - تحويل ACES 1.3
```typescript
// تحويل صحيح لـ Academy Color Encoding System
await video_montage({ 
  action: "aces_transform", 
  aces_input: "logc",       // acescg, acecc, lin_srgb, srgb, logc, slog3, vlog, braw
  aces_output: "acescg",    // acescg, acecc, lin_srgb, srgb, pq_st2084, hlg
  input: "arri_logc.exr", 
  output: "aces_cg.exr"
})
```
**مساحات الدخل المدعومة:** ARRI LogC, Sony S-Log3, Panasonic V-Log, Blackmagic BRAW, Canon Log, RED Log3G10, ACEScc, ACEScg, Linear sRGB, sRGB.

**مساحات الخرج:** ACEScg (working), ACEScc (grading), PQ ST2084 (HDR), HLG (Broadcast), sRGB (web).

---

### Dolby Vision - ميتاداتا دولبي فيجن
```typescript
// إضافة ميتاداتا Dolby Vision Profile 5/8/9
await video_montage({ 
  action: "dolby_vision", 
  dv_profile: "profile_5",  // profile_5 (single layer), profile_8 (dual layer), profile_9 (HLG compatible)
  input: "graded_pq.exr", 
  output: "dolby_vision.mp4"
})
```

---

### HDR10+ - ميتاداتا ديناميكية
```typescript
// HDR10+ مع MaxCLL/MaxFALL لكل مشهد
await video_montage({ 
  action: "hdr10_plus", 
  hdr10_max_cll: 1000,     // nits
  hdr10_max_fall: 400,     // nits
  input: "hdr_master.exr", 
  output: "hdr10_plus.mp4"
})
```

---

### HDR Grade - تصنيف HDR
```typescript
// تصنيف في فضاء PQ/HLG مع أدوات HDR حقيقية
await video_montage({ 
  action: "hdr_grade", 
  hdr_grade_mode: "pq",    // pq, hlg, sdr_sim
  input: "hdr_shot.exr", 
  output: "graded_hdr.exr"
})
```
**الأدوات:** Exposure/Contrast في nits، Color Wheels في PQ space، Highlight Rolloff، Gamut Mapping.

---

### Color Space - تحويل مساحة لون
```typescript
// تحويل بين Rec.709, Rec.2020, P3, ACES
await video_montage({ 
  action: "color_space", 
  cs_target: "rec2020",    // rec2020, rec709, p3_d65, p3_dci, acescg
  input: "rec709.mp4", 
  output: "rec2020.mp4"
})
```
**يتضمن:** Gamut Mapping (Clipping/Compression/Perceptual)، Tone Mapping للـ HDR→SDR.

---

## P.52 مرحلة ما بعد الصوت الاحترافية (Audio Post Pro)

### ADR Record - استبدال الحوار الآلي
```typescript
// سير عمل ADR كامل (Automated Dialogue Replacement)
await video_montage({ 
  action: "adr_record", 
  adr_script: "adr_script.csv",  // timecode, character, line
  adr_takes: 3,                  // تيكات لكل سطر
  input: "production_audio.wav", 
  output: "adr_session/"
})
```
**CSV format:**
```csv
timecode,character,dialogue
01:00:12:05,HERO,"I'll be back"
01:00:15:10,VILLAIN,"Not today"
```

---

### Foley Sync - مزامنة فولي
```typescript
// مزامنة تأثيرات فولي مع الحركة
await video_montage({ 
  action: "foley_sync", 
  foley_library: "foley_lib/",  // مجلد بأصوات footsteps, cloth, props
  input: "locked_cut.mp4", 
  output: "foley_synced.wav"
})
```

---

### Surround Mix - مكس محيطي
```typescript
// مكس 5.1 / 7.1 / 7.1.2 / 7.1.4
await video_montage({ 
  action: "surround_mix", 
  surround_layout: "7.1.4",   // 5.1, 7.1, 7.1.2, 7.1.4
  input: "stems/",            // مجلد ستيمز
  output: "surround_mix.wav"
})
```
| التخطيط | القنوات | الاستخدام |
|----------|---------|----------|
| `5.1` | L,R,C,LFE,Ls,Rs | سينما قياسية |
| `7.1` | + Lrs,Rrs | سينما ممتازة |
| `7.1.2` | + Ltf,Rtf | Atmos bed |
| `7.1.4` | + Ltm,Rtm,Ltr,Rtr | **Atmos كامل** |

---

### Atmos Render - رندر Dolby Atmos
```typescript
// رندر ADM BWF لـ Dolby Atmos
await video_montage({ 
  action: "atmos_render", 
  atmos_profile: "near",    // near, mid, far, height
  input: "surround_mix.wav", 
  output: "atmos.adm.wav"
)
```

---

### Loudness Batch - لوفس متعدد التسليم
```typescript
// لوفس نتفليكس + EBU + يوتيوب دفعة وحدة
await video_montage({ 
  action: "loudness_batch", 
  loudness_targets: "netflix:-27,ebu:-23,youtube:-14,apple:-16,spotify:-14", 
  input: "final_mix.wav", 
  output: "loudness_deliverables/"
})
```
**ينشئ:** مجلد بكل نسخة متوافقة مع المعيار المطلوب.

---

## P.53 التسليم والإتقان (Delivery/Mastering)

### DCP Create - DCP للسينما
```typescript
// إنشاء Digital Cinema Package
await video_montage({ 
  action: "dcp_create", 
  dcp_fps: "24",            // 24, 25, 30, 48, 60
  dcp_reel_length: 20,      // دقائق لكل ريل
  input: "cinema_master.tiff",  // تسلسل TIFF أو MXF
  output: "dcp_package/"
})
```
**المخرجات:** MXF JPEG2000 + XML CPL + PKL + VOLINDEX + ASSETMAP.

---

### IMF Package - حزمة نتفليكس (IMF)
```typescript
// Interoperable Mastering Format للنتفليكس
await video_montage({ 
  action: "imf_package", 
  imf_cpl: "cpl.xml",       // Composition Playlist
  input: "imf_master/", 
  output: "imf_package/"
})
```
**المكونات:** CPL, OPL, PKL, Asset Map, MXF Essence (JPEG2000 lossless).

---

### Streaming Package - حزمة بث
```typescript
// HLS/DASH/CMAF للبث التكيفي
await video_montage({ 
  action: "streaming_pkg", 
  streaming_codec: "h265",  // h264, h265, av1, vp9
  streaming_ladder: "2160p:15M,1440p:8M,1080p:5M,720p:3M,480p:1.5M", 
  input: "master.mp4", 
  output: "streaming/"
})
```
**ينشئ:** `.m3u8` (HLS), `.mpd` (DASH), segments `.ts`/`.mp4`.

---

### Archive LTFS - أرشفة LTO/LTFS
```typescript
// أرشفة على شريط LTO مع LTFS
await video_montage({ 
  action: "archive_ltfs", 
  archive_format: "ltfs",   // ltfs, tar, bagit
  input: "project_folder/", 
  output: "LTO_TAPE_LABEL/"
})
```

---

## P.54 الأتمتة والمزارع (Automation/Render Farm)

### Deadline Submit - Thinkbox Deadline
```typescript
// إرسال مهمة لـ Thinkbox Deadline
await video_montage({ 
  action: "deadline_submit", 
  farm_pool: "gpu",         // high, gpu, cpu
  farm_priority: 80,        // 1-100
  farm_frames: "1-1000",    // نطاق الإطارات
  input: "project/", 
  output: "job_id.txt"
})
```

---

### Tractor Submit - Pixar Tractor
```typescript
// إرسال لـ Pixar Tractor
await video_montage({ 
  action: "tractor_submit", 
  farm_pool: "render", 
  farm_priority: 50, 
  farm_frames: "1-500", 
  input: "scene.usd", 
  output: "tractor_job.txt"
})
```

---

### Render Farm - مزرعة عامة
```typescript
// إرسال لمزرعة رندر عامة (AWS, GCP, Azure, Local)
await video_montage({ 
  action: "render_farm", 
  farm_pool: "cpu", 
  farm_priority: 50, 
  farm_frames: "1-200", 
  input: "blend_file.blend", 
  output: "farm_job_id.txt"
})
```

---

### Watch Folder - مراقبة مجلد (Auto-ingest)
```typescript
// مراقبة مجلد - يعالج أي ملف جديد تلقائياً
await video_montage({ 
  action: "watch_folder", 
  watch_path: "C:/Ingest/", 
  watch_action: "transcode_proxy",  // transcode_proxy, qc, archive, conform
  input: "ignored", 
  output: "watch_daemon.log"
})
```

---

## P.55 إدارة الوسائط (Media Management)

### Asset DB - قاعدة بيانات أصول (PostgreSQL)
```typescript
// تسجيل أصل في قاعدة بيانات PostgreSQL
await video_montage({ 
  action: "asset_db", 
  db_connection: "postgresql://user:pass@localhost/proddb", 
  asset_tags: "project:cloudmesh,type:footage,status:approved,camera:arri", 
  input: "shot_001.exr", 
  output: "asset_id.txt"
})
```

---

### Proxy Auto - بروكسي تلقائي
```typescript
// إنشاء بروكسي تلقائي عند الاستيراد
await video_montage({ 
  action: "proxy_auto", 
  proxy_trigger: "size>4k",  // import, manual, size>4k
  input: "8K_raw.r3d", 
  output: "proxy_1080p.mov"
})
```

---

### Conform XML - كونفورم من ملفات المونتاج
```typescript
// إعادة بناء التايملاين من FCPXML/EDL/AAF/Premiere
await video_montage({ 
  action: "conform_xml", 
  conform_format: "fcpxml",  // fcpxml, edl, aaf, prproj
  input: "edit.fcpxml", 
  output: "conformed_timeline/"
})
```
**يستخرج:** Clips, Transitions, Effects, Audio levels, Timecodes → يعيد بناء المشروع.

---

### Metadata Edit - تعديل بيانات وصفية
```typescript
// قراءة/كتابة XMP/EXIF/IPTC
await video_montage({ 
  action: "metadata_edit", 
  metadata_schema: "xmp",   // xmp, exif, iptc, custom
  input: "photo.jpg", 
  output: "tagged.jpg"
})
```

---

## P.56 جداول مرجعية - كل الـ 122 Action

| الفئة | الـ Actions (122 إجمالي) |
|-------|------------------------|
| **أساسي** | `info`, `cut`, `merge`, `convert`, `crop_rotate`, `reverse_video` |
| **نصوص** | `add_text`, `animated_text`, `subtitle_burn`, `timecode`, `text_animator` |
| **صوت** | `add_sfx`, `add_music`, `audio_mix`, `audio_duck`, `normalize_audio`, `extract_audio`, `audio_compressor`, `audio_limiter`, `audio_eq`, `audio_gate`, `stem_separate`, `voice_enhance`, `adr_record`, `foley_sync`, `surround_mix`, `atmos_render`, `loudness_batch` |
| **لون/فلتر** | `filter`, `color_grade`, `lut_apply`, `export_preset`, `color_match`, `color_wheel`, `aces_transform`, `dolby_vision`, `hdr10_plus`, `hdr_grade`, `color_space` |
| **بصري/GLITCH** | `glitch`, `rgb_shift`, `film_grain`, `light_leaks`, `film_burn`, `scanlines`, `chromatic_aberration`, `pixelate_face`, `vhs_effect`, `crash_zoom`, `shake`, `lens_flare`, `particle_overlay`, `zoom_blur`, `directional_blur`, `radial_blur`, `glow`, `color_isolation`, `halftone`, `posterize`, `solarize`, `emboss`, `edge_detect`, `kaleidoscope`, `prism`, `vignette_advanced`, `letterbox`, `film_border`, `particle_system` |
| **حركة/زوم** | `zoom`, `speed`, `speed_ramp`, `motion_blur`, `time_remap`, `auto_reframe`, `auto_reframe_ai`, `smart_zoom` |
| **AI/ذكي** | `ai_scene_detect`, `auto_captions`, `smart_cut`, `beat_detect`, `optical_flow`, `depth_map`, `object_track`, `transition_ai`, `txt2vid`, `img2vid`, `inpaint`, `outpaint`, `upscale`, `interpolate` |
| **جرين سكرين** | `green_screen`, `chroma_key_advanced` |
| **تصحيح** | `stabilize`, `denoise`, `lens_correction`, `lens_correction_advanced`, `rolling_shutter`, `blur_face` |
| **كومبوزيت متقدم** | `node_composite`, `deep_composite`, `cryptomatte`, `light_wrap`, `edge_extend` |
| **3D/VFX** | `camera_track`, `planar_track`, `point_cloud`, `geo_export` |
| **سير عمل/إنتاج** | `watermark`, `pip`, `split_screen`, `image_to_video`, `legendary_transition`, `auto_cut`, `beat_sync`, `thumbnail`, `thumbnail_grid`, `gif_loop`, `waveform`, `progress_bar`, `crop_detect`, `scene_detect`, `proxy_create`, `batch_process`, `qc_report`, `multi_render`, `template_apply`, `expression_engine`, `proxy_auto`, `conform_xml`, `metadata_edit` |
| **تسليم/إتقان** | `dcp_create`, `imf_package`, `streaming_pkg`, `archive_ltfs` |
| **أتمتة/مزارع** | `deadline_submit`, `tractor_submit`, `render_farm`, `watch_folder` |
| **إدارة أصول** | `asset_db` |

---

## P.57 وصفات FINAL BOSS TIER

### Recipe: "Feature Film Delivery Pipeline"
```typescript
// 1. ACES Pipeline
await video_montage({ action: "aces_transform", aces_input: "logc", aces_output: "acescg", input: "raw_arri.exr", output: "aces_cg.exr" })

// 2. HDR Grade (PQ)
await video_montage({ action: "hdr_grade", hdr_grade_mode: "pq", input: "aces_cg.exr", output: "hdr_master.exr" })

// 3. Dolby Vision + HDR10+
await video_montage({ action: "dolby_vision", dv_profile: "profile_5", input: "hdr_master.exr", output: "dv_master.mp4" })
await video_montage({ action: "hdr10_plus", hdr10_max_cll: 1000, hdr10_max_fall: 400, input: "hdr_master.exr", output: "hdr10_plus.mp4" })

// 4. IMF Package للنتفليكس
await video_montage({ action: "imf_package", imf_cpl: "cpl.xml", input: "imf_master/", output: "netflix_imf/" })

// 5. DCP للسينما
await video_montage({ action: "dcp_create", dcp_fps: "24", dcp_reel_length: 20, input: "cinema_master/", output: "dcp/" })

// 6. Loudness Batch
await video_montage({ action: "loudness_batch", loudness_targets: "netflix:-27,ebu:-23,atsc:-24", input: "final_mix.wav", output: "deliverables/" })

// 7. QC Report نهائي
await video_montage({ action: "qc_report", qc_standard: "netflix", qc_output_format: "html", input: "final_master.mp4", output: "qc_final.html" })
```

### Recipe: "VFX Shot Pipeline (Nuke/After Effects Level)"
```typescript
// 1. Camera Track
await video_montage({ action: "camera_track", camera_model: "colmap", camera_focal: 35, input: "plate.mp4", output: "camera.json" })

// 2. Planar Track للشاشة
await video_montage({ action: "planar_track", planar_surface: "200,200,800,200,800,600,200,600", input: "plate.mp4", output: "screen_track.json" })

// 3. Point Cloud للـ Set Extension
await video_montage({ action: "point_cloud", point_density: "high", input: "plate.mp4", output: "set_points.ply" })

// 4. Geo Export لـ Maya/Houdini
await video_montage({ action: "geo_export", geo_format: "usd", inputs: ["camera.json", "set_points.ply"], output: "shot.usd" })

// 5. Node Composite للكومبوزيت النهائي
await video_montage({ action: "node_composite", comp_script: JSON.stringify(nukeScript), input: "plate.exr", output: "comp_final.exr" })

// 6. Deep Composite للـ CG Integration
await video_montage({ action: "deep_composite", deep_input: "cg_deep.exr", input: "comp_final.exr", output: "deep_comp.exr" })

// 7. Cryptomatte للـ Isolation
await video_montage({ action: "cryptomatte", crypto_layer: "object", input: "comp_final.exr", output: "mattes.exr" })

// 8. Light Wrap للدمج الواقعي
await video_montage({ action: "light_wrap", wrap_strength: 0.4, wrap_blur: 8, background: "bg_plate.exr", input: "keyed_fg.exr", output: "wrapped.exr" })
```

### Recipe: "AI Content Factory (توليد محتوى كامل)"
```typescript
// 1. Text-to-Video للمشاهد
await video_montage({ action: "txt2vid", gen_model: "svd_xt", gen_frames: 25, gen_fps: 8, text: "futuristic city flythrough", output: "ai_shot1.mp4" })

// 2. Image-to-Video للـ Keyframes
await video_montage({ action: "img2vid", gen_model: "svd", input: "concept_art.jpg", output: "ai_shot2.mp4" })

// 3. Upscale لـ 4K
await video_montage({ action: "upscale", upscale_factor: 4, upscale_model: "realesrgan", input: "ai_shot1.mp4", output: "ai_shot1_4k.mp4" })

// 4. Interpolate لـ 60fps
await video_montage({ action: "interpolate", interp_factor: 2, input: "ai_shot1_4k.mp4", output: "ai_shot1_60fps.mp4" })

// 5. Auto Captions للوصف
await video_montage({ action: "auto_captions", caption_model: "base", caption_language: "en", caption_style: "pop-in", input: "ai_shot1_60fps.mp4", output: "captions.srt" })

// 6. Particle System للأجواء
await video_montage({ action: "particle_system", particle_type: "sparks", particle_physics: "gravity:0.3,wind:1,turbulence:0.5", input: "ai_shot1_60fps.mp4", output: "fx_shot.mp4" })

// 7. Template Apply للبراندينغ
await video_montage({ action: "template_apply", template_name: "full", template_data: JSON.stringify({brand: "MRSX PRO"}), input: "fx_shot.mp4", output: "branded.mp4" })

// 8. Multi Render للمنصات
await video_montage({ action: "multi_render", render_presets: ["youtube", "tiktok", "reels", "shorts"], input: "branded.mp4", output: "platforms/" })
```

### Recipe: "Broadcast TV Series Episode Delivery"
```typescript
// 1. Conform من Premiere/Avid
await video_montage({ action: "conform_xml", conform_format: "aaf", input: "episode_edit.aaf", output: "conformed/" })

// 2. Proxy Auto للمونتاج
await video_montage({ action: "proxy_auto", proxy_trigger: "import", input: "raw_footage/", output: "proxies/" })

// 3. بعد المونتاج: Asset DB للتسجيل
await video_montage({ action: "asset_db", db_connection: "postgresql://prod", asset_tags: "show:series01,ep:05,status:locked", input: "locked_cut.mp4", output: "asset_id.txt" })

// 4. Surround Mix 5.1
await video_montage({ action: "surround_mix", surround_layout: "5.1", input: "stems/", output: "51_mix.wav" })

// 5. Loudness EBU R128
await video_montage({ action: "loudness_batch", loudness_targets: "ebu:-23", input: "51_mix.wav", output: "ebu_compliant.wav" })

// 6. QC Report
await video_montage({ action: "qc_report", qc_standard: "ebu-r128", qc_output_format: "html", input: "final.mp4", output: "qc_broadcast.html" })

// 7. Streaming Package للبث
await video_montage({ action: "streaming_pkg", streaming_codec: "h264", streaming_ladder: "1080p:8M,720p:4M,480p:2M", input: "final.mp4", output: "broadcast_stream/" })

// 8. Archive
await video_montage({ action: "archive_ltfs", archive_format: "ltfs", input: "project/", output: "LTO_Archive/" })
```

---


---

# 🧠 P.59 نظام VDS (Virtual Data Space) - الذاكرة الدائمة للبلوقن

> **ذاكرة لا تنسى.** البلوقن يتذكرك، أسلوبك، دروسك، قراراتك — عبر الجلسات، الأجهزة، المشاريع.

---

## 📁 هيكل الملفات

```
Documents/Virtual Data Space/
├── identity.vds       # هويتك: الاسم، العمر، البلد، الشركة، المشاريع
├── preferences.vds    # تفضيلاتك: ستايل، أدوات، LUTs، SFX، تصدير
├── memory.vds         # ذاكرة العمليات: ما عملت، أدوات، نتائج، دروس
├── sessions.vds       # تاريخ الجلسات: أوامر، ملفات، مدة
├── consent.vds        # موافقتك (GDPR compliant) - كل شي بإذنك
└── vds_backup_*.json  # نسخ احتياطية للتصدير/النقل
```

**الصيغة:** JSON قابل للقراءة البشرية (مش مشفر، مش binary)

---

## 🔐 نظام الموافقة (Consent First)

**القاعدة الذهبية:** **ما في شي يتحفظ بدون موافقتك الصريحة.**

```typescript
// قبل أي حفظ:
if (!vds.hasConsent('identity')) {
  // يسألك: "أحفظ اسمك (Ali)، عمرك (14)، شركتك (MRSX PRO)؟"
  // أنت تقول: نعم / لا
}
```

| الفئة | ماذا تحفظ | متى تطلب الموافقة |
|----------|-----------|-------------------|
| `identity` | الاسم، العمر، البلد، الشركة، المشاريع | أول مرة تستخدم `vds_identity` |
| `preferences` | ستايل المونتاج، أدوات مفضلة، LUTs، SFX، قوالب تصدير | أول مرة تستخدم `vds_preferences` |
| `memory` | كل عملية: أداة، مدخل، مخرج، نتيجة، ملاحظات، دروس | أول مرة يعمل `video_montage` أي عملية |
| `sessions` | تاريخ الجلسات: أوامر، ملفات، مدة | تلقائي مع كل جلسة |
| `analytics` | إحصائيات استخدام (مجهولة) | منفصلة، اختيارية |

---

## 🛠️ أدوات VDS (10 Actions جديدة)

| Action | الوصف | المعاملات المطلوبة |
|--------|--------|-------------------|
| `vds_init` | تهيئة VDS، إنشاء المجلد، تحميل البيانات | — |
| `vds_consent` | فحص/منح/إلغاء موافقة | `vds_category`, `vds_grant`, `vds_reason` |
| `vds_identity` | حفظ/قراءة الهوية | `vds_name`, `vds_age`, `vds_country`, `vds_company`, `vds_projects` |
| `vds_preferences` | حفظ/قراءة التفضيلات | `vds_style`, `vds_tools`, `vds_luts`, `vds_sfx_cats`, `vds_exports`, `vds_lang` |
| `vds_memory` | حفظ/بحث/قراءة الذاكرة | `vds_action`, `vds_tools_used`, `vds_result`, `vds_search`, `vds_limit` |
| `vds_sessions` | إدارة الجلسات (تلقائي) | — |
| `vds_status` | حالة VDS: ملفات، موافقة، مسار | — |
| `vds_export` | تصدير كل البيانات لـ JSON | `output` (اختياري) |
| `vds_import` | استيراد بيانات من JSON | `input` (مسار ملف) |
| `vds_reset` | مسح كل بيانات VDS | `vds_confirm=true` |

---

## 💡 أمثلة عملية

### أول تشغيل - يطلب موافقتك:
```bash
# أنت تقول: "سوي مونتاج جيمنج"
# البلوقن يشوف: ما في consent لـ memory
# يسألك: "أحفظ تفاصيل العملية في الذاكرة؟"
# أنت: "نعم"
# البلوقن: يمنح consent، يحفظ العملية
```

### حفظ هويتك:
```bash
video_montage action=vds_identity \
  vds_name="Ali" \
  vds_age=14 \
  vds_country="Iraq" \
  vds_company="MRSX PRO" \
  vds_projects='["CloudMesh", "opencode-video-editor"]'
```

### حفظ تفضيلاتك:
```bash
video_montage action=vds_preferences \
  vds_style="gaming" \
  vds_tools='["zoom", "add_sfx", "legendary_transition", "smart_cut"]' \
  vds_luts='["Kodak 2383", "Teal-Orange", "Film Noir"]' \
  vds_sfx_cats='["suspense", "transition"]' \
  vds_exports='["youtube", "tiktok", "reels", "shorts"]' \
  vds_lang="ar"
```

### البحث في الذاكرة:
```bash
video_montage action=vds_memory vds_search="zoom punch"
# يلاقي كل المرات استخدمت zoom punch
```

### تصدير/نقل لجهاز ثاني:
```bash
video_montage action=vds_export output="C:/backup/vds_2026.json"
# تنسخ الملف للجهاز الجديد
video_montage action=vds_import input="C:/backup/vds_2026.json"
```

---

## 🔄 التكامل التلقائي مع المونتاج

**كل مرة تستخدم `video_montage` لأي عملية:**

1. **يبدأ جلسة** تلقائياً (`vds_sessions`)
2. **يسجل الأمر** في الجلسة
3. **لو فيه موافقة `memory`** → يحفظ مدخل ذاكرة:
   - الإجراء (`action`)
   - ملف المدخل/المخرج
   - الأدوات المستخدمة
   - النتيجة (نجاح/فشل)
   - وقت التنفيذ
3. **ينهي الجلسة** ويحسب المدة

---

## 🎯 الفائدة الحقيقية

| الموقف | بدون VDS | مع VDS |
|---------|----------|--------|
| تبدل جهاز | تضيع تفضيلاتك | تنسخ مجلد `.vds` → كل شي يرجع |
| تنسى أداة | تدور في SKILL.md | `vds_memory vds_search="قص"` → يلاقيها فوراً |
| تكرر غلطة | تسويها تاني | البلوقن ينبهك: "السابقاً فشلت مع `zoompan`، استخدم `crop`" |
| مشروع جديد | تبدأ من صفر | البلوقن يقترح: "أسلوبك Gaming، لوت Kodak، SFX Suspense" |
| فريق جديد | تشرح لكل واحد | ترسل `vds_export` → كل واحد يستورد ويستفيد |

---

## ⚙️ التكامل مع SKILL.md (P.58 Decision Tree)

الـ VDS يغذي **شجرة القرار** في P.58:

```
Decision Tree يسألك: "ستايلك شنو؟"
  ↓ VDS يقرأ preferences.vds
  ↓ يلاقي: montage_style: "gaming"
  ↓ يقترح تلقائي: zoom punch + impact SFX + beat_detect
```

**البلوقن يصير "يعرفك" ويتطور مع كل جلسة.** 🧠✨

---

## 🔒 الخصوصية والأمان

- **محلي 100%:** ما في شي يطلع من جهازك
- **مشفر؟ لا:** JSON عادي → أنت تشوف/تعدل/تمسح يدوياً
- **موافقة صريحة:** كل فئة على حدة
- **حق النسيان:** `vds_reset vds_confirm=true` يمسح كل شي فوراً
- **قابل للنقل:** تنسخ المجلد → تشتغل على أي جهاز

---

## خلاصة فلسفة المونتاج

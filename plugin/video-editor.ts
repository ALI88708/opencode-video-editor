import { type Plugin, tool } from "@opencode-ai/plugin"
import * as fs from "fs"
import * as path from "path"

const BASE = "C:/Users/mr_ali7685/Documents/مونتاج"

const RES = {
  click: `${BASE}/SFX Click`,
  meme: `${BASE}/SFX Meme`,
  suspense: `${BASE}/SFX Suspense`,
  transition: `${BASE}/SFX Transition`,
  fonts: `${BASE}/Content creation/Fonts`,
  backgrounds: `${BASE}/Content creation/Backgrounds`,
}

const QUOT = (s?: string) => (s ? `"${String(s).replace(/"/g, '\\"')}"` : "")

function ff(): string {
  return "ffmpeg"
}

function pos(p: string) {
  switch (p) {
    case "top-left": return "20:20"
    case "top-right": return "W-w-20:20"
    case "bottom-left": return "20:H-h-20"
    case "center": return "(W-w)/2:(H-h)/2"
    default: return "W-w-20:H-h-20"
  }
}

// توليد ملف ASS لنص بسيط معتم على libass (لا يواجه مشكلة fontconfig)
function writeAss(file: string, text: string, font: string, size: number, color: string, durationS: number, align: number, marginV: number) {
  const startT = "0:00:00.00"
  const endT = ts(durationS)
  const name = path.basename(font, path.extname(font)).replace(/"/g, "")
  const hex = colorToHex(color)
  const content = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${name},${size},${hex},&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,4,1,${align},40,40,${marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,${startT},${endT},Default,,0,0,0,,${text}
`
  fs.writeFileSync(file, content, "utf8")
}

function ts(s: number): string {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = (s % 60)
  const ms = Math.round((sec - Math.floor(sec)) * 100)
  return `${h}:${String(m).padStart(2, "0")}:${String(Math.floor(sec)).padStart(2, "0")}.${String(ms).padStart(2, "0")}`
}

function colorToHex(c: string): string {
  const named: Record<string, string> = {
    white: "FFFFFF", yellow: "FFFF00", red: "FF0000", blue: "0000FF",
    green: "00FF00", black: "000000", orange: "FFA500", cyan: "00FFFF",
    pink: "FF69B4", purple: "800080",
  }
  let raw = named[(c || "white").toLowerCase()] ?? (c || "FFFFFF")
  raw = raw.replace(/^#/, "")
  // ASS يستخدم BGR
  return `&H00${raw.slice(4, 6)}${raw.slice(2, 4)}${raw.slice(0, 2)}`
}

function align(a?: string) {
  switch (a) {
    case "top-center": return 8
    case "top-left": return 7
    case "top-right": return 9
    case "bottom-left": return 1
    case "bottom-right": return 3
    default: return 2
  }
}

export const VideoEditorPlugin: Plugin = async ({ $, directory }) => {
  return {
    tool: {
      video_montage: tool({
        description:
          "أداة مونتاج وإنتاج فيديو احترافية مبنية على FFmpeg. تدعم: فحص الملفات، القص، الدمج، إضافة نصوص/عناوين (عبر libass)، النصوص المتحركة، مؤثرات صوتية من مكتبة المستخدم، موسيقى، جرين سكرين، تحكم بالسرعة، علامة مائية، تثبيت، مصغرات، تحويل صيغ، قص/تدوير، فلاتر، خلط صوتي، حرق ترجمة، وPicture-in-Picture. ملاحظة: استخدم نسب المسارات مع فلتر النصوص لتفادي مشكلة fontconfig, والأدوات تنفذ أوامر ffmpeg فعلية.",
        args: {
          action: tool
            .schema.enum([
              "info",
              "cut",
              "merge",
              "add_text",
              "animated_text",
              "add_sfx",
              "add_music",
              "green_screen",
              "speed",
              "watermark",
              "stabilize",
              "thumbnail",
              "convert",
              "crop_rotate",
              "filter",
              "audio_mix",
              "subtitle_burn",
              "pip",
              "image_to_video",
              "split_screen",
              "reverse_video",
              "zoom",
              "legendary_transition",
            ])
            .describe("العملية التي تريد تنفيذها"),
          input: tool.schema.string().optional().describe("مسار ملف الإدخال"),
          inputs: tool.schema.array(tool.schema.string()).optional().describe("قائمة مسارات للدمج"),
          output: tool.schema.string().optional().describe("مسار ملف الإخراج"),
          start: tool.schema.string().optional().describe("وقت البداية مثل 00:00:05"),
          end: tool.schema.string().optional().describe("وقت النهاية مثل 00:00:15"),
          duration: tool.schema.number().optional().describe("المدة بالثواني"),
          text: tool.schema.string().optional().describe("النص أو العنوان"),
          font: tool.schema.string().optional().describe("اسم ملف الخط"),
          size: tool.schema.number().optional().describe("حجم الخط"),
          color: tool.schema.string().optional().describe("لون النص (white, yellow, red, ...)"),
          animation: tool.schema.enum(["slide-in-left", "slide-in-right", "appear", "scroll"]).optional().describe("حركة النص"),
          category: tool.schema.enum(["click", "meme", "suspense", "transition"]).optional().describe("تصنيف المؤثر الصوتي"),
          sfx: tool.schema.string().optional().describe("اسم ملف المؤثر الصوتي"),
          at: tool.schema.number().optional().describe("الثانية لتشغيل المؤثر"),
          music: tool.schema.string().optional().describe("مسار ملف الموسيقى"),
          volume: tool.schema.number().optional().describe("مستوى صوت الموسيقى 0-1"),
          background: tool.schema.string().optional().describe("مسار الخلفية للجرين سكرين"),
          similarity: tool.schema.number().optional().describe("نسبة إزالة لون الجرين سكرين 0-1"),
          factor: tool.schema.number().optional().describe("عامل السرعة 2 = تسريع، 0.5 = بطيئ"),
          logo: tool.schema.string().optional().describe("مسار صورة الشعار"),
          position: tool.schema.enum(["top-left", "top-right", "bottom-left", "bottom-right", "center"]).optional().describe("موضع الشعار"),
          effect: tool.schema.enum(["bw", "vintage", "vhs", "negative", "sharpen", "blur", "vignette", "vibrant", "cinematic"]).optional().describe("نوع الفلتر"),
          srt: tool.schema.string().optional().describe("مسار ملف الترجمة SRT"),
          pip: tool.schema.string().optional().describe("مسار الفيديو الصغير في PiP"),
          format: tool.schema.string().optional().describe("صيغة التحويل: mp4, mp3, gif, mov"),
          width: tool.schema.number().optional().describe("العرض للقص"),
          height: tool.schema.number().optional().describe("الارتفاع للقص"),
          crop_type: tool
            .schema.enum(["crop", "rotate90", "rotate180", "flip-h", "flip-v", "vertical-reels", "blur-bg"])
            .optional()
            .describe("نوع عملية القص/التدوير (مع action=crop_rotate)"),
          text_align: tool.schema.enum(["center", "top-center", "top-left", "top-right", "bottom-left", "bottom-right"]).optional().describe("محاذاة النص"),
          zoom_type: tool.schema.enum(["in", "out", "punch"]).optional().describe("نوع الزوم: in = تقريب، out = تبعيد، punch = تقريب سريع"),
          zoom: tool.schema.number().optional().describe("مقدار الزوم النهائي (مثل 1.5 = تكبير 50%)، الافتراضي 1.5"),
          zoom_duration: tool.schema.number().optional().describe("مدة الزوم بالثواني، الافتراضي 2"),
          center_x: tool.schema.number().optional().describe("مركز الزوم الأفقي (0-1)، الافتراضي 0.5"),
          center_y: tool.schema.number().optional().describe("مركز الزوم العمودي (0-1)، الافتراضي 0.5"),
          transition_type: tool.schema.enum(["zoomin", "zoomout", "smooth", "whippan", "flash", "fade", "circle", "wipe"]).optional().describe("نوع الإنتقالة الأسطورية بين لقطتين"),
          transition_duration: tool.schema.number().optional().describe("مدة الإنتقالة بالثواني، الافتراضي 0.5"),
        },
        async execute(args, context) {
          const a = args
          const workDir = context.directory || directory || process.cwd()
          const inP = a.input ?? a.inputs?.[0]
          let out = a.output ?? "output.mp4"
          // تحويل مسار الإخراج إلى مطلق بناءً على مجلد العمل إن كان نسبياً
          if (!path.isAbsolute(out)) out = path.resolve(workDir, out)
          try {
            let cmd: string
            switch (a.action) {
              case "info":
                cmd = `ffprobe -v error -show_entries format=duration,size:stream=width,height,r_frame_rate,codec_name -of default=noprint_wrappers=1 ${QUOT(inP)}`
                break
              case "cut":
                cmd = `${ff()} -i ${QUOT(inP)} -ss ${a.start ?? "00:00:00"} -to ${a.end ?? ""} -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              case "add_text": {
                const ass = path.join(path.dirname(out), path.basename(out, path.extname(out)) + "_cap.ass")
                writeAss(ass, a.text ?? "", a.font ?? "Arial", a.size ?? 72, a.color ?? "white", a.duration ?? 60, align(a.text_align), 60)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "ass=${path.basename(ass)}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "animated_text": {
                const ass = path.join(path.dirname(out), path.basename(out, path.extname(out)) + "_anim.ass")
                const anim = a.animation ?? "slide-in-left"
                const moveCode = anim === "slide-in-left" ? "\\move(-1500,0,0,0,0,800)" : anim === "slide-in-right" ? "\\move(1500,0,0,0,0,800)" : anim === "appear" ? "\\fad(300,300)" : anim === "scroll" ? "\\t(0,12000,\\frz360)" : ""
                writeAssAnim(ass, a.text ?? "", a.font ?? "Arial", a.size ?? 72, a.color ?? "white", a.duration ?? 60, moveCode, align(a.text_align), 60)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "ass=${path.basename(ass)}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "add_sfx": {
                const cat = a.category ?? "click"
                const sfxPath = `${RES[cat as keyof typeof RES]}/${(a.sfx ?? "click.mp3").replace(/\\/g, "/")}`
                const ms = Math.round((a.at ?? 0) * 1000)
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(sfxPath)} -filter_complex "[1:a]adelay=${ms}|${ms}[sfx];[0:a][sfx]amix=inputs=2:duration=first[a]" -map "0:v" -map "[a]" -c:v copy -c:a aac ${QUOT(out)}`
                break
              }
              case "add_music": {
                const vol = a.volume ?? 0.3
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(a.music)} -filter_complex "[1:a]volume=${vol}[m];[0:a][m]amix=inputs=2:duration=first[a]" -map "0:v" -map "[a]" -c:v copy -c:a aac ${QUOT(out)}`
                break
              }
              case "green_screen":
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(a.background ?? "")} -filter_complex "[0:v]chromakey=green:similarity=${a.similarity ?? 0.1}:blend=0.1[fg];[fg]format=yuva420p[fgv];[1:v][fgv]overlay=(W-w)/2:(H-h)/2[outv]" -map "[outv]" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              case "speed": {
                const factor = a.factor ?? 2
                const pts = 1 / factor
                cmd = `${ff()} -i ${QUOT(inP)} -filter_complex "[0:v]setpts=${pts}*PTS[v];[0:a]atempo=${factor}[aud]" -map "[v]" -map "[aud]" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              case "watermark":
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(a.logo)} -filter_complex "[0:v][1:v]overlay=${pos(a.position ?? "bottom-right")}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              case "stabilize": {
                // عملية 2-pass: تحليل ثم تطبيق
                const trfFile = path.join(path.dirname(out), "transforms.trf")
                // Pass 1: تحليل الحركة
                const pass1 = await $`${ff()} -i ${QUOT(inP)} -vf "vidstabdetect=stepsize=6:shakiness=8:accuracy=9:result=${QUOT(trfFile)}" -f null -`.quiet()
                // Pass 2: تطبيق التثبيت
                cmd = `${ff()} -i ${QUOT(inP)} -vf "vidstabtransform=input=${QUOT(trfFile)}:zoom=1:smoothing=10,unsharp=5:5:0.8:3:3:0.4" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                // حذف ملف التحليل المؤقت بعد الانتهاء
                try { fs.unlinkSync(trfFile) } catch {}
                break
              }
              case "thumbnail":
                cmd = `${ff()} -ss ${a.at ?? 5} -i ${QUOT(inP)} -frames:v 1 -vf "scale=1280:720" ${QUOT(out)}`
                break
              case "convert": {
                const fmt = a.format ?? "mp4"
                if (fmt === "mp3") cmd = `${ff()} -i ${QUOT(inP)} -vn -acodec libmp3lame -q:a 2 ${QUOT(out)}`
                else if (fmt === "gif") cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=480:-1,fps=15" -loop 0 ${QUOT(out)}`
                else if (fmt === "mov") cmd = `${ff()} -i ${QUOT(inP)} -c copy ${QUOT(out)}`
                else cmd = `${ff()} -i ${QUOT(inP)} -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              case "crop_rotate": {
                const ct = a.crop_type ?? "crop"
                if (ct === "rotate90") cmd = `${ff()} -i ${QUOT(inP)} -vf "transpose=1" ${QUOT(out)}`
                else if (ct === "rotate180") cmd = `${ff()} -i ${QUOT(inP)} -vf "transpose=1,transpose=1" ${QUOT(out)}`
                else if (ct === "flip-h") cmd = `${ff()} -i ${QUOT(inP)} -vf "hflip" -c copy ${QUOT(out)}`
                else if (ct === "flip-v") cmd = `${ff()} -i ${QUOT(inP)} -vf "vflip" -c copy ${QUOT(out)}`
                else if (ct === "vertical-reels") cmd = `${ff()} -i ${QUOT(inP)} -vf "crop='min(iw,ih*9/16)':'min(iw,ih*9/16)*16/9',scale=1080:1920" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                else if (ct === "blur-bg") cmd = `${ff()} -i ${QUOT(inP)} -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=20:5[bg];[0:v]scale=1080:1920[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                else cmd = `${ff()} -i ${QUOT(inP)} -vf "crop=w=${a.width ?? 1280}:h=${a.height ?? 720}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              }
              case "filter": {
                const e = a.effect ?? "cinematic"
                const vf = {
                  bw: "hue=s=0",
                  negative: "negate",
                  sharpen: "unsharp=5:5:1.0:5:5:0.0",
                  blur: "boxblur=10:1",
                  vignette: "vignette=PI/4",
                  vhs: "noise=alls=8:allf=t,equ=contrast=1.1:saturation=0.8,hue=h=10",
                  vintage: "eq=contrast=0.9:saturation=0.7:gamma=1.1,noise=alls=6:allf=t",
                  vibrant: "eq=saturation=1.4:contrast=1.1",
                  cinematic: "eq=contrast=1.1:brightness=0.02:saturation=1.2",
                }[e as string] ?? "eq=contrast=1.1:saturation=1.2"
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${vf}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "audio_mix": {
                cmd = await audioMixCmd($, a, inP, out)
                break
              }
              case "subtitle_burn": {
                // نسخ ملف SRT إلى مجلد العمل واستخدام مسار نسبي (لتجنب مشكلة C:\)
                const srtSrc = a.srt ?? ""
                const srtName = path.basename(srtSrc)
                const srtDest = path.join(path.dirname(out), srtName)
                if (srtSrc && !fs.existsSync(srtDest) && srtSrc !== srtDest) {
                  fs.copyFileSync(srtSrc, srtDest)
                }
                cmd = `${ff()} -i ${QUOT(inP)} -vf "subtitles=${srtName}:force_style='FontSize=24,Outline=2'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "pip":
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(a.pip)} -filter_complex "[1:v]scale=480:270[small];[0:v][small]overlay=${pos(a.position ?? "bottom-right")}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              case "image_to_video":
                cmd = `${ff()} -loop 1 -i ${QUOT(inP)} -vf "scale=8000:-1,zoompan=z='min(zoom+0.0015,1.5)':d=25*${a.duration ?? 8}:s=${a.width ?? 1920}x${a.height ?? 1080}:fps=25" -t ${a.duration ?? 8} -c:v libx264 -pix_fmt yuv420p ${QUOT(out)}`
                break
              case "split_screen": {
                // تقسيم الشاشة أفقياً (2 فيديو جنباً لجنب)
                const in2 = a.inputs?.[1] ?? a.input
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(in2)} -filter_complex "[0:v]scale=960:540[l];[1:v]scale=960:540[r];[l][r]hstack" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              case "reverse_video": {
                // عكس الفيديو بالكامل
                cmd = `${ff()} -i ${QUOT(inP)} -vf "reverse" -af "areverse" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              case "zoom": {
                // زوم ثابت سريع عبر scale+crop (يحافظ على المدة والمعدل تماماً)
                // نقرأ أبعاد الفيديو الفعلية بـ ffprobe لنحسب أرقاماً ثابتة صحيحة (نتجنب مشكلة iw داخل crop)
                const z = a.zoom ?? 1.5
                const cx = a.center_x ?? 0.5
                const cy = a.center_y ?? 0.5
                const probe = await $`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 ${inP}`.quiet()
                const dims = (probe.stdout?.toString?.() ?? "0,0").trim().split(",").map((s) => parseInt(s.trim(), 10))
                const srcW = dims[0] || 1366
                const srcH = dims[1] || 768
                const outW = a.width && a.width > 0 ? a.width : srcW
                const outH = a.height && a.height > 0 ? a.height : srcH
                const zw = Math.floor((outW * z) / 2) * 2
                const zh = Math.floor((outH * z) / 2) * 2
                const offx = Math.round(cx * (zw - outW))
                const offy = Math.round(cy * (zh - outH))
                cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=${zw}:${zh},crop=${outW}:${outH}:${offx}:${offy}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "legendary_transition": {
                // إنتقالة أسطورية بين لقطتين عبر xfade
                const in2 = a.inputs?.[1] ?? ""
                const tt = a.transition_type ?? "fade"
                const td = a.transition_duration ?? 0.5
                // خريطة نوع الانتقالة إلى ما يفهمه xfade
                const xfadeMap: Record<string, string> = {
                  zoomin: "zoomin",
                  zoomout: "zoomout",
                  smooth: "fade",
                  whippan: "slideleft",
                  flash: "fadeblack",
                  fade: "fade",
                  circle: "circleopen",
                  wipe: "wiperight",
                }
                const xf = xfadeMap[tt] ?? "fade"
                // حساب offset صحيح = مدة القطعة الأولى - مدة الإنتقالة (يقرأ المدة عبر ffprobe)
                const durProbe = await $`ffprobe -v error -show_entries format=duration -of csv=p=0 ${inP}`.quiet()
                const firstDur = parseFloat((durProbe.stdout?.toString?.() ?? "0").trim()) || 2
                const off = Math.max(firstDur - td, 0.1)
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(in2)} -filter_complex "[0:v][1:v]xfade=transition=${xf}:duration=${td}:offset=${off}[v];[0:a][1:a]acrossfade=d=${td}[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              default:
                return `عملية غير معروفة: ${a.action}`
            }
            const r = await $`${cmd}`.quiet()
            const stdout = r.stdout?.toString?.() ?? ""
            const stderr = r.stderr?.toString?.() ?? ""
            const ok = (r.exitCode ?? -1) === 0 || fs.existsSync(out)
            return (
              `### نتيجة مونتاج (action=${a.action})\n` +
              `الأمر: \`${cmd}\`\n` +
              `الحالة: ${ok ? "نجح ✅" : "فشل ❌ (exit=" + r.exitCode + ")"}\n` +
              `الإخراج: ${ok && fs.existsSync(out) ? out : stdout + "\n" + stderr}`
            )
          } catch (e: any) {
            return `خطأ أثناء التنفيذ:\n${e?.message ?? e}`
          }
        },
      }),
      video_preview: tool({
        description:
          "استخراج إطارات (صور) من فيديو في نقاط زمنية محددة لرؤية المحتوى. استخدمها قبل المونتاج لفهم ما يوجد في الفيديو (المشاهد، الحركة، الإضاءة) وبعد المونتاج للتحقق من النتيجة النهائية. تنتج صور JPEG يستطيع النموذج قراءتها.",
        args: {
          input: tool.schema.string().describe("مسار ملف الفيديو"),
          times: tool
            .schema.array(tool.schema.number())
            .optional()
            .describe("نقاط زمنية بالثواني لاستخراج إطار منها. مثال: [1,5,10,20,30]"),
          interval: tool.schema.number().optional().describe("بدلاً من times، استخرج إطار كل X ثانية تلقائياً"),
          count: tool.schema.number().optional().describe("عدد الإطارات لاستخراجها بالتساوي (عند interval أو تلقائي)"),
          output_dir: tool.schema.string().optional().describe("مجلد لحفظ الإطارات. الافتراضي: [input_dir]/preview"),
          size: tool.schema.string().optional().describe("حجم الإطارات المستخرجة مثل 1280x720"),
        },
        async execute(args, context) {
          const a = args
          const workDir = context.directory || directory || process.cwd()
          const inP = a.input
          const outDir = a.output_dir
            ? path.resolve(workDir, a.output_dir)
            : path.join(path.dirname(inP), "preview")
          fs.mkdirSync(outDir, { recursive: true })
          try {
            // احصل على مدة الفيديو
            const probe = await $`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${inP}`.quiet()
            const dur = parseFloat((probe.stdout?.toString?.() ?? "0").trim()) || 0
            const size = a.size ?? "640x360"
            const times: number[] = []
            if (a.times && a.times.length) {
              times.push(...a.times)
            } else {
              const count = a.count ?? 6
              const step = dur / count
              for (let i = 0; i < count; i++) times.push(Math.min(Math.max(step * i, 0), Math.max(dur - 0.4, 0)))
            }
            const files: string[] = []
            for (const t of times) {
              const name = `frame_${String(t.toFixed(1)).replace(".", "_")}s.jpg`
              const out = path.join(outDir, name)
              const r = await $`ffmpeg -y -loglevel error -ss ${t} -i ${inP} -frames:v 1 -vf scale=${size} ${out}`.quiet()
              if ((r.exitCode ?? -1) === 0 && fs.existsSync(out)) files.push(out)
              else files.push(`${out} (فشل)`)
            }
            return (
              `### معاينة الفيديو (${dur.toFixed(1)} ثانية)\n` +
              `استُخرجت ${files.length} إطارات في:\n\`${outDir}\`\n\n` +
              files.map((f) => `- ${f}`).join("\n") +
              `\n\nاطلع (اقرأ) الصور أعلاه لفهم محتوى الفيديو قبل/بعد المونتاج.`
            )
          } catch (e: any) {
            return `خطأ أثناء استخراج الإطارات:\n${e?.message ?? e}`
          }
        },
      }),
    },
  }
}

function writeAssAnim(file: string, text: string, font: string, size: number, color: string, durationS: number, moveCode: string, al: number, marginV: number) {
  const startT = "0:00:00.00"
  const endT = ts(durationS)
  const name = path.basename(font, path.extname(font)).replace(/"/g, "")
  const hex = colorToHex(color)
  const content = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,${name},${size},${hex},&H000000FF,&H00000000,&H80000000,0,0,0,0,100,100,0,0,1,4,1,${al},40,40,${marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,${startT},${endT},Default,,0,0,0,,{\\an${al}${moveCode}}${text}
`
  fs.writeFileSync(file, content, "utf8")
}

async function audioMixCmd($: any, a: any, inP?: string, out?: string) {
  let cmd = `${ff()} -i ${QUOT(inP)}`
  const filters: string[] = []
  const mixInputs: string[] = ["[0:a]"]
  let streamIdx = 1
  if (a.music) {
    cmd += ` -i ${QUOT(a.music)}`
    const vol = a.volume ?? 0.3
    filters.push(`[${streamIdx}:a]volume=${vol}[mus]`)
    mixInputs.push("[mus]")
    streamIdx++
  }
  if (a.sfx) {
    cmd += ` -i ${QUOT(a.sfx)}`
    const ms = Math.round((a.at ?? 0) * 1000)
    filters.push(`[${streamIdx}:a]adelay=${ms}|${ms}[sfxm]`)
    mixInputs.push("[sfxm]")
    streamIdx++
  }
  const n = mixInputs.length
  const fc = filters.join(";") + ";" + mixInputs.join("") + `amix=inputs=${n}:duration=first[a]`
  return `${cmd} -filter_complex "${fc}" -map "0:v" -map "[a]" -c:v copy -c:a aac ${QUOT(out)}`
}

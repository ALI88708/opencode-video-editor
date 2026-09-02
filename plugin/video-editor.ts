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
          "أداة مونتاج وإنتاج فيديو احترافية مبنية على FFmpeg. تدعم: فحص الملفات، القص، الدمج، إضافة نصوص/عناوين (عبر libass)، النصوص المتحركة، مؤثرات صوتية من مكتبة المستخدم، موسيقى، جرين سكرين، تحكم بالسرعة، علامة مائية، تثبيت، مصغرات، تحويل صيغ، قص/تدوير، فلاتر، خلط صوتي، حرق ترجمة، Picture-in-Picture، والمؤثرات البصرية المتقدمة: glitch، rgb_shift، film_grain، light_leaks، film_burn، scanlines، chromatic_aberration، pixelate_face، vhs_effect، crash_zoom، shake، lens_flare، particle_overlay. ملاحظة: استخدم نسب المسارات مع فلتر النصوص لتفادي مشكلة fontconfig، والأدوات تنفذ أوامر ffmpeg فعلية.",
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
              "speed_ramp",
              "watermark",
              "stabilize",
              "thumbnail",
              "convert",
              "crop_rotate",
              "filter",
              "color_grade",
              "audio_mix",
              "audio_duck",
              "normalize_audio",
              "subtitle_burn",
              "pip",
              "image_to_video",
              "split_screen",
              "reverse_video",
              "zoom",
              "legendary_transition",
              "auto_cut",
              "beat_sync",
              "thumbnail_grid",
              "gif_loop",
              "waveform",
              "progress_bar",
              "blur_face",
              "motion_blur",
              "denoise",
              "lens_correction",
              "timecode",
              "crop_detect",
              "scene_detect",
              "extract_audio",
              "glitch",
              "rgb_shift",
              "film_grain",
              "light_leaks",
              "film_burn",
              "scanlines",
              "chromatic_aberration",
              "pixelate_face",
              "vhs_effect",
              "crash_zoom",
              "shake",
              "lens_flare",
              "particle_overlay",
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
          // Speed ramp
          speed_points: tool.schema.string().optional().describe("نقاط السرعة: '0:1,5:2,10:0.5' = عند 0ث 1x، عند 5ث 2x، عند 10ث 0.5x"),
          // Color grade
          lut: tool.schema.string().optional().describe("مسار ملف LUT (.cube, .3dl)"),
          color_preset: tool.schema.enum(["cinematic", "teal-orange", "vintage", "bleach-bypass", "film-noir", "hdr", "log-to-rec709"]).optional().describe("Preset للتصنيف اللوني"),
          // Audio duck
          duck_amount: tool.schema.number().optional().describe("كمية التخفيض للموسيقى تحت الكلام 0-1، الافتراضي 0.2"),
          duck_attack: tool.schema.number().optional().describe("سرعة التخفيف بالثواني، الافتراضي 0.1"),
          duck_release: tool.schema.number().optional().describe("سرعة العودة بالثواني، الافتراضي 0.5"),
          // Normalize
          target_lufs: tool.schema.number().optional().describe("مستوى الهدف LUFS، الافتراضي -14 (YouTube/Spotify)"),
          true_peak: tool.schema.number().optional().describe("حد القمة الحقيقي، الافتراضي -1"),
          // Auto cut
          cut_threshold: tool.schema.number().optional().describe("عتبة كشف الصمت/تغيير المشهد 0-1، الافتراضي 0.3"),
          min_scene: tool.schema.number().optional().describe("أقل مدة مشهد بالثواني، الافتراضي 1"),
          // Beat sync
          bpm: tool.schema.number().optional().describe("BPM للإيقاع، الافتراضي 120"),
          // GIF loop
          loop_count: tool.schema.number().optional().describe("عدد التكرار، 0 = لا نهائي، الافتراضي 0"),
          // Waveform
          waveform_color: tool.schema.string().optional().describe("لون موجة الصوت، الافتراضي white"),
          waveform_bg: tool.schema.string().optional().describe("لون خلفية الموجة، الافتراضي black@0.5"),
          // Progress bar
          progress_color: tool.schema.string().optional().describe("لون شريط التقدم، الافتراضي red"),
          progress_height: tool.schema.number().optional().describe("ارتفاع شريط التقدم بالبيكسل، الافتراضي 4"),
          // Blur face
          blur_strength: tool.schema.number().optional().describe("قوة التمويه، الافتراضي 20"),
          // Denoise
          denoise_strength: tool.schema.number().optional().describe("قوة إزالة الضوضاء 0-1، الافتراضي 0.5"),
          // Lens correction
          k1: tool.schema.number().optional().describe("معامل التشويه الشعاعي k1"),
          k2: tool.schema.number().optional().describe("معامل التشويه الشعاعي k2"),
          // Scene detect
          scene_threshold: tool.schema.number().optional().describe("عتبة كشف المشهد 0-1، الافتراضي 0.4"),
          // Visual Effects
          intensity: tool.schema.number().optional().describe("شدة التأثير (glitch, shake) 0-1، الافتراضي 0.3"),
          amount: tool.schema.number().optional().describe("مقدار إزاحة RGB/Chromatic Aberration، الافتراضي 3-5"),
          strength: tool.schema.number().optional().describe("قوة حبيبات الفيلم، الافتراضي 10"),
          block_size: tool.schema.number().optional().describe("حجم كتلة البكسلنة، الافتراضي 20"),
          overlay: tool.schema.string().optional().describe("مسار فيديو التراكب (light_leaks, film_burn, lens_flare, particle_overlay)"),
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
              case "speed_ramp": {
                // Speed ramping: تغيير السرعة بمرور الوقت
                const points = a.speed_points ?? "0:1"
                const ptsStr = points.split(",").map((p: string) => {
                  const [t, s] = p.split(":").map(Number)
                  return `${t}*TB/${s}`
                }).join(",")
                cmd = `${ff()} -i ${QUOT(inP)} -vf "setpts='${ptsStr}'" -af "atempo=1" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "color_grade": {
                // تصنيف لوني متقدم
                let vf = "eq=contrast=1.1:brightness=0.02:saturation=1.2"
                if (a.lut) {
                  vf = `lut3d=${QUOT(a.lut)}`
                } else if (a.color_preset) {
                  const presets: Record<string, string> = {
                    cinematic: "eq=contrast=1.15:brightness=0.03:saturation=1.15,colorbalance=rs=0.05:gs=0.02:bs=-0.05",
                    "teal-orange": "eq=contrast=1.1:saturation=1.2,colorbalance=rs=0.1:gs=0:bs=-0.1",
                    vintage: "eq=contrast=0.9:brightness=0.05:saturation=0.7:gamma=1.1,colorbalance=rs=0.15:gs=0.05:bs=-0.1",
                    "bleach-bypass": "eq=contrast=1.3:brightness=-0.05:saturation=0.5,hue=s=0.6",
                    "film-noir": "hue=s=0,eq=contrast=1.5:brightness=-0.1",
                    hdr: "zscale=t=linear:npl=100,tonemap=hable,zscale=t=bt709:npl=100",
                    "log-to-rec709": "zscale=t=linear:npl=100,tonemap=hable,zscale=t=bt709:npl=100",
                  }
                  vf = presets[a.color_preset] ?? vf
                }
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${vf}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "audio_duck": {
                // تخفيض الموسيقى تحت الكلام
                const duck = a.duck_amount ?? 0.2
                const attack = a.duck_attack ?? 0.1
                const release = a.duck_release ?? 0.5
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(a.music)} -filter_complex "[1:a]volume=${duck},asidedata=mode=select:metadata=sidechain[ducked];[0:a][ducked]sidechaincompress=threshold=0.1:ratio=20:attack=${attack}:release=${release}[a]" -map "0:v" -map "[a]" -c:v copy -c:a aac ${QUOT(out)}`
                break
              }
              case "normalize_audio": {
                // تطبيع الصوت EBU R128
                const target = a.target_lufs ?? -14
                const tp = a.true_peak ?? -1
                // 2-pass: تحليل ثم تطبيع
                const stats = `${path.dirname(out)}/audio_stats.json`
                const pass1 = await $`${ff()} -i ${QUOT(inP)} -af "loudnorm=I=${target}:TP=${tp}:LRA=11:print_format=json" -f null -`.quiet()
                const match = pass1.stderr?.toString?.().match(/\{[\s\S]*\}/)
                let measured_I = target, measured_TP = tp, measured_LRA = 11, measured_thresh = -20, offset = 0
                if (match) {
                  try {
                    const j = JSON.parse(match[0])
                    measured_I = j.input_i
                    measured_TP = j.input_tp
                    measured_LRA = j.input_lra
                    measured_thresh = j.input_thresh
                    offset = j.target_offset
                  } catch {}
                }
                cmd = `${ff()} -i ${QUOT(inP)} -af "loudnorm=I=${target}:TP=${tp}:LRA=11:measured_I=${measured_I}:measured_TP=${measured_TP}:measured_LRA=${measured_LRA}:measured_thresh=${measured_thresh}:offset=${offset}:linear=true:print_format=summary" -c:v copy -c:a aac ${QUOT(out)}`
                break
              }
              case "auto_cut": {
                // قص تلقائي عند الصمت أو تغيير المشهد
                const threshold = a.cut_threshold ?? 0.3
                const minScene = a.min_scene ?? 1
                // استخدام silencedetect و scene لتوليد نقاط القص
                cmd = `${ff()} -i ${QUOT(inP)} -af "silencedetect=n=${threshold}dB:d=${minScene}" -f null - 2>&1 | grep -E "silence_(start|end)"`
                break
              }
              case "beat_sync": {
                // قص على إيقاع الموسيقى (BPM)
                const bpm = a.bpm ?? 120
                const beatDur = 60 / bpm
                const probe = await $`ffprobe -v error -show_entries format=duration -of csv=p=0 ${inP}`.quiet()
                const dur = parseFloat((probe.stdout?.toString?.() ?? "0").trim()) || 0
                const cuts = []
                for (let t = 0; t < dur; t += beatDur) cuts.push(t.toFixed(2))
                cmd = `echo "نقاط القص على الإيقاع (${bpm} BPM): ${cuts.join(", ")}"`
                break
              }
              case "thumbnail_grid": {
                // شبكة صور مصغرة (contact sheet)
                const cols = 4
                const rows = 3
                const count = cols * rows
                const probe = await $`ffprobe -v error -show_entries format=duration -of csv=p=0 ${inP}`.quiet()
                const dur = parseFloat((probe.stdout?.toString?.() ?? "0").trim()) || 0
                const step = dur / (count + 1)
                const selects = []
                for (let i = 1; i <= count; i++) selects.push(`gte(t,${(i * step).toFixed(2)})`)
                const sel = selects.join("+")
                cmd = `${ff()} -i ${QUOT(inP)} -vf "select='${sel}',scale=320:180,tile=${cols}x${rows}" -frames:v 1 -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              }
              case "gif_loop": {
                // GIF متكرر بسلاسة
                const loops = a.loop_count ?? 0
                const dur = a.duration ?? 4
                const palette = `${path.dirname(out)}/palette.png`
                const pass1 = await $`${ff()} -i ${QUOT(inP)} -vf "fps=15,scale=480:-1:flags=lanczos,palettegen=max_colors=256" ${QUOT(palette)}`.quiet()
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(palette)} -filter_complex "fps=15,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" -loop ${loops} ${QUOT(out)}`
                try { fs.unlinkSync(palette) } catch {}
                break
              }
              case "waveform": {
                // رسم موجة الصوت على الفيديو
                const wColor = a.waveform_color ?? "white"
                const bgColor = a.waveform_bg ?? "black@0.5"
                cmd = `${ff()} -i ${QUOT(inP)} -filter_complex "[0:a]showwaves=s=1920x200:mode=line:rate=30:colors=${wColor}[wv];[0:v][wv]overlay=0:H-h:format=auto,drawbox=y=H-h:w=iw:h=200:color=${bgColor}:t=fill" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "progress_bar": {
                // شريط تقدم في أسفل الفيديو
                const pColor = a.progress_color ?? "red"
                const pHeight = a.progress_height ?? 4
                cmd = `${ff()} -i ${QUOT(inP)} -vf "drawbox=y=H-${pHeight}:w='w*t/duration':h=${pHeight}:color=${pColor}:t=fill" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "blur_face": {
                // تمويه الوجوه (يحتاج face detection)
                const strength = a.blur_strength ?? 20
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='if(gt(abs(X-W/2),W/4)*gt(abs(Y-H/2),H/4),lum,boxblur=${strength}:1)'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "motion_blur": {
                // إضافة motion blur
                cmd = `${ff()} -i ${QUOT(inP)} -vf "tmix=frames=5:weights=1 1 1 1 1" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "denoise": {
                // إزالة ضوضاء الفيديو
                const strength = a.denoise_strength ?? 0.5
                const sigma = Math.round(strength * 20)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "hqdn3d=${sigma}:${sigma}:6:6" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "lens_correction": {
                // تصحيح تشويه العدسة
                const k1v = a.k1 ?? 0
                const k2v = a.k2 ?? 0
                cmd = `${ff()} -i ${QUOT(inP)} -vf "lenscorrection=k1=${k1v}:k2=${k2v}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "timecode": {
                // حرق timecode على الفيديو
                cmd = `${ff()} -i ${QUOT(inP)} -vf "drawtext=fontfile='C:/Windows/Fonts/consola.ttf':text='%{pts\\:hms}':fontsize=36:fontcolor=white:borderw=2:bordercolor=black:x=20:y=20" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "crop_detect": {
                // كشف حواف القص التلقائي
                cmd = `${ff()} -i ${QUOT(inP)} -vf "cropdetect=24:16:0" -f null - 2>&1 | tail -1`
                break
              }
              case "scene_detect": {
                // كشف تغييرات المشهد
                const threshold = a.scene_threshold ?? 0.4
                cmd = `${ff()} -i ${QUOT(inP)} -vf "select='gt(scene,${threshold})',showinfo" -f null - 2>&1 | grep "pts_time"`
                break
              }
              case "extract_audio": {
                // استخراج الصوت فقط
                const fmt = a.format ?? "mp3"
                if (fmt === "mp3") cmd = `${ff()} -i ${QUOT(inP)} -vn -acodec libmp3lame -q:a 2 ${QUOT(out)}`
                else if (fmt === "wav") cmd = `${ff()} -i ${QUOT(inP)} -vn -acodec pcm_s16le ${QUOT(out)}`
                else if (fmt === "aac") cmd = `${ff()} -i ${QUOT(inP)} -vn -acodec aac -b:a 256k ${QUOT(out)}`
                else cmd = `${ff()} -i ${QUOT(inP)} -vn -acodec libmp3lame -q:a 2 ${QUOT(out)}`
                break
              }
              case "glitch": {
                // تأثير غلتيش رقمي
                const intensity = a.intensity ?? 0.3
                const duration = a.duration ?? 1
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=r='r(X+${Math.round(intensity*10)},Y)':g='g(X,Y)':b='b(X-${Math.round(intensity*10)},Y)':a='if(gt(random(0),${1-intensity}),0,alpha)',sendcmd='${duration} geq r=0 g=0 b=0'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "rgb_shift": {
                // إزاحة قنوات RGB (Chromatic Aberration)
                const amount = a.amount ?? 3
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=r='r(X+${amount},Y)':g='g(X,Y)':b='b(X-${amount},Y)'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "film_grain": {
                // حبيبات فيلم
                const strength = a.strength ?? 10
                cmd = `${ff()} -i ${QUOT(inP)} -vf "noise=alls=${strength}:allf=t" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "light_leaks": {
                // تسربات ضوء (overlay مع blend mode)
                const overlay = a.overlay ?? `${BASE}/Content creation/Backgrounds/Video Loops/light_leak.mp4`
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(overlay)} -filter_complex "[1:v]scale=1920:1080,format=rgba,colorchannelmixer=aa=0.3[ol];[0:v][ol]overlay=0:0:format=auto,blend=all_mode='screen'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "film_burn": {
                // حرق فيلم (overlay مع blend)
                const overlay = a.overlay ?? `${BASE}/Content creation/Backgrounds/Video Loops/film_burn.mp4`
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(overlay)} -filter_complex "[1:v]scale=1920:1080,format=rgba,colorchannelmixer=aa=0.4[ol];[0:v][ol]overlay=0:0:format=auto,blend=all_mode='overlay'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "scanlines": {
                // خطوط مسح CRT (باستخدام drawbox بدلاً من geq)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "drawbox=y=0:w=iw:h=2:color=black@0.4:t=fill,drawbox=y=4:w=iw:h=2:color=black@0.4:t=fill,drawbox=y=8:w=iw:h=2:color=black@0.4:t=fill,drawbox=y=12:w=iw:h=2:color=black@0.4:t=fill" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "chromatic_aberration": {
                // انحراف لوني (مثل rgb_shift لكن أقوى)
                const amount = a.amount ?? 5
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=r='r(X+${amount},Y)':g='g(X,Y)':b='b(X-${amount},Y)',boxblur=1:1" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "pixelate_face": {
                // بكسلنة وجوه (بسيط - منطقة وسط)
                const blockSize = a.block_size ?? 20
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='if(gt(abs(X-W/2),W/6)*gt(abs(Y-H/2),H/6),lum,if(gt(mod(X,${blockSize}),${blockSize/2})*gt(mod(Y,${blockSize}),${blockSize/2}),lum(X-${blockSize},Y-${blockSize}),lum))'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "vhs_effect": {
                // تأثير VHS كامل
                cmd = `${ff()} -i ${QUOT(inP)} -vf "noise=alls=8:allf=t,eq=contrast=1.1:saturation=0.8,hue=h=10,lenscorrection=k1=-0.02" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "crash_zoom": {
                // Crash Zoom (زوم سريع جداً مع motion blur)
                const zoom = a.zoom ?? 3
                const duration = a.zoom_duration ?? 0.2
                const probe = await $`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 ${inP}`.quiet()
                const dims = (probe.stdout?.toString?.() ?? "0,0").trim().split(",").map((s) => parseInt(s.trim(), 10))
                const srcW = dims[0] || 1366
                const srcH = dims[1] || 768
                const outW = a.width && a.width > 0 ? a.width : srcW
                const outH = a.height && a.height > 0 ? a.height : srcH
                const zw = Math.floor((outW * zoom) / 2) * 2
                const zh = Math.floor((outH * zoom) / 2) * 2
                const cx = a.center_x ?? 0.5
                const cy = a.center_y ?? 0.5
                const offx = Math.round(cx * (zw - outW))
                const offy = Math.round(cy * (zh - outH))
                cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=${zw}:${zh},crop=${outW}:${outH}:${offx}:${offy},tmix=frames=3:weights=1 1 1" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "shake": {
                // اهتزاز الكاميرا (Camera Shake)
                const intensity = a.intensity ?? 10
                cmd = `${ff()} -i ${QUOT(inP)} -vf "crop=iw-${intensity*2}:ih-${intensity*2}:${intensity}*sin(t*30):${intensity}*cos(t*25)" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "lens_flare": {
                // توهج عدسة (Lens Flare)
                const overlay = a.overlay ?? `${BASE}/Content creation/Backgrounds/Video Loops/lens_flare.mp4`
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(overlay)} -filter_complex "[1:v]scale=1920:1080,format=rgba,colorchannelmixer=aa=0.5[ol];[0:v][ol]overlay=0:0:format=auto,blend=all_mode='screen'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "particle_overlay": {
                // جسيمات فوق الفيديو (ثلج، غبار، شرر)
                const overlay = a.overlay ?? `${BASE}/Content creation/Backgrounds/Video Loops/particles.mp4`
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(overlay)} -filter_complex "[1:v]scale=1920:1080,format=rgba,colorchannelmixer=aa=0.4[ol];[0:v][ol]overlay=0:0:format=auto,blend=all_mode='add'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
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

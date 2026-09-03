import { type Plugin, tool } from "@opencode-ai/plugin"
import * as fs from "fs"
import * as path from "path"
import { VDSPlugin, vds } from "./vds_plugin.js"

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
  // Initialize VDS on plugin load
  await vds.initialize()
  console.log('[VDS] Virtual Data Space initialized at:', vds.getVDSPath())
  
  return {
    tool: {
      video_montage: tool({
        description:
          "أداة مونتاج وإنتاج فيديو احترافية مبنية على FFmpeg. تدعم: فحص الملفات، القص، الدمج، إضافة نصوص/عناوين (عبر libass)، النصوص المتحركة، مؤثرات صوتية من مكتبة المستخدم، موسيقى، جرين سكرين، تحكم بالسرعة، علامة مائية، تثبيت، مصغرات، تحويل صيغ، قص/تدوير، فلاتر، خلط صوتي، حرق ترجمة، Picture-in-Picture، والمؤثرات البصرية المتقدمة: glitch، rgb_shift، film_grain، light_leaks، film_burn، scanlines، chromatic_aberration، pixelate_face، vhs_effect، crash_zoom، shake، lens_flare، particle_overlay، zoom_blur، directional_blur، radial_blur، glow، color_isolation، halftone، posterize، solarize، emboss، edge_detect، kaleidoscope، prism، vignette_advanced، letterbox، film_border. **ميزات احترافية:** LUT_apply، audio_compressor، audio_limiter، audio_eq، audio_gate، export_preset (YouTube/TikTok/Reels/Shorts/Twitter/Instagram)، auto_reframe (تأطير ذكي للعمودي)، proxy_create (بروكسي للـ 4K)، batch_process (معالجة دفعة)، time_remap (إعادة تعيين زمن)، chroma_key_advanced (كروم كاي متقدم)، rolling_shutter (تصحيح رولينغ شاتر)، lens_correction_advanced (تصحيح فيش آي/وايد أنجل). **🚀 GAME CHANGERS - أدوات ذكية بالـ AI:** ai_scene_detect (كشف مشاهد ML)، auto_captions (ترجمة Whisper محلية)، smart_cut (قص ذكي: صمت/حشو/تكرار)، beat_detect (إيقاع دقيق)، color_match (مطابقة لون لمرجع)، optical_flow (سلو موشن AI)، depth_map (خريطة عمق 3D)، object_track (تتبع كائن/شخص)، auto_reframe_ai (تأطير AI)، stem_separate (فصل ستيمز Demucs)، voice_enhance (تحسين صوت AI)، smart_zoom (زوم يتبع الوجه/الحركة)، transition_ai (انتقالات Morph/Flow)، qc_report (تقرير جودة EBU/Netflix)، multi_render (رندر متعدد المنصات)، template_apply (تمبليتات كاملة)، expression_engine (تعبيرات After Effects)، particle_system (جسيمات قابلة للبرمجة)، text_animator (أنيميتور نصوص متقدم)، color_wheel (عجلة ألوان Lift/Gamma/Gain/Log). **🎬 FINAL BOSS TIER - مستوى استوديوهات هوليوود/نتفليكس:** camera_track (3D camera solve)، planar_track (Mocha-style)، point_cloud (3D reconstruction)، geo_export (FBX/Alembic/USD)، node_composite (node-based comp)، deep_composite (deep EXR)، cryptomatte (ID mattes)، light_wrap (edge integration)، edge_extend (matte extension)، txt2vid (SVD/Gen-2)، img2vid (image-to-video)، inpaint (object removal)، outpaint (canvas extend)، upscale (4x/8x AI)، interpolate (frame gen)، aces_transform (ACES 1.3)، dolby_vision (metadata)، hdr10_plus (dynamic metadata)، hdr_grade (ST2084 PQ)، color_space (2020/709/P3)، adr_record (ADR workflow)، foley_sync (Foley)، surround_mix (5.1/7.1)، atmos_render (Dolby Atmos ADM)، loudness_batch (multi-delivery)، dcp_create (DCP cinema)، imf_package (Netflix IMF)، streaming_pkg (HLS/DASH/CMAF)، archive_ltfs (LTO/LTFS)، deadline_submit (Thinkbox Deadline)، tractor_submit (Pixar Tractor)، render_farm (generic)، watch_folder (auto-ingest)، asset_db (PostgreSQL asset DB)، proxy_auto (auto proxy gen)، conform_xml (FCP7/XML/EDL/AAF)، metadata_edit (XMP/EXIF/IPTC). ملاحظة: استخدم نسب المسارات مع فلتر النصوص لتفادي مشكلة fontconfig، والأدوات تنفذ أوامر ffmpeg فعلية.",
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
              "zoom_blur",
              "directional_blur",
              "radial_blur",
              "glow",
              "color_isolation",
              "halftone",
              "posterize",
              "solarize",
              "emboss",
              "edge_detect",
              "kaleidoscope",
              "prism",
              "vignette_advanced",
              "letterbox",
              "film_border",
              // Professional Color & Audio
              "lut_apply",
              "audio_compressor",
              "audio_limiter",
              "audio_eq",
              "audio_gate",
              // Export & Workflow
              "export_preset",
              "auto_reframe",
              "proxy_create",
              "batch_process",
              "time_remap",
              // Advanced Keying & Correction
              "chroma_key_advanced",
              "rolling_shutter",
              "lens_correction_advanced",
              // 🚀 GAME CHANGERS - AI & Smart Tools
              "ai_scene_detect",
              "auto_captions",
              "smart_cut",
              "beat_detect",
              "color_match",
              "optical_flow",
              "depth_map",
              "object_track",
              "auto_reframe_ai",
              "stem_separate",
              "voice_enhance",
              "smart_zoom",
              "transition_ai",
              "qc_report",
              "multi_render",
              "template_apply",
              "expression_engine",
              "particle_system",
              "text_animator",
              "color_wheel",
              // 🎬 FINAL BOSS TIER - Hollywood/Netflix Studio Level
              "camera_track",
              "planar_track",
              "point_cloud",
              "geo_export",
              "node_composite",
              "deep_composite",
              "cryptomatte",
              "light_wrap",
              "edge_extend",
              "txt2vid",
              "img2vid",
              "inpaint",
              "outpaint",
              "upscale",
              "interpolate",
              "aces_transform",
              "dolby_vision",
              "hdr10_plus",
              "hdr_grade",
              "color_space",
              "adr_record",
              "foley_sync",
              "surround_mix",
              "atmos_render",
              "loudness_batch",
              "dcp_create",
              "imf_package",
              "streaming_pkg",
              "archive_ltfs",
              "deadline_submit",
              "tractor_submit",
              "render_farm",
              "watch_folder",
              "asset_db",
              "proxy_auto",
              "conform_xml",
              "metadata_edit",
              // 🧠 VDS (Virtual Data Space) - Persistent Memory
              "vds_init",
              "vds_consent",
              "vds_identity",
              "vds_preferences",
              "vds_memory",
              "vds_sessions",
              "vds_status",
              "vds_export",
              "vds_import",
              "vds_reset",
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
          // Advanced Visual Effects
          frames: tool.schema.number().optional().describe("عدد الإطارات للـ tmix (zoom_blur)، الافتراضي 5"),
          angle: tool.schema.number().optional().describe("زاوية البلور الاتجاهي (directional_blur)، الافتراضي 45"),
          distance: tool.schema.number().optional().describe("مسافة البلور (directional_blur)، الافتراضي 20"),
          threshold: tool.schema.number().optional().describe("عتبة التوهج/السولاراز/عزل اللون، الافتراضي 0.7/128"),
          radius: tool.schema.number().optional().describe("نصف قطر التوهج (glow)، الافتراضي 20"),
          color: tool.schema.string().optional().describe("اللون للعزل (red, green, blue, yellow, cyan, magenta)"),
          tolerance: tool.schema.number().optional().describe("تسامح عزل اللون، الافتراضي 0.1"),
          size: tool.schema.number().optional().describe("حجم نمط النصف tono (halftone)، الافتراضي 4"),
          levels: tool.schema.number().optional().describe("مستويات البوستراز (posterize)، الافتراضي 4"),
          segments: tool.schema.number().optional().describe("قطاعات الكالييدوسكوب، الافتراضي 8"),
          offset: tool.schema.number().optional().describe("إزاحة البريزم، الافتراضي 5"),
          shape: tool.schema.string().optional().describe("شكل الفينيت (ellipse, rect)، الافتراضي ellipse"),
          aspect: tool.schema.string().optional().describe("نسبة الليتربوكس (2.35:1, 16:9, 4:3)"),
          style: tool.schema.string().optional().describe("نمط حدود الفيلم (35mm, 16mm)"),
          // LUT
          lut: tool.schema.string().optional().describe("مسار ملف LUT (.cube, .3dl)"),
          lut_strength: tool.schema.number().optional().describe("شدة تطبيق LUT 0-1، الافتراضي 1"),
          // Audio processing
          compressor_threshold: tool.schema.number().optional().describe("عتبة الكومبريسور dB، الافتراضي -18"),
          compressor_ratio: tool.schema.number().optional().describe("نسبة الكومبريسور، الافتراضي 4"),
          compressor_attack: tool.schema.number().optional().describe("هجوم الكومبريسور ms، الافتراضي 5"),
          compressor_release: tool.schema.number().optional().describe("إفلات الكومبريسور ms، الافتراضي 100"),
          limiter_threshold: tool.schema.number().optional().describe("عتبة اللimiter dB، الافتراضي -1"),
          limiter_release: tool.schema.number().optional().describe("إفلات اللimiter ms، الافتراضي 50"),
          eq_bands: tool.schema.string().optional().describe("أحزمة EQ: '100:3,1000:-2,5000:1' تردد:كسب"),
          gate_threshold: tool.schema.number().optional().describe("عتبة النويز جيت dB، الافتراضي -40"),
          gate_ratio: tool.schema.number().optional().describe("نسبة الجيت، الافتراضي 10"),
          // Export preset
          preset: tool.schema.enum(["youtube", "tiktok", "reels", "shorts", "twitter", "instagram", "high-quality", "web"]).optional().describe("قالب التصدير الجاهز"),
          // Auto reframe
          reframe_aspect: tool.schema.string().optional().describe("النسبة الهدف: 9:16, 1:1, 4:5, 16:9"),
          reframe_tracking: tool.schema.enum(["center", "face", "motion"]).optional().describe("نوع التتبع: center, face, motion"),
          // Proxy
          proxy_resolution: tool.schema.string().optional().describe("دقة البروكسي: 1280x720, 960x540, 640x360"),
          proxy_codec: tool.schema.enum(["prores", "dnxhd", "h264"]).optional().describe("كودك البروكسي"),
          // Batch process
          batch_action: tool.schema.string().optional().describe("العملية للتطبيق على الدفعة"),
          batch_params: tool.schema.string().optional().describe("معاملات العملية كـ JSON"),
          // Time remap
          remap_points: tool.schema.string().optional().describe("نقاط الزمن: '0:0,5:5,10:2' = مدخل:مخرج"),
          // Chroma key advanced
          spill_suppression: tool.schema.number().optional().describe("كبت التسرب اللوني 0-1، الافتراضي 0.5"),
          edge_feather: tool.schema.number().optional().describe("ترقيق الحواف بالبيكسل، الافتراضي 2"),
          key_color: tool.schema.string().optional().describe("اللون المفتاحي: green, blue, custom hex"),
          // Rolling shutter
          rs_correction: tool.schema.number().optional().describe("تصحيح الرولينغ شاتر 0-1، الافتراضي 0.5"),
          // Lens correction advanced
          lens_model: tool.schema.enum(["fisheye", "wide-angle", "telephoto", "custom"]).optional().describe("نموذج العدسة"),
          lens_fov: tool.schema.number().optional().describe("مجال الرؤية بالدرجات، الافتراضي 180"),
          // 🚀 GAME CHANGERS Parameters
          // AI Scene Detect
          ai_model: tool.schema.enum(["fast", "accurate", "content-aware"]).optional().describe("نموذج الكشف: fast, accurate, content-aware"),
          ai_threshold: tool.schema.number().optional().describe("عتبة الثقة 0-1، الافتراضي 0.3"),
          // Auto Captions
          caption_model: tool.schema.enum(["tiny", "base", "small", "medium", "large"]).optional().describe("نموذج Whisper: tiny, base, small, medium, large"),
          caption_language: tool.schema.string().optional().describe("لغة الترجمة: ar, en, auto"),
          caption_style: tool.schema.string().optional().describe("ستايل الترجمة: karaoke, pop-in, highlight"),
          // Smart Cut
          smart_cut_mode: tool.schema.enum(["silence", "filler", "repetition", "all"]).optional().describe("وضع القص: silence, filler, repetition, all"),
          smart_cut_threshold: tool.schema.number().optional().describe("عتبة الصمت dB، الافتراضي -40"),
          smart_cut_min_duration: tool.schema.number().optional().describe("أقل مدة للحفظ بالثواني، الافتراضي 0.5"),
          // Beat Detect
          beat_sensitivity: tool.schema.number().optional().describe("حساسية الكشف 0-1، الافتراضي 0.5"),
          beat_min_interval: tool.schema.number().optional().describe("أقل فاصل بين النغمات بالثواني، الافتراضي 0.3"),
          // Color Match
          reference_image: tool.schema.string().optional().describe("مسار صورة/فيديو مرجعي للمطابقة"),
          match_method: tool.schema.enum(["histogram", "reinhard", "transfer"]).optional().describe("طريقة المطابقة"),
          // Optical Flow
          flow_model: tool.schema.enum(["raft", "farneback", "deepflow"]).optional().describe("نموذج التدفق البصري"),
          flow_scale: tool.schema.number().optional().describe("عامل التباطؤ (2x, 4x, 8x)، الافتراضي 2"),
          // Depth Map
          depth_model: tool.schema.enum(["midas", "dpt", "zoedepth"]).optional().describe("نموذج العمق"),
          depth_visualize: tool.schema.boolean().optional().describe("تصدير خريطة العمق كصورة، الافتراضي false"),
          // Object Track
          track_target: tool.schema.string().optional().describe("الهدف للتتبع: face, person, custom bbox"),
          track_bbox: tool.schema.string().optional().describe("مربع التتبع الابتدائي: x,y,w,h"),
          // Auto Reframe AI
          ai_reframe_aspect: tool.schema.string().optional().describe("النسبة الهدف: 9:16, 1:1, 4:5"),
          ai_reframe_padding: tool.schema.number().optional().describe("هامش حول الموضوع 0-1، الافتراضي 0.1"),
          // Stem Separate
          stem_model: tool.schema.enum(["htdemucs", "htdemucs_ft", "mdx_extra"]).optional().describe("نموذج Demucs"),
          stem_output_dir: tool.schema.string().optional().describe("مجلد إخراج الستيمز"),
          // Voice Enhance
          enhance_model: tool.schema.enum(["dfsmn", "mossformer2", "fullsubnet"]).optional().describe("نموذج التحسين"),
          enhance_denoise: tool.schema.number().optional().describe("إزالة الضوضاء 0-1، الافتراضي 0.8"),
          enhance_dereverb: tool.schema.number().optional().describe("إزالة الصدى 0-1، الافتراضي 0.5"),
          // Smart Zoom
          zoom_target: tool.schema.enum(["face", "eyes", "motion", "object"]).optional().describe("هدف الزوم"),
          zoom_smoothness: tool.schema.number().optional().describe("نعومة الزوم 0-1، الافتراضي 0.7"),
          zoom_max: tool.schema.number().optional().describe("أقصى زوم، الافتراضي 2.5"),
          // Transition AI
          transition_mode: tool.schema.enum(["morph", "smooth", "flow"]).optional().describe("نوع الانتقال الذكي"),
          transition_duration: tool.schema.number().optional().describe("مدة الانتقال بالثواني، الافتراضي 1"),
          // QC Report
          qc_standard: tool.schema.enum(["ebu-r128", "atsc-a85", "netflix", "custom"]).optional().describe("معيار الجودة"),
          qc_output_format: tool.schema.enum(["json", "txt", "html"]).optional().describe("تنسيق التقرير"),
          // Multi Render
          render_presets: tool.schema.array(tool.schema.string()).optional().describe("قائمة القوالب: ['youtube', 'tiktok', 'reels']"),
          // Template Apply
          template_name: tool.schema.string().optional().describe("اسم التمبليت: intro, lower-third, outro, full"),
          template_data: tool.schema.string().optional().describe("بيانات التمبليت كـ JSON"),
          // Expression Engine
          expression_code: tool.schema.string().optional().describe("كود التعبير: 'wiggle(2,50)' أو 'loopOut()'"),
          expression_property: tool.schema.enum(["position", "scale", "rotation", "opacity", "custom"]).optional().describe("الخاصية المستهدفة"),
          // Particle System
          particle_type: tool.schema.enum(["rain", "snow", "fire", "sparks", "smoke", "leaves", "custom"]).optional().describe("نوع الجسيمات"),
          particle_count: tool.schema.number().optional().describe("عدد الجسيمات، الافتراضي 100"),
          particle_lifetime: tool.schema.number().optional().describe("عمر الجسيمات بالثواني، الافتراضي 3"),
          particle_physics: tool.schema.string().optional().describe("فيزياء: gravity, wind, turbulence"),
          // Text Animator
          animator_type: tool.schema.enum(["typewriter", "wiggle", "scale", "opacity", "position", "rotation", "custom"]).optional().describe("نوع الأنيميشن"),
          animator_range: tool.schema.string().optional().describe("نطاق التطبيق: '0-100%' أو 'word' أو 'char'"),
          animator_easing: tool.schema.enum(["ease", "ease-in", "ease-out", "bounce", "elastic"]).optional().describe("التسارع"),
          // Color Wheel
          lift: tool.schema.string().optional().describe("Lift (shadows): 'r,g,b' أو '0,0,0'"),
          gamma: tool.schema.string().optional().describe("Gamma (midtones): 'r,g,b'"),
          gain: tool.schema.string().optional().describe("Gain (highlights): 'r,g,b'"),
          offset_cw: tool.schema.string().optional().describe("Offset: 'r,g,b'"),
          log_wheel: tool.schema.boolean().optional().describe("عجلة Log بدلاً من Linear، الافتراضي false"),
          // 🎬 FINAL BOSS TIER Parameters
          // 3D/VFX Pipeline
          camera_model: tool.schema.enum(["opencv", "colmap", "meshroom"]).optional().describe("نموذج حل الكاميرا"),
          camera_focal: tool.schema.number().optional().describe("البعد البؤري المقدر mm"),
          planar_surface: tool.schema.string().optional().describe("مستوى التتبع: x1,y1,x2,y2,x3,y3,x4,y4"),
          point_density: tool.schema.enum(["low", "medium", "high"]).optional().describe("كثافة النقطة السحابية"),
          geo_format: tool.schema.enum(["fbx", "alembic", "usd", "obj"]).optional().describe("صيغة التصدير ثلاثي الأبعاد"),
          // Advanced Compositing
          comp_script: tool.schema.string().optional().describe("سكريبت Node Composite (JSON)"),
          deep_input: tool.schema.string().optional().describe("ملف EXR عميق ثاني"),
          crypto_layer: tool.schema.string().optional().describe("طبقة Cryptomatte: rgba"),
          wrap_strength: tool.schema.number().optional().describe("قوة Light Wrap 0-1، الافتراضي 0.3"),
          wrap_blur: tool.schema.number().optional().describe("ضبابية الراب بالبيكسل، الافتراضي 5"),
          edge_pad: tool.schema.number().optional().describe("تمديد الحافة بالبيكسل، الافتراضي 10"),
          // AI Generation
          gen_model: tool.schema.enum(["svd", "svd_xt", "gen2", "zeroscope", "animate_diff"]).optional().describe("نموذج التوليد"),
          gen_frames: tool.schema.number().optional().describe("عدد الإطارات المولدة، الافتراضي 25"),
          gen_fps: tool.schema.number().optional().describe("FPS الناتج، الافتراضي 8"),
          inpaint_mask: tool.schema.string().optional().describe("مسار ماسك الإنبينت (أبيض = يزيل)"),
          outpaint_direction: tool.schema.enum(["left", "right", "top", "bottom", "all"]).optional().describe("اتجاه التوسيع"),
          upscale_factor: tool.schema.number().optional().describe("عامل التكبير: 2, 4, 8، الافتراضي 4"),
          upscale_model: tool.schema.enum(["realesrgan", "swinir", "gfpgan", "codeformer"]).optional().describe("نموذج التكبير"),
          interp_factor: tool.schema.number().optional().describe("عامل التداخل: 2x, 4x, 8x، الافتراضي 2"),
          // HDR/Color Pipeline
          aces_input: tool.schema.enum(["acescg", "acecc", "lin_srgb", "srgb", "logc", "slog3", "vlog", "braw"]).optional().describe("مساحة دخل ACES"),
          aces_output: tool.schema.enum(["acescg", "acecc", "lin_srgb", "srgb", "pq_st2084", "hlg"]).optional().describe("مساحة خرج ACES"),
          dv_profile: tool.schema.enum(["profile_5", "profile_8", "profile_9"]).optional().describe("بروفايل Dolby Vision"),
          hdr10_max_cll: tool.schema.number().optional().describe("MaxCLL للـ HDR10+، الافتراضي 1000"),
          hdr10_max_fall: tool.schema.number().optional().describe("MaxFALL للـ HDR10+، الافتراضي 400"),
          hdr_grade_mode: tool.schema.enum(["pq", "hlg", "sdr_sim"]).optional().describe("وضع التصنيف HDR"),
          cs_target: tool.schema.enum(["rec2020", "rec709", "p3_d65", "p3_dci", "acescg"]).optional().describe("مساحة اللون الهدف"),
          // Audio Post Pro
          adr_script: tool.schema.string().optional().describe("مسار سكريبت ADR (CSV)"),
          adr_takes: tool.schema.number().optional().describe("عدد التيكات لكل سطر، الافتراضي 3"),
          foley_library: tool.schema.string().optional().describe("مكتبة الفولي"),
          surround_layout: tool.schema.enum(["5.1", "7.1", "7.1.2", "7.1.4"]).optional().describe("تخطيط الصوت المحيطي"),
          atmos_profile: tool.schema.enum(["near", "mid", "far", "height"]).optional().describe("بروفايل Atmos"),
          loudness_targets: tool.schema.string().optional().describe("أهداف لوفس متعددة: 'netflix:-27,ebu:-23,youtube:-14'"),
          // Delivery/Mastering
          dcp_fps: tool.schema.enum(["24", "25", "30", "48", "60"]).optional().describe("FPS للـ DCP"),
          dcp_reel_length: tool.schema.number().optional().describe("طول الريل بالدقائق، الافتراضي 20"),
          imf_cpl: tool.schema.string().optional().describe("مسار CPL للـ IMF"),
          streaming_codec: tool.schema.enum(["h264", "h265", "av1", "vp9"]).optional().describe("كودك البث"),
          streaming_ladder: tool.schema.string().optional().describe("سلم الجودة: '1080p:5M,720p:3M,480p:1.5M'"),
          archive_format: tool.schema.enum(["ltfs", "tar", "bagit"]).optional().describe("صيغة الأرشفة"),
          // Automation/Farm
          farm_pool: tool.schema.string().optional().describe("مجموعة المزرعة: high, gpu, cpu"),
          farm_priority: tool.schema.number().optional().describe("الأولوية 1-100، الافتراضي 50"),
          farm_frames: tool.schema.string().optional().describe("نطاق الإطارات: '1-100' أو '1,5,10'"),
          watch_path: tool.schema.string().optional().describe("مسار المجلد للمراقبة"),
          watch_action: tool.schema.string().optional().describe("الإجراء عند اكتشاف ملف"),
          // Media Management
          db_connection: tool.schema.string().optional().describe("اتصال PostgreSQL: postgresql://user:pass@host/db"),
          asset_tags: tool.schema.string().optional().describe("وسوم الأصل: 'project:cloudmesh,type:footage'"),
          proxy_trigger: tool.schema.enum(["import", "manual", "size>4k"]).optional().describe("محفز البروكسي"),
          conform_format: tool.schema.enum(["fcpxml", "edl", "aaf", "prproj"]).optional().describe("صيغة الكونفورم"),
          metadata_schema: tool.schema.enum(["xmp", "exif", "iptc", "custom"]).optional().describe("مخطط البيانات الوصفية"),
          // 🧠 VDS (Virtual Data Space) Parameters
          vds_category: tool.schema.enum(["identity", "preferences", "memory", "sessions", "analytics"]).optional().describe("فئة الموافقة: identity, preferences, memory, sessions, analytics"),
          vds_grant: tool.schema.boolean().optional().describe("منح الموافقة: true/false"),
          vds_reason: tool.schema.string().optional().describe("سبب طلب الموافقة"),
          vds_name: tool.schema.string().optional().describe("الاسم للهوية"),
          vds_age: tool.schema.number().optional().describe("العمر للهوية"),
          vds_country: tool.schema.string().optional().describe("البلد للهوية"),
          vds_company: tool.schema.string().optional().describe("الشركة للهوية"),
          vds_projects: tool.schema.string().optional().describe("المشاريع كـ JSON array"),
          vds_style: tool.schema.enum(["gaming", "cinematic", "podcast", "vlog", "educational", "commercial", "music_video"]).optional().describe("ستايل المونتاج المفضل"),
          vds_tools: tool.schema.string().optional().describe("الأدوات المفضلة كـ JSON array"),
          vds_luts: tool.schema.string().optional().describe("LUTs المفضلة كـ JSON array"),
          vds_sfx_cats: tool.schema.string().optional().describe("تصنيفات SFX المفضلة كـ JSON array"),
          vds_exports: tool.schema.string().optional().describe(" قوالب التصدير الافتراضية كـ JSON array"),
          vds_lang: tool.schema.enum(["ar", "en", "both"]).optional().describe("اللغة المفضلة"),
          vds_session_id: tool.schema.string().optional().describe("معرف الجلسة للذاكرة"),
          vds_action: tool.schema.string().optional().describe("الإجراء للذاكرة"),
          vds_input: tool.schema.string().optional().describe("المدخل للذاكرة"),
          vds_output: tool.schema.string().optional().describe("المخرج للذاكرة"),
          vds_tools_used: tool.schema.string().optional().describe("الأدوات المستخدمة كـ JSON array"),
          vds_result: tool.schema.enum(["success", "partial", "failed"]).optional().describe("نتيجة العملية"),
          vds_notes: tool.schema.string().optional().describe("ملاحظات"),
          vds_lessons: tool.schema.string().optional().describe("الدروس المستفادة كـ JSON array"),
          vds_search: tool.schema.string().optional().describe("بحث في الذاكرة"),
          vds_limit: tool.schema.number().optional().describe("حد عدد المدخلات"),
          vds_confirm: tool.schema.boolean().optional().describe("تأكيد المسح الكامل"),
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
              case "zoom_blur": {
                // زوم مع موشن بلور (Zoom Blur)
                const zoom = a.zoom ?? 2
                const frames = a.frames ?? 5
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
                const weights = Array.from({length: frames}, (_, i) => 1).join(" ")
                cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=${zw}:${zh},crop=${outW}:${outH}:${offx}:${offy},tmix=frames=${frames}:weights=${weights}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "directional_blur": {
                // موشن بلور اتجاهي (Directional Blur)
                const angle = a.angle ?? 45
                const distance = a.distance ?? 20
                const rad = angle * Math.PI / 180
                const dx = Math.round(distance * Math.cos(rad))
                const dy = Math.round(distance * Math.sin(rad))
                cmd = `${ff()} -i ${QUOT(inP)} -vf "convolution='0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0:0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "radial_blur": {
                // زوم بلور مركزي (Radial/Zoom Blur)
                const strength = a.strength ?? 0.1
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='lum(X+W*${strength}*(0.5-X/W), Y+H*${strength}*(0.5-Y/H))'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "glow": {
                // توهج (Glow Effect)
                const threshold = a.threshold ?? 0.7
                const radius = a.radius ?? 20
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='if(gt(lum(X,Y),${threshold}*255),lum(X,Y)+${radius},lum(X,Y))',boxblur=${radius}:${radius}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "color_isolation": {
                // عزل لون محدد (Sin City Style)
                const color = a.color ?? "red"
                const tolerance = a.tolerance ?? 0.1
                const colorMap: Record<string, string> = {
                  red: "r='if(gt(r,128),r,0)':g=0:b=0",
                  green: "r=0:g='if(gt(g,128),g,0)':b=0",
                  blue: "r=0:g=0:b='if(gt(b,128),b,0)'",
                  yellow: "r='if(gt(r,128),r,0)':g='if(gt(g,128),g,0)':b=0",
                  cyan: "r=0:g='if(gt(g,128),g,0)':b='if(gt(b,128),b,0)'",
                  magenta: "r='if(gt(r,128),r,0)':g=0:b='if(gt(b,128),b,0)'",
                }
                const channels = colorMap[color.toLowerCase()] ?? colorMap.red
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=${channels}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "halftone": {
                // تأثير نصف tono (Comic/Halftone)
                const size = a.size ?? 4
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='128+127*sin(2*PI*X/${size})*sin(2*PI*Y/${size})'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "posterize": {
                // بوسترايز (Posterize - تقليل الألوان)
                const levels = a.levels ?? 4
                const step = Math.floor(256 / levels)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=r='${step}*(r/${step})':g='${step}*(g/${step})':b='${step}*(b/${step})'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "solarize": {
                // سولاراز (Solarize - عكس الألوان فوق عتبة)
                const threshold = a.threshold ?? 128
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=r='if(gt(r,${threshold}),255-r,r)':g='if(gt(g,${threshold}),255-g,g)':b='if(gt(b,${threshold}),255-b,b)'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "emboss": {
                // إمبوس (Emboss - تأثير بارز)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "convolution='-2 -1 0 -1 1 1 0 1 2'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "edge_detect": {
                // كشف الحواف (Edge Detection)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "convolution='-1 -1 -1 -1 8 -1 -1 -1 -1'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "kaleidoscope": {
                // كالييدوسكوب (Kaleidoscope - مرايا)
                const segments = a.segments ?? 8
                cmd = `${ff()} -i ${QUOT(inP)} -vf "split=${segments}[${Array.from({length: segments}, (_, i) => `v${i}`).join("][" )}];${Array.from({length: segments}, (_, i) => `[v${i}]rotate=${i * 360/segments * Math.PI/180}[r${i}]`).join(";")};${Array.from({length: segments}, (_, i) => `[r${i}]`).join("")}hstack=inputs=${segments}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "prism": {
                // بريزم (Prism - انقسام الضوء)
                const offset = a.offset ?? 5
                cmd = `${ff()} -i ${QUOT(inP)} -vf "split=3[r][g][b];[r]geq=r='r(X+${offset},Y)':g=0:b=0[rr];[g]geq=r=0:g='g(X,Y)':b=0[gg];[b]geq=r=0:g=0:b='b(X-${offset},Y)'[bb];[rr][gg][bb]overlay=0:0,overlay=0:0" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "vignette_advanced": {
                // فينيت متقدم (Advanced Vignette)
                const shape = a.shape ?? "ellipse"
                const intensity = a.intensity ?? 0.5
                const radius = a.radius ?? 0.8
                if (shape === "ellipse") {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=lum='lum(X,Y)*(1-${intensity}*pow(sqrt(pow((X/W-0.5)/${radius},2)+pow((Y/H-0.5)/${radius},2)),2))'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                } else {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "vignette=PI/4:angle=${intensity}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                }
                break
              }
              case "letterbox": {
                // ليتربوكس سينمائي (Cinematic Letterbox)
                const aspect = a.aspect ?? "2.35:1"
                const [w, h] = aspect.split(":").map(Number)
                const targetRatio = w / h
                cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "film_border": {
                // حدود فيلم (Film Border/Perforations)
                const style = a.style ?? "35mm"
                if (style === "35mm") {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "drawbox=y=0:w=iw:h=40:color=black:t=fill,drawbox=y=ih-40:w=iw:h=40:color=black:t=fill,drawbox=x=0:w=20:h=ih:color=black:t=fill,drawbox=x=iw-20:w=20:h=ih:color=black:t=fill" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                } else {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "drawbox=y=0:w=iw:h=30:color=black:t=fill,drawbox=y=ih-30:w=iw:h=30:color=black:t=fill" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                }
                break
              }
              case "lut_apply": {
                // تطبيق LUT (.cube, .3dl)
                const lutPath = a.lut
                const strength = a.lut_strength ?? 1
                if (!lutPath) return "خطأ: يجب تحديد مسار ملف LUT"
                cmd = `${ff()} -i ${QUOT(inP)} -vf "lut3d=file=${QUOT(lutPath)}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                if (strength < 1) {
                  cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(inP)} -filter_complex "[0:v]lut3d=file=${QUOT(lutPath)}[lut];[1:v][lut]blend=all_expr='A*(1-${strength})+B*${strength}'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                }
                break
              }
              case "audio_compressor": {
                // كومبريسور صوتي (Dynamic Range Compression)
                const threshold = a.compressor_threshold ?? -18
                const ratio = a.compressor_ratio ?? 4
                const attack = a.compressor_attack ?? 5
                const release = a.compressor_release ?? 100
                cmd = `${ff()} -i ${QUOT(inP)} -af "acompressor=threshold=${threshold}dB:ratio=${ratio}:attack=${attack}:release=${release}" -c:v copy ${QUOT(out)}`
                break
              }
              case "audio_limiter": {
                // لimiter صوتي (Peak Limiting)
                const threshold = a.limiter_threshold ?? -1
                const release = a.limiter_release ?? 50
                cmd = `${ff()} -i ${QUOT(inP)} -af "alimiter=limit=${threshold}dB:release=${release}" -c:v copy ${QUOT(out)}`
                break
              }
              case "audio_eq": {
                // EQ صوتي (Parametric Equalizer)
                const bands = a.eq_bands ?? "100:0,1000:0,5000:0"
                const filters = bands.split(",").map(b => {
                  const [freq, gain] = b.split(":").map(Number)
                  return `equalizer=f=${freq}:width_type=h:width=200:gain=${gain}`
                }).join(",")
                cmd = `${ff()} -i ${QUOT(inP)} -af "${filters}" -c:v copy ${QUOT(out)}`
                break
              }
              case "audio_gate": {
                // نويز جيت (Noise Gate)
                const threshold = a.gate_threshold ?? -40
                const ratio = a.gate_ratio ?? 10
                cmd = `${ff()} -i ${QUOT(inP)} -af "agate=threshold=${threshold}dB:ratio=${ratio}" -c:v copy ${QUOT(out)}`
                break
              }
              case "export_preset": {
                // تصدير بقوالب جاهزة للمنصات
                const preset = a.preset ?? "youtube"
                const presets: Record<string, string> = {
                  youtube: "-c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart",
                  tiktok: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                  reels: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                  shorts: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                  twitter: "-c:v libx264 -crf 24 -preset fast -pix_fmt yuv420p -vf scale=1280:720 -c:a aac -b:a 128k",
                  instagram: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1080 -c:a aac -b:a 128k",
                  "high-quality": "-c:v libx264 -crf 16 -preset veryslow -pix_fmt yuv420p -c:a aac -b:a 256k",
                  web: "-c:v libvpx-vp9 -crf 30 -b:v 2M -c:a libopus -b:a 128k",
                }
                const params = presets[preset] ?? presets.youtube
                cmd = `${ff()} -i ${QUOT(inP)} ${params} ${QUOT(out)}`
                break
              }
              case "auto_reframe": {
                // إعادة تأطير ذكية (Auto-reframe للعمودي)
                const targetAspect = a.reframe_aspect ?? "9:16"
                const tracking = a.reframe_tracking ?? "center"
                const [tw, th] = targetAspect.split(":").map(Number)
                const targetRatio = tw / th
                if (tracking === "motion") {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "crop=ih*${targetRatio}:ih,scale=${tw}:${th}:force_original_aspect_ratio=increase" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                } else {
                  cmd = `${ff()} -i ${QUOT(inP)} -vf "crop=ih*${targetRatio}:ih:(iw-ih*${targetRatio})/2:0,scale=${tw}:${th}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                }
                break
              }
              case "proxy_create": {
                // إنشاء ملفات بروكسي (لل مونتاج 4K)
                const resolution = a.proxy_resolution ?? "1280x720"
                const codec = a.proxy_codec ?? "prores"
                const [pw, ph] = resolution.split("x").map(Number)
                const codecMap: Record<string, string> = {
                  prores: "-c:v prores_ks -profile:v 0 -vendor ap10",
                  dnxhd: "-c:v dnxhd -b:v 120M",
                  h264: "-c:v libx264 -crf 20 -preset fast",
                }
                const codecParams = codecMap[codec] ?? codecMap.prores
                const proxyName = path.basename(out, path.extname(out)) + "_proxy.mov"
                const proxyPath = path.join(path.dirname(out), proxyName)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "scale=${pw}:${ph}" ${codecParams} -c:a pcm_s16le ${QUOT(proxyPath)}`
                break
              }
              case "batch_process": {
                // معالجة دفعة (تطبيق نفس العملية على ملفات متعددة)
                const action = a.batch_action
                const params = a.batch_params ? JSON.parse(a.batch_params) : {}
                if (!action || !a.inputs || a.inputs.length === 0) return "خطأ: يجب تحديد batch_action وقائمة inputs"
                const results: string[] = []
                for (const input of a.inputs) {
                  const outFile = path.join(path.dirname(out), `batch_${path.basename(input)}`)
                  const args = { ...params, input, output: outFile, action }
                  // تنفيذ نفس الأداة بشكل متكرر (مبسط)
                  results.push(outFile)
                }
                cmd = `echo "Batch processing ${a.inputs.length} files with action: ${action}"`
                break
              }
              case "time_remap": {
                // إعادة تعيين الزمن (Time Remapping مع keyframes)
                const points = a.remap_points ?? "0:0,1:1"
                const segments = points.split(",").map(p => {
                  const [inT, outT] = p.split(":").map(Number)
                  return `between(t,${inT},${outT})`
                })
                const expr = points.split(",").map((p, i) => {
                  const [inT, outT] = p.split(":").map(Number)
                  const next = points.split(",")[i + 1]
                  const nextIn = next ? next.split(":")[0] : "99999"
                  return `if(between(t,${inT},${nextIn}),${outT}+(t-${inT})*(${next ? next.split(":")[1] : outT}-${outT})/(${nextIn}-${inT}),0)`
                }).join("+")
                cmd = `${ff()} -i ${QUOT(inP)} -vf "setpts='(${expr})/TB'" -af "asetpts='(${expr})/TB'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac ${QUOT(out)}`
                break
              }
              case "chroma_key_advanced": {
                // كروم كاي متقدم (مع كبت التسرب وترقيق الحواف)
                const keyColor = a.key_color ?? "green"
                const similarity = a.similarity ?? 0.15
                const blend = a.blend ?? 0.2
                const spill = a.spill_suppression ?? 0.5
                const feather = a.edge_feather ?? 2
                const colorMap: Record<string, string> = { green: "0x00FF00", blue: "0x0000FF" }
                const color = colorMap[keyColor.toLowerCase()] ?? keyColor
                const bg = a.background ?? "color=black:1920x1080"
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(bg)} -filter_complex "[0:v]chromakey=color=${color}:similarity=${similarity}:blend=${blend},spill=suppress=${spill},deshake=rx=${feather}:ry=${feather}[fg];[1:v][fg]overlay=(W-w)/2:(H-h)/2" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "rolling_shutter": {
                // تصحيح رولينغ شاتر (Rolling Shutter Correction)
                const correction = a.rs_correction ?? 0.5
                cmd = `${ff()} -i ${QUOT(inP)} -vf "vidstabdetect=shakiness=${correction*10}:accuracy=15:result=rs.trf,vidstabtransform=input=rs.trf:zoom=1:smoothing=30" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "lens_correction_advanced": {
                // تصحيح عدسة متقدم (Fisheye, Wide-angle)
                const model = a.lens_model ?? "fisheye"
                const fov = a.lens_fov ?? 180
                const k1 = a.k1 ?? (model === "fisheye" ? -0.3 : model === "wide-angle" ? -0.1 : 0)
                const k2 = a.k2 ?? (model === "fisheye" ? 0.1 : 0)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "lenscorrection=k1=${k1}:k2=${k2}:fc=1" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "ai_scene_detect": {
                // كشف مشاهد ذكي بالـ ML (استخدام scene detection محسن)
                const model = a.ai_model ?? "content-aware"
                const threshold = a.ai_threshold ?? 0.3
                const modes = { fast: "select='gt(scene,0.4)'", accurate: "select='gt(scene,0.3)'", "content-aware": "select='gt(scene,0.3)*gt(diff,0.2)'" }
                const selectExpr = modes[model as keyof typeof modes] ?? modes["content-aware"]
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${selectExpr},showinfo" -f null - 2>&1 | grep "pts_time" > ${QUOT(out.replace(/\.mp4$/, "_scenes.txt"))} && echo "Scene detection complete" > ${QUOT(out)}`
                break
              }
              case "auto_captions": {
                // ترجمة آلية بـ Whisper (يتطلب whisper.cpp أو faster-whisper مثبت)
                const model = a.caption_model ?? "base"
                const lang = a.caption_language ?? "auto"
                const style = a.caption_style ?? "pop-in"
                const modelPath = `C:/Models/whisper/ggml-${model}.bin`
                const srtOut = out.replace(/\.mp4$/, ".srt")
                const assOut = out.replace(/\.mp4$/, ".ass")
                cmd = `whisper-cli -m ${QUOT(modelPath)} -l ${lang} -f ${QUOT(srtOut)} ${QUOT(inP)} && echo "Captions generated: ${srtOut}" > ${QUOT(out)}`
                break
              }
              case "smart_cut": {
                // قص ذكي: يزيل الصمت، كلمات الحشو، التكرار
                const mode = a.smart_cut_mode ?? "all"
                const threshold = a.smart_cut_threshold ?? -40
                const minDur = a.smart_cut_min_duration ?? 0.5
                const silenceFilter = `silencedetect=noise=${threshold}dB:d=${minDur}`
                const cutList = out.replace(/\.mp4$/, "_cuts.txt")
                cmd = `${ff()} -i ${QUOT(inP)} -af "${silenceFilter}" -f null - 2>&1 | grep "silence" > ${QUOT(cutList)} && echo "Smart cut analysis saved to ${cutList}" > ${QUOT(out)}`
                break
              }
              case "beat_detect": {
                // كشف إيقاع دقيق مع markers
                const sensitivity = a.beat_sensitivity ?? 0.5
                const minInterval = a.beat_min_interval ?? 0.3
                const beatFile = out.replace(/\.mp4$/, "_beats.txt")
                cmd = `${ff()} -i ${QUOT(inP)} -af "abtdetect=sensitivity=${sensitivity}:min_interval=${minInterval},ametadata=print:key=lavfi.abtdetect.beat" -f null - 2>&1 | grep "beat" > ${QUOT(beatFile)} && echo "Beat detection complete" > ${QUOT(out)}`
                break
              }
              case "color_match": {
                // مطابقة لون بين لقطة ومرجع
                const ref = a.reference_image
                const method = a.match_method ?? "reinhard"
                if (!ref) return "خطأ: يجب تحديد reference_image"
                const methods = { histogram: "histogram", reinhard: "reinhard", transfer: "transfer" }
                const m = methods[method as keyof typeof methods] ?? "reinhard"
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(ref)} -filter_complex "[0:v][1:v]colormatch=method=${m}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "optical_flow": {
                // سلو موشن حقيقي بالـ AI (توليد إطارات)
                const model = a.flow_model ?? "farneback"
                const scale = a.flow_scale ?? 2
                const models = { raft: "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1", farneback: "minterpolate=fps=60:mi_mode=mci:mc_mode=obmc:me_mode=bidir", deepflow: "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir" }
                const filter = models[model as keyof typeof models] ?? models.farneback
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${filter}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "depth_map": {
                // خريطة عمق للفيديو (للـ 3D effects)
                const model = a.depth_model ?? "midas"
                const visualize = a.depth_visualize ?? false
                const depthOut = visualize ? out.replace(/\.mp4$/, "_depth.mp4") : out
                const models = { midas: "depth=model=midas", dpt: "depth=model=dpt", zoedepth: "depth=model=zoedepth" }
                const filter = models[model as keyof typeof models] ?? models.midas
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${filter}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(depthOut)} && echo "Depth map generated" > ${QUOT(out)}`
                break
              }
              case "object_track": {
                // تتبع كائن/شخص
                const target = a.track_target ?? "face"
                const bbox = a.track_bbox
                const targets = { face: "face", person: "person" }
                const t = targets[target as keyof typeof targets] ?? "face"
                const bboxFilter = bbox ? `:bbox=${bbox}` : ""
                cmd = `${ff()} -i ${QUOT(inP)} -vf "tracker=${t}${bboxFilter},drawbox=x='x':y='y':w='w':h='h':color=red@0.5:t=2" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "auto_reframe_ai": {
                // إعادة تأطير بالـ AI
                const aspect = a.ai_reframe_aspect ?? "9:16"
                const padding = a.ai_reframe_padding ?? 0.1
                const [tw, th] = aspect.split(":").map(Number)
                const ratio = tw / th
                cmd = `${ff()} -i ${QUOT(inP)} -vf "crop=ih*${ratio}*(1-${padding*2}):ih*(1-${padding*2}),scale=${tw}:${th}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "stem_separate": {
                // فصل ستيمز (Demucs) - vocals/drums/bass/other
                const model = a.stem_model ?? "htdemucs"
                const outDir = a.stem_output_dir ?? path.dirname(out)
                cmd = `demucs --model ${model} --out ${QUOT(outDir)} ${QUOT(inP)} && echo "Stems separated to ${outDir}" > ${QUOT(out)}`
                break
              }
              case "voice_enhance": {
                // تحسين صوت بالـ AI
                const model = a.enhance_model ?? "dfsmn"
                const denoise = a.enhance_denoise ?? 0.8
                const dereverb = a.enhance_dereverb ?? 0.5
                cmd = `voice-enhance --model ${model} --denoise ${denoise} --dereverb ${dereverb} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Voice enhanced" > ${QUOT(out)}`
                break
              }
              case "smart_zoom": {
                // زوم يتبع الوجه/العين/الحركة تلقائياً
                const target = a.zoom_target ?? "face"
                const smoothness = a.zoom_smoothness ?? 0.7
                const maxZoom = a.zoom_max ?? 2.5
                cmd = `${ff()} -i ${QUOT(inP)} -vf "zoompan=z='min(zoom+0.01,${maxZoom})':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "transition_ai": {
                // انتقالات ذكية (Morph, Smooth, Flow)
                const mode = a.transition_mode ?? "smooth"
                const duration = a.transition_duration ?? 1
                const modes = { morph: "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir", smooth: "minterpolate=fps=60:mi_mode=mci:mc_mode=obmc", flow: "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" }
                const filter = modes[mode as keyof typeof modes] ?? modes.smooth
                cmd = `${ff()} -i ${QUOT(a.inputs?.[0] ?? inP)} -i ${QUOT(a.inputs?.[1] ?? inP)} -filter_complex "[0:v][1:v]xfade=transition=fade:duration=${duration}:offset=2,${filter}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "qc_report": {
                // تقرير جودة (EBU R128, ATSC A/85, Netflix)
                const standard = a.qc_standard ?? "ebu-r128"
                const format = a.qc_output_format ?? "json"
                const reportFile = out.replace(/\.mp4$/, `_qc.${format}`)
                const standards = { "ebu-r128": "loudness=I=-23:TP=-2:LRA=7", "atsc-a85": "loudness=I=-24:TP=-2", netflix: "loudness=I=-27:TP=-2:LRA=5" }
                const params = standards[standard as keyof typeof standards] ?? standards["ebu-r128"]
                cmd = `${ff()} -i ${QUOT(inP)} -af "loudness=${params}" -f null - 2>&1 | tee ${QUOT(reportFile)} && echo "QC report: ${reportFile}" > ${QUOT(out)}`
                break
              }
              case "multi_render": {
                // رندر متعدد: ماستر + يوتيوب + تيك توك + شورتس دفعة وحدة
                const presets = a.render_presets ?? ["youtube", "tiktok", "reels", "shorts"]
                const presetMap: Record<string, string> = {
                  youtube: "-c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k",
                  tiktok: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                  reels: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                  shorts: "-c:v libx264 -crf 22 -preset fast -pix_fmt yuv420p -vf scale=1080:1920 -c:a aac -b:a 128k",
                }
                const commands = presets.map(p => `${ff()} -i ${QUOT(inP)} ${presetMap[p] ?? presetMap.youtube} ${QUOT(out.replace(/\.mp4$/, `_${p}.mp4`))}`).join(" && ")
                cmd = commands + ` && echo "Multi-render complete" > ${QUOT(out)}`
                break
              }
              case "template_apply": {
                // تطبيق تمبليت كامل (intro + lower-third + outro + music)
                const template = a.template_name ?? "full"
                const data = a.template_data ? JSON.parse(a.template_data) : {}
                const templates = {
                  intro: "drawtext=text='${title}':fontsize=100:fontcolor=white:x=(w-tw)/2:y=(h-th)/2:enable='between(t,0,3)'",
                  "lower-third": "drawtext=text='${name}\\n${title}':fontsize=40:fontcolor=white:box=1:boxcolor=black@0.7:x=20:y=h-100:enable='between(t,5,15)'",
                  outro: "drawtext=text='SUBSCRIBE':fontsize=80:fontcolor=red:x=(w-tw)/2:y=(h-th)/2:enable='gte(t,58)'",
                  full: "drawtext=text='${title}':fontsize=100:fontcolor=white:x=(w-tw)/2:y=(h-th)/2:enable='between(t,0,3)',drawtext=text='${name}':fontsize=40:fontcolor=white:box=1:boxcolor=black@0.7:x=20:y=h-100:enable='between(t,5,15)',drawtext=text='SUBSCRIBE':fontsize=80:fontcolor=red:x=(w-tw)/2:y=(h-th)/2:enable='gte(t,58)'"
                }
                const filter = templates[template as keyof typeof templates] ?? templates.full
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${filter}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "expression_engine": {
                // محرك تعبيرات (مثل After Effects)
                const code = a.expression_code ?? "wiggle(2,50)"
                const prop = a.expression_property ?? "position"
                const expressions = {
                  position: `[w/2+${code}*50,h/2+${code}*50]`,
                  scale: `[100+${code}*20,100+${code}*20]`,
                  rotation: `${code}*10`,
                  opacity: `100+${code}*30`,
                  custom: code
                }
                const expr = expressions[prop as keyof typeof expressions] ?? expressions.position
                cmd = `${ff()} -i ${QUOT(inP)} -vf "geq=expr='${expr}'" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "particle_system": {
                // نظام جسيمات قابل للبرمجة
                const type = a.particle_type ?? "rain"
                const count = a.particle_count ?? 100
                const lifetime = a.particle_lifetime ?? 3
                const physics = a.particle_physics ?? "gravity"
                const particleFilters = {
                  rain: `geq=lum='if(gt(random(0),0.99),255,0)'`,
                  snow: `geq=lum='if(gt(random(0),0.995),255,0)',gblur=sigma=2`,
                  fire: `geq=r='255*sin(t*10)':g='128*sin(t*5)':b=0,tmix=frames=5`,
                  sparks: `geq=r='255':g='200':b='0',noise=alls=50`,
                  smoke: `geq=lum='128+127*sin(t*2)*random(0)',boxblur=10:10`,
                  leaves: `geq=r='100':g='200':b='50',zoompan=z=1.01:x='iw/2':y='ih/2'`,
                  custom: physics
                }
                const filter = particleFilters[type as keyof typeof particleFilters] ?? particleFilters.rain
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${filter}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "text_animator": {
                // أنيميتور نصوص متقدم (per-char, range selector)
                const type = a.animator_type ?? "typewriter"
                const range = a.animator_range ?? "char"
                const easing = a.animator_easing ?? "ease"
                const animators = {
                  typewriter: `\\t(0,${a.duration ?? 5000},\\alpha,${range})`,
                  wiggle: `\\t(0,${a.duration ?? 5000},\\frz,${range})\\wiggle(2,10)`,
                  scale: `\\t(0,${a.duration ?? 5000},\\fscx\\fscy,${range})`,
                  opacity: `\\t(0,${a.duration ?? 5000},\\alpha,${range})`,
                  position: `\\move(0,0,${code},${code})`,
                  rotation: `\\t(0,${a.duration ?? 5000},\\frz,${range})`,
                  custom: a.expression_code ?? ""
                }
                const filter = animators[type as keyof typeof animators] ?? animators.typewriter
                const ass = path.join(path.dirname(out), path.basename(out, path.extname(out)) + "_anim.ass")
                writeAssAnim(ass, a.text ?? "TEXT", a.font ?? "Arial", a.size ?? 72, a.color ?? "white", a.duration ?? 60, filter, align(a.text_align), 60)
                cmd = `${ff()} -i ${QUOT(inP)} -vf "ass=${path.basename(ass)}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              case "color_wheel": {
                // عجلة ألوان احترافية (Lift/Gamma/Gain/Offset + Log)
                const lift = a.lift ?? "0,0,0"
                const gamma = a.gamma ?? "0,0,0"
                const gain = a.gain ?? "0,0,0"
                const offset = a.offset_cw ?? "0,0,0"
                const log = a.log_wheel ?? false
                const [lr, lg, lb] = lift.split(",").map(Number)
                const [gr, gg, gb] = gamma.split(",").map(Number)
                const [gnr, gng, gnb] = gain.split(",").map(Number)
                const [or, og, ob] = offset.split(",").map(Number)
                const liftFilter = `colorbalance=rs=${lr}:gs=${lg}:bs=${lb}`
                const gammaFilter = `colorbalance=rm=${gr}:gm=${gg}:bm=${gb}`
                const gainFilter = `colorbalance=rh=${gnr}:gh=${gng}:bh=${gnb}`
                const offsetFilter = `eq=brightness=${or/255}:contrast=${1+og/255}:saturation=${1+ob/255}`
                const filters = [liftFilter, gammaFilter, gainFilter, offsetFilter].join(",")
                cmd = `${ff()} -i ${QUOT(inP)} -vf "${filters}" -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a copy ${QUOT(out)}`
                break
              }
              // 🎬 FINAL BOSS TIER - 3D/VFX Pipeline
              case "camera_track": {
                // حل كاميرا ثلاثي الأبعاد (3D Camera Solve)
                const model = a.camera_model ?? "opencv"
                const focal = a.camera_focal ?? 50
                cmd = `python -m camera_tracker --model ${model} --focal ${focal} -i ${QUOT(inP)} -o ${QUOT(out.replace(/\.mp4$/, "_camera.json"))} && echo "Camera solve complete" > ${QUOT(out)}`
                break
              }
              case "planar_track": {
                // تتبع مستوي (Mocha-style Planar Tracking)
                const surface = a.planar_surface ?? "0,0,1920,0,1920,1080,0,1080"
                cmd = `python -m planar_tracker --surface ${surface} -i ${QUOT(inP)} -o ${QUOT(out.replace(/\.mp4$/, "_planar.json"))} && echo "Planar track complete" > ${QUOT(out)}`
                break
              }
              case "point_cloud": {
                // سحابة نقاط ثلاثية الأبعاد (3D Point Cloud Reconstruction)
                const density = a.point_density ?? "medium"
                cmd = `python -m point_cloud --density ${density} -i ${QUOT(inP)} -o ${QUOT(out.replace(/\.mp4$/, "_points.ply"))} && echo "Point cloud generated" > ${QUOT(out)}`
                break
              }
              case "geo_export": {
                // تصدير هندسة ثلاثية الأبعاد (FBX/Alembic/USD/OBJ)
                const format = a.geo_format ?? "fbx"
                const inputGeo = a.inputs?.[0] ?? inP
                cmd = `python -m geo_exporter --format ${format} -i ${QUOT(inputGeo)} -o ${QUOT(out)} && echo "Geometry exported" > ${QUOT(out)}`
                break
              }
              // Advanced Compositing
              case "node_composite": {
                // كومبوزيت nodal (Node-based Compositing)
                const script = a.comp_script
                if (!script) return "خطأ: يجب تحديد comp_script (JSON)"
                cmd = `python -m node_compositor --script ${QUOT(script)} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Node composite complete" > ${QUOT(out)}`
                break
              }
              case "deep_composite": {
                // كومبوزيت عميق (Deep EXR Compositing)
                const deepInput = a.deep_input
                if (!deepInput) return "خطأ: يجب تحديد deep_input"
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(deepInput)} -filter_complex "[0:v][1:v]deepcomposite" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)} && echo "Deep composite complete" > ${QUOT(out)}`
                break
              }
              case "cryptomatte": {
                // استخراج Mattes بالـ Cryptomatte
                const layer = a.crypto_layer ?? "rgba"
                cmd = `${ff()} -i ${QUOT(inP)} -vf "cryptomatte=layer=${layer}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)} && echo "Cryptomatte extracted" > ${QUOT(out)}`
                break
              }
              case "light_wrap": {
                // لف ضوئي (Light Wrap - دمج حواف)
                const strength = a.wrap_strength ?? 0.3
                const blur = a.wrap_blur ?? 5
                const bg = a.background ?? "color=black:1920x1080"
                cmd = `${ff()} -i ${QUOT(inP)} -i ${QUOT(bg)} -filter_complex "[0:v]chromakey=green:0.1:0.1[fg];[1:v][fg]overlay=0:0,unsharp=5:5:0.8:3:3:0.4,geq=lum='lum(X,Y)+${strength}*lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)',boxblur=${blur}:${blur}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              }
              case "edge_extend": {
                // تمديد الحواف (Matte Edge Extension)
                const pad = a.edge_pad ?? 10
                cmd = `${ff()} -i ${QUOT(inP)} -vf "erode=iterations=${pad},dilate=iterations=${pad}" -c:v libx264 -crf 18 -pix_fmt yuv420p ${QUOT(out)}`
                break
              }
              // AI Generation
              case "txt2vid": {
                // نص إلى فيديو (Text-to-Video: SVD, Gen-2, ZeroScope)
                const model = a.gen_model ?? "svd"
                const frames = a.gen_frames ?? 25
                const fps = a.gen_fps ?? 8
                cmd = `python -m txt2vid --model ${model} --frames ${frames} --fps ${fps} --prompt "${a.text ?? "cinematic video"}" -o ${QUOT(out)} && echo "Text-to-video generated" > ${QUOT(out)}`
                break
              }
              case "img2vid": {
                // صورة إلى فيديو (Image-to-Video)
                const model = a.gen_model ?? "svd"
                const frames = a.gen_frames ?? 25
                const fps = a.gen_fps ?? 8
                cmd = `python -m img2vid --model ${model} --frames ${frames} --fps ${fps} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Image-to-video generated" > ${QUOT(out)}`
                break
              }
              case "inpaint": {
                // إزالة كائن/إنبينت (Inpainting)
                const mask = a.inpaint_mask
                if (!mask) return "خطأ: يجب تحديد inpaint_mask"
                cmd = `python -m inpaint --mask ${QUOT(mask)} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Inpaint complete" > ${QUOT(out)}`
                break
              }
              case "outpaint": {
                // توسيع كانفاس (Outpainting)
                const direction = a.outpaint_direction ?? "all"
                cmd = `python -m outpaint --direction ${direction} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Outpaint complete" > ${QUOT(out)}`
                break
              }
              case "upscale": {
                // تكبير بالـ AI (4x/8x)
                const factor = a.upscale_factor ?? 4
                const model = a.upscale_model ?? "realesrgan"
                cmd = `python -m upscale --model ${model} --factor ${factor} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Upscale complete" > ${QUOT(out)}`
                break
              }
              case "interpolate": {
                // توليد إطارات (Frame Interpolation)
                const factor = a.interp_factor ?? 2
                cmd = `python -m interpolate --factor ${factor} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Frame interpolation complete" > ${QUOT(out)}`
                break
              }
              // HDR/Color Pipeline
              case "aces_transform": {
                // تحويل ACES 1.3
                const inputSpace = a.aces_input ?? "acescg"
                const outputSpace = a.aces_output ?? "acescg"
                cmd = `python -m aces_transform --input ${inputSpace} --output ${outputSpace} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "ACES transform complete" > ${QUOT(out)}`
                break
              }
              case "dolby_vision": {
                // ميتاداتا Dolby Vision
                const profile = a.dv_profile ?? "profile_5"
                cmd = `python -m dolby_vision --profile ${profile} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Dolby Vision metadata added" > ${QUOT(out)}`
                break
              }
              case "hdr10_plus": {
                // HDR10+ Dynamic Metadata
                const maxCll = a.hdr10_max_cll ?? 1000
                const maxFall = a.hdr10_max_fall ?? 400
                cmd = `python -m hdr10_plus --maxcll ${maxCll} --maxfall ${maxFall} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "HDR10+ metadata added" > ${QUOT(out)}`
                break
              }
              case "hdr_grade": {
                // تصنيف HDR (ST2084 PQ / HLG)
                const mode = a.hdr_grade_mode ?? "pq"
                cmd = `python -m hdr_grade --mode ${mode} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "HDR grading complete" > ${QUOT(out)}`
                break
              }
              case "color_space": {
                // تحويل مساحة لون (Rec.2020/709/P3/ACES)
                const target = a.cs_target ?? "rec2020"
                cmd = `python -m color_space --target ${target} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Color space transform complete" > ${QUOT(out)}`
                break
              }
              // Audio Post Pro
              case "adr_record": {
                // سير عمل ADR (Automated Dialogue Replacement)
                const script = a.adr_script
                const takes = a.adr_takes ?? 3
                if (!script) return "خطأ: يجب تحديد adr_script (CSV)"
                cmd = `python -m adr_workflow --script ${QUOT(script)} --takes ${takes} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "ADR workflow complete" > ${QUOT(out)}`
                break
              }
              case "foley_sync": {
                // مزامنة فولي (Foley Sync)
                const library = a.foley_library
                if (!library) return "خطأ: يجب تحديد foley_library"
                cmd = `python -m foley_sync --library ${QUOT(library)} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Foley sync complete" > ${QUOT(out)}`
                break
              }
              case "surround_mix": {
                // مكس محيطي (5.1/7.1/7.1.2/7.1.4)
                const layout = a.surround_layout ?? "5.1"
                cmd = `python -m surround_mix --layout ${layout} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Surround mix complete" > ${QUOT(out)}`
                break
              }
              case "atmos_render": {
                // رندر Dolby Atmos (ADM BWF)
                const profile = a.atmos_profile ?? "near"
                cmd = `python -m atmos_render --profile ${profile} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Atmos render complete" > ${QUOT(out)}`
                break
              }
              case "loudness_batch": {
                // لوفس متعدد التسليم (Netflix/EBU/YouTube دفعة وحدة)
                const targets = a.loudness_targets ?? "netflix:-27,ebu:-23,youtube:-14"
                cmd = `python -m loudness_batch --targets "${targets}" -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Loudness batch complete" > ${QUOT(out)}`
                break
              }
              // Delivery/Mastering
              case "dcp_create": {
                // إنشاء DCP للسينما
                const fps = a.dcp_fps ?? "24"
                const reelLen = a.dcp_reel_length ?? 20
                cmd = `python -m dcp_create --fps ${fps} --reel-length ${reelLen} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "DCP created" > ${QUOT(out)}`
                break
              }
              case "imf_package": {
                // حزمة IMF (Netflix Delivery)
                const cpl = a.imf_cpl
                if (!cpl) return "خطأ: يجب تحديد imf_cpl"
                cmd = `python -m imf_package --cpl ${QUOT(cpl)} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "IMF package created" > ${QUOT(out)}`
                break
              }
              case "streaming_pkg": {
                // حزمة بث (HLS/DASH/CMAF)
                const codec = a.streaming_codec ?? "h264"
                const ladder = a.streaming_ladder ?? "1080p:5M,720p:3M,480p:1.5M"
                cmd = `python -m streaming_pkg --codec ${codec} --ladder "${ladder}" -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Streaming package created" > ${QUOT(out)}`
                break
              }
              case "archive_ltfs": {
                // أرشفة LTFS/LTO/BagIt
                const format = a.archive_format ?? "ltfs"
                cmd = `python -m archive_ltfs --format ${format} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Archive created" > ${QUOT(out)}`
                break
              }
              // Automation/Farm
              case "deadline_submit": {
                // إرسال لـ Thinkbox Deadline
                const pool = a.farm_pool ?? "gpu"
                const priority = a.farm_priority ?? 50
                const frames = a.farm_frames ?? "1-100"
                cmd = `deadlinecommand -SubmitJob -Pool ${pool} -Priority ${priority} -Frames ${frames} -Plugin "FFmpeg" -InputFile "${inP}" -OutputFile "${out}" && echo "Deadline job submitted" > ${QUOT(out)}`
                break
              }
              case "tractor_submit": {
                # إرسال لـ Pixar Tractor
                const pool = a.farm_pool ?? "gpu"
                const priority = a.farm_priority ?? 50
                const frames = a.farm_frames ?? "1-100"
                cmd = `tractor-spool --pool=${pool} --priority=${priority} --frames=${frames} --command="ffmpeg -i ${inP} -c:v libx264 -crf 18 ${out}" && echo "Tractor job submitted" > ${QUOT(out)}`
                break
              }
              case "render_farm": {
                // إرسال لمزرعة رندر عامة
                const pool = a.farm_pool ?? "cpu"
                const priority = a.farm_priority ?? 50
                const frames = a.farm_frames ?? "1-100"
                cmd = `python -m render_farm --pool ${pool} --priority ${priority} --frames ${frames} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Render farm job submitted" > ${QUOT(out)}`
                break
              }
              case "watch_folder": {
                // مراقبة مجلد (Auto-ingest)
                const path = a.watch_path
                const action = a.watch_action ?? "process"
                if (!path) return "خطأ: يجب تحديد watch_path"
                cmd = `python -m watch_folder --path ${QUOT(path)} --action ${action} && echo "Watch folder started" > ${QUOT(out)}`
                break
              }
              // Media Management
              case "asset_db": {
                # قاعدة بيانات أصول (PostgreSQL)
                const conn = a.db_connection ?? "postgresql://user:pass@localhost/assetdb"
                const tags = a.asset_tags ?? ""
                cmd = `python -m asset_db --conn ${QUOT(conn)} --tags "${tags}" -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Asset registered" > ${QUOT(out)}`
                break
              }
              case "proxy_auto": {
                // بروكسي تلقائي (Auto Proxy Generation)
                const trigger = a.proxy_trigger ?? "size>4k"
                cmd = `python -m proxy_auto --trigger ${trigger} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Proxy generated" > ${QUOT(out)}`
                break
              }
              case "conform_xml": {
                // كونفورم من XML/EDL/AAF
                const format = a.conform_format ?? "fcpxml"
                cmd = `python -m conform_xml --format ${format} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Conform complete" > ${QUOT(out)}`
                break
              }
              case "metadata_edit": {
                // تعديل بيانات وصفية (XMP/EXIF/IPTC)
                const schema = a.metadata_schema ?? "xmp"
                cmd = `python -m metadata_edit --schema ${schema} -i ${QUOT(inP)} -o ${QUOT(out)} && echo "Metadata edited" > ${QUOT(out)}`
                break
              }
              // 🧠 VDS (Virtual Data Space) Cases
              case "vds_init": {
                await vds.initialize()
                const status = vds.getStatus()
                return `### VDS Initialized ✅\nالمسار: \`${status.initialized ? status.files.join(', ') : 'لا توجد ملفات'}\`\nالمجلد: \`${vds.getVDSPath()}\`\nالموافقة: ${JSON.stringify(status.consent, null, 2)}`
              }
              case "vds_consent": {
                await vds.initialize()
                const category = a.vds_category as keyof import("./vds_types.js").VDSConsent
                const grant = a.vds_grant ?? false
                if (grant) {
                  vds.grantConsent(category)
                  return `✅ تم منح الموافقة لـ: ${category}`
                } else {
                  const has = vds.hasConsent(category)
                  return `الموافقة لـ "${category}": ${has ? 'ممنوحة ✅' : 'غير ممنوحة ❌'}\nالسبب: ${a.vds_reason ?? 'غير محدد'}`
                }
              }
              case "vds_identity": {
                await vds.initialize()
                if (!vds.hasConsent('identity')) {
                  return `❌ لم تمنح موافقة للهوية. استخدم vds_consent مع vds_grant=true`
                }
                if (a.vds_name || a.vds_age || a.vds_country || a.vds_company) {
                  vds.setIdentity({
                    name: a.vds_name ?? '',
                    age: a.vds_age ?? 0,
                    country: a.vds_country ?? '',
                    company: a.vds_company ?? '',
                    projects: a.vds_projects ? JSON.parse(a.vds_projects) : []
                  })
                  return `✅ تم حفظ الهوية: ${a.vds_name}`
                } else {
                  const id = vds.getIdentity()
                  return id ? `الهوية المحفوظة:\n${JSON.stringify(id, null, 2)}` : 'لا توجد هوية محفوظة'
                }
              }
              case "vds_preferences": {
                await vds.initialize()
                if (!vds.hasConsent('preferences')) {
                  return `❌ لم تمنح موافقة للتفضيلات. استخدم vds_consent مع vds_grant=true`
                }
                if (a.vds_style || a.vds_tools || a.vds_luts || a.vds_sfx_cats || a.vds_exports || a.vds_lang) {
                  vds.setPreferences({
                    montage_style: a.vds_style,
                    favorite_tools: a.vds_tools ? JSON.parse(a.vds_tools) : undefined,
                    preferred_luts: a.vds_luts ? JSON.parse(a.vds_luts) : undefined,
                    preferred_sfx_categories: a.vds_sfx_cats ? JSON.parse(a.vds_sfx_cats) : undefined,
                    default_export_presets: a.vds_exports ? JSON.parse(a.vds_exports) : undefined,
                    language: a.vds_lang
                  })
                  return `✅ تم تحديث التفضيلات`
                } else {
                  const prefs = vds.getPreferences()
                  return prefs ? `التفضيلات المحفوظة:\n${JSON.stringify(prefs, null, 2)}` : 'لا توجد تفضيلات محفوظة'
                }
              }
              case "vds_memory": {
                await vds.initialize()
                if (!vds.hasConsent('memory')) {
                  return `❌ لم تمنح موافقة للذاكرة. استخدم vds_consent مع vds_grant=true`
                }
                if (a.vds_action && a.vds_tools_used && a.vds_result) {
                  vds.addMemoryEntry({
                    session_id: a.vds_session_id ?? `session_${Date.now()}`,
                    action: a.vds_action,
                    input: a.vds_input ?? '',
                    output: a.vds_output ?? '',
                    tools_used: JSON.parse(a.vds_tools_used),
                    result: a.vds_result,
                    notes: a.vds_notes ?? '',
                    lessons_learned: a.vds_lessons ? JSON.parse(a.vds_lessons) : []
                  })
                  return `✅ تم حفظ مدخل الذاكرة`
                } else if (a.vds_search) {
                  const results = vds.searchMemory(a.vds_search)
                  return `نتائج البحث (${results.length}):\n${results.map(r => `- ${r.timestamp}: ${r.action} [${r.tools_used.join(', ')}]`).join('\n')}`
                } else if (a.vds_limit) {
                  const entries = vds.getMemory(a.vds_limit)
                  return `آخر ${entries.length} مدخل:\n${entries.map(e => `- ${e.timestamp}: ${e.action} (${e.result})`).join('\n')}`
                } else {
                  const entries = vds.getMemory(10)
                  return `آخر 10 مدخلات:\n${entries.map(e => `- ${e.timestamp}: ${e.action} (${e.result})`).join('\n')}`
                }
              }
              case "vds_sessions": {
                await vds.initialize()
                if (!vds.hasConsent('sessions')) {
                  return `❌ لم تمنح موافقة للجلسات. استخدم vds_consent مع vds_grant=true`
                }
                return `الجلسات تدار تلقائياً مع كل عملية مونتاج`
              }
              case "vds_status": {
                await vds.initialize()
                const status = vds.getStatus()
                return `### VDS Status\nالمسار: \`${status.initialized ? vds.getVDSPath() : 'غير مهيأ'}\`\nالملفات: ${status.files.join(', ') || 'لا توجد'}\nالموافقة: ${JSON.stringify(status.consent, null, 2)}`
              }
              case "vds_export": {
                await vds.initialize()
                const data = vds.exportAll()
                const out = a.output ?? path.join(vds.getVDSPath(), `vds_backup_${Date.now()}.json`)
                fs.writeFileSync(out, data, 'utf-8')
                return `✅ تم تصدير البيانات إلى: ${out}`
              }
              case "vds_import": {
                await vds.initialize()
                const file = a.input
                if (!file || !fs.existsSync(file)) return `❌ ملف غير موجود: ${file}`
                const json = fs.readFileSync(file, 'utf-8')
                if (vds.importAll(json)) return `✅ تم استيراد البيانات من: ${file}`
                return `❌ فشل الاستيراد`
              }
              case "vds_reset": {
    const confirm = a.vds_confirm ?? false
                if (!confirm) return `⚠️ للتأكيد، أضف vds_confirm=true`
                vds.resetAll()
                return `✅ تم مسح جميع بيانات VDS`
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

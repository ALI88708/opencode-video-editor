// VDS Plugin for OpenCode - Main Plugin with Tools
// Provides: vds_init, vds_write, vds_read, vds_list, vds_delete, vds_export, vds_import, vds_reset

import { type Plugin, tool } from "@opencode-ai/plugin";
import { 
  getVDSManager, 
  VDSFormat, 
  VDSData, 
  VDSGeneralData, 
  VDSUserData, 
  VDSSystemData,
  VDSEncryption,
  DEFAULT_ENCRYPTION_CONFIG,
  EncryptedData
} from "./vds_core.js";

// Default encryption key (empty for repo - user sets their own)
const DEFAULT_MASTER_KEY = ""; // SET YOUR KEY HERE

// Initialize VDS Manager
const vds = getVDSManager(DEFAULT_MASTER_KEY);

export const VDSPlugin: Plugin = async ({ $, directory }) => {
  // Initialize on load
  await vds.initialize();
  console.log('[VDS Plugin] Initialized at:', vds.getVDSPath());

  return {
    tool: {
      // ============================================
      // VDS INIT - Initialize VDS directory and files
      // ============================================
      vds_init: tool({
        description: "تهيئة نظام VDS - إنشاء مجلد Documents/Virtual Data Space/ وملفات .vds, .vdsu, .vdss",
        args: {
          master_key: tool.schema.string().optional().describe("مفتاح التشفير للملف .vdss (فارغ = لا تشفير)"),
          force: tool.schema.boolean().optional().describe("إعادة التهيئة حتى لو موجود"),
        },
        async execute(args) {
          const { master_key, force } = args;
          
          if (master_key) {
            vds.setEncryptionKey(master_key);
          }
          
          if (force) {
            vds.resetAll();
          }
          
          const success = await vds.initialize();
          const files = vds.listFiles();
          
          return `### VDS Initialized ${success ? '✅' : '❌'}\n` +
            `المسار: \`${vds.getVDSPath()}\`\n` +
            `التشفير: ${vds.hasEncryption() ? 'مفعل 🔐' : 'معطل 🔓'}\n` +
            `الملفات:\n` +
            files.map(f => `- ${f.format}: ${f.exists ? 'موجود ✅' : 'غير موجود ❌'} (${f.path})`).join('\n');
        }
      }),

      // ============================================
      // VDS WRITE - Write data to a specific format
      // ============================================
      vds_write: tool({
        description: "كتابة بيانات لملف VDS محدد (.vds, .vdsu, .vdss)",
        args: {
          format: tool.schema.enum(['vds', 'vdsu', 'vdss']).describe("نوع الملف: vds (عام), vdsu (يوزر), vdss (نظام مشفر)"),
          data: tool.schema.string().describe("البيانات كـ JSON string"),
          merge: tool.schema.boolean().optional().describe("دمج مع البيانات الموجودة (true) أو استبدال (false, افتراضي)"),
        },
        async execute(args) {
          const { format, data, merge } = args;
          
          let parsed: any;
          try {
            parsed = JSON.parse(data);
          } catch (e) {
            return `❌ JSON غير صالح: ${e}`;
          }

          // Validate format-specific structure
          const validation = validateData(format, parsed);
          if (!validation.valid) {
            return `❌ هيكل البيانات غير صحيح لـ .${format}:\n${validation.errors.join('\n')}`;
          }

          let finalData = parsed;
          
          if (merge) {
            const existing = vds.read(format);
            if (existing) {
              finalData = deepMerge(existing, parsed);
            }
          }

          const success = vds.write(format, finalData);
          const fileInfo = vds.getFileInfo(format as VDSFormat);
          
          return `### VDS Write ${success ? '✅' : '❌'}\n` +
            `الملف: \`${format}\`\n` +
            `المسار: \`${fileInfo.path}\`\n` +
            `الحجم: ${fileInfo.size ? (fileInfo.size / 1024).toFixed(2) + ' KB' : '0 KB'}\n` +
            `مُشفر: ${fileInfo.encrypted ? 'نعم 🔐' : 'لا 🔓'}`;
        }
      }),

      // ============================================
      // VDS READ - Read data from a specific format
      // ============================================
      vds_read: tool({
        description: "قراءة بيانات من ملف VDS محدد",
        args: {
          format: tool.schema.enum(['vds', 'vdsu', 'vdss']).describe("نوع الملف"),
          pretty: tool.schema.boolean().optional().describe("تنسيق JSON بشكل مقروء (افتراضي: true)"),
        },
        async execute(args) {
          const { format, pretty } = args;
          
          const data = vds.read(format as VDSFormat);
          
          if (!data) {
            return `❌ ملف .${format} غير موجود أو فارغ\nالمسار المتوقع: \`${vds.getFileInfo(format as VDSFormat).path}\``;
          }

          const output = pretty !== false ? JSON.stringify(data, null, 2) : JSON.stringify(data);
          
          return `### VDS Read (.${format}) ✅\n` +
            `المسار: \`${vds.getFileInfo(format as VDSFormat).path}\`\n` +
            `\`\`\`json\n${output}\n\`\`\``;
        }
      }),

      // ============================================
      // VDS LIST - List all VDS files
      // ============================================
      vds_list: tool({
        description: "عرض جميع ملفات VDS وحالتها",
        args: {},
        async execute() {
          const files = vds.listFiles();
          const hasEncryption = vds.hasEncryption();
          
          return `### VDS Files List\n` +
            `المجلد: \`${vds.getVDSPath()}\`\n` +
            `التشفير: ${hasEncryption ? 'مفعل 🔐' : 'معطل 🔓'}\n\n` +
            files.map(f => 
              `**${f.format.toUpperCase()}** ${f.exists ? '✅' : '❌'}\n` +
              `  المسار: \`${f.path}\`\n` +
              `  الحجم: ${f.size ? (f.size / 1024).toFixed(2) + ' KB' : '0 KB'}\n` +
              `  معدل: ${f.modified ? f.modified.toLocaleString() : '—'}\n` +
              `  مُشفر: ${f.encrypted ? 'نعم 🔐' : 'لا 🔓'}`
            ).join('\n\n');
        }
      }),

      // ============================================
      // VDS DELETE - Delete a specific VDS file
      // ============================================
      vds_delete: tool({
        description: "حذف ملف VDS محدد",
        args: {
          format: tool.schema.enum(['vds', 'vdsu', 'vdss']).describe("نوع الملف للحذف"),
          confirm: tool.schema.boolean().describe("تأكيد الحذف (مطلوب: true)"),
        },
        async execute(args) {
          const { format, confirm } = args;
          
          if (!confirm) {
            return `⚠️ يتطلب تأكيد: أضف confirm=true`;
          }
          
          const success = vds.delete(format as VDSFormat);
          
          return `### VDS Delete ${success ? '✅' : '❌'}\n` +
            `الملف: .${format}\n` +
            `${success ? 'تم الحذف' : 'الملف غير موجود'}`;
        }
      }),

      // ============================================
      // VDS EXPORT - Export all data (decrypted)
      // ============================================
      vds_export: tool({
        description: "تصدير جميع بيانات VDS لملف JSON (مفكك التشفير للنسخ الاحتياطي)",
        args: {
          output: tool.schema.string().optional().describe("مسار ملف الإخراج (افتراضي: vds_backup_<timestamp>.json)"),
        },
        async execute(args) {
          const { output } = args;
          const outPath = output || path.join(vds.getVDSPath(), `vds_backup_${Date.now()}.json`);
          
          const success = vds.exportAll(outPath);
          
          return `### VDS Export ${success ? '✅' : '❌'}\n` +
            `الملف: \`${outPath}\`\n` +
            `${success ? 'تم التصدير (البيانات مفككة التشفير)' : 'فشل'}`;
        }
      }),

      // ============================================
      // VDS IMPORT - Import data from JSON
      // ============================================
      vds_import: tool({
        description: "استيراد بيانات VDS من ملف JSON",
        args: {
          input: tool.schema.string().describe("مسار ملف JSON للاستيراد"),
        },
        async execute(args) {
          const { input } = args;
          
          if (!fs.existsSync(input)) {
            return `❌ ملف غير موجود: ${input}`;
          }
          
          const success = vds.importAll(input);
          
          return `### VDS Import ${success ? '✅' : '❌'}\n` +
            `المصدر: \`${input}\`\n` +
            `${success ? 'تم الاستيراد' : 'فشل'}`;
        }
      }),

      // ============================================
      // VDS RESET - Reset all VDS data
      // ============================================
      vds_reset: tool({
        description: "مسح جميع بيانات VDS (يتطلب تأكيد)",
        args: {
          confirm: tool.schema.boolean().describe("تأكيد المسح الكامل (مطلوب: true)"),
          keep_structure: tool.schema.boolean().optional().describe("الاحتفاظ بهيكل المجلد (افتراضي: true)"),
        },
        async execute(args) {
          const { confirm, keep_structure } = args;
          
          if (!confirm) {
            return `⚠️ يتطلب تأكيد: أضف confirm=true`;
          }
          
          const success = vds.resetAll();
          
          if (keep_structure !== false) {
            await vds.initialize();
          }
          
          return `### VDS Reset ${success ? '✅' : '❌'}\n` +
            `تم مسح جميع الملفات: general.vds, user.vdsu, system.vdss\n` +
            `المجلد: ${keep_structure !== false ? 'محفوظ' : 'محذوف'}`;
        }
      }),

      // ============================================
      // VDS ENCRYPT - Encrypt a file manually
      // ============================================
      vds_encrypt: tool({
        description: "تشفير ملف يدوياً (لـ .vdss أو أي ملف)",
        args: {
          input: tool.schema.string().describe("مسار ملف الإدخال"),
          output: tool.schema.string().optional().describe("مسار ملف الإخراج"),
          key: tool.schema.string().optional().describe("مفتاح التشفير (افتراضي: المفتاح الحالي)"),
        },
        async execute(args) {
          const { input, output, key } = args;
          
          if (!fs.existsSync(input)) {
            return `❌ ملف غير موجود: ${input}`;
          }
          
          const outPath = output || input.replace(/\.vds$/, '.vdss');
          const encryption = key ? new VDSEncryption(key, DEFAULT_ENCRYPTION_CONFIG) : 
                              (vds.hasEncryption() ? new VDSEncryption(DEFAULT_MASTER_KEY, DEFAULT_ENCRYPTION_CONFIG) : null);
          
          if (!encryption) {
            return `❌ لا يوجد مفتاح تشفير. أضف key أو شغل vds_init مع master_key`;
          }
          
          const success = encryption.encryptFile(input, outPath);
          
          return `### VDS Encrypt ${success ? '✅' : '❌'}\n` +
            `المصدر: \`${input}\`\n` +
            `الهدف: \`${outPath}\``;
        }
      }),

      // ============================================
      // VDS DECRYPT - Decrypt a file manually
      // ============================================
      vds_decrypt: tool({
        description: "فك تشفير ملف يدوياً",
        args: {
          input: tool.schema.string().describe("مسار الملف المشفر"),
          output: tool.schema.string().optional().describe("مسار ملف الإخراج"),
          key: tool.schema.string().optional().describe("مفتاح التشفير"),
        },
        async execute(args) {
          const { input, output, key } = args;
          
          if (!fs.existsSync(input)) {
            return `❌ ملف غير موجود: ${input}`;
          }
          
          const outPath = output || input.replace(/\.vdss$/, '.vds');
          const encryption = key ? new VDSEncryption(key, DEFAULT_ENCRYPTION_CONFIG) : 
                              (vds.hasEncryption() ? new VDSEncryption(DEFAULT_MASTER_KEY, DEFAULT_ENCRYPTION_CONFIG) : null);
          
          if (!encryption) {
            return `❌ لا يوجد مفتاح تشفير. أضف key`;
          }
          
          const success = encryption.decryptFile(input, outPath);
          
          return `### VDS Decrypt ${success ? '✅' : '❌'}\n` +
            `المصدر: \`${input}\`\n` +
            `الهدف: \`${outPath}\``;
        }
      }),

      // ============================================
      // VDS INFO - Show system info
      // ============================================
      vds_info: tool({
        description: "معلومات نظام VDS",
        args: {},
        async execute() {
          const files = vds.listFiles();
          const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
          
          return `### VDS System Info\n` +
            `المجلد: \`${vds.getVDSPath()}\`\n` +
            `التشفير: ${vds.hasEncryption() ? 'مفعل 🔐' : 'معطل 🔓'}\n` +
            `إجمالي الملفات: ${files.filter(f => f.exists).length}/3\n` +
            `إجمالي الحجم: ${(totalSize / 1024).toFixed(2)} KB\n\n` +
            files.map(f => 
              `${f.format.toUpperCase()}: ${f.exists ? '✅' : '❌'} ${f.encrypted ? '🔐' : '🔓'} ${f.size ? `(${f.size} bytes)` : ''}`
            ).join('\n');
        }
      }),
    }
  };
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function validateData(format: VDSFormat, data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  switch (format) {
    case 'vds':
      if (!data.data || typeof data.data !== 'object') {
        errors.push('.vds يتطلب حقل "data" من نوع object');
      }
      break;
      
    case 'vdsu':
      if (data.identity && typeof data.identity !== 'object') {
        errors.push('identity يجب أن يكون object');
      }
      if (data.preferences && typeof data.preferences !== 'object') {
        errors.push('preferences يجب أن يكون object');
      }
      break;
      
    case 'vdss':
      // System data - flexible structure
      break;
  }
  
  return { valid: errors.length === 0, errors };
}

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}
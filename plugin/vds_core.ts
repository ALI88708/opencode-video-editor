// VDS Core - Virtual Data Space Core Library
// Supports: .vds (general), .vdsu (user), .vdss (encrypted system)

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// ============================================
// TYPES
// ============================================

export type VDSFormat = 'vds' | 'vdsu' | 'vdss';

export interface VDSFileInfo {
  format: VDSFormat;
  path: string;
  exists: boolean;
  size?: number;
  modified?: Date;
  encrypted?: boolean;
}

export interface VDSMetadata {
  version: string;
  format: VDSFormat;
  created_at: string;
  updated_at: string;
  schema_version: number;
}

export interface VDSGeneralData extends VDSMetadata {
  format: 'vds';
  data: Record<string, any>; // عشوائية - أي بيانات عامة
}

export interface VDSUserData extends VDSMetadata {
  format: 'vdsu';
  identity?: {
    name: string;
    age?: number;
    country?: string;
    company?: string;
    projects?: string[];
  };
  preferences?: {
    montage_style?: string;
    favorite_tools?: string[];
    preferred_luts?: string[];
    preferred_sfx_categories?: string[];
    default_export_presets?: string[];
    language?: string;
    timezone?: string;
  };
  paths?: Record<string, string>;
  instructions?: string;
}

export interface VDSSystemData extends VDSMetadata {
  format: 'vdss';
  ai_memory?: Record<string, any>;
  tool_knowledge?: Record<string, any>;
  execution_history?: Array<{
    timestamp: string;
    action: string;
    input: string;
    output: string;
    tools_used: string[];
    result: 'success' | 'partial' | 'failed';
    lessons_learned: string[];
  }>;
  agent_plans?: Record<string, any>;
  project_state?: Record<string, any>;
  secrets?: Record<string, string>; // API keys, passwords
  internal_config?: Record<string, any>;
}

export type VDSData = VDSGeneralData | VDSUserData | VDSSystemData;

// ============================================
// ENCRYPTION (AES-256-GCM with PBKDF2)
// ============================================

export interface EncryptionConfig {
  algorithm: 'aes-256-gcm';
  keyDerivation: 'pbkdf2';
  iterations: number;
  keyLength: number;
  ivLength: number;
  saltLength: number;
  tagLength: number;
}

export const DEFAULT_ENCRYPTION_CONFIG: EncryptionConfig = {
  algorithm: 'aes-256-gcm',
  keyDerivation: 'pbkdf2',
  iterations: 100000,
  keyLength: 32,
  ivLength: 12,
  saltLength: 16,
  tagLength: 16
};

export interface EncryptedData {
  version: number;
  salt: string;      // base64
  iv: string;        // base64
  ciphertext: string; // base64
  tag: string;       // base64 (GCM auth tag)
}

export class VDSEncryption {
  private config: EncryptionConfig;
  private masterKey: string;

  constructor(masterKey: string, config: Partial<EncryptionConfig> = {}) {
    this.masterKey = masterKey;
    this.config = { ...DEFAULT_ENCRYPTION_CONFIG, ...config };
  }

  // Derive key from master key + salt
  private deriveKey(salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
      this.masterKey,
      salt,
      this.config.iterations,
      this.config.keyLength,
      'sha256'
    );
  }

  // Encrypt plaintext JSON string
  encrypt(plaintext: string): EncryptedData {
    const salt = crypto.randomBytes(this.config.saltLength);
    const iv = crypto.randomBytes(this.config.ivLength);
    const key = this.deriveKey(salt);

    const cipher = crypto.createCipheriv(this.config.algorithm, key, iv, {
      authTagLength: this.config.tagLength
    });

    const ciphertext = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    return {
      version: 1,
      salt: salt.toString('base64'),
      iv: iv.toString('base64'),
      ciphertext: ciphertext.toString('base64'),
      tag: tag.toString('base64')
    };
  }

  // Decrypt to plaintext JSON string
  decrypt(encrypted: EncryptedData): string {
    const salt = Buffer.from(encrypted.salt, 'base64');
    const iv = Buffer.from(encrypted.iv, 'base64');
    const ciphertext = Buffer.from(encrypted.ciphertext, 'base64');
    const tag = Buffer.from(encrypted.tag, 'base64');
    const key = this.deriveKey(salt);

    const decipher = crypto.createDecipheriv(this.config.algorithm, key, iv, {
      authTagLength: this.config.tagLength
    });
    decipher.setAuthTag(tag);

    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final()
    ]);

    return plaintext.toString('utf8');
  }

  // Encrypt file
  encryptFile(inputPath: string, outputPath: string): boolean {
    try {
      const plaintext = fs.readFileSync(inputPath, 'utf8');
      const encrypted = this.encrypt(plaintext);
      fs.writeFileSync(outputPath, JSON.stringify(encrypted, null, 2), 'utf8');
      return true;
    } catch (e) {
      console.error('[VDS Encryption] Encrypt file failed:', e);
      return false;
    }
  }

  // Decrypt file
  decryptFile(inputPath: string, outputPath: string): boolean {
    try {
      const content = fs.readFileSync(inputPath, 'utf8');
      const encrypted = JSON.parse(content) as EncryptedData;
      const plaintext = this.decrypt(encrypted);
      fs.writeFileSync(outputPath, plaintext, 'utf8');
      return true;
    } catch (e) {
      console.error('[VDS Encryption] Decrypt file failed:', e);
      return false;
    }
  }
}

// ============================================
// VDS FILE MANAGER
// ============================================

const VDS_DIR = path.join(os.homedir(), 'Documents', 'Virtual Data Space');

export const VDS_FILES = {
  vds: 'general.vds',
  vdsu: 'user.vdsu',
  vdss: 'system.vdss'
} as const;

export class VDSManager {
  private encryption: VDSEncryption | null = null;
  private initialized = false;

  constructor(masterKey?: string) {
    if (masterKey) {
      this.encryption = new VDSEncryption(masterKey);
    }
  }

  // Initialize directory
  async initialize(): Promise<boolean> {
    try {
      if (!fs.existsSync(VDS_DIR)) {
        fs.mkdirSync(VDS_DIR, { recursive: true });
        console.log(`[VDS] Created directory: ${VDS_DIR}`);
      }
      this.initialized = true;
      return true;
    } catch (e) {
      console.error('[VDS] Init failed:', e);
      return false;
    }
  }

  // Get file path for format
  getFilePath(format: VDSFormat): string {
    return path.join(VDS_DIR, VDS_FILES[format]);
  }

  // Check if file exists
  exists(format: VDSFormat): boolean {
    return fs.existsSync(this.getFilePath(format));
  }

  // Get file info
  getFileInfo(format: VDSFormat): VDSFileInfo {
    const filePath = this.getFilePath(format);
    const exists = fs.existsSync(filePath);
    let size: number | undefined;
    let modified: Date | undefined;
    
    if (exists) {
      const stats = fs.statSync(filePath);
      size = stats.size;
      modified = stats.mtime;
    }

    return {
      format,
      path: filePath,
      exists,
      size,
      modified,
      encrypted: format === 'vdss'
    };
  }

  // List all VDS files
  listFiles(): VDSFileInfo[] {
    return (['vds', 'vdsu', 'vdss'] as VDSFormat[]).map(f => this.getFileInfo(f));
  }

  // Read data (auto-decrypt if .vdss)
  read(format: VDSFormat): VDSData | null {
    const filePath = this.getFilePath(format);
    if (!fs.existsSync(filePath)) return null;

    try {
      let content: string;
      
      if (format === 'vdss' && this.encryption) {
        // Decrypt .vdss
        const encrypted = JSON.parse(fs.readFileSync(filePath, 'utf8')) as EncryptedData;
        content = this.encryption.decrypt(encrypted);
      } else {
        // Read plain .vds or .vdsu
        content = fs.readFileSync(filePath, 'utf8');
      }
      
      return JSON.parse(content) as VDSData;
    } catch (e) {
      console.error(`[VDS] Read ${format} failed:`, e);
      return null;
    }
  }

  // Write data (auto-encrypt if .vdss)
  write(format: VDSFormat, data: VDSData): boolean {
    const filePath = this.getFilePath(format);
    
    try {
      // Update metadata
      const now = new Date().toISOString();
      if (!data.created_at) data.created_at = now;
      data.updated_at = now;
      data.version = data.version || '1.0.0';
      data.schema_version = data.schema_version || 1;

      let content = JSON.stringify(data, null, 2);

      if (format === 'vdss' && this.encryption) {
        // Encrypt .vdss
        const encrypted = this.encryption.encrypt(content);
        content = JSON.stringify(encrypted, null, 2);
      }

      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } catch (e) {
      console.error(`[VDS] Write ${format} failed:`, e);
      return false;
    }
  }

  // Delete file
  delete(format: VDSFormat): boolean {
    const filePath = this.getFilePath(format);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  // Export all (decrypted for backup)
  exportAll(outputPath: string): boolean {
    try {
      const exportData: Record<string, any> = {};
      
      for (const format of ['vds', 'vdsu', 'vdss'] as VDSFormat[]) {
        const data = this.read(format);
        if (data) {
          exportData[format] = data;
        }
      }
      
      fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf8');
      return true;
    } catch (e) {
      console.error('[VDS] Export failed:', e);
      return false;
    }
  }

  // Import all
  importAll(inputPath: string): boolean {
    try {
      const content = fs.readFileSync(inputPath, 'utf8');
      const importData = JSON.parse(content);
      
      for (const format of ['vds', 'vdsu', 'vdss'] as VDSFormat[]) {
        if (importData[format]) {
          this.write(format, importData[format]);
        }
      }
      return true;
    } catch (e) {
      console.error('[VDS] Import failed:', e);
      return false;
    }
  }

  // Reset all
  resetAll(): boolean {
    try {
      for (const format of ['vds', 'vdsu', 'vdss'] as VDSFormat[]) {
        this.delete(format);
      }
      return true;
    } catch (e) {
      console.error('[VDS] Reset failed:', e);
      return false;
    }
  }

  // Get VDS directory path
  getVDSPath(): string {
    return VDS_DIR;
  }

  // Set encryption key (for .vdss)
  setEncryptionKey(key: string): void {
    this.encryption = new VDSEncryption(key);
  }

  // Check if encryption is available
  hasEncryption(): boolean {
    return this.encryption !== null;
  }
}

// Singleton
let managerInstance: VDSManager | null = null;

export function getVDSManager(masterKey?: string): VDSManager {
  if (!managerInstance) {
    managerInstance = new VDSManager(masterKey);
  }
  return managerInstance;
}

export function setVDSManager(manager: VDSManager): void {
  managerInstance = manager;
}
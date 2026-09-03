// VDS (Virtual Data Space) Plugin - Integrated with Video Editor
// Human-readable JSON storage in Documents/Virtual Data Space/

import * as fs from 'fs';
import * as path from 'path';
import { 
  VDSData, VDSIdentity, VDSPreferences, VDSMemory, VDSSessions, VDSConsent,
  VDS_FILES, VDS_SCHEMA_VERSION, VDS_VERSION, DEFAULT_CONSENT,
  VDSMemoryEntry, VDSSession, VDSFileName
} from './vds_types.js';

const VDS_DIR = path.join(process.env.USERPROFILE || '', 'Documents', 'Virtual Data Space');

export class VDSPlugin {
  private data: VDSData;
  private initialized = false;

  constructor() {
    this.data = this.getEmptyData();
  }

  private getEmptyData(): VDSData {
    return {
      consent: { ...DEFAULT_CONSENT },
      version: VDS_VERSION,
      schema_version: VDS_SCHEMA_VERSION
    };
  }

  // Initialize VDS - creates directory and loads data
  async initialize(): Promise<boolean> {
    if (this.initialized) return true;

    try {
      // Create directory if not exists
      if (!fs.existsSync(VDS_DIR)) {
        fs.mkdirSync(VDS_DIR, { recursive: true });
        console.log(`[VDS] Created directory: ${VDS_DIR}`);
      }

      // Load existing data
      await this.loadAll();

      this.initialized = true;
      return true;
    } catch (error) {
      console.error('[VDS] Initialization failed:', error);
      return false;
    }
  }

  // Load all VDS files
  private async loadAll(): Promise<void> {
    for (const [key, filename] of Object.entries(VDS_FILES)) {
      const filePath = path.join(VDS_DIR, filename);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(content);
          (this.data as any)[key] = parsed;
        } catch (e) {
          console.warn(`[VDS] Failed to load ${filename}:`, e);
        }
      }
    }
  }

  // Save specific VDS file (human-readable JSON)
  private saveFile(filename: VDSFileName, data: any): boolean {
    try {
      const filePath = path.join(VDS_DIR, filename);
      const json = JSON.stringify(data, null, 2); // Pretty print for human readability
      fs.writeFileSync(filePath, json, 'utf-8');
      return true;
    } catch (error) {
      console.error(`[VDS] Failed to save ${filename}:`, error);
      return false;
    }
  }

  // Save all data
  saveAll(): boolean {
    let success = true;
    for (const [key, filename] of Object.entries(VDS_FILES)) {
      if ((this.data as any)[key] !== undefined) {
        success = this.saveFile(filename, (this.data as any)[key]) && success;
      }
    }
    return success;
  }

  // ===== CONSENT MANAGEMENT =====

  // Check if consent given for a category
  hasConsent(category: keyof VDSConsent): boolean {
    return this.data.consent?.[category] === true;
  }

  // Request consent from user (called by video editor before saving)
  async requestConsent(category: keyof VDSConsent, reason: string): Promise<boolean> {
    if (this.hasConsent(category)) return true;

    // In real usage, this would prompt the user via the CLI
    // For now, we return false and let the caller handle the prompt
    console.log(`[VDS] Consent needed for "${category}": ${reason}`);
    return false;
  }

  // Grant consent (after user says yes)
  grantConsent(category: keyof VDSConsent): boolean {
    this.data.consent[category] = true;
    this.data.consent.last_updated = new Date().toISOString();
    return this.saveFile(VDS_FILES.consent, this.data.consent);
  }

  // Revoke consent
  revokeConsent(category: keyof VDSConsent): boolean {
    this.data.consent[category] = false;
    this.data.consent.last_updated = new Date().toISOString();
    // Optionally delete the data file
    const filename = VDS_FILES[category as keyof typeof VDS_FILES];
    if (filename && fs.existsSync(path.join(VDS_DIR, filename))) {
      fs.unlinkSync(path.join(VDS_DIR, filename));
    }
    delete (this.data as any)[category];
    return this.saveFile(VDS_FILES.consent, this.data.consent);
  }

  // ===== IDENTITY =====

  setIdentity(identity: Omit<VDSIdentity, 'created_at' | 'updated_at'>): boolean {
    if (!this.hasConsent('identity')) return false;

    const now = new Date().toISOString();
    this.data.identity = {
      ...identity,
      created_at: this.data.identity?.created_at || now,
      updated_at: now
    };
    return this.saveFile(VDS_FILES.identity, this.data.identity);
  }

  getIdentity(): VDSIdentity | undefined {
    return this.data.identity;
  }

  // ===== PREFERENCES =====

  setPreferences(prefs: Partial<VDSPreferences>): boolean {
    if (!this.hasConsent('preferences')) return false;

    const now = new Date().toISOString();
    this.data.preferences = {
      ...this.getDefaultPreferences(),
      ...this.data.preferences,
      ...prefs,
      updated_at: now
    };
    return this.saveFile(VDS_FILES.preferences, this.data.preferences);
  }

  getPreferences(): VDSPreferences | undefined {
    return this.data.preferences;
  }

  private getDefaultPreferences(): VDSPreferences {
    return {
      montage_style: 'gaming',
      favorite_tools: [],
      preferred_luts: [],
      preferred_sfx_categories: [],
      default_export_presets: ['youtube'],
      language: 'ar',
      timezone: 'Asia/Baghdad',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  // ===== MEMORY =====

  addMemoryEntry(entry: Omit<VDSMemoryEntry, 'timestamp'>): boolean {
    if (!this.hasConsent('memory')) return false;

    const now = new Date().toISOString();
    const newEntry: VDSMemoryEntry = {
      ...entry,
      timestamp: now
    };

    if (!this.data.memory) {
      this.data.memory = {
        entries: [],
        total_sessions: 0,
        last_session: now,
        created_at: now,
        updated_at: now
      };
    }

    this.data.memory.entries.push(newEntry);
    this.data.memory.last_session = now;
    this.data.memory.updated_at = now;

    // Keep only last 1000 entries
    if (this.data.memory.entries.length > 1000) {
      this.data.memory.entries = this.data.memory.entries.slice(-1000);
    }

    return this.saveFile(VDS_FILES.memory, this.data.memory);
  }

  getMemory(limit = 50): VDSMemoryEntry[] {
    if (!this.data.memory) return [];
    return this.data.memory.entries.slice(-limit);
  }

  searchMemory(query: string): VDSMemoryEntry[] {
    if (!this.data.memory) return [];
    const lower = query.toLowerCase();
    return this.data.memory.entries.filter(e => 
      e.action.toLowerCase().includes(lower) ||
      e.tools_used.some(t => t.toLowerCase().includes(lower)) ||
      e.notes.toLowerCase().includes(lower)
    );
  }

  // ===== SESSIONS =====

  startSession(sessionId: string): VDSSession {
    const session: VDSSession = {
      session_id: sessionId,
      start_time: new Date().toISOString(),
      commands: [],
      files_processed: [],
      duration_seconds: 0
    };

    if (!this.hasConsent('sessions')) return session;

    if (!this.data.sessions) {
      this.data.sessions = {
        sessions: [],
        created_at: session.start_time,
        updated_at: session.start_time
      };
    }

    this.data.sessions.sessions.push(session);
    this.data.sessions.updated_at = session.start_time;
    this.saveFile(VDS_FILES.sessions, this.data.sessions);

    return session;
  }

  endSession(sessionId: string, commands: string[], files: string[]): boolean {
    if (!this.hasConsent('sessions') || !this.data.sessions) return false;

    const session = this.data.sessions.sessions.find(s => s.session_id === sessionId);
    if (!session) return false;

    session.end_time = new Date().toISOString();
    session.commands = commands;
    session.files_processed = files;
    session.duration_seconds = Math.floor(
      (new Date(session.end_time).getTime() - new Date(session.start_time).getTime()) / 1000
    );

    this.data.sessions.updated_at = session.end_time;
    this.data.memory = this.data.memory || { entries: [], total_sessions: 0, last_session: '', created_at: '', updated_at: '' };
    this.data.memory.total_sessions += 1;

    return this.saveFile(VDS_FILES.sessions, this.data.sessions) && this.saveAll();
  }

  addCommandToSession(sessionId: string, command: string): void {
    if (!this.hasConsent('sessions') || !this.data.sessions) return;
    const session = this.data.sessions.sessions.find(s => s.session_id === sessionId);
    if (session) {
      session.commands.push(command);
    }
  }

  addFileToSession(sessionId: string, file: string): void {
    if (!this.hasConsent('sessions') || !this.data.sessions) return;
    const session = this.data.sessions.sessions.find(s => s.session_id === sessionId);
    if (session) {
      session.files_processed.push(file);
    }
  }

  // ===== UTILITIES =====

  getVDSPath(): string {
    return VDS_DIR;
  }

  getStatus(): { initialized: boolean; consent: VDSConsent; files: string[] } {
    const files = Object.values(VDS_FILES).filter(f => 
      fs.existsSync(path.join(VDS_DIR, f))
    );
    return {
      initialized: this.initialized,
      consent: this.data.consent || DEFAULT_CONSENT,
      files
    };
  }

  // Export all data (for backup/transfer)
  exportAll(): string {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data (for restore/transfer)
  importAll(json: string): boolean {
    try {
      const imported = JSON.parse(json) as VDSData;
      this.data = { ...this.getEmptyData(), ...imported };
      return this.saveAll();
    } catch {
      return false;
    }
  }

  // Reset all data (with consent)
  resetAll(): boolean {
    this.data = this.getEmptyData();
    for (const filename of Object.values(VDS_FILES)) {
      const filePath = path.join(VDS_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    return true;
  }
}

// Singleton instance
export const vds = new VDSPlugin();
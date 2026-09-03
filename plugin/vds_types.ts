// VDS (Virtual Data Space) Types - Human-readable JSON storage
// Located at: Documents/Virtual Data Space/

export interface VDSIdentity {
  name: string;
  age: number;
  country: string;
  company: string;
  projects: string[];
  created_at: string;
  updated_at: string;
}

export interface VDSPreferences {
  montage_style: 'gaming' | 'cinematic' | 'podcast' | 'vlog' | 'educational' | 'commercial' | 'music_video';
  favorite_tools: string[];
  preferred_luts: string[];
  preferred_sfx_categories: ('click' | 'meme' | 'suspense' | 'transition')[];
  default_export_presets: ('youtube' | 'tiktok' | 'reels' | 'shorts' | 'instagram' | 'twitter')[];
  language: 'ar' | 'en' | 'both';
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface VDSMemoryEntry {
  timestamp: string;
  session_id: string;
  action: string;
  input: string;
  output: string;
  tools_used: string[];
  result: 'success' | 'partial' | 'failed';
  notes: string;
  lessons_learned: string[];
}

export interface VDSMemory {
  entries: VDSMemoryEntry[];
  total_sessions: number;
  last_session: string;
  created_at: string;
  updated_at: string;
}

export interface VDSSession {
  session_id: string;
  start_time: string;
  end_time?: string;
  commands: string[];
  files_processed: string[];
  duration_seconds: number;
}

export interface VDSSessions {
  sessions: VDSSession[];
  created_at: string;
  updated_at: string;
}

export interface VDSConsent {
  identity: boolean;
  preferences: boolean;
  memory: boolean;
  sessions: boolean;
  analytics: boolean;
  last_updated: string;
}

export interface VDSData {
  identity?: VDSIdentity;
  preferences?: VDSPreferences;
  memory?: VDSMemory;
  sessions?: VDSSessions;
  consent: VDSConsent;
  version: string;
  schema_version: number;
}

export const VDS_SCHEMA_VERSION = 1;
export const VDS_VERSION = '1.0.0';

export const DEFAULT_CONSENT: VDSConsent = {
  identity: false,
  preferences: false,
  memory: false,
  sessions: false,
  analytics: false,
  last_updated: new Date().toISOString()
};

export const VDS_FILES = {
  identity: 'identity.vds',
  preferences: 'preferences.vds',
  memory: 'memory.vds',
  sessions: 'sessions.vds',
  consent: 'consent.vds'
} as const;

export type VDSFileName = typeof VDS_FILES[keyof typeof VDS_FILES];
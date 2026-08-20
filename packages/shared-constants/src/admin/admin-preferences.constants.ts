/**
 * অ্যাডমিন প্রিফারেন্স সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// প্রিফারেন্স আইডি প্রিফিক্স
export const PREFERENCE_ID_PREFIX = 'PRF';

// ডিফল্ট প্রিফারেন্স
export const DEFAULT_PREFERENCES = {
  theme: {
    mode: 'light',
    primaryColor: '#3B82F6',
    secondaryColor: '#6B7280',
    fontSize: 'medium',
    fontFamily: 'system-ui',
  },
  language: {
    code: 'en',
    region: 'US',
    autoDetect: true,
  },
  timezone: {
    zone: 'UTC',
    format: '24h',
  },
  date_format: {
    format: 'YYYY-MM-DD',
    separator: '-',
  },
  notification_preferences: {
    email: true,
    push: true,
    sms: false,
    inApp: true,
    sound: true,
  },
  dashboard_layout: {
    widgets: ['statistics', 'recent_activity', 'quick_actions', 'notifications'],
    columns: 3,
    compact: false,
  },
} as const;

// প্রিফারেন্স ক্যাটাগরি
export const PREFERENCE_CATEGORIES = {
  APPEARANCE: 'appearance',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  DATE_FORMAT: 'date_format',
  NOTIFICATIONS: 'notifications',
  DASHBOARD: 'dashboard',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  ACCESSIBILITY: 'accessibility',
} as const;

// প্রিফারেন্স স্টোরেজ টাইপ
export const PREFERENCE_STORAGE_TYPES = {
  LOCAL: 'local',
  SESSION: 'session',
  COOKIE: 'cookie',
  DATABASE: 'database',
  REDIS: 'redis',
} as const;

// প্রিফারেন্স সিঙ্ক ইন্টারভাল (মিনিটে)
export const PREFERENCE_SYNC_INTERVAL = 5;

// প্রিফারেন্স ব্যাচ সাইজ
export const PREFERENCE_BATCH_SIZE = 50;

// প্রিফারেন্স ক্যাশ টাইমআউট (সেকেন্ডে)
export const PREFERENCE_CACHE_TIMEOUT = 3600; // ১ ঘন্টা

// প্রিফারেন্স রেট লিমিট (প্রতি মিনিটে)
export const PREFERENCE_RATE_LIMIT = 20;

// প্রিফারেন্স ম্যাক্স সাইজ (কেবি)
export const PREFERENCE_MAX_SIZE = 50;

// প্রিফারেন্স ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const PREFERENCE_CLEANUP_SCHEDULE = '0 2 * * *'; // প্রতিদিন রাত ২টায়

// প্রিফারেন্স এনক্রিপশন সেটিংস
export const PREFERENCE_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// প্রিফারেন্স মনিটরিং সেটিংস
export const PREFERENCE_MONITORING = {
  enabled: true,
  alertThreshold: 50, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// প্রিফারেন্স অডিট ট্রেইল
export const PREFERENCE_AUDIT_TRAIL = {
  enabled: true,
  logCreate: true,
  logUpdate: true,
  logDelete: true,
  logExport: true,
  logImport: true,
} as const;

// প্রিফারেন্স ভ্যালিডেশন সেটিংস
export const PREFERENCE_VALIDATION = {
  strictMode: true,
  validateOnSave: true,
  validateOnLoad: true,
  allowUnknownKeys: false,
} as const;

// প্রিফারেন্স ডিফল্ট থিম
export const PREFERENCE_DEFAULT_THEME = {
  light: {
    background: '#FFFFFF',
    text: '#1A202C',
    primary: '#3B82F6',
    secondary: '#6B7280',
    accent: '#10B981',
    border: '#E5E7EB',
  },
  dark: {
    background: '#1A202C',
    text: '#F7FAFC',
    primary: '#60A5FA',
    secondary: '#9CA3AF',
    accent: '#34D399',
    border: '#374151',
  },
} as const;

// প্রিফারেন্স ভাষা সমর্থন
export const PREFERENCE_LANGUAGE_SUPPORT = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
} as const;

// প্রিফারেন্স টাইমজোন সমর্থন
export const PREFERENCE_TIMEZONE_SUPPORT = [
  'UTC',
  'Asia/Dhaka',
  'Asia/Kolkata',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Australia/Sydney',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
] as const;

// প্রিফারেন্স ডেট ফরম্যাট সমর্থন
export const PREFERENCE_DATE_FORMATS = {
  'YYYY-MM-DD': '2024-01-01',
  'DD/MM/YYYY': '01/01/2024',
  'MM/DD/YYYY': '01/01/2024',
  'DD-MM-YYYY': '01-01-2024',
  'MM-DD-YYYY': '01-01-2024',
  'YYYY/MM/DD': '2024/01/01',
  'DD MMM YYYY': '01 Jan 2024',
  'MMMM DD, YYYY': 'January 01, 2024',
} as const;

/**
 * অ্যাডমিন সেটিংস সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// সেটিংস আইডি প্রিফিক্স
export const SETTINGS_ID_PREFIX = 'SET';

// সেটিংস ক্যাটাগরি লিস্ট
export const SETTINGS_CATEGORIES = {
  SYSTEM: 'system',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
  APPEARANCE: 'appearance',
  LANGUAGE: 'language',
  INTEGRATION: 'integration',
} as const;

// ডিফল্ট সেটিংস
export const DEFAULT_SETTINGS = {
  system: {
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    weekStart: 'monday',
    maintenanceMode: false,
    debugMode: false,
  },
  security: {
    sessionTimeout: 30, // মিনিট
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    twoFactorAuth: false,
    ipWhitelist: [],
  },
  notification: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    notificationSound: true,
    emailDigest: false,
    emailDigestFrequency: 'daily',
  },
  appearance: {
    theme: 'light',
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    compactMode: false,
    sidebarCollapsed: false,
  },
  language: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'bn'],
    autoDetect: true,
  },
  integration: {
    slackWebhook: '',
    discordWebhook: '',
    telegramBot: '',
    webhookUrl: '',
  },
} as const;

// সেটিংস টাইপ
export const SETTINGS_TYPES = {
  SYSTEM: 'system',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
  APPEARANCE: 'appearance',
  LANGUAGE: 'language',
  INTEGRATION: 'integration',
} as const;

// সেটিংস ক্যাশে টাইমআউট (সেকেন্ডে)
export const SETTINGS_CACHE_TIMEOUT = 3600; // ১ ঘন্টা

// সেটিংস ব্যাকআপ ইন্টারভাল (দিনে)
export const SETTINGS_BACKUP_INTERVAL = 7; // ৭ দিন

// সেটিংস আপডেট লগিং নিয়ম
export const SETTINGS_UPDATE_LOGGING = {
  enabled: true,
  logChanges: true,
  logUser: true,
  logTimestamp: true,
  logIP: true,
} as const;

// সেটিংস ব্যাচ সাইজ
export const SETTINGS_BATCH_SIZE = 50;

// সেটিংস রেট লিমিট (প্রতি মিনিটে)
export const SETTINGS_RATE_LIMIT = 100;

// সেটিংস ম্যাক্স ফাইল সাইজ (এমবিতে)
export const SETTINGS_MAX_FILE_SIZE = 5;

// সেটিংস ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const SETTINGS_CLEANUP_SCHEDULE = '0 4 * * 0'; // প্রতি রবিবার রাত ৪টায়

// সেটিংস এনক্রিপশন সেটিংস
export const SETTINGS_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// সেটিংস মনিটরিং সেটিংস
export const SETTINGS_MONITORING = {
  enabled: true,
  alertThreshold: 10, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// সেটিংস অডিট ট্রেইল
export const SETTINGS_AUDIT_TRAIL = {
  enabled: true,
  logCreate: true,
  logUpdate: true,
  logDelete: true,
  logExport: true,
  logImport: true,
} as const;

// সেটিংস ভ্যালিডেশন সেটিংস
export const SETTINGS_VALIDATION = {
  strictMode: true,
  allowUnknownKeys: false,
  validateOnSave: true,
  validateOnLoad: true,
} as const;

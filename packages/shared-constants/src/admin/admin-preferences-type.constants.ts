/**
 * অ্যাডমিন প্রিফারেন্সের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// প্রিফারেন্স টাইপ
export const PREFERENCE_TYPES = {
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATION: 'notification',
  LAYOUT: 'layout',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  ACCESSIBILITY: 'accessibility',
} as const;

// টাইপের আইকন
export const PREFERENCE_TYPE_ICONS = {
  THEME: '🎨',
  LANGUAGE: '🌐',
  NOTIFICATION: '🔔',
  LAYOUT: '📐',
  SECURITY: '🔒',
  PRIVACY: '🛡️',
  ACCESSIBILITY: '♿',
} as const;

// টাইপের ডেসক্রিপশন
export const PREFERENCE_TYPE_DESCRIPTIONS = {
  THEME: 'Visual appearance and color scheme',
  LANGUAGE: 'Language and regional settings',
  NOTIFICATION: 'Notification and alert preferences',
  LAYOUT: 'Dashboard layout and widget settings',
  SECURITY: 'Security and authentication preferences',
  PRIVACY: 'Privacy and data sharing preferences',
  ACCESSIBILITY: 'Accessibility and assistive preferences',
} as const;

// টাইপের ডেটা ফরম্যাট
export const PREFERENCE_DATA_FORMATS = {
  THEME: {
    mode: ['light', 'dark', 'system'],
    primaryColor: 'string',
    fontSize: ['small', 'medium', 'large'],
    fontFamily: 'string',
  },
  LANGUAGE: {
    code: 'string',
    region: 'string',
    autoDetect: 'boolean',
  },
  NOTIFICATION: {
    email: 'boolean',
    push: 'boolean',
    sms: 'boolean',
    inApp: 'boolean',
    sound: 'boolean',
  },
  LAYOUT: {
    widgets: 'array',
    columns: 'number',
    compact: 'boolean',
  },
  SECURITY: {
    twoFactorAuth: 'boolean',
    sessionTimeout: 'number',
    rememberMe: 'boolean',
  },
  PRIVACY: {
    shareAnalytics: 'boolean',
    shareUsage: 'boolean',
    personalize: 'boolean',
  },
  ACCESSIBILITY: {
    highContrast: 'boolean',
    largerText: 'boolean',
    reduceMotion: 'boolean',
    screenReader: 'boolean',
  },
} as const;

// টাইপের UI কম্পোনেন্ট টাইপ
export const PREFERENCE_UI_COMPONENTS = {
  THEME: 'theme-selector',
  LANGUAGE: 'language-selector',
  NOTIFICATION: 'toggle-list',
  LAYOUT: 'layout-editor',
  SECURITY: 'security-settings',
  PRIVACY: 'privacy-settings',
  ACCESSIBILITY: 'accessibility-settings',
} as const;

// টাইপ গ্রুপ
export const PREFERENCE_TYPE_GROUPS = {
  APPEARANCE: ['theme', 'language'],
  BEHAVIOR: ['notification', 'layout'],
  SECURITY: ['security', 'privacy'],
  ACCESSIBILITY: ['accessibility'],
} as const;

// টাইপের লেবেল (বাংলা)
export const PREFERENCE_TYPE_LABELS_BN = {
  THEME: 'থিম',
  LANGUAGE: 'ভাষা',
  NOTIFICATION: 'নোটিফিকেশন',
  LAYOUT: 'লেআউট',
  SECURITY: 'নিরাপত্তা',
  PRIVACY: 'গোপনীয়তা',
  ACCESSIBILITY: 'অ্যাক্সেসিবিলিটি',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const PREFERENCE_TYPE_LABELS_EN = {
  THEME: 'Theme',
  LANGUAGE: 'Language',
  NOTIFICATION: 'Notification',
  LAYOUT: 'Layout',
  SECURITY: 'Security',
  PRIVACY: 'Privacy',
  ACCESSIBILITY: 'Accessibility',
} as const;

// টাইপের CSS ক্লাস
export const PREFERENCE_TYPE_CSS_CLASSES = {
  THEME: 'pref-theme',
  LANGUAGE: 'pref-language',
  NOTIFICATION: 'pref-notification',
  LAYOUT: 'pref-layout',
  SECURITY: 'pref-security',
  PRIVACY: 'pref-privacy',
  ACCESSIBILITY: 'pref-accessibility',
} as const;

// টাইপের জন্য ইমোজি
export const PREFERENCE_TYPE_EMOJIS = {
  THEME: '🎨',
  LANGUAGE: '🗣️',
  NOTIFICATION: '📢',
  LAYOUT: '📋',
  SECURITY: '🔐',
  PRIVACY: '🛡️',
  ACCESSIBILITY: '♿',
} as const;

// টাইপের প্রায়োরিটি (১ = সর্বোচ্চ)
export const PREFERENCE_TYPE_PRIORITY = {
  THEME: 1,
  LANGUAGE: 2,
  NOTIFICATION: 3,
  LAYOUT: 4,
  SECURITY: 1,
  PRIVACY: 2,
  ACCESSIBILITY: 3,
} as const;

// টাইপের স্টোরেজ পদ্ধতি
export const PREFERENCE_STORAGE_METHODS = {
  THEME: 'local',
  LANGUAGE: 'local',
  NOTIFICATION: 'database',
  LAYOUT: 'database',
  SECURITY: 'database',
  PRIVACY: 'database',
  ACCESSIBILITY: 'local',
} as const;

// টাইপের সিঙ্ক পদ্ধতি
export const PREFERENCE_SYNC_METHODS = {
  THEME: 'realtime',
  LANGUAGE: 'realtime',
  NOTIFICATION: 'realtime',
  LAYOUT: 'realtime',
  SECURITY: 'realtime',
  PRIVACY: 'realtime',
  ACCESSIBILITY: 'realtime',
} as const;

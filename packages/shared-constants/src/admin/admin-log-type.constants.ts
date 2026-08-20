/**
 * অ্যাডমিন লগের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// লগ টাইপ
export const LOG_TYPES = {
  SYSTEM: 'system',
  SECURITY: 'security',
  APPLICATION: 'application',
  ACCESS: 'access',
  DATABASE: 'database',
  PERFORMANCE: 'performance',
  ERROR: 'error',
  AUDIT: 'audit',
} as const;

// টাইপের আইকন
export const LOG_TYPE_ICONS = {
  SYSTEM: '🖥️',
  SECURITY: '🔒',
  APPLICATION: '📱',
  ACCESS: '🚪',
  DATABASE: '🗄️',
  PERFORMANCE: '⚡',
  ERROR: '💥',
  AUDIT: '📋',
} as const;

// টাইপের কালার কোড
export const LOG_TYPE_COLORS = {
  SYSTEM: '#6366F1', // ইন্ডিগো
  SECURITY: '#DC2626', // লাল
  APPLICATION: '#3B82F6', // নীল
  ACCESS: '#F59E0B', // কমলা
  DATABASE: '#8B5CF6', // বেগুনি
  PERFORMANCE: '#22C55E', // সবুজ
  ERROR: '#EF4444', // লাল
  AUDIT: '#EC4899', // গোলাপি
} as const;

// টাইপের লেভেল
export const LOG_TYPE_LEVEL = {
  SYSTEM: 'info',
  SECURITY: 'warn',
  APPLICATION: 'info',
  ACCESS: 'debug',
  DATABASE: 'debug',
  PERFORMANCE: 'info',
  ERROR: 'error',
  AUDIT: 'info',
} as const;

// টাইপের ডেসক্রিপশন
export const LOG_TYPE_DESCRIPTIONS = {
  SYSTEM: 'System operations and maintenance logs',
  SECURITY: 'Security events and authentication logs',
  APPLICATION: 'Application behavior and functionality logs',
  ACCESS: 'User access and API call logs',
  DATABASE: 'Database queries and operations logs',
  PERFORMANCE: 'System performance and resource usage logs',
  ERROR: 'Application errors and exception logs',
  AUDIT: 'Audit trail and compliance logs',
} as const;

// টাইপের স্টোরেজ প্রায়োরিটি (১ = সর্বোচ্চ)
export const LOG_TYPE_STORAGE_PRIORITY = {
  SYSTEM: 2,
  SECURITY: 1,
  APPLICATION: 3,
  ACCESS: 4,
  DATABASE: 5,
  PERFORMANCE: 4,
  ERROR: 1,
  AUDIT: 1,
} as const;

// টাইপ গ্রুপ
export const LOG_TYPE_GROUPS = {
  OPERATIONAL: ['system', 'application', 'performance'],
  SECURITY: ['security', 'access'],
  DATA: ['database', 'audit'],
  ERRORS: ['error'],
} as const;

// টাইপের রিটেনশন পিরিয়ড (দিনে)
export const LOG_TYPE_RETENTION = {
  SYSTEM: 60,
  SECURITY: 90,
  APPLICATION: 30,
  ACCESS: 30,
  DATABASE: 45,
  PERFORMANCE: 15,
  ERROR: 90,
  AUDIT: 365,
} as const;

// টাইপের লেবেল (বাংলা)
export const LOG_TYPE_LABELS_BN = {
  SYSTEM: 'সিস্টেম',
  SECURITY: 'নিরাপত্তা',
  APPLICATION: 'অ্যাপ্লিকেশন',
  ACCESS: 'অ্যাক্সেস',
  DATABASE: 'ডেটাবেস',
  PERFORMANCE: 'পারফরম্যান্স',
  ERROR: 'এরর',
  AUDIT: 'অডিট',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const LOG_TYPE_LABELS_EN = {
  SYSTEM: 'System',
  SECURITY: 'Security',
  APPLICATION: 'Application',
  ACCESS: 'Access',
  DATABASE: 'Database',
  PERFORMANCE: 'Performance',
  ERROR: 'Error',
  AUDIT: 'Audit',
} as const;

// টাইপের CSS ক্লাস
export const LOG_TYPE_CSS_CLASSES = {
  SYSTEM: 'log-system',
  SECURITY: 'log-security',
  APPLICATION: 'log-application',
  ACCESS: 'log-access',
  DATABASE: 'log-database',
  PERFORMANCE: 'log-performance',
  ERROR: 'log-error',
  AUDIT: 'log-audit',
} as const;

// টাইপের জন্য ইমোজি
export const LOG_TYPE_EMOJIS = {
  SYSTEM: '💻',
  SECURITY: '🛡️',
  APPLICATION: '📲',
  ACCESS: '🚪',
  DATABASE: '📊',
  PERFORMANCE: '📈',
  ERROR: '🔥',
  AUDIT: '📝',
} as const;

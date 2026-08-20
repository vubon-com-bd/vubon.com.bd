/**
 * অ্যাডমিন অডিট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// অডিট আইডি প্রিফিক্স
export const AUDIT_ID_PREFIX = 'AUD';

// অডিট রিটেনশন ডে (দিনে)
export const AUDIT_RETENTION_DAYS = 365; // ১ বছর

// অডিট রিপোর্ট ফরম্যাট
export const AUDIT_REPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  EXCEL: 'xlsx',
  JSON: 'json',
  HTML: 'html',
} as const;

// অডিট এক্সপোর্ট লিমিট
export const AUDIT_EXPORT_LIMIT = 50000; // সর্বোচ্চ ৫০,০০০ রেকর্ড

// ডিফল্ট অডিট ফিল্টার
export const DEFAULT_AUDIT_FILTER = {
  dateRange: {
    start: null,
    end: null,
  },
  types: [],
  status: [],
  severity: ['high', 'medium'],
  userId: null,
} as const;

// অডিট স্টোরেজ পাথ
export const AUDIT_STORAGE_PATH = 'audit/logs';

// অডিট ব্যাকআপ ইন্টারভাল (দিনে)
export const AUDIT_BACKUP_INTERVAL = 7; // ৭ দিন

// অডিট ব্যাচ সাইজ
export const AUDIT_BATCH_SIZE = 2000;

// অডিট ক্যাশ টাইমআউট (সেকেন্ডে)
export const AUDIT_CACHE_TIMEOUT = 600; // ১০ মিনিট

// অডিট রেট লিমিট (প্রতি মিনিটে)
export const AUDIT_RATE_LIMIT = 500;

// অডিট ম্যাক্স ফাইল সাইজ (এমবিতে)
export const AUDIT_MAX_FILE_SIZE = 100;

// অডিট ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const AUDIT_CLEANUP_SCHEDULE = '0 3 * * 0'; // প্রতি রবিবার রাত ৩টায়

// অডিট আর্কাইভ শিডিউল (ক্রন এক্সপ্রেশন)
export const AUDIT_ARCHIVE_SCHEDULE = '0 4 * * 0'; // প্রতি রবিবার রাত ৪টায়

// অডিট সেভিরিটি লেভেল
export const AUDIT_SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// অডিট সেভিরিটি কালার
export const AUDIT_SEVERITY_COLORS = {
  LOW: '#22C55E',
  MEDIUM: '#F59E0B',
  HIGH: '#EF4444',
  CRITICAL: '#DC2626',
} as const;

// অডিট সেভিরিটি আইকন
export const AUDIT_SEVERITY_ICONS = {
  LOW: '🟢',
  MEDIUM: '🟡',
  HIGH: '🔴',
  CRITICAL: '🔥',
} as const;

// অডিট এনক্রিপশন সেটিংস
export const AUDIT_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// অডিট মনিটরিং সেটিংস
export const AUDIT_MONITORING = {
  enabled: true,
  alertThreshold: 100, // প্রতি ঘন্টায়
  criticalThreshold: 10, // প্রতি ঘন্টায়
  notificationEmail: 'admin@vubon.com',
} as const;

// অডিট কমপ্লায়েন্স সেটিংস
export const AUDIT_COMPLIANCE = {
  gdpr: true,
  hipaa: false,
  pci: true,
  sox: false,
  retentionPeriod: 365, // দিন
  requireConsent: true,
} as const;

// অডিট রিপোর্ট টেমপ্লেট
export const AUDIT_REPORT_TEMPLATES = {
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  COMPLIANCE: 'compliance',
  FORENSIC: 'forensic',
} as const;

// অডিট ফরম্যাট সেটিংস
export const AUDIT_FORMAT_SETTINGS = {
  includeTimestamp: true,
  includeUser: true,
  includeIP: true,
  includeAction: true,
  includeDetails: true,
  includeSeverity: true,
} as const;

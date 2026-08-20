/**
 * অ্যাডমিন রিপোর্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// রিপোর্ট আইডি প্রিফিক্স
export const REPORT_ID_PREFIX = 'RPT';

// ডিফল্ট রিপোর্ট ফরম্যাট
export const DEFAULT_REPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
} as const;

// রিপোর্ট জেনারেশন টাইমআউট (মিনিটে)
export const REPORT_GENERATION_TIMEOUT = 30;

// রিপোর্ট স্টোরেজ পাথ
export const REPORT_STORAGE_PATH = 'reports';

// রিপোর্ট ম্যাক্স সাইজ (এমবি)
export const REPORT_MAX_SIZE = 50;

// রিপোর্ট আর্কাইভ ইন্টারভাল (দিনে)
export const REPORT_ARCHIVE_INTERVAL = 30;

// রিপোর্ট স্কেডিউল ডিফল্ট সময়
export const REPORT_SCHEDULE_DEFAULT_TIME = '00:00';

// রিপোর্ট ইমেইল টেমপ্লেট পাথ
export const REPORT_EMAIL_TEMPLATE_PATH = 'templates/emails/reports';

// রিপোর্ট ব্যাচ সাইজ
export const REPORT_BATCH_SIZE = 50;

// রিপোর্ট ক্যাশ টাইমআউট (সেকেন্ডে)
export const REPORT_CACHE_TIMEOUT = 3600; // ১ ঘন্টা

// রিপোর্ট রেট লিমিট (প্রতি মিনিটে)
export const REPORT_RATE_LIMIT = 10;

// রিপোর্ট ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const REPORT_CLEANUP_SCHEDULE = '0 3 * * 0'; // প্রতি রবিবার রাত ৩টায়

// রিপোর্ট এনক্রিপশন সেটিংস
export const REPORT_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// রিপোর্ট মনিটরিং সেটিংস
export const REPORT_MONITORING = {
  enabled: true,
  alertThreshold: 5, // প্রতি ঘন্টায়
  notificationEmail: 'admin@vubon.com',
} as const;

// রিপোর্ট অডিট ট্রেইল
export const REPORT_AUDIT_TRAIL = {
  enabled: true,
  logCreate: true,
  logGenerate: true,
  logDownload: true,
  logEmail: true,
  logDelete: true,
} as const;

// রিপোর্ট ডেলিভারি সেটিংস
export const REPORT_DELIVERY_SETTINGS = {
  maxRetries: 3,
  retryDelay: 60, // সেকেন্ড
  emailSubject: 'Report Generated',
  emailFrom: 'reports@vubon.com',
} as const;

// রিপোর্ট কম্প্রেশন সেটিংস
export const REPORT_COMPRESSION = {
  enabled: true,
  format: 'zip',
  level: 6,
} as const;

// রিপোর্ট টেমপ্লেট সেটিংস
export const REPORT_TEMPLATE_SETTINGS = {
  cacheEnabled: true,
  cacheTimeout: 3600, // সেকেন্ড
  autoReload: true,
} as const;

// রিপোর্ট ফরম্যাট এক্সটেনশন
export const REPORT_FORMAT_EXTENSIONS = {
  PDF: '.pdf',
  EXCEL: '.xlsx',
  CSV: '.csv',
  JSON: '.json',
} as const;

// রিপোর্ট ফরম্যাট MIME টাইপ
export const REPORT_FORMAT_MIME_TYPES = {
  PDF: 'application/pdf',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
  JSON: 'application/json',
} as const;

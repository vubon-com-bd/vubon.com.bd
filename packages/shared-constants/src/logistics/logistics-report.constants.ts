/**
 * লজিস্টিকস রিপোর্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট আইডির প্রিফিক্স
 */
export const REPORT_PREFIX = 'RPT-' as const;

/**
 * রিপোর্ট আইডির ফরম্যাট
 */
export const REPORT_ID_FORMAT = {
  PREFIX: REPORT_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডিফল্ট রিপোর্ট ফরম্যাট
 */
export const DEFAULT_REPORT_FORMAT = 'PDF' as const;

/**
 * রিপোর্ট ফরম্যাট
 */
export const REPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  EXCEL: 'excel',
  JSON: 'json',
  HTML: 'html',
} as const;

/**
 * রিপোর্ট ফরম্যাট টাইপ
 */
export type ReportFormat = (typeof REPORT_FORMATS)[keyof typeof REPORT_FORMATS];

/**
 * রিপোর্টের সর্বোচ্চ ডেটা পয়েন্ট
 */
export const MAX_REPORT_DATA_POINTS = 10000;

/**
 * রিপোর্ট জেনারেশন টাইমআউট (সেকেন্ড)
 */
export const REPORT_GENERATION_TIMEOUT_SECONDS = 300;

/**
 * রিপোর্ট স্টোরেজ পিরিয়ড (দিন)
 */
export const REPORT_STORAGE_DAYS = 90;

/**
 * রিপোর্টের ডিফল্ট পেজিনেশন
 */
export const REPORT_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 100,
} as const;

/**
 * রিপোর্ট কনফিগারেশন
 */
export const REPORT_CONFIG = {
  PREFIX: REPORT_PREFIX,
  ID_FORMAT: REPORT_ID_FORMAT,
  DEFAULT_FORMAT: DEFAULT_REPORT_FORMAT,
  FORMATS: REPORT_FORMATS,
  MAX_DATA_POINTS: MAX_REPORT_DATA_POINTS,
  GENERATION_TIMEOUT: REPORT_GENERATION_TIMEOUT_SECONDS,
  STORAGE_DAYS: REPORT_STORAGE_DAYS,
  PAGINATION: REPORT_PAGINATION,
} as const;

/**
 * রিপোর্ট কনফিগারেশন টাইপ
 */
export type ReportConfig = typeof REPORT_CONFIG;

/**
 * রিপোর্ট আইডি জেনারেট করুন
 */
export function generateReportId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${REPORT_PREFIX}${dateStr}${REPORT_ID_FORMAT.SEPARATOR}${random}`;
}

/**
 * রিপোর্ট আইডি ভালিডেট করুন
 */
export function isValidReportId(id: string): boolean {
  return id.startsWith(REPORT_PREFIX) && id.length >= 15;
}

/**
 * রিপোর্ট ফরম্যাট ভালিডেট করুন
 */
export function isValidReportFormat(format: string): format is ReportFormat {
  return Object.values(REPORT_FORMATS).includes(format as ReportFormat);
}

/**
 * রিপোর্ট ডেটা পয়েন্ট ভালিডেট করুন
 */
export function isValidReportDataPoints(count: number): boolean {
  return count > 0 && count <= MAX_REPORT_DATA_POINTS;
}

/**
 * রিপোর্ট ফরম্যাটের এক্সটেনশন পাওয়া
 */
export function getReportFormatExtension(format: ReportFormat): string {
  const extensions: Record<ReportFormat, string> = {
    [REPORT_FORMATS.PDF]: '.pdf',
    [REPORT_FORMATS.CSV]: '.csv',
    [REPORT_FORMATS.EXCEL]: '.xlsx',
    [REPORT_FORMATS.JSON]: '.json',
    [REPORT_FORMATS.HTML]: '.html',
  };
  return extensions[format];
}

/**
 * রিপোর্ট ফরম্যাটের MIME টাইপ পাওয়া
 */
export function getReportFormatMimeType(format: ReportFormat): string {
  const mimeTypes: Record<ReportFormat, string> = {
    [REPORT_FORMATS.PDF]: 'application/pdf',
    [REPORT_FORMATS.CSV]: 'text/csv',
    [REPORT_FORMATS.EXCEL]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [REPORT_FORMATS.JSON]: 'application/json',
    [REPORT_FORMATS.HTML]: 'text/html',
  };
  return mimeTypes[format];
}

/**
 * রিপোর্ট স্টোরেজ এক্সপাইরেশন তারিখ গণনা করুন
 */
export function calculateReportExpiryDate(createdDate: Date): Date {
  const expiryDate = new Date(createdDate);
  expiryDate.setDate(expiryDate.getDate() + REPORT_STORAGE_DAYS);
  return expiryDate;
}

/**
 * রিপোর্ট এক্সপাইর হয়েছে কিনা চেক করুন
 */
export function isReportExpired(createdDate: Date): boolean {
  const expiryDate = calculateReportExpiryDate(createdDate);
  return new Date() > expiryDate;
}

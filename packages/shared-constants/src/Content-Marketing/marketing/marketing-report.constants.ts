/**
 * মার্কেটিং রিপোর্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রিপোর্টের ধরনসমূহ
 */
export const REPORT_TYPES = ['performance', 'roi', 'campaign', 'channel'] as const;

/**
 * রিপোর্ট ফরম্যাটসমূহ
 */
export const REPORT_FORMATS = ['pdf', 'excel', 'csv', 'html'] as const;

/**
 * রিপোর্ট টাইপ টাইপ
 */
export type ReportType = (typeof REPORT_TYPES)[number];

/**
 * রিপোর্ট ফরম্যাট টাইপ
 */
export type ReportFormat = (typeof REPORT_FORMATS)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * প্রতিটি রিপোর্ট টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const REPORT_TYPE_LABELS = {
  performance: {
    en: 'Performance Report',
    bn: 'পারফরম্যান্স রিপোর্ট',
  },
  roi: {
    en: 'ROI Report',
    bn: 'আরওআই রিপোর্ট',
  },
  campaign: {
    en: 'Campaign Report',
    bn: 'ক্যাম্পেইন রিপোর্ট',
  },
  channel: {
    en: 'Channel Report',
    bn: 'চ্যানেল রিপোর্ট',
  },
} as const satisfies Record<ReportType, { en: string; bn: string }>;

/**
 * প্রতিটি রিপোর্ট ফরম্যাটের লেবেল (বাংলা এবং ইংরেজি)
 */
export const REPORT_FORMAT_LABELS = {
  pdf: {
    en: 'PDF',
    bn: 'পিডিএফ',
  },
  excel: {
    en: 'Excel',
    bn: 'এক্সেল',
  },
  csv: {
    en: 'CSV',
    bn: 'সিএসভি',
  },
  html: {
    en: 'HTML',
    bn: 'এইচটিএমএল',
  },
} as const satisfies Record<ReportFormat, { en: string; bn: string }>;

/**
 * প্রতিটি রিপোর্ট ফরম্যাটের MIME টাইপ
 */
export const REPORT_MIME_TYPES = {
  pdf: 'application/pdf',
  excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',
  html: 'text/html',
} as const satisfies Record<ReportFormat, string>;

/**
 * প্রতিটি রিপোর্ট ফরম্যাটের এক্সটেনশন
 */
export const REPORT_EXTENSIONS = {
  pdf: '.pdf',
  excel: '.xlsx',
  csv: '.csv',
  html: '.html',
} as const satisfies Record<ReportFormat, string>;

/**
 * রিপোর্ট ইন্টারফেস
 */
export interface ReportInterface {
  id: string;
  name: string;
  type: ReportType;
  format: ReportFormat;
  data: Record<string, unknown>;
  generatedAt: Date;
  createdBy: string;
  size?: number;
  url?: string;
  metadata?: ReportMetadata;
}

/**
 * রিপোর্ট মেটাডেটা ইন্টারফেস
 */
export interface ReportMetadata {
  description?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  metrics?: string[];
  filters?: Record<string, unknown>;
  isScheduled?: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly';
}

/**
 * রিপোর্ট তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateReportInput {
  name: string;
  type: ReportType;
  format: ReportFormat;
  data: Record<string, unknown>;
  createdBy: string;
  metadata?: ReportMetadata;
}

/**
 * রিপোর্ট ফিল্টার ইন্টারফেস
 */
export interface ReportFilter {
  type?: ReportType;
  format?: ReportFormat;
  fromDate?: Date;
  toDate?: Date;
  createdBy?: string;
  limit?: number;
  offset?: number;
}

/**
 * নির্দিষ্ট রিপোর্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getReportTypeLabel(type: ReportType, lang: Language = 'en'): string {
  return REPORT_TYPE_LABELS[type][lang];
}

/**
 * নির্দিষ্ট রিপোর্ট ফরম্যাটের লেবেল পাওয়ার ফাংশন
 */
export function getReportFormatLabel(format: ReportFormat, lang: Language = 'en'): string {
  return REPORT_FORMAT_LABELS[format][lang];
}

/**
 * সব রিপোর্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllReportTypes(): readonly ReportType[] {
  return REPORT_TYPES;
}

/**
 * সব রিপোর্ট ফরম্যাটের তালিকা পাওয়ার ফাংশন
 */
export function getAllReportFormats(): readonly ReportFormat[] {
  return REPORT_FORMATS;
}

/**
 * রিপোর্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReportType(type: string): type is ReportType {
  return REPORT_TYPES.includes(type as ReportType);
}

/**
 * রিপোর্ট ফরম্যাট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReportFormat(format: string): format is ReportFormat {
  return REPORT_FORMATS.includes(format as ReportFormat);
}

/**
 * রিপোর্ট ফরম্যাটের MIME টাইপ পাওয়ার ফাংশন
 */
export function getReportMimeType(format: ReportFormat): string {
  return REPORT_MIME_TYPES[format];
}

/**
 * রিপোর্ট ফরম্যাটের এক্সটেনশন পাওয়ার ফাংশন
 */
export function getReportExtension(format: ReportFormat): string {
  return REPORT_EXTENSIONS[format];
}

/**
 * রিপোর্ট টাইপ পারফরম্যান্স কিনা চেক করার ফাংশন
 */
export function isPerformanceReportType(type: ReportType): boolean {
  return type === 'performance';
}

/**
 * রিপোর্ট টাইপ ROI কিনা চেক করার ফাংশন
 */
export function isRoiReportType(type: ReportType): boolean {
  return type === 'roi';
}

/**
 * রিপোর্ট টাইপ ক্যাম্পেইন কিনা চেক করার ফাংশন
 */
export function isCampaignReportType(type: ReportType): boolean {
  return type === 'campaign';
}

/**
 * রিপোর্ট টাইপ চ্যানেল কিনা চেক করার ফাংশন
 */
export function isChannelReportType(type: ReportType): boolean {
  return type === 'channel';
}

/**
 * রিপোর্ট ফরম্যাট PDF কিনা চেক করার ফাংশন
 */
export function isPdfReportFormat(format: ReportFormat): boolean {
  return format === 'pdf';
}

/**
 * রিপোর্ট ফরম্যাট Excel কিনা চেক করার ফাংশন
 */
export function isExcelReportFormat(format: ReportFormat): boolean {
  return format === 'excel';
}

/**
 * রিপোর্ট ফরম্যাট CSV কিনা চেক করার ফাংশন
 */
export function isCsvReportFormat(format: ReportFormat): boolean {
  return format === 'csv';
}

/**
 * রিপোর্ট ফরম্যাট HTML কিনা চেক করার ফাংশন
 */
export function isHtmlReportFormat(format: ReportFormat): boolean {
  return format === 'html';
}

/**
 * রিপোর্ট ফরম্যাট স্প্রেডশীট (Excel, CSV) কিনা চেক করার ফাংশন
 */
export function isSpreadsheetReportFormat(format: ReportFormat): boolean {
  return format === 'excel' || format === 'csv';
}

/**
 * রিপোর্ট ফরম্যাট ডকুমেন্ট (PDF, HTML) কিনা চেক করার ফাংশন
 */
export function isDocumentReportFormat(format: ReportFormat): boolean {
  return format === 'pdf' || format === 'html';
}

/**
 * ডিফল্ট রিপোর্ট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultReportType(): ReportType {
  return 'performance';
}

/**
 * ডিফল্ট রিপোর্ট ফরম্যাট পাওয়ার ফাংশন
 */
export function getDefaultReportFormat(): ReportFormat {
  return 'pdf';
}

/**
 * রিপোর্ট টাইপের আইকন পাওয়ার ফাংশন
 */
export function getReportTypeIcon(type: ReportType): string {
  const icons: Record<ReportType, string> = {
    performance: '📊',
    roi: '💰',
    campaign: '📈',
    channel: '📡',
  };
  return icons[type];
}

/**
 * রিপোর্ট ফরম্যাটের আইকন পাওয়ার ফাংশন
 */
export function getReportFormatIcon(format: ReportFormat): string {
  const icons: Record<ReportFormat, string> = {
    pdf: '📄',
    excel: '📊',
    csv: '📋',
    html: '🌐',
  };
  return icons[format];
}

/**
 * রিপোর্ট টাইপের রঙ পাওয়ার ফাংশন
 */
export function getReportTypeColor(type: ReportType): string {
  const colors: Record<ReportType, string> = {
    performance: '#3B82F6',
    roi: '#10B981',
    campaign: '#8B5CF6',
    channel: '#F59E0B',
  };
  return colors[type];
}

/**
 * রিপোর্ট ফরম্যাটের রঙ পাওয়ার ফাংশন
 */
export function getReportFormatColor(format: ReportFormat): string {
  const colors: Record<ReportFormat, string> = {
    pdf: '#EF4444',
    excel: '#10B981',
    csv: '#3B82F6',
    html: '#F59E0B',
  };
  return colors[format];
}

/**
 * রিপোর্ট টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getReportTypeDescription(type: ReportType, lang: Language = 'en'): string {
  const descriptions: Record<ReportType, { en: string; bn: string }> = {
    performance: {
      en: 'Overall performance metrics and KPIs',
      bn: 'সামগ্রিক পারফরম্যান্স মেট্রিক্স এবং কেপিআই',
    },
    roi: {
      en: 'Return on investment analysis',
      bn: 'বিনিয়োগে রিটার্ন বিশ্লেষণ',
    },
    campaign: {
      en: 'Campaign performance and results',
      bn: 'ক্যাম্পেইন পারফরম্যান্স এবং ফলাফল',
    },
    channel: {
      en: 'Channel-wise performance analysis',
      bn: 'চ্যানেল-ওয়াইজ পারফরম্যান্স বিশ্লেষণ',
    },
  };
  return descriptions[type][lang];
}

/**
 * সাপোর্ট রিপোর্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট আইডি প্রিফিক্স
 */
export const REPORT_ID_PREFIX = 'RPT';

/**
 * রিপোর্ট নম্বর ফরম্যাট
 */
export const REPORT_NUMBER_FORMAT = 'RPT-{type}-{date}-{sequence}';

/**
 * ডিফল্ট রিপোর্ট ফরম্যাট
 */
export const DEFAULT_REPORT_FORMAT = 'pdf';

/**
 * রিপোর্ট জেনারেশন টাইমআউট (মিনিটে)
 */
export const REPORT_GENERATION_TIMEOUT = 10;

/**
 * রিপোর্ট আর্কাইভ পিরিয়ড (দিনে)
 */
export const REPORT_ARCHIVE_PERIOD = 90;

/**
 * ডিফল্ট রিপোর্ট টাইম জোন
 */
export const DEFAULT_REPORT_TIMEZONE = 'Asia/Dhaka';

/**
 * রিপোর্ট ইমেইল ডেলিভারি সেটিংস
 */
export const REPORT_EMAIL_DELIVERY_SETTINGS = {
  enabled: true,
  fromEmail: 'reports@vubon.com',
  fromName: 'Vubon Reports',
  subjectTemplate: '{reportName} - {date}',
  bodyTemplate: 'আপনার রিপোর্ট প্রস্তুত। সংযুক্ত ফাইলটি দেখুন।',
  maxAttachmentSizeMB: 25,
  retryCount: 3,
  retryDelayMinutes: 5,
} as const;

/**
 * রিপোর্ট ফরম্যাট
 */
export const REPORT_FORMAT = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
  HTML: 'html',
  XML: 'xml',
  TEXT: 'text',
  MARKDOWN: 'markdown',
} as const;

/**
 * রিপোর্ট ফরম্যাটের ডিসপ্লে নাম
 */
export const REPORT_FORMAT_DISPLAY_NAMES = {
  [REPORT_FORMAT.PDF]: 'পিডিএফ',
  [REPORT_FORMAT.EXCEL]: 'এক্সেল',
  [REPORT_FORMAT.CSV]: 'সিএসভি',
  [REPORT_FORMAT.JSON]: 'জেসন',
  [REPORT_FORMAT.HTML]: 'এইচটিএমএল',
  [REPORT_FORMAT.XML]: 'এক্সএমএল',
  [REPORT_FORMAT.TEXT]: 'টেক্সট',
  [REPORT_FORMAT.MARKDOWN]: 'মার্কডাউন',
} as const;

/**
 * রিপোর্ট টাইপ
 */
export const REPORT_TYPE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
  REAL_TIME: 'real_time',
  SCHEDULED: 'scheduled',
  ON_DEMAND: 'on_demand',
} as const;

/**
 * রিপোর্ট টাইপের ডিসপ্লে নাম
 */
export const REPORT_TYPE_DISPLAY_NAMES = {
  [REPORT_TYPE.DAILY]: 'দৈনিক রিপোর্ট',
  [REPORT_TYPE.WEEKLY]: 'সাপ্তাহিক রিপোর্ট',
  [REPORT_TYPE.MONTHLY]: 'মাসিক রিপোর্ট',
  [REPORT_TYPE.QUARTERLY]: 'ত্রৈমাসিক রিপোর্ট',
  [REPORT_TYPE.YEARLY]: 'বার্ষিক রিপোর্ট',
  [REPORT_TYPE.CUSTOM]: 'কাস্টম রিপোর্ট',
  [REPORT_TYPE.REAL_TIME]: 'রিয়েল-টাইম রিপোর্ট',
  [REPORT_TYPE.SCHEDULED]: 'নির্ধারিত রিপোর্ট',
  [REPORT_TYPE.ON_DEMAND]: 'অন-ডিমান্ড রিপোর্ট',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস
 */
export const REPORT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  SCHEDULED: 'scheduled',
  DELIVERED: 'delivered',
} as const;

/**
 * রিপোর্ট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const REPORT_STATUS_DISPLAY_NAMES = {
  [REPORT_STATUS.PENDING]: 'মুলতুবি',
  [REPORT_STATUS.PROCESSING]: 'প্রক্রিয়াধীন',
  [REPORT_STATUS.COMPLETED]: 'সমাপ্ত',
  [REPORT_STATUS.FAILED]: 'ব্যর্থ',
  [REPORT_STATUS.CANCELLED]: 'বাতিল',
  [REPORT_STATUS.SCHEDULED]: 'নির্ধারিত',
  [REPORT_STATUS.DELIVERED]: 'প্রদানকৃত',
} as const;

/**
 * রিপোর্ট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const REPORT_STATUS_COLORS = {
  [REPORT_STATUS.PENDING]: '#f39c12',
  [REPORT_STATUS.PROCESSING]: '#3498db',
  [REPORT_STATUS.COMPLETED]: '#2ecc71',
  [REPORT_STATUS.FAILED]: '#e74c3c',
  [REPORT_STATUS.CANCELLED]: '#95a5a6',
  [REPORT_STATUS.SCHEDULED]: '#9b59b6',
  [REPORT_STATUS.DELIVERED]: '#27ae60',
} as const;

/**
 * রিপোর্ট প্রায়োরিটি
 */
export const REPORT_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * রিপোর্ট প্রায়োরিটির ডিসপ্লে নাম
 */
export const REPORT_PRIORITY_DISPLAY_NAMES = {
  [REPORT_PRIORITY.LOW]: 'নিম্ন',
  [REPORT_PRIORITY.NORMAL]: 'সাধারণ',
  [REPORT_PRIORITY.HIGH]: 'উচ্চ',
  [REPORT_PRIORITY.URGENT]: 'জরুরি',
} as const;

/**
 * রিপোর্ট ডেলিভারি মোড
 */
export const REPORT_DELIVERY_MODE = {
  EMAIL: 'email',
  DOWNLOAD: 'download',
  API: 'api',
  FTP: 'ftp',
  S3: 's3',
  SLACK: 'slack',
  WEBHOOK: 'webhook',
} as const;

/**
 * রিপোর্ট ডেলিভারি মোডের ডিসপ্লে নাম
 */
export const REPORT_DELIVERY_MODE_DISPLAY_NAMES = {
  [REPORT_DELIVERY_MODE.EMAIL]: 'ইমেইল',
  [REPORT_DELIVERY_MODE.DOWNLOAD]: 'ডাউনলোড',
  [REPORT_DELIVERY_MODE.API]: 'এপিআই',
  [REPORT_DELIVERY_MODE.FTP]: 'এফটিপি',
  [REPORT_DELIVERY_MODE.S3]: 'এস৩',
  [REPORT_DELIVERY_MODE.SLACK]: 'স্ল্যাক',
  [REPORT_DELIVERY_MODE.WEBHOOK]: 'ওয়েবহুক',
} as const;

/**
 * রিপোর্ট ডিফল্ট সেটিংস
 */
export const REPORT_DEFAULT_SETTINGS = {
  defaultFormat: DEFAULT_REPORT_FORMAT,
  generationTimeout: REPORT_GENERATION_TIMEOUT,
  archivePeriod: REPORT_ARCHIVE_PERIOD,
  timezone: DEFAULT_REPORT_TIMEZONE,
  emailSettings: REPORT_EMAIL_DELIVERY_SETTINGS,
} as const;

/**
 * রিপোর্ট ভ্যালিডেশন রুলস
 */
export const REPORT_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  description: {
    maxLength: 500,
    required: false,
  },
  parameters: {
    maxCount: 20,
  },
  recipients: {
    maxCount: 50,
  },
  fileSize: {
    maxMB: 100,
  },
} as const;

/**
 * রিপোর্ট ইভেন্ট টাইপ
 */
export const REPORT_EVENT_TYPES = {
  CREATED: 'report_created',
  GENERATED: 'report_generated',
  DELIVERED: 'report_delivered',
  FAILED: 'report_failed',
  CANCELLED: 'report_cancelled',
  SCHEDULED: 'report_scheduled',
  ARCHIVED: 'report_archived',
  DELETED: 'report_deleted',
} as const;

/**
 * রিপোর্ট মেট্রিক্স
 */
export const REPORT_METRICS = {
  TOTAL: 'total',
  GENERATED: 'generated',
  FAILED: 'failed',
  DELIVERED: 'delivered',
  SCHEDULED: 'scheduled',
  AVG_GENERATION_TIME: 'avg_generation_time',
  AVG_SIZE: 'avg_size',
  DELIVERY_RATE: 'delivery_rate',
} as const;

export type ReportIdPrefix = typeof REPORT_ID_PREFIX;
export type ReportFormat = (typeof REPORT_FORMAT)[keyof typeof REPORT_FORMAT];
export type ReportType = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];
export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
export type ReportPriority = (typeof REPORT_PRIORITY)[keyof typeof REPORT_PRIORITY];
export type ReportDeliveryMode = (typeof REPORT_DELIVERY_MODE)[keyof typeof REPORT_DELIVERY_MODE];
export type ReportEventType = (typeof REPORT_EVENT_TYPES)[keyof typeof REPORT_EVENT_TYPES];
export type ReportMetric = (typeof REPORT_METRICS)[keyof typeof REPORT_METRICS];

export interface ReportEmailDeliverySettings {
  enabled: boolean;
  fromEmail: string;
  fromName: string;
  subjectTemplate: string;
  bodyTemplate: string;
  maxAttachmentSizeMB: number;
  retryCount: number;
  retryDelayMinutes: number;
}

export interface ReportDefaultSettings {
  defaultFormat: string;
  generationTimeout: number;
  archivePeriod: number;
  timezone: string;
  emailSettings: ReportEmailDeliverySettings;
}

export interface ReportValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    maxLength: number;
    required: boolean;
  };
  parameters: {
    maxCount: number;
  };
  recipients: {
    maxCount: number;
  };
  fileSize: {
    maxMB: number;
  };
}

export interface ReportParameters {
  timeFrame: {
    start: Date;
    end: Date;
  };
  metrics: string[];
  filters?: Record<string, unknown>;
  groupBy?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export interface ReportSchedule {
  type: ReportType;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
  startDate: Date;
  endDate?: Date;
  lastRun?: Date;
  nextRun?: Date;
}

export interface Report {
  id: string;
  name: string;
  description?: string;
  type: ReportType;
  format: ReportFormat;
  status: ReportStatus;
  priority: ReportPriority;
  parameters: ReportParameters;
  schedule?: ReportSchedule;
  deliveryMode: ReportDeliveryMode;
  recipients?: string[];
  generatedAt?: Date;
  deliveredAt?: Date;
  fileUrl?: string;
  fileSize?: number;
  errorMessage?: string;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface ReportDelivery {
  id: string;
  reportId: string;
  mode: ReportDeliveryMode;
  recipient: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  attemptedAt: Date;
  deliveredAt?: Date;
  errorMessage?: string;
  retryCount: number;
}

export interface ReportAnalytics {
  totalReports: number;
  generatedReports: number;
  failedReports: number;
  deliveredReports: number;
  scheduledReports: number;
  avgGenerationTime: number;
  avgSize: number;
  deliveryRate: number;
  period: string;
}

/**
 * রিপোর্ট কনফিগারেশন
 */
export const REPORT_CONFIG = {
  idPrefix: REPORT_ID_PREFIX,
  numberFormat: REPORT_NUMBER_FORMAT,
  defaultSettings: REPORT_DEFAULT_SETTINGS,
  validationRules: REPORT_VALIDATION_RULES,
  formats: REPORT_FORMAT,
  types: REPORT_TYPE,
  statuses: REPORT_STATUS,
  priorities: REPORT_PRIORITY,
  deliveryModes: REPORT_DELIVERY_MODE,
  eventTypes: REPORT_EVENT_TYPES,
  metrics: REPORT_METRICS,
  statusColors: REPORT_STATUS_COLORS,
} as const;

/**
 * রিপোর্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const REPORT_STATUS_TRANSITIONS = {
  [REPORT_STATUS.PENDING]: ['processing', 'cancelled'],
  [REPORT_STATUS.PROCESSING]: ['completed', 'failed', 'cancelled'],
  [REPORT_STATUS.COMPLETED]: ['delivered', 'archived', 'deleted'],
  [REPORT_STATUS.FAILED]: ['pending', 'cancelled'],
  [REPORT_STATUS.CANCELLED]: ['deleted'],
  [REPORT_STATUS.SCHEDULED]: ['pending', 'cancelled'],
  [REPORT_STATUS.DELIVERED]: ['archived', 'deleted'],
} as const;

/**
 * রিপোর্ট ফরম্যাট ফাইল এক্সটেনশন
 */
export const REPORT_FORMAT_EXTENSIONS = {
  [REPORT_FORMAT.PDF]: '.pdf',
  [REPORT_FORMAT.EXCEL]: '.xlsx',
  [REPORT_FORMAT.CSV]: '.csv',
  [REPORT_FORMAT.JSON]: '.json',
  [REPORT_FORMAT.HTML]: '.html',
  [REPORT_FORMAT.XML]: '.xml',
  [REPORT_FORMAT.TEXT]: '.txt',
  [REPORT_FORMAT.MARKDOWN]: '.md',
} as const;

/**
 * রিপোর্ট ফরম্যাট MIME টাইপ
 */
export const REPORT_FORMAT_MIME_TYPES = {
  [REPORT_FORMAT.PDF]: 'application/pdf',
  [REPORT_FORMAT.EXCEL]: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  [REPORT_FORMAT.CSV]: 'text/csv',
  [REPORT_FORMAT.JSON]: 'application/json',
  [REPORT_FORMAT.HTML]: 'text/html',
  [REPORT_FORMAT.XML]: 'application/xml',
  [REPORT_FORMAT.TEXT]: 'text/plain',
  [REPORT_FORMAT.MARKDOWN]: 'text/markdown',
} as const;

/**
 * রিপোর্ট ফ্রিকোয়েন্সি
 */
export const REPORT_FREQUENCY = {
  ONCE: 'once',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

export type ReportFrequency = (typeof REPORT_FREQUENCY)[keyof typeof REPORT_FREQUENCY];

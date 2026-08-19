/**
 * রিপোর্টের স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট স্ট্যাটাস (বিস্তারিত)
 */
export const ReportStatusExtended = {
  QUEUED: 'QUEUED',
  GENERATING: 'GENERATING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  DOWNLOADED: 'DOWNLOADED',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস (বিস্তারিত) - ইউনিয়ন টাইপ
 */
export type ReportStatusExtendedValue =
  (typeof ReportStatusExtended)[keyof typeof ReportStatusExtended];

/**
 * রিপোর্ট স্ট্যাটাস লেবেলসমূহ
 */
export const ReportStatusExtendedLabels: Record<
  ReportStatusExtendedValue,
  { en: string; bn: string }
> = {
  [ReportStatusExtended.QUEUED]: {
    en: 'Queued',
    bn: 'কিউতে',
  },
  [ReportStatusExtended.GENERATING]: {
    en: 'Generating',
    bn: 'জেনারেট হচ্ছে',
  },
  [ReportStatusExtended.COMPLETED]: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  [ReportStatusExtended.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [ReportStatusExtended.EXPIRED]: {
    en: 'Expired',
    bn: 'মেয়াদ উত্তীর্ণ',
  },
  [ReportStatusExtended.CANCELLED]: {
    en: 'Cancelled',
    bn: 'বাতিল',
  },
  [ReportStatusExtended.DOWNLOADED]: {
    en: 'Downloaded',
    bn: 'ডাউনলোড করা হয়েছে',
  },
};

/**
 * রিপোর্ট স্ট্যাটাস রঙ কোডসমূহ
 */
export const ReportStatusExtendedColors: Record<ReportStatusExtendedValue, string> = {
  [ReportStatusExtended.QUEUED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [ReportStatusExtended.GENERATING]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ReportStatusExtended.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
  [ReportStatusExtended.FAILED]: 'bg-red-100 text-red-800 border-red-300',
  [ReportStatusExtended.EXPIRED]: 'bg-gray-200 text-gray-900 border-gray-400',
  [ReportStatusExtended.CANCELLED]: 'bg-gray-300 text-gray-900 border-gray-500',
  [ReportStatusExtended.DOWNLOADED]: 'bg-purple-100 text-purple-800 border-purple-300',
};

/**
 * রিপোর্ট স্ট্যাটাস অগ্রগতি শতাংশ
 */
export const ReportStatusProgress: Record<ReportStatusExtendedValue, number> = {
  [ReportStatusExtended.QUEUED]: 0,
  [ReportStatusExtended.GENERATING]: 50,
  [ReportStatusExtended.COMPLETED]: 100,
  [ReportStatusExtended.FAILED]: 0,
  [ReportStatusExtended.EXPIRED]: 100,
  [ReportStatusExtended.CANCELLED]: 0,
  [ReportStatusExtended.DOWNLOADED]: 100,
};

/**
 * রিপোর্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const ReportStatusExtendedTransitions: Record<
  ReportStatusExtendedValue,
  ReportStatusExtendedValue[]
> = {
  [ReportStatusExtended.QUEUED]: [ReportStatusExtended.GENERATING, ReportStatusExtended.CANCELLED],
  [ReportStatusExtended.GENERATING]: [
    ReportStatusExtended.COMPLETED,
    ReportStatusExtended.FAILED,
    ReportStatusExtended.CANCELLED,
  ],
  [ReportStatusExtended.COMPLETED]: [ReportStatusExtended.DOWNLOADED, ReportStatusExtended.EXPIRED],
  [ReportStatusExtended.FAILED]: [ReportStatusExtended.QUEUED, ReportStatusExtended.CANCELLED],
  [ReportStatusExtended.EXPIRED]: [],
  [ReportStatusExtended.CANCELLED]: [],
  [ReportStatusExtended.DOWNLOADED]: [ReportStatusExtended.EXPIRED],
};

/**
 * রিপোর্ট স্ট্যাটাস অ্যাকশনসমূহ
 */
export const ReportStatusActions: Record<ReportStatusExtendedValue, string[]> = {
  [ReportStatusExtended.QUEUED]: ['view', 'cancel'],
  [ReportStatusExtended.GENERATING]: ['view', 'cancel'],
  [ReportStatusExtended.COMPLETED]: ['view', 'download', 'delete'],
  [ReportStatusExtended.FAILED]: ['view', 'retry', 'delete'],
  [ReportStatusExtended.EXPIRED]: ['view', 'delete'],
  [ReportStatusExtended.CANCELLED]: ['view', 'delete'],
  [ReportStatusExtended.DOWNLOADED]: ['view', 'download', 'delete'],
};

/**
 * রিপোর্ট এক্সপায়ারি সময় (মিনিট)
 */
export const ReportExpiryMinutes = 30;

/**
 * রিপোর্ট ডাউনলোড লিমিট (বার)
 */
export const ReportDownloadLimitCount = 5;

/**
 * রিপোর্ট ডাউনলোড এক্সপায়ারি (দিন)
 */
export const ReportDownloadExpiryDays = 7;

/**
 * সমাপ্ত রিপোর্ট স্ট্যাটাসসমূহ
 */
export const COMPLETED_REPORT_STATUSES: ReportStatusExtendedValue[] = [
  ReportStatusExtended.COMPLETED,
  ReportStatusExtended.DOWNLOADED,
] as const;

/**
 * ব্যর্থ রিপোর্ট স্ট্যাটাসসমূহ
 */
export const FAILED_REPORT_STATUSES: ReportStatusExtendedValue[] = [
  ReportStatusExtended.FAILED,
  ReportStatusExtended.CANCELLED,
] as const;

/**
 * সক্রিয় রিপোর্ট স্ট্যাটাসসমূহ
 */
export const ACTIVE_REPORT_STATUSES: ReportStatusExtendedValue[] = [
  ReportStatusExtended.QUEUED,
  ReportStatusExtended.GENERATING,
] as const;

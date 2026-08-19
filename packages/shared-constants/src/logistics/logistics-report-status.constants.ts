/**
 * লজিস্টিকস রিপোর্টের বিভিন্ন স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট স্ট্যাটাস
 */
export const REPORT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  GENERATED: 'generated',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস টাইপ
 */
export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];

/**
 * রিপোর্ট স্ট্যাটাসের বিবরণ
 */
export const REPORT_STATUS_DESCRIPTIONS: Record<ReportStatus, string> = {
  [REPORT_STATUS.PENDING]: 'পেন্ডিং - রিপোর্ট তৈরি হয়নি',
  [REPORT_STATUS.PROCESSING]: 'প্রসেসিং - রিপোর্ট তৈরি হচ্ছে',
  [REPORT_STATUS.GENERATED]: 'জেনারেটেড - রিপোর্ট তৈরি হয়েছে',
  [REPORT_STATUS.COMPLETED]: 'সম্পন্ন - রিপোর্ট সম্পূর্ণ হয়েছে',
  [REPORT_STATUS.FAILED]: 'ব্যর্থ - রিপোর্ট তৈরি ব্যর্থ হয়েছে',
  [REPORT_STATUS.CANCELLED]: 'বাতিল - রিপোর্ট বাতিল করা হয়েছে',
};

/**
 * রিপোর্ট স্ট্যাটাসের রং (UI এর জন্য)
 */
export const REPORT_STATUS_COLORS: Record<ReportStatus, string> = {
  [REPORT_STATUS.PENDING]: '#3498DB', // নীল
  [REPORT_STATUS.PROCESSING]: '#F39C12', // কমলা
  [REPORT_STATUS.GENERATED]: '#9B59B6', // বেগুনি
  [REPORT_STATUS.COMPLETED]: '#2ECC71', // সবুজ
  [REPORT_STATUS.FAILED]: '#E74C3C', // লাল
  [REPORT_STATUS.CANCELLED]: '#95A5A6', // ধূসর
};

/**
 * রিপোর্ট স্ট্যাটাসের আইকন (UI এর জন্য)
 */
export const REPORT_STATUS_ICONS: Record<ReportStatus, string> = {
  [REPORT_STATUS.PENDING]: 'clock',
  [REPORT_STATUS.PROCESSING]: 'spinner',
  [REPORT_STATUS.GENERATED]: 'file-pdf',
  [REPORT_STATUS.COMPLETED]: 'check-circle',
  [REPORT_STATUS.FAILED]: 'times-circle',
  [REPORT_STATUS.CANCELLED]: 'ban',
};

/**
 * অ্যাক্টিভ রিপোর্ট স্ট্যাটাসসমূহ
 */
export const ACTIVE_REPORT_STATUSES: readonly ReportStatus[] = [
  REPORT_STATUS.PENDING,
  REPORT_STATUS.PROCESSING,
  REPORT_STATUS.GENERATED,
] as const;

/**
 * টার্মিনাল রিপোর্ট স্ট্যাটাসসমূহ
 */
export const TERMINAL_REPORT_STATUSES: readonly ReportStatus[] = [
  REPORT_STATUS.COMPLETED,
  REPORT_STATUS.FAILED,
  REPORT_STATUS.CANCELLED,
] as const;

/**
 * সফল রিপোর্ট স্ট্যাটাসসমূহ
 */
export const SUCCESS_REPORT_STATUSES: readonly ReportStatus[] = [REPORT_STATUS.COMPLETED] as const;

/**
 * ব্যর্থ রিপোর্ট স্ট্যাটাসসমূহ
 */
export const FAILED_REPORT_STATUSES: readonly ReportStatus[] = [
  REPORT_STATUS.FAILED,
  REPORT_STATUS.CANCELLED,
] as const;

/**
 * রিপোর্ট স্ট্যাটাস গ্রুপ
 */
export const REPORT_STATUS_GROUPS = {
  ALL: Object.values(REPORT_STATUS),
  ACTIVE: ACTIVE_REPORT_STATUSES,
  TERMINAL: TERMINAL_REPORT_STATUSES,
  SUCCESS: SUCCESS_REPORT_STATUSES,
  FAILED: FAILED_REPORT_STATUSES,
} as const;

/**
 * রিপোর্ট স্ট্যাটাস গ্রুপ টাইপ
 */
export type ReportStatusGroup = typeof REPORT_STATUS_GROUPS;

/**
 * রিপোর্ট স্ট্যাটাস ট্রানজিশন
 */
export const REPORT_STATUS_TRANSITIONS: Record<ReportStatus, readonly ReportStatus[]> = {
  [REPORT_STATUS.PENDING]: [REPORT_STATUS.PROCESSING, REPORT_STATUS.CANCELLED],
  [REPORT_STATUS.PROCESSING]: [
    REPORT_STATUS.GENERATED,
    REPORT_STATUS.FAILED,
    REPORT_STATUS.CANCELLED,
  ],
  [REPORT_STATUS.GENERATED]: [
    REPORT_STATUS.COMPLETED,
    REPORT_STATUS.FAILED,
    REPORT_STATUS.CANCELLED,
  ],
  [REPORT_STATUS.COMPLETED]: [],
  [REPORT_STATUS.FAILED]: [REPORT_STATUS.PENDING, REPORT_STATUS.CANCELLED],
  [REPORT_STATUS.CANCELLED]: [],
};

/**
 * রিপোর্ট স্ট্যাটাস ট্রানজিশন টাইপ
 */
export type ReportStatusTransitions = typeof REPORT_STATUS_TRANSITIONS;

/**
 * রিপোর্ট স্ট্যাটাস কনফিগারেশন
 */
export const REPORT_STATUS_CONFIG = {
  STATUS: REPORT_STATUS,
  DESCRIPTIONS: REPORT_STATUS_DESCRIPTIONS,
  COLORS: REPORT_STATUS_COLORS,
  ICONS: REPORT_STATUS_ICONS,
  GROUPS: REPORT_STATUS_GROUPS,
  TRANSITIONS: REPORT_STATUS_TRANSITIONS,
  ACTIVE_STATUSES: ACTIVE_REPORT_STATUSES,
  TERMINAL_STATUSES: TERMINAL_REPORT_STATUSES,
  SUCCESS_STATUSES: SUCCESS_REPORT_STATUSES,
  FAILED_STATUSES: FAILED_REPORT_STATUSES,
} as const;

/**
 * রিপোর্ট স্ট্যাটাস কনফিগারেশন টাইপ
 */
export type ReportStatusConfig = typeof REPORT_STATUS_CONFIG;

/**
 * চেক করে যে রিপোর্ট স্ট্যাটাস অ্যাক্টিভ কিনা
 */
export function isReportStatusActive(status: ReportStatus): boolean {
  return (ACTIVE_REPORT_STATUSES as readonly ReportStatus[]).includes(status);
}

/**
 * চেক করে যে রিপোর্ট স্ট্যাটাস টার্মিনাল কিনা
 */
export function isReportStatusTerminal(status: ReportStatus): boolean {
  return (TERMINAL_REPORT_STATUSES as readonly ReportStatus[]).includes(status);
}

/**
 * চেক করে যে রিপোর্ট স্ট্যাটাস সফল কিনা
 */
export function isReportStatusSuccess(status: ReportStatus): boolean {
  return (SUCCESS_REPORT_STATUSES as readonly ReportStatus[]).includes(status);
}

/**
 * চেক করে যে রিপোর্ট স্ট্যাটাস ব্যর্থ কিনা
 */
export function isReportStatusFailed(status: ReportStatus): boolean {
  return (FAILED_REPORT_STATUSES as readonly ReportStatus[]).includes(status);
}

/**
 * দুটি রিপোর্ট স্ট্যাটাসের মধ্যে ট্রানজিশন সম্ভব কিনা চেক করে
 */
export function canReportStatusTransition(from: ReportStatus, to: ReportStatus): boolean {
  const allowedTransitions = REPORT_STATUS_TRANSITIONS[from];
  return allowedTransitions.includes(to);
}

/**
 * রিপোর্ট স্ট্যাটাসের বিবরণ পাওয়া
 */
export function getReportStatusDescription(status: ReportStatus): string {
  return REPORT_STATUS_DESCRIPTIONS[status];
}

/**
 * রিপোর্ট স্ট্যাটাসের রং পাওয়া
 */
export function getReportStatusColor(status: ReportStatus): string {
  return REPORT_STATUS_COLORS[status];
}

/**
 * রিপোর্ট স্ট্যাটাসের আইকন পাওয়া
 */
export function getReportStatusIcon(status: ReportStatus): string {
  return REPORT_STATUS_ICONS[status];
}

/**
 * রিপোর্ট ডাউনলোড করা যায় কিনা
 */
export function canReportBeDownloaded(status: ReportStatus): boolean {
  return status === REPORT_STATUS.COMPLETED || status === REPORT_STATUS.GENERATED;
}

/**
 * রিপোর্ট পুনরায় তৈরি করা যায় কিনা
 */
export function canReportBeRegenerated(status: ReportStatus): boolean {
  return status === REPORT_STATUS.FAILED || status === REPORT_STATUS.CANCELLED;
}

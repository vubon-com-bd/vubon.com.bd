/**
 * লজিস্টিকস রিপোর্টের বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট টাইপ
 */
export const REPORT_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const;

/**
 * রিপোর্ট টাইপ টাইপ
 */
export type ReportType = (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES];

/**
 * রিপোর্ট টাইপের বিবরণ
 */
export const REPORT_TYPE_DESCRIPTIONS: Record<ReportType, string> = {
  [REPORT_TYPES.DAILY]: 'দৈনিক - প্রতিদিনের রিপোর্ট',
  [REPORT_TYPES.WEEKLY]: 'সাপ্তাহিক - সাপ্তাহিক রিপোর্ট',
  [REPORT_TYPES.MONTHLY]: 'মাসিক - মাসিক রিপোর্ট',
  [REPORT_TYPES.QUARTERLY]: 'ত্রৈমাসিক - ত্রৈমাসিক রিপোর্ট',
  [REPORT_TYPES.YEARLY]: 'বার্ষিক - বার্ষিক রিপোর্ট',
  [REPORT_TYPES.CUSTOM]: 'কাস্টম - নির্দিষ্ট সময়সীমার রিপোর্ট',
};

/**
 * রিপোর্ট টাইপের রং (UI এর জন্য)
 */
export const REPORT_TYPE_COLORS: Record<ReportType, string> = {
  [REPORT_TYPES.DAILY]: '#3498DB', // নীল
  [REPORT_TYPES.WEEKLY]: '#2ECC71', // সবুজ
  [REPORT_TYPES.MONTHLY]: '#F39C12', // কমলা
  [REPORT_TYPES.QUARTERLY]: '#9B59B6', // বেগুনি
  [REPORT_TYPES.YEARLY]: '#E74C3C', // লাল
  [REPORT_TYPES.CUSTOM]: '#1ABC9C', // টিল
};

/**
 * রিপোর্ট টাইপের আইকন (UI এর জন্য)
 */
export const REPORT_TYPE_ICONS: Record<ReportType, string> = {
  [REPORT_TYPES.DAILY]: 'sun',
  [REPORT_TYPES.WEEKLY]: 'calendar-week',
  [REPORT_TYPES.MONTHLY]: 'calendar-month',
  [REPORT_TYPES.QUARTERLY]: 'calendar-quarter',
  [REPORT_TYPES.YEARLY]: 'calendar-year',
  [REPORT_TYPES.CUSTOM]: 'sliders',
};

/**
 * রিপোর্ট টাইপের ডিফল্ট সময়সীমা (দিন)
 */
export const REPORT_TYPE_DEFAULT_PERIOD: Record<ReportType, number> = {
  [REPORT_TYPES.DAILY]: 1,
  [REPORT_TYPES.WEEKLY]: 7,
  [REPORT_TYPES.MONTHLY]: 30,
  [REPORT_TYPES.QUARTERLY]: 90,
  [REPORT_TYPES.YEARLY]: 365,
  [REPORT_TYPES.CUSTOM]: 0,
};

/**
 * রিপোর্ট টাইপের প্রায়োরিটি
 */
export const REPORT_TYPE_PRIORITIES: Record<ReportType, number> = {
  [REPORT_TYPES.DAILY]: 1,
  [REPORT_TYPES.WEEKLY]: 2,
  [REPORT_TYPES.MONTHLY]: 3,
  [REPORT_TYPES.QUARTERLY]: 4,
  [REPORT_TYPES.YEARLY]: 5,
  [REPORT_TYPES.CUSTOM]: 6,
};

/**
 * রিপোর্ট টাইপের ডিফল্ট ফরম্যাট
 */
export const REPORT_TYPE_DEFAULT_FORMAT: Record<ReportType, string> = {
  [REPORT_TYPES.DAILY]: 'pdf',
  [REPORT_TYPES.WEEKLY]: 'pdf',
  [REPORT_TYPES.MONTHLY]: 'excel',
  [REPORT_TYPES.QUARTERLY]: 'excel',
  [REPORT_TYPES.YEARLY]: 'pdf',
  [REPORT_TYPES.CUSTOM]: 'csv',
};

/**
 * রিপোর্ট টাইপ গ্রুপ
 */
export const REPORT_TYPE_GROUPS = {
  ALL: Object.values(REPORT_TYPES),
  REGULAR: [REPORT_TYPES.DAILY, REPORT_TYPES.WEEKLY, REPORT_TYPES.MONTHLY] as const,
  LONG_TERM: [REPORT_TYPES.QUARTERLY, REPORT_TYPES.YEARLY] as const,
  SPECIAL: [REPORT_TYPES.CUSTOM] as const,
} as const;

/**
 * রিপোর্ট টাইপ গ্রুপ টাইপ
 */
export type ReportTypeGroup = typeof REPORT_TYPE_GROUPS;

/**
 * রিপোর্ট টাইপ কনফিগারেশন
 */
export const REPORT_TYPE_CONFIG = {
  TYPES: REPORT_TYPES,
  DESCRIPTIONS: REPORT_TYPE_DESCRIPTIONS,
  COLORS: REPORT_TYPE_COLORS,
  ICONS: REPORT_TYPE_ICONS,
  DEFAULT_PERIOD: REPORT_TYPE_DEFAULT_PERIOD,
  PRIORITIES: REPORT_TYPE_PRIORITIES,
  DEFAULT_FORMAT: REPORT_TYPE_DEFAULT_FORMAT,
  GROUPS: REPORT_TYPE_GROUPS,
} as const;

/**
 * রিপোর্ট টাইপ কনফিগারেশন টাইপ
 */
export type ReportTypeConfig = typeof REPORT_TYPE_CONFIG;

/**
 * চেক করে যে রিপোর্ট টাইপ রেগুলার কিনা
 */
export function isRegularReportType(type: ReportType): boolean {
  return (REPORT_TYPE_GROUPS.REGULAR as readonly ReportType[]).includes(type);
}

/**
 * চেক করে যে রিপোর্ট টাইপ লং-টার্ম কিনা
 */
export function isLongTermReportType(type: ReportType): boolean {
  return (REPORT_TYPE_GROUPS.LONG_TERM as readonly ReportType[]).includes(type);
}

/**
 * চেক করে যে রিপোর্ট টাইপ স্পেশাল কিনা
 */
export function isSpecialReportType(type: ReportType): boolean {
  return (REPORT_TYPE_GROUPS.SPECIAL as readonly ReportType[]).includes(type);
}

/**
 * রিপোর্ট টাইপের বিবরণ পাওয়া
 */
export function getReportTypeDescription(type: ReportType): string {
  return REPORT_TYPE_DESCRIPTIONS[type];
}

/**
 * রিপোর্ট টাইপের ডিফল্ট সময়সীমা পাওয়া
 */
export function getReportTypeDefaultPeriod(type: ReportType): number {
  return REPORT_TYPE_DEFAULT_PERIOD[type];
}

/**
 * রিপোর্ট টাইপের ডিফল্ট ফরম্যাট পাওয়া
 */
export function getReportTypeDefaultFormat(type: ReportType): string {
  return REPORT_TYPE_DEFAULT_FORMAT[type];
}

/**
 * রিপোর্ট টাইপের প্রায়োরিটি পাওয়া
 */
export function getReportTypePriority(type: ReportType): number {
  return REPORT_TYPE_PRIORITIES[type];
}

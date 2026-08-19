/**
 * ভেন্ডার অ্যাক্টিভিটি বা কার্যকলাপ সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * অ্যাক্টিভিটি টাইপ অবজেক্ট
 */
export const ActivityType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  ORDER_PLACED: 'ORDER_PLACED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  PAYOUT_REQUESTED: 'PAYOUT_REQUESTED',
  TICKET_CREATED: 'TICKET_CREATED',
  TEAM_MEMBER_ADDED: 'TEAM_MEMBER_ADDED',
} as const;

/**
 * অ্যাক্টিভিটি টাইপ - ইউনিয়ন টাইপ
 */
export type ActivityTypeValue = (typeof ActivityType)[keyof typeof ActivityType];

/**
 * অ্যাক্টিভিটি প্রায়রিটি
 */
export const ActivityPriority = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

/**
 * অ্যাক্টিভিটি প্রায়রিটি - ইউনিয়ন টাইপ
 */
export type ActivityPriorityValue = (typeof ActivityPriority)[keyof typeof ActivityPriority];

/**
 * অ্যাক্টিভিটি স্ট্যাটাস
 */
export const ActivityStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  SKIPPED: 'SKIPPED',
} as const;

/**
 * অ্যাক্টিভিটি স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ActivityStatusValue = (typeof ActivityStatus)[keyof typeof ActivityStatus];

/**
 * অ্যাক্টিভিটি রিটেনশন দিন
 */
export const ActivityRetentionDays = 90;

/**
 * অ্যাক্টিভিটি লগ ব্যাচ সাইজ
 */
export const ActivityLogBatchSize = 1000;

/**
 * অ্যাক্টিভিটি সিভিয়ারিটি
 */
export const ActivitySeverity = {
  CRITICAL: 'CRITICAL',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
} as const;

/**
 * অ্যাক্টিভিটি সিভিয়ারিটি - ইউনিয়ন টাইপ
 */
export type ActivitySeverityValue = (typeof ActivitySeverity)[keyof typeof ActivitySeverity];

/**
 * অ্যাক্টিভিটি টাইপ লেবেলসমূহ
 */
export const ActivityTypeLabels: Record<ActivityTypeValue, { en: string; bn: string }> = {
  [ActivityType.LOGIN]: {
    en: 'Login',
    bn: 'লগইন',
  },
  [ActivityType.LOGOUT]: {
    en: 'Logout',
    bn: 'লগআউট',
  },
  [ActivityType.PROFILE_UPDATE]: {
    en: 'Profile Update',
    bn: 'প্রোফাইল আপডেট',
  },
  [ActivityType.DOCUMENT_UPLOAD]: {
    en: 'Document Upload',
    bn: 'ডকুমেন্ট আপলোড',
  },
  [ActivityType.ORDER_PLACED]: {
    en: 'Order Placed',
    bn: 'অর্ডার দেওয়া হয়েছে',
  },
  [ActivityType.PAYMENT_RECEIVED]: {
    en: 'Payment Received',
    bn: 'পেমেন্ট প্রাপ্ত',
  },
  [ActivityType.PAYOUT_REQUESTED]: {
    en: 'Payout Requested',
    bn: 'পেআউট অনুরোধ',
  },
  [ActivityType.TICKET_CREATED]: {
    en: 'Ticket Created',
    bn: 'টিকেট তৈরি',
  },
  [ActivityType.TEAM_MEMBER_ADDED]: {
    en: 'Team Member Added',
    bn: 'টিম সদস্য যোগ',
  },
};

/**
 * অ্যাক্টিভিটি প্রায়রিটি লেবেলসমূহ
 */
export const ActivityPriorityLabels: Record<ActivityPriorityValue, { en: string; bn: string }> = {
  [ActivityPriority.HIGH]: {
    en: 'High',
    bn: 'উচ্চ',
  },
  [ActivityPriority.MEDIUM]: {
    en: 'Medium',
    bn: 'মধ্যম',
  },
  [ActivityPriority.LOW]: {
    en: 'Low',
    bn: 'নিম্ন',
  },
};

/**
 * অ্যাক্টিভিটি প্রায়রিটি রঙ কোডসমূহ
 */
export const ActivityPriorityColors: Record<ActivityPriorityValue, string> = {
  [ActivityPriority.HIGH]: 'bg-red-100 text-red-800 border-red-300',
  [ActivityPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ActivityPriority.LOW]: 'bg-blue-100 text-blue-800 border-blue-300',
};

/**
 * অ্যাক্টিভিটি স্ট্যাটাস লেবেলসমূহ
 */
export const ActivityStatusLabels: Record<ActivityStatusValue, { en: string; bn: string }> = {
  [ActivityStatus.SUCCESS]: {
    en: 'Success',
    bn: 'সফল',
  },
  [ActivityStatus.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [ActivityStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [ActivityStatus.SKIPPED]: {
    en: 'Skipped',
    bn: 'বাদ দেওয়া',
  },
};

/**
 * অ্যাক্টিভিটি স্ট্যাটাস রঙ কোডসমূহ
 */
export const ActivityStatusColors: Record<ActivityStatusValue, string> = {
  [ActivityStatus.SUCCESS]: 'bg-green-100 text-green-800 border-green-300',
  [ActivityStatus.FAILED]: 'bg-red-100 text-red-800 border-red-300',
  [ActivityStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ActivityStatus.SKIPPED]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * অ্যাক্টিভিটি সিভিয়ারিটি লেবেলসমূহ
 */
export const ActivitySeverityLabels: Record<ActivitySeverityValue, { en: string; bn: string }> = {
  [ActivitySeverity.CRITICAL]: {
    en: 'Critical',
    bn: 'সঙ্কটজনক',
  },
  [ActivitySeverity.ERROR]: {
    en: 'Error',
    bn: 'ত্রুটি',
  },
  [ActivitySeverity.WARNING]: {
    en: 'Warning',
    bn: 'সতর্কতা',
  },
  [ActivitySeverity.INFO]: {
    en: 'Info',
    bn: 'তথ্য',
  },
  [ActivitySeverity.DEBUG]: {
    en: 'Debug',
    bn: 'ডিবাগ',
  },
};

/**
 * অ্যাক্টিভিটি সিভিয়ারিটি রঙ কোডসমূহ
 */
export const ActivitySeverityColors: Record<ActivitySeverityValue, string> = {
  [ActivitySeverity.CRITICAL]: 'bg-red-200 text-red-900 border-red-400',
  [ActivitySeverity.ERROR]: 'bg-red-100 text-red-800 border-red-300',
  [ActivitySeverity.WARNING]: 'bg-orange-100 text-orange-800 border-orange-300',
  [ActivitySeverity.INFO]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ActivitySeverity.DEBUG]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * অ্যাক্টিভিটি আর্কাইভ সময় (দিন)
 */
export const ActivityArchiveDays = 180;

/**
 * অ্যাক্টিভিটি এক্সপোর্ট লিমিট
 */
export const ActivityExportLimit = 10000;

/**
 * অ্যাক্টিভিটি অডিট ট্রেইল রিটেনশন (দিন)
 */
export const ActivityAuditTrailRetentionDays = 365;

/**
 * অ্যাক্টিভিটি মনিটরিং ইন্টারভাল (সেকেন্ড)
 */
export const ActivityMonitoringInterval = 60;

/**
 * অ্যাক্টিভিটি অ্যালার্ট থ্রেশহোল্ড
 */
export const ActivityAlertThresholds = {
  FAILED_LOGIN_ATTEMPTS: 5,
  UNUSUAL_ACTIVITY_COUNT: 10,
  HIGH_RISK_ACTIONS: 3,
  PAYOUT_AMOUNT_LIMIT: 50000,
} as const;

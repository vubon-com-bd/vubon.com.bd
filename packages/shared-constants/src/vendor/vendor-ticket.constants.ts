/**
 * ভেন্ডার টিকেট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট আইডি প্রিফিক্স
 */
export const TicketIdPrefix = 'TKT-';

/**
 * টিকেট ক্যাটাগরি অবজেক্ট
 */
export const TicketCategory = {
  SUPPORT: 'SUPPORT',
  COMPLAINT: 'COMPLAINT',
  FEATURE_REQUEST: 'FEATURE_REQUEST',
  BUG_REPORT: 'BUG_REPORT',
  ACCOUNT_ISSUE: 'ACCOUNT_ISSUE',
  PAYMENT_ISSUE: 'PAYMENT_ISSUE',
  GENERAL_QUERY: 'GENERAL_QUERY',
} as const;

/**
 * টিকেট ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type TicketCategoryValue = (typeof TicketCategory)[keyof typeof TicketCategory];

/**
 * টিকেট সোর্স অবজেক্ট
 */
export const TicketSource = {
  PORTAL: 'PORTAL',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  CHAT: 'CHAT',
  SOCIAL: 'SOCIAL',
  API: 'API',
} as const;

/**
 * টিকেট সোর্স - ইউনিয়ন টাইপ
 */
export type TicketSourceValue = (typeof TicketSource)[keyof typeof TicketSource];

/**
 * টিকেট স্ট্যাটাস অবজেক্ট
 */
export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  AWAITING_RESPONSE: 'AWAITING_RESPONSE',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;

/**
 * টিকেট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type TicketStatusValue = (typeof TicketStatus)[keyof typeof TicketStatus];

/**
 * টিকেট প্রায়রিটি অবজেক্ট
 */
export const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;

/**
 * টিকেট প্রায়রিটি - ইউনিয়ন টাইপ
 */
export type TicketPriorityValue = (typeof TicketPriority)[keyof typeof TicketPriority];

/**
 * টিকেট রেসপন্স টাইম এসএলএ (ঘণ্টায়)
 */
export const TicketResponseTimeSLAs: Record<TicketPriorityValue, number> = {
  [TicketPriority.LOW]: 24,
  [TicketPriority.MEDIUM]: 12,
  [TicketPriority.HIGH]: 6,
  [TicketPriority.URGENT]: 2,
};

/**
 * টিকেট রেজোলিউশন টাইম এসএলএ (দিনে)
 */
export const TicketResolutionTimeSLAs: Record<TicketPriorityValue, number> = {
  [TicketPriority.LOW]: 5,
  [TicketPriority.MEDIUM]: 3,
  [TicketPriority.HIGH]: 2,
  [TicketPriority.URGENT]: 1,
};

/**
 * টিকেট ক্যাটাগরি লেবেলসমূহ
 */
export const TicketCategoryLabels: Record<TicketCategoryValue, { en: string; bn: string }> = {
  [TicketCategory.SUPPORT]: {
    en: 'Support',
    bn: 'সাপোর্ট',
  },
  [TicketCategory.COMPLAINT]: {
    en: 'Complaint',
    bn: 'অভিযোগ',
  },
  [TicketCategory.FEATURE_REQUEST]: {
    en: 'Feature Request',
    bn: 'ফিচার অনুরোধ',
  },
  [TicketCategory.BUG_REPORT]: {
    en: 'Bug Report',
    bn: 'বাগ রিপোর্ট',
  },
  [TicketCategory.ACCOUNT_ISSUE]: {
    en: 'Account Issue',
    bn: 'অ্যাকাউন্ট সমস্যা',
  },
  [TicketCategory.PAYMENT_ISSUE]: {
    en: 'Payment Issue',
    bn: 'পেমেন্ট সমস্যা',
  },
  [TicketCategory.GENERAL_QUERY]: {
    en: 'General Query',
    bn: 'সাধারণ প্রশ্ন',
  },
};

/**
 * টিকেট সোর্স লেবেলসমূহ
 */
export const TicketSourceLabels: Record<TicketSourceValue, { en: string; bn: string }> = {
  [TicketSource.PORTAL]: {
    en: 'Portal',
    bn: 'পোর্টাল',
  },
  [TicketSource.EMAIL]: {
    en: 'Email',
    bn: 'ইমেইল',
  },
  [TicketSource.PHONE]: {
    en: 'Phone',
    bn: 'ফোন',
  },
  [TicketSource.CHAT]: {
    en: 'Chat',
    bn: 'চ্যাট',
  },
  [TicketSource.SOCIAL]: {
    en: 'Social Media',
    bn: 'সোশ্যাল মিডিয়া',
  },
  [TicketSource.API]: {
    en: 'API',
    bn: 'এপিআই',
  },
};

/**
 * টিকেট স্ট্যাটাস লেবেলসমূহ
 */
export const TicketStatusLabels: Record<TicketStatusValue, { en: string; bn: string }> = {
  [TicketStatus.OPEN]: {
    en: 'Open',
    bn: 'খোলা',
  },
  [TicketStatus.IN_PROGRESS]: {
    en: 'In Progress',
    bn: 'প্রক্রিয়াধীন',
  },
  [TicketStatus.AWAITING_RESPONSE]: {
    en: 'Awaiting Response',
    bn: 'উত্তরের অপেক্ষায়',
  },
  [TicketStatus.RESOLVED]: {
    en: 'Resolved',
    bn: 'সমাধান হয়েছে',
  },
  [TicketStatus.CLOSED]: {
    en: 'Closed',
    bn: 'বন্ধ',
  },
};

/**
 * টিকেট স্ট্যাটাস রঙ কোডসমূহ
 */
export const TicketStatusColors: Record<TicketStatusValue, string> = {
  [TicketStatus.OPEN]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [TicketStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-300',
  [TicketStatus.AWAITING_RESPONSE]: 'bg-purple-100 text-purple-800 border-purple-300',
  [TicketStatus.RESOLVED]: 'bg-green-100 text-green-800 border-green-300',
  [TicketStatus.CLOSED]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * টিকেট প্রায়রিটি লেবেলসমূহ
 */
export const TicketPriorityLabels: Record<TicketPriorityValue, { en: string; bn: string }> = {
  [TicketPriority.LOW]: {
    en: 'Low',
    bn: 'নিম্ন',
  },
  [TicketPriority.MEDIUM]: {
    en: 'Medium',
    bn: 'মধ্যম',
  },
  [TicketPriority.HIGH]: {
    en: 'High',
    bn: 'উচ্চ',
  },
  [TicketPriority.URGENT]: {
    en: 'Urgent',
    bn: 'জরুরি',
  },
};

/**
 * টিকেট প্রায়রিটি রঙ কোডসমূহ
 */
export const TicketPriorityColors: Record<TicketPriorityValue, string> = {
  [TicketPriority.LOW]: 'bg-gray-100 text-gray-800 border-gray-300',
  [TicketPriority.MEDIUM]: 'bg-blue-100 text-blue-800 border-blue-300',
  [TicketPriority.HIGH]: 'bg-orange-100 text-orange-800 border-orange-300',
  [TicketPriority.URGENT]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * টিকেট অটো-ক্লোজ দিন
 */
export const TicketAutoCloseDays = 5;

/**
 * টিকেট সর্বোচ্চ অ্যাটাচমেন্ট সংখ্যা
 */
export const TicketMaxAttachments = 5;

/**
 * টিকেট সর্বোচ্চ অ্যাটাচমেন্ট সাইজ (এমবি)
 */
export const TicketMaxAttachmentSizeMB = 10;

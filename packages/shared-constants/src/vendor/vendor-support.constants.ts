/**
 * ভেন্ডার সাপোর্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * সাপোর্ট চ্যানেল অবজেক্ট
 */
export const SupportChannel = {
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  CHAT: 'CHAT',
  TICKET: 'TICKET',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  IN_APP: 'IN_APP',
} as const;

/**
 * সাপোর্ট চ্যানেল - ইউনিয়ন টাইপ
 */
export type SupportChannelValue = (typeof SupportChannel)[keyof typeof SupportChannel];

/**
 * সাপোর্ট প্রায়রিটি অবজেক্ট
 */
export const SupportPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
  CRITICAL: 'CRITICAL',
} as const;

/**
 * সাপোর্ট প্রায়রিটি - ইউনিয়ন টাইপ
 */
export type SupportPriorityValue = (typeof SupportPriority)[keyof typeof SupportPriority];

/**
 * সাপোর্ট স্ট্যাটাস অবজেক্ট
 */
export const SupportStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  ESCALATED: 'ESCALATED',
} as const;

/**
 * সাপোর্ট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type SupportStatusValue = (typeof SupportStatus)[keyof typeof SupportStatus];

/**
 * সাপোর্ট ক্যাটাগরি অবজেক্ট
 */
export const SupportCategory = {
  TECHNICAL: 'TECHNICAL',
  ACCOUNT: 'ACCOUNT',
  PAYMENT: 'PAYMENT',
  PRODUCT: 'PRODUCT',
  GENERAL: 'GENERAL',
} as const;

/**
 * সাপোর্ট ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type SupportCategoryValue = (typeof SupportCategory)[keyof typeof SupportCategory];

/**
 * সাপোর্ট এসএলএ (সার্ভিস লেভেল এগ্রিমেন্ট)
 */
export const SupportSLA: Record<
  SupportPriorityValue,
  { responseTime: string; resolutionTime: string }
> = {
  [SupportPriority.LOW]: {
    responseTime: '24 hours',
    resolutionTime: '72 hours',
  },
  [SupportPriority.MEDIUM]: {
    responseTime: '12 hours',
    resolutionTime: '48 hours',
  },
  [SupportPriority.HIGH]: {
    responseTime: '6 hours',
    resolutionTime: '24 hours',
  },
  [SupportPriority.URGENT]: {
    responseTime: '2 hours',
    resolutionTime: '12 hours',
  },
  [SupportPriority.CRITICAL]: {
    responseTime: '30 minutes',
    resolutionTime: '4 hours',
  },
};

/**
 * সাপোর্ট সময় (ঘণ্টা)
 */
export const SupportHours = {
  START: 9,
  END: 21,
  WEEKEND_START: 10,
  WEEKEND_END: 18,
} as const;

/**
 * সাপোর্ট চ্যানেল লেবেলসমূহ
 */
export const SupportChannelLabels: Record<SupportChannelValue, { en: string; bn: string }> = {
  [SupportChannel.EMAIL]: {
    en: 'Email',
    bn: 'ইমেইল',
  },
  [SupportChannel.PHONE]: {
    en: 'Phone',
    bn: 'ফোন',
  },
  [SupportChannel.CHAT]: {
    en: 'Live Chat',
    bn: 'লাইভ চ্যাট',
  },
  [SupportChannel.TICKET]: {
    en: 'Support Ticket',
    bn: 'সাপোর্ট টিকেট',
  },
  [SupportChannel.SOCIAL_MEDIA]: {
    en: 'Social Media',
    bn: 'সোশ্যাল মিডিয়া',
  },
  [SupportChannel.IN_APP]: {
    en: 'In-App Support',
    bn: 'অ্যাপে সাপোর্ট',
  },
};

/**
 * সাপোর্ট প্রায়রিটি লেবেলসমূহ
 */
export const SupportPriorityLabels: Record<SupportPriorityValue, { en: string; bn: string }> = {
  [SupportPriority.LOW]: {
    en: 'Low',
    bn: 'নিম্ন',
  },
  [SupportPriority.MEDIUM]: {
    en: 'Medium',
    bn: 'মধ্যম',
  },
  [SupportPriority.HIGH]: {
    en: 'High',
    bn: 'উচ্চ',
  },
  [SupportPriority.URGENT]: {
    en: 'Urgent',
    bn: 'জরুরি',
  },
  [SupportPriority.CRITICAL]: {
    en: 'Critical',
    bn: 'সঙ্কটজনক',
  },
};

/**
 * সাপোর্ট প্রায়রিটি রঙ কোডসমূহ
 */
export const SupportPriorityColors: Record<SupportPriorityValue, string> = {
  [SupportPriority.LOW]: 'bg-gray-100 text-gray-800 border-gray-300',
  [SupportPriority.MEDIUM]: 'bg-blue-100 text-blue-800 border-blue-300',
  [SupportPriority.HIGH]: 'bg-orange-100 text-orange-800 border-orange-300',
  [SupportPriority.URGENT]: 'bg-red-100 text-red-800 border-red-300',
  [SupportPriority.CRITICAL]: 'bg-red-200 text-red-900 border-red-400',
};

/**
 * সাপোর্ট স্ট্যাটাস লেবেলসমূহ
 */
export const SupportStatusLabels: Record<SupportStatusValue, { en: string; bn: string }> = {
  [SupportStatus.OPEN]: {
    en: 'Open',
    bn: 'খোলা',
  },
  [SupportStatus.IN_PROGRESS]: {
    en: 'In Progress',
    bn: 'প্রক্রিয়াধীন',
  },
  [SupportStatus.RESOLVED]: {
    en: 'Resolved',
    bn: 'সমাধান হয়েছে',
  },
  [SupportStatus.CLOSED]: {
    en: 'Closed',
    bn: 'বন্ধ',
  },
  [SupportStatus.ESCALATED]: {
    en: 'Escalated',
    bn: 'উর্ধ্বতন কর্তৃপক্ষে',
  },
};

/**
 * সাপোর্ট স্ট্যাটাস রঙ কোডসমূহ
 */
export const SupportStatusColors: Record<SupportStatusValue, string> = {
  [SupportStatus.OPEN]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [SupportStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-300',
  [SupportStatus.RESOLVED]: 'bg-green-100 text-green-800 border-green-300',
  [SupportStatus.CLOSED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [SupportStatus.ESCALATED]: 'bg-red-100 text-red-800 border-red-300',
};

/**
 * সাপোর্ট ক্যাটাগরি লেবেলসমূহ
 */
export const SupportCategoryLabels: Record<SupportCategoryValue, { en: string; bn: string }> = {
  [SupportCategory.TECHNICAL]: {
    en: 'Technical Issue',
    bn: 'প্রযুক্তিগত সমস্যা',
  },
  [SupportCategory.ACCOUNT]: {
    en: 'Account Issue',
    bn: 'অ্যাকাউন্ট সমস্যা',
  },
  [SupportCategory.PAYMENT]: {
    en: 'Payment Issue',
    bn: 'পেমেন্ট সমস্যা',
  },
  [SupportCategory.PRODUCT]: {
    en: 'Product Issue',
    bn: 'পণ্য সমস্যা',
  },
  [SupportCategory.GENERAL]: {
    en: 'General Inquiry',
    bn: 'সাধারণ প্রশ্ন',
  },
};

/**
 * সাপোর্ট টিকেট এক্সপায়ার সময় (দিন)
 */
export const SupportTicketExpiryDays = 30;

/**
 * সাপোর্ট অটো-ক্লোজ সময় (দিন)
 */
export const SupportAutoCloseDays = 7;

/**
 * সাপোর্ট এসকেলেশন থ্রেশহোল্ড (ঘণ্টা)
 */
export const SupportEscalationHours = 24;

/**
 * সাপোর্ট সর্বোচ্চ টিকেট প্রতি ব্যবহারকারী
 */
export const SupportMaxTicketsPerUser = 5;

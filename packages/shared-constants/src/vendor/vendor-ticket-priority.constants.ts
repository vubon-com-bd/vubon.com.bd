/**
 * টিকেটের প্রায়রিটি লেভেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট প্রায়রিটি লেভেল অবজেক্ট
 */
export const TicketPriorityLevel = {
  P1_CRITICAL: 'P1_CRITICAL',
  P2_HIGH: 'P2_HIGH',
  P3_MEDIUM: 'P3_MEDIUM',
  P4_LOW: 'P4_LOW',
  P5_TRIVIAL: 'P5_TRIVIAL',
} as const;

/**
 * টিকেট প্রায়রিটি লেভেল - ইউনিয়ন টাইপ
 */
export type TicketPriorityLevelValue =
  (typeof TicketPriorityLevel)[keyof typeof TicketPriorityLevel];

/**
 * প্রায়রিটি অনুযায়ী রেসপন্স টাইম (ঘণ্টায়)
 */
export const PriorityResponseTimes: Record<TicketPriorityLevelValue, number> = {
  [TicketPriorityLevel.P1_CRITICAL]: 0.5,
  [TicketPriorityLevel.P2_HIGH]: 2,
  [TicketPriorityLevel.P3_MEDIUM]: 6,
  [TicketPriorityLevel.P4_LOW]: 12,
  [TicketPriorityLevel.P5_TRIVIAL]: 24,
};

/**
 * প্রায়রিটি অনুযায়ী রেজোলিউশন টাইম (ঘণ্টায়)
 */
export const PriorityResolutionTimes: Record<TicketPriorityLevelValue, number> = {
  [TicketPriorityLevel.P1_CRITICAL]: 4,
  [TicketPriorityLevel.P2_HIGH]: 8,
  [TicketPriorityLevel.P3_MEDIUM]: 24,
  [TicketPriorityLevel.P4_LOW]: 48,
  [TicketPriorityLevel.P5_TRIVIAL]: 72,
};

/**
 * প্রায়রিটি এসকেলেশন রুলস
 */
export const PriorityEscalationRules: Record<
  TicketPriorityLevelValue,
  {
    escalateAfter: number;
    escalateTo: TicketPriorityLevelValue[];
    notifyManager: boolean;
  }
> = {
  [TicketPriorityLevel.P1_CRITICAL]: {
    escalateAfter: 1,
    escalateTo: [TicketPriorityLevel.P2_HIGH],
    notifyManager: true,
  },
  [TicketPriorityLevel.P2_HIGH]: {
    escalateAfter: 2,
    escalateTo: [TicketPriorityLevel.P1_CRITICAL, TicketPriorityLevel.P3_MEDIUM],
    notifyManager: true,
  },
  [TicketPriorityLevel.P3_MEDIUM]: {
    escalateAfter: 4,
    escalateTo: [TicketPriorityLevel.P2_HIGH, TicketPriorityLevel.P4_LOW],
    notifyManager: false,
  },
  [TicketPriorityLevel.P4_LOW]: {
    escalateAfter: 8,
    escalateTo: [TicketPriorityLevel.P3_MEDIUM],
    notifyManager: false,
  },
  [TicketPriorityLevel.P5_TRIVIAL]: {
    escalateAfter: 12,
    escalateTo: [TicketPriorityLevel.P4_LOW],
    notifyManager: false,
  },
};

/**
 * প্রায়রিটি রঙ কোডসমূহ
 */
export const PriorityColorCodes: Record<TicketPriorityLevelValue, string> = {
  [TicketPriorityLevel.P1_CRITICAL]: '#DC2626',
  [TicketPriorityLevel.P2_HIGH]: '#F59E0B',
  [TicketPriorityLevel.P3_MEDIUM]: '#3B82F6',
  [TicketPriorityLevel.P4_LOW]: '#10B981',
  [TicketPriorityLevel.P5_TRIVIAL]: '#9CA3AF',
};

/**
 * প্রায়রিটি লেবেলসমূহ
 */
export const TicketPriorityLevelLabels: Record<
  TicketPriorityLevelValue,
  { en: string; bn: string }
> = {
  [TicketPriorityLevel.P1_CRITICAL]: {
    en: 'P1 - Critical',
    bn: 'পি১ - সঙ্কটজনক',
  },
  [TicketPriorityLevel.P2_HIGH]: {
    en: 'P2 - High',
    bn: 'পি২ - উচ্চ',
  },
  [TicketPriorityLevel.P3_MEDIUM]: {
    en: 'P3 - Medium',
    bn: 'পি৩ - মধ্যম',
  },
  [TicketPriorityLevel.P4_LOW]: {
    en: 'P4 - Low',
    bn: 'পি৪ - নিম্ন',
  },
  [TicketPriorityLevel.P5_TRIVIAL]: {
    en: 'P5 - Trivial',
    bn: 'পি৫ - তুচ্ছ',
  },
};

/**
 * প্রায়রিটি বুট ক্যাম্প রঙ ক্লাসসমূহ
 */
export const PriorityColorClasses: Record<TicketPriorityLevelValue, string> = {
  [TicketPriorityLevel.P1_CRITICAL]: 'bg-red-100 text-red-800 border-red-300',
  [TicketPriorityLevel.P2_HIGH]: 'bg-orange-100 text-orange-800 border-orange-300',
  [TicketPriorityLevel.P3_MEDIUM]: 'bg-blue-100 text-blue-800 border-blue-300',
  [TicketPriorityLevel.P4_LOW]: 'bg-green-100 text-green-800 border-green-300',
  [TicketPriorityLevel.P5_TRIVIAL]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * প্রায়রিটি স্ল্যাক এসকেলেশন চ্যানেল
 */
export const PriorityEscalationChannels: Record<TicketPriorityLevelValue, string> = {
  [TicketPriorityLevel.P1_CRITICAL]: '#critical-alerts',
  [TicketPriorityLevel.P2_HIGH]: '#high-priority',
  [TicketPriorityLevel.P3_MEDIUM]: '#medium-priority',
  [TicketPriorityLevel.P4_LOW]: '#low-priority',
  [TicketPriorityLevel.P5_TRIVIAL]: '#trivial-issues',
};

/**
 * ভেন্ডার অ্যাপ্রুভাল প্রক্রিয়া সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * অ্যাপ্রুভাল স্ট্যাটাস অবজেক্ট
 */
export const ApprovalStatus = {
  PENDING: 'PENDING',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CONDITIONALLY_APPROVED: 'CONDITIONALLY_APPROVED',
} as const;

/**
 * অ্যাপ্রুভাল স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ApprovalStatusValue = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

/**
 * অ্যাপ্রুভাল লেভেল অবজেক্ট
 */
export const ApprovalLevel = {
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  LEVEL_3: 'LEVEL_3',
  FINAL: 'FINAL',
} as const;

/**
 * অ্যাপ্রুভাল লেভেল - ইউনিয়ন টাইপ
 */
export type ApprovalLevelValue = (typeof ApprovalLevel)[keyof typeof ApprovalLevel];

/**
 * অ্যাপ্রুভাল ডিসিশন টাইপ
 */
export const ApprovalDecisionTypes = {
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  REQUEST_CHANGES: 'REQUEST_CHANGES',
  CONDITIONAL_APPROVE: 'CONDITIONAL_APPROVE',
} as const;

/**
 * অ্যাপ্রুভাল ডিসিশন - ইউনিয়ন টাইপ
 */
export type ApprovalDecisionValue =
  (typeof ApprovalDecisionTypes)[keyof typeof ApprovalDecisionTypes];

/**
 * ডিফল্ট রিভিউ সময় (দিন)
 */
export const ApprovalReviewDays = 7;

/**
 * অ্যাপ্রুভাল স্ট্যাটাস লেবেলসমূহ
 */
export const ApprovalStatusLabels: Record<ApprovalStatusValue, { en: string; bn: string }> = {
  [ApprovalStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [ApprovalStatus.UNDER_REVIEW]: {
    en: 'Under Review',
    bn: 'পর্যালোচনাধীন',
  },
  [ApprovalStatus.APPROVED]: {
    en: 'Approved',
    bn: 'অনুমোদিত',
  },
  [ApprovalStatus.REJECTED]: {
    en: 'Rejected',
    bn: 'বাতিল',
  },
  [ApprovalStatus.CONDITIONALLY_APPROVED]: {
    en: 'Conditionally Approved',
    bn: 'শর্তসাপেক্ষে অনুমোদিত',
  },
};

/**
 * অ্যাপ্রুভাল লেভেল লেবেলসমূহ
 */
export const ApprovalLevelLabels: Record<ApprovalLevelValue, { en: string; bn: string }> = {
  [ApprovalLevel.LEVEL_1]: {
    en: 'Level 1 - Initial Review',
    bn: 'লেভেল ১ - প্রাথমিক পর্যালোচনা',
  },
  [ApprovalLevel.LEVEL_2]: {
    en: 'Level 2 - Detailed Review',
    bn: 'লেভেল ২ - বিস্তারিত পর্যালোচনা',
  },
  [ApprovalLevel.LEVEL_3]: {
    en: 'Level 3 - Final Review',
    bn: 'লেভেল ৩ - চূড়ান্ত পর্যালোচনা',
  },
  [ApprovalLevel.FINAL]: {
    en: 'Final - Executive Approval',
    bn: 'চূড়ান্ত - নির্বাহী অনুমোদন',
  },
};

/**
 * অ্যাপ্রুভাল ডিসিশন লেবেলসমূহ
 */
export const ApprovalDecisionLabels: Record<ApprovalDecisionValue, { en: string; bn: string }> = {
  [ApprovalDecisionTypes.APPROVE]: {
    en: 'Approve',
    bn: 'অনুমোদন',
  },
  [ApprovalDecisionTypes.REJECT]: {
    en: 'Reject',
    bn: 'বাতিল',
  },
  [ApprovalDecisionTypes.REQUEST_CHANGES]: {
    en: 'Request Changes',
    bn: 'পরিবর্তন অনুরোধ',
  },
  [ApprovalDecisionTypes.CONDITIONAL_APPROVE]: {
    en: 'Conditional Approve',
    bn: 'শর্তসাপেক্ষে অনুমোদন',
  },
};

/**
 * অ্যাপ্রুভাল প্রক্রিয়ার প্রয়োজনীয় ডকুমেন্টসমূহ
 */
export const ApprovalRequiredDocuments = [
  'business-license',
  'tax-certificate',
  'identity-proof',
  'address-proof',
  'bank-details',
];

/**
 * অ্যাপ্রুভাল রি-অ্যাপ্লাই সময় (দিন)
 */
export const ApprovalReapplyDays = 30;

/**
 * অ্যাপ্রুভাল অটো-এক্সপায়ার সময় (দিন)
 */
export const ApprovalAutoExpireDays = 14;

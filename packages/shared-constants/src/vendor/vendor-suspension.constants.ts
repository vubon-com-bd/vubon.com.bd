/**
 * ভেন্ডার সাসপেনশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাসপেনশন কারণ অবজেক্ট
 */
export const SuspensionReason = {
  POLICY_VIOLATION: 'POLICY_VIOLATION',
  FRAUD: 'FRAUD',
  INAPPROPRIATE_CONTENT: 'INAPPROPRIATE_CONTENT',
  TOS_VIOLATION: 'TOS_VIOLATION',
  PAYMENT_FAILURE: 'PAYMENT_FAILURE',
  COMPLAINT: 'COMPLAINT',
  LEGAL_ISSUE: 'LEGAL_ISSUE',
} as const;

/**
 * সাসপেনশন কারণ - ইউনিয়ন টাইপ
 */
export type SuspensionReasonValue = (typeof SuspensionReason)[keyof typeof SuspensionReason];

/**
 * সাসপেনশন ডিউরেশন অবজেক্ট
 */
export const SuspensionDuration = {
  TEMPORARY_7_DAYS: 'TEMPORARY_7_DAYS',
  TEMPORARY_14_DAYS: 'TEMPORARY_14_DAYS',
  TEMPORARY_30_DAYS: 'TEMPORARY_30_DAYS',
  PERMANENT: 'PERMANENT',
} as const;

/**
 * সাসপেনশন ডিউরেশন - ইউনিয়ন টাইপ
 */
export type SuspensionDurationValue = (typeof SuspensionDuration)[keyof typeof SuspensionDuration];

/**
 * সাসপেনশন স্ট্যাটাস অবজেক্ট
 */
export const SuspensionStatus = {
  SUSPENDED: 'SUSPENDED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  RESTORED: 'RESTORED',
  PERMANENTLY_BLOCKED: 'PERMANENTLY_BLOCKED',
} as const;

/**
 * সাসপেনশন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type SuspensionStatusValue = (typeof SuspensionStatus)[keyof typeof SuspensionStatus];

/**
 * অটো-রিস্টোর যোগ্যতা সময় (দিন)
 */
export const AutoRestoreEligibilityDays = 30;

/**
 * সাসপেনশন কারণ লেবেলসমূহ
 */
export const SuspensionReasonLabels: Record<SuspensionReasonValue, { en: string; bn: string }> = {
  [SuspensionReason.POLICY_VIOLATION]: {
    en: 'Policy Violation',
    bn: 'নীতি লঙ্ঘন',
  },
  [SuspensionReason.FRAUD]: {
    en: 'Fraud',
    bn: 'প্রতারণা',
  },
  [SuspensionReason.INAPPROPRIATE_CONTENT]: {
    en: 'Inappropriate Content',
    bn: 'অনুপযুক্ত বিষয়বস্তু',
  },
  [SuspensionReason.TOS_VIOLATION]: {
    en: 'Terms of Service Violation',
    bn: 'সেবার শর্তাবলী লঙ্ঘন',
  },
  [SuspensionReason.PAYMENT_FAILURE]: {
    en: 'Payment Failure',
    bn: 'পেমেন্ট ব্যর্থতা',
  },
  [SuspensionReason.COMPLAINT]: {
    en: 'Complaint',
    bn: 'অভিযোগ',
  },
  [SuspensionReason.LEGAL_ISSUE]: {
    en: 'Legal Issue',
    bn: 'আইনি সমস্যা',
  },
};

/**
 * সাসপেনশন ডিউরেশন লেবেলসমূহ
 */
export const SuspensionDurationLabels: Record<SuspensionDurationValue, { en: string; bn: string }> =
  {
    [SuspensionDuration.TEMPORARY_7_DAYS]: {
      en: '7 Days Temporary',
      bn: '৭ দিনের অস্থায়ী',
    },
    [SuspensionDuration.TEMPORARY_14_DAYS]: {
      en: '14 Days Temporary',
      bn: '১৪ দিনের অস্থায়ী',
    },
    [SuspensionDuration.TEMPORARY_30_DAYS]: {
      en: '30 Days Temporary',
      bn: '৩০ দিনের অস্থায়ী',
    },
    [SuspensionDuration.PERMANENT]: {
      en: 'Permanent',
      bn: 'স্থায়ী',
    },
  };

/**
 * সাসপেনশন ডিউরেশন অনুযায়ী দিন সংখ্যা
 */
export const SuspensionDurationDays: Record<SuspensionDurationValue, number> = {
  [SuspensionDuration.TEMPORARY_7_DAYS]: 7,
  [SuspensionDuration.TEMPORARY_14_DAYS]: 14,
  [SuspensionDuration.TEMPORARY_30_DAYS]: 30,
  [SuspensionDuration.PERMANENT]: -1,
};

/**
 * সাসপেনশন স্ট্যাটাস লেবেলসমূহ
 */
export const SuspensionStatusLabels: Record<SuspensionStatusValue, { en: string; bn: string }> = {
  [SuspensionStatus.SUSPENDED]: {
    en: 'Suspended',
    bn: 'স্থগিত',
  },
  [SuspensionStatus.UNDER_REVIEW]: {
    en: 'Under Review',
    bn: 'পর্যালোচনাধীন',
  },
  [SuspensionStatus.RESTORED]: {
    en: 'Restored',
    bn: 'পুনরুদ্ধার',
  },
  [SuspensionStatus.PERMANENTLY_BLOCKED]: {
    en: 'Permanently Blocked',
    bn: 'স্থায়ীভাবে অবরুদ্ধ',
  },
};

/**
 * সাসপেনশন এপিল সময় (দিন)
 */
export const SuspensionAppealDays = 14;

/**
 * সাসপেনশন রিভিউ সময় (দিন)
 */
export const SuspensionReviewDays = 5;

/**
 * সাসপেনশনের জন্য সতর্কতা সংখ্যা
 */
export const SuspensionWarningThreshold = 3;

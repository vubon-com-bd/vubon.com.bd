/**
 * ভেন্ডার রিভিউ বা পর্যালোচনা সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিভিউ স্ট্যাটাস অবজেক্ট
 */
export const ReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FLAGGED: 'FLAGGED',
  HIDDEN: 'HIDDEN',
} as const;

/**
 * রিভিউ স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ReviewStatusValue = (typeof ReviewStatus)[keyof typeof ReviewStatus];

/**
 * রিভিউ টাইপ অবজেক্ট
 */
export const ReviewType = {
  PRODUCT_REVIEW: 'PRODUCT_REVIEW',
  VENDOR_REVIEW: 'VENDOR_REVIEW',
  SERVICE_REVIEW: 'SERVICE_REVIEW',
} as const;

/**
 * রিভিউ টাইপ - ইউনিয়ন টাইপ
 */
export type ReviewTypeValue = (typeof ReviewType)[keyof typeof ReviewType];

/**
 * রিভিউ মডারেশন নিয়ম
 */
export const ReviewModerationRules = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 1000,
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
  FORBIDDEN_WORDS: ['spam', 'scam', 'fake', 'fraud', 'hate'],
} as const;

/**
 * রিভিউ দৈর্ঘ্যের সীমা
 */
export const ReviewLengthLimits = {
  MIN: 10,
  MAX: 1000,
} as const;

/**
 * রিভিউ স্বয়ংক্রিয় অ্যাপ্রুভালের জন্য রেটিং থ্রেশহোল্ড
 */
export const ReviewAutoApprovalThreshold = 3;

/**
 * রিভিউ ফ্ল্যাগ কারণসমূহ
 */
export const ReviewFlagReasons = {
  INAPPROPRIATE: 'INAPPROPRIATE',
  SPAM: 'SPAM',
  HARASSMENT: 'HARASSMENT',
  FAKE: 'FAKE',
  IRRELEVANT: 'IRRELEVANT',
} as const;

/**
 * রিভিউ ফ্ল্যাগ কারণ - ইউনিয়ন টাইপ
 */
export type ReviewFlagReasonValue = (typeof ReviewFlagReasons)[keyof typeof ReviewFlagReasons];

/**
 * রিভিউ স্ট্যাটাস লেবেলসমূহ
 */
export const ReviewStatusLabels: Record<ReviewStatusValue, { en: string; bn: string }> = {
  [ReviewStatus.PENDING]: {
    en: 'Pending Review',
    bn: 'পর্যালোচনার অপেক্ষায়',
  },
  [ReviewStatus.APPROVED]: {
    en: 'Approved',
    bn: 'অনুমোদিত',
  },
  [ReviewStatus.REJECTED]: {
    en: 'Rejected',
    bn: 'বাতিল',
  },
  [ReviewStatus.FLAGGED]: {
    en: 'Flagged',
    bn: 'চিহ্নিত',
  },
  [ReviewStatus.HIDDEN]: {
    en: 'Hidden',
    bn: 'লুকানো',
  },
};

/**
 * রিভিউ টাইপ লেবেলসমূহ
 */
export const ReviewTypeLabels: Record<ReviewTypeValue, { en: string; bn: string }> = {
  [ReviewType.PRODUCT_REVIEW]: {
    en: 'Product Review',
    bn: 'পণ্য পর্যালোচনা',
  },
  [ReviewType.VENDOR_REVIEW]: {
    en: 'Vendor Review',
    bn: 'ভেন্ডার পর্যালোচনা',
  },
  [ReviewType.SERVICE_REVIEW]: {
    en: 'Service Review',
    bn: 'সেবা পর্যালোচনা',
  },
};

/**
 * রিভিউ ফ্ল্যাগ কারণ লেবেলসমূহ
 */
export const ReviewFlagReasonLabels: Record<ReviewFlagReasonValue, { en: string; bn: string }> = {
  [ReviewFlagReasons.INAPPROPRIATE]: {
    en: 'Inappropriate Content',
    bn: 'অনুপযুক্ত বিষয়বস্তু',
  },
  [ReviewFlagReasons.SPAM]: {
    en: 'Spam',
    bn: 'স্প্যাম',
  },
  [ReviewFlagReasons.HARASSMENT]: {
    en: 'Harassment',
    bn: 'হয়রানি',
  },
  [ReviewFlagReasons.FAKE]: {
    en: 'Fake Review',
    bn: 'জাল পর্যালোচনা',
  },
  [ReviewFlagReasons.IRRELEVANT]: {
    en: 'Irrelevant',
    bn: 'অপ্রাসঙ্গিক',
  },
};

/**
 * রিভিউ এডিট উইন্ডো (ঘণ্টা)
 */
export const ReviewEditWindowHours = 24;

/**
 * রিভিউ ডিলিট উইন্ডো (ঘণ্টা)
 */
export const ReviewDeleteWindowHours = 48;

/**
 * রিভিউ রিপোর্ট উইন্ডো (দিন)
 */
export const ReviewReportWindowDays = 30;

/**
 * রিভিউ অটো-আর্কাইভ সময় (দিন)
 */
export const ReviewAutoArchiveDays = 365;

/**
 * রিভিউ সর্বোচ্চ ফ্ল্যাগ সংখ্যা
 */
export const ReviewMaxFlags = 3;

/**
 * রিভিউ মডারেশন টিম সাইজ
 */
export const ReviewModerationTeamSize = 5;

/**
 * অ্যাপ্রুভাল মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// অ্যাপ্রুভাল স্ট্যাটাস
export const ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  FLAGGED: 'FLAGGED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
} as const;

export type ApprovalStatusType = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

// অ্যাপ্রুভাল টাইপ
export const ApprovalType = {
  PRODUCT: 'PRODUCT',
  VENDOR: 'VENDOR',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  BULK: 'BULK',
  FEATURE: 'FEATURE',
  CAMPAIGN: 'CAMPAIGN',
} as const;

export type ApprovalTypeType = (typeof ApprovalType)[keyof typeof ApprovalType];

// রিভিউ লেভেল
export const ReviewLevel = {
  TIER_1: 'TIER_1',
  TIER_2: 'TIER_2',
  TIER_3: 'TIER_3',
} as const;

export type ReviewLevelType = (typeof ReviewLevel)[keyof typeof ReviewLevel];

// অ্যাপ্রুভাল টাইমআউট (ঘন্টায়)
export const APPROVAL_TIMEOUT_HOURS = 72;

// অটো-অ্যাপ্রুভাল থ্রেশহোল্ড
export const AUTO_APPROVAL_THRESHOLD = {
  MIN_RATING: 4.5,
  MIN_REVIEWS: 100,
  MIN_SALES: 1000,
  VENDOR_VERIFIED: true,
} as const;

// রিজেক্ট রিজন ক্যাটাগরি
export const RejectReasonCategory = {
  INAPPROPRIATE_CONTENT: 'INAPPROPRIATE_CONTENT',
  COPYRIGHT_VIOLATION: 'COPYRIGHT_VIOLATION',
  TRADEMARK_VIOLATION: 'TRADEMARK_VIOLATION',
  INACCURATE_INFORMATION: 'INACCURATE_INFORMATION',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  SPAM: 'SPAM',
  FRAUD: 'FRAUD',
  POLICY_VIOLATION: 'POLICY_VIOLATION',
  POOR_QUALITY: 'POOR_QUALITY',
  INCOMPLETE_INFORMATION: 'INCOMPLETE_INFORMATION',
  OTHER: 'OTHER',
} as const;

export type RejectReasonCategoryType =
  (typeof RejectReasonCategory)[keyof typeof RejectReasonCategory];

// ডিফল্ট অ্যাপ্রুভাল ভ্যালু
export const DEFAULT_APPROVAL_STATUS = ApprovalStatus.PENDING;
export const DEFAULT_APPROVAL_TYPE = ApprovalType.PRODUCT;
export const DEFAULT_REVIEW_LEVEL = ReviewLevel.TIER_1;

// অ্যাপ্রুভাল টাইমলাইন কনস্ট্যান্ট
export const APPROVAL_TIMELINE = {
  MIN_HOURS: 1,
  MAX_HOURS: 168, // 7 days
  DEFAULT_HOURS: 72,
  URGENT_HOURS: 24,
} as const;

// অ্যাপ্রুভাল রিকোয়ারমেন্ট কনস্ট্যান্ট
export const APPROVAL_REQUIREMENTS = {
  MIN_RATING: 3.0,
  MIN_REVIEWS: 5,
  MIN_SALES: 10,
  VENDOR_VERIFICATION_REQUIRED: true,
  DOCUMENTATION_REQUIRED: ['BUSINESS_LICENSE', 'IDENTITY_PROOF', 'BANK_ACCOUNT'],
  MAX_REJECTIONS_BEFORE_BAN: 3,
} as const;

// অ্যাপ্রুভাল রিভিউয়ার কনস্ট্যান্ট
export const APPROVAL_REVIEWERS = {
  MIN_REVIEWERS: 1,
  MAX_REVIEWERS: 5,
  DEFAULT_REVIEWERS: 2,
  SENIOR_REVIEWER_LEVEL: ReviewLevel.TIER_3,
} as const;

// অ্যাপ্রুভাল নোটিফিকেশন কনস্ট্যান্ট
export const APPROVAL_NOTIFICATION = {
  REMINDER_HOURS: 24,
  ESCALATION_HOURS: 48,
  MAX_ESCALATIONS: 3,
} as const;

// অ্যাপ্রুভাল স্লা কনস্ট্যান্ট
export const APPROVAL_SLA = {
  STANDARD_HOURS: 72,
  PRIORITY_HOURS: 24,
  URGENT_HOURS: 12,
} as const;

// অ্যাপ্রুভাল স্ট্যাটাস ট্রানজিশন
export const ApprovalStatusTransition = {
  PENDING_TO_UNDER_REVIEW: 'PENDING_TO_UNDER_REVIEW',
  UNDER_REVIEW_TO_APPROVED: 'UNDER_REVIEW_TO_APPROVED',
  UNDER_REVIEW_TO_REJECTED: 'UNDER_REVIEW_TO_REJECTED',
  PENDING_TO_APPROVED: 'PENDING_TO_APPROVED',
  PENDING_TO_REJECTED: 'PENDING_TO_REJECTED',
  APPROVED_TO_FLAGGED: 'APPROVED_TO_FLAGGED',
  FLAGGED_TO_UNDER_REVIEW: 'FLAGGED_TO_UNDER_REVIEW',
} as const;

export type ApprovalStatusTransitionType =
  (typeof ApprovalStatusTransition)[keyof typeof ApprovalStatusTransition];

// অ্যাপ্রুভাল মেটাডাটা কনস্ট্যান্ট
export const MAX_APPROVAL_META_FIELDS = 20;
export const APPROVAL_META_KEY_MAX_LENGTH = 100;
export const APPROVAL_META_VALUE_MAX_LENGTH = 1000;

// অ্যাপ্রুভাল হিস্টোরি কনস্ট্যান্ট
export const APPROVAL_HISTORY_MAX_DAYS = 365;
export const APPROVAL_HISTORY_MAX_ENTRIES = 10000;

// অ্যাপ্রুভাল বাল্ক অপারেশন কনস্ট্যান্ট
export const MAX_APPROVALS_PER_BULK = 100;

// অ্যাপ্রুভাল ডেডলাইন কনস্ট্যান্ট
export const APPROVAL_DEADLINE_EXTENSIONS = 3;
export const APPROVAL_DEADLINE_EXTENSION_DAYS = 7;

// অ্যাপ্রুভাল অডিট কনস্ট্যান্ট
export const APPROVAL_AUDIT_RETENTION_DAYS = 730; // 2 years
export const APPROVAL_AUDIT_LOG_MAX_SIZE = 1000;

// অ্যাপ্রুভাল এসকেলেশন কনস্ট্যান্ট
export const APPROVAL_ESCALATION_LEVELS = 3;
export const APPROVAL_ESCALATION_HOURS = [24, 48, 72];
export const APPROVAL_ESCALATION_CONTACTS = ['MANAGER', 'DIRECTOR', 'VP'];

// অ্যাপ্রুভাল রিস্ক কনস্ট্যান্ট
export const APPROVAL_RISK_LEVEL = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

export type ApprovalRiskLevelType = (typeof APPROVAL_RISK_LEVEL)[keyof typeof APPROVAL_RISK_LEVEL];

// ডিফল্ট রিস্ক লেভেল
export const DEFAULT_APPROVAL_RISK_LEVEL = APPROVAL_RISK_LEVEL.MEDIUM;

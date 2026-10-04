export const AFFILIATE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  REJECTED: 'rejected',
  BLOCKED: 'blocked',
} as const;

export const AFFILIATE_TYPE = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  INFLUENCER: 'influencer',
  BLOGGER: 'blogger',
  COUPON_SITE: 'coupon_site',
  CASHBACK_SITE: 'cashback_site',
  COMPARISON_SITE: 'comparison_site',
  AGENCY: 'agency',
} as const;

export const AFFILIATE_COMMISSION_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  TIERED: 'tiered',
  HYBRID: 'hybrid',
  CPA: 'cpa',
  CPL: 'cpl',
  CPS: 'cps',
} as const;

export const AFFILIATE = {
  STATUS: AFFILIATE_STATUS,
  TYPE: AFFILIATE_TYPE,
  COMMISSION_TYPE: AFFILIATE_COMMISSION_TYPE,
  MIN_COMMISSION_PERCENT: 1,
  MAX_COMMISSION_PERCENT: 50,
  DEFAULT_COMMISSION_PERCENT: 10,
  COOKIE_DURATION_DAYS: 30,
  MAX_COOKIE_DURATION_DAYS: 90,
  MIN_PAYOUT_AMOUNT: 1000,
  PAYOUT_HOLD_DAYS: 30,
  MAX_PAYOUT_AMOUNT: 10000000,
  REQUIRE_APPROVAL: true,
  AUTO_APPROVE_VERIFIED: false,
  TIER_THRESHOLDS: {
    bronze: 0,
    silver: 50000,
    gold: 200000,
    platinum: 1000000,
  },
} as const;

export type AffiliateStatusType = (typeof AFFILIATE_STATUS)[keyof typeof AFFILIATE_STATUS];
export type AffiliateTypeType = (typeof AFFILIATE_TYPE)[keyof typeof AFFILIATE_TYPE];
export type AffiliateCommissionTypeType =
  (typeof AFFILIATE_COMMISSION_TYPE)[keyof typeof AFFILIATE_COMMISSION_TYPE];

export const VENDOR_VERIFICATION_STATUS = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  RESUBMITTED: 'resubmitted',
} as const;

export const VENDOR_VERIFICATION_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  BUSINESS_LICENSE: 'business_license',
  TAX_ID: 'tax_id',
  BANK_ACCOUNT: 'bank_account',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  WEBSITE: 'website',
} as const;

export const VENDOR_VERIFICATION = {
  REQUIRE_EMAIL: true,
  REQUIRE_PHONE: true,
  REQUIRE_BUSINESS_LICENSE: true,
  REQUIRE_TAX_ID: true,
  REQUIRE_BANK_ACCOUNT: true,
  REQUIRE_IDENTITY: true,
  AUTO_APPROVE_VERIFIED: false,
  REVIEW_SLA_HOURS: 72,
  EXPIRY_DAYS: 365,
} as const;

export type VendorVerificationStatusType =
  (typeof VENDOR_VERIFICATION_STATUS)[keyof typeof VENDOR_VERIFICATION_STATUS];
export type VendorVerificationTypeType =
  (typeof VENDOR_VERIFICATION_TYPE)[keyof typeof VENDOR_VERIFICATION_TYPE];

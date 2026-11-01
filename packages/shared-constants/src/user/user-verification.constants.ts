export const USER_VERIFICATION = {
  EMAIL_REQUIRED: true,
  PHONE_REQUIRED: false,
  IDENTITY_REQUIRED: false,
  ADDRESS_REQUIRED: false,
  EMAIL_TOKEN_EXPIRY_SECONDS: 86400,
  PHONE_TOKEN_EXPIRY_SECONDS: 600,
  VERIFY_BEFORE_LOGIN: false,
  VERIFY_BEFORE_ORDER: false,
  VERIFY_BEFORE_PAYOUT: true,
} as const;

export const USER_VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  RESUBMITTED: 'resubmitted',
} as const;

export type UserVerificationStatusType =
  (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];

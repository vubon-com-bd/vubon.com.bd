export const VERIFICATION_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  KYC: 'kyc',
  ADDRESS: 'address',
  IDENTITY: 'identity',
  BUSINESS: 'business',
  BANK_ACCOUNT: 'bank_account',
  TWO_FACTOR: 'two_factor',
} as const;

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  RESUBMITTED: 'resubmitted',
} as const;

export const OTP = {
  LENGTH: 6,
  MIN_LENGTH: 4,
  MAX_LENGTH: 8,
  EXPIRY_SECONDS: 300,
  RESEND_COOLDOWN_SECONDS: 60,
  MAX_ATTEMPTS: 5,
  MAX_RESEND: 3,
} as const;

export const VERIFICATION_TOKEN = {
  LENGTH: 32,
  EXPIRY_SECONDS: 3600,
  EMAIL_EXPIRY_SECONDS: 86400,
  PHONE_EXPIRY_SECONDS: 600,
} as const;

export const VERIFICATION_LINK = {
  EMAIL_PATH: '/verify/email',
  PHONE_PATH: '/verify/phone',
  RESET_PASSWORD_PATH: '/reset-password',
  INVITE_PATH: '/invite',
} as const;

export type VerificationTypeType = (typeof VERIFICATION_TYPE)[keyof typeof VERIFICATION_TYPE];
export type VerificationStatusType = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

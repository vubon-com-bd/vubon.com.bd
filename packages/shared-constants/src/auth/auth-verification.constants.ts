/**
 * Authentication Verification Constants
 * Verification management configuration
 */

export const AUTH_VERIFICATION = {
  // Verification types
  TYPE: {
    EMAIL: 'email',
    PHONE: 'phone',
    IDENTITY: 'identity',
    ADDRESS: 'address',
    DOCUMENT: 'document',
    BIRTH_DATE: 'birth_date',
    NATIONAL_ID: 'national_id',
    PASSPORT: 'passport',
    DRIVING_LICENSE: 'driving_license',
    TAX_ID: 'tax_id',
    BANK_ACCOUNT: 'bank_account',
    BUSINESS_LICENSE: 'business_license',
    TRADE_LICENSE: 'trade_license',
  },

  // Verification status
  STATUS: {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    IN_PROGRESS: 'in_progress',
    REQUIRES_INFO: 'requires_info',
  },

  // Verification configuration
  CONFIG: {
    EMAIL_VERIFICATION_EXPIRY: 86400, // 24 hours
    PHONE_VERIFICATION_EXPIRY: 600, // 10 minutes
    IDENTITY_VERIFICATION_EXPIRY: 604800, // 7 days
    MAX_VERIFICATION_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60, // 1 minute
    VERIFICATION_CODE_LENGTH: 6,
    VERIFICATION_CODE_ALPHABET: '0123456789',
    AUTO_VERIFY_TIMEOUT: 300, // 5 minutes
  },

  // Verification events
  EVENTS: {
    INITIATED: 'verification:initiated',
    SENT: 'verification:sent',
    VERIFIED: 'verification:verified',
    REJECTED: 'verification:rejected',
    EXPIRED: 'verification:expired',
    FAILED: 'verification:failed',
    RESENT: 'verification:resent',
    CANCELLED: 'verification:cancelled',
  },

  // Verification channels
  CHANNEL: {
    EMAIL: 'email',
    SMS: 'sms',
    WHATSAPP: 'whatsapp',
    VOICE: 'voice',
    IN_APP: 'in_app',
    PUSH: 'push',
  },

  // Verification levels
  LEVEL: {
    BASIC: 'basic',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  },
} as const;

export type AuthVerificationType =
  (typeof AUTH_VERIFICATION.TYPE)[keyof typeof AUTH_VERIFICATION.TYPE];
export type AuthVerificationStatus =
  (typeof AUTH_VERIFICATION.STATUS)[keyof typeof AUTH_VERIFICATION.STATUS];
export type AuthVerificationEvent =
  (typeof AUTH_VERIFICATION.EVENTS)[keyof typeof AUTH_VERIFICATION.EVENTS];
export type AuthVerificationChannel =
  (typeof AUTH_VERIFICATION.CHANNEL)[keyof typeof AUTH_VERIFICATION.CHANNEL];
export type AuthVerificationLevel =
  (typeof AUTH_VERIFICATION.LEVEL)[keyof typeof AUTH_VERIFICATION.LEVEL];

export const IDENTITY_VERIFICATION_TYPES: AuthVerificationType[] = [
  AUTH_VERIFICATION.TYPE.IDENTITY,
  AUTH_VERIFICATION.TYPE.NATIONAL_ID,
  AUTH_VERIFICATION.TYPE.PASSPORT,
  AUTH_VERIFICATION.TYPE.DRIVING_LICENSE,
  AUTH_VERIFICATION.TYPE.TAX_ID,
];

export const DOCUMENT_VERIFICATION_TYPES: AuthVerificationType[] = [
  AUTH_VERIFICATION.TYPE.DOCUMENT,
  AUTH_VERIFICATION.TYPE.BUSINESS_LICENSE,
  AUTH_VERIFICATION.TYPE.TRADE_LICENSE,
  AUTH_VERIFICATION.TYPE.BANK_ACCOUNT,
];

export const CONTACT_VERIFICATION_TYPES: AuthVerificationType[] = [
  AUTH_VERIFICATION.TYPE.EMAIL,
  AUTH_VERIFICATION.TYPE.PHONE,
  AUTH_VERIFICATION.TYPE.ADDRESS,
];

export const COMPLETED_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION.STATUS.VERIFIED,
  AUTH_VERIFICATION.STATUS.REJECTED,
  AUTH_VERIFICATION.STATUS.CANCELLED,
];

export const IN_PROGRESS_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION.STATUS.PENDING,
  AUTH_VERIFICATION.STATUS.IN_PROGRESS,
  AUTH_VERIFICATION.STATUS.REQUIRES_INFO,
];

export const FAILED_VERIFICATION_STATUSES: AuthVerificationStatus[] = [
  AUTH_VERIFICATION.STATUS.FAILED,
  AUTH_VERIFICATION.STATUS.EXPIRED,
];

export function isVerificationComplete(status: AuthVerificationStatus): boolean {
  return COMPLETED_VERIFICATION_STATUSES.includes(status);
}

export function isVerificationInProgress(status: AuthVerificationStatus): boolean {
  return IN_PROGRESS_VERIFICATION_STATUSES.includes(status);
}

export function isVerificationFailed(status: AuthVerificationStatus): boolean {
  return FAILED_VERIFICATION_STATUSES.includes(status);
}

export function isIdentityVerification(type: AuthVerificationType): boolean {
  return IDENTITY_VERIFICATION_TYPES.includes(type);
}

export function isDocumentVerification(type: AuthVerificationType): boolean {
  return DOCUMENT_VERIFICATION_TYPES.includes(type);
}

export function isContactVerification(type: AuthVerificationType): boolean {
  return CONTACT_VERIFICATION_TYPES.includes(type);
}

export function getVerificationExpiry(type: AuthVerificationType): number {
  const expiryMap: Record<AuthVerificationType, number> = {
    [AUTH_VERIFICATION.TYPE.EMAIL]: AUTH_VERIFICATION.CONFIG.EMAIL_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.PHONE]: AUTH_VERIFICATION.CONFIG.PHONE_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.IDENTITY]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.ADDRESS]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.DOCUMENT]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.BIRTH_DATE]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.NATIONAL_ID]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.PASSPORT]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.DRIVING_LICENSE]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.TAX_ID]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.BANK_ACCOUNT]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.BUSINESS_LICENSE]:
      AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
    [AUTH_VERIFICATION.TYPE.TRADE_LICENSE]: AUTH_VERIFICATION.CONFIG.IDENTITY_VERIFICATION_EXPIRY,
  };

  return expiryMap[type] || AUTH_VERIFICATION.CONFIG.EMAIL_VERIFICATION_EXPIRY;
}

export function getVerificationTypeLabel(type: AuthVerificationType): string {
  const labels: Record<AuthVerificationType, string> = {
    [AUTH_VERIFICATION.TYPE.EMAIL]: 'Email Verification',
    [AUTH_VERIFICATION.TYPE.PHONE]: 'Phone Verification',
    [AUTH_VERIFICATION.TYPE.IDENTITY]: 'Identity Verification',
    [AUTH_VERIFICATION.TYPE.ADDRESS]: 'Address Verification',
    [AUTH_VERIFICATION.TYPE.DOCUMENT]: 'Document Verification',
    [AUTH_VERIFICATION.TYPE.BIRTH_DATE]: 'Birth Date Verification',
    [AUTH_VERIFICATION.TYPE.NATIONAL_ID]: 'National ID Verification',
    [AUTH_VERIFICATION.TYPE.PASSPORT]: 'Passport Verification',
    [AUTH_VERIFICATION.TYPE.DRIVING_LICENSE]: 'Driving License Verification',
    [AUTH_VERIFICATION.TYPE.TAX_ID]: 'Tax ID Verification',
    [AUTH_VERIFICATION.TYPE.BANK_ACCOUNT]: 'Bank Account Verification',
    [AUTH_VERIFICATION.TYPE.BUSINESS_LICENSE]: 'Business License Verification',
    [AUTH_VERIFICATION.TYPE.TRADE_LICENSE]: 'Trade License Verification',
  };

  return labels[type] || 'Unknown Verification Type';
}

export function getVerificationStatusLabel(status: AuthVerificationStatus): string {
  const labels: Record<AuthVerificationStatus, string> = {
    [AUTH_VERIFICATION.STATUS.PENDING]: 'Pending',
    [AUTH_VERIFICATION.STATUS.VERIFIED]: 'Verified',
    [AUTH_VERIFICATION.STATUS.REJECTED]: 'Rejected',
    [AUTH_VERIFICATION.STATUS.EXPIRED]: 'Expired',
    [AUTH_VERIFICATION.STATUS.FAILED]: 'Failed',
    [AUTH_VERIFICATION.STATUS.CANCELLED]: 'Cancelled',
    [AUTH_VERIFICATION.STATUS.IN_PROGRESS]: 'In Progress',
    [AUTH_VERIFICATION.STATUS.REQUIRES_INFO]: 'Requires Information',
  };

  return labels[status] || 'Unknown Status';
}

export function getVerificationChannelLabel(channel: AuthVerificationChannel): string {
  const labels: Record<AuthVerificationChannel, string> = {
    [AUTH_VERIFICATION.CHANNEL.EMAIL]: 'Email',
    [AUTH_VERIFICATION.CHANNEL.SMS]: 'SMS',
    [AUTH_VERIFICATION.CHANNEL.WHATSAPP]: 'WhatsApp',
    [AUTH_VERIFICATION.CHANNEL.VOICE]: 'Voice Call',
    [AUTH_VERIFICATION.CHANNEL.IN_APP]: 'In-App',
    [AUTH_VERIFICATION.CHANNEL.PUSH]: 'Push Notification',
  };

  return labels[channel] || 'Unknown Channel';
}

export function getVerificationLevel(level: AuthVerificationLevel): number {
  const levels: Record<AuthVerificationLevel, number> = {
    [AUTH_VERIFICATION.LEVEL.BASIC]: 1,
    [AUTH_VERIFICATION.LEVEL.MEDIUM]: 2,
    [AUTH_VERIFICATION.LEVEL.HIGH]: 3,
    [AUTH_VERIFICATION.LEVEL.VERY_HIGH]: 4,
  };

  return levels[level] || 1;
}

/**
 * Admin Verification Constants
 * Verification and validation definitions
 */

/**
 * Verification types
 */
export const VERIFICATION_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  PAYMENT: 'payment',
  TWO_FA: 'two_fa',
  DEVICE: 'device',
  BIO: 'bio',
  SECURITY: 'security',
  COMPLIANCE: 'compliance',
  ADMIN: 'admin',
  ROLE: 'role',
  PERMISSION: 'permission',
} as const;

/**
 * Verification status
 */
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
  WAITING: 'waiting',
} as const;

/**
 * Verification methods
 */
export const VERIFICATION_METHOD = {
  OTP: 'otp',
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  CALL: 'call',
  QR: 'qr',
  BIOMETRIC: 'biometric',
  FACIAL: 'facial',
  FINGERPRINT: 'fingerprint',
  IRIS: 'iris',
  VOICE: 'voice',
  DOCUMENT: 'document',
  KNOWLEDGE: 'knowledge',
  DEVICE: 'device',
  LOCATION: 'location',
} as const;

/**
 * Verification OTP types
 */
export const OTP_TYPE = {
  LOGIN: 'login',
  REGISTER: 'register',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
  PHONE_VERIFICATION: 'phone_verification',
  TWO_FA: 'two_fa',
  TRANSACTION: 'transaction',
  WITHDRAWAL: 'withdrawal',
  SECURITY: 'security',
  ADMIN_ACTION: 'admin_action',
} as const;

/**
 * Verification duration (in seconds)
 */
export const VERIFICATION_DURATION = {
  OTP: 300, // 5 minutes
  EMAIL: 86400, // 24 hours
  PHONE: 86400, // 24 hours
  IDENTITY: 604800, // 7 days
  ADDRESS: 604800, // 7 days
  PAYMENT: 86400, // 24 hours
  TWO_FA: 300, // 5 minutes
  DEVICE: 3600, // 1 hour
  BIO: 86400, // 24 hours
  SECURITY: 3600, // 1 hour
  COMPLIANCE: 2592000, // 30 days
} as const;

/**
 * Verification error codes
 */
export const VERIFICATION_ERROR = {
  INVALID_CODE: 'ERR_VERIFY_001',
  EXPIRED_CODE: 'ERR_VERIFY_002',
  TOO_MANY_ATTEMPTS: 'ERR_VERIFY_003',
  CODE_MISMATCH: 'ERR_VERIFY_004',
  METHOD_NOT_SUPPORTED: 'ERR_VERIFY_005',
  VERIFICATION_FAILED: 'ERR_VERIFY_006',
  VERIFICATION_EXPIRED: 'ERR_VERIFY_007',
  ALREADY_VERIFIED: 'ERR_VERIFY_008',
  INVALID_METHOD: 'ERR_VERIFY_009',
} as const;

/**
 * Get verification status label
 */
export function getVerificationStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    [VERIFICATION_STATUS.PENDING]: 'Pending Verification',
    [VERIFICATION_STATUS.VERIFIED]: 'Verified',
    [VERIFICATION_STATUS.REJECTED]: 'Rejected',
    [VERIFICATION_STATUS.EXPIRED]: 'Expired',
    [VERIFICATION_STATUS.REVOKED]: 'Revoked',
    [VERIFICATION_STATUS.FAILED]: 'Failed',
    [VERIFICATION_STATUS.IN_PROGRESS]: 'In Progress',
    [VERIFICATION_STATUS.WAITING]: 'Waiting',
  };
  return labels[status] || status;
}

/**
 * Get verification status color
 */
export function getVerificationStatusColor(status: string): string {
  const colors: Record<string, string> = {
    [VERIFICATION_STATUS.PENDING]: 'warning',
    [VERIFICATION_STATUS.VERIFIED]: 'success',
    [VERIFICATION_STATUS.REJECTED]: 'error',
    [VERIFICATION_STATUS.EXPIRED]: 'default',
    [VERIFICATION_STATUS.REVOKED]: 'error',
    [VERIFICATION_STATUS.FAILED]: 'error',
    [VERIFICATION_STATUS.IN_PROGRESS]: 'info',
    [VERIFICATION_STATUS.WAITING]: 'warning',
  };
  return colors[status] || 'default';
}

/**
 * Get OTP type label
 */
export function getOtpTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    [OTP_TYPE.LOGIN]: 'Login OTP',
    [OTP_TYPE.REGISTER]: 'Registration OTP',
    [OTP_TYPE.PASSWORD_RESET]: 'Password Reset OTP',
    [OTP_TYPE.EMAIL_VERIFICATION]: 'Email Verification OTP',
    [OTP_TYPE.PHONE_VERIFICATION]: 'Phone Verification OTP',
    [OTP_TYPE.TWO_FA]: '2FA OTP',
    [OTP_TYPE.TRANSACTION]: 'Transaction OTP',
    [OTP_TYPE.WITHDRAWAL]: 'Withdrawal OTP',
    [OTP_TYPE.SECURITY]: 'Security OTP',
    [OTP_TYPE.ADMIN_ACTION]: 'Admin Action OTP',
  };
  return labels[type] || type;
}

/**
 * Check if verification is complete
 */
export function isVerificationComplete(status: string): boolean {
  return status === VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if verification is in progress
 */
export function isVerificationInProgress(status: string): boolean {
  return (
    status === VERIFICATION_STATUS.PENDING ||
    status === VERIFICATION_STATUS.IN_PROGRESS ||
    status === VERIFICATION_STATUS.WAITING
  );
}

/**
 * Check if verification has failed
 */
export function isVerificationFailed(status: string): boolean {
  return (
    status === VERIFICATION_STATUS.REJECTED ||
    status === VERIFICATION_STATUS.FAILED ||
    status === VERIFICATION_STATUS.REVOKED
  );
}

/**
 * Get verification duration for type
 */
export function getVerificationDuration(type: string): number {
  return VERIFICATION_DURATION[type as keyof typeof VERIFICATION_DURATION] || 3600;
}

/**
 * Get verification expiry time
 */
export function getVerificationExpiry(type: string): Date {
  const duration = getVerificationDuration(type);
  return new Date(Date.now() + duration * 1000);
}

/**
 * Check if verification is expired
 */
export function isVerificationExpired(createdAt: Date, type: string): boolean {
  const duration = getVerificationDuration(type);
  const age = (Date.now() - createdAt.getTime()) / 1000;
  return age > duration;
}

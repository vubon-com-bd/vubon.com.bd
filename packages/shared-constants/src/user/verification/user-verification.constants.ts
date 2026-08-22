/**
 * User Verification Constants
 * Core user verification-related constants
 */

import { USER_VERIFICATION_TYPE } from './user-verification-type.constants';
import { USER_VERIFICATION_STATUS } from './user-verification-status.constants';

export const USER_VERIFICATION = {
  // Default values
  DEFAULTS: {
    STATUS: USER_VERIFICATION_STATUS.PENDING,
    TYPE: USER_VERIFICATION_TYPE.EMAIL,
    ATTEMPTS: 0,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60, // seconds
    EXPIRY_TIME: 300, // seconds (5 minutes)
  },

  // Verification purposes
  PURPOSES: {
    EMAIL_VERIFICATION: 'email-verification',
    PHONE_VERIFICATION: 'phone-verification',
    PASSWORD_RESET: 'password-reset',
    ACCOUNT_RECOVERY: 'account-recovery',
    TWO_FACTOR_AUTH: 'two-factor-auth',
    LOGIN_CONFIRMATION: 'login-confirmation',
    PAYMENT_CONFIRMATION: 'payment-confirmation',
    EMAIL_CHANGE: 'email-change',
    PHONE_CHANGE: 'phone-change',
    KYC_VERIFICATION: 'kyc-verification',
    DEVICE_VERIFICATION: 'device-verification',
    BIOMETRIC_SETUP: 'biometric-setup',
    WITHDRAWAL_CONFIRMATION: 'withdrawal-confirmation',
    ACCOUNT_DELETION: 'account-deletion',
  },

  // Verification channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    WHATSAPP: 'whatsapp',
    CALL: 'call',
    AUTHENTICATOR: 'authenticator',
    BACKUP_CODE: 'backup-code',
    BIOMETRIC: 'biometric',
  },

  // Verification code lengths
  CODE_LENGTHS: {
    OTP: 6,
    BACKUP_CODE: 8,
    REFERENCE_CODE: 12,
    RESET_TOKEN: 32,
    VERIFICATION_TOKEN: 64,
  },

  // Verification fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    PURPOSE: 'purpose',
    CHANNEL: 'channel',
    CODE: 'code',
    TOKEN: 'token',
    REFERENCE: 'reference',
    EXPIRES_AT: 'expiresAt',
    VERIFIED_AT: 'verifiedAt',
    ATTEMPTS: 'attempts',
    MAX_ATTEMPTS: 'maxAttempts',
    IP_ADDRESS: 'ipAddress',
    USER_AGENT: 'userAgent',
    DEVICE_ID: 'deviceId',
    RESEND_COUNT: 'resendCount',
    RESEND_AT: 'resendAt',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Verification messages
  MESSAGES: {
    [USER_VERIFICATION_STATUS.PENDING]: 'Verification is pending',
    [USER_VERIFICATION_STATUS.VERIFIED]: 'Verification completed successfully',
    [USER_VERIFICATION_STATUS.REJECTED]: 'Verification was rejected',
    [USER_VERIFICATION_STATUS.EXPIRED]: 'Verification has expired',
    [USER_VERIFICATION_STATUS.REVOKED]: 'Verification was revoked',
    [USER_VERIFICATION_STATUS.FAILED]: 'Verification failed',
  },

  // OTP generation settings
  OTP_SETTINGS: {
    LENGTH: 6,
    TYPE: 'numeric',
    ALLOWED_CHARS: '0123456789',
    EXPIRY: 300, // 5 minutes
    RESEND_COOLDOWN: 60, // 1 minute
    MAX_ATTEMPTS: 3,
    MAX_RESEND: 5,
  },

  // Token generation settings
  TOKEN_SETTINGS: {
    LENGTH: 64,
    TYPE: 'alphanumeric',
    ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    EXPIRY: 3600, // 1 hour
  },
} as const;

export type UserVerificationPurpose =
  (typeof USER_VERIFICATION.PURPOSES)[keyof typeof USER_VERIFICATION.PURPOSES];
export type UserVerificationChannel =
  (typeof USER_VERIFICATION.CHANNELS)[keyof typeof USER_VERIFICATION.CHANNELS];
export type UserVerificationCodeLength =
  (typeof USER_VERIFICATION.CODE_LENGTHS)[keyof typeof USER_VERIFICATION.CODE_LENGTHS];

export function getVerificationPurposeLabel(purpose: UserVerificationPurpose): string {
  const labels: Record<UserVerificationPurpose, string> = {
    [USER_VERIFICATION.PURPOSES.EMAIL_VERIFICATION]: 'Email Verification',
    [USER_VERIFICATION.PURPOSES.PHONE_VERIFICATION]: 'Phone Verification',
    [USER_VERIFICATION.PURPOSES.PASSWORD_RESET]: 'Password Reset',
    [USER_VERIFICATION.PURPOSES.ACCOUNT_RECOVERY]: 'Account Recovery',
    [USER_VERIFICATION.PURPOSES.TWO_FACTOR_AUTH]: 'Two-Factor Authentication',
    [USER_VERIFICATION.PURPOSES.LOGIN_CONFIRMATION]: 'Login Confirmation',
    [USER_VERIFICATION.PURPOSES.PAYMENT_CONFIRMATION]: 'Payment Confirmation',
    [USER_VERIFICATION.PURPOSES.EMAIL_CHANGE]: 'Email Change',
    [USER_VERIFICATION.PURPOSES.PHONE_CHANGE]: 'Phone Change',
    [USER_VERIFICATION.PURPOSES.KYC_VERIFICATION]: 'KYC Verification',
    [USER_VERIFICATION.PURPOSES.DEVICE_VERIFICATION]: 'Device Verification',
    [USER_VERIFICATION.PURPOSES.BIOMETRIC_SETUP]: 'Biometric Setup',
    [USER_VERIFICATION.PURPOSES.WITHDRAWAL_CONFIRMATION]: 'Withdrawal Confirmation',
    [USER_VERIFICATION.PURPOSES.ACCOUNT_DELETION]: 'Account Deletion',
  };
  return labels[purpose] || 'Unknown';
}

export function getVerificationChannelLabel(channel: UserVerificationChannel): string {
  const labels: Record<UserVerificationChannel, string> = {
    [USER_VERIFICATION.CHANNELS.EMAIL]: 'Email',
    [USER_VERIFICATION.CHANNELS.SMS]: 'SMS',
    [USER_VERIFICATION.CHANNELS.WHATSAPP]: 'WhatsApp',
    [USER_VERIFICATION.CHANNELS.CALL]: 'Phone Call',
    [USER_VERIFICATION.CHANNELS.AUTHENTICATOR]: 'Authenticator App',
    [USER_VERIFICATION.CHANNELS.BACKUP_CODE]: 'Backup Code',
    [USER_VERIFICATION.CHANNELS.BIOMETRIC]: 'Biometric',
  };
  return labels[channel] || 'Unknown';
}

export function getVerificationStatusMessage(status: string): string {
  return (
    USER_VERIFICATION.MESSAGES[status as keyof typeof USER_VERIFICATION.MESSAGES] ||
    'Unknown status'
  );
}

export function isVerificationComplete(status: string): boolean {
  return status === USER_VERIFICATION_STATUS.VERIFIED;
}

export function isVerificationPending(status: string): boolean {
  return status === USER_VERIFICATION_STATUS.PENDING;
}

export function isVerificationExpired(status: string): boolean {
  return status === USER_VERIFICATION_STATUS.EXPIRED;
}

export function canResendVerification(
  resendAt: Date | null,
  cooldownSeconds: number = USER_VERIFICATION.DEFAULTS.RESEND_COOLDOWN
): boolean {
  if (!resendAt) return true;
  const now = new Date();
  const diffSeconds = (now.getTime() - resendAt.getTime()) / 1000;
  return diffSeconds >= cooldownSeconds;
}

export function isVerificationExpiredByTime(
  expiresAt: Date,
  currentTime: Date = new Date()
): boolean {
  return currentTime > expiresAt;
}

export function getRemainingTimeInSeconds(expiresAt: Date): number {
  const now = new Date();
  const diff = (expiresAt.getTime() - now.getTime()) / 1000;
  return Math.max(0, diff);
}

export function getVerificationCode(
  length: number = USER_VERIFICATION.OTP_SETTINGS.LENGTH
): string {
  const chars = USER_VERIFICATION.OTP_SETTINGS.ALLOWED_CHARS;
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function generateVerificationToken(
  length: number = USER_VERIFICATION.TOKEN_SETTINGS.LENGTH
): string {
  const chars = USER_VERIFICATION.TOKEN_SETTINGS.ALLOWED_CHARS;
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function getChannelForType(type: string): UserVerificationChannel {
  if (type === USER_VERIFICATION_TYPE.EMAIL) {
    return USER_VERIFICATION.CHANNELS.EMAIL;
  }
  if (type === USER_VERIFICATION_TYPE.PHONE) {
    return USER_VERIFICATION.CHANNELS.SMS;
  }
  if (type === USER_VERIFICATION_TYPE.WHATSAPP) {
    return USER_VERIFICATION.CHANNELS.WHATSAPP;
  }
  return USER_VERIFICATION.CHANNELS.EMAIL;
}

export function getVerificationPurposeForType(type: string): UserVerificationPurpose {
  if (type === USER_VERIFICATION_TYPE.EMAIL) {
    return USER_VERIFICATION.PURPOSES.EMAIL_VERIFICATION;
  }
  if (type === USER_VERIFICATION_TYPE.PHONE) {
    return USER_VERIFICATION.PURPOSES.PHONE_VERIFICATION;
  }
  if (type === USER_VERIFICATION_TYPE.TWO_FACTOR) {
    return USER_VERIFICATION.PURPOSES.TWO_FACTOR_AUTH;
  }
  if (type === USER_VERIFICATION_TYPE.KYC) {
    return USER_VERIFICATION.PURPOSES.KYC_VERIFICATION;
  }
  if (type === USER_VERIFICATION_TYPE.PASSWORD_RESET) {
    return USER_VERIFICATION.PURPOSES.PASSWORD_RESET;
  }
  return USER_VERIFICATION.PURPOSES.EMAIL_VERIFICATION;
}

export function getVerificationExpiryTime(type: string): number {
  if (type === USER_VERIFICATION_TYPE.PASSWORD_RESET) {
    return 3600; // 1 hour
  }
  if (type === USER_VERIFICATION_TYPE.TWO_FACTOR) {
    return 180; // 3 minutes
  }
  if (type === USER_VERIFICATION_TYPE.KYC) {
    return 86400; // 24 hours
  }
  return USER_VERIFICATION.DEFAULTS.EXPIRY_TIME;
}

export function getMaxAttemptsForType(type: string): number {
  if (type === USER_VERIFICATION_TYPE.TWO_FACTOR) {
    return 3;
  }
  if (type === USER_VERIFICATION_TYPE.PASSWORD_RESET) {
    return 5;
  }
  return USER_VERIFICATION.DEFAULTS.MAX_ATTEMPTS;
}

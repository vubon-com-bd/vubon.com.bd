/**
 * Authentication Login Attempt Constants
 * Login attempt management configuration
 */

import { AUTH_LOGIN_ATTEMPT_STATUS } from './auth-login-attempt-status.constants';

// Define TYPES first
export const ATTEMPT_TYPES = {
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
  LOCKED: 'locked',
  TIMEOUT: 'timeout',
  CAPTCHA: 'captcha',
  SUSPICIOUS: 'suspicious',
  VALID: 'valid',
  INVALID: 'invalid',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;

// Define REASONS
export const ATTEMPT_REASONS = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  ACCOUNT_LOCKED: 'account_locked',
  IP_BLOCKED: 'ip_blocked',
  DEVICE_BLOCKED: 'device_blocked',
  GEO_BLOCKED: 'geo_blocked',
  RATE_LIMIT: 'rate_limit',
  TIMEOUT: 'timeout',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  CAPTCHA_FAILED: 'captcha_failed',
  TOKEN_EXPIRED: 'token_expired',
  SESSION_EXPIRED: 'session_expired',
  INVALID_TOKEN: 'invalid_token',
  INVALID_SESSION: 'invalid_session',
  REQUIRES_MFA: 'requires_mfa',
  REQUIRES_2FA: 'requires_2fa',
  REQUIRES_VERIFICATION: 'requires_verification',
} as const;

// Define EVENTS
export const ATTEMPT_EVENTS = {
  ATTEMPTED: 'login:attempted',
  SUCCEEDED: 'login:succeeded',
  FAILED: 'login:failed',
  BLOCKED: 'login:blocked',
  LOCKED: 'login:locked',
  UNLOCKED: 'login:unlocked',
  TIMEOUT: 'login:timeout',
  CAPTCHA: 'login:captcha',
  SUSPICIOUS: 'login:suspicious',
  RESET: 'login:reset',
} as const;

// Define LEVELS
export const ATTEMPT_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
  MAXIMUM: 5,
} as const;

// Define CONFIG
export const ATTEMPT_CONFIG = {
  MAX_ATTEMPTS: 5,
  MAX_FAILED_ATTEMPTS: 3,
  RESET_AFTER_MINUTES: 15,
  BLOCK_DURATION_MINUTES: 30,
  TRACK_IP: true,
  TRACK_DEVICE: true,
  TRACK_USER_AGENT: true,
  NOTIFY_ON_FAILED: true,
  NOTIFY_ON_BLOCKED: true,
  CAPTCHA_AFTER_ATTEMPTS: 3,
  REQUIRE_CAPTCHA: false,
} as const;

// Define DEFAULTS
export const ATTEMPT_DEFAULTS = {
  STATUS: AUTH_LOGIN_ATTEMPT_STATUS.PENDING,
  TYPE: ATTEMPT_TYPES.VALID,
  LEVEL: ATTEMPT_LEVELS.NONE,
  MAX_ATTEMPTS: 5,
  MAX_FAILED_ATTEMPTS: 3,
} as const;

// Main AUTH_LOGIN_ATTEMPT object
export const AUTH_LOGIN_ATTEMPT = {
  CONFIG: ATTEMPT_CONFIG,
  TYPES: ATTEMPT_TYPES,
  REASONS: ATTEMPT_REASONS,
  EVENTS: ATTEMPT_EVENTS,
  LEVELS: ATTEMPT_LEVELS,
  DEFAULTS: ATTEMPT_DEFAULTS,
} as const;

export type AuthLoginAttemptConfig = typeof ATTEMPT_CONFIG;
export type AuthLoginAttemptType = (typeof ATTEMPT_TYPES)[keyof typeof ATTEMPT_TYPES];
export type AuthLoginAttemptReason = (typeof ATTEMPT_REASONS)[keyof typeof ATTEMPT_REASONS];
export type AuthLoginAttemptEvent = (typeof ATTEMPT_EVENTS)[keyof typeof ATTEMPT_EVENTS];
export type AuthLoginAttemptLevel = (typeof ATTEMPT_LEVELS)[keyof typeof ATTEMPT_LEVELS];
export type AuthLoginAttemptDefaults = typeof ATTEMPT_DEFAULTS;

export const ATTEMPT_TYPES_LIST: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.SUCCESS,
  ATTEMPT_TYPES.FAILED,
  ATTEMPT_TYPES.BLOCKED,
  ATTEMPT_TYPES.LOCKED,
  ATTEMPT_TYPES.TIMEOUT,
  ATTEMPT_TYPES.CAPTCHA,
  ATTEMPT_TYPES.SUSPICIOUS,
  ATTEMPT_TYPES.VALID,
  ATTEMPT_TYPES.INVALID,
  ATTEMPT_TYPES.EXPIRED,
  ATTEMPT_TYPES.REVOKED,
];

export const SUCCESS_ATTEMPT_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.SUCCESS,
  ATTEMPT_TYPES.VALID,
];

export const FAILED_ATTEMPT_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.FAILED,
  ATTEMPT_TYPES.INVALID,
  ATTEMPT_TYPES.EXPIRED,
  ATTEMPT_TYPES.REVOKED,
];

export const BLOCKED_ATTEMPT_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.BLOCKED,
  ATTEMPT_TYPES.LOCKED,
  ATTEMPT_TYPES.TIMEOUT,
  ATTEMPT_TYPES.CAPTCHA,
  ATTEMPT_TYPES.SUSPICIOUS,
];

export const ATTEMPT_REASONS_LIST: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.INVALID_CREDENTIALS,
  ATTEMPT_REASONS.ACCOUNT_LOCKED,
  ATTEMPT_REASONS.IP_BLOCKED,
  ATTEMPT_REASONS.DEVICE_BLOCKED,
  ATTEMPT_REASONS.GEO_BLOCKED,
  ATTEMPT_REASONS.RATE_LIMIT,
  ATTEMPT_REASONS.TIMEOUT,
  ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY,
  ATTEMPT_REASONS.CAPTCHA_FAILED,
  ATTEMPT_REASONS.TOKEN_EXPIRED,
  ATTEMPT_REASONS.SESSION_EXPIRED,
  ATTEMPT_REASONS.INVALID_TOKEN,
  ATTEMPT_REASONS.INVALID_SESSION,
  ATTEMPT_REASONS.REQUIRES_MFA,
  ATTEMPT_REASONS.REQUIRES_2FA,
  ATTEMPT_REASONS.REQUIRES_VERIFICATION,
];

export const SECURITY_ATTEMPT_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY,
  ATTEMPT_REASONS.IP_BLOCKED,
  ATTEMPT_REASONS.DEVICE_BLOCKED,
  ATTEMPT_REASONS.GEO_BLOCKED,
  ATTEMPT_REASONS.RATE_LIMIT,
];

export const CREDENTIAL_ATTEMPT_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.INVALID_CREDENTIALS,
  ATTEMPT_REASONS.ACCOUNT_LOCKED,
];

export const TOKEN_ATTEMPT_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.TOKEN_EXPIRED,
  ATTEMPT_REASONS.SESSION_EXPIRED,
  ATTEMPT_REASONS.INVALID_TOKEN,
  ATTEMPT_REASONS.INVALID_SESSION,
];

export const MFA_ATTEMPT_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.REQUIRES_MFA,
  ATTEMPT_REASONS.REQUIRES_2FA,
  ATTEMPT_REASONS.REQUIRES_VERIFICATION,
];

export function isAttemptType(type: string): type is AuthLoginAttemptType {
  return ATTEMPT_TYPES_LIST.includes(type as AuthLoginAttemptType);
}

export function isSuccessAttempt(type: AuthLoginAttemptType): boolean {
  return SUCCESS_ATTEMPT_TYPES.includes(type);
}

export function isFailedAttempt(type: AuthLoginAttemptType): boolean {
  return FAILED_ATTEMPT_TYPES.includes(type);
}

export function isBlockedAttempt(type: AuthLoginAttemptType): boolean {
  return BLOCKED_ATTEMPT_TYPES.includes(type);
}

export function isAttemptReason(reason: string): reason is AuthLoginAttemptReason {
  return ATTEMPT_REASONS_LIST.includes(reason as AuthLoginAttemptReason);
}

export function isSecurityAttempt(reason: AuthLoginAttemptReason): boolean {
  return SECURITY_ATTEMPT_REASONS.includes(reason);
}

export function isCredentialAttempt(reason: AuthLoginAttemptReason): boolean {
  return CREDENTIAL_ATTEMPT_REASONS.includes(reason);
}

export function isTokenAttempt(reason: AuthLoginAttemptReason): boolean {
  return TOKEN_ATTEMPT_REASONS.includes(reason);
}

export function isMFAAttempt(reason: AuthLoginAttemptReason): boolean {
  return MFA_ATTEMPT_REASONS.includes(reason);
}

export function getAttemptTypeLabel(type: AuthLoginAttemptType): string {
  const labels: Record<AuthLoginAttemptType, string> = {
    [ATTEMPT_TYPES.SUCCESS]: 'Success',
    [ATTEMPT_TYPES.FAILED]: 'Failed',
    [ATTEMPT_TYPES.BLOCKED]: 'Blocked',
    [ATTEMPT_TYPES.LOCKED]: 'Locked',
    [ATTEMPT_TYPES.TIMEOUT]: 'Timeout',
    [ATTEMPT_TYPES.CAPTCHA]: 'CAPTCHA Required',
    [ATTEMPT_TYPES.SUSPICIOUS]: 'Suspicious',
    [ATTEMPT_TYPES.VALID]: 'Valid',
    [ATTEMPT_TYPES.INVALID]: 'Invalid',
    [ATTEMPT_TYPES.EXPIRED]: 'Expired',
    [ATTEMPT_TYPES.REVOKED]: 'Revoked',
  };

  return labels[type] || 'Unknown Type';
}

export function getAttemptTypeIcon(type: AuthLoginAttemptType): string {
  const icons: Record<AuthLoginAttemptType, string> = {
    [ATTEMPT_TYPES.SUCCESS]: '✅',
    [ATTEMPT_TYPES.FAILED]: '❌',
    [ATTEMPT_TYPES.BLOCKED]: '🚫',
    [ATTEMPT_TYPES.LOCKED]: '🔒',
    [ATTEMPT_TYPES.TIMEOUT]: '⏰',
    [ATTEMPT_TYPES.CAPTCHA]: '🤖',
    [ATTEMPT_TYPES.SUSPICIOUS]: '⚠️',
    [ATTEMPT_TYPES.VALID]: '✔️',
    [ATTEMPT_TYPES.INVALID]: '✖️',
    [ATTEMPT_TYPES.EXPIRED]: '⌛',
    [ATTEMPT_TYPES.REVOKED]: '🔐',
  };

  return icons[type] || '🔑';
}

export function getAttemptReasonLabel(reason: AuthLoginAttemptReason): string {
  const labels: Record<AuthLoginAttemptReason, string> = {
    [ATTEMPT_REASONS.INVALID_CREDENTIALS]: 'Invalid Credentials',
    [ATTEMPT_REASONS.ACCOUNT_LOCKED]: 'Account Locked',
    [ATTEMPT_REASONS.IP_BLOCKED]: 'IP Address Blocked',
    [ATTEMPT_REASONS.DEVICE_BLOCKED]: 'Device Blocked',
    [ATTEMPT_REASONS.GEO_BLOCKED]: 'Geographic Location Blocked',
    [ATTEMPT_REASONS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [ATTEMPT_REASONS.TIMEOUT]: 'Session Timeout',
    [ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY]: 'Suspicious Activity Detected',
    [ATTEMPT_REASONS.CAPTCHA_FAILED]: 'CAPTCHA Verification Failed',
    [ATTEMPT_REASONS.TOKEN_EXPIRED]: 'Token Expired',
    [ATTEMPT_REASONS.SESSION_EXPIRED]: 'Session Expired',
    [ATTEMPT_REASONS.INVALID_TOKEN]: 'Invalid Token',
    [ATTEMPT_REASONS.INVALID_SESSION]: 'Invalid Session',
    [ATTEMPT_REASONS.REQUIRES_MFA]: 'MFA Required',
    [ATTEMPT_REASONS.REQUIRES_2FA]: '2FA Required',
    [ATTEMPT_REASONS.REQUIRES_VERIFICATION]: 'Verification Required',
  };

  return labels[reason] || 'Unknown Reason';
}

export function getAttemptLevel(level: AuthLoginAttemptLevel): number {
  const levels: Record<AuthLoginAttemptLevel, number> = {
    [ATTEMPT_LEVELS.NONE]: 0,
    [ATTEMPT_LEVELS.LOW]: 1,
    [ATTEMPT_LEVELS.MEDIUM]: 2,
    [ATTEMPT_LEVELS.HIGH]: 3,
    [ATTEMPT_LEVELS.CRITICAL]: 4,
    [ATTEMPT_LEVELS.MAXIMUM]: 5,
  };

  return levels[level] || 0;
}

export function getAttemptLevelLabel(level: AuthLoginAttemptLevel): string {
  const labels: Record<AuthLoginAttemptLevel, string> = {
    [ATTEMPT_LEVELS.NONE]: 'None',
    [ATTEMPT_LEVELS.LOW]: 'Low',
    [ATTEMPT_LEVELS.MEDIUM]: 'Medium',
    [ATTEMPT_LEVELS.HIGH]: 'High',
    [ATTEMPT_LEVELS.CRITICAL]: 'Critical',
    [ATTEMPT_LEVELS.MAXIMUM]: 'Maximum',
  };

  return labels[level] || 'Unknown';
}

export function getAttemptLevelColor(level: AuthLoginAttemptLevel): string {
  const colors: Record<AuthLoginAttemptLevel, string> = {
    [ATTEMPT_LEVELS.NONE]: '#10B981',
    [ATTEMPT_LEVELS.LOW]: '#F59E0B',
    [ATTEMPT_LEVELS.MEDIUM]: '#F97316',
    [ATTEMPT_LEVELS.HIGH]: '#EF4444',
    [ATTEMPT_LEVELS.CRITICAL]: '#DC2626',
    [ATTEMPT_LEVELS.MAXIMUM]: '#991B1B',
  };

  return colors[level] || '#6B7280';
}

export function getMaxLoginAttempts(): number {
  return ATTEMPT_CONFIG.MAX_ATTEMPTS;
}

export function getMaxFailedAttempts(): number {
  return ATTEMPT_CONFIG.MAX_FAILED_ATTEMPTS;
}

export function getResetAfterMinutes(): number {
  return ATTEMPT_CONFIG.RESET_AFTER_MINUTES;
}

export function getBlockDurationMinutes(): number {
  return ATTEMPT_CONFIG.BLOCK_DURATION_MINUTES;
}

export function getCaptchaAfterAttempts(): number {
  return ATTEMPT_CONFIG.CAPTCHA_AFTER_ATTEMPTS;
}

export function shouldRequireCaptcha(attempts: number): boolean {
  return attempts >= ATTEMPT_CONFIG.CAPTCHA_AFTER_ATTEMPTS;
}

export function getAttemptLevelFromAttempts(attempts: number): AuthLoginAttemptLevel {
  const maxAttempts = ATTEMPT_CONFIG.MAX_ATTEMPTS;
  const ratio = attempts / maxAttempts;

  if (ratio >= 0.9) return ATTEMPT_LEVELS.CRITICAL;
  if (ratio >= 0.7) return ATTEMPT_LEVELS.HIGH;
  if (ratio >= 0.5) return ATTEMPT_LEVELS.MEDIUM;
  if (ratio >= 0.3) return ATTEMPT_LEVELS.LOW;
  return ATTEMPT_LEVELS.NONE;
}

export function isAccountBlocked(attempts: number): boolean {
  return attempts >= ATTEMPT_CONFIG.MAX_ATTEMPTS;
}

export function getRemainingAttempts(attempts: number): number {
  return Math.max(0, ATTEMPT_CONFIG.MAX_ATTEMPTS - attempts);
}

export function shouldResetAttempts(lastAttemptAt: Date): boolean {
  const age = (Date.now() - lastAttemptAt.getTime()) / (60 * 1000);
  return age >= ATTEMPT_CONFIG.RESET_AFTER_MINUTES;
}

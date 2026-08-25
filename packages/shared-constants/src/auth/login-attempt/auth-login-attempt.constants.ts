/**
 * Authentication Login Attempt Constants
 * Login attempt management configuration
 */

import { AUTH_LOGIN_ATTEMPT_STATUS } from './auth-login-attempt-status.constants';

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

export const ATTEMPT_LEVELS = {
  NONE: 0,
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
  MAXIMUM: 5,
} as const;

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

export const ATTEMPT_DEFAULTS = {
  STATUS: AUTH_LOGIN_ATTEMPT_STATUS.PENDING,
  TYPE: ATTEMPT_TYPES.VALID,
  LEVEL: ATTEMPT_LEVELS.NONE,
  MAX_ATTEMPTS: 5,
  MAX_FAILED_ATTEMPTS: 3,
} as const;

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

export const AUTHLOGIN_ATTEMPT_TYPES_LIST: AuthLoginAttemptType[] = [
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

export const AUTHLOGIN_SUCCESS_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.SUCCESS,
  ATTEMPT_TYPES.VALID,
];

export const AUTHLOGIN_FAILED_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.FAILED,
  ATTEMPT_TYPES.INVALID,
  ATTEMPT_TYPES.EXPIRED,
  ATTEMPT_TYPES.REVOKED,
];

export const AUTHLOGIN_BLOCKED_TYPES: AuthLoginAttemptType[] = [
  ATTEMPT_TYPES.BLOCKED,
  ATTEMPT_TYPES.LOCKED,
  ATTEMPT_TYPES.TIMEOUT,
  ATTEMPT_TYPES.CAPTCHA,
  ATTEMPT_TYPES.SUSPICIOUS,
];

export const AUTHLOGIN_REASONS_LIST: AuthLoginAttemptReason[] = [
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

export const AUTHLOGIN_SECURITY_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY,
  ATTEMPT_REASONS.IP_BLOCKED,
  ATTEMPT_REASONS.DEVICE_BLOCKED,
  ATTEMPT_REASONS.GEO_BLOCKED,
  ATTEMPT_REASONS.RATE_LIMIT,
];

export const AUTHLOGIN_CREDENTIAL_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.INVALID_CREDENTIALS,
  ATTEMPT_REASONS.ACCOUNT_LOCKED,
];

export const AUTHLOGIN_TOKEN_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.TOKEN_EXPIRED,
  ATTEMPT_REASONS.SESSION_EXPIRED,
  ATTEMPT_REASONS.INVALID_TOKEN,
  ATTEMPT_REASONS.INVALID_SESSION,
];

export const AUTHLOGIN_MFA_REASONS: AuthLoginAttemptReason[] = [
  ATTEMPT_REASONS.REQUIRES_MFA,
  ATTEMPT_REASONS.REQUIRES_2FA,
  ATTEMPT_REASONS.REQUIRES_VERIFICATION,
];

export function isAuthloginAttemptType(type: string): type is AuthLoginAttemptType {
  return AUTHLOGIN_ATTEMPT_TYPES_LIST.includes(type as AuthLoginAttemptType);
}

export function isAuthloginSuccess(type: AuthLoginAttemptType): boolean {
  return AUTHLOGIN_SUCCESS_TYPES.includes(type);
}

export function isAuthloginFailed(type: AuthLoginAttemptType): boolean {
  return AUTHLOGIN_FAILED_TYPES.includes(type);
}

export function isAuthloginBlocked(type: AuthLoginAttemptType): boolean {
  return AUTHLOGIN_BLOCKED_TYPES.includes(type);
}

export function isAuthloginReason(reason: string): reason is AuthLoginAttemptReason {
  return AUTHLOGIN_REASONS_LIST.includes(reason as AuthLoginAttemptReason);
}

export function isAuthloginSecurity(reason: AuthLoginAttemptReason): boolean {
  return AUTHLOGIN_SECURITY_REASONS.includes(reason);
}

export function isAuthloginCredential(reason: AuthLoginAttemptReason): boolean {
  return AUTHLOGIN_CREDENTIAL_REASONS.includes(reason);
}

export function isAuthloginToken(reason: AuthLoginAttemptReason): boolean {
  return AUTHLOGIN_TOKEN_REASONS.includes(reason);
}

export function isAuthloginMFA(reason: AuthLoginAttemptReason): boolean {
  return AUTHLOGIN_MFA_REASONS.includes(reason);
}

export function getAuthloginAttemptTypeLabel(type: AuthLoginAttemptType): string {
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

export function getAuthloginAttemptTypeIcon(type: AuthLoginAttemptType): string {
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

export function getAuthloginAttemptReasonLabel(reason: AuthLoginAttemptReason): string {
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

export function getAuthloginAttemptLevel(level: AuthLoginAttemptLevel): number {
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

export function getAuthloginAttemptLevelLabel(level: AuthLoginAttemptLevel): string {
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

export function getAuthloginAttemptLevelColor(level: AuthLoginAttemptLevel): string {
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

export function getAuthloginMaxAttempts(): number {
  return ATTEMPT_CONFIG.MAX_ATTEMPTS;
}

export function getAuthloginMaxFailedAttempts(): number {
  return ATTEMPT_CONFIG.MAX_FAILED_ATTEMPTS;
}

export function getAuthloginResetAfterMinutes(): number {
  return ATTEMPT_CONFIG.RESET_AFTER_MINUTES;
}

export function getAuthloginBlockDurationMinutes(): number {
  return ATTEMPT_CONFIG.BLOCK_DURATION_MINUTES;
}

export function getAuthloginCaptchaAfterAttempts(): number {
  return ATTEMPT_CONFIG.CAPTCHA_AFTER_ATTEMPTS;
}

export function shouldAuthloginRequireCaptcha(attempts: number): boolean {
  return attempts >= ATTEMPT_CONFIG.CAPTCHA_AFTER_ATTEMPTS;
}

export function getAuthloginLevelFromAttempts(attempts: number): AuthLoginAttemptLevel {
  const maxAttempts = ATTEMPT_CONFIG.MAX_ATTEMPTS;
  const ratio = attempts / maxAttempts;

  if (ratio >= 0.9) return ATTEMPT_LEVELS.CRITICAL;
  if (ratio >= 0.7) return ATTEMPT_LEVELS.HIGH;
  if (ratio >= 0.5) return ATTEMPT_LEVELS.MEDIUM;
  if (ratio >= 0.3) return ATTEMPT_LEVELS.LOW;
  return ATTEMPT_LEVELS.NONE;
}

export function isAuthloginAccountBlocked(attempts: number): boolean {
  return attempts >= ATTEMPT_CONFIG.MAX_ATTEMPTS;
}

export function getAuthloginRemainingAttempts(attempts: number): number {
  return Math.max(0, ATTEMPT_CONFIG.MAX_ATTEMPTS - attempts);
}

export function shouldAuthloginResetAttempts(lastAttemptAt: Date): boolean {
  const age = (Date.now() - lastAttemptAt.getTime()) / (60 * 1000);
  return age >= ATTEMPT_CONFIG.RESET_AFTER_MINUTES;
}

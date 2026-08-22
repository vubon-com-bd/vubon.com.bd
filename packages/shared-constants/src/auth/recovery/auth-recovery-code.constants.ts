/**
 * Authentication Recovery Code Constants
 * Recovery code management configuration
 */

import { AUTH_RECOVERY_CODE_STATUS } from './auth-recovery-code-status.constants';

export type AuthRecoveryCodeStatus =
  (typeof AUTH_RECOVERY_CODE_STATUS)[keyof typeof AUTH_RECOVERY_CODE_STATUS];

export const AUTH_RECOVERY_CODE = {
  // Recovery code configuration
  CONFIG: {
    CODE_LENGTH: 8,
    CODE_ALPHABET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    CODE_COUNT: 10,
    EXPIRY_DAYS: 365,
    MAX_ATTEMPTS: 3,
    LOCKOUT_DURATION: 3600, // 1 hour
    RESEND_COOLDOWN: 300, // 5 minutes
    MAX_GENERATIONS: 5,
    NOTIFY_ON_USE: true,
    NOTIFY_ON_GENERATE: true,
    REQUIRE_CONFIRMATION: true,
  },

  // Recovery code types
  TYPES: {
    BACKUP: 'backup',
    RECOVERY: 'recovery',
    EMERGENCY: 'emergency',
    ONE_TIME: 'one_time',
    TEMPORARY: 'temporary',
    PERMANENT: 'permanent',
  },

  // Recovery code events
  EVENTS: {
    GENERATED: 'recovery_code:generated',
    USED: 'recovery_code:used',
    EXPIRED: 'recovery_code:expired',
    REVOKED: 'recovery_code:revoked',
    LOCKED: 'recovery_code:locked',
    UNLOCKED: 'recovery_code:unlocked',
    ATTEMPT_FAILED: 'recovery_code:attempt_failed',
    ATTEMPT_SUCCESS: 'recovery_code:attempt_success',
    REPLACED: 'recovery_code:replaced',
  },

  // Default values
  DEFAULTS: {
    STATUS: 'active' as const,
    TYPE: 'backup' as const,
    COUNT: 10,
    LENGTH: 8,
    EXPIRY_DAYS: 365,
  },

  // Validation rules
  VALIDATION: {
    MIN_CODE_LENGTH: 6,
    MAX_CODE_LENGTH: 16,
    MIN_COUNT: 5,
    MAX_COUNT: 20,
    MIN_EXPIRY_DAYS: 7,
    MAX_EXPIRY_DAYS: 730,
  },
} as const;

export type AuthRecoveryCodeConfig = typeof AUTH_RECOVERY_CODE.CONFIG;
export type AuthRecoveryCodeType =
  (typeof AUTH_RECOVERY_CODE.TYPES)[keyof typeof AUTH_RECOVERY_CODE.TYPES];
export type AuthRecoveryCodeEvent =
  (typeof AUTH_RECOVERY_CODE.EVENTS)[keyof typeof AUTH_RECOVERY_CODE.EVENTS];
export type AuthRecoveryCodeDefaults = typeof AUTH_RECOVERY_CODE.DEFAULTS;
export type AuthRecoveryCodeValidation = typeof AUTH_RECOVERY_CODE.VALIDATION;

export const RECOVERY_CODE_TYPES_LIST: AuthRecoveryCodeType[] = [
  AUTH_RECOVERY_CODE.TYPES.BACKUP,
  AUTH_RECOVERY_CODE.TYPES.RECOVERY,
  AUTH_RECOVERY_CODE.TYPES.EMERGENCY,
  AUTH_RECOVERY_CODE.TYPES.ONE_TIME,
  AUTH_RECOVERY_CODE.TYPES.TEMPORARY,
  AUTH_RECOVERY_CODE.TYPES.PERMANENT,
];

export const SINGLE_USE_RECOVERY_TYPES: AuthRecoveryCodeType[] = [
  AUTH_RECOVERY_CODE.TYPES.ONE_TIME,
  AUTH_RECOVERY_CODE.TYPES.TEMPORARY,
];

export const MULTI_USE_RECOVERY_TYPES: AuthRecoveryCodeType[] = [
  AUTH_RECOVERY_CODE.TYPES.BACKUP,
  AUTH_RECOVERY_CODE.TYPES.RECOVERY,
  AUTH_RECOVERY_CODE.TYPES.EMERGENCY,
  AUTH_RECOVERY_CODE.TYPES.PERMANENT,
];

export const TEMPORARY_RECOVERY_TYPES: AuthRecoveryCodeType[] = [
  AUTH_RECOVERY_CODE.TYPES.TEMPORARY,
  AUTH_RECOVERY_CODE.TYPES.ONE_TIME,
];

export const PERMANENT_RECOVERY_TYPES: AuthRecoveryCodeType[] = [
  AUTH_RECOVERY_CODE.TYPES.PERMANENT,
  AUTH_RECOVERY_CODE.TYPES.BACKUP,
  AUTH_RECOVERY_CODE.TYPES.RECOVERY,
];

export function isRecoveryCodeType(type: string): type is AuthRecoveryCodeType {
  return RECOVERY_CODE_TYPES_LIST.includes(type as AuthRecoveryCodeType);
}

export function isSingleUseRecoveryType(type: AuthRecoveryCodeType): boolean {
  return SINGLE_USE_RECOVERY_TYPES.includes(type);
}

export function isMultiUseRecoveryType(type: AuthRecoveryCodeType): boolean {
  return MULTI_USE_RECOVERY_TYPES.includes(type);
}

export function isTemporaryRecoveryType(type: AuthRecoveryCodeType): boolean {
  return TEMPORARY_RECOVERY_TYPES.includes(type);
}

export function isPermanentRecoveryType(type: AuthRecoveryCodeType): boolean {
  return PERMANENT_RECOVERY_TYPES.includes(type);
}

export function getRecoveryCodeTypeLabel(type: AuthRecoveryCodeType): string {
  const labels: Record<AuthRecoveryCodeType, string> = {
    [AUTH_RECOVERY_CODE.TYPES.BACKUP]: 'Backup Code',
    [AUTH_RECOVERY_CODE.TYPES.RECOVERY]: 'Recovery Code',
    [AUTH_RECOVERY_CODE.TYPES.EMERGENCY]: 'Emergency Code',
    [AUTH_RECOVERY_CODE.TYPES.ONE_TIME]: 'One-Time Code',
    [AUTH_RECOVERY_CODE.TYPES.TEMPORARY]: 'Temporary Code',
    [AUTH_RECOVERY_CODE.TYPES.PERMANENT]: 'Permanent Code',
  };

  return labels[type] || 'Unknown Code Type';
}

export function getRecoveryCodeTypeIcon(type: AuthRecoveryCodeType): string {
  const icons: Record<AuthRecoveryCodeType, string> = {
    [AUTH_RECOVERY_CODE.TYPES.BACKUP]: '🔑',
    [AUTH_RECOVERY_CODE.TYPES.RECOVERY]: '🔐',
    [AUTH_RECOVERY_CODE.TYPES.EMERGENCY]: '🚨',
    [AUTH_RECOVERY_CODE.TYPES.ONE_TIME]: '🎫',
    [AUTH_RECOVERY_CODE.TYPES.TEMPORARY]: '⏳',
    [AUTH_RECOVERY_CODE.TYPES.PERMANENT]: '♾️',
  };

  return icons[type] || '🔑';
}

export function getRecoveryCodeTypePriority(type: AuthRecoveryCodeType): number {
  const priorities: Record<AuthRecoveryCodeType, number> = {
    [AUTH_RECOVERY_CODE.TYPES.BACKUP]: 3,
    [AUTH_RECOVERY_CODE.TYPES.RECOVERY]: 2,
    [AUTH_RECOVERY_CODE.TYPES.EMERGENCY]: 5,
    [AUTH_RECOVERY_CODE.TYPES.ONE_TIME]: 4,
    [AUTH_RECOVERY_CODE.TYPES.TEMPORARY]: 4,
    [AUTH_RECOVERY_CODE.TYPES.PERMANENT]: 1,
  };

  return priorities[type] || 3;
}

export function getRecoveryCodeConfig() {
  return AUTH_RECOVERY_CODE.CONFIG;
}

export function getRecoveryCodeLength(): number {
  return AUTH_RECOVERY_CODE.CONFIG.CODE_LENGTH;
}

export function getRecoveryCodeCount(): number {
  return AUTH_RECOVERY_CODE.CONFIG.CODE_COUNT;
}

export function getRecoveryCodeExpiryDays(): number {
  return AUTH_RECOVERY_CODE.CONFIG.EXPIRY_DAYS;
}

export function getRecoveryCodeMaxAttempts(): number {
  return AUTH_RECOVERY_CODE.CONFIG.MAX_ATTEMPTS;
}

export function getRecoveryCodeLockoutDuration(): number {
  return AUTH_RECOVERY_CODE.CONFIG.LOCKOUT_DURATION;
}

export function getRecoveryCodeResendCooldown(): number {
  return AUTH_RECOVERY_CODE.CONFIG.RESEND_COOLDOWN;
}

export function getRecoveryCodeMaxGenerations(): number {
  return AUTH_RECOVERY_CODE.CONFIG.MAX_GENERATIONS;
}

export function generateRecoveryCode(): string {
  const alphabet = AUTH_RECOVERY_CODE.CONFIG.CODE_ALPHABET;
  const length = AUTH_RECOVERY_CODE.CONFIG.CODE_LENGTH;
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }

  return code;
}

export function generateRecoveryCodes(count: number): string[] {
  const codes: string[] = [];
  const maxCount = Math.min(count, AUTH_RECOVERY_CODE.CONFIG.CODE_COUNT);

  for (let i = 0; i < maxCount; i++) {
    codes.push(generateRecoveryCode());
  }

  return codes;
}

export function isRecoveryCodeValid(code: string): boolean {
  const pattern = new RegExp(
    `^[${AUTH_RECOVERY_CODE.CONFIG.CODE_ALPHABET}]{${AUTH_RECOVERY_CODE.CONFIG.CODE_LENGTH}}$`
  );
  return pattern.test(code);
}

export function isRecoveryCodeExpired(createdAt: Date): boolean {
  const expiryTime = AUTH_RECOVERY_CODE.CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const age = Date.now() - createdAt.getTime();
  return age > expiryTime;
}

export function getRecoveryCodeRemainingDays(createdAt: Date): number {
  const expiryTime = AUTH_RECOVERY_CODE.CONFIG.EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  const age = Date.now() - createdAt.getTime();
  const remaining = expiryTime - age;
  return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
}

export function getRecoveryCodeStatus(
  createdAt: Date,
  usedAt: Date | null,
  attempts: number
): AuthRecoveryCodeStatus {
  if (usedAt) {
    return AUTH_RECOVERY_CODE_STATUS.USED;
  }

  if (isRecoveryCodeExpired(createdAt)) {
    return AUTH_RECOVERY_CODE_STATUS.EXPIRED;
  }

  if (attempts >= AUTH_RECOVERY_CODE.CONFIG.MAX_ATTEMPTS) {
    return AUTH_RECOVERY_CODE_STATUS.LOCKED;
  }

  return AUTH_RECOVERY_CODE_STATUS.ACTIVE;
}

export function getRecoveryCodeStatusLabel(status: AuthRecoveryCodeStatus): string {
  const labels: Record<AuthRecoveryCodeStatus, string> = {
    [AUTH_RECOVERY_CODE_STATUS.ACTIVE]: 'Active',
    [AUTH_RECOVERY_CODE_STATUS.USED]: 'Used',
    [AUTH_RECOVERY_CODE_STATUS.EXPIRED]: 'Expired',
    [AUTH_RECOVERY_CODE_STATUS.REVOKED]: 'Revoked',
    [AUTH_RECOVERY_CODE_STATUS.LOCKED]: 'Locked',
    [AUTH_RECOVERY_CODE_STATUS.PENDING]: 'Pending',
    [AUTH_RECOVERY_CODE_STATUS.INACTIVE]: 'Inactive',
    [AUTH_RECOVERY_CODE_STATUS.ATTEMPTED]: 'Attempted',
    [AUTH_RECOVERY_CODE_STATUS.VERIFIED]: 'Verified',
    [AUTH_RECOVERY_CODE_STATUS.FAILED]: 'Failed',
    [AUTH_RECOVERY_CODE_STATUS.BLOCKED]: 'Blocked',
    [AUTH_RECOVERY_CODE_STATUS.GENERATED]: 'Generated',
    [AUTH_RECOVERY_CODE_STATUS.REGENERATED]: 'Regenerated',
    [AUTH_RECOVERY_CODE_STATUS.REPLACED]: 'Replaced',
    [AUTH_RECOVERY_CODE_STATUS.COMPROMISED]: 'Compromised',
    [AUTH_RECOVERY_CODE_STATUS.SUSPENDED]: 'Suspended',
    [AUTH_RECOVERY_CODE_STATUS.ARCHIVED]: 'Archived',
  };

  return labels[status] || 'Unknown Status';
}

export function getRecoveryCodeStatusColor(status: AuthRecoveryCodeStatus): string {
  const colors: Record<AuthRecoveryCodeStatus, string> = {
    [AUTH_RECOVERY_CODE_STATUS.ACTIVE]: '#10B981',
    [AUTH_RECOVERY_CODE_STATUS.USED]: '#6B7280',
    [AUTH_RECOVERY_CODE_STATUS.EXPIRED]: '#EF4444',
    [AUTH_RECOVERY_CODE_STATUS.REVOKED]: '#6B7280',
    [AUTH_RECOVERY_CODE_STATUS.LOCKED]: '#DC2626',
    [AUTH_RECOVERY_CODE_STATUS.PENDING]: '#F59E0B',
    [AUTH_RECOVERY_CODE_STATUS.INACTIVE]: '#6B7280',
    [AUTH_RECOVERY_CODE_STATUS.ATTEMPTED]: '#F59E0B',
    [AUTH_RECOVERY_CODE_STATUS.VERIFIED]: '#10B981',
    [AUTH_RECOVERY_CODE_STATUS.FAILED]: '#EF4444',
    [AUTH_RECOVERY_CODE_STATUS.BLOCKED]: '#DC2626',
    [AUTH_RECOVERY_CODE_STATUS.GENERATED]: '#3B82F6',
    [AUTH_RECOVERY_CODE_STATUS.REGENERATED]: '#3B82F6',
    [AUTH_RECOVERY_CODE_STATUS.REPLACED]: '#6B7280',
    [AUTH_RECOVERY_CODE_STATUS.COMPROMISED]: '#DC2626',
    [AUTH_RECOVERY_CODE_STATUS.SUSPENDED]: '#F59E0B',
    [AUTH_RECOVERY_CODE_STATUS.ARCHIVED]: '#6B7280',
  };

  return colors[status] || '#6B7280';
}

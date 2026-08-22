/**
 * Admin 2FA Constants
 * Admin two-factor authentication definitions
 */

export const ADMIN_2FA = {
  // 2FA methods
  METHODS: {
    AUTHENTICATOR: 'authenticator',
    SMS: 'sms',
    EMAIL: 'email',
    BACKUP_CODE: 'backup_code',
    RECOVERY_CODE: 'recovery_code',
    BIOMETRIC: 'biometric',
    HARDWARE: 'hardware',
    PUSH: 'push',
  },

  // 2FA statuses
  STATUSES: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
    LOCKED: 'locked',
    REVOKED: 'revoked',
    SUSPENDED: 'suspended',
  },

  // 2FA security levels
  SECURITY_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
    MAXIMUM: 'maximum',
  },

  // 2FA verification types
  VERIFICATION_TYPES: {
    TOTP: 'totp',
    HOTP: 'hotp',
    BACKUP: 'backup',
    RECOVERY: 'recovery',
  },

  // 2FA channels
  CHANNELS: {
    SMS: 'sms',
    EMAIL: 'email',
    PUSH: 'push',
    AUTHENTICATOR: 'authenticator',
  },

  // 2FA timeouts (in seconds)
  TIMEOUTS: {
    AUTHENTICATOR: 30,
    SMS: 60,
    EMAIL: 300,
    BACKUP_CODE: 60,
    RECOVERY_CODE: 300,
    BIOMETRIC: 30,
    HARDWARE: 10,
    PUSH: 120,
  },

  // 2FA limits
  LIMITS: {
    MAX_ATTEMPTS: 3,
    MAX_BACKUP_CODES: 10,
    MAX_RECOVERY_CODES: 5,
    LOCKOUT_DURATION: 900, // 15 minutes
    SESSION_TIMEOUT: 300, // 5 minutes
  },

  // 2FA algorithms
  ALGORITHMS: {
    SHA1: 'sha1',
    SHA256: 'sha256',
    SHA512: 'sha512',
  },

  // 2FA token formats
  TOKEN_FORMATS: {
    NUMERIC: 'numeric',
    ALPHANUMERIC: 'alphanumeric',
    HEX: 'hex',
    BASE32: 'base32',
    BASE64: 'base64',
  },

  // 2FA recovery
  RECOVERY: {
    CODE_LENGTH: 8,
    CODE_ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 3600, // 1 hour
  },
} as const;

export type Admin2FAMethod = (typeof ADMIN_2FA.METHODS)[keyof typeof ADMIN_2FA.METHODS];
export type Admin2FAStatus = (typeof ADMIN_2FA.STATUSES)[keyof typeof ADMIN_2FA.STATUSES];
export type Admin2FASecurityLevel =
  (typeof ADMIN_2FA.SECURITY_LEVELS)[keyof typeof ADMIN_2FA.SECURITY_LEVELS];
export type Admin2FAVerificationType =
  (typeof ADMIN_2FA.VERIFICATION_TYPES)[keyof typeof ADMIN_2FA.VERIFICATION_TYPES];
export type Admin2FATimeout = (typeof ADMIN_2FA.TIMEOUTS)[keyof typeof ADMIN_2FA.TIMEOUTS];
export type Admin2FARecovery = typeof ADMIN_2FA.RECOVERY;
export type Admin2FAChannel = (typeof ADMIN_2FA.CHANNELS)[keyof typeof ADMIN_2FA.CHANNELS];
export type Admin2FAAlgorithm = (typeof ADMIN_2FA.ALGORITHMS)[keyof typeof ADMIN_2FA.ALGORITHMS];
export type Admin2FATokenFormat =
  (typeof ADMIN_2FA.TOKEN_FORMATS)[keyof typeof ADMIN_2FA.TOKEN_FORMATS];

export const ADMIN_2FA_METHOD_LABELS: Record<Admin2FAMethod, string> = {
  [ADMIN_2FA.METHODS.AUTHENTICATOR]: 'Authenticator App',
  [ADMIN_2FA.METHODS.SMS]: 'SMS Verification',
  [ADMIN_2FA.METHODS.EMAIL]: 'Email Verification',
  [ADMIN_2FA.METHODS.BACKUP_CODE]: 'Backup Code',
  [ADMIN_2FA.METHODS.RECOVERY_CODE]: 'Recovery Code',
  [ADMIN_2FA.METHODS.BIOMETRIC]: 'Biometric',
  [ADMIN_2FA.METHODS.HARDWARE]: 'Hardware Token',
  [ADMIN_2FA.METHODS.PUSH]: 'Push Notification',
};

export const ADMIN_2FA_METHOD_ICONS: Record<Admin2FAMethod, string> = {
  [ADMIN_2FA.METHODS.AUTHENTICATOR]: '📱',
  [ADMIN_2FA.METHODS.SMS]: '✉️',
  [ADMIN_2FA.METHODS.EMAIL]: '📧',
  [ADMIN_2FA.METHODS.BACKUP_CODE]: '🔑',
  [ADMIN_2FA.METHODS.RECOVERY_CODE]: '🔄',
  [ADMIN_2FA.METHODS.BIOMETRIC]: '🖐️',
  [ADMIN_2FA.METHODS.HARDWARE]: '🔐',
  [ADMIN_2FA.METHODS.PUSH]: '📲',
};

export const ADMIN_2FA_STATUS_LABELS: Record<Admin2FAStatus, string> = {
  [ADMIN_2FA.STATUSES.ENABLED]: 'Enabled',
  [ADMIN_2FA.STATUSES.DISABLED]: 'Disabled',
  [ADMIN_2FA.STATUSES.PENDING]: 'Pending',
  [ADMIN_2FA.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_2FA.STATUSES.FAILED]: 'Failed',
  [ADMIN_2FA.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_2FA.STATUSES.LOCKED]: 'Locked',
  [ADMIN_2FA.STATUSES.REVOKED]: 'Revoked',
  [ADMIN_2FA.STATUSES.SUSPENDED]: 'Suspended',
};

export const ADMIN_2FA_STATUS_COLORS: Record<Admin2FAStatus, string> = {
  [ADMIN_2FA.STATUSES.ENABLED]: '#10B981',
  [ADMIN_2FA.STATUSES.DISABLED]: '#6B7280',
  [ADMIN_2FA.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_2FA.STATUSES.VERIFIED]: '#34D399',
  [ADMIN_2FA.STATUSES.FAILED]: '#EF4444',
  [ADMIN_2FA.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_2FA.STATUSES.LOCKED]: '#DC2626',
  [ADMIN_2FA.STATUSES.REVOKED]: '#6B7280',
  [ADMIN_2FA.STATUSES.SUSPENDED]: '#F97316',
};

export const ADMIN_2FA_SECURITY_LEVEL_LABELS: Record<Admin2FASecurityLevel, string> = {
  [ADMIN_2FA.SECURITY_LEVELS.LOW]: 'Low',
  [ADMIN_2FA.SECURITY_LEVELS.MEDIUM]: 'Medium',
  [ADMIN_2FA.SECURITY_LEVELS.HIGH]: 'High',
  [ADMIN_2FA.SECURITY_LEVELS.VERY_HIGH]: 'Very High',
  [ADMIN_2FA.SECURITY_LEVELS.MAXIMUM]: 'Maximum',
};

export const ADMIN_2FA_SECURITY_LEVEL_PRIORITY: Record<Admin2FASecurityLevel, number> = {
  [ADMIN_2FA.SECURITY_LEVELS.LOW]: 1,
  [ADMIN_2FA.SECURITY_LEVELS.MEDIUM]: 2,
  [ADMIN_2FA.SECURITY_LEVELS.HIGH]: 3,
  [ADMIN_2FA.SECURITY_LEVELS.VERY_HIGH]: 4,
  [ADMIN_2FA.SECURITY_LEVELS.MAXIMUM]: 5,
};

export const ADMIN_2FA_VERIFICATION_TYPE_LABELS: Record<Admin2FAVerificationType, string> = {
  [ADMIN_2FA.VERIFICATION_TYPES.TOTP]: 'Time-based OTP',
  [ADMIN_2FA.VERIFICATION_TYPES.HOTP]: 'HMAC-based OTP',
  [ADMIN_2FA.VERIFICATION_TYPES.BACKUP]: 'Backup Code',
  [ADMIN_2FA.VERIFICATION_TYPES.RECOVERY]: 'Recovery Code',
};

export const ADMIN_2FA_CHANNEL_LABELS: Record<Admin2FAChannel, string> = {
  [ADMIN_2FA.CHANNELS.SMS]: 'SMS',
  [ADMIN_2FA.CHANNELS.EMAIL]: 'Email',
  [ADMIN_2FA.CHANNELS.PUSH]: 'Push',
  [ADMIN_2FA.CHANNELS.AUTHENTICATOR]: 'Authenticator',
};

// ফাংশন - যেগুলো admin index থেকে এক্সপোর্ট হবে
export function getAdmin2FAMethodLabel(method: Admin2FAMethod): string {
  return ADMIN_2FA_METHOD_LABELS[method] || 'Unknown Method';
}

export function getAdmin2FAMethodIcon(method: Admin2FAMethod): string {
  return ADMIN_2FA_METHOD_ICONS[method] || '❓';
}

export function getAdmin2FAStatusLabel(status: Admin2FAStatus): string {
  return ADMIN_2FA_STATUS_LABELS[status] || 'Unknown Status';
}

export function getAdmin2FAStatusColor(status: Admin2FAStatus): string {
  return ADMIN_2FA_STATUS_COLORS[status] || '#6B7280';
}

export function getAdmin2FASecurityLevelLabel(level: Admin2FASecurityLevel): string {
  return ADMIN_2FA_SECURITY_LEVEL_LABELS[level] || 'Unknown Level';
}

export function getAdmin2FASecurityLevelPriority(level: Admin2FASecurityLevel): number {
  return ADMIN_2FA_SECURITY_LEVEL_PRIORITY[level] || 0;
}

export function getAdmin2FAVerificationTypeLabel(type: Admin2FAVerificationType): string {
  return ADMIN_2FA_VERIFICATION_TYPE_LABELS[type] || 'Unknown Type';
}

export function getAdmin2FAChannelLabel(channel: Admin2FAChannel): string {
  return ADMIN_2FA_CHANNEL_LABELS[channel] || 'Unknown Channel';
}

export function is2FAEnabled(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.ENABLED || status === ADMIN_2FA.STATUSES.VERIFIED;
}

export function is2FADisabled(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.DISABLED || status === ADMIN_2FA.STATUSES.REVOKED;
}

export function is2FAExpired(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.EXPIRED;
}

export function is2FALocked(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.LOCKED || status === ADMIN_2FA.STATUSES.SUSPENDED;
}

export function get2FATimeout(method: Admin2FAMethod): number {
  const timeoutMap: Record<Admin2FAMethod, number> = {
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: ADMIN_2FA.TIMEOUTS.AUTHENTICATOR,
    [ADMIN_2FA.METHODS.SMS]: ADMIN_2FA.TIMEOUTS.SMS,
    [ADMIN_2FA.METHODS.EMAIL]: ADMIN_2FA.TIMEOUTS.EMAIL,
    [ADMIN_2FA.METHODS.BACKUP_CODE]: ADMIN_2FA.TIMEOUTS.BACKUP_CODE,
    [ADMIN_2FA.METHODS.RECOVERY_CODE]: ADMIN_2FA.TIMEOUTS.RECOVERY_CODE,
    [ADMIN_2FA.METHODS.BIOMETRIC]: ADMIN_2FA.TIMEOUTS.BIOMETRIC,
    [ADMIN_2FA.METHODS.HARDWARE]: ADMIN_2FA.TIMEOUTS.HARDWARE,
    [ADMIN_2FA.METHODS.PUSH]: ADMIN_2FA.TIMEOUTS.PUSH,
  };
  return timeoutMap[method] || 30;
}

export function get2FASecurityLevel(method: Admin2FAMethod): Admin2FASecurityLevel {
  const levelMap: Record<Admin2FAMethod, Admin2FASecurityLevel> = {
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: ADMIN_2FA.SECURITY_LEVELS.HIGH,
    [ADMIN_2FA.METHODS.SMS]: ADMIN_2FA.SECURITY_LEVELS.MEDIUM,
    [ADMIN_2FA.METHODS.EMAIL]: ADMIN_2FA.SECURITY_LEVELS.LOW,
    [ADMIN_2FA.METHODS.BACKUP_CODE]: ADMIN_2FA.SECURITY_LEVELS.HIGH,
    [ADMIN_2FA.METHODS.RECOVERY_CODE]: ADMIN_2FA.SECURITY_LEVELS.VERY_HIGH,
    [ADMIN_2FA.METHODS.BIOMETRIC]: ADMIN_2FA.SECURITY_LEVELS.VERY_HIGH,
    [ADMIN_2FA.METHODS.HARDWARE]: ADMIN_2FA.SECURITY_LEVELS.MAXIMUM,
    [ADMIN_2FA.METHODS.PUSH]: ADMIN_2FA.SECURITY_LEVELS.HIGH,
  };
  return levelMap[method] || ADMIN_2FA.SECURITY_LEVELS.MEDIUM;
}

export function get2FAChannels(method: Admin2FAMethod): Admin2FAChannel[] {
  const channelMap: Record<Admin2FAMethod, Admin2FAChannel[]> = {
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: [ADMIN_2FA.CHANNELS.AUTHENTICATOR],
    [ADMIN_2FA.METHODS.SMS]: [ADMIN_2FA.CHANNELS.SMS],
    [ADMIN_2FA.METHODS.EMAIL]: [ADMIN_2FA.CHANNELS.EMAIL],
    [ADMIN_2FA.METHODS.BACKUP_CODE]: [ADMIN_2FA.CHANNELS.EMAIL],
    [ADMIN_2FA.METHODS.RECOVERY_CODE]: [ADMIN_2FA.CHANNELS.EMAIL],
    [ADMIN_2FA.METHODS.BIOMETRIC]: [ADMIN_2FA.CHANNELS.AUTHENTICATOR],
    [ADMIN_2FA.METHODS.HARDWARE]: [ADMIN_2FA.CHANNELS.AUTHENTICATOR],
    [ADMIN_2FA.METHODS.PUSH]: [ADMIN_2FA.CHANNELS.PUSH],
  };
  return channelMap[method] || [];
}

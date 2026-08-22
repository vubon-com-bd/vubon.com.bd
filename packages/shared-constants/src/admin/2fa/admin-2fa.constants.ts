/**
 * Admin 2FA Constants
 * Admin Two-Factor Authentication configuration and definitions
 */

export const ADMIN_2FA = {
  // 2FA methods
  METHODS: {
    TOTP: 'totp',
    HOTP: 'hotp',
    SMS: 'sms',
    EMAIL: 'email',
    AUTHENTICATOR: 'authenticator',
    BACKUP_CODE: 'backup_code',
    SECURITY_KEY: 'security_key',
    BIOMETRIC: 'biometric',
    PUSH_NOTIFICATION: 'push_notification',
    VOICE: 'voice',
    QR_CODE: 'qr_code',
  },

  // 2FA statuses
  STATUSES: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    LOCKED: 'locked',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    SUSPENDED: 'suspended',
    CONFIGURED: 'configured',
    NOT_CONFIGURED: 'not_configured',
    BACKUP_USED: 'backup_used',
  },

  // 2FA security levels
  SECURITY_LEVELS: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ENHANCED: 'enhanced',
    HIGH: 'high',
    MAXIMUM: 'maximum',
  },

  // 2FA verification types
  VERIFICATION_TYPES: {
    LOGIN: 'login',
    TRANSACTION: 'transaction',
    SENSITIVE_ACTION: 'sensitive_action',
    PROFILE_CHANGE: 'profile_change',
    PASSWORD_CHANGE: 'password_change',
    EMAIL_CHANGE: 'email_change',
    DEVICE_REGISTRATION: 'device_registration',
    PAYMENT: 'payment',
  },

  // 2FA timeouts (in seconds)
  TIMEOUTS: {
    OTP: 300, // 5 minutes
    SESSION: 900, // 15 minutes
    BACKUP_CODE: 3600, // 1 hour
    SECURITY_KEY: 600, // 10 minutes
    BIOMETRIC: 120, // 2 minutes
    PUSH: 600, // 10 minutes
    VOICE: 300, // 5 minutes
  },

  // 2FA limits
  LIMITS: {
    MAX_ATTEMPTS: 3,
    MAX_BACKUP_CODES: 10,
    MAX_DEVICES: 5,
    MAX_TOTP_WINDOW: 2,
    MAX_HOTP_COUNTER: 100,
    OTP_LENGTH: 6,
    BACKUP_CODE_LENGTH: 16,
  },

  // 2FA recovery options
  RECOVERY: {
    BACKUP_CODES: 'backup_codes',
    EMAIL: 'email',
    SMS: 'sms',
    SECURITY_QUESTIONS: 'security_questions',
    ADMIN_OVERRIDE: 'admin_override',
  },

  // 2FA channels
  CHANNELS: {
    APP: 'app',
    SMS: 'sms',
    EMAIL: 'email',
    PUSH: 'push',
    VOICE: 'voice',
    HARDWARE: 'hardware',
  },

  // 2FA algorithms
  ALGORITHMS: {
    SHA1: 'sha1',
    SHA256: 'sha256',
    SHA512: 'sha512',
    MD5: 'md5',
  },

  // 2FA token formats
  TOKEN_FORMATS: {
    NUMERIC: 'numeric',
    ALPHANUMERIC: 'alphanumeric',
    HEX: 'hex',
    BASE32: 'base32',
    BASE64: 'base64',
  },
} as const;

export type Admin2FAMethod = (typeof ADMIN_2FA.METHODS)[keyof typeof ADMIN_2FA.METHODS];
export type Admin2FAStatus = (typeof ADMIN_2FA.STATUSES)[keyof typeof ADMIN_2FA.STATUSES];
export type Admin2FASecurityLevel =
  (typeof ADMIN_2FA.SECURITY_LEVELS)[keyof typeof ADMIN_2FA.SECURITY_LEVELS];
export type Admin2FAVerificationType =
  (typeof ADMIN_2FA.VERIFICATION_TYPES)[keyof typeof ADMIN_2FA.VERIFICATION_TYPES];
export type Admin2FATimeout = (typeof ADMIN_2FA.TIMEOUTS)[keyof typeof ADMIN_2FA.TIMEOUTS];
export type Admin2FARecovery = (typeof ADMIN_2FA.RECOVERY)[keyof typeof ADMIN_2FA.RECOVERY];
export type Admin2FAChannel = (typeof ADMIN_2FA.CHANNELS)[keyof typeof ADMIN_2FA.CHANNELS];
export type Admin2FAAlgorithm = (typeof ADMIN_2FA.ALGORITHMS)[keyof typeof ADMIN_2FA.ALGORITHMS];
export type Admin2FATokenFormat =
  (typeof ADMIN_2FA.TOKEN_FORMATS)[keyof typeof ADMIN_2FA.TOKEN_FORMATS];

export const ADMIN_2FA_METHOD_LABELS: Record<Admin2FAMethod, string> = {
  [ADMIN_2FA.METHODS.TOTP]: 'Time-based OTP',
  [ADMIN_2FA.METHODS.HOTP]: 'HMAC-based OTP',
  [ADMIN_2FA.METHODS.SMS]: 'SMS OTP',
  [ADMIN_2FA.METHODS.EMAIL]: 'Email OTP',
  [ADMIN_2FA.METHODS.AUTHENTICATOR]: 'Authenticator App',
  [ADMIN_2FA.METHODS.BACKUP_CODE]: 'Backup Code',
  [ADMIN_2FA.METHODS.SECURITY_KEY]: 'Security Key',
  [ADMIN_2FA.METHODS.BIOMETRIC]: 'Biometric',
  [ADMIN_2FA.METHODS.PUSH_NOTIFICATION]: 'Push Notification',
  [ADMIN_2FA.METHODS.VOICE]: 'Voice Call',
  [ADMIN_2FA.METHODS.QR_CODE]: 'QR Code',
};

export const ADMIN_2FA_METHOD_ICONS: Record<Admin2FAMethod, string> = {
  [ADMIN_2FA.METHODS.TOTP]: '⏰',
  [ADMIN_2FA.METHODS.HOTP]: '🔑',
  [ADMIN_2FA.METHODS.SMS]: '📱',
  [ADMIN_2FA.METHODS.EMAIL]: '✉️',
  [ADMIN_2FA.METHODS.AUTHENTICATOR]: '📱',
  [ADMIN_2FA.METHODS.BACKUP_CODE]: '📋',
  [ADMIN_2FA.METHODS.SECURITY_KEY]: '🔐',
  [ADMIN_2FA.METHODS.BIOMETRIC]: '👤',
  [ADMIN_2FA.METHODS.PUSH_NOTIFICATION]: '🔔',
  [ADMIN_2FA.METHODS.VOICE]: '🎤',
  [ADMIN_2FA.METHODS.QR_CODE]: '📷',
};

export const ADMIN_2FA_STATUS_LABELS: Record<Admin2FAStatus, string> = {
  [ADMIN_2FA.STATUSES.ENABLED]: 'Enabled',
  [ADMIN_2FA.STATUSES.DISABLED]: 'Disabled',
  [ADMIN_2FA.STATUSES.PENDING]: 'Pending',
  [ADMIN_2FA.STATUSES.VERIFIED]: 'Verified',
  [ADMIN_2FA.STATUSES.UNVERIFIED]: 'Unverified',
  [ADMIN_2FA.STATUSES.LOCKED]: 'Locked',
  [ADMIN_2FA.STATUSES.EXPIRED]: 'Expired',
  [ADMIN_2FA.STATUSES.REVOKED]: 'Revoked',
  [ADMIN_2FA.STATUSES.SUSPENDED]: 'Suspended',
  [ADMIN_2FA.STATUSES.CONFIGURED]: 'Configured',
  [ADMIN_2FA.STATUSES.NOT_CONFIGURED]: 'Not Configured',
  [ADMIN_2FA.STATUSES.BACKUP_USED]: 'Backup Used',
};

export const ADMIN_2FA_STATUS_COLORS: Record<Admin2FAStatus, string> = {
  [ADMIN_2FA.STATUSES.ENABLED]: '#10B981',
  [ADMIN_2FA.STATUSES.DISABLED]: '#6B7280',
  [ADMIN_2FA.STATUSES.PENDING]: '#F59E0B',
  [ADMIN_2FA.STATUSES.VERIFIED]: '#34D399',
  [ADMIN_2FA.STATUSES.UNVERIFIED]: '#F59E0B',
  [ADMIN_2FA.STATUSES.LOCKED]: '#DC2626',
  [ADMIN_2FA.STATUSES.EXPIRED]: '#9CA3AF',
  [ADMIN_2FA.STATUSES.REVOKED]: '#EF4444',
  [ADMIN_2FA.STATUSES.SUSPENDED]: '#F97316',
  [ADMIN_2FA.STATUSES.CONFIGURED]: '#3B82F6',
  [ADMIN_2FA.STATUSES.NOT_CONFIGURED]: '#9CA3AF',
  [ADMIN_2FA.STATUSES.BACKUP_USED]: '#8B5CF6',
};

export const ADMIN_2FA_SECURITY_LEVEL_LABELS: Record<Admin2FASecurityLevel, string> = {
  [ADMIN_2FA.SECURITY_LEVELS.BASIC]: 'Basic',
  [ADMIN_2FA.SECURITY_LEVELS.STANDARD]: 'Standard',
  [ADMIN_2FA.SECURITY_LEVELS.ENHANCED]: 'Enhanced',
  [ADMIN_2FA.SECURITY_LEVELS.HIGH]: 'High',
  [ADMIN_2FA.SECURITY_LEVELS.MAXIMUM]: 'Maximum',
};

export const ADMIN_2FA_SECURITY_LEVEL_PRIORITY: Record<Admin2FASecurityLevel, number> = {
  [ADMIN_2FA.SECURITY_LEVELS.BASIC]: 1,
  [ADMIN_2FA.SECURITY_LEVELS.STANDARD]: 2,
  [ADMIN_2FA.SECURITY_LEVELS.ENHANCED]: 3,
  [ADMIN_2FA.SECURITY_LEVELS.HIGH]: 4,
  [ADMIN_2FA.SECURITY_LEVELS.MAXIMUM]: 5,
};

export const ADMIN_2FA_VERIFICATION_TYPE_LABELS: Record<Admin2FAVerificationType, string> = {
  [ADMIN_2FA.VERIFICATION_TYPES.LOGIN]: 'Login',
  [ADMIN_2FA.VERIFICATION_TYPES.TRANSACTION]: 'Transaction',
  [ADMIN_2FA.VERIFICATION_TYPES.SENSITIVE_ACTION]: 'Sensitive Action',
  [ADMIN_2FA.VERIFICATION_TYPES.PROFILE_CHANGE]: 'Profile Change',
  [ADMIN_2FA.VERIFICATION_TYPES.PASSWORD_CHANGE]: 'Password Change',
  [ADMIN_2FA.VERIFICATION_TYPES.EMAIL_CHANGE]: 'Email Change',
  [ADMIN_2FA.VERIFICATION_TYPES.DEVICE_REGISTRATION]: 'Device Registration',
  [ADMIN_2FA.VERIFICATION_TYPES.PAYMENT]: 'Payment',
};

export const ADMIN_2FA_CHANNEL_LABELS: Record<Admin2FAChannel, string> = {
  [ADMIN_2FA.CHANNELS.APP]: 'Authenticator App',
  [ADMIN_2FA.CHANNELS.SMS]: 'SMS',
  [ADMIN_2FA.CHANNELS.EMAIL]: 'Email',
  [ADMIN_2FA.CHANNELS.PUSH]: 'Push Notification',
  [ADMIN_2FA.CHANNELS.VOICE]: 'Voice Call',
  [ADMIN_2FA.CHANNELS.HARDWARE]: 'Hardware Token',
};

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
  return ADMIN_2FA_SECURITY_LEVEL_LABELS[level] || 'Unknown Security Level';
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
  return (
    status === ADMIN_2FA.STATUSES.ENABLED ||
    status === ADMIN_2FA.STATUSES.VERIFIED ||
    status === ADMIN_2FA.STATUSES.CONFIGURED
  );
}

export function is2FADisabled(status: Admin2FAStatus): boolean {
  return (
    status === ADMIN_2FA.STATUSES.DISABLED ||
    status === ADMIN_2FA.STATUSES.NOT_CONFIGURED ||
    status === ADMIN_2FA.STATUSES.REVOKED
  );
}

export function is2FAExpired(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.EXPIRED || status === ADMIN_2FA.STATUSES.SUSPENDED;
}

export function is2FALocked(status: Admin2FAStatus): boolean {
  return status === ADMIN_2FA.STATUSES.LOCKED;
}

export function get2FATimeout(method: Admin2FAMethod): number {
  const timeoutMap: Record<Admin2FAMethod, number> = {
    [ADMIN_2FA.METHODS.TOTP]: ADMIN_2FA.TIMEOUTS.OTP,
    [ADMIN_2FA.METHODS.HOTP]: ADMIN_2FA.TIMEOUTS.OTP,
    [ADMIN_2FA.METHODS.SMS]: ADMIN_2FA.TIMEOUTS.OTP,
    [ADMIN_2FA.METHODS.EMAIL]: ADMIN_2FA.TIMEOUTS.OTP,
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: ADMIN_2FA.TIMEOUTS.OTP,
    [ADMIN_2FA.METHODS.BACKUP_CODE]: ADMIN_2FA.TIMEOUTS.BACKUP_CODE,
    [ADMIN_2FA.METHODS.SECURITY_KEY]: ADMIN_2FA.TIMEOUTS.SECURITY_KEY,
    [ADMIN_2FA.METHODS.BIOMETRIC]: ADMIN_2FA.TIMEOUTS.BIOMETRIC,
    [ADMIN_2FA.METHODS.PUSH_NOTIFICATION]: ADMIN_2FA.TIMEOUTS.PUSH,
    [ADMIN_2FA.METHODS.VOICE]: ADMIN_2FA.TIMEOUTS.VOICE,
    [ADMIN_2FA.METHODS.QR_CODE]: ADMIN_2FA.TIMEOUTS.OTP,
  };
  return timeoutMap[method] || ADMIN_2FA.TIMEOUTS.OTP;
}

export function get2FASecurityLevel(method: Admin2FAMethod): Admin2FASecurityLevel {
  const levelMap: Record<Admin2FAMethod, Admin2FASecurityLevel> = {
    [ADMIN_2FA.METHODS.TOTP]: ADMIN_2FA.SECURITY_LEVELS.STANDARD,
    [ADMIN_2FA.METHODS.HOTP]: ADMIN_2FA.SECURITY_LEVELS.STANDARD,
    [ADMIN_2FA.METHODS.SMS]: ADMIN_2FA.SECURITY_LEVELS.BASIC,
    [ADMIN_2FA.METHODS.EMAIL]: ADMIN_2FA.SECURITY_LEVELS.BASIC,
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: ADMIN_2FA.SECURITY_LEVELS.ENHANCED,
    [ADMIN_2FA.METHODS.BACKUP_CODE]: ADMIN_2FA.SECURITY_LEVELS.ENHANCED,
    [ADMIN_2FA.METHODS.SECURITY_KEY]: ADMIN_2FA.SECURITY_LEVELS.HIGH,
    [ADMIN_2FA.METHODS.BIOMETRIC]: ADMIN_2FA.SECURITY_LEVELS.HIGH,
    [ADMIN_2FA.METHODS.PUSH_NOTIFICATION]: ADMIN_2FA.SECURITY_LEVELS.STANDARD,
    [ADMIN_2FA.METHODS.VOICE]: ADMIN_2FA.SECURITY_LEVELS.STANDARD,
    [ADMIN_2FA.METHODS.QR_CODE]: ADMIN_2FA.SECURITY_LEVELS.STANDARD,
  };
  return levelMap[method] || ADMIN_2FA.SECURITY_LEVELS.STANDARD;
}

export function get2FAChannels(method: Admin2FAMethod): Admin2FAChannel[] {
  const channelMap: Record<Admin2FAMethod, Admin2FAChannel[]> = {
    [ADMIN_2FA.METHODS.TOTP]: [ADMIN_2FA.CHANNELS.APP],
    [ADMIN_2FA.METHODS.HOTP]: [ADMIN_2FA.CHANNELS.APP],
    [ADMIN_2FA.METHODS.SMS]: [ADMIN_2FA.CHANNELS.SMS],
    [ADMIN_2FA.METHODS.EMAIL]: [ADMIN_2FA.CHANNELS.EMAIL],
    [ADMIN_2FA.METHODS.AUTHENTICATOR]: [ADMIN_2FA.CHANNELS.APP],
    [ADMIN_2FA.METHODS.BACKUP_CODE]: [ADMIN_2FA.CHANNELS.APP],
    [ADMIN_2FA.METHODS.SECURITY_KEY]: [ADMIN_2FA.CHANNELS.HARDWARE],
    [ADMIN_2FA.METHODS.BIOMETRIC]: [ADMIN_2FA.CHANNELS.APP],
    [ADMIN_2FA.METHODS.PUSH_NOTIFICATION]: [ADMIN_2FA.CHANNELS.PUSH],
    [ADMIN_2FA.METHODS.VOICE]: [ADMIN_2FA.CHANNELS.VOICE],
    [ADMIN_2FA.METHODS.QR_CODE]: [ADMIN_2FA.CHANNELS.APP],
  };
  return channelMap[method] || [ADMIN_2FA.CHANNELS.APP];
}

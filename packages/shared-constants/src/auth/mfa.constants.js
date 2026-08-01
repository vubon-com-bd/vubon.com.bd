/**
 * Multi-Factor Authentication (MFA) constants for the monorepo
 * All MFA-related constants are centralized here for consistent security implementation
 */
/**
 * MFA TOTP (Time-based One-Time Password) configurations
 */
export const MFA_TOTP = {
    /**
     * TOTP issuer name displayed in authenticator apps
     * This is the organization name that users will see in their authenticator app
     */
    ISSUER: 'Vubon.com.bd',
    /**
     * TOTP algorithm for generating OTP codes
     * SHA1 is the most widely supported algorithm for TOTP
     */
    ALGORITHM: 'SHA1',
    /**
     * Number of digits in the TOTP code
     * Standard is 6 digits for most authenticator apps
     */
    DIGITS: 6,
    /**
     * Time period in seconds for each TOTP code
     * 30 seconds is the standard TOTP period
     */
    PERIOD: 30,
    /**
     * Length of the TOTP secret key in bytes
     * 20 bytes (160 bits) is the standard for TOTP
     */
    SECRET_LENGTH: 20,
    /**
     * TOTP window size for validation
     * Number of periods to check before and after current time
     */
    WINDOW: 2,
    /**
     * Whether to allow overlapping TOTP codes
     * Prevents code reuse within the same window
     */
    PREVENT_CODE_REUSE: true,
    /**
     * Maximum allowed clock skew in seconds
     * Accounts for time differences between server and client
     */
    ALLOWED_CLOCK_SKEW: 30,
};
/**
 * MFA backup codes configurations
 */
export const MFA_BACKUP_CODES = {
    /**
     * Number of backup codes to generate
     * Users can use these to bypass MFA if they lose access to their authenticator
     */
    COUNT: 10,
    /**
     * Length of each backup code
     * 8 characters provides good security while remaining user-friendly
     */
    LENGTH: 8,
    /**
     * Backup code character set
     * Alphanumeric characters excluding ambiguous characters
     */
    CHARSET: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
    /**
     * Whether to hash backup codes before storing
     * Provides additional security if database is compromised
     */
    HASH_STORED: true,
    /**
     * Backup code usage warning threshold
     * Notify user when they have used this many backup codes
     */
    USAGE_WARNING_THRESHOLD: 3,
    /**
     * Whether to regenerate backup codes on each MFA setup
     */
    REGENERATE_ON_SETUP: true,
    /**
     * Maximum age of backup codes before requiring regeneration
     * 0 means no expiry
     */
    MAX_AGE_DAYS: 0,
};
/**
 * MFA verification configurations
 */
export const MFA_VERIFICATION = {
    /**
     * Maximum number of verification attempts before lockout
     * Prevents brute force attacks on MFA codes
     */
    MAX_ATTEMPTS: 3,
    /**
     * Lockout duration in minutes after exceeding max attempts
     * Gives time for the user to contact support or reset their MFA
     */
    LOCKOUT_DURATION_MINUTES: 15,
    /**
     * Cooldown period in seconds between verification attempts
     * Slows down brute force attacks
     */
    ATTEMPT_COOLDOWN_SECONDS: 30,
    /**
     * Time window in minutes for tracking attempts
     * Resets the attempt counter after this window
     */
    ATTEMPT_WINDOW_MINUTES: 60,
    /**
     * Whether to lock out after failed attempts
     */
    ENABLE_LOCKOUT: true,
    /**
     * Whether to send notifications on failed attempts
     */
    NOTIFY_ON_FAILED_ATTEMPTS: true,
    /**
     * Whether to log all verification attempts
     */
    LOG_ALL_ATTEMPTS: true,
};
/**
 * MFA recovery configurations
 */
export const MFA_RECOVERY = {
    /**
     * Whether to allow MFA recovery via email
     */
    ALLOW_EMAIL_RECOVERY: true,
    /**
     * Whether to allow MFA recovery via SMS
     */
    ALLOW_SMS_RECOVERY: true,
    /**
     * Whether to allow MFA recovery via backup codes
     */
    ALLOW_BACKUP_CODES: true,
    /**
     * Whether to allow admin-assisted recovery
     */
    ALLOW_ADMIN_RECOVERY: true,
    /**
     * Whether to require additional verification for recovery
     */
    REQUIRE_ADDITIONAL_VERIFICATION: true,
    /**
     * Recovery code expiry in minutes
     */
    RECOVERY_CODE_EXPIRY_MINUTES: 15,
    /**
     * Maximum number of recovery attempts
     */
    MAX_RECOVERY_ATTEMPTS: 3,
    /**
     * Cooldown period after failed recovery attempts
     */
    RECOVERY_COOLDOWN_MINUTES: 60,
    /**
     * Whether to notify user on successful recovery
     */
    NOTIFY_ON_SUCCESSFUL_RECOVERY: true,
};
/**
 * MFA methods configurations
 */
export const MFA_METHODS = {
    /**
     * TOTP authenticator app method
     */
    AUTHENTICATOR: {
        ENABLED: true,
        PRIORITY: 1,
        NAME: 'Authenticator App',
        DESCRIPTION: 'Use an authenticator app like Google Authenticator or Authy',
    },
    /**
     * SMS method - sends codes via text message
     */
    SMS: {
        ENABLED: true,
        PRIORITY: 2,
        NAME: 'SMS',
        DESCRIPTION: 'Receive codes via SMS text message',
    },
    /**
     * Email method - sends codes via email
     */
    EMAIL: {
        ENABLED: true,
        PRIORITY: 3,
        NAME: 'Email',
        DESCRIPTION: 'Receive codes via email',
    },
    /**
     * Backup codes method
     */
    BACKUP_CODES: {
        ENABLED: true,
        PRIORITY: 4,
        NAME: 'Backup Codes',
        DESCRIPTION: 'Use pre-generated backup codes',
    },
    /**
     * Security key method (WebAuthn)
     */
    SECURITY_KEY: {
        ENABLED: true,
        PRIORITY: 1,
        NAME: 'Security Key',
        DESCRIPTION: 'Use hardware security key (WebAuthn)',
    },
    /**
     * Push notification method
     */
    PUSH: {
        ENABLED: true,
        PRIORITY: 2,
        NAME: 'Push Notification',
        DESCRIPTION: 'Receive push notifications on trusted devices',
    },
    /**
     * Default method to use if no other method is set
     */
    DEFAULT: 'authenticator',
};
/**
 * MFA session configurations
 */
export const MFA_SESSION = {
    /**
     * Whether to cache MFA status in session
     * Reduces database queries for MFA checks
     */
    CACHE_STATUS: true,
    /**
     * MFA session cache duration in seconds
     */
    CACHE_DURATION_SECONDS: 300, // 5 minutes
    /**
     * Whether to require MFA on every login
     */
    REQUIRE_ON_EVERY_LOGIN: false,
    /**
     * Trust duration for trusted devices in days
     */
    TRUSTED_DEVICE_DURATION_DAYS: 30,
    /**
     * Whether to prompt for MFA after suspicious activity
     */
    PROMPT_ON_SUSPICIOUS_ACTIVITY: true,
    /**
     * Whether to prompt for MFA on new devices
     */
    PROMPT_ON_NEW_DEVICE: true,
    /**
     * Whether to prompt for MFA on new IP addresses
     */
    PROMPT_ON_NEW_IP: true,
    /**
     * Whether to prompt for MFA on password change
     */
    PROMPT_ON_PASSWORD_CHANGE: true,
};
/**
 * MFA security configurations
 */
export const MFA_SECURITY = {
    /**
     * Whether MFA is required for all users
     */
    REQUIRED_FOR_ALL: false,
    /**
     * Whether MFA is required for admin users
     */
    REQUIRED_FOR_ADMIN: true,
    /**
     * Whether MFA is required for users with certain permissions
     */
    REQUIRED_FOR_PERMISSIONS: ['user:write', 'user:delete', 'role:manage'],
    /**
     * Grace period in days before MFA becomes mandatory
     */
    GRACE_PERIOD_DAYS: 7,
    /**
     * Whether to remind users to set up MFA
     */
    REMIND_TO_SETUP: true,
    /**
     * Reminder interval in days
     */
    REMINDER_INTERVAL_DAYS: 3,
    /**
     * Maximum reminder count before enforcement
     */
    MAX_REMINDER_COUNT: 3,
    /**
     * Whether to enforce MFA on first login
     */
    ENFORCE_ON_FIRST_LOGIN: true,
};
/**
 * Default MFA configuration
 */
export const DEFAULT_MFA_CONFIG = {
    totp: MFA_TOTP,
    backupCodes: MFA_BACKUP_CODES,
    verification: MFA_VERIFICATION,
    recovery: MFA_RECOVERY,
    methods: MFA_METHODS,
    session: MFA_SESSION,
    security: MFA_SECURITY,
};
/**
 * MFA error messages
 */
export const MFA_ERROR_MESSAGES = {
    VERIFICATION_FAILED: 'MFA verification failed. Please try again.',
    MAX_ATTEMPTS_EXCEEDED: 'Too many failed MFA attempts. Your account is temporarily locked.',
    LOCKOUT_ACTIVE: 'MFA is temporarily locked due to too many failed attempts.',
    INVALID_TOTP: 'Invalid TOTP code. Please check your authenticator app.',
    EXPIRED_TOTP: 'TOTP code has expired. Please try a new code.',
    BACKUP_CODE_INVALID: 'Invalid backup code. Please try again.',
    BACKUP_CODE_USED: 'This backup code has already been used.',
    BACKUP_CODE_EXHAUSTED: 'No backup codes remaining. Please regenerate backup codes.',
    RECOVERY_FAILED: 'MFA recovery failed. Please contact support.',
    SETUP_FAILED: 'MFA setup failed. Please try again.',
    ALREADY_ENABLED: 'MFA is already enabled for this account.',
    NOT_ENABLED: 'MFA is not enabled for this account.',
    METHOD_NOT_SUPPORTED: 'The selected MFA method is not supported.',
    DEVICE_NOT_TRUSTED: 'This device is not trusted. Please complete MFA verification.',
    SESSION_EXPIRED: 'MFA session has expired. Please start over.',
    RECOVERY_CODE_EXPIRED: 'Recovery code has expired. Please request a new one.',
};
/**
 * MFA success messages
 */
export const MFA_SUCCESS_MESSAGES = {
    VERIFICATION_SUCCESS: 'MFA verification successful.',
    SETUP_SUCCESS: 'MFA setup completed successfully.',
    RECOVERY_SUCCESS: 'MFA recovery completed successfully.',
    BACKUP_CODES_GENERATED: 'Backup codes generated successfully.',
    BACKUP_CODES_REGENERATED: 'Backup codes regenerated successfully.',
    METHOD_ADDED: 'MFA method added successfully.',
    METHOD_REMOVED: 'MFA method removed successfully.',
    DEVICE_TRUSTED: 'Device marked as trusted.',
    DEVICE_UNTRUSTED: 'Device marked as untrusted.',
};
/**
 * MFA event types for logging
 */
export const MFA_EVENTS = {
    VERIFICATION_SUCCESS: 'mfa.verification.success',
    VERIFICATION_FAILURE: 'mfa.verification.failure',
    LOCKOUT_STARTED: 'mfa.lockout.started',
    LOCKOUT_ENDED: 'mfa.lockout.ended',
    SETUP_STARTED: 'mfa.setup.started',
    SETUP_COMPLETED: 'mfa.setup.completed',
    SETUP_CANCELLED: 'mfa.setup.cancelled',
    DISABLED: 'mfa.disabled',
    RECOVERY_STARTED: 'mfa.recovery.started',
    RECOVERY_SUCCESS: 'mfa.recovery.success',
    RECOVERY_FAILURE: 'mfa.recovery.failure',
    BACKUP_CODES_GENERATED: 'mfa.backup.generated',
    BACKUP_CODES_USED: 'mfa.backup.used',
    BACKUP_CODES_EXHAUSTED: 'mfa.backup.exhausted',
    METHOD_ADDED: 'mfa.method.added',
    METHOD_REMOVED: 'mfa.method.removed',
    DEVICE_TRUSTED: 'mfa.device.trusted',
    DEVICE_UNTRUSTED: 'mfa.device.untrusted',
    REMINDER_SENT: 'mfa.reminder.sent',
    REMINDER_DISMISSED: 'mfa.reminder.dismissed',
};
/**
 * MFA method types
 */
export const MFA_METHOD_TYPES = {
    AUTHENTICATOR: 'authenticator',
    SMS: 'sms',
    EMAIL: 'email',
    BACKUP_CODES: 'backup_codes',
    SECURITY_KEY: 'security_key',
    PUSH: 'push',
};
/**
 * MFA status types
 */
export const MFA_STATUS = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING_SETUP: 'pending_setup',
    SETUP_IN_PROGRESS: 'setup_in_progress',
    LOCKED: 'locked',
    RECOVERY_IN_PROGRESS: 'recovery_in_progress',
};
/**
 * MFA verification status
 */
export const MFA_VERIFICATION_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    EXPIRED: 'expired',
    LOCKED: 'locked',
};
/**
 * Helper function to format TOTP issuer name
 */
export const formatTOTPIssuer = (issuer) => {
    return issuer.replace(/[^a-zA-Z0-9 ]/g, '').trim();
};
/**
 * Helper function to validate backup code
 */
export const isValidBackupCode = (code, charset) => {
    const regex = new RegExp(`^[${charset}]{${MFA_BACKUP_CODES.LENGTH}}$`);
    return regex.test(code);
};
/**
 * Helper function to get available MFA methods
 */
export const getAvailableMFAMethods = () => {
    const methods = [];
    if (MFA_METHODS.AUTHENTICATOR.ENABLED)
        methods.push(MFA_METHOD_TYPES.AUTHENTICATOR);
    if (MFA_METHODS.SMS.ENABLED)
        methods.push(MFA_METHOD_TYPES.SMS);
    if (MFA_METHODS.EMAIL.ENABLED)
        methods.push(MFA_METHOD_TYPES.EMAIL);
    if (MFA_METHODS.BACKUP_CODES.ENABLED)
        methods.push(MFA_METHOD_TYPES.BACKUP_CODES);
    if (MFA_METHODS.SECURITY_KEY.ENABLED)
        methods.push(MFA_METHOD_TYPES.SECURITY_KEY);
    if (MFA_METHODS.PUSH.ENABLED)
        methods.push(MFA_METHOD_TYPES.PUSH);
    return methods;
};
/**
 * Helper function to get prioritized MFA methods
 */
export const getPrioritizedMFAMethods = () => {
    const methods = [];
    if (MFA_METHODS.AUTHENTICATOR.ENABLED) {
        methods.push({
            type: MFA_METHOD_TYPES.AUTHENTICATOR,
            priority: MFA_METHODS.AUTHENTICATOR.PRIORITY,
        });
    }
    if (MFA_METHODS.SMS.ENABLED) {
        methods.push({ type: MFA_METHOD_TYPES.SMS, priority: MFA_METHODS.SMS.PRIORITY });
    }
    if (MFA_METHODS.EMAIL.ENABLED) {
        methods.push({ type: MFA_METHOD_TYPES.EMAIL, priority: MFA_METHODS.EMAIL.PRIORITY });
    }
    if (MFA_METHODS.BACKUP_CODES.ENABLED) {
        methods.push({
            type: MFA_METHOD_TYPES.BACKUP_CODES,
            priority: MFA_METHODS.BACKUP_CODES.PRIORITY,
        });
    }
    if (MFA_METHODS.SECURITY_KEY.ENABLED) {
        methods.push({
            type: MFA_METHOD_TYPES.SECURITY_KEY,
            priority: MFA_METHODS.SECURITY_KEY.PRIORITY,
        });
    }
    if (MFA_METHODS.PUSH.ENABLED) {
        methods.push({ type: MFA_METHOD_TYPES.PUSH, priority: MFA_METHODS.PUSH.PRIORITY });
    }
    methods.sort((a, b) => a.priority - b.priority);
    return methods.map((m) => m.type);
};
/**
 * Helper function to check if MFA is required for user
 */
export const isMFARequiredForUser = (userPermissions) => {
    if (MFA_SECURITY.REQUIRED_FOR_ALL)
        return true;
    return MFA_SECURITY.REQUIRED_FOR_PERMISSIONS.some((requiredPermission) => userPermissions.includes(requiredPermission));
};
/**
 * MFA constants grouped for easy access
 */
export const MFA_CONSTANTS = {
    TOTP: MFA_TOTP,
    BACKUP_CODES: MFA_BACKUP_CODES,
    VERIFICATION: MFA_VERIFICATION,
    RECOVERY: MFA_RECOVERY,
    METHODS: MFA_METHODS,
    SESSION: MFA_SESSION,
    SECURITY: MFA_SECURITY,
    STATUS: MFA_STATUS,
    METHOD_TYPES: MFA_METHOD_TYPES,
    VERIFICATION_STATUS: MFA_VERIFICATION_STATUS,
    EVENTS: MFA_EVENTS,
    ERROR_MESSAGES: MFA_ERROR_MESSAGES,
    SUCCESS_MESSAGES: MFA_SUCCESS_MESSAGES,
};
/**
 * All MFA constants for export
 */
export const ALL_MFA_CONSTANTS = {
    ...MFA_TOTP,
    ...MFA_BACKUP_CODES,
    ...MFA_VERIFICATION,
    ...MFA_RECOVERY,
    ...MFA_METHODS,
    ...MFA_SESSION,
    ...MFA_SECURITY,
    ...MFA_STATUS,
    ...MFA_METHOD_TYPES,
    ...MFA_VERIFICATION_STATUS,
    ...MFA_EVENTS,
    ...MFA_ERROR_MESSAGES,
    ...MFA_SUCCESS_MESSAGES,
};
//# sourceMappingURL=mfa.constants.js.map
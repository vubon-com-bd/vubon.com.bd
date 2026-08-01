/**
 * Multi-Factor Authentication (MFA) constants for the monorepo
 * All MFA-related constants are centralized here for consistent security implementation
 */
/**
 * MFA TOTP (Time-based One-Time Password) configurations
 */
export declare const MFA_TOTP: {
    /**
     * TOTP issuer name displayed in authenticator apps
     * This is the organization name that users will see in their authenticator app
     */
    readonly ISSUER: "Vubon.com.bd";
    /**
     * TOTP algorithm for generating OTP codes
     * SHA1 is the most widely supported algorithm for TOTP
     */
    readonly ALGORITHM: "SHA1";
    /**
     * Number of digits in the TOTP code
     * Standard is 6 digits for most authenticator apps
     */
    readonly DIGITS: 6;
    /**
     * Time period in seconds for each TOTP code
     * 30 seconds is the standard TOTP period
     */
    readonly PERIOD: 30;
    /**
     * Length of the TOTP secret key in bytes
     * 20 bytes (160 bits) is the standard for TOTP
     */
    readonly SECRET_LENGTH: 20;
    /**
     * TOTP window size for validation
     * Number of periods to check before and after current time
     */
    readonly WINDOW: 2;
    /**
     * Whether to allow overlapping TOTP codes
     * Prevents code reuse within the same window
     */
    readonly PREVENT_CODE_REUSE: true;
    /**
     * Maximum allowed clock skew in seconds
     * Accounts for time differences between server and client
     */
    readonly ALLOWED_CLOCK_SKEW: 30;
};
/**
 * MFA backup codes configurations
 */
export declare const MFA_BACKUP_CODES: {
    /**
     * Number of backup codes to generate
     * Users can use these to bypass MFA if they lose access to their authenticator
     */
    readonly COUNT: 10;
    /**
     * Length of each backup code
     * 8 characters provides good security while remaining user-friendly
     */
    readonly LENGTH: 8;
    /**
     * Backup code character set
     * Alphanumeric characters excluding ambiguous characters
     */
    readonly CHARSET: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    /**
     * Whether to hash backup codes before storing
     * Provides additional security if database is compromised
     */
    readonly HASH_STORED: true;
    /**
     * Backup code usage warning threshold
     * Notify user when they have used this many backup codes
     */
    readonly USAGE_WARNING_THRESHOLD: 3;
    /**
     * Whether to regenerate backup codes on each MFA setup
     */
    readonly REGENERATE_ON_SETUP: true;
    /**
     * Maximum age of backup codes before requiring regeneration
     * 0 means no expiry
     */
    readonly MAX_AGE_DAYS: 0;
};
/**
 * MFA verification configurations
 */
export declare const MFA_VERIFICATION: {
    /**
     * Maximum number of verification attempts before lockout
     * Prevents brute force attacks on MFA codes
     */
    readonly MAX_ATTEMPTS: 3;
    /**
     * Lockout duration in minutes after exceeding max attempts
     * Gives time for the user to contact support or reset their MFA
     */
    readonly LOCKOUT_DURATION_MINUTES: 15;
    /**
     * Cooldown period in seconds between verification attempts
     * Slows down brute force attacks
     */
    readonly ATTEMPT_COOLDOWN_SECONDS: 30;
    /**
     * Time window in minutes for tracking attempts
     * Resets the attempt counter after this window
     */
    readonly ATTEMPT_WINDOW_MINUTES: 60;
    /**
     * Whether to lock out after failed attempts
     */
    readonly ENABLE_LOCKOUT: true;
    /**
     * Whether to send notifications on failed attempts
     */
    readonly NOTIFY_ON_FAILED_ATTEMPTS: true;
    /**
     * Whether to log all verification attempts
     */
    readonly LOG_ALL_ATTEMPTS: true;
};
/**
 * MFA recovery configurations
 */
export declare const MFA_RECOVERY: {
    /**
     * Whether to allow MFA recovery via email
     */
    readonly ALLOW_EMAIL_RECOVERY: true;
    /**
     * Whether to allow MFA recovery via SMS
     */
    readonly ALLOW_SMS_RECOVERY: true;
    /**
     * Whether to allow MFA recovery via backup codes
     */
    readonly ALLOW_BACKUP_CODES: true;
    /**
     * Whether to allow admin-assisted recovery
     */
    readonly ALLOW_ADMIN_RECOVERY: true;
    /**
     * Whether to require additional verification for recovery
     */
    readonly REQUIRE_ADDITIONAL_VERIFICATION: true;
    /**
     * Recovery code expiry in minutes
     */
    readonly RECOVERY_CODE_EXPIRY_MINUTES: 15;
    /**
     * Maximum number of recovery attempts
     */
    readonly MAX_RECOVERY_ATTEMPTS: 3;
    /**
     * Cooldown period after failed recovery attempts
     */
    readonly RECOVERY_COOLDOWN_MINUTES: 60;
    /**
     * Whether to notify user on successful recovery
     */
    readonly NOTIFY_ON_SUCCESSFUL_RECOVERY: true;
};
/**
 * MFA methods configurations
 */
export declare const MFA_METHODS: {
    /**
     * TOTP authenticator app method
     */
    readonly AUTHENTICATOR: {
        readonly ENABLED: true;
        readonly PRIORITY: 1;
        readonly NAME: "Authenticator App";
        readonly DESCRIPTION: "Use an authenticator app like Google Authenticator or Authy";
    };
    /**
     * SMS method - sends codes via text message
     */
    readonly SMS: {
        readonly ENABLED: true;
        readonly PRIORITY: 2;
        readonly NAME: "SMS";
        readonly DESCRIPTION: "Receive codes via SMS text message";
    };
    /**
     * Email method - sends codes via email
     */
    readonly EMAIL: {
        readonly ENABLED: true;
        readonly PRIORITY: 3;
        readonly NAME: "Email";
        readonly DESCRIPTION: "Receive codes via email";
    };
    /**
     * Backup codes method
     */
    readonly BACKUP_CODES: {
        readonly ENABLED: true;
        readonly PRIORITY: 4;
        readonly NAME: "Backup Codes";
        readonly DESCRIPTION: "Use pre-generated backup codes";
    };
    /**
     * Security key method (WebAuthn)
     */
    readonly SECURITY_KEY: {
        readonly ENABLED: true;
        readonly PRIORITY: 1;
        readonly NAME: "Security Key";
        readonly DESCRIPTION: "Use hardware security key (WebAuthn)";
    };
    /**
     * Push notification method
     */
    readonly PUSH: {
        readonly ENABLED: true;
        readonly PRIORITY: 2;
        readonly NAME: "Push Notification";
        readonly DESCRIPTION: "Receive push notifications on trusted devices";
    };
    /**
     * Default method to use if no other method is set
     */
    readonly DEFAULT: "authenticator";
};
/**
 * MFA session configurations
 */
export declare const MFA_SESSION: {
    /**
     * Whether to cache MFA status in session
     * Reduces database queries for MFA checks
     */
    readonly CACHE_STATUS: true;
    /**
     * MFA session cache duration in seconds
     */
    readonly CACHE_DURATION_SECONDS: 300;
    /**
     * Whether to require MFA on every login
     */
    readonly REQUIRE_ON_EVERY_LOGIN: false;
    /**
     * Trust duration for trusted devices in days
     */
    readonly TRUSTED_DEVICE_DURATION_DAYS: 30;
    /**
     * Whether to prompt for MFA after suspicious activity
     */
    readonly PROMPT_ON_SUSPICIOUS_ACTIVITY: true;
    /**
     * Whether to prompt for MFA on new devices
     */
    readonly PROMPT_ON_NEW_DEVICE: true;
    /**
     * Whether to prompt for MFA on new IP addresses
     */
    readonly PROMPT_ON_NEW_IP: true;
    /**
     * Whether to prompt for MFA on password change
     */
    readonly PROMPT_ON_PASSWORD_CHANGE: true;
};
/**
 * MFA security configurations
 */
export declare const MFA_SECURITY: {
    /**
     * Whether MFA is required for all users
     */
    readonly REQUIRED_FOR_ALL: false;
    /**
     * Whether MFA is required for admin users
     */
    readonly REQUIRED_FOR_ADMIN: true;
    /**
     * Whether MFA is required for users with certain permissions
     */
    readonly REQUIRED_FOR_PERMISSIONS: string[];
    /**
     * Grace period in days before MFA becomes mandatory
     */
    readonly GRACE_PERIOD_DAYS: 7;
    /**
     * Whether to remind users to set up MFA
     */
    readonly REMIND_TO_SETUP: true;
    /**
     * Reminder interval in days
     */
    readonly REMINDER_INTERVAL_DAYS: 3;
    /**
     * Maximum reminder count before enforcement
     */
    readonly MAX_REMINDER_COUNT: 3;
    /**
     * Whether to enforce MFA on first login
     */
    readonly ENFORCE_ON_FIRST_LOGIN: true;
};
/**
 * MFA configuration interface
 */
export interface MFAConfig {
    /**
     * TOTP configuration
     */
    totp: typeof MFA_TOTP;
    /**
     * Backup codes configuration
     */
    backupCodes: typeof MFA_BACKUP_CODES;
    /**
     * Verification configuration
     */
    verification: typeof MFA_VERIFICATION;
    /**
     * Recovery configuration
     */
    recovery: typeof MFA_RECOVERY;
    /**
     * Methods configuration
     */
    methods: typeof MFA_METHODS;
    /**
     * Session configuration
     */
    session: typeof MFA_SESSION;
    /**
     * Security configuration
     */
    security: typeof MFA_SECURITY;
}
/**
 * Default MFA configuration
 */
export declare const DEFAULT_MFA_CONFIG: MFAConfig;
/**
 * MFA error messages
 */
export declare const MFA_ERROR_MESSAGES: {
    readonly VERIFICATION_FAILED: "MFA verification failed. Please try again.";
    readonly MAX_ATTEMPTS_EXCEEDED: "Too many failed MFA attempts. Your account is temporarily locked.";
    readonly LOCKOUT_ACTIVE: "MFA is temporarily locked due to too many failed attempts.";
    readonly INVALID_TOTP: "Invalid TOTP code. Please check your authenticator app.";
    readonly EXPIRED_TOTP: "TOTP code has expired. Please try a new code.";
    readonly BACKUP_CODE_INVALID: "Invalid backup code. Please try again.";
    readonly BACKUP_CODE_USED: "This backup code has already been used.";
    readonly BACKUP_CODE_EXHAUSTED: "No backup codes remaining. Please regenerate backup codes.";
    readonly RECOVERY_FAILED: "MFA recovery failed. Please contact support.";
    readonly SETUP_FAILED: "MFA setup failed. Please try again.";
    readonly ALREADY_ENABLED: "MFA is already enabled for this account.";
    readonly NOT_ENABLED: "MFA is not enabled for this account.";
    readonly METHOD_NOT_SUPPORTED: "The selected MFA method is not supported.";
    readonly DEVICE_NOT_TRUSTED: "This device is not trusted. Please complete MFA verification.";
    readonly SESSION_EXPIRED: "MFA session has expired. Please start over.";
    readonly RECOVERY_CODE_EXPIRED: "Recovery code has expired. Please request a new one.";
};
export type MFAErrorMessage = (typeof MFA_ERROR_MESSAGES)[keyof typeof MFA_ERROR_MESSAGES];
/**
 * MFA success messages
 */
export declare const MFA_SUCCESS_MESSAGES: {
    readonly VERIFICATION_SUCCESS: "MFA verification successful.";
    readonly SETUP_SUCCESS: "MFA setup completed successfully.";
    readonly RECOVERY_SUCCESS: "MFA recovery completed successfully.";
    readonly BACKUP_CODES_GENERATED: "Backup codes generated successfully.";
    readonly BACKUP_CODES_REGENERATED: "Backup codes regenerated successfully.";
    readonly METHOD_ADDED: "MFA method added successfully.";
    readonly METHOD_REMOVED: "MFA method removed successfully.";
    readonly DEVICE_TRUSTED: "Device marked as trusted.";
    readonly DEVICE_UNTRUSTED: "Device marked as untrusted.";
};
export type MFASuccessMessage = (typeof MFA_SUCCESS_MESSAGES)[keyof typeof MFA_SUCCESS_MESSAGES];
/**
 * MFA event types for logging
 */
export declare const MFA_EVENTS: {
    readonly VERIFICATION_SUCCESS: "mfa.verification.success";
    readonly VERIFICATION_FAILURE: "mfa.verification.failure";
    readonly LOCKOUT_STARTED: "mfa.lockout.started";
    readonly LOCKOUT_ENDED: "mfa.lockout.ended";
    readonly SETUP_STARTED: "mfa.setup.started";
    readonly SETUP_COMPLETED: "mfa.setup.completed";
    readonly SETUP_CANCELLED: "mfa.setup.cancelled";
    readonly DISABLED: "mfa.disabled";
    readonly RECOVERY_STARTED: "mfa.recovery.started";
    readonly RECOVERY_SUCCESS: "mfa.recovery.success";
    readonly RECOVERY_FAILURE: "mfa.recovery.failure";
    readonly BACKUP_CODES_GENERATED: "mfa.backup.generated";
    readonly BACKUP_CODES_USED: "mfa.backup.used";
    readonly BACKUP_CODES_EXHAUSTED: "mfa.backup.exhausted";
    readonly METHOD_ADDED: "mfa.method.added";
    readonly METHOD_REMOVED: "mfa.method.removed";
    readonly DEVICE_TRUSTED: "mfa.device.trusted";
    readonly DEVICE_UNTRUSTED: "mfa.device.untrusted";
    readonly REMINDER_SENT: "mfa.reminder.sent";
    readonly REMINDER_DISMISSED: "mfa.reminder.dismissed";
};
export type MFAEvent = (typeof MFA_EVENTS)[keyof typeof MFA_EVENTS];
/**
 * MFA method types
 */
export declare const MFA_METHOD_TYPES: {
    readonly AUTHENTICATOR: "authenticator";
    readonly SMS: "sms";
    readonly EMAIL: "email";
    readonly BACKUP_CODES: "backup_codes";
    readonly SECURITY_KEY: "security_key";
    readonly PUSH: "push";
};
export type MFAMethodType = (typeof MFA_METHOD_TYPES)[keyof typeof MFA_METHOD_TYPES];
/**
 * MFA status types
 */
export declare const MFA_STATUS: {
    readonly ENABLED: "enabled";
    readonly DISABLED: "disabled";
    readonly PENDING_SETUP: "pending_setup";
    readonly SETUP_IN_PROGRESS: "setup_in_progress";
    readonly LOCKED: "locked";
    readonly RECOVERY_IN_PROGRESS: "recovery_in_progress";
};
export type MFAStatus = (typeof MFA_STATUS)[keyof typeof MFA_STATUS];
/**
 * MFA verification status
 */
export declare const MFA_VERIFICATION_STATUS: {
    readonly PENDING: "pending";
    readonly SUCCESS: "success";
    readonly FAILED: "failed";
    readonly EXPIRED: "expired";
    readonly LOCKED: "locked";
};
export type MFAVerificationStatus = (typeof MFA_VERIFICATION_STATUS)[keyof typeof MFA_VERIFICATION_STATUS];
/**
 * MFA interface for user MFA data
 */
export interface MFAUserData {
    userId: string;
    enabled: boolean;
    status: MFAStatus;
    method: MFAMethodType;
    totpSecret?: string;
    backupCodes: string[];
    backupCodesHashed: boolean;
    usedBackupCodes: string[];
    failedAttempts: number;
    lastFailedAttempt?: Date;
    lockedAt?: Date;
    lockoutExpiresAt?: Date;
    setupStartedAt?: Date;
    enabledAt?: Date;
    disabledAt?: Date;
    methods: MFAMethodType[];
    trustedDevices: TrustedDevice[];
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Trusted device interface
 */
export interface TrustedDevice {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    userAgent: string;
    ipAddress: string;
    trustedAt: Date;
    expiresAt: Date;
    lastUsedAt: Date;
}
/**
 * MFA verification session interface
 */
export interface MFAVerificationSession {
    sessionId: string;
    userId: string;
    status: MFAVerificationStatus;
    method: MFAMethodType;
    attempts: number;
    createdAt: Date;
    expiresAt: Date;
    completedAt?: Date;
    metadata: Record<string, unknown>;
}
/**
 * MFA recovery session interface
 */
export interface MFARecoverySession {
    sessionId: string;
    userId: string;
    status: MFAVerificationStatus;
    method: MFAMethodType;
    recoveryCode: string;
    attempts: number;
    createdAt: Date;
    expiresAt: Date;
    completedAt?: Date;
    metadata: Record<string, unknown>;
}
/**
 * MFA TOTP configuration interface
 */
export interface MFATOTPConfig {
    issuer: string;
    algorithm: string;
    digits: number;
    period: number;
    secretLength: number;
    window: number;
    preventCodeReuse: boolean;
    allowedClockSkew: number;
}
/**
 * MFA backup codes interface
 */
export interface MFABackupCodes {
    codes: string[];
    count: number;
    length: number;
    charset: string;
    hashed: boolean;
    used: string[];
    remaining: number;
}
/**
 * MFA verification attempt interface
 */
export interface MFAVerificationAttempt {
    userId: string;
    method: MFAMethodType;
    code: string;
    timestamp: Date;
    success: boolean;
    ipAddress?: string;
    userAgent?: string;
    failureReason?: string;
}
/**
 * Helper function to format TOTP issuer name
 */
export declare const formatTOTPIssuer: (issuer: string) => string;
/**
 * Helper function to validate backup code
 */
export declare const isValidBackupCode: (code: string, charset: string) => boolean;
/**
 * Helper function to get available MFA methods
 */
export declare const getAvailableMFAMethods: () => MFAMethodType[];
/**
 * Helper function to get prioritized MFA methods
 */
export declare const getPrioritizedMFAMethods: () => MFAMethodType[];
/**
 * Helper function to check if MFA is required for user
 */
export declare const isMFARequiredForUser: (userPermissions: string[]) => boolean;
/**
 * MFA constants grouped for easy access
 */
export declare const MFA_CONSTANTS: {
    readonly TOTP: {
        /**
         * TOTP issuer name displayed in authenticator apps
         * This is the organization name that users will see in their authenticator app
         */
        readonly ISSUER: "Vubon.com.bd";
        /**
         * TOTP algorithm for generating OTP codes
         * SHA1 is the most widely supported algorithm for TOTP
         */
        readonly ALGORITHM: "SHA1";
        /**
         * Number of digits in the TOTP code
         * Standard is 6 digits for most authenticator apps
         */
        readonly DIGITS: 6;
        /**
         * Time period in seconds for each TOTP code
         * 30 seconds is the standard TOTP period
         */
        readonly PERIOD: 30;
        /**
         * Length of the TOTP secret key in bytes
         * 20 bytes (160 bits) is the standard for TOTP
         */
        readonly SECRET_LENGTH: 20;
        /**
         * TOTP window size for validation
         * Number of periods to check before and after current time
         */
        readonly WINDOW: 2;
        /**
         * Whether to allow overlapping TOTP codes
         * Prevents code reuse within the same window
         */
        readonly PREVENT_CODE_REUSE: true;
        /**
         * Maximum allowed clock skew in seconds
         * Accounts for time differences between server and client
         */
        readonly ALLOWED_CLOCK_SKEW: 30;
    };
    readonly BACKUP_CODES: {
        /**
         * Number of backup codes to generate
         * Users can use these to bypass MFA if they lose access to their authenticator
         */
        readonly COUNT: 10;
        /**
         * Length of each backup code
         * 8 characters provides good security while remaining user-friendly
         */
        readonly LENGTH: 8;
        /**
         * Backup code character set
         * Alphanumeric characters excluding ambiguous characters
         */
        readonly CHARSET: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        /**
         * Whether to hash backup codes before storing
         * Provides additional security if database is compromised
         */
        readonly HASH_STORED: true;
        /**
         * Backup code usage warning threshold
         * Notify user when they have used this many backup codes
         */
        readonly USAGE_WARNING_THRESHOLD: 3;
        /**
         * Whether to regenerate backup codes on each MFA setup
         */
        readonly REGENERATE_ON_SETUP: true;
        /**
         * Maximum age of backup codes before requiring regeneration
         * 0 means no expiry
         */
        readonly MAX_AGE_DAYS: 0;
    };
    readonly VERIFICATION: {
        /**
         * Maximum number of verification attempts before lockout
         * Prevents brute force attacks on MFA codes
         */
        readonly MAX_ATTEMPTS: 3;
        /**
         * Lockout duration in minutes after exceeding max attempts
         * Gives time for the user to contact support or reset their MFA
         */
        readonly LOCKOUT_DURATION_MINUTES: 15;
        /**
         * Cooldown period in seconds between verification attempts
         * Slows down brute force attacks
         */
        readonly ATTEMPT_COOLDOWN_SECONDS: 30;
        /**
         * Time window in minutes for tracking attempts
         * Resets the attempt counter after this window
         */
        readonly ATTEMPT_WINDOW_MINUTES: 60;
        /**
         * Whether to lock out after failed attempts
         */
        readonly ENABLE_LOCKOUT: true;
        /**
         * Whether to send notifications on failed attempts
         */
        readonly NOTIFY_ON_FAILED_ATTEMPTS: true;
        /**
         * Whether to log all verification attempts
         */
        readonly LOG_ALL_ATTEMPTS: true;
    };
    readonly RECOVERY: {
        /**
         * Whether to allow MFA recovery via email
         */
        readonly ALLOW_EMAIL_RECOVERY: true;
        /**
         * Whether to allow MFA recovery via SMS
         */
        readonly ALLOW_SMS_RECOVERY: true;
        /**
         * Whether to allow MFA recovery via backup codes
         */
        readonly ALLOW_BACKUP_CODES: true;
        /**
         * Whether to allow admin-assisted recovery
         */
        readonly ALLOW_ADMIN_RECOVERY: true;
        /**
         * Whether to require additional verification for recovery
         */
        readonly REQUIRE_ADDITIONAL_VERIFICATION: true;
        /**
         * Recovery code expiry in minutes
         */
        readonly RECOVERY_CODE_EXPIRY_MINUTES: 15;
        /**
         * Maximum number of recovery attempts
         */
        readonly MAX_RECOVERY_ATTEMPTS: 3;
        /**
         * Cooldown period after failed recovery attempts
         */
        readonly RECOVERY_COOLDOWN_MINUTES: 60;
        /**
         * Whether to notify user on successful recovery
         */
        readonly NOTIFY_ON_SUCCESSFUL_RECOVERY: true;
    };
    readonly METHODS: {
        /**
         * TOTP authenticator app method
         */
        readonly AUTHENTICATOR: {
            readonly ENABLED: true;
            readonly PRIORITY: 1;
            readonly NAME: "Authenticator App";
            readonly DESCRIPTION: "Use an authenticator app like Google Authenticator or Authy";
        };
        /**
         * SMS method - sends codes via text message
         */
        readonly SMS: {
            readonly ENABLED: true;
            readonly PRIORITY: 2;
            readonly NAME: "SMS";
            readonly DESCRIPTION: "Receive codes via SMS text message";
        };
        /**
         * Email method - sends codes via email
         */
        readonly EMAIL: {
            readonly ENABLED: true;
            readonly PRIORITY: 3;
            readonly NAME: "Email";
            readonly DESCRIPTION: "Receive codes via email";
        };
        /**
         * Backup codes method
         */
        readonly BACKUP_CODES: {
            readonly ENABLED: true;
            readonly PRIORITY: 4;
            readonly NAME: "Backup Codes";
            readonly DESCRIPTION: "Use pre-generated backup codes";
        };
        /**
         * Security key method (WebAuthn)
         */
        readonly SECURITY_KEY: {
            readonly ENABLED: true;
            readonly PRIORITY: 1;
            readonly NAME: "Security Key";
            readonly DESCRIPTION: "Use hardware security key (WebAuthn)";
        };
        /**
         * Push notification method
         */
        readonly PUSH: {
            readonly ENABLED: true;
            readonly PRIORITY: 2;
            readonly NAME: "Push Notification";
            readonly DESCRIPTION: "Receive push notifications on trusted devices";
        };
        /**
         * Default method to use if no other method is set
         */
        readonly DEFAULT: "authenticator";
    };
    readonly SESSION: {
        /**
         * Whether to cache MFA status in session
         * Reduces database queries for MFA checks
         */
        readonly CACHE_STATUS: true;
        /**
         * MFA session cache duration in seconds
         */
        readonly CACHE_DURATION_SECONDS: 300;
        /**
         * Whether to require MFA on every login
         */
        readonly REQUIRE_ON_EVERY_LOGIN: false;
        /**
         * Trust duration for trusted devices in days
         */
        readonly TRUSTED_DEVICE_DURATION_DAYS: 30;
        /**
         * Whether to prompt for MFA after suspicious activity
         */
        readonly PROMPT_ON_SUSPICIOUS_ACTIVITY: true;
        /**
         * Whether to prompt for MFA on new devices
         */
        readonly PROMPT_ON_NEW_DEVICE: true;
        /**
         * Whether to prompt for MFA on new IP addresses
         */
        readonly PROMPT_ON_NEW_IP: true;
        /**
         * Whether to prompt for MFA on password change
         */
        readonly PROMPT_ON_PASSWORD_CHANGE: true;
    };
    readonly SECURITY: {
        /**
         * Whether MFA is required for all users
         */
        readonly REQUIRED_FOR_ALL: false;
        /**
         * Whether MFA is required for admin users
         */
        readonly REQUIRED_FOR_ADMIN: true;
        /**
         * Whether MFA is required for users with certain permissions
         */
        readonly REQUIRED_FOR_PERMISSIONS: string[];
        /**
         * Grace period in days before MFA becomes mandatory
         */
        readonly GRACE_PERIOD_DAYS: 7;
        /**
         * Whether to remind users to set up MFA
         */
        readonly REMIND_TO_SETUP: true;
        /**
         * Reminder interval in days
         */
        readonly REMINDER_INTERVAL_DAYS: 3;
        /**
         * Maximum reminder count before enforcement
         */
        readonly MAX_REMINDER_COUNT: 3;
        /**
         * Whether to enforce MFA on first login
         */
        readonly ENFORCE_ON_FIRST_LOGIN: true;
    };
    readonly STATUS: {
        readonly ENABLED: "enabled";
        readonly DISABLED: "disabled";
        readonly PENDING_SETUP: "pending_setup";
        readonly SETUP_IN_PROGRESS: "setup_in_progress";
        readonly LOCKED: "locked";
        readonly RECOVERY_IN_PROGRESS: "recovery_in_progress";
    };
    readonly METHOD_TYPES: {
        readonly AUTHENTICATOR: "authenticator";
        readonly SMS: "sms";
        readonly EMAIL: "email";
        readonly BACKUP_CODES: "backup_codes";
        readonly SECURITY_KEY: "security_key";
        readonly PUSH: "push";
    };
    readonly VERIFICATION_STATUS: {
        readonly PENDING: "pending";
        readonly SUCCESS: "success";
        readonly FAILED: "failed";
        readonly EXPIRED: "expired";
        readonly LOCKED: "locked";
    };
    readonly EVENTS: {
        readonly VERIFICATION_SUCCESS: "mfa.verification.success";
        readonly VERIFICATION_FAILURE: "mfa.verification.failure";
        readonly LOCKOUT_STARTED: "mfa.lockout.started";
        readonly LOCKOUT_ENDED: "mfa.lockout.ended";
        readonly SETUP_STARTED: "mfa.setup.started";
        readonly SETUP_COMPLETED: "mfa.setup.completed";
        readonly SETUP_CANCELLED: "mfa.setup.cancelled";
        readonly DISABLED: "mfa.disabled";
        readonly RECOVERY_STARTED: "mfa.recovery.started";
        readonly RECOVERY_SUCCESS: "mfa.recovery.success";
        readonly RECOVERY_FAILURE: "mfa.recovery.failure";
        readonly BACKUP_CODES_GENERATED: "mfa.backup.generated";
        readonly BACKUP_CODES_USED: "mfa.backup.used";
        readonly BACKUP_CODES_EXHAUSTED: "mfa.backup.exhausted";
        readonly METHOD_ADDED: "mfa.method.added";
        readonly METHOD_REMOVED: "mfa.method.removed";
        readonly DEVICE_TRUSTED: "mfa.device.trusted";
        readonly DEVICE_UNTRUSTED: "mfa.device.untrusted";
        readonly REMINDER_SENT: "mfa.reminder.sent";
        readonly REMINDER_DISMISSED: "mfa.reminder.dismissed";
    };
    readonly ERROR_MESSAGES: {
        readonly VERIFICATION_FAILED: "MFA verification failed. Please try again.";
        readonly MAX_ATTEMPTS_EXCEEDED: "Too many failed MFA attempts. Your account is temporarily locked.";
        readonly LOCKOUT_ACTIVE: "MFA is temporarily locked due to too many failed attempts.";
        readonly INVALID_TOTP: "Invalid TOTP code. Please check your authenticator app.";
        readonly EXPIRED_TOTP: "TOTP code has expired. Please try a new code.";
        readonly BACKUP_CODE_INVALID: "Invalid backup code. Please try again.";
        readonly BACKUP_CODE_USED: "This backup code has already been used.";
        readonly BACKUP_CODE_EXHAUSTED: "No backup codes remaining. Please regenerate backup codes.";
        readonly RECOVERY_FAILED: "MFA recovery failed. Please contact support.";
        readonly SETUP_FAILED: "MFA setup failed. Please try again.";
        readonly ALREADY_ENABLED: "MFA is already enabled for this account.";
        readonly NOT_ENABLED: "MFA is not enabled for this account.";
        readonly METHOD_NOT_SUPPORTED: "The selected MFA method is not supported.";
        readonly DEVICE_NOT_TRUSTED: "This device is not trusted. Please complete MFA verification.";
        readonly SESSION_EXPIRED: "MFA session has expired. Please start over.";
        readonly RECOVERY_CODE_EXPIRED: "Recovery code has expired. Please request a new one.";
    };
    readonly SUCCESS_MESSAGES: {
        readonly VERIFICATION_SUCCESS: "MFA verification successful.";
        readonly SETUP_SUCCESS: "MFA setup completed successfully.";
        readonly RECOVERY_SUCCESS: "MFA recovery completed successfully.";
        readonly BACKUP_CODES_GENERATED: "Backup codes generated successfully.";
        readonly BACKUP_CODES_REGENERATED: "Backup codes regenerated successfully.";
        readonly METHOD_ADDED: "MFA method added successfully.";
        readonly METHOD_REMOVED: "MFA method removed successfully.";
        readonly DEVICE_TRUSTED: "Device marked as trusted.";
        readonly DEVICE_UNTRUSTED: "Device marked as untrusted.";
    };
};
/**
 * All MFA constants for export
 */
export declare const ALL_MFA_CONSTANTS: {
    readonly VERIFICATION_SUCCESS: "MFA verification successful.";
    readonly SETUP_SUCCESS: "MFA setup completed successfully.";
    readonly RECOVERY_SUCCESS: "MFA recovery completed successfully.";
    readonly BACKUP_CODES_GENERATED: "Backup codes generated successfully.";
    readonly BACKUP_CODES_REGENERATED: "Backup codes regenerated successfully.";
    readonly METHOD_ADDED: "MFA method added successfully.";
    readonly METHOD_REMOVED: "MFA method removed successfully.";
    readonly DEVICE_TRUSTED: "Device marked as trusted.";
    readonly DEVICE_UNTRUSTED: "Device marked as untrusted.";
    readonly VERIFICATION_FAILED: "MFA verification failed. Please try again.";
    readonly MAX_ATTEMPTS_EXCEEDED: "Too many failed MFA attempts. Your account is temporarily locked.";
    readonly LOCKOUT_ACTIVE: "MFA is temporarily locked due to too many failed attempts.";
    readonly INVALID_TOTP: "Invalid TOTP code. Please check your authenticator app.";
    readonly EXPIRED_TOTP: "TOTP code has expired. Please try a new code.";
    readonly BACKUP_CODE_INVALID: "Invalid backup code. Please try again.";
    readonly BACKUP_CODE_USED: "This backup code has already been used.";
    readonly BACKUP_CODE_EXHAUSTED: "No backup codes remaining. Please regenerate backup codes.";
    readonly RECOVERY_FAILED: "MFA recovery failed. Please contact support.";
    readonly SETUP_FAILED: "MFA setup failed. Please try again.";
    readonly ALREADY_ENABLED: "MFA is already enabled for this account.";
    readonly NOT_ENABLED: "MFA is not enabled for this account.";
    readonly METHOD_NOT_SUPPORTED: "The selected MFA method is not supported.";
    readonly DEVICE_NOT_TRUSTED: "This device is not trusted. Please complete MFA verification.";
    readonly SESSION_EXPIRED: "MFA session has expired. Please start over.";
    readonly RECOVERY_CODE_EXPIRED: "Recovery code has expired. Please request a new one.";
    readonly VERIFICATION_FAILURE: "mfa.verification.failure";
    readonly LOCKOUT_STARTED: "mfa.lockout.started";
    readonly LOCKOUT_ENDED: "mfa.lockout.ended";
    readonly SETUP_STARTED: "mfa.setup.started";
    readonly SETUP_COMPLETED: "mfa.setup.completed";
    readonly SETUP_CANCELLED: "mfa.setup.cancelled";
    readonly DISABLED: "mfa.disabled";
    readonly RECOVERY_STARTED: "mfa.recovery.started";
    readonly RECOVERY_FAILURE: "mfa.recovery.failure";
    readonly BACKUP_CODES_USED: "mfa.backup.used";
    readonly BACKUP_CODES_EXHAUSTED: "mfa.backup.exhausted";
    readonly REMINDER_SENT: "mfa.reminder.sent";
    readonly REMINDER_DISMISSED: "mfa.reminder.dismissed";
    readonly PENDING: "pending";
    readonly SUCCESS: "success";
    readonly FAILED: "failed";
    readonly EXPIRED: "expired";
    readonly LOCKED: "locked";
    readonly AUTHENTICATOR: "authenticator";
    readonly SMS: "sms";
    readonly EMAIL: "email";
    readonly BACKUP_CODES: "backup_codes";
    readonly SECURITY_KEY: "security_key";
    readonly PUSH: "push";
    readonly ENABLED: "enabled";
    readonly PENDING_SETUP: "pending_setup";
    readonly SETUP_IN_PROGRESS: "setup_in_progress";
    readonly RECOVERY_IN_PROGRESS: "recovery_in_progress";
    /**
     * Whether MFA is required for all users
     */
    readonly REQUIRED_FOR_ALL: false;
    /**
     * Whether MFA is required for admin users
     */
    readonly REQUIRED_FOR_ADMIN: true;
    /**
     * Whether MFA is required for users with certain permissions
     */
    readonly REQUIRED_FOR_PERMISSIONS: string[];
    /**
     * Grace period in days before MFA becomes mandatory
     */
    readonly GRACE_PERIOD_DAYS: 7;
    /**
     * Whether to remind users to set up MFA
     */
    readonly REMIND_TO_SETUP: true;
    /**
     * Reminder interval in days
     */
    readonly REMINDER_INTERVAL_DAYS: 3;
    /**
     * Maximum reminder count before enforcement
     */
    readonly MAX_REMINDER_COUNT: 3;
    /**
     * Whether to enforce MFA on first login
     */
    readonly ENFORCE_ON_FIRST_LOGIN: true;
    /**
     * Whether to cache MFA status in session
     * Reduces database queries for MFA checks
     */
    readonly CACHE_STATUS: true;
    /**
     * MFA session cache duration in seconds
     */
    readonly CACHE_DURATION_SECONDS: 300;
    /**
     * Whether to require MFA on every login
     */
    readonly REQUIRE_ON_EVERY_LOGIN: false;
    /**
     * Trust duration for trusted devices in days
     */
    readonly TRUSTED_DEVICE_DURATION_DAYS: 30;
    /**
     * Whether to prompt for MFA after suspicious activity
     */
    readonly PROMPT_ON_SUSPICIOUS_ACTIVITY: true;
    /**
     * Whether to prompt for MFA on new devices
     */
    readonly PROMPT_ON_NEW_DEVICE: true;
    /**
     * Whether to prompt for MFA on new IP addresses
     */
    readonly PROMPT_ON_NEW_IP: true;
    /**
     * Whether to prompt for MFA on password change
     */
    readonly PROMPT_ON_PASSWORD_CHANGE: true;
    /**
     * Default method to use if no other method is set
     */
    readonly DEFAULT: "authenticator";
    /**
     * Whether to allow MFA recovery via email
     */
    readonly ALLOW_EMAIL_RECOVERY: true;
    /**
     * Whether to allow MFA recovery via SMS
     */
    readonly ALLOW_SMS_RECOVERY: true;
    /**
     * Whether to allow MFA recovery via backup codes
     */
    readonly ALLOW_BACKUP_CODES: true;
    /**
     * Whether to allow admin-assisted recovery
     */
    readonly ALLOW_ADMIN_RECOVERY: true;
    /**
     * Whether to require additional verification for recovery
     */
    readonly REQUIRE_ADDITIONAL_VERIFICATION: true;
    /**
     * Recovery code expiry in minutes
     */
    readonly RECOVERY_CODE_EXPIRY_MINUTES: 15;
    /**
     * Maximum number of recovery attempts
     */
    readonly MAX_RECOVERY_ATTEMPTS: 3;
    /**
     * Cooldown period after failed recovery attempts
     */
    readonly RECOVERY_COOLDOWN_MINUTES: 60;
    /**
     * Whether to notify user on successful recovery
     */
    readonly NOTIFY_ON_SUCCESSFUL_RECOVERY: true;
    /**
     * Maximum number of verification attempts before lockout
     * Prevents brute force attacks on MFA codes
     */
    readonly MAX_ATTEMPTS: 3;
    /**
     * Lockout duration in minutes after exceeding max attempts
     * Gives time for the user to contact support or reset their MFA
     */
    readonly LOCKOUT_DURATION_MINUTES: 15;
    /**
     * Cooldown period in seconds between verification attempts
     * Slows down brute force attacks
     */
    readonly ATTEMPT_COOLDOWN_SECONDS: 30;
    /**
     * Time window in minutes for tracking attempts
     * Resets the attempt counter after this window
     */
    readonly ATTEMPT_WINDOW_MINUTES: 60;
    /**
     * Whether to lock out after failed attempts
     */
    readonly ENABLE_LOCKOUT: true;
    /**
     * Whether to send notifications on failed attempts
     */
    readonly NOTIFY_ON_FAILED_ATTEMPTS: true;
    /**
     * Whether to log all verification attempts
     */
    readonly LOG_ALL_ATTEMPTS: true;
    /**
     * Number of backup codes to generate
     * Users can use these to bypass MFA if they lose access to their authenticator
     */
    readonly COUNT: 10;
    /**
     * Length of each backup code
     * 8 characters provides good security while remaining user-friendly
     */
    readonly LENGTH: 8;
    /**
     * Backup code character set
     * Alphanumeric characters excluding ambiguous characters
     */
    readonly CHARSET: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    /**
     * Whether to hash backup codes before storing
     * Provides additional security if database is compromised
     */
    readonly HASH_STORED: true;
    /**
     * Backup code usage warning threshold
     * Notify user when they have used this many backup codes
     */
    readonly USAGE_WARNING_THRESHOLD: 3;
    /**
     * Whether to regenerate backup codes on each MFA setup
     */
    readonly REGENERATE_ON_SETUP: true;
    /**
     * Maximum age of backup codes before requiring regeneration
     * 0 means no expiry
     */
    readonly MAX_AGE_DAYS: 0;
    /**
     * TOTP issuer name displayed in authenticator apps
     * This is the organization name that users will see in their authenticator app
     */
    readonly ISSUER: "Vubon.com.bd";
    /**
     * TOTP algorithm for generating OTP codes
     * SHA1 is the most widely supported algorithm for TOTP
     */
    readonly ALGORITHM: "SHA1";
    /**
     * Number of digits in the TOTP code
     * Standard is 6 digits for most authenticator apps
     */
    readonly DIGITS: 6;
    /**
     * Time period in seconds for each TOTP code
     * 30 seconds is the standard TOTP period
     */
    readonly PERIOD: 30;
    /**
     * Length of the TOTP secret key in bytes
     * 20 bytes (160 bits) is the standard for TOTP
     */
    readonly SECRET_LENGTH: 20;
    /**
     * TOTP window size for validation
     * Number of periods to check before and after current time
     */
    readonly WINDOW: 2;
    /**
     * Whether to allow overlapping TOTP codes
     * Prevents code reuse within the same window
     */
    readonly PREVENT_CODE_REUSE: true;
    /**
     * Maximum allowed clock skew in seconds
     * Accounts for time differences between server and client
     */
    readonly ALLOWED_CLOCK_SKEW: 30;
};
//# sourceMappingURL=mfa.constants.d.ts.map
/**
 * User Activity Constants
 * All possible user activity-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User activity types
 * Types of activities a user can perform
 */
export const USER_ACTIVITY_TYPE = {
  /** Login activity */
  LOGIN: 'login',
  /** Logout activity */
  LOGOUT: 'logout',
  /** Registration activity */
  REGISTRATION: 'registration',
  /** Profile update activity */
  PROFILE_UPDATE: 'profile_update',
  /** Password change activity */
  PASSWORD_CHANGE: 'password_change',
  /** Email verification activity */
  EMAIL_VERIFICATION: 'email_verification',
  /** Phone verification activity */
  PHONE_VERIFICATION: 'phone_verification',
  /** KYC submission activity */
  KYC_SUBMISSION: 'kyc_submission',
  /** KYC update activity */
  KYC_UPDATE: 'kyc_update',
  /** Document upload activity */
  DOCUMENT_UPLOAD: 'document_upload',
  /** Document delete activity */
  DOCUMENT_DELETE: 'document_delete',
  /** Address add activity */
  ADDRESS_ADD: 'address_add',
  /** Address update activity */
  ADDRESS_UPDATE: 'address_update',
  /** Address delete activity */
  ADDRESS_DELETE: 'address_delete',
  /** Contact add activity */
  CONTACT_ADD: 'contact_add',
  /** Contact update activity */
  CONTACT_UPDATE: 'contact_update',
  /** Contact delete activity */
  CONTACT_DELETE: 'contact_delete',
  /** Preference update activity */
  PREFERENCE_UPDATE: 'preference_update',
  /** Settings update activity */
  SETTINGS_UPDATE: 'settings_update',
  /** Device add activity */
  DEVICE_ADD: 'device_add',
  /** Device remove activity */
  DEVICE_REMOVE: 'device_remove',
  /** Session start activity */
  SESSION_START: 'session_start',
  /** Session end activity */
  SESSION_END: 'session_end',
  /** Two-factor enable activity */
  TWO_FA_ENABLE: 'two_fa_enable',
  /** Two-factor disable activity */
  TWO_FA_DISABLE: 'two_fa_disable',
  /** Subscription create activity */
  SUBSCRIPTION_CREATE: 'subscription_create',
  /** Subscription cancel activity */
  SUBSCRIPTION_CANCEL: 'subscription_cancel',
  /** Subscription renew activity */
  SUBSCRIPTION_RENEW: 'subscription_renew',
  /** Payment success activity */
  PAYMENT_SUCCESS: 'payment_success',
  /** Payment failed activity */
  PAYMENT_FAILED: 'payment_failed',
  /** Export data activity */
  EXPORT_DATA: 'export_data',
  /** Account delete activity */
  ACCOUNT_DELETE: 'account_delete',
  /** Account restore activity */
  ACCOUNT_RESTORE: 'account_restore',
  /** Account lock activity */
  ACCOUNT_LOCK: 'account_lock',
  /** Account unlock activity */
  ACCOUNT_UNLOCK: 'account_unlock',
  /** Security alert activity */
  SECURITY_ALERT: 'security_alert',
  /** Suspicious activity detected */
  SUSPICIOUS_DETECTED: 'suspicious_detected',
  /** API access activity */
  API_ACCESS: 'api_access',
  /** Webhook activity */
  WEBHOOK: 'webhook',
} as const;

/**
 * User activity status
 * Status of user activities
 */
export const USER_ACTIVITY_STATUS = {
  /** Activity is completed */
  COMPLETED: STATUS.COMPLETED,
  /** Activity is in progress */
  IN_PROGRESS: 'in_progress',
  /** Activity is pending */
  PENDING: STATUS.PENDING,
  /** Activity has failed */
  FAILED: STATUS.FAILED,
  /** Activity has been cancelled */
  CANCELLED: STATUS.CANCELLED,
  /** Activity is being processed */
  PROCESSING: STATUS.PROCESSING,
  /** Activity is on hold */
  ON_HOLD: STATUS.ON_HOLD,
  /** Activity is scheduled */
  SCHEDULED: STATUS.SCHEDULED,
  /** Activity has expired */
  EXPIRED: STATUS.EXPIRED,
} as const;

/**
 * User activity category
 * Categories of user activities
 */
export const USER_ACTIVITY_CATEGORY = {
  /** Authentication activities */
  AUTHENTICATION: 'authentication',
  /** Profile activities */
  PROFILE: 'profile',
  /** Verification activities */
  VERIFICATION: 'verification',
  /** Document activities */
  DOCUMENT: 'document',
  /** Address activities */
  ADDRESS: 'address',
  /** Contact activities */
  CONTACT: 'contact',
  /** Preference activities */
  PREFERENCE: 'preference',
  /** Settings activities */
  SETTINGS: 'settings',
  /** Device activities */
  DEVICE: 'device',
  /** Session activities */
  SESSION: 'session',
  /** Security activities */
  SECURITY: 'security',
  /** Subscription activities */
  SUBSCRIPTION: 'subscription',
  /** Payment activities */
  PAYMENT: 'payment',
  /** Data activities */
  DATA: 'data',
  /** Account activities */
  ACCOUNT: 'account',
  /** API activities */
  API: 'api',
} as const;

/**
 * User activity severity
 * Severity levels of user activities
 */
export const USER_ACTIVITY_SEVERITY = {
  /** Informational */
  INFO: 'info',
  /** Low severity */
  LOW: 'low',
  /** Medium severity */
  MEDIUM: 'medium',
  /** High severity */
  HIGH: 'high',
  /** Critical severity */
  CRITICAL: 'critical',
} as const;

/**
 * User activity labels
 * Human-readable labels for UI
 */
export const USER_ACTIVITY_TYPE_LABELS: Record<string, string> = {
  [USER_ACTIVITY_TYPE.LOGIN]: 'User Login',
  [USER_ACTIVITY_TYPE.LOGOUT]: 'User Logout',
  [USER_ACTIVITY_TYPE.REGISTRATION]: 'User Registration',
  [USER_ACTIVITY_TYPE.PROFILE_UPDATE]: 'Profile Updated',
  [USER_ACTIVITY_TYPE.PASSWORD_CHANGE]: 'Password Changed',
  [USER_ACTIVITY_TYPE.EMAIL_VERIFICATION]: 'Email Verified',
  [USER_ACTIVITY_TYPE.PHONE_VERIFICATION]: 'Phone Verified',
  [USER_ACTIVITY_TYPE.KYC_SUBMISSION]: 'KYC Submitted',
  [USER_ACTIVITY_TYPE.KYC_UPDATE]: 'KYC Updated',
  [USER_ACTIVITY_TYPE.DOCUMENT_UPLOAD]: 'Document Uploaded',
  [USER_ACTIVITY_TYPE.DOCUMENT_DELETE]: 'Document Deleted',
  [USER_ACTIVITY_TYPE.ADDRESS_ADD]: 'Address Added',
  [USER_ACTIVITY_TYPE.ADDRESS_UPDATE]: 'Address Updated',
  [USER_ACTIVITY_TYPE.ADDRESS_DELETE]: 'Address Deleted',
  [USER_ACTIVITY_TYPE.CONTACT_ADD]: 'Contact Added',
  [USER_ACTIVITY_TYPE.CONTACT_UPDATE]: 'Contact Updated',
  [USER_ACTIVITY_TYPE.CONTACT_DELETE]: 'Contact Deleted',
  [USER_ACTIVITY_TYPE.PREFERENCE_UPDATE]: 'Preferences Updated',
  [USER_ACTIVITY_TYPE.SETTINGS_UPDATE]: 'Settings Updated',
  [USER_ACTIVITY_TYPE.DEVICE_ADD]: 'Device Added',
  [USER_ACTIVITY_TYPE.DEVICE_REMOVE]: 'Device Removed',
  [USER_ACTIVITY_TYPE.SESSION_START]: 'Session Started',
  [USER_ACTIVITY_TYPE.SESSION_END]: 'Session Ended',
  [USER_ACTIVITY_TYPE.TWO_FA_ENABLE]: '2FA Enabled',
  [USER_ACTIVITY_TYPE.TWO_FA_DISABLE]: '2FA Disabled',
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CREATE]: 'Subscription Created',
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CANCEL]: 'Subscription Cancelled',
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_RENEW]: 'Subscription Renewed',
  [USER_ACTIVITY_TYPE.PAYMENT_SUCCESS]: 'Payment Successful',
  [USER_ACTIVITY_TYPE.PAYMENT_FAILED]: 'Payment Failed',
  [USER_ACTIVITY_TYPE.EXPORT_DATA]: 'Data Exported',
  [USER_ACTIVITY_TYPE.ACCOUNT_DELETE]: 'Account Deleted',
  [USER_ACTIVITY_TYPE.ACCOUNT_RESTORE]: 'Account Restored',
  [USER_ACTIVITY_TYPE.ACCOUNT_LOCK]: 'Account Locked',
  [USER_ACTIVITY_TYPE.ACCOUNT_UNLOCK]: 'Account Unlocked',
  [USER_ACTIVITY_TYPE.SECURITY_ALERT]: 'Security Alert',
  [USER_ACTIVITY_TYPE.SUSPICIOUS_DETECTED]: 'Suspicious Activity Detected',
  [USER_ACTIVITY_TYPE.API_ACCESS]: 'API Access',
  [USER_ACTIVITY_TYPE.WEBHOOK]: 'Webhook Triggered',
};

/**
 * User activity status labels
 */
export const USER_ACTIVITY_STATUS_LABELS: Record<string, string> = {
  [USER_ACTIVITY_STATUS.COMPLETED]: 'Completed',
  [USER_ACTIVITY_STATUS.IN_PROGRESS]: 'In Progress',
  [USER_ACTIVITY_STATUS.PENDING]: 'Pending',
  [USER_ACTIVITY_STATUS.FAILED]: 'Failed',
  [USER_ACTIVITY_STATUS.CANCELLED]: 'Cancelled',
  [USER_ACTIVITY_STATUS.PROCESSING]: 'Processing',
  [USER_ACTIVITY_STATUS.ON_HOLD]: 'On Hold',
  [USER_ACTIVITY_STATUS.SCHEDULED]: 'Scheduled',
  [USER_ACTIVITY_STATUS.EXPIRED]: 'Expired',
};

/**
 * User activity category labels
 */
export const USER_ACTIVITY_CATEGORY_LABELS: Record<string, string> = {
  [USER_ACTIVITY_CATEGORY.AUTHENTICATION]: 'Authentication',
  [USER_ACTIVITY_CATEGORY.PROFILE]: 'Profile Activities',
  [USER_ACTIVITY_CATEGORY.VERIFICATION]: 'Verification Activities',
  [USER_ACTIVITY_CATEGORY.DOCUMENT]: 'Document Activities',
  [USER_ACTIVITY_CATEGORY.ADDRESS]: 'Address Activities',
  [USER_ACTIVITY_CATEGORY.CONTACT]: 'Contact Activities',
  [USER_ACTIVITY_CATEGORY.PREFERENCE]: 'Preference Activities',
  [USER_ACTIVITY_CATEGORY.SETTINGS]: 'Settings Activities',
  [USER_ACTIVITY_CATEGORY.DEVICE]: 'Device Activities',
  [USER_ACTIVITY_CATEGORY.SESSION]: 'Session Activities',
  [USER_ACTIVITY_CATEGORY.SECURITY]: 'Security Activities',
  [USER_ACTIVITY_CATEGORY.SUBSCRIPTION]: 'Subscription Activities',
  [USER_ACTIVITY_CATEGORY.PAYMENT]: 'Payment Activities',
  [USER_ACTIVITY_CATEGORY.DATA]: 'Data Activities',
  [USER_ACTIVITY_CATEGORY.ACCOUNT]: 'Account Activities',
  [USER_ACTIVITY_CATEGORY.API]: 'API Activities',
};

/**
 * User activity severity labels
 */
export const USER_ACTIVITY_SEVERITY_LABELS: Record<string, string> = {
  [USER_ACTIVITY_SEVERITY.INFO]: 'Informational',
  [USER_ACTIVITY_SEVERITY.LOW]: 'Low',
  [USER_ACTIVITY_SEVERITY.MEDIUM]: 'Medium',
  [USER_ACTIVITY_SEVERITY.HIGH]: 'High',
  [USER_ACTIVITY_SEVERITY.CRITICAL]: 'Critical',
};

/**
 * Check if user activity type is valid
 */
export function isValidUserActivityType(type: string): boolean {
  return Object.values(USER_ACTIVITY_TYPE).includes(
    type as (typeof USER_ACTIVITY_TYPE)[keyof typeof USER_ACTIVITY_TYPE]
  );
}

/**
 * Check if user activity status is valid
 */
export function isValidUserActivityStatus(status: string): boolean {
  return Object.values(USER_ACTIVITY_STATUS).includes(
    status as (typeof USER_ACTIVITY_STATUS)[keyof typeof USER_ACTIVITY_STATUS]
  );
}

/**
 * Check if user activity category is valid
 */
export function isValidUserActivityCategory(category: string): boolean {
  return Object.values(USER_ACTIVITY_CATEGORY).includes(
    category as (typeof USER_ACTIVITY_CATEGORY)[keyof typeof USER_ACTIVITY_CATEGORY]
  );
}

/**
 * Check if user activity severity is valid
 */
export function isValidUserActivitySeverity(severity: string): boolean {
  return Object.values(USER_ACTIVITY_SEVERITY).includes(
    severity as (typeof USER_ACTIVITY_SEVERITY)[keyof typeof USER_ACTIVITY_SEVERITY]
  );
}

/**
 * Get user activity type label
 */
export function getUserActivityTypeLabel(type: string): string {
  return USER_ACTIVITY_TYPE_LABELS[type] || type;
}

/**
 * Get user activity status label
 */
export function getUserActivityStatusLabel(status: string): string {
  return USER_ACTIVITY_STATUS_LABELS[status] || status;
}

/**
 * Get user activity category label
 */
export function getUserActivityCategoryLabel(category: string): string {
  return USER_ACTIVITY_CATEGORY_LABELS[category] || category;
}

/**
 * Get user activity severity label
 */
export function getUserActivitySeverityLabel(severity: string): string {
  return USER_ACTIVITY_SEVERITY_LABELS[severity] || severity;
}

/**
 * Get activity category from activity type
 */
export const USER_ACTIVITY_TYPE_CATEGORY_MAP: Record<string, string> = {
  [USER_ACTIVITY_TYPE.LOGIN]: USER_ACTIVITY_CATEGORY.AUTHENTICATION,
  [USER_ACTIVITY_TYPE.LOGOUT]: USER_ACTIVITY_CATEGORY.AUTHENTICATION,
  [USER_ACTIVITY_TYPE.REGISTRATION]: USER_ACTIVITY_CATEGORY.AUTHENTICATION,
  [USER_ACTIVITY_TYPE.PROFILE_UPDATE]: USER_ACTIVITY_CATEGORY.PROFILE,
  [USER_ACTIVITY_TYPE.PASSWORD_CHANGE]: USER_ACTIVITY_CATEGORY.SECURITY,
  [USER_ACTIVITY_TYPE.EMAIL_VERIFICATION]: USER_ACTIVITY_CATEGORY.VERIFICATION,
  [USER_ACTIVITY_TYPE.PHONE_VERIFICATION]: USER_ACTIVITY_CATEGORY.VERIFICATION,
  [USER_ACTIVITY_TYPE.KYC_SUBMISSION]: USER_ACTIVITY_CATEGORY.VERIFICATION,
  [USER_ACTIVITY_TYPE.KYC_UPDATE]: USER_ACTIVITY_CATEGORY.VERIFICATION,
  [USER_ACTIVITY_TYPE.DOCUMENT_UPLOAD]: USER_ACTIVITY_CATEGORY.DOCUMENT,
  [USER_ACTIVITY_TYPE.DOCUMENT_DELETE]: USER_ACTIVITY_CATEGORY.DOCUMENT,
  [USER_ACTIVITY_TYPE.ADDRESS_ADD]: USER_ACTIVITY_CATEGORY.ADDRESS,
  [USER_ACTIVITY_TYPE.ADDRESS_UPDATE]: USER_ACTIVITY_CATEGORY.ADDRESS,
  [USER_ACTIVITY_TYPE.ADDRESS_DELETE]: USER_ACTIVITY_CATEGORY.ADDRESS,
  [USER_ACTIVITY_TYPE.CONTACT_ADD]: USER_ACTIVITY_CATEGORY.CONTACT,
  [USER_ACTIVITY_TYPE.CONTACT_UPDATE]: USER_ACTIVITY_CATEGORY.CONTACT,
  [USER_ACTIVITY_TYPE.CONTACT_DELETE]: USER_ACTIVITY_CATEGORY.CONTACT,
  [USER_ACTIVITY_TYPE.PREFERENCE_UPDATE]: USER_ACTIVITY_CATEGORY.PREFERENCE,
  [USER_ACTIVITY_TYPE.SETTINGS_UPDATE]: USER_ACTIVITY_CATEGORY.SETTINGS,
  [USER_ACTIVITY_TYPE.DEVICE_ADD]: USER_ACTIVITY_CATEGORY.DEVICE,
  [USER_ACTIVITY_TYPE.DEVICE_REMOVE]: USER_ACTIVITY_CATEGORY.DEVICE,
  [USER_ACTIVITY_TYPE.SESSION_START]: USER_ACTIVITY_CATEGORY.SESSION,
  [USER_ACTIVITY_TYPE.SESSION_END]: USER_ACTIVITY_CATEGORY.SESSION,
  [USER_ACTIVITY_TYPE.TWO_FA_ENABLE]: USER_ACTIVITY_CATEGORY.SECURITY,
  [USER_ACTIVITY_TYPE.TWO_FA_DISABLE]: USER_ACTIVITY_CATEGORY.SECURITY,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CREATE]: USER_ACTIVITY_CATEGORY.SUBSCRIPTION,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CANCEL]: USER_ACTIVITY_CATEGORY.SUBSCRIPTION,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_RENEW]: USER_ACTIVITY_CATEGORY.SUBSCRIPTION,
  [USER_ACTIVITY_TYPE.PAYMENT_SUCCESS]: USER_ACTIVITY_CATEGORY.PAYMENT,
  [USER_ACTIVITY_TYPE.PAYMENT_FAILED]: USER_ACTIVITY_CATEGORY.PAYMENT,
  [USER_ACTIVITY_TYPE.EXPORT_DATA]: USER_ACTIVITY_CATEGORY.DATA,
  [USER_ACTIVITY_TYPE.ACCOUNT_DELETE]: USER_ACTIVITY_CATEGORY.ACCOUNT,
  [USER_ACTIVITY_TYPE.ACCOUNT_RESTORE]: USER_ACTIVITY_CATEGORY.ACCOUNT,
  [USER_ACTIVITY_TYPE.ACCOUNT_LOCK]: USER_ACTIVITY_CATEGORY.ACCOUNT,
  [USER_ACTIVITY_TYPE.ACCOUNT_UNLOCK]: USER_ACTIVITY_CATEGORY.ACCOUNT,
  [USER_ACTIVITY_TYPE.SECURITY_ALERT]: USER_ACTIVITY_CATEGORY.SECURITY,
  [USER_ACTIVITY_TYPE.SUSPICIOUS_DETECTED]: USER_ACTIVITY_CATEGORY.SECURITY,
  [USER_ACTIVITY_TYPE.API_ACCESS]: USER_ACTIVITY_CATEGORY.API,
  [USER_ACTIVITY_TYPE.WEBHOOK]: USER_ACTIVITY_CATEGORY.API,
};

/**
 * Get activity category from type
 */
export function getUserActivityCategoryFromType(type: string): string {
  return USER_ACTIVITY_TYPE_CATEGORY_MAP[type] || USER_ACTIVITY_CATEGORY.PROFILE;
}

/**
 * Get activity severity from type
 */
export const USER_ACTIVITY_TYPE_SEVERITY_MAP: Record<string, string> = {
  [USER_ACTIVITY_TYPE.LOGIN]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.LOGOUT]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.REGISTRATION]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.PROFILE_UPDATE]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.PASSWORD_CHANGE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.EMAIL_VERIFICATION]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.PHONE_VERIFICATION]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.KYC_SUBMISSION]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.KYC_UPDATE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.DOCUMENT_UPLOAD]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.DOCUMENT_DELETE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.ADDRESS_ADD]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.ADDRESS_UPDATE]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.ADDRESS_DELETE]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.CONTACT_ADD]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.CONTACT_UPDATE]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.CONTACT_DELETE]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.PREFERENCE_UPDATE]: USER_ACTIVITY_SEVERITY.LOW,
  [USER_ACTIVITY_TYPE.SETTINGS_UPDATE]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.DEVICE_ADD]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.DEVICE_REMOVE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.SESSION_START]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.SESSION_END]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.TWO_FA_ENABLE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.TWO_FA_DISABLE]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CREATE]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_CANCEL]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.SUBSCRIPTION_RENEW]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.PAYMENT_SUCCESS]: USER_ACTIVITY_SEVERITY.INFO,
  [USER_ACTIVITY_TYPE.PAYMENT_FAILED]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.EXPORT_DATA]: USER_ACTIVITY_SEVERITY.HIGH,
  [USER_ACTIVITY_TYPE.ACCOUNT_DELETE]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.ACCOUNT_RESTORE]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.ACCOUNT_LOCK]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.ACCOUNT_UNLOCK]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.SECURITY_ALERT]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.SUSPICIOUS_DETECTED]: USER_ACTIVITY_SEVERITY.CRITICAL,
  [USER_ACTIVITY_TYPE.API_ACCESS]: USER_ACTIVITY_SEVERITY.MEDIUM,
  [USER_ACTIVITY_TYPE.WEBHOOK]: USER_ACTIVITY_SEVERITY.MEDIUM,
};

/**
 * Get activity severity from type
 */
export function getUserActivitySeverityFromType(type: string): string {
  return USER_ACTIVITY_TYPE_SEVERITY_MAP[type] || USER_ACTIVITY_SEVERITY.INFO;
}

/**
 * Check if activity is completed
 */
export function isUserActivityCompleted(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.COMPLETED;
}

/**
 * Check if activity is in progress
 */
export function isUserActivityInProgress(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.IN_PROGRESS || status === USER_ACTIVITY_STATUS.PROCESSING;
}

/**
 * Check if activity is failed
 */
export function isUserActivityFailed(status: string): boolean {
  return status === USER_ACTIVITY_STATUS.FAILED;
}

/**
 * Get all user activity types
 */
export function getAllUserActivityTypes(): string[] {
  return Object.values(USER_ACTIVITY_TYPE);
}

/**
 * Get all user activity statuses
 */
export function getAllUserActivityStatuses(): string[] {
  return Object.values(USER_ACTIVITY_STATUS);
}

/**
 * Get all user activity categories
 */
export function getAllUserActivityCategories(): string[] {
  return Object.values(USER_ACTIVITY_CATEGORY);
}

/**
 * Get all user activity severities
 */
export function getAllUserActivitySeverities(): string[] {
  return Object.values(USER_ACTIVITY_SEVERITY);
}

/**
 * Get authentication activity types
 */
export function getAuthenticationActivityTypes(): string[] {
  return [USER_ACTIVITY_TYPE.LOGIN, USER_ACTIVITY_TYPE.LOGOUT, USER_ACTIVITY_TYPE.REGISTRATION];
}

/**
 * Get security activity types
 */
export function getSecurityActivityTypes(): string[] {
  return [
    USER_ACTIVITY_TYPE.PASSWORD_CHANGE,
    USER_ACTIVITY_TYPE.TWO_FA_ENABLE,
    USER_ACTIVITY_TYPE.TWO_FA_DISABLE,
    USER_ACTIVITY_TYPE.SECURITY_ALERT,
    USER_ACTIVITY_TYPE.SUSPICIOUS_DETECTED,
  ];
}

/**
 * Get account activity types
 */
export function getAccountActivityTypes(): string[] {
  return [
    USER_ACTIVITY_TYPE.ACCOUNT_DELETE,
    USER_ACTIVITY_TYPE.ACCOUNT_RESTORE,
    USER_ACTIVITY_TYPE.ACCOUNT_LOCK,
    USER_ACTIVITY_TYPE.ACCOUNT_UNLOCK,
  ];
}

/**
 * Get subscription activity types
 */
export function getSubscriptionActivityTypes(): string[] {
  return [
    USER_ACTIVITY_TYPE.SUBSCRIPTION_CREATE,
    USER_ACTIVITY_TYPE.SUBSCRIPTION_CANCEL,
    USER_ACTIVITY_TYPE.SUBSCRIPTION_RENEW,
  ];
}

/**
 * Get payment activity types
 */
export function getPaymentActivityTypes(): string[] {
  return [USER_ACTIVITY_TYPE.PAYMENT_SUCCESS, USER_ACTIVITY_TYPE.PAYMENT_FAILED];
}

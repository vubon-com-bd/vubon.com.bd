/**
 * User Contact Constants
 * All possible user contact-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User contact types
 * Defines the types of contact information a user can have
 */
export const USER_CONTACT_TYPE = {
  /** Email address */
  EMAIL: 'email',
  /** Phone number */
  PHONE: 'phone',
  /** Mobile number */
  MOBILE: 'mobile',
  /** WhatsApp number */
  WHATSAPP: 'whatsapp',
  /** Telegram handle */
  TELEGRAM: 'telegram',
  /** Signal handle */
  SIGNAL: 'signal',
  /** Skype handle */
  SKYPE: 'skype',
  /** WeChat handle */
  WECHAT: 'wechat',
  /** LinkedIn profile */
  LINKEDIN: 'linkedin',
  /** Twitter/X handle */
  TWITTER: 'twitter',
  /** Facebook profile */
  FACEBOOK: 'facebook',
  /** Instagram handle */
  INSTAGRAM: 'instagram',
  /** YouTube channel */
  YOUTUBE: 'youtube',
  /** TikTok handle */
  TIKTOK: 'tiktok',
  /** Discord handle */
  DISCORD: 'discord',
  /** Slack handle */
  SLACK: 'slack',
  /** Other contact */
  OTHER: 'other',
} as const;

/**
 * User contact status
 * Status of user contact information
 */
export const USER_CONTACT_STATUS = {
  /** Contact is active and current */
  ACTIVE: STATUS.ACTIVE,
  /** Contact is inactive */
  INACTIVE: STATUS.INACTIVE,
  /** Contact is pending verification */
  PENDING: STATUS.PENDING,
  /** Contact is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Contact verification failed */
  VERIFICATION_FAILED: STATUS.FAILED,
  /** Contact has been removed */
  REMOVED: 'removed',
  /** Contact is primary */
  PRIMARY: 'primary',
  /** Contact is secondary */
  SECONDARY: 'secondary',
} as const;

/**
 * User contact verification status
 * Status of contact verification
 */
export const USER_CONTACT_VERIFICATION_STATUS = {
  /** Contact is not verified */
  UNVERIFIED: 'unverified',
  /** Contact is verified */
  VERIFIED: STATUS.VERIFIED,
  /** Verification is pending */
  PENDING: STATUS.PENDING,
  /** Verification has failed */
  FAILED: STATUS.FAILED,
  /** Verification requires manual review */
  REQUIRES_REVIEW: 'requires_review',
  /** Verified by admin */
  ADMIN_VERIFIED: 'admin_verified',
  /** Self-verified */
  SELF_VERIFIED: 'self_verified',
  /** Verified via OTP */
  OTP_VERIFIED: 'otp_verified',
  /** Verified via magic link */
  MAGIC_LINK_VERIFIED: 'magic_link_verified',
} as const;

/**
 * User contact label types
 * Labels for different contact fields
 */
export const USER_CONTACT_LABEL = {
  /** Personal email */
  PERSONAL: 'personal',
  /** Work email */
  WORK: 'work',
  /** Home phone */
  HOME: 'home',
  /** Work phone */
  WORK_PHONE: 'work_phone',
  /** Mobile phone */
  MOBILE: 'mobile',
  /** Emergency contact */
  EMERGENCY: 'emergency',
  /** Primary contact */
  PRIMARY: 'primary',
  /** Secondary contact */
  SECONDARY: 'secondary',
} as const;

/**
 * User contact method types
 * Methods of contact
 */
export const USER_CONTACT_METHOD = {
  /** Email */
  EMAIL: 'email',
  /** SMS */
  SMS: 'sms',
  /** Phone call */
  PHONE_CALL: 'phone_call',
  /** Push notification */
  PUSH: 'push',
  /** In-app message */
  IN_APP: 'in_app',
  /** Postal mail */
  POSTAL: 'postal',
  /** WhatsApp */
  WHATSAPP: 'whatsapp',
  /** Telegram */
  TELEGRAM: 'telegram',
  /** Signal */
  SIGNAL: 'signal',
} as const;

/**
 * User contact status labels
 * Human-readable labels for UI
 */
export const USER_CONTACT_TYPE_LABELS: Record<string, string> = {
  [USER_CONTACT_TYPE.EMAIL]: 'Email',
  [USER_CONTACT_TYPE.PHONE]: 'Phone',
  [USER_CONTACT_TYPE.MOBILE]: 'Mobile',
  [USER_CONTACT_TYPE.WHATSAPP]: 'WhatsApp',
  [USER_CONTACT_TYPE.TELEGRAM]: 'Telegram',
  [USER_CONTACT_TYPE.SIGNAL]: 'Signal',
  [USER_CONTACT_TYPE.SKYPE]: 'Skype',
  [USER_CONTACT_TYPE.WECHAT]: 'WeChat',
  [USER_CONTACT_TYPE.LINKEDIN]: 'LinkedIn',
  [USER_CONTACT_TYPE.TWITTER]: 'Twitter / X',
  [USER_CONTACT_TYPE.FACEBOOK]: 'Facebook',
  [USER_CONTACT_TYPE.INSTAGRAM]: 'Instagram',
  [USER_CONTACT_TYPE.YOUTUBE]: 'YouTube',
  [USER_CONTACT_TYPE.TIKTOK]: 'TikTok',
  [USER_CONTACT_TYPE.DISCORD]: 'Discord',
  [USER_CONTACT_TYPE.SLACK]: 'Slack',
  [USER_CONTACT_TYPE.OTHER]: 'Other',
};

/**
 * User contact status labels
 */
export const USER_CONTACT_STATUS_LABELS: Record<string, string> = {
  [USER_CONTACT_STATUS.ACTIVE]: 'Active',
  [USER_CONTACT_STATUS.INACTIVE]: 'Inactive',
  [USER_CONTACT_STATUS.PENDING]: 'Pending',
  [USER_CONTACT_STATUS.VERIFIED]: 'Verified',
  [USER_CONTACT_STATUS.VERIFICATION_FAILED]: 'Verification Failed',
  [USER_CONTACT_STATUS.REMOVED]: 'Removed',
  [USER_CONTACT_STATUS.PRIMARY]: 'Primary',
  [USER_CONTACT_STATUS.SECONDARY]: 'Secondary',
};

/**
 * User contact verification status labels
 */
export const USER_CONTACT_VERIFICATION_STATUS_LABELS: Record<string, string> = {
  [USER_CONTACT_VERIFICATION_STATUS.UNVERIFIED]: 'Unverified',
  [USER_CONTACT_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_CONTACT_VERIFICATION_STATUS.PENDING]: 'Verification Pending',
  [USER_CONTACT_VERIFICATION_STATUS.FAILED]: 'Verification Failed',
  [USER_CONTACT_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Requires Review',
  [USER_CONTACT_VERIFICATION_STATUS.ADMIN_VERIFIED]: 'Admin Verified',
  [USER_CONTACT_VERIFICATION_STATUS.SELF_VERIFIED]: 'Self Verified',
  [USER_CONTACT_VERIFICATION_STATUS.OTP_VERIFIED]: 'OTP Verified',
  [USER_CONTACT_VERIFICATION_STATUS.MAGIC_LINK_VERIFIED]: 'Magic Link Verified',
};

/**
 * User contact label labels
 */
export const USER_CONTACT_LABEL_LABELS: Record<string, string> = {
  [USER_CONTACT_LABEL.PERSONAL]: 'Personal',
  [USER_CONTACT_LABEL.WORK]: 'Work',
  [USER_CONTACT_LABEL.HOME]: 'Home',
  [USER_CONTACT_LABEL.WORK_PHONE]: 'Work Phone',
  [USER_CONTACT_LABEL.MOBILE]: 'Mobile',
  [USER_CONTACT_LABEL.EMERGENCY]: 'Emergency',
  [USER_CONTACT_LABEL.PRIMARY]: 'Primary',
  [USER_CONTACT_LABEL.SECONDARY]: 'Secondary',
};

/**
 * User contact method labels
 */
export const USER_CONTACT_METHOD_LABELS: Record<string, string> = {
  [USER_CONTACT_METHOD.EMAIL]: 'Email',
  [USER_CONTACT_METHOD.SMS]: 'SMS',
  [USER_CONTACT_METHOD.PHONE_CALL]: 'Phone Call',
  [USER_CONTACT_METHOD.PUSH]: 'Push Notification',
  [USER_CONTACT_METHOD.IN_APP]: 'In-App Message',
  [USER_CONTACT_METHOD.POSTAL]: 'Postal Mail',
  [USER_CONTACT_METHOD.WHATSAPP]: 'WhatsApp',
  [USER_CONTACT_METHOD.TELEGRAM]: 'Telegram',
  [USER_CONTACT_METHOD.SIGNAL]: 'Signal',
};

/**
 * Check if user contact type is valid
 */
export function isValidUserContactType(type: string): boolean {
  return Object.values(USER_CONTACT_TYPE).includes(
    type as (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE]
  );
}

/**
 * Check if user contact status is valid
 */
export function isValidUserContactStatus(status: string): boolean {
  return Object.values(USER_CONTACT_STATUS).includes(
    status as (typeof USER_CONTACT_STATUS)[keyof typeof USER_CONTACT_STATUS]
  );
}

/**
 * Check if user contact verification status is valid
 */
export function isValidUserContactVerificationStatus(status: string): boolean {
  return Object.values(USER_CONTACT_VERIFICATION_STATUS).includes(
    status as (typeof USER_CONTACT_VERIFICATION_STATUS)[keyof typeof USER_CONTACT_VERIFICATION_STATUS]
  );
}

/**
 * Check if user contact method is valid
 */
export function isValidUserContactMethod(method: string): boolean {
  return Object.values(USER_CONTACT_METHOD).includes(
    method as (typeof USER_CONTACT_METHOD)[keyof typeof USER_CONTACT_METHOD]
  );
}

/**
 * Get user contact type label
 */
export function getUserContactTypeLabel(type: string): string {
  return USER_CONTACT_TYPE_LABELS[type] || type;
}

/**
 * Get user contact status label
 */
export function getUserContactStatusLabel(status: string): string {
  return USER_CONTACT_STATUS_LABELS[status] || status;
}

/**
 * Get user contact verification status label
 */
export function getUserContactVerificationStatusLabel(status: string): string {
  return USER_CONTACT_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user contact label label
 */
export function getUserContactLabelLabel(label: string): string {
  return USER_CONTACT_LABEL_LABELS[label] || label;
}

/**
 * Get user contact method label
 */
export function getUserContactMethodLabel(method: string): string {
  return USER_CONTACT_METHOD_LABELS[method] || method;
}

/**
 * Check if contact is active
 */
export function isUserContactActive(status: string): boolean {
  return (
    status === USER_CONTACT_STATUS.ACTIVE ||
    status === USER_CONTACT_STATUS.VERIFIED ||
    status === USER_CONTACT_STATUS.PRIMARY
  );
}

/**
 * Check if contact is verified
 */
export function isUserContactVerified(status: string): boolean {
  return (
    status === USER_CONTACT_STATUS.VERIFIED ||
    status === USER_CONTACT_VERIFICATION_STATUS.VERIFIED ||
    status === USER_CONTACT_VERIFICATION_STATUS.ADMIN_VERIFIED ||
    status === USER_CONTACT_VERIFICATION_STATUS.SELF_VERIFIED ||
    status === USER_CONTACT_VERIFICATION_STATUS.OTP_VERIFIED ||
    status === USER_CONTACT_VERIFICATION_STATUS.MAGIC_LINK_VERIFIED
  );
}

/**
 * Check if contact is primary
 */
export function isUserContactPrimary(status: string): boolean {
  return status === USER_CONTACT_STATUS.PRIMARY;
}

/**
 * Check if contact is email
 */
export function isUserContactEmail(type: string): boolean {
  return type === USER_CONTACT_TYPE.EMAIL;
}

/**
 * Check if contact is phone
 */
export function isUserContactPhone(type: string): boolean {
  return type === USER_CONTACT_TYPE.PHONE || type === USER_CONTACT_TYPE.MOBILE;
}

/**
 * Check if contact is social media
 */
export function isUserContactSocialMedia(type: string): boolean {
  const socialMediaTypes: string[] = [
    USER_CONTACT_TYPE.LINKEDIN,
    USER_CONTACT_TYPE.TWITTER,
    USER_CONTACT_TYPE.FACEBOOK,
    USER_CONTACT_TYPE.INSTAGRAM,
    USER_CONTACT_TYPE.YOUTUBE,
    USER_CONTACT_TYPE.TIKTOK,
    USER_CONTACT_TYPE.DISCORD,
  ];
  return socialMediaTypes.includes(type);
}

/**
 * Check if contact is messaging app
 */
export function isUserContactMessaging(type: string): boolean {
  const messagingTypes: string[] = [
    USER_CONTACT_TYPE.WHATSAPP,
    USER_CONTACT_TYPE.TELEGRAM,
    USER_CONTACT_TYPE.SIGNAL,
    USER_CONTACT_TYPE.SKYPE,
    USER_CONTACT_TYPE.WECHAT,
    USER_CONTACT_TYPE.SLACK,
  ];
  return messagingTypes.includes(type);
}

/**
 * Get all user contact types
 */
export function getAllUserContactTypes(): string[] {
  return Object.values(USER_CONTACT_TYPE);
}

/**
 * Get all user contact statuses
 */
export function getAllUserContactStatuses(): string[] {
  return Object.values(USER_CONTACT_STATUS);
}

/**
 * Get all user contact verification statuses
 */
export function getAllUserContactVerificationStatuses(): string[] {
  return Object.values(USER_CONTACT_VERIFICATION_STATUS);
}

/**
 * Get all user contact methods
 */
export function getAllUserContactMethods(): string[] {
  return Object.values(USER_CONTACT_METHOD);
}

/**
 * Get email contact types
 */
export function getEmailUserContactTypes(): string[] {
  return [USER_CONTACT_TYPE.EMAIL];
}

/**
 * Get phone contact types
 */
export function getPhoneUserContactTypes(): string[] {
  return [USER_CONTACT_TYPE.PHONE, USER_CONTACT_TYPE.MOBILE];
}

/**
 * Get social media contact types
 */
export function getSocialMediaUserContactTypes(): string[] {
  return [
    USER_CONTACT_TYPE.LINKEDIN,
    USER_CONTACT_TYPE.TWITTER,
    USER_CONTACT_TYPE.FACEBOOK,
    USER_CONTACT_TYPE.INSTAGRAM,
    USER_CONTACT_TYPE.YOUTUBE,
    USER_CONTACT_TYPE.TIKTOK,
    USER_CONTACT_TYPE.DISCORD,
  ];
}

/**
 * Get messaging app contact types
 */
export function getMessagingUserContactTypes(): string[] {
  return [
    USER_CONTACT_TYPE.WHATSAPP,
    USER_CONTACT_TYPE.TELEGRAM,
    USER_CONTACT_TYPE.SIGNAL,
    USER_CONTACT_TYPE.SKYPE,
    USER_CONTACT_TYPE.WECHAT,
    USER_CONTACT_TYPE.SLACK,
  ];
}

/**
 * Contact priority levels
 */
export const USER_CONTACT_PRIORITY = {
  /** Highest priority */
  HIGH: 'high',
  /** Medium priority */
  MEDIUM: 'medium',
  /** Low priority */
  LOW: 'low',
  /** Emergency contact */
  EMERGENCY: 'emergency',
} as const;

/**
 * User contact priority labels
 */
export const USER_CONTACT_PRIORITY_LABELS: Record<string, string> = {
  [USER_CONTACT_PRIORITY.HIGH]: 'High',
  [USER_CONTACT_PRIORITY.MEDIUM]: 'Medium',
  [USER_CONTACT_PRIORITY.LOW]: 'Low',
  [USER_CONTACT_PRIORITY.EMERGENCY]: 'Emergency',
};

/**
 * Check if user contact priority is valid
 */
export function isValidUserContactPriority(priority: string): boolean {
  return Object.values(USER_CONTACT_PRIORITY).includes(
    priority as (typeof USER_CONTACT_PRIORITY)[keyof typeof USER_CONTACT_PRIORITY]
  );
}

/**
 * Get user contact priority label
 */
export function getUserContactPriorityLabel(priority: string): string {
  return USER_CONTACT_PRIORITY_LABELS[priority] || priority;
}

/**
 * Get all user contact priorities
 */
export function getAllUserContactPriorities(): string[] {
  return Object.values(USER_CONTACT_PRIORITY);
}

/**
 * Contact verification methods
 */
export const USER_CONTACT_VERIFICATION_METHOD = {
  /** Verify via OTP */
  OTP: 'otp',
  /** Verify via magic link */
  MAGIC_LINK: 'magic_link',
  /** Verify via email */
  EMAIL: 'email',
  /** Verify via SMS */
  SMS: 'sms',
  /** Verify via call */
  CALL: 'call',
  /** Verify via admin */
  ADMIN: 'admin',
  /** Self verification */
  SELF: 'self',
} as const;

/**
 * User contact verification method labels
 */
export const USER_CONTACT_VERIFICATION_METHOD_LABELS: Record<string, string> = {
  [USER_CONTACT_VERIFICATION_METHOD.OTP]: 'OTP Verification',
  [USER_CONTACT_VERIFICATION_METHOD.MAGIC_LINK]: 'Magic Link',
  [USER_CONTACT_VERIFICATION_METHOD.EMAIL]: 'Email Verification',
  [USER_CONTACT_VERIFICATION_METHOD.SMS]: 'SMS Verification',
  [USER_CONTACT_VERIFICATION_METHOD.CALL]: 'Phone Call Verification',
  [USER_CONTACT_VERIFICATION_METHOD.ADMIN]: 'Admin Verification',
  [USER_CONTACT_VERIFICATION_METHOD.SELF]: 'Self Verification',
};

/**
 * Check if user contact verification method is valid
 */
export function isValidUserContactVerificationMethod(method: string): boolean {
  return Object.values(USER_CONTACT_VERIFICATION_METHOD).includes(
    method as (typeof USER_CONTACT_VERIFICATION_METHOD)[keyof typeof USER_CONTACT_VERIFICATION_METHOD]
  );
}

/**
 * Get user contact verification method label
 */
export function getUserContactVerificationMethodLabel(method: string): string {
  return USER_CONTACT_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Get all user contact verification methods
 */
export function getAllUserContactVerificationMethods(): string[] {
  return Object.values(USER_CONTACT_VERIFICATION_METHOD);
}

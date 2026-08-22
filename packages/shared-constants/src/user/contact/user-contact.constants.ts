/**
 * User Contact Constants
 * Core user contact-related constants
 */

import { USER_CONTACT_TYPE } from './user-contact-type.constants';
import { USER_CONTACT_STATUS } from './user-contact-status.constants';

export const USER_CONTACT = {
  // Default values
  DEFAULTS: {
    STATUS: USER_CONTACT_STATUS.ACTIVE,
    TYPE: USER_CONTACT_TYPE.PHONE,
    IS_PRIMARY: false,
    IS_VERIFIED: false,
    COUNTRY_CODE: '+88',
  },

  // Contact types
  TYPES: {
    PHONE: 'phone',
    EMAIL: 'email',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    MESSENGER: 'messenger',
    VIBER: 'viber',
    IMO: 'imo',
    SKYPE: 'skype',
    WECHAT: 'wechat',
    LINE: 'line',
    SOCIAL: 'social',
    EMERGENCY: 'emergency',
    WORK: 'work',
    HOME: 'home',
    OTHER: 'other',
  },

  // Contact fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    TYPE: 'type',
    STATUS: 'status',
    VALUE: 'value',
    LABEL: 'label',
    IS_PRIMARY: 'isPrimary',
    IS_VERIFIED: 'isVerified',
    COUNTRY_CODE: 'countryCode',
    EXTENSION: 'extension',
    PROVIDER: 'provider',
    USERNAME: 'username',
    URL: 'url',
    NOTES: 'notes',
    VERIFIED_AT: 'verifiedAt',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Phone number types
  PHONE_TYPES: {
    MOBILE: 'mobile',
    LANDLINE: 'landline',
    WORK: 'work',
    HOME: 'home',
    FAX: 'fax',
    EMERGENCY: 'emergency',
  },

  // Email types
  EMAIL_TYPES: {
    PERSONAL: 'personal',
    WORK: 'work',
    BUSINESS: 'business',
    SCHOOL: 'school',
    OTHER: 'other',
  },

  // Social media providers
  SOCIAL_PROVIDERS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
    PINTEREST: 'pinterest',
    REDDIT: 'reddit',
    GITHUB: 'github',
    STACK_OVERFLOW: 'stack-overflow',
    MEDIUM: 'medium',
    DISCORD: 'discord',
    SLACK: 'slack',
  },

  // Contact status messages
  STATUS_MESSAGES: {
    [USER_CONTACT_STATUS.ACTIVE]: 'Contact is active',
    [USER_CONTACT_STATUS.INACTIVE]: 'Contact is inactive',
    [USER_CONTACT_STATUS.PENDING]: 'Contact is pending verification',
    [USER_CONTACT_STATUS.VERIFIED]: 'Contact is verified',
    [USER_CONTACT_STATUS.REJECTED]: 'Contact is rejected',
    [USER_CONTACT_STATUS.BLOCKED]: 'Contact is blocked',
    [USER_CONTACT_STATUS.DELETED]: 'Contact is deleted',
  },

  // Verification methods
  VERIFICATION_METHODS: {
    OTP: 'otp',
    EMAIL: 'email',
    SMS: 'sms',
    CALL: 'call',
    WHATSAPP: 'whatsapp',
    MANUAL: 'manual',
  },
} as const;

export type UserContactType = (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
export type UserContactPhoneType =
  (typeof USER_CONTACT.PHONE_TYPES)[keyof typeof USER_CONTACT.PHONE_TYPES];
export type UserContactEmailType =
  (typeof USER_CONTACT.EMAIL_TYPES)[keyof typeof USER_CONTACT.EMAIL_TYPES];
export type UserContactSocialProvider =
  (typeof USER_CONTACT.SOCIAL_PROVIDERS)[keyof typeof USER_CONTACT.SOCIAL_PROVIDERS];
export type UserContactVerificationMethod =
  (typeof USER_CONTACT.VERIFICATION_METHODS)[keyof typeof USER_CONTACT.VERIFICATION_METHODS];

export function getContactTypeLabel(type: UserContactType): string {
  const labels: Record<UserContactType, string> = {
    [USER_CONTACT.TYPES.PHONE]: 'Phone',
    [USER_CONTACT.TYPES.EMAIL]: 'Email',
    [USER_CONTACT.TYPES.WHATSAPP]: 'WhatsApp',
    [USER_CONTACT.TYPES.TELEGRAM]: 'Telegram',
    [USER_CONTACT.TYPES.MESSENGER]: 'Messenger',
    [USER_CONTACT.TYPES.VIBER]: 'Viber',
    [USER_CONTACT.TYPES.IMO]: 'Imo',
    [USER_CONTACT.TYPES.SKYPE]: 'Skype',
    [USER_CONTACT.TYPES.WECHAT]: 'WeChat',
    [USER_CONTACT.TYPES.LINE]: 'Line',
    [USER_CONTACT.TYPES.SOCIAL]: 'Social Media',
    [USER_CONTACT.TYPES.EMERGENCY]: 'Emergency',
    [USER_CONTACT.TYPES.WORK]: 'Work',
    [USER_CONTACT.TYPES.HOME]: 'Home',
    [USER_CONTACT.TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

export function getPhoneTypeLabel(type: UserContactPhoneType): string {
  const labels: Record<UserContactPhoneType, string> = {
    [USER_CONTACT.PHONE_TYPES.MOBILE]: 'Mobile',
    [USER_CONTACT.PHONE_TYPES.LANDLINE]: 'Landline',
    [USER_CONTACT.PHONE_TYPES.WORK]: 'Work Phone',
    [USER_CONTACT.PHONE_TYPES.HOME]: 'Home Phone',
    [USER_CONTACT.PHONE_TYPES.FAX]: 'Fax',
    [USER_CONTACT.PHONE_TYPES.EMERGENCY]: 'Emergency',
  };
  return labels[type] || 'Unknown';
}

export function getEmailTypeLabel(type: UserContactEmailType): string {
  const labels: Record<UserContactEmailType, string> = {
    [USER_CONTACT.EMAIL_TYPES.PERSONAL]: 'Personal',
    [USER_CONTACT.EMAIL_TYPES.WORK]: 'Work',
    [USER_CONTACT.EMAIL_TYPES.BUSINESS]: 'Business',
    [USER_CONTACT.EMAIL_TYPES.SCHOOL]: 'School',
    [USER_CONTACT.EMAIL_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

export function getSocialProviderLabel(provider: UserContactSocialProvider): string {
  const labels: Record<UserContactSocialProvider, string> = {
    [USER_CONTACT.SOCIAL_PROVIDERS.FACEBOOK]: 'Facebook',
    [USER_CONTACT.SOCIAL_PROVIDERS.TWITTER]: 'Twitter',
    [USER_CONTACT.SOCIAL_PROVIDERS.INSTAGRAM]: 'Instagram',
    [USER_CONTACT.SOCIAL_PROVIDERS.LINKEDIN]: 'LinkedIn',
    [USER_CONTACT.SOCIAL_PROVIDERS.YOUTUBE]: 'YouTube',
    [USER_CONTACT.SOCIAL_PROVIDERS.TIKTOK]: 'TikTok',
    [USER_CONTACT.SOCIAL_PROVIDERS.SNAPCHAT]: 'Snapchat',
    [USER_CONTACT.SOCIAL_PROVIDERS.PINTEREST]: 'Pinterest',
    [USER_CONTACT.SOCIAL_PROVIDERS.REDDIT]: 'Reddit',
    [USER_CONTACT.SOCIAL_PROVIDERS.GITHUB]: 'GitHub',
    [USER_CONTACT.SOCIAL_PROVIDERS.STACK_OVERFLOW]: 'Stack Overflow',
    [USER_CONTACT.SOCIAL_PROVIDERS.MEDIUM]: 'Medium',
    [USER_CONTACT.SOCIAL_PROVIDERS.DISCORD]: 'Discord',
    [USER_CONTACT.SOCIAL_PROVIDERS.SLACK]: 'Slack',
  };
  return labels[provider] || 'Unknown';
}

export function getVerificationMethodLabel(method: UserContactVerificationMethod): string {
  const labels: Record<UserContactVerificationMethod, string> = {
    [USER_CONTACT.VERIFICATION_METHODS.OTP]: 'OTP',
    [USER_CONTACT.VERIFICATION_METHODS.EMAIL]: 'Email',
    [USER_CONTACT.VERIFICATION_METHODS.SMS]: 'SMS',
    [USER_CONTACT.VERIFICATION_METHODS.CALL]: 'Phone Call',
    [USER_CONTACT.VERIFICATION_METHODS.WHATSAPP]: 'WhatsApp',
    [USER_CONTACT.VERIFICATION_METHODS.MANUAL]: 'Manual',
  };
  return labels[method] || 'Unknown';
}

export function getContactStatusMessage(status: string): string {
  return (
    USER_CONTACT.STATUS_MESSAGES[status as keyof typeof USER_CONTACT.STATUS_MESSAGES] ||
    'Unknown status'
  );
}

export function isPrimaryContact(contact: { isPrimary: boolean }): boolean {
  return contact.isPrimary === true;
}

export function isVerifiedContact(contact: { isVerified: boolean }): boolean {
  return contact.isVerified === true;
}

export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  // Bangladesh phone number
  return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(phone);
}

export function validateWhatsAppNumber(phone: string): boolean {
  // WhatsApp uses same validation as phone
  return validatePhoneNumber(phone);
}

export function getContactDisplayValue(contact: {
  type: UserContactType;
  value: string;
  countryCode?: string;
}): string {
  if (
    contact.type === USER_CONTACT.TYPES.PHONE ||
    contact.type === USER_CONTACT.TYPES.WHATSAPP ||
    contact.type === USER_CONTACT.TYPES.TELEGRAM
  ) {
    return `${contact.countryCode || '+88'}${contact.value}`;
  }
  return contact.value;
}

export function isContactTypePhone(type: UserContactType): boolean {
  const phoneTypes: UserContactType[] = [
    USER_CONTACT.TYPES.PHONE,
    USER_CONTACT.TYPES.WHATSAPP,
    USER_CONTACT.TYPES.TELEGRAM,
    USER_CONTACT.TYPES.VIBER,
    USER_CONTACT.TYPES.IMO,
    USER_CONTACT.TYPES.SKYPE,
  ];
  return phoneTypes.includes(type);
}

export function isContactTypeSocial(type: UserContactType): boolean {
  const socialTypes: UserContactType[] = [
    USER_CONTACT.TYPES.SOCIAL,
    USER_CONTACT.TYPES.MESSENGER,
    USER_CONTACT.TYPES.WECHAT,
    USER_CONTACT.TYPES.LINE,
  ];
  return socialTypes.includes(type);
}

export function isContactTypeEmail(type: UserContactType): boolean {
  return type === USER_CONTACT.TYPES.EMAIL;
}

export function getContactTypeCategory(type: UserContactType): string {
  if (isContactTypePhone(type)) return 'phone';
  if (isContactTypeEmail(type)) return 'email';
  if (isContactTypeSocial(type)) return 'social';
  return 'other';
}

export function getVerificationMethodByType(type: UserContactType): UserContactVerificationMethod {
  if (type === USER_CONTACT.TYPES.PHONE) {
    return USER_CONTACT.VERIFICATION_METHODS.SMS;
  }
  if (type === USER_CONTACT.TYPES.WHATSAPP) {
    return USER_CONTACT.VERIFICATION_METHODS.WHATSAPP;
  }
  if (type === USER_CONTACT.TYPES.EMAIL) {
    return USER_CONTACT.VERIFICATION_METHODS.EMAIL;
  }
  return USER_CONTACT.VERIFICATION_METHODS.OTP;
}

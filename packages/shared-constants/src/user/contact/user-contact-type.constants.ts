/**
 * User Contact Type Constants
 * Defines all possible user contact types
 */

export const USER_CONTACT_TYPE = {
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
} as const;

export type UserContactType = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];

export const USER_CONTACT_TYPE_LABELS: Record<UserContactType, string> = {
  [USER_CONTACT_TYPE.PHONE]: 'Phone',
  [USER_CONTACT_TYPE.EMAIL]: 'Email',
  [USER_CONTACT_TYPE.WHATSAPP]: 'WhatsApp',
  [USER_CONTACT_TYPE.TELEGRAM]: 'Telegram',
  [USER_CONTACT_TYPE.MESSENGER]: 'Messenger',
  [USER_CONTACT_TYPE.VIBER]: 'Viber',
  [USER_CONTACT_TYPE.IMO]: 'Imo',
  [USER_CONTACT_TYPE.SKYPE]: 'Skype',
  [USER_CONTACT_TYPE.WECHAT]: 'WeChat',
  [USER_CONTACT_TYPE.LINE]: 'Line',
  [USER_CONTACT_TYPE.SOCIAL]: 'Social Media',
  [USER_CONTACT_TYPE.EMERGENCY]: 'Emergency',
  [USER_CONTACT_TYPE.WORK]: 'Work',
  [USER_CONTACT_TYPE.HOME]: 'Home',
  [USER_CONTACT_TYPE.OTHER]: 'Other',
};

export const USER_CONTACT_TYPE_DESCRIPTIONS: Record<UserContactType, string> = {
  [USER_CONTACT_TYPE.PHONE]: 'Phone number contact',
  [USER_CONTACT_TYPE.EMAIL]: 'Email address contact',
  [USER_CONTACT_TYPE.WHATSAPP]: 'WhatsApp contact',
  [USER_CONTACT_TYPE.TELEGRAM]: 'Telegram contact',
  [USER_CONTACT_TYPE.MESSENGER]: 'Facebook Messenger contact',
  [USER_CONTACT_TYPE.VIBER]: 'Viber contact',
  [USER_CONTACT_TYPE.IMO]: 'Imo contact',
  [USER_CONTACT_TYPE.SKYPE]: 'Skype contact',
  [USER_CONTACT_TYPE.WECHAT]: 'WeChat contact',
  [USER_CONTACT_TYPE.LINE]: 'Line contact',
  [USER_CONTACT_TYPE.SOCIAL]: 'Social media profile contact',
  [USER_CONTACT_TYPE.EMERGENCY]: 'Emergency contact',
  [USER_CONTACT_TYPE.WORK]: 'Work contact',
  [USER_CONTACT_TYPE.HOME]: 'Home contact',
  [USER_CONTACT_TYPE.OTHER]: 'Other type of contact',
};

export const PHONE_CONTACT_TYPES: UserContactType[] = [
  USER_CONTACT_TYPE.PHONE,
  USER_CONTACT_TYPE.WHATSAPP,
  USER_CONTACT_TYPE.TELEGRAM,
  USER_CONTACT_TYPE.VIBER,
  USER_CONTACT_TYPE.IMO,
  USER_CONTACT_TYPE.SKYPE,
];

export const DIGITAL_CONTACT_TYPES: UserContactType[] = [
  USER_CONTACT_TYPE.EMAIL,
  USER_CONTACT_TYPE.SOCIAL,
  USER_CONTACT_TYPE.MESSENGER,
  USER_CONTACT_TYPE.WECHAT,
  USER_CONTACT_TYPE.LINE,
];

export const EMERGENCY_CONTACT_TYPES: UserContactType[] = [USER_CONTACT_TYPE.EMERGENCY];

export const LOCATION_CONTACT_TYPES: UserContactType[] = [
  USER_CONTACT_TYPE.WORK,
  USER_CONTACT_TYPE.HOME,
];

export function isPhoneContact(type: UserContactType): boolean {
  return PHONE_CONTACT_TYPES.includes(type);
}

export function isDigitalContact(type: UserContactType): boolean {
  return DIGITAL_CONTACT_TYPES.includes(type);
}

export function isEmergencyContact(type: UserContactType): boolean {
  return EMERGENCY_CONTACT_TYPES.includes(type);
}

export function isLocationContact(type: UserContactType): boolean {
  return LOCATION_CONTACT_TYPES.includes(type);
}

export function getContactTypeLabel(type: UserContactType): string {
  return USER_CONTACT_TYPE_LABELS[type] || 'Unknown';
}

export function getContactTypeDescription(type: UserContactType): string {
  return USER_CONTACT_TYPE_DESCRIPTIONS[type] || '';
}

export function getContactTypeByValue(value: string): UserContactType | null {
  const normalized = value.toLowerCase();
  const types = Object.values(USER_CONTACT_TYPE);
  return types.find((type) => type.toLowerCase() === normalized) || null;
}

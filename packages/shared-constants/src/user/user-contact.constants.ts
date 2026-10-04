export const USER_CONTACT_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  MESSENGER: 'messenger',
  SKYPE: 'skype',
  WEBSITE: 'website',
  SOCIAL: 'social',
} as const;

export const USER_CONTACT = {
  MAX_CONTACTS: 10,
  MAX_EMAILS: 3,
  MAX_PHONES: 3,
  PRIMARY_REQUIRED: true,
} as const;

export type UserContactType = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];

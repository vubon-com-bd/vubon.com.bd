import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_CONTACT } from '../../user/user-contact.constants';

export const VENDOR_CONTACT = {
  TYPES: {
    ...COMMON_TYPES,
    ...USER_CONTACT,
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    EMERGENCY: 'emergency',
    SUPPORT: 'support',
  },
  USER_CONTACT: { ...USER_CONTACT },
  CONTACT_PREFERENCES: {
    EMAIL: 'email',
    PHONE: 'phone',
    SMS: 'sms',
    WHATSAPP: 'whatsapp',
    MESSENGER: 'messenger',
  },
  MAX_CONTACTS: 10,
  MAX_PHONE_LENGTH: 15,
  MAX_EMAIL_LENGTH: 255,
} as const;

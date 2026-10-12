/**
 * User Contact Configuration
 * @module shared-config/user/contact
 */
import {
  USER_CONTACT,
  USER_CONTACT_TYPE,
} from '@vubon/shared-constants/user';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '../../common/env/env.helper.js';

export const CONTACT_CONFIG = Object.freeze({
  maxContacts: USER_CONTACT.MAX_CONTACTS,
  maxEmails: USER_CONTACT.MAX_EMAILS,
  maxPhones: USER_CONTACT.MAX_PHONES,
  primaryRequired: USER_CONTACT.PRIMARY_REQUIRED,

  allowedTypes: Object.freeze(Object.values(USER_CONTACT_TYPE)),
  emailTypes: Object.freeze([USER_CONTACT_TYPE.EMAIL]),
  phoneTypes: Object.freeze([USER_CONTACT_TYPE.PHONE, USER_CONTACT_TYPE.WHATSAPP]),

  autoVerifyEmail: getOptionalEnvBool('CONTACT_AUTO_VERIFY_EMAIL', false),
  autoVerifyPhone: getOptionalEnvBool('CONTACT_AUTO_VERIFY_PHONE', false),
  requireVerificationForPrimary: getOptionalEnvBool('CONTACT_PRIMARY_VERIFIED', true),
  cooldownSeconds: getOptionalEnvInt('CONTACT_COOLDOWN_SECONDS', 60),
  maxVerificationAttempts: getOptionalEnvInt('CONTACT_MAX_VERIFY_ATTEMPTS', 5),
  notifyOnChange: getOptionalEnvBool('CONTACT_NOTIFY_CHANGE', true),
});

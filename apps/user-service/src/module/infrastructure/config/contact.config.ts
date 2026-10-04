/**
 * Contact Config
 */
import { USER_CONTACT } from '@vubon/shared-constants/user';

export const CONTACT_CONFIG = Object.freeze({
  maxContacts: USER_CONTACT.MAX_CONTACTS,
  maxEmails: USER_CONTACT.MAX_EMAILS,
  maxPhones: USER_CONTACT.MAX_PHONES,
  primaryRequired: USER_CONTACT.PRIMARY_REQUIRED,
} as const);

export type ContactConfig = typeof CONTACT_CONFIG;

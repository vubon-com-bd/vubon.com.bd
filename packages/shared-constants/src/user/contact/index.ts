/**
 * User Contact Constants Index
 * Export all user contact-related constants and types
 */

// Core Contact Constants
export {
  USER_CONTACT,
  getContactTypeLabel as getCoreContactTypeLabel,
  getPhoneTypeLabel,
  getEmailTypeLabel,
  getSocialProviderLabel,
  getVerificationMethodLabel,
  getContactStatusMessage,
  isPrimaryContact,
  isVerifiedContact,
  validateEmail,
  validatePhoneNumber,
  validateWhatsAppNumber,
  getContactDisplayValue,
  isContactTypePhone,
  isContactTypeSocial,
  isContactTypeEmail,
  getContactTypeCategory,
  getVerificationMethodByType,
} from './user-contact.constants';

export type {
  UserContactType,
  UserContactPhoneType,
  UserContactEmailType,
  UserContactSocialProvider,
  UserContactVerificationMethod,
} from './user-contact.constants';

// Contact Type Constants
export {
  USER_CONTACT_TYPE,
  USER_CONTACT_TYPE_LABELS,
  USER_CONTACT_TYPE_DESCRIPTIONS,
  PHONE_CONTACT_TYPES,
  DIGITAL_CONTACT_TYPES,
  EMERGENCY_CONTACT_TYPES,
  LOCATION_CONTACT_TYPES,
  isPhoneContact,
  isDigitalContact,
  isEmergencyContact,
  isLocationContact,
  getContactTypeLabel,
  getContactTypeDescription,
  getContactTypeByValue,
} from './user-contact-type.constants';

export type { UserContactType as ContactType } from './user-contact-type.constants';

// Contact Status Constants
export {
  USER_CONTACT_STATUS,
  USER_CONTACT_STATUS_LABELS,
  USER_CONTACT_STATUS_COLORS,
  ACTIVE_CONTACT_STATUSES,
  INACTIVE_CONTACT_STATUSES,
  RESTRICTED_CONTACT_STATUSES,
  VERIFICATION_REQUIRED_CONTACT_STATUSES,
  VERIFIED_CONTACT_STATUSES,
  isContactActive,
  isContactRestricted,
  isContactVerified,
  isContactPending,
  canUseContact,
  getContactStatusLabel,
  getContactStatusColor,
} from './user-contact-status.constants';

export type { UserContactStatus } from './user-contact-status.constants';

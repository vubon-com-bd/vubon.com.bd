/**
 * User Contact Types
 * Type definitions for user contacts based on shared-constants
 * @module UserContactTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user contact
// ============================================================
import {
  // Core Contact Constants
  USER_CONTACT,
  UserContactType,
  UserContactPhoneType,
  UserContactEmailType,
  UserContactSocialProvider,
  UserContactVerificationMethod,
  getCoreContactTypeLabel,
  getPhoneTypeLabel,
  getEmailTypeLabel,
  getSocialProviderLabel,
  getVerificationMethodLabel,
  getContactStatusMessage,
  isPrimaryContact,
  isVerifiedContact,
  validateEmail,
  contactvalidatePhoneNumber,
  validateWhatsAppNumber,
  getContactDisplayValue,
  isContactTypePhone,
  isContactTypeSocial,
  isContactTypeEmail,
  getContactTypeCategory,
  getVerificationMethodByType,
  // Contact Type Constants
  USER_CONTACT_TYPE,
  USER_CONTACT_TYPE_LABELS,
  USER_CONTACT_TYPE_DESCRIPTIONS,
  PHONE_CONTACT_TYPES,
  DIGITAL_CONTACT_TYPES,
  EMERGENCY_CONTACT_TYPES,
  LOCATION_CONTACT_TYPES,
  ContactType,
  isPhoneContact,
  isDigitalContact,
  isEmergencyContact,
  isLocationContact,
  getContactTypeLabel,
  getContactTypeDescription,
  getContactTypeByValue,
  // Contact Status Constants
  USER_CONTACT_STATUS,
  USER_CONTACT_STATUS_LABELS,
  USER_CONTACT_STATUS_COLORS,
  ACTIVE_CONTACT_STATUSES,
  INACTIVE_CONTACT_STATUSES,
  RESTRICTED_CONTACT_STATUSES,
  VERIFICATION_REQUIRED_CONTACT_STATUSES,
  VERIFIED_CONTACT_STATUSES,
  UserContactStatus,
  isContactActive,
  isContactRestricted,
  isContactVerified,
  isContactPending,
  canUseContact,
  getContactStatusLabel,
  getContactStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Contact Extended Types
// ============================================================

/**
 * User contact with additional metadata
 */
export interface UserContactExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserContactType;
  status: UserContactStatus;
  value: string;
  label?: string;
  isPrimary: boolean;
  isVerified: boolean;
  isPhone: boolean;
  isSocial: boolean;
  isEmail: boolean;
  isActive: boolean;
  isRestricted: boolean;
  isPending: boolean;
  isDigital: boolean;
  isEmergency: boolean;
  isLocation: boolean;
  verificationMethod?: UserContactVerificationMethod;
  verifiedAt?: Date;
  metadata?: Metadata;
}

/**
 * User contact filter
 */
export interface UserContactFilter {
  userIds?: ID[];
  types?: UserContactType[];
  statuses?: UserContactStatus[];
  phoneTypes?: UserContactPhoneType[];
  emailTypes?: UserContactEmailType[];
  socialProviders?: UserContactSocialProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPrimary?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  isRestricted?: boolean;
  isPending?: boolean;
  isPhone?: boolean;
  isSocial?: boolean;
  isEmail?: boolean;
  isDigital?: boolean;
  isEmergency?: boolean;
  isLocation?: boolean;
  searchTerm?: string;
}

/**
 * User contact statistics
 */
export interface UserContactStatistics {
  userId: ID;
  totalContacts: number;
  primaryContacts: number;
  verifiedContacts: number;
  activeContacts: number;
  restrictedContacts: number;
  pendingContacts: number;
  byType: Record<UserContactType, number>;
  byStatus: Record<UserContactStatus, number>;
  byPhoneType: Record<UserContactPhoneType, number>;
  byEmailType: Record<UserContactEmailType, number>;
  bySocialProvider: Record<UserContactSocialProvider, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: UserContactType;
  mostFrequentPhoneType: UserContactPhoneType;
  mostFrequentSocialProvider: UserContactSocialProvider;
}

/**
 * User contact summary
 */
export interface UserContactSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  primary: number;
  verified: number;
  active: number;
  restricted: number;
  pending: number;
  byType: Record<UserContactType, number>;
  byStatus: Record<UserContactStatus, number>;
  byPhoneType: Record<UserContactPhoneType, number>;
  byEmailType: Record<UserContactEmailType, number>;
  bySocialProvider: Record<UserContactSocialProvider, number>;
  contactTrend: {
    date: Date;
    total: number;
    active: number;
    verified: number;
  }[];
  topTypes: {
    type: UserContactType;
    count: number;
    label: string;
  }[];
  topPhoneTypes: {
    type: UserContactPhoneType;
    count: number;
    label: string;
  }[];
}

/**
 * User contact validation
 */
export interface UserContactValidation {
  isValid: boolean;
  value: string;
  type: UserContactType;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  metadata?: Metadata;
}

/**
 * User contact history
 */
export interface UserContactHistory extends BaseEntity, Timestamp {
  id: ID;
  contactId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'delete'
    | 'restore'
    | 'verify'
    | 'unverify'
    | 'set_primary'
    | 'unset_primary';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User contact verification
 */
export interface UserContactVerification extends BaseEntity, Timestamp {
  id: ID;
  contactId: ID;
  userId: ID;
  method: UserContactVerificationMethod;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  code?: string;
  token?: string;
  verifiedAt?: Date;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Metadata;
}

/**
 * User contact export
 */
export interface UserContactExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'vcard';
  filter: UserContactFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Contact Constants
  USER_CONTACT,
  UserContactType,
  UserContactPhoneType,
  UserContactEmailType,
  UserContactSocialProvider,
  UserContactVerificationMethod,
  getCoreContactTypeLabel,
  getPhoneTypeLabel,
  getEmailTypeLabel,
  getSocialProviderLabel,
  getVerificationMethodLabel,
  getContactStatusMessage,
  isPrimaryContact,
  isVerifiedContact,
  validateEmail,
  contactvalidatePhoneNumber,
  validateWhatsAppNumber,
  getContactDisplayValue,
  isContactTypePhone,
  isContactTypeSocial,
  isContactTypeEmail,
  getContactTypeCategory,
  getVerificationMethodByType,
  // Contact Type Constants
  USER_CONTACT_TYPE,
  USER_CONTACT_TYPE_LABELS,
  USER_CONTACT_TYPE_DESCRIPTIONS,
  PHONE_CONTACT_TYPES,
  DIGITAL_CONTACT_TYPES,
  EMERGENCY_CONTACT_TYPES,
  LOCATION_CONTACT_TYPES,
  ContactType,
  isPhoneContact,
  isDigitalContact,
  isEmergencyContact,
  isLocationContact,
  getContactTypeLabel,
  getContactTypeDescription,
  getContactTypeByValue,
  // Contact Status Constants
  USER_CONTACT_STATUS,
  USER_CONTACT_STATUS_LABELS,
  USER_CONTACT_STATUS_COLORS,
  ACTIVE_CONTACT_STATUSES,
  INACTIVE_CONTACT_STATUSES,
  RESTRICTED_CONTACT_STATUSES,
  VERIFICATION_REQUIRED_CONTACT_STATUSES,
  VERIFIED_CONTACT_STATUSES,
  UserContactStatus,
  isContactActive,
  isContactRestricted,
  isContactVerified,
  isContactPending,
  canUseContact,
  getContactStatusLabel,
  getContactStatusColor,
};

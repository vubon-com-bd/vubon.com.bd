/**
 * User Contact Types Module
 * User contact information management types for the e-commerce platform
 * Handles email, phone, social contacts, and communication preferences
 */

import { UserId, Email, PhoneNumber, Timestamp } from '../auth/core-primitives.types';

/**
 * Contact Type
 * Types of contacts
 */
export type ContactType = 'email' | 'phone' | 'social' | 'emergency';

/**
 * Contact Status
 * Status of a contact
 */
export type ContactStatus =
  'active' | 'inactive' | 'pending' | 'verified' | 'unverified' | 'blocked';

/**
 * Contact Verification Status
 * Verification status of a contact
 */
export type ContactVerificationStatus = 'unverified' | 'pending' | 'verified' | 'failed';

/**
 * Contact Priority
 * Priority level of a contact
 */
export type ContactPriority = 'primary' | 'secondary' | 'tertiary';

/**
 * Contact
 * User contact information
 */
export interface Contact {
  id: string;
  userId: UserId;
  type: ContactType;
  value: string;
  label?: string;
  priority: ContactPriority;
  status: ContactStatus;
  verificationStatus: ContactVerificationStatus;
  isPublic: boolean;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  verifiedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Email Contact
 * Email contact information
 */
export interface EmailContact {
  id: string;
  userId: UserId;
  email: Email;
  label?: string;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt?: Timestamp;
  status: ContactStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Phone Contact
 * Phone contact information
 */
export interface PhoneContact {
  id: string;
  userId: UserId;
  phoneNumber: PhoneNumber;
  countryCode: string;
  label?: string;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt?: Timestamp;
  status: ContactStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Social Contact
 * Social media contact
 */
export interface SocialContact {
  id: string;
  userId: UserId;
  platform: string;
  username: string;
  profileUrl?: string;
  label?: string;
  isPrimary: boolean;
  status: ContactStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Emergency Contact
 * Emergency contact information
 */
export interface EmergencyContact {
  id: string;
  userId: UserId;
  name: string;
  relationship: string;
  phoneNumber: PhoneNumber;
  email?: Email;
  address?: string;
  priority: number;
  isPrimary: boolean;
  status: ContactStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Contact Create Request
 * Request to create contact
 */
export interface ContactCreateRequest {
  userId: UserId;
  type: ContactType;
  value: string;
  label?: string;
  priority?: ContactPriority;
  isPublic?: boolean;
  isDefault?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Contact Create Response
 * Response after contact creation
 */
export interface ContactCreateResponse {
  success: boolean;
  data?: {
    contact: Contact;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Contact Update Request
 * Request to update contact
 */
export interface ContactUpdateRequest {
  contactId: string;
  userId: UserId;
  label?: string;
  priority?: ContactPriority;
  isPublic?: boolean;
  isDefault?: boolean;
  status?: ContactStatus;
  metadata?: Record<string, unknown>;
}

/**
 * Contact Update Response
 * Response after contact update
 */
export interface ContactUpdateResponse {
  success: boolean;
  data?: {
    contact: Contact;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Contact Delete Request
 * Request to delete contact
 */
export interface ContactDeleteRequest {
  contactId: string;
  userId: UserId;
  reason?: string;
}

/**
 * Contact Delete Response
 * Response after contact deletion
 */
export interface ContactDeleteResponse {
  success: boolean;
  data?: {
    contactId: string;
    deletedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Contact Verify Request
 * Request to verify contact
 */
export interface ContactVerifyRequest {
  contactId: string;
  userId: UserId;
  verificationCode?: string;
  method: 'email' | 'sms' | 'manual';
  metadata?: Record<string, unknown>;
}

/**
 * Contact Verify Response
 * Response after contact verification
 */
export interface ContactVerifyResponse {
  success: boolean;
  data?: {
    contactId: string;
    verificationStatus: ContactVerificationStatus;
    verifiedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Contact List Request
 * Request to list contacts
 */
export interface ContactListRequest {
  userId: UserId;
  type?: ContactType[];
  status?: ContactStatus[];
  priority?: ContactPriority[];
  isDefault?: boolean;
  isVerified?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Contact List Response
 * Response after listing contacts
 */
export interface ContactListResponse {
  success: boolean;
  data?: {
    contacts: Contact[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Contact Filter
 * Filter criteria for contact queries
 */
export interface ContactFilter {
  userId?: UserId[];
  type?: ContactType[];
  status?: ContactStatus[];
  priority?: ContactPriority[];
  isDefault?: boolean;
  isVerified?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Contact Response Builder
 * Helper for building contact responses
 */
export interface ContactResponseBuilder {
  createSuccess(response: ContactCreateResponse): ContactCreateResponse;
  updateSuccess(response: ContactUpdateResponse): ContactUpdateResponse;
  deleteSuccess(response: ContactDeleteResponse): ContactDeleteResponse;
  verifySuccess(response: ContactVerifyResponse): ContactVerifyResponse;
  listSuccess(response: ContactListResponse): ContactListResponse;
  error(code: string, message: string, details?: Record<string, unknown>): ContactErrorResponse;
}

/**
 * Contact Error Response
 * Error response for contact operations
 */
export interface ContactErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Contact Constants
 * Contact-related constants
 */
export const CONTACT_TYPES = {
  EMAIL: 'email',
  PHONE: 'phone',
  SOCIAL: 'social',
  EMERGENCY: 'emergency',
} as const;

export const CONTACT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  BLOCKED: 'blocked',
} as const;

export const CONTACT_VERIFICATION_STATUS = {
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
} as const;

export const CONTACT_PRIORITY = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
} as const;

/**
 * Default Contact Configuration
 */
export const DEFAULT_CONTACT_CONFIG = {
  maxContactsPerUser: 20,
  requireVerification: true,
  allowMultiplePrimary: false,
  enableSocialContacts: true,
  enableEmergencyContacts: true,
  verificationCodeExpiry: 300, // 5 minutes
  maxVerificationAttempts: 5,
} as const;

/**
 * Contact Audit Log
 * Audit log for contact operations
 */
export interface ContactAuditLog {
  id: string;
  userId: UserId;
  contactId: string;
  operation: 'create' | 'update' | 'delete' | 'verify' | 'block' | 'unblock' | 'set_primary';
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Timestamp;
}

/**
 * Contact Statistics
 * Statistical data about contacts
 */
export interface ContactStatistics {
  totalContacts: number;
  byType: Record<ContactType, number>;
  byStatus: Record<ContactStatus, number>;
  byVerificationStatus: Record<ContactVerificationStatus, number>;
  verifiedContacts: number;
  unverifiedContacts: number;
  primaryContacts: number;
  averageContactsPerUser: number;
  timestamp: Timestamp;
}

/**
 * Contact Verification
 * Contact verification data
 */
export interface ContactVerification {
  id: string;
  contactId: string;
  userId: UserId;
  code: string;
  method: 'email' | 'sms' | 'manual';
  expiresAt: Timestamp;
  createdAt: Timestamp;
  verifiedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  isUsed: boolean;
  metadata?: Record<string, unknown>;
}

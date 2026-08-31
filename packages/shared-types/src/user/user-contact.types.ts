/**
 * User Contact Types
 * Types for user contact management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_CONTACT_TYPE,
  USER_CONTACT_VERIFICATION_STATUS,
  USER_CONTACT_LABEL,
  USER_CONTACT_METHOD,
  USER_CONTACT_PRIORITY,
  USER_CONTACT_VERIFICATION_METHOD,
  USER_CONTACT_TYPE_LABELS,
  USER_CONTACT_VERIFICATION_STATUS_LABELS,
  USER_CONTACT_LABEL_LABELS,
  USER_CONTACT_METHOD_LABELS,
  USER_CONTACT_PRIORITY_LABELS,
  USER_CONTACT_VERIFICATION_METHOD_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER CONTACT STATUS (Local definition)
// ============================================================

/**
 * User contact status
 */
export const USER_CONTACT_STATUS = {
  /** Contact is active and current */
  ACTIVE: 'active',
  /** Contact is inactive */
  INACTIVE: 'inactive',
  /** Contact is pending verification */
  PENDING: 'pending',
  /** Contact is verified */
  VERIFIED: 'verified',
  /** Contact verification failed */
  VERIFICATION_FAILED: 'verification_failed',
  /** Contact has been removed */
  REMOVED: 'removed',
  /** Contact is primary */
  PRIMARY: 'primary',
  /** Contact is secondary */
  SECONDARY: 'secondary',
} as const;

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

// ============================================================
// USER CONTACT TYPES
// ============================================================

/**
 * User contact type
 */
export type UserContactType = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];

/**
 * User contact status
 */
export type UserContactStatus = (typeof USER_CONTACT_STATUS)[keyof typeof USER_CONTACT_STATUS];

/**
 * User contact verification status
 */
export type UserContactVerificationStatus =
  (typeof USER_CONTACT_VERIFICATION_STATUS)[keyof typeof USER_CONTACT_VERIFICATION_STATUS];

/**
 * User contact label
 */
export type UserContactLabel = (typeof USER_CONTACT_LABEL)[keyof typeof USER_CONTACT_LABEL];

/**
 * User contact method
 */
export type UserContactMethod = (typeof USER_CONTACT_METHOD)[keyof typeof USER_CONTACT_METHOD];

/**
 * User contact priority
 */
export type UserContactPriority =
  (typeof USER_CONTACT_PRIORITY)[keyof typeof USER_CONTACT_PRIORITY];

/**
 * User contact verification method
 */
export type UserContactVerificationMethod =
  (typeof USER_CONTACT_VERIFICATION_METHOD)[keyof typeof USER_CONTACT_VERIFICATION_METHOD];

// ============================================================
// USER CONTACT RECORD
// ============================================================

/**
 * User contact record
 */
export interface UserContactRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Contact type */
  type: UserContactType;
  /** Contact value (email, phone number, etc.) */
  value: string;
  /** Contact status */
  status: UserContactStatus;
  /** Verification status */
  verificationStatus: UserContactVerificationStatus;
  /** Contact label */
  label: UserContactLabel;
  /** Contact priority */
  priority: UserContactPriority;
  /** Whether this is the primary contact */
  isPrimary: boolean;
  /** Whether this is verified */
  isVerified: boolean;
  /** Whether this is active */
  isActive: boolean;
  /** Verification method used */
  verificationMethod?: UserContactVerificationMethod;
  /** When the contact was added */
  addedAt: Timestamp;
  /** When the contact was verified */
  verifiedAt?: Timestamp;
  /** When the contact was last updated */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER CONTACT REQUEST
// ============================================================

/**
 * User contact create request
 */
export interface UserContactCreateRequest {
  /** User ID */
  userId: ID;
  /** Contact type */
  type: UserContactType;
  /** Contact value */
  value: string;
  /** Contact label */
  label?: UserContactLabel;
  /** Contact priority */
  priority?: UserContactPriority;
  /** Whether this is primary */
  isPrimary?: boolean;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User contact update request
 */
export interface UserContactUpdateRequest {
  /** Contact ID */
  contactId: ID;
  /** Contact value */
  value?: string;
  /** Contact label */
  label?: UserContactLabel;
  /** Contact priority */
  priority?: UserContactPriority;
  /** Whether this is primary */
  isPrimary?: boolean;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User contact verify request
 */
export interface UserContactVerifyRequest {
  /** Contact ID */
  contactId: ID;
  /** Verification method */
  method: UserContactVerificationMethod;
  /** Verification code (if applicable) */
  code?: string;
}

// ============================================================
// USER CONTACT RESPONSE
// ============================================================

/**
 * User contact response
 */
export interface UserContactResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Contact record if successful */
  contact?: UserContactRecord;
  /** Error message if failed */
  error?: string;
  /** Verification code (if applicable) */
  verificationCode?: string;
  /** Resend cooldown in seconds */
  resendCooldown?: number;
}

// ============================================================
// USER CONTACT FILTER
// ============================================================

/**
 * User contact filter
 */
export interface UserContactFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by contact type */
  type?: UserContactType | UserContactType[];
  /** Filter by contact status */
  status?: UserContactStatus | UserContactStatus[];
  /** Filter by verification status */
  verificationStatus?: UserContactVerificationStatus | UserContactVerificationStatus[];
  /** Filter by label */
  label?: UserContactLabel | UserContactLabel[];
  /** Filter by priority */
  priority?: UserContactPriority | UserContactPriority[];
  /** Filter by primary contacts only */
  primaryOnly?: boolean;
  /** Filter by verified contacts only */
  verifiedOnly?: boolean;
  /** Filter by active contacts only */
  activeOnly?: boolean;
  /** Search by value */
  search?: string;
}

// ============================================================
// USER CONTACT SUMMARY
// ============================================================

/**
 * User contact summary
 */
export interface UserContactSummary {
  /** User ID */
  userId: ID;
  /** Total contacts */
  totalContacts: number;
  /** Active contacts */
  activeContacts: number;
  /** Verified contacts */
  verifiedContacts: number;
  /** Primary contacts */
  primaryContacts: number;
  /** Contacts by type */
  contactsByType: Record<UserContactType, number>;
  /** Contacts by status */
  contactsByStatus: Record<UserContactStatus, number>;
  /** Contacts by verification status */
  contactsByVerificationStatus: Record<UserContactVerificationStatus, number>;
  /** Primary contact */
  primaryContact?: UserContactRecord;
  /** All contacts */
  contacts: UserContactRecord[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user contact type is valid
 */
export function isValidUserContactType(type: string): type is UserContactType {
  return Object.values(USER_CONTACT_TYPE).includes(type as UserContactType);
}

/**
 * Check if user contact status is valid
 */
export function isValidUserContactStatus(status: string): status is UserContactStatus {
  return Object.values(USER_CONTACT_STATUS).includes(status as UserContactStatus);
}

/**
 * Check if user contact verification status is valid
 */
export function isValidUserContactVerificationStatus(
  status: string
): status is UserContactVerificationStatus {
  return Object.values(USER_CONTACT_VERIFICATION_STATUS).includes(
    status as UserContactVerificationStatus
  );
}

/**
 * Check if user contact label is valid
 */
export function isValidUserContactLabel(label: string): label is UserContactLabel {
  return Object.values(USER_CONTACT_LABEL).includes(label as UserContactLabel);
}

/**
 * Check if user contact method is valid
 */
export function isValidUserContactMethod(method: string): method is UserContactMethod {
  return Object.values(USER_CONTACT_METHOD).includes(method as UserContactMethod);
}

/**
 * Check if user contact priority is valid
 */
export function isValidUserContactPriority(priority: string): priority is UserContactPriority {
  return Object.values(USER_CONTACT_PRIORITY).includes(priority as UserContactPriority);
}

/**
 * Check if user contact verification method is valid
 */
export function isValidUserContactVerificationMethod(
  method: string
): method is UserContactVerificationMethod {
  return Object.values(USER_CONTACT_VERIFICATION_METHOD).includes(
    method as UserContactVerificationMethod
  );
}

/**
 * Get user contact type display name
 */
export function getUserContactTypeDisplayName(type: UserContactType): string {
  return USER_CONTACT_TYPE_LABELS[type] || type;
}

/**
 * Get user contact status display name
 */
export function getUserContactStatusDisplayName(status: UserContactStatus): string {
  return USER_CONTACT_STATUS_LABELS[status] || status;
}

/**
 * Get user contact verification status display name
 */
export function getUserContactVerificationStatusDisplayName(
  status: UserContactVerificationStatus
): string {
  return USER_CONTACT_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user contact label display name
 */
export function getUserContactLabelDisplayName(label: UserContactLabel): string {
  return USER_CONTACT_LABEL_LABELS[label] || label;
}

/**
 * Get user contact method display name
 */
export function getUserContactMethodDisplayName(method: UserContactMethod): string {
  return USER_CONTACT_METHOD_LABELS[method] || method;
}

/**
 * Get user contact priority display name
 */
export function getUserContactPriorityDisplayName(priority: UserContactPriority): string {
  return USER_CONTACT_PRIORITY_LABELS[priority] || priority;
}

/**
 * Get user contact verification method display name
 */
export function getUserContactVerificationMethodDisplayName(
  method: UserContactVerificationMethod
): string {
  return USER_CONTACT_VERIFICATION_METHOD_LABELS[method] || method;
}

/**
 * Check if contact is active
 */
export function isUserContactActive(status: UserContactStatus): boolean {
  const activeStatuses: UserContactStatus[] = ['active', 'verified', 'primary'];
  return activeStatuses.includes(status);
}

/**
 * Check if contact is verified
 */
export function isUserContactVerified(verificationStatus: UserContactVerificationStatus): boolean {
  const verifiedStatuses: UserContactVerificationStatus[] = [
    'verified',
    'admin_verified',
    'self_verified',
    'otp_verified',
    'magic_link_verified',
  ];
  return verifiedStatuses.includes(verificationStatus);
}

/**
 * Check if contact is primary
 */
export function isUserContactPrimary(status: UserContactStatus): boolean {
  return status === USER_CONTACT_STATUS.PRIMARY;
}

/**
 * Check if contact is email
 */
export function isUserContactEmail(type: UserContactType): boolean {
  return type === USER_CONTACT_TYPE.EMAIL;
}

/**
 * Check if contact is phone
 */
export function isUserContactPhone(type: UserContactType): boolean {
  const phoneTypes: UserContactType[] = ['phone', 'mobile'];
  return phoneTypes.includes(type);
}

/**
 * Check if contact is social media
 */
export function isUserContactSocialMedia(type: UserContactType): boolean {
  const socialMediaTypes: UserContactType[] = [
    'linkedin',
    'twitter',
    'facebook',
    'instagram',
    'youtube',
    'tiktok',
    'discord',
  ];
  return socialMediaTypes.includes(type);
}

/**
 * Check if contact is messaging app
 */
export function isUserContactMessaging(type: UserContactType): boolean {
  const messagingTypes: UserContactType[] = [
    'whatsapp',
    'telegram',
    'signal',
    'skype',
    'wechat',
    'slack',
  ];
  return messagingTypes.includes(type);
}

/**
 * Get all user contact types
 */
export function getAllUserContactTypes(): UserContactType[] {
  return Object.values(USER_CONTACT_TYPE);
}

/**
 * Get all user contact statuses
 */
export function getAllUserContactStatuses(): UserContactStatus[] {
  return Object.values(USER_CONTACT_STATUS);
}

/**
 * Get all user contact verification statuses
 */
export function getAllUserContactVerificationStatuses(): UserContactVerificationStatus[] {
  return Object.values(USER_CONTACT_VERIFICATION_STATUS);
}

/**
 * Get all user contact methods
 */
export function getAllUserContactMethods(): UserContactMethod[] {
  return Object.values(USER_CONTACT_METHOD);
}

/**
 * Get all user contact priorities
 */
export function getAllUserContactPriorities(): UserContactPriority[] {
  return Object.values(USER_CONTACT_PRIORITY);
}

/**
 * Get all user contact verification methods
 */
export function getAllUserContactVerificationMethods(): UserContactVerificationMethod[] {
  return Object.values(USER_CONTACT_VERIFICATION_METHOD);
}

/**
 * Get email contact types
 */
export function getEmailUserContactTypes(): UserContactType[] {
  return ['email'];
}

/**
 * Get phone contact types
 */
export function getPhoneUserContactTypes(): UserContactType[] {
  return ['phone', 'mobile'];
}

/**
 * Get social media contact types
 */
export function getSocialMediaUserContactTypes(): UserContactType[] {
  return ['linkedin', 'twitter', 'facebook', 'instagram', 'youtube', 'tiktok', 'discord'];
}

/**
 * Get messaging app contact types
 */
export function getMessagingUserContactTypes(): UserContactType[] {
  return ['whatsapp', 'telegram', 'signal', 'skype', 'wechat', 'slack'];
}

/**
 * Get contact priority level
 */
export function getUserContactPriorityLevel(priority: UserContactPriority): number {
  const levels: Record<UserContactPriority, number> = {
    emergency: 1,
    high: 2,
    medium: 3,
    low: 4,
  };
  return levels[priority] || 4;
}

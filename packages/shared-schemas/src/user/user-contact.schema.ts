/**
 * User Contact Schema
 * Zod schemas for user contact management
 */

import { z } from 'zod';
import {
  USER_CONTACT_TYPE,
  USER_CONTACT_STATUS,
  USER_CONTACT_VERIFICATION_STATUS,
  USER_CONTACT_LABEL,
  USER_CONTACT_METHOD,
  USER_CONTACT_PRIORITY,
  USER_CONTACT_VERIFICATION_METHOD,
  USER_CONTACT_TYPE_LABELS,
  USER_CONTACT_STATUS_LABELS,
  USER_CONTACT_VERIFICATION_STATUS_LABELS,
  USER_CONTACT_LABEL_LABELS,
  USER_CONTACT_METHOD_LABELS,
  USER_CONTACT_PRIORITY_LABELS,
  USER_CONTACT_VERIFICATION_METHOD_LABELS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER CONTACT TYPE SCHEMAS
// ============================================================

/**
 * User contact type schema
 */
export const userContactTypeSchema = z.enum([
  USER_CONTACT_TYPE.EMAIL,
  USER_CONTACT_TYPE.PHONE,
  USER_CONTACT_TYPE.MOBILE,
  USER_CONTACT_TYPE.WHATSAPP,
  USER_CONTACT_TYPE.TELEGRAM,
  USER_CONTACT_TYPE.SIGNAL,
  USER_CONTACT_TYPE.SKYPE,
  USER_CONTACT_TYPE.WECHAT,
  USER_CONTACT_TYPE.LINKEDIN,
  USER_CONTACT_TYPE.TWITTER,
  USER_CONTACT_TYPE.FACEBOOK,
  USER_CONTACT_TYPE.INSTAGRAM,
  USER_CONTACT_TYPE.YOUTUBE,
  USER_CONTACT_TYPE.TIKTOK,
  USER_CONTACT_TYPE.DISCORD,
  USER_CONTACT_TYPE.SLACK,
  USER_CONTACT_TYPE.OTHER,
]);

/**
 * User contact status schema
 */
export const userContactStatusSchema = z.enum([
  USER_CONTACT_STATUS.ACTIVE,
  USER_CONTACT_STATUS.INACTIVE,
  USER_CONTACT_STATUS.PENDING,
  USER_CONTACT_STATUS.VERIFIED,
  USER_CONTACT_STATUS.VERIFICATION_FAILED,
  USER_CONTACT_STATUS.REMOVED,
  USER_CONTACT_STATUS.PRIMARY,
  USER_CONTACT_STATUS.SECONDARY,
]);

/**
 * User contact verification status schema
 */
export const userContactVerificationStatusSchema = z.enum([
  USER_CONTACT_VERIFICATION_STATUS.UNVERIFIED,
  USER_CONTACT_VERIFICATION_STATUS.VERIFIED,
  USER_CONTACT_VERIFICATION_STATUS.PENDING,
  USER_CONTACT_VERIFICATION_STATUS.FAILED,
  USER_CONTACT_VERIFICATION_STATUS.REQUIRES_REVIEW,
  USER_CONTACT_VERIFICATION_STATUS.ADMIN_VERIFIED,
  USER_CONTACT_VERIFICATION_STATUS.SELF_VERIFIED,
  USER_CONTACT_VERIFICATION_STATUS.OTP_VERIFIED,
  USER_CONTACT_VERIFICATION_STATUS.MAGIC_LINK_VERIFIED,
]);

/**
 * User contact label schema
 */
export const userContactLabelSchema = z.enum([
  USER_CONTACT_LABEL.PERSONAL,
  USER_CONTACT_LABEL.WORK,
  USER_CONTACT_LABEL.HOME,
  USER_CONTACT_LABEL.WORK_PHONE,
  USER_CONTACT_LABEL.MOBILE,
  USER_CONTACT_LABEL.EMERGENCY,
  USER_CONTACT_LABEL.PRIMARY,
  USER_CONTACT_LABEL.SECONDARY,
]);

/**
 * User contact method schema
 */
export const userContactMethodSchema = z.enum([
  USER_CONTACT_METHOD.EMAIL,
  USER_CONTACT_METHOD.SMS,
  USER_CONTACT_METHOD.PHONE_CALL,
  USER_CONTACT_METHOD.PUSH,
  USER_CONTACT_METHOD.IN_APP,
  USER_CONTACT_METHOD.POSTAL,
  USER_CONTACT_METHOD.WHATSAPP,
  USER_CONTACT_METHOD.TELEGRAM,
  USER_CONTACT_METHOD.SIGNAL,
]);

/**
 * User contact priority schema
 */
export const userContactPrioritySchema = z.enum([
  USER_CONTACT_PRIORITY.HIGH,
  USER_CONTACT_PRIORITY.MEDIUM,
  USER_CONTACT_PRIORITY.LOW,
  USER_CONTACT_PRIORITY.EMERGENCY,
]);

/**
 * User contact verification method schema
 */
export const userContactVerificationMethodSchema = z.enum([
  USER_CONTACT_VERIFICATION_METHOD.OTP,
  USER_CONTACT_VERIFICATION_METHOD.MAGIC_LINK,
  USER_CONTACT_VERIFICATION_METHOD.EMAIL,
  USER_CONTACT_VERIFICATION_METHOD.SMS,
  USER_CONTACT_VERIFICATION_METHOD.CALL,
  USER_CONTACT_VERIFICATION_METHOD.ADMIN,
  USER_CONTACT_VERIFICATION_METHOD.SELF,
]);

// ============================================================
// USER CONTACT RECORD SCHEMA
// ============================================================

/**
 * User contact record schema
 */
export const userContactRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: userContactTypeSchema,
  value: z.string().min(1),
  status: userContactStatusSchema,
  verificationStatus: userContactVerificationStatusSchema,
  label: userContactLabelSchema,
  priority: userContactPrioritySchema,
  isPrimary: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  verificationMethod: userContactVerificationMethodSchema.optional(),
  addedAt: timestampSchema,
  verifiedAt: timestampSchema.optional(),
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER CONTACT REQUEST SCHEMAS
// ============================================================

/**
 * User contact create request schema
 */
export const userContactCreateRequestSchema = z.object({
  userId: idSchema,
  type: userContactTypeSchema,
  value: z.string().min(1),
  label: userContactLabelSchema.optional(),
  priority: userContactPrioritySchema.optional(),
  isPrimary: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * User contact update request schema
 */
export const userContactUpdateRequestSchema = z.object({
  contactId: idSchema,
  value: z.string().optional(),
  label: userContactLabelSchema.optional(),
  priority: userContactPrioritySchema.optional(),
  isPrimary: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * User contact verify request schema
 */
export const userContactVerifyRequestSchema = z.object({
  contactId: idSchema,
  method: userContactVerificationMethodSchema,
  code: z.string().optional(),
});

// ============================================================
// USER CONTACT RESPONSE SCHEMA
// ============================================================

/**
 * User contact response schema
 */
export const userContactResponseSchema = z.object({
  success: z.boolean(),
  contact: userContactRecordSchema.optional(),
  error: z.string().optional(),
  verificationCode: z.string().optional(),
  resendCooldown: z.number().int().min(0).optional(),
});

// ============================================================
// USER CONTACT FILTER SCHEMA
// ============================================================

/**
 * User contact filter schema
 */
export const userContactFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([userContactTypeSchema, z.array(userContactTypeSchema)]).optional(),
  status: z.union([userContactStatusSchema, z.array(userContactStatusSchema)]).optional(),
  verificationStatus: z
    .union([userContactVerificationStatusSchema, z.array(userContactVerificationStatusSchema)])
    .optional(),
  label: z.union([userContactLabelSchema, z.array(userContactLabelSchema)]).optional(),
  priority: z.union([userContactPrioritySchema, z.array(userContactPrioritySchema)]).optional(),
  primaryOnly: z.boolean().optional(),
  verifiedOnly: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// USER CONTACT SUMMARY SCHEMA
// ============================================================

/**
 * User contact summary schema
 */
export const userContactSummarySchema = z.object({
  userId: idSchema,
  totalContacts: z.number().int().min(0),
  activeContacts: z.number().int().min(0),
  verifiedContacts: z.number().int().min(0),
  primaryContacts: z.number().int().min(0),
  contactsByType: z.record(userContactTypeSchema, z.number().int().min(0)),
  contactsByStatus: z.record(userContactStatusSchema, z.number().int().min(0)),
  contactsByVerificationStatus: z.record(
    userContactVerificationStatusSchema,
    z.number().int().min(0)
  ),
  primaryContact: userContactRecordSchema.optional(),
  contacts: z.array(userContactRecordSchema),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserContactType = z.infer<typeof userContactTypeSchema>;
export type UserContactStatus = z.infer<typeof userContactStatusSchema>;
export type UserContactVerificationStatus = z.infer<typeof userContactVerificationStatusSchema>;
export type UserContactLabel = z.infer<typeof userContactLabelSchema>;
export type UserContactMethod = z.infer<typeof userContactMethodSchema>;
export type UserContactPriority = z.infer<typeof userContactPrioritySchema>;
export type UserContactVerificationMethod = z.infer<typeof userContactVerificationMethodSchema>;
export type UserContactRecord = z.infer<typeof userContactRecordSchema>;
export type UserContactCreateRequest = z.infer<typeof userContactCreateRequestSchema>;
export type UserContactUpdateRequest = z.infer<typeof userContactUpdateRequestSchema>;
export type UserContactVerifyRequest = z.infer<typeof userContactVerifyRequestSchema>;
export type UserContactResponse = z.infer<typeof userContactResponseSchema>;
export type UserContactFilter = z.infer<typeof userContactFilterSchema>;
export type UserContactSummary = z.infer<typeof userContactSummarySchema>;

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

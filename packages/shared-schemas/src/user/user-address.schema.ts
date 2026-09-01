/**
 * User Address Schema
 * Zod schemas for user address management
 */

import { z } from 'zod';
import {
  USER_ADDRESS_TYPE,
  USER_ADDRESS_STATUS,
  USER_ADDRESS_VERIFICATION_STATUS,
  USER_ADDRESS_LABEL,
  USER_ADDRESS_FIELD,
  USER_ADDRESS_FORMAT,
  USER_ADDRESS_TYPE_LABELS,
  USER_ADDRESS_STATUS_LABELS,
  USER_ADDRESS_VERIFICATION_STATUS_LABELS,
  USER_ADDRESS_FIELD_LABELS,
  USER_ADDRESS_FORMAT_LABELS,
  USER_ADDRESS_REQUIRED_FIELDS,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// USER ADDRESS TYPE SCHEMAS
// ============================================================

/**
 * User address type schema
 */
export const userAddressTypeSchema = z.enum([
  USER_ADDRESS_TYPE.HOME,
  USER_ADDRESS_TYPE.WORK,
  USER_ADDRESS_TYPE.BILLING,
  USER_ADDRESS_TYPE.SHIPPING,
  USER_ADDRESS_TYPE.OTHER,
  USER_ADDRESS_TYPE.TEMPORARY,
  USER_ADDRESS_TYPE.PERMANENT,
  USER_ADDRESS_TYPE.VACATION,
  USER_ADDRESS_TYPE.PO_BOX,
]);

/**
 * User address status schema
 */
export const userAddressStatusSchema = z.enum([
  USER_ADDRESS_STATUS.ACTIVE,
  USER_ADDRESS_STATUS.INACTIVE,
  USER_ADDRESS_STATUS.PENDING,
  USER_ADDRESS_STATUS.VERIFIED,
  USER_ADDRESS_STATUS.REMOVED,
  USER_ADDRESS_STATUS.DEFAULT,
  USER_ADDRESS_STATUS.BILLING,
  USER_ADDRESS_STATUS.SHIPPING,
  USER_ADDRESS_STATUS.PRIMARY,
  USER_ADDRESS_STATUS.SECONDARY,
]);

/**
 * User address verification status schema
 */
export const userAddressVerificationStatusSchema = z.enum([
  USER_ADDRESS_VERIFICATION_STATUS.UNVERIFIED,
  USER_ADDRESS_VERIFICATION_STATUS.VERIFIED,
  USER_ADDRESS_VERIFICATION_STATUS.PENDING,
  USER_ADDRESS_VERIFICATION_STATUS.FAILED,
  USER_ADDRESS_VERIFICATION_STATUS.REQUIRES_REVIEW,
  USER_ADDRESS_VERIFICATION_STATUS.ADMIN_VERIFIED,
  USER_ADDRESS_VERIFICATION_STATUS.SELF_VERIFIED,
]);

/**
 * User address label schema
 */
export const userAddressLabelSchema = z.enum([
  USER_ADDRESS_LABEL.HOME,
  USER_ADDRESS_LABEL.WORK,
  USER_ADDRESS_LABEL.OTHER,
  USER_ADDRESS_LABEL.BILLING,
  USER_ADDRESS_LABEL.SHIPPING,
  USER_ADDRESS_LABEL.PRIMARY,
  USER_ADDRESS_LABEL.SECONDARY,
]);

/**
 * User address field schema
 */
export const userAddressFieldSchema = z.enum([
  USER_ADDRESS_FIELD.STREET,
  USER_ADDRESS_FIELD.CITY,
  USER_ADDRESS_FIELD.STATE,
  USER_ADDRESS_FIELD.POSTAL_CODE,
  USER_ADDRESS_FIELD.COUNTRY,
  USER_ADDRESS_FIELD.BUILDING_NUMBER,
  USER_ADDRESS_FIELD.APARTMENT_NUMBER,
  USER_ADDRESS_FIELD.FLOOR_NUMBER,
  USER_ADDRESS_FIELD.LANDMARK,
  USER_ADDRESS_FIELD.DIRECTIONS,
  USER_ADDRESS_FIELD.LATITUDE,
  USER_ADDRESS_FIELD.LONGITUDE,
]);

/**
 * User address format schema
 */
export const userAddressFormatSchema = z.enum([
  USER_ADDRESS_FORMAT.STANDARD,
  USER_ADDRESS_FORMAT.COMPACT,
  USER_ADDRESS_FORMAT.FULL,
  USER_ADDRESS_FORMAT.SHIPPING_LABEL,
  USER_ADDRESS_FORMAT.BILLING_FORMAT,
]);

// ============================================================
// USER ADDRESS RECORD SCHEMA
// ============================================================

/**
 * User address record schema
 */
export const userAddressRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  type: userAddressTypeSchema,
  status: userAddressStatusSchema,
  verificationStatus: userAddressVerificationStatusSchema,
  label: userAddressLabelSchema,
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  buildingNumber: z.string().optional(),
  apartmentNumber: z.string().optional(),
  floorNumber: z.string().optional(),
  landmark: z.string().optional(),
  directions: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isPrimary: z.boolean().default(false),
  isDefault: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  addedAt: timestampSchema,
  verifiedAt: timestampSchema.optional(),
  updatedAt: timestampSchema,
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER ADDRESS REQUEST SCHEMAS
// ============================================================

/**
 * User address create request schema
 */
export const userAddressCreateRequestSchema = z.object({
  userId: idSchema,
  type: userAddressTypeSchema,
  label: userAddressLabelSchema.optional(),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().optional(),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  buildingNumber: z.string().optional(),
  apartmentNumber: z.string().optional(),
  floorNumber: z.string().optional(),
  landmark: z.string().optional(),
  directions: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isPrimary: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * User address update request schema
 */
export const userAddressUpdateRequestSchema = z.object({
  addressId: idSchema,
  type: userAddressTypeSchema.optional(),
  label: userAddressLabelSchema.optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  buildingNumber: z.string().optional(),
  apartmentNumber: z.string().optional(),
  floorNumber: z.string().optional(),
  landmark: z.string().optional(),
  directions: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isPrimary: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * User address verify request schema
 */
export const userAddressVerifyRequestSchema = z.object({
  addressId: idSchema,
  method: z.enum(['admin', 'self', 'manual', 'system']).optional(),
  code: z.string().optional(),
  adminId: idSchema.optional(),
});

// ============================================================
// USER ADDRESS RESPONSE SCHEMA
// ============================================================

/**
 * User address response schema
 */
export const userAddressResponseSchema = z.object({
  success: z.boolean(),
  address: userAddressRecordSchema.optional(),
  error: z.string().optional(),
});

// ============================================================
// USER ADDRESS FILTER SCHEMA
// ============================================================

/**
 * User address filter schema
 */
export const userAddressFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([userAddressTypeSchema, z.array(userAddressTypeSchema)]).optional(),
  status: z.union([userAddressStatusSchema, z.array(userAddressStatusSchema)]).optional(),
  verificationStatus: z
    .union([userAddressVerificationStatusSchema, z.array(userAddressVerificationStatusSchema)])
    .optional(),
  label: z.union([userAddressLabelSchema, z.array(userAddressLabelSchema)]).optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  primaryOnly: z.boolean().optional(),
  defaultOnly: z.boolean().optional(),
  verifiedOnly: z.boolean().optional(),
  activeOnly: z.boolean().optional(),
  billingOnly: z.boolean().optional(),
  shippingOnly: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// USER ADDRESS SUMMARY SCHEMA
// ============================================================

/**
 * User address summary schema
 */
export const userAddressSummarySchema = z.object({
  userId: idSchema,
  totalAddresses: z.number().int().min(0),
  activeAddresses: z.number().int().min(0),
  verifiedAddresses: z.number().int().min(0),
  primaryAddresses: z.number().int().min(0),
  defaultAddress: userAddressRecordSchema.optional(),
  addressesByType: z.record(userAddressTypeSchema, z.number().int().min(0)),
  addressesByStatus: z.record(userAddressStatusSchema, z.number().int().min(0)),
  addressesByCountry: z.record(z.string(), z.number().int().min(0)),
  addresses: z.array(userAddressRecordSchema),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserAddressType = z.infer<typeof userAddressTypeSchema>;
export type UserAddressStatus = z.infer<typeof userAddressStatusSchema>;
export type UserAddressVerificationStatus = z.infer<typeof userAddressVerificationStatusSchema>;
export type UserAddressLabel = z.infer<typeof userAddressLabelSchema>;
export type UserAddressField = z.infer<typeof userAddressFieldSchema>;
export type UserAddressFormat = z.infer<typeof userAddressFormatSchema>;
export type UserAddressRecord = z.infer<typeof userAddressRecordSchema>;
export type UserAddressCreateRequest = z.infer<typeof userAddressCreateRequestSchema>;
export type UserAddressUpdateRequest = z.infer<typeof userAddressUpdateRequestSchema>;
export type UserAddressVerifyRequest = z.infer<typeof userAddressVerifyRequestSchema>;
export type UserAddressResponse = z.infer<typeof userAddressResponseSchema>;
export type UserAddressFilter = z.infer<typeof userAddressFilterSchema>;
export type UserAddressSummary = z.infer<typeof userAddressSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user address type is valid
 */
export function isValidUserAddressType(type: string): type is UserAddressType {
  return Object.values(USER_ADDRESS_TYPE).includes(type as UserAddressType);
}

/**
 * Check if user address status is valid
 */
export function isValidUserAddressStatus(status: string): status is UserAddressStatus {
  return Object.values(USER_ADDRESS_STATUS).includes(status as UserAddressStatus);
}

/**
 * Check if user address verification status is valid
 */
export function isValidUserAddressVerificationStatus(
  status: string
): status is UserAddressVerificationStatus {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS).includes(
    status as UserAddressVerificationStatus
  );
}

/**
 * Check if user address field is valid
 */
export function isValidUserAddressField(field: string): field is UserAddressField {
  return Object.values(USER_ADDRESS_FIELD).includes(field as UserAddressField);
}

/**
 * Check if user address format is valid
 */
export function isValidUserAddressFormat(format: string): format is UserAddressFormat {
  return Object.values(USER_ADDRESS_FORMAT).includes(format as UserAddressFormat);
}

/**
 * Get user address type display name
 */
export function getUserAddressTypeDisplayName(type: UserAddressType): string {
  return USER_ADDRESS_TYPE_LABELS[type] || type;
}

/**
 * Get user address status display name
 */
export function getUserAddressStatusDisplayName(status: UserAddressStatus): string {
  return USER_ADDRESS_STATUS_LABELS[status] || status;
}

/**
 * Get user address verification status display name
 */
export function getUserAddressVerificationStatusDisplayName(
  status: UserAddressVerificationStatus
): string {
  return USER_ADDRESS_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user address field display name
 */
export function getUserAddressFieldDisplayName(field: UserAddressField): string {
  return USER_ADDRESS_FIELD_LABELS[field] || field;
}

/**
 * Get user address format display name
 */
export function getUserAddressFormatDisplayName(format: UserAddressFormat): string {
  return USER_ADDRESS_FORMAT_LABELS[format] || format;
}

/**
 * Get required fields for address type
 */
export function getUserAddressRequiredFields(type: UserAddressType): UserAddressField[] {
  // Use the imported USER_ADDRESS_REQUIRED_FIELDS constant
  const requiredMap = USER_ADDRESS_REQUIRED_FIELDS as Record<string, string[]>;
  return (requiredMap[type] || ['street', 'city', 'country']) as UserAddressField[];
}

/**
 * Check if address is active
 */
export function isUserAddressActive(status: UserAddressStatus): boolean {
  const activeStatuses: UserAddressStatus[] = ['active', 'verified', 'default'];
  return activeStatuses.includes(status);
}

/**
 * Check if address is verified
 */
export function isUserAddressVerified(verificationStatus: UserAddressVerificationStatus): boolean {
  const verifiedStatuses: UserAddressVerificationStatus[] = [
    'verified',
    'admin_verified',
    'self_verified',
  ];
  return verifiedStatuses.includes(verificationStatus);
}

/**
 * Check if address is default
 */
export function isUserAddressDefault(status: UserAddressStatus): boolean {
  const defaultStatuses: UserAddressStatus[] = ['default', 'primary'];
  return defaultStatuses.includes(status);
}

/**
 * Check if address is billing
 */
export function isUserAddressBilling(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.BILLING;
}

/**
 * Check if address is shipping
 */
export function isUserAddressShipping(status: UserAddressStatus): boolean {
  return status === USER_ADDRESS_STATUS.SHIPPING;
}

/**
 * Get all user address types
 */
export function getAllUserAddressTypes(): UserAddressType[] {
  return Object.values(USER_ADDRESS_TYPE);
}

/**
 * Get all user address statuses
 */
export function getAllUserAddressStatuses(): UserAddressStatus[] {
  return Object.values(USER_ADDRESS_STATUS);
}

/**
 * Get all user address verification statuses
 */
export function getAllUserAddressVerificationStatuses(): UserAddressVerificationStatus[] {
  return Object.values(USER_ADDRESS_VERIFICATION_STATUS);
}

/**
 * Get all user address fields
 */
export function getAllUserAddressFields(): UserAddressField[] {
  return Object.values(USER_ADDRESS_FIELD);
}

/**
 * Get all user address formats
 */
export function getAllUserAddressFormats(): UserAddressFormat[] {
  return Object.values(USER_ADDRESS_FORMAT);
}

/**
 * Get billing address types
 */
export function getBillingUserAddressTypes(): UserAddressType[] {
  return ['billing', 'home', 'work'];
}

/**
 * Get shipping address types
 */
export function getShippingUserAddressTypes(): UserAddressType[] {
  return ['shipping', 'home', 'work'];
}

/**
 * Format address for display
 */
export function formatUserAddress(
  address: UserAddressRecord,
  format: UserAddressFormat = 'standard'
): string {
  const parts: string[] = [];

  switch (format) {
    case 'standard':
      parts.push(address.street);
      if (address.buildingNumber) {
        parts[parts.length - 1] = `${address.buildingNumber} ${address.street}`;
      }
      if (address.apartmentNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Apt ${address.apartmentNumber}`;
      }
      parts.push(address.city);
      if (address.state) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, ${address.state}`;
      }
      parts.push(address.postalCode);
      parts.push(address.country);
      break;

    case 'compact':
      parts.push(address.street);
      parts.push(`${address.city}, ${address.postalCode}`);
      parts.push(address.country);
      break;

    case 'full':
      parts.push(address.street);
      if (address.buildingNumber) {
        parts[parts.length - 1] = `${address.buildingNumber} ${address.street}`;
      }
      if (address.apartmentNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Apt ${address.apartmentNumber}`;
      }
      if (address.floorNumber) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, Floor ${address.floorNumber}`;
      }
      parts.push(address.city);
      if (address.state) {
        parts[parts.length - 1] = `${parts[parts.length - 1]}, ${address.state}`;
      }
      parts.push(address.postalCode);
      parts.push(address.country);
      if (address.landmark) {
        parts.push(`Landmark: ${address.landmark}`);
      }
      if (address.directions) {
        parts.push(`Directions: ${address.directions}`);
      }
      break;

    default:
      parts.push(address.street);
      parts.push(address.city);
      parts.push(address.country);
  }

  return parts.join(', ');
}

/**
 * Check if address fields are complete
 */
export function isUserAddressComplete(
  address: Partial<UserAddressRecord>,
  type: UserAddressType
): boolean {
  const requiredFields = getUserAddressRequiredFields(type);
  return requiredFields.every((field) => {
    const value = address[field as keyof typeof address];
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Core Primitives Schema
 *
 * This module defines the foundational Zod schemas for the entire application.
 *
 * @module CorePrimitivesSchema
 */

import { z } from 'zod';

// ============================================================
// 1. Imports from shared-constants (শুধু প্রয়োজনীয় ফাংশনগুলো)
// ============================================================
import {
  // Common functions
  isEmail,
  isPhoneBD,
  isStrongPassword,
  isSlug,
  isIPv4,
  // Admin constants
  ADMIN_STATUS,
  ADMIN_ROLE,
  ADMIN_LEVEL,
  // User constants
  USER_STATUS,
  USER_TYPE,
  USER_ROLE,
  // Auth constants
  AUTH_SESSION,
  AUTH_TOKEN,
} from '@vubon/shared-constants';

// ============================================================
// 2. Core Primitive Schemas
// ============================================================

/**
 * ID Schema - UUID v4 অথবা সংখ্যা
 */
export const idSchema = z.union([
  z.string().uuid('Invalid UUID format'),
  z.number().int().positive('ID must be a positive integer'),
]);

/**
 * UUID v4 Schema
 */
export const uuidSchema = z.string().uuid('Invalid UUID v4 format');

/**
 * Email Schema
 */
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .refine((val: string) => isEmail(val), {
    message: 'Email does not meet the required pattern',
  })
  .transform((val: string) => val.toLowerCase().trim());

/**
 * Phone Number Schema (Bangladesh)
 */
export const phoneSchema = z
  .string()
  .refine((val: string) => isPhoneBD(val), {
    message: 'Invalid Bangladeshi phone number format',
  })
  .transform((val: string) => val.trim());

/**
 * Strong Password Schema
 */
export const passwordSchema = z.string().refine((val: string) => isStrongPassword(val), {
  message: 'Password must meet the strength requirements',
});

/**
 * Slug Schema
 */
export const slugSchema = z
  .string()
  .refine((val: string) => isSlug(val), {
    message: 'Invalid slug format',
  })
  .transform((val: string) => val.toLowerCase().trim());

/**
 * IPv4 Schema
 */
export const ipv4Schema = z.string().refine((val: string) => isIPv4(val), {
  message: 'Invalid IPv4 address format',
});

/**
 * URL Schema
 */
export const urlSchema = z
  .string()
  .url('Invalid URL format')
  .transform((val: string) => val.trim());

/**
 * ISO Date Schema
 */
export const dateSchema = z.union([z.date(), z.string().datetime()]);

/**
 * Metadata Schema
 */
export const metadataSchema = z.record(z.unknown()).optional();

/**
 * Device Info Schema
 */
export const deviceInfoSchema = z
  .object({
    userAgent: z.string().optional(),
    platform: z.string().optional(),
    browser: z.string().optional(),
    version: z.string().optional(),
    deviceId: z.string().optional(),
    ipAddress: z.string().optional(),
  })
  .optional();

// ============================================================
// 3. Enum Schemas (সঠিক কনস্ট্যান্ট ভ্যালু অনুযায়ী)
// ============================================================

// Admin Status
export const adminStatusSchema = z.enum([
  ADMIN_STATUS.ACTIVE,
  ADMIN_STATUS.INACTIVE,
  ADMIN_STATUS.SUSPENDED,
  ADMIN_STATUS.PENDING,
]);

// Admin Role
export const adminRoleSchema = z.enum([
  ADMIN_ROLE.SUPER_ADMIN,
  ADMIN_ROLE.ADMIN,
  ADMIN_ROLE.MANAGER,
  ADMIN_ROLE.MODERATOR,
]);

// Admin Level (LEVEL_1 থেকে LEVEL_15)
export const adminLevelSchema = z.enum([
  'LEVEL_1',
  'LEVEL_2',
  'LEVEL_3',
  'LEVEL_4',
  'LEVEL_5',
  'LEVEL_6',
  'LEVEL_7',
  'LEVEL_8',
  'LEVEL_9',
  'LEVEL_10',
  'LEVEL_11',
  'LEVEL_12',
  'LEVEL_13',
  'LEVEL_14',
  'LEVEL_15',
]);

// User Status
export const userStatusSchema = z.enum([
  USER_STATUS.ACTIVE,
  USER_STATUS.INACTIVE,
  USER_STATUS.SUSPENDED,
  USER_STATUS.BLOCKED,
  USER_STATUS.PENDING,
  USER_STATUS.DELETED,
]);

// User Type
export const userTypeSchema = z.enum([
  USER_TYPE.CUSTOMER,
  USER_TYPE.VENDOR,
  USER_TYPE.ADMIN,
  USER_TYPE.GUEST,
  USER_TYPE.AFFILIATE,
  USER_TYPE.WHOLESALER,
  USER_TYPE.RETAILER,
  USER_TYPE.DISTRIBUTOR,
]);

// User Role
export const userRoleSchema = z.enum([
  USER_ROLE.CUSTOMER,
  USER_ROLE.PREMIUM_CUSTOMER,
  USER_ROLE.VIP_CUSTOMER,
  USER_ROLE.SALES_AGENT,
  USER_ROLE.SUPPORT_AGENT,
  USER_ROLE.MARKETING_AGENT,
  USER_ROLE.ADMIN,
  USER_ROLE.MANAGER,
  USER_ROLE.SUPER_ADMIN,
  USER_ROLE.VENDOR,
  USER_ROLE.VENDOR_ADMIN,
  USER_ROLE.VENDOR_STAFF,
  USER_ROLE.WHOLESALER,
  USER_ROLE.RETAILER,
  USER_ROLE.DISTRIBUTOR,
]);

// Auth Session Status
export const authSessionStatusSchema = z.enum([
  AUTH_SESSION.STATUS.ACTIVE,
  AUTH_SESSION.STATUS.EXPIRED,
  AUTH_SESSION.STATUS.TERMINATED,
  AUTH_SESSION.STATUS.REVOKED,
  AUTH_SESSION.STATUS.INVALID,
  AUTH_SESSION.STATUS.PENDING,
]);

// Auth Token Type
export const authTokenTypeSchema = z.enum([
  AUTH_TOKEN.TYPE.ACCESS,
  AUTH_TOKEN.TYPE.REFRESH,
  AUTH_TOKEN.TYPE.VERIFICATION,
  AUTH_TOKEN.TYPE.PASSWORD_RESET,
  AUTH_TOKEN.TYPE.API,
  AUTH_TOKEN.TYPE.ID_TOKEN,
]);

// ============================================================
// 4. Base Entity Schemas
// ============================================================

export const baseEntitySchema = z.object({
  id: idSchema,
  createdAt: dateSchema.default(() => new Date()),
  updatedAt: dateSchema.default(() => new Date()),
});

export const softDeleteSchema = baseEntitySchema.extend({
  deletedAt: dateSchema.nullable().optional(),
  isDeleted: z.boolean().default(false),
});

export const timestampSchema = z.object({
  createdAt: dateSchema.default(() => new Date()),
  updatedAt: dateSchema.default(() => new Date()),
});

export const auditSchema = z.object({
  createdBy: uuidSchema.optional(),
  updatedBy: uuidSchema.optional(),
  deletedBy: uuidSchema.optional(),
});

// ============================================================
// 5. Response Schemas
// ============================================================

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean().default(true),
    message: z.string().optional(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    statusCode: z.number().int().default(200),
    timestamp: dateSchema.default(() => new Date()),
  });

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      total: z.number().int().min(0),
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      totalPages: z.number().int().min(0),
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
    }),
  });

// ============================================================
// 6. Utility Schemas
// ============================================================

export const dateRangeSchema = z
  .object({
    start: dateSchema.optional(),
    end: dateSchema.optional(),
  })
  .refine(
    (data: { start?: Date | string; end?: Date | string }) => {
      if (data.start && data.end) {
        return new Date(data.start) <= new Date(data.end);
      }
      return true;
    },
    {
      message: 'Start date must be before end date',
      path: ['start'],
    }
  );

export const searchQuerySchema = z.object({
  q: z.string().min(1).optional(),
  fields: z.array(z.string()).optional(),
  operator: z.enum(['and', 'or']).default('and'),
});

// ============================================================
// 7. Type Inferences (shared-types এর সাথে মিল রেখে)
// ============================================================

export type ID = z.infer<typeof idSchema>;
export type UUID = z.infer<typeof uuidSchema>;
export type Email = z.infer<typeof emailSchema>;
export type PhoneNumber = z.infer<typeof phoneSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type Slug = z.infer<typeof slugSchema>;
export type IPv4 = z.infer<typeof ipv4Schema>;
export type URL = z.infer<typeof urlSchema>;
export type Date = z.infer<typeof dateSchema>;
export type Metadata = z.infer<typeof metadataSchema>;
export type DeviceInfo = z.infer<typeof deviceInfoSchema>;

export type AdminStatus = z.infer<typeof adminStatusSchema>;
export type AdminRole = z.infer<typeof adminRoleSchema>;
export type AdminLevel = z.infer<typeof adminLevelSchema>;
export type UserStatus = z.infer<typeof userStatusSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type AuthSessionStatus = z.infer<typeof authSessionStatusSchema>;
export type AuthTokenType = z.infer<typeof authTokenTypeSchema>;

export type BaseEntity = z.infer<typeof baseEntitySchema>;
export type SoftDelete = z.infer<typeof softDeleteSchema>;
export type Timestamp = z.infer<typeof timestampSchema>;
export type Audit = z.infer<typeof auditSchema>;

export type APIResponse<T = unknown> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodTypeAny>>>;
export type PaginatedResponse<T = unknown> = z.infer<
  ReturnType<typeof paginatedResponseSchema<z.ZodTypeAny>>
>;

export type DateRange = z.infer<typeof dateRangeSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;

// ============================================================
// 8. Default Export
// ============================================================

export default {
  idSchema,
  uuidSchema,
  emailSchema,
  phoneSchema,
  passwordSchema,
  slugSchema,
  ipv4Schema,
  urlSchema,
  dateSchema,
  metadataSchema,
  deviceInfoSchema,
  adminStatusSchema,
  adminRoleSchema,
  adminLevelSchema,
  userStatusSchema,
  userTypeSchema,
  userRoleSchema,
  authSessionStatusSchema,
  authTokenTypeSchema,
  baseEntitySchema,
  softDeleteSchema,
  timestampSchema,
  auditSchema,
  apiResponseSchema,
  paginatedResponseSchema,
  dateRangeSchema,
  searchQuerySchema,
};

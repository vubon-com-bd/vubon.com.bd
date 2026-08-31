/**
 * Core Primitives Schema
 * Zod schemas for core primitive types and constants
 */

import { z } from 'zod';
import { HTTP_STATUS } from '@vubon/shared-constants';
import type {
  ID,
  UUID,
  Email,
  PhoneNumber,
  Url,
  Timestamp,
  JsonObject,
  JsonValue,
} from '@vubon/shared-types';

// ============================================
// Validator functions (using regex patterns)
// ============================================

/**
 * Validate phone number (BD format)
 */
export const isPhoneBD = (value: string): boolean => {
  return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
};

/**
 * Validate slug format
 */
export const isSlug = (value: string): boolean => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
};

/**
 * Validate IPv4 address
 */
export const isIPv4 = (value: string): boolean => {
  return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    value
  );
};

// ============================================
// Zod Schemas
// ============================================

/**
 * ID schema (UUID)
 */
export const idSchema = z.string().uuid() satisfies z.ZodType<ID>;

/**
 * UUID schema
 */
export const uuidSchema = z.string().uuid() satisfies z.ZodType<UUID>;

/**
 * Email schema
 */
export const emailSchema = z.string().email() satisfies z.ZodType<Email>;

/**
 * Phone number schema (BD format)
 */
export const phoneSchema = z
  .string()
  .regex(/^(?:\+88|88)?01[3-9]\d{8}$/)
  .transform((val) => {
    // Normalize to +880 format
    if (val.startsWith('01')) return '+88' + val;
    if (val.startsWith('88')) return '+' + val;
    return val;
  }) satisfies z.ZodType<PhoneNumber>;

/**
 * URL schema
 */
export const urlSchema = z.string().url() satisfies z.ZodType<Url>;

/**
 * Timestamp schema (Date only, as per Timestamp type)
 */
export const timestampSchema = z.date() satisfies z.ZodType<Timestamp>;

/**
 * ISO Date string schema
 */
export const isoDateSchema = z.string().datetime();

/**
 * JSON Object schema
 */
export const jsonObjectSchema = z.record(z.unknown()) satisfies z.ZodType<JsonObject>;

/**
 * JSON Value schema (recursive) - JSON spec compliant
 */
export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);

/**
 * Slug schema
 */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) satisfies z.ZodType<string>;

/**
 * IPv4 schema
 */
export const ipv4Schema = z
  .string()
  .regex(
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  );

// ============================================
// Exported validators
// ============================================

export const validators = {
  isPhoneBD,
  isSlug,
  isIPv4,
};

// ============================================
// Re-export constants (if needed)
// ============================================

export const CONSTANTS = {
  HTTP_STATUS,
} as const;

// ============================================
// Helper Schemas
// ============================================

/**
 * Sort order schema
 */
export const sortOrderSchema = z.enum(['asc', 'desc']);

/**
 * Nullable schema helper
 */
export const nullable = <T extends z.ZodTypeAny>(schema: T) => schema.nullable();

/**
 * Optional schema helper
 */
export const optional = <T extends z.ZodTypeAny>(schema: T) => schema.optional();

/**
 * Array schema helper with min/max
 */
export const arrayOf = <T extends z.ZodTypeAny>(schema: T, min?: number, max?: number) => {
  let arr = z.array(schema);
  if (min !== undefined) arr = arr.min(min);
  if (max !== undefined) arr = arr.max(max);
  return arr;
};

/**
 * String schema with min/max length
 */
export const stringWithLength = (min?: number, max?: number) => {
  let str = z.string();
  if (min !== undefined) str = str.min(min);
  if (max !== undefined) str = str.max(max);
  return str;
};

/**
 * Number schema with min/max
 */
export const numberWithRange = (min?: number, max?: number) => {
  let num = z.number();
  if (min !== undefined) num = num.min(min);
  if (max !== undefined) num = num.max(max);
  return num;
};

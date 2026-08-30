/**
 * Core Primitives Schema
 * Zod schemas for core primitive types and constants
 */

import { z } from 'zod';
import {
  HTTP_STATUS,
  // Common constants
} from '@vubon/shared-constants';

import type { ID, UUID, Email, PhoneNumber, Url, Timestamp, JsonObject } from '@vubon/shared-types';

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
 * Timestamp schema
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
 * JSON Value schema (recursive)
 */
export const jsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
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

// Note: These are re-exported for convenience
// Import from '@vubon/shared-constants' directly in your code
export const CONSTANTS = {
  HTTP_STATUS,
  // Add other constants as needed
};

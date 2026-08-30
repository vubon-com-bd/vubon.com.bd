/**
 * Common Type Schemas
 * Zod schemas for common primitive types
 */

import { z } from 'zod';
import type { JsonValue, JsonObject, JsonArray } from '@vubon/shared-types';

/**
 * Primitive type schemas
 */
export const idSchema = z.string().uuid();
export const uuidSchema = z.string().uuid();
export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/**
 * Contact information schemas
 */
export const emailSchema = z.string().email();
export const phoneNumberSchema = z.string().regex(/^\+?[0-9]{10,15}$/);
export const urlSchema = z.string().url();

/**
 * Date and time schemas
 */
export const timestampSchema = z.date();
export const isoDateStringSchema = z.string().datetime();
export const timezoneSchema = z.string().regex(/^[A-Za-z]+\/[A-Za-z_]+$/);

/**
 * Monetary schemas
 */
export const currencySchema = z.string().length(3);
export const moneySchema = z.number().min(0);
export const percentageSchema = z.number().min(0).max(100);

/**
 * Generic JSON schemas
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
export const jsonObjectSchema: z.ZodType<JsonObject> = z.record(jsonValueSchema);
export const jsonArraySchema: z.ZodType<JsonArray> = z.array(jsonValueSchema);

/**
 * Country and locale schemas
 */
export const countryCodeSchema = z.string().length(2);
export const languageCodeSchema = z.string().length(2);
export const localeSchema = z.string().regex(/^[a-z]{2}-[A-Z]{2}$/);

/**
 * Sort order schema
 */
export const sortOrderSchema = z.enum(['asc', 'desc']);

/**
 * Nullable and optional helpers
 */
export const nullable = <T extends z.ZodTypeAny>(schema: T) => schema.nullable();
export const optional = <T extends z.ZodTypeAny>(schema: T) => schema.optional();

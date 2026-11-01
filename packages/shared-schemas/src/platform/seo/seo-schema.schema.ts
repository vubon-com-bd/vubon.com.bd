/**
 * SEO Schema (structured data) Schema
 * @module shared-schemas/platform/seo
 *
 * ⚠️ Note: ফাইলের নাম seo-schema.schema.ts — কারণ এটা Schema.org structured data।
 */

import { z } from 'zod';
import { SEO_SCHEMA_TYPE, SEO_SCHEMA_FORMAT } from '@vubon/shared-constants/platform';

export const SeoSchemaTypeSchema = z.enum(Object.values(SEO_SCHEMA_TYPE) as [string, ...string[]]);

export const SeoSchemaFormatSchema = z.enum(
  Object.values(SEO_SCHEMA_FORMAT) as [string, ...string[]]
);

export const SeoSchemaDataSchema = z.object({
  type: SeoSchemaTypeSchema,
  format: SeoSchemaFormatSchema,
  data: z.record(z.string(), z.unknown()),
  isValid: z.boolean(),
  validatedAt: z.string().datetime().optional(),
});

export const SeoSchemaValidationSchema = z.object({
  valid: z.boolean(),
  errors: z.array(z.string().max(500)).max(100),
  warnings: z.array(z.string().max(500)).max(100),
});

export type SeoSchemaTypeSchemaType = z.infer<typeof SeoSchemaTypeSchema>;
export type SeoSchemaFormatSchemaType = z.infer<typeof SeoSchemaFormatSchema>;
export type SeoSchemaDataSchemaType = z.infer<typeof SeoSchemaDataSchema>;
export type SeoSchemaValidationSchemaType = z.infer<typeof SeoSchemaValidationSchema>;

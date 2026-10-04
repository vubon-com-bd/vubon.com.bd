/**
 * Slug Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants/common';

export const SlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Slug is required')
  .max(120, 'Slug is too long')
  .regex(REGEX.SLUG, 'Invalid slug format (lowercase letters, numbers, hyphens only)');

export const OptionalSlugSchema = SlugSchema.optional();

export type SlugSchemaType = z.infer<typeof SlugSchema>;

/**
 * ID Schema
 * @module shared-schemas/common/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */

import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants/common';

export const IdSchema = z
  .string()
  .min(1, 'ID is required')
  .max(64, 'ID is too long')
  .regex(REGEX.UUID, 'Invalid ID format');

export const OptionalIdSchema = IdSchema.optional();

export const NullableIdSchema = IdSchema.nullable();

export type IdSchemaType = z.infer<typeof IdSchema>;

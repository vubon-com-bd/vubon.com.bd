/**
 * Base ID Schema
 * @module shared-schemas/common/base
 *
 * Generic ID field validation।
 */

import { z } from 'zod';
import { UuidSchema } from '../primitives/uuid.schema';

export const IdFieldSchema = UuidSchema;

export const IdParamSchema = z.object({
  id: UuidSchema,
});

export const IdsParamSchema = z.object({
  ids: z.array(UuidSchema).min(1, 'At least one ID is required').max(100, 'Too many IDs'),
});

export const SlugParamSchema = z.object({
  slug: z.string().min(1).max(120),
});

export type IdFieldSchemaType = z.infer<typeof IdFieldSchema>;
export type IdParamSchemaType = z.infer<typeof IdParamSchema>;
export type IdsParamSchemaType = z.infer<typeof IdsParamSchema>;
export type SlugParamSchemaType = z.infer<typeof SlugParamSchema>;

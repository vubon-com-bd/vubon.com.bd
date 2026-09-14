/**
 * Base Entity Schema
 * @module shared-schemas/common/base
 *
 * সব entity-এর foundation schema।
 */

import { z } from 'zod';
import { IsoDateTimeSchema } from '../primitives/timestamp.schema';
import { UuidSchema } from '../primitives/uuid.schema';

export const BaseEntitySchema = z.object({
  id: UuidSchema,
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
  deletedAt: IsoDateTimeSchema.nullable().optional(),
});

export const AuditableEntitySchema = BaseEntitySchema.extend({
  createdBy: UuidSchema.optional(),
  updatedBy: UuidSchema.optional(),
  deletedBy: UuidSchema.optional(),
});

export const VersionedEntitySchema = BaseEntitySchema.extend({
  version: z.number().int().nonnegative(),
});

export const SoftDeleteEntitySchema = BaseEntitySchema.extend({
  deletedAt: IsoDateTimeSchema.nullable(),
  isDeleted: z.boolean(),
});

export type BaseEntitySchemaType = z.infer<typeof BaseEntitySchema>;
export type AuditableEntitySchemaType = z.infer<typeof AuditableEntitySchema>;
export type VersionedEntitySchemaType = z.infer<typeof VersionedEntitySchema>;
export type SoftDeleteEntitySchemaType = z.infer<typeof SoftDeleteEntitySchema>;

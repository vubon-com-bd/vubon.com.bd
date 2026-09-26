/**
 * Domain Error Schema
 * @module shared-schemas/common/errors
 */

import { z } from 'zod';

export const DomainErrorSchema = z.object({
  name: z.literal('DomainError'),
  code: z.string().min(1),
  message: z.string().min(1),
  aggregateId: z.string().optional(),
  aggregateType: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const BusinessRuleViolationSchema = DomainErrorSchema.extend({
  rule: z.string().min(1),
  violatedAt: z.string().datetime(),
});

export const EntityNotFoundErrorSchema = DomainErrorSchema.extend({
  entityType: z.string().min(1),
  entityId: z.string().min(1),
});

export const DuplicateEntityErrorSchema = DomainErrorSchema.extend({
  entityType: z.string().min(1),
  conflictingField: z.string().min(1),
  conflictingValue: z.unknown(),
});

export type DomainErrorSchemaType = z.infer<typeof DomainErrorSchema>;
export type BusinessRuleViolationSchemaType = z.infer<typeof BusinessRuleViolationSchema>;
export type EntityNotFoundErrorSchemaType = z.infer<typeof EntityNotFoundErrorSchema>;
export type DuplicateEntityErrorSchemaType = z.infer<typeof DuplicateEntityErrorSchema>;

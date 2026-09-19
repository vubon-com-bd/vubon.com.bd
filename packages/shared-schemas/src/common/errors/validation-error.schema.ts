/**
 * Validation Error Schema
 * @module shared-schemas/common/errors
 */

import { z } from 'zod';
import { ErrorDetailSchema } from './base-error.schema';

export const ValidationErrorSchema = z.object({
  name: z.literal('ValidationError'),
  code: z.string(),
  message: z.string().min(1),
  details: z.array(ErrorDetailSchema).min(1, 'At least one detail required'),
  field: z.string().optional(),
  value: z.unknown().optional(),
});

export const FieldValidationErrorSchema = ValidationErrorSchema.extend({
  field: z.string().min(1),
  value: z.unknown(),
});

export const MultiFieldValidationErrorSchema = ValidationErrorSchema.extend({
  details: z.array(FieldValidationErrorSchema).min(1),
});

export type ValidationErrorSchemaType = z.infer<typeof ValidationErrorSchema>;
export type FieldValidationErrorSchemaType = z.infer<typeof FieldValidationErrorSchema>;
export type MultiFieldValidationErrorSchemaType = z.infer<typeof MultiFieldValidationErrorSchema>;

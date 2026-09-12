import { z } from 'zod';

/**
 * Known validation rule names.
 * Note: VALIDATION in shared-constants holds numeric limits (MIN_LENGTH, MAX_LENGTH, etc.),
 * not rule identifiers — so we define the rule names here explicitly.
 * Add new rules to this list as the validator grows.
 */
export const VALIDATION_RULES = [
  'required',
  'string',
  'number',
  'boolean',
  'array',
  'object',
  'email',
  'phone',
  'url',
  'uuid',
  'slug',
  'password',
  'date',
  'time',
  'min',
  'max',
  'minLength',
  'maxLength',
  'pattern',
  'enum',
  'unique',
  'custom',
] as const;

export type ValidationRuleName = (typeof VALIDATION_RULES)[number];

const validationRuleEnum = z.enum(VALIDATION_RULES);

/**
 * Validation rule descriptor.
 * `rule` accepts known names OR custom strings (for extensibility).
 */
export const ValidationRuleSchema = z.object({
  field: z.string().min(1),
  rule: validationRuleEnum.or(z.string().min(1)),
  params: z.array(z.unknown()).optional(),
  message: z.string().optional(),
});

/**
 * Single validation error.
 */
export const ValidationErrorSchema = z.object({
  field: z.string().min(1),
  message: z.string(),
  rule: z.string().min(1),
  value: z.unknown().optional(),
});

/**
 * Result of a validation pass.
 */
export const ValidationResultSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(ValidationErrorSchema),
});

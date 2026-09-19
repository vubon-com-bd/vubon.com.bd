/**
 * Email Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email is required')
  .max(VALIDATION.EMAIL_MAX_LENGTH, 'Email is too long')
  .regex(REGEX.EMAIL, 'Invalid email format');

export const OptionalEmailSchema = EmailSchema.optional();

export type EmailSchemaType = z.infer<typeof EmailSchema>;

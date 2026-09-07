import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants';

export const EmailSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(VALIDATION.EMAIL.MIN_LENGTH, 'Email must be at least 5 characters')
    .max(VALIDATION.EMAIL.MAX_LENGTH, 'Email must not exceed 254 characters'),
});

export const EmailStringSchema = z
  .string()
  .email('Invalid email format')
  .min(VALIDATION.EMAIL.MIN_LENGTH)
  .max(VALIDATION.EMAIL.MAX_LENGTH);

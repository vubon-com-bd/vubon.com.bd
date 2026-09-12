import { z } from 'zod';
import {
  EMAIL_MIN_LENGTH,
  EMAIL_MAX_LENGTH,
} from '@vubon/shared-constants/src/common/validation.constants';

export const EmailSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(EMAIL_MIN_LENGTH, `Email must be at least ${EMAIL_MIN_LENGTH} characters`)
    .max(EMAIL_MAX_LENGTH, `Email must not exceed ${EMAIL_MAX_LENGTH} characters`),
});

export const EmailStringSchema = z
  .string()
  .email('Invalid email format')
  .min(EMAIL_MIN_LENGTH)
  .max(EMAIL_MAX_LENGTH);

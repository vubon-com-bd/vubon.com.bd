import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants';

export const PhoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(VALIDATION.PHONE.MIN_LENGTH, 'Phone must be at least 10 characters')
    .max(VALIDATION.PHONE.MAX_LENGTH, 'Phone must not exceed 15 characters'),
});

export const PhoneStringSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .min(VALIDATION.PHONE.MIN_LENGTH)
  .max(VALIDATION.PHONE.MAX_LENGTH);

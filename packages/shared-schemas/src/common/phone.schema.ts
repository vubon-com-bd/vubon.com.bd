import { z } from 'zod';
import {
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
} from '@vubon/shared-constants/src/common/validation.constants';

export const PhoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(PHONE_MIN_LENGTH, `Phone must be at least ${PHONE_MIN_LENGTH} characters`)
    .max(PHONE_MAX_LENGTH, `Phone must not exceed ${PHONE_MAX_LENGTH} characters`),
});

export const PhoneStringSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .min(PHONE_MIN_LENGTH)
  .max(PHONE_MAX_LENGTH);

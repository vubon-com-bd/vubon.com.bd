import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';
import {
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
} from '@vubon/shared-constants/src/common/validation.constants';

/**
 * Phone schema — uses REGEX.PHONE from shared-constants (no duplication).
 */
export const PhoneSchema = z.object({
  phone: z
    .string()
    .regex(REGEX.PHONE, 'Invalid phone number format')
    .min(PHONE_MIN_LENGTH, `Phone must be at least ${PHONE_MIN_LENGTH} characters`)
    .max(PHONE_MAX_LENGTH, `Phone must not exceed ${PHONE_MAX_LENGTH} characters`),
});

export const PhoneStringSchema = z
  .string()
  .regex(REGEX.PHONE, 'Invalid phone number format')
  .min(PHONE_MIN_LENGTH)
  .max(PHONE_MAX_LENGTH);

/**
 * Bangladesh-specific phone schema.
 */
export const BDPhoneSchema = z.string().regex(REGEX.BD_PHONE, 'Invalid Bangladesh phone number');

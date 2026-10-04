/**
 * Phone Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export const PhoneSchema = z
  .string()
  .trim()
  .min(VALIDATION.PHONE_MIN_LENGTH, 'Phone is too short')
  .max(VALIDATION.PHONE_MAX_LENGTH, 'Phone is too long')
  .regex(REGEX.PHONE_INTL, 'Invalid phone number');

export const PhoneBdSchema = z
  .string()
  .trim()
  .regex(REGEX.PHONE_BD, 'Invalid Bangladesh phone number');

export const OptionalPhoneSchema = PhoneSchema.optional();

export type PhoneSchemaType = z.infer<typeof PhoneSchema>;
export type PhoneBdSchemaType = z.infer<typeof PhoneBdSchema>;

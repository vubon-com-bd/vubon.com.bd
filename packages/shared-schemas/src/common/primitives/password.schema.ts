/**
 * Password Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export const PasswordSchema = z
  .string()
  .min(
    VALIDATION.PASSWORD_MIN_LENGTH,
    `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
  )
  .max(
    VALIDATION.PASSWORD_MAX_LENGTH,
    `Password must be at most ${VALIDATION.PASSWORD_MAX_LENGTH} characters`
  )
  .regex(
    REGEX.PASSWORD_STRONG,
    'Password must contain uppercase, lowercase, number, and special character'
  );

export const PasswordHashSchema = z.string().min(20, 'Invalid hash').max(255, 'Invalid hash');

export const OtpSchema = z
  .string()
  .regex(REGEX.OTP, 'OTP must be 4-8 digits')
  .min(VALIDATION.OTP_MIN_LENGTH)
  .max(VALIDATION.OTP_MAX_LENGTH);

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;
export type PasswordHashSchemaType = z.infer<typeof PasswordHashSchema>;
export type OtpSchemaType = z.infer<typeof OtpSchema>;

import { z } from 'zod';
import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

/**
 * Password schema — reads rules from SECURITY.PASSWORD (single source of truth).
 */
const {
  MIN_LENGTH,
  MAX_LENGTH,
  REQUIRE_UPPERCASE,
  REQUIRE_LOWERCASE,
  REQUIRE_NUMBER,
  REQUIRE_SPECIAL,
} = SECURITY.PASSWORD;

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(MIN_LENGTH, `Password must be at least ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Password must not exceed ${MAX_LENGTH} characters`)
    .refine(
      (val) => !REQUIRE_UPPERCASE || /[A-Z]/.test(val),
      'Password must contain an uppercase letter'
    )
    .refine(
      (val) => !REQUIRE_LOWERCASE || /[a-z]/.test(val),
      'Password must contain a lowercase letter'
    )
    .refine((val) => !REQUIRE_NUMBER || /[0-9]/.test(val), 'Password must contain a number')
    .refine(
      (val) => !REQUIRE_SPECIAL || /[^A-Za-z0-9]/.test(val),
      'Password must contain a special character'
    ),
});

export const PasswordConfirmSchema = PasswordSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

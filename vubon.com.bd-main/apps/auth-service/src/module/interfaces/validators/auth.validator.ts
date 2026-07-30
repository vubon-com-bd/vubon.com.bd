/**
 * Auth Validators
 * Zod schemas for HTTP request validation
 */

import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_PATTERN,
  EMAIL_REGEX,
  PHONE_REGEX,
} from '@vubon/auth-shared-constants';

/**
 * Registration request validation schema
 */
export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'Invalid email format')
    .max(255, 'Email must not exceed 255 characters')
    .transform((val) => val.toLowerCase().trim()),

  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(PASSWORD_MAX_LENGTH, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`)
    .regex(
      PASSWORD_PATTERN,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    ),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'First name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .transform((val) => val.trim()),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s\-']+$/,
      'Last name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .transform((val) => val.trim()),

  phone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true;
        return PHONE_REGEX.test(val);
      },
      {
        message: 'Invalid Bangladeshi phone number format (must be 01XXXXXXXXX)',
      }
    )
    .transform((val) => val?.trim() || null),
});

/**
 * Type inference for registration request
 */
export type RegisterRequest = z.infer<typeof RegisterSchema>;

/**
 * Zod validation pipe for registration
 * Can be used with @UsePipes(new ZodValidationPipe(RegisterSchema))
 */

// Note: ZodValidationPipe will be implemented in a separate file
// or imported from a shared library

/**
 * Registration schema validation using Zod
 * Validates user registration request data
 */

import { z } from 'zod';
import { 
  PASSWORD_MIN_LENGTH, 
  PASSWORD_MAX_LENGTH,
  PASSWORD_PATTERN,
  EMAIL_REGEX,
  PHONE_REGEX
} from '@vubon/auth-shared-constants';

/**
 * Registration request schema
 * Validates all fields for user registration
 */
export const RegisterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(EMAIL_REGEX, 'Invalid email format')
    .transform((val) => val.toLowerCase().trim()),
  
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(PASSWORD_MAX_LENGTH, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`)
    .regex(PASSWORD_PATTERN, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters')
    .transform((val) => val.trim()),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters')
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

export type RegisterRequest = z.infer<typeof RegisterSchema>;
export const PartialRegisterSchema = RegisterSchema.partial();

export const RegisterResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  status: z.string(),
  message: z.string().default('Registration successful'),
});

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;

import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants';

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN_LENGTH, 'Password must be at least 8 characters')
    .max(VALIDATION.PASSWORD.MAX_LENGTH, 'Password must not exceed 72 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export const PasswordConfirmSchema = PasswordSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

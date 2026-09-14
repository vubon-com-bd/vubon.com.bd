/**
 * Reset Password Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { AuthPasswordSchema } from './auth-password.schema';

export const ResetPasswordRequestSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required').max(500),
    newPassword: AuthPasswordSchema,
    confirmPassword: z.string().min(1),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordRequestSchemaType = z.infer<typeof ResetPasswordRequestSchema>;

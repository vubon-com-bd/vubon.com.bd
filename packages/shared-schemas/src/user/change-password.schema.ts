/**
 * Change Password Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { AuthPasswordSchema } from '../auth/auth-password.schema';

export const ChangePasswordRequestSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required').max(128),
    newPassword: AuthPasswordSchema,
    confirmPassword: z.string().min(1),
  })
  .strict()
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordRequestSchemaType = z.infer<typeof ChangePasswordRequestSchema>;

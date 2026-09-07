import { z } from 'zod';
import { PasswordSchema, PasswordConfirmSchema } from '../common/password.schema';

export const AuthPasswordSchema = PasswordSchema;
export const AuthPasswordConfirmSchema = PasswordConfirmSchema;

export const AuthPasswordResetSchema = z
  .object({
    token: z.string(),
    newPassword: PasswordSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

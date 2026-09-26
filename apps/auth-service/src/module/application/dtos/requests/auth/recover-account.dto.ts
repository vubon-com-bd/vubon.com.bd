/**
 * RecoverAccountRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';
import { EmailSchema, UuidSchema } from '@vubon/shared-schemas/common';

export const RecoverAccountSchema = z
  .object({
    email: EmailSchema,
    recoveryCode: z
      .string()
      .regex(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/, 'Format: XXXX-XXXX'),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(1),
    challengeId: UuidSchema.optional(),
  })
  .strict()
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RecoverAccountRequestDTO = z.infer<typeof RecoverAccountSchema>;

export function validateRecoverAccountRequest(
  input: unknown,
): RecoverAccountRequestDTO {
  return RecoverAccountSchema.parse(input);
}

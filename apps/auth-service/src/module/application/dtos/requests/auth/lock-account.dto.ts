/**
 * LockAccountRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const LockAccountSchema = z
  .object({
    userId: UuidSchema,
    reason: z.enum([
      'too_many_attempts', 'suspicious_activity', 'admin_action',
      'payment_fraud', 'policy_violation', 'security_incident',
    ]),
    durationMinutes: z.number().int().min(1).max(60 * 24 * 365).optional(),
    note: z.string().max(500).optional(),
  })
  .strict();

export type LockAccountRequestDTO = z.infer<typeof LockAccountSchema>;

export function validateLockAccountRequest(
  input: unknown,
): LockAccountRequestDTO {
  return LockAccountSchema.parse(input);
}

/**
 * Lock Account Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const LockAccountRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    reason: z.enum(['too_many_attempts', 'suspicious_activity', 'manual_admin', 'policy_violation', 'security_breach']),
    durationSeconds: z.number().int().min(60).max(30 * 24 * 3600).optional(),
  })
  .strict();

export type LockAccountRequestDTO = z.infer<typeof LockAccountRequestSchema>;

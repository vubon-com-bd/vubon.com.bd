/**
 * Verify Contact Request DTO
 * @module identity-service/application/dtos/requests/contact
 */
import { z } from 'zod';

export const VerifyContactRequestSchema = z
  .object({
    contactId: z.string().uuid(),
    code: z.string().regex(/^\d{4,8}$/),
  })
  .strict();

export type VerifyContactRequestDTO = z.infer<typeof VerifyContactRequestSchema>;

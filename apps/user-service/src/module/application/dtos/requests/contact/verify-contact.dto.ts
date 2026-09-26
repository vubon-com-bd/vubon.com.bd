import { z } from 'zod';

export const VerifyContactRequestSchema = z.object({
  contactId: z.string().min(1),
  code: z.string().min(4).max(8),
});

export type VerifyContactRequestDTO = z.infer<typeof VerifyContactRequestSchema>;

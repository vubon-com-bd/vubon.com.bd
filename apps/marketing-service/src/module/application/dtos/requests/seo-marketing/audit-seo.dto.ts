import { z } from 'zod';

export const AuditSeoRequestSchema = z.object({
  pageUrl: z.string().url(),
});

export type AuditSeoRequestDTO = z.infer<typeof AuditSeoRequestSchema>;

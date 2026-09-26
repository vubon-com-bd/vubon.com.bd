import { z } from 'zod';

export const CreateEmailTemplateRequestSchema = z.object({
  name: z.string().min(1).max(100),
  subject: z.string().min(1).max(300),
  html: z.string().min(1),
  language: z.string().min(2).max(5).optional(),
  variables: z.array(z.string()).optional(),
});

export type CreateEmailTemplateRequestDTO = z.infer<typeof CreateEmailTemplateRequestSchema>;

import { z } from 'zod';

export const CreateTemplateRequestSchema = z.object({
  name: z.string().min(2).max(100),
  type: z.string().min(1).max(50),
  content: z.string().min(1).max(5000),
  variables: z.array(z.string()).optional(),
});

export type CreateTemplateRequestDTO = z.infer<typeof CreateTemplateRequestSchema>;

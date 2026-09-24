import { z } from 'zod';

export const UpdateTemplateRequestSchema = z.object({
  templateId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  content: z.string().min(1).max(5000).optional(),
  variables: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateTemplateRequestDTO = z.infer<typeof UpdateTemplateRequestSchema>;

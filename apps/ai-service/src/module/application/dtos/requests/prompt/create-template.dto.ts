import { z } from 'zod';
import { AiPromptRoleSchema } from '@vubon/shared-schemas/ai';

export const CreateTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  template: z.string().min(1).max(10000),
  role: AiPromptRoleSchema.default('user'),
});

export type CreateTemplateRequestDTO = z.infer<typeof CreateTemplateSchema>;

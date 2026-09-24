import { z } from 'zod';
import {
  NotificationTemplateStatusSchema,
  TemplateVariableSchema,
} from '@vubon/shared-schemas/platform/notification';

export const UpdateTemplateSchema = z.object({
  templateId: z.string().uuid(),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(500000).optional(),
  bodyHtml: z.string().max(500000).optional(),
  status: NotificationTemplateStatusSchema.optional(),
  variables: z.array(TemplateVariableSchema).max(50).optional(),
});

export type UpdateTemplateRequestDTO = z.infer<typeof UpdateTemplateSchema>;

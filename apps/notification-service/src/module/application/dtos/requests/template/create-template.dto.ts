import { z } from 'zod';
import {
  NotificationTemplateTypeSchema,
  NotificationTemplateStatusSchema,
  NotificationTemplateCategorySchema,
  TemplateVariableSchema,
} from '@vubon/shared-schemas/platform/notification';

export const CreateTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  type: NotificationTemplateTypeSchema,
  category: NotificationTemplateCategorySchema,
  status: NotificationTemplateStatusSchema.optional(),
  locale: z.string().min(2).max(10).default('en'),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(500000),
  bodyHtml: z.string().max(500000).optional(),
  variables: z.array(TemplateVariableSchema).max(50).default([]),
});

export type CreateTemplateRequestDTO = z.infer<typeof CreateTemplateSchema>;

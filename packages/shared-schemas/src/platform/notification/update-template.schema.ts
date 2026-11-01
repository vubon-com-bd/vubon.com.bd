/**
 * Update Notification Template Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationTemplateStatusSchema, TemplateVariableSchema } from './notification-template.schema.js';

export const UpdateNotificationTemplateRequestSchema = z
  .object({
    templateId: UuidSchema,
    name: z.string().trim().min(3).max(100).optional(),
    subject: z.string().trim().min(1).max(200).optional(),
    body: z.string().trim().min(1).max(500000).optional(),
    bodyHtml: z.string().max(500000).optional(),
    variables: z.array(TemplateVariableSchema).max(50).optional(),
    status: NotificationTemplateStatusSchema.optional(),
    locale: z.string().min(2).max(10).optional(),
    updatedBy: UuidSchema.optional(),
  })
  .strict()
  .refine((d) => Object.keys(d).length > 1, {
    message: 'At least one field to update is required',
  });

export type UpdateNotificationTemplateRequestSchemaType = z.infer<
  typeof UpdateNotificationTemplateRequestSchema
>;

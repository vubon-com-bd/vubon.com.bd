/**
 * Create Notification Template Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationTemplateTypeSchema, NotificationTemplateCategorySchema } from './notification-template.schema.js';
import { TemplateVariableSchema } from './notification-template.schema.js';

const TemplateBodySchema = z.string().trim().min(1).max(500000);

export const CreateNotificationTemplateRequestSchema = z
  .object({
    name: z.string().trim().min(3).max(100),
    slug: z.string().trim().min(3).max(100).regex(/^[a-z0-9-]+$/),
    type: NotificationTemplateTypeSchema,
    category: NotificationTemplateCategorySchema,
    locale: z.string().min(2).max(10).default('en'),
    subject: z.string().trim().min(1).max(200).optional(),
    body: TemplateBodySchema,
    bodyHtml: z.string().max(500000).optional(),
    variables: z.array(TemplateVariableSchema).max(50).default([]),
    parentId: UuidSchema.optional(),
    createdBy: UuidSchema.optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type CreateNotificationTemplateRequestSchemaType = z.infer<
  typeof CreateNotificationTemplateRequestSchema
>;

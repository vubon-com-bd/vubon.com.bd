/**
 * Notification Template Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-template.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_TEMPLATE_TYPE,
  NOTIFICATION_TEMPLATE_STATUS,
  NOTIFICATION_TEMPLATE_CATEGORY,
} from '@vubon/shared-constants/platform';

export const NotificationTemplateTypeSchema = z.enum(
  Object.values(NOTIFICATION_TEMPLATE_TYPE) as [string, ...string[]]
);

export const NotificationTemplateStatusSchema = z.enum(
  Object.values(NOTIFICATION_TEMPLATE_STATUS) as [string, ...string[]]
);

export const NotificationTemplateCategorySchema = z.enum(
  Object.values(NOTIFICATION_TEMPLATE_CATEGORY) as [string, ...string[]]
);

export const TemplateVariableSchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['string', 'number', 'boolean', 'date', 'url', 'email']),
  required: z.boolean(),
  defaultValue: z.string().max(500).optional(),
  description: z.string().max(500).optional(),
});

export const NotificationTemplateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  type: NotificationTemplateTypeSchema,
  status: NotificationTemplateStatusSchema,
  category: NotificationTemplateCategorySchema,
  locale: z.string().min(2).max(10),
  subject: z.string().max(200).optional(),
  body: z.string().min(1).max(500000),
  bodyHtml: z.string().max(500000).optional(),
  variables: z.array(TemplateVariableSchema).max(50),
  version: z.number().int().positive(),
  parentId: z.string().optional(),
  createdBy: z.string().min(1),
  updatedBy: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type NotificationTemplateTypeSchemaType = z.infer<typeof NotificationTemplateTypeSchema>;
export type NotificationTemplateStatusSchemaType = z.infer<typeof NotificationTemplateStatusSchema>;
export type NotificationTemplateSchemaType = z.infer<typeof NotificationTemplateSchema>;

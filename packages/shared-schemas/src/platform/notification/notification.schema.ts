/**
 * Notification Core Schema
 * @module shared-schemas/platform/notification
 *
 * Notification entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { NotificationTypeSchema } from './notification-type.schema';
import { NotificationChannelSchema } from './notification-channel.schema';
import { NotificationStatusSchema } from './notification-status.schema';
import { NotificationPrioritySchema } from './notification-priority.schema';
import { NotificationCategorySchema } from './notification-category.schema';
import { NotificationDeliveryMetadataSchema } from './notification-delivery-status.schema';
import { NotificationReadMetadataSchema } from './notification-read-status.schema';
import { NotificationActionSchema } from './notification-action.schema';

export const NotificationSchema = BaseEntitySchema.extend({
  userId: UuidSchema,
  type: NotificationTypeSchema,
  category: NotificationCategorySchema,
  channel: NotificationChannelSchema,
  priority: NotificationPrioritySchema,
  status: NotificationStatusSchema,
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(2000),
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
  actionUrl: z.string().url().optional(),
  actions: z.array(NotificationActionSchema).max(5).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  delivery: NotificationDeliveryMetadataSchema.optional(),
  read: NotificationReadMetadataSchema.optional(),
  scheduledAt: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  reference: z
    .object({
      type: z.string().min(1).max(50),
      id: z.string().min(1).max(100),
      url: z.string().url().optional(),
    })
    .optional(),
});

export const NotificationPublicSchema = NotificationSchema.pick({
  id: true,
  type: true,
  category: true,
  channel: true,
  priority: true,
  status: true,
  title: true,
  body: true,
  imageUrl: true,
  actionUrl: true,
  actions: true,
  createdAt: true,
  read: true,
});

export const NotificationSummarySchema = NotificationSchema.pick({
  id: true,
  title: true,
  type: true,
  channel: true,
  status: true,
  createdAt: true,
}).extend({
  isRead: z.boolean(),
});

export const NotificationListFilterSchema = z.object({
  userId: UuidSchema.optional(),
  type: NotificationTypeSchema.optional(),
  category: NotificationCategorySchema.optional(),
  channel: NotificationChannelSchema.optional(),
  status: NotificationStatusSchema.optional(),
  priority: NotificationPrioritySchema.optional(),
  isRead: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type NotificationSchemaType = z.infer<typeof NotificationSchema>;
export type NotificationPublicSchemaType = z.infer<typeof NotificationPublicSchema>;
export type NotificationSummarySchemaType = z.infer<typeof NotificationSummarySchema>;
export type NotificationListFilterSchemaType = z.infer<typeof NotificationListFilterSchema>;

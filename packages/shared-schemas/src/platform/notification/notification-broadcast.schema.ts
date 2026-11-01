/**
 * Notification Broadcast Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-broadcast.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_BROADCAST_TYPE,
  NOTIFICATION_BROADCAST_STATUS,
  NOTIFICATION_BROADCAST_TARGET,
} from '@vubon/shared-constants/platform';

export const NotificationBroadcastTypeSchema = z.enum(
  Object.values(NOTIFICATION_BROADCAST_TYPE) as [string, ...string[]]
);

export const NotificationBroadcastStatusSchema = z.enum(
  Object.values(NOTIFICATION_BROADCAST_STATUS) as [string, ...string[]]
);

export const NotificationBroadcastTargetSchema = z.enum(
  Object.values(NOTIFICATION_BROADCAST_TARGET) as [string, ...string[]]
);

export const NotificationBroadcastSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: NotificationBroadcastTypeSchema,
  target: NotificationBroadcastTargetSchema,
  status: NotificationBroadcastStatusSchema,
  channels: z.array(z.string().min(1).max(50)).min(1).max(10),
  templateId: z.string().max(100).optional(),
  content: z.string().max(500000).optional(),
  recipientCount: z.number().int().nonnegative(),
  sentCount: z.number().int().nonnegative(),
  failedCount: z.number().int().nonnegative(),
  scheduledAt: z.string().datetime().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  createdBy: z.string().min(1),
  approvedBy: z.string().optional(),
  createdAt: z.string().datetime(),
});

export const NotificationBroadcastStatsSchema = z.object({
  broadcastId: z.string().min(1),
  recipientCount: z.number().int().nonnegative(),
  sentCount: z.number().int().nonnegative(),
  deliveredCount: z.number().int().nonnegative(),
  failedCount: z.number().int().nonnegative(),
  openRate: z.number().min(0).max(1).optional(),
  clickRate: z.number().min(0).max(1).optional(),
});

export type NotificationBroadcastTypeSchemaType = z.infer<typeof NotificationBroadcastTypeSchema>;
export type NotificationBroadcastStatusSchemaType = z.infer<
  typeof NotificationBroadcastStatusSchema
>;
export type NotificationBroadcastTargetSchemaType = z.infer<
  typeof NotificationBroadcastTargetSchema
>;
export type NotificationBroadcastSchemaType = z.infer<typeof NotificationBroadcastSchema>;

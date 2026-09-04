/**
 * Admin Notification Schema
 * অ্যাডমিন নোটিফিকেশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_NOTIFICATION } from '@vubon/shared-constants';

export const AdminNotificationSchema = BaseSchema.extend({
  adminId: z.string().uuid(),
  type: z.enum([
    ADMIN_NOTIFICATION.TYPES.EMAIL,
    ADMIN_NOTIFICATION.TYPES.SMS,
    ADMIN_NOTIFICATION.TYPES.PUSH,
    ADMIN_NOTIFICATION.TYPES.IN_APP,
    ADMIN_NOTIFICATION.TYPES.SYSTEM,
    ADMIN_NOTIFICATION.TYPES.ALERT,
  ]),
  priority: z
    .enum([
      ADMIN_NOTIFICATION.PRIORITIES.LOW,
      ADMIN_NOTIFICATION.PRIORITIES.MEDIUM,
      ADMIN_NOTIFICATION.PRIORITIES.HIGH,
      ADMIN_NOTIFICATION.PRIORITIES.URGENT,
      ADMIN_NOTIFICATION.PRIORITIES.CRITICAL,
    ])
    .default(ADMIN_NOTIFICATION.PRIORITIES.MEDIUM),
  status: z
    .enum([
      ADMIN_NOTIFICATION.STATUS.PENDING,
      ADMIN_NOTIFICATION.STATUS.SENT,
      ADMIN_NOTIFICATION.STATUS.DELIVERED,
      ADMIN_NOTIFICATION.STATUS.READ,
      ADMIN_NOTIFICATION.STATUS.FAILED,
      ADMIN_NOTIFICATION.STATUS.CANCELLED,
    ])
    .default(ADMIN_NOTIFICATION.STATUS.PENDING),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(1000, 'Message must be less than 1000 characters'),
  data: z.record(z.unknown()).optional(),
  readAt: z.date().optional(),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const AdminNotificationCreateSchema = AdminNotificationSchema.omit({
  id: true,
  status: true,
  readAt: true,
  sentAt: true,
  deliveredAt: true,
  createdAt: true,
  updatedAt: true,
});

export const AdminNotificationUpdateSchema = z.object({
  status: AdminNotificationSchema.shape.status.optional(),
  readAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type AdminNotificationSchemaType = z.infer<typeof AdminNotificationSchema>;
export type AdminNotificationCreateSchemaType = z.infer<typeof AdminNotificationCreateSchema>;
export type AdminNotificationUpdateSchemaType = z.infer<typeof AdminNotificationUpdateSchema>;

/**
 * Admin Notification Schema
 * Zod schemas for admin notification definitions
 */

import { z } from 'zod';
import {
  ADMIN_NOTIFICATION_TYPE,
  ADMIN_NOTIFICATION_CHANNEL,
  ADMIN_NOTIFICATION_PRIORITY,
  ADMIN_NOTIFICATION_STATUS,
} from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  nullable,
  stringWithLength,
} from '../common/core-primitives.schema';

/**
 * Admin notification type enum schema (from constants)
 */
export const adminNotificationTypeSchema = z.enum([
  'system',
  'security',
  'admin',
  'user',
  'order',
  'payment',
  'product',
  'report',
  'task',
  'reminder',
  'alert',
  'info',
  'success',
  'warning',
  'error',
]);

/**
 * Admin notification channel enum schema (from constants)
 */
export const adminNotificationChannelSchema = z.enum([
  'email',
  'sms',
  'push',
  'in_app',
  'slack',
  'telegram',
  'whatsapp',
  'webhook',
  'desktop',
]);

/**
 * Admin notification priority enum schema (from constants)
 */
export const adminNotificationPrioritySchema = z.enum([
  'low',
  'normal',
  'high',
  'urgent',
  'critical',
]);

/**
 * Admin notification status enum schema (from constants)
 */
export const adminNotificationStatusSchema = z.enum([
  'pending',
  'sent',
  'delivered',
  'read',
  'dismissed',
  'failed',
  'scheduled',
  'cancelled',
]);

/**
 * Admin notification template enum schema (from constants)
 */
export const adminNotificationTemplateSchema = z.enum([
  'admin_created',
  'admin_updated',
  'admin_deleted',
  'admin_suspended',
  'admin_role_changed',
  'admin_password_reset',
  'admin_login_alert',
  'admin_mfa_enabled',
  'admin_mfa_disabled',
  'user_created',
  'user_updated',
  'user_suspended',
  'user_verified',
  'order_created',
  'order_updated',
  'order_cancelled',
  'payment_received',
  'payment_refunded',
  'report_ready',
  'system_maintenance',
  'system_backup',
  'security_alert',
  'daily_digest',
  'weekly_digest',
]);

/**
 * Admin notification schema
 */
export const adminNotificationSchema = z.object({
  id: idSchema,
  adminId: idSchema,
  type: adminNotificationTypeSchema,
  channel: adminNotificationChannelSchema,
  priority: adminNotificationPrioritySchema,
  status: adminNotificationStatusSchema,
  template: adminNotificationTemplateSchema,
  subject: stringWithLength(1, 255),
  body: z.string(),
  link: nullable(z.string()),
  linkLabel: nullable(stringWithLength(1, 100)),
  icon: nullable(stringWithLength(1, 50)),
  color: nullable(z.string()),
  metadata: nullable(jsonObjectSchema),
  sentAt: nullable(timestampSchema),
  deliveredAt: nullable(timestampSchema),
  readAt: nullable(timestampSchema),
  dismissedAt: nullable(timestampSchema),
  failedReason: nullable(z.string()),
  scheduledAt: nullable(timestampSchema),
  cancelledAt: nullable(timestampSchema),
  isArchived: z.boolean().default(false),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  deletedAt: nullable(timestampSchema).default(null),
});

/**
 * Admin notification create data schema
 */
export const adminNotificationCreateDataSchema = z.object({
  adminId: idSchema,
  type: adminNotificationTypeSchema,
  channel: adminNotificationChannelSchema,
  priority: adminNotificationPrioritySchema,
  template: adminNotificationTemplateSchema,
  subject: stringWithLength(1, 255),
  body: z.string(),
  link: z.string().optional(),
  linkLabel: stringWithLength(1, 100).optional(),
  icon: stringWithLength(1, 50).optional(),
  color: z.string().optional(),
  metadata: jsonObjectSchema.optional(),
  scheduledAt: timestampSchema.optional(),
});

/**
 * Admin notification update data schema
 */
export const adminNotificationUpdateDataSchema = z.object({
  status: adminNotificationStatusSchema.optional(),
  subject: stringWithLength(1, 255).optional(),
  body: z.string().optional(),
  link: z.string().optional(),
  linkLabel: stringWithLength(1, 100).optional(),
  icon: stringWithLength(1, 50).optional(),
  color: z.string().optional(),
  metadata: jsonObjectSchema.optional(),
  failedReason: z.string().optional(),
  cancelledAt: timestampSchema.optional(),
  isArchived: z.boolean().optional(),
});

/**
 * Admin notification filter parameters schema
 */
export const adminNotificationFilterParamsSchema = z.object({
  adminId: idSchema.optional(),
  type: z.union([adminNotificationTypeSchema, z.array(adminNotificationTypeSchema)]).optional(),
  channel: z
    .union([adminNotificationChannelSchema, z.array(adminNotificationChannelSchema)])
    .optional(),
  priority: z
    .union([adminNotificationPrioritySchema, z.array(adminNotificationPrioritySchema)])
    .optional(),
  status: z
    .union([adminNotificationStatusSchema, z.array(adminNotificationStatusSchema)])
    .optional(),
  template: z
    .union([adminNotificationTemplateSchema, z.array(adminNotificationTemplateSchema)])
    .optional(),
  isArchived: z.boolean().optional(),
  createdDateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  scheduledDateRange: z
    .object({
      start: timestampSchema.optional(),
      end: timestampSchema.optional(),
    })
    .optional(),
  search: z.string().optional(),
});

/**
 * Admin notification statistics schema
 */
export const adminNotificationStatisticsSchema = z.object({
  totalNotifications: z.number().int().min(0),
  typeCounts: z.record(z.string(), z.number().int().min(0)),
  channelCounts: z.record(z.string(), z.number().int().min(0)),
  priorityCounts: z.record(z.string(), z.number().int().min(0)),
  statusCounts: z.record(z.string(), z.number().int().min(0)),
  deliveredCount: z.number().int().min(0),
  readCount: z.number().int().min(0),
  failedCount: z.number().int().min(0),
  pendingCount: z.number().int().min(0),
  deliveryRate: z.number().min(0).max(100),
  readRate: z.number().min(0).max(100),
});

/**
 * Admin notification delivery result schema
 */
export const adminNotificationDeliveryResultSchema = z.object({
  success: z.boolean(),
  notification: adminNotificationSchema.optional(),
  errorMessage: z.string().optional(),
  deliveredAt: timestampSchema.optional(),
});

/**
 * Type inference from schemas
 */
export type AdminNotificationTypeSchema = z.infer<typeof adminNotificationTypeSchema>;
export type AdminNotificationChannelSchema = z.infer<typeof adminNotificationChannelSchema>;
export type AdminNotificationPrioritySchema = z.infer<typeof adminNotificationPrioritySchema>;
export type AdminNotificationStatusSchema = z.infer<typeof adminNotificationStatusSchema>;
export type AdminNotificationTemplateSchema = z.infer<typeof adminNotificationTemplateSchema>;
export type AdminNotificationSchema = z.infer<typeof adminNotificationSchema>;
export type AdminNotificationCreateDataSchema = z.infer<typeof adminNotificationCreateDataSchema>;
export type AdminNotificationUpdateDataSchema = z.infer<typeof adminNotificationUpdateDataSchema>;
export type AdminNotificationFilterParamsSchema = z.infer<
  typeof adminNotificationFilterParamsSchema
>;
export type AdminNotificationStatisticsSchema = z.infer<typeof adminNotificationStatisticsSchema>;
export type AdminNotificationDeliveryResultSchema = z.infer<
  typeof adminNotificationDeliveryResultSchema
>;

/**
 * Helper function to get notification type label
 */
export function getAdminNotificationTypeLabelFromType(type: AdminNotificationTypeSchema): string {
  const labelMap: Record<AdminNotificationTypeSchema, string> = {
    system: 'System',
    security: 'Security',
    admin: 'Admin',
    user: 'User',
    order: 'Order',
    payment: 'Payment',
    product: 'Product',
    report: 'Report',
    task: 'Task',
    reminder: 'Reminder',
    alert: 'Alert',
    info: 'Info',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
  };
  return labelMap[type] || type;
}

/**
 * Helper function to get notification priority label
 */
export function getAdminNotificationPriorityLabelFromPriority(
  priority: AdminNotificationPrioritySchema
): string {
  const labelMap: Record<AdminNotificationPrioritySchema, string> = {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: 'Urgent',
    critical: 'Critical',
  };
  return labelMap[priority] || priority;
}

/**
 * Helper function to get notification status label
 */
export function getAdminNotificationStatusLabelFromStatus(
  status: AdminNotificationStatusSchema
): string {
  const labelMap: Record<AdminNotificationStatusSchema, string> = {
    pending: 'Pending',
    sent: 'Sent',
    delivered: 'Delivered',
    read: 'Read',
    dismissed: 'Dismissed',
    failed: 'Failed',
    scheduled: 'Scheduled',
    cancelled: 'Cancelled',
  };
  return labelMap[status] || status;
}

/**
 * Helper function to get notification status color
 */
export function getAdminNotificationStatusColorFromStatus(
  status: AdminNotificationStatusSchema
): string {
  const colorMap: Record<AdminNotificationStatusSchema, string> = {
    pending: 'warning',
    sent: 'info',
    delivered: 'success',
    read: 'success',
    dismissed: 'default',
    failed: 'error',
    scheduled: 'info',
    cancelled: 'default',
  };
  return colorMap[status] || 'default';
}

/**
 * Helper function to get notification channel label
 */
export function getAdminNotificationChannelLabelFromChannel(
  channel: AdminNotificationChannelSchema
): string {
  const labelMap: Record<AdminNotificationChannelSchema, string> = {
    email: 'Email',
    sms: 'SMS',
    push: 'Push Notification',
    in_app: 'In-App',
    slack: 'Slack',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    webhook: 'Webhook',
    desktop: 'Desktop',
  };
  return labelMap[channel] || channel;
}

/**
 * Helper function to get notification template label
 */
export function getAdminNotificationTemplateLabelFromTemplate(
  template: AdminNotificationTemplateSchema
): string {
  const labelMap: Record<AdminNotificationTemplateSchema, string> = {
    admin_created: 'Admin Created',
    admin_updated: 'Admin Updated',
    admin_deleted: 'Admin Deleted',
    admin_suspended: 'Admin Suspended',
    admin_role_changed: 'Admin Role Changed',
    admin_password_reset: 'Admin Password Reset',
    admin_login_alert: 'Admin Login Alert',
    admin_mfa_enabled: 'Admin MFA Enabled',
    admin_mfa_disabled: 'Admin MFA Disabled',
    user_created: 'User Created',
    user_updated: 'User Updated',
    user_suspended: 'User Suspended',
    user_verified: 'User Verified',
    order_created: 'Order Created',
    order_updated: 'Order Updated',
    order_cancelled: 'Order Cancelled',
    payment_received: 'Payment Received',
    payment_refunded: 'Payment Refunded',
    report_ready: 'Report Ready',
    system_maintenance: 'System Maintenance',
    system_backup: 'System Backup',
    security_alert: 'Security Alert',
    daily_digest: 'Daily Digest',
    weekly_digest: 'Weekly Digest',
  };
  return labelMap[template] || template;
}

/**
 * Helper function to check if notification is delivered
 */
export function isAdminNotificationDeliveredFromStatus(
  status: AdminNotificationStatusSchema
): boolean {
  const deliveredStatuses: AdminNotificationStatusSchema[] = ['delivered', 'read', 'dismissed'];
  return deliveredStatuses.includes(status);
}

/**
 * Helper function to check if notification needs action
 */
export function adminNotificationNeedsActionFromType(type: AdminNotificationTypeSchema): boolean {
  const actionTypes: AdminNotificationTypeSchema[] = [
    'security',
    'alert',
    'error',
    'task',
    'reminder',
  ];
  return actionTypes.includes(type);
}

/**
 * Helper function to get notification priority level (number)
 */
export function getAdminNotificationPriorityLevelFromPriority(
  priority: AdminNotificationPrioritySchema
): number {
  const levels: Record<AdminNotificationPrioritySchema, number> = {
    low: 0,
    normal: 1,
    high: 2,
    urgent: 3,
    critical: 4,
  };
  return levels[priority] || 0;
}

/**
 * Helper function to create notification statistics from array
 */
export function createAdminNotificationStatisticsFromArray(
  notifications: AdminNotificationSchema[]
): AdminNotificationStatisticsSchema {
  const stats: AdminNotificationStatisticsSchema = {
    totalNotifications: notifications.length,
    typeCounts: {},
    channelCounts: {},
    priorityCounts: {},
    statusCounts: {},
    deliveredCount: 0,
    readCount: 0,
    failedCount: 0,
    pendingCount: 0,
    deliveryRate: 0,
    readRate: 0,
  };

  notifications.forEach((notification) => {
    const type = notification.type as AdminNotificationTypeSchema;
    const channel = notification.channel as AdminNotificationChannelSchema;
    const priority = notification.priority as AdminNotificationPrioritySchema;
    const status = notification.status as AdminNotificationStatusSchema;

    stats.typeCounts[type] = (stats.typeCounts[type] || 0) + 1;
    stats.channelCounts[channel] = (stats.channelCounts[channel] || 0) + 1;
    stats.priorityCounts[priority] = (stats.priorityCounts[priority] || 0) + 1;
    stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;

    if (isAdminNotificationDeliveredFromStatus(status)) {
      stats.deliveredCount++;
    }
    if (status === 'read') {
      stats.readCount++;
    }
    if (status === 'failed') {
      stats.failedCount++;
    }
    if (status === 'pending' || status === 'scheduled') {
      stats.pendingCount++;
    }
  });

  const sentNotifications = stats.totalNotifications - stats.pendingCount - stats.failedCount;
  stats.deliveryRate = sentNotifications > 0 ? (stats.deliveredCount / sentNotifications) * 100 : 0;
  stats.readRate = stats.deliveredCount > 0 ? (stats.readCount / stats.deliveredCount) * 100 : 0;

  return stats;
}

/**
 * Get notification type options for dropdown
 */
export function getAdminNotificationTypeOptions(): Array<{
  value: AdminNotificationTypeSchema;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_TYPE) as AdminNotificationTypeSchema[]).map((type) => ({
    value: type,
    label: getAdminNotificationTypeLabelFromType(type),
  }));
}

/**
 * Get notification priority options for dropdown
 */
export function getAdminNotificationPriorityOptions(): Array<{
  value: AdminNotificationPrioritySchema;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_PRIORITY) as AdminNotificationPrioritySchema[]).map(
    (priority) => ({
      value: priority,
      label: getAdminNotificationPriorityLabelFromPriority(priority),
    })
  );
}

/**
 * Get notification channel options for dropdown
 */
export function getAdminNotificationChannelOptions(): Array<{
  value: AdminNotificationChannelSchema;
  label: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_CHANNEL) as AdminNotificationChannelSchema[]).map(
    (channel) => ({
      value: channel,
      label: getAdminNotificationChannelLabelFromChannel(channel),
    })
  );
}

/**
 * Get notification status options for dropdown
 */
export function getAdminNotificationStatusOptions(): Array<{
  value: AdminNotificationStatusSchema;
  label: string;
  color: string;
}> {
  return (Object.values(ADMIN_NOTIFICATION_STATUS) as AdminNotificationStatusSchema[]).map(
    (status) => ({
      value: status,
      label: getAdminNotificationStatusLabelFromStatus(status),
      color: getAdminNotificationStatusColorFromStatus(status),
    })
  );
}

/**
 * Export schemas as an object for convenient access
 */
export const adminNotificationSchemas = {
  notification: adminNotificationSchema,
  type: adminNotificationTypeSchema,
  channel: adminNotificationChannelSchema,
  priority: adminNotificationPrioritySchema,
  status: adminNotificationStatusSchema,
  template: adminNotificationTemplateSchema,
  createData: adminNotificationCreateDataSchema,
  updateData: adminNotificationUpdateDataSchema,
  filter: adminNotificationFilterParamsSchema,
  statistics: adminNotificationStatisticsSchema,
  deliveryResult: adminNotificationDeliveryResultSchema,
  getTypeLabel: getAdminNotificationTypeLabelFromType,
  getPriorityLabel: getAdminNotificationPriorityLabelFromPriority,
  getStatusLabel: getAdminNotificationStatusLabelFromStatus,
  getStatusColor: getAdminNotificationStatusColorFromStatus,
  getChannelLabel: getAdminNotificationChannelLabelFromChannel,
  getTemplateLabel: getAdminNotificationTemplateLabelFromTemplate,
  isDelivered: isAdminNotificationDeliveredFromStatus,
  needsAction: adminNotificationNeedsActionFromType,
  getPriorityLevel: getAdminNotificationPriorityLevelFromPriority,
  createStatistics: createAdminNotificationStatisticsFromArray,
  getTypeOptions: getAdminNotificationTypeOptions,
  getPriorityOptions: getAdminNotificationPriorityOptions,
  getChannelOptions: getAdminNotificationChannelOptions,
  getStatusOptions: getAdminNotificationStatusOptions,
};

export default adminNotificationSchemas;

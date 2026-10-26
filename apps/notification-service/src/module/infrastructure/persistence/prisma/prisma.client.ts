/**
 * Notification Service Prisma Client Type Re-export
 * @module notification-service/infrastructure/persistence/prisma
 */
export type {
  PrismaClientType,
  PrismaClientOptions,
} from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export type {
  Notification as PrismaNotification,
  NotificationTemplate as PrismaNotificationTemplate,
  NotificationSchedule as PrismaNotificationSchedule,
  NotificationBroadcast as PrismaNotificationBroadcast,
  NotificationBroadcastBatch as PrismaNotificationBroadcastBatch,
  NotificationDigest as PrismaNotificationDigest,
  NotificationDigestItem as PrismaNotificationDigestItem,
  NotificationPreference as PrismaNotificationPreference,
  NotificationDevice as PrismaNotificationDevice,
  NotificationWebhook as PrismaNotificationWebhook,
  NotificationWebhookDelivery as PrismaNotificationWebhookDelivery,
  NotificationDeliveryAttempt as PrismaNotificationDeliveryAttempt,
  NotificationEvent as PrismaNotificationEvent,
  NotificationRateLimit as PrismaNotificationRateLimit,
  NotificationUnsubscribe as PrismaNotificationUnsubscribe,
  NotificationBounce as PrismaNotificationBounce,
  NotificationActionLog as PrismaNotificationActionLog,
  NotificationRule as PrismaNotificationRule,
  NotificationAuditLog as PrismaNotificationAuditLog,
} from '@prisma/client';

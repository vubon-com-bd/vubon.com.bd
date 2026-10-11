// commands/notification/index.ts — Notification command exports + handlers
export * from './send-notification.command.js';
export * from './send-notification.handler.js';
export * from './send-notification-to-many.command.js';
export * from './send-notification-to-many.handler.js';
export * from './schedule-notification.command.js';
export * from './schedule-notification.handler.js';
export * from './cancel-notification.command.js';
export * from './cancel-notification.handler.js';
export * from './update-notification.command.js';
export * from './update-notification.handler.js';
export * from './delete-notification.command.js';
export * from './delete-notification.handler.js';
export * from './retry-notification.command.js';
export * from './retry-notification.handler.js';
export * from './mark-notification-read.command.js';
export * from './mark-notification-read.handler.js';
export * from './mark-notifications-read.command.js';
export * from './mark-notifications-read.handler.js';
export * from './mark-all-read.command.js';
export * from './mark-all-read.handler.js';
export * from './archive-notification.command.js';
export * from './archive-notification.handler.js';
export * from './snooze-notification.command.js';
export * from './snooze-notification.handler.js';
export * from './star-notification.command.js';
export * from './star-notification.handler.js';

import { SendNotificationHandler } from './send-notification.handler.js';
import { SendNotificationToManyHandler } from './send-notification-to-many.handler.js';
import { ScheduleNotificationHandler } from './schedule-notification.handler.js';
import { CancelNotificationHandler } from './cancel-notification.handler.js';
import { UpdateNotificationHandler } from './update-notification.handler.js';
import { DeleteNotificationHandler } from './delete-notification.handler.js';
import { RetryNotificationHandler } from './retry-notification.handler.js';
import { MarkNotificationReadHandler } from './mark-notification-read.handler.js';
import { MarkNotificationsReadHandler } from './mark-notifications-read.handler.js';
import { MarkAllReadHandler } from './mark-all-read.handler.js';
import { ArchiveNotificationHandler } from './archive-notification.handler.js';
import { SnoozeNotificationHandler } from './snooze-notification.handler.js';
import { StarNotificationHandler } from './star-notification.handler.js';

export const NOTIFICATION_COMMAND_HANDLERS = [
  SendNotificationHandler,
  SendNotificationToManyHandler,
  ScheduleNotificationHandler,
  CancelNotificationHandler,
  UpdateNotificationHandler,
  DeleteNotificationHandler,
  RetryNotificationHandler,
  MarkNotificationReadHandler,
  MarkNotificationsReadHandler,
  MarkAllReadHandler,
  ArchiveNotificationHandler,
  SnoozeNotificationHandler,
  StarNotificationHandler,
] as const;

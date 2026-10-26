/**
 * Notification Command Handlers Barrel
 * @module notification-service/modules/notification/commands
 */
import { SendNotificationHandler } from '@application/commands/notification/send-notification.handler.js';
import { SendBulkNotificationHandler } from '@application/commands/notification/send-bulk.handler.js';
import { ResendNotificationHandler } from '@application/commands/notification/resend-notification.handler.js';
import { CancelNotificationHandler } from '@application/commands/notification/cancel-notification.handler.js';

export const NOTIFICATION_COMMAND_HANDLERS = [
  SendNotificationHandler,
  SendBulkNotificationHandler,
  ResendNotificationHandler,
  CancelNotificationHandler,
] as const;

export {
  SendNotificationHandler,
  SendBulkNotificationHandler,
  ResendNotificationHandler,
  CancelNotificationHandler,
};

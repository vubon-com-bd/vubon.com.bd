/**
 * Notification Query Handlers Barrel
 * @module notification-service/modules/notification/queries
 */
import { GetNotificationHandler } from '@application/queries/notification/get-notification.handler.js';
import { GetNotificationDetailHandler } from '@application/queries/notification/get-notification-detail.handler.js';
import { GetPublicNotificationHandler } from '@application/queries/notification/get-public-notification.handler.js';
import { ListNotificationsHandler } from '@application/queries/notification/list-notifications.handler.js';
import { GetUserFeedHandler } from '@application/queries/notification/get-user-feed.handler.js';
import { CountUnreadHandler } from '@application/queries/notification/count-unread.handler.js';
import { GetNotificationStatsHandler } from '@application/queries/notification/get-notification-stats.handler.js';

export const NOTIFICATION_QUERY_HANDLERS = [
  GetNotificationHandler,
  GetNotificationDetailHandler,
  GetPublicNotificationHandler,
  ListNotificationsHandler,
  GetUserFeedHandler,
  CountUnreadHandler,
  GetNotificationStatsHandler,
] as const;

export {
  GetNotificationHandler,
  GetNotificationDetailHandler,
  GetPublicNotificationHandler,
  ListNotificationsHandler,
  GetUserFeedHandler,
  CountUnreadHandler,
  GetNotificationStatsHandler,
};

// queries/notification/index.ts
export * from './get-notification-by-id.query.js';
export * from './get-notification-by-id.handler.js';
export * from './get-notification-public.query.js';
export * from './get-notification-public.handler.js';
export * from './get-notification-detail.query.js';
export * from './get-notification-detail.handler.js';
export * from './list-notifications.query.js';
export * from './list-notifications.handler.js';
export * from './get-notification-stats.query.js';
export * from './get-notification-stats.handler.js';
export * from './get-unread-count.query.js';
export * from './get-unread-count.handler.js';

import { GetNotificationByIdHandler } from './get-notification-by-id.handler.js';
import { GetNotificationPublicHandler } from './get-notification-public.handler.js';
import { GetNotificationDetailHandler } from './get-notification-detail.handler.js';
import { ListNotificationsHandler } from './list-notifications.handler.js';
import { GetNotificationStatsHandler } from './get-notification-stats.handler.js';
import { GetUnreadCountHandler } from './get-unread-count.handler.js';

export const NOTIFICATION_QUERY_HANDLERS = [
  GetNotificationByIdHandler,
  GetNotificationPublicHandler,
  GetNotificationDetailHandler,
  ListNotificationsHandler,
  GetNotificationStatsHandler,
  GetUnreadCountHandler,
] as const;

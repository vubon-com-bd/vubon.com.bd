import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetNotificationByIdHandler } from '../../../../src/module/application/queries/notification/get-notification-by-id.handler.js';
import { GetNotificationByIdQuery } from '../../../../src/module/application/queries/notification/get-notification-by-id.query.js';
import { GetNotificationPublicHandler } from '../../../../src/module/application/queries/notification/get-notification-public.handler.js';
import { GetNotificationPublicQuery } from '../../../../src/module/application/queries/notification/get-notification-public.query.js';
import { GetNotificationDetailHandler } from '../../../../src/module/application/queries/notification/get-notification-detail.handler.js';
import { GetNotificationDetailQuery } from '../../../../src/module/application/queries/notification/get-notification-detail.query.js';
import { ListNotificationsHandler } from '../../../../src/module/application/queries/notification/list-notifications.handler.js';
import { ListNotificationsQuery } from '../../../../src/module/application/queries/notification/list-notifications.query.js';
import { GetNotificationStatsHandler } from '../../../../src/module/application/queries/notification/get-notification-stats.handler.js';
import { GetNotificationStatsQuery } from '../../../../src/module/application/queries/notification/get-notification-stats.query.js';
import { GetUnreadCountHandler } from '../../../../src/module/application/queries/notification/get-unread-count.handler.js';
import { GetUnreadCountQuery } from '../../../../src/module/application/queries/notification/get-unread-count.query.js';
import { FIXED_NOTIFICATION_ID, FIXED_USER_ID } from '../../../helpers/test-factories.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: FIXED_NOTIFICATION_ID }),
    getPublic: jest.fn().mockResolvedValue({ id: FIXED_NOTIFICATION_ID }),
    getDetail: jest.fn().mockResolvedValue({ notification: { id: FIXED_NOTIFICATION_ID } }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    getStats: jest.fn().mockResolvedValue({ total: 0 }),
    getUnreadCount: jest.fn().mockResolvedValue({ userId: FIXED_USER_ID, unreadCount: 0 }),
  } as never;
}

describe('Notification query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('GetNotificationByIdHandler', async () => {
    await new GetNotificationByIdHandler(svc).execute(new GetNotificationByIdQuery(FIXED_NOTIFICATION_ID));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('GetNotificationPublicHandler', async () => {
    await new GetNotificationPublicHandler(svc).execute(new GetNotificationPublicQuery(FIXED_NOTIFICATION_ID));
    expect(svc.getPublic).toHaveBeenCalled();
  });
  it('GetNotificationDetailHandler', async () => {
    await new GetNotificationDetailHandler(svc).execute(new GetNotificationDetailQuery(FIXED_NOTIFICATION_ID));
    expect(svc.getDetail).toHaveBeenCalled();
  });
  it('ListNotificationsHandler', async () => {
    await new ListNotificationsHandler(svc).execute(new ListNotificationsQuery(FIXED_USER_ID, { page: 1, limit: 20 }));
    expect(svc.list).toHaveBeenCalled();
  });
  it('GetNotificationStatsHandler', async () => {
    await new GetNotificationStatsHandler(svc).execute(new GetNotificationStatsQuery(FIXED_USER_ID));
    expect(svc.getStats).toHaveBeenCalled();
  });
  it('GetUnreadCountHandler', async () => {
    await new GetUnreadCountHandler(svc).execute(new GetUnreadCountQuery(FIXED_USER_ID));
    expect(svc.getUnreadCount).toHaveBeenCalled();
  });
});

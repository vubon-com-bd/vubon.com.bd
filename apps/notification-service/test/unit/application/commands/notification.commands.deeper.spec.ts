import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ScheduleNotificationHandler } from '../../../../src/module/application/commands/notification/schedule-notification.handler.js';
import { ScheduleNotificationCommand } from '../../../../src/module/application/commands/notification/schedule-notification.command.js';
import { UpdateNotificationHandler } from '../../../../src/module/application/commands/notification/update-notification.handler.js';
import { UpdateNotificationCommand } from '../../../../src/module/application/commands/notification/update-notification.command.js';
import { DeleteNotificationHandler } from '../../../../src/module/application/commands/notification/delete-notification.handler.js';
import { DeleteNotificationCommand } from '../../../../src/module/application/commands/notification/delete-notification.command.js';
import { RetryNotificationHandler } from '../../../../src/module/application/commands/notification/retry-notification.handler.js';
import { RetryNotificationCommand } from '../../../../src/module/application/commands/notification/retry-notification.command.js';
import { MarkNotificationsReadHandler } from '../../../../src/module/application/commands/notification/mark-notifications-read.handler.js';
import { MarkNotificationsReadCommand } from '../../../../src/module/application/commands/notification/mark-notifications-read.command.js';
import { MarkAllReadHandler } from '../../../../src/module/application/commands/notification/mark-all-read.handler.js';
import { MarkAllReadCommand } from '../../../../src/module/application/commands/notification/mark-all-read.command.js';
import { ArchiveNotificationHandler } from '../../../../src/module/application/commands/notification/archive-notification.handler.js';
import { ArchiveNotificationCommand } from '../../../../src/module/application/commands/notification/archive-notification.command.js';
import { SnoozeNotificationHandler } from '../../../../src/module/application/commands/notification/snooze-notification.handler.js';
import { SnoozeNotificationCommand } from '../../../../src/module/application/commands/notification/snooze-notification.command.js';
import { StarNotificationHandler } from '../../../../src/module/application/commands/notification/star-notification.handler.js';
import { StarNotificationCommand } from '../../../../src/module/application/commands/notification/star-notification.command.js';
import { FIXED_NOTIFICATION_ID, FIXED_USER_ID } from '../../../helpers/test-factories.js';

function mockSvc() {
  return {
    schedule: jest.fn().mockResolvedValue({ success: true }),
    update: jest.fn().mockResolvedValue({ id: 'n-1' }),
    delete: jest.fn().mockResolvedValue(undefined),
    retry: jest.fn().mockResolvedValue({ id: 'n-1' }),
    markManyRead: jest.fn().mockResolvedValue(3),
    markAllRead: jest.fn().mockResolvedValue(5),
    archive: jest.fn().mockResolvedValue({ id: 'n-1' }),
    snooze: jest.fn().mockResolvedValue({ id: 'n-1' }),
    star: jest.fn().mockResolvedValue({ id: 'n-1' }),
  } as never;
}

describe('Notification command handlers (deeper)', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('ScheduleNotificationHandler', async () => {
    await new ScheduleNotificationHandler(svc).execute(
      new ScheduleNotificationCommand({
        userId: FIXED_USER_ID, type: 'transactional', category: 'order',
        channels: ['email'], title: 'T', body: 'B',
        scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      } as never, 'actor'),
    );
    expect(svc.schedule).toHaveBeenCalled();
  });

  it('UpdateNotificationHandler', async () => {
    await new UpdateNotificationHandler(svc).execute(
      new UpdateNotificationCommand({ notificationId: FIXED_NOTIFICATION_ID, title: 'X' } as never, 'actor'),
    );
    expect(svc.update).toHaveBeenCalled();
  });

  it('DeleteNotificationHandler', async () => {
    await new DeleteNotificationHandler(svc).execute(
      new DeleteNotificationCommand({ notificationId: FIXED_NOTIFICATION_ID, softDelete: true }, 'actor'),
    );
    expect(svc.delete).toHaveBeenCalled();
  });

  it('RetryNotificationHandler', async () => {
    await new RetryNotificationHandler(svc).execute(
      new RetryNotificationCommand({ notificationId: FIXED_NOTIFICATION_ID }, 'actor'),
    );
    expect(svc.retry).toHaveBeenCalled();
  });

  it('MarkNotificationsReadHandler', async () => {
    await new MarkNotificationsReadHandler(svc).execute(
      new MarkNotificationsReadCommand({
        notificationIds: [FIXED_NOTIFICATION_ID], userId: FIXED_USER_ID,
      }),
    );
    expect(svc.markManyRead).toHaveBeenCalled();
  });

  it('MarkAllReadHandler', async () => {
    await new MarkAllReadHandler(svc).execute(
      new MarkAllReadCommand({ userId: FIXED_USER_ID }),
    );
    expect(svc.markAllRead).toHaveBeenCalled();
  });

  it('ArchiveNotificationHandler', async () => {
    await new ArchiveNotificationHandler(svc).execute(
      new ArchiveNotificationCommand({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
    );
    expect(svc.archive).toHaveBeenCalled();
  });

  it('SnoozeNotificationHandler', async () => {
    await new SnoozeNotificationHandler(svc).execute(
      new SnoozeNotificationCommand({
        notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
        snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
      }),
    );
    expect(svc.snooze).toHaveBeenCalled();
  });

  it('StarNotificationHandler', async () => {
    await new StarNotificationHandler(svc).execute(
      new StarNotificationCommand({ notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID }),
    );
    expect(svc.star).toHaveBeenCalled();
  });
});

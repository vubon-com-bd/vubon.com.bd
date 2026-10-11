import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SendNotificationCommand } from '../../../../src/module/application/commands/notification/send-notification.command.js';
import { SendNotificationHandler } from '../../../../src/module/application/commands/notification/send-notification.handler.js';
import { SendNotificationToManyCommand } from '../../../../src/module/application/commands/notification/send-notification-to-many.command.js';
import { SendNotificationToManyHandler } from '../../../../src/module/application/commands/notification/send-notification-to-many.handler.js';
import { CancelNotificationCommand } from '../../../../src/module/application/commands/notification/cancel-notification.command.js';
import { CancelNotificationHandler } from '../../../../src/module/application/commands/notification/cancel-notification.handler.js';
import { MarkNotificationReadCommand } from '../../../../src/module/application/commands/notification/mark-notification-read.command.js';
import { MarkNotificationReadHandler } from '../../../../src/module/application/commands/notification/mark-notification-read.handler.js';
import { FIXED_NOTIFICATION_ID, FIXED_USER_ID, makeSendNotificationFixture } from '../../../../helpers/test-factories.js';

function mockSvc() {
  return {
    send: jest.fn().mockResolvedValue({ success: true, notificationId: 'n-1' }),
    sendToMany: jest.fn().mockResolvedValue([]),
    schedule: jest.fn().mockResolvedValue({ success: true }),
    cancel: jest.fn().mockResolvedValue({ id: 'n-1' }),
    update: jest.fn().mockResolvedValue({ id: 'n-1' }),
    delete: jest.fn().mockResolvedValue(undefined),
    retry: jest.fn().mockResolvedValue({ id: 'n-1' }),
    markRead: jest.fn().mockResolvedValue({ id: 'n-1' }),
    markManyRead: jest.fn().mockResolvedValue(3),
    markAllRead: jest.fn().mockResolvedValue(5),
    archive: jest.fn().mockResolvedValue({ id: 'n-1' }),
    snooze: jest.fn().mockResolvedValue({ id: 'n-1' }),
    star: jest.fn().mockResolvedValue({ id: 'n-1' }),
  } as never;
}

describe('Notification command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;

  beforeEach(() => { svc = mockSvc(); });

  it('SendNotificationHandler delegates', async () => {
    const h = new SendNotificationHandler(svc);
    const c = new SendNotificationCommand(makeSendNotificationFixture() as never, 'actor');
    const r = await h.execute(c);
    expect(svc.send).toHaveBeenCalled();
    expect(r.success).toBe(true);
  });

  it('SendNotificationToManyHandler delegates', async () => {
    const h = new SendNotificationToManyHandler(svc);
    const c = new SendNotificationToManyCommand({
      userIds: [FIXED_USER_ID], type: 'announcement', category: 'system',
      channels: ['email'], title: 'T', body: 'B',
    } as never, 'actor');
    await h.execute(c);
    expect(svc.sendToMany).toHaveBeenCalled();
  });

  it('CancelNotificationHandler delegates', async () => {
    const h = new CancelNotificationHandler(svc);
    const c = new CancelNotificationCommand({
      notificationId: FIXED_NOTIFICATION_ID, reason: 'x',
    }, 'actor');
    await h.execute(c);
    expect(svc.cancel).toHaveBeenCalled();
  });

  it('MarkNotificationReadHandler delegates', async () => {
    const h = new MarkNotificationReadHandler(svc);
    const c = new MarkNotificationReadCommand({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID,
    });
    await h.execute(c);
    expect(svc.markRead).toHaveBeenCalled();
  });
});

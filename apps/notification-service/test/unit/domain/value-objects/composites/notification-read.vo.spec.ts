import { describe, it, expect } from '@jest/globals';
import { NotificationReadVO } from '../../../../../src/module/domain/value-objects/composites/notification-read.vo.js';
import { ReadStatusVO } from '../../../../../src/module/domain/value-objects/primitives/read-status.vo.js';

describe('NotificationReadVO', () => {
  it('create unread', () => {
    const vo = NotificationReadVO.create({ status: ReadStatusVO.unread() });
    expect(vo.isUnread()).toBe(true);
  });
  it('read requires readAt', () => {
    expect(() =>
      NotificationReadVO.create({ status: ReadStatusVO.read() }),
    ).toThrow();
  });
  it('read with timestamp ok', () => {
    const vo = NotificationReadVO.create({
      status: ReadStatusVO.read(),
      readAt: new Date().toISOString(),
    });
    expect(vo.isRead()).toBe(true);
  });
  it('archived requires archivedAt', () => {
    expect(() =>
      NotificationReadVO.create({ status: ReadStatusVO.archived() }),
    ).toThrow();
  });
  it('snoozed requires snoozedUntil', () => {
    expect(() =>
      NotificationReadVO.create({ status: ReadStatusVO.snoozed() }),
    ).toThrow();
  });
  it('isSnoozeActive in future', () => {
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.snoozed(),
      snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
    });
    expect(vo.isSnoozeActive()).toBe(true);
  });
  it('isSnoozeActive in past', () => {
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.snoozed(),
      snoozedUntil: new Date(Date.now() - 3600_000).toISOString(),
    });
    expect(vo.isSnoozeActive()).toBe(false);
  });
  it('reconstitute', () => {
    const vo = NotificationReadVO.reconstitute({ status: ReadStatusVO.unread() });
    expect(vo.isUnread()).toBe(true);
  });
});

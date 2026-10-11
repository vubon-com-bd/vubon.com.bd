import { describe, it, expect } from '@jest/globals';
import { NotificationActionVO } from '../../../../src/module/domain/value-objects/primitives/notification-action.vo.js';

describe('NotificationActionVO', () => {
  it('create + reconstitute', () => {
    expect(NotificationActionVO.create('view').value).toBe('view');
    expect(() => NotificationActionVO.create('bad')).toThrow();
    expect(NotificationActionVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(NotificationActionVO.view().value).toBe('view');
    expect(NotificationActionVO.open().value).toBe('open');
    expect(NotificationActionVO.dismiss().value).toBe('dismiss');
    expect(NotificationActionVO.accept().value).toBe('accept');
    expect(NotificationActionVO.reject().value).toBe('reject');
    expect(NotificationActionVO.confirm().value).toBe('confirm');
    expect(NotificationActionVO.cancel().value).toBe('cancel');
    expect(NotificationActionVO.reply().value).toBe('reply');
    expect(NotificationActionVO.markRead().value).toBe('mark_read');
    expect(NotificationActionVO.archive().value).toBe('archive');
    expect(NotificationActionVO.delete().value).toBe('delete');
    expect(NotificationActionVO.retry().value).toBe('retry');
    expect(NotificationActionVO.unsubscribe().value).toBe('unsubscribe');
  });
  it('requiresUrl', () => {
    expect(NotificationActionVO.view().requiresUrl()).toBe(true);
    expect(NotificationActionVO.open().requiresUrl()).toBe(true);
    expect(NotificationActionVO.click().requiresUrl()).toBe(true);
    expect(NotificationActionVO.accept().requiresUrl()).toBe(false);
  });
  it('isDestructive', () => {
    expect(NotificationActionVO.delete().isDestructive()).toBe(true);
    expect(NotificationActionVO.reject().isDestructive()).toBe(true);
    expect(NotificationActionVO.accept().isDestructive()).toBe(false);
  });
});

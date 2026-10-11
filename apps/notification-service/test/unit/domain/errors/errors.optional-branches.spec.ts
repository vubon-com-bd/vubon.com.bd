import { describe, it, expect } from '@jest/globals';
import {
  InvalidNotificationStatusTransitionError,
  NotificationCannotBeCancelledError,
  NotificationExpiredError,
} from '../../../../src/module/domain/errors/notification.errors.js';
import { ProviderError } from '../../../../src/module/domain/errors/delivery.errors.js';

describe('Errors optional branches', () => {
  it('InvalidNotificationStatusTransitionError WITH notificationId', () => {
    const e = new InvalidNotificationStatusTransitionError('pending', 'sent', 'n-1');
    expect(e.message).toMatch(/pending/);
  });

  it('InvalidNotificationStatusTransitionError WITHOUT notificationId', () => {
    const e = new InvalidNotificationStatusTransitionError('pending', 'sent');
    expect(e.message).toMatch(/pending/);
  });

  it('NotificationCannotBeCancelledError', () => {
    expect(new NotificationCannotBeCancelledError('n-1', 'sent').message).toMatch(/sent/);
  });

  it('NotificationExpiredError', () => {
    expect(new NotificationExpiredError('n-1', '2020').message).toMatch(/2020/);
  });

  it('ProviderError WITH code', () => {
    expect(new ProviderError('sendgrid', 'failed', 'E001').message).toMatch(/E001/);
  });

  it('ProviderError WITHOUT code', () => {
    expect(new ProviderError('sendgrid', 'failed').message).toMatch(/failed/);
  });
});

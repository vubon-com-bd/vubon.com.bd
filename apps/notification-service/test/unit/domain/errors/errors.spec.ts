import { describe, it, expect } from '@jest/globals';
import * as Errors from '../../../../src/module/domain/errors/index.js';

describe('Domain errors barrel', () => {
  it('exports notification errors', () => {
    expect(Errors.NotificationNotFoundError).toBeDefined();
    expect(Errors.InvalidNotificationTypeError).toBeDefined();
    expect(Errors.InvalidNotificationChannelError).toBeDefined();
    expect(Errors.InvalidNotificationStatusError).toBeDefined();
    expect(Errors.InvalidNotificationStatusTransitionError).toBeDefined();
  });
  it('exports template errors', () => {
    expect(Errors.TemplateNotFoundError).toBeDefined();
    expect(Errors.TemplateVariablesMismatchError).toBeDefined();
  });
  it('exports schedule errors', () => {
    expect(Errors.ScheduleNotFoundError).toBeDefined();
    expect(Errors.ScheduleInPastError).toBeDefined();
  });
  it('exports preference errors', () => {
    expect(Errors.PreferenceNotFoundError).toBeDefined();
    expect(Errors.MaxDevicesReachedError).toBeDefined();
  });
  it('exports webhook errors', () => {
    expect(Errors.WebhookNotFoundError).toBeDefined();
    expect(Errors.WebhookDeliveryFailedError).toBeDefined();
  });
  it('exports delivery errors', () => {
    expect(Errors.InvalidDeliveryStatusError).toBeDefined();
    expect(Errors.DeliveryFailedError).toBeDefined();
    expect(Errors.RetryExhaustedError).toBeDefined();
  });
});

describe('Domain error behaviors', () => {
  it('NotificationNotFoundError message contains ID', () => {
    const e = new Errors.NotificationNotFoundError('abc-123');
    expect(e.message).toMatch(/abc-123/);
  });
  it('InvalidNotificationStatusTransitionError mentions from/to', () => {
    const e = new Errors.InvalidNotificationStatusTransitionError('pending', 'archived');
    expect(e.message).toMatch(/pending/);
    expect(e.message).toMatch(/archived/);
  });
  it('ScheduleInPastError mentions timestamp', () => {
    const e = new Errors.ScheduleInPastError('2020-01-01T00:00:00.000Z');
    expect(e.message).toMatch(/past/);
  });
  it('MaxDevicesReachedError mentions max', () => {
    const e = new Errors.MaxDevicesReachedError('user-1', 10);
    expect(e.message).toMatch(/10/);
  });
  it('RetryExhaustedError mentions attempts', () => {
    const e = new Errors.RetryExhaustedError(3);
    expect(e.message).toMatch(/3/);
  });
});

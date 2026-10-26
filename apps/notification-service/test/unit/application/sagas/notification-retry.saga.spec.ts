import { NotificationRetrySaga } from '@application/sagas/notification-retry.saga.js';
import { NotificationDeliveryFailedEvent } from '@domain/events/notification-failed.events.js';
import { RetryDeliveryCommand } from '@application/sagas/commands/retry-delivery.command.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

function makeSaga() {
  const bus = { execute: jest.fn().mockResolvedValue(undefined) };
  return { saga: new NotificationRetrySaga(bus as never), bus };
}

function makeEvent(reason: string, attemptNumber: number) {
  return new NotificationDeliveryFailedEvent({
    aggregateId: IDS.notificationId,
    payload: {
      notificationId: IDS.notificationId,
      channel: 'email',
      reason,
      errorMessage: reason,
      attemptNumber,
      failedAt: DATES.now,
    },
  });
}

describe('NotificationRetrySaga', () => {
  it('retries when below max attempts', async () => {
    const { saga } = makeSaga();
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('TIMEOUT', 1))));
    expect(cmd).toBeInstanceOf(RetryDeliveryCommand);
    expect((cmd as RetryDeliveryCommand).attemptNumber).toBe(2);
    expect((cmd as RetryDeliveryCommand).delayMs).toBeGreaterThan(0);
  });

  it('exhausts retries when max attempts reached', async () => {
    const { saga } = makeSaga();
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('TIMEOUT', 10))));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
    expect((cmd as UpdateAnalyticsCommand).eventType).toBe('notification.retry_exhausted');
  });

  it('handles non-retryable error (INVALID_ADDRESS)', async () => {
    const { saga } = makeSaga();
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('INVALID_ADDRESS', 1))));
    // Non-retryable → analytics, not retry
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });

  it('handles retryable error at attempt 1', async () => {
    const { saga } = makeSaga();
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('GATEWAY_ERROR', 1))));
    expect(cmd).toBeInstanceOf(RetryDeliveryCommand);
  });

  it('classifies unknown error as analytics when exhausted', async () => {
    const { saga } = makeSaga();
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('WEIRD', 10))));
    expect(cmd).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});

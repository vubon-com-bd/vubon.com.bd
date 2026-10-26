import { BounceHandlingSaga } from '@application/sagas/bounce-handling.saga.js';
import { NotificationDeliveryFailedEvent } from '@domain/events/notification-failed.events.js';
import { MarkBouncedCommand } from '@application/sagas/commands/mark-bounced.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

function makeEvent(reason: string) {
  return new NotificationDeliveryFailedEvent({
    aggregateId: IDS.notificationId,
    payload: {
      notificationId: IDS.notificationId, channel: 'email',
      reason, errorMessage: 'err', attemptNumber: 1, failedAt: DATES.now,
    },
  });
}

describe('BounceHandlingSaga', () => {
  it('emits MarkBouncedCommand for hard bounce', async () => {
    const saga = new BounceHandlingSaga({ execute: jest.fn() } as never);
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('INVALID_ADDRESS'))));
    expect(cmd).toBeInstanceOf(MarkBouncedCommand);
    expect(cmd.action).toBe('block');
  });

  it('classifies soft bounce as retry', async () => {
    const saga = new BounceHandlingSaga({ execute: jest.fn() } as never);
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('TIMEOUT'))));
    expect(cmd.bounceType).toBe('soft');
    expect(cmd.action).toBe('retry');
  });

  it('classifies complaint', async () => {
    const saga = new BounceHandlingSaga({ execute: jest.fn() } as never);
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('SPAM_COMPLAINT'))));
    expect(cmd.bounceType).toBe('complaint');
    expect(cmd.action).toBe('unsubscribe');
  });

  it('handles unknown classification', async () => {
    const saga = new BounceHandlingSaga({ execute: jest.fn() } as never);
    const cmd = await firstValueFrom(saga.onDeliveryFailed(of(makeEvent('WEIRD_CODE'))));
    expect(cmd.bounceType).toBe('unknown');
  });
});

/**
 * Sagas — verify EVERY handler's full pipeline runs
 * The 75% branch gap is likely from `filter()` returning false path.
 */
import { describe, it, expect } from '@jest/globals';
import { of, firstValueFrom, toArray } from 'rxjs';
import { NotificationRetrySaga } from '../../../../src/module/application/sagas/notification-retry.saga.js';
import { BounceHandlingSaga } from '../../../../src/module/application/sagas/bounce-handling.saga.js';
import { UnsubscribeSaga } from '../../../../src/module/application/sagas/unsubscribe.saga.js';
import { NotificationFailedEvent } from '../../../../src/module/domain/events/notification.events.js';
import { DeliveryAttemptFailedEvent } from '../../../../src/module/domain/events/delivery.events.js';
import { PreferenceChannelToggledEvent } from '../../../../src/module/domain/events/preference.events.js';

function evt<T>(Ctor: new (p: unknown) => T, payload: Record<string, unknown>): T {
  return new Ctor({ aggregateId: 'x', payload });
}
function cmdBus() { return { execute: () => undefined } as never; }

describe('Sagas TRUE branch coverage', () => {
  it('NotificationRetrySaga: both branches of filter', async () => {
    const s = new NotificationRetrySaga(cmdBus());

    // Filter true (attempt < 3): produces command
    const a = await firstValueFrom(
      s.onNotificationFailed(of(evt(NotificationFailedEvent, {
        notificationId: 'n-1', attempt: 1,
      }))).pipe(toArray()),
    );
    expect(a.length).toBe(1);

    // Filter false (attempt >= 3): no command
    const b = await firstValueFrom(
      s.onNotificationFailed(of(evt(NotificationFailedEvent, {
        notificationId: 'n-2', attempt: 5,
      }))).pipe(toArray()),
    );
    expect(b.length).toBe(0);
  });

  it('BounceHandlingSaga: both filter branches', async () => {
    const s = new BounceHandlingSaga(cmdBus());

    // retryable=true → filter false → no output
    const a = await firstValueFrom(
      s.onDeliveryAttemptFailed(of(evt(DeliveryAttemptFailedEvent, {
        notificationId: 'n-1', channel: 'email', reason: 'timeout', retryable: true, attempt: 1,
      }))).pipe(toArray()),
    );
    expect(a.length).toBe(0);

    // retryable=false → filter true → emits MarkBounceCommand
    const b = await firstValueFrom(
      s.onDeliveryAttemptFailed(of(evt(DeliveryAttemptFailedEvent, {
        notificationId: 'n-2', channel: 'email', reason: 'invalid', retryable: false, attempt: 1,
      }))).pipe(toArray()),
    );
    expect(b.length).toBe(1);
  });

  it('UnsubscribeSaga: onChannelToggled both branches', async () => {
    const s = new UnsubscribeSaga(cmdBus());

    // enabled=false → filter true → emit
    const a = await firstValueFrom(
      s.onChannelToggled(of(evt(PreferenceChannelToggledEvent, {
        userId: 'u', channel: 'email', enabled: false,
      }))).pipe(toArray()),
    );
    expect(a.length).toBe(1);

    // enabled=true → filter false → no emit
    const b = await firstValueFrom(
      s.onChannelToggled(of(evt(PreferenceChannelToggledEvent, {
        userId: 'u', channel: 'email', enabled: true,
      }))).pipe(toArray()),
    );
    expect(b.length).toBe(0);
  });
});

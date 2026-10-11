import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { of } from 'rxjs';
import { firstValueFrom, toArray } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotificationRetrySaga } from '../../../../src/module/application/sagas/notification-retry.saga.js';
import { NotificationDeliverySaga } from '../../../../src/module/application/sagas/notification-delivery.saga.js';
import { ScheduleTriggerSaga } from '../../../../src/module/application/sagas/schedule-trigger.saga.js';
import { BroadcastProcessingSaga } from '../../../../src/module/application/sagas/broadcast-processing.saga.js';
import { DigestGenerationSaga } from '../../../../src/module/application/sagas/digest-generation.saga.js';
import { BounceHandlingSaga } from '../../../../src/module/application/sagas/bounce-handling.saga.js';
import { UnsubscribeSaga } from '../../../../src/module/application/sagas/unsubscribe.saga.js';
import { QuietHoursSaga } from '../../../../src/module/application/sagas/quiet-hours.saga.js';
import {
  NotificationCreatedEvent, NotificationSentEvent, NotificationDeliveredEvent,
  NotificationReadEvent, NotificationCancelledEvent, NotificationExpiredEvent,
  NotificationFailedEvent,
} from '../../../../src/module/domain/events/notification.events.js';
import {
  DeliveryRetryScheduledEvent, DeliveryRetryExhaustedEvent, DeliveryAttemptFailedEvent,
} from '../../../../src/module/domain/events/delivery.events.js';
import {
  ScheduleTriggeredEvent, ScheduleCompletedEvent, ScheduleFailedEvent,
} from '../../../../src/module/domain/events/schedule.events.js';
import {
  BroadcastStartedEvent, BroadcastProgressEvent, BroadcastCompletedEvent,
  BroadcastPartiallyCompletedEvent, BroadcastFailedEvent,
} from '../../../../src/module/domain/events/broadcast.events.js';
import {
  DigestReadyEvent, DigestSentEvent, DigestFailedEvent,
} from '../../../../src/module/domain/events/digest.events.js';
import {
  PreferenceOptedOutEvent, PreferenceChannelToggledEvent, PreferenceCategoryToggledEvent,
} from '../../../../src/module/domain/events/preference.events.js';
import { DeviceInvalidatedEvent } from '../../../../src/module/domain/events/device.events.js';

function evt<T>(Ctor: new (p: unknown) => T, payload: Record<string, unknown>): T {
  return new Ctor({ aggregateId: 'x', payload });
}
function cmdBus() { return { execute: jest.fn() } as never; }

async function collect<T>(o: { subscribe: (obs: unknown) => unknown }): Promise<T[]> {
  return await firstValueFrom(
    (o as unknown as { pipe: (...a: unknown[]) => unknown })
      .pipe(toArray() as never) as never,
  );
}

describe('Sagas branch coverage', () => {
  it('NotificationDeliverySaga onNotificationCreated emits cmd', async () => {
    const s = new NotificationDeliverySaga(cmdBus() as never);
    const r = await firstValueFrom(s.onNotificationCreated(of(evt(NotificationCreatedEvent, {
      notificationId: 'n-1', channel: 'email', userId: 'u',
    }))).pipe(take(1)));
    expect(r).toBeDefined();
  });

  it('NotificationDeliverySaga null-return handlers', async () => {
    const s = new NotificationDeliverySaga(cmdBus() as never);
    expect(await firstValueFrom(s.onNotificationSent(of(evt(NotificationSentEvent, { notificationId: 'n-1', provider: 'smtp' }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onNotificationDelivered(of(evt(NotificationDeliveredEvent, { notificationId: 'n-1', deliveredAt: 'x' }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onNotificationRead(of(evt(NotificationReadEvent, { notificationId: 'n-1', userId: 'u' }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onNotificationCancelled(of(evt(NotificationCancelledEvent, { notificationId: 'n-1' }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onNotificationExpired(of(evt(NotificationExpiredEvent, { notificationId: 'n-1' }))).pipe(take(1)))).toBeNull();
  });

  it('NotificationRetrySaga onNotificationFailed under limit', async () => {
    const s = new NotificationRetrySaga(cmdBus() as never);
    const r = await firstValueFrom(s.onNotificationFailed(of(evt(NotificationFailedEvent, {
      notificationId: 'n-1', attempt: 1,
    }))).pipe(take(1)));
    expect(r).toBeDefined();
  });

  it('NotificationRetrySaga filters over-limit', async () => {
    const s = new NotificationRetrySaga(cmdBus() as never);
    const obs = s.onNotificationFailed(of(evt(NotificationFailedEvent, {
      notificationId: 'n-1', attempt: 10,
    })));
    const r = await collect(obs);
    expect(r.length).toBe(0);
  });

  it('NotificationRetrySaga null-return handlers', async () => {
    const s = new NotificationRetrySaga(cmdBus() as never);
    expect(await firstValueFrom(s.onRetryScheduled(of(evt(DeliveryRetryScheduledEvent, { notificationId: 'n-1', nextAttemptAt: 'x' }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onRetryExhausted(of(evt(DeliveryRetryExhaustedEvent, { notificationId: 'n-1', attempts: 3 }))).pipe(take(1)))).toBeNull();
  });

  it('ScheduleTriggerSaga all handlers', async () => {
    const s = new ScheduleTriggerSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onScheduleTriggered(of(evt(ScheduleTriggeredEvent, { scheduleId: 's-1', occurrence: 1, triggeredAt: 'x' }))).pipe(take(1)))).toBeDefined();
    expect(await firstValueFrom(s.onScheduleCompleted(of(evt(ScheduleCompletedEvent, { scheduleId: 's-1', totalOccurrences: 5 }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onScheduleFailed(of(evt(ScheduleFailedEvent, { scheduleId: 's-1', reason: 'x' }))).pipe(take(1)))).toBeNull();
  });

  it('BroadcastProcessingSaga all handlers', async () => {
    const s = new BroadcastProcessingSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onBroadcastStarted(of(evt(BroadcastStartedEvent, { broadcastId: 'b-1', totalRecipients: 100 }))).pipe(take(1)))).toBeDefined();
    expect(await firstValueFrom(s.onBroadcastProgress(of(evt(BroadcastProgressEvent, { broadcastId: 'b-1', processed: 50, total: 100, succeeded: 45, failed: 5 }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onBroadcastCompleted(of(evt(BroadcastCompletedEvent, { broadcastId: 'b-1', totalRecipients: 100, succeeded: 90, failed: 10 }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onBroadcastPartiallyCompleted(of(evt(BroadcastPartiallyCompletedEvent, { broadcastId: 'b-1', totalRecipients: 100, succeeded: 80, failed: 20 }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onBroadcastFailed(of(evt(BroadcastFailedEvent, { broadcastId: 'b-1', reason: 'x', processedBeforeFailure: 0 }))).pipe(take(1)))).toBeNull();
  });

  it('DigestGenerationSaga all handlers', async () => {
    const s = new DigestGenerationSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onDigestReady(of(evt(DigestReadyEvent, { digestId: 'd-1', itemCount: 5, readyAt: 'x' }))).pipe(take(1)))).toBeDefined();
    expect(await firstValueFrom(s.onDigestSent(of(evt(DigestSentEvent, { digestId: 'd-1', channel: 'email', sentAt: 'x', itemCount: 5 }))).pipe(take(1)))).toBeNull();
    expect(await firstValueFrom(s.onDigestFailed(of(evt(DigestFailedEvent, { digestId: 'd-1', reason: 'x' }))).pipe(take(1)))).toBeNull();
  });

  it('BounceHandlingSaga non-retryable + retryable', async () => {
    const s = new BounceHandlingSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onDeliveryAttemptFailed(of(evt(DeliveryAttemptFailedEvent, {
      notificationId: 'n-1', channel: 'email', reason: 'invalid', retryable: false, attempt: 1,
    }))).pipe(take(1)))).toBeDefined();

    const retryable = await collect(s.onDeliveryAttemptFailed(of(evt(DeliveryAttemptFailedEvent, {
      notificationId: 'n-1', channel: 'email', reason: 'timeout', retryable: true, attempt: 1,
    }))));
    expect(retryable.length).toBe(0);

    expect(await firstValueFrom(s.onDeviceInvalidated(of(evt(DeviceInvalidatedEvent, { deviceId: 'd-1', userId: 'u', reason: 'x' }))).pipe(take(1)))).toBeNull();
  });

  it('UnsubscribeSaga all handlers', async () => {
    const s = new UnsubscribeSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onOptedOut(of(evt(PreferenceOptedOutEvent, { userId: 'u', scope: 'email' }))).pipe(take(1)))).toBeDefined();
    expect(await firstValueFrom(s.onChannelToggled(of(evt(PreferenceChannelToggledEvent, { userId: 'u', channel: 'email', enabled: false }))).pipe(take(1)))).toBeDefined();

    const enabled = await collect(s.onChannelToggled(of(evt(PreferenceChannelToggledEvent, { userId: 'u', channel: 'email', enabled: true }))));
    expect(enabled.length).toBe(0);

    expect(await firstValueFrom(s.onCategoryToggled(of(evt(PreferenceCategoryToggledEvent, { userId: 'u', category: 'marketing', enabled: false }))).pipe(take(1)))).toBeDefined();

    const catEnabled = await collect(s.onCategoryToggled(of(evt(PreferenceCategoryToggledEvent, { userId: 'u', category: 'marketing', enabled: true }))));
    expect(catEnabled.length).toBe(0);
  });

  it('QuietHoursSaga onNotificationCreated', async () => {
    const s = new QuietHoursSaga(cmdBus() as never);
    expect(await firstValueFrom(s.onNotificationCreated(of(evt(NotificationCreatedEvent, {
      notificationId: 'n-1', channel: 'email', userId: 'u',
    }))).pipe(take(1)))).toBeDefined();
  });
});

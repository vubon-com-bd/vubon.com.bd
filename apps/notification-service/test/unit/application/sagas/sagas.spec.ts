/**
 * Saga unit tests — verify event handlers registered + observable pipelines
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { of, firstValueFrom, take } from 'rxjs';
import { NotificationDeliverySaga } from '../../../../src/module/application/sagas/notification-delivery.saga.js';
import { NotificationRetrySaga } from '../../../../src/module/application/sagas/notification-retry.saga.js';
import { ScheduleTriggerSaga } from '../../../../src/module/application/sagas/schedule-trigger.saga.js';
import { BroadcastProcessingSaga } from '../../../../src/module/application/sagas/broadcast-processing.saga.js';
import { DigestGenerationSaga } from '../../../../src/module/application/sagas/digest-generation.saga.js';
import { BounceHandlingSaga } from '../../../../src/module/application/sagas/bounce-handling.saga.js';
import { UnsubscribeSaga } from '../../../../src/module/application/sagas/unsubscribe.saga.js';
import { QuietHoursSaga } from '../../../../src/module/application/sagas/quiet-hours.saga.js';
import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
  NotificationReadEvent,
  NotificationCancelledEvent,
  NotificationExpiredEvent,
  NotificationFailedEvent,
} from '../../../../src/module/domain/events/notification.events.js';
import {
  DeliveryRetryScheduledEvent,
  DeliveryRetryExhaustedEvent,
  DeliveryAttemptFailedEvent,
} from '../../../../src/module/domain/events/delivery.events.js';
import {
  ScheduleTriggeredEvent,
  ScheduleCompletedEvent,
  ScheduleFailedEvent,
} from '../../../../src/module/domain/events/schedule.events.js';
import {
  BroadcastStartedEvent,
  BroadcastProgressEvent,
  BroadcastCompletedEvent,
  BroadcastPartiallyCompletedEvent,
  BroadcastFailedEvent,
} from '../../../../src/module/domain/events/broadcast.events.js';
import {
  DigestReadyEvent,
  DigestSentEvent,
  DigestFailedEvent,
} from '../../../../src/module/domain/events/digest.events.js';
import {
  PreferenceOptedOutEvent,
  PreferenceChannelToggledEvent,
  PreferenceCategoryToggledEvent,
} from '../../../../src/module/domain/events/preference.events.js';
import { DeviceInvalidatedEvent } from '../../../../src/module/domain/events/device.events.js';

function makeCmdBus() {
  return { execute: jest.fn() } as never;
}

function makeEvt<T>(Ctor: new (p: unknown) => T, payload: Record<string, unknown>): T {
  return new Ctor({ aggregateId: 'x', payload });
}

describe('NotificationDeliverySaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: NotificationDeliverySaga;
  beforeEach(() => { cb = makeCmdBus(); s = new NotificationDeliverySaga(cb as never); });

  it('onNotificationCreated emits DispatchNotificationCommand', async () => {
    const evt = makeEvt(NotificationCreatedEvent, {
      notificationId: 'n-1', channel: 'email', userId: 'u',
    });
    const obs = s.onNotificationCreated(of(evt));
    const cmd = await firstValueFrom(obs.pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onNotificationSent registers', async () => {
    const evt = makeEvt(NotificationSentEvent, { notificationId: 'n-1', provider: 'smtp' });
    const r = await firstValueFrom(s.onNotificationSent(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onNotificationDelivered registers', async () => {
    const evt = makeEvt(NotificationDeliveredEvent, { notificationId: 'n-1', deliveredAt: 'x' });
    const r = await firstValueFrom(s.onNotificationDelivered(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onNotificationRead registers', async () => {
    const evt = makeEvt(NotificationReadEvent, { notificationId: 'n-1', userId: 'u' });
    const r = await firstValueFrom(s.onNotificationRead(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onNotificationCancelled registers', async () => {
    const evt = makeEvt(NotificationCancelledEvent, { notificationId: 'n-1' });
    const r = await firstValueFrom(s.onNotificationCancelled(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onNotificationExpired registers', async () => {
    const evt = makeEvt(NotificationExpiredEvent, { notificationId: 'n-1' });
    const r = await firstValueFrom(s.onNotificationExpired(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('NotificationRetrySaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: NotificationRetrySaga;
  beforeEach(() => { cb = makeCmdBus(); s = new NotificationRetrySaga(cb as never); });

  it('onNotificationFailed under limit emits retry', async () => {
    const evt = makeEvt(NotificationFailedEvent, {
      notificationId: 'n-1', attempt: 1,
    });
    const cmd = await firstValueFrom(s.onNotificationFailed(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onRetryScheduled registers', async () => {
    const evt = makeEvt(DeliveryRetryScheduledEvent, {
      notificationId: 'n-1', nextAttemptAt: 'x',
    });
    const r = await firstValueFrom(s.onRetryScheduled(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onRetryExhausted registers', async () => {
    const evt = makeEvt(DeliveryRetryExhaustedEvent, {
      notificationId: 'n-1', attempts: 3,
    });
    const r = await firstValueFrom(s.onRetryExhausted(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('ScheduleTriggerSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: ScheduleTriggerSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new ScheduleTriggerSaga(cb as never); });

  it('onScheduleTriggered emits SendScheduledNotification', async () => {
    const evt = makeEvt(ScheduleTriggeredEvent, {
      scheduleId: 's-1', occurrence: 1, triggeredAt: 'x',
    });
    const cmd = await firstValueFrom(s.onScheduleTriggered(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onScheduleCompleted registers', async () => {
    const evt = makeEvt(ScheduleCompletedEvent, {
      scheduleId: 's-1', totalOccurrences: 5,
    });
    const r = await firstValueFrom(s.onScheduleCompleted(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onScheduleFailed registers', async () => {
    const evt = makeEvt(ScheduleFailedEvent, { scheduleId: 's-1', reason: 'x' });
    const r = await firstValueFrom(s.onScheduleFailed(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('BroadcastProcessingSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: BroadcastProcessingSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new BroadcastProcessingSaga(cb as never); });

  it('onBroadcastStarted emits ProcessBroadcastBatch', async () => {
    const evt = makeEvt(BroadcastStartedEvent, {
      broadcastId: 'b-1', totalRecipients: 100,
    });
    const cmd = await firstValueFrom(s.onBroadcastStarted(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onBroadcastProgress registers', async () => {
    const evt = makeEvt(BroadcastProgressEvent, {
      broadcastId: 'b-1', processed: 50, total: 100, succeeded: 45, failed: 5,
    });
    const r = await firstValueFrom(s.onBroadcastProgress(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onBroadcastCompleted registers', async () => {
    const evt = makeEvt(BroadcastCompletedEvent, {
      broadcastId: 'b-1', totalRecipients: 100, succeeded: 90, failed: 10,
    });
    const r = await firstValueFrom(s.onBroadcastCompleted(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onBroadcastPartiallyCompleted registers', async () => {
    const evt = makeEvt(BroadcastPartiallyCompletedEvent, {
      broadcastId: 'b-1', totalRecipients: 100, succeeded: 80, failed: 20,
    });
    const r = await firstValueFrom(s.onBroadcastPartiallyCompleted(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onBroadcastFailed registers', async () => {
    const evt = makeEvt(BroadcastFailedEvent, {
      broadcastId: 'b-1', reason: 'x', processedBeforeFailure: 0,
    });
    const r = await firstValueFrom(s.onBroadcastFailed(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('DigestGenerationSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: DigestGenerationSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new DigestGenerationSaga(cb as never); });

  it('onDigestReady emits SendDigestSagaCommand', async () => {
    const evt = makeEvt(DigestReadyEvent, {
      digestId: 'd-1', itemCount: 5, readyAt: 'x',
    });
    const cmd = await firstValueFrom(s.onDigestReady(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onDigestSent registers', async () => {
    const evt = makeEvt(DigestSentEvent, {
      digestId: 'd-1', channel: 'email', sentAt: 'x', itemCount: 5,
    });
    const r = await firstValueFrom(s.onDigestSent(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });

  it('onDigestFailed registers', async () => {
    const evt = makeEvt(DigestFailedEvent, { digestId: 'd-1', reason: 'x' });
    const r = await firstValueFrom(s.onDigestFailed(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('BounceHandlingSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: BounceHandlingSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new BounceHandlingSaga(cb as never); });

  it('onDeliveryAttemptFailed filters non-retryable + emits MarkBounce', async () => {
    const evt = makeEvt(DeliveryAttemptFailedEvent, {
      notificationId: 'n-1', channel: 'email', reason: 'invalid_address', retryable: false, attempt: 1,
    });
    const cmd = await firstValueFrom(s.onDeliveryAttemptFailed(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onDeliveryAttemptFailed filters out retryable', async () => {
    const evt = makeEvt(DeliveryAttemptFailedEvent, {
      notificationId: 'n-1', channel: 'email', reason: 'timeout', retryable: true, attempt: 1,
    });
    const results: unknown[] = [];
    await new Promise<void>((resolve) => {
      s.onDeliveryAttemptFailed(of(evt)).subscribe({
        next: (v) => results.push(v),
        complete: () => resolve(),
      });
      setTimeout(resolve, 50);
    });
    expect(results.length).toBe(0);
  });

  it('onDeviceInvalidated registers', async () => {
    const evt = makeEvt(DeviceInvalidatedEvent, {
      deviceId: 'd-1', userId: 'u', reason: 'stale',
    });
    const r = await firstValueFrom(s.onDeviceInvalidated(of(evt)).pipe(take(1)));
    expect(r).toBeNull();
  });
});

describe('UnsubscribeSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: UnsubscribeSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new UnsubscribeSaga(cb as never); });

  it('onOptedOut emits HandleUnsubscribe', async () => {
    const evt = makeEvt(PreferenceOptedOutEvent, {
      userId: 'u', scope: 'email', reason: 'spam',
    });
    const cmd = await firstValueFrom(s.onOptedOut(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onChannelToggled disabled emits HandleUnsubscribe', async () => {
    const evt = makeEvt(PreferenceChannelToggledEvent, {
      userId: 'u', channel: 'email', enabled: false,
    });
    const cmd = await firstValueFrom(s.onChannelToggled(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });

  it('onChannelToggled enabled filtered out', async () => {
    const evt = makeEvt(PreferenceChannelToggledEvent, {
      userId: 'u', channel: 'email', enabled: true,
    });
    const results: unknown[] = [];
    await new Promise<void>((resolve) => {
      s.onChannelToggled(of(evt)).subscribe({
        next: (v) => results.push(v),
        complete: () => resolve(),
      });
      setTimeout(resolve, 50);
    });
    expect(results.length).toBe(0);
  });

  it('onCategoryToggled disabled emits HandleUnsubscribe', async () => {
    const evt = makeEvt(PreferenceCategoryToggledEvent, {
      userId: 'u', category: 'marketing', enabled: false,
    });
    const cmd = await firstValueFrom(s.onCategoryToggled(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });
});

describe('QuietHoursSaga', () => {
  let cb: ReturnType<typeof makeCmdBus>;
  let s: QuietHoursSaga;
  beforeEach(() => { cb = makeCmdBus(); s = new QuietHoursSaga(cb as never); });

  it('onNotificationCreated emits DeferForQuietHours', async () => {
    const evt = makeEvt(NotificationCreatedEvent, {
      notificationId: 'n-1', channel: 'email', userId: 'u',
    });
    const cmd = await firstValueFrom(s.onNotificationCreated(of(evt)).pipe(take(1)));
    expect(cmd).toBeDefined();
  });
});

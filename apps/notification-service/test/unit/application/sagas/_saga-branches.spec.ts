/**
 * Branch coverage — saga edge cases (ofType filter false path).
 */
import { of, firstValueFrom, take } from 'rxjs';
import { jest } from '@jest/globals';
import { NotificationDeliverySaga } from '@application/sagas/notification-delivery.saga.js';
import { NotificationRetrySaga } from '@application/sagas/notification-retry.saga.js';
import { ScheduleTriggerSaga } from '@application/sagas/schedule-trigger.saga.js';
import { BroadcastProcessingSaga } from '@application/sagas/broadcast-processing.saga.js';
import { DigestGenerationSaga } from '@application/sagas/digest-generation.saga.js';
import { BounceHandlingSaga } from '@application/sagas/bounce-handling.saga.js';
import { UnsubscribeSaga } from '@application/sagas/unsubscribe.saga.js';
import { QuietHoursSaga } from '@application/sagas/quiet-hours.saga.js';
import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
} from '@domain/events/notification.events.js';
import { NotificationDeliveryFailedEvent } from '@domain/events/notification-failed.events.js';
import { ScheduleExecutedEvent } from '@domain/events/schedule.events.js';
import { BroadcastStartedEvent, BroadcastCompletedEvent } from '@domain/events/broadcast.events.js';
import { DigestGeneratedEvent, DigestSentEvent } from '@domain/events/digest.events.js';
import { NotificationUnsubscribedEvent } from '@domain/events/action.events.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const bus = () => ({ execute: jest.fn().mockResolvedValue(undefined) }) as never;

// Each saga's `ofType` filter — test both matching and non-matching
describe('Saga branch boost — filter false path', () => {
  it('NotificationDeliverySaga.onCreated ignores unrelated events', async () => {
    const saga = new NotificationDeliverySaga(bus());
    const unrelated = new NotificationDeliveredEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, deliveredAt: DATES.now },
    });
    // Emitting wrong event type → filtered out → observable completes without emission
    const result = await firstValueFrom(
      saga.onCreated(of(unrelated)).pipe(take(1)),
      { defaultValue: null as never },
    );
    expect(result).toBeNull();
  });

  it('NotificationDeliverySaga.onSent ignores unrelated events', async () => {
    const saga = new NotificationDeliverySaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onSent(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('NotificationDeliverySaga.onDelivered ignores unrelated events', async () => {
    const saga = new NotificationDeliverySaga(bus());
    const unrelated = new NotificationSentEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, channel: 'email', sentAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onDelivered(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('NotificationRetrySaga ignores unrelated', async () => {
    const saga = new NotificationRetrySaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onDeliveryFailed(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('ScheduleTriggerSaga ignores unrelated', async () => {
    const saga = new ScheduleTriggerSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.scheduleId,
      payload: { notificationId: IDS.scheduleId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onScheduleExecuted(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('BroadcastProcessingSaga.onStarted ignores unrelated', async () => {
    const saga = new BroadcastProcessingSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.broadcastId,
      payload: { notificationId: IDS.broadcastId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onStarted(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('BroadcastProcessingSaga.onCompleted ignores unrelated', async () => {
    const saga = new BroadcastProcessingSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.broadcastId,
      payload: { notificationId: IDS.broadcastId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onCompleted(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('DigestGenerationSaga.onGenerated ignores unrelated', async () => {
    const saga = new DigestGenerationSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.digestId,
      payload: { notificationId: IDS.digestId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onGenerated(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('DigestGenerationSaga.onSent ignores unrelated', async () => {
    const saga = new DigestGenerationSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.digestId,
      payload: { notificationId: IDS.digestId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onSent(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('BounceHandlingSaga ignores unrelated', async () => {
    const saga = new BounceHandlingSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onDeliveryFailed(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('UnsubscribeSaga ignores unrelated', async () => {
    const saga = new UnsubscribeSaga(bus());
    const unrelated = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, type: 'transactional', category: 'system', channel: 'email', priority: 'normal', createdAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onUnsubscribed(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });

  it('QuietHoursSaga ignores unrelated', async () => {
    const saga = new QuietHoursSaga(bus());
    const unrelated = new NotificationSentEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, channel: 'email', sentAt: DATES.now },
    });
    const result = await firstValueFrom(saga.onCreated(of(unrelated)).pipe(take(1)), { defaultValue: null as never });
    expect(result).toBeNull();
  });
});

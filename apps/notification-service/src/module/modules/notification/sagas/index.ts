/**
 * Notification Sagas Barrel
 * @module notification-service/modules/notification/sagas
 *
 * 8 sagas: delivery, retry, schedule, broadcast, digest, bounce, unsubscribe, quiet-hours।
 * These are placed under notification module as they react to notification events।
 */
import { NotificationDeliverySaga } from '@application/sagas/notification-delivery.saga.js';
import { NotificationRetrySaga } from '@application/sagas/notification-retry.saga.js';
import { ScheduleTriggerSaga } from '@application/sagas/schedule-trigger.saga.js';
import { BroadcastProcessingSaga } from '@application/sagas/broadcast-processing.saga.js';
import { DigestGenerationSaga } from '@application/sagas/digest-generation.saga.js';
import { BounceHandlingSaga } from '@application/sagas/bounce-handling.saga.js';
import { UnsubscribeSaga } from '@application/sagas/unsubscribe.saga.js';
import { QuietHoursSaga } from '@application/sagas/quiet-hours.saga.js';

export const NOTIFICATION_SAGAS = [
  NotificationDeliverySaga,
  NotificationRetrySaga,
  ScheduleTriggerSaga,
  BroadcastProcessingSaga,
  DigestGenerationSaga,
  BounceHandlingSaga,
  UnsubscribeSaga,
  QuietHoursSaga,
] as const;

export {
  NotificationDeliverySaga,
  NotificationRetrySaga,
  ScheduleTriggerSaga,
  BroadcastProcessingSaga,
  DigestGenerationSaga,
  BounceHandlingSaga,
  UnsubscribeSaga,
  QuietHoursSaga,
};

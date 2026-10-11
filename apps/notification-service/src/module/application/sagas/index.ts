// application/sagas/index.ts — Sagas barrel export
export * from './commands/index.js';
export * from './notification-delivery.saga.js';
export * from './notification-retry.saga.js';
export * from './schedule-trigger.saga.js';
export * from './broadcast-processing.saga.js';
export * from './digest-generation.saga.js';
export * from './bounce-handling.saga.js';
export * from './unsubscribe.saga.js';
export * from './quiet-hours.saga.js';

import { NotificationDeliverySaga } from './notification-delivery.saga.js';
import { NotificationRetrySaga } from './notification-retry.saga.js';
import { ScheduleTriggerSaga } from './schedule-trigger.saga.js';
import { BroadcastProcessingSaga } from './broadcast-processing.saga.js';
import { DigestGenerationSaga } from './digest-generation.saga.js';
import { BounceHandlingSaga } from './bounce-handling.saga.js';
import { UnsubscribeSaga } from './unsubscribe.saga.js';
import { QuietHoursSaga } from './quiet-hours.saga.js';

export const ALL_SAGAS = [
  NotificationDeliverySaga,
  NotificationRetrySaga,
  ScheduleTriggerSaga,
  BroadcastProcessingSaga,
  DigestGenerationSaga,
  BounceHandlingSaga,
  UnsubscribeSaga,
  QuietHoursSaga,
] as const;

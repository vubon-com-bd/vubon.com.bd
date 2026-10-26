/**
 * Schedule Sagas Barrel
 * @module notification-service/modules/schedule/sagas
 */
import { ScheduleTriggerSaga } from '@application/sagas/schedule-trigger.saga.js';

export const SCHEDULE_SAGAS = [ScheduleTriggerSaga] as const;
export { ScheduleTriggerSaga };

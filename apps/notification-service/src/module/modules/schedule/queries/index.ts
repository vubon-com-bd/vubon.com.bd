/**
 * Schedule Query Handlers Barrel
 * @module notification-service/modules/schedule/queries
 */
import { GetScheduleHandler } from '@application/queries/schedule/get-schedule.handler.js';
import { ListSchedulesHandler } from '@application/queries/schedule/list-schedules.handler.js';

export const SCHEDULE_QUERY_HANDLERS = [
  GetScheduleHandler,
  ListSchedulesHandler,
] as const;

export { GetScheduleHandler, ListSchedulesHandler };

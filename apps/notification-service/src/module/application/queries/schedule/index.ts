// queries/schedule/index.ts
export * from './get-schedule.query.js';
export * from './get-schedule.handler.js';
export * from './list-schedules.query.js';
export * from './list-schedules.handler.js';
export * from './get-due-schedules.query.js';
export * from './get-due-schedules.handler.js';

import { GetScheduleHandler } from './get-schedule.handler.js';
import { ListSchedulesHandler } from './list-schedules.handler.js';
import { GetDueSchedulesHandler } from './get-due-schedules.handler.js';

export const SCHEDULE_QUERY_HANDLERS = [
  GetScheduleHandler,
  ListSchedulesHandler,
  GetDueSchedulesHandler,
] as const;

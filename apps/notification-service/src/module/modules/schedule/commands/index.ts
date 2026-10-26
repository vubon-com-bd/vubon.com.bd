/**
 * Schedule Command Handlers Barrel
 * @module notification-service/modules/schedule/commands
 */
import { CreateScheduleHandler } from '@application/commands/schedule/create-schedule.handler.js';
import { UpdateScheduleHandler } from '@application/commands/schedule/update-schedule.handler.js';
import { CancelScheduleHandler } from '@application/commands/schedule/cancel-schedule.handler.js';

export const SCHEDULE_COMMAND_HANDLERS = [
  CreateScheduleHandler,
  UpdateScheduleHandler,
  CancelScheduleHandler,
] as const;

export {
  CreateScheduleHandler,
  UpdateScheduleHandler,
  CancelScheduleHandler,
};

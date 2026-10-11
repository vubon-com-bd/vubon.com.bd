// commands/schedule/index.ts
export * from './create-schedule.command.js';
export * from './create-schedule.handler.js';
export * from './update-schedule.command.js';
export * from './update-schedule.handler.js';
export * from './activate-schedule.command.js';
export * from './activate-schedule.handler.js';
export * from './pause-schedule.command.js';
export * from './pause-schedule.handler.js';
export * from './resume-schedule.command.js';
export * from './resume-schedule.handler.js';
export * from './cancel-schedule.command.js';
export * from './cancel-schedule.handler.js';
export * from './trigger-schedule.command.js';
export * from './trigger-schedule.handler.js';

import { CreateScheduleHandler } from './create-schedule.handler.js';
import { UpdateScheduleHandler } from './update-schedule.handler.js';
import { ActivateScheduleHandler } from './activate-schedule.handler.js';
import { PauseScheduleHandler } from './pause-schedule.handler.js';
import { ResumeScheduleHandler } from './resume-schedule.handler.js';
import { CancelScheduleHandler } from './cancel-schedule.handler.js';
import { TriggerScheduleHandler } from './trigger-schedule.handler.js';

export const SCHEDULE_COMMAND_HANDLERS = [
  CreateScheduleHandler,
  UpdateScheduleHandler,
  ActivateScheduleHandler,
  PauseScheduleHandler,
  ResumeScheduleHandler,
  CancelScheduleHandler,
  TriggerScheduleHandler,
] as const;

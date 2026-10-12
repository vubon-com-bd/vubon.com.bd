// commands/courier/index.ts
export * from './register-courier.command.js';
export * from './register-courier.handler.js';
export * from './update-courier.command.js';
export * from './update-courier.handler.js';
export * from './activate-courier.command.js';
export * from './activate-courier.handler.js';
export * from './deactivate-courier.command.js';
export * from './deactivate-courier.handler.js';
export * from './suspend-courier.command.js';
export * from './suspend-courier.handler.js';
export * from './set-courier-default.command.js';
export * from './set-courier-default.handler.js';

import { RegisterCourierHandler } from './register-courier.handler.js';
import { UpdateCourierHandler } from './update-courier.handler.js';
import { ActivateCourierHandler } from './activate-courier.handler.js';
import { DeactivateCourierHandler } from './deactivate-courier.handler.js';
import { SuspendCourierHandler } from './suspend-courier.handler.js';
import { SetCourierDefaultHandler } from './set-courier-default.handler.js';

export const COURIER_COMMAND_HANDLERS = [
  RegisterCourierHandler, UpdateCourierHandler, ActivateCourierHandler,
  DeactivateCourierHandler, SuspendCourierHandler, SetCourierDefaultHandler,
] as const;

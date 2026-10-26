/**
 * In-App Command Handlers Barrel
 * @module notification-service/modules/in-app/commands
 */
import { CreateInAppHandler } from '@application/commands/in-app/create-in-app.handler.js';
import { MarkAsReadHandler } from '@application/commands/in-app/mark-as-read.handler.js';
import { DismissInAppHandler } from '@application/commands/in-app/dismiss.handler.js';

export const IN_APP_COMMAND_HANDLERS = [
  CreateInAppHandler,
  MarkAsReadHandler,
  DismissInAppHandler,
] as const;

export {
  CreateInAppHandler,
  MarkAsReadHandler,
  DismissInAppHandler,
};

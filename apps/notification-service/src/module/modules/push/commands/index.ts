/**
 * Push Command Handlers Barrel
 * @module notification-service/modules/push/commands
 */
import { SendPushHandler } from '@application/commands/push/send-push.handler.js';
import { SendBulkPushHandler } from '@application/commands/push/send-bulk-push.handler.js';

export const PUSH_COMMAND_HANDLERS = [
  SendPushHandler,
  SendBulkPushHandler,
] as const;

export { SendPushHandler, SendBulkPushHandler };

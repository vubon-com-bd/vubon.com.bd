/**
 * Broadcast Command Handlers Barrel
 * @module notification-service/modules/broadcast/commands
 */
import { CreateBroadcastHandler } from '@application/commands/broadcast/create-broadcast.handler.js';
import { StartBroadcastHandler } from '@application/commands/broadcast/start-broadcast.handler.js';
import { CancelBroadcastHandler } from '@application/commands/broadcast/cancel-broadcast.handler.js';

export const BROADCAST_COMMAND_HANDLERS = [
  CreateBroadcastHandler,
  StartBroadcastHandler,
  CancelBroadcastHandler,
] as const;

export {
  CreateBroadcastHandler,
  StartBroadcastHandler,
  CancelBroadcastHandler,
};

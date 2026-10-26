/**
 * Broadcast Query Handlers Barrel
 * @module notification-service/modules/broadcast/queries
 */
import { GetBroadcastHandler } from '@application/queries/broadcast/get-broadcast.handler.js';
import { GetBroadcastResultHandler } from '@application/queries/broadcast/get-broadcast-result.handler.js';
import { ListBroadcastsHandler } from '@application/queries/broadcast/list-broadcasts.handler.js';

export const BROADCAST_QUERY_HANDLERS = [
  GetBroadcastHandler,
  GetBroadcastResultHandler,
  ListBroadcastsHandler,
] as const;

export {
  GetBroadcastHandler,
  GetBroadcastResultHandler,
  ListBroadcastsHandler,
};

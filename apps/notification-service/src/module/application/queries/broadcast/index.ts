// queries/broadcast/index.ts
export * from './get-broadcast.query.js';
export * from './get-broadcast.handler.js';
export * from './get-broadcast-stats.query.js';
export * from './get-broadcast-stats.handler.js';
export * from './get-broadcast-progress.query.js';
export * from './get-broadcast-progress.handler.js';
export * from './list-broadcasts.query.js';
export * from './list-broadcasts.handler.js';

import { GetBroadcastHandler } from './get-broadcast.handler.js';
import { GetBroadcastStatsHandler } from './get-broadcast-stats.handler.js';
import { GetBroadcastProgressHandler } from './get-broadcast-progress.handler.js';
import { ListBroadcastsHandler } from './list-broadcasts.handler.js';

export const BROADCAST_QUERY_HANDLERS = [
  GetBroadcastHandler,
  GetBroadcastStatsHandler,
  GetBroadcastProgressHandler,
  ListBroadcastsHandler,
] as const;

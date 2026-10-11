// application/queries/push/index.ts
export * from './get-push.query.js';
export * from './get-push.handler.js';
export * from './list-push.query.js';
export * from './list-push.handler.js';

import { GetPushHandler } from './get-push.handler.js';
import { ListPushHandler } from './list-push.handler.js';

export const PUSH_QUERY_HANDLERS = [GetPushHandler, ListPushHandler] as const;

// queries/dispatch/index.ts
export * from './get-dispatch.query.js'; export * from './get-dispatch.handler.js';
export * from './list-dispatches.query.js'; export * from './list-dispatches.handler.js';

import { GetDispatchHandler } from './get-dispatch.handler.js';
import { ListDispatchesHandler } from './list-dispatches.handler.js';

export const DISPATCH_QUERY_HANDLERS = [GetDispatchHandler, ListDispatchesHandler] as const;

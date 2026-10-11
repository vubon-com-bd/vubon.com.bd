// application/queries/in-app/index.ts
export * from './get-in-app.query.js';
export * from './get-in-app.handler.js';
export * from './get-in-app-inbox.query.js';
export * from './get-in-app-inbox.handler.js';

import { GetInAppHandler } from './get-in-app.handler.js';
import { GetInAppInboxHandler } from './get-in-app-inbox.handler.js';

export const IN_APP_QUERY_HANDLERS = [GetInAppHandler, GetInAppInboxHandler] as const;

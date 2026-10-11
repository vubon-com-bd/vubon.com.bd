// application/queries/sms/index.ts
export * from './get-sms.query.js';
export * from './get-sms.handler.js';
export * from './list-sms.query.js';
export * from './list-sms.handler.js';

import { GetSmsHandler } from './get-sms.handler.js';
import { ListSmsHandler } from './list-sms.handler.js';

export const SMS_QUERY_HANDLERS = [GetSmsHandler, ListSmsHandler] as const;

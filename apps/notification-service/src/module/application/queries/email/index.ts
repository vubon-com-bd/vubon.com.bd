// application/queries/email/index.ts
export * from './get-email.query.js';
export * from './get-email.handler.js';
export * from './list-emails.query.js';
export * from './list-emails.handler.js';

import { GetEmailHandler } from './get-email.handler.js';
import { ListEmailsHandler } from './list-emails.handler.js';

export const EMAIL_QUERY_HANDLERS = [GetEmailHandler, ListEmailsHandler] as const;

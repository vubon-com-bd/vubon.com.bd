// commands/email/index.ts — Email command exports + handlers
export * from './send-email.command.js';
export * from './send-email.handler.js';
export * from './send-email-with-template.command.js';
export * from './send-email-with-template.handler.js';
export * from './retry-email.command.js';
export * from './retry-email.handler.js';
export * from './cancel-email.command.js';
export * from './cancel-email.handler.js';

import { SendEmailHandler } from './send-email.handler.js';
import { SendEmailWithTemplateHandler } from './send-email-with-template.handler.js';
import { RetryEmailHandler } from './retry-email.handler.js';
import { CancelEmailHandler } from './cancel-email.handler.js';

export const EMAIL_COMMAND_HANDLERS = [
  SendEmailHandler,
  SendEmailWithTemplateHandler,
  RetryEmailHandler,
  CancelEmailHandler,
] as const;

/**
 * Email Command Handlers Barrel
 * @module notification-service/modules/email/commands
 */
import { SendEmailHandler } from '@application/commands/email/send-email.handler.js';
import { SendTemplateEmailHandler } from '@application/commands/email/send-template-email.handler.js';
import { SendBulkEmailHandler } from '@application/commands/email/send-bulk-email.handler.js';

export const EMAIL_COMMAND_HANDLERS = [
  SendEmailHandler,
  SendTemplateEmailHandler,
  SendBulkEmailHandler,
] as const;

export {
  SendEmailHandler,
  SendTemplateEmailHandler,
  SendBulkEmailHandler,
};

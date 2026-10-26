/**
 * SMS Command Handlers Barrel
 * @module notification-service/modules/sms/commands
 */
import { SendSmsHandler } from '@application/commands/sms/send-sms.handler.js';
import { SendBulkSmsHandler } from '@application/commands/sms/send-bulk-sms.handler.js';

export const SMS_COMMAND_HANDLERS = [
  SendSmsHandler,
  SendBulkSmsHandler,
] as const;

export { SendSmsHandler, SendBulkSmsHandler };

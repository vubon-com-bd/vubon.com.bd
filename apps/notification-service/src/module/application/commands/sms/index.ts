// commands/sms/index.ts
export * from './send-sms.command.js';
export * from './send-sms.handler.js';
export * from './send-bulk-sms.command.js';
export * from './send-bulk-sms.handler.js';
export * from './retry-sms.command.js';
export * from './retry-sms.handler.js';
export * from './cancel-sms.command.js';
export * from './cancel-sms.handler.js';

import { SendSmsHandler } from './send-sms.handler.js';
import { SendBulkSmsHandler } from './send-bulk-sms.handler.js';
import { RetrySmsHandler } from './retry-sms.handler.js';
import { CancelSmsHandler } from './cancel-sms.handler.js';

export const SMS_COMMAND_HANDLERS = [
  SendSmsHandler,
  SendBulkSmsHandler,
  RetrySmsHandler,
  CancelSmsHandler,
] as const;

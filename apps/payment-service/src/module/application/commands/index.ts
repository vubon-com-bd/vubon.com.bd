// application/commands/index.ts — Commands barrel + ALL_COMMAND_HANDLERS
export * from './payment/index.js';
export * from './refund/index.js';
export * from './webhook/index.js';
export * from './transaction/index.js';

import { PAYMENT_COMMAND_HANDLERS } from './payment/index.js';
import { REFUND_COMMAND_HANDLERS } from './refund/index.js';
import { WEBHOOK_COMMAND_HANDLERS } from './webhook/index.js';
import { TRANSACTION_COMMAND_HANDLERS } from './transaction/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...PAYMENT_COMMAND_HANDLERS,
  ...REFUND_COMMAND_HANDLERS,
  ...WEBHOOK_COMMAND_HANDLERS,
  ...TRANSACTION_COMMAND_HANDLERS,
] as const;

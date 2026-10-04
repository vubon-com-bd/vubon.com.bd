// application/queries/index.ts — Queries barrel + ALL_QUERY_HANDLERS
export * from './payment/index.js';
export * from './refund/index.js';
export * from './transaction/index.js';
export * from './webhook/index.js';

import { PAYMENT_QUERY_HANDLERS } from './payment/index.js';
import { REFUND_QUERY_HANDLERS } from './refund/index.js';
import { TRANSACTION_QUERY_HANDLERS } from './transaction/index.js';
import { WEBHOOK_QUERY_HANDLERS } from './webhook/index.js';

export const ALL_QUERY_HANDLERS = [
  ...PAYMENT_QUERY_HANDLERS,
  ...REFUND_QUERY_HANDLERS,
  ...TRANSACTION_QUERY_HANDLERS,
  ...WEBHOOK_QUERY_HANDLERS,
] as const;

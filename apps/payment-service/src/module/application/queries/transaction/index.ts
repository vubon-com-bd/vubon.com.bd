// application/queries/transaction/index.ts
import { GetTransactionHandler } from './get-transaction.handler.js';
import { ListTransactionsHandler } from './list-transactions.handler.js';
import { ListTransactionsByPaymentHandler } from './list-transactions-by-payment.handler.js';
import { ListTransactionsByOrderHandler } from './list-transactions-by-order.handler.js';

export * from './get-transaction.query.js';
export * from './get-transaction.handler.js';
export * from './list-transactions.query.js';
export * from './list-transactions.handler.js';
export * from './list-transactions-by-payment.query.js';
export * from './list-transactions-by-payment.handler.js';
export * from './list-transactions-by-order.query.js';
export * from './list-transactions-by-order.handler.js';

export const TRANSACTION_QUERY_HANDLERS = [
  GetTransactionHandler,
  ListTransactionsHandler,
  ListTransactionsByPaymentHandler,
  ListTransactionsByOrderHandler,
] as const;

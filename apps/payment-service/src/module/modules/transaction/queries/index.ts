/**
 * Transaction Query Handlers — Barrel
 * @module payment-service/modules/transaction/queries
 */
import { GetTransactionHandler } from '@application/queries/transaction/get-transaction.handler';
import { ListTransactionsHandler } from '@application/queries/transaction/list-transactions.handler';

export const TRANSACTION_QUERY_HANDLERS = [
  GetTransactionHandler,
  ListTransactionsHandler,
] as const;

/**
 * Transaction Command Handlers — Barrel
 * @module payment-service/modules/transaction/commands
 */
import { CreateTransactionHandler } from '@application/commands/transaction/create-transaction.handler';
import { ReverseTransactionHandler } from '@application/commands/transaction/reverse-transaction.handler';

export const TRANSACTION_COMMAND_HANDLERS = [
  CreateTransactionHandler,
  ReverseTransactionHandler,
] as const;

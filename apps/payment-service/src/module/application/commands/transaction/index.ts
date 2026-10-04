// application/commands/transaction/index.ts
// No write-side commands at this layer — transactions are recorded
// internally by PaymentService and RefundService.
export const TRANSACTION_COMMAND_HANDLERS = [] as const;

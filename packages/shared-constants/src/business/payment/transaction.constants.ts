export const TRANSACTION_TYPE = {
  PAYMENT: 'payment',
  REFUND: 'refund',
  CHARGEBACK: 'chargeback',
  PAYOUT: 'payout',
  TRANSFER: 'transfer',
  ADJUSTMENT: 'adjustment',
  REVERSAL: 'reversal',
} as const;

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REVERSED: 'reversed',
  SETTLED: 'settled',
} as const;

export const TRANSACTION_LIMIT = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 10000000,
  MAX_RETRIES: 3,
  RETRY_DELAY_SECONDS: 30,
  IDEMPOTENCY_TTL_SECONDS: 86400,
  REFERENCE_MAX_LENGTH: 128,
} as const;

export type TransactionTypeType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];
export type TransactionStatusType = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

/**
 * Transaction Type Constants
 * Transaction type definitions for payments
 */

export const TRANSACTION_TYPE = {
  // Transaction Types
  TYPES: {
    PAYMENT: 'payment',
    REFUND: 'refund',
    PARTIAL_REFUND: 'partial_refund',
    AUTHORIZATION: 'authorization',
    CAPTURE: 'capture',
    VOID: 'void',
    CHARGEBACK: 'chargeback',
    REVERSAL: 'reversal',
    ADJUSTMENT: 'adjustment',
    FEE: 'fee',
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    TRANSFER: 'transfer',
    RECURRING: 'recurring',
    INSTALLMENT: 'installment',
    CUSTOM: 'custom',
  } as const,

  // Transaction Categories
  CATEGORIES: {
    PAYMENT: 'payment',
    REFUND: 'refund',
    ADJUSTMENT: 'adjustment',
    TRANSFER: 'transfer',
  } as const,

  // Transaction Directions
  DIRECTIONS: {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing',
    BOTH: 'both',
  } as const,

  // Transaction Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'payment',
    DEFAULT_CATEGORY: 'payment',
    DEFAULT_DIRECTION: 'incoming',
  } as const,
} as const;

// Transaction Types
export type TransactionTypeType =
  (typeof TRANSACTION_TYPE.TYPES)[keyof typeof TRANSACTION_TYPE.TYPES];

// Transaction Categories
export type TransactionCategory =
  (typeof TRANSACTION_TYPE.CATEGORIES)[keyof typeof TRANSACTION_TYPE.CATEGORIES];

// Transaction Directions
export type TransactionDirection =
  (typeof TRANSACTION_TYPE.DIRECTIONS)[keyof typeof TRANSACTION_TYPE.DIRECTIONS];

// Transaction Defaults
export type TransactionDefault =
  (typeof TRANSACTION_TYPE.DEFAULTS)[keyof typeof TRANSACTION_TYPE.DEFAULTS];

// Utility Functions
export function transactiontypeGetTypeLabel(type: TransactionTypeType): string {
  const labels: Record<TransactionTypeType, string> = {
    [TRANSACTION_TYPE.TYPES.PAYMENT]: 'Payment',
    [TRANSACTION_TYPE.TYPES.REFUND]: 'Refund',
    [TRANSACTION_TYPE.TYPES.PARTIAL_REFUND]: 'Partial Refund',
    [TRANSACTION_TYPE.TYPES.AUTHORIZATION]: 'Authorization',
    [TRANSACTION_TYPE.TYPES.CAPTURE]: 'Capture',
    [TRANSACTION_TYPE.TYPES.VOID]: 'Void',
    [TRANSACTION_TYPE.TYPES.CHARGEBACK]: 'Chargeback',
    [TRANSACTION_TYPE.TYPES.REVERSAL]: 'Reversal',
    [TRANSACTION_TYPE.TYPES.ADJUSTMENT]: 'Adjustment',
    [TRANSACTION_TYPE.TYPES.FEE]: 'Fee',
    [TRANSACTION_TYPE.TYPES.DEPOSIT]: 'Deposit',
    [TRANSACTION_TYPE.TYPES.WITHDRAWAL]: 'Withdrawal',
    [TRANSACTION_TYPE.TYPES.TRANSFER]: 'Transfer',
    [TRANSACTION_TYPE.TYPES.RECURRING]: 'Recurring',
    [TRANSACTION_TYPE.TYPES.INSTALLMENT]: 'Installment',
    [TRANSACTION_TYPE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Transaction Type';
}

export function transactiontypeGetCategoryLabel(category: TransactionCategory): string {
  const labels: Record<TransactionCategory, string> = {
    [TRANSACTION_TYPE.CATEGORIES.PAYMENT]: 'Payment',
    [TRANSACTION_TYPE.CATEGORIES.REFUND]: 'Refund',
    [TRANSACTION_TYPE.CATEGORIES.ADJUSTMENT]: 'Adjustment',
    [TRANSACTION_TYPE.CATEGORIES.TRANSFER]: 'Transfer',
  };
  return labels[category] || 'Unknown Category';
}

export function transactiontypeGetDirectionLabel(direction: TransactionDirection): string {
  const labels: Record<TransactionDirection, string> = {
    [TRANSACTION_TYPE.DIRECTIONS.INCOMING]: 'Incoming',
    [TRANSACTION_TYPE.DIRECTIONS.OUTGOING]: 'Outgoing',
    [TRANSACTION_TYPE.DIRECTIONS.BOTH]: 'Both',
  };
  return labels[direction] || 'Unknown Direction';
}

export function transactiontypeIsPayment(type: TransactionTypeType): boolean {
  const paymentTypes: TransactionTypeType[] = [
    TRANSACTION_TYPE.TYPES.PAYMENT,
    TRANSACTION_TYPE.TYPES.AUTHORIZATION,
    TRANSACTION_TYPE.TYPES.CAPTURE,
    TRANSACTION_TYPE.TYPES.RECURRING,
    TRANSACTION_TYPE.TYPES.INSTALLMENT,
  ];
  return paymentTypes.includes(type);
}

export function transactiontypeIsRefund(type: TransactionTypeType): boolean {
  const refundTypes: TransactionTypeType[] = [
    TRANSACTION_TYPE.TYPES.REFUND,
    TRANSACTION_TYPE.TYPES.PARTIAL_REFUND,
  ];
  return refundTypes.includes(type);
}

export function transactiontypeIsAdjustment(type: TransactionTypeType): boolean {
  const adjustmentTypes: TransactionTypeType[] = [
    TRANSACTION_TYPE.TYPES.ADJUSTMENT,
    TRANSACTION_TYPE.TYPES.FEE,
    TRANSACTION_TYPE.TYPES.CHARGEBACK,
    TRANSACTION_TYPE.TYPES.REVERSAL,
  ];
  return adjustmentTypes.includes(type);
}

export function transactiontypeGetDefaultType(): TransactionTypeType {
  return TRANSACTION_TYPE.DEFAULTS.DEFAULT_TYPE;
}

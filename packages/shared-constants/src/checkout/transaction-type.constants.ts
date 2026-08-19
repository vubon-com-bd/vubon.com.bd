// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum TransactionType {
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
  PARTIAL_REFUND = 'PARTIAL_REFUND',
  REVERSAL = 'REVERSAL',
  CHARGEBACK = 'CHARGEBACK',
  AUTHORIZATION = 'AUTHORIZATION',
  CAPTURE = 'CAPTURE',
  VOID = 'VOID',
}

export const TRANSACTION_TYPE_META = {
  [TransactionType.PAYMENT]: {
    description: 'মূল পেমেন্ট লেনদেন',
    allowedActions: ['refund', 'partial_refund', 'void'] as const,
    icon: 'credit-card',
    color: '#2ECC71',
  },
  [TransactionType.REFUND]: {
    description: 'সম্পূর্ণ রিফান্ড লেনদেন',
    allowedActions: [] as const,
    icon: 'arrow-left',
    color: '#9B59B6',
  },
  [TransactionType.PARTIAL_REFUND]: {
    description: 'আংশিক রিফান্ড লেনদেন',
    allowedActions: ['refund'] as const,
    icon: 'arrow-left-circle',
    color: '#F39C12',
  },
  [TransactionType.REVERSAL]: {
    description: 'লেনদেন রিভার্সাল',
    allowedActions: [] as const,
    icon: 'rotate-left',
    color: '#E74C3C',
  },
  [TransactionType.CHARGEBACK]: {
    description: 'চার্জব্যাক লেনদেন',
    allowedActions: ['reversal'] as const,
    icon: 'exclamation-circle',
    color: '#E74C3C',
  },
  [TransactionType.AUTHORIZATION]: {
    description: 'অথরাইজেশন লেনদেন',
    allowedActions: ['capture', 'void'] as const,
    icon: 'lock',
    color: '#3498DB',
  },
  [TransactionType.CAPTURE]: {
    description: 'ক্যাপচার লেনদেন',
    allowedActions: ['refund', 'partial_refund'] as const,
    icon: 'check-circle',
    color: '#2ECC71',
  },
  [TransactionType.VOID]: {
    description: 'ভয়েড লেনদেন',
    allowedActions: [] as const,
    icon: 'times-circle',
    color: '#95A5A6',
  },
} as const;

export type TransactionTypeMeta = typeof TRANSACTION_TYPE_META;
export type TransactionAllowedAction =
  'refund' | 'partial_refund' | 'void' | 'capture' | 'reversal';

export function getTransactionTypeDescription(type: TransactionType): string {
  return TRANSACTION_TYPE_META[type].description;
}

export function isTransactionActionAllowed(
  type: TransactionType,
  action: TransactionAllowedAction
): boolean {
  const allowed = TRANSACTION_TYPE_META[type].allowedActions;
  return (allowed as readonly TransactionAllowedAction[]).includes(action);
}

// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum TransactionStatus {
  INITIATED = 'INITIATED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REVERSED = 'REVERSED',
  REFUNDED = 'REFUNDED',
}

export const TRANSACTION_STATUS_META = {
  [TransactionStatus.INITIATED]: {
    label: 'ইনিশিয়েটেড',
    color: '#F39C12',
    description: 'লেনদেন শুরু হয়েছে',
  },
  [TransactionStatus.PENDING]: {
    label: 'পেন্ডিং',
    color: '#FFA500',
    description: 'লেনদেন প্রক্রিয়াধীন',
  },
  [TransactionStatus.PROCESSING]: {
    label: 'প্রক্রিয়াধীন',
    color: '#3498DB',
    description: 'লেনদেন প্রক্রিয়া চলমান',
  },
  [TransactionStatus.SUCCESS]: {
    label: 'সফল',
    color: '#2ECC71',
    description: 'লেনদেন সফলভাবে সম্পন্ন',
  },
  [TransactionStatus.FAILED]: {
    label: 'ব্যর্থ',
    color: '#E74C3C',
    description: 'লেনদেন ব্যর্থ হয়েছে',
  },
  [TransactionStatus.CANCELLED]: {
    label: 'বাতিল',
    color: '#95A5A6',
    description: 'লেনদেন বাতিল করা হয়েছে',
  },
  [TransactionStatus.REVERSED]: {
    label: 'রিভার্সড',
    color: '#E74C3C',
    description: 'লেনদেন রিভার্স করা হয়েছে',
  },
  [TransactionStatus.REFUNDED]: {
    label: 'রিফান্ডেড',
    color: '#9B59B6',
    description: 'লেনদেন রিফান্ড করা হয়েছে',
  },
} as const;

export type TransactionStatusMeta = typeof TRANSACTION_STATUS_META;

export const ALLOWED_TRANSACTION_STATUS_TRANSITIONS: Record<
  TransactionStatus,
  readonly TransactionStatus[]
> = {
  [TransactionStatus.INITIATED]: [TransactionStatus.PENDING, TransactionStatus.CANCELLED],
  [TransactionStatus.PENDING]: [
    TransactionStatus.PROCESSING,
    TransactionStatus.CANCELLED,
    TransactionStatus.FAILED,
  ],
  [TransactionStatus.PROCESSING]: [
    TransactionStatus.SUCCESS,
    TransactionStatus.FAILED,
    TransactionStatus.CANCELLED,
  ],
  [TransactionStatus.SUCCESS]: [TransactionStatus.REFUNDED, TransactionStatus.REVERSED],
  [TransactionStatus.FAILED]: [TransactionStatus.PENDING, TransactionStatus.CANCELLED],
  [TransactionStatus.CANCELLED]: [TransactionStatus.INITIATED],
  [TransactionStatus.REVERSED]: [],
  [TransactionStatus.REFUNDED]: [],
} as const;

export type AllowedTransactionStatusTransitions = typeof ALLOWED_TRANSACTION_STATUS_TRANSITIONS;

export function isTransactionStatusTransitionAllowed(
  from: TransactionStatus,
  to: TransactionStatus
): boolean {
  const allowed = ALLOWED_TRANSACTION_STATUS_TRANSITIONS[from] || [];
  return (allowed as readonly TransactionStatus[]).includes(to);
}

export function getTransactionStatusLabel(status: TransactionStatus): string {
  return TRANSACTION_STATUS_META[status].label;
}

export function getTransactionStatusColor(status: TransactionStatus): string {
  return TRANSACTION_STATUS_META[status].color;
}

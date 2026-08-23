/**
 * Transaction Status Constants
 * Status definitions for transactions
 */

export const TRANSACTION_STATUS = {
  // Transaction Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUNDED: 'partial_refunded',
    VOIDED: 'voided',
    DECLINED: 'declined',
    ON_HOLD: 'on_hold',
    REVIEWING: 'reviewing',
    SETTLED: 'settled',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#F59E0B',
    PROCESSING: '#3B82F6',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    CANCELLED: '#6B7280',
    REFUNDED: '#6B7280',
    PARTIAL_REFUNDED: '#F59E0B',
    VOIDED: '#6B7280',
    DECLINED: '#EF4444',
    ON_HOLD: '#F59E0B',
    REVIEWING: '#8B5CF6',
    SETTLED: '#10B981',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Status Priority Order
  ORDER: {
    PENDING: 0,
    PROCESSING: 1,
    REVIEWING: 2,
    ON_HOLD: 3,
    COMPLETED: 4,
    SETTLED: 5,
    PARTIAL_REFUNDED: 6,
    REFUNDED: 7,
    FAILED: 8,
    DECLINED: 9,
    VOIDED: 10,
    CANCELLED: 11,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_PROCESSING: 'pending_to_processing',
    PENDING_TO_FAILED: 'pending_to_failed',
    PENDING_TO_DECLINED: 'pending_to_declined',
    PENDING_TO_CANCELLED: 'pending_to_cancelled',
    PROCESSING_TO_COMPLETED: 'processing_to_completed',
    PROCESSING_TO_FAILED: 'processing_to_failed',
    PROCESSING_TO_DECLINED: 'processing_to_declined',
    PROCESSING_TO_ON_HOLD: 'processing_to_on_hold',
    PROCESSING_TO_REVIEWING: 'processing_to_reviewing',
    COMPLETED_TO_REFUNDED: 'completed_to_refunded',
    COMPLETED_TO_PARTIAL_REFUNDED: 'completed_to_partial_refunded',
    COMPLETED_TO_SETTLED: 'completed_to_settled',
    ON_HOLD_TO_PROCESSING: 'on_hold_to_processing',
    ON_HOLD_TO_CANCELLED: 'on_hold_to_cancelled',
    REVIEWING_TO_PROCESSING: 'reviewing_to_processing',
    REVIEWING_TO_COMPLETED: 'reviewing_to_completed',
    REVIEWING_TO_FAILED: 'reviewing_to_failed',
    PARTIAL_REFUNDED_TO_REFUNDED: 'partial_refunded_to_refunded',
    REFUNDED_TO_COMPLETED: 'refunded_to_completed',
    FAILED_TO_CANCELLED: 'failed_to_cancelled',
    DECLINED_TO_CANCELLED: 'declined_to_cancelled',
    VOIDED_TO_CANCELLED: 'voided_to_cancelled',
    CANCELLED_TO_ARCHIVED: 'cancelled_to_archived',
  } as const,
} as const;

// Transaction Statuses
export type TransactionStatusType =
  (typeof TRANSACTION_STATUS.STATUSES)[keyof typeof TRANSACTION_STATUS.STATUSES];

// Status Colors
export type TransactionStatusColor =
  (typeof TRANSACTION_STATUS.COLORS)[keyof typeof TRANSACTION_STATUS.COLORS];

// Status Categories
export type TransactionStatusCategory =
  (typeof TRANSACTION_STATUS.CATEGORIES)[keyof typeof TRANSACTION_STATUS.CATEGORIES];

// Status Priority Order
export type TransactionStatusOrder =
  (typeof TRANSACTION_STATUS.ORDER)[keyof typeof TRANSACTION_STATUS.ORDER];

// Status Transitions
export type TransactionStatusTransition =
  (typeof TRANSACTION_STATUS.TRANSITIONS)[keyof typeof TRANSACTION_STATUS.TRANSITIONS];

// Utility Functions
export function transactionstatusGetStatusLabel(status: TransactionStatusType): string {
  const labels: Record<TransactionStatusType, string> = {
    [TRANSACTION_STATUS.STATUSES.PENDING]: 'Pending',
    [TRANSACTION_STATUS.STATUSES.PROCESSING]: 'Processing',
    [TRANSACTION_STATUS.STATUSES.COMPLETED]: 'Completed',
    [TRANSACTION_STATUS.STATUSES.FAILED]: 'Failed',
    [TRANSACTION_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [TRANSACTION_STATUS.STATUSES.REFUNDED]: 'Refunded',
    [TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED]: 'Partial Refunded',
    [TRANSACTION_STATUS.STATUSES.VOIDED]: 'Voided',
    [TRANSACTION_STATUS.STATUSES.DECLINED]: 'Declined',
    [TRANSACTION_STATUS.STATUSES.ON_HOLD]: 'On Hold',
    [TRANSACTION_STATUS.STATUSES.REVIEWING]: 'Reviewing',
    [TRANSACTION_STATUS.STATUSES.SETTLED]: 'Settled',
  };
  return labels[status] || 'Unknown Status';
}

export function transactionstatusGetStatusColor(
  status: TransactionStatusType
): TransactionStatusColor {
  const colors: Record<TransactionStatusType, TransactionStatusColor> = {
    [TRANSACTION_STATUS.STATUSES.PENDING]: TRANSACTION_STATUS.COLORS.PENDING,
    [TRANSACTION_STATUS.STATUSES.PROCESSING]: TRANSACTION_STATUS.COLORS.PROCESSING,
    [TRANSACTION_STATUS.STATUSES.COMPLETED]: TRANSACTION_STATUS.COLORS.COMPLETED,
    [TRANSACTION_STATUS.STATUSES.FAILED]: TRANSACTION_STATUS.COLORS.FAILED,
    [TRANSACTION_STATUS.STATUSES.CANCELLED]: TRANSACTION_STATUS.COLORS.CANCELLED,
    [TRANSACTION_STATUS.STATUSES.REFUNDED]: TRANSACTION_STATUS.COLORS.REFUNDED,
    [TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED]: TRANSACTION_STATUS.COLORS.PARTIAL_REFUNDED,
    [TRANSACTION_STATUS.STATUSES.VOIDED]: TRANSACTION_STATUS.COLORS.VOIDED,
    [TRANSACTION_STATUS.STATUSES.DECLINED]: TRANSACTION_STATUS.COLORS.DECLINED,
    [TRANSACTION_STATUS.STATUSES.ON_HOLD]: TRANSACTION_STATUS.COLORS.ON_HOLD,
    [TRANSACTION_STATUS.STATUSES.REVIEWING]: TRANSACTION_STATUS.COLORS.REVIEWING,
    [TRANSACTION_STATUS.STATUSES.SETTLED]: TRANSACTION_STATUS.COLORS.SETTLED,
  };
  return colors[status] || TRANSACTION_STATUS.COLORS.PENDING;
}

export function transactionstatusGetStatusCategory(
  status: TransactionStatusType
): TransactionStatusCategory {
  const categories: Record<TransactionStatusType, TransactionStatusCategory> = {
    [TRANSACTION_STATUS.STATUSES.PENDING]: TRANSACTION_STATUS.CATEGORIES.PENDING,
    [TRANSACTION_STATUS.STATUSES.PROCESSING]: TRANSACTION_STATUS.CATEGORIES.PROCESSING,
    [TRANSACTION_STATUS.STATUSES.REVIEWING]: TRANSACTION_STATUS.CATEGORIES.PROCESSING,
    [TRANSACTION_STATUS.STATUSES.ON_HOLD]: TRANSACTION_STATUS.CATEGORIES.PROCESSING,
    [TRANSACTION_STATUS.STATUSES.COMPLETED]: TRANSACTION_STATUS.CATEGORIES.COMPLETED,
    [TRANSACTION_STATUS.STATUSES.SETTLED]: TRANSACTION_STATUS.CATEGORIES.COMPLETED,
    [TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED]: TRANSACTION_STATUS.CATEGORIES.COMPLETED,
    [TRANSACTION_STATUS.STATUSES.REFUNDED]: TRANSACTION_STATUS.CATEGORIES.COMPLETED,
    [TRANSACTION_STATUS.STATUSES.FAILED]: TRANSACTION_STATUS.CATEGORIES.FAILED,
    [TRANSACTION_STATUS.STATUSES.DECLINED]: TRANSACTION_STATUS.CATEGORIES.FAILED,
    [TRANSACTION_STATUS.STATUSES.VOIDED]: TRANSACTION_STATUS.CATEGORIES.CANCELLED,
    [TRANSACTION_STATUS.STATUSES.CANCELLED]: TRANSACTION_STATUS.CATEGORIES.CANCELLED,
  };
  return categories[status] || TRANSACTION_STATUS.CATEGORIES.PENDING;
}

export function transactionstatusIsCompleted(status: TransactionStatusType): boolean {
  const completedStatuses: TransactionStatusType[] = [
    TRANSACTION_STATUS.STATUSES.COMPLETED,
    TRANSACTION_STATUS.STATUSES.SETTLED,
  ];
  return completedStatuses.includes(status);
}

export function transactionstatusIsFailed(status: TransactionStatusType): boolean {
  const failedStatuses: TransactionStatusType[] = [
    TRANSACTION_STATUS.STATUSES.FAILED,
    TRANSACTION_STATUS.STATUSES.DECLINED,
  ];
  return failedStatuses.includes(status);
}

export function transactionstatusIsRefunded(status: TransactionStatusType): boolean {
  const refundedStatuses: TransactionStatusType[] = [
    TRANSACTION_STATUS.STATUSES.REFUNDED,
    TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED,
  ];
  return refundedStatuses.includes(status);
}

export function transactionstatusIsPending(status: TransactionStatusType): boolean {
  const pendingStatuses: TransactionStatusType[] = [
    TRANSACTION_STATUS.STATUSES.PENDING,
    TRANSACTION_STATUS.STATUSES.PROCESSING,
    TRANSACTION_STATUS.STATUSES.REVIEWING,
    TRANSACTION_STATUS.STATUSES.ON_HOLD,
  ];
  return pendingStatuses.includes(status);
}

export function transactionstatusCanTransition(
  currentStatus: TransactionStatusType,
  targetStatus: TransactionStatusType
): boolean {
  const validTransitions: Record<TransactionStatusType, TransactionStatusType[]> = {
    [TRANSACTION_STATUS.STATUSES.PENDING]: [
      TRANSACTION_STATUS.STATUSES.PROCESSING,
      TRANSACTION_STATUS.STATUSES.FAILED,
      TRANSACTION_STATUS.STATUSES.DECLINED,
      TRANSACTION_STATUS.STATUSES.CANCELLED,
    ],
    [TRANSACTION_STATUS.STATUSES.PROCESSING]: [
      TRANSACTION_STATUS.STATUSES.COMPLETED,
      TRANSACTION_STATUS.STATUSES.FAILED,
      TRANSACTION_STATUS.STATUSES.DECLINED,
      TRANSACTION_STATUS.STATUSES.ON_HOLD,
      TRANSACTION_STATUS.STATUSES.REVIEWING,
    ],
    [TRANSACTION_STATUS.STATUSES.COMPLETED]: [
      TRANSACTION_STATUS.STATUSES.REFUNDED,
      TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED,
      TRANSACTION_STATUS.STATUSES.SETTLED,
    ],
    [TRANSACTION_STATUS.STATUSES.ON_HOLD]: [
      TRANSACTION_STATUS.STATUSES.PROCESSING,
      TRANSACTION_STATUS.STATUSES.CANCELLED,
    ],
    [TRANSACTION_STATUS.STATUSES.REVIEWING]: [
      TRANSACTION_STATUS.STATUSES.PROCESSING,
      TRANSACTION_STATUS.STATUSES.COMPLETED,
      TRANSACTION_STATUS.STATUSES.FAILED,
    ],
    [TRANSACTION_STATUS.STATUSES.PARTIAL_REFUNDED]: [TRANSACTION_STATUS.STATUSES.REFUNDED],
    [TRANSACTION_STATUS.STATUSES.REFUNDED]: [TRANSACTION_STATUS.STATUSES.COMPLETED],
    [TRANSACTION_STATUS.STATUSES.FAILED]: [TRANSACTION_STATUS.STATUSES.CANCELLED],
    [TRANSACTION_STATUS.STATUSES.DECLINED]: [TRANSACTION_STATUS.STATUSES.CANCELLED],
    [TRANSACTION_STATUS.STATUSES.VOIDED]: [TRANSACTION_STATUS.STATUSES.CANCELLED],
    [TRANSACTION_STATUS.STATUSES.CANCELLED]: [],
    [TRANSACTION_STATUS.STATUSES.SETTLED]: [],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}

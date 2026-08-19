// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIAL_REFUND = 'PARTIAL_REFUND',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export const PAYMENT_STATUS_META = {
  [PaymentStatus.PENDING]: {
    label: 'পেন্ডিং',
    color: '#FFA500',
    description: 'পেমেন্ট প্রক্রিয়া শুরু হয়েছে কিন্তু সম্পন্ন হয়নি',
    allowedActions: ['cancel', 'retry'] as const,
  },
  [PaymentStatus.PROCESSING]: {
    label: 'প্রক্রিয়াধীন',
    color: '#3498DB',
    description: 'পেমেন্ট প্রক্রিয়া চলমান',
    allowedActions: ['cancel'] as const,
  },
  [PaymentStatus.COMPLETED]: {
    label: 'সম্পন্ন',
    color: '#2ECC71',
    description: 'পেমেন্ট সফলভাবে সম্পন্ন হয়েছে',
    allowedActions: ['refund', 'partial_refund'] as const,
  },
  [PaymentStatus.FAILED]: {
    label: 'ব্যর্থ',
    color: '#E74C3C',
    description: 'পেমেন্ট প্রক্রিয়া ব্যর্থ হয়েছে',
    allowedActions: ['retry', 'cancel'] as const,
  },
  [PaymentStatus.REFUNDED]: {
    label: 'রিফান্ডেড',
    color: '#9B59B6',
    description: 'পেমেন্ট সম্পূর্ণ রিফান্ড করা হয়েছে',
    allowedActions: [] as const,
  },
  [PaymentStatus.PARTIAL_REFUND]: {
    label: 'আংশিক রিফান্ড',
    color: '#F39C12',
    description: 'পেমেন্টের অংশবিশেষ রিফান্ড করা হয়েছে',
    allowedActions: ['refund'] as const,
  },
  [PaymentStatus.CANCELLED]: {
    label: 'বাতিল',
    color: '#95A5A6',
    description: 'পেমেন্ট প্রক্রিয়া বাতিল করা হয়েছে',
    allowedActions: ['retry'] as const,
  },
  [PaymentStatus.EXPIRED]: {
    label: 'মেয়াদ উত্তীর্ণ',
    color: '#7F8C8D',
    description: 'পেমেন্ট সেশনের মেয়াদ শেষ হয়েছে',
    allowedActions: ['retry'] as const,
  },
} as const;

export type PaymentStatusMeta = typeof PAYMENT_STATUS_META;
export type PaymentAllowedAction = 'cancel' | 'retry' | 'refund' | 'partial_refund';

export const ALLOWED_PAYMENT_STATUS_TRANSITIONS: Record<PaymentStatus, readonly PaymentStatus[]> = {
  [PaymentStatus.PENDING]: [
    PaymentStatus.PROCESSING,
    PaymentStatus.CANCELLED,
    PaymentStatus.EXPIRED,
    PaymentStatus.FAILED,
  ],
  [PaymentStatus.PROCESSING]: [
    PaymentStatus.COMPLETED,
    PaymentStatus.FAILED,
    PaymentStatus.CANCELLED,
  ],
  [PaymentStatus.COMPLETED]: [PaymentStatus.REFUNDED, PaymentStatus.PARTIAL_REFUND],
  [PaymentStatus.FAILED]: [PaymentStatus.PENDING, PaymentStatus.CANCELLED],
  [PaymentStatus.REFUNDED]: [],
  [PaymentStatus.PARTIAL_REFUND]: [PaymentStatus.REFUNDED],
  [PaymentStatus.CANCELLED]: [PaymentStatus.PENDING],
  [PaymentStatus.EXPIRED]: [PaymentStatus.PENDING],
} as const;

export type AllowedPaymentStatusTransitions = typeof ALLOWED_PAYMENT_STATUS_TRANSITIONS;

export function isPaymentStatusTransitionAllowed(from: PaymentStatus, to: PaymentStatus): boolean {
  const allowed = ALLOWED_PAYMENT_STATUS_TRANSITIONS[from] || [];
  return (allowed as readonly PaymentStatus[]).includes(to);
}

export function isPaymentActionAllowed(
  status: PaymentStatus,
  action: PaymentAllowedAction
): boolean {
  const allowedActions = PAYMENT_STATUS_META[status].allowedActions;
  return (allowedActions as readonly PaymentAllowedAction[]).includes(action);
}

export function isRefundable(status: PaymentStatus): boolean {
  return (
    isPaymentActionAllowed(status, 'refund') || isPaymentActionAllowed(status, 'partial_refund')
  );
}

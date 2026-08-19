// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum CheckoutStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export const CHECKOUT_STATUS_META = {
  [CheckoutStatus.PENDING]: {
    label: 'পেন্ডিং',
    color: '#FFA500', // Orange
    icon: 'clock',
    description: 'চেকআউট প্রক্রিয়া শুরু হয়নি',
  },
  [CheckoutStatus.IN_PROGRESS]: {
    label: 'প্রক্রিয়াধীন',
    color: '#3498DB', // Blue
    icon: 'refresh',
    description: 'চেকআউট প্রক্রিয়া চলমান',
  },
  [CheckoutStatus.COMPLETED]: {
    label: 'সম্পন্ন',
    color: '#2ECC71', // Green
    icon: 'check-circle',
    description: 'চেকআউট সফলভাবে সম্পন্ন হয়েছে',
  },
  [CheckoutStatus.FAILED]: {
    label: 'ব্যর্থ',
    color: '#E74C3C', // Red
    icon: 'times-circle',
    description: 'চেকআউট প্রক্রিয়া ব্যর্থ হয়েছে',
  },
  [CheckoutStatus.EXPIRED]: {
    label: 'মেয়াদ উত্তীর্ণ',
    color: '#95A5A6', // Gray
    icon: 'hourglass-end',
    description: 'চেকআউট সেশনের মেয়াদ শেষ হয়েছে',
  },
  [CheckoutStatus.CANCELLED]: {
    label: 'বাতিল',
    color: '#7F8C8D', // Dark Gray
    icon: 'ban',
    description: 'চেকআউট প্রক্রিয়া বাতিল করা হয়েছে',
  },
} as const;

export type CheckoutStatusMeta = typeof CHECKOUT_STATUS_META;

export const ALLOWED_STATUS_TRANSITIONS: Record<CheckoutStatus, readonly CheckoutStatus[]> = {
  [CheckoutStatus.PENDING]: [
    CheckoutStatus.IN_PROGRESS,
    CheckoutStatus.CANCELLED,
    CheckoutStatus.EXPIRED,
  ],
  [CheckoutStatus.IN_PROGRESS]: [
    CheckoutStatus.COMPLETED,
    CheckoutStatus.FAILED,
    CheckoutStatus.CANCELLED,
  ],
  [CheckoutStatus.COMPLETED]: [],
  [CheckoutStatus.FAILED]: [CheckoutStatus.PENDING],
  [CheckoutStatus.EXPIRED]: [CheckoutStatus.PENDING],
  [CheckoutStatus.CANCELLED]: [CheckoutStatus.PENDING],
} as const;

export type AllowedStatusTransitions = typeof ALLOWED_STATUS_TRANSITIONS;

export function isStatusTransitionAllowed(from: CheckoutStatus, to: CheckoutStatus): boolean {
  const allowed = ALLOWED_STATUS_TRANSITIONS[from] || [];
  return (allowed as readonly CheckoutStatus[]).includes(to);
}

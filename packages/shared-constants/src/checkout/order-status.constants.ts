// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  REFUNDED = 'REFUNDED',
  COMPLETED = 'COMPLETED',
}

export const ORDER_STATUS_META = {
  [OrderStatus.PENDING]: {
    label: 'পেন্ডিং',
    color: '#FFA500',
    description: 'অর্ডারটি প্রাপ্ত হয়েছে কিন্তু প্রক্রিয়াকরণ শুরু হয়নি',
    allowedActions: ['cancel', 'confirm'] as const,
    icon: 'clock',
    priority: 1,
  },
  [OrderStatus.CONFIRMED]: {
    label: 'কনফার্মড',
    color: '#3498DB',
    description: 'অর্ডারটি কনফার্ম করা হয়েছে এবং প্রক্রিয়াকরণের জন্য প্রস্তুত',
    allowedActions: ['process', 'cancel'] as const,
    icon: 'check-circle',
    priority: 2,
  },
  [OrderStatus.PROCESSING]: {
    label: 'প্রক্রিয়াধীন',
    color: '#9B59B6',
    description: 'অর্ডারটি প্রক্রিয়াকরণের মধ্যে রয়েছে',
    allowedActions: ['ship', 'cancel'] as const,
    icon: 'refresh',
    priority: 3,
  },
  [OrderStatus.SHIPPED]: {
    label: 'শিপড',
    color: '#F39C12',
    description: 'অর্ডারটি পাঠানো হয়েছে',
    allowedActions: ['deliver', 'return'] as const,
    icon: 'truck',
    priority: 4,
  },
  [OrderStatus.DELIVERED]: {
    label: 'ডেলিভারি সম্পন্ন',
    color: '#2ECC71',
    description: 'অর্ডারটি সফলভাবে ডেলিভারি করা হয়েছে',
    allowedActions: ['complete', 'return'] as const,
    icon: 'home',
    priority: 5,
  },
  [OrderStatus.CANCELLED]: {
    label: 'বাতিল',
    color: '#E74C3C',
    description: 'অর্ডারটি বাতিল করা হয়েছে',
    allowedActions: [] as const,
    icon: 'times-circle',
    priority: 6,
  },
  [OrderStatus.RETURNED]: {
    label: 'রিটার্নেড',
    color: '#95A5A6',
    description: 'অর্ডারটি ফেরত দেওয়া হয়েছে',
    allowedActions: ['refund'] as const,
    icon: 'arrow-left',
    priority: 7,
  },
  [OrderStatus.REFUNDED]: {
    label: 'রিফান্ডেড',
    color: '#E67E22',
    description: 'অর্ডারের টাকা ফেরত দেওয়া হয়েছে',
    allowedActions: [] as const,
    icon: 'money-bill',
    priority: 8,
  },
  [OrderStatus.COMPLETED]: {
    label: 'সম্পন্ন',
    color: '#27AE60',
    description: 'অর্ডারটি সম্পূর্ণরূপে সমাপ্ত হয়েছে',
    allowedActions: [] as const,
    icon: 'flag',
    priority: 9,
  },
} as const;

export type OrderStatusMeta = typeof ORDER_STATUS_META;
export type OrderAllowedAction =
  'cancel' | 'confirm' | 'process' | 'ship' | 'deliver' | 'complete' | 'return' | 'refund';

export const ALLOWED_ORDER_STATUS_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
  [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED, OrderStatus.RETURNED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.RETURNED]: [OrderStatus.REFUNDED],
  [OrderStatus.REFUNDED]: [],
  [OrderStatus.COMPLETED]: [],
} as const;

export type AllowedOrderStatusTransitions = typeof ALLOWED_ORDER_STATUS_TRANSITIONS;

export const ORDER_STATUS_ORDER = [
  OrderStatus.PENDING,
  OrderStatus.CONFIRMED,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
  OrderStatus.RETURNED,
  OrderStatus.REFUNDED,
] as const;

export type OrderStatusOrder = typeof ORDER_STATUS_ORDER;

export function getOrderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_META[status].label;
}

export function getOrderStatusColor(status: OrderStatus): string {
  return ORDER_STATUS_META[status].color;
}

export function getOrderStatusDescription(status: OrderStatus): string {
  return ORDER_STATUS_META[status].description;
}

export function getOrderStatusIcon(status: OrderStatus): string {
  return ORDER_STATUS_META[status].icon;
}

export function getOrderStatusPriority(status: OrderStatus): number {
  return ORDER_STATUS_META[status].priority;
}

export function isOrderStatusTransitionAllowed(from: OrderStatus, to: OrderStatus): boolean {
  const allowed = ALLOWED_ORDER_STATUS_TRANSITIONS[from] || [];
  return (allowed as readonly OrderStatus[]).includes(to);
}

export function isOrderActionAllowed(status: OrderStatus, action: OrderAllowedAction): boolean {
  const allowedActions = ORDER_STATUS_META[status].allowedActions;
  return (allowedActions as readonly OrderAllowedAction[]).includes(action);
}

export function isOrderComplete(status: OrderStatus): boolean {
  return status === OrderStatus.COMPLETED || status === OrderStatus.DELIVERED;
}

export function isOrderActive(status: OrderStatus): boolean {
  return (
    status !== OrderStatus.CANCELLED &&
    status !== OrderStatus.RETURNED &&
    status !== OrderStatus.REFUNDED &&
    status !== OrderStatus.COMPLETED
  );
}

export function canCancelOrder(status: OrderStatus): boolean {
  return isOrderActionAllowed(status, 'cancel');
}

export function canReturnOrder(status: OrderStatus): boolean {
  return isOrderActionAllowed(status, 'return');
}

export function canRefundOrder(status: OrderStatus): boolean {
  return isOrderActionAllowed(status, 'refund');
}

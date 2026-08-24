/**
 * Vendor Notification Constants
 * Configuration for vendor notifications
 */

export const VENDOR_NOTIFICATION = {
  // Notification Types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
    DASHBOARD: 'dashboard',
  } as const,

  // Notification Statuses
  STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Notification Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Notification Categories
  CATEGORIES: {
    ORDER: 'order',
    PAYMENT: 'payment',
    PRODUCT: 'product',
    SETTLEMENT: 'settlement',
    ACCOUNT: 'account',
    SUPPORT: 'support',
    PROMOTION: 'promotion',
    SYSTEM: 'system',
  } as const,

  // Notification Events
  EVENTS: {
    ORDER_CREATED: 'order_created',
    ORDER_UPDATED: 'order_updated',
    ORDER_CANCELLED: 'order_cancelled',
    PAYMENT_RECEIVED: 'payment_received',
    SETTLEMENT_COMPLETED: 'settlement_completed',
    PRODUCT_APPROVED: 'product_approved',
    PRODUCT_REJECTED: 'product_rejected',
    ACCOUNT_VERIFIED: 'account_verified',
    SUPPORT_TICKET: 'support_ticket',
    PROMOTION_AVAILABLE: 'promotion_available',
    SYSTEM_ALERT: 'system_alert',
  } as const,

  // Notification Channels
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
  } as const,

  // Notification Limits
  LIMITS: {
    MAX_PER_DAY: 100,
    MAX_PER_HOUR: 20,
    MAX_PER_MINUTE: 5,
    MAX_RETRY: 3,
  } as const,

  // Notification Templates
  TEMPLATES: {
    ORDER_CONFIRMATION: 'order_confirmation',
    PAYMENT_RECEIPT: 'payment_receipt',
    SETTLEMENT_NOTICE: 'settlement_notice',
    PRODUCT_STATUS: 'product_status',
    ACCOUNT_UPDATE: 'account_update',
    SUPPORT_RESPONSE: 'support_response',
    PROMOTION_ALERT: 'promotion_alert',
    SYSTEM_NOTICE: 'system_notice',
  } as const,
} as const;

// Notification Types
export type VendorNotificationType =
  (typeof VENDOR_NOTIFICATION.TYPES)[keyof typeof VENDOR_NOTIFICATION.TYPES];

// Notification Statuses
export type VendorNotificationStatus =
  (typeof VENDOR_NOTIFICATION.STATUS)[keyof typeof VENDOR_NOTIFICATION.STATUS];

// Notification Priorities
export type VendorNotificationPriority =
  (typeof VENDOR_NOTIFICATION.PRIORITY)[keyof typeof VENDOR_NOTIFICATION.PRIORITY];

// Notification Categories
export type VendorNotificationCategory =
  (typeof VENDOR_NOTIFICATION.CATEGORIES)[keyof typeof VENDOR_NOTIFICATION.CATEGORIES];

// Notification Events
export type VendorNotificationEvent =
  (typeof VENDOR_NOTIFICATION.EVENTS)[keyof typeof VENDOR_NOTIFICATION.EVENTS];

// Notification Channels
export type VendorNotificationChannel =
  (typeof VENDOR_NOTIFICATION.CHANNELS)[keyof typeof VENDOR_NOTIFICATION.CHANNELS];

// Notification Templates
export type VendorNotificationTemplate =
  (typeof VENDOR_NOTIFICATION.TEMPLATES)[keyof typeof VENDOR_NOTIFICATION.TEMPLATES];

// Utility Functions
export function vendorNotificationGetTypeLabel(type: VendorNotificationType): string {
  const labels: Record<VendorNotificationType, string> = {
    [VENDOR_NOTIFICATION.TYPES.EMAIL]: 'Email',
    [VENDOR_NOTIFICATION.TYPES.SMS]: 'SMS',
    [VENDOR_NOTIFICATION.TYPES.PUSH]: 'Push Notification',
    [VENDOR_NOTIFICATION.TYPES.IN_APP]: 'In-App Notification',
    [VENDOR_NOTIFICATION.TYPES.WHATSAPP]: 'WhatsApp',
    [VENDOR_NOTIFICATION.TYPES.DASHBOARD]: 'Dashboard',
  };
  return labels[type] || 'Unknown';
}

export function vendorNotificationGetStatusLabel(status: VendorNotificationStatus): string {
  const labels: Record<VendorNotificationStatus, string> = {
    [VENDOR_NOTIFICATION.STATUS.PENDING]: 'Pending',
    [VENDOR_NOTIFICATION.STATUS.SENT]: 'Sent',
    [VENDOR_NOTIFICATION.STATUS.DELIVERED]: 'Delivered',
    [VENDOR_NOTIFICATION.STATUS.READ]: 'Read',
    [VENDOR_NOTIFICATION.STATUS.FAILED]: 'Failed',
    [VENDOR_NOTIFICATION.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function vendorNotificationGetPriorityLabel(priority: VendorNotificationPriority): string {
  const labels: Record<VendorNotificationPriority, string> = {
    [VENDOR_NOTIFICATION.PRIORITY.CRITICAL]: 'Critical',
    [VENDOR_NOTIFICATION.PRIORITY.HIGH]: 'High',
    [VENDOR_NOTIFICATION.PRIORITY.MEDIUM]: 'Medium',
    [VENDOR_NOTIFICATION.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorNotificationGetCategoryLabel(category: VendorNotificationCategory): string {
  const labels: Record<VendorNotificationCategory, string> = {
    [VENDOR_NOTIFICATION.CATEGORIES.ORDER]: 'Order',
    [VENDOR_NOTIFICATION.CATEGORIES.PAYMENT]: 'Payment',
    [VENDOR_NOTIFICATION.CATEGORIES.PRODUCT]: 'Product',
    [VENDOR_NOTIFICATION.CATEGORIES.SETTLEMENT]: 'Settlement',
    [VENDOR_NOTIFICATION.CATEGORIES.ACCOUNT]: 'Account',
    [VENDOR_NOTIFICATION.CATEGORIES.SUPPORT]: 'Support',
    [VENDOR_NOTIFICATION.CATEGORIES.PROMOTION]: 'Promotion',
    [VENDOR_NOTIFICATION.CATEGORIES.SYSTEM]: 'System',
  };
  return labels[category] || 'Unknown';
}

export function vendorNotificationGetEventLabel(event: VendorNotificationEvent): string {
  const labels: Record<VendorNotificationEvent, string> = {
    [VENDOR_NOTIFICATION.EVENTS.ORDER_CREATED]: 'Order Created',
    [VENDOR_NOTIFICATION.EVENTS.ORDER_UPDATED]: 'Order Updated',
    [VENDOR_NOTIFICATION.EVENTS.ORDER_CANCELLED]: 'Order Cancelled',
    [VENDOR_NOTIFICATION.EVENTS.PAYMENT_RECEIVED]: 'Payment Received',
    [VENDOR_NOTIFICATION.EVENTS.SETTLEMENT_COMPLETED]: 'Settlement Completed',
    [VENDOR_NOTIFICATION.EVENTS.PRODUCT_APPROVED]: 'Product Approved',
    [VENDOR_NOTIFICATION.EVENTS.PRODUCT_REJECTED]: 'Product Rejected',
    [VENDOR_NOTIFICATION.EVENTS.ACCOUNT_VERIFIED]: 'Account Verified',
    [VENDOR_NOTIFICATION.EVENTS.SUPPORT_TICKET]: 'Support Ticket',
    [VENDOR_NOTIFICATION.EVENTS.PROMOTION_AVAILABLE]: 'Promotion Available',
    [VENDOR_NOTIFICATION.EVENTS.SYSTEM_ALERT]: 'System Alert',
  };
  return labels[event] || 'Unknown';
}

export function vendorNotificationGetChannelLabel(channel: VendorNotificationChannel): string {
  const labels: Record<VendorNotificationChannel, string> = {
    [VENDOR_NOTIFICATION.CHANNELS.EMAIL]: 'Email',
    [VENDOR_NOTIFICATION.CHANNELS.SMS]: 'SMS',
    [VENDOR_NOTIFICATION.CHANNELS.PUSH]: 'Push',
    [VENDOR_NOTIFICATION.CHANNELS.IN_APP]: 'In-App',
    [VENDOR_NOTIFICATION.CHANNELS.WHATSAPP]: 'WhatsApp',
  };
  return labels[channel] || 'Unknown';
}

export function vendorNotificationIsDelivered(status: VendorNotificationStatus): boolean {
  return (
    status === VENDOR_NOTIFICATION.STATUS.DELIVERED || status === VENDOR_NOTIFICATION.STATUS.READ
  );
}

export function vendorNotificationIsFailed(status: VendorNotificationStatus): boolean {
  return status === VENDOR_NOTIFICATION.STATUS.FAILED;
}

export function vendorNotificationGetTemplateLabel(template: VendorNotificationTemplate): string {
  const labels: Record<VendorNotificationTemplate, string> = {
    [VENDOR_NOTIFICATION.TEMPLATES.ORDER_CONFIRMATION]: 'Order Confirmation',
    [VENDOR_NOTIFICATION.TEMPLATES.PAYMENT_RECEIPT]: 'Payment Receipt',
    [VENDOR_NOTIFICATION.TEMPLATES.SETTLEMENT_NOTICE]: 'Settlement Notice',
    [VENDOR_NOTIFICATION.TEMPLATES.PRODUCT_STATUS]: 'Product Status',
    [VENDOR_NOTIFICATION.TEMPLATES.ACCOUNT_UPDATE]: 'Account Update',
    [VENDOR_NOTIFICATION.TEMPLATES.SUPPORT_RESPONSE]: 'Support Response',
    [VENDOR_NOTIFICATION.TEMPLATES.PROMOTION_ALERT]: 'Promotion Alert',
    [VENDOR_NOTIFICATION.TEMPLATES.SYSTEM_NOTICE]: 'System Notice',
  };
  return labels[template] || 'Unknown';
}

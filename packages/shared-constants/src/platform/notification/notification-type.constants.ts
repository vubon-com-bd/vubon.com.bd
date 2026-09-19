export const NOTIFICATION_TYPE = {
  TRANSACTIONAL: 'transactional',
  PROMOTIONAL: 'promotional',
  SYSTEM: 'system',
  SECURITY: 'security',
  REMINDER: 'reminder',
  ALERT: 'alert',
  WELCOME: 'welcome',
  ORDER_UPDATE: 'order_update',
  PAYMENT_UPDATE: 'payment_update',
  SHIPPING_UPDATE: 'shipping_update',
  ACCOUNT_UPDATE: 'account_update',
  MARKETING: 'marketing',
  ANNOUNCEMENT: 'announcement',
  VERIFICATION: 'verification',
} as const;

export type NotificationTypeType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

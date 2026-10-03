export const NOTIFICATION_CATEGORY = {
  AUTH: 'auth',
  USER: 'user',
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  PRODUCT: 'product',
  PROMOTION: 'promotion',
  SUPPORT: 'support',
  SYSTEM: 'system',
  SECURITY: 'security',
  MARKETING: 'marketing',
  REMINDER: 'reminder',
} as const;

export type NotificationCategoryType =
  (typeof NOTIFICATION_CATEGORY)[keyof typeof NOTIFICATION_CATEGORY];

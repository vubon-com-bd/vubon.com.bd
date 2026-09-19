export const USER_PREFERENCE = {
  NEWSLETTER: 'newsletter',
  PROMOTIONS: 'promotions',
  ORDER_UPDATES: 'order_updates',
  PRODUCT_RECOMMENDATIONS: 'product_recommendations',
  SECURITY_ALERTS: 'security_alerts',
  SMS_NOTIFICATIONS: 'sms_notifications',
  EMAIL_NOTIFICATIONS: 'email_notifications',
  PUSH_NOTIFICATIONS: 'push_notifications',
} as const;

export const USER_PREFERENCE_CHANNEL = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  WEBHOOK: 'webhook',
} as const;

export type UserPreferenceType = (typeof USER_PREFERENCE)[keyof typeof USER_PREFERENCE];
export type UserPreferenceChannelType =
  (typeof USER_PREFERENCE_CHANNEL)[keyof typeof USER_PREFERENCE_CHANNEL];

export const NOTIFICATION_CHANNEL = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
  WEBHOOK: 'webhook',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  MESSENGER: 'messenger',
  SLACK: 'slack',
  VOICE: 'voice',
} as const;

export const NOTIFICATION_CHANNEL_PRIORITY = {
  in_app: 1,
  push: 2,
  email: 3,
  sms: 4,
  whatsapp: 5,
  webhook: 6,
} as const;

export const NOTIFICATION_CHANNEL_LIMIT = {
  EMAIL_PER_DAY: 50,
  SMS_PER_DAY: 20,
  PUSH_PER_DAY: 100,
  IN_APP_PER_DAY: 500,
  WEBHOOK_PER_DAY: 1000,
  WHATSAPP_PER_DAY: 30,
} as const;

export type NotificationChannelType =
  (typeof NOTIFICATION_CHANNEL)[keyof typeof NOTIFICATION_CHANNEL];

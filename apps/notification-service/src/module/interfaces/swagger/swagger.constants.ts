/**
 * Notification-service Swagger shared constants
 * @module notification-service/interfaces/swagger
 */
export const SWAGGER_TAGS = {
  NOTIFICATIONS: 'notifications',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in-app',
  TEMPLATES: 'templates',
  SCHEDULES: 'schedules',
  BROADCASTS: 'broadcasts',
  DIGESTS: 'digests',
  PREFERENCES: 'preferences',
  DEVICES: 'devices',
  WEBHOOKS: 'webhooks',
  PROVIDER_WEBHOOKS: 'provider-webhooks',
  ANALYTICS: 'analytics',
  DELIVERY: 'delivery',
  HEALTH: 'health',
} as const;

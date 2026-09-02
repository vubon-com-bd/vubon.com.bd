/**
 * Notification Configuration
 * নোটিফিকেশন কনফিগারেশন
 */
export interface NotificationConfig {
  enabled: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
    webhook: boolean;
  };
  preferences: {
    defaultChannel: 'email' | 'sms' | 'push' | 'inApp';
    allowUserOverride: boolean;
  };
  batch: {
    enabled: boolean;
    maxItems: number;
    interval: number;
  };
  templates: {
    enabled: boolean;
    path: string;
  };
  delivery: {
    retryAttempts: number;
    retryDelay: number;
    timeout: number;
  };
}

export const createNotificationConfig = (): NotificationConfig => ({
  enabled: true,
  channels: {
    email: true,
    sms: true,
    push: true,
    inApp: true,
    webhook: true,
  },
  preferences: {
    defaultChannel: 'email',
    allowUserOverride: true,
  },
  batch: {
    enabled: true,
    maxItems: 100,
    interval: 1000,
  },
  templates: {
    enabled: true,
    path: 'templates/notifications',
  },
  delivery: {
    retryAttempts: 3,
    retryDelay: 5000,
    timeout: 30000,
  },
});

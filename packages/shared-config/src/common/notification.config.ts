import { NOTIFICATION } from '@vubon/shared-constants/src/common/notification.constants';

export const notificationConfig = {
  maxNotificationsPerUser: 1000,
  maxRetryAttempts: 3,
  retryInterval: 5 * 60,
  retentionDays: 90,
  batchSize: 100,
  channels: {
    email: true,
    sms: true,
    push: true,
    in_app: true,
    webhook: false,
  },
  priorities: NOTIFICATION.PRIORITY,
} as const;

export const notificationConfig = {
  maxNotificationsPerUser: 1000,
  maxRetryAttempts: 3,
  retryInterval: 5 * 60, // 5 minutes
  retentionDays: 90,
  batchSize: 100,
  channels: {
    email: true,
    sms: true,
    push: true,
    in_app: true,
    webhook: false,
  },
  priorities: {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4,
    critical: 5,
  },
};

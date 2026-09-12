export const recurringPaymentConfig = {
  maxRetryAttempts: 5,
  retryIntervalDays: 3,
  gracePeriodDays: 7,
  defaultInterval: 'monthly' as const,
  defaultAmount: 100,
} as const;

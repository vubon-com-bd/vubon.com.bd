/**
 * Recurring Payment Configuration
 * রিকারিং পেমেন্ট কনফিগারেশন
 */
export interface RecurringPaymentConfig {
  enabled: boolean;
  intervals: {
    daily: boolean;
    weekly: boolean;
    monthly: boolean;
    quarterly: boolean;
    yearly: boolean;
  };
  billing: {
    dayOfMonth: number;
    dayOfWeek: number;
    gracePeriod: number;
  };
  retry: {
    attempts: number;
    delay: number;
    maxAttempts: number;
  };
  notifications: {
    before: number[];
    after: number[];
    onFailure: boolean;
  };
  cancellation: {
    allowUserCancel: boolean;
    allowAdminCancel: boolean;
    noticePeriod: number;
  };
}

export const createRecurringPaymentConfig = (): RecurringPaymentConfig => ({
  enabled: true,
  intervals: {
    daily: true,
    weekly: true,
    monthly: true,
    quarterly: true,
    yearly: true,
  },
  billing: {
    dayOfMonth: 1,
    dayOfWeek: 1,
    gracePeriod: 3,
  },
  retry: {
    attempts: 3,
    delay: 24 * 60 * 60 * 1000, // 24 hours
    maxAttempts: 5,
  },
  notifications: {
    before: [3, 1],
    after: [1, 3],
    onFailure: true,
  },
  cancellation: {
    allowUserCancel: true,
    allowAdminCancel: true,
    noticePeriod: 30,
  },
});

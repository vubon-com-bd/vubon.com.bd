export const SLA_CONFIG = Object.freeze({
  warningThresholdPercent: 80,
  breachAlertEnabled: true,
  businessHoursOnly: true,
  businessHoursStart: 9,
  businessHoursEnd: 18,
  businessDays: [0, 1, 2, 3, 4] as const,
  timezone: 'Asia/Dhaka',
  pauseOnWaitingCustomer: true,
} as const);

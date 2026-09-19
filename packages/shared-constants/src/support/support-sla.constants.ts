export const SUPPORT_SLA_STATUS = {
  MET: 'met',
  BREACHED: 'breached',
  AT_RISK: 'at_risk',
  PAUSED: 'paused',
  NOT_APPLICABLE: 'not_applicable',
} as const;

export const SUPPORT_SLA_METRIC = {
  FIRST_RESPONSE: 'first_response',
  NEXT_RESPONSE: 'next_response',
  RESOLUTION: 'resolution',
  CLOSE: 'close',
  ESCALATION: 'escalation',
} as const;

export const SUPPORT_SLA_TARGET = {
  critical: { firstResponse: 15, resolution: 240 },
  urgent: { firstResponse: 30, resolution: 480 },
  high: { firstResponse: 60, resolution: 1440 },
  normal: { firstResponse: 240, resolution: 2880 },
  low: { firstResponse: 480, resolution: 7200 },
} as const;

export const SUPPORT_SLA = {
  STATUS: SUPPORT_SLA_STATUS,
  METRIC: SUPPORT_SLA_METRIC,
  TARGET_MINUTES: SUPPORT_SLA_TARGET,
  BUSINESS_HOURS_ONLY: true,
  BUSINESS_HOURS_START: 9,
  BUSINESS_HOURS_END: 18,
  BUSINESS_DAYS: [0, 1, 2, 3, 4],
  TIMEZONE: 'Asia/Dhaka',
  PAUSE_ON_WAITING_CUSTOMER: true,
  WARNING_THRESHOLD_PERCENT: 80,
  BREACH_ALERT_ENABLED: true,
} as const;

export type SupportSlaStatusType = (typeof SUPPORT_SLA_STATUS)[keyof typeof SUPPORT_SLA_STATUS];
export type SupportSlaMetricType = (typeof SUPPORT_SLA_METRIC)[keyof typeof SUPPORT_SLA_METRIC];

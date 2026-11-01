export const REPORT_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  NORMAL: 'normal',
  LOW: 'low',
  BACKGROUND: 'background',
} as const;

export const REPORT_PRIORITY_WEIGHT = {
  critical: 5,
  high: 4,
  normal: 3,
  low: 2,
  background: 1,
} as const;

export const REPORT_PRIORITY_SLA_SECONDS = {
  critical: 30,
  high: 120,
  normal: 600,
  low: 3600,
  background: 21600,
} as const;

export type ReportPriorityType = (typeof REPORT_PRIORITY)[keyof typeof REPORT_PRIORITY];

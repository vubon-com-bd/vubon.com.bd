/**
 * Support SLA Constants
 * @module shared-constants/support/support-sla
 *
 * SLA status, metric, target, type, and configuration.
 */

// ---------------------------------------------------------------------------
// SLA Status
// ---------------------------------------------------------------------------

export const SUPPORT_SLA_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  WARNING: 'warning',
  BREACHED: 'breached',
  MET: 'met',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
} as const;

export type SupportSlaStatusType =
  (typeof SUPPORT_SLA_STATUS)[keyof typeof SUPPORT_SLA_STATUS];

// ---------------------------------------------------------------------------
// SLA Metric
// ---------------------------------------------------------------------------

export const SUPPORT_SLA_METRIC = {
  FIRST_RESPONSE_TIME: 'first_response_time',
  AVG_RESPONSE_TIME: 'avg_response_time',
  RESOLUTION_TIME: 'resolution_time',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  TICKET_REOPEN_RATE: 'ticket_reopen_rate',
  ESCALATION_RATE: 'escalation_rate',
} as const;

export type SupportSlaMetricType =
  (typeof SUPPORT_SLA_METRIC)[keyof typeof SUPPORT_SLA_METRIC];

// ---------------------------------------------------------------------------
// SLA Target (minutes by priority)
// ---------------------------------------------------------------------------

export const SUPPORT_SLA_TARGET = {
  LOW: 1440,
  NORMAL: 480,
  HIGH: 120,
  URGENT: 60,
  CRITICAL: 15,
} as const;

// ---------------------------------------------------------------------------
// SLA Type — SLA category (response / resolution / update)
// ---------------------------------------------------------------------------

export const SUPPORT_SLA_TYPE = {
  FIRST_RESPONSE: 'first_response',
  RESPONSE: 'response',
  RESOLUTION: 'resolution',
  RESOLVE: 'resolve',
  UPDATE: 'update',
  FOLLOW_UP: 'follow_up',
} as const;

export type SupportSlaTypeValue =
  (typeof SUPPORT_SLA_TYPE)[keyof typeof SUPPORT_SLA_TYPE];

// ---------------------------------------------------------------------------
// SLA Config (root object)
// ---------------------------------------------------------------------------

export const SUPPORT_SLA = {
  STATUS: SUPPORT_SLA_STATUS,
  METRIC: SUPPORT_SLA_METRIC,
  TARGET_MINUTES: SUPPORT_SLA_TARGET,
  TYPE: SUPPORT_SLA_TYPE,
  BUSINESS_HOURS_ONLY: true,
  BUSINESS_HOURS_START: 9,
  BUSINESS_HOURS_END: 18,
  BUSINESS_DAYS: [0, 1, 2, 3, 4],
  TIMEZONE: 'Asia/Dhaka',
  PAUSE_ON_WAITING_CUSTOMER: true,
  WARNING_THRESHOLD_PERCENT: 80,
  BREACH_ALERT_ENABLED: true,
} as const;

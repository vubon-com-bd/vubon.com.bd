export const SUPPORT_ANALYTICS_METRIC = {
  TICKETS_CREATED: 'tickets_created',
  TICKETS_RESOLVED: 'tickets_resolved',
  TICKETS_OPEN: 'tickets_open',
  TICKETS_ESCALATED: 'tickets_escalated',
  TICKETS_REOPENED: 'tickets_reopened',
  AVG_FIRST_RESPONSE_TIME: 'avg_first_response_time',
  AVG_RESOLUTION_TIME: 'avg_resolution_time',
  FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  CSAT_SCORE: 'csat_score',
  NPS_SCORE: 'nps_score',
  CES_SCORE: 'ces_score',
  SLA_COMPLIANCE: 'sla_compliance',
  SLA_BREACHES: 'sla_breaches',
  AGENT_UTILIZATION: 'agent_utilization',
  TICKET_BACKLOG: 'ticket_backlog',
  RESOLUTION_RATE: 'resolution_rate',
  REOPEN_RATE: 'reopen_rate',
  AVG_HANDLING_TIME: 'avg_handling_time',
} as const;

export const SUPPORT_ANALYTICS_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const SUPPORT_ANALYTICS = {
  METRIC: SUPPORT_ANALYTICS_METRIC,
  PERIOD: SUPPORT_ANALYTICS_PERIOD,
  RETENTION_DAYS: 730,
  REFRESH_INTERVAL_SECONDS: 300,
  TRACK_SLA: true,
  TRACK_SATISFACTION: true,
  TRACK_AGENT_PERFORMANCE: true,
  TRACK_CHANNEL_PERFORMANCE: true,
  ANONYMIZE_DATA: true,
  MAX_DATE_RANGE_DAYS: 730,
} as const;

export type SupportAnalyticsMetricType =
  (typeof SUPPORT_ANALYTICS_METRIC)[keyof typeof SUPPORT_ANALYTICS_METRIC];
export type SupportAnalyticsPeriodType =
  (typeof SUPPORT_ANALYTICS_PERIOD)[keyof typeof SUPPORT_ANALYTICS_PERIOD];

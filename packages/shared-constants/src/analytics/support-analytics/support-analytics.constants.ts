/**
 * Support Analytics Constants
 * Configuration for customer support and service analytics
 */

export const SUPPORT_ANALYTICS = {
  // Support Analytics Types
  TYPES: {
    // Ticket Analytics
    TICKET: 'ticket',
    TICKET_VOLUME: 'ticket_volume',
    TICKET_RESOLUTION: 'ticket_resolution',
    TICKET_SATISFACTION: 'ticket_satisfaction',

    // Agent Analytics
    AGENT: 'agent',
    AGENT_PERFORMANCE: 'agent_performance',
    AGENT_PRODUCTIVITY: 'agent_productivity',
    AGENT_SATISFACTION: 'agent_satisfaction',

    // Channel Analytics
    CHANNEL: 'channel',
    CHANNEL_PERFORMANCE: 'channel_performance',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',

    // Response Analytics
    RESPONSE: 'response',
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',

    // Quality Analytics
    QUALITY: 'quality',
    QUALITY_SCORE: 'quality_score',
    COMPLIANCE: 'compliance',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Support Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Support Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    TEAM: 'team',
    DEPARTMENT: 'department',
    CHANNEL: 'channel',
    ALL_SUPPORT: 'all_support',
    COMPARATIVE: 'comparative',
  } as const,

  // Support Analytics Events
  EVENTS: {
    // Ticket Events
    TICKET_CREATED: 'ticket_created',
    TICKET_UPDATED: 'ticket_updated',
    TICKET_ASSIGNED: 'ticket_assigned',
    TICKET_ESCALATED: 'ticket_escalated',
    TICKET_RESOLVED: 'ticket_resolved',
    TICKET_CLOSED: 'ticket_closed',
    TICKET_REOPENED: 'ticket_reopened',
    TICKET_CANCELLED: 'ticket_cancelled',

    // Agent Events
    AGENT_ASSIGNED: 'agent_assigned',
    AGENT_UPDATED: 'agent_updated',
    AGENT_PERFORMANCE_UPDATED: 'agent_performance_updated',

    // Response Events
    RESPONSE_SENT: 'response_sent',
    RESPONSE_RECEIVED: 'response_received',
    RESPONSE_TIME_UPDATED: 'response_time_updated',

    // Resolution Events
    RESOLUTION_PROVIDED: 'resolution_provided',
    RESOLUTION_ACCEPTED: 'resolution_accepted',
    RESOLUTION_REJECTED: 'resolution_rejected',

    // Satisfaction Events
    SATISFACTION_SURVEY: 'satisfaction_survey',
    SATISFACTION_RATED: 'satisfaction_rated',
    NPS_SURVEY: 'nps_survey',

    // Quality Events
    QUALITY_CHECK: 'quality_check',
    QUALITY_PASSED: 'quality_passed',
    QUALITY_FAILED: 'quality_failed',

    // Escalation Events
    ESCALATION_INITIATED: 'escalation_initiated',
    ESCALATION_COMPLETED: 'escalation_completed',
    ESCALATION_FAILED: 'escalation_failed',

    // Feedback Events
    FEEDBACK_RECEIVED: 'feedback_received',
    FEEDBACK_ANALYZED: 'feedback_analyzed',
    FEEDBACK_ACTIONED: 'feedback_actioned',
  } as const,

  // Support Analytics Dimensions
  DIMENSIONS: {
    // Ticket Attributes
    TICKET_ID: 'ticket_id',
    TICKET_TYPE: 'ticket_type',
    TICKET_STATUS: 'ticket_status',
    TICKET_PRIORITY: 'ticket_priority',
    TICKET_CATEGORY: 'ticket_category',
    TICKET_TAG: 'ticket_tag',

    // Agent Attributes
    AGENT_ID: 'agent_id',
    AGENT_NAME: 'agent_name',
    AGENT_TEAM: 'agent_team',
    AGENT_ROLE: 'agent_role',
    AGENT_EXPERIENCE: 'agent_experience',

    // Customer Attributes
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',
    CUSTOMER_TIER: 'customer_tier',

    // Channel Attributes
    CHANNEL: 'channel',
    CHANNEL_TYPE: 'channel_type',
    SOURCE: 'source',

    // Time Attributes
    CREATED_DATE: 'created_date',
    CREATED_HOUR: 'created_hour',
    CREATED_DAY: 'created_day',
    CREATED_WEEK: 'created_week',
    CREATED_MONTH: 'created_month',
    RESOLVED_DATE: 'resolved_date',

    // Performance Attributes
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',
    HANDLING_TIME: 'handling_time',
    FIRST_RESPONSE_TIME: 'first_response_time',

    // Quality Attributes
    QUALITY_SCORE: 'quality_score',
    CSAT_SCORE: 'csat_score',
    NPS_SCORE: 'nps_score',
    CES_SCORE: 'ces_score',
  } as const,

  // Support Analytics Metrics
  METRICS: {
    // Ticket Metrics
    TOTAL_TICKETS: 'total_tickets',
    OPEN_TICKETS: 'open_tickets',
    IN_PROGRESS_TICKETS: 'in_progress_tickets',
    RESOLVED_TICKETS: 'resolved_tickets',
    CLOSED_TICKETS: 'closed_tickets',
    ESCALATED_TICKETS: 'escalated_tickets',
    REOPENED_TICKETS: 'reopened_tickets',

    // Ticket Volume Metrics
    TICKETS_PER_DAY: 'tickets_per_day',
    TICKETS_PER_WEEK: 'tickets_per_week',
    TICKETS_PER_MONTH: 'tickets_per_month',
    TICKETS_PER_AGENT: 'tickets_per_agent',

    // Response Metrics
    AVG_RESPONSE_TIME: 'avg_response_time',
    FIRST_RESPONSE_TIME: 'first_response_time',
    AVG_FIRST_RESPONSE_TIME: 'avg_first_response_time',
    RESPONSE_TIME_P95: 'response_time_p95',
    RESPONSE_TIME_P99: 'response_time_p99',

    // Resolution Metrics
    AVG_RESOLUTION_TIME: 'avg_resolution_time',
    RESOLUTION_TIME_P95: 'resolution_time_p95',
    RESOLUTION_TIME_P99: 'resolution_time_p99',
    RESOLUTION_RATE: 'resolution_rate',
    FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',

    // Agent Performance Metrics
    AGENT_PRODUCTIVITY: 'agent_productivity',
    AGENT_EFFICIENCY: 'agent_efficiency',
    AGENT_QUALITY_SCORE: 'agent_quality_score',
    AGENT_CSAT: 'agent_csat',
    AGENT_NPS: 'agent_nps',

    // Quality Metrics
    QUALITY_SCORE: 'quality_score',
    COMPLIANCE_RATE: 'compliance_rate',
    ACCURACY_RATE: 'accuracy_rate',

    // Satisfaction Metrics
    CSAT: 'csat',
    NPS: 'nps',
    CES: 'ces',
    SATISFACTION_RATE: 'satisfaction_rate',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Support Analytics Segments
  SEGMENTS: {
    // Ticket Segments
    HIGH_PRIORITY: 'high_priority',
    MEDIUM_PRIORITY: 'medium_priority',
    LOW_PRIORITY: 'low_priority',
    URGENT: 'urgent',

    // Status Segments
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    RESOLVED: 'resolved',
    CLOSED: 'closed',

    // Channel Segments
    EMAIL: 'email',
    CHAT: 'chat',
    PHONE: 'phone',
    SOCIAL: 'social',
    TICKET: 'ticket',

    // Agent Segments
    TOP_PERFORMING: 'top_performing',
    AVERAGE_PERFORMING: 'average_performing',
    LOW_PERFORMING: 'low_performing',

    // Satisfaction Segments
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    UNSATISFIED: 'unsatisfied',
    PROMOTERS: 'promoters',
    PASSIVES: 'passives',
    DETRACTORS: 'detractors',
  } as const,

  // Support Analytics Cohorts
  COHORTS: {
    TICKET_CREATED_DATE: 'ticket_created_date',
    TICKET_RESOLVED_DATE: 'ticket_resolved_date',
    CHANNEL: 'channel',
    CATEGORY: 'category',
    AGENT_TEAM: 'agent_team',
    CUSTOMER_TYPE: 'customer_type',
  } as const,

  // Support Analytics Granularity
  GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Support Analytics Types
export type SupportAnalyticsType =
  (typeof SUPPORT_ANALYTICS.TYPES)[keyof typeof SUPPORT_ANALYTICS.TYPES];

// Support Analytics Status
export type SupportAnalyticsStatus =
  (typeof SUPPORT_ANALYTICS.STATUS)[keyof typeof SUPPORT_ANALYTICS.STATUS];

// Support Analytics Scopes
export type SupportAnalyticsScope =
  (typeof SUPPORT_ANALYTICS.SCOPES)[keyof typeof SUPPORT_ANALYTICS.SCOPES];

// Support Analytics Events
export type SupportAnalyticsEvent =
  (typeof SUPPORT_ANALYTICS.EVENTS)[keyof typeof SUPPORT_ANALYTICS.EVENTS];

// Support Analytics Dimensions
export type SupportAnalyticsDimension =
  (typeof SUPPORT_ANALYTICS.DIMENSIONS)[keyof typeof SUPPORT_ANALYTICS.DIMENSIONS];

// Support Analytics Metrics
export type SupportAnalyticsMetric =
  (typeof SUPPORT_ANALYTICS.METRICS)[keyof typeof SUPPORT_ANALYTICS.METRICS];

// Support Analytics Segments
export type SupportAnalyticsSegment =
  (typeof SUPPORT_ANALYTICS.SEGMENTS)[keyof typeof SUPPORT_ANALYTICS.SEGMENTS];

// Support Analytics Cohorts
export type SupportAnalyticsCohort =
  (typeof SUPPORT_ANALYTICS.COHORTS)[keyof typeof SUPPORT_ANALYTICS.COHORTS];

// Support Analytics Granularity
export type SupportAnalyticsGranularity =
  (typeof SUPPORT_ANALYTICS.GRANULARITY)[keyof typeof SUPPORT_ANALYTICS.GRANULARITY];

// Support Analytics Status Labels
export function getSupportAnalyticsStatusLabel(status: SupportAnalyticsStatus): string {
  const labels: Record<SupportAnalyticsStatus, string> = {
    [SUPPORT_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [SUPPORT_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [SUPPORT_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [SUPPORT_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [SUPPORT_ANALYTICS.STATUS.FAILED]: 'Failed',
    [SUPPORT_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [SUPPORT_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [SUPPORT_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [SUPPORT_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Support Analytics Event Labels
export function getSupportAnalyticsEventLabel(event: SupportAnalyticsEvent): string {
  const labels: Record<SupportAnalyticsEvent, string> = {
    [SUPPORT_ANALYTICS.EVENTS.TICKET_CREATED]: 'Ticket Created',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_UPDATED]: 'Ticket Updated',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_ASSIGNED]: 'Ticket Assigned',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_ESCALATED]: 'Ticket Escalated',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_RESOLVED]: 'Ticket Resolved',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_CLOSED]: 'Ticket Closed',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_REOPENED]: 'Ticket Reopened',
    [SUPPORT_ANALYTICS.EVENTS.TICKET_CANCELLED]: 'Ticket Cancelled',
    [SUPPORT_ANALYTICS.EVENTS.AGENT_ASSIGNED]: 'Agent Assigned',
    [SUPPORT_ANALYTICS.EVENTS.AGENT_UPDATED]: 'Agent Updated',
    [SUPPORT_ANALYTICS.EVENTS.AGENT_PERFORMANCE_UPDATED]: 'Agent Performance Updated',
    [SUPPORT_ANALYTICS.EVENTS.RESPONSE_SENT]: 'Response Sent',
    [SUPPORT_ANALYTICS.EVENTS.RESPONSE_RECEIVED]: 'Response Received',
    [SUPPORT_ANALYTICS.EVENTS.RESPONSE_TIME_UPDATED]: 'Response Time Updated',
    [SUPPORT_ANALYTICS.EVENTS.RESOLUTION_PROVIDED]: 'Resolution Provided',
    [SUPPORT_ANALYTICS.EVENTS.RESOLUTION_ACCEPTED]: 'Resolution Accepted',
    [SUPPORT_ANALYTICS.EVENTS.RESOLUTION_REJECTED]: 'Resolution Rejected',
    [SUPPORT_ANALYTICS.EVENTS.SATISFACTION_SURVEY]: 'Satisfaction Survey',
    [SUPPORT_ANALYTICS.EVENTS.SATISFACTION_RATED]: 'Satisfaction Rated',
    [SUPPORT_ANALYTICS.EVENTS.NPS_SURVEY]: 'NPS Survey',
    [SUPPORT_ANALYTICS.EVENTS.QUALITY_CHECK]: 'Quality Check',
    [SUPPORT_ANALYTICS.EVENTS.QUALITY_PASSED]: 'Quality Passed',
    [SUPPORT_ANALYTICS.EVENTS.QUALITY_FAILED]: 'Quality Failed',
    [SUPPORT_ANALYTICS.EVENTS.ESCALATION_INITIATED]: 'Escalation Initiated',
    [SUPPORT_ANALYTICS.EVENTS.ESCALATION_COMPLETED]: 'Escalation Completed',
    [SUPPORT_ANALYTICS.EVENTS.ESCALATION_FAILED]: 'Escalation Failed',
    [SUPPORT_ANALYTICS.EVENTS.FEEDBACK_RECEIVED]: 'Feedback Received',
    [SUPPORT_ANALYTICS.EVENTS.FEEDBACK_ANALYZED]: 'Feedback Analyzed',
    [SUPPORT_ANALYTICS.EVENTS.FEEDBACK_ACTIONED]: 'Feedback Actioned',
  };
  return labels[event] || 'Unknown';
}

// Support Analytics Dimension Labels
export function getSupportAnalyticsDimensionLabel(dimension: SupportAnalyticsDimension): string {
  const labels: Record<SupportAnalyticsDimension, string> = {
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_ID]: 'Ticket ID',
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_TYPE]: 'Ticket Type',
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_STATUS]: 'Ticket Status',
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_PRIORITY]: 'Ticket Priority',
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_CATEGORY]: 'Ticket Category',
    [SUPPORT_ANALYTICS.DIMENSIONS.TICKET_TAG]: 'Ticket Tag',
    [SUPPORT_ANALYTICS.DIMENSIONS.AGENT_ID]: 'Agent ID',
    [SUPPORT_ANALYTICS.DIMENSIONS.AGENT_NAME]: 'Agent Name',
    [SUPPORT_ANALYTICS.DIMENSIONS.AGENT_TEAM]: 'Agent Team',
    [SUPPORT_ANALYTICS.DIMENSIONS.AGENT_ROLE]: 'Agent Role',
    [SUPPORT_ANALYTICS.DIMENSIONS.AGENT_EXPERIENCE]: 'Agent Experience',
    [SUPPORT_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [SUPPORT_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [SUPPORT_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [SUPPORT_ANALYTICS.DIMENSIONS.CUSTOMER_TIER]: 'Customer Tier',
    [SUPPORT_ANALYTICS.DIMENSIONS.CHANNEL]: 'Channel',
    [SUPPORT_ANALYTICS.DIMENSIONS.CHANNEL_TYPE]: 'Channel Type',
    [SUPPORT_ANALYTICS.DIMENSIONS.SOURCE]: 'Source',
    [SUPPORT_ANALYTICS.DIMENSIONS.CREATED_DATE]: 'Created Date',
    [SUPPORT_ANALYTICS.DIMENSIONS.CREATED_HOUR]: 'Created Hour',
    [SUPPORT_ANALYTICS.DIMENSIONS.CREATED_DAY]: 'Created Day',
    [SUPPORT_ANALYTICS.DIMENSIONS.CREATED_WEEK]: 'Created Week',
    [SUPPORT_ANALYTICS.DIMENSIONS.CREATED_MONTH]: 'Created Month',
    [SUPPORT_ANALYTICS.DIMENSIONS.RESOLVED_DATE]: 'Resolved Date',
    [SUPPORT_ANALYTICS.DIMENSIONS.RESPONSE_TIME]: 'Response Time',
    [SUPPORT_ANALYTICS.DIMENSIONS.RESOLUTION_TIME]: 'Resolution Time',
    [SUPPORT_ANALYTICS.DIMENSIONS.HANDLING_TIME]: 'Handling Time',
    [SUPPORT_ANALYTICS.DIMENSIONS.FIRST_RESPONSE_TIME]: 'First Response Time',
    [SUPPORT_ANALYTICS.DIMENSIONS.QUALITY_SCORE]: 'Quality Score',
    [SUPPORT_ANALYTICS.DIMENSIONS.CSAT_SCORE]: 'CSAT Score',
    [SUPPORT_ANALYTICS.DIMENSIONS.NPS_SCORE]: 'NPS Score',
    [SUPPORT_ANALYTICS.DIMENSIONS.CES_SCORE]: 'CES Score',
  };
  return labels[dimension] || 'Unknown';
}

// Support Analytics Segment Labels
export function getSupportAnalyticsSegmentLabel(segment: SupportAnalyticsSegment): string {
  const labels: Record<SupportAnalyticsSegment, string> = {
    [SUPPORT_ANALYTICS.SEGMENTS.HIGH_PRIORITY]: 'High Priority',
    [SUPPORT_ANALYTICS.SEGMENTS.MEDIUM_PRIORITY]: 'Medium Priority',
    [SUPPORT_ANALYTICS.SEGMENTS.LOW_PRIORITY]: 'Low Priority',
    [SUPPORT_ANALYTICS.SEGMENTS.URGENT]: 'Urgent',
    [SUPPORT_ANALYTICS.SEGMENTS.OPEN]: 'Open',
    [SUPPORT_ANALYTICS.SEGMENTS.IN_PROGRESS]: 'In Progress',
    [SUPPORT_ANALYTICS.SEGMENTS.RESOLVED]: 'Resolved',
    [SUPPORT_ANALYTICS.SEGMENTS.CLOSED]: 'Closed',
    [SUPPORT_ANALYTICS.SEGMENTS.EMAIL]: 'Email',
    [SUPPORT_ANALYTICS.SEGMENTS.CHAT]: 'Chat',
    [SUPPORT_ANALYTICS.SEGMENTS.PHONE]: 'Phone',
    [SUPPORT_ANALYTICS.SEGMENTS.SOCIAL]: 'Social',
    [SUPPORT_ANALYTICS.SEGMENTS.TICKET]: 'Ticket',
    [SUPPORT_ANALYTICS.SEGMENTS.TOP_PERFORMING]: 'Top Performing',
    [SUPPORT_ANALYTICS.SEGMENTS.AVERAGE_PERFORMING]: 'Average Performing',
    [SUPPORT_ANALYTICS.SEGMENTS.LOW_PERFORMING]: 'Low Performing',
    [SUPPORT_ANALYTICS.SEGMENTS.SATISFIED]: 'Satisfied',
    [SUPPORT_ANALYTICS.SEGMENTS.NEUTRAL]: 'Neutral',
    [SUPPORT_ANALYTICS.SEGMENTS.UNSATISFIED]: 'Unsatisfied',
    [SUPPORT_ANALYTICS.SEGMENTS.PROMOTERS]: 'Promoters',
    [SUPPORT_ANALYTICS.SEGMENTS.PASSIVES]: 'Passives',
    [SUPPORT_ANALYTICS.SEGMENTS.DETRACTORS]: 'Detractors',
  };
  return labels[segment] || 'Unknown';
}

// Support Analytics Cohort Labels
export function getSupportAnalyticsCohortLabel(cohort: SupportAnalyticsCohort): string {
  const labels: Record<SupportAnalyticsCohort, string> = {
    [SUPPORT_ANALYTICS.COHORTS.TICKET_CREATED_DATE]: 'Ticket Created Date',
    [SUPPORT_ANALYTICS.COHORTS.TICKET_RESOLVED_DATE]: 'Ticket Resolved Date',
    [SUPPORT_ANALYTICS.COHORTS.CHANNEL]: 'Channel',
    [SUPPORT_ANALYTICS.COHORTS.CATEGORY]: 'Category',
    [SUPPORT_ANALYTICS.COHORTS.AGENT_TEAM]: 'Agent Team',
    [SUPPORT_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
  };
  return labels[cohort] || 'Unknown';
}

// Support Analytics Granularity Labels
export function getSupportAnalyticsGranularityLabel(
  granularity: SupportAnalyticsGranularity
): string {
  const labels: Record<SupportAnalyticsGranularity, string> = {
    [SUPPORT_ANALYTICS.GRANULARITY.HOURLY]: 'Hourly',
    [SUPPORT_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [SUPPORT_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [SUPPORT_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [SUPPORT_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [SUPPORT_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if support analytics is active
export function isSupportAnalyticsActive(status: SupportAnalyticsStatus): boolean {
  const activeStatuses: SupportAnalyticsStatus[] = [
    SUPPORT_ANALYTICS.STATUS.TRACKING,
    SUPPORT_ANALYTICS.STATUS.PROCESSING,
    SUPPORT_ANALYTICS.STATUS.ANALYZING,
    SUPPORT_ANALYTICS.STATUS.UPDATING,
    SUPPORT_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if support analytics is completed
export function isSupportAnalyticsCompleted(status: SupportAnalyticsStatus): boolean {
  return status === SUPPORT_ANALYTICS.STATUS.COMPLETED;
}

// Check if support analytics has failed
export function isSupportAnalyticsFailed(status: SupportAnalyticsStatus): boolean {
  return status === SUPPORT_ANALYTICS.STATUS.FAILED;
}

// Check if event is ticket event
export function isSupportAnalyticsTicketEvent(event: SupportAnalyticsEvent): boolean {
  const ticketEvents: SupportAnalyticsEvent[] = [
    SUPPORT_ANALYTICS.EVENTS.TICKET_CREATED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_UPDATED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_ASSIGNED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_ESCALATED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_RESOLVED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_CLOSED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_REOPENED,
    SUPPORT_ANALYTICS.EVENTS.TICKET_CANCELLED,
  ];
  return ticketEvents.includes(event);
}

// Check if event is agent event
export function isSupportAnalyticsAgentEvent(event: SupportAnalyticsEvent): boolean {
  const agentEvents: SupportAnalyticsEvent[] = [
    SUPPORT_ANALYTICS.EVENTS.AGENT_ASSIGNED,
    SUPPORT_ANALYTICS.EVENTS.AGENT_UPDATED,
    SUPPORT_ANALYTICS.EVENTS.AGENT_PERFORMANCE_UPDATED,
  ];
  return agentEvents.includes(event);
}

// Check if event is satisfaction event
export function isSupportAnalyticsSatisfactionEvent(event: SupportAnalyticsEvent): boolean {
  const satisfactionEvents: SupportAnalyticsEvent[] = [
    SUPPORT_ANALYTICS.EVENTS.SATISFACTION_SURVEY,
    SUPPORT_ANALYTICS.EVENTS.SATISFACTION_RATED,
    SUPPORT_ANALYTICS.EVENTS.NPS_SURVEY,
  ];
  return satisfactionEvents.includes(event);
}

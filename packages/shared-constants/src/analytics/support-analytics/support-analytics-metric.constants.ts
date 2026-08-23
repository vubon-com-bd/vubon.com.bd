/**
 * Support Analytics Metric Constants
 * Metrics for measuring support performance and quality
 */

export const SUPPORT_ANALYTICS_METRIC = {
  // Ticket Count Metrics
  COUNT_METRICS: {
    TOTAL_TICKETS: 'total_tickets',
    NEW_TICKETS: 'new_tickets',
    OPEN_TICKETS: 'open_tickets',
    IN_PROGRESS_TICKETS: 'in_progress_tickets',
    PENDING_TICKETS: 'pending_tickets',
    RESOLVED_TICKETS: 'resolved_tickets',
    CLOSED_TICKETS: 'closed_tickets',
    REOPENED_TICKETS: 'reopened_tickets',
    CANCELLED_TICKETS: 'cancelled_tickets',
    ESCALATED_TICKETS: 'escalated_tickets',
  } as const,

  // Ticket Volume Metrics
  VOLUME_METRICS: {
    TICKETS_PER_DAY: 'tickets_per_day',
    TICKETS_PER_WEEK: 'tickets_per_week',
    TICKETS_PER_MONTH: 'tickets_per_month',
    TICKETS_PER_HOUR: 'tickets_per_hour',
    TICKETS_PER_AGENT: 'tickets_per_agent',
    TICKETS_PER_CHANNEL: 'tickets_per_channel',
    TICKETS_PER_CATEGORY: 'tickets_per_category',
    TICKETS_PER_PRIORITY: 'tickets_per_priority',
  } as const,

  // Response Time Metrics
  RESPONSE_TIME_METRICS: {
    AVG_RESPONSE_TIME: 'avg_response_time',
    FIRST_RESPONSE_TIME: 'first_response_time',
    AVG_FIRST_RESPONSE_TIME: 'avg_first_response_time',
    MAX_RESPONSE_TIME: 'max_response_time',
    MIN_RESPONSE_TIME: 'min_response_time',
    RESPONSE_TIME_P50: 'response_time_p50',
    RESPONSE_TIME_P75: 'response_time_p75',
    RESPONSE_TIME_P90: 'response_time_p90',
    RESPONSE_TIME_P95: 'response_time_p95',
    RESPONSE_TIME_P99: 'response_time_p99',
  } as const,

  // Resolution Time Metrics
  RESOLUTION_TIME_METRICS: {
    AVG_RESOLUTION_TIME: 'avg_resolution_time',
    MAX_RESOLUTION_TIME: 'max_resolution_time',
    MIN_RESOLUTION_TIME: 'min_resolution_time',
    RESOLUTION_TIME_P50: 'resolution_time_p50',
    RESOLUTION_TIME_P75: 'resolution_time_p75',
    RESOLUTION_TIME_P90: 'resolution_time_p90',
    RESOLUTION_TIME_P95: 'resolution_time_p95',
    RESOLUTION_TIME_P99: 'resolution_time_p99',
    RESOLUTION_RATE: 'resolution_rate',
    FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
  } as const,

  // Agent Performance Metrics
  AGENT_METRICS: {
    AGENT_PRODUCTIVITY: 'agent_productivity',
    AGENT_EFFICIENCY: 'agent_efficiency',
    AGENT_QUALITY_SCORE: 'agent_quality_score',
    AGENT_CSAT: 'agent_csat',
    AGENT_NPS: 'agent_nps',
    AGENT_HANDLING_TIME: 'agent_handling_time',
    AGENT_TICKETS_RESOLVED: 'agent_tickets_resolved',
    AGENT_SATISFACTION_RATE: 'agent_satisfaction_rate',
    AGENT_UTILIZATION: 'agent_utilization',
    AGENT_AVAILABILITY: 'agent_availability',
  } as const,

  // Quality Metrics
  QUALITY_METRICS: {
    QUALITY_SCORE: 'quality_score',
    COMPLIANCE_RATE: 'compliance_rate',
    ACCURACY_RATE: 'accuracy_rate',
    COMPLETENESS_RATE: 'completeness_rate',
    CONSISTENCY_RATE: 'consistency_rate',
    PROFESSIONALISM_SCORE: 'professionalism_score',
    KNOWLEDGE_SCORE: 'knowledge_score',
    COMMUNICATION_SCORE: 'communication_score',
  } as const,

  // Satisfaction Metrics
  SATISFACTION_METRICS: {
    CSAT: 'csat',
    NPS: 'nps',
    CES: 'ces',
    SATISFACTION_RATE: 'satisfaction_rate',
    UNSATISFACTION_RATE: 'unsatisfaction_rate',
    PROMOTER_SCORE: 'promoter_score',
    PASSIVE_SCORE: 'passive_score',
    DETRACTOR_SCORE: 'detractor_score',
    CSAT_SCORE: 'csat_score',
    NPS_SCORE: 'nps_score',
    CES_SCORE: 'ces_score',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    CHANNEL_COMPARISON: 'channel_comparison',
    AGENT_COMPARISON: 'agent_comparison',
    CATEGORY_COMPARISON: 'category_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    VOLUME: 'volume',
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',
    AGENT: 'agent',
    QUALITY: 'quality',
    SATISFACTION: 'satisfaction',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Support Analytics Count Metrics
export type SupportAnalyticsCountMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.COUNT_METRICS];

// Support Analytics Volume Metrics
export type SupportAnalyticsVolumeMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.VOLUME_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.VOLUME_METRICS];

// Support Analytics Response Time Metrics
export type SupportAnalyticsResponseTimeMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.RESPONSE_TIME_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.RESPONSE_TIME_METRICS];

// Support Analytics Resolution Time Metrics
export type SupportAnalyticsResolutionTimeMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.RESOLUTION_TIME_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.RESOLUTION_TIME_METRICS];

// Support Analytics Agent Metrics
export type SupportAnalyticsAgentMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.AGENT_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.AGENT_METRICS];

// Support Analytics Quality Metrics
export type SupportAnalyticsQualityMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.QUALITY_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.QUALITY_METRICS];

// Support Analytics Satisfaction Metrics
export type SupportAnalyticsSatisfactionMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.SATISFACTION_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.SATISFACTION_METRICS];

// Support Analytics Comparison Metrics
export type SupportAnalyticsComparisonMetric =
  (typeof SUPPORT_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof SUPPORT_ANALYTICS_METRIC.COMPARISON_METRICS];

// Support Analytics Metric Categories
export type SupportAnalyticsMetricCategory =
  (typeof SUPPORT_ANALYTICS_METRIC.CATEGORIES)[keyof typeof SUPPORT_ANALYTICS_METRIC.CATEGORIES];

// Support Analytics Metric Types
export type SupportAnalyticsMetricType =
  (typeof SUPPORT_ANALYTICS_METRIC.TYPES)[keyof typeof SUPPORT_ANALYTICS_METRIC.TYPES];

// Support Analytics Metric Formats
export type SupportAnalyticsMetricFormat =
  (typeof SUPPORT_ANALYTICS_METRIC.FORMATS)[keyof typeof SUPPORT_ANALYTICS_METRIC.FORMATS];

// Support Analytics Metric Priority
export type SupportAnalyticsMetricPriority =
  (typeof SUPPORT_ANALYTICS_METRIC.PRIORITY)[keyof typeof SUPPORT_ANALYTICS_METRIC.PRIORITY];

// Support Analytics Metric Labels
export function getSupportAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_tickets: 'Total Tickets',
    new_tickets: 'New Tickets',
    open_tickets: 'Open Tickets',
    in_progress_tickets: 'In Progress Tickets',
    pending_tickets: 'Pending Tickets',
    resolved_tickets: 'Resolved Tickets',
    closed_tickets: 'Closed Tickets',
    reopened_tickets: 'Reopened Tickets',
    cancelled_tickets: 'Cancelled Tickets',
    escalated_tickets: 'Escalated Tickets',

    // Volume Metrics
    tickets_per_day: 'Tickets Per Day',
    tickets_per_week: 'Tickets Per Week',
    tickets_per_month: 'Tickets Per Month',
    tickets_per_hour: 'Tickets Per Hour',
    tickets_per_agent: 'Tickets Per Agent',
    tickets_per_channel: 'Tickets Per Channel',
    tickets_per_category: 'Tickets Per Category',
    tickets_per_priority: 'Tickets Per Priority',

    // Response Time Metrics
    avg_response_time: 'Avg Response Time',
    first_response_time: 'First Response Time',
    avg_first_response_time: 'Avg First Response Time',
    max_response_time: 'Max Response Time',
    min_response_time: 'Min Response Time',
    response_time_p50: 'Response Time P50',
    response_time_p75: 'Response Time P75',
    response_time_p90: 'Response Time P90',
    response_time_p95: 'Response Time P95',
    response_time_p99: 'Response Time P99',

    // Resolution Time Metrics
    avg_resolution_time: 'Avg Resolution Time',
    max_resolution_time: 'Max Resolution Time',
    min_resolution_time: 'Min Resolution Time',
    resolution_time_p50: 'Resolution Time P50',
    resolution_time_p75: 'Resolution Time P75',
    resolution_time_p90: 'Resolution Time P90',
    resolution_time_p95: 'Resolution Time P95',
    resolution_time_p99: 'Resolution Time P99',
    resolution_rate: 'Resolution Rate',
    first_contact_resolution: 'First Contact Resolution',

    // Agent Metrics
    agent_productivity: 'Agent Productivity',
    agent_efficiency: 'Agent Efficiency',
    agent_quality_score: 'Agent Quality Score',
    agent_csat: 'Agent CSAT',
    agent_nps: 'Agent NPS',
    agent_handling_time: 'Agent Handling Time',
    agent_tickets_resolved: 'Agent Tickets Resolved',
    agent_satisfaction_rate: 'Agent Satisfaction Rate',
    agent_utilization: 'Agent Utilization',
    agent_availability: 'Agent Availability',

    // Quality Metrics
    quality_score: 'Quality Score',
    compliance_rate: 'Compliance Rate',
    accuracy_rate: 'Accuracy Rate',
    completeness_rate: 'Completeness Rate',
    consistency_rate: 'Consistency Rate',
    professionalism_score: 'Professionalism Score',
    knowledge_score: 'Knowledge Score',
    communication_score: 'Communication Score',

    // Satisfaction Metrics
    csat: 'CSAT',
    nps: 'NPS',
    ces: 'CES',
    satisfaction_rate: 'Satisfaction Rate',
    unsatisfaction_rate: 'Unsatisfaction Rate',
    promoter_score: 'Promoter Score',
    passive_score: 'Passive Score',
    detractor_score: 'Detractor Score',
    csat_score: 'CSAT Score',
    nps_score: 'NPS Score',
    ces_score: 'CES Score',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    channel_comparison: 'Channel Comparison',
    agent_comparison: 'Agent Comparison',
    category_comparison: 'Category Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Support Analytics Metric Category Labels
export function getSupportAnalyticsMetricCategoryLabel(
  category: SupportAnalyticsMetricCategory
): string {
  const labels: Record<SupportAnalyticsMetricCategory, string> = {
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.VOLUME]: 'Volume',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.RESPONSE_TIME]: 'Response Time',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.RESOLUTION_TIME]: 'Resolution Time',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.AGENT]: 'Agent',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.QUALITY]: 'Quality',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.SATISFACTION]: 'Satisfaction',
    [SUPPORT_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Support Analytics Metric Type Labels
export function getSupportAnalyticsMetricTypeLabel(type: SupportAnalyticsMetricType): string {
  const labels: Record<SupportAnalyticsMetricType, string> = {
    [SUPPORT_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [SUPPORT_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [SUPPORT_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [SUPPORT_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [SUPPORT_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [SUPPORT_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [SUPPORT_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
  };
  return labels[type] || 'Unknown';
}

// Support Analytics Metric Format Labels
export function getSupportAnalyticsMetricFormatLabel(format: SupportAnalyticsMetricFormat): string {
  const labels: Record<SupportAnalyticsMetricFormat, string> = {
    [SUPPORT_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [SUPPORT_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [SUPPORT_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [SUPPORT_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [SUPPORT_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Support Analytics Metric Priority Labels
export function getSupportAnalyticsMetricPriorityLabel(
  priority: SupportAnalyticsMetricPriority
): string {
  const labels: Record<SupportAnalyticsMetricPriority, string> = {
    [SUPPORT_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [SUPPORT_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getSupportAnalyticsMetricCategory(metric: string): SupportAnalyticsMetricCategory {
  const countMetrics = Object.values(SUPPORT_ANALYTICS_METRIC.COUNT_METRICS) as readonly string[];
  const volumeMetrics = Object.values(SUPPORT_ANALYTICS_METRIC.VOLUME_METRICS) as readonly string[];
  const responseTimeMetrics = Object.values(
    SUPPORT_ANALYTICS_METRIC.RESPONSE_TIME_METRICS
  ) as readonly string[];
  const resolutionTimeMetrics = Object.values(
    SUPPORT_ANALYTICS_METRIC.RESOLUTION_TIME_METRICS
  ) as readonly string[];
  const agentMetrics = Object.values(SUPPORT_ANALYTICS_METRIC.AGENT_METRICS) as readonly string[];
  const qualityMetrics = Object.values(
    SUPPORT_ANALYTICS_METRIC.QUALITY_METRICS
  ) as readonly string[];
  const satisfactionMetrics = Object.values(
    SUPPORT_ANALYTICS_METRIC.SATISFACTION_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    SUPPORT_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (countMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (volumeMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.VOLUME;
  if (responseTimeMetrics.includes(metric))
    return SUPPORT_ANALYTICS_METRIC.CATEGORIES.RESPONSE_TIME;
  if (resolutionTimeMetrics.includes(metric))
    return SUPPORT_ANALYTICS_METRIC.CATEGORIES.RESOLUTION_TIME;
  if (agentMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.AGENT;
  if (qualityMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.QUALITY;
  if (satisfactionMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.SATISFACTION;
  if (comparisonMetrics.includes(metric)) return SUPPORT_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return SUPPORT_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getSupportAnalyticsMetricType(metric: string): SupportAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'csat',
    'nps',
    'ces',
    'satisfaction',
    'compliance',
    'accuracy',
    'completeness',
    'consistency',
    'utilization',
    'availability',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const durationMetrics: string[] = ['time', 'duration', 'response', 'resolution', 'handling'];

  const scoreMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return SUPPORT_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return SUPPORT_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return SUPPORT_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return SUPPORT_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return SUPPORT_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getSupportAnalyticsMetricFormat(metric: string): SupportAnalyticsMetricFormat {
  const durationMetrics: string[] = ['time', 'duration', 'response', 'resolution', 'handling'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'csat',
    'nps',
    'ces',
    'satisfaction',
    'compliance',
    'accuracy',
    'completeness',
    'consistency',
    'utilization',
    'availability',
  ];

  const ratingMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return SUPPORT_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return SUPPORT_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return SUPPORT_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return SUPPORT_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate average response time
export function calculateSupportAnalyticsAvgResponseTime(
  totalResponseTime: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return totalResponseTime / totalResponses;
}

// Calculate resolution rate
export function calculateSupportAnalyticsResolutionRate(
  resolvedTickets: number,
  totalTickets: number
): number {
  if (totalTickets === 0) return 0;
  return (resolvedTickets / totalTickets) * 100;
}

// Calculate first contact resolution
export function calculateSupportAnalyticsFirstContactResolution(
  firstContactResolved: number,
  totalTickets: number
): number {
  if (totalTickets === 0) return 0;
  return (firstContactResolved / totalTickets) * 100;
}

// Calculate CSAT
export function calculateSupportAnalyticsCSAT(
  satisfiedResponses: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return (satisfiedResponses / totalResponses) * 100;
}

// Calculate NPS
export function calculateSupportAnalyticsNPS(
  promoters: number,
  passives: number,
  detractors: number
): number {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  return ((promoters - detractors) / total) * 100;
}

// Calculate CES
export function calculateSupportAnalyticsCES(
  totalEffortScore: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return totalEffortScore / totalResponses;
}

// Calculate agent productivity
export function calculateSupportAnalyticsAgentProductivity(
  ticketsResolved: number,
  totalHours: number
): number {
  if (totalHours === 0) return 0;
  return ticketsResolved / totalHours;
}

// Calculate agent efficiency
export function calculateSupportAnalyticsAgentEfficiency(
  ticketsHandled: number,
  totalTickets: number
): number {
  if (totalTickets === 0) return 0;
  return (ticketsHandled / totalTickets) * 100;
}

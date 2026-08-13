/**
 * @fileoverview Support analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Support analytics metrics
 */
export enum SupportAnalyticsMetric {
  /** Total number of tickets */
  TOTAL_TICKETS = 'TOTAL_TICKETS',
  /** Open tickets */
  OPEN_TICKETS = 'OPEN_TICKETS',
  /** Closed tickets */
  CLOSED_TICKETS = 'CLOSED_TICKETS',
  /** Resolved tickets */
  RESOLVED_TICKETS = 'RESOLVED_TICKETS',
  /** Escalated tickets */
  ESCALATED_TICKETS = 'ESCALATED_TICKETS',
  /** Ticket volume growth rate */
  TICKET_VOLUME_GROWTH = 'TICKET_VOLUME_GROWTH',
  /** Average resolution time in hours */
  AVERAGE_RESOLUTION_TIME = 'AVERAGE_RESOLUTION_TIME',
  /** First response time in hours */
  FIRST_RESPONSE_TIME = 'FIRST_RESPONSE_TIME',
  /** Average handling time in minutes */
  AVERAGE_HANDLING_TIME = 'AVERAGE_HANDLING_TIME',
  /** Ticket backlog count */
  TICKET_BACKLOG = 'TICKET_BACKLOG',
  /** Ticket age in days */
  TICKET_AGE = 'TICKET_AGE',
  /** SLA compliance rate percentage */
  SLA_COMPLIANCE_RATE = 'SLA_COMPLIANCE_RATE',
  /** Customer satisfaction score */
  CUSTOMER_SATISFACTION_SCORE = 'CUSTOMER_SATISFACTION_SCORE',
  /** Agent productivity */
  AGENT_PRODUCTIVITY = 'AGENT_PRODUCTIVITY',
  /** Agent capacity utilization percentage */
  AGENT_CAPACITY_UTILIZATION = 'AGENT_CAPACITY_UTILIZATION',
  /** Ticket category distribution */
  TICKET_CATEGORY_DISTRIBUTION = 'TICKET_CATEGORY_DISTRIBUTION',
  /** Ticket priority distribution */
  TICKET_PRIORITY_DISTRIBUTION = 'TICKET_PRIORITY_DISTRIBUTION',
  /** Ticket channel distribution */
  TICKET_CHANNEL_DISTRIBUTION = 'TICKET_CHANNEL_DISTRIBUTION',
  /** Resolution rate percentage */
  RESOLUTION_RATE = 'RESOLUTION_RATE',
  /** First contact resolution rate percentage */
  FIRST_CONTACT_RESOLUTION_RATE = 'FIRST_CONTACT_RESOLUTION_RATE',
  /** Escalation rate percentage */
  ESCALATION_RATE = 'ESCALATION_RATE',
  /** Reopen rate percentage */
  REOPEN_RATE = 'REOPEN_RATE',
  /** Abandonment rate percentage */
  ABANDONMENT_RATE = 'ABANDONMENT_RATE',
  /** Knowledge base usage rate */
  KNOWLEDGE_BASE_USAGE_RATE = 'KNOWLEDGE_BASE_USAGE_RATE',
  /** Survey response rate percentage */
  SURVEY_RESPONSE_RATE = 'SURVEY_RESPONSE_RATE',
  /** Net promoter score */
  NET_PROMOTER_SCORE = 'NET_PROMOTER_SCORE',
  /** Customer effort score */
  CUSTOMER_EFFORT_SCORE = 'CUSTOMER_EFFORT_SCORE',
  /** Service level achievement percentage */
  SERVICE_LEVEL_ACHIEVEMENT = 'SERVICE_LEVEL_ACHIEVEMENT',
  /** Tickets per agent */
  TICKETS_PER_AGENT = 'TICKETS_PER_AGENT',
  /** Resolution rate by category */
  RESOLUTION_RATE_BY_CATEGORY = 'RESOLUTION_RATE_BY_CATEGORY',
  /** Average customer wait time */
  AVERAGE_CUSTOMER_WAIT_TIME = 'AVERAGE_CUSTOMER_WAIT_TIME',
  /** Quality assurance score */
  QUALITY_ASSURANCE_SCORE = 'QUALITY_ASSURANCE_SCORE',
}

/**
 * Support metric type classification
 */
export enum SupportAnalyticsMetricType {
  /** Volume metrics */
  VOLUME = 'VOLUME',
  /** Time metrics */
  TIME = 'TIME',
  /** Rate metrics */
  RATE = 'RATE',
  /** Score metrics */
  SCORE = 'SCORE',
  /** Distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
  /** Productivity metrics */
  PRODUCTIVITY = 'PRODUCTIVITY',
  /** Quality metrics */
  QUALITY = 'QUALITY',
}

/**
 * Support metric category mapping
 */
export const SUPPORT_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  SupportAnalyticsMetric,
  SupportAnalyticsMetricType
> = {
  [SupportAnalyticsMetric.TOTAL_TICKETS]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.OPEN_TICKETS]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.CLOSED_TICKETS]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.RESOLVED_TICKETS]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.ESCALATED_TICKETS]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.TICKET_VOLUME_GROWTH]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.AVERAGE_RESOLUTION_TIME]: SupportAnalyticsMetricType.TIME,
  [SupportAnalyticsMetric.FIRST_RESPONSE_TIME]: SupportAnalyticsMetricType.TIME,
  [SupportAnalyticsMetric.AVERAGE_HANDLING_TIME]: SupportAnalyticsMetricType.TIME,
  [SupportAnalyticsMetric.TICKET_BACKLOG]: SupportAnalyticsMetricType.VOLUME,
  [SupportAnalyticsMetric.TICKET_AGE]: SupportAnalyticsMetricType.TIME,
  [SupportAnalyticsMetric.SLA_COMPLIANCE_RATE]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE]: SupportAnalyticsMetricType.SCORE,
  [SupportAnalyticsMetric.AGENT_PRODUCTIVITY]: SupportAnalyticsMetricType.PRODUCTIVITY,
  [SupportAnalyticsMetric.AGENT_CAPACITY_UTILIZATION]: SupportAnalyticsMetricType.PRODUCTIVITY,
  [SupportAnalyticsMetric.TICKET_CATEGORY_DISTRIBUTION]: SupportAnalyticsMetricType.DISTRIBUTION,
  [SupportAnalyticsMetric.TICKET_PRIORITY_DISTRIBUTION]: SupportAnalyticsMetricType.DISTRIBUTION,
  [SupportAnalyticsMetric.TICKET_CHANNEL_DISTRIBUTION]: SupportAnalyticsMetricType.DISTRIBUTION,
  [SupportAnalyticsMetric.RESOLUTION_RATE]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.FIRST_CONTACT_RESOLUTION_RATE]: SupportAnalyticsMetricType.QUALITY,
  [SupportAnalyticsMetric.ESCALATION_RATE]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.REOPEN_RATE]: SupportAnalyticsMetricType.QUALITY,
  [SupportAnalyticsMetric.ABANDONMENT_RATE]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.KNOWLEDGE_BASE_USAGE_RATE]: SupportAnalyticsMetricType.QUALITY,
  [SupportAnalyticsMetric.SURVEY_RESPONSE_RATE]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.NET_PROMOTER_SCORE]: SupportAnalyticsMetricType.SCORE,
  [SupportAnalyticsMetric.CUSTOMER_EFFORT_SCORE]: SupportAnalyticsMetricType.SCORE,
  [SupportAnalyticsMetric.SERVICE_LEVEL_ACHIEVEMENT]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.TICKETS_PER_AGENT]: SupportAnalyticsMetricType.PRODUCTIVITY,
  [SupportAnalyticsMetric.RESOLUTION_RATE_BY_CATEGORY]: SupportAnalyticsMetricType.RATE,
  [SupportAnalyticsMetric.AVERAGE_CUSTOMER_WAIT_TIME]: SupportAnalyticsMetricType.TIME,
  [SupportAnalyticsMetric.QUALITY_ASSURANCE_SCORE]: SupportAnalyticsMetricType.QUALITY,
};

/**
 * Support metric format type
 */
export enum SupportAnalyticsMetricFormat {
  /** Number format */
  NUMBER = 'NUMBER',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Time format (hours) */
  TIME = 'TIME',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Rating format (0-5) */
  RATING = 'RATING',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Support metric configuration
 */
export interface SupportAnalyticsMetricConfig {
  label: string;
  description: string;
  format: SupportAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const SUPPORT_ANALYTICS_METRIC_CONFIG: Record<
  SupportAnalyticsMetric,
  SupportAnalyticsMetricConfig
> = {
  [SupportAnalyticsMetric.TOTAL_TICKETS]: {
    label: 'Total Tickets',
    description: 'Total number of support tickets',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'Ticket',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [SupportAnalyticsMetric.OPEN_TICKETS]: {
    label: 'Open Tickets',
    description: 'Number of open tickets',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'Ticket',
    color: '#F59E0B',
    isReversed: true,
    priority: 1,
  },
  [SupportAnalyticsMetric.CLOSED_TICKETS]: {
    label: 'Closed Tickets',
    description: 'Number of closed tickets',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.RESOLVED_TICKETS]: {
    label: 'Resolved Tickets',
    description: 'Number of resolved tickets',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'CheckCircle',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [SupportAnalyticsMetric.ESCALATED_TICKETS]: {
    label: 'Escalated Tickets',
    description: 'Number of escalated tickets',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'ArrowUp',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.TICKET_VOLUME_GROWTH]: {
    label: 'Ticket Volume Growth',
    description: 'Growth rate of ticket volume',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.AVERAGE_RESOLUTION_TIME]: {
    label: 'Average Resolution Time',
    description: 'Average time to resolve tickets',
    format: SupportAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 12,
      average: 24,
      poor: 48,
    },
  },
  [SupportAnalyticsMetric.FIRST_RESPONSE_TIME]: {
    label: 'First Response Time',
    description: 'Average time to first response',
    format: SupportAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 2,
      average: 4,
      poor: 8,
    },
  },
  [SupportAnalyticsMetric.AVERAGE_HANDLING_TIME]: {
    label: 'Average Handling Time',
    description: 'Average time to handle a ticket',
    format: SupportAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.TICKET_BACKLOG]: {
    label: 'Ticket Backlog',
    description: 'Number of tickets in backlog',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'List',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [SupportAnalyticsMetric.TICKET_AGE]: {
    label: 'Ticket Age',
    description: 'Average age of open tickets',
    format: SupportAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.SLA_COMPLIANCE_RATE]: {
    label: 'SLA Compliance Rate',
    description: 'Percentage of tickets meeting SLA',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Shield',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 95,
      average: 90,
      poor: 85,
    },
  },
  [SupportAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE]: {
    label: 'Customer Satisfaction Score',
    description: 'Overall customer satisfaction score',
    format: SupportAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 4.5,
      average: 4.0,
      poor: 3.5,
    },
  },
  [SupportAnalyticsMetric.AGENT_PRODUCTIVITY]: {
    label: 'Agent Productivity',
    description: 'Tickets resolved per agent per day',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.AGENT_CAPACITY_UTILIZATION]: {
    label: 'Agent Capacity Utilization',
    description: 'Percentage of agent capacity used',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Activity',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.TICKET_CATEGORY_DISTRIBUTION]: {
    label: 'Category Distribution',
    description: 'Distribution of tickets by category',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.TICKET_PRIORITY_DISTRIBUTION]: {
    label: 'Priority Distribution',
    description: 'Distribution of tickets by priority',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#EF4444',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.TICKET_CHANNEL_DISTRIBUTION]: {
    label: 'Channel Distribution',
    description: 'Distribution of tickets by channel',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.RESOLUTION_RATE]: {
    label: 'Resolution Rate',
    description: 'Percentage of tickets resolved',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [SupportAnalyticsMetric.FIRST_CONTACT_RESOLUTION_RATE]: {
    label: 'First Contact Resolution Rate',
    description: 'Percentage of tickets resolved on first contact',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 75,
      average: 65,
      poor: 55,
    },
  },
  [SupportAnalyticsMetric.ESCALATION_RATE]: {
    label: 'Escalation Rate',
    description: 'Percentage of tickets escalated',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'ArrowUp',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.REOPEN_RATE]: {
    label: 'Reopen Rate',
    description: 'Percentage of tickets reopened',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Refresh',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.ABANDONMENT_RATE]: {
    label: 'Abandonment Rate',
    description: 'Percentage of abandoned tickets',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.KNOWLEDGE_BASE_USAGE_RATE]: {
    label: 'Knowledge Base Usage Rate',
    description: 'Percentage of tickets resolved using KB',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Book',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.SURVEY_RESPONSE_RATE]: {
    label: 'Survey Response Rate',
    description: 'Percentage of survey responses',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'FileText',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.NET_PROMOTER_SCORE]: {
    label: 'Net Promoter Score',
    description: 'Net promoter score (-100 to 100)',
    format: SupportAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 50,
      average: 30,
      poor: 10,
    },
  },
  [SupportAnalyticsMetric.CUSTOMER_EFFORT_SCORE]: {
    label: 'Customer Effort Score',
    description: 'Customer effort score (0-100)',
    format: SupportAnalyticsMetricFormat.SCORE,
    icon: 'Gauge',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.SERVICE_LEVEL_ACHIEVEMENT]: {
    label: 'Service Level Achievement',
    description: 'Percentage of service level targets met',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Target',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [SupportAnalyticsMetric.TICKETS_PER_AGENT]: {
    label: 'Tickets Per Agent',
    description: 'Average tickets handled per agent',
    format: SupportAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.RESOLUTION_RATE_BY_CATEGORY]: {
    label: 'Resolution Rate by Category',
    description: 'Resolution rate breakdown by category',
    format: SupportAnalyticsMetricFormat.PERCENTAGE,
    icon: 'PieChart',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SupportAnalyticsMetric.AVERAGE_CUSTOMER_WAIT_TIME]: {
    label: 'Average Customer Wait Time',
    description: 'Average time customers wait for response',
    format: SupportAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SupportAnalyticsMetric.QUALITY_ASSURANCE_SCORE]: {
    label: 'Quality Assurance Score',
    description: 'Overall quality assurance score',
    format: SupportAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get support metric category
 */
export function getSupportMetricCategory(
  metric: SupportAnalyticsMetric
): SupportAnalyticsMetricType {
  return SUPPORT_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get support metric label
 */
export function getSupportMetricLabel(metric: SupportAnalyticsMetric): string {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get support metric description
 */
export function getSupportMetricDescription(metric: SupportAnalyticsMetric): string {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get support metric format
 */
export function getSupportMetricFormat(
  metric: SupportAnalyticsMetric
): SupportAnalyticsMetricFormat {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.format || SupportAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if support metric is reversed (lower is better)
 */
export function isSupportMetricReversed(metric: SupportAnalyticsMetric): boolean {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get support metrics by category
 */
export function getSupportMetricsByCategory(
  category: SupportAnalyticsMetricType
): SupportAnalyticsMetric[] {
  return Object.entries(SUPPORT_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as SupportAnalyticsMetric);
}

/**
 * Format support metric value
 */
export function formatSupportMetricValue(metric: SupportAnalyticsMetric, value: number): string {
  const format = getSupportMetricFormat(metric);

  switch (format) {
    case SupportAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case SupportAnalyticsMetricFormat.TIME:
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      if (value >= 1) {
        const hours = Math.floor(value);
        const minutes = Math.round((value % 1) * 60);
        return `${hours}h ${minutes}m`;
      }
      const minutes = Math.round(value * 60);
      return `${minutes}m`;
    case SupportAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case SupportAnalyticsMetricFormat.RATING:
      return value.toFixed(1);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get support metric priority
 */
export function getSupportMetricPriority(metric: SupportAnalyticsMetric): number {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority support metrics
 */
export function getHighPrioritySupportMetrics(): SupportAnalyticsMetric[] {
  return Object.values(SupportAnalyticsMetric).filter(
    (metric) => getSupportMetricPriority(metric) === 1
  );
}

/**
 * Get support metric thresholds
 */
export function getSupportMetricThreshold(
  metric: SupportAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return SUPPORT_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate support metric performance
 */
export function evaluateSupportMetricPerformance(
  metric: SupportAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getSupportMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isSupportMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Support dashboard metrics
 */
export const SUPPORT_DASHBOARD_METRICS: SupportAnalyticsMetric[] = [
  SupportAnalyticsMetric.TOTAL_TICKETS,
  SupportAnalyticsMetric.OPEN_TICKETS,
  SupportAnalyticsMetric.RESOLVED_TICKETS,
  SupportAnalyticsMetric.AVERAGE_RESOLUTION_TIME,
  SupportAnalyticsMetric.FIRST_RESPONSE_TIME,
  SupportAnalyticsMetric.SLA_COMPLIANCE_RATE,
  SupportAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE,
  SupportAnalyticsMetric.TICKET_BACKLOG,
  SupportAnalyticsMetric.FIRST_CONTACT_RESOLUTION_RATE,
];

/**
 * Support performance metrics
 */
export const SUPPORT_PERFORMANCE_METRICS: SupportAnalyticsMetric[] = [
  SupportAnalyticsMetric.AVERAGE_RESOLUTION_TIME,
  SupportAnalyticsMetric.FIRST_RESPONSE_TIME,
  SupportAnalyticsMetric.SLA_COMPLIANCE_RATE,
  SupportAnalyticsMetric.RESOLUTION_RATE,
  SupportAnalyticsMetric.FIRST_CONTACT_RESOLUTION_RATE,
  SupportAnalyticsMetric.SERVICE_LEVEL_ACHIEVEMENT,
  SupportAnalyticsMetric.AVERAGE_HANDLING_TIME,
];

/**
 * Support quality metrics
 */
export const SUPPORT_QUALITY_METRICS: SupportAnalyticsMetric[] = [
  SupportAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE,
  SupportAnalyticsMetric.NET_PROMOTER_SCORE,
  SupportAnalyticsMetric.CUSTOMER_EFFORT_SCORE,
  SupportAnalyticsMetric.QUALITY_ASSURANCE_SCORE,
  SupportAnalyticsMetric.REOPEN_RATE,
  SupportAnalyticsMetric.KNOWLEDGE_BASE_USAGE_RATE,
];

/**
 * Support volume metrics
 */
export const SUPPORT_VOLUME_METRICS: SupportAnalyticsMetric[] = [
  SupportAnalyticsMetric.TOTAL_TICKETS,
  SupportAnalyticsMetric.OPEN_TICKETS,
  SupportAnalyticsMetric.CLOSED_TICKETS,
  SupportAnalyticsMetric.RESOLVED_TICKETS,
  SupportAnalyticsMetric.ESCALATED_TICKETS,
  SupportAnalyticsMetric.TICKET_BACKLOG,
  SupportAnalyticsMetric.TICKET_VOLUME_GROWTH,
];

/**
 * Support distribution metrics
 */
export const SUPPORT_DISTRIBUTION_METRICS: SupportAnalyticsMetric[] = [
  SupportAnalyticsMetric.TICKET_CATEGORY_DISTRIBUTION,
  SupportAnalyticsMetric.TICKET_PRIORITY_DISTRIBUTION,
  SupportAnalyticsMetric.TICKET_CHANNEL_DISTRIBUTION,
  SupportAnalyticsMetric.RESOLUTION_RATE_BY_CATEGORY,
];

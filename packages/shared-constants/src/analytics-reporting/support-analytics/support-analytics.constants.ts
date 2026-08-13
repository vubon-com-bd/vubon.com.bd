/**
 * @fileoverview Support analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Support ticket priority levels
 */
export enum SupportTicketPriority {
  /** Critical priority - immediate action required */
  CRITICAL = 'CRITICAL',
  /** High priority - urgent action required */
  HIGH = 'HIGH',
  /** Medium priority - normal processing */
  MEDIUM = 'MEDIUM',
  /** Low priority - non-urgent */
  LOW = 'LOW',
  /** Very low priority - informational */
  VERY_LOW = 'VERY_LOW',
}

/**
 * SLA timeline settings
 */
export interface SLATimelineSettings {
  /** Response time in hours */
  responseTimeHours: number;
  /** Resolution time in hours */
  resolutionTimeHours: number;
  /** First response time in hours */
  firstResponseTimeHours: number;
  /** Update frequency in hours */
  updateFrequencyHours: number;
  /** Business hours per day */
  businessHoursPerDay: number;
  /** Business days per week */
  businessDaysPerWeek: number;
  /** Timezone for SLA calculation */
  timezone: string;
}

export const DEFAULT_SLA_TIMELINE_SETTINGS: SLATimelineSettings = {
  responseTimeHours: 24,
  resolutionTimeHours: 72,
  firstResponseTimeHours: 4,
  updateFrequencyHours: 24,
  businessHoursPerDay: 8,
  businessDaysPerWeek: 5,
  timezone: 'UTC',
};

/**
 * Support channel settings
 */
export interface SupportChannelSettings {
  /** Support channels enabled */
  enabledChannels: ('EMAIL' | 'CHAT' | 'PHONE' | 'SOCIAL' | 'IN_APP' | 'PORTAL')[];
  /** Default channel */
  defaultChannel: string;
  /** Channel priority order */
  channelPriority: Record<string, number>;
  /** Channel availability hours */
  availabilityHours: Record<string, { start: string; end: string }>;
  /** Chat response time in seconds */
  chatResponseTimeSeconds: number;
  /** Phone queue timeout in seconds */
  phoneQueueTimeoutSeconds: number;
}

export const DEFAULT_SUPPORT_CHANNEL_SETTINGS: SupportChannelSettings = {
  enabledChannels: ['EMAIL', 'CHAT', 'PHONE', 'PORTAL'],
  defaultChannel: 'EMAIL',
  channelPriority: {
    PHONE: 1,
    CHAT: 2,
    EMAIL: 3,
    PORTAL: 4,
  },
  availabilityHours: {
    PHONE: { start: '09:00', end: '18:00' },
    CHAT: { start: '08:00', end: '20:00' },
    EMAIL: { start: '00:00', end: '23:59' },
  },
  chatResponseTimeSeconds: 30,
  phoneQueueTimeoutSeconds: 120,
};

/**
 * Support agent performance benchmark
 */
export interface SupportAgentPerformanceBenchmark {
  /** Average response time in hours */
  avgResponseTimeHours: number;
  /** Average resolution time in hours */
  avgResolutionTimeHours: number;
  /** First contact resolution rate percentage */
  firstContactResolutionRate: number;
  /** Customer satisfaction score */
  customerSatisfactionScore: number;
  /** Tickets resolved per day */
  ticketsResolvedPerDay: number;
  /** Quality score */
  qualityScore: number;
  /** Knowledge base contribution score */
  kbContributionScore: number;
}

export const DEFAULT_SUPPORT_AGENT_PERFORMANCE_BENCHMARK: SupportAgentPerformanceBenchmark = {
  avgResponseTimeHours: 4,
  avgResolutionTimeHours: 24,
  firstContactResolutionRate: 75,
  customerSatisfactionScore: 4.0,
  ticketsResolvedPerDay: 15,
  qualityScore: 85,
  kbContributionScore: 60,
};

/**
 * Ticket escalation rules
 */
export interface TicketEscalationRules {
  /** Enable escalation */
  enableEscalation: boolean;
  /** Escalation levels */
  escalationLevels: ('L1' | 'L2' | 'L3' | 'L4')[];
  /** Time to escalate in hours */
  escalationTimeHours: number;
  /** Priority escalation thresholds */
  priorityThresholds: Record<SupportTicketPriority, number>;
  /** Escalation notification channels */
  notificationChannels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP')[];
  /** Auto-escalate after hours */
  autoEscalateAfterHours: number;
}

export const DEFAULT_TICKET_ESCALATION_RULES: TicketEscalationRules = {
  enableEscalation: true,
  escalationLevels: ['L1', 'L2', 'L3', 'L4'],
  escalationTimeHours: 4,
  priorityThresholds: {
    [SupportTicketPriority.CRITICAL]: 1,
    [SupportTicketPriority.HIGH]: 2,
    [SupportTicketPriority.MEDIUM]: 4,
    [SupportTicketPriority.LOW]: 8,
    [SupportTicketPriority.VERY_LOW]: 12,
  },
  notificationChannels: ['EMAIL', 'SMS'],
  autoEscalateAfterHours: 24,
};

/**
 * Support knowledge base settings
 */
export interface SupportKnowledgeBaseSettings {
  /** Enable knowledge base */
  enableKnowledgeBase: boolean;
  /** Enable article suggestions */
  enableArticleSuggestions: boolean;
  /** Enable auto-categorization */
  enableAutoCategorization: boolean;
  /** Minimum article rating */
  minArticleRating: number;
  /** Article review frequency in days */
  articleReviewFrequencyDays: number;
  /** Max articles per category */
  maxArticlesPerCategory: number;
}

export const DEFAULT_SUPPORT_KNOWLEDGE_BASE_SETTINGS: SupportKnowledgeBaseSettings = {
  enableKnowledgeBase: true,
  enableArticleSuggestions: true,
  enableAutoCategorization: true,
  minArticleRating: 3,
  articleReviewFrequencyDays: 90,
  maxArticlesPerCategory: 50,
};

/**
 * Customer satisfaction survey settings
 */
export interface CustomerSatisfactionSurveySettings {
  /** Enable surveys */
  enableSurveys: boolean;
  /** Survey trigger type */
  triggerType: 'AFTER_RESOLUTION' | 'AFTER_CLOSURE' | 'PERIODIC' | 'RANDOM';
  /** Survey frequency in days */
  surveyFrequencyDays: number;
  /** Minimum response rate target percentage */
  minResponseRateTarget: number;
  /** Satisfaction score thresholds */
  scoreThresholds: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export const DEFAULT_CUSTOMER_SATISFACTION_SURVEY_SETTINGS: CustomerSatisfactionSurveySettings = {
  enableSurveys: true,
  triggerType: 'AFTER_RESOLUTION',
  surveyFrequencyDays: 7,
  minResponseRateTarget: 20,
  scoreThresholds: {
    excellent: 4.5,
    good: 4.0,
    average: 3.0,
    poor: 2.0,
  },
};

/**
 * Support automation settings
 */
export interface SupportAutomationSettings {
  /** Enable automation */
  enableAutomation: boolean;
  /** Enable auto-responder */
  enableAutoResponder: boolean;
  /** Enable auto-routing */
  enableAutoRouting: boolean;
  /** Enable auto-categorization */
  enableAutoCategorization: boolean;
  /** Enable auto-suggestions */
  enableAutoSuggestions: boolean;
  /** Enable auto-escalation */
  enableAutoEscalation: boolean;
  /** Automation confidence threshold percentage */
  confidenceThreshold: number;
}

export const DEFAULT_SUPPORT_AUTOMATION_SETTINGS: SupportAutomationSettings = {
  enableAutomation: true,
  enableAutoResponder: true,
  enableAutoRouting: true,
  enableAutoCategorization: true,
  enableAutoSuggestions: true,
  enableAutoEscalation: false,
  confidenceThreshold: 80,
};

/**
 * Support reporting thresholds
 */
export interface SupportReportingThresholds {
  /** Alert threshold for response time in hours */
  responseTimeAlertThreshold: number;
  /** Alert threshold for resolution time in hours */
  resolutionTimeAlertThreshold: number;
  /** Alert threshold for ticket volume */
  ticketVolumeAlertThreshold: number;
  /** Alert threshold for satisfaction score */
  satisfactionScoreAlertThreshold: number;
  /** Critical threshold for backlog */
  backlogCriticalThreshold: number;
  /** Warning threshold for backlog */
  backlogWarningThreshold: number;
}

export const DEFAULT_SUPPORT_REPORTING_THRESHOLDS: SupportReportingThresholds = {
  responseTimeAlertThreshold: 6,
  resolutionTimeAlertThreshold: 48,
  ticketVolumeAlertThreshold: 100,
  satisfactionScoreAlertThreshold: 3.5,
  backlogCriticalThreshold: 50,
  backlogWarningThreshold: 25,
};

/**
 * Support category classification
 */
export enum SupportCategory {
  /** Technical issues */
  TECHNICAL = 'TECHNICAL',
  /** Billing issues */
  BILLING = 'BILLING',
  /** Account issues */
  ACCOUNT = 'ACCOUNT',
  /** Product issues */
  PRODUCT = 'PRODUCT',
  /** Service issues */
  SERVICE = 'SERVICE',
  /** General inquiries */
  GENERAL = 'GENERAL',
  /** Feedback and suggestions */
  FEEDBACK = 'FEEDBACK',
  /** Complaints */
  COMPLAINT = 'COMPLAINT',
  /** Requests */
  REQUEST = 'REQUEST',
  /** Escalations */
  ESCALATION = 'ESCALATION',
}

/**
 * Support category configuration
 */
export const SUPPORT_CATEGORY_CONFIG: Record<
  SupportCategory,
  { label: string; description: string; color: string; avgResolutionTimeHours: number }
> = {
  [SupportCategory.TECHNICAL]: {
    label: 'Technical Issues',
    description: 'Technical problems and system issues',
    color: '#EF4444',
    avgResolutionTimeHours: 48,
  },
  [SupportCategory.BILLING]: {
    label: 'Billing Issues',
    description: 'Invoicing and payment issues',
    color: '#F59E0B',
    avgResolutionTimeHours: 24,
  },
  [SupportCategory.ACCOUNT]: {
    label: 'Account Issues',
    description: 'Account management and access issues',
    color: '#3B82F6',
    avgResolutionTimeHours: 12,
  },
  [SupportCategory.PRODUCT]: {
    label: 'Product Issues',
    description: 'Product functionality and usage issues',
    color: '#8B5CF6',
    avgResolutionTimeHours: 36,
  },
  [SupportCategory.SERVICE]: {
    label: 'Service Issues',
    description: 'Service delivery and quality issues',
    color: '#10B981',
    avgResolutionTimeHours: 24,
  },
  [SupportCategory.GENERAL]: {
    label: 'General Inquiries',
    description: 'General questions and information requests',
    color: '#6B7280',
    avgResolutionTimeHours: 8,
  },
  [SupportCategory.FEEDBACK]: {
    label: 'Feedback & Suggestions',
    description: 'Customer feedback and improvement suggestions',
    color: '#F472B6',
    avgResolutionTimeHours: 72,
  },
  [SupportCategory.COMPLAINT]: {
    label: 'Complaints',
    description: 'Customer complaints and grievances',
    color: '#EF4444',
    avgResolutionTimeHours: 48,
  },
  [SupportCategory.REQUEST]: {
    label: 'Requests',
    description: 'Service and feature requests',
    color: '#F59E0B',
    avgResolutionTimeHours: 72,
  },
  [SupportCategory.ESCALATION]: {
    label: 'Escalations',
    description: 'Escalated support tickets',
    color: '#EF4444',
    avgResolutionTimeHours: 4,
  },
};

/**
 * Support ticket status
 */
export enum SupportTicketStatus {
  /** New ticket */
  NEW = 'NEW',
  /** Open ticket */
  OPEN = 'OPEN',
  /** In progress */
  IN_PROGRESS = 'IN_PROGRESS',
  /** On hold */
  ON_HOLD = 'ON_HOLD',
  /** Resolved */
  RESOLVED = 'RESOLVED',
  /** Closed */
  CLOSED = 'CLOSED',
  /** Escalated */
  ESCALATED = 'ESCALATED',
  /** Awaiting customer */
  AWAITING_CUSTOMER = 'AWAITING_CUSTOMER',
  /** Awaiting internal */
  AWAITING_INTERNAL = 'AWAITING_INTERNAL',
}

/**
 * Support analytics configuration
 */
export const SUPPORT_ANALYTICS_CONFIG = {
  /** Maximum tickets to process */
  MAX_TICKETS: 100000,
  /** Support analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Support query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum tickets in report */
  MAX_TICKETS_IN_REPORT: 10000,
  /** Support data export limit */
  EXPORT_LIMIT: 50000,
  /** Support analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Support functions
 */
export function getSupportCategoryLabel(category: SupportCategory): string {
  return SUPPORT_CATEGORY_CONFIG[category]?.label || category;
}

export function getSupportCategoryColor(category: SupportCategory): string {
  return SUPPORT_CATEGORY_CONFIG[category]?.color || '#6B7280';
}

export function getSupportCategoryAvgResolutionTime(category: SupportCategory): number {
  return SUPPORT_CATEGORY_CONFIG[category]?.avgResolutionTimeHours || 24;
}

export function getSupportTicketStatusLabel(status: SupportTicketStatus): string {
  return status;
}

export function getSupportTicketPriorityLabel(priority: SupportTicketPriority): string {
  return priority;
}

/**
 * @fileoverview Support analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Support analytics types enum for different support-related analytics
 */
export enum SupportAnalyticsType {
  /** Ticket analytics */
  TICKET_ANALYTICS = 'TICKET_ANALYTICS',
  /** Resolution analytics */
  RESOLUTION_ANALYTICS = 'RESOLUTION_ANALYTICS',
  /** Response analytics */
  RESPONSE_ANALYTICS = 'RESPONSE_ANALYTICS',
  /** Customer satisfaction analytics */
  CUSTOMER_SATISFACTION_ANALYTICS = 'CUSTOMER_SATISFACTION_ANALYTICS',
  /** Agent performance analytics */
  AGENT_PERFORMANCE_ANALYTICS = 'AGENT_PERFORMANCE_ANALYTICS',
  /** Category analytics */
  CATEGORY_ANALYTICS = 'CATEGORY_ANALYTICS',
  /** Priority analytics */
  PRIORITY_ANALYTICS = 'PRIORITY_ANALYTICS',
  /** Channel analytics */
  CHANNEL_ANALYTICS = 'CHANNEL_ANALYTICS',
  /** Escalation analytics */
  ESCALATION_ANALYTICS = 'ESCALATION_ANALYTICS',
  /** SLA compliance analytics */
  SLA_COMPLIANCE_ANALYTICS = 'SLA_COMPLIANCE_ANALYTICS',
  /** Knowledge base analytics */
  KNOWLEDGE_BASE_ANALYTICS = 'KNOWLEDGE_BASE_ANALYTICS',
  /** Feedback analytics */
  FEEDBACK_ANALYTICS = 'FEEDBACK_ANALYTICS',
  /** Survey analytics */
  SURVEY_ANALYTICS = 'SURVEY_ANALYTICS',
  /** Quality analytics */
  QUALITY_ANALYTICS = 'QUALITY_ANALYTICS',
  /** Training analytics */
  TRAINING_ANALYTICS = 'TRAINING_ANALYTICS',
  /** Workload analytics */
  WORKLOAD_ANALYTICS = 'WORKLOAD_ANALYTICS',
  /** Shift analytics */
  SHIFT_ANALYTICS = 'SHIFT_ANALYTICS',
  /** Seasonal analytics */
  SEASONAL_ANALYTICS = 'SEASONAL_ANALYTICS',
  /** Trend analytics */
  TREND_ANALYTICS = 'TREND_ANALYTICS',
  /** Forecast analytics */
  FORECAST_ANALYTICS = 'FORECAST_ANALYTICS',
  /** Customer effort analytics */
  CUSTOMER_EFFORT_ANALYTICS = 'CUSTOMER_EFFORT_ANALYTICS',
  /** First contact resolution analytics */
  FIRST_CONTACT_RESOLUTION_ANALYTICS = 'FIRST_CONTACT_RESOLUTION_ANALYTICS',
  /** Response time analytics */
  RESPONSE_TIME_ANALYTICS = 'RESPONSE_TIME_ANALYTICS',
  /** Resolution time analytics */
  RESOLUTION_TIME_ANALYTICS = 'RESOLUTION_TIME_ANALYTICS',
  /** Ticket volume analytics */
  TICKET_VOLUME_ANALYTICS = 'TICKET_VOLUME_ANALYTICS',
}

/**
 * Support analytics category for grouping
 */
export enum SupportAnalyticsCategory {
  /** Ticket management */
  TICKET = 'TICKET',
  /** Performance analytics */
  PERFORMANCE = 'PERFORMANCE',
  /** Quality analytics */
  QUALITY = 'QUALITY',
  /** Operational analytics */
  OPERATIONAL = 'OPERATIONAL',
  /** Customer analytics */
  CUSTOMER = 'CUSTOMER',
  /** Agent analytics */
  AGENT = 'AGENT',
  /** Strategic analytics */
  STRATEGIC = 'STRATEGIC',
}

/**
 * Support analytics category mapping
 */
export const SUPPORT_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  SupportAnalyticsType,
  SupportAnalyticsCategory
> = {
  [SupportAnalyticsType.TICKET_ANALYTICS]: SupportAnalyticsCategory.TICKET,
  [SupportAnalyticsType.RESOLUTION_ANALYTICS]: SupportAnalyticsCategory.QUALITY,
  [SupportAnalyticsType.RESPONSE_ANALYTICS]: SupportAnalyticsCategory.PERFORMANCE,
  [SupportAnalyticsType.CUSTOMER_SATISFACTION_ANALYTICS]: SupportAnalyticsCategory.CUSTOMER,
  [SupportAnalyticsType.AGENT_PERFORMANCE_ANALYTICS]: SupportAnalyticsCategory.AGENT,
  [SupportAnalyticsType.CATEGORY_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
  [SupportAnalyticsType.PRIORITY_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
  [SupportAnalyticsType.CHANNEL_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
  [SupportAnalyticsType.ESCALATION_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
  [SupportAnalyticsType.SLA_COMPLIANCE_ANALYTICS]: SupportAnalyticsCategory.PERFORMANCE,
  [SupportAnalyticsType.KNOWLEDGE_BASE_ANALYTICS]: SupportAnalyticsCategory.QUALITY,
  [SupportAnalyticsType.FEEDBACK_ANALYTICS]: SupportAnalyticsCategory.CUSTOMER,
  [SupportAnalyticsType.SURVEY_ANALYTICS]: SupportAnalyticsCategory.CUSTOMER,
  [SupportAnalyticsType.QUALITY_ANALYTICS]: SupportAnalyticsCategory.QUALITY,
  [SupportAnalyticsType.TRAINING_ANALYTICS]: SupportAnalyticsCategory.AGENT,
  [SupportAnalyticsType.WORKLOAD_ANALYTICS]: SupportAnalyticsCategory.AGENT,
  [SupportAnalyticsType.SHIFT_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
  [SupportAnalyticsType.SEASONAL_ANALYTICS]: SupportAnalyticsCategory.STRATEGIC,
  [SupportAnalyticsType.TREND_ANALYTICS]: SupportAnalyticsCategory.STRATEGIC,
  [SupportAnalyticsType.FORECAST_ANALYTICS]: SupportAnalyticsCategory.STRATEGIC,
  [SupportAnalyticsType.CUSTOMER_EFFORT_ANALYTICS]: SupportAnalyticsCategory.CUSTOMER,
  [SupportAnalyticsType.FIRST_CONTACT_RESOLUTION_ANALYTICS]: SupportAnalyticsCategory.QUALITY,
  [SupportAnalyticsType.RESPONSE_TIME_ANALYTICS]: SupportAnalyticsCategory.PERFORMANCE,
  [SupportAnalyticsType.RESOLUTION_TIME_ANALYTICS]: SupportAnalyticsCategory.PERFORMANCE,
  [SupportAnalyticsType.TICKET_VOLUME_ANALYTICS]: SupportAnalyticsCategory.OPERATIONAL,
};

/**
 * Support analytics type configuration
 */
export interface SupportAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresTicketId: boolean;
}

export const SUPPORT_ANALYTICS_TYPE_CONFIG: Record<
  SupportAnalyticsType,
  SupportAnalyticsTypeConfig
> = {
  [SupportAnalyticsType.TICKET_ANALYTICS]: {
    label: 'Ticket Analytics',
    description: 'Analytics for support tickets',
    icon: 'Ticket',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.RESOLUTION_ANALYTICS]: {
    label: 'Resolution Analytics',
    description: 'Analytics for ticket resolution metrics',
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.RESPONSE_ANALYTICS]: {
    label: 'Response Analytics',
    description: 'Analytics for response time metrics',
    icon: 'Clock',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.CUSTOMER_SATISFACTION_ANALYTICS]: {
    label: 'Customer Satisfaction Analytics',
    description: 'Analytics for customer satisfaction scores',
    icon: 'Smile',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.AGENT_PERFORMANCE_ANALYTICS]: {
    label: 'Agent Performance Analytics',
    description: 'Analytics for support agent performance',
    icon: 'User',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.CATEGORY_ANALYTICS]: {
    label: 'Category Analytics',
    description: 'Analytics for ticket categories',
    icon: 'Folder',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.PRIORITY_ANALYTICS]: {
    label: 'Priority Analytics',
    description: 'Analytics for ticket priorities',
    icon: 'Flag',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.CHANNEL_ANALYTICS]: {
    label: 'Channel Analytics',
    description: 'Analytics for support channels',
    icon: 'MessageSquare',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.ESCALATION_ANALYTICS]: {
    label: 'Escalation Analytics',
    description: 'Analytics for ticket escalations',
    icon: 'ArrowUp',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.SLA_COMPLIANCE_ANALYTICS]: {
    label: 'SLA Compliance Analytics',
    description: 'Analytics for SLA compliance metrics',
    icon: 'Shield',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.KNOWLEDGE_BASE_ANALYTICS]: {
    label: 'Knowledge Base Analytics',
    description: 'Analytics for knowledge base usage',
    icon: 'Book',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.FEEDBACK_ANALYTICS]: {
    label: 'Feedback Analytics',
    description: 'Analytics for customer feedback',
    icon: 'MessageSquare',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.SURVEY_ANALYTICS]: {
    label: 'Survey Analytics',
    description: 'Analytics for customer surveys',
    icon: 'FileText',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.QUALITY_ANALYTICS]: {
    label: 'Quality Analytics',
    description: 'Analytics for support quality metrics',
    icon: 'Shield',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.TRAINING_ANALYTICS]: {
    label: 'Training Analytics',
    description: 'Analytics for agent training programs',
    icon: 'BookOpen',
    color: '#F59E0B',
    priority: 3,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.WORKLOAD_ANALYTICS]: {
    label: 'Workload Analytics',
    description: 'Analytics for agent workload distribution',
    icon: 'Activity',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.SHIFT_ANALYTICS]: {
    label: 'Shift Analytics',
    description: 'Analytics for shift performance metrics',
    icon: 'Clock',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.SEASONAL_ANALYTICS]: {
    label: 'Seasonal Analytics',
    description: 'Analytics for seasonal patterns in support',
    icon: 'Calendar',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.TREND_ANALYTICS]: {
    label: 'Trend Analytics',
    description: 'Analytics for support trends over time',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.FORECAST_ANALYTICS]: {
    label: 'Forecast Analytics',
    description: 'Analytics for support volume forecasting',
    icon: 'Target',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresTicketId: false,
  },
  [SupportAnalyticsType.CUSTOMER_EFFORT_ANALYTICS]: {
    label: 'Customer Effort Analytics',
    description: 'Analytics for customer effort score',
    icon: 'Gauge',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.FIRST_CONTACT_RESOLUTION_ANALYTICS]: {
    label: 'First Contact Resolution Analytics',
    description: 'Analytics for first contact resolution rate',
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.RESPONSE_TIME_ANALYTICS]: {
    label: 'Response Time Analytics',
    description: 'Analytics for response time distribution',
    icon: 'Clock',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.RESOLUTION_TIME_ANALYTICS]: {
    label: 'Resolution Time Analytics',
    description: 'Analytics for resolution time distribution',
    icon: 'Clock',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresTicketId: true,
  },
  [SupportAnalyticsType.TICKET_VOLUME_ANALYTICS]: {
    label: 'Ticket Volume Analytics',
    description: 'Analytics for ticket volume patterns',
    icon: 'BarChart',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresTicketId: false,
  },
};

/**
 * Get support analytics type label
 */
export function getSupportAnalyticsTypeLabel(type: SupportAnalyticsType): string {
  return SUPPORT_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get support analytics type description
 */
export function getSupportAnalyticsTypeDescription(type: SupportAnalyticsType): string {
  return SUPPORT_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get support analytics type category
 */
export function getSupportAnalyticsTypeCategory(
  type: SupportAnalyticsType
): SupportAnalyticsCategory {
  return SUPPORT_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get support analytics types by category
 */
export function getSupportAnalyticsTypesByCategory(
  category: SupportAnalyticsCategory
): SupportAnalyticsType[] {
  return Object.entries(SUPPORT_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as SupportAnalyticsType);
}

/**
 * Check if support analytics type requires ticket ID
 */
export function supportAnalyticsTypeRequiresTicketId(type: SupportAnalyticsType): boolean {
  return SUPPORT_ANALYTICS_TYPE_CONFIG[type]?.requiresTicketId || false;
}

/**
 * Check if support analytics type is real-time
 */
export function isSupportAnalyticsTypeRealtime(type: SupportAnalyticsType): boolean {
  return SUPPORT_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get support analytics type priority
 */
export function getSupportAnalyticsTypePriority(type: SupportAnalyticsType): number {
  return SUPPORT_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Support analytics type status
 */
export enum SupportAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for support analytics types
 */
export const SUPPORT_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  SupportAnalyticsType,
  SupportAnalyticsTypeStatus
> = {
  [SupportAnalyticsType.TICKET_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.RESOLUTION_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.RESPONSE_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.CUSTOMER_SATISFACTION_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.AGENT_PERFORMANCE_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.CATEGORY_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.PRIORITY_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.CHANNEL_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.ESCALATION_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.SLA_COMPLIANCE_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.KNOWLEDGE_BASE_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.FEEDBACK_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.SURVEY_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.QUALITY_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.TRAINING_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.WORKLOAD_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.SHIFT_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.SEASONAL_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.TREND_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.FORECAST_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.CUSTOMER_EFFORT_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.FIRST_CONTACT_RESOLUTION_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.RESPONSE_TIME_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.RESOLUTION_TIME_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
  [SupportAnalyticsType.TICKET_VOLUME_ANALYTICS]: SupportAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get support analytics type status
 */
export function getSupportAnalyticsTypeStatus(
  type: SupportAnalyticsType
): SupportAnalyticsTypeStatus {
  return SUPPORT_ANALYTICS_TYPE_DEFAULT_STATUS[type] || SupportAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set support analytics type status
 */
export function setSupportAnalyticsTypeStatus(
  type: SupportAnalyticsType,
  status: SupportAnalyticsTypeStatus
): void {
  SUPPORT_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Support analytics priority levels
 */
export const SUPPORT_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get support analytics types by priority
 */
export function getSupportAnalyticsTypesByPriority(priority: number): SupportAnalyticsType[] {
  return Object.entries(SUPPORT_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as SupportAnalyticsType);
}

/**
 * Get critical support analytics types
 */
export function getCriticalSupportAnalyticsTypes(): SupportAnalyticsType[] {
  return getSupportAnalyticsTypesByPriority(SUPPORT_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Support analytics sub-categories
 */
export enum SupportAnalyticsSubCategory {
  /** Ticket management */
  TICKET_MANAGEMENT = 'TICKET_MANAGEMENT',
  /** Performance management */
  PERFORMANCE_MANAGEMENT = 'PERFORMANCE_MANAGEMENT',
  /** Quality management */
  QUALITY_MANAGEMENT = 'QUALITY_MANAGEMENT',
  /** Customer management */
  CUSTOMER_MANAGEMENT = 'CUSTOMER_MANAGEMENT',
  /** Agent management */
  AGENT_MANAGEMENT = 'AGENT_MANAGEMENT',
  /** Operational management */
  OPERATIONAL_MANAGEMENT = 'OPERATIONAL_MANAGEMENT',
  /** Strategic management */
  STRATEGIC_MANAGEMENT = 'STRATEGIC_MANAGEMENT',
}

/**
 * Mapping of support analytics types to sub-categories
 */
export const SUPPORT_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  SupportAnalyticsType,
  SupportAnalyticsSubCategory
> = {
  [SupportAnalyticsType.TICKET_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.TICKET_VOLUME_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.CATEGORY_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.PRIORITY_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.CHANNEL_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.ESCALATION_ANALYTICS]: SupportAnalyticsSubCategory.TICKET_MANAGEMENT,
  [SupportAnalyticsType.RESPONSE_ANALYTICS]: SupportAnalyticsSubCategory.PERFORMANCE_MANAGEMENT,
  [SupportAnalyticsType.RESPONSE_TIME_ANALYTICS]:
    SupportAnalyticsSubCategory.PERFORMANCE_MANAGEMENT,
  [SupportAnalyticsType.RESOLUTION_ANALYTICS]: SupportAnalyticsSubCategory.PERFORMANCE_MANAGEMENT,
  [SupportAnalyticsType.RESOLUTION_TIME_ANALYTICS]:
    SupportAnalyticsSubCategory.PERFORMANCE_MANAGEMENT,
  [SupportAnalyticsType.SLA_COMPLIANCE_ANALYTICS]:
    SupportAnalyticsSubCategory.PERFORMANCE_MANAGEMENT,
  [SupportAnalyticsType.AGENT_PERFORMANCE_ANALYTICS]: SupportAnalyticsSubCategory.AGENT_MANAGEMENT,
  [SupportAnalyticsType.WORKLOAD_ANALYTICS]: SupportAnalyticsSubCategory.AGENT_MANAGEMENT,
  [SupportAnalyticsType.SHIFT_ANALYTICS]: SupportAnalyticsSubCategory.AGENT_MANAGEMENT,
  [SupportAnalyticsType.TRAINING_ANALYTICS]: SupportAnalyticsSubCategory.AGENT_MANAGEMENT,
  [SupportAnalyticsType.CUSTOMER_SATISFACTION_ANALYTICS]:
    SupportAnalyticsSubCategory.CUSTOMER_MANAGEMENT,
  [SupportAnalyticsType.CUSTOMER_EFFORT_ANALYTICS]: SupportAnalyticsSubCategory.CUSTOMER_MANAGEMENT,
  [SupportAnalyticsType.FEEDBACK_ANALYTICS]: SupportAnalyticsSubCategory.CUSTOMER_MANAGEMENT,
  [SupportAnalyticsType.SURVEY_ANALYTICS]: SupportAnalyticsSubCategory.CUSTOMER_MANAGEMENT,
  [SupportAnalyticsType.FIRST_CONTACT_RESOLUTION_ANALYTICS]:
    SupportAnalyticsSubCategory.QUALITY_MANAGEMENT,
  [SupportAnalyticsType.KNOWLEDGE_BASE_ANALYTICS]: SupportAnalyticsSubCategory.QUALITY_MANAGEMENT,
  [SupportAnalyticsType.QUALITY_ANALYTICS]: SupportAnalyticsSubCategory.QUALITY_MANAGEMENT,
  [SupportAnalyticsType.SEASONAL_ANALYTICS]: SupportAnalyticsSubCategory.STRATEGIC_MANAGEMENT,
  [SupportAnalyticsType.TREND_ANALYTICS]: SupportAnalyticsSubCategory.STRATEGIC_MANAGEMENT,
  [SupportAnalyticsType.FORECAST_ANALYTICS]: SupportAnalyticsSubCategory.STRATEGIC_MANAGEMENT,
};

/**
 * Get support analytics type sub-category
 */
export function getSupportAnalyticsTypeSubCategory(
  type: SupportAnalyticsType
): SupportAnalyticsSubCategory {
  return SUPPORT_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get support analytics types by sub-category
 */
export function getSupportAnalyticsTypesBySubCategory(
  subCategory: SupportAnalyticsSubCategory
): SupportAnalyticsType[] {
  return Object.entries(SUPPORT_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as SupportAnalyticsType);
}

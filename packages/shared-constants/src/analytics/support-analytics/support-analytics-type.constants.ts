/**
 * Support Analytics Type Constants
 * Types of support analytics data and analysis
 */

export const SUPPORT_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Ticket Analysis
    TICKET_ANALYSIS: 'ticket_analysis',
    TICKET_VOLUME_ANALYSIS: 'ticket_volume_analysis',
    TICKET_RESOLUTION_ANALYSIS: 'ticket_resolution_analysis',
    TICKET_SATISFACTION_ANALYSIS: 'ticket_satisfaction_analysis',

    // Agent Analysis
    AGENT_ANALYSIS: 'agent_analysis',
    AGENT_PERFORMANCE_ANALYSIS: 'agent_performance_analysis',
    AGENT_PRODUCTIVITY_ANALYSIS: 'agent_productivity_analysis',

    // Response Analysis
    RESPONSE_ANALYSIS: 'response_analysis',
    RESPONSE_TIME_ANALYSIS: 'response_time_analysis',
    RESOLUTION_TIME_ANALYSIS: 'resolution_time_analysis',

    // Quality Analysis
    QUALITY_ANALYSIS: 'quality_analysis',
    COMPLIANCE_ANALYSIS: 'compliance_analysis',

    // Channel Analysis
    CHANNEL_ANALYSIS: 'channel_analysis',
    CHANNEL_EFFECTIVENESS: 'channel_effectiveness',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    TICKET_DATA: 'ticket_data',
    AGENT_DATA: 'agent_data',
    RESPONSE_DATA: 'response_data',
    RESOLUTION_DATA: 'resolution_data',
    SATISFACTION_DATA: 'satisfaction_data',
    QUALITY_DATA: 'quality_data',
    CHANNEL_DATA: 'channel_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Ticket Status
  TICKET_STATUS: {
    NEW: 'new',
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REOPENED: 'reopened',
    CANCELLED: 'cancelled',
    ESCALATED: 'escalated',
    ON_HOLD: 'on_hold',
  } as const,

  // Ticket Priority
  TICKET_PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    TRIVIAL: 'trivial',
  } as const,

  // Ticket Types
  TICKET_TYPES: {
    QUESTION: 'question',
    ISSUE: 'issue',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    REQUEST: 'request',
    INCIDENT: 'incident',
    CHANGE_REQUEST: 'change_request',
    FEATURE_REQUEST: 'feature_request',
  } as const,

  // Ticket Categories
  TICKET_CATEGORIES: {
    TECHNICAL: 'technical',
    BILLING: 'billing',
    ACCOUNT: 'account',
    PRODUCT: 'product',
    DELIVERY: 'delivery',
    RETURN: 'return',
    GENERAL: 'general',
    OTHER: 'other',
  } as const,

  // Support Channels
  SUPPORT_CHANNELS: {
    EMAIL: 'email',
    CHAT: 'chat',
    PHONE: 'phone',
    SOCIAL: 'social',
    TICKET: 'ticket',
    SELF_SERVICE: 'self_service',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
    MESSENGER: 'messenger',
  } as const,

  // Agent Roles
  AGENT_ROLES: {
    AGENT: 'agent',
    SENIOR_AGENT: 'senior_agent',
    TEAM_LEAD: 'team_lead',
    SUPERVISOR: 'supervisor',
    MANAGER: 'manager',
    SPECIALIST: 'specialist',
  } as const,

  // Resolution Types
  RESOLUTION_TYPES: {
    RESOLVED: 'resolved',
    WORKAROUND: 'workaround',
    ESCALATED: 'escalated',
    CANCELLED: 'cancelled',
    PENDING: 'pending',
  } as const,

  // Satisfaction Levels
  SATISFACTION_LEVELS: {
    VERY_SATISFIED: 'very_satisfied',
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    UNSATISFIED: 'unsatisfied',
    VERY_UNSATISFIED: 'very_unsatisfied',
  } as const,

  // Quality Levels
  QUALITY_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,
} as const;

// Support Analytics Analysis Types
export type SupportAnalyticsAnalysisType =
  (typeof SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Support Analytics Data Types
export type SupportAnalyticsDataType =
  (typeof SUPPORT_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof SUPPORT_ANALYTICS_TYPE.DATA_TYPES];

// Support Analytics Ticket Status
export type SupportAnalyticsTicketStatus =
  (typeof SUPPORT_ANALYTICS_TYPE.TICKET_STATUS)[keyof typeof SUPPORT_ANALYTICS_TYPE.TICKET_STATUS];

// Support Analytics Ticket Priority
export type SupportAnalyticsTicketPriority =
  (typeof SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY)[keyof typeof SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY];

// Support Analytics Ticket Types
export type SupportAnalyticsTicketType =
  (typeof SUPPORT_ANALYTICS_TYPE.TICKET_TYPES)[keyof typeof SUPPORT_ANALYTICS_TYPE.TICKET_TYPES];

// Support Analytics Ticket Categories
export type SupportAnalyticsTicketCategory =
  (typeof SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES)[keyof typeof SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES];

// Support Analytics Support Channels
export type SupportAnalyticsSupportChannel =
  (typeof SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS)[keyof typeof SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS];

// Support Analytics Agent Roles
export type SupportAnalyticsAgentRole =
  (typeof SUPPORT_ANALYTICS_TYPE.AGENT_ROLES)[keyof typeof SUPPORT_ANALYTICS_TYPE.AGENT_ROLES];

// Support Analytics Resolution Types
export type SupportAnalyticsResolutionType =
  (typeof SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES)[keyof typeof SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES];

// Support Analytics Satisfaction Levels
export type SupportAnalyticsSatisfactionLevel =
  (typeof SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS)[keyof typeof SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS];

// Support Analytics Quality Levels
export type SupportAnalyticsQualityLevel =
  (typeof SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS)[keyof typeof SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS];

// Support Analytics Analysis Type Labels
export function getSupportAnalyticsAnalysisTypeLabel(type: SupportAnalyticsAnalysisType): string {
  const labels: Record<SupportAnalyticsAnalysisType, string> = {
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_ANALYSIS]: 'Ticket Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_VOLUME_ANALYSIS]: 'Ticket Volume Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_RESOLUTION_ANALYSIS]:
      'Ticket Resolution Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_SATISFACTION_ANALYSIS]:
      'Ticket Satisfaction Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_ANALYSIS]: 'Agent Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_PERFORMANCE_ANALYSIS]:
      'Agent Performance Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_PRODUCTIVITY_ANALYSIS]:
      'Agent Productivity Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.RESPONSE_ANALYSIS]: 'Response Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.RESPONSE_TIME_ANALYSIS]: 'Response Time Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.RESOLUTION_TIME_ANALYSIS]: 'Resolution Time Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.QUALITY_ANALYSIS]: 'Quality Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPLIANCE_ANALYSIS]: 'Compliance Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_ANALYSIS]: 'Channel Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL_EFFECTIVENESS]: 'Channel Effectiveness',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Support Analytics Data Type Labels
export function getSupportAnalyticsDataTypeLabel(type: SupportAnalyticsDataType): string {
  const labels: Record<SupportAnalyticsDataType, string> = {
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.TICKET_DATA]: 'Ticket Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.AGENT_DATA]: 'Agent Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.RESPONSE_DATA]: 'Response Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.RESOLUTION_DATA]: 'Resolution Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.SATISFACTION_DATA]: 'Satisfaction Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.QUALITY_DATA]: 'Quality Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [SUPPORT_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Support Analytics Ticket Status Labels
export function getSupportAnalyticsTicketStatusLabel(status: SupportAnalyticsTicketStatus): string {
  const labels: Record<SupportAnalyticsTicketStatus, string> = {
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.NEW]: 'New',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.OPEN]: 'Open',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.IN_PROGRESS]: 'In Progress',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.PENDING]: 'Pending',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.RESOLVED]: 'Resolved',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.CLOSED]: 'Closed',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.REOPENED]: 'Reopened',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.CANCELLED]: 'Cancelled',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.ESCALATED]: 'Escalated',
    [SUPPORT_ANALYTICS_TYPE.TICKET_STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown';
}

// Support Analytics Ticket Priority Labels
export function getSupportAnalyticsTicketPriorityLabel(
  priority: SupportAnalyticsTicketPriority
): string {
  const labels: Record<SupportAnalyticsTicketPriority, string> = {
    [SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY.HIGH]: 'High',
    [SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY.LOW]: 'Low',
    [SUPPORT_ANALYTICS_TYPE.TICKET_PRIORITY.TRIVIAL]: 'Trivial',
  };
  return labels[priority] || 'Unknown';
}

// Support Analytics Ticket Type Labels
export function getSupportAnalyticsTicketTypeLabel(type: SupportAnalyticsTicketType): string {
  const labels: Record<SupportAnalyticsTicketType, string> = {
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.QUESTION]: 'Question',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.ISSUE]: 'Issue',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.COMPLAINT]: 'Complaint',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.FEEDBACK]: 'Feedback',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.REQUEST]: 'Request',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.INCIDENT]: 'Incident',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.CHANGE_REQUEST]: 'Change Request',
    [SUPPORT_ANALYTICS_TYPE.TICKET_TYPES.FEATURE_REQUEST]: 'Feature Request',
  };
  return labels[type] || 'Unknown';
}

// Support Analytics Ticket Category Labels
export function getSupportAnalyticsTicketCategoryLabel(
  category: SupportAnalyticsTicketCategory
): string {
  const labels: Record<SupportAnalyticsTicketCategory, string> = {
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.TECHNICAL]: 'Technical',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.BILLING]: 'Billing',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.ACCOUNT]: 'Account',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.PRODUCT]: 'Product',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.DELIVERY]: 'Delivery',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.RETURN]: 'Return',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.GENERAL]: 'General',
    [SUPPORT_ANALYTICS_TYPE.TICKET_CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown';
}

// Support Analytics Support Channel Labels
export function getSupportAnalyticsSupportChannelLabel(
  channel: SupportAnalyticsSupportChannel
): string {
  const labels: Record<SupportAnalyticsSupportChannel, string> = {
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.EMAIL]: 'Email',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.CHAT]: 'Chat',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.PHONE]: 'Phone',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.SOCIAL]: 'Social',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.TICKET]: 'Ticket',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.SELF_SERVICE]: 'Self-Service',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.IN_APP]: 'In-App',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.WHATSAPP]: 'WhatsApp',
    [SUPPORT_ANALYTICS_TYPE.SUPPORT_CHANNELS.MESSENGER]: 'Messenger',
  };
  return labels[channel] || 'Unknown';
}

// Support Analytics Agent Role Labels
export function getSupportAnalyticsAgentRoleLabel(role: SupportAnalyticsAgentRole): string {
  const labels: Record<SupportAnalyticsAgentRole, string> = {
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.AGENT]: 'Agent',
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.SENIOR_AGENT]: 'Senior Agent',
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.TEAM_LEAD]: 'Team Lead',
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.SUPERVISOR]: 'Supervisor',
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.MANAGER]: 'Manager',
    [SUPPORT_ANALYTICS_TYPE.AGENT_ROLES.SPECIALIST]: 'Specialist',
  };
  return labels[role] || 'Unknown';
}

// Support Analytics Resolution Type Labels
export function getSupportAnalyticsResolutionTypeLabel(
  type: SupportAnalyticsResolutionType
): string {
  const labels: Record<SupportAnalyticsResolutionType, string> = {
    [SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES.RESOLVED]: 'Resolved',
    [SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES.WORKAROUND]: 'Workaround',
    [SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES.ESCALATED]: 'Escalated',
    [SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES.CANCELLED]: 'Cancelled',
    [SUPPORT_ANALYTICS_TYPE.RESOLUTION_TYPES.PENDING]: 'Pending',
  };
  return labels[type] || 'Unknown';
}

// Support Analytics Satisfaction Level Labels
export function getSupportAnalyticsSatisfactionLevelLabel(
  level: SupportAnalyticsSatisfactionLevel
): string {
  const labels: Record<SupportAnalyticsSatisfactionLevel, string> = {
    [SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED]: 'Very Satisfied',
    [SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED]: 'Satisfied',
    [SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL]: 'Neutral',
    [SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED]: 'Unsatisfied',
    [SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED]: 'Very Unsatisfied',
  };
  return labels[level] || 'Unknown';
}

// Support Analytics Quality Level Labels
export function getSupportAnalyticsQualityLevelLabel(level: SupportAnalyticsQualityLevel): string {
  const labels: Record<SupportAnalyticsQualityLevel, string> = {
    [SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.EXCELLENT]: 'Excellent',
    [SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.GOOD]: 'Good',
    [SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.AVERAGE]: 'Average',
    [SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.POOR]: 'Poor',
    [SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Check if analysis is ticket analysis
export function isSupportAnalyticsTicketAnalysis(type: SupportAnalyticsAnalysisType): boolean {
  const ticketTypes: SupportAnalyticsAnalysisType[] = [
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_ANALYSIS,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_VOLUME_ANALYSIS,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_RESOLUTION_ANALYSIS,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TICKET_SATISFACTION_ANALYSIS,
  ];
  return ticketTypes.includes(type);
}

// Check if analysis is agent analysis
export function isSupportAnalyticsAgentAnalysis(type: SupportAnalyticsAnalysisType): boolean {
  const agentTypes: SupportAnalyticsAnalysisType[] = [
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_ANALYSIS,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_PERFORMANCE_ANALYSIS,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.AGENT_PRODUCTIVITY_ANALYSIS,
  ];
  return agentTypes.includes(type);
}

// Check if analysis is comparative
export function isSupportAnalyticsComparative(type: SupportAnalyticsAnalysisType): boolean {
  const comparativeTypes: SupportAnalyticsAnalysisType[] = [
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isSupportAnalyticsPredictive(type: SupportAnalyticsAnalysisType): boolean {
  const predictiveTypes: SupportAnalyticsAnalysisType[] = [
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    SUPPORT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get quality level from score
export function getSupportAnalyticsQualityLevel(score: number): SupportAnalyticsQualityLevel {
  if (score >= 90) return SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.EXCELLENT;
  if (score >= 70) return SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.GOOD;
  if (score >= 50) return SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.AVERAGE;
  if (score >= 30) return SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.POOR;
  return SUPPORT_ANALYTICS_TYPE.QUALITY_LEVELS.CRITICAL;
}

// Get satisfaction level from score
export function getSupportAnalyticsSatisfactionLevel(
  score: number
): SupportAnalyticsSatisfactionLevel {
  if (score >= 4.5) return SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED;
  if (score >= 3.5) return SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED;
  if (score >= 2.5) return SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL;
  if (score >= 1.5) return SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED;
  return SUPPORT_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED;
}

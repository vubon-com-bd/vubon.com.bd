/**
 * Marketing Automation Constants
 * Core marketing automation configuration and settings
 */

export const MARKETINGAUTOMATION = {
  // Automation Types
  TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    SOCIAL: 'social',
    WORKFLOW: 'workflow',
    CAMPAIGN: 'campaign',
    LEAD_SCORING: 'lead_scoring',
    SEGMENTATION: 'segmentation',
    PERSONALIZATION: 'personalization',
    AB_TESTING: 'ab_testing',
    MULTI_CHANNEL: 'multi_channel',
    CUSTOM: 'custom',
  } as const,

  // Automation Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    SALES: 'sales',
    SERVICE: 'service',
    OPERATIONAL: 'operational',
    TRANSACTIONAL: 'transactional',
    ENGAGEMENT: 'engagement',
    NURTURING: 'nurturing',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REACTIVATION: 'reactivation',
  } as const,

  // Automation Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    UNDER_REVIEW: 'under_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Automation Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Automation Frequencies
  FREQUENCIES: {
    REAL_TIME: 'real_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ON_DEMAND: 'on_demand',
    EVENT_BASED: 'event_based',
    CUSTOM: 'custom',
  } as const,

  // Automation Execution Modes
  EXECUTION_MODES: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    SEMI_AUTOMATIC: 'semi_automatic',
    SCHEDULED: 'scheduled',
    TRIGGERED: 'triggered',
    BATCH: 'batch',
  } as const,

  // Automation Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'workflow',
    DEFAULT_CATEGORY: 'marketing',
    DEFAULT_STATUS: 'draft',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_FREQUENCY: 'daily',
    DEFAULT_EXECUTION_MODE: 'automatic',
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 300000, // 5 minutes
    DEFAULT_TIMEOUT: 3600000, // 1 hour
    DEFAULT_BATCH_SIZE: 100,
    MAX_RETRY_ATTEMPTS: 5,
    MAX_CONCURRENT_EXECUTIONS: 10,
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 500,
    DEFAULT_DATA_RETENTION_DAYS: 365,
  } as const,

  // Automation Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_STEPS_PER_AUTOMATION: 50,
    MAX_CONDITIONS_PER_STEP: 20,
    MAX_ACTIONS_PER_STEP: 10,
    MAX_RECIPIENTS_PER_EXECUTION: 10000,
    MAX_SCHEDULES_PER_AUTOMATION: 10,
    MAX_TRIGGERS_PER_AUTOMATION: 20,
    MAX_VARIABLES_PER_AUTOMATION: 50,
    MAX_EMAILS_PER_AUTOMATION: 20,
    MAX_SMS_PER_AUTOMATION: 20,
    MAX_PUSH_PER_AUTOMATION: 20,
  } as const,

  // Automation Errors
  ERRORS: {
    EXECUTION_FAILED: 'execution_failed',
    TRIGGER_FAILED: 'trigger_failed',
    ACTION_FAILED: 'action_failed',
    TIMEOUT: 'timeout',
    RATE_LIMIT: 'rate_limit',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_CONFIG: 'invalid_config',
    DEPENDENCY_FAILED: 'dependency_failed',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    NETWORK_ERROR: 'network_error',
    AUTHENTICATION_ERROR: 'authentication_error',
    VALIDATION_ERROR: 'validation_error',
  } as const,
} as const;

// Automation Types
export type MarketingAutomationType =
  (typeof MARKETINGAUTOMATION.TYPES)[keyof typeof MARKETINGAUTOMATION.TYPES];

// Automation Categories
export type MarketingAutomationCategory =
  (typeof MARKETINGAUTOMATION.CATEGORIES)[keyof typeof MARKETINGAUTOMATION.CATEGORIES];

// Automation Statuses
export type MarketingAutomationStatus =
  (typeof MARKETINGAUTOMATION.STATUSES)[keyof typeof MARKETINGAUTOMATION.STATUSES];

// Automation Priorities
export type MarketingAutomationPriority =
  (typeof MARKETINGAUTOMATION.PRIORITIES)[keyof typeof MARKETINGAUTOMATION.PRIORITIES];

// Automation Frequencies
export type MarketingAutomationFrequency =
  (typeof MARKETINGAUTOMATION.FREQUENCIES)[keyof typeof MARKETINGAUTOMATION.FREQUENCIES];

// Automation Execution Modes
export type MarketingAutomationExecutionMode =
  (typeof MARKETINGAUTOMATION.EXECUTION_MODES)[keyof typeof MARKETINGAUTOMATION.EXECUTION_MODES];

// Automation Defaults
export type MarketingAutomationDefault =
  (typeof MARKETINGAUTOMATION.DEFAULTS)[keyof typeof MARKETINGAUTOMATION.DEFAULTS];

// Automation Limits
export type MarketingAutomationLimit =
  (typeof MARKETINGAUTOMATION.LIMITS)[keyof typeof MARKETINGAUTOMATION.LIMITS];

// Automation Errors
export type MarketingAutomationError =
  (typeof MARKETINGAUTOMATION.ERRORS)[keyof typeof MARKETINGAUTOMATION.ERRORS];

// Utility Functions
export function marketingautomationGetTypeLabel(type: MarketingAutomationType): string {
  const labels: Record<MarketingAutomationType, string> = {
    [MARKETINGAUTOMATION.TYPES.EMAIL]: 'Email Automation',
    [MARKETINGAUTOMATION.TYPES.SMS]: 'SMS Automation',
    [MARKETINGAUTOMATION.TYPES.PUSH]: 'Push Notification Automation',
    [MARKETINGAUTOMATION.TYPES.SOCIAL]: 'Social Media Automation',
    [MARKETINGAUTOMATION.TYPES.WORKFLOW]: 'Workflow Automation',
    [MARKETINGAUTOMATION.TYPES.CAMPAIGN]: 'Campaign Automation',
    [MARKETINGAUTOMATION.TYPES.LEAD_SCORING]: 'Lead Scoring Automation',
    [MARKETINGAUTOMATION.TYPES.SEGMENTATION]: 'Segmentation Automation',
    [MARKETINGAUTOMATION.TYPES.PERSONALIZATION]: 'Personalization Automation',
    [MARKETINGAUTOMATION.TYPES.AB_TESTING]: 'A/B Testing Automation',
    [MARKETINGAUTOMATION.TYPES.MULTI_CHANNEL]: 'Multi-Channel Automation',
    [MARKETINGAUTOMATION.TYPES.CUSTOM]: 'Custom Automation',
  };
  return labels[type] || 'Unknown Automation Type';
}

export function marketingautomationGetCategoryLabel(category: MarketingAutomationCategory): string {
  const labels: Record<MarketingAutomationCategory, string> = {
    [MARKETINGAUTOMATION.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGAUTOMATION.CATEGORIES.SALES]: 'Sales',
    [MARKETINGAUTOMATION.CATEGORIES.SERVICE]: 'Service',
    [MARKETINGAUTOMATION.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGAUTOMATION.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGAUTOMATION.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [MARKETINGAUTOMATION.CATEGORIES.NURTURING]: 'Nurturing',
    [MARKETINGAUTOMATION.CATEGORIES.CONVERSION]: 'Conversion',
    [MARKETINGAUTOMATION.CATEGORIES.RETENTION]: 'Retention',
    [MARKETINGAUTOMATION.CATEGORIES.REACTIVATION]: 'Reactivation',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingautomationGetStatusLabel(status: MarketingAutomationStatus): string {
  const labels: Record<MarketingAutomationStatus, string> = {
    [MARKETINGAUTOMATION.STATUSES.DRAFT]: 'Draft',
    [MARKETINGAUTOMATION.STATUSES.PENDING]: 'Pending',
    [MARKETINGAUTOMATION.STATUSES.ACTIVE]: 'Active',
    [MARKETINGAUTOMATION.STATUSES.PAUSED]: 'Paused',
    [MARKETINGAUTOMATION.STATUSES.COMPLETED]: 'Completed',
    [MARKETINGAUTOMATION.STATUSES.FAILED]: 'Failed',
    [MARKETINGAUTOMATION.STATUSES.CANCELLED]: 'Cancelled',
    [MARKETINGAUTOMATION.STATUSES.ARCHIVED]: 'Archived',
    [MARKETINGAUTOMATION.STATUSES.SCHEDULED]: 'Scheduled',
    [MARKETINGAUTOMATION.STATUSES.IN_PROGRESS]: 'In Progress',
    [MARKETINGAUTOMATION.STATUSES.UNDER_REVIEW]: 'Under Review',
    [MARKETINGAUTOMATION.STATUSES.APPROVED]: 'Approved',
    [MARKETINGAUTOMATION.STATUSES.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function marketingautomationGetPriorityLabel(priority: MarketingAutomationPriority): string {
  const labels: Record<MarketingAutomationPriority, string> = {
    [MARKETINGAUTOMATION.PRIORITIES.CRITICAL]: 'Critical',
    [MARKETINGAUTOMATION.PRIORITIES.HIGH]: 'High',
    [MARKETINGAUTOMATION.PRIORITIES.MEDIUM]: 'Medium',
    [MARKETINGAUTOMATION.PRIORITIES.LOW]: 'Low',
    [MARKETINGAUTOMATION.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function marketingautomationGetFrequencyLabel(
  frequency: MarketingAutomationFrequency
): string {
  const labels: Record<MarketingAutomationFrequency, string> = {
    [MARKETINGAUTOMATION.FREQUENCIES.REAL_TIME]: 'Real-Time',
    [MARKETINGAUTOMATION.FREQUENCIES.HOURLY]: 'Hourly',
    [MARKETINGAUTOMATION.FREQUENCIES.DAILY]: 'Daily',
    [MARKETINGAUTOMATION.FREQUENCIES.WEEKLY]: 'Weekly',
    [MARKETINGAUTOMATION.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [MARKETINGAUTOMATION.FREQUENCIES.MONTHLY]: 'Monthly',
    [MARKETINGAUTOMATION.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [MARKETINGAUTOMATION.FREQUENCIES.ON_DEMAND]: 'On-Demand',
    [MARKETINGAUTOMATION.FREQUENCIES.EVENT_BASED]: 'Event-Based',
    [MARKETINGAUTOMATION.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function marketingautomationGetExecutionModeLabel(
  mode: MarketingAutomationExecutionMode
): string {
  const labels: Record<MarketingAutomationExecutionMode, string> = {
    [MARKETINGAUTOMATION.EXECUTION_MODES.AUTOMATIC]: 'Automatic',
    [MARKETINGAUTOMATION.EXECUTION_MODES.MANUAL]: 'Manual',
    [MARKETINGAUTOMATION.EXECUTION_MODES.SEMI_AUTOMATIC]: 'Semi-Automatic',
    [MARKETINGAUTOMATION.EXECUTION_MODES.SCHEDULED]: 'Scheduled',
    [MARKETINGAUTOMATION.EXECUTION_MODES.TRIGGERED]: 'Triggered',
    [MARKETINGAUTOMATION.EXECUTION_MODES.BATCH]: 'Batch',
  };
  return labels[mode] || 'Unknown Execution Mode';
}

export function marketingautomationGetErrorLabel(error: MarketingAutomationError): string {
  const labels: Record<MarketingAutomationError, string> = {
    [MARKETINGAUTOMATION.ERRORS.EXECUTION_FAILED]: 'Execution Failed',
    [MARKETINGAUTOMATION.ERRORS.TRIGGER_FAILED]: 'Trigger Failed',
    [MARKETINGAUTOMATION.ERRORS.ACTION_FAILED]: 'Action Failed',
    [MARKETINGAUTOMATION.ERRORS.TIMEOUT]: 'Timeout',
    [MARKETINGAUTOMATION.ERRORS.RATE_LIMIT]: 'Rate Limit Exceeded',
    [MARKETINGAUTOMATION.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [MARKETINGAUTOMATION.ERRORS.INVALID_CONFIG]: 'Invalid Configuration',
    [MARKETINGAUTOMATION.ERRORS.DEPENDENCY_FAILED]: 'Dependency Failed',
    [MARKETINGAUTOMATION.ERRORS.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [MARKETINGAUTOMATION.ERRORS.NETWORK_ERROR]: 'Network Error',
    [MARKETINGAUTOMATION.ERRORS.AUTHENTICATION_ERROR]: 'Authentication Error',
    [MARKETINGAUTOMATION.ERRORS.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[error] || 'Unknown Error';
}

export function marketingautomationIsActive(status: MarketingAutomationStatus): boolean {
  const activeStatuses: MarketingAutomationStatus[] = [
    MARKETINGAUTOMATION.STATUSES.ACTIVE,
    MARKETINGAUTOMATION.STATUSES.IN_PROGRESS,
    MARKETINGAUTOMATION.STATUSES.SCHEDULED,
  ];
  return activeStatuses.includes(status);
}

export function marketingautomationIsEditable(status: MarketingAutomationStatus): boolean {
  const editableStatuses: MarketingAutomationStatus[] = [
    MARKETINGAUTOMATION.STATUSES.DRAFT,
    MARKETINGAUTOMATION.STATUSES.PENDING,
    MARKETINGAUTOMATION.STATUSES.UNDER_REVIEW,
    MARKETINGAUTOMATION.STATUSES.REJECTED,
    MARKETINGAUTOMATION.STATUSES.PAUSED,
  ];
  return editableStatuses.includes(status);
}

export function marketingautomationIsCompleted(status: MarketingAutomationStatus): boolean {
  const completedStatuses: MarketingAutomationStatus[] = [
    MARKETINGAUTOMATION.STATUSES.COMPLETED,
    MARKETINGAUTOMATION.STATUSES.FAILED,
    MARKETINGAUTOMATION.STATUSES.CANCELLED,
    MARKETINGAUTOMATION.STATUSES.ARCHIVED,
  ];
  return completedStatuses.includes(status);
}

export function marketingautomationCanTransition(
  currentStatus: MarketingAutomationStatus,
  targetStatus: MarketingAutomationStatus
): boolean {
  const validTransitions: Record<MarketingAutomationStatus, MarketingAutomationStatus[]> = {
    [MARKETINGAUTOMATION.STATUSES.DRAFT]: [
      MARKETINGAUTOMATION.STATUSES.PENDING,
      MARKETINGAUTOMATION.STATUSES.UNDER_REVIEW,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.PENDING]: [
      MARKETINGAUTOMATION.STATUSES.UNDER_REVIEW,
      MARKETINGAUTOMATION.STATUSES.APPROVED,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.UNDER_REVIEW]: [
      MARKETINGAUTOMATION.STATUSES.APPROVED,
      MARKETINGAUTOMATION.STATUSES.REJECTED,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.APPROVED]: [
      MARKETINGAUTOMATION.STATUSES.SCHEDULED,
      MARKETINGAUTOMATION.STATUSES.ACTIVE,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.REJECTED]: [
      MARKETINGAUTOMATION.STATUSES.DRAFT,
      MARKETINGAUTOMATION.STATUSES.ARCHIVED,
    ],
    [MARKETINGAUTOMATION.STATUSES.SCHEDULED]: [
      MARKETINGAUTOMATION.STATUSES.ACTIVE,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.ACTIVE]: [
      MARKETINGAUTOMATION.STATUSES.PAUSED,
      MARKETINGAUTOMATION.STATUSES.COMPLETED,
      MARKETINGAUTOMATION.STATUSES.FAILED,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.PAUSED]: [
      MARKETINGAUTOMATION.STATUSES.ACTIVE,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
    ],
    [MARKETINGAUTOMATION.STATUSES.IN_PROGRESS]: [
      MARKETINGAUTOMATION.STATUSES.COMPLETED,
      MARKETINGAUTOMATION.STATUSES.FAILED,
      MARKETINGAUTOMATION.STATUSES.PAUSED,
    ],
    [MARKETINGAUTOMATION.STATUSES.COMPLETED]: [MARKETINGAUTOMATION.STATUSES.ARCHIVED],
    [MARKETINGAUTOMATION.STATUSES.FAILED]: [
      MARKETINGAUTOMATION.STATUSES.DRAFT,
      MARKETINGAUTOMATION.STATUSES.CANCELLED,
      MARKETINGAUTOMATION.STATUSES.ARCHIVED,
    ],
    [MARKETINGAUTOMATION.STATUSES.CANCELLED]: [MARKETINGAUTOMATION.STATUSES.ARCHIVED],
    [MARKETINGAUTOMATION.STATUSES.ARCHIVED]: [],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}

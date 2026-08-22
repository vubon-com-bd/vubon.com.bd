/**
 * AI Prompt Status Constants
 * Status tracking for prompt lifecycle
 */

// First define the status types
export const AI_PROMPT_STATUS_TYPES = {
  // Initial States
  CREATED: 'created',
  DRAFT: 'draft',
  PENDING: 'pending',

  // Review States
  REVIEWING: 'reviewing',
  APPROVING: 'approving',
  REJECTED: 'rejected',

  // Testing States
  TESTING: 'testing',
  VALIDATING: 'validating',
  OPTIMIZING: 'optimizing',

  // Production States
  APPROVED: 'approved',
  PUBLISHED: 'published',
  DEPLOYED: 'deployed',

  // Maintenance States
  UPDATING: 'updating',
  VERSIONING: 'versioning',

  // Terminal States
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
  RETIRED: 'retired',
  FAILED: 'failed',
} as const;

export type AIPromptStatusType =
  (typeof AI_PROMPT_STATUS_TYPES)[keyof typeof AI_PROMPT_STATUS_TYPES];

export const AI_PROMPT_STATUS = {
  // Status Types
  STATUSES: AI_PROMPT_STATUS_TYPES,

  // Status Categories
  CATEGORIES: {
    DRAFT: 'draft',
    REVIEW: 'review',
    TESTING: 'testing',
    APPROVED: 'approved',
    PUBLISHED: 'published',
    DEPRECATED: 'deprecated',
    FAILED: 'failed',
  } as const,

  // Status Severity
  SEVERITY: {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  } as const,

  // Status Colors
  COLORS: {
    [AI_PROMPT_STATUS_TYPES.CREATED]: '#gray',
    [AI_PROMPT_STATUS_TYPES.DRAFT]: '#gray',
    [AI_PROMPT_STATUS_TYPES.PENDING]: '#yellow',
    [AI_PROMPT_STATUS_TYPES.REVIEWING]: '#blue',
    [AI_PROMPT_STATUS_TYPES.APPROVING]: '#blue',
    [AI_PROMPT_STATUS_TYPES.REJECTED]: '#red',
    [AI_PROMPT_STATUS_TYPES.TESTING]: '#orange',
    [AI_PROMPT_STATUS_TYPES.VALIDATING]: '#orange',
    [AI_PROMPT_STATUS_TYPES.OPTIMIZING]: '#orange',
    [AI_PROMPT_STATUS_TYPES.APPROVED]: '#green',
    [AI_PROMPT_STATUS_TYPES.PUBLISHED]: '#green',
    [AI_PROMPT_STATUS_TYPES.DEPLOYED]: '#green',
    [AI_PROMPT_STATUS_TYPES.UPDATING]: '#orange',
    [AI_PROMPT_STATUS_TYPES.VERSIONING]: '#orange',
    [AI_PROMPT_STATUS_TYPES.DEPRECATED]: '#gray',
    [AI_PROMPT_STATUS_TYPES.ARCHIVED]: '#gray',
    [AI_PROMPT_STATUS_TYPES.RETIRED]: '#gray',
    [AI_PROMPT_STATUS_TYPES.FAILED]: '#red',
  } as const,
} as const;

// Status Categories
export type AIPromptStatusCategory =
  (typeof AI_PROMPT_STATUS.CATEGORIES)[keyof typeof AI_PROMPT_STATUS.CATEGORIES];

// Status Severity
export type AIPromptStatusSeverity =
  (typeof AI_PROMPT_STATUS.SEVERITY)[keyof typeof AI_PROMPT_STATUS.SEVERITY];

// Status Colors
export type AIPromptStatusColor =
  (typeof AI_PROMPT_STATUS.COLORS)[keyof typeof AI_PROMPT_STATUS.COLORS];

// Utility Functions
export function getPromptStatusLabel(status: AIPromptStatusType): string {
  const labels: Record<AIPromptStatusType, string> = {
    [AI_PROMPT_STATUS_TYPES.CREATED]: 'Created',
    [AI_PROMPT_STATUS_TYPES.DRAFT]: 'Draft',
    [AI_PROMPT_STATUS_TYPES.PENDING]: 'Pending',
    [AI_PROMPT_STATUS_TYPES.REVIEWING]: 'Reviewing',
    [AI_PROMPT_STATUS_TYPES.APPROVING]: 'Approving',
    [AI_PROMPT_STATUS_TYPES.REJECTED]: 'Rejected',
    [AI_PROMPT_STATUS_TYPES.TESTING]: 'Testing',
    [AI_PROMPT_STATUS_TYPES.VALIDATING]: 'Validating',
    [AI_PROMPT_STATUS_TYPES.OPTIMIZING]: 'Optimizing',
    [AI_PROMPT_STATUS_TYPES.APPROVED]: 'Approved',
    [AI_PROMPT_STATUS_TYPES.PUBLISHED]: 'Published',
    [AI_PROMPT_STATUS_TYPES.DEPLOYED]: 'Deployed',
    [AI_PROMPT_STATUS_TYPES.UPDATING]: 'Updating',
    [AI_PROMPT_STATUS_TYPES.VERSIONING]: 'Versioning',
    [AI_PROMPT_STATUS_TYPES.DEPRECATED]: 'Deprecated',
    [AI_PROMPT_STATUS_TYPES.ARCHIVED]: 'Archived',
    [AI_PROMPT_STATUS_TYPES.RETIRED]: 'Retired',
    [AI_PROMPT_STATUS_TYPES.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown';
}

export function getPromptStatusCategory(status: AIPromptStatusType): AIPromptStatusCategory {
  const categories: Record<AIPromptStatusType, AIPromptStatusCategory> = {
    [AI_PROMPT_STATUS_TYPES.CREATED]: AI_PROMPT_STATUS.CATEGORIES.DRAFT,
    [AI_PROMPT_STATUS_TYPES.DRAFT]: AI_PROMPT_STATUS.CATEGORIES.DRAFT,
    [AI_PROMPT_STATUS_TYPES.PENDING]: AI_PROMPT_STATUS.CATEGORIES.DRAFT,
    [AI_PROMPT_STATUS_TYPES.REVIEWING]: AI_PROMPT_STATUS.CATEGORIES.REVIEW,
    [AI_PROMPT_STATUS_TYPES.APPROVING]: AI_PROMPT_STATUS.CATEGORIES.REVIEW,
    [AI_PROMPT_STATUS_TYPES.REJECTED]: AI_PROMPT_STATUS.CATEGORIES.FAILED,
    [AI_PROMPT_STATUS_TYPES.TESTING]: AI_PROMPT_STATUS.CATEGORIES.TESTING,
    [AI_PROMPT_STATUS_TYPES.VALIDATING]: AI_PROMPT_STATUS.CATEGORIES.TESTING,
    [AI_PROMPT_STATUS_TYPES.OPTIMIZING]: AI_PROMPT_STATUS.CATEGORIES.TESTING,
    [AI_PROMPT_STATUS_TYPES.APPROVED]: AI_PROMPT_STATUS.CATEGORIES.APPROVED,
    [AI_PROMPT_STATUS_TYPES.PUBLISHED]: AI_PROMPT_STATUS.CATEGORIES.PUBLISHED,
    [AI_PROMPT_STATUS_TYPES.DEPLOYED]: AI_PROMPT_STATUS.CATEGORIES.PUBLISHED,
    [AI_PROMPT_STATUS_TYPES.UPDATING]: AI_PROMPT_STATUS.CATEGORIES.PUBLISHED,
    [AI_PROMPT_STATUS_TYPES.VERSIONING]: AI_PROMPT_STATUS.CATEGORIES.PUBLISHED,
    [AI_PROMPT_STATUS_TYPES.DEPRECATED]: AI_PROMPT_STATUS.CATEGORIES.DEPRECATED,
    [AI_PROMPT_STATUS_TYPES.ARCHIVED]: AI_PROMPT_STATUS.CATEGORIES.DEPRECATED,
    [AI_PROMPT_STATUS_TYPES.RETIRED]: AI_PROMPT_STATUS.CATEGORIES.DEPRECATED,
    [AI_PROMPT_STATUS_TYPES.FAILED]: AI_PROMPT_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || AI_PROMPT_STATUS.CATEGORIES.DRAFT;
}

export function getPromptStatusSeverity(status: AIPromptStatusType): AIPromptStatusSeverity {
  const severities: Record<AIPromptStatusType, AIPromptStatusSeverity> = {
    [AI_PROMPT_STATUS_TYPES.CREATED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.DRAFT]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.PENDING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.REVIEWING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.APPROVING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.REJECTED]: AI_PROMPT_STATUS.SEVERITY.ERROR,
    [AI_PROMPT_STATUS_TYPES.TESTING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.VALIDATING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.OPTIMIZING]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.APPROVED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.PUBLISHED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.DEPLOYED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.UPDATING]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.VERSIONING]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.DEPRECATED]: AI_PROMPT_STATUS.SEVERITY.WARNING,
    [AI_PROMPT_STATUS_TYPES.ARCHIVED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.RETIRED]: AI_PROMPT_STATUS.SEVERITY.INFO,
    [AI_PROMPT_STATUS_TYPES.FAILED]: AI_PROMPT_STATUS.SEVERITY.ERROR,
  };
  return severities[status] || AI_PROMPT_STATUS.SEVERITY.INFO;
}

export function getPromptStatusColor(status: AIPromptStatusType): AIPromptStatusColor {
  return AI_PROMPT_STATUS.COLORS[status] || '#gray';
}

export function isPromptInDraft(status: AIPromptStatusType): boolean {
  const draftStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.CREATED,
    AI_PROMPT_STATUS_TYPES.DRAFT,
    AI_PROMPT_STATUS_TYPES.PENDING,
  ];
  return draftStatuses.includes(status);
}

export function isPromptInReview(status: AIPromptStatusType): boolean {
  const reviewStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.REVIEWING,
    AI_PROMPT_STATUS_TYPES.APPROVING,
  ];
  return reviewStatuses.includes(status);
}

export function isPromptInTesting(status: AIPromptStatusType): boolean {
  const testingStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.TESTING,
    AI_PROMPT_STATUS_TYPES.VALIDATING,
    AI_PROMPT_STATUS_TYPES.OPTIMIZING,
  ];
  return testingStatuses.includes(status);
}

export function isPromptPublished(status: AIPromptStatusType): boolean {
  const publishedStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.APPROVED,
    AI_PROMPT_STATUS_TYPES.PUBLISHED,
    AI_PROMPT_STATUS_TYPES.DEPLOYED,
  ];
  return publishedStatuses.includes(status);
}

export function isPromptActive(status: AIPromptStatusType): boolean {
  const activeStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.APPROVED,
    AI_PROMPT_STATUS_TYPES.PUBLISHED,
    AI_PROMPT_STATUS_TYPES.DEPLOYED,
    AI_PROMPT_STATUS_TYPES.OPTIMIZING,
    AI_PROMPT_STATUS_TYPES.UPDATING,
    AI_PROMPT_STATUS_TYPES.VERSIONING,
  ];
  return activeStatuses.includes(status);
}

export function isPromptDeprecated(status: AIPromptStatusType): boolean {
  const deprecatedStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.DEPRECATED,
    AI_PROMPT_STATUS_TYPES.ARCHIVED,
    AI_PROMPT_STATUS_TYPES.RETIRED,
  ];
  return deprecatedStatuses.includes(status);
}

export function isPromptFailed(status: AIPromptStatusType): boolean {
  const failedStatuses: AIPromptStatusType[] = [
    AI_PROMPT_STATUS_TYPES.REJECTED,
    AI_PROMPT_STATUS_TYPES.FAILED,
  ];
  return failedStatuses.includes(status);
}

export function getPromptStatusProgress(status: AIPromptStatusType): number {
  const progress: Record<AIPromptStatusType, number> = {
    [AI_PROMPT_STATUS_TYPES.CREATED]: 5,
    [AI_PROMPT_STATUS_TYPES.DRAFT]: 10,
    [AI_PROMPT_STATUS_TYPES.PENDING]: 20,
    [AI_PROMPT_STATUS_TYPES.REVIEWING]: 35,
    [AI_PROMPT_STATUS_TYPES.APPROVING]: 45,
    [AI_PROMPT_STATUS_TYPES.REJECTED]: 0,
    [AI_PROMPT_STATUS_TYPES.TESTING]: 60,
    [AI_PROMPT_STATUS_TYPES.VALIDATING]: 70,
    [AI_PROMPT_STATUS_TYPES.OPTIMIZING]: 80,
    [AI_PROMPT_STATUS_TYPES.APPROVED]: 90,
    [AI_PROMPT_STATUS_TYPES.PUBLISHED]: 95,
    [AI_PROMPT_STATUS_TYPES.DEPLOYED]: 100,
    [AI_PROMPT_STATUS_TYPES.UPDATING]: 85,
    [AI_PROMPT_STATUS_TYPES.VERSIONING]: 90,
    [AI_PROMPT_STATUS_TYPES.DEPRECATED]: 100,
    [AI_PROMPT_STATUS_TYPES.ARCHIVED]: 100,
    [AI_PROMPT_STATUS_TYPES.RETIRED]: 100,
    [AI_PROMPT_STATUS_TYPES.FAILED]: 0,
  };
  return progress[status] || 0;
}

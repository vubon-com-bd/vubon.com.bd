/**
 * SEO Content Status Constants
 * Status definitions for content lifecycle management
 */

export const SEO_CONTENT_STATUS = {
  // Content Lifecycle Status
  LIFECYCLE: {
    CONCEPT: 'concept',
    RESEARCH: 'research',
    OUTLINE: 'outline',
    DRAFT: 'draft',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    REVISION: 'revision',
    APPROVED: 'approved',
    DESIGN: 'design',
    PRODUCTION: 'production',
    QA: 'qa',
    PUBLISHED: 'published',
    LIVE: 'live',
    PROMOTED: 'promoted',
    MONITORING: 'monitoring',
    UPDATED: 'updated',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,

  // Content Workflow Status
  WORKFLOW: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    BLOCKED: 'blocked',
    ON_HOLD: 'on_hold',
    IN_REVIEW: 'in_review',
    CHANGES_REQUIRED: 'changes_required',
    APPROVED: 'approved',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,

  // Content Publishing Status
  PUBLISHING: {
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    PUBLISHING: 'publishing',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
    FAILED: 'failed',
    PARTIAL: 'partial',
  } as const,

  // Content Quality Status
  QUALITY: {
    POOR: 'poor',
    BELOW_AVERAGE: 'below_average',
    AVERAGE: 'average',
    GOOD: 'good',
    EXCELLENT: 'excellent',
    OUTSTANDING: 'outstanding',
  } as const,

  // Content Approval Status
  APPROVAL: {
    PENDING: 'pending',
    IN_REVIEW: 'in_review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CHANGES_REQUESTED: 'changes_requested',
    CONDITIONAL_APPROVAL: 'conditional_approval',
  } as const,

  // Status Categories
  CATEGORIES: {
    DRAFT: 'draft',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    APPROVED: 'approved',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOContentLifecycleStatus =
  (typeof SEO_CONTENT_STATUS.LIFECYCLE)[keyof typeof SEO_CONTENT_STATUS.LIFECYCLE];

// Workflow Status
export type SEOContentWorkflowStatus =
  (typeof SEO_CONTENT_STATUS.WORKFLOW)[keyof typeof SEO_CONTENT_STATUS.WORKFLOW];

// Publishing Status
export type SEOContentPublishingStatus =
  (typeof SEO_CONTENT_STATUS.PUBLISHING)[keyof typeof SEO_CONTENT_STATUS.PUBLISHING];

// Quality Status
export type SEOContentQualityStatus =
  (typeof SEO_CONTENT_STATUS.QUALITY)[keyof typeof SEO_CONTENT_STATUS.QUALITY];

// Approval Status
export type SEOContentApprovalStatus =
  (typeof SEO_CONTENT_STATUS.APPROVAL)[keyof typeof SEO_CONTENT_STATUS.APPROVAL];

// Status Categories
export type SEOContentStatusCategory =
  (typeof SEO_CONTENT_STATUS.CATEGORIES)[keyof typeof SEO_CONTENT_STATUS.CATEGORIES];

// Utility Functions
export function getSEOContentLifecycleLabel(status: SEOContentLifecycleStatus): string {
  const labels: Record<SEOContentLifecycleStatus, string> = {
    [SEO_CONTENT_STATUS.LIFECYCLE.CONCEPT]: 'Concept Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.RESEARCH]: 'Research Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.OUTLINE]: 'Outline Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.DRAFT]: 'Draft Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.IN_REVIEW]: 'In Review',
    [SEO_CONTENT_STATUS.LIFECYCLE.REVIEWED]: 'Reviewed',
    [SEO_CONTENT_STATUS.LIFECYCLE.REVISION]: 'Revision',
    [SEO_CONTENT_STATUS.LIFECYCLE.APPROVED]: 'Approved',
    [SEO_CONTENT_STATUS.LIFECYCLE.DESIGN]: 'Design Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.PRODUCTION]: 'Production Phase',
    [SEO_CONTENT_STATUS.LIFECYCLE.QA]: 'Quality Assurance',
    [SEO_CONTENT_STATUS.LIFECYCLE.PUBLISHED]: 'Published',
    [SEO_CONTENT_STATUS.LIFECYCLE.LIVE]: 'Live',
    [SEO_CONTENT_STATUS.LIFECYCLE.PROMOTED]: 'Promoted',
    [SEO_CONTENT_STATUS.LIFECYCLE.MONITORING]: 'Monitoring',
    [SEO_CONTENT_STATUS.LIFECYCLE.UPDATED]: 'Updated',
    [SEO_CONTENT_STATUS.LIFECYCLE.DEPRECATED]: 'Deprecated',
    [SEO_CONTENT_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Lifecycle Phase';
}

export function getSEOContentWorkflowLabel(status: SEOContentWorkflowStatus): string {
  const labels: Record<SEOContentWorkflowStatus, string> = {
    [SEO_CONTENT_STATUS.WORKFLOW.NOT_STARTED]: 'Not Started',
    [SEO_CONTENT_STATUS.WORKFLOW.IN_PROGRESS]: 'In Progress',
    [SEO_CONTENT_STATUS.WORKFLOW.BLOCKED]: 'Blocked',
    [SEO_CONTENT_STATUS.WORKFLOW.ON_HOLD]: 'On Hold',
    [SEO_CONTENT_STATUS.WORKFLOW.IN_REVIEW]: 'In Review',
    [SEO_CONTENT_STATUS.WORKFLOW.CHANGES_REQUIRED]: 'Changes Required',
    [SEO_CONTENT_STATUS.WORKFLOW.APPROVED]: 'Approved',
    [SEO_CONTENT_STATUS.WORKFLOW.COMPLETED]: 'Completed',
    [SEO_CONTENT_STATUS.WORKFLOW.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Workflow Status';
}

export function getSEOContentPublishingLabel(status: SEOContentPublishingStatus): string {
  const labels: Record<SEOContentPublishingStatus, string> = {
    [SEO_CONTENT_STATUS.PUBLISHING.DRAFT]: 'Draft',
    [SEO_CONTENT_STATUS.PUBLISHING.SCHEDULED]: 'Scheduled',
    [SEO_CONTENT_STATUS.PUBLISHING.PUBLISHING]: 'Publishing',
    [SEO_CONTENT_STATUS.PUBLISHING.PUBLISHED]: 'Published',
    [SEO_CONTENT_STATUS.PUBLISHING.UNPUBLISHED]: 'Unpublished',
    [SEO_CONTENT_STATUS.PUBLISHING.FAILED]: 'Failed',
    [SEO_CONTENT_STATUS.PUBLISHING.PARTIAL]: 'Partially Published',
  };
  return labels[status] || 'Unknown Publishing Status';
}

export function getSEOContentApprovalLabel(status: SEOContentApprovalStatus): string {
  const labels: Record<SEOContentApprovalStatus, string> = {
    [SEO_CONTENT_STATUS.APPROVAL.PENDING]: 'Pending Approval',
    [SEO_CONTENT_STATUS.APPROVAL.IN_REVIEW]: 'In Review',
    [SEO_CONTENT_STATUS.APPROVAL.APPROVED]: 'Approved',
    [SEO_CONTENT_STATUS.APPROVAL.REJECTED]: 'Rejected',
    [SEO_CONTENT_STATUS.APPROVAL.CHANGES_REQUESTED]: 'Changes Requested',
    [SEO_CONTENT_STATUS.APPROVAL.CONDITIONAL_APPROVAL]: 'Conditional Approval',
  };
  return labels[status] || 'Unknown Approval Status';
}

export function getSEOContentQualityLabel(status: SEOContentQualityStatus): string {
  const labels: Record<SEOContentQualityStatus, string> = {
    [SEO_CONTENT_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_CONTENT_STATUS.QUALITY.BELOW_AVERAGE]: 'Below Average',
    [SEO_CONTENT_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_CONTENT_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_CONTENT_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_CONTENT_STATUS.QUALITY.OUTSTANDING]: 'Outstanding',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOContentStatusCategory(
  status: SEOContentLifecycleStatus
): SEOContentStatusCategory {
  const categories: Record<SEOContentLifecycleStatus, SEOContentStatusCategory> = {
    [SEO_CONTENT_STATUS.LIFECYCLE.CONCEPT]: SEO_CONTENT_STATUS.CATEGORIES.DRAFT,
    [SEO_CONTENT_STATUS.LIFECYCLE.RESEARCH]: SEO_CONTENT_STATUS.CATEGORIES.DRAFT,
    [SEO_CONTENT_STATUS.LIFECYCLE.OUTLINE]: SEO_CONTENT_STATUS.CATEGORIES.DRAFT,
    [SEO_CONTENT_STATUS.LIFECYCLE.DRAFT]: SEO_CONTENT_STATUS.CATEGORIES.DRAFT,
    [SEO_CONTENT_STATUS.LIFECYCLE.IN_REVIEW]: SEO_CONTENT_STATUS.CATEGORIES.REVIEW,
    [SEO_CONTENT_STATUS.LIFECYCLE.REVIEWED]: SEO_CONTENT_STATUS.CATEGORIES.REVIEW,
    [SEO_CONTENT_STATUS.LIFECYCLE.REVISION]: SEO_CONTENT_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_STATUS.LIFECYCLE.APPROVED]: SEO_CONTENT_STATUS.CATEGORIES.APPROVED,
    [SEO_CONTENT_STATUS.LIFECYCLE.DESIGN]: SEO_CONTENT_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_STATUS.LIFECYCLE.PRODUCTION]: SEO_CONTENT_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_STATUS.LIFECYCLE.QA]: SEO_CONTENT_STATUS.CATEGORIES.IN_PROGRESS,
    [SEO_CONTENT_STATUS.LIFECYCLE.PUBLISHED]: SEO_CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [SEO_CONTENT_STATUS.LIFECYCLE.LIVE]: SEO_CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [SEO_CONTENT_STATUS.LIFECYCLE.PROMOTED]: SEO_CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [SEO_CONTENT_STATUS.LIFECYCLE.MONITORING]: SEO_CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [SEO_CONTENT_STATUS.LIFECYCLE.UPDATED]: SEO_CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [SEO_CONTENT_STATUS.LIFECYCLE.DEPRECATED]: SEO_CONTENT_STATUS.CATEGORIES.ARCHIVED,
    [SEO_CONTENT_STATUS.LIFECYCLE.ARCHIVED]: SEO_CONTENT_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || SEO_CONTENT_STATUS.CATEGORIES.DRAFT;
}

export function getSEOContentStatusColor(status: SEOContentLifecycleStatus): string {
  const colors: Record<SEOContentLifecycleStatus, string> = {
    [SEO_CONTENT_STATUS.LIFECYCLE.CONCEPT]: '#9E9E9E',
    [SEO_CONTENT_STATUS.LIFECYCLE.RESEARCH]: '#2196F3',
    [SEO_CONTENT_STATUS.LIFECYCLE.OUTLINE]: '#00BCD4',
    [SEO_CONTENT_STATUS.LIFECYCLE.DRAFT]: '#9E9E9E',
    [SEO_CONTENT_STATUS.LIFECYCLE.IN_REVIEW]: '#FF9800',
    [SEO_CONTENT_STATUS.LIFECYCLE.REVIEWED]: '#2196F3',
    [SEO_CONTENT_STATUS.LIFECYCLE.REVISION]: '#FFC107',
    [SEO_CONTENT_STATUS.LIFECYCLE.APPROVED]: '#4CAF50',
    [SEO_CONTENT_STATUS.LIFECYCLE.DESIGN]: '#3F51B5',
    [SEO_CONTENT_STATUS.LIFECYCLE.PRODUCTION]: '#00BCD4',
    [SEO_CONTENT_STATUS.LIFECYCLE.QA]: '#9C27B0',
    [SEO_CONTENT_STATUS.LIFECYCLE.PUBLISHED]: '#4CAF50',
    [SEO_CONTENT_STATUS.LIFECYCLE.LIVE]: '#4CAF50',
    [SEO_CONTENT_STATUS.LIFECYCLE.PROMOTED]: '#8BC34A',
    [SEO_CONTENT_STATUS.LIFECYCLE.MONITORING]: '#3F51B5',
    [SEO_CONTENT_STATUS.LIFECYCLE.UPDATED]: '#8BC34A',
    [SEO_CONTENT_STATUS.LIFECYCLE.DEPRECATED]: '#FF9800',
    [SEO_CONTENT_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}

export function isContentReadyToPublish(status: SEOContentLifecycleStatus): boolean {
  const readyStatuses: SEOContentLifecycleStatus[] = [
    SEO_CONTENT_STATUS.LIFECYCLE.APPROVED,
    SEO_CONTENT_STATUS.LIFECYCLE.QA,
  ];
  return readyStatuses.includes(status);
}

export function isContentPublished(status: SEOContentLifecycleStatus): boolean {
  const publishedStatuses: SEOContentLifecycleStatus[] = [
    SEO_CONTENT_STATUS.LIFECYCLE.PUBLISHED,
    SEO_CONTENT_STATUS.LIFECYCLE.LIVE,
    SEO_CONTENT_STATUS.LIFECYCLE.PROMOTED,
    SEO_CONTENT_STATUS.LIFECYCLE.MONITORING,
    SEO_CONTENT_STATUS.LIFECYCLE.UPDATED,
  ];
  return publishedStatuses.includes(status);
}

export function getProgressPercentage(status: SEOContentWorkflowStatus): number {
  const percentages: Record<SEOContentWorkflowStatus, number> = {
    [SEO_CONTENT_STATUS.WORKFLOW.NOT_STARTED]: 0,
    [SEO_CONTENT_STATUS.WORKFLOW.IN_PROGRESS]: 40,
    [SEO_CONTENT_STATUS.WORKFLOW.BLOCKED]: 0,
    [SEO_CONTENT_STATUS.WORKFLOW.ON_HOLD]: 0,
    [SEO_CONTENT_STATUS.WORKFLOW.IN_REVIEW]: 60,
    [SEO_CONTENT_STATUS.WORKFLOW.CHANGES_REQUIRED]: 50,
    [SEO_CONTENT_STATUS.WORKFLOW.APPROVED]: 80,
    [SEO_CONTENT_STATUS.WORKFLOW.COMPLETED]: 100,
    [SEO_CONTENT_STATUS.WORKFLOW.CANCELLED]: 0,
  };
  return percentages[status] || 0;
}

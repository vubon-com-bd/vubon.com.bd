/**
 * Knowledge Base Status Constants
 * Status definitions for knowledge base
 */

export const KNOWLEDGE_BASE_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    REVIEW: 'review',
    UPDATING: 'updating',
    DEPRECATED: 'deprecated',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    PUBLISHED: '#green-500',
    ARCHIVED: '#gray-500',
    REVIEW: '#yellow-500',
    UPDATING: '#orange-500',
    DEPRECATED: '#red-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    PUBLISHED: '✅',
    ARCHIVED: '📦',
    REVIEW: '🔍',
    UPDATING: '🔄',
    DEPRECATED: '⚠️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_REVIEW: 'draft_to_review',
    DRAFT_TO_PUBLISHED: 'draft_to_published',
    REVIEW_TO_PUBLISHED: 'review_to_published',
    REVIEW_TO_DRAFT: 'review_to_draft',
    PUBLISHED_TO_UPDATING: 'published_to_updating',
    UPDATING_TO_PUBLISHED: 'updating_to_published',
    PUBLISHED_TO_ARCHIVED: 'published_to_archived',
    PUBLISHED_TO_DEPRECATED: 'published_to_deprecated',
    ARCHIVED_TO_PUBLISHED: 'archived_to_published',
    DEPRECATED_TO_ARCHIVED: 'deprecated_to_archived',
  } as const,
} as const;

// Status Types
export type KnowledgeBaseStatusType =
  (typeof KNOWLEDGE_BASE_STATUS.TYPES)[keyof typeof KNOWLEDGE_BASE_STATUS.TYPES];

// Status Categories
export type KnowledgeBaseStatusCategory =
  (typeof KNOWLEDGE_BASE_STATUS.CATEGORIES)[keyof typeof KNOWLEDGE_BASE_STATUS.CATEGORIES];

// Status Colors
export type KnowledgeBaseStatusColor =
  (typeof KNOWLEDGE_BASE_STATUS.COLORS)[keyof typeof KNOWLEDGE_BASE_STATUS.COLORS];

// Status Icons
export type KnowledgeBaseStatusIcon =
  (typeof KNOWLEDGE_BASE_STATUS.ICONS)[keyof typeof KNOWLEDGE_BASE_STATUS.ICONS];

// Status Transitions
export type KnowledgeBaseStatusTransition =
  (typeof KNOWLEDGE_BASE_STATUS.TRANSITIONS)[keyof typeof KNOWLEDGE_BASE_STATUS.TRANSITIONS];

// Utility Functions
export function knowledgeBaseStatusGetLabel(status: KnowledgeBaseStatusType): string {
  const labels: Record<KnowledgeBaseStatusType, string> = {
    [KNOWLEDGE_BASE_STATUS.TYPES.DRAFT]: 'Draft',
    [KNOWLEDGE_BASE_STATUS.TYPES.PUBLISHED]: 'Published',
    [KNOWLEDGE_BASE_STATUS.TYPES.ARCHIVED]: 'Archived',
    [KNOWLEDGE_BASE_STATUS.TYPES.REVIEW]: 'In Review',
    [KNOWLEDGE_BASE_STATUS.TYPES.UPDATING]: 'Updating',
    [KNOWLEDGE_BASE_STATUS.TYPES.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

export function knowledgeBaseStatusIsPublished(status: KnowledgeBaseStatusType): boolean {
  return status === KNOWLEDGE_BASE_STATUS.TYPES.PUBLISHED;
}

export function knowledgeBaseStatusIsDraft(status: KnowledgeBaseStatusType): boolean {
  return (
    status === KNOWLEDGE_BASE_STATUS.TYPES.DRAFT || status === KNOWLEDGE_BASE_STATUS.TYPES.REVIEW
  );
}

export function knowledgeBaseStatusIsArchived(status: KnowledgeBaseStatusType): boolean {
  return (
    status === KNOWLEDGE_BASE_STATUS.TYPES.ARCHIVED ||
    status === KNOWLEDGE_BASE_STATUS.TYPES.DEPRECATED
  );
}

export function knowledgeBaseStatusGetCategory(
  status: KnowledgeBaseStatusType
): KnowledgeBaseStatusCategory {
  const categories: Record<KnowledgeBaseStatusType, KnowledgeBaseStatusCategory> = {
    [KNOWLEDGE_BASE_STATUS.TYPES.DRAFT]: KNOWLEDGE_BASE_STATUS.CATEGORIES.PENDING,
    [KNOWLEDGE_BASE_STATUS.TYPES.PUBLISHED]: KNOWLEDGE_BASE_STATUS.CATEGORIES.ACTIVE,
    [KNOWLEDGE_BASE_STATUS.TYPES.ARCHIVED]: KNOWLEDGE_BASE_STATUS.CATEGORIES.ARCHIVED,
    [KNOWLEDGE_BASE_STATUS.TYPES.REVIEW]: KNOWLEDGE_BASE_STATUS.CATEGORIES.PENDING,
    [KNOWLEDGE_BASE_STATUS.TYPES.UPDATING]: KNOWLEDGE_BASE_STATUS.CATEGORIES.ACTIVE,
    [KNOWLEDGE_BASE_STATUS.TYPES.DEPRECATED]: KNOWLEDGE_BASE_STATUS.CATEGORIES.DEPRECATED,
  };
  return categories[status] || KNOWLEDGE_BASE_STATUS.CATEGORIES.PENDING;
}

export function knowledgeBaseStatusCanTransition(
  status: KnowledgeBaseStatusType,
  transition: KnowledgeBaseStatusTransition
): boolean {
  const allowedTransitions: Record<KnowledgeBaseStatusType, KnowledgeBaseStatusTransition[]> = {
    [KNOWLEDGE_BASE_STATUS.TYPES.DRAFT]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.DRAFT_TO_REVIEW,
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.DRAFT_TO_PUBLISHED,
    ],
    [KNOWLEDGE_BASE_STATUS.TYPES.REVIEW]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.REVIEW_TO_PUBLISHED,
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.REVIEW_TO_DRAFT,
    ],
    [KNOWLEDGE_BASE_STATUS.TYPES.PUBLISHED]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.PUBLISHED_TO_UPDATING,
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.PUBLISHED_TO_ARCHIVED,
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.PUBLISHED_TO_DEPRECATED,
    ],
    [KNOWLEDGE_BASE_STATUS.TYPES.UPDATING]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.UPDATING_TO_PUBLISHED,
    ],
    [KNOWLEDGE_BASE_STATUS.TYPES.ARCHIVED]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.ARCHIVED_TO_PUBLISHED,
    ],
    [KNOWLEDGE_BASE_STATUS.TYPES.DEPRECATED]: [
      KNOWLEDGE_BASE_STATUS.TRANSITIONS.DEPRECATED_TO_ARCHIVED,
    ],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}

/**
 * FAQ Status Constants
 * Status definitions for FAQs
 */

export const SUPPORT_FAQ_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
    REVIEW: 'review',
    UPDATING: 'updating',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    PENDING: 'pending',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    PUBLISHED: '#green-500',
    ARCHIVED: '#gray-500',
    REVIEW: '#yellow-500',
    UPDATING: '#orange-500',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    PUBLISHED: '✅',
    ARCHIVED: '📦',
    REVIEW: '🔍',
    UPDATING: '🔄',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_PUBLISHED: 'draft_to_published',
    DRAFT_TO_REVIEW: 'draft_to_review',
    REVIEW_TO_PUBLISHED: 'review_to_published',
    REVIEW_TO_DRAFT: 'review_to_draft',
    PUBLISHED_TO_UPDATING: 'published_to_updating',
    UPDATING_TO_PUBLISHED: 'updating_to_published',
    PUBLISHED_TO_ARCHIVED: 'published_to_archived',
    ARCHIVED_TO_PUBLISHED: 'archived_to_published',
  } as const,
} as const;

// Status Types
export type SupportFaqStatusType =
  (typeof SUPPORT_FAQ_STATUS.TYPES)[keyof typeof SUPPORT_FAQ_STATUS.TYPES];

// Status Categories
export type SupportFaqStatusCategory =
  (typeof SUPPORT_FAQ_STATUS.CATEGORIES)[keyof typeof SUPPORT_FAQ_STATUS.CATEGORIES];

// Status Colors
export type SupportFaqStatusColor =
  (typeof SUPPORT_FAQ_STATUS.COLORS)[keyof typeof SUPPORT_FAQ_STATUS.COLORS];

// Status Icons
export type SupportFaqStatusIcon =
  (typeof SUPPORT_FAQ_STATUS.ICONS)[keyof typeof SUPPORT_FAQ_STATUS.ICONS];

// Status Transitions
export type SupportFaqStatusTransition =
  (typeof SUPPORT_FAQ_STATUS.TRANSITIONS)[keyof typeof SUPPORT_FAQ_STATUS.TRANSITIONS];

// Utility Functions
export function supportFaqStatusGetLabel(status: SupportFaqStatusType): string {
  const labels: Record<SupportFaqStatusType, string> = {
    [SUPPORT_FAQ_STATUS.TYPES.DRAFT]: 'Draft',
    [SUPPORT_FAQ_STATUS.TYPES.PUBLISHED]: 'Published',
    [SUPPORT_FAQ_STATUS.TYPES.ARCHIVED]: 'Archived',
    [SUPPORT_FAQ_STATUS.TYPES.REVIEW]: 'In Review',
    [SUPPORT_FAQ_STATUS.TYPES.UPDATING]: 'Updating',
  };
  return labels[status] || 'Unknown';
}

export function supportFaqStatusIsPublished(status: SupportFaqStatusType): boolean {
  return status === SUPPORT_FAQ_STATUS.TYPES.PUBLISHED;
}

export function supportFaqStatusIsDraft(status: SupportFaqStatusType): boolean {
  return status === SUPPORT_FAQ_STATUS.TYPES.DRAFT || status === SUPPORT_FAQ_STATUS.TYPES.REVIEW;
}

export function supportFaqStatusGetCategory(
  status: SupportFaqStatusType
): SupportFaqStatusCategory {
  const categories: Record<SupportFaqStatusType, SupportFaqStatusCategory> = {
    [SUPPORT_FAQ_STATUS.TYPES.DRAFT]: SUPPORT_FAQ_STATUS.CATEGORIES.PENDING,
    [SUPPORT_FAQ_STATUS.TYPES.PUBLISHED]: SUPPORT_FAQ_STATUS.CATEGORIES.ACTIVE,
    [SUPPORT_FAQ_STATUS.TYPES.ARCHIVED]: SUPPORT_FAQ_STATUS.CATEGORIES.ARCHIVED,
    [SUPPORT_FAQ_STATUS.TYPES.REVIEW]: SUPPORT_FAQ_STATUS.CATEGORIES.PENDING,
    [SUPPORT_FAQ_STATUS.TYPES.UPDATING]: SUPPORT_FAQ_STATUS.CATEGORIES.ACTIVE,
  };
  return categories[status] || SUPPORT_FAQ_STATUS.CATEGORIES.PENDING;
}

export function supportFaqStatusCanTransition(
  status: SupportFaqStatusType,
  transition: SupportFaqStatusTransition
): boolean {
  const allowedTransitions: Record<SupportFaqStatusType, SupportFaqStatusTransition[]> = {
    [SUPPORT_FAQ_STATUS.TYPES.DRAFT]: [
      SUPPORT_FAQ_STATUS.TRANSITIONS.DRAFT_TO_PUBLISHED,
      SUPPORT_FAQ_STATUS.TRANSITIONS.DRAFT_TO_REVIEW,
    ],
    [SUPPORT_FAQ_STATUS.TYPES.REVIEW]: [
      SUPPORT_FAQ_STATUS.TRANSITIONS.REVIEW_TO_PUBLISHED,
      SUPPORT_FAQ_STATUS.TRANSITIONS.REVIEW_TO_DRAFT,
    ],
    [SUPPORT_FAQ_STATUS.TYPES.PUBLISHED]: [
      SUPPORT_FAQ_STATUS.TRANSITIONS.PUBLISHED_TO_UPDATING,
      SUPPORT_FAQ_STATUS.TRANSITIONS.PUBLISHED_TO_ARCHIVED,
    ],
    [SUPPORT_FAQ_STATUS.TYPES.UPDATING]: [SUPPORT_FAQ_STATUS.TRANSITIONS.UPDATING_TO_PUBLISHED],
    [SUPPORT_FAQ_STATUS.TYPES.ARCHIVED]: [SUPPORT_FAQ_STATUS.TRANSITIONS.ARCHIVED_TO_PUBLISHED],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}

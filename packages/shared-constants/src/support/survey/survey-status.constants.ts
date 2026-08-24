/**
 * Survey Status Constants
 * Status definitions for surveys
 */

export const SURVEY_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CLOSED: 'closed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    ACTIVE: '#green-500',
    PAUSED: '#yellow-500',
    COMPLETED: '#blue-500',
    CLOSED: '#gray-500',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    ACTIVE: '▶️',
    PAUSED: '⏸️',
    COMPLETED: '✅',
    CLOSED: '🔒',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_ACTIVE: 'draft_to_active',
    DRAFT_TO_CLOSED: 'draft_to_closed',
    ACTIVE_TO_PAUSED: 'active_to_paused',
    PAUSED_TO_ACTIVE: 'paused_to_active',
    ACTIVE_TO_COMPLETED: 'active_to_completed',
    COMPLETED_TO_CLOSED: 'completed_to_closed',
    CLOSED_TO_ARCHIVED: 'closed_to_archived',
    PAUSED_TO_COMPLETED: 'paused_to_completed',
  } as const,
} as const;

// Status Types
export type SurveyStatusType = (typeof SURVEY_STATUS.TYPES)[keyof typeof SURVEY_STATUS.TYPES];

// Status Categories
export type SurveyStatusCategory =
  (typeof SURVEY_STATUS.CATEGORIES)[keyof typeof SURVEY_STATUS.CATEGORIES];

// Status Colors
export type SurveyStatusColor = (typeof SURVEY_STATUS.COLORS)[keyof typeof SURVEY_STATUS.COLORS];

// Status Icons
export type SurveyStatusIcon = (typeof SURVEY_STATUS.ICONS)[keyof typeof SURVEY_STATUS.ICONS];

// Status Transitions
export type SurveyStatusTransition =
  (typeof SURVEY_STATUS.TRANSITIONS)[keyof typeof SURVEY_STATUS.TRANSITIONS];

// Utility Functions
export function surveyStatusGetLabel(status: SurveyStatusType): string {
  const labels: Record<SurveyStatusType, string> = {
    [SURVEY_STATUS.TYPES.DRAFT]: 'Draft',
    [SURVEY_STATUS.TYPES.ACTIVE]: 'Active',
    [SURVEY_STATUS.TYPES.PAUSED]: 'Paused',
    [SURVEY_STATUS.TYPES.COMPLETED]: 'Completed',
    [SURVEY_STATUS.TYPES.CLOSED]: 'Closed',
    [SURVEY_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function surveyStatusIsActive(status: SurveyStatusType): boolean {
  return status === SURVEY_STATUS.TYPES.ACTIVE;
}

export function surveyStatusIsCompleted(status: SurveyStatusType): boolean {
  return status === SURVEY_STATUS.TYPES.COMPLETED || status === SURVEY_STATUS.TYPES.CLOSED;
}

export function surveyStatusIsPending(status: SurveyStatusType): boolean {
  return status === SURVEY_STATUS.TYPES.DRAFT || status === SURVEY_STATUS.TYPES.PAUSED;
}

export function surveyStatusGetCategory(status: SurveyStatusType): SurveyStatusCategory {
  const categories: Record<SurveyStatusType, SurveyStatusCategory> = {
    [SURVEY_STATUS.TYPES.DRAFT]: SURVEY_STATUS.CATEGORIES.PENDING,
    [SURVEY_STATUS.TYPES.ACTIVE]: SURVEY_STATUS.CATEGORIES.ACTIVE,
    [SURVEY_STATUS.TYPES.PAUSED]: SURVEY_STATUS.CATEGORIES.PENDING,
    [SURVEY_STATUS.TYPES.COMPLETED]: SURVEY_STATUS.CATEGORIES.COMPLETED,
    [SURVEY_STATUS.TYPES.CLOSED]: SURVEY_STATUS.CATEGORIES.CLOSED,
    [SURVEY_STATUS.TYPES.ARCHIVED]: SURVEY_STATUS.CATEGORIES.CLOSED,
  };
  return categories[status] || SURVEY_STATUS.CATEGORIES.PENDING;
}

export function surveyStatusCanTransition(
  status: SurveyStatusType,
  transition: SurveyStatusTransition
): boolean {
  const allowedTransitions: Record<SurveyStatusType, SurveyStatusTransition[]> = {
    [SURVEY_STATUS.TYPES.DRAFT]: [
      SURVEY_STATUS.TRANSITIONS.DRAFT_TO_ACTIVE,
      SURVEY_STATUS.TRANSITIONS.DRAFT_TO_CLOSED,
    ],
    [SURVEY_STATUS.TYPES.ACTIVE]: [
      SURVEY_STATUS.TRANSITIONS.ACTIVE_TO_PAUSED,
      SURVEY_STATUS.TRANSITIONS.ACTIVE_TO_COMPLETED,
    ],
    [SURVEY_STATUS.TYPES.PAUSED]: [
      SURVEY_STATUS.TRANSITIONS.PAUSED_TO_ACTIVE,
      SURVEY_STATUS.TRANSITIONS.PAUSED_TO_COMPLETED,
    ],
    [SURVEY_STATUS.TYPES.COMPLETED]: [SURVEY_STATUS.TRANSITIONS.COMPLETED_TO_CLOSED],
    [SURVEY_STATUS.TYPES.CLOSED]: [SURVEY_STATUS.TRANSITIONS.CLOSED_TO_ARCHIVED],
    [SURVEY_STATUS.TYPES.ARCHIVED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}

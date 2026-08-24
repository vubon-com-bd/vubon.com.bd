/**
 * Feedback Constants
 * Configuration for customer feedback
 */

export const SUPPORT_FEEDBACK = {
  // Feedback Types
  TYPES: {
    GENERAL: 'general',
    COMPLAINT: 'complaint',
    SUGGESTION: 'suggestion',
    PRAISE: 'praise',
    BUG_REPORT: 'bug_report',
    FEATURE_REQUEST: 'feature_request',
    SURVEY: 'survey',
    RATING: 'rating',
    REVIEW: 'review',
    TESTIMONIAL: 'testimonial',
  } as const,

  // Feedback Statuses
  STATUS: {
    PENDING: 'pending',
    REVIEW: 'review',
    ACKNOWLEDGED: 'acknowledged',
    RESPONDED: 'responded',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
  } as const,

  // Feedback Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Feedback Ratings
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,

  // Feedback Channels
  CHANNELS: {
    EMAIL: 'email',
    CHAT: 'chat',
    PHONE: 'phone',
    SOCIAL: 'social',
    WEBSITE: 'website',
    APP: 'app',
    SURVEY: 'survey',
    API: 'api',
  } as const,

  // Feedback Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_COMMENT_LENGTH: 5000,
    MAX_ATTACHMENTS: 5,
    MAX_TAGS: 10,
  } as const,
} as const;

// Feedback Types
export type SupportFeedbackType =
  (typeof SUPPORT_FEEDBACK.TYPES)[keyof typeof SUPPORT_FEEDBACK.TYPES];

// Feedback Statuses
export type SupportFeedbackStatus =
  (typeof SUPPORT_FEEDBACK.STATUS)[keyof typeof SUPPORT_FEEDBACK.STATUS];

// Feedback Priorities
export type SupportFeedbackPriority =
  (typeof SUPPORT_FEEDBACK.PRIORITY)[keyof typeof SUPPORT_FEEDBACK.PRIORITY];

// Feedback Channels
export type SupportFeedbackChannel =
  (typeof SUPPORT_FEEDBACK.CHANNELS)[keyof typeof SUPPORT_FEEDBACK.CHANNELS];

// Utility Functions
export function supportFeedbackGetTypeLabel(type: SupportFeedbackType): string {
  const labels: Record<SupportFeedbackType, string> = {
    [SUPPORT_FEEDBACK.TYPES.GENERAL]: 'General',
    [SUPPORT_FEEDBACK.TYPES.COMPLAINT]: 'Complaint',
    [SUPPORT_FEEDBACK.TYPES.SUGGESTION]: 'Suggestion',
    [SUPPORT_FEEDBACK.TYPES.PRAISE]: 'Praise',
    [SUPPORT_FEEDBACK.TYPES.BUG_REPORT]: 'Bug Report',
    [SUPPORT_FEEDBACK.TYPES.FEATURE_REQUEST]: 'Feature Request',
    [SUPPORT_FEEDBACK.TYPES.SURVEY]: 'Survey',
    [SUPPORT_FEEDBACK.TYPES.RATING]: 'Rating',
    [SUPPORT_FEEDBACK.TYPES.REVIEW]: 'Review',
    [SUPPORT_FEEDBACK.TYPES.TESTIMONIAL]: 'Testimonial',
  };
  return labels[type] || 'Unknown';
}

export function supportFeedbackGetStatusLabel(status: SupportFeedbackStatus): string {
  const labels: Record<SupportFeedbackStatus, string> = {
    [SUPPORT_FEEDBACK.STATUS.PENDING]: 'Pending',
    [SUPPORT_FEEDBACK.STATUS.REVIEW]: 'In Review',
    [SUPPORT_FEEDBACK.STATUS.ACKNOWLEDGED]: 'Acknowledged',
    [SUPPORT_FEEDBACK.STATUS.RESPONDED]: 'Responded',
    [SUPPORT_FEEDBACK.STATUS.RESOLVED]: 'Resolved',
    [SUPPORT_FEEDBACK.STATUS.CLOSED]: 'Closed',
    [SUPPORT_FEEDBACK.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportFeedbackGetPriorityLabel(priority: SupportFeedbackPriority): string {
  const labels: Record<SupportFeedbackPriority, string> = {
    [SUPPORT_FEEDBACK.PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_FEEDBACK.PRIORITY.HIGH]: 'High',
    [SUPPORT_FEEDBACK.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_FEEDBACK.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportFeedbackGetChannelLabel(channel: SupportFeedbackChannel): string {
  const labels: Record<SupportFeedbackChannel, string> = {
    [SUPPORT_FEEDBACK.CHANNELS.EMAIL]: 'Email',
    [SUPPORT_FEEDBACK.CHANNELS.CHAT]: 'Chat',
    [SUPPORT_FEEDBACK.CHANNELS.PHONE]: 'Phone',
    [SUPPORT_FEEDBACK.CHANNELS.SOCIAL]: 'Social Media',
    [SUPPORT_FEEDBACK.CHANNELS.WEBSITE]: 'Website',
    [SUPPORT_FEEDBACK.CHANNELS.APP]: 'Mobile App',
    [SUPPORT_FEEDBACK.CHANNELS.SURVEY]: 'Survey',
    [SUPPORT_FEEDBACK.CHANNELS.API]: 'API',
  };
  return labels[channel] || 'Unknown';
}

export function supportFeedbackIsResolved(status: SupportFeedbackStatus): boolean {
  return status === SUPPORT_FEEDBACK.STATUS.RESOLVED || status === SUPPORT_FEEDBACK.STATUS.CLOSED;
}

export function supportFeedbackIsPending(status: SupportFeedbackStatus): boolean {
  return status === SUPPORT_FEEDBACK.STATUS.PENDING || status === SUPPORT_FEEDBACK.STATUS.REVIEW;
}

export function supportFeedbackIsPositive(type: SupportFeedbackType): boolean {
  const positiveTypes: SupportFeedbackType[] = [
    SUPPORT_FEEDBACK.TYPES.PRAISE,
    SUPPORT_FEEDBACK.TYPES.TESTIMONIAL,
  ];
  return positiveTypes.includes(type);
}

export function supportFeedbackIsNegative(type: SupportFeedbackType): boolean {
  const negativeTypes: SupportFeedbackType[] = [
    SUPPORT_FEEDBACK.TYPES.COMPLAINT,
    SUPPORT_FEEDBACK.TYPES.BUG_REPORT,
  ];
  return negativeTypes.includes(type);
}

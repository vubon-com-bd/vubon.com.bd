/**
 * Announcement Constants
 * Configuration for announcements, alerts, and notifications
 */

export const CONTENT_ANNOUNCEMENT = {
  // Announcement Types
  TYPES: {
    GENERAL: 'general',
    IMPORTANT: 'important',
    URGENT: 'urgent',
    PROMOTIONAL: 'promotional',
    EVENT: 'event',
    MAINTENANCE: 'maintenance',
    UPDATE: 'update',
    SECURITY: 'security',
    FEATURE: 'feature',
    SALE: 'sale',
    HOLIDAY: 'holiday',
    CUSTOM: 'custom',
  } as const,

  // Announcement Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Announcement Priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
    EMERGENCY: 'emergency',
  } as const,

  // Announcement Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    USER_GROUP: 'user_group',
    INDIVIDUAL: 'individual',
  } as const,

  // Announcement Channels
  CHANNELS: {
    IN_APP: 'in_app',
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    BANNER: 'banner',
    POPUP: 'popup',
    SLIDE: 'slide',
    CUSTOM: 'custom',
  } as const,

  // Announcement Targets
  TARGETS: {
    ALL_USERS: 'all_users',
    REGISTERED: 'registered',
    GUESTS: 'guests',
    PREMIUM: 'premium',
    SUBSCRIBERS: 'subscribers',
    VENDORS: 'vendors',
    CUSTOMERS: 'customers',
    TEAM: 'team',
    ADMIN: 'admin',
    CUSTOM: 'custom',
  } as const,

  // Announcement Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // Announcement Display
  DISPLAY: {
    BANNER: 'banner',
    MODAL: 'modal',
    TOAST: 'toast',
    NOTIFICATION: 'notification',
    ALERT: 'alert',
    POPUP: 'popup',
    SLIDE: 'slide',
    CUSTOM: 'custom',
  } as const,

  // Announcement Defaults
  DEFAULTS: {
    STATUS: 'draft',
    PRIORITY: 'medium',
    SCOPE: 'global',
    CHANNEL: 'in_app',
    TARGET: 'all_users',
    VISIBILITY: 'public',
    DISPLAY: 'banner',
    DURATION: 7, // days
    MAX_LENGTH: 500,
  } as const,

  // Announcement Limits
  LIMITS: {
    MAX_TITLE_LENGTH: 100,
    MAX_CONTENT_LENGTH: 2000,
    MAX_DURATION_DAYS: 365,
    MIN_DURATION_HOURS: 1,
  } as const,
} as const;

// Announcement Types
export type ContentAnnouncementType =
  (typeof CONTENT_ANNOUNCEMENT.TYPES)[keyof typeof CONTENT_ANNOUNCEMENT.TYPES];

// Announcement Statuses
export type ContentAnnouncementStatus =
  (typeof CONTENT_ANNOUNCEMENT.STATUSES)[keyof typeof CONTENT_ANNOUNCEMENT.STATUSES];

// Announcement Priorities
export type ContentAnnouncementPriority =
  (typeof CONTENT_ANNOUNCEMENT.PRIORITIES)[keyof typeof CONTENT_ANNOUNCEMENT.PRIORITIES];

// Announcement Scopes
export type ContentAnnouncementScope =
  (typeof CONTENT_ANNOUNCEMENT.SCOPES)[keyof typeof CONTENT_ANNOUNCEMENT.SCOPES];

// Announcement Channels
export type ContentAnnouncementChannel =
  (typeof CONTENT_ANNOUNCEMENT.CHANNELS)[keyof typeof CONTENT_ANNOUNCEMENT.CHANNELS];

// Announcement Targets
export type ContentAnnouncementTarget =
  (typeof CONTENT_ANNOUNCEMENT.TARGETS)[keyof typeof CONTENT_ANNOUNCEMENT.TARGETS];

// Announcement Visibility
export type ContentAnnouncementVisibility =
  (typeof CONTENT_ANNOUNCEMENT.VISIBILITY)[keyof typeof CONTENT_ANNOUNCEMENT.VISIBILITY];

// Announcement Display
export type ContentAnnouncementDisplay =
  (typeof CONTENT_ANNOUNCEMENT.DISPLAY)[keyof typeof CONTENT_ANNOUNCEMENT.DISPLAY];

// Utility Functions
export function contentAnnouncementGetTypeLabel(type: ContentAnnouncementType): string {
  const labels: Record<ContentAnnouncementType, string> = {
    [CONTENT_ANNOUNCEMENT.TYPES.GENERAL]: 'General Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.IMPORTANT]: 'Important Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.URGENT]: 'Urgent Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.PROMOTIONAL]: 'Promotional Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.EVENT]: 'Event Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.MAINTENANCE]: 'Maintenance Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.UPDATE]: 'Update Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.SECURITY]: 'Security Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.FEATURE]: 'Feature Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.SALE]: 'Sale Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.HOLIDAY]: 'Holiday Announcement',
    [CONTENT_ANNOUNCEMENT.TYPES.CUSTOM]: 'Custom Announcement',
  };
  return labels[type] || 'Unknown Announcement Type';
}

export function contentAnnouncementGetStatusLabel(status: ContentAnnouncementStatus): string {
  const labels: Record<ContentAnnouncementStatus, string> = {
    [CONTENT_ANNOUNCEMENT.STATUSES.DRAFT]: 'Draft',
    [CONTENT_ANNOUNCEMENT.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_ANNOUNCEMENT.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_ANNOUNCEMENT.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_ANNOUNCEMENT.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_ANNOUNCEMENT.STATUSES.APPROVED]: 'Approved',
    [CONTENT_ANNOUNCEMENT.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_ANNOUNCEMENT.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_ANNOUNCEMENT.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_ANNOUNCEMENT.STATUSES.EXPIRED]: 'Expired',
    [CONTENT_ANNOUNCEMENT.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_ANNOUNCEMENT.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentAnnouncementGetPriorityLabel(priority: ContentAnnouncementPriority): string {
  const labels: Record<ContentAnnouncementPriority, string> = {
    [CONTENT_ANNOUNCEMENT.PRIORITIES.LOW]: 'Low Priority',
    [CONTENT_ANNOUNCEMENT.PRIORITIES.MEDIUM]: 'Medium Priority',
    [CONTENT_ANNOUNCEMENT.PRIORITIES.HIGH]: 'High Priority',
    [CONTENT_ANNOUNCEMENT.PRIORITIES.CRITICAL]: 'Critical Priority',
    [CONTENT_ANNOUNCEMENT.PRIORITIES.EMERGENCY]: 'Emergency Priority',
  };
  return labels[priority] || 'Unknown Priority';
}

export function contentAnnouncementGetScopeLabel(scope: ContentAnnouncementScope): string {
  const labels: Record<ContentAnnouncementScope, string> = {
    [CONTENT_ANNOUNCEMENT.SCOPES.GLOBAL]: 'Global',
    [CONTENT_ANNOUNCEMENT.SCOPES.REGIONAL]: 'Regional',
    [CONTENT_ANNOUNCEMENT.SCOPES.LOCAL]: 'Local',
    [CONTENT_ANNOUNCEMENT.SCOPES.DEPARTMENT]: 'Department',
    [CONTENT_ANNOUNCEMENT.SCOPES.TEAM]: 'Team',
    [CONTENT_ANNOUNCEMENT.SCOPES.USER_GROUP]: 'User Group',
    [CONTENT_ANNOUNCEMENT.SCOPES.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function contentAnnouncementGetChannelLabel(channel: ContentAnnouncementChannel): string {
  const labels: Record<ContentAnnouncementChannel, string> = {
    [CONTENT_ANNOUNCEMENT.CHANNELS.IN_APP]: 'In-App',
    [CONTENT_ANNOUNCEMENT.CHANNELS.EMAIL]: 'Email',
    [CONTENT_ANNOUNCEMENT.CHANNELS.SMS]: 'SMS',
    [CONTENT_ANNOUNCEMENT.CHANNELS.PUSH]: 'Push Notification',
    [CONTENT_ANNOUNCEMENT.CHANNELS.BANNER]: 'Banner',
    [CONTENT_ANNOUNCEMENT.CHANNELS.POPUP]: 'Popup',
    [CONTENT_ANNOUNCEMENT.CHANNELS.SLIDE]: 'Slide',
    [CONTENT_ANNOUNCEMENT.CHANNELS.CUSTOM]: 'Custom Channel',
  };
  return labels[channel] || 'Unknown Channel';
}

export function contentAnnouncementGetTargetLabel(target: ContentAnnouncementTarget): string {
  const labels: Record<ContentAnnouncementTarget, string> = {
    [CONTENT_ANNOUNCEMENT.TARGETS.ALL_USERS]: 'All Users',
    [CONTENT_ANNOUNCEMENT.TARGETS.REGISTERED]: 'Registered Users',
    [CONTENT_ANNOUNCEMENT.TARGETS.GUESTS]: 'Guests',
    [CONTENT_ANNOUNCEMENT.TARGETS.PREMIUM]: 'Premium Users',
    [CONTENT_ANNOUNCEMENT.TARGETS.SUBSCRIBERS]: 'Subscribers',
    [CONTENT_ANNOUNCEMENT.TARGETS.VENDORS]: 'Vendors',
    [CONTENT_ANNOUNCEMENT.TARGETS.CUSTOMERS]: 'Customers',
    [CONTENT_ANNOUNCEMENT.TARGETS.TEAM]: 'Team Members',
    [CONTENT_ANNOUNCEMENT.TARGETS.ADMIN]: 'Admin Users',
    [CONTENT_ANNOUNCEMENT.TARGETS.CUSTOM]: 'Custom Target',
  };
  return labels[target] || 'Unknown Target';
}

export function contentAnnouncementGetVisibilityLabel(
  visibility: ContentAnnouncementVisibility
): string {
  const labels: Record<ContentAnnouncementVisibility, string> = {
    [CONTENT_ANNOUNCEMENT.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_ANNOUNCEMENT.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentAnnouncementGetDisplayLabel(display: ContentAnnouncementDisplay): string {
  const labels: Record<ContentAnnouncementDisplay, string> = {
    [CONTENT_ANNOUNCEMENT.DISPLAY.BANNER]: 'Banner',
    [CONTENT_ANNOUNCEMENT.DISPLAY.MODAL]: 'Modal',
    [CONTENT_ANNOUNCEMENT.DISPLAY.TOAST]: 'Toast',
    [CONTENT_ANNOUNCEMENT.DISPLAY.NOTIFICATION]: 'Notification',
    [CONTENT_ANNOUNCEMENT.DISPLAY.ALERT]: 'Alert',
    [CONTENT_ANNOUNCEMENT.DISPLAY.POPUP]: 'Popup',
    [CONTENT_ANNOUNCEMENT.DISPLAY.SLIDE]: 'Slide',
    [CONTENT_ANNOUNCEMENT.DISPLAY.CUSTOM]: 'Custom Display',
  };
  return labels[display] || 'Unknown Display';
}

export function contentAnnouncementIsPublished(status: ContentAnnouncementStatus): boolean {
  const publishedStatuses: ContentAnnouncementStatus[] = [
    CONTENT_ANNOUNCEMENT.STATUSES.PUBLISHED,
    CONTENT_ANNOUNCEMENT.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentAnnouncementIsEditable(status: ContentAnnouncementStatus): boolean {
  const editableStatuses: ContentAnnouncementStatus[] = [
    CONTENT_ANNOUNCEMENT.STATUSES.DRAFT,
    CONTENT_ANNOUNCEMENT.STATUSES.PENDING_REVIEW,
    CONTENT_ANNOUNCEMENT.STATUSES.IN_REVIEW,
    CONTENT_ANNOUNCEMENT.STATUSES.REVIEWED,
    CONTENT_ANNOUNCEMENT.STATUSES.PENDING_APPROVAL,
    CONTENT_ANNOUNCEMENT.STATUSES.REJECTED,
  ];
  return editableStatuses.includes(status);
}

export function contentAnnouncementIsActive(status: ContentAnnouncementStatus): boolean {
  const activeStatuses: ContentAnnouncementStatus[] = [
    CONTENT_ANNOUNCEMENT.STATUSES.PUBLISHED,
    CONTENT_ANNOUNCEMENT.STATUSES.SCHEDULED,
    CONTENT_ANNOUNCEMENT.STATUSES.APPROVED,
  ];
  return activeStatuses.includes(status);
}

export function contentAnnouncementGetDefaultStatus(): ContentAnnouncementStatus {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.STATUS as ContentAnnouncementStatus;
}

export function contentAnnouncementGetDefaultPriority(): ContentAnnouncementPriority {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.PRIORITY as ContentAnnouncementPriority;
}

export function contentAnnouncementGetDefaultScope(): ContentAnnouncementScope {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.SCOPE as ContentAnnouncementScope;
}

export function contentAnnouncementGetDefaultChannel(): ContentAnnouncementChannel {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.CHANNEL as ContentAnnouncementChannel;
}

export function contentAnnouncementGetDefaultTarget(): ContentAnnouncementTarget {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.TARGET as ContentAnnouncementTarget;
}

export function contentAnnouncementGetDefaultDisplay(): ContentAnnouncementDisplay {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.DISPLAY as ContentAnnouncementDisplay;
}

export function contentAnnouncementGetDefaultDuration(): number {
  return CONTENT_ANNOUNCEMENT.DEFAULTS.DURATION;
}

export function contentAnnouncementGetMaxTitleLength(): number {
  return CONTENT_ANNOUNCEMENT.LIMITS.MAX_TITLE_LENGTH;
}

export function contentAnnouncementGetMaxContentLength(): number {
  return CONTENT_ANNOUNCEMENT.LIMITS.MAX_CONTENT_LENGTH;
}

export function contentAnnouncementIsValidType(type: string): type is ContentAnnouncementType {
  return Object.values(CONTENT_ANNOUNCEMENT.TYPES).includes(type as ContentAnnouncementType);
}

export function contentAnnouncementIsValidStatus(
  status: string
): status is ContentAnnouncementStatus {
  return Object.values(CONTENT_ANNOUNCEMENT.STATUSES).includes(status as ContentAnnouncementStatus);
}

export function contentAnnouncementIsValidPriority(
  priority: string
): priority is ContentAnnouncementPriority {
  return Object.values(CONTENT_ANNOUNCEMENT.PRIORITIES).includes(
    priority as ContentAnnouncementPriority
  );
}

export function contentAnnouncementIsValidScope(scope: string): scope is ContentAnnouncementScope {
  return Object.values(CONTENT_ANNOUNCEMENT.SCOPES).includes(scope as ContentAnnouncementScope);
}

export function contentAnnouncementIsValidChannel(
  channel: string
): channel is ContentAnnouncementChannel {
  return Object.values(CONTENT_ANNOUNCEMENT.CHANNELS).includes(
    channel as ContentAnnouncementChannel
  );
}

export function contentAnnouncementIsValidTarget(
  target: string
): target is ContentAnnouncementTarget {
  return Object.values(CONTENT_ANNOUNCEMENT.TARGETS).includes(target as ContentAnnouncementTarget);
}

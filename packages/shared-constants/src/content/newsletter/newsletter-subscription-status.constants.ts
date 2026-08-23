/**
 * Newsletter Subscription Status Constants
 * Status definitions for subscription lifecycle
 */

export const CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS = {
  // Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    UNSUBSCRIBED: 'unsubscribed',
    BOUNCED: 'bounced',
    SPAM: 'spam',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    TERMINATED: 'terminated',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#10B981',
    INACTIVE: '#6B7280',
    PENDING: '#F59E0B',
    SUSPENDED: '#F59E0B',
    CANCELLED: '#EF4444',
    EXPIRED: '#6B7280',
    UNSUBSCRIBED: '#6B7280',
    BOUNCED: '#EF4444',
    SPAM: '#EF4444',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    ACTIVE: 0,
    PENDING: 1,
    SUSPENDED: 2,
    INACTIVE: 3,
    EXPIRED: 4,
    UNSUBSCRIBED: 5,
    CANCELLED: 6,
    BOUNCED: 7,
    SPAM: 8,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING: ['active', 'cancelled', 'bounced'],
    ACTIVE: ['inactive', 'suspended', 'cancelled', 'unsubscribed', 'expired'],
    INACTIVE: ['active', 'cancelled', 'unsubscribed'],
    SUSPENDED: ['active', 'cancelled', 'unsubscribed'],
    CANCELLED: ['active'],
    EXPIRED: ['active', 'cancelled'],
    UNSUBSCRIBED: ['active'],
    BOUNCED: ['active', 'inactive'],
    SPAM: ['active'],
  } as const,

  // Subscription State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Subscription Action Types
  ACTIONS: {
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
    RESUBSCRIBE: 'resubscribe',
    SUSPEND: 'suspend',
    REINSTATE: 'reinstate',
    UPDATE: 'update',
    DELETE: 'delete',
    RESTORE: 'restore',
  } as const,
} as const;

// Subscription Statuses
export type ContentNewsletterSubscriptionStatusType =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES];

// Status Categories
export type ContentNewsletterSubscriptionStatusCategory =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES];

// Status Colors
export type ContentNewsletterSubscriptionStatusColor =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS];

// Status Priority
export type ContentNewsletterSubscriptionStatusPriority =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY];

// Subscription State
export type ContentNewsletterSubscriptionState =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE];

// Subscription Actions
export type ContentNewsletterSubscriptionAction =
  (typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS)[keyof typeof CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS];

// Utility Functions
export function contentNewsletterSubscriptionStatusGetLabel(
  status: ContentNewsletterSubscriptionStatusType
): string {
  const labels: Record<ContentNewsletterSubscriptionStatusType, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.ACTIVE]: 'Active',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.PENDING]: 'Pending',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SUSPENDED]: 'Suspended',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.EXPIRED]: 'Expired',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.UNSUBSCRIBED]: 'Unsubscribed',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.BOUNCED]: 'Bounced',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown Status';
}

export function contentNewsletterSubscriptionStatusGetCategory(
  status: ContentNewsletterSubscriptionStatusType
): ContentNewsletterSubscriptionStatusCategory {
  const categories: Record<
    ContentNewsletterSubscriptionStatusType,
    ContentNewsletterSubscriptionStatusCategory
  > = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.ACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.ACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.PENDING]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.PENDING,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SUSPENDED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.INACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.INACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.INACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.CANCELLED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.EXPIRED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.UNSUBSCRIBED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.BOUNCED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SPAM]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.CATEGORIES.INACTIVE;
}

export function contentNewsletterSubscriptionStatusGetColor(
  status: ContentNewsletterSubscriptionStatusType
): ContentNewsletterSubscriptionStatusColor {
  const colorMap: Record<
    ContentNewsletterSubscriptionStatusType,
    ContentNewsletterSubscriptionStatusColor
  > = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.ACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.ACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.PENDING]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.PENDING,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SUSPENDED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.SUSPENDED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.INACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.INACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.CANCELLED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.CANCELLED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.EXPIRED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.EXPIRED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.UNSUBSCRIBED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.UNSUBSCRIBED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.BOUNCED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.BOUNCED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SPAM]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.COLORS.SPAM,
  };
  return colorMap[status] || '#6B7280';
}

export function contentNewsletterSubscriptionStatusGetPriority(
  status: ContentNewsletterSubscriptionStatusType
): ContentNewsletterSubscriptionStatusPriority {
  const priorityMap: Record<
    ContentNewsletterSubscriptionStatusType,
    ContentNewsletterSubscriptionStatusPriority
  > = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.ACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.ACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.PENDING]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.PENDING,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SUSPENDED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.SUSPENDED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.INACTIVE]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.INACTIVE,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.CANCELLED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.CANCELLED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.EXPIRED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.EXPIRED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.UNSUBSCRIBED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.UNSUBSCRIBED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.BOUNCED]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.BOUNCED,
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SPAM]:
      CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.PRIORITY.SPAM,
  };
  return priorityMap[status] || 0;
}

export function contentNewsletterSubscriptionStatusIsActive(
  status: ContentNewsletterSubscriptionStatusType
): boolean {
  const activeStatuses: ContentNewsletterSubscriptionStatusType[] = [
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.ACTIVE,
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.PENDING,
  ];
  return activeStatuses.includes(status);
}

export function contentNewsletterSubscriptionStatusIsTerminated(
  status: ContentNewsletterSubscriptionStatusType
): boolean {
  const terminatedStatuses: ContentNewsletterSubscriptionStatusType[] = [
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.CANCELLED,
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.UNSUBSCRIBED,
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.EXPIRED,
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.BOUNCED,
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES.SPAM,
  ];
  return terminatedStatuses.includes(status);
}

export function contentNewsletterSubscriptionStatusCanTransitionTo(
  currentStatus: ContentNewsletterSubscriptionStatusType,
  targetStatus: ContentNewsletterSubscriptionStatusType
): boolean {
  const transitions: Record<string, readonly string[]> =
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentNewsletterSubscriptionStatusGetAvailableTransitions(
  currentStatus: ContentNewsletterSubscriptionStatusType
): ContentNewsletterSubscriptionStatusType[] {
  const transitions: Record<string, readonly string[]> =
    CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentNewsletterSubscriptionStatusType[];
}

export function contentNewsletterSubscriptionStatusGetStateLabel(
  state: ContentNewsletterSubscriptionState
): string {
  const labels: Record<ContentNewsletterSubscriptionState, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentNewsletterSubscriptionStatusGetActionLabel(
  action: ContentNewsletterSubscriptionAction
): string {
  const labels: Record<ContentNewsletterSubscriptionAction, string> = {
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.SUBSCRIBE]: 'Subscribe',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.UNSUBSCRIBE]: 'Unsubscribe',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.RESUBSCRIBE]: 'Resubscribe',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.SUSPEND]: 'Suspend',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.REINSTATE]: 'Reinstate',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.UPDATE]: 'Update Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.DELETE]: 'Delete Subscription',
    [CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.ACTIONS.RESTORE]: 'Restore Subscription',
  };
  return labels[action] || 'Unknown Action';
}

export function contentNewsletterSubscriptionStatusIsValid(
  status: string
): status is ContentNewsletterSubscriptionStatusType {
  return Object.values(CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATUSES).includes(
    status as ContentNewsletterSubscriptionStatusType
  );
}

export function contentNewsletterSubscriptionStatusIsValidState(
  state: string
): state is ContentNewsletterSubscriptionState {
  return Object.values(CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS.STATE).includes(
    state as ContentNewsletterSubscriptionState
  );
}

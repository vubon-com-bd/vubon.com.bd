/**
 * Support Push Type Constants
 * Types of support push notifications
 */

export const SUPPORT_PUSH_TYPE = {
  // Push Categories
  CATEGORIES: {
    TICKET: 'ticket',
    MESSAGE: 'message',
    UPDATE: 'update',
    REMINDER: 'reminder',
    ALERT: 'alert',
    GENERAL: 'general',
  } as const,

  // Push Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    USER: 'user',
  } as const,

  // Push Channels
  CHANNELS: {
    WEB: 'web',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
    IN_APP: 'in_app',
  } as const,

  // Push Actions
  ACTIONS: {
    VIEW: 'view',
    REPLY: 'reply',
    DISMISS: 'dismiss',
    SNOOZE: 'snooze',
    ESCALATE: 'escalate',
    RESOLVE: 'resolve',
  } as const,

  // Push Sounds
  SOUNDS: {
    DEFAULT: 'default',
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    CUSTOM: 'custom',
  } as const,

  // Push Urgencies
  URGENCIES: {
    IMMEDIATE: 'immediate',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Push Categories
export type SupportPushTypeCategory =
  (typeof SUPPORT_PUSH_TYPE.CATEGORIES)[keyof typeof SUPPORT_PUSH_TYPE.CATEGORIES];

// Push Scopes
export type SupportPushTypeScope =
  (typeof SUPPORT_PUSH_TYPE.SCOPES)[keyof typeof SUPPORT_PUSH_TYPE.SCOPES];

// Push Channels
export type SupportPushTypeChannel =
  (typeof SUPPORT_PUSH_TYPE.CHANNELS)[keyof typeof SUPPORT_PUSH_TYPE.CHANNELS];

// Push Actions
export type SupportPushTypeAction =
  (typeof SUPPORT_PUSH_TYPE.ACTIONS)[keyof typeof SUPPORT_PUSH_TYPE.ACTIONS];

// Push Sounds
export type SupportPushTypeSound =
  (typeof SUPPORT_PUSH_TYPE.SOUNDS)[keyof typeof SUPPORT_PUSH_TYPE.SOUNDS];

// Push Urgencies
export type SupportPushTypeUrgency =
  (typeof SUPPORT_PUSH_TYPE.URGENCIES)[keyof typeof SUPPORT_PUSH_TYPE.URGENCIES];

// Utility Functions
export function supportPushTypeGetCategoryLabel(category: SupportPushTypeCategory): string {
  const labels: Record<SupportPushTypeCategory, string> = {
    [SUPPORT_PUSH_TYPE.CATEGORIES.TICKET]: 'Ticket',
    [SUPPORT_PUSH_TYPE.CATEGORIES.MESSAGE]: 'Message',
    [SUPPORT_PUSH_TYPE.CATEGORIES.UPDATE]: 'Update',
    [SUPPORT_PUSH_TYPE.CATEGORIES.REMINDER]: 'Reminder',
    [SUPPORT_PUSH_TYPE.CATEGORIES.ALERT]: 'Alert',
    [SUPPORT_PUSH_TYPE.CATEGORIES.GENERAL]: 'General',
  };
  return labels[category] || 'Unknown';
}

export function supportPushTypeGetScopeLabel(scope: SupportPushTypeScope): string {
  const labels: Record<SupportPushTypeScope, string> = {
    [SUPPORT_PUSH_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_PUSH_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_PUSH_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_PUSH_TYPE.SCOPES.USER]: 'User',
  };
  return labels[scope] || 'Unknown';
}

export function supportPushTypeGetChannelLabel(channel: SupportPushTypeChannel): string {
  const labels: Record<SupportPushTypeChannel, string> = {
    [SUPPORT_PUSH_TYPE.CHANNELS.WEB]: 'Web',
    [SUPPORT_PUSH_TYPE.CHANNELS.MOBILE]: 'Mobile',
    [SUPPORT_PUSH_TYPE.CHANNELS.DESKTOP]: 'Desktop',
    [SUPPORT_PUSH_TYPE.CHANNELS.IN_APP]: 'In-App',
  };
  return labels[channel] || 'Unknown';
}

export function supportPushTypeGetActionLabel(action: SupportPushTypeAction): string {
  const labels: Record<SupportPushTypeAction, string> = {
    [SUPPORT_PUSH_TYPE.ACTIONS.VIEW]: 'View',
    [SUPPORT_PUSH_TYPE.ACTIONS.REPLY]: 'Reply',
    [SUPPORT_PUSH_TYPE.ACTIONS.DISMISS]: 'Dismiss',
    [SUPPORT_PUSH_TYPE.ACTIONS.SNOOZE]: 'Snooze',
    [SUPPORT_PUSH_TYPE.ACTIONS.ESCALATE]: 'Escalate',
    [SUPPORT_PUSH_TYPE.ACTIONS.RESOLVE]: 'Resolve',
  };
  return labels[action] || 'Unknown';
}

export function supportPushTypeGetSoundLabel(sound: SupportPushTypeSound): string {
  const labels: Record<SupportPushTypeSound, string> = {
    [SUPPORT_PUSH_TYPE.SOUNDS.DEFAULT]: 'Default',
    [SUPPORT_PUSH_TYPE.SOUNDS.ALERT]: 'Alert',
    [SUPPORT_PUSH_TYPE.SOUNDS.NOTIFICATION]: 'Notification',
    [SUPPORT_PUSH_TYPE.SOUNDS.CUSTOM]: 'Custom',
  };
  return labels[sound] || 'Unknown';
}

export function supportPushTypeGetUrgencyLabel(urgency: SupportPushTypeUrgency): string {
  const labels: Record<SupportPushTypeUrgency, string> = {
    [SUPPORT_PUSH_TYPE.URGENCIES.IMMEDIATE]: 'Immediate',
    [SUPPORT_PUSH_TYPE.URGENCIES.HIGH]: 'High',
    [SUPPORT_PUSH_TYPE.URGENCIES.MEDIUM]: 'Medium',
    [SUPPORT_PUSH_TYPE.URGENCIES.LOW]: 'Low',
  };
  return labels[urgency] || 'Unknown';
}

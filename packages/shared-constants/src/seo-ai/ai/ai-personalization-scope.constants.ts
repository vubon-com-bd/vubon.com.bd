/**
 * AI পার্সোনালাইজেশন স্কোপ এনাম
 */
export const AI_PERSONALIZATION_SCOPE = {
  PROFILE: 'profile',
  SESSION: 'session',
  DEVICE: 'device',
  LOCATION: 'location',
  TIME: 'time',
  WEBSITE: 'website',
  APP: 'app',
  CROSS_PLATFORM: 'cross-platform',
} as const;

/**
 * AI_PERSONALIZATION_SCOPE থেকে টাইপ
 */
export type AIPersonalizationScope =
  (typeof AI_PERSONALIZATION_SCOPE)[keyof typeof AI_PERSONALIZATION_SCOPE];

/**
 * পার্সোনালাইজেশন স্কোপ লেবেল
 */
export const AI_PERSONALIZATION_SCOPE_LABELS: Record<AIPersonalizationScope, string> = {
  [AI_PERSONALIZATION_SCOPE.PROFILE]: 'Profile',
  [AI_PERSONALIZATION_SCOPE.SESSION]: 'Session',
  [AI_PERSONALIZATION_SCOPE.DEVICE]: 'Device',
  [AI_PERSONALIZATION_SCOPE.LOCATION]: 'Location',
  [AI_PERSONALIZATION_SCOPE.TIME]: 'Time',
  [AI_PERSONALIZATION_SCOPE.WEBSITE]: 'Website',
  [AI_PERSONALIZATION_SCOPE.APP]: 'App',
  [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM]: 'Cross Platform',
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ বিবরণ
 */
export const AI_PERSONALIZATION_SCOPE_DESCRIPTIONS: Record<AIPersonalizationScope, string> = {
  [AI_PERSONALIZATION_SCOPE.PROFILE]: 'Personalization based on user profile and preferences',
  [AI_PERSONALIZATION_SCOPE.SESSION]:
    'Personalization based on current session behavior and context',
  [AI_PERSONALIZATION_SCOPE.DEVICE]: 'Personalization based on device type and capabilities',
  [AI_PERSONALIZATION_SCOPE.LOCATION]: 'Personalization based on geographic location',
  [AI_PERSONALIZATION_SCOPE.TIME]: 'Personalization based on time of day and temporal patterns',
  [AI_PERSONALIZATION_SCOPE.WEBSITE]: 'Personalization specific to website platform',
  [AI_PERSONALIZATION_SCOPE.APP]: 'Personalization specific to mobile application platform',
  [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM]:
    'Personalization across multiple platforms and devices',
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ আইকন
 */
export const AI_PERSONALIZATION_SCOPE_ICONS: Record<AIPersonalizationScope, string> = {
  [AI_PERSONALIZATION_SCOPE.PROFILE]: '👤',
  [AI_PERSONALIZATION_SCOPE.SESSION]: '🔄',
  [AI_PERSONALIZATION_SCOPE.DEVICE]: '📱',
  [AI_PERSONALIZATION_SCOPE.LOCATION]: '📍',
  [AI_PERSONALIZATION_SCOPE.TIME]: '🕐',
  [AI_PERSONALIZATION_SCOPE.WEBSITE]: '🌐',
  [AI_PERSONALIZATION_SCOPE.APP]: '📲',
  [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM]: '🔗',
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ লেভেল (সংখ্যাসূচক মান)
 */
export const AI_PERSONALIZATION_SCOPE_LEVEL: Record<AIPersonalizationScope, number> = {
  [AI_PERSONALIZATION_SCOPE.PROFILE]: 0,
  [AI_PERSONALIZATION_SCOPE.SESSION]: 1,
  [AI_PERSONALIZATION_SCOPE.DEVICE]: 2,
  [AI_PERSONALIZATION_SCOPE.LOCATION]: 3,
  [AI_PERSONALIZATION_SCOPE.TIME]: 4,
  [AI_PERSONALIZATION_SCOPE.WEBSITE]: 5,
  [AI_PERSONALIZATION_SCOPE.APP]: 6,
  [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM]: 7,
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ কনফিগারেশন
 */
export interface AIPersonalizationScopeConfig {
  scope: AIPersonalizationScope;
  label: string;
  description: string;
  icon: string;
  level: number;
  requiresUserAuth: boolean;
  requiresSession: boolean;
  requiresDeviceInfo: boolean;
  requiresLocation: boolean;
  requiresTimeContext: boolean;
  isCrossPlatform: boolean;
  persistenceDuration: string;
}

/**
 * পার্সোনালাইজেশন স্কোপ মেটাডেটা
 */
export const AI_PERSONALIZATION_SCOPE_METADATA: Record<
  AIPersonalizationScope,
  AIPersonalizationScopeConfig
> = {
  [AI_PERSONALIZATION_SCOPE.PROFILE]: {
    scope: AI_PERSONALIZATION_SCOPE.PROFILE,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.PROFILE],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.PROFILE],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.PROFILE],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.PROFILE],
    requiresUserAuth: true,
    requiresSession: false,
    requiresDeviceInfo: false,
    requiresLocation: false,
    requiresTimeContext: false,
    isCrossPlatform: true,
    persistenceDuration: 'permanent',
  },
  [AI_PERSONALIZATION_SCOPE.SESSION]: {
    scope: AI_PERSONALIZATION_SCOPE.SESSION,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.SESSION],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.SESSION],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.SESSION],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.SESSION],
    requiresUserAuth: false,
    requiresSession: true,
    requiresDeviceInfo: false,
    requiresLocation: false,
    requiresTimeContext: true,
    isCrossPlatform: false,
    persistenceDuration: 'session',
  },
  [AI_PERSONALIZATION_SCOPE.DEVICE]: {
    scope: AI_PERSONALIZATION_SCOPE.DEVICE,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.DEVICE],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.DEVICE],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.DEVICE],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.DEVICE],
    requiresUserAuth: false,
    requiresSession: false,
    requiresDeviceInfo: true,
    requiresLocation: false,
    requiresTimeContext: false,
    isCrossPlatform: false,
    persistenceDuration: '30 days',
  },
  [AI_PERSONALIZATION_SCOPE.LOCATION]: {
    scope: AI_PERSONALIZATION_SCOPE.LOCATION,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.LOCATION],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.LOCATION],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.LOCATION],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.LOCATION],
    requiresUserAuth: false,
    requiresSession: false,
    requiresDeviceInfo: false,
    requiresLocation: true,
    requiresTimeContext: false,
    isCrossPlatform: true,
    persistenceDuration: 'session',
  },
  [AI_PERSONALIZATION_SCOPE.TIME]: {
    scope: AI_PERSONALIZATION_SCOPE.TIME,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.TIME],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.TIME],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.TIME],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.TIME],
    requiresUserAuth: false,
    requiresSession: false,
    requiresDeviceInfo: false,
    requiresLocation: false,
    requiresTimeContext: true,
    isCrossPlatform: true,
    persistenceDuration: 'realtime',
  },
  [AI_PERSONALIZATION_SCOPE.WEBSITE]: {
    scope: AI_PERSONALIZATION_SCOPE.WEBSITE,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.WEBSITE],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.WEBSITE],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.WEBSITE],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.WEBSITE],
    requiresUserAuth: false,
    requiresSession: true,
    requiresDeviceInfo: false,
    requiresLocation: false,
    requiresTimeContext: false,
    isCrossPlatform: false,
    persistenceDuration: '30 days',
  },
  [AI_PERSONALIZATION_SCOPE.APP]: {
    scope: AI_PERSONALIZATION_SCOPE.APP,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.APP],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.APP],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.APP],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.APP],
    requiresUserAuth: false,
    requiresSession: true,
    requiresDeviceInfo: true,
    requiresLocation: false,
    requiresTimeContext: false,
    isCrossPlatform: false,
    persistenceDuration: '90 days',
  },
  [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM]: {
    scope: AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM,
    label: AI_PERSONALIZATION_SCOPE_LABELS[AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM],
    description: AI_PERSONALIZATION_SCOPE_DESCRIPTIONS[AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM],
    icon: AI_PERSONALIZATION_SCOPE_ICONS[AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM],
    level: AI_PERSONALIZATION_SCOPE_LEVEL[AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM],
    requiresUserAuth: true,
    requiresSession: false,
    requiresDeviceInfo: false,
    requiresLocation: false,
    requiresTimeContext: false,
    isCrossPlatform: true,
    persistenceDuration: 'permanent',
  },
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ গ্রুপ
 */
export const AI_PERSONALIZATION_SCOPE_GROUPS = {
  USER_CENTRIC: [AI_PERSONALIZATION_SCOPE.PROFILE, AI_PERSONALIZATION_SCOPE.SESSION] as const,
  CONTEXT_CENTRIC: [
    AI_PERSONALIZATION_SCOPE.DEVICE,
    AI_PERSONALIZATION_SCOPE.LOCATION,
    AI_PERSONALIZATION_SCOPE.TIME,
  ] as const,
  PLATFORM_CENTRIC: [AI_PERSONALIZATION_SCOPE.WEBSITE, AI_PERSONALIZATION_SCOPE.APP] as const,
  CROSS_PLATFORM: [AI_PERSONALIZATION_SCOPE.CROSS_PLATFORM] as const,
} as const;

/**
 * পার্সোনালাইজেশন স্কোপ গ্রুপ লেবেল
 */
export const AI_PERSONALIZATION_SCOPE_GROUP_LABELS = {
  USER_CENTRIC: 'User Centric',
  CONTEXT_CENTRIC: 'Context Centric',
  PLATFORM_CENTRIC: 'Platform Centric',
  CROSS_PLATFORM: 'Cross Platform',
} as const;

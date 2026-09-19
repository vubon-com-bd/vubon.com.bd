export const SEO_PRIORITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export const SEO_PRIORITY_WEIGHT = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
} as const;

export type SeoPriorityType = (typeof SEO_PRIORITY)[keyof typeof SEO_PRIORITY];

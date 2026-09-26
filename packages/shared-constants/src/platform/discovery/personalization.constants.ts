export const PERSONALIZATION_TYPE = {
  BEHAVIORAL: 'behavioral',
  DEMOGRAPHIC: 'demographic',
  GEOGRAPHIC: 'geographic',
  CONTEXTUAL: 'contextual',
  TEMPORAL: 'temporal',
  DEVICE_BASED: 'device_based',
  INTEREST_BASED: 'interest_based',
  PURCHASE_HISTORY: 'purchase_history',
  BROWSING_HISTORY: 'browsing_history',
} as const;

export const PERSONALIZATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LEARNING: 'learning',
  TRAINED: 'trained',
  EXPIRED: 'expired',
} as const;

export const PERSONALIZATION = {
  ENABLED: true,
  MIN_INTERACTIONS: 5,
  MAX_INTERESTS: 50,
  HISTORY_DAYS: 90,
  SESSION_WINDOW_HOURS: 24,
  ANONYMIZE_DATA: true,
  CONSENT_REQUIRED: true,
  RETENTION_DAYS: 365,
  REFRESH_INTERVAL_HOURS: 6,
} as const;

export type PersonalizationTypeType =
  (typeof PERSONALIZATION_TYPE)[keyof typeof PERSONALIZATION_TYPE];
export type PersonalizationStatusType =
  (typeof PERSONALIZATION_STATUS)[keyof typeof PERSONALIZATION_STATUS];

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  UNQUALIFIED: 'unqualified',
  CONVERTED: 'converted',
  LOST: 'lost',
  NURTURING: 'nurturing',
  CLOSED: 'closed',
} as const;

export const LEAD_SOURCE = {
  WEBSITE: 'website',
  LANDING_PAGE: 'landing_page',
  SOCIAL_MEDIA: 'social_media',
  EMAIL: 'email',
  REFERRAL: 'referral',
  PAID_AD: 'paid_ad',
  ORGANIC_SEARCH: 'organic_search',
  EVENT: 'event',
  WEBINAR: 'webinar',
  COLD_CALL: 'cold_call',
  IMPORT: 'import',
  API: 'api',
} as const;

export const LEAD_QUALITY = {
  HOT: 'hot',
  WARM: 'warm',
  COLD: 'cold',
  UNKNOWN: 'unknown',
} as const;

export const LEAD_GENERATION = {
  STATUS: LEAD_STATUS,
  SOURCE: LEAD_SOURCE,
  QUALITY: LEAD_QUALITY,
  NAME_MAX_LENGTH: 150,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MAX_LENGTH: 20,
  NOTES_MAX_LENGTH: 5000,
  MAX_LEADS_PER_DAY: 10000,
  MAX_LEADS_PER_USER: 1000,
  DEDUPLICATE: true,
  REQUIRE_EMAIL_OR_PHONE: true,
  AUTO_ASSIGN: false,
  AUTO_SCORE: true,
  RETENTION_DAYS: 730,
} as const;

export type LeadStatusType = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];
export type LeadSourceType = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];
export type LeadQualityType = (typeof LEAD_QUALITY)[keyof typeof LEAD_QUALITY];

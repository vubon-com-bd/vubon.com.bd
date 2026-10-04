export const SEO_AUDIT_TYPE = {
  FULL: 'full',
  QUICK: 'quick',
  TECHNICAL: 'technical',
  CONTENT: 'content',
  PERFORMANCE: 'performance',
  MOBILE: 'mobile',
  LOCAL: 'local',
} as const;

export const SEO_AUDIT_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
  CANCELLED: 'cancelled',
} as const;

export const SEO_AUDIT = {
  MAX_PAGES_PER_AUDIT: 1000,
  TIMEOUT_SECONDS: 300,
  SCHEDULE_FREQUENCY: 'weekly',
  AUTO_RUN: true,
  MAX_CONCURRENT: 5,
  RETENTION_DAYS: 90,
} as const;

export type SeoAuditTypeType = (typeof SEO_AUDIT_TYPE)[keyof typeof SEO_AUDIT_TYPE];
export type SeoAuditStatusType = (typeof SEO_AUDIT_STATUS)[keyof typeof SEO_AUDIT_STATUS];

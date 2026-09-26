import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SEO_CONFIG = Object.freeze({
  maxKeywordsPerPage: getOptionalEnvInt('SEO_MAX_KEYWORDS_PER_PAGE', 10),
  minScore: getOptionalEnvInt('SEO_MIN_SCORE', 60),
  auditIntervalDays: getOptionalEnvInt('SEO_AUDIT_INTERVAL_DAYS', 7),
} as const);

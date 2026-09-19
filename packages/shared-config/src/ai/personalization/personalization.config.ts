/**
 * AI personalization configuration
 * @module shared-config/ai/personalization
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PERSONALIZATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AI_PERSONALIZATION_ENABLED', true),
  minInteractions: getOptionalEnvInt('AI_PERSONALIZATION_MIN_INTERACTIONS', 5),
  maxInterests: getOptionalEnvInt('AI_PERSONALIZATION_MAX_INTERESTS', 50),
  historyDays: getOptionalEnvInt('AI_PERSONALIZATION_HISTORY_DAYS', 90),
  sessionWindowHours: getOptionalEnvInt('AI_PERSONALIZATION_SESSION_HOURS', 24),
  anonymizeData: getOptionalEnvBool('AI_PERSONALIZATION_ANONYMIZE', true),
  consentRequired: getOptionalEnvBool('AI_PERSONALIZATION_CONSENT', true),
  retentionDays: getOptionalEnvInt('AI_PERSONALIZATION_RETENTION_DAYS', 365),
  refreshIntervalHours: getOptionalEnvInt('AI_PERSONALIZATION_REFRESH_HOURS', 6),
});

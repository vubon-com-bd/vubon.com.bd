/**
 * Lead generation configuration
 * @module shared-config/marketing/lead-generation
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LEAD_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('LEAD_GEN_ENABLED', true),
  maxLeadsPerDay: getOptionalEnvInt('LEAD_MAX_PER_DAY', 10000),
  maxLeadsPerUser: getOptionalEnvInt('LEAD_MAX_PER_USER', 1000),
  deduplicate: getOptionalEnvBool('LEAD_DEDUPLICATE', true),
  requireEmailOrPhone: getOptionalEnvBool('LEAD_REQUIRE_CONTACT', true),
  autoAssign: getOptionalEnvBool('LEAD_AUTO_ASSIGN', false),
  autoScore: getOptionalEnvBool('LEAD_AUTO_SCORE', true),
  retentionDays: getOptionalEnvInt('LEAD_RETENTION_DAYS', 730),
  notificationEmail: getOptionalEnvBool('LEAD_NOTIFY_EMAIL', true),
});

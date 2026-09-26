/**
 * Marketing campaign configuration
 * @module shared-config/marketing/campaign
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CAMPAIGN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CAMPAIGN_ENABLED', true),
  maxActive: getOptionalEnvInt('CAMPAIGN_MAX_ACTIVE', 100),
  defaultDurationDays: getOptionalEnvInt('CAMPAIGN_DEFAULT_DAYS', 30),
  maxDurationDays: getOptionalEnvInt('CAMPAIGN_MAX_DAYS', 730),
  minBudget: getOptionalEnvInt('CAMPAIGN_MIN_BUDGET', 0),
  maxBudget: getOptionalEnvInt('CAMPAIGN_MAX_BUDGET', 100000000),
  maxAudiences: getOptionalEnvInt('CAMPAIGN_MAX_AUDIENCES', 50),
  maxChannels: getOptionalEnvInt('CAMPAIGN_MAX_CHANNELS', 10),
  requireApproval: getOptionalEnvBool('CAMPAIGN_REQUIRE_APPROVAL', true),
  autoPauseOnBudget: getOptionalEnvBool('CAMPAIGN_AUTO_PAUSE_BUDGET', true),
});

/**
 * Twitter Card configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const TWITTER_CARD_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TWITTER_CARD_ENABLED', true),
  card: getOptionalEnv('TWITTER_CARD_TYPE', 'summary_large_image'),
  site: getOptionalEnv('TWITTER_SITE', ''),
  creator: getOptionalEnv('TWITTER_CREATOR', ''),
  imageWidth: 1200,
  imageHeight: 600,
});

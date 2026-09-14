/**
 * Open Graph configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const OPEN_GRAPH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('OPEN_GRAPH_ENABLED', true),
  type: getOptionalEnv('OPEN_GRAPH_TYPE', 'website'),
  siteName: getOptionalEnv('OPEN_GRAPH_SITE_NAME', 'Vubon'),
  imageWidth: 1200,
  imageHeight: 630,
  imageFormat: 'jpeg',
  locale: getOptionalEnv('OPEN_GRAPH_LOCALE', 'bn_BD'),
});

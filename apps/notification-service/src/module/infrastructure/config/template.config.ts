/**
 * Template Engine Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const TEMPLATE_ENGINE_CONFIG = Object.freeze({
  defaultEngine: getOptionalEnv('TEMPLATE_DEFAULT_ENGINE', 'handlebars'),
  cacheEnabled: getOptionalEnvBool('TEMPLATE_CACHE_ENABLED', true),
  cacheTtlSeconds: getOptionalEnvInt('TEMPLATE_CACHE_TTL_SECONDS', 1800),
  strictMode: getOptionalEnvBool('TEMPLATE_STRICT_MODE', false),
  allowHtml: getOptionalEnvBool('TEMPLATE_ALLOW_HTML', true),
  partialsDir: getOptionalEnv('TEMPLATE_PARTIALS_DIR', './partials'),
});

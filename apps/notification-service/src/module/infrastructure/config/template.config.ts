import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const TEMPLATE_CONFIG = Object.freeze({
  defaultEngine: getOptionalEnv('TEMPLATE_ENGINE', 'handlebars'),
  maxVariables: getOptionalEnvInt('TEMPLATE_MAX_VARIABLES', 50),
  cacheTtlSeconds: getOptionalEnvInt('TEMPLATE_CACHE_TTL', 1800),
});

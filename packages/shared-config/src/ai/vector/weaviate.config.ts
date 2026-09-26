/**
 * Weaviate vector DB configuration
 * @module shared-config/ai/vector
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const WEAVIATE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('WEAVIATE_ENABLED', false),
  scheme: getOptionalEnv('WEAVIATE_SCHEME', 'http'),
  host: getOptionalEnv('WEAVIATE_HOST', 'localhost:8080'),
  apiKey: getOptionalEnv('WEAVIATE_API_KEY', ''),
  timeoutMs: getOptionalEnvInt('WEAVIATE_TIMEOUT_MS', 30000),
  retries: getOptionalEnvInt('WEAVIATE_RETRIES', 3),
});

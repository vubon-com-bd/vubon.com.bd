/**
 * Qdrant vector DB configuration
 * @module shared-config/ai/vector
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const QDRANT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('QDRANT_ENABLED', false),
  url: getOptionalEnv('QDRANT_URL', 'http://localhost:6333'),
  apiKey: getOptionalEnv('QDRANT_API_KEY', ''),
  collectionPrefix: getOptionalEnv('QDRANT_COLLECTION_PREFIX', 'vubon'),
  timeoutMs: getOptionalEnvInt('QDRANT_TIMEOUT_MS', 30000),
  preferGrpc: getOptionalEnvBool('QDRANT_GRPC', false),
});

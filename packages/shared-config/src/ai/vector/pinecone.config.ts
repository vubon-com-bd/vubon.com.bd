/**
 * Pinecone vector DB configuration
 * @module shared-config/ai/vector
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PINECONE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PINECONE_ENABLED', false),
  apiKey: getOptionalEnv('PINECONE_API_KEY', ''),
  environment: getOptionalEnv('PINECONE_ENV', ''),
  indexName: getOptionalEnv('PINECONE_INDEX', 'vubon'),
  projectId: getOptionalEnv('PINECONE_PROJECT_ID', ''),
  timeoutMs: getOptionalEnvInt('PINECONE_TIMEOUT_MS', 30000),
});

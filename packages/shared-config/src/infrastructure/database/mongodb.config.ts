/**
 * MongoDB-specific configuration
 * @module shared-config/infrastructure/database
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MONGODB_CONFIG = Object.freeze({
  uri: getOptionalEnv('MONGODB_URI', ''),
  database: getOptionalEnv('MONGODB_DB', 'vubon'),
  ssl: getOptionalEnvBool('MONGODB_SSL', false),
  authSource: getOptionalEnv('MONGODB_AUTH_SOURCE', 'admin'),
  retryWrites: getOptionalEnvBool('MONGODB_RETRY_WRITES', true),
  retryReads: getOptionalEnvBool('MONGODB_RETRY_READS', true),
  serverSelectionTimeoutMs: getOptionalEnvInt('MONGODB_SERVER_SELECTION_TIMEOUT_MS', 5000),
  socketTimeoutMs: getOptionalEnvInt('MONGODB_SOCKET_TIMEOUT_MS', 45000),
  maxPoolSize: getOptionalEnvInt('MONGODB_MAX_POOL_SIZE', 100),
  minPoolSize: getOptionalEnvInt('MONGODB_MIN_POOL_SIZE', 1),
} as const);

export type MongodbConfig = typeof MONGODB_CONFIG;

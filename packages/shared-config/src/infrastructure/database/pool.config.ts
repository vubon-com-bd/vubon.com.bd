/**
 * Database connection pool configuration
 * @module shared-config/infrastructure/database
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const POOL_CONFIG = Object.freeze({
  min: env.DB_POOL_MIN,
  max: env.DB_POOL_MAX,
  acquireTimeoutMs: env.DB_TIMEOUT_MS,
  idleTimeoutMs: getOptionalEnvInt('DB_POOL_IDLE_TIMEOUT_MS', 10000),
  reapIntervalMs: getOptionalEnvInt('DB_POOL_REAP_INTERVAL_MS', 1000),
  createRetryIntervalMs: getOptionalEnvInt('DB_POOL_CREATE_RETRY_INTERVAL_MS', 200),
  createTimeoutMs: getOptionalEnvInt('DB_POOL_CREATE_TIMEOUT_MS', 30000),
  destroyTimeoutMs: getOptionalEnvInt('DB_POOL_DESTROY_TIMEOUT_MS', 5000),
  evictionRunIntervalMs: getOptionalEnvInt('DB_POOL_EVICTION_RUN_INTERVAL_MS', 30000),
  testOnBorrow: getOptionalEnvBool('DB_POOL_TEST_ON_BORROW', true),
  testOnReturn: getOptionalEnvBool('DB_POOL_TEST_ON_RETURN', false),
} as const);

export type PoolConfig = typeof POOL_CONFIG;

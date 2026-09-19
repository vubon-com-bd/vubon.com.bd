/**
 * Database configuration
 * @module shared-config/infrastructure/database
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

export const DATABASE_CONFIG = Object.freeze({
  url: loadEnv().DATABASE_URL,
  driver: getOptionalEnv('DB_DRIVER', 'postgres'),
  ssl: getOptionalEnvBool('DB_SSL', loadEnv().NODE_ENV === 'production'),
  logging: getOptionalEnvBool('DB_LOGGING', loadEnv().NODE_ENV !== 'production'),
  synchronize: getOptionalEnvBool('DB_SYNCHRONIZE', false),
  timezone: getOptionalEnv('DB_TIMEZONE', 'Asia/Dhaka'),
  schema: getOptionalEnv('DB_SCHEMA', 'public'),
  maxConnections: getOptionalEnvInt('DB_MAX_CONNECTIONS', 100),
  statementTimeoutMs: getOptionalEnvInt('DB_STATEMENT_TIMEOUT_MS', 30000),
  queryTimeoutMs: getOptionalEnvInt('DB_QUERY_TIMEOUT_MS', 10000),
} as const);

export type DatabaseConfig = typeof DATABASE_CONFIG;

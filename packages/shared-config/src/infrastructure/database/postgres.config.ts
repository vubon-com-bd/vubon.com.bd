/**
 * PostgreSQL-specific configuration
 * @module shared-config/infrastructure/database
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const POSTGRES_CONFIG = Object.freeze({
  host: getOptionalEnv('POSTGRES_HOST', 'localhost'),
  port: getOptionalEnvInt('POSTGRES_PORT', 5432),
  database: getOptionalEnv('POSTGRES_DB', 'vubon'),
  user: getOptionalEnv('POSTGRES_USER', 'postgres'),
  password: getOptionalEnv('POSTGRES_PASSWORD', ''),
  ssl: getOptionalEnvBool('POSTGRES_SSL', false),
  applicationName: getOptionalEnv('POSTGRES_APP_NAME', 'vubon-api'),
  statementTimeoutMs: getOptionalEnvInt('POSTGRES_STATEMENT_TIMEOUT_MS', 30000),
  idleTimeoutMs: getOptionalEnvInt('POSTGRES_IDLE_TIMEOUT_MS', 30000),
  connectionTimeoutMs: getOptionalEnvInt('POSTGRES_CONNECTION_TIMEOUT_MS', 5000),
} as const);

export type PostgresConfig = typeof POSTGRES_CONFIG;

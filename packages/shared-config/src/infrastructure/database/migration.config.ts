/**
 * Database migration configuration
 * @module shared-config/infrastructure/database
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MIGRATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MIGRATION_ENABLED', true),
  autoRun: getOptionalEnvBool('MIGRATION_AUTO_RUN', false),
  directory: getOptionalEnv('MIGRATION_DIR', './migrations'),
  tableName: getOptionalEnv('MIGRATION_TABLE', 'migrations'),
  schemaName: getOptionalEnv('MIGRATION_SCHEMA', 'public'),
  transactionPerMigration: getOptionalEnvBool('MIGRATION_TRANSACTION_PER', true),
  lockTimeoutMs: getOptionalEnvInt('MIGRATION_LOCK_TIMEOUT_MS', 60000),
  lockTableName: getOptionalEnv('MIGRATION_LOCK_TABLE', 'migration_lock'),
} as const);

export type MigrationConfig = typeof MIGRATION_CONFIG;

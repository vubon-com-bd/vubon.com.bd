/**
 * OLAP Configuration
 */
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const OLAP_CONFIG = Object.freeze({
  provider: getOptionalEnv('ANALYTICS_OLAP_PROVIDER', 'clickhouse') as
    | 'clickhouse'
    | 'timescaledb'
    | 'druid'
    | 'bigquery',
  host: getOptionalEnv('ANALYTICS_OLAP_HOST', 'localhost'),
  port: getOptionalEnvInt('ANALYTICS_OLAP_PORT', 8123),
  database: getOptionalEnv('ANALYTICS_OLAP_DB', 'analytics'),
  username: getOptionalEnv('ANALYTICS_OLAP_USER', 'default'),
  password: getOptionalEnv('ANALYTICS_OLAP_PASSWORD', ''),
  protocol: getOptionalEnv('ANALYTICS_OLAP_PROTOCOL', 'http') as 'http' | 'https',
  queryTimeoutMs: getOptionalEnvInt('ANALYTICS_OLAP_TIMEOUT_MS', 30000),
  maxConnections: getOptionalEnvInt('ANALYTICS_OLAP_MAX_CONN', 20),
  streamingEnabled: getOptionalEnv('ANALYTICS_OLAP_STREAMING', 'true') === 'true',
  maxRowsPerQuery: getOptionalEnvInt('ANALYTICS_OLAP_MAX_ROWS', 100000),
});

import { getOptionalEnv, getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const OLAP_CONFIG = Object.freeze({
  provider: getOptionalEnv('OLAP_PROVIDER', 'clickhouse') as
    | 'clickhouse'
    | 'timescaledb'
    | 'druid'
    | 'bigquery',
  clickhouseUrl: getOptionalEnv('CLICKHOUSE_URL', 'http://localhost:8123'),
  clickhouseDatabase: getOptionalEnv('CLICKHOUSE_DB', 'analytics'),
  clickhouseUser: getOptionalEnv('CLICKHOUSE_USER', 'default'),
  clickhousePassword: getOptionalEnv('CLICKHOUSE_PASSWORD', ''),
  queryTimeoutMs: getOptionalEnvInt('OLAP_QUERY_TIMEOUT_MS', 30_000),
  maxConcurrentQueries: getOptionalEnvInt('OLAP_MAX_CONCURRENT', 10),
  enableQueryCache: getOptionalEnvBool('OLAP_QUERY_CACHE', true),
  queryCacheTtlSeconds: getOptionalEnvInt('OLAP_QUERY_CACHE_TTL', 300),
} as const);

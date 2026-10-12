/**
 * OLAP Metrics Schema
 * @module analytics-service/infrastructure/persistence/olap/schemas
 */
export const OLAP_METRICS_TABLE = 'analytics_metrics_olap';

export const OLAP_METRICS_DDL_CLICKHOUSE = `
CREATE TABLE IF NOT EXISTS ${OLAP_METRICS_TABLE} (
  id            String,
  name          LowCardinality(String),
  series_key    String,
  unit          LowCardinality(String),
  type          LowCardinality(String),
  value         Float64,
  sample_count  UInt64,
  granularity   LowCardinality(String),
  bucket_start  DateTime64(3, 'UTC'),
  dimensions    String,
  inserted_at   DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(bucket_start)
ORDER BY (bucket_start, name, series_key)
TTL bucket_start + INTERVAL 730 DAY;
`;

export const OLAP_METRICS_DDL_TIMESCALE = `
CREATE TABLE IF NOT EXISTS ${OLAP_METRICS_TABLE} (
  id            TEXT NOT NULL,
  name          TEXT NOT NULL,
  series_key    TEXT NOT NULL,
  unit          TEXT NOT NULL,
  type          TEXT NOT NULL,
  value         DOUBLE PRECISION NOT NULL,
  sample_count  BIGINT NOT NULL DEFAULT 0,
  granularity   TEXT NOT NULL,
  bucket_start  TIMESTAMPTZ NOT NULL,
  dimensions    JSONB NOT NULL DEFAULT '{}'::jsonb,
  inserted_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT create_hypertable('${OLAP_METRICS_TABLE}', 'bucket_start', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_metrics_series ON ${OLAP_METRICS_TABLE}(series_key, bucket_start DESC);
`;

export interface OlapMetricRow {
  readonly id: string;
  readonly name: string;
  readonly series_key: string;
  readonly unit: string;
  readonly type: string;
  readonly value: number;
  readonly sample_count: number;
  readonly granularity: string;
  readonly bucket_start: string;
  readonly dimensions: string | Record<string, unknown>;
}

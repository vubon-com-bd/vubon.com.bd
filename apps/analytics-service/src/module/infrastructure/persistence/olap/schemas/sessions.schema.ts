/**
 * OLAP Sessions Schema
 * @module analytics-service/infrastructure/persistence/olap/schemas
 */
export const OLAP_SESSIONS_TABLE = 'analytics_sessions_olap';

export const OLAP_SESSIONS_DDL_CLICKHOUSE = `
CREATE TABLE IF NOT EXISTS ${OLAP_SESSIONS_TABLE} (
  id              String,
  user_id         Nullable(String),
  device          Nullable(LowCardinality(String)),
  started_at      DateTime64(3, 'UTC'),
  ended_at        Nullable(DateTime64(3, 'UTC')),
  duration_sec    Nullable(UInt32),
  event_count     UInt32 DEFAULT 0,
  page_view_count UInt32 DEFAULT 0,
  traffic_source  Nullable(String),
  inserted_at     DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(started_at)
ORDER BY (started_at, user_id)
TTL started_at + INTERVAL 730 DAY;
`;

export const OLAP_SESSIONS_DDL_TIMESCALE = `
CREATE TABLE IF NOT EXISTS ${OLAP_SESSIONS_TABLE} (
  id              TEXT NOT NULL,
  user_id         TEXT,
  device          TEXT,
  started_at      TIMESTAMPTZ NOT NULL,
  ended_at        TIMESTAMPTZ,
  duration_sec    INTEGER,
  event_count     INTEGER NOT NULL DEFAULT 0,
  page_view_count INTEGER NOT NULL DEFAULT 0,
  traffic_source  JSONB,
  inserted_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT create_hypertable('${OLAP_SESSIONS_TABLE}', 'started_at', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON ${OLAP_SESSIONS_TABLE}(user_id, started_at DESC);
`;

export interface OlapSessionRow {
  readonly id: string;
  readonly user_id: string | null;
  readonly device: string | null;
  readonly started_at: string;
  readonly ended_at: string | null;
  readonly duration_sec: number | null;
  readonly event_count: number;
  readonly page_view_count: number;
  readonly traffic_source: string | null;
}

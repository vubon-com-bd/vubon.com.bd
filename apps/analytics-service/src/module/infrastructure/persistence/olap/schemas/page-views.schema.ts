/**
 * OLAP Page Views Schema
 * @module analytics-service/infrastructure/persistence/olap/schemas
 */
export const OLAP_PAGE_VIEWS_TABLE = 'analytics_page_views_olap';

export const OLAP_PAGE_VIEWS_DDL_CLICKHOUSE = `
CREATE TABLE IF NOT EXISTS ${OLAP_PAGE_VIEWS_TABLE} (
  id           String,
  session_id   String,
  user_id      Nullable(String),
  path         String,
  referrer     Nullable(String),
  device       Nullable(LowCardinality(String)),
  country      Nullable(FixedString(2)),
  occurred_at  DateTime64(3, 'UTC'),
  duration_ms  Nullable(UInt32),
  inserted_at  DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (occurred_at, path)
TTL occurred_at + INTERVAL 365 DAY;
`;

export const OLAP_PAGE_VIEWS_DDL_TIMESCALE = `
CREATE TABLE IF NOT EXISTS ${OLAP_PAGE_VIEWS_TABLE} (
  id           TEXT NOT NULL,
  session_id   TEXT NOT NULL,
  user_id      TEXT,
  path         TEXT NOT NULL,
  referrer     TEXT,
  device       TEXT,
  country      CHAR(2),
  occurred_at  TIMESTAMPTZ NOT NULL,
  duration_ms  INTEGER,
  inserted_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT create_hypertable('${OLAP_PAGE_VIEWS_TABLE}', 'occurred_at', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_pv_path ON ${OLAP_PAGE_VIEWS_TABLE}(path, occurred_at DESC);
`;

export interface OlapPageViewRow {
  readonly id: string;
  readonly session_id: string;
  readonly user_id: string | null;
  readonly path: string;
  readonly referrer: string | null;
  readonly device: string | null;
  readonly country: string | null;
  readonly occurred_at: string;
  readonly duration_ms: number | null;
}

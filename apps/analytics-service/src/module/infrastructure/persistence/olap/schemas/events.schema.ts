/**
 * OLAP Events Schema
 * @module analytics-service/infrastructure/persistence/olap/schemas
 *
 * ClickHouse/TimescaleDB event table DDL।
 * ⚠️ Apply as migration — not executed at runtime।
 */
export const OLAP_EVENTS_TABLE = 'analytics_events_olap';

export const OLAP_EVENTS_DDL_CLICKHOUSE = `
CREATE TABLE IF NOT EXISTS ${OLAP_EVENTS_TABLE} (
  id           String,
  name         LowCardinality(String),
  source       LowCardinality(String),
  session_id   Nullable(String),
  user_id      Nullable(String),
  payload_keys UInt16,
  occurred_at  DateTime64(3, 'UTC'),
  status       LowCardinality(String),
  country      Nullable(FixedString(2)),
  device       Nullable(LowCardinality(String)),
  inserted_at  DateTime DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(occurred_at)
ORDER BY (occurred_at, name, source)
TTL occurred_at + INTERVAL 730 DAY;
`;

export const OLAP_EVENTS_DDL_TIMESCALE = `
CREATE TABLE IF NOT EXISTS ${OLAP_EVENTS_TABLE} (
  id            TEXT NOT NULL,
  name          TEXT NOT NULL,
  source        TEXT NOT NULL,
  session_id    TEXT,
  user_id       TEXT,
  payload_keys  SMALLINT NOT NULL DEFAULT 0,
  occurred_at   TIMESTAMPTZ NOT NULL,
  status        TEXT NOT NULL DEFAULT 'received',
  country       CHAR(2),
  device        TEXT,
  inserted_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
SELECT create_hypertable('${OLAP_EVENTS_TABLE}', 'occurred_at', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_events_name ON ${OLAP_EVENTS_TABLE}(name, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_user ON ${OLAP_EVENTS_TABLE}(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session ON ${OLAP_EVENTS_TABLE}(session_id);
`;

export interface OlapEventRow {
  readonly id: string;
  readonly name: string;
  readonly source: string;
  readonly session_id: string | null;
  readonly user_id: string | null;
  readonly payload_keys: number;
  readonly occurred_at: string;
  readonly status: string;
  readonly country: string | null;
  readonly device: string | null;
}

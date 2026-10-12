/**
 * OLAP Adapter Interface
 * @module analytics-service/infrastructure/persistence/olap
 *
 * Analytics OLAP queries — read-heavy, aggregation-heavy workloads।
 */
import type {
  OlapConfig,
  OlapHealthStatus,
  OlapProvider,
  OlapQueryOptions,
  OlapQueryResult,
} from './olap.types.js';

export interface OlapAdapter {
  readonly provider: OlapProvider;
  readonly config: OlapConfig;

  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  health(): Promise<OlapHealthStatus>;

  /**
   * Execute a parameterized query.
   * ⚠️ MUST be parameterized — never string-interpolate user input.
   */
  query<TRow = Record<string, unknown>>(
    sql: string,
    params?: Readonly<Record<string, unknown>>,
    options?: OlapQueryOptions
  ): Promise<OlapQueryResult<TRow>>;

  /**
   * Insert rows (bulk ingestion for analytics events)।
   */
  insert<TRow extends Record<string, unknown>>(
    table: string,
    rows: readonly TRow[]
  ): Promise<{ readonly inserted: number; readonly durationMs: number }>;

  /**
   * Streaming query for large results (paginated)।
   */
  streamQuery<TRow = Record<string, unknown>>(
    sql: string,
    params: Readonly<Record<string, unknown>>,
    onRow: (row: TRow) => void,
    options?: OlapQueryOptions
  ): Promise<{ readonly processed: number; readonly durationMs: number }>;
}

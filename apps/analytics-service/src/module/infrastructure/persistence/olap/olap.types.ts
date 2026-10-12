/**
 * OLAP Types
 * @module analytics-service/infrastructure/persistence/olap
 */

export type OlapProvider = 'clickhouse' | 'timescaledb' | 'druid' | 'bigquery';

export interface OlapQueryOptions {
  readonly timeout?: number;
  readonly maxRows?: number;
  readonly format?: 'JSON' | 'JSONEachRow' | 'CSV' | 'TSV';
}

export interface OlapQueryResult<TRow = Record<string, unknown>> {
  readonly rows: readonly TRow[];
  readonly rowCount: number;
  readonly durationMs: number;
  readonly provider: OlapProvider;
}

export interface OlapHealthStatus {
  readonly provider: OlapProvider;
  readonly healthy: boolean;
  readonly latencyMs: number;
  readonly error?: string;
}

export interface OlapConfig {
  readonly provider: OlapProvider;
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username?: string;
  readonly password?: string;
  readonly protocol?: 'http' | 'https' | 'native';
  readonly maxConnections?: number;
  readonly queryTimeout?: number;
}

export interface OlapConnection {
  readonly config: OlapConfig;
  readonly connected: boolean;
  readonly connectedAt?: number;
}

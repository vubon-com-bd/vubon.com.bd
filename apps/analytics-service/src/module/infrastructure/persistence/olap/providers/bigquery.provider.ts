/**
 * Google BigQuery OLAP Provider (stub — requires @google-cloud/bigquery)
 * @module analytics-service/infrastructure/persistence/olap/providers
 */
import { Injectable, Logger, Optional } from '@nestjs/common';
import { BaseOlapAdapter } from '../olap.abstract.js';
import type {
  OlapConfig,
  OlapHealthStatus,
  OlapProvider,
  OlapQueryOptions,
  OlapQueryResult,
} from '../olap.types.js';

@Injectable()
export class BigQueryProvider extends BaseOlapAdapter {
  readonly provider: OlapProvider = 'bigquery';
  private readonly logger = new Logger(BigQueryProvider.name);
  private client: unknown;

  constructor(@Optional() config?: Partial<OlapConfig>) {
    super({
      provider: 'bigquery',
      host: 'bigquery.googleapis.com',
      port: 443,
      database: config?.database ?? process.env['BQ_DATASET'] ?? 'analytics',
      protocol: 'https',
      queryTimeout: config?.queryTimeout ?? 60000,
    });
  }

  async connect(): Promise<void> {
    try {
      const mod = await (import('@google-cloud/bigquery') as Promise<unknown>).catch(() => null);
      if (!mod) {
        this.logger.warn('@google-cloud/bigquery not installed — degraded mode');
        return;
      }
      const BigQuery = (mod as unknown as { BigQuery: new () => unknown }).BigQuery;
      this.client = new BigQuery();
      this.connected = true;
      this.connectedAt = Date.now();
      this.logger.log('✅ BigQuery configured');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`BigQuery connect failed: ${msg.slice(0, 120)}`);
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    this.client = undefined;
  }

  async health(): Promise<OlapHealthStatus> {
    return {
      provider: this.provider,
      healthy: this.connected,
      latencyMs: 0,
    };
  }

  async query<TRow = Record<string, unknown>>(
    sql: string,
    params?: Readonly<Record<string, unknown>>,
    _options?: OlapQueryOptions
  ): Promise<OlapQueryResult<TRow>> {
    this.assertSafeSql(sql);
    if (!this.connected) {
      return { rows: [], rowCount: 0, durationMs: 0, provider: this.provider };
    }
    const start = Date.now();
    const c = this.client as {
      query: (args: unknown) => Promise<[TRow[]]>;
    };
    const [rows] = await c.query({ query: sql, params });
    return {
      rows,
      rowCount: rows.length,
      durationMs: Date.now() - start,
      provider: this.provider,
    };
  }

  async insert<TRow extends Record<string, unknown>>(
    table: string,
    rows: readonly TRow[]
  ): Promise<{ readonly inserted: number; readonly durationMs: number }> {
    if (!this.connected || rows.length === 0) {
      return { inserted: 0, durationMs: 0 };
    }
    const start = Date.now();
    const c = this.client as {
      dataset: (ds: string) => { table: (t: string) => { insert: (rows: unknown) => Promise<unknown> } };
    };
    await c.dataset(this.config.database).table(table).insert(rows);
    return { inserted: rows.length, durationMs: Date.now() - start };
  }
}

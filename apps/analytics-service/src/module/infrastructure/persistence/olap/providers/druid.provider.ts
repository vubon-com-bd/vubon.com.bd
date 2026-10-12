/**
 * Apache Druid OLAP Provider (via SQL HTTP endpoint)
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
export class DruidProvider extends BaseOlapAdapter {
  readonly provider: OlapProvider = 'druid';
  private readonly logger = new Logger(DruidProvider.name);

  constructor(@Optional() config?: Partial<OlapConfig>) {
    super({
      provider: 'druid',
      host: config?.host ?? process.env['DRUID_HOST'] ?? 'localhost',
      port: config?.port ?? Number(process.env['DRUID_PORT'] ?? 8888),
      database: config?.database ?? process.env['DRUID_DB'] ?? 'druid',
      protocol: config?.protocol ?? 'http',
      queryTimeout: config?.queryTimeout ?? 30000,
    });
  }

  async connect(): Promise<void> {
    this.connected = true;
    this.connectedAt = Date.now();
    this.logger.log(`✅ Druid configured at ${this.config.host}:${this.config.port}`);
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  async health(): Promise<OlapHealthStatus> {
    const start = Date.now();
    return {
      provider: this.provider,
      healthy: this.connected,
      latencyMs: Date.now() - start,
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
    try {
      const url = `${this.config.protocol}://${this.config.host}:${this.config.port}/druid/v2/sql`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sql, parameters: params ?? {} }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as TRow[];
      return {
        rows: data,
        rowCount: data.length,
        durationMs: Date.now() - start,
        provider: this.provider,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Druid query failed: ${msg}`);
      throw err;
    }
  }

  async insert<TRow extends Record<string, unknown>>(
    _table: string,
    _rows: readonly TRow[]
  ): Promise<{ readonly inserted: number; readonly durationMs: number }> {
    // Druid ingests via Kafka/Kinesis — direct insert not supported
    throw new Error('Druid does not support direct inserts — use streaming ingestion');
  }
}

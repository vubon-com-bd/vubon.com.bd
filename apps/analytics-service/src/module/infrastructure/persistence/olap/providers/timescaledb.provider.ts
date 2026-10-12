/**
 * TimescaleDB OLAP Provider
 * @module analytics-service/infrastructure/persistence/olap/providers
 *
 * ⚠️ Uses lazy import of `pg` — add to package.json: "pg": "^8.x"
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
export class TimescaleDbProvider extends BaseOlapAdapter {
  readonly provider: OlapProvider = 'timescaledb';
  private readonly logger = new Logger(TimescaleDbProvider.name);
  private pool: unknown;

  constructor(@Optional() config?: Partial<OlapConfig>) {
    super({
      provider: 'timescaledb',
      host: config?.host ?? process.env['TIMESCALE_HOST'] ?? 'localhost',
      port: config?.port ?? Number(process.env['TIMESCALE_PORT'] ?? 5432),
      database: config?.database ?? process.env['TIMESCALE_DB'] ?? 'analytics',
      username: config?.username ?? process.env['TIMESCALE_USER'] ?? 'postgres',
      password: config?.password ?? process.env['TIMESCALE_PASSWORD'] ?? '',
      maxConnections: config?.maxConnections ?? 10,
      queryTimeout: config?.queryTimeout ?? 30000,
    });
  }

  async connect(): Promise<void> {
    if (this.connected) return;
    try {
      const mod = await (import('pg') as Promise<unknown>).catch(() => null);
      if (!mod) {
        this.logger.warn('`pg` not installed — TimescaleDB in degraded mode');
        return;
      }
      const Pool = (mod as unknown as { Pool: new (opts: unknown) => unknown }).Pool;
      this.pool = new Pool({
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
        user: this.config.username,
        password: this.config.password,
        max: this.config.maxConnections,
        statement_timeout: this.config.queryTimeout,
      });
      this.connected = true;
      this.connectedAt = Date.now();
      this.logger.log(`✅ TimescaleDB connected to ${this.config.host}:${this.config.port}`);
    } catch (err) {
      this.connected = false;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`TimescaleDB connection failed: ${msg.slice(0, 120)}`);
    }
  }

  async disconnect(): Promise<void> {
    const p = this.pool as { end?: () => Promise<void> } | undefined;
    if (p?.end) await p.end();
    this.connected = false;
    this.connectedAt = undefined;
  }

  async health(): Promise<OlapHealthStatus> {
    const start = Date.now();
    if (!this.connected) {
      return { provider: this.provider, healthy: false, latencyMs: 0, error: 'Not connected' };
    }
    try {
      await this.query('SELECT 1');
      return { provider: this.provider, healthy: true, latencyMs: Date.now() - start };
    } catch (err) {
      return {
        provider: this.provider,
        healthy: false,
        latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : 'unknown',
      };
    }
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
    const p = this.pool as {
      query: (text: string, values?: readonly unknown[]) => Promise<{ rows: TRow[] }>;
    };
    const values = params ? Object.values(params) : [];
    const result = await p.query(sql, values);
    return {
      rows: result.rows,
      rowCount: result.rows.length,
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
    const p = this.pool as { query: (text: string, values?: readonly unknown[]) => Promise<unknown> };
    // Batch insert via parameterized multi-row VALUES
    for (const row of rows) {
      const keys = Object.keys(row);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const values = keys.map((k) => (row as Record<string, unknown>)[k]);
      await p.query(
        `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
        values
      );
    }
    return { inserted: rows.length, durationMs: Date.now() - start };
  }
}

/**
 * ClickHouse OLAP Provider
 * @module analytics-service/infrastructure/persistence/olap/providers
 *
 * ⚠️ Lazy import of @clickhouse/client — degrades gracefully if absent.
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
export class ClickHouseProvider extends BaseOlapAdapter {
  readonly provider: OlapProvider = 'clickhouse';
  private readonly logger = new Logger(ClickHouseProvider.name);
  private client: unknown;

  constructor(@Optional() config?: Partial<OlapConfig>) {
    super({
      provider: 'clickhouse',
      host: config?.host ?? process.env['CLICKHOUSE_HOST'] ?? 'localhost',
      port: config?.port ?? Number(process.env['CLICKHOUSE_PORT'] ?? 8123),
      database: config?.database ?? process.env['CLICKHOUSE_DB'] ?? 'analytics',
      username: config?.username ?? process.env['CLICKHOUSE_USER'] ?? 'default',
      password: config?.password ?? process.env['CLICKHOUSE_PASSWORD'] ?? '',
      protocol: config?.protocol ?? 'http',
      queryTimeout: config?.queryTimeout ?? 30000,
    });
  }

  async connect(): Promise<void> {
    if (this.connected) return;
    try {
      const mod = await import('@clickhouse/client').catch(() => null);
      if (!mod) {
        this.logger.warn('@clickhouse/client not installed — degraded mode');
        this.connected = false;
        return;
      }
      const createClient = (mod as unknown as { createClient: (opts: unknown) => unknown }).createClient;
      this.client = createClient({
        host: `${this.config.protocol}://${this.config.host}:${this.config.port}`,
        username: this.config.username,
        password: this.config.password,
        database: this.config.database,
        request_timeout: this.config.queryTimeout,
      });
      this.connected = true;
      this.connectedAt = Date.now();
      this.logger.log(`✅ ClickHouse connected to ${this.config.host}:${this.config.port}`);
    } catch (err) {
      this.connected = false;
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`ClickHouse connection failed: ${msg.slice(0, 120)}`);
    }
  }

  async disconnect(): Promise<void> {
    if (!this.connected) return;
    try {
      const c = this.client as { close?: () => Promise<void> } | undefined;
      if (c?.close) await c.close();
    } catch { /* ignore */ }
    this.connected = false;
    this.connectedAt = undefined;
  }

  async health(): Promise<OlapHealthStatus> {
    const start = Date.now();
    try {
      if (!this.connected) {
        return { provider: this.provider, healthy: false, latencyMs: 0, error: 'Not connected' };
      }
      await this.query('SELECT 1');
      return { provider: this.provider, healthy: true, latencyMs: Date.now() - start };
    } catch (err) {
      return {
        provider: this.provider, healthy: false, latencyMs: Date.now() - start,
        error: err instanceof Error ? err.message : 'unknown',
      };
    }
  }

  async query<TRow = Record<string, unknown>>(
    sql: string, params?: Readonly<Record<string, unknown>>, _options?: OlapQueryOptions
  ): Promise<OlapQueryResult<TRow>> {
    this.assertSafeSql(sql);
    if (!this.connected) return { rows: [], rowCount: 0, durationMs: 0, provider: this.provider };
    const start = Date.now();
    try {
      const c = this.client as { query: (args: unknown) => Promise<{ json: () => Promise<unknown> }> };
      const result = await c.query({ query: sql, query_params: params ?? {}, format: 'JSONEachRow' });
      const data = (await result.json()) as TRow[];
      return { rows: data, rowCount: data.length, durationMs: Date.now() - start, provider: this.provider };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`ClickHouse query failed: ${msg}`);
      throw err;
    }
  }

  async insert<TRow extends Record<string, unknown>>(
    table: string, rows: readonly TRow[]
  ): Promise<{ readonly inserted: number; readonly durationMs: number }> {
    if (!this.connected || rows.length === 0) return { inserted: 0, durationMs: 0 };
    const start = Date.now();
    const c = this.client as { insert: (args: unknown) => Promise<void> };
    await c.insert({ table, values: rows, format: 'JSONEachRow' });
    return { inserted: rows.length, durationMs: Date.now() - start };
  }
}

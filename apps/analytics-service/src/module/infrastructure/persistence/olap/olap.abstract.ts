/**
 * Abstract OLAP Adapter
 * @module analytics-service/infrastructure/persistence/olap
 */
import type { OlapAdapter } from './olap.interface.js';
import type {
  OlapConfig,
  OlapHealthStatus,
  OlapProvider,
  OlapQueryOptions,
  OlapQueryResult,
} from './olap.types.js';

export abstract class BaseOlapAdapter implements OlapAdapter {
  abstract readonly provider: OlapProvider;
  readonly config: OlapConfig;
  protected connected = false;
  protected connectedAt?: number;

  constructor(config: OlapConfig) {
    this.config = config;
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract health(): Promise<OlapHealthStatus>;

  abstract query<TRow = Record<string, unknown>>(
    sql: string,
    params?: Readonly<Record<string, unknown>>,
    options?: OlapQueryOptions
  ): Promise<OlapQueryResult<TRow>>;

  abstract insert<TRow extends Record<string, unknown>>(
    table: string,
    rows: readonly TRow[]
  ): Promise<{ readonly inserted: number; readonly durationMs: number }>;

  async streamQuery<TRow = Record<string, unknown>>(
    sql: string,
    params: Readonly<Record<string, unknown>>,
    onRow: (row: TRow) => void,
    options?: OlapQueryOptions
  ): Promise<{ readonly processed: number; readonly durationMs: number }> {
    const start = Date.now();
    const result = await this.query<TRow>(sql, params, options);
    for (const row of result.rows) {
      onRow(row);
    }
    return { processed: result.rowCount, durationMs: Date.now() - start };
  }

  isConnected(): boolean {
    return this.connected;
  }

  protected assertConnected(): void {
    if (!this.connected) {
      throw new Error(`OLAP provider "${this.provider}" not connected`);
    }
  }

  /**
   * Validate SQL is parameterized (best-effort safety check)।
   * Rejects obvious string interpolation patterns.
   */
  protected assertSafeSql(sql: string): void {
    if (/--\s|\/\*|\*\//.test(sql)) {
      // Comments often used for injection
      throw new Error('SQL comments are not allowed');
    }
    if (/\$\{|\{\{/.test(sql)) {
      throw new Error('Template interpolation is not allowed in OLAP SQL');
    }
  }
}

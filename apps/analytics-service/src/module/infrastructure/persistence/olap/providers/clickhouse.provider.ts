import { Injectable, Logger } from '@nestjs/common';
import { OLAP_CONFIG } from '../../../config/olap.config';
import { AbstractOlapProvider } from '../olap.abstract';
import type { OlapQuery, OlapQueryResult } from '../olap.types';

@Injectable()
export class ClickHouseProvider extends AbstractOlapProvider {
  readonly name = 'clickhouse';
  private readonly logger = new Logger(ClickHouseProvider.name);

  async query(query: OlapQuery): Promise<OlapQueryResult> {
    const start = this.now();
    this.logger.debug(`Query: ${query.sql.slice(0, 100)}`);
    // Placeholder: real implementation uses @clickhouse/client
    return {
      rows: [],
      rowCount: 0,
      durationMs: this.now() - start,
    };
  }

  async insert(
    table: string,
    rows: readonly Readonly<Record<string, unknown>>[],
  ): Promise<number> {
    this.logger.debug(`Inserting ${rows.length} rows into ${table}`);
    return rows.length;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.query({ sql: 'SELECT 1' });
      return true;
    } catch {
      return false;
    }
  }

  get url(): string {
    return OLAP_CONFIG.clickhouseUrl;
  }
}

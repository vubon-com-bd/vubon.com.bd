import { Injectable, Logger } from '@nestjs/common';
import { AbstractOlapProvider } from '../olap.abstract';
import type { OlapQuery, OlapQueryResult } from '../olap.types';

@Injectable()
export class TimescaleDBProvider extends AbstractOlapProvider {
  readonly name = 'timescaledb';
  private readonly logger = new Logger(TimescaleDBProvider.name);

  async query(query: OlapQuery): Promise<OlapQueryResult> {
    const start = this.now();
    this.logger.debug(`Timescale query: ${query.sql.slice(0, 100)}`);
    return { rows: [], rowCount: 0, durationMs: this.now() - start };
  }

  async insert(
    table: string,
    rows: readonly Readonly<Record<string, unknown>>[],
  ): Promise<number> {
    return rows.length;
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

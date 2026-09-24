import { Injectable, Logger } from '@nestjs/common';
import { AbstractOlapProvider } from '../olap.abstract';
import type { OlapQuery, OlapQueryResult } from '../olap.types';

@Injectable()
export class BigQueryProvider extends AbstractOlapProvider {
  readonly name = 'bigquery';
  private readonly logger = new Logger(BigQueryProvider.name);

  async query(query: OlapQuery): Promise<OlapQueryResult> {
    const start = this.now();
    this.logger.debug(`BigQuery: ${query.sql.slice(0, 100)}`);
    return { rows: [], rowCount: 0, durationMs: this.now() - start };
  }

  async insert(): Promise<number> {
    return 0;
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}

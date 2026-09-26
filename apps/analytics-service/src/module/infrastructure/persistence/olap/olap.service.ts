import { Injectable, Logger } from '@nestjs/common';
import { OLAP_CONFIG } from '../../config/olap.config';
import { ClickHouseProvider } from './providers/clickhouse.provider';
import { TimescaleDBProvider } from './providers/timescaledb.provider';
import { DruidProvider } from './providers/druid.provider';
import { BigQueryProvider } from './providers/bigquery.provider';
import type { OlapProvider } from './olap.interface';

@Injectable()
export class OlapService {
  private readonly logger = new Logger(OlapService.name);
  private readonly providers: ReadonlyMap<string, OlapProvider>;

  constructor(
    clickhouse: ClickHouseProvider,
    timescaledb: TimescaleDBProvider,
    druid: DruidProvider,
    bigquery: BigQueryProvider,
  ) {
    this.providers = new Map<string, OlapProvider>([
      ['clickhouse', clickhouse],
      ['timescaledb', timescaledb],
      ['druid', druid],
      ['bigquery', bigquery],
    ]);
    this.logger.log(`OLAP provider: ${OLAP_CONFIG.provider}`);
  }

  get active(): OlapProvider {
    const provider = this.providers.get(OLAP_CONFIG.provider);
    if (!provider) {
      throw new Error(`Unknown OLAP provider: ${OLAP_CONFIG.provider}`);
    }
    return provider;
  }

  get(name: string): OlapProvider | null {
    return this.providers.get(name) ?? null;
  }
}

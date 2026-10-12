/**
 * OLAP Module (NestJS)
 * @module analytics-service/infrastructure/persistence/olap
 */
import { Global, Module } from '@nestjs/common';
import { ClickHouseProvider } from './providers/clickhouse.provider.js';
import { TimescaleDbProvider } from './providers/timescaledb.provider.js';
import { DruidProvider } from './providers/druid.provider.js';
import { BigQueryProvider } from './providers/bigquery.provider.js';

const PROVIDERS = [
  ClickHouseProvider,
  TimescaleDbProvider,
  DruidProvider,
  BigQueryProvider,
];

@Global()
@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class OlapModule {}

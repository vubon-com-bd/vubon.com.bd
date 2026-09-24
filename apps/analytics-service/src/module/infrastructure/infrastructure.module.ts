import { Global, Module } from '@nestjs/common';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Persistence — Prisma
import { PrismaService } from './persistence/prisma/prisma.service';
import * as PrismaRepos from './persistence/prisma/repositories';

// Persistence — Cache
import * as CacheRepos from './persistence/cache/repositories';

// Persistence — OLAP
import { OlapService } from './persistence/olap/olap.service';
import { ClickHouseProvider } from './persistence/olap/providers/clickhouse.provider';
import { TimescaleDBProvider } from './persistence/olap/providers/timescaledb.provider';
import { DruidProvider } from './persistence/olap/providers/druid.provider';
import { BigQueryProvider } from './persistence/olap/providers/bigquery.provider';

// External clients
import * as ExternalClients from './services/external';

// Internal services
import * as InternalServices from './services/internal';

// Queues
import * as Queues from './queues';

// Workers
import * as Workers from './workers';

// External integrations
import * as ExternalIntegrations from './external';

const PRISMA_REPOS = Object.values(PrismaRepos);
const CACHE_REPOS = Object.values(CacheRepos);
const EXTERNAL_CLIENT_LIST = Object.values(ExternalClients);
const INTERNAL_SERVICE_LIST = Object.values(InternalServices);
const QUEUE_LIST = Object.values(Queues);
const WORKER_LIST = Object.values(Workers);
const INTEGRATION_LIST = Object.values(ExternalIntegrations);
const OLAP_PROVIDERS = [
  ClickHouseProvider,
  TimescaleDBProvider,
  DruidProvider,
  BigQueryProvider,
];

@Global()
@Module({
  imports: [KernelCommonModule],
  providers: [
    PrismaService,
    ...PRISMA_REPOS,
    ...CACHE_REPOS,
    ...OLAP_PROVIDERS,
    OlapService,
    ...EXTERNAL_CLIENT_LIST,
    ...INTERNAL_SERVICE_LIST,
    ...QUEUE_LIST,
    ...WORKER_LIST,
    ...INTEGRATION_LIST,
  ],
  exports: [
    PrismaService,
    ...PRISMA_REPOS,
    ...CACHE_REPOS,
    OlapService,
    ...EXTERNAL_CLIENT_LIST,
    ...INTERNAL_SERVICE_LIST,
    ...QUEUE_LIST,
    ...INTEGRATION_LIST,
  ],
})
export class InfrastructureModule {}

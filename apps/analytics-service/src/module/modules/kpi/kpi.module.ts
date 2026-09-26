import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { KpiController } from '../../interfaces/controllers/rest/kpi.controller';
import { KpiService } from '../../application/services/impl/kpi.service';
import { KpiResultService } from '../../application/services/impl/kpi-result.service';
import { CreateKpiHandler } from '../../application/commands/kpi/create-kpi.handler';
import { UpdateKpiHandler } from '../../application/commands/kpi/update-kpi.handler';
import { EvaluateKpiHandler } from '../../application/commands/kpi/evaluate-kpi.handler';
import { ListKpisHandler } from '../../application/queries/kpi/list-kpis.handler';
import { GetKpiHandler } from '../../application/queries/kpi/get-kpi.handler';
import { GetKpiResultsHandler } from '../../application/queries/kpi/get-kpi-results.handler';
import { KpiPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/kpi.prisma.repository';
import { KpiResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/kpi-result.prisma.repository';
import { KpiCacheRepository } from '../../infrastructure/persistence/cache/repositories/kpi.cache.repository';
import { KpiEvaluatorWorker } from '../../infrastructure/workers/kpi-evaluator.worker';

const HANDLERS = [
  CreateKpiHandler,
  UpdateKpiHandler,
  EvaluateKpiHandler,
  ListKpisHandler,
  GetKpiHandler,
  GetKpiResultsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [KpiController],
  providers: [
    KpiPrismaRepository,
    KpiResultPrismaRepository,
    KpiCacheRepository,
    KpiEvaluatorWorker,
    KpiService,
    KpiResultService,
    ...HANDLERS,
  ],
  exports: [
    KpiService,
    KpiResultService,
    KpiPrismaRepository,
    KpiCacheRepository,
  ],
})
export class KpiModule {}

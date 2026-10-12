/**
 * KPI Module
 */
import { Module } from '@nestjs/common';
import { KpiController } from '../../interfaces/controllers/rest/kpi.controller.js';
import { KPI_COMMAND_HANDLERS } from './commands/index.js';
import { KPI_QUERY_HANDLERS } from './queries/index.js';
import { KPI_SAGAS } from './sagas/index.js';
import { KpiPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/kpi.prisma.repository.js';
import { KpiResultPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/kpi-result.prisma.repository.js';
import { KpiService } from '../../application/services/impl/kpi.service.js';
import { KpiResultService } from '../../application/services/impl/kpi-result.service.js';
import { KpiValidator } from '../../interfaces/validators/kpi.validator.js';
import { KpiHealthIndicator } from './health/index.js';

@Module({
  controllers: [KpiController],
  providers: [
    KpiPrismaRepository,
    KpiResultPrismaRepository,
    KpiService,
    KpiResultService,
    KpiValidator,
    ...KPI_COMMAND_HANDLERS,
    ...KPI_QUERY_HANDLERS,
    ...KPI_SAGAS,
    KpiHealthIndicator,
  ],
  exports: [
    KpiService,
    KpiResultService,
    KpiPrismaRepository,
    KpiHealthIndicator,
  ],
})
export class KpiModule {}

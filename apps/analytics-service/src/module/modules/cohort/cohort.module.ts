import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CohortController } from '../../interfaces/controllers/rest/cohort.controller';
import { CohortService } from '../../application/services/impl/cohort.service';
import { CohortAnalysisService } from '../../application/services/impl/cohort-analysis.service';
import { CreateCohortHandler } from '../../application/commands/cohort/create-cohort.handler';
import { AnalyzeCohortHandler } from '../../application/commands/cohort/analyze-cohort.handler';
import { GetCohortHandler } from '../../application/queries/cohort/get-cohort.handler';
import { ListCohortsHandler } from '../../application/queries/cohort/list-cohorts.handler';
import { CohortPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cohort.prisma.repository';
import { CohortAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cohort-analysis.prisma.repository';
import { CohortCalculatorService } from '../../infrastructure/services/internal/cohort-calculator.service';
import { RetentionCalculatorService } from '../../infrastructure/services/internal/retention-calculator.service';
import { CohortBuilderWorker } from '../../infrastructure/workers/cohort-builder.worker';
import { RetentionCalculatorWorker } from '../../infrastructure/workers/retention-calculator.worker';

const HANDLERS = [
  CreateCohortHandler,
  AnalyzeCohortHandler,
  GetCohortHandler,
  ListCohortsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [CohortController],
  providers: [
    CohortPrismaRepository,
    CohortAnalysisPrismaRepository,
    CohortCalculatorService,
    RetentionCalculatorService,
    CohortBuilderWorker,
    RetentionCalculatorWorker,
    CohortService,
    CohortAnalysisService,
    ...HANDLERS,
  ],
  exports: [
    CohortService,
    CohortAnalysisService,
    CohortPrismaRepository,
    CohortCalculatorService,
  ],
})
export class CohortModule {}

/**
 * Cohort Module
 */
import { Module } from '@nestjs/common';
import { CohortController } from '../../interfaces/controllers/rest/cohort.controller.js';
import { COHORT_COMMAND_HANDLERS } from './commands/index.js';
import { COHORT_QUERY_HANDLERS } from './queries/index.js';
import { COHORT_SAGAS } from './sagas/index.js';
import { CohortPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cohort.prisma.repository.js';
import { CohortAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cohort-analysis.prisma.repository.js';
import { CohortService } from '../../application/services/impl/cohort.service.js';
import { CohortAnalysisService } from '../../application/services/impl/cohort-analysis.service.js';

@Module({
  controllers: [CohortController],
  providers: [
    CohortPrismaRepository,
    CohortAnalysisPrismaRepository,
    CohortService,
    CohortAnalysisService,
    ...COHORT_COMMAND_HANDLERS as readonly unknown[] as never[],
    ...COHORT_QUERY_HANDLERS as readonly unknown[] as never[],
    ...COHORT_SAGAS as readonly unknown[] as never[],
  ],
  exports: [
    CohortService,
    CohortAnalysisService,
    CohortPrismaRepository,
  ],
})
export class CohortModule {}

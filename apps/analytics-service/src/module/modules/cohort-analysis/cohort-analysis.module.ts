import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CohortAnalysisService } from '../../application/services/impl/cohort-analysis.service';
import { CohortAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/cohort-analysis.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    CohortAnalysisPrismaRepository,
    CohortAnalysisService,
  ],
  exports: [
    CohortAnalysisService,
    CohortAnalysisPrismaRepository,
  ],
})
export class CohortAnalysisModule {}

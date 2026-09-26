import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FunnelAnalysisService } from '../../application/services/impl/funnel-analysis.service';
import { FunnelAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/funnel-analysis.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    FunnelAnalysisPrismaRepository,
    FunnelAnalysisService,
  ],
  exports: [
    FunnelAnalysisService,
    FunnelAnalysisPrismaRepository,
  ],
})
export class FunnelAnalysisModule {}

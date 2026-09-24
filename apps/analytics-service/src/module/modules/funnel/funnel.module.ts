import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FunnelController } from '../../interfaces/controllers/rest/funnel.controller';
import { FunnelService } from '../../application/services/impl/funnel.service';
import { FunnelAnalysisService } from '../../application/services/impl/funnel-analysis.service';
import { CreateFunnelHandler } from '../../application/commands/funnel/create-funnel.handler';
import { AnalyzeFunnelHandler } from '../../application/commands/funnel/analyze-funnel.handler';
import { GetFunnelHandler } from '../../application/queries/funnel/get-funnel.handler';
import { ListFunnelsHandler } from '../../application/queries/funnel/list-funnels.handler';
import { FunnelPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/funnel.prisma.repository';
import { FunnelAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/funnel-analysis.prisma.repository';
import { FunnelCalculatorService } from '../../infrastructure/services/internal/funnel-calculator.service';
import { FunnelBuilderWorker } from '../../infrastructure/workers/funnel-builder.worker';

const HANDLERS = [
  CreateFunnelHandler,
  AnalyzeFunnelHandler,
  GetFunnelHandler,
  ListFunnelsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [FunnelController],
  providers: [
    FunnelPrismaRepository,
    FunnelAnalysisPrismaRepository,
    FunnelCalculatorService,
    FunnelBuilderWorker,
    FunnelService,
    FunnelAnalysisService,
    ...HANDLERS,
  ],
  exports: [
    FunnelService,
    FunnelAnalysisService,
    FunnelPrismaRepository,
    FunnelCalculatorService,
  ],
})
export class FunnelModule {}

/**
 * Funnel Module
 */
import { Module } from '@nestjs/common';
import { FunnelController } from '../../interfaces/controllers/rest/funnel.controller.js';
import { FUNNEL_COMMAND_HANDLERS } from './commands/index.js';
import { FUNNEL_QUERY_HANDLERS } from './queries/index.js';
import { FUNNEL_SAGAS } from './sagas/index.js';
import { FunnelPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/funnel.prisma.repository.js';
import { FunnelAnalysisPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/funnel-analysis.prisma.repository.js';
import { FunnelService } from '../../application/services/impl/funnel.service.js';
import { FunnelAnalysisService } from '../../application/services/impl/funnel-analysis.service.js';

@Module({
  controllers: [FunnelController],
  providers: [
    FunnelPrismaRepository,
    FunnelAnalysisPrismaRepository,
    FunnelService,
    FunnelAnalysisService,
    ...FUNNEL_COMMAND_HANDLERS as readonly unknown[] as never[],
    ...FUNNEL_QUERY_HANDLERS as readonly unknown[] as never[],
    ...FUNNEL_SAGAS as readonly unknown[] as never[],
  ],
  exports: [
    FunnelService,
    FunnelAnalysisService,
    FunnelPrismaRepository,
  ],
})
export class FunnelModule {}

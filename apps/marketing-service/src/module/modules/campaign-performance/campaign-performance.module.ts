import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { CampaignPerformanceService } from '../../application/services/impl/campaign-performance.service';
import { CampaignPerformancePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-performance.prisma.repository';
import { CampaignPerformanceController } from '../../interfaces/controllers/rest/campaign-performance.controller';
import { GetCampaignPerformanceHandler } from '../../application/queries/campaign';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [CampaignPerformanceController],
  providers: [
    CampaignPerformanceService,
    { provide: 'CampaignPerformanceRepository', useClass: CampaignPerformancePrismaRepository },
    GetCampaignPerformanceHandler,
  ],
  exports: [CampaignPerformanceService, 'CampaignPerformanceRepository'],
})
export class CampaignPerformanceModule {}

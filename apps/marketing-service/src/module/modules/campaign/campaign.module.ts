import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { CampaignService } from '../../application/services/impl/campaign.service';
import { CampaignBudgetService } from '../../application/services/impl/campaign-budget.service';
import { CampaignAudienceService } from '../../application/services/impl/campaign-audience.service';
import { CampaignPerformanceService } from '../../application/services/impl/campaign-performance.service';

import {
  CreateCampaignHandler,
  LaunchCampaignHandler,
  PauseCampaignHandler,
  CompleteCampaignHandler,
} from '../../application/commands/campaign';
import {
  GetCampaignHandler,
  ListCampaignsHandler,
  GetCampaignPerformanceHandler,
} from '../../application/queries/campaign';

import { CampaignMapper } from '../../application/mappers/campaign.mapper';

import { CampaignPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign.prisma.repository';
import { CampaignBudgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-budget.prisma.repository';
import { CampaignAudiencePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-audience.prisma.repository';
import { CampaignPerformancePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-performance.prisma.repository';
import { CampaignCacheRepository } from '../../infrastructure/persistence/cache/repositories/campaign.cache.repository';

import { BudgetOptimizerService } from '../../infrastructure/services/internal/budget-optimizer.service';
import { RoiCalculatorService } from '../../infrastructure/services/internal/roi-calculator.service';

import { CampaignController } from '../../interfaces/controllers/rest/campaign.controller';
import { CampaignBudgetController } from '../../interfaces/controllers/rest/campaign-budget.controller';
import { CampaignAudienceController } from '../../interfaces/controllers/rest/campaign-audience.controller';
import { CampaignPerformanceController } from '../../interfaces/controllers/rest/campaign-performance.controller';
import { CampaignControllerMapper } from '../../interfaces/mappers/campaign.controller.mapper';

const HANDLERS = [
  CreateCampaignHandler,
  LaunchCampaignHandler,
  PauseCampaignHandler,
  CompleteCampaignHandler,
  GetCampaignHandler,
  ListCampaignsHandler,
  GetCampaignPerformanceHandler,
];

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [
    CampaignController,
    CampaignBudgetController,
    CampaignAudienceController,
    CampaignPerformanceController,
  ],
  providers: [
    CampaignService,
    CampaignBudgetService,
    CampaignAudienceService,
    CampaignPerformanceService,

    { provide: 'CampaignRepository', useClass: CampaignPrismaRepository },
    { provide: 'CampaignBudgetRepository', useClass: CampaignBudgetPrismaRepository },
    { provide: 'CampaignAudienceRepository', useClass: CampaignAudiencePrismaRepository },
    { provide: 'CampaignPerformanceRepository', useClass: CampaignPerformancePrismaRepository },

    CampaignCacheRepository,
    BudgetOptimizerService,
    RoiCalculatorService,
    CampaignMapper,
    CampaignControllerMapper,

    ...HANDLERS,
  ],
  exports: [
    CampaignService,
    'CampaignRepository',
    CampaignMapper,
  ],
})
export class CampaignModule {}

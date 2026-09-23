import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { CampaignBudgetService } from '../../application/services/impl/campaign-budget.service';
import { CampaignBudgetPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/campaign-budget.prisma.repository';
import { CampaignBudgetController } from '../../interfaces/controllers/rest/campaign-budget.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [CampaignBudgetController],
  providers: [
    CampaignBudgetService,
    { provide: 'CampaignBudgetRepository', useClass: CampaignBudgetPrismaRepository },
  ],
  exports: [CampaignBudgetService, 'CampaignBudgetRepository'],
})
export class CampaignBudgetModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { MarketingAutomationService } from '../../application/services/impl/marketing-automation.service';
import { MarketingWorkflowService } from '../../application/services/impl/marketing-workflow.service';

import { MarketingAutomationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/marketing-automation.prisma.repository';
import { MarketingWorkflowPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/marketing-workflow.prisma.repository';

import { MarketingAutomationController } from '../../interfaces/controllers/rest/marketing-automation.controller';

import {
  CreateAutomationHandler,
  TriggerAutomationHandler,
  UpdateAutomationHandler,
} from '../../application/commands/automation';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [MarketingAutomationController],
  providers: [
    MarketingAutomationService,
    MarketingWorkflowService,

    { provide: 'MarketingAutomationRepository', useClass: MarketingAutomationPrismaRepository },
    { provide: 'MarketingWorkflowRepository', useClass: MarketingWorkflowPrismaRepository },

    CreateAutomationHandler,
    TriggerAutomationHandler,
    UpdateAutomationHandler,
  ],
  exports: [MarketingAutomationService, 'MarketingAutomationRepository'],
})
export class MarketingAutomationModule {}

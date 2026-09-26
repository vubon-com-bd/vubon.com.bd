import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { PromotionRuleService } from '../../application/services/impl/promotion-rule.service';
import { PromotionRulePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/promotion-rule.prisma.repository';
import { PromotionRuleController } from '../../interfaces/controllers/rest/promotion-rule.controller';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [PromotionRuleController],
  providers: [
    PromotionRuleService,
    { provide: 'PromotionRuleRepository', useClass: PromotionRulePrismaRepository },
  ],
  exports: [PromotionRuleService, 'PromotionRuleRepository'],
})
export class PromotionRuleModule {}

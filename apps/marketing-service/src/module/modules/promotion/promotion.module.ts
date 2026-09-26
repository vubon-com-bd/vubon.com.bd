import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { PromotionService } from '../../application/services/impl/promotion.service';
import { PromotionRuleService } from '../../application/services/impl/promotion-rule.service';
import { PromotionDiscountService } from '../../application/services/impl/promotion-discount.service';

import {
  CreatePromotionHandler,
  ApplyPromotionHandler,
  ValidatePromotionHandler,
} from '../../application/commands/promotion';
import {
  GetPromotionHandler,
  GetPromotionByCodeHandler,
  ListPromotionsHandler,
} from '../../application/queries/promotion';

import { PromotionMapper } from '../../application/mappers/promotion.mapper';

import { PromotionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/promotion.prisma.repository';
import { PromotionRulePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/promotion-rule.prisma.repository';
import { PromotionDiscountPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/promotion-discount.prisma.repository';

import { PromotionController } from '../../interfaces/controllers/rest/promotion.controller';
import { PromotionRuleController } from '../../interfaces/controllers/rest/promotion-rule.controller';
import { PromotionControllerMapper } from '../../interfaces/mappers/promotion.controller.mapper';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  controllers: [PromotionController, PromotionRuleController],
  providers: [
    PromotionService,
    PromotionRuleService,
    PromotionDiscountService,

    { provide: 'PromotionRepository', useClass: PromotionPrismaRepository },
    { provide: 'PromotionRuleRepository', useClass: PromotionRulePrismaRepository },
    { provide: 'PromotionDiscountRepository', useClass: PromotionDiscountPrismaRepository },

    PromotionMapper,
    PromotionControllerMapper,

    CreatePromotionHandler,
    ApplyPromotionHandler,
    ValidatePromotionHandler,
    GetPromotionHandler,
    GetPromotionByCodeHandler,
    ListPromotionsHandler,
  ],
  exports: [PromotionService, 'PromotionRepository'],
})
export class PromotionModule {}

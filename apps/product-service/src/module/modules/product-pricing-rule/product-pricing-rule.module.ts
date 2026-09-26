import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductPricingRuleController } from '../../interfaces/controllers/rest/product-pricing-rule.controller';
import { ProductPricingRuleService } from '../../application/services/impl/product-pricing-rule.service';
import {
  CreatePricingRuleHandler,
  UpdatePricingRuleHandler,
  DeletePricingRuleHandler,
} from '../../application/commands/pricing';
import { ProductPricingRulePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-pricing-rule.prisma.repository';

const COMMAND_HANDLERS = [
  CreatePricingRuleHandler,
  UpdatePricingRuleHandler,
  DeletePricingRuleHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ProductPricingRuleController],
  providers: [
    ProductPricingRulePrismaRepository,
    ProductPricingRuleService,
    ...COMMAND_HANDLERS,
  ],
  exports: [ProductPricingRuleService, ProductPricingRulePrismaRepository],
})
export class ProductPricingRuleModule {}

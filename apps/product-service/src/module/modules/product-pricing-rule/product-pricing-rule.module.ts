/**
 * ProductPricingRuleModule — pricing rule feature wiring
 * @module product-service/modules/product-pricing-rule
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductPricingRuleController } from '../../interfaces/controllers/rest/product-pricing-rule.controller.js';

import { PRICING_RULE_COMMAND_HANDLERS } from './commands/index.js';
import { PRICING_RULE_QUERY_HANDLERS } from './queries/index.js';

import { ProductPricingRuleApplicationService } from '../../application/services/impl/product-pricing-rule.service.js';
import { PRICING_RULE_SERVICE } from '../../application/services/interfaces/product-pricing-rule.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductPricingRuleController],
  providers: [
    ProductPricingRuleApplicationService,
    { provide: PRICING_RULE_SERVICE, useExisting: ProductPricingRuleApplicationService },
    ...(PRICING_RULE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PRICING_RULE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductPricingRuleApplicationService, PRICING_RULE_SERVICE],
})
export class ProductPricingRuleModule {}

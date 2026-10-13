/**
 * ProductPricingModule — pricing feature wiring
 * @module product-service/modules/product-pricing
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductPricingController } from '../../interfaces/controllers/rest/product-pricing.controller.js';

import { PRICING_COMMAND_HANDLERS } from './commands/index.js';
import { PRICING_QUERY_HANDLERS } from './queries/index.js';

import { ProductPricingApplicationService } from '../../application/services/impl/product-pricing.service.js';
import { PRICING_SERVICE } from '../../application/services/interfaces/product-pricing.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductPricingController],
  providers: [
    ProductPricingApplicationService,
    { provide: PRICING_SERVICE, useExisting: ProductPricingApplicationService },
    ...(PRICING_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(PRICING_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [ProductPricingApplicationService, PRICING_SERVICE],
})
export class ProductPricingModule {}

/**
 * ProductPricingModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductPricingController } from '../../interfaces/controllers/rest/product-pricing.controller.js';
import { PricingService } from '../../application/services/impl/pricing.service.js';
import { PRICING_SERVICE } from '../../application/services/interfaces/pricing.service.interface.js';
import { PRICING_COMMAND_HANDLERS } from '../../application/commands/pricing/index.js';
import { PRICING_QUERY_HANDLERS } from '../../application/queries/pricing/index.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductPricingController],
  providers: [
    PricingService,
    { provide: PRICING_SERVICE, useExisting: PricingService },
    ...PRICING_COMMAND_HANDLERS,
    ...PRICING_QUERY_HANDLERS],
  exports: [PricingService, PRICING_SERVICE],
})
export class ProductPricingModule {}

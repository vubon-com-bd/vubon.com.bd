import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductPricingController } from '../../interfaces/controllers/rest/product-pricing.controller';
import { ProductPricingService } from '../../application/services/impl/product-pricing.service';
import { PricingMapper } from '../../application/mappers/pricing.mapper';
import { UpdatePriceHandler } from '../../application/commands/pricing';
import {
  GetPriceHandler,
  CalculatePriceHandler,
} from '../../application/queries/pricing';
import { ProductPricingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-pricing.prisma.repository';
import { ProductPricingCacheRepository } from '../../infrastructure/persistence/cache/repositories/product-pricing.cache.repository';
import { PriceCalculatorService } from '../../infrastructure/services/internal/price-calculator.service';

@Module({
  imports: [CqrsModule],
  controllers: [ProductPricingController],
  providers: [
    ProductPricingPrismaRepository,
    ProductPricingCacheRepository,
    PriceCalculatorService,
    ProductPricingService,
    PricingMapper,
    UpdatePriceHandler,
    GetPriceHandler,
    CalculatePriceHandler,
  ],
  exports: [ProductPricingService, ProductPricingPrismaRepository],
})
export class ProductPricingModule {}

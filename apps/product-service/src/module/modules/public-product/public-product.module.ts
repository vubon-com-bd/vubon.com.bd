import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PublicProductController } from '../../interfaces/controllers/rest/public-product.controller';
import {
  GetProductBySlugHandler,
  ListProductsHandler,
  SearchProductsHandler,
} from '../../application/queries/product';
import { ProductPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [PublicProductController],
  providers: [
    ProductPrismaRepository,
    GetProductBySlugHandler,
    ListProductsHandler,
    SearchProductsHandler,
  ],
  exports: [],
})
export class PublicProductModule {}

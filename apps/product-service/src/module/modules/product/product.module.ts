import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductController } from '../../interfaces/controllers/rest/product.controller';
import { PublicProductController } from '../../interfaces/controllers/rest/public-product.controller';

import { ProductService } from '../../application/services/impl/product.service';
import { ProductMapper } from '../../application/mappers/product.mapper';

import {
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  PublishProductHandler,
  ArchiveProductHandler,
  DuplicateProductHandler,
} from '../../application/commands/product';

import {
  GetProductHandler,
  GetProductBySlugHandler,
  ListProductsHandler,
  SearchProductsHandler,
  GetRelatedProductsHandler,
  GetFeaturedProductsHandler,
} from '../../application/queries/product';

import {
  ProductPublishSaga,
  ProductReviewSaga,
  InventoryAlertSaga,
} from '../../application/sagas';

import { ProductPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product.prisma.repository';
import { ProductCacheRepository } from '../../infrastructure/persistence/cache/repositories/product.cache.repository';

import { ProductHealthIndicator } from './health';

const COMMAND_HANDLERS = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
  PublishProductHandler,
  ArchiveProductHandler,
  DuplicateProductHandler,
];

const QUERY_HANDLERS = [
  GetProductHandler,
  GetProductBySlugHandler,
  ListProductsHandler,
  SearchProductsHandler,
  GetRelatedProductsHandler,
  GetFeaturedProductsHandler,
];

const SAGAS = [ProductPublishSaga, ProductReviewSaga, InventoryAlertSaga];

@Module({
  imports: [CqrsModule],
  controllers: [ProductController, PublicProductController],
  providers: [
    ProductPrismaRepository,
    ProductCacheRepository,
    ProductService,
    ProductMapper,
    ProductHealthIndicator,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ...SAGAS,
  ],
  exports: [ProductService, ProductPrismaRepository, ProductCacheRepository],
})
export class ProductModule {}

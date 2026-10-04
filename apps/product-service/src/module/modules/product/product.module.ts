/**
 * ProductModule — Product feature wiring
 * @module product-service/modules/product
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';

// Infrastructure
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { CacheModule } from '../../infrastructure/persistence/cache/cache.module.js';
import { SearchModule } from '../../infrastructure/persistence/search/search.module.js';
import { InfrastructureServicesModule } from '../../infrastructure/services/services.module.js';

// Controllers
import { ProductController } from '../../interfaces/controllers/rest/product.controller.js';

// Services
import { ProductService } from '../../application/services/impl/product.service.js';
import { PRODUCT_SERVICE } from '../../application/services/interfaces/product.service.interface.js';
import { ProductCatalogService } from '../../application/services/impl/product-catalog.service.js';
import { PRODUCT_CATALOG_SERVICE } from '../../application/services/interfaces/product-catalog.service.interface.js';

// Command handlers
import { PRODUCT_COMMAND_HANDLERS } from '../../application/commands/product/index.js';
// Query handlers
import { PRODUCT_QUERY_HANDLERS } from '../../application/queries/product/index.js';

// Guards, validators, interceptors
import { OwnProductGuard } from '../../interfaces/guards/own-product.guard.js';
import { VendorProductGuard } from '../../interfaces/guards/vendor-product.guard.js';
import { ProductPublishedGuard } from '../../interfaces/guards/product-published.guard.js';
import { ProductCacheInterceptor } from '../../interfaces/interceptors/product-cache.interceptor.js';
import { ProductValidator, PRODUCT_VALIDATOR } from '../../interfaces/validators/product.validator.js';

// Sagas
import { ProductPublishSaga } from '../../application/sagas/product-publish.saga.js';

@Module({
  imports: [
    PrismaModule,
    PrismaRepositoriesModule,
    CacheModule,
    SearchModule,
    InfrastructureServicesModule],
  controllers: [ProductController],
  providers: [
    // Services
    ProductService,
    ProductCatalogService,
    { provide: PRODUCT_SERVICE, useExisting: ProductService },
    { provide: PRODUCT_CATALOG_SERVICE, useExisting: ProductCatalogService },

    // Validators
    ProductValidator,
    { provide: PRODUCT_VALIDATOR, useExisting: ProductValidator },

    // Command handlers
    ...PRODUCT_COMMAND_HANDLERS,
    // Query handlers
    ...PRODUCT_QUERY_HANDLERS,

    // Sagas
    ProductPublishSaga,

    // Guards
    OwnProductGuard,
    VendorProductGuard,
    ProductPublishedGuard,

    // Interceptors
    ProductCacheInterceptor],
  exports: [
    ProductService,
    ProductCatalogService,
    PRODUCT_SERVICE,
    PRODUCT_CATALOG_SERVICE],
})
export class ProductModule {}

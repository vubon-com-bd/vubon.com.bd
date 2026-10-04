/**
 * PublicProductModule — no auth
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { SearchModule } from '../../infrastructure/persistence/search/search.module.js';
import { PublicProductController } from '../../interfaces/controllers/rest/public-product.controller.js';
import { ProductService } from '../../application/services/impl/product.service.js';
import { PRODUCT_SERVICE } from '../../application/services/interfaces/product.service.interface.js';
import { ProductCatalogService } from '../../application/services/impl/product-catalog.service.js';
import { PRODUCT_CATALOG_SERVICE } from '../../application/services/interfaces/product-catalog.service.interface.js';
import { PRODUCT_QUERY_HANDLERS } from '../../application/queries/product/index.js';

@Module({
  imports: [PrismaRepositoriesModule, SearchModule],
  controllers: [PublicProductController],
  providers: [
    ProductService,
    ProductCatalogService,
    { provide: PRODUCT_SERVICE, useExisting: ProductService },
    { provide: PRODUCT_CATALOG_SERVICE, useExisting: ProductCatalogService },
    ...PRODUCT_QUERY_HANDLERS],
})
export class PublicProductModule {}

/**
 * Search Module
 * @module product-service/infrastructure/persistence/search
 */
import { Global, Module } from '@nestjs/common';
import { SearchService } from './search.service.js';
import { ProductIndexer } from './indexers/product.indexer.js';
import { CategoryIndexer } from './indexers/category.indexer.js';
import { ProductSearchRepository } from './repositories/product.search.repository.js';

const PROVIDERS = [SearchService, ProductIndexer, CategoryIndexer, ProductSearchRepository];

@Global()
@Module({
  providers: PROVIDERS,
  exports: PROVIDERS,
})
export class SearchModule {}

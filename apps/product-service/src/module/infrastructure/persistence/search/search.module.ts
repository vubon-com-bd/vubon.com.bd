/**
 * SearchModule — Meilisearch integration, indexers, query repositories.
 * @module product-service/infrastructure/persistence/search
 */
import { Module } from '@nestjs/common';
import { SearchClient } from './search.client.js';
import { ProductIndexer } from './indexers/product.indexer.js';
import { CategoryIndexer } from './indexers/category.indexer.js';
import { BrandIndexer } from './indexers/brand.indexer.js';
import { ProductSearchRepository } from './repositories/product-search.repository.js';
import { CategorySearchRepository } from './repositories/category-search.repository.js';
import { PrismaRepositoriesModule } from '../prisma/repositories.module.js';

const SEARCH_PROVIDERS = [
  SearchClient,
  ProductIndexer,
  CategoryIndexer,
  BrandIndexer,
  ProductSearchRepository,
  CategorySearchRepository,
];

@Module({
  imports: [PrismaRepositoriesModule],
  providers: [...SEARCH_PROVIDERS],
  exports: [...SEARCH_PROVIDERS],
})
export class SearchModule {}

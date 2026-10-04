/**
 * CacheModule — provides Redis cache repositories
 * @module product-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.module';

import {
  ProductCacheRepository,
  PRODUCT_CACHE_REPOSITORY,
} from './repositories/product.cache-repository.js';
import {
  ProductListCacheRepository,
  PRODUCT_LIST_CACHE_REPOSITORY,
} from './repositories/product-list.cache-repository.js';
import {
  CategoryTreeCacheRepository,
  CATEGORY_TREE_CACHE_REPOSITORY,
} from './repositories/category-tree.cache-repository.js';
import {
  InventoryCacheRepository,
  INVENTORY_CACHE_REPOSITORY,
} from './repositories/inventory.cache-repository.js';
import {
  SearchResultCacheRepository,
  SEARCH_RESULT_CACHE_REPOSITORY,
} from './repositories/search-result.cache-repository.js';

const CACHE_PROVIDERS = [
  ProductCacheRepository,
  ProductListCacheRepository,
  CategoryTreeCacheRepository,
  InventoryCacheRepository,
  SearchResultCacheRepository,
  { provide: PRODUCT_CACHE_REPOSITORY, useExisting: ProductCacheRepository },
  { provide: PRODUCT_LIST_CACHE_REPOSITORY, useExisting: ProductListCacheRepository },
  { provide: CATEGORY_TREE_CACHE_REPOSITORY, useExisting: CategoryTreeCacheRepository },
  { provide: INVENTORY_CACHE_REPOSITORY, useExisting: InventoryCacheRepository },
  { provide: SEARCH_RESULT_CACHE_REPOSITORY, useExisting: SearchResultCacheRepository },
];

@Module({
  imports: [RedisModule],
  providers: [...CACHE_PROVIDERS],
  exports: [...CACHE_PROVIDERS],
})
export class CacheModule {}

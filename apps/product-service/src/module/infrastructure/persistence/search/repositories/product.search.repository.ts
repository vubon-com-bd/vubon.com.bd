/**
 * ProductSearchRepository — read adapter for product search queries
 * @module product-service/infrastructure/persistence/search/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  SearchService,
  type SearchHit,
  type SearchIndexDocument,
} from '../search.service.js';
import { PRODUCT_INDEX } from '../indexers/product.indexer.js';

export interface ProductSearchFilter {
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly isPublished?: boolean;
  readonly isFeatured?: boolean;
  readonly inStockOnly?: boolean;
}

export interface ProductSearchOptions {
  readonly query: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly filter?: ProductSearchFilter;
}

@Injectable()
export class ProductSearchRepository {
  private readonly logger = new Logger(ProductSearchRepository.name);

  constructor(private readonly searchService: SearchService) {}

  async search(options: ProductSearchOptions): Promise<readonly SearchHit<SearchIndexDocument>[]> {
    if (!this.searchService.isEnabled()) return [];
    const filter: Record<string, string | number | boolean> = {};
    const f = options.filter;
    if (f) {
      if (f.categoryId) filter['categoryId'] = f.categoryId;
      if (f.brandId) filter['brandId'] = f.brandId;
      if (f.vendorId) filter['vendorId'] = f.vendorId;
      if (f.status) filter['status'] = f.status;
      if (f.isPublished !== undefined) filter['isPublished'] = f.isPublished;
      if (f.isFeatured !== undefined) filter['isFeatured'] = f.isFeatured;
      if (f.inStockOnly === true) filter['totalStock'] = 1;
    }

    const result = await this.searchService.search(PRODUCT_INDEX, {
      query: options.query,
      limit: options.limit ?? 20,
      offset: options.offset ?? 0,
      filter,
    });
    return result.hits;
  }
}

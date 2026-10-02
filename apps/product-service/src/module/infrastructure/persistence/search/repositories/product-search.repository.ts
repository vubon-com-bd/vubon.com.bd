/**
 * ProductSearchRepository — reads product search results.
 * @module product-service/infrastructure/persistence/search/repositories
 */
import { Injectable } from '@nestjs/common';
import { SearchClient } from '../search.client.js';
import type { ProductSearchDocument } from '../search-documents.js';
import { searchConfig } from '../../../config/search.config.js';

export interface ProductSearchQuery {
  readonly query: string;
  readonly page?: number;
  readonly limit?: number;
  readonly filter?: {
    readonly status?: string;
    readonly type?: string;
    readonly categoryId?: string;
    readonly brandId?: string;
    readonly isFeatured?: boolean;
    readonly minPrice?: number;
    readonly maxPrice?: number;
    readonly tags?: readonly string[];
  };
  readonly sort?: readonly string[];
}

export interface ProductSearchResult {
  readonly hits: readonly ProductSearchDocument[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly processingTimeMs: number;
}

export const PRODUCT_SEARCH_REPOSITORY = Symbol('PRODUCT_SEARCH_REPOSITORY');

@Injectable()
export class ProductSearchRepository {
  private readonly indexName = searchConfig.PRODUCT_INDEX;

  constructor(private readonly client: SearchClient) {}

  async search(params: ProductSearchQuery): Promise<ProductSearchResult> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;

    const filterClauses: string[] = [];
    if (params.filter) {
      const f = params.filter;
      if (f.status) filterClauses.push(`status = "${f.status}"`);
      if (f.type) filterClauses.push(`type = "${f.type}"`);
      if (f.categoryId) filterClauses.push(`categoryId = "${f.categoryId}"`);
      if (f.brandId) filterClauses.push(`brandId = "${f.brandId}"`);
      if (f.isFeatured !== undefined) filterClauses.push(`isFeatured = ${f.isFeatured}`);
      if (f.minPrice !== undefined) filterClauses.push(`price >= ${f.minPrice}`);
      if (f.maxPrice !== undefined) filterClauses.push(`price <= ${f.maxPrice}`);
      if (f.tags && f.tags.length > 0) {
        const tagClauses = f.tags.map((t) => `tags = "${t}"`).join(' OR ');
        filterClauses.push(`(${tagClauses})`);
      }
    }

    const res = await this.client.search<ProductSearchDocument>(this.indexName, params.query, {
      limit,
      offset: (page - 1) * limit,
      filter: filterClauses.length > 0 ? filterClauses : undefined,
      sort: params.sort,
    });

    return {
      hits: res.hits.map((h) => h.document),
      total: res.estimatedTotalHits,
      page,
      limit,
      processingTimeMs: res.processingTimeMs,
    };
  }

  async suggest(query: string, limit = 10): Promise<readonly string[]> {
    const res = await this.client.search<ProductSearchDocument>(this.indexName, query, {
      limit,
      attributesToRetrieve: ['name', 'slug'],
    });
    return res.hits.map((h) => h.document.name).filter(Boolean);
  }
}

/**
 * CategorySearchRepository
 * @module product-service/infrastructure/persistence/search/repositories
 */
import { Injectable } from '@nestjs/common';
import { SearchClient } from '../search.client.js';
import type { CategorySearchDocument } from '../search-documents.js';
import { searchConfig } from '../../../config/search.config.js';

export const CATEGORY_SEARCH_REPOSITORY = Symbol('CATEGORY_SEARCH_REPOSITORY');

@Injectable()
export class CategorySearchRepository {
  private readonly indexName = searchConfig.CATEGORY_INDEX;

  constructor(private readonly client: SearchClient) {}

  async search(query: string, limit = 20): Promise<readonly CategorySearchDocument[]> {
    const res = await this.client.search<CategorySearchDocument>(this.indexName, query, {
      limit,
      filter: 'status = "active"',
    });
    return res.hits.map((h) => h.document);
  }
}

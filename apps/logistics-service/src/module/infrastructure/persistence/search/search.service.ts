/**
 * SearchService — high-level search facade
 * @module logistics-service/infrastructure/persistence/search
 */
import { Injectable, Logger } from '@nestjs/common';
import { SearchClient } from './search.client.js';
import type { SearchDocument, SearchQuery, SearchResult } from './search.types.js';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly client: SearchClient) {}

  async index(index: string, doc: SearchDocument): Promise<boolean> {
    return this.client.index(index, doc);
  }

  async delete(index: string, id: string): Promise<boolean> {
    return this.client.delete(index, id);
  }

  async search<T extends SearchDocument = SearchDocument>(
    index: string,
    query: SearchQuery,
  ): Promise<SearchResult<T> | null> {
    return this.client.search<T>(index, query);
  }

  async isHealthy(): Promise<boolean> {
    return this.client.isHealthy();
  }
}

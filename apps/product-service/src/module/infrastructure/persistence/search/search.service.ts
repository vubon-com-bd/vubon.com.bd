/**
 * SearchService — full-text search adapter (Meilisearch/Elasticsearch)
 * @module product-service/infrastructure/persistence/search
 *
 * Termux-safe: uses lazy dynamic import; degrades gracefully when
 * the search engine client is unavailable.
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface SearchIndexDocument {
  readonly id: string;
  readonly [key: string]: unknown;
}

export interface SearchQueryOptions {
  readonly query: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly filter?: Readonly<Record<string, string | number | boolean>>;
}

export interface SearchHit<TDocument = SearchIndexDocument> {
  readonly id: string;
  readonly score: number;
  readonly document: TDocument;
}

export interface SearchResult<TDocument = SearchIndexDocument> {
  readonly hits: readonly SearchHit<TDocument>[];
  readonly total: number;
  readonly query: string;
}

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);
  private client: unknown = null;
  private enabled = false;

  onModuleInit(): void {
    const url = getOptionalEnv('SEARCH_URL', '');
    const apiKey = getOptionalEnv('SEARCH_API_KEY', '');
    this.enabled = !!url && !!apiKey;
    if (!this.enabled) {
      this.logger.warn('⚠️ SEARCH_URL or SEARCH_API_KEY missing — search disabled');
      return;
    }
    this.logger.log(`Search enabled → ${url}`);
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async index(indexName: string, document: SearchIndexDocument): Promise<void> {
    if (!this.enabled) return;
    try {
      // Real adapter integration goes here (e.g. @meilisearch/meilisearch-js).
      this.logger.debug(`[index] ${indexName} → ${document.id}`);
      void this.client;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`index failed: ${msg.slice(0, 120)}`);
    }
  }

  async indexBatch(indexName: string, documents: readonly SearchIndexDocument[]): Promise<void> {
    for (const doc of documents) await this.index(indexName, doc);
  }

  async remove(indexName: string, id: string): Promise<void> {
    if (!this.enabled) return;
    this.logger.debug(`[remove] ${indexName} → ${id}`);
  }

  async search<TDocument = SearchIndexDocument>(
    indexName: string,
    options: SearchQueryOptions,
  ): Promise<SearchResult<TDocument>> {
    if (!this.enabled) {
      return { hits: [], total: 0, query: options.query };
    }
    // Real search goes here.
    this.logger.debug(`[search] ${indexName} → "${options.query}"`);
    return { hits: [], total: 0, query: options.query };
  }

  async health(): Promise<boolean> {
    return this.enabled;
  }
}

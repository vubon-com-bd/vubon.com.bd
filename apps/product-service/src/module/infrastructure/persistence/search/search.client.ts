/**
 * Search Client Type Re-export
 * @module product-service/infrastructure/persistence/search
 */
export interface SearchClientOptions {
  readonly url: string;
  readonly apiKey: string;
  readonly timeoutMs?: number;
}

export type SearchEngine = 'meilisearch' | 'elasticsearch' | 'typesense' | 'algolia';

export interface SearchIndexSettings {
  readonly searchableAttributes?: readonly string[];
  readonly filterableAttributes?: readonly string[];
  readonly sortableAttributes?: readonly string[];
}

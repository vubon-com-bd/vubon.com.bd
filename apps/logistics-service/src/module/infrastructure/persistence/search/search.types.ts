/**
 * Search types — Meilisearch/Elasticsearch shapes
 * @module logistics-service/infrastructure/persistence/search
 */
export interface SearchDocument {
  readonly id: string;
  readonly [key: string]: unknown;
}

export interface SearchHit<T extends SearchDocument = SearchDocument> {
  readonly document: T;
  readonly score?: number;
}

export interface SearchResult<T extends SearchDocument = SearchDocument> {
  readonly hits: readonly SearchHit<T>[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

export interface SearchQuery {
  readonly q: string;
  readonly page?: number;
  readonly limit?: number;
  readonly filter?: Readonly<Record<string, string | number | boolean>>;
}

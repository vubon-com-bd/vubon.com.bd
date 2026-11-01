/**
 * SearchClient — generic HTTP client for Meilisearch/Elasticsearch
 * @module logistics-service/infrastructure/persistence/search
 *
 * ⚠️ Best-effort — returns null on failure
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';
import type { SearchDocument, SearchQuery, SearchResult } from './search.types.js';

@Injectable()
export class SearchClient {
  private readonly logger = new Logger(SearchClient.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly indexPrefix: string;

  constructor() {
    this.baseUrl = getOptionalEnv('SEARCH_URL', 'http://localhost:7700');
    this.apiKey = getOptionalEnv('SEARCH_API_KEY', '');
    this.timeoutMs = Number(getOptionalEnv('SEARCH_TIMEOUT_MS', '5000'));
    this.indexPrefix = getOptionalEnv('SEARCH_INDEX_PREFIX', 'logistics_');
  }

  async index(index: string, doc: SearchDocument): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/indexes/${this.indexPrefix}${index}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify([doc]),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      return res.ok;
    } catch (err) {
      this.logger.debug(`Search index error: ${this.errMsg(err)}`);
      return false;
    }
  }

  async delete(index: string, id: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/indexes/${this.indexPrefix}${index}/documents/${id}`, {
        method: 'DELETE',
        headers: this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {},
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      return res.ok;
    } catch (err) {
      this.logger.debug(`Search delete error: ${this.errMsg(err)}`);
      return false;
    }
  }

  async search<T extends SearchDocument = SearchDocument>(
    index: string,
    query: SearchQuery,
  ): Promise<SearchResult<T> | null> {
    try {
      const body = {
        q: query.q,
        limit: query.limit ?? 20,
        offset: ((query.page ?? 1) - 1) * (query.limit ?? 20),
        filter: query.filter,
      };
      const res = await fetch(`${this.baseUrl}/indexes/${this.indexPrefix}${index}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as {
        hits?: T[];
        estimatedTotalHits?: number;
      };
      return {
        hits: (data.hits ?? []).map((h) => ({ document: h })),
        total: data.estimatedTotalHits ?? 0,
        page: query.page ?? 1,
        limit: query.limit ?? 20,
      };
    } catch (err) {
      this.logger.debug(`Search query error: ${this.errMsg(err)}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch { return false; }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}

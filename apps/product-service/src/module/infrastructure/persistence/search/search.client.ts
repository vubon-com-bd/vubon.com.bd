/**
 * SearchClient — thin adapter over Meilisearch HTTP API
 * @module product-service/infrastructure/persistence/search
 *
 * No external SDK — uses fetch to avoid extra dependency.
 */
import { Injectable, Logger } from '@nestjs/common';
import { searchConfig } from '../../config/search.config.js';

export interface SearchDocument {
  readonly id: string;
}

export interface SearchHit<T> {
  readonly document: T;
  readonly score?: number;
}

export interface SearchResponse<T> {
  readonly hits: readonly SearchHit<T>[];
  readonly estimatedTotalHits: number;
  readonly processingTimeMs: number;
  readonly query: string;
}

export interface SearchQueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly filter?: string | readonly string[];
  readonly sort?: readonly string[];
  readonly attributesToRetrieve?: readonly string[];
}

@Injectable()
export class SearchClient {
  private readonly logger = new Logger(SearchClient.name);

  private headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (searchConfig.API_KEY) h['Authorization'] = `Bearer ${searchConfig.API_KEY}`;
    return h;
  }

  private url(path: string): string {
    return `${searchConfig.HOST.replace(/\/+$/, '')}${path}`;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), searchConfig.TIMEOUT_MS);
    try {
      const res = await fetch(this.url(path), {
        ...init,
        headers: { ...this.headers(), ...(init?.headers ?? {}) },
        signal: controller.signal,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Search API ${res.status}: ${text.slice(0, 200)}`);
      }
      return (await res.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }

  async health(): Promise<boolean> {
    try {
      await this.request<unknown>('/health');
      return true;
    } catch (err) {
      this.logger.warn(`Search health failed: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  async ensureIndex(indexName: string, primaryKey = 'id'): Promise<void> {
    try {
      await this.request(`/indexes/${indexName}`, {
        method: 'POST',
        body: JSON.stringify({ uid: indexName, primaryKey }),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // 409 = already exists
      if (!msg.includes('409') && !msg.toLowerCase().includes('already exists')) throw err;
    }
  }

  async upsertDocuments(indexName: string, documents: readonly SearchDocument[]): Promise<void> {
    if (documents.length === 0) return;
    await this.request(`/indexes/${indexName}/documents`, {
      method: 'PUT',
      body: JSON.stringify(documents),
    });
  }

  async deleteDocument(indexName: string, id: string): Promise<void> {
    await this.request(`/indexes/${indexName}/documents/${id}`, { method: 'DELETE' });
  }

  async deleteAllDocuments(indexName: string): Promise<void> {
    await this.request(`/indexes/${indexName}/documents`, { method: 'DELETE' });
  }

  async search<T>(
    indexName: string,
    query: string,
    options: SearchQueryOptions = {},
  ): Promise<SearchResponse<T>> {
    const body: Record<string, unknown> = {
      q: query,
      limit: options.limit ?? 20,
      offset: options.offset ?? 0,
    };
    if (options.filter) body.filter = options.filter;
    if (options.sort) body.sort = [...options.sort];
    if (options.attributesToRetrieve) body.attributesToRetrieve = [...options.attributesToRetrieve];

    const res = await this.request<{
      hits: readonly T[];
      estimatedTotalHits?: number;
      processingTimeMs?: number;
      query?: string;
    }>(`/indexes/${indexName}/search`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return {
      hits: res.hits.map((document) => ({ document })),
      estimatedTotalHits: res.estimatedTotalHits ?? res.hits.length,
      processingTimeMs: res.processingTimeMs ?? 0,
      query: res.query ?? query,
    };
  }

  async updateSettings(indexName: string, settings: Record<string, unknown>): Promise<void> {
    await this.request(`/indexes/${indexName}/settings`, {
      method: 'PATCH',
      body: JSON.stringify(settings),
    });
  }
}

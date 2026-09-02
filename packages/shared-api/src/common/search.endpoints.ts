import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface SearchOptions {
  query: string;
  filters?: Record<string, unknown>;
  sort?: { field: string; order: 'asc' | 'desc' };
  page?: number;
  limit?: number;
  highlight?: boolean;
  fuzzy?: boolean;
}

export interface SearchResult<T = unknown> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets?: Record<string, { value: string; count: number }[]>;
  suggestions?: string[];
  took?: number;
}

export interface AutoCompleteOptions {
  query: string;
  limit?: number;
  types?: string[];
}

export interface AutoCompleteResult {
  suggestions: string[];
  type: string;
  score: number;
}

export class SearchEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async search<T = unknown>(options: SearchOptions): Promise<SearchResult<T>> {
    const params: Record<string, string> = {
      q: options.query,
    };
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);
    if (options.highlight) params.highlight = String(options.highlight);
    if (options.fuzzy) params.fuzzy = String(options.fuzzy);
    if (options.sort) {
      params.sort = `${options.sort.field}:${options.sort.order}`;
    }
    if (options.filters) {
      params.filters = JSON.stringify(options.filters);
    }

    return this.client.post<SearchResult<T>>('/search', { ...options, ...params });
  }

  async autoComplete(options: AutoCompleteOptions): Promise<AutoCompleteResult[]> {
    const params: Record<string, string> = {
      q: options.query,
    };
    if (options.limit) params.limit = String(options.limit);
    if (options.types) params.types = options.types.join(',');

    return this.client.get<AutoCompleteResult[]>('/search/autocomplete', { params });
  }

  async suggest(query: string, limit?: number): Promise<string[]> {
    const params: Record<string, string> = { q: query };
    if (limit) params.limit = String(limit);

    return this.client.get<string[]>('/search/suggest', { params });
  }

  async searchByCategory<T = unknown>(
    category: string,
    options: Omit<SearchOptions, 'query'>
  ): Promise<SearchResult<T>> {
    const params: Record<string, string> = {
      category,
    };
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);
    if (options.sort) {
      params.sort = `${options.sort.field}:${options.sort.order}`;
    }
    if (options.filters) {
      params.filters = JSON.stringify(options.filters);
    }

    return this.client.get<SearchResult<T>>(`/search/category/${category}`, { params });
  }

  async searchByTag<T = unknown>(
    tag: string,
    options: Omit<SearchOptions, 'query'>
  ): Promise<SearchResult<T>> {
    const params: Record<string, string> = {
      tag,
    };
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);
    if (options.sort) {
      params.sort = `${options.sort.field}:${options.sort.order}`;
    }
    if (options.filters) {
      params.filters = JSON.stringify(options.filters);
    }

    return this.client.get<SearchResult<T>>(`/search/tag/${tag}`, { params });
  }

  async getSearchHistory(): Promise<{ query: string; count: number; lastSearch: string }[]> {
    return this.client.get('/search/history');
  }

  async clearSearchHistory(): Promise<{ success: boolean }> {
    return this.client.delete('/search/history');
  }
}

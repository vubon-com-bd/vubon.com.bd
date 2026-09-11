export interface SearchFilterData {
  field: string;
  operator: string;
  value: unknown;
}

export interface SearchSortData {
  field: string;
  order: 'asc' | 'desc';
}

export interface SearchResult {
  searchId: string;
  query: string;
  type: string;
  filters: SearchFilterData[];
  sorts: SearchSortData[];
  page: number;
  limit: number;
  fields: string[];
  highlight: boolean;
  fuzzy: boolean;
  minScore: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class SearchBuilder {
  private query = '';
  private filters: SearchFilterData[] = [];
  private sorts: SearchSortData[] = [];
  private page = 1;
  private limit = 20;
  private fields: string[] = [];
  private highlight = false;
  private fuzzy = false;
  private minScore = 0;

  setQuery(query: string): this {
    this.query = query;
    return this;
  }

  addFilter(field: string, operator: string, value: unknown): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  addSort(field: string, order: 'asc' | 'desc'): this {
    this.sorts.push({ field, order });
    return this;
  }

  setPagination(page: number, limit: number): this {
    this.page = page;
    this.limit = limit;
    return this;
  }

  setFields(fields: string[]): this {
    this.fields = fields;
    return this;
  }

  enableHighlight(): this {
    this.highlight = true;
    return this;
  }

  enableFuzzy(): this {
    this.fuzzy = true;
    return this;
  }

  setMinScore(score: number): this {
    this.minScore = score;
    return this;
  }

  build(): SearchResult {
    return {
      searchId: crypto.randomUUID(),
      query: this.query,
      type: 'product',
      filters: this.filters,
      sorts: this.sorts,
      page: this.page,
      limit: this.limit,
      fields: this.fields,
      highlight: this.highlight,
      fuzzy: this.fuzzy,
      minScore: this.minScore,
      isActive: true,
      metadata: {},
    };
  }
}

export interface ContentFilter {
  field: string;
  operator: string;
  value: unknown;
}

export class ContentFilterBuilder {
  private filters: ContentFilter[] = [];

  private addFilter(field: string, operator: string, value: unknown): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  byStatus(status: string): this {
    return this.addFilter('status', 'eq', status);
  }

  byType(type: string): this {
    return this.addFilter('type', 'eq', type);
  }

  byCategory(categoryId: string): this {
    return this.addFilter('categoryId', 'eq', categoryId);
  }

  byTag(tagId: string): this {
    return this.addFilter('tagId', 'eq', tagId);
  }

  byAuthor(authorId: string): this {
    return this.addFilter('authorId', 'eq', authorId);
  }

  byDateRange(start: Date, end: Date): this {
    return this.addFilter('createdAt', 'between', [start, end]);
  }

  byPublished(): this {
    return this.addFilter('isPublished', 'eq', true);
  }

  byFeatured(): this {
    return this.addFilter('isFeatured', 'eq', true);
  }

  search(query: string): this {
    return this.addFilter('search', 'like', query);
  }

  build(): ContentFilter[] {
    return this.filters;
  }
}

export interface Filter {
  field: string;
  operator: string;
  value: unknown;
}

export class ProductFilterBuilder {
  private filters: Filter[] = [];

  private addFilter(field: string, operator: string, value: unknown): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  byCategory(categoryId: string): this {
    return this.addFilter('categoryId', 'eq', categoryId);
  }

  byBrand(brandId: string): this {
    return this.addFilter('brandId', 'eq', brandId);
  }

  byPriceRange(min: number, max: number): this {
    return this.addFilter('price', 'between', [min, max]);
  }

  byRating(minRating: number): this {
    return this.addFilter('rating', 'gte', minRating);
  }

  byStockStatus(status: 'in_stock' | 'out_of_stock'): this {
    return this.addFilter('stockStatus', 'eq', status);
  }

  byVendor(vendorId: string): this {
    return this.addFilter('vendorId', 'eq', vendorId);
  }

  byStatus(status: string): this {
    return this.addFilter('status', 'eq', status);
  }

  byTags(tags: string[]): this {
    return this.addFilter('tags', 'in', tags);
  }

  build(): Filter[] {
    return this.filters;
  }
}

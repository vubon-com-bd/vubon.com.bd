export interface SearchFilterItem {
  field: string;
  operator: string;
  value: unknown;
}

export class SearchFilterBuilder {
  private filters: SearchFilterItem[] = [];

  byCategory(categoryId: string): this {
    this.filters.push({ field: 'categoryId', operator: 'eq', value: categoryId });
    return this;
  }

  byBrand(brandId: string): this {
    this.filters.push({ field: 'brandId', operator: 'eq', value: brandId });
    return this;
  }

  byPriceRange(min: number, max: number): this {
    this.filters.push({ field: 'price', operator: 'between', value: [min, max] });
    return this;
  }

  byRating(minRating: number): this {
    this.filters.push({ field: 'rating', operator: 'gte', value: minRating });
    return this;
  }

  byStockStatus(status: string): this {
    this.filters.push({ field: 'stockStatus', operator: 'eq', value: status });
    return this;
  }

  byVendor(vendorId: string): this {
    this.filters.push({ field: 'vendorId', operator: 'eq', value: vendorId });
    return this;
  }

  byStatus(status: string): this {
    this.filters.push({ field: 'status', operator: 'eq', value: status });
    return this;
  }

  byTags(tags: string[]): this {
    this.filters.push({ field: 'tags', operator: 'in', value: tags });
    return this;
  }

  build(): SearchFilterItem[] {
    return this.filters;
  }
}

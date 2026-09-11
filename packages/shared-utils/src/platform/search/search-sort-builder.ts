export interface SearchSortItem {
  field: string;
  order: 'asc' | 'desc';
}

export class SearchSortBuilder {
  private sorts: SearchSortItem[] = [];

  byRelevance(): this {
    this.sorts.push({ field: 'relevance', order: 'desc' });
    return this;
  }

  byPopularity(): this {
    this.sorts.push({ field: 'popularity', order: 'desc' });
    return this;
  }

  byRating(): this {
    this.sorts.push({ field: 'rating', order: 'desc' });
    return this;
  }

  byPriceLowToHigh(): this {
    this.sorts.push({ field: 'price', order: 'asc' });
    return this;
  }

  byPriceHighToLow(): this {
    this.sorts.push({ field: 'price', order: 'desc' });
    return this;
  }

  byNewest(): this {
    this.sorts.push({ field: 'createdAt', order: 'desc' });
    return this;
  }

  byName(): this {
    this.sorts.push({ field: 'name', order: 'asc' });
    return this;
  }

  build(): SearchSortItem[] {
    return this.sorts;
  }
}

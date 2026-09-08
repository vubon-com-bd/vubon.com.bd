import { Filter, FilterOperator } from '@vubon/shared-types';

export class FilterBuilder {
  private filters: Filter[] = [];

  addFilter(field: string, operator: FilterOperator, value: unknown): this {
    this.filters.push({ field, operator, value });
    return this;
  }

  addEq(field: string, value: unknown): this {
    return this.addFilter(field, 'eq', value);
  }

  addNe(field: string, value: unknown): this {
    return this.addFilter(field, 'ne', value);
  }

  addGt(field: string, value: unknown): this {
    return this.addFilter(field, 'gt', value);
  }

  addGte(field: string, value: unknown): this {
    return this.addFilter(field, 'gte', value);
  }

  addLt(field: string, value: unknown): this {
    return this.addFilter(field, 'lt', value);
  }

  addLte(field: string, value: unknown): this {
    return this.addFilter(field, 'lte', value);
  }

  addLike(field: string, value: string): this {
    return this.addFilter(field, 'like', value);
  }

  addIn(field: string, value: unknown[]): this {
    return this.addFilter(field, 'in', value);
  }

  addBetween(field: string, start: unknown, end: unknown): this {
    return this.addFilter(field, 'between', [start, end]);
  }

  build(): Filter[] {
    return this.filters;
  }
}

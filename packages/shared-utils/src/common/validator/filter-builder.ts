/**
 * Filter Builder — uses FILTER.OPERATORS.
 */
import { FILTER } from '@vubon/shared-constants/src/common/filter.constants';
import type { Filter, FilterOperator } from '@vubon/shared-types';

const OP = FILTER.OPERATORS;

export class FilterBuilder {
  private filters: Filter[] = [];

  addFilter(field: string, operator: FilterOperator, value: unknown): this {
    if (!field) throw new Error('Filter field is required');
    this.filters.push({ field, operator, value });
    return this;
  }

  addEq(field: string, value: unknown): this {
    return this.addFilter(field, OP.EQ, value);
  }
  addNe(field: string, value: unknown): this {
    return this.addFilter(field, OP.NE, value);
  }
  addGt(field: string, value: unknown): this {
    return this.addFilter(field, OP.GT, value);
  }
  addGte(field: string, value: unknown): this {
    return this.addFilter(field, OP.GTE, value);
  }
  addLt(field: string, value: unknown): this {
    return this.addFilter(field, OP.LT, value);
  }
  addLte(field: string, value: unknown): this {
    return this.addFilter(field, OP.LTE, value);
  }
  addLike(field: string, value: string): this {
    return this.addFilter(field, OP.LIKE, value);
  }
  addIn(field: string, value: unknown[]): this {
    return this.addFilter(field, OP.IN, value);
  }
  addBetween(field: string, start: unknown, end: unknown): this {
    return this.addFilter(field, OP.BETWEEN, [start, end]);
  }
  addIsNull(field: string): this {
    return this.addFilter(field, OP.IS_NULL, null);
  }
  addIsNotNull(field: string): this {
    return this.addFilter(field, OP.IS_NOT_NULL, null);
  }

  build(): Filter[] {
    return [...this.filters];
  }

  clear(): this {
    this.filters = [];
    return this;
  }
}

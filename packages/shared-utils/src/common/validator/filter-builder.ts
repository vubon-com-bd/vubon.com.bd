/**
 * Filter Builder
 * ফিল্টার বিল্ডার
 */
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between';
export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | null
  | string[]
  | number[]
  | [string | number, string | number];

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: FilterValue;
}

export interface SortOption {
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterResult {
  conditions: FilterCondition[];
  sorts: SortOption[];
  search: { term: string; fields: string[] };
  pagination: { limit: number; offset: number };
}

export interface SQLFilterResult {
  where: string;
  params: (string | number | boolean)[];
  orderBy: string;
  limit: number;
  offset: number;
}

export class FilterBuilder {
  private conditions: FilterCondition[] = [];
  private sorts: SortOption[] = [];
  private searchTerm: string = '';
  private searchFields: string[] = [];
  private limit: number = 10;
  private offset: number = 0;

  /**
   * Add filter condition
   * ফিল্টার কন্ডিশন যোগ করা
   */
  where(field: string, operator: FilterOperator, value: FilterValue): this {
    this.conditions.push({ field, operator, value });
    return this;
  }

  /**
   * Add equality filter
   * সমতা ফিল্টার যোগ করা
   */
  whereEq(field: string, value: string | number | boolean): this {
    return this.where(field, 'eq', value);
  }

  /**
   * Add not equal filter
   * অসমতা ফিল্টার যোগ করা
   */
  whereNe(field: string, value: string | number | boolean): this {
    return this.where(field, 'ne', value);
  }

  /**
   * Add greater than filter
   * বড় ফিল্টার যোগ করা
   */
  whereGt(field: string, value: number): this {
    return this.where(field, 'gt', value);
  }

  /**
   * Add greater than or equal filter
   * বড় বা সমান ফিল্টার যোগ করা
   */
  whereGte(field: string, value: number): this {
    return this.where(field, 'gte', value);
  }

  /**
   * Add less than filter
   * ছোট ফিল্টার যোগ করা
   */
  whereLt(field: string, value: number): this {
    return this.where(field, 'lt', value);
  }

  /**
   * Add less than or equal filter
   * ছোট বা সমান ফিল্টার যোগ করা
   */
  whereLte(field: string, value: number): this {
    return this.where(field, 'lte', value);
  }

  /**
   * Add like filter (search)
   * লাইক ফিল্টার যোগ করা
   */
  whereLike(field: string, value: string): this {
    return this.where(field, 'like', value);
  }

  /**
   * Add in filter
   * ইন ফিল্টার যোগ করা
   */
  whereIn(field: string, values: string[] | number[]): this {
    return this.where(field, 'in', values);
  }

  /**
   * Add between filter
   * বিটুইন ফিল্টার যোগ করা
   */
  whereBetween(field: string, start: string | number, end: string | number): this {
    return this.where(field, 'between', [start, end]);
  }

  /**
   * Set search term
   * সার্চ টার্ম সেট করা
   */
  search(term: string, fields: string[]): this {
    this.searchTerm = term;
    this.searchFields = fields;
    return this;
  }

  /**
   * Add sort
   * সর্ট যোগ করা
   */
  sort(field: string, order: 'asc' | 'desc' = 'asc'): this {
    this.sorts.push({ field, order });
    return this;
  }

  /**
   * Set pagination
   * পেজিনেশন সেট করা
   */
  paginate(page: number = 1, pageSize: number = 10): this {
    this.limit = pageSize;
    this.offset = (page - 1) * pageSize;
    return this;
  }

  /**
   * Set limit
   * লিমিট সেট করা
   */
  take(limit: number): this {
    this.limit = limit;
    return this;
  }

  /**
   * Set offset
   * অফসেট সেট করা
   */
  skip(offset: number): this {
    this.offset = offset;
    return this;
  }

  /**
   * Build filter object
   * ফিল্টার অবজেক্ট তৈরি করা
   */
  build(): FilterResult {
    return {
      conditions: this.conditions,
      sorts: this.sorts,
      search: {
        term: this.searchTerm,
        fields: this.searchFields,
      },
      pagination: {
        limit: this.limit,
        offset: this.offset,
      },
    };
  }

  /**
   * Build SQL where clause
   * এসকিউএল হোয়ার ক্লজ তৈরি করা
   */
  buildSQL(): SQLFilterResult {
    const whereClauses: string[] = [];
    const params: (string | number | boolean)[] = [];
    let paramIndex = 1;

    // Build where conditions
    for (const condition of this.conditions) {
      const field = condition.field;
      let clause = '';

      switch (condition.operator) {
        case 'eq':
          clause = `${field} = $${paramIndex}`;
          params.push(condition.value as string | number | boolean);
          break;
        case 'ne':
          clause = `${field} != $${paramIndex}`;
          params.push(condition.value as string | number | boolean);
          break;
        case 'gt':
          clause = `${field} > $${paramIndex}`;
          params.push(condition.value as number);
          break;
        case 'gte':
          clause = `${field} >= $${paramIndex}`;
          params.push(condition.value as number);
          break;
        case 'lt':
          clause = `${field} < $${paramIndex}`;
          params.push(condition.value as number);
          break;
        case 'lte':
          clause = `${field} <= $${paramIndex}`;
          params.push(condition.value as number);
          break;
        case 'like':
          clause = `${field} LIKE $${paramIndex}`;
          params.push(`%${condition.value as string}%`);
          break;
        case 'in':
          const values = condition.value as string[] | number[];
          const placeholders = values.map(() => `$${paramIndex++}`).join(', ');
          clause = `${field} IN (${placeholders})`;
          params.push(...values);
          break;
        case 'between':
          const betweenValues = condition.value as [string | number, string | number];
          clause = `${field} BETWEEN $${paramIndex} AND $${paramIndex + 1}`;
          params.push(betweenValues[0], betweenValues[1]);
          paramIndex++;
          break;
      }

      if (clause) {
        whereClauses.push(clause);
        paramIndex++;
      }
    }

    // Build search
    if (this.searchTerm && this.searchFields.length > 0) {
      const searchClauses = this.searchFields.map((field) => `${field} LIKE $${paramIndex}`);
      whereClauses.push(`(${searchClauses.join(' OR ')})`);
      params.push(`%${this.searchTerm}%`);
    }

    // Build order by
    const orderBy =
      this.sorts.length > 0
        ? this.sorts.map((s) => `${s.field} ${s.order.toUpperCase()}`).join(', ')
        : '';

    return {
      where: whereClauses.join(' AND '),
      params,
      orderBy,
      limit: this.limit,
      offset: this.offset,
    };
  }

  /**
   * Reset all filters
   * সব ফিল্টার রিসেট করা
   */
  reset(): this {
    this.conditions = [];
    this.sorts = [];
    this.searchTerm = '';
    this.searchFields = [];
    this.limit = 10;
    this.offset = 0;
    return this;
  }
}

/**
 * Create a new filter builder
 * নতুন ফিল্টার বিল্ডার তৈরি করা
 */
export const createFilterBuilder = (): FilterBuilder => {
  return new FilterBuilder();
};

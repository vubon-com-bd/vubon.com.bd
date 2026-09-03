import { BaseDTO } from './common.dto';

export interface FilterCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between';
  value: unknown;
}

export class FilterDTO extends BaseDTO {
  conditions: FilterCondition[] = [];
  logic: 'and' | 'or' = 'and';

  constructor(data?: Partial<FilterDTO>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  validate(): void {
    for (const condition of this.conditions) {
      if (!condition.field || condition.field.length === 0) {
        throw new Error('Filter condition must have a field');
      }
      if (!condition.operator) {
        throw new Error('Filter condition must have an operator');
      }
      if (condition.value === undefined || condition.value === null) {
        throw new Error('Filter condition must have a value');
      }
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      conditions: this.conditions,
      logic: this.logic,
    };
  }

  addCondition(field: string, operator: FilterCondition['operator'], value: unknown): this {
    this.conditions.push({ field, operator, value });
    return this;
  }

  addEq(field: string, value: unknown): this {
    return this.addCondition(field, 'eq', value);
  }

  addNe(field: string, value: unknown): this {
    return this.addCondition(field, 'ne', value);
  }

  addGt(field: string, value: number): this {
    return this.addCondition(field, 'gt', value);
  }

  addGte(field: string, value: number): this {
    return this.addCondition(field, 'gte', value);
  }

  addLt(field: string, value: number): this {
    return this.addCondition(field, 'lt', value);
  }

  addLte(field: string, value: number): this {
    return this.addCondition(field, 'lte', value);
  }

  addLike(field: string, value: string): this {
    return this.addCondition(field, 'like', value);
  }

  addIn(field: string, values: unknown[]): this {
    return this.addCondition(field, 'in', values);
  }

  addBetween(field: string, start: unknown, end: unknown): this {
    return this.addCondition(field, 'between', [start, end]);
  }
}

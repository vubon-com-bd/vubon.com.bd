import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

const VALID_OPERATORS = new Set<string>([
  'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'nin', 'contains', 'startsWith',
]);

export type ReportFilterValue = string | number | boolean | readonly string[];

export interface ReportFilterProps {
  readonly field: string;
  readonly operator: string;
  readonly filterValue: ReportFilterValue;
}

export class ReportFilterVO extends BaseVO<ReportFilterProps> {
  static create(props: ReportFilterProps): ReportFilterVO {
    if (!VALID_OPERATORS.has(props.operator)) {
      throw new Error(`Invalid filter operator: ${props.operator}`);
    }
    if (!props.field || props.field.trim().length === 0) {
      throw new Error('Filter field cannot be empty');
    }
    return new ReportFilterVO(Object.freeze({ ...props }));
  }

  private constructor(value: ReportFilterProps) {
    super(value);
  }

  get field(): string { return this.value.field; }
  get operator(): string { return this.value.operator; }
  get filterValue(): ReportFilterValue { return this.value.filterValue; }

  matches(actual: unknown): boolean {
    const v = this.value.filterValue;
    switch (this.value.operator) {
      case 'eq': return actual === v;
      case 'neq': return actual !== v;
      case 'gt': return typeof actual === 'number' && actual > (v as number);
      case 'gte': return typeof actual === 'number' && actual >= (v as number);
      case 'lt': return typeof actual === 'number' && actual < (v as number);
      case 'lte': return typeof actual === 'number' && actual <= (v as number);
      case 'in': return Array.isArray(v) && v.includes(actual as string);
      case 'nin': return Array.isArray(v) && !v.includes(actual as string);
      case 'contains': return typeof actual === 'string' && actual.includes(String(v));
      case 'startsWith': return typeof actual === 'string' && actual.startsWith(String(v));
      default: return false;
    }
  }
}

/**
 * Report Filter Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Filter conditions for report/data queries।
 * Business Rule:
 * - Max 20 filters
 * - Filter operator valid
 * - Value type matches operator
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import {
  ANALYTICS_FILTER_OPERATOR,
  ANALYTICS_FILTER_LOGIC,
} from '@vubon/shared-constants/platform/analytics';

type FilterOperator = (typeof ANALYTICS_FILTER_OPERATOR)[keyof typeof ANALYTICS_FILTER_OPERATOR];
type FilterLogic = (typeof ANALYTICS_FILTER_LOGIC)[keyof typeof ANALYTICS_FILTER_LOGIC];

const MAX_FILTERS = 20;
const VALID_OPERATORS: readonly string[] = Object.values(ANALYTICS_FILTER_OPERATOR);

export interface FilterCondition {
  readonly field: string;
  readonly operator: FilterOperator;
  readonly value: unknown;
}

export interface ReportFilterVOProps {
  readonly logic: FilterLogic;
  readonly conditions: readonly FilterCondition[];
}

export class ReportFilterVO extends BaseVO<ReportFilterVOProps> {
  private constructor(props: ReportFilterVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ReportFilterVOProps): ReportFilterVO {
    if (props.conditions.length > MAX_FILTERS) {
      throw new Error(`ReportFilterVO supports max ${MAX_FILTERS} filters`);
    }

    for (const c of props.conditions) {
      if (typeof c.field !== 'string' || c.field.trim().length === 0) {
        throw new Error('Filter condition field is required');
      }
      if (!VALID_OPERATORS.includes(c.operator)) {
        throw new Error(`Invalid filter operator: "${c.operator}"`);
      }

      // Value presence checks
      const nullOps: readonly string[] = [
        ANALYTICS_FILTER_OPERATOR.IS_NULL,
        ANALYTICS_FILTER_OPERATOR.IS_NOT_NULL,
      ];
      const arrayOps: readonly string[] = [
        ANALYTICS_FILTER_OPERATOR.IN,
        ANALYTICS_FILTER_OPERATOR.NOT_IN,
      ];
      const rangeOps: readonly string[] = [ANALYTICS_FILTER_OPERATOR.BETWEEN];

      if (nullOps.includes(c.operator) && c.value !== undefined) {
        throw new Error(`Operator "${c.operator}" should not have a value`);
      }
      if (arrayOps.includes(c.operator) && !Array.isArray(c.value)) {
        throw new Error(`Operator "${c.operator}" requires array value`);
      }
      if (rangeOps.includes(c.operator) && !Array.isArray(c.value)) {
        throw new Error(`Operator "${c.operator}" requires [min, max] array`);
      }
    }

    return new ReportFilterVO(props);
  }

  static empty(): ReportFilterVO {
    return new ReportFilterVO({
      logic: ANALYTICS_FILTER_LOGIC.AND,
      conditions: [],
    });
  }

  get logic(): FilterLogic {
    return this.value.logic;
  }

  get conditions(): readonly FilterCondition[] {
    return this.value.conditions;
  }

  isEmpty(): boolean {
    return this.conditions.length === 0;
  }

  count(): number {
    return this.conditions.length;
  }

  isAnd(): boolean {
    return this.logic === ANALYTICS_FILTER_LOGIC.AND;
  }

  isOr(): boolean {
    return this.logic === ANALYTICS_FILTER_LOGIC.OR;
  }

  /** Fields being filtered */
  fields(): readonly string[] {
    return this.conditions.map((c) => c.field);
  }

  /** Has field filter */
  hasField(field: string): boolean {
    return this.conditions.some((c) => c.field === field);
  }
}

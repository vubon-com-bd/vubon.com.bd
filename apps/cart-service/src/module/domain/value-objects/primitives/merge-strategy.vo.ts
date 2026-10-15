/**
 * MergeStrategy Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type MergeStrategyValue =
  | 'sum_quantity'
  | 'max_quantity'
  | 'keep_latest'
  | 'keep_existing'
  | 'replace';

const VALID_STRATEGIES: readonly string[] = [
  'sum_quantity',
  'max_quantity',
  'keep_latest',
  'keep_existing',
  'replace',
];

export class MergeStrategyVO extends BaseVO<MergeStrategyValue> {
  private constructor(value: MergeStrategyValue) {
    super(value);
  }

  static create(raw: string): MergeStrategyVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STRATEGIES.includes(normalized)) {
      throw new ValidationError(
        `Invalid merge strategy: "${normalized}". Allowed: ${VALID_STRATEGIES.join(', ')}`,
        'strategy',
      );
    }
    return new MergeStrategyVO(normalized as MergeStrategyValue);
  }

  static sumQuantity(): MergeStrategyVO {
    return new MergeStrategyVO('sum_quantity');
  }

  static reconstitute(raw: string): MergeStrategyVO {
    return new MergeStrategyVO(raw as MergeStrategyValue);
  }

  isSumQuantity(): boolean { return this.value === 'sum_quantity'; }
  isMaxQuantity(): boolean { return this.value === 'max_quantity'; }
  isKeepLatest(): boolean { return this.value === 'keep_latest'; }
  isKeepExisting(): boolean { return this.value === 'keep_existing'; }
  isReplace(): boolean { return this.value === 'replace'; }

  /**
   * How to merge two quantities.
   */
  mergeQuantities(existing: number, incoming: number): number {
    switch (this.value) {
      case 'sum_quantity':
        return existing + incoming;
      case 'max_quantity':
        return Math.max(existing, incoming);
      case 'keep_latest':
        return incoming;
      case 'keep_existing':
        return existing;
      case 'replace':
        return incoming;
    }
  }
}

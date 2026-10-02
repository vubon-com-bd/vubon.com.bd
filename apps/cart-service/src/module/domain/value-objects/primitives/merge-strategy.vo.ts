/**
 * MergeStrategy Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules for guest→user cart merge:
 * - SUM_QUANTITY: add quantities (capped at max per item)
 * - MAX_QUANTITY: keep higher of the two
 * - KEEP_LATEST: latest added wins
 * - KEEP_EXISTING: user cart wins
 * - REPLACE: guest cart replaces user cart
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';
import { InvalidMergeStrategyError } from '../../errors/merge.errors.js';

const ALLOWED = Object.values(MERGE_STRATEGY) as readonly string[];

export class MergeStrategyVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MergeStrategyVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidMergeStrategyError(String(raw), ALLOWED);
    }
    return new MergeStrategyVO(raw);
  }

  static reconstitute(raw: string): MergeStrategyVO {
    return new MergeStrategyVO(raw);
  }

  static default(): MergeStrategyVO {
    return new MergeStrategyVO(MERGE_STRATEGY.SUM_QUANTITY);
  }

  isSumQuantity(): boolean {
    return this.value === MERGE_STRATEGY.SUM_QUANTITY;
  }

  isMaxQuantity(): boolean {
    return this.value === MERGE_STRATEGY.MAX_QUANTITY;
  }

  isKeepLatest(): boolean {
    return this.value === MERGE_STRATEGY.KEEP_LATEST;
  }

  isKeepExisting(): boolean {
    return this.value === MERGE_STRATEGY.KEEP_EXISTING;
  }

  isReplace(): boolean {
    return this.value === MERGE_STRATEGY.REPLACE;
  }

  /** Combine two quantities per strategy */
  combine(existing: number, incoming: number, maxAllowed: number): number {
    let result: number;
    switch (this.value) {
      case MERGE_STRATEGY.SUM_QUANTITY:
        result = existing + incoming;
        break;
      case MERGE_STRATEGY.MAX_QUANTITY:
        result = Math.max(existing, incoming);
        break;
      case MERGE_STRATEGY.KEEP_LATEST:
      case MERGE_STRATEGY.REPLACE:
        result = incoming;
        break;
      case MERGE_STRATEGY.KEEP_EXISTING:
      default:
        result = existing;
        break;
    }
    return Math.min(result, maxAllowed);
  }
}

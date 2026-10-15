/**
 * CartMergerEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartMergerEntity } from '@domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../fixtures/index';

describe('CartMergerEntity', () => {
  function make() {
    return CartMergerEntity.create({
      id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
      props: {
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        mergedAt: TEST_DATES.NOW,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('create() works with distinct source/target', () => {
    const m = make();
    expect(m.isCompleted()).toBe(false);
  });

  it('create() throws when source === target', () => {
    expect(() =>
      CartMergerEntity.create({
        id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
        props: {
          sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
          targetCartId: CartIdVO.create(TEST_IDS.CART_ID),
          strategy: MergeStrategyVO.sumQuantity(),
          mergedAt: TEST_DATES.NOW,
        },
        now: TEST_DATES.NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('recordConflict() increments conflict count', () => {
    const m = make();
    m.recordConflict(TEST_DATES.NOW);
    expect(m.hasConflicts()).toBe(true);
  });

  it('complete() sets completed', () => {
    const m = make();
    m.complete(5, TEST_DATES.NOW);
    expect(m.isCompleted()).toBe(true);
    expect(m.itemsMerged).toBe(5);
  });

  it('complete() throws if already finished', () => {
    const m = make();
    m.complete(5, TEST_DATES.NOW);
    expect(() => m.complete(3, TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });

  it('fail() sets failure', () => {
    const m = make();
    m.fail('gateway timeout', TEST_DATES.NOW);
    expect(m.isFailed()).toBe(true);
    expect(m.failureReason).toBe('gateway timeout');
  });

  it('recordConflict() throws on finished merger', () => {
    const m = make();
    m.complete(3, TEST_DATES.NOW);
    expect(() => m.recordConflict(TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });
});

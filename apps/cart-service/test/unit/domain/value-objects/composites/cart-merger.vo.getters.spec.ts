import { describe, it, expect } from '@jest/globals';
import { CartMergerVO } from '@domain/value-objects/composites/cart-merger.vo.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('CartMergerVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartMergerVO.create({
      id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
      sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
      targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
      strategy: MergeStrategyVO.sumQuantity(),
      itemsMerged: 5,
      conflicts: 0,
      mergedAt: TEST_DATES.NOW,
    });

    expect(vo.id.value).toBe(TEST_IDS.MERGER_ID);
    expect(vo.sourceCartId.value).toBe(TEST_IDS.CART_ID);
    expect(vo.targetCartId.value).toBe(TEST_IDS.CART_ID_2);
    expect(vo.strategy.isSumQuantity()).toBe(true);
    expect(vo.itemsMerged).toBe(5);
    expect(vo.conflicts).toBe(0);
    expect(vo.mergedAt).toBe(TEST_DATES.NOW);
    expect(vo.hasConflicts()).toBe(false);
    expect(vo.isClean()).toBe(true);
  });

  it('isClean false when conflicts', () => {
    const vo = CartMergerVO.create({
      id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
      sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
      targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
      strategy: MergeStrategyVO.sumQuantity(),
      itemsMerged: 5,
      conflicts: 2,
      mergedAt: TEST_DATES.NOW,
    });
    expect(vo.hasConflicts()).toBe(true);
    expect(vo.isClean()).toBe(false);
  });

  it('isClean false when itemsMerged=0', () => {
    const vo = CartMergerVO.create({
      id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
      sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
      targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
      strategy: MergeStrategyVO.sumQuantity(),
      itemsMerged: 0,
      conflicts: 0,
      mergedAt: TEST_DATES.NOW,
    });
    expect(vo.isClean()).toBe(false);
  });

  it('throws on non-integer itemsMerged', () => {
    expect(() =>
      CartMergerVO.create({
        id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        itemsMerged: 1.5,
        conflicts: 0,
        mergedAt: TEST_DATES.NOW,
      }),
    ).toThrow();
  });

  it('throws on non-integer conflicts', () => {
    expect(() =>
      CartMergerVO.create({
        id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
        strategy: MergeStrategyVO.sumQuantity(),
        itemsMerged: 5,
        conflicts: 1.5,
        mergedAt: TEST_DATES.NOW,
      }),
    ).toThrow();
  });
});

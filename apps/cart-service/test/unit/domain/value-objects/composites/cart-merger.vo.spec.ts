import { describe, it, expect } from '@jest/globals';
import { CartMergerVO } from '@domain/value-objects/composites/cart-merger.vo.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('CartMergerVO', () => {
  const makeProps = () => ({
    id: CartMergerIdVO.create(TEST_IDS.MERGER_ID),
    sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
    targetCartId: CartIdVO.create(TEST_IDS.CART_ID_2),
    strategy: MergeStrategyVO.sumQuantity(),
    itemsMerged: 5,
    conflicts: 0,
    mergedAt: TEST_DATES.NOW,
  });

  it('create() works', () => {
    const vo = CartMergerVO.create(makeProps());
    expect(vo.hasConflicts()).toBe(false);
    expect(vo.isClean()).toBe(true);
  });

  it('throws on same source/target', () => {
    expect(() =>
      CartMergerVO.create({
        ...makeProps(),
        sourceCartId: CartIdVO.create(TEST_IDS.CART_ID),
        targetCartId: CartIdVO.create(TEST_IDS.CART_ID),
      }),
    ).toThrow(ValidationError);
  });

  it('hasConflicts() for conflicts > 0', () => {
    const vo = CartMergerVO.create({ ...makeProps(), conflicts: 2 });
    expect(vo.hasConflicts()).toBe(true);
    expect(vo.isClean()).toBe(false);
  });
});

/**
 * CartMergerCompositeVO — Unit Tests
 */
import { CartMergerCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-merger.vo.js';
import { CartMergerIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-merger-id.vo.js';
import { MergeStrategyVO } from '../../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

const UUID_A = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const UUID_B = '00000000-0000-0000-0000-000000000001';
const UUID_C = '00000000-0000-0000-0000-000000000002';

function makeProps(overrides = {}) {
  return {
    id: CartMergerIdVO.create(UUID_A),
    sourceCartId: CartIdVO.create(UUID_B),
    targetCartId: CartIdVO.create(UUID_C),
    strategy: MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY),
    itemsMerged: 10,
    conflicts: 2,
    mergedAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

describe('CartMergerCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartMergerCompositeVO.create(makeProps() as never);
      expect(vo.itemsMerged).toBe(10);
      expect(vo.conflicts).toBe(2);
    });

    it('throws when source == target', () => {
      expect(() =>
        CartMergerCompositeVO.create(
          makeProps({ sourceCartId: CartIdVO.create(UUID_C) }) as never,
        ),
      ).toThrow();
    });

    it('throws on negative itemsMerged', () => {
      expect(() =>
        CartMergerCompositeVO.create(makeProps({ itemsMerged: -1 }) as never),
      ).toThrow();
    });

    it('throws on negative conflicts', () => {
      expect(() =>
        CartMergerCompositeVO.create(makeProps({ conflicts: -1 }) as never),
      ).toThrow();
    });
  });

  describe('hadConflicts()', () => {
    it('true when conflicts > 0', () => {
      expect(CartMergerCompositeVO.create(makeProps() as never).hadConflicts()).toBe(true);
    });

    it('false when conflicts == 0', () => {
      expect(
        CartMergerCompositeVO.create(makeProps({ conflicts: 0 }) as never).hadConflicts(),
      ).toBe(false);
    });
  });

  describe('successRatio()', () => {
    it('returns clean ratio', () => {
      const vo = CartMergerCompositeVO.create(makeProps() as never);
      // (10 - 2) / 10 = 0.8
      expect(vo.successRatio()).toBe(0.8);
    });

    it('returns 1 when no items merged', () => {
      const vo = CartMergerCompositeVO.create(makeProps({ itemsMerged: 0 }) as never);
      expect(vo.successRatio()).toBe(1);
    });
  });
});

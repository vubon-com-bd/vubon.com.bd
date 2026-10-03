/**
 * CartMergerEntity — Unit Tests
 */
import { CartMergerEntity } from '../../../../src/module/domain/entities/cart-merger.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

const A = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const B = '00000000-0000-0000-0000-000000000001';
const C = '00000000-0000-0000-0000-000000000002';
const NOW = '2026-01-01T00:00:00Z';

function makeProps(overrides = {}) {
  return {
    sourceCartId: CartIdVO.create(B),
    targetCartId: CartIdVO.create(C),
    strategy: MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY),
    itemsMerged: 10,
    conflicts: 2,
    mergedAt: NOW,
    ...overrides,
  };
}

describe('CartMergerEntity', () => {
  it('creates entity', () => {
    const e = CartMergerEntity.create({ id: A, props: makeProps() as never, now: NOW });
    expect(e.itemsMerged).toBe(10);
  });

  it('throws when source == target', () => {
    expect(() =>
      CartMergerEntity.create({
        id: A,
        props: makeProps({ sourceCartId: CartIdVO.create(C) }) as never,
        now: NOW,
      }),
    ).toThrow();
  });

  it('throws on negative itemsMerged', () => {
    expect(() =>
      CartMergerEntity.create({
        id: A,
        props: makeProps({ itemsMerged: -1 }) as never,
        now: NOW,
      }),
    ).toThrow();
  });

  it('hadConflicts() true when conflicts > 0', () => {
    const e = CartMergerEntity.create({ id: A, props: makeProps() as never, now: NOW });
    expect(e.hadConflicts()).toBe(true);
  });

  it('hadConflicts() false when conflicts == 0', () => {
    const e = CartMergerEntity.create({
      id: A,
      props: makeProps({ conflicts: 0 }) as never,
      now: NOW,
    });
    expect(e.hadConflicts()).toBe(false);
  });

  it('successRatio() computes clean ratio', () => {
    const e = CartMergerEntity.create({ id: A, props: makeProps() as never, now: NOW });
    expect(e.successRatio()).toBe(0.8);
  });

  it('successRatio() returns 1 when no items merged', () => {
    const e = CartMergerEntity.create({
      id: A,
      props: makeProps({ itemsMerged: 0 }) as never,
      now: NOW,
    });
    expect(e.successRatio()).toBe(1);
  });
});

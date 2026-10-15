/**
 * E2E — CartMerger aggregate
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartMergerEntity } from '@domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { e2eDb } from './setup/e2e-database';
import { E2E_IDS, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — CartMerger', () => {
  beforeEach(() => e2eDb.reset());

  function make() {
    return CartMergerEntity.create({
      id: CartMergerIdVO.create('dddddddd-dddd-4ddd-8ddd-dddddddddddd'),
      props: {
        sourceCartId: CartIdVO.create(E2E_IDS.CART),
        targetCartId: CartIdVO.create(E2E_IDS.CART_2),
        strategy: MergeStrategyVO.sumQuantity(),
        mergedAt: E2E_DATES.NOW,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('create → not completed', () => {
    const m = make();
    e2eDb.carts.add(m);
    expect(m.isCompleted()).toBe(false);
  });

  it('recordConflict + resolveConflict', () => {
    const m = make();
    m.recordConflict(E2E_DATES.NOW);
    expect(m.hasConflicts()).toBe(true);
    m.resolveConflict(E2E_IDS.PRODUCT, E2E_DATES.NOW);
    expect(m.hasConflicts()).toBe(false);
  });

  it('complete flow', () => {
    const m = make();
    m.complete(5, E2E_DATES.NOW);
    expect(m.isCompleted()).toBe(true);
    expect(m.itemsMerged).toBe(5);
  });

  it('fail flow', () => {
    const m = make();
    m.fail('gateway error', E2E_DATES.NOW);
    expect(m.isFailed()).toBe(true);
    expect(m.failureReason).toBe('gateway error');
  });

  it('same source/target cart throws', () => {
    expect(() =>
      CartMergerEntity.create({
        id: CartMergerIdVO.create('dddddddd-dddd-4ddd-8ddd-dddddddddddd'),
        props: {
          sourceCartId: CartIdVO.create(E2E_IDS.CART),
          targetCartId: CartIdVO.create(E2E_IDS.CART),
          strategy: MergeStrategyVO.sumQuantity(),
          mergedAt: E2E_DATES.NOW,
        },
        now: E2E_DATES.NOW,
      }),
    ).toThrow();
  });

  it('recordConflict after complete throws', () => {
    const m = make();
    m.complete(3, E2E_DATES.NOW);
    expect(() => m.recordConflict(E2E_DATES.NOW)).toThrow();
  });

  it('complete with non-integer throws', () => {
    expect(() => make().complete(1.5, E2E_DATES.NOW)).toThrow();
  });
});

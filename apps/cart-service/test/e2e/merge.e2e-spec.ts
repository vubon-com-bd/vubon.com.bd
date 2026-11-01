/**
 * E2E — Cart merge (guest → user)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartMergeService } from '@domain/services/cart-merge.service.js';
import { CanMergeSpecification } from '@domain/specifications/can-merge.specification.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { e2eDb } from './setup/e2e-database';
import {
  makeE2EUserCart,
  makeE2EGuestCart,
  makeE2EItem,
  E2E_IDS,
} from './setup/e2e-fixtures';

describe('E2E — Merge flow', () => {
  beforeEach(() => e2eDb.reset());

  it('merge plan sums quantities for same product', () => {
    const userItem = makeE2EItem({ quantity: 2 });
    const guestItem = makeE2EItem({ id: E2E_IDS.ITEM_2, quantity: 3 });

    const merge = CartMergeService.plan(
      [userItem],
      [guestItem],
      MergeStrategyVO.sumQuantity(),
    );

    expect(merge.itemsMerged).toBe(1);
    expect(merge.mergedItems[0].resolvedQuantity).toBe(5);
  });

  it('merge plan max_quantity picks larger', () => {
    const userItem = makeE2EItem({ quantity: 5 });
    const guestItem = makeE2EItem({ id: E2E_IDS.ITEM_2, quantity: 2 });

    const merge = CartMergeService.plan(
      [userItem],
      [guestItem],
      MergeStrategyVO.create('max_quantity'),
    );

    expect(merge.mergedItems[0].resolvedQuantity).toBe(5);
  });

  it('merge with new items only', () => {
    const guestItem = makeE2EItem({
      id: E2E_IDS.ITEM_2,
      productId: E2E_IDS.PRODUCT_2,
      quantity: 1,
    });

    const merge = CartMergeService.plan([], [guestItem], MergeStrategyVO.sumQuantity());
    expect(merge.itemsMerged).toBe(1);
    expect(merge.mergedItems[0].targetItemId).toBeUndefined();
  });

  it('CanMergeSpecification rejects same cart', () => {
    const cart = makeE2EUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source: cart, target: cart })).toBe(false);
  });

  it('CanMergeSpecification accepts valid guest/user', () => {
    const source = makeE2EGuestCart();
    source.applyItemCountDelta(1);
    const target = makeE2EUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(true);
  });

  it('CanMergeSpecification rejects empty source', () => {
    const source = makeE2EGuestCart();
    const target = makeE2EUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(false);
  });

  it('merge conflicts tracked', () => {
    const userItem = makeE2EItem({ quantity: 2 });
    const guestItem = makeE2EItem({ id: E2E_IDS.ITEM_2, quantity: 5 });

    const merge = CartMergeService.plan(
      [userItem],
      [guestItem],
      MergeStrategyVO.create('max_quantity'),
    );
    expect(merge.conflicts).toBeGreaterThan(0);
  });
});

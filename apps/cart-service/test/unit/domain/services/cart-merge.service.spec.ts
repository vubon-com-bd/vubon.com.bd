/**
 * CartMergeService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartMergeService } from '@domain/services/cart-merge.service.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { makeCartItem } from '../../../fixtures/index';

describe('CartMergeService', () => {
  it('plan() adds new items', () => {
    const source = [
      makeCartItem({ id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000001', productId: 'cccccccc-cccc-4ccc-8ccc-000000000001' }),
    ];
    const result = CartMergeService.plan([], source, MergeStrategyVO.sumQuantity());
    expect(result.itemsMerged).toBe(1);
    expect(result.conflicts).toBe(0);
    expect(result.mergedItems[0].resolvedQuantity).toBe(2);
  });

  it('plan() sums quantities for same product/variant', () => {
    const item1 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000001',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 2,
    });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 3,
    });

    const result = CartMergeService.plan([item1], [item2], MergeStrategyVO.sumQuantity());
    expect(result.mergedItems[0].resolvedQuantity).toBe(5);
  });

  it('plan() with max_quantity picks larger', () => {
    const item1 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000001',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 2,
    });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 5,
    });

    const result = CartMergeService.plan(
      [item1],
      [item2],
      MergeStrategyVO.create('max_quantity'),
    );
    expect(result.mergedItems[0].resolvedQuantity).toBe(5);
  });

  it('assertCanMerge() throws on same cart', () => {
    const source = makeCartItem();
    expect(() =>
      CartMergeService.assertCanMerge(
        { id: 'x' } as never,
        { id: 'x' } as never,
      ),
    ).toThrow();
    void source;
  });

  it('plan() marks conflict', () => {
    const item1 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000001',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 2,
    });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: 'cccccccc-cccc-4ccc-8ccc-000000000001',
      quantity: 5,
    });

    const result = CartMergeService.plan(
      [item1],
      [item2],
      MergeStrategyVO.create('max_quantity'),
    );
    expect(result.conflicts).toBe(1);
  });
});

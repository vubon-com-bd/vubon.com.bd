import { jest } from '@jest/globals';

/**
 * CartMergeService (infrastructure) — Unit Tests
 */
import { CartMergeService } from '../../../../../src/module/infrastructure/services/internal/cart-merge.service.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { MergeStrategyVO } from '../../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const SRC = '22222222-2222-2222-2222-222222222222';
const TGT = '33333333-3333-3333-3333-333333333333';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id: string, qty: number) {
  return CartItemEntity.create({
    id, now: NOW,
    props: {
      productId: CartProductIdVO.create(P1),
      sku: 'SKU', name: 'Item', unitPrice: 100,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true, currency: 'BDT',
    },
  });
}

function makeCart(id: string, items: CartItemEntity[]): CartEntity {
  const c = CartEntity.create({
    id, now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT', expiresAt: FUTURE, lastActivityAt: NOW,
    },
  });
  c['_items'] = items;
  return c;
}

describe('CartMergeService (infrastructure)', () => {
  const svc = new CartMergeService();
  const SUM = MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY);
  const MAX = MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY);

  it('executes merge with SUM strategy', () => {
    const r = svc.executeMerge({
      source: makeCart(SRC, [makeItem('s1', 3)]),
      target: makeCart(TGT, [makeItem('t1', 2)]),
      strategy: SUM,
      now: NOW,
    });
    expect(r.mergedItems.length).toBe(1);
    expect(r.mergedItems[0].quantity.value).toBe(5);
  });

  it('executes merge with MAX strategy', () => {
    const r = svc.executeMerge({
      source: makeCart(SRC, [makeItem('s1', 3)]),
      target: makeCart(TGT, [makeItem('t1', 2)]),
      strategy: MAX,
      now: NOW,
    });
    expect(r.mergedItems[0].quantity.value).toBe(3);
  });

  it('handles empty source', () => {
    const r = svc.executeMerge({
      source: makeCart(SRC, []),
      target: makeCart(TGT, [makeItem('t1', 2)]),
      strategy: SUM,
      now: NOW,
    });
    expect(r.mergedItems.length).toBe(1);
    expect(r.itemsMerged).toBe(0);
  });

  it('handles empty target', () => {
    const r = svc.executeMerge({
      source: makeCart(SRC, [makeItem('s1', 3)]),
      target: makeCart(TGT, []),
      strategy: SUM,
      now: NOW,
    });
    expect(r.mergedItems.length).toBe(1);
  });

  it('reports conflicts when capping quantity', () => {
    const r = svc.executeMerge({
      source: makeCart(SRC, [makeItem('s1', 900)]),
      target: makeCart(TGT, [makeItem('t1', 900)]),
      strategy: SUM,
      now: NOW,
    });
    expect(r.conflicts.length).toBeGreaterThan(0);
  });
});

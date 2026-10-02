/**
 * CartMergeService — Unit Tests
 */
import { CartMergeService } from '../../../../src/module/domain/services/cart-merge.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { MergeStrategyVO } from '../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const P2 = '22222222-2222-2222-2222-222222222222';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id: string, productId: string, qty: number) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(productId),
      sku: `SKU-${productId.slice(0, 4)}`,
      name: `Item ${productId.slice(0, 4)}`,
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(id: string, items: CartItemEntity[]): CartEntity {
  const c = CartEntity.create({
    id,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = items;
  return c;
}

describe('CartMergeService', () => {
  const svc = new CartMergeService();
  const SUM = MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY);
  const MAX = MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY);

  describe('merge()', () => {
    it('adds fresh items from source to empty target', () => {
      const source = makeCart('src', [makeItem('s1', P1, 2)]);
      const target = makeCart('tgt', []);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.mergedItems.length).toBe(1);
      expect(r.itemsMerged).toBe(1);
    });

    it('merges overlapping items — SUM strategy', () => {
      const source = makeCart('src', [makeItem('s1', P1, 3)]);
      const target = makeCart('tgt', [makeItem('t1', P1, 2)]);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.mergedItems.length).toBe(1);
      expect(r.mergedItems[0].quantity.value).toBe(5);
    });

    it('merges overlapping items — MAX strategy', () => {
      const source = makeCart('src', [makeItem('s1', P1, 3)]);
      const target = makeCart('tgt', [makeItem('t1', P1, 2)]);
      const r = svc.merge(source, target, MAX, NOW);
      expect(r.mergedItems[0].quantity.value).toBe(3);
    });

    it('adds distinct items', () => {
      const source = makeCart('src', [makeItem('s1', P2, 2)]);
      const target = makeCart('tgt', [makeItem('t1', P1, 3)]);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.mergedItems.length).toBe(2);
    });

    it('handles empty source', () => {
      const source = makeCart('src', []);
      const target = makeCart('tgt', [makeItem('t1', P1, 3)]);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.mergedItems.length).toBe(1);
      expect(r.itemsMerged).toBe(0);
    });

    it('handles empty target', () => {
      const source = makeCart('src', [makeItem('s1', P1, 3)]);
      const target = makeCart('tgt', []);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.mergedItems.length).toBe(1);
    });

    it('reports conflicts when quantity capped', () => {
      const source = makeCart('src', [makeItem('s1', P1, 900)]);
      const target = makeCart('tgt', [makeItem('t1', P1, 900)]);
      const r = svc.merge(source, target, SUM, NOW);
      expect(r.conflicts.length).toBeGreaterThan(0);
    });
  });

  describe('previewQuantity()', () => {
    it('SUM preview', () => {
      expect(svc.previewQuantity(5, 3, SUM)).toBe(8);
    });

    it('MAX preview', () => {
      expect(svc.previewQuantity(5, 3, MAX)).toBe(5);
    });
  });
});

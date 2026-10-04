/**
 * AbandonmentDetectorService — Unit Tests
 */
import { AbandonmentDetectorService } from '../../../../../src/module/infrastructure/services/internal/abandonment-detector.service.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, ABANDONED_CART } from '@vubon/shared-constants/business/cart';

const P = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const FUTURE = '2099-12-31T23:59:59Z';

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

function makeItem() {
  return CartItemEntity.create({
    id: 'i1', now: hoursAgo(48),
    props: {
      productId: CartProductIdVO.create(P),
      sku: 'SKU', name: 'Item', unitPrice: 100,
      quantity: CartItemQuantityVO.create(1),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true, currency: 'BDT',
    },
  });
}

function makeCart(lastActivityAt: string) {
  const c = CartEntity.create({
    id: P, now: lastActivityAt,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT', expiresAt: FUTURE, lastActivityAt,
    },
  });
  c['_items'] = [makeItem()];
  return c;
}

describe('AbandonmentDetectorService', () => {
  const svc = new AbandonmentDetectorService();

  it('detect() → abandoned for idle cart', () => {
    const r = svc.detect(makeCart(hoursAgo(48)));
    expect(r.abandoned).toBe(true);
    expect(r.hoursSinceActivity).toBeGreaterThanOrEqual(ABANDONED_CART.THRESHOLD_HOURS);
  });

  it('detect() → not abandoned for recent cart', () => {
    const r = svc.detect(makeCart(hoursAgo(1)));
    expect(r.abandoned).toBe(false);
  });

  it('recoveryDiscount() returns constant', () => {
    expect(svc.recoveryDiscount()).toBe(ABANDONED_CART.DISCOUNT_PERCENTAGE);
  });

  it('isEnabled() boolean', () => {
    expect(typeof svc.isEnabled()).toBe('boolean');
  });
});

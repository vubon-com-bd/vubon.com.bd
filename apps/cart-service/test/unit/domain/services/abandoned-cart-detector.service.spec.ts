/**
 * AbandonedCartDetectorService — Unit Tests
 */
import { AbandonedCartDetectorService } from '../../../../src/module/domain/services/abandoned-cart-detector.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, ABANDONED_CART } from '@vubon/shared-constants/business/cart';

const P = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T12:00:00Z';

function makeItem() {
  return CartItemEntity.create({
    id: 'i1',
    now: NOW,
    props: {
      productId: CartProductIdVO.create(P),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(1),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(opts: { items?: CartItemEntity[]; lastActivityAt?: string; status?: string } = {}) {
  const c = CartEntity.create({
    id: P,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(opts.status ?? CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: '2099-12-31T23:59:59Z',
      lastActivityAt: opts.lastActivityAt ?? NOW,
    },
  });
  c['_items'] = opts.items ?? [makeItem()];
  return c;
}

describe('AbandonedCartDetectorService', () => {
  const svc = new AbandonedCartDetectorService();

  describe('detect()', () => {
    it('not abandoned when recently active', () => {
      const cart = makeCart({ lastActivityAt: NOW });
      const now = new Date('2026-01-01T13:00:00Z'); // 1h later
      const r = svc.detect({ cart, now });
      expect(r.abandoned).toBe(false);
    });

    it('abandoned when idle exceeds threshold', () => {
      const cart = makeCart({ lastActivityAt: NOW });
      const now = new Date('2026-01-03T12:00:00Z'); // 48h later (threshold 24)
      const r = svc.detect({ cart, now });
      expect(r.abandoned).toBe(true);
    });

    it('not abandoned for empty cart', () => {
      const cart = makeCart({ items: [], lastActivityAt: NOW });
      const now = new Date('2026-01-03T12:00:00Z');
      const r = svc.detect({ cart, now });
      expect(r.abandoned).toBe(false);
    });

    it('not abandoned for non-active cart', () => {
      const cart = makeCart({ lastActivityAt: NOW, status: CART_STATUS.EXPIRED });
      const now = new Date('2026-01-03T12:00:00Z');
      const r = svc.detect({ cart, now });
      expect(r.abandoned).toBe(false);
    });

    it('custom threshold respected', () => {
      const cart = makeCart({ lastActivityAt: NOW });
      const now = new Date('2026-01-01T14:00:00Z'); // 2h
      const r = svc.detect({ cart, now, thresholdHours: 1 });
      expect(r.abandoned).toBe(true);
    });
  });

  describe('nextReminderTier()', () => {
    it('null when remindersSent >= tiers length', () => {
      expect(svc.nextReminderTier(200, 4)).toBeNull();
    });

    it('returns first tier when hours >= first', () => {
      const t = svc.nextReminderTier(ABANDONED_CART.FIRST_REMINDER_HOURS, 0);
      expect(t).toBe(ABANDONED_CART.FIRST_REMINDER_HOURS);
    });

    it('null when hours below first tier', () => {
      const t = svc.nextReminderTier(0, 0);
      expect(t).toBeNull();
    });
  });

  describe('recoveryDiscountPercent()', () => {
    it('returns configured percentage', () => {
      expect(svc.recoveryDiscountPercent()).toBe(ABANDONED_CART.DISCOUNT_PERCENTAGE);
    });
  });

  describe('shouldMarkLost()', () => {
    it('true when exceeded expiry days', () => {
      const hours = ABANDONED_CART.EXPIRY_DAYS * 24 + 1;
      expect(svc.shouldMarkLost(hours)).toBe(true);
    });

    it('false when within expiry days', () => {
      expect(svc.shouldMarkLost(24)).toBe(false);
    });
  });
});

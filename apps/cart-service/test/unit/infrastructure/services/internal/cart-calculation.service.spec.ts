import { jest } from '@jest/globals';

/**
 * CartCalculationService (infrastructure) — Unit Tests
 */
import { CartCalculationService } from '../../../../../src/module/infrastructure/services/internal/cart-calculation.service.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { TaxClient } from '../../../../../src/module/infrastructure/services/external/tax.client.js';
import type { ShippingClient } from '../../../../../src/module/infrastructure/services/external/shipping.client.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeTaxClient(): jest.Mocked<TaxClient> {
  return { calculate: jest.fn(), getRate: jest.fn() } as unknown as jest.Mocked<TaxClient>;
}

function makeShipClient(): jest.Mocked<ShippingClient> {
  return { quote: jest.fn(), listMethods: jest.fn() } as unknown as jest.Mocked<ShippingClient>;
}

function makeItem() {
  return CartItemEntity.create({
    id: 'i1', now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU', name: 'Item', unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true, currency: 'BDT',
    },
  });
}

function makeCart(paid: boolean = true) {
  const c = CartEntity.create({
    id: UUID, now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT', expiresAt: FUTURE, lastActivityAt: NOW,
    },
  });
  c['_items'] = [makeItem()];
  if (paid) c.recalculateTotals({ now: NOW });
  return c;
}

describe('CartCalculationService (infrastructure)', () => {
  let tax: jest.Mocked<TaxClient>;
  let ship: jest.Mocked<ShippingClient>;
  let svc: CartCalculationService;

  beforeEach(() => {
    tax = makeTaxClient();
    ship = makeShipClient();
    svc = new CartCalculationService(tax, ship);
  });

  describe('calculateLocal()', () => {
    it('computes local totals without external calls', () => {
      const t = svc.calculateLocal(makeCart(false));
      expect(t.subtotal).toBe(200);
      expect(tax.calculate).not.toHaveBeenCalled();
      expect(ship.quote).not.toHaveBeenCalled();
    });
  });

  describe('calculateWithExternals()', () => {
    it('uses tax rate from tax client', async () => {
      tax.calculate.mockResolvedValue({ rate: 15, amount: 0, inclusive: false, currency: 'BDT' });
      const t = await svc.calculateWithExternals({ cart: makeCart(true), region: 'BD' });
      expect(tax.calculate).toHaveBeenCalledWith(200, 'BD');
      expect(t.taxAmount).toBe(30);
    });

    it('uses shipping cost from shipping client', async () => {
      ship.quote.mockResolvedValue({
        method: 'standard', cost: 50, currency: 'BDT',
        estimatedDaysMin: 3, estimatedDaysMax: 7,
      });
      const t = await svc.calculateWithExternals({
        cart: makeCart(false), shippingMethod: 'standard',
      });
      expect(t.shippingAmount).toBe(50);
    });

    it('applies coupon + voucher discounts', async () => {
      const t = await svc.calculateWithExternals({
        cart: makeCart(false),
        couponDiscount: 30,
        voucherDiscount: 20,
      });
      expect(t.couponDiscount).toBe(30);
      expect(t.voucherDiscount).toBe(20);
    });

    it('handles tax client returning null', async () => {
      tax.calculate.mockResolvedValue(null);
      const t = await svc.calculateWithExternals({ cart: makeCart(true), region: 'BD' });
      expect(t.taxAmount).toBe(0);
    });

    it('handles shipping client returning null', async () => {
      ship.quote.mockResolvedValue(null);
      const t = await svc.calculateWithExternals({
        cart: makeCart(false), shippingMethod: 'standard',
      });
      expect(t.shippingAmount).toBe(0);
    });

    it('combines tax + shipping + discounts', async () => {
      tax.calculate.mockResolvedValue({ rate: 10, amount: 0, inclusive: false, currency: 'BDT' });
      ship.quote.mockResolvedValue({
        method: 'standard', cost: 50, currency: 'BDT',
        estimatedDaysMin: 3, estimatedDaysMax: 7,
      });
      const t = await svc.calculateWithExternals({
        cart: makeCart(false),
        region: 'BD',
        shippingMethod: 'standard',
        couponDiscount: 20,
      });
      // subtotal 200, coupon 20 → 180, tax 18, shipping 50 → total 248
      expect(t.grandTotal).toBe(248);
    });
  });
});

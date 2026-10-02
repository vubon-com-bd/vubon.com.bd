import { jest } from '@jest/globals';

/**
 * PriceSyncService (infrastructure) — Unit Tests
 */
import { PriceSyncService } from '../../../../../src/module/infrastructure/services/internal/price-sync.service.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { PricingClient } from '../../../../../src/module/infrastructure/services/external/pricing.client.js';
import type { ProductClient } from '../../../../../src/module/infrastructure/services/external/product.client.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makePricing(): jest.Mocked<PricingClient> {
  return { getPrice: jest.fn(), getPrices: jest.fn() } as unknown as jest.Mocked<PricingClient>;
}

function makeProduct(): jest.Mocked<ProductClient> {
  return { getProduct: jest.fn(), getProducts: jest.fn(), getVariant: jest.fn(), getStock: jest.fn() } as unknown as jest.Mocked<ProductClient>;
}

function makeItem(id: string, price: number, qty: number) {
  return CartItemEntity.create({
    id, now: NOW,
    props: {
      productId: CartProductIdVO.create(P1),
      sku: 'SKU', name: 'Item', unitPrice: price,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true, currency: 'BDT',
    },
  });
}

function makeCart(items: CartItemEntity[]): CartEntity {
  const c = CartEntity.create({
    id: P1, now: NOW,
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

describe('PriceSyncService (infrastructure)', () => {
  let pricing: jest.Mocked<PricingClient>;
  let product: jest.Mocked<ProductClient>;
  let svc: PriceSyncService;

  beforeEach(() => {
    pricing = makePricing();
    product = makeProduct();
    svc = new PriceSyncService(pricing, product);
  });

  it('detectChanges returns no changes when snapshot empty', async () => {
    pricing.getPrices.mockResolvedValue([]);
    const r = await svc.detectChanges(makeCart([makeItem('i1', 100, 1)]));
    expect(r.hasChanges).toBe(false);
  });

  it('detectChanges finds price delta', async () => {
    pricing.getPrices.mockResolvedValue([
      { productId: P1, price: 150, currency: 'BDT' },
    ]);
    product.getProducts.mockResolvedValue([
      { id: P1, sku: 'S', name: 'N', price: 150, currency: 'BDT', stock: 10, available: true },
    ]);
    const r = await svc.detectChanges(makeCart([makeItem('i1', 100, 1)]));
    expect(r.hasChanges).toBe(true);
    expect(r.changes[0].delta).toBe(50);
  });

  it('syncAndApply updates cart items', async () => {
    pricing.getPrices.mockResolvedValue([
      { productId: P1, price: 150, currency: 'BDT' },
    ]);
    product.getProducts.mockResolvedValue([
      { id: P1, sku: 'S', name: 'N', price: 150, currency: 'BDT', stock: 10, available: true },
    ]);
    const cart = makeCart([makeItem('i1', 100, 1)]);
    const r = await svc.syncAndApply(cart, NOW);
    expect(r.hasChanges).toBe(true);
    expect(cart.findItem('i1')?.unitPrice).toBe(150);
  });

  it('syncAndApply no-op when nothing changed', async () => {
    pricing.getPrices.mockResolvedValue([
      { productId: P1, price: 100, currency: 'BDT' },
    ]);
    product.getProducts.mockResolvedValue([
      { id: P1, sku: 'S', name: 'N', price: 100, currency: 'BDT', stock: 10, available: true },
    ]);
    const cart = makeCart([makeItem('i1', 100, 1)]);
    const r = await svc.syncAndApply(cart, NOW);
    expect(r.hasChanges).toBe(false);
  });
});

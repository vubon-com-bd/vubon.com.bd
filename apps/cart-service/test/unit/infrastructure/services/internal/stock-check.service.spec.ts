import { jest } from '@jest/globals';

/**
 * StockCheckService (infrastructure) — Unit Tests
 */
import { StockCheckService } from '../../../../../src/module/infrastructure/services/internal/stock-check.service.js';
import { CartEntity } from '../../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { ProductClient } from '../../../../../src/module/infrastructure/services/external/product.client.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeProduct(): jest.Mocked<ProductClient> {
  return {
    getProduct: jest.fn(), getProducts: jest.fn(), getVariant: jest.fn(), getStock: jest.fn(),
  } as unknown as jest.Mocked<ProductClient>;
}

function makeItem(qty: number) {
  return CartItemEntity.create({
    id: 'i1', now: NOW,
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

describe('StockCheckService (infrastructure)', () => {
  let product: jest.Mocked<ProductClient>;
  let svc: StockCheckService;

  beforeEach(() => {
    product = makeProduct();
    svc = new StockCheckService(product);
  });

  it('checkCart detects sufficient stock', async () => {
    product.getProducts.mockResolvedValue([
      { id: P1, sku: 'S', name: 'N', price: 100, currency: 'BDT', stock: 10, available: true },
    ]);
    const r = await svc.checkCart(makeCart([makeItem(2)]));
    expect(r.allSufficient).toBe(true);
  });

  it('checkCart detects short stock', async () => {
    product.getProducts.mockResolvedValue([
      { id: P1, sku: 'S', name: 'N', price: 100, currency: 'BDT', stock: 1, available: true },
    ]);
    const r = await svc.checkCart(makeCart([makeItem(5)]));
    expect(r.allSufficient).toBe(false);
    expect(r.shortItems.length).toBe(1);
    expect(r.shortItems[0].shortBy).toBe(4);
  });

  it('checkCart treats missing snapshot as 0 stock', async () => {
    product.getProducts.mockResolvedValue([]);
    const r = await svc.checkCart(makeCart([makeItem(1)]));
    expect(r.allSufficient).toBe(false);
  });

  it('getAvailableStock delegates to client', async () => {
    product.getStock.mockResolvedValue(42);
    const r = await svc.getAvailableStock(P1);
    expect(r).toBe(42);
  });

  it('getAvailableStock forwards variantId', async () => {
    product.getStock.mockResolvedValue(5);
    await svc.getAvailableStock(P1, 'variant-1');
    expect(product.getStock).toHaveBeenCalledWith(P1, 'variant-1');
  });
});

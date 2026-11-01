/**
 * E2E — CartItem lifecycle
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import { CartItemIdVO } from '@domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '@domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { CartItemNoteVO } from '@domain/value-objects/primitives/cart-item-note.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ProductIdVO } from '@domain/value-objects/primitives/product-id.vo.js';
import { e2eDb } from './setup/e2e-database';
import { makeE2EItem, E2E_IDS, E2E_DATES, E2E_CURRENCY } from './setup/e2e-fixtures';

describe('E2E — CartItem lifecycle', () => {
  beforeEach(() => {
    e2eDb.reset();
  });

  it('create → active, correct subtotal', () => {
    const item = makeE2EItem({ quantity: 3, unitPrice: 50 });
    e2eDb.items.add(item);
    expect(e2eDb.items.size).toBe(1);
    expect(item.isActive()).toBe(true);
    expect(item.subtotal).toBe(150);
  });

  it('increaseQuantity / decreaseQuantity', () => {
    const item = makeE2EItem({ quantity: 2 });
    item.increaseQuantity(CartItemQuantityVO.create(3), E2E_DATES.NOW);
    expect(item.quantity.value).toBe(5);
    item.decreaseQuantity(CartItemQuantityVO.create(2), E2E_DATES.NOW);
    expect(item.quantity.value).toBe(3);
  });

  it('changeQuantity with new value', () => {
    const item = makeE2EItem();
    item.changeQuantity(CartItemQuantityVO.create(10), E2E_DATES.NOW);
    expect(item.quantity.value).toBe(10);
  });

  it('changeQuantity on removed item throws', () => {
    const item = makeE2EItem();
    item.markRemoved(E2E_DATES.NOW);
    expect(() =>
      item.changeQuantity(CartItemQuantityVO.create(1), E2E_DATES.NOW),
    ).toThrow();
  });

  it('markOutOfStock / markUnavailable', () => {
    const a = makeE2EItem();
    a.markOutOfStock(E2E_DATES.NOW);
    expect(a.isOutOfStock()).toBe(true);

    const b = makeE2EItem({ id: E2E_IDS.ITEM_2 });
    b.markUnavailable(E2E_DATES.NOW);
    expect(b.isUnavailable()).toBe(true);
  });

  it('updateNote / clearNote', () => {
    const item = makeE2EItem();
    item.updateNote(CartItemNoteVO.create('wrap'), E2E_DATES.NOW);
    expect(item.hasNote()).toBe(true);
    item.clearNote(E2E_DATES.NOW);
    expect(item.hasNote()).toBe(false);
  });

  it('updateNote on removed item throws', () => {
    const item = makeE2EItem();
    item.markRemoved(E2E_DATES.NOW);
    expect(() => item.updateNote(CartItemNoteVO.create('x'), E2E_DATES.NOW)).toThrow();
  });

  it('updateUnitPrice recomputes subtotal', () => {
    const item = makeE2EItem({ quantity: 2, unitPrice: 100 });
    item.updateUnitPrice(50, E2E_DATES.NOW);
    expect(item.unitPrice).toBe(50);
    expect(item.subtotal).toBe(100);
  });

  it('updateUnitPrice negative throws', () => {
    const item = makeE2EItem();
    expect(() => item.updateUnitPrice(-1, E2E_DATES.NOW)).toThrow();
  });

  it('status transition: active → out_of_stock → active', () => {
    const item = makeE2EItem();
    item.markOutOfStock(E2E_DATES.NOW);
    expect(item.isOutOfStock()).toBe(true);
    item.changeStatus(CartItemStatusVO.active(), E2E_DATES.NOW);
    expect(item.isActive()).toBe(true);
  });

  it('isPurchasable reflects status', () => {
    const item = makeE2EItem();
    expect(item.isPurchasable()).toBe(true);
    item.markOutOfStock(E2E_DATES.NOW);
    expect(item.isPurchasable()).toBe(false);
  });

  it('reconstitute restores item', () => {
    const item = CartItemEntity.reconstitute({
      id: E2E_IDS.ITEM,
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        productId: ProductIdVO.create(E2E_IDS.PRODUCT),
        quantity: CartItemQuantityVO.create(4),
        status: CartItemStatusVO.active(),
        unitPrice: 25,
        currency: E2E_CURRENCY,
        note: CartItemNoteVO.create('wrap'),
      },
    });
    expect(item.quantity.value).toBe(4);
    expect(item.subtotal).toBe(100);
    expect(item.hasNote()).toBe(true);
  });

  it('create throws on invalid unit price', () => {
    expect(() =>
      CartItemEntity.create({
        id: CartItemIdVO.create(E2E_IDS.ITEM),
        props: {
          cartId: CartIdVO.create(E2E_IDS.CART),
          productId: ProductIdVO.create(E2E_IDS.PRODUCT),
          quantity: CartItemQuantityVO.create(1),
          unitPrice: -1,
          currency: E2E_CURRENCY,
        },
        now: E2E_DATES.NOW,
      }),
    ).toThrow();
  });
});

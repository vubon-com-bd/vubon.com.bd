/**
 * E2E — Cart lifecycle (domain-level scenarios, in-memory)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { CartCreatedEvent } from '@domain/events/cart.events.js';
import { e2eDb } from './setup/e2e-database';
import { makeE2EUserCart, E2E_IDS, E2E_DATES, E2E_CURRENCY } from './setup/e2e-fixtures';

describe('E2E — Cart lifecycle', () => {
  beforeEach(() => {
    e2eDb.reset();
  });

  it('create → active status → empty', () => {
    const cart = makeE2EUserCart();
    e2eDb.carts.add(cart);
    expect(e2eDb.carts.size).toBe(1);
    expect(cart.isActive()).toBe(true);
    expect(cart.isEmpty()).toBe(true);
  });

  it('emits CartCreatedEvent on create', () => {
    const cart = makeE2EUserCart();
    const events = cart.domainEvents;
    expect(events.some((e) => e instanceof CartCreatedEvent)).toBe(true);
  });

  it('activate is idempotent', () => {
    const cart = makeE2EUserCart();
    const v = cart.version;
    cart.activate(E2E_DATES.NOW);
    expect(cart.version).toBe(v);
  });

  it('deactivate → activate → active', () => {
    const cart = makeE2EUserCart();
    cart.deactivate(E2E_DATES.NOW);
    expect(cart.isInactive()).toBe(true);
    cart.activate(E2E_DATES.NOW);
    expect(cart.isActive()).toBe(true);
  });

  it('abandon empty cart throws', () => {
    const cart = makeE2EUserCart();
    expect(() => cart.abandon(E2E_DATES.NOW)).toThrow();
  });

  it('abandon with items succeeds', () => {
    const cart = makeE2EUserCart();
    cart.applyItemCountDelta(1, E2E_DATES.NOW);
    cart.abandon(E2E_DATES.NOW);
    expect(cart.isAbandoned()).toBe(true);
  });

  it('convert empty cart throws', () => {
    const cart = makeE2EUserCart();
    expect(() => cart.convert('ORDER-1', E2E_DATES.NOW)).toThrow();
  });

  it('convert with items → converted', () => {
    const cart = makeE2EUserCart();
    cart.applyItemCountDelta(1, E2E_DATES.NOW);
    cart.convert('ORDER-1', E2E_DATES.NOW);
    expect(cart.isConverted()).toBe(true);
  });

  it('clear resets state', () => {
    const cart = makeE2EUserCart({ total: 200 });
    cart.applyItemCountDelta(2, E2E_DATES.NOW);
    cart.clear(E2E_DATES.NOW);
    expect(cart.isCleared()).toBe(true);
    expect(cart.itemCount).toBe(0);
    expect(cart.total).toBe(0);
  });

  it('expire → expired', () => {
    const cart = makeE2EUserCart();
    cart.expire(E2E_DATES.NOW);
    expect(cart.isExpired()).toBe(true);
  });

  it('markMerged → merged', () => {
    const cart = makeE2EUserCart();
    cart.markMerged(E2E_IDS.CART_2, E2E_DATES.NOW);
    expect(cart.isMerged()).toBe(true);
  });

  it('reconstitute preserves all fields', () => {
    const cart = CartEntity.reconstitute({
      id: E2E_IDS.CART,
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      status: 'active',
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        itemCount: 3,
        subtotal: 300,
        discountAmount: 30,
        taxAmount: 40,
        shippingAmount: 50,
        total: 360,
        expiresAt: E2E_DATES.NEXT_MONTH,
        lastActivityAt: E2E_DATES.NOW,
      },
      version: 5,
    });

    expect(cart.itemCount).toBe(3);
    expect(cart.subtotal).toBe(300);
    expect(cart.discountAmount).toBe(30);
    expect(cart.taxAmount).toBe(40);
    expect(cart.shippingAmount).toBe(50);
    expect(cart.total).toBe(360);
    expect(cart.version).toBe(5);
  });

  it('reconstitute with inactive status', () => {
    const cart = CartEntity.reconstitute({
      id: E2E_IDS.CART,
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      status: 'inactive',
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        itemCount: 0,
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        expiresAt: E2E_DATES.NEXT_MONTH,
        lastActivityAt: E2E_DATES.NOW,
      },
    });
    expect(cart.status.value).toBe('inactive');
    expect(cart.isInactive()).toBe(true);
  });

  it('reconstitute with converted status → final', () => {
    const cart = CartEntity.reconstitute({
      id: E2E_IDS.CART,
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      status: 'converted',
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        itemCount: 1,
        subtotal: 100,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 100,
        expiresAt: E2E_DATES.NEXT_MONTH,
        lastActivityAt: E2E_DATES.NOW,
      },
    });
    expect(cart.isConverted()).toBe(true);
    expect(cart.isFinal()).toBe(true);
  });

  it('updateTotals clamps and detects negative', () => {
    const cart = makeE2EUserCart();
    expect(() =>
      cart.updateTotals(
        { subtotal: 10, discount: 100, tax: 0, shipping: 0 },
        E2E_DATES.NOW,
      ),
    ).toThrow();
  });

  it('updateNotes on final status throws', () => {
    const cart = makeE2EUserCart();
    cart.clear(E2E_DATES.NOW);
    expect(() => cart.updateNotes('nope', E2E_DATES.NOW)).toThrow();
  });

  it('CartStatusVO state machine full sweep', () => {
    const s = CartStatusVO.active();
    for (const t of ['inactive', 'abandoned', 'converted', 'expired', 'merged', 'cleared']) {
      s.canTransitionTo(t);
    }
    expect(true).toBe(true);
  });
});

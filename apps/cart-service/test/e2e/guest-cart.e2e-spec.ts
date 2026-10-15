/**
 * E2E — Guest cart lifecycle
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { GuestCartEntity } from '@domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { e2eDb } from './setup/e2e-database';
import { E2E_IDS, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — Guest cart', () => {
  beforeEach(() => e2eDb.reset());

  function make() {
    return GuestCartEntity.create({
      id: GuestCartIdVO.create('cccccccc-cccc-4ccc-8ccc-cccccccccccc'),
      props: {
        token: GuestTokenVO.create('guest-token-1234567890'),
        cartId: CartIdVO.create(E2E_IDS.CART),
        itemCount: 2,
        expiresAt: E2E_DATES.NEXT_WEEK,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('create → active', () => {
    const g = make();
    e2eDb.carts.add(g);
    expect(g.isActive()).toBe(true);
  });

  it('markMerged', () => {
    const g = make();
    g.markMerged(E2E_IDS.CART, E2E_DATES.NOW);
    expect(g.isMerged()).toBe(true);
  });

  it('expire', () => {
    const g = make();
    g.expire(E2E_DATES.NOW);
    expect(g.isExpiredStatus()).toBe(true);
  });

  it('abandon', () => {
    const g = make();
    g.abandon(E2E_DATES.NOW);
    expect(g.isAbandoned()).toBe(true);
  });

  it('updateItemCount', () => {
    const g = make();
    g.updateItemCount(10, E2E_DATES.NOW);
    expect(g.itemCount).toBe(10);
  });

  it('markMerged on empty throws', () => {
    const g = make();
    g.updateItemCount(0, E2E_DATES.NOW);
    expect(() => g.markMerged(E2E_IDS.CART, E2E_DATES.NOW)).toThrow();
  });

  it('canMerge depends on items + active', () => {
    const g = make();
    expect(g.canMerge()).toBe(true);
    g.updateItemCount(0);
    expect(g.canMerge()).toBe(false);
  });
});

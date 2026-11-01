/**
 * E2E — Abandoned cart detection + recovery flow
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { AbandonedCartDetectorService } from '@domain/services/abandoned-cart-detector.service.js';
import { CanRecoverSpecification } from '@domain/specifications/can-recover.specification.js';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { e2eDb } from './setup/e2e-database';
import { E2E_IDS, E2E_DATES, E2E_CURRENCY } from './setup/e2e-fixtures';

describe('E2E — Abandoned cart flow', () => {
  beforeEach(() => e2eDb.reset());

  function makeAbandoned() {
    return AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        itemCount: 2,
        cartValue: 200,
        currency: E2E_CURRENCY,
        abandonedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        remindersSent: 0,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('detects stale cart as abandoned', () => {
    const lastActivity = new Date(Date.now() - 30 * 3600 * 1000).toISOString();
    const cart = CartEntity.create({
      id: CartIdVO.create(E2E_IDS.CART),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        expiresAt: E2E_DATES.NEXT_MONTH,
      },
      now: lastActivity,
    });
    cart.applyItemCountDelta(1, lastActivity);

    const r = AbandonedCartDetectorService.evaluate(cart);
    expect(r.isAbandoned).toBe(true);
  });

  it('does not detect fresh cart', () => {
    const cart = CartEntity.create({
      id: CartIdVO.create(E2E_IDS.CART),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(E2E_IDS.USER),
        currency: E2E_CURRENCY,
        expiresAt: E2E_DATES.NEXT_MONTH,
      },
      now: E2E_DATES.NOW,
    });
    cart.applyItemCountDelta(1);
    const r = AbandonedCartDetectorService.evaluate(cart);
    expect(r.isAbandoned).toBe(false);
  });

  it('sendReminder flow → up to 4 reminders', () => {
    const a = makeAbandoned();
    for (let i = 0; i < 4; i++) {
      a.sendReminder('email', E2E_DATES.NOW);
    }
    expect(a.remindersSent).toBe(4);
    expect(() => a.sendReminder('email', E2E_DATES.NOW)).toThrow();
  });

  it('recover flow', () => {
    const a = makeAbandoned();
    a.recover('ORDER-001', E2E_DATES.NOW);
    expect(a.isRecovered()).toBe(true);
    expect(a.recoveredOrderId).toBe('ORDER-001');
  });

  it('markLost flow', () => {
    const a = makeAbandoned();
    a.markLost('no interest', E2E_DATES.NOW);
    expect(a.isLost()).toBe(true);
  });

  it('unsubscribe flow', () => {
    const a = makeAbandoned();
    a.unsubscribe(E2E_DATES.NOW);
    expect(a.isUnsubscribed()).toBe(true);
  });

  it('CanRecoverSpecification accepts pending', () => {
    const a = makeAbandoned();
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: a, cart: null })).toBe(true);
  });

  it('CanRecoverSpecification rejects recovered', () => {
    const a = makeAbandoned();
    a.recover('ORDER-1', E2E_DATES.NOW);
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: a, cart: null })).toBe(false);
  });

  it('reconstitute abandoned cart', () => {
    const a = AbandonedCartEntity.reconstitute({
      id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      createdAt: E2E_DATES.NOW,
      updatedAt: E2E_DATES.NOW,
      status: 'reminded',
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        itemCount: 2,
        cartValue: 200,
        currency: E2E_CURRENCY,
        abandonedAt: E2E_DATES.NOW,
        remindersSent: 2,
        lastReminderAt: E2E_DATES.NOW,
      },
      version: 3,
    });
    expect(a.remindersSent).toBe(2);
    expect(a.version).toBe(3);
    e2eDb.abandoned.add(a);
    expect(e2eDb.abandoned.size).toBe(1);
  });
});

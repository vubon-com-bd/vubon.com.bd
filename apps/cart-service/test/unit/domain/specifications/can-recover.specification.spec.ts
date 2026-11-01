/**
 * CanRecoverSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanRecoverSpecification } from '@domain/specifications/can-recover.specification.js';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CanRecoverSpecification', () => {
  function makeAbandoned() {
    return AbandonedCartEntity.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        cartValue: 200,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 0,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('satisfied for pending abandoned cart', () => {
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned: makeAbandoned(), cart: null })).toBe(true);
  });

  it('rejects recovered cart', () => {
    const abandoned = makeAbandoned();
    abandoned.recover('order-1');
    const spec = new CanRecoverSpecification();
    expect(spec.isSatisfiedBy({ abandoned, cart: null })).toBe(false);
  });

  it('explain() gives reason', () => {
    const abandoned = makeAbandoned();
    abandoned.recover('order-1');
    const spec = new CanRecoverSpecification();
    expect(spec.explain({ abandoned, cart: null })).toMatch(/not recoverable/i);
  });
});

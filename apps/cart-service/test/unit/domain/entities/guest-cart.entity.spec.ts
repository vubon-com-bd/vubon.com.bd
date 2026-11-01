/**
 * GuestCartEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { GuestCartEntity } from '@domain/entities/guest-cart.entity.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES } from '../../../fixtures/index';

describe('GuestCartEntity', () => {
  function make() {
    return GuestCartEntity.create({
      id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
      props: {
        token: GuestTokenVO.create('guest-token-1234567890'),
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        expiresAt: TEST_DATES.NEXT_WEEK,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('create() initializes active', () => {
    const g = make();
    expect(g.isActive()).toBe(true);
    expect(g.itemCount).toBe(2);
  });

  it('markMerged() moves to merged', () => {
    const g = make();
    g.markMerged(TEST_IDS.CART_ID, TEST_DATES.NOW);
    expect(g.isMerged()).toBe(true);
  });

  it('markMerged() throws if empty', () => {
    const g = make();
    g.updateItemCount(0);
    expect(() => g.markMerged(TEST_IDS.CART_ID, TEST_DATES.NOW)).toThrow(
      BusinessRuleError,
    );
  });

  it('expire() moves to expired', () => {
    const g = make();
    g.expire(TEST_DATES.NOW);
    expect(g.isExpiredStatus()).toBe(true);
  });

  it('abandon() moves to abandoned', () => {
    const g = make();
    g.abandon(TEST_DATES.NOW);
    expect(g.isAbandoned()).toBe(true);
  });

  it('isExpiredAt() default now works', () => {
    const g = make();
    expect(g.isExpiredAt()).toBe(false);
  });
});

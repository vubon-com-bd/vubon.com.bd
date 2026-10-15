/**
 * AbandonedCartEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('AbandonedCartEntity', () => {
  function make() {
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

  it('create() initializes pending', () => {
    const a = make();
    expect(a.isPending()).toBe(true);
    expect(a.remindersSent).toBe(0);
  });

  it('sendReminder() increments count', () => {
    const a = make();
    a.sendReminder('email', TEST_DATES.NOW);
    expect(a.remindersSent).toBe(1);
    expect(a.isReminded()).toBe(true);
  });

  it('sendReminder() throws after max reminders', () => {
    const a = make();
    for (let i = 0; i < 4; i++) a.sendReminder('email', TEST_DATES.NOW);
    expect(() => a.sendReminder('sms', TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });

  it('recover() sets recovered state', () => {
    const a = make();
    a.recover('order-123', TEST_DATES.NOW);
    expect(a.isRecovered()).toBe(true);
    expect(a.recoveredOrderId).toBe('order-123');
  });

  it('recover() throws if not recoverable', () => {
    const a = make();
    a.markLost('no interest', TEST_DATES.NOW);
    expect(() => a.recover('order-1', TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });

  it('unsubscribe()', () => {
    const a = make();
    a.unsubscribe(TEST_DATES.NOW);
    expect(a.isUnsubscribed()).toBe(true);
  });

  it('reconstitute() rebuilds state', () => {
    const a = AbandonedCartEntity.reconstitute({
      id: TEST_IDS.ABANDONED_CART_ID,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
      status: 'reminded',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        itemCount: 2,
        cartValue: 200,
        currency: TEST_CURRENCY,
        abandonedAt: TEST_DATES.TWO_DAYS_AGO,
        remindersSent: 2,
      },
      version: 5,
    });
    expect(a.isReminded()).toBe(true);
    expect(a.remindersSent).toBe(2);
    expect(a.version).toBe(5);
  });
});

import { describe, it, expect } from '@jest/globals';
import { AbandonedCartVO } from '@domain/value-objects/composites/abandoned-cart.vo.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '@domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('AbandonedCartVO — getters', () => {
  it('accesses all getters', () => {
    const vo = AbandonedCartVO.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      status: AbandonedCartStatusVO.pending(),
      itemCount: 2,
      cartValue: 200,
      currency: TEST_CURRENCY,
      abandonedAt: TEST_DATES.TWO_DAYS_AGO,
      remindersSent: 1,
      lastReminderAt: TEST_DATES.YESTERDAY,
      recoveredAt: TEST_DATES.NOW,
    });

    expect(vo.id.value).toBe(TEST_IDS.ABANDONED_CART_ID);
    expect(vo.cartId.value).toBe(TEST_IDS.CART_ID);
    expect(vo.status.value).toBe('pending');
    expect(vo.itemCount).toBe(2);
    expect(vo.cartValue).toBe(200);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.abandonedAt).toBe(TEST_DATES.TWO_DAYS_AGO);
    expect(vo.remindersSent).toBe(1);
    expect(vo.lastReminderAt).toBe(TEST_DATES.YESTERDAY);
    expect(vo.recoveredAt).toBe(TEST_DATES.NOW);
    expect(vo.hasReminders()).toBe(true);
  });

  it('optional fields undefined', () => {
    const vo = AbandonedCartVO.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      status: AbandonedCartStatusVO.pending(),
      itemCount: 0,
      cartValue: 0,
      currency: TEST_CURRENCY,
      abandonedAt: TEST_DATES.TWO_DAYS_AGO,
      remindersSent: 0,
    });
    expect(vo.lastReminderAt).toBeUndefined();
    expect(vo.recoveredAt).toBeUndefined();
    expect(vo.hasReminders()).toBe(false);
  });

  it('isFinal for recovered', () => {
    const vo = AbandonedCartVO.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      status: AbandonedCartStatusVO.create('recovered'),
      itemCount: 2,
      cartValue: 200,
      currency: TEST_CURRENCY,
      abandonedAt: TEST_DATES.TWO_DAYS_AGO,
      remindersSent: 1,
    });
    expect(vo.isFinal()).toBe(true);
    expect(vo.isRecoverable()).toBe(false);
  });

  it('canSendMoreReminders', () => {
    const vo = AbandonedCartVO.create({
      id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      status: AbandonedCartStatusVO.pending(),
      itemCount: 2,
      cartValue: 200,
      currency: TEST_CURRENCY,
      abandonedAt: TEST_DATES.TWO_DAYS_AGO,
      remindersSent: 2,
    });
    expect(vo.canSendMoreReminders(4)).toBe(true);
    expect(vo.canSendMoreReminders(2)).toBe(false);
  });
});

import { describe, it, expect } from '@jest/globals';
import { AbandonedCartVO } from '@domain/value-objects/composites/abandoned-cart.vo.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '@domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('AbandonedCartVO', () => {
  const makeProps = () => ({
    id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
    cartId: CartIdVO.create(TEST_IDS.CART_ID),
    status: AbandonedCartStatusVO.pending(),
    itemCount: 2,
    cartValue: 200,
    currency: TEST_CURRENCY,
    abandonedAt: TEST_DATES.TWO_DAYS_AGO,
    remindersSent: 1,
  });

  it('create() works', () => {
    const vo = AbandonedCartVO.create(makeProps());
    expect(vo.isRecoverable()).toBe(true);
    expect(vo.hasReminders()).toBe(true);
    expect(vo.canSendMoreReminders(4)).toBe(true);
    expect(vo.canSendMoreReminders(1)).toBe(false);
  });

  it('isFinal() for recovered', () => {
    const vo = AbandonedCartVO.create({ ...makeProps(), status: AbandonedCartStatusVO.create('recovered') });
    expect(vo.isFinal()).toBe(true);
  });

  it('throws on negative cartValue', () => {
    expect(() => AbandonedCartVO.create({ ...makeProps(), cartValue: -1 })).toThrow(ValidationError);
  });

  it('throws on non-integer itemCount', () => {
    expect(() => AbandonedCartVO.create({ ...makeProps(), itemCount: 1.5 })).toThrow(ValidationError);
  });
});

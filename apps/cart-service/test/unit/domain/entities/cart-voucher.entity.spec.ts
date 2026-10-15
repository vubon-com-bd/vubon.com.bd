/**
 * CartVoucherEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartVoucherEntity } from '@domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartVoucherEntity', () => {
  function make(remainingAmount = 500) {
    return CartVoucherEntity.create({
      id: 'vvvvvvvv-vvvv-4vvv-8vvv-vvvvvvvvvvvv',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        code: VoucherCodeVO.create('GIFT1234'),
        status: VoucherStatusVO.active(),
        remainingAmount,
        appliedAmount: 0,
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('has balance', () => {
    expect(make(100).hasBalance()).toBe(true);
    expect(make(0).hasBalance()).toBe(false);
  });

  it('canCover() checks amount', () => {
    expect(make(100).canCover(50)).toBe(true);
    expect(make(50).canCover(100)).toBe(false);
  });

  it('applyAmount() reduces remaining', () => {
    const v = make(500);
    v.applyAmount(100, TEST_DATES.NOW);
    expect(v.remainingAmount).toBe(400);
    expect(v.appliedAmount).toBe(100);
  });

  it('applyAmount() throws on insufficient balance', () => {
    const v = make(50);
    expect(() => v.applyAmount(100, TEST_DATES.NOW)).toThrow(BusinessRuleError);
  });

  it('redeem() marks redeemed', () => {
    const v = make();
    v.redeem(TEST_DATES.NOW);
    expect(v.isFinal()).toBe(true);
  });

  it('isExpired() works with default now', () => {
    const v = make();
    expect(v.isExpired()).toBe(false);
  });
});

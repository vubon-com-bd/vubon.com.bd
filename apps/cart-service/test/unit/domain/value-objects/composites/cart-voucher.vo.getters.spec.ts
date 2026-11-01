import { describe, it, expect } from '@jest/globals';
import { CartVoucherVO } from '@domain/value-objects/composites/cart-voucher.vo.js';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartVoucherVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartVoucherVO.create({
      code: VoucherCodeVO.create('GIFT12345'),
      status: VoucherStatusVO.active(),
      remainingAmount: 500,
      currency: TEST_CURRENCY,
      expiresAt: TEST_DATES.NEXT_MONTH,
      appliedAt: TEST_DATES.NOW,
    });

    expect(vo.code.value).toBe('GIFT12345');
    expect(vo.status.value).toBe('active');
    expect(vo.remainingAmount).toBe(500);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.expiresAt).toBe(TEST_DATES.NEXT_MONTH);
    expect(vo.appliedAt).toBe(TEST_DATES.NOW);
    expect(vo.isRedeemable()).toBe(true);
    expect(vo.hasBalance()).toBe(true);
    expect(vo.canCover(100)).toBe(true);
  });
});

import { describe, it, expect } from '@jest/globals';
import { CartVoucherVO } from '@domain/value-objects/composites/cart-voucher.vo.js';
import { VoucherCodeVO } from '@domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartVoucherVO', () => {
  const makeProps = () => ({
    code: VoucherCodeVO.create('GIFT12345'),
    status: VoucherStatusVO.active(),
    remainingAmount: 500,
    currency: TEST_CURRENCY,
    expiresAt: TEST_DATES.NEXT_MONTH,
    appliedAt: TEST_DATES.NOW,
  });

  it('create() works', () => {
    const vo = CartVoucherVO.create(makeProps());
    expect(vo.isRedeemable()).toBe(true);
    expect(vo.hasBalance()).toBe(true);
    expect(vo.canCover(100)).toBe(true);
    expect(vo.canCover(1000)).toBe(false);
  });

  it('throws on negative remainingAmount', () => {
    expect(() => CartVoucherVO.create({ ...makeProps(), remainingAmount: -1 })).toThrow(ValidationError);
  });
});

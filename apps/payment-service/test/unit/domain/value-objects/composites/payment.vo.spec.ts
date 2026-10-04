import { PaymentVO } from '../../../../../src/module/domain/value-objects/composites/payment.vo.js';
import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { PaymentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payment-amount.vo.js';
import { OrderIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVO(refundedAmount?: number, statusValue = 'pending') {
  return PaymentVO.create({
    id: PaymentIdVO.create(UUID),
    orderId: OrderIdVO.create(UUID),
    userId: UserIdVO.create(UUID),
    type: PaymentTypeVO.oneTime(),
    status: PaymentStatusVO.create(statusValue),
    method: PaymentMethodVO.create('mobile_banking'),
    amount: PaymentAmountVO.create(1000, 'BDT'),
    refundedAmount,
    createdAt: NOW,
    updatedAt: NOW,
  });
}

describe('PaymentVO', () => {
  it('creates valid VO', () => {
    const vo = makeVO();
    expect(vo.amount.amount).toBe(1000);
    expect(vo.currency).toBe('BDT');
    expect(vo.refundedAmount).toBe(0);
  });

  it('rejects negative refundedAmount', () => {
    expect(() => makeVO(-50)).toThrow(ValidationError);
  });

  it('rejects refundedAmount > amount', () => {
    expect(() => makeVO(1500)).toThrow(ValidationError);
  });

  it('refundableRemaining computes correctly', () => {
    const vo = makeVO(300);
    expect(vo.refundableRemaining()).toBe(700);
  });

  it('isRefundable true when settled + remaining', () => {
    const vo = makeVO(undefined, 'captured');
    expect(vo.isRefundable()).toBe(true);
  });

  it('isRefundable false when not settled', () => {
    const vo = makeVO(undefined, 'pending');
    expect(vo.isRefundable()).toBe(false);
  });

  it('isFullyRefunded', () => {
    const vo = makeVO(1000);
    expect(vo.isFullyRefunded()).toBe(true);
  });

  it('isPartiallyRefunded', () => {
    const vo = makeVO(300);
    expect(vo.isPartiallyRefunded()).toBe(true);
  });
});

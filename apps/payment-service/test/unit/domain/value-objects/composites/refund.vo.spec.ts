import { RefundVO } from '../../../../../src/module/domain/value-objects/composites/refund.vo.js';
import { RefundIdVO } from '../../../../../src/module/domain/value-objects/primitives/refund-id.vo.js';
import { RefundStatusVO } from '../../../../../src/module/domain/value-objects/primitives/refund-status.vo.js';
import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { PaymentAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payment-amount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('RefundVO', () => {
  it('creates valid VO', () => {
    const vo = RefundVO.create({
      id: RefundIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      status: RefundStatusVO.pending(),
      amount: PaymentAmountVO.create(500, 'BDT'),
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.amount.amount).toBe(500);
    expect(vo.isPending()).toBe(true);
  });

  it('rejects zero amount', () => {
    expect(() =>
      RefundVO.create({
        id: RefundIdVO.create(UUID),
        paymentId: PaymentIdVO.create(UUID),
        status: RefundStatusVO.pending(),
        amount: PaymentAmountVO.reconstitute(0, 'BDT'),
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('rejects succeeded without processedAt', () => {
    expect(() =>
      RefundVO.create({
        id: RefundIdVO.create(UUID),
        paymentId: PaymentIdVO.create(UUID),
        status: RefundStatusVO.succeeded(),
        amount: PaymentAmountVO.create(500, 'BDT'),
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('isSuccess for succeeded with processedAt', () => {
    const vo = RefundVO.create({
      id: RefundIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      status: RefundStatusVO.succeeded(),
      amount: PaymentAmountVO.create(500, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.isSuccess()).toBe(true);
  });
});

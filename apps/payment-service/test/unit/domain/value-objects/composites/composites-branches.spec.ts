import { PaymentVO } from '../../../../../src/module/domain/value-objects/composites/payment.vo.js';
import { RefundVO } from '../../../../../src/module/domain/value-objects/composites/refund.vo.js';
import { TransactionVO } from '../../../../../src/module/domain/value-objects/composites/transaction.vo.js';
import { PaymentIdVO } from '../../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { PaymentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payment-amount.vo.js';
import { OrderIdVO } from '../../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { RefundIdVO } from '../../../../../src/module/domain/value-objects/primitives/refund-id.vo.js';
import { RefundStatusVO } from '../../../../../src/module/domain/value-objects/primitives/refund-status.vo.js';
import { TransactionIdVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('PaymentVO — full branches', () => {
  it('reconstitute with all optionals', () => {
    const vo = PaymentVO.reconstitute({
      id: PaymentIdVO.create(UUID),
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      status: PaymentStatusVO.captured(),
      method: PaymentMethodVO.create('mobile_banking'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      refundedAmount: 300,
      authorizedAt: NOW,
      capturedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.refundedAmount).toBe(300);
    expect(vo.isPaid()).toBe(true);
    expect(vo.isRefundable()).toBe(true);
    expect(vo.isPartiallyRefunded()).toBe(true);
    expect(vo.isFullyRefunded()).toBe(false);
    expect(vo.refundableRemainingAmount().amount).toBe(700);
  });

  it('capturedAt before authorizedAt throws', () => {
    expect(() =>
      PaymentVO.create({
        id: PaymentIdVO.create(UUID),
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID),
        type: PaymentTypeVO.oneTime(),
        status: PaymentStatusVO.captured(),
        method: PaymentMethodVO.create('mobile_banking'),
        amount: PaymentAmountVO.create(1000, 'BDT'),
        authorizedAt: '2026-01-02T00:00:00Z',
        capturedAt: '2026-01-01T00:00:00Z',
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('fully refunded', () => {
    const vo = PaymentVO.reconstitute({
      id: PaymentIdVO.create(UUID),
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      status: PaymentStatusVO.refunded(),
      method: PaymentMethodVO.create('mobile_banking'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      refundedAmount: 1000,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.isFullyRefunded()).toBe(true);
    expect(vo.isRefundable()).toBe(false);
  });

  it('isPaid false when pending', () => {
    const vo = PaymentVO.reconstitute({
      id: PaymentIdVO.create(UUID),
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      status: PaymentStatusVO.pending(),
      method: PaymentMethodVO.create('mobile_banking'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.isPaid()).toBe(false);
  });
});

describe('RefundVO — full branches', () => {
  it('reconstitute with all fields', () => {
    const vo = RefundVO.reconstitute({
      id: RefundIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      status: RefundStatusVO.succeeded(),
      amount: PaymentAmountVO.create(500, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.isSuccess()).toBe(true);
    expect(vo.isPending()).toBe(false);
    expect(vo.isFailed()).toBe(false);
  });

  it('isFailed true', () => {
    const vo = RefundVO.reconstitute({
      id: RefundIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      status: RefundStatusVO.failed(),
      amount: PaymentAmountVO.create(500, 'BDT'),
      failedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.isFailed()).toBe(true);
  });

  it('failed status without failedAt throws', () => {
    expect(() =>
      RefundVO.create({
        id: RefundIdVO.create(UUID),
        paymentId: PaymentIdVO.create(UUID),
        status: RefundStatusVO.failed(),
        amount: PaymentAmountVO.create(500, 'BDT'),
        createdAt: NOW,
        updatedAt: NOW,
      }),
    ).toThrow(ValidationError);
  });
});

describe('TransactionVO — full branches', () => {
  it('reconstitute with all fields', () => {
    const vo = TransactionVO.reconstitute({
      id: TransactionIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('payment'),
      status: TransactionStatusVO.success(),
      amount: PaymentAmountVO.create(1000, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.signedAmount()).toBe(-1000);
    expect(vo.isDebit()).toBe(true);
  });

  it('credit refund', () => {
    const vo = TransactionVO.reconstitute({
      id: TransactionIdVO.create(UUID),
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('refund'),
      status: TransactionStatusVO.success(),
      amount: PaymentAmountVO.create(500, 'BDT'),
      processedAt: NOW,
      createdAt: NOW,
      updatedAt: NOW,
    });
    expect(vo.signedAmount()).toBe(500);
    expect(vo.isCredit()).toBe(true);
  });
});

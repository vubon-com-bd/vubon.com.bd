import { CanRetryPaymentSpecification } from '../../../../src/module/domain/specifications/can-retry-payment.specification.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeFailed(): PaymentEntity {
  const p = PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount: 1000,
      currency: 'BDT',
    },
  });
  p.fail(FailureReasonVO.create('network error'));
  return p;
}

describe('CanRetryPaymentSpecification', () => {
  const spec = new CanRetryPaymentSpecification();

  it('true for failed payment within retry limit', () => {
    expect(spec.isSatisfiedBy({ payment: makeFailed() })).toBe(true);
  });

  it('false for captured payment', () => {
    const p = PaymentEntity.create({
      id: UUID,
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID),
        type: PaymentTypeVO.oneTime(),
        method: PaymentMethodVO.create('mobile_banking'),
        gateway: PaymentGatewayVO.create('bkash'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    expect(spec.isSatisfiedBy({ payment: p })).toBe(false);
  });

  it('false when retry limit exceeded', () => {
    expect(
      spec.isSatisfiedBy({
        payment: makeFailed(),
        ctx: { maxAttempts: 0 },
      }),
    ).toBe(false);
  });

  it('explain returns reason for non-recoverable', () => {
    const p = PaymentEntity.create({
      id: UUID,
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID),
        type: PaymentTypeVO.oneTime(),
        method: PaymentMethodVO.create('mobile_banking'),
        gateway: PaymentGatewayVO.create('bkash'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    const explanation = spec.explain({ payment: p });
    expect(explanation).toContain('not recoverable');
  });
});

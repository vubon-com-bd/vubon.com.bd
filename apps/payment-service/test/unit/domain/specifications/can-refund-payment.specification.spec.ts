import { CanRefundPaymentSpecification } from '../../../../src/module/domain/specifications/can-refund-payment.specification.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeCaptured(amount = 1000): PaymentEntity {
  const p = PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount,
      currency: 'BDT',
    },
  });
  p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
  p.authorize(GatewayPaymentIdVO.create('gw_1'));
  p.capture();
  return p;
}

describe('CanRefundPaymentSpecification', () => {
  const spec = new CanRefundPaymentSpecification();

  it('true for captured payment', () => {
    expect(spec.isSatisfiedBy({ payment: makeCaptured() })).toBe(true);
  });

  it('false for pending payment', () => {
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

  it('false when requested > remaining', () => {
    expect(
      spec.isSatisfiedBy({
        payment: makeCaptured(1000),
        ctx: { requestedAmount: 1500 },
      }),
    ).toBe(false);
  });

  it('true for partial refund within available', () => {
    expect(
      spec.isSatisfiedBy({
        payment: makeCaptured(1000),
        ctx: { requestedAmount: 300 },
      }),
    ).toBe(true);
  });
});

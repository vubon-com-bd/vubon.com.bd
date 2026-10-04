import { CanCapturePaymentSpecification } from '../../../../src/module/domain/specifications/can-capture-payment.specification.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeAuthorized(amount = 1000): PaymentEntity {
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
  return p;
}

describe('CanCapturePaymentSpecification', () => {
  const spec = new CanCapturePaymentSpecification();

  it('true for authorized payment within window', () => {
    expect(spec.isSatisfiedBy({ payment: makeAuthorized() })).toBe(true);
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

  it('false when requested > amount', () => {
    expect(
      spec.isSatisfiedBy({
        payment: makeAuthorized(1000),
        ctx: { requestedAmount: 1500 },
      }),
    ).toBe(false);
  });

  it('false when requested <= 0', () => {
    expect(
      spec.isSatisfiedBy({
        payment: makeAuthorized(),
        ctx: { requestedAmount: 0 },
      }),
    ).toBe(false);
  });

  it('explain returns reason for non-authorized payment', () => {
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
    expect(explanation).toContain('not authorized');
  });
});

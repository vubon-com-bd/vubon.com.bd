import { PaymentRefundPolicyService } from '../../../../src/module/domain/services/payment-refund-policy.service.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeCapturedPayment(amount = 1000): PaymentEntity {
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

describe('PaymentRefundPolicyService', () => {
  describe('checkEligibility()', () => {
    it('eligible for captured payment', () => {
      const r = PaymentRefundPolicyService.checkEligibility({
        payment: makeCapturedPayment(),
      });
      expect(r.eligible).toBe(true);
      expect(r.maxRefundable).toBe(1000);
    });

    it('not eligible for pending payment', () => {
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
      const r = PaymentRefundPolicyService.checkEligibility({ payment: p });
      expect(r.eligible).toBe(false);
    });

    it('rejects requested amount > available', () => {
      const r = PaymentRefundPolicyService.checkEligibility({
        payment: makeCapturedPayment(1000),
        requestedAmount: 1500,
      });
      expect(r.eligible).toBe(false);
      expect(r.reason).toContain('exceeds');
    });

    it('rejects non-positive amount', () => {
      const r = PaymentRefundPolicyService.checkEligibility({
        payment: makeCapturedPayment(),
        requestedAmount: 0,
      });
      expect(r.eligible).toBe(false);
    });

    it('maxRefundable decreases after partial refund', () => {
      const p = makeCapturedPayment(1000);
      p.markRefunded(300);
      const r = PaymentRefundPolicyService.checkEligibility({ payment: p });
      expect(r.maxRefundable).toBe(700);
    });
  });

  describe('calculateRefundAmount()', () => {
    it('full refund', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({
          paidAmount: 1000,
        }),
      ).toBe(1000);
    });

    it('partial refund', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({
          paidAmount: 1000,
          requestedAmount: 500,
        }),
      ).toBe(500);
    });

    it('applies restock fee', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({
          paidAmount: 1000,
          restockFee: 100,
        }),
      ).toBe(900);
    });

    it('adds shipping refund', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({
          paidAmount: 1000,
          shippingRefund: 60,
        }),
      ).toBe(1060);
    });

    it('returns 0 for invalid paid amount', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({ paidAmount: 0 }),
      ).toBe(0);
    });

    it('returns 0 when requested > paid', () => {
      expect(
        PaymentRefundPolicyService.calculateRefundAmount({
          paidAmount: 500,
          requestedAmount: 1000,
        }),
      ).toBe(0);
    });
  });
});

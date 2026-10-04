import { jest } from '@jest/globals';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

import { BkashGatewayAdapter } from '../../../../src/module/infrastructure/gateways/bkash.gateway.adapter.js';
import { NagadGatewayAdapter } from '../../../../src/module/infrastructure/gateways/nagad.gateway.adapter.js';
import { RocketGatewayAdapter } from '../../../../src/module/infrastructure/gateways/rocket.gateway.adapter.js';
import { SslcommerzGatewayAdapter } from '../../../../src/module/infrastructure/gateways/sslcommerz.gateway.adapter.js';
import { StripeGatewayAdapter } from '../../../../src/module/infrastructure/gateways/stripe.gateway.adapter.js';
import { PaypalGatewayAdapter } from '../../../../src/module/infrastructure/gateways/paypal.gateway.adapter.js';
import { CodGatewayAdapter } from '../../../../src/module/infrastructure/gateways/cod.gateway.adapter.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment(gateway = 'bkash'): PaymentEntity {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create(gateway),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('Gateway adapters — common contract', () => {
  const cases: Array<[string, () => unknown]> = [
    ['bkash', () => new BkashGatewayAdapter()],
    ['nagad', () => new NagadGatewayAdapter()],
    ['rocket', () => new RocketGatewayAdapter()],
    ['sslcommerz', () => new SslcommerzGatewayAdapter()],
    ['stripe', () => new StripeGatewayAdapter()],
    ['paypal', () => new PaypalGatewayAdapter()],
    ['manual', () => new CodGatewayAdapter()],
  ];

  for (const [id, factory] of cases) {
    describe(`${id} adapter`, () => {
      const adapter = factory() as {
        gatewayId: string;
        isEnabled(): boolean;
        initiate: (i: unknown) => Promise<{ success: boolean }>;
        verify: (i: unknown) => Promise<{ verified: boolean; status: string }>;
        capture: (i: unknown) => Promise<{ success: boolean }>;
        refund: (i: unknown) => Promise<{ success: boolean }>;
        cancel: (p: unknown) => Promise<{ success: boolean }>;
      };

      it('exposes correct gatewayId', () => {
        expect(adapter.gatewayId).toBe(id);
      });

      it('isEnabled returns boolean', () => {
        expect(typeof adapter.isEnabled()).toBe('boolean');
      });

      it('initiate returns object with success', async () => {
        const r = await adapter.initiate({ payment: makePayment(id === 'manual' ? 'manual' : id) });
        expect(typeof r.success).toBe('boolean');
      });

      it('refund returns object with success', async () => {
        const r = await adapter.refund({
          payment: makePayment(id === 'manual' ? 'manual' : id),
          amount: 500,
          reason: 'test',
        });
        expect(typeof r.success).toBe('boolean');
      });

      it('cancel returns object with success', async () => {
        const r = await adapter.cancel(makePayment(id === 'manual' ? 'manual' : id));
        expect(typeof r.success).toBe('boolean');
      });
    });
  }
});

describe('CodGatewayAdapter (manual)', () => {
  it('isEnabled returns true always', () => {
    expect(new CodGatewayAdapter().isEnabled()).toBe(true);
  });

  it('initiate returns a cod_ gatewayPaymentId', async () => {
    const r = await new CodGatewayAdapter().initiate({ payment: makePayment('manual') });
    expect(r.success).toBe(true);
    expect(r.gatewayPaymentId?.startsWith('cod_')).toBe(true);
  });

  it('verify returns verified=true', async () => {
    const r = await new CodGatewayAdapter().verify({
      payment: makePayment('manual'),
      callbackPayload: {},
    });
    expect(r.verified).toBe(true);
  });
});

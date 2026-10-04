import { jest } from '@jest/globals';
import { GatewayResolverService } from '../../../../src/module/infrastructure/gateways/gateway-resolver.service.js';
import { BkashGatewayAdapter } from '../../../../src/module/infrastructure/gateways/bkash.gateway.adapter.js';
import { CodGatewayAdapter } from '../../../../src/module/infrastructure/gateways/cod.gateway.adapter.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

describe('GatewayResolverService', () => {
  let service: GatewayResolverService;
  let bkash: BkashGatewayAdapter;
  let cod: CodGatewayAdapter;

  beforeEach(() => {
    bkash = new BkashGatewayAdapter();
    cod = new CodGatewayAdapter();
    service = new GatewayResolverService([bkash, cod]);
  });

  it('resolve() returns registered adapter', () => {
    expect(service.resolve('bkash')).toBe(bkash);
    expect(service.resolve('manual')).toBe(cod);
  });

  it('resolve() throws for unknown gateway', () => {
    expect(() => service.resolve('nonexistent')).toThrow();
  });

  it('resolveForPayment() returns null when no gateway', () => {
    const p = PaymentEntity.create({
      id: UUID,
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID),
        type: PaymentTypeVO.oneTime(),
        method: PaymentMethodVO.create('cash_on_delivery'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    expect(service.resolveForPayment(p)).toBeNull();
  });

  it('resolveForPayment() picks correct adapter', () => {
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
    expect(service.resolveForPayment(p)).toBe(bkash);
  });

  it('enabledGateways() filters by isEnabled', () => {
    const enabled = service.enabledGateways();
    expect(enabled).toContain('manual');
  });

  it('all() returns all registered adapters', () => {
    expect(service.all()).toHaveLength(2);
  });
});

import { PaymentMapper } from '../../../../src/module/application/mappers/payment.mapper.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment(): PaymentEntity {
  return PaymentEntity.create({
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
}

describe('PaymentMapper', () => {
  it('toResponse maps all fields', () => {
    const dto = PaymentMapper.toResponse(makePayment());
    expect(dto.id).toBe(UUID);
    expect(dto.orderId).toBe(UUID);
    expect(dto.userId).toBe(UUID);
    expect(dto.amount).toBe(1000);
    expect(dto.currency).toBe('BDT');
    expect(dto.method).toBe('mobile_banking');
    expect(dto.gateway).toBe('bkash');
    expect(dto.status).toBe('pending');
    expect(dto.refundedAmount).toBe(0);
    expect(dto.refundableRemaining).toBe(1000);
  });

  it('toPublicResponse exposes limited fields', () => {
    const dto = PaymentMapper.toPublicResponse(makePayment());
    expect(dto.id).toBe(UUID);
    expect(dto).not.toHaveProperty('userId');
    expect(dto.amount).toBe(1000);
  });

  it('toSummary returns compact view', () => {
    const dto = PaymentMapper.toSummary(makePayment());
    expect(dto.id).toBe(UUID);
    expect(dto.status).toBe('pending');
  });

  it('toListResponse computes totalPages', () => {
    const dto = PaymentMapper.toListResponse([makePayment()], 21, 1, 10);
    expect(dto.total).toBe(21);
    expect(dto.totalPages).toBe(3);
    expect(dto.items).toHaveLength(1);
  });
});

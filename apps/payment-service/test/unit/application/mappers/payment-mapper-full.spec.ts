import { jest } from '@jest/globals';
import { PaymentMapper } from '../../../../src/module/application/mappers/payment.mapper.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../../src/module/domain/value-objects/primitives/failure-code.vo.js';
import { IdempotencyKeyVO } from '../../../../src/module/domain/value-objects/primitives/idempotency-key.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function make() {
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
      idempotencyKey: IdempotencyKeyVO.create('idem_abc12345'),
      metadata: { source: 'web' },
    },
  });
}

describe('PaymentMapper — full fields', () => {
  it('toResponse with all optional fields populated', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    p.markPaid();
    const dto = PaymentMapper.toResponse(p);
    expect(dto.authorizedAt).toBeDefined();
    expect(dto.capturedAt).toBeDefined();
    expect(dto.idempotencyKey).toBe('idem_abc12345');
    expect(dto.metadata).toEqual({ source: 'web' });
    expect(dto.gatewayPaymentId).toBe('gw_1');
  });

  it('toResponse with failure fields', () => {
    const p = make();
    p.fail(FailureReasonVO.create('err'), FailureCodeVO.create('CODE'));
    const dto = PaymentMapper.toResponse(p);
    expect(dto.failureReason).toBe('err');
    expect(dto.failureCode).toBe('CODE');
    expect(dto.failedAt).toBeDefined();
  });

  it('toResponse with cancelled + expired', () => {
    const p = make();
    p.cancel('reason');
    const dto = PaymentMapper.toResponse(p);
    expect(dto.cancelledAt).toBeDefined();
  });

  it('toResponse with expired', () => {
    const p = make();
    p.expire();
    const dto = PaymentMapper.toResponse(p);
    expect(dto.expiredAt).toBeDefined();
  });

  it('toResponse handles no gateway', () => {
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
    const dto = PaymentMapper.toResponse(p);
    expect(dto.gateway).toBeUndefined();
  });

  it('toPublicResponse with capturedAt', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    const dto = PaymentMapper.toPublicResponse(p);
    expect(dto.capturedAt).toBeDefined();
  });

  it('toDetail with transactions', () => {
    const p = make();
    const tx = TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        type: TransactionTypeVO.create('payment'),
        amount: 1000,
        currency: 'BDT',
      },
    });
    const dto = PaymentMapper.toDetail(p, [tx]);
    expect(dto.payment.id).toBe(UUID);
    expect(dto.transactions).toHaveLength(1);
    expect(dto.transactions[0].type).toBe('payment');
  });

  it('toListResponse with multiple items', () => {
    const dto = PaymentMapper.toListResponse([make(), make()], 5, 1, 10);
    expect(dto.items).toHaveLength(2);
    expect(dto.totalPages).toBe(1);
  });
});

import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../../src/module/domain/value-objects/primitives/failure-code.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function make(method = 'mobile_banking', gateway: string | null = 'bkash'): PaymentEntity {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create(method),
      gateway: gateway ? PaymentGatewayVO.create(gateway) : undefined,
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('PaymentEntity — branch coverage', () => {
  it('expire() called from authorized state', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.expire();
    expect(p.status.isExpired()).toBe(true);
    expect(p.expiredAt).toBeDefined();
  });

  it('expire() called from pending state', () => {
    const p = make();
    p.expire();
    expect(p.isExpired()).toBe(true);
  });

  it('authorize with signature sets gatewaySignature', () => {
    const p = make();
    p.startProcessing();
    p.authorize(
      GatewayPaymentIdVO.create('gw_1'),
      { value: 'sig_abc123' } as never,
    );
    expect(p.gatewaySignature).toBeDefined();
  });

  it('authorize throws when method does not require gateway', () => {
    const p = make('cash_on_delivery', null);
    // transition to processing first
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    expect(() =>
      p.authorize(GatewayPaymentIdVO.create('gw_1')),
    ).toThrow(BusinessRuleError);
  });

  it('capture with different amount than authorized', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture(500);
    expect(p.amount).toBe(500);
  });

  it('capture rejects amount > authorized', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    expect(() => p.capture(2000)).toThrow();
  });

  it('capture rejects negative amount', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    expect(() => p.capture(-100)).toThrow();
  });

  it('capture throws when not authorized', () => {
    const p = make();
    expect(() => p.capture()).toThrow(BusinessRuleError);
  });

  it('markPaid throws when not captured', () => {
    const p = make();
    expect(() => p.markPaid()).toThrow(BusinessRuleError);
  });

  it('markChargeback rejects amount <= 0', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    expect(() => p.markChargeback(0)).toThrow();
  });

  it('markChargeback rejects amount > total', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    expect(() => p.markChargeback(2000)).toThrow();
  });

  it('markChargeback throws when status not settled', () => {
    const p = make();
    expect(() => p.markChargeback(500)).toThrow(BusinessRuleError);
  });

  it('retry clears failureReason/failureCode/failedAt', () => {
    const p = make();
    p.fail(
      FailureReasonVO.create('err'),
      FailureCodeVO.create('ERR'),
    );
    expect(p.failureReason).toBeDefined();
    p.retry();
    expect(p.failureReason).toBeUndefined();
    expect(p.failureCode).toBeUndefined();
    expect(p.failedAt).toBeUndefined();
  });

  it('canBePartiallyRefunded boundary', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    expect(p.canBePartiallyRefunded(500)).toBe(true);
    expect(p.canBePartiallyRefunded(1000)).toBe(true);
    expect(p.canBePartiallyRefunded(0)).toBe(false);
    expect(p.canBePartiallyRefunded(2000)).toBe(false);
  });

  it('canBeRetried for declined', () => {
    const p = make();
    p.decline(FailureReasonVO.create('funds'));
    expect(p.canBeRetried()).toBe(true);
  });

  it('hasRefundableAmount after full refund returns false', () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    p.markRefunded(1000);
    expect(p.hasRefundableAmount()).toBe(false);
  });

  it('version increments through multiple transitions', () => {
    const p = make();
    const v0 = p.version;
    p.startProcessing();
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    p.markPaid();
    expect(p.version).toBeGreaterThan(v0 + 2);
  });

  it('declined status short-circuit in retry', () => {
    const p = make();
    p.decline(FailureReasonVO.create('x'));
    expect(p.isDeclined()).toBe(true);
  });

  it('cancelled status cannot cancel again', () => {
    const p = make();
    p.cancel();
    expect(() => p.cancel()).toThrow(BusinessRuleError);
  });

  it('reconstitute with version parameter', () => {
    const p = make();
    const recon = PaymentEntity.reconstitute({
      id: p.id,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      props: {
        orderId: p.orderId,
        userId: p.userId,
        type: p.type,
        method: p.method,
        gateway: p.gateway,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        refundedAmount: p.refundedAmount,
        retryAttempts: p.retryAttempts,
      },
      version: 5,
    });
    expect(recon.version).toBe(5);
  });

  it('reconstitute with deletedAt', () => {
    const p = make();
    const recon = PaymentEntity.reconstitute({
      id: p.id,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      deletedAt: NOW,
      props: {
        orderId: p.orderId,
        userId: p.userId,
        type: p.type,
        method: p.method,
        gateway: p.gateway,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        refundedAmount: p.refundedAmount,
        retryAttempts: p.retryAttempts,
      },
    });
    expect(recon.deletedAt).toBeDefined();
  });
});

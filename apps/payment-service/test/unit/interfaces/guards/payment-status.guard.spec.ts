import { jest } from '@jest/globals';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PaymentStatusGuard } from '../../../../src/module/interfaces/guards/payment-status.guard.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment(status: 'pending' | 'captured' = 'pending'): PaymentEntity {
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
  if (status === 'captured') {
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
  }
  return p;
}

function mockContext(paymentId?: string): ExecutionContext {
  return {
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({
      getRequest: () => ({ params: paymentId ? { paymentId } : {} }),
    }),
  } as unknown as ExecutionContext;
}

describe('PaymentStatusGuard', () => {
  let reflector: { getAllAndOverride: jest.Mock };
  let repo: { findById: jest.Mock };
  let guard: PaymentStatusGuard;

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    repo = { findById: jest.fn() };
    guard = new PaymentStatusGuard(repo as never, reflector as unknown as Reflector);
  });

  it('returns true when no metadata defined', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    expect(await guard.canActivate(mockContext(UUID))).toBe(true);
  });

  it('returns true when metadata is empty array', async () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    expect(await guard.canActivate(mockContext(UUID))).toBe(true);
  });

  it('returns true when no paymentId in params', async () => {
    reflector.getAllAndOverride.mockReturnValue(['captured']);
    expect(await guard.canActivate(mockContext(undefined))).toBe(true);
  });

  it('throws when payment not found', async () => {
    reflector.getAllAndOverride.mockReturnValue(['captured']);
    repo.findById.mockResolvedValue(null);
    await expect(guard.canActivate(mockContext(UUID))).rejects.toThrow();
  });

  it('throws when status not in allowed list', async () => {
    reflector.getAllAndOverride.mockReturnValue(['captured']);
    repo.findById.mockResolvedValue(makePayment('pending'));
    await expect(guard.canActivate(mockContext(UUID))).rejects.toThrow();
  });

  it('returns true when status matches', async () => {
    reflector.getAllAndOverride.mockReturnValue(['captured']);
    repo.findById.mockResolvedValue(makePayment('captured'));
    expect(await guard.canActivate(mockContext(UUID))).toBe(true);
  });
});

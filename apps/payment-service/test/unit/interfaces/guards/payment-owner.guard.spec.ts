import { jest } from '@jest/globals';
import { ExecutionContext } from '@nestjs/common';
import { PaymentOwnerGuard } from '../../../../src/module/interfaces/guards/payment-owner.guard.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const OTHER = '9f9e6679-7425-40de-944b-e07fc1f90ae9';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment(userId = UUID): PaymentEntity {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(userId),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

function mockContext(user: { userId?: string; roles?: string[] } | null, paymentId?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        params: paymentId ? { paymentId } : {},
        user: user ?? undefined,
      }),
    }),
  } as unknown as ExecutionContext;
}

describe('PaymentOwnerGuard', () => {
  let repo: { findById: jest.Mock };
  let guard: PaymentOwnerGuard;

  beforeEach(() => {
    repo = { findById: jest.fn() };
    guard = new PaymentOwnerGuard(repo as never);
  });

  it('returns true when no paymentId in params', async () => {
    expect(await guard.canActivate(mockContext({ userId: UUID }))).toBe(true);
  });

  it('throws when no authenticated user', async () => {
    await expect(guard.canActivate(mockContext(null, UUID))).rejects.toThrow();
  });

  it('admin bypass returns true', async () => {
    const result = await guard.canActivate(mockContext({ userId: 'admin', roles: ['admin'] }, UUID));
    expect(result).toBe(true);
  });

  it('throws when payment not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(guard.canActivate(mockContext({ userId: UUID }, UUID))).rejects.toThrow();
  });

  it('throws when user does not own the payment', async () => {
    repo.findById.mockResolvedValue(makePayment(OTHER));
    await expect(guard.canActivate(mockContext({ userId: UUID }, UUID))).rejects.toThrow();
  });

  it('returns true when user owns the payment', async () => {
    repo.findById.mockResolvedValue(makePayment(UUID));
    expect(await guard.canActivate(mockContext({ userId: UUID }, UUID))).toBe(true);
  });
});

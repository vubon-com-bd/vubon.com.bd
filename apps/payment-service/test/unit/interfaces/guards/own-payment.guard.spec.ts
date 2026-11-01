/**
 * OwnPaymentGuard — unit tests
 * @module payment-service/test/unit/interfaces/guards
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { OwnPaymentGuard } from '@interfaces/guards/own-payment.guard';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

const VALID_UUID = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';

function mockContext(params: Record<string, string>, user?: unknown): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ params, user }),
    }),
  } as unknown as ExecutionContext;
}

function mockRepo(entity: unknown): PaymentRepository {
  return {
    findByIdVO: jest.fn(async () => entity),
    findById: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByUser: jest.fn(),
    findByStatus: jest.fn(),
    findByGatewayReference: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findStalePending: jest.fn(),
    findExpiredAuthorizations: jest.fn(),
    findRetryable: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as PaymentRepository;
}

const fakePayment = (userId: string) => ({
  id: VALID_UUID,
  userId: { value: userId },
});

describe('OwnPaymentGuard', () => {
  let guard: OwnPaymentGuard;

  beforeEach(() => {
    guard = new OwnPaymentGuard(mockRepo(null));
  });

  it('returns true when no paymentId in route', async () => {
    const ctx = mockContext({});
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('throws Forbidden when user is missing', async () => {
    const ctx = mockContext({ id: VALID_UUID });
    await expect(guard.canActivate(ctx)).rejects.toThrow();
  });

  it('returns true for admin user (bypass)', async () => {
    const ctx = mockContext({ id: VALID_UUID }, { userId: 'u1', roles: ['admin'] });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('throws Forbidden when payment not found', async () => {
    const g = new OwnPaymentGuard(mockRepo(null));
    const ctx = mockContext({ id: VALID_UUID }, { userId: 'u1', roles: [] });
    await expect(g.canActivate(ctx)).rejects.toThrow();
  });

  it('throws Forbidden when user does not own payment', async () => {
    const g = new OwnPaymentGuard(mockRepo(fakePayment('other-user')));
    const ctx = mockContext({ id: VALID_UUID }, { userId: 'u1', roles: [] });
    await expect(g.canActivate(ctx)).rejects.toThrow();
  });

  it('returns true when user owns payment', async () => {
    const g = new OwnPaymentGuard(mockRepo(fakePayment('u1')));
    const ctx = mockContext({ id: VALID_UUID }, { userId: 'u1', roles: [] });
    await expect(g.canActivate(ctx)).resolves.toBe(true);
  });
});

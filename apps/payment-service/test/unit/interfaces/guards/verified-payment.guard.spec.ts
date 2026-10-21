/**
 * VerifiedPaymentGuard — unit tests
 * @module payment-service/test/unit/interfaces/guards
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import type { ExecutionContext } from '@nestjs/common';
import { VerifiedPaymentGuard } from '@interfaces/guards/verified-payment.guard';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';

const VALID_UUID = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';

function ctx(params: Record<string, string>): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => ({ params }) }),
  } as unknown as ExecutionContext;
}

function mockRepo(entity: unknown): PaymentRepository {
  return {
    findByIdVO: jest.fn(async () => entity),
  } as unknown as PaymentRepository;
}

const fakePayment = (opts: { successful?: boolean; refundable?: boolean }) => ({
  id: VALID_UUID,
  isSuccessful: () => opts.successful ?? false,
  isRefundable: () => opts.refundable ?? false,
  status: { value: 'paid' },
});

describe('VerifiedPaymentGuard', () => {
  let guard: VerifiedPaymentGuard;

  beforeEach(() => {
    guard = new VerifiedPaymentGuard(mockRepo(null));
  });

  it('returns true when no paymentId', async () => {
    await expect(guard.canActivate(ctx({}))).resolves.toBe(true);
  });

  it('throws when payment not found', async () => {
    const ctx2 = ctx({ id: VALID_UUID });
    await expect(guard.canActivate(ctx2)).rejects.toThrow();
  });

  it('throws when payment is not successful nor refundable', async () => {
    const g = new VerifiedPaymentGuard(mockRepo(fakePayment({})));
    await expect(g.canActivate(ctx({ id: VALID_UUID }))).rejects.toThrow();
  });

  it('returns true when payment is successful', async () => {
    const g = new VerifiedPaymentGuard(mockRepo(fakePayment({ successful: true })));
    await expect(g.canActivate(ctx({ id: VALID_UUID }))).resolves.toBe(true);
  });

  it('returns true when payment is refundable', async () => {
    const g = new VerifiedPaymentGuard(mockRepo(fakePayment({ refundable: true })));
    await expect(g.canActivate(ctx({ id: VALID_UUID }))).resolves.toBe(true);
  });
});

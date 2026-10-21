/**
 * Refund Flow — E2E
 * @module payment-service/test/e2e/application
 *
 * Full pipeline: request → approve → reject / partial
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { RefundService } from '@application/services/impl/refund.service';
import { RequestRefundHandler } from '@application/commands/refund/request-refund.handler';
import { ApproveRefundHandler } from '@application/commands/refund/approve-refund.handler';
import { RejectRefundHandler } from '@application/commands/refund/reject-refund.handler';
import { RequestRefundCommand } from '@application/commands/refund/request-refund.command';
import { ApproveRefundCommand } from '@application/commands/refund/approve-refund.command';
import { RejectRefundCommand } from '@application/commands/refund/reject-refund.command';
import type { RefundRepository } from '@domain/repositories/refund.repository.interface';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import { makeMockPaymentRepository } from '@app-fixtures/mock-helpers';
import { makePaymentEntity, VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';

const REFUND_ID = '423e4567-e89b-42d3-a456-426614174099';

function makeMockRefundRepo() {
  return {
    save: jest.fn(), findByIdVO: jest.fn(), findByPayment: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(), findById: jest.fn(),
    findAll: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByStatus: jest.fn(), findPending: jest.fn(), findRetryable: jest.fn(),
    findExpired: jest.fn(), softDelete: jest.fn(),
  };
}

function makeRefundEntity() {
  return RefundEntity.create({
    id: RefundIdVO.create(REFUND_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      amount: RefundAmountVO.create(200, 'BDT'),
      reason: RefundReasonVO.create('customer_request'),
    },
  });
}

function makeCapturedPayment() {
  const e = makePaymentEntity();
  e.startProcessing();
  e.capture(1000, 'ch_1');
  return e;
}

describe('E2E: Refund Flow', () => {
  let refundRepo: ReturnType<typeof makeMockRefundRepo>;
  let paymentRepo: ReturnType<typeof makeMockPaymentRepository>;
  let service: RefundService;

  beforeEach(() => {
    refundRepo = makeMockRefundRepo();
    paymentRepo = makeMockPaymentRepository();
    service = new RefundService(
      refundRepo as unknown as RefundRepository,
      paymentRepo as unknown as PaymentRepository,
    );
  });

  it('should request → approve → process', async () => {
    // Step 1: request
    paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
    refundRepo.save.mockImplementation(async (e: unknown) => e);

    const requestHandler = new RequestRefundHandler(service);
    const requested = await requestHandler.execute(
      new RequestRefundCommand({ paymentId: VALID_PAYMENT_ID, amount: 200 }, 'user-1'),
    );
    expect(requested.status).toBe('requested');

    // Step 2: approve
    refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
    const approveHandler = new ApproveRefundHandler(service);
    const approved = await approveHandler.execute(
      new ApproveRefundCommand({ refundId: REFUND_ID }, 'admin-1'),
    );
    expect(approved.status).toBe('processing');
  });

  it('should request → reject', async () => {
    refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
    refundRepo.save.mockImplementation(async (e: unknown) => e);

    const handler = new RejectRefundHandler(service);
    const result = await handler.execute(
      new RejectRefundCommand({ refundId: REFUND_ID, reason: 'invalid' }, 'admin-1'),
    );
    expect(result.status).toBe('rejected');
    expect(result.failureReason).toBe('invalid');
  });

  it('should reject refund request for non-existent payment', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(null);

    const handler = new RequestRefundHandler(service);
    await expect(
      handler.execute(new RequestRefundCommand({ paymentId: VALID_PAYMENT_ID, amount: 100 })),
    ).rejects.toThrow();
  });
});

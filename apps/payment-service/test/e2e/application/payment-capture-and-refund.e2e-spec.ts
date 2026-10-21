/**
 * Payment Capture + Refund — E2E
 * @module payment-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (t: unknown) => t,
  CommandBus: class {},
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { PaymentService } from '@application/services/impl/payment.service';
import { RefundService } from '@application/services/impl/refund.service';
import { ConfirmPaymentHandler } from '@application/commands/payment/confirm-payment.handler';
import { ConfirmPaymentCommand } from '@application/commands/payment/confirm-payment.command';
import { RequestRefundHandler } from '@application/commands/refund/request-refund.handler';
import { RequestRefundCommand } from '@application/commands/refund/request-refund.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import type { RefundRepository } from '@domain/repositories/refund.repository.interface';
import type { IDomainEventBridge } from '@application/services/impl/payment.service';
import {
  makeMockPaymentRepository,
  makeMockEventBridge,
} from '@app-fixtures/mock-helpers';
import { makePaymentEntity, VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';

function makeMockRefundRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByPayment: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findById: jest.fn(), findAll: jest.fn(), delete: jest.fn(),
    exists: jest.fn(), findByStatus: jest.fn(), findPending: jest.fn(),
    findRetryable: jest.fn(), findExpired: jest.fn(), softDelete: jest.fn(),
  };
}

describe('E2E: Payment Capture + Refund', () => {
  let paymentRepo: ReturnType<typeof makeMockPaymentRepository>;
  let refundRepo: ReturnType<typeof makeMockRefundRepo>;
  let bridge: ReturnType<typeof makeMockEventBridge>;
  let paymentService: PaymentService;
  let refundService: RefundService;

  beforeEach(() => {
    paymentRepo = makeMockPaymentRepository();
    refundRepo = makeMockRefundRepo();
    bridge = makeMockEventBridge();
    paymentService = new PaymentService(
      paymentRepo as unknown as PaymentRepository,
      bridge as unknown as IDomainEventBridge,
    );
    refundService = new RefundService(
      refundRepo as unknown as RefundRepository,
      paymentRepo as unknown as PaymentRepository,
    );
  });

  it('full pipeline: initiate → capture → refund', async () => {
    // Step 1: initiate (produces payment entity)
    const entity = makePaymentEntity();
    entity.startProcessing();
    paymentRepo.findByIdVO.mockResolvedValue(entity);
    paymentRepo.save.mockImplementation(async (e: unknown) => e);

    // Step 2: capture
    const captureHandler = new ConfirmPaymentHandler(paymentService);
    const captureCmd = new ConfirmPaymentCommand({
      paymentId: VALID_PAYMENT_ID,
      gatewayReference: 'ch_stripe_123',
      confirmedAmount: 1000,
    });

    const captured = await captureHandler.execute(captureCmd);
    expect(captured.status).toBe('captured');

    // Step 3: refund
    paymentRepo.findByIdVO.mockResolvedValue({
      ...entity,
      remainingRefundableAmount: () => 1000,
      currency: { value: 'BDT' },
      amount: { amount: 1000 },
    });
    refundRepo.save.mockImplementation(async (e: unknown) => e);

    const refundHandler = new RequestRefundHandler(refundService);
    const refundCmd = new RequestRefundCommand({
      paymentId: VALID_PAYMENT_ID,
      amount: 300,
    });

    const refund = await refundHandler.execute(refundCmd);
    expect(refund.success).toBe(true);
    expect(refund.status).toBe('requested');
  });

  it('should reject refund when payment not captured', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(null);

    const refundHandler = new RequestRefundHandler(refundService);
    const refundCmd = new RequestRefundCommand({
      paymentId: VALID_PAYMENT_ID,
      amount: 300,
    });

    await expect(refundHandler.execute(refundCmd)).rejects.toThrow();
  });
});

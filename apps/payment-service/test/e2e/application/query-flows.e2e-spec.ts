/**
 * Query Flows — E2E
 * @module payment-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { PaymentService } from '@application/services/impl/payment.service';
import { RefundService } from '@application/services/impl/refund.service';
import { GetPaymentHandler } from '@application/queries/payment/get-payment.handler';
import { GetPaymentQuery } from '@application/queries/payment/get-payment.query';
import { ListPaymentsHandler } from '@application/queries/payment/list-payments.handler';
import { ListPaymentsQuery } from '@application/queries/payment/list-payments.query';
import { GetPaymentStatsHandler } from '@application/queries/payment/get-payment-stats.handler';
import { GetPaymentStatsQuery } from '@application/queries/payment/get-payment-stats.query';
import { GetRefundHandler } from '@application/queries/refund/get-refund.handler';
import { GetRefundQuery } from '@application/queries/refund/get-refund.query';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import type { RefundRepository } from '@domain/repositories/refund.repository.interface';
import type { IDomainEventBridge } from '@application/services/impl/payment.service';
import {
  makeMockPaymentRepository,
  makeMockEventBridge,
} from '@app-fixtures/mock-helpers';
import { makePaymentEntity, VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';

const REFUND_ID = '323e4567-e89b-42d3-a456-426614174099';

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
      amount: RefundAmountVO.create(100, 'BDT'),
      reason: RefundReasonVO.create('customer_request'),
    },
  });
}

describe('E2E: Query Flows', () => {
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

  it('GetPayment query flows through handler → service → repo', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(makePaymentEntity());
    const handler = new GetPaymentHandler(paymentService);
    const result = await handler.execute(new GetPaymentQuery(VALID_PAYMENT_ID));
    expect(result.id).toBe(VALID_PAYMENT_ID);
    expect(paymentRepo.findByIdVO).toHaveBeenCalledTimes(1);
  });

  it('ListPayments query with filter', async () => {
    paymentRepo.findPaginated.mockResolvedValue({
      items: [makePaymentEntity()],
      total: 1, page: 1, limit: 10, totalPages: 1,
    });
    const handler = new ListPaymentsHandler(paymentService);
    const result = await handler.execute(
      new ListPaymentsQuery(1, 10, { status: 'paid' as never }),
    );
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('GetPaymentStats returns aggregated data', async () => {
    paymentRepo.getStats.mockResolvedValue({
      total: 10, totalAmount: 5000, currency: 'BDT',
      byStatus: { paid: 8 }, byMethod: { card: 10 },
    });
    const handler = new GetPaymentStatsHandler(paymentService);
    const result = await handler.execute(new GetPaymentStatsQuery());
    expect(result.total).toBe(10);
    expect(result.averageAmount).toBe(500);
  });

  it('GetRefund query flows through', async () => {
    refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
    const handler = new GetRefundHandler(refundService);
    const result = await handler.execute(new GetRefundQuery(REFUND_ID));
    expect(result.id).toBe(REFUND_ID);
  });

  it('GetPayment query returns 404 on missing payment', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(null);
    const handler = new GetPaymentHandler(paymentService);
    await expect(handler.execute(new GetPaymentQuery(VALID_PAYMENT_ID))).rejects.toThrow();
  });
});

/**
 * Split Payment Flow — E2E
 * @module payment-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { SplitPaymentService } from '@application/services/impl/split-payment.service';
import { CreateSplitPaymentHandler } from '@application/commands/split/create-split-payment.handler';
import { CreateSplitPaymentCommand } from '@application/commands/split/create-split-payment.command';
import type { SplitPaymentRepository } from '@domain/repositories/split-payment.repository.interface';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

const VALID_PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';
const SPLIT_ID = '223e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(), findByIdVO: jest.fn(), findByPayment: jest.fn(),
    findPending: jest.fn(), findFailed: jest.fn(), findPaginated: jest.fn(),
    findById: jest.fn(), findAll: jest.fn(), delete: jest.fn(),
    exists: jest.fn(), softDelete: jest.fn(),
  };
}

function makeSplitEntity() {
  return SplitPaymentEntity.create({
    id: SplitIdVO.create(SPLIT_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      type: SplitTypeVO.create('percentage'),
      totalAmount: 1000,
      currency: 'BDT',
      receivers: [
        { receiverId: 'a', amount: SplitAmountVO.create(700, 'BDT'), percentage: SplitPercentageVO.create(70) },
        { receiverId: 'b', amount: SplitAmountVO.create(300, 'BDT'), percentage: SplitPercentageVO.create(30) },
      ],
    },
  });
}

describe('E2E: Split Payment Flow', () => {
  let repo: ReturnType<typeof makeMockRepo>;
  let service: SplitPaymentService;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new SplitPaymentService(repo as unknown as SplitPaymentRepository);
  });

  it('should create → execute split payment', async () => {
    // Step 1: create
    repo.save.mockImplementation(async (e: unknown) => e);
    const createHandler = new CreateSplitPaymentHandler(service);
    const created = await createHandler.execute(
      new CreateSplitPaymentCommand({
        paymentId: VALID_PAYMENT_ID,
        type: 'percentage' as never,
        totalAmount: 1000,
        currency: 'BDT',
        receivers: [
          { receiverId: 'a', percentage: 70 },
          { receiverId: 'b', percentage: 30 },
        ],
      }),
    );
    expect(created.receivers).toHaveLength(2);
    expect(created.isExecuted).toBe(false);

    // Step 2: execute
    repo.findByIdVO.mockResolvedValue(makeSplitEntity());
    const executed = await service.execute(SPLIT_ID, 'admin-1');
    expect(executed.isExecuted).toBe(true);
    expect(executed.executedAt).toBeDefined();
  });

  it('should reject invalid split (percentages != 100)', async () => {
    await expect(
      service.create({
        paymentId: VALID_PAYMENT_ID,
        type: 'percentage' as never,
        totalAmount: 1000,
        currency: 'BDT',
        receivers: [
          { receiverId: 'a', percentage: 50 },
          { receiverId: 'b', percentage: 30 },
        ],
      }),
    ).rejects.toThrow();
  });
});

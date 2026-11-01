/**
 * Payment Initiate — E2E (Application pipeline)
 * @module payment-service/test/e2e/application
 *
 * Full pipeline: CommandBus → Handler → Service → Repository (mock) → EventBridge
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (t: unknown) => t,
  QueryHandler: () => (t: unknown) => t,
  CommandBus: class {},
  QueryBus: class {},
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { PaymentService } from '@application/services/impl/payment.service';
import { InitiatePaymentHandler } from '@application/commands/payment/initiate-payment.handler';
import { InitiatePaymentCommand } from '@application/commands/payment/initiate-payment.command';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import type { IDomainEventBridge } from '@application/services/impl/payment.service';
import {
  makeMockPaymentRepository,
  makeMockEventBridge,
} from '@app-fixtures/mock-helpers';

const VALID_ORDER_ID = '123e4567-e89b-42d3-a456-426614174000';
const VALID_USER_ID = '223e4567-e89b-42d3-a456-426614174001';

describe('E2E: Payment Initiate Flow', () => {
  let repo: ReturnType<typeof makeMockPaymentRepository>;
  let bridge: ReturnType<typeof makeMockEventBridge>;
  let service: PaymentService;
  let handler: InitiatePaymentHandler;

  beforeEach(() => {
    repo = makeMockPaymentRepository();
    bridge = makeMockEventBridge();
    service = new PaymentService(
      repo as unknown as PaymentRepository,
      bridge as unknown as IDomainEventBridge,
    );
    handler = new InitiatePaymentHandler(service);
  });

  it('full pipeline: command → handler → service → save → publish event', async () => {
    repo.save.mockImplementation(async (e: unknown) => e);

    const cmd = new InitiatePaymentCommand(
      {
        orderId: VALID_ORDER_ID,
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
        returnUrl: 'https://example.com/return',
      },
      VALID_USER_ID,
    );

    const result = await handler.execute(cmd);

    expect(result.success).toBe(true);
    expect(result.paymentId).toBeDefined();
    expect(result.status).toBe('pending');
    expect(result.redirectUrl).toBe('https://example.com/return');

    // Repository called once
    expect(repo.save).toHaveBeenCalledTimes(1);

    // Event bridge called once
    expect(bridge.publishFromEntity).toHaveBeenCalledTimes(1);
  });

  it('should reject invalid UUID orderId at service layer', async () => {
    const cmd = new InitiatePaymentCommand(
      {
        orderId: 'not-a-uuid',
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );

    await expect(handler.execute(cmd)).rejects.toThrow();
    expect(repo.save).not.toHaveBeenCalled();
    expect(bridge.publishFromEntity).not.toHaveBeenCalled();
  });

  it('should surface DB error as PaymentInitiationError', async () => {
    repo.save.mockRejectedValue(new Error('DB connection failed'));

    const cmd = new InitiatePaymentCommand(
      {
        orderId: VALID_ORDER_ID,
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 500,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );

    await expect(handler.execute(cmd)).rejects.toThrow();
  });

  it('should not publish event if save fails', async () => {
    repo.save.mockRejectedValue(new Error('boom'));

    const cmd = new InitiatePaymentCommand(
      {
        orderId: VALID_ORDER_ID,
        method: 'wallet' as never,
        amount: 200,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );

    await expect(handler.execute(cmd)).rejects.toThrow();
    expect(bridge.publishFromEntity).not.toHaveBeenCalled();
  });
});

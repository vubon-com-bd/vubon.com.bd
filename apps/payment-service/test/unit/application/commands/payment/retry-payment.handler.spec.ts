/**
 * RetryPaymentHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (target: unknown) => target,
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { RetryPaymentHandler } from '@application/commands/payment/retry-payment.handler';
import { RetryPaymentCommand } from '@application/commands/payment/retry-payment.command';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const VALID_PAYMENT_ID = '523e4567-e89b-42d3-a456-426614174004';

function makeMockService(): IPaymentService {
  return {
    initiate: jest.fn(),
    confirm: jest.fn(),
    cancel: jest.fn(),
    retry: jest.fn(),
    verify: jest.fn(),
    getById: jest.fn(),
    getPublic: jest.fn(),
    list: jest.fn(),
    getStats: jest.fn(),
  };
}

describe('RetryPaymentHandler', () => {
  let handler: RetryPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new RetryPaymentHandler(service);
  });

  it('should delegate to service.retry', async () => {
    const mockResult = { id: VALID_PAYMENT_ID, status: 'processing' };
    (service.retry as jest.Mock).mockResolvedValue(mockResult);
    const cmd = new RetryPaymentCommand({ paymentId: VALID_PAYMENT_ID }, 'admin-1');

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.retry).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should have correct type', () => {
    const cmd = new RetryPaymentCommand({ paymentId: VALID_PAYMENT_ID });
    expect(cmd.type).toBe('payment.payment.retry');
  });
});

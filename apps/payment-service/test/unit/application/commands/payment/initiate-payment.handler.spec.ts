/**
 * InitiatePaymentHandler — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/cqrs', () => ({
  CommandHandler: () => (target: unknown) => target,
  QueryHandler: () => (target: unknown) => target,
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

import { InitiatePaymentHandler } from '@application/commands/payment/initiate-payment.handler';
import { InitiatePaymentCommand } from '@application/commands/payment/initiate-payment.command';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const VALID_ORDER_ID = '123e4567-e89b-42d3-a456-426614174000';
const VALID_USER_ID = '223e4567-e89b-42d3-a456-426614174001';

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

describe('InitiatePaymentHandler', () => {
  let handler: InitiatePaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new InitiatePaymentHandler(service);
  });

  it('should delegate to service.initiate and return result', async () => {
    const mockResult = {
      success: true as const,
      paymentId: 'payment-1',
      status: 'pending' as never,
      redirectUrl: 'https://example.com/return',
    };
    (service.initiate as jest.Mock).mockResolvedValue(mockResult);

    const cmd = new InitiatePaymentCommand(
      {
        orderId: VALID_ORDER_ID,
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.initiate).toHaveBeenCalledWith(cmd.dto, VALID_USER_ID);
  });

  it('should propagate service errors', async () => {
    (service.initiate as jest.Mock).mockRejectedValue(new Error('fail'));
    const cmd = new InitiatePaymentCommand(
      { orderId: VALID_ORDER_ID, method: 'card' as never, amount: 1000, currency: 'BDT' },
      VALID_USER_ID,
    );
    await expect(handler.execute(cmd)).rejects.toThrow('fail');
  });

  it('command should have correct type and timestamp', () => {
    const cmd = new InitiatePaymentCommand(
      { orderId: VALID_ORDER_ID, method: 'card' as never, amount: 1000, currency: 'BDT' },
      VALID_USER_ID,
    );
    expect(cmd.type).toBe('payment.payment.initiate');
    expect(cmd.commandId).toBeDefined();
  });
});

/**
 * CancelPaymentHandler — Unit Tests
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

import { CancelPaymentHandler } from '@application/commands/payment/cancel-payment.handler';
import { CancelPaymentCommand } from '@application/commands/payment/cancel-payment.command';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const VALID_PAYMENT_ID = '423e4567-e89b-42d3-a456-426614174003';

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

describe('CancelPaymentHandler', () => {
  let handler: CancelPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CancelPaymentHandler(service);
  });

  it('should delegate to service.cancel', async () => {
    const mockResult = { id: VALID_PAYMENT_ID, status: 'cancelled' };
    (service.cancel as jest.Mock).mockResolvedValue(mockResult);
    const cmd = new CancelPaymentCommand(
      { paymentId: VALID_PAYMENT_ID, reason: 'customer_request' },
      'user-1',
    );

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.cancel).toHaveBeenCalledWith(cmd.dto, 'user-1');
  });

  it('should have correct type', () => {
    const cmd = new CancelPaymentCommand({ paymentId: VALID_PAYMENT_ID, reason: 'x' });
    expect(cmd.type).toBe('payment.payment.cancel');
  });
});

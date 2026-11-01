/**
 * VerifyPaymentHandler — Unit Tests
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

import { VerifyPaymentHandler } from '@application/commands/payment/verify-payment.handler';
import { VerifyPaymentCommand } from '@application/commands/payment/verify-payment.command';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const VALID_PAYMENT_ID = '623e4567-e89b-42d3-a456-426614174005';
const VALID_USER_ID = '723e4567-e89b-42d3-a456-426614174006';

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

describe('VerifyPaymentHandler', () => {
  let handler: VerifyPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new VerifyPaymentHandler(service);
  });

  it('should delegate to service.verify', async () => {
    const mockResult = { id: VALID_PAYMENT_ID, status: 'captured' };
    (service.verify as jest.Mock).mockResolvedValue(mockResult);
    const cmd = new VerifyPaymentCommand({ paymentId: VALID_PAYMENT_ID }, VALID_USER_ID);

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.verify).toHaveBeenCalledWith(cmd.dto, VALID_USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new VerifyPaymentCommand({ paymentId: VALID_PAYMENT_ID }, VALID_USER_ID);
    expect(cmd.type).toBe('payment.payment.verify');
  });
});

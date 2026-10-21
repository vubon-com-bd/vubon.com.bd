/**
 * ConfirmPaymentHandler — Unit Tests
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

import { ConfirmPaymentHandler } from '@application/commands/payment/confirm-payment.handler';
import { ConfirmPaymentCommand } from '@application/commands/payment/confirm-payment.command';
import type { IPaymentService } from '@application/services/interfaces/payment.service.interface';

const VALID_PAYMENT_ID = '323e4567-e89b-42d3-a456-426614174002';

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

describe('ConfirmPaymentHandler', () => {
  let handler: ConfirmPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ConfirmPaymentHandler(service);
  });

  it('should delegate to service.confirm', async () => {
    const mockResult = { id: VALID_PAYMENT_ID, status: 'captured' };
    (service.confirm as jest.Mock).mockResolvedValue(mockResult);
    const cmd = new ConfirmPaymentCommand(
      { paymentId: VALID_PAYMENT_ID, gatewayReference: 'ch_123', confirmedAmount: 1000 },
      'admin-1',
    );

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.confirm).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should pass undefined actorId when not provided', async () => {
    (service.confirm as jest.Mock).mockResolvedValue({});
    const cmd = new ConfirmPaymentCommand({ paymentId: VALID_PAYMENT_ID });
    await handler.execute(cmd);
    expect(service.confirm).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should have correct command type', () => {
    const cmd = new ConfirmPaymentCommand({ paymentId: VALID_PAYMENT_ID });
    expect(cmd.type).toBe('payment.payment.confirm');
  });
});

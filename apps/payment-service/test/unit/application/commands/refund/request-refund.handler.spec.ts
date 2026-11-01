/**
 * RequestRefundHandler — Unit Tests
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

import { RequestRefundHandler } from '@application/commands/refund/request-refund.handler';
import { RequestRefundCommand } from '@application/commands/refund/request-refund.command';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

const PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';

function makeMockService(): IRefundService {
  return {
    request: jest.fn(),
    approve: jest.fn(),
    reject: jest.fn(),
    partial: jest.fn(),
    getById: jest.fn(),
    listByPayment: jest.fn(),
    list: jest.fn(),
    getStats: jest.fn(),
  };
}

describe('RequestRefundHandler', () => {
  let handler: RequestRefundHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new RequestRefundHandler(service);
  });

  it('should delegate to service.request', async () => {
    const mockResult = { success: true as const, refundId: 'refund-1', status: 'requested' as never };
    (service.request as jest.Mock).mockResolvedValue(mockResult);
    const cmd = new RequestRefundCommand({ paymentId: PAYMENT_ID, amount: 500 }, 'user-1');

    const result = await handler.execute(cmd);
    expect(result).toBe(mockResult);
    expect(service.request).toHaveBeenCalledWith(cmd.dto, 'user-1');
  });

  it('should have correct type', () => {
    const cmd = new RequestRefundCommand({ paymentId: PAYMENT_ID });
    expect(cmd.type).toBe('payment.refund.request');
  });
});

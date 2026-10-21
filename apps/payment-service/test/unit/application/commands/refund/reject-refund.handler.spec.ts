/**
 * RejectRefundHandler — Unit Tests
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

import { RejectRefundHandler } from '@application/commands/refund/reject-refund.handler';
import { RejectRefundCommand } from '@application/commands/refund/reject-refund.command';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

const REFUND_ID = '323e4567-e89b-42d3-a456-426614174002';

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

describe('RejectRefundHandler', () => {
  let handler: RejectRefundHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new RejectRefundHandler(service);
  });

  it('should delegate to service.reject', async () => {
    (service.reject as jest.Mock).mockResolvedValue({ id: REFUND_ID, status: 'rejected' });
    const cmd = new RejectRefundCommand({ refundId: REFUND_ID, reason: 'invalid' }, 'admin-1');
    await handler.execute(cmd);
    expect(service.reject).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should have correct type', () => {
    const cmd = new RejectRefundCommand({ refundId: REFUND_ID, reason: 'x' }, 'admin');
    expect(cmd.type).toBe('payment.refund.reject');
  });
});

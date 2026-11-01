/**
 * ApproveRefundHandler — Unit Tests
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

import { ApproveRefundHandler } from '@application/commands/refund/approve-refund.handler';
import { ApproveRefundCommand } from '@application/commands/refund/approve-refund.command';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

const REFUND_ID = '223e4567-e89b-42d3-a456-426614174001';

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

describe('ApproveRefundHandler', () => {
  let handler: ApproveRefundHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new ApproveRefundHandler(service);
  });

  it('should delegate to service.approve', async () => {
    (service.approve as jest.Mock).mockResolvedValue({ id: REFUND_ID });
    const cmd = new ApproveRefundCommand({ refundId: REFUND_ID }, 'admin-1');

    const result = await handler.execute(cmd);
    expect(result).toEqual({ id: REFUND_ID });
    expect(service.approve).toHaveBeenCalledWith(cmd.dto, 'admin-1');
  });

  it('should have correct type', () => {
    const cmd = new ApproveRefundCommand({ refundId: REFUND_ID }, 'admin');
    expect(cmd.type).toBe('payment.refund.approve');
  });
});

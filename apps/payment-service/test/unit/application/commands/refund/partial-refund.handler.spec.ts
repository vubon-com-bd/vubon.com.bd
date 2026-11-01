/**
 * PartialRefundHandler — Unit Tests
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

import { PartialRefundHandler } from '@application/commands/refund/partial-refund.handler';
import { PartialRefundCommand } from '@application/commands/refund/partial-refund.command';
import type { IRefundService } from '@application/services/interfaces/refund.service.interface';

const PAYMENT_ID = '423e4567-e89b-42d3-a456-426614174003';

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

describe('PartialRefundHandler', () => {
  let handler: PartialRefundHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new PartialRefundHandler(service);
  });

  it('should delegate to service.partial', async () => {
    (service.partial as jest.Mock).mockResolvedValue({ id: 'refund-1' });
    const cmd = new PartialRefundCommand(
      { paymentId: PAYMENT_ID, amount: 100, currency: 'BDT', reason: 'partial' },
      'user-1',
    );
    await handler.execute(cmd);
    expect(service.partial).toHaveBeenCalledWith(cmd.dto, 'user-1');
  });

  it('should have correct type', () => {
    const cmd = new PartialRefundCommand({
      paymentId: PAYMENT_ID,
      amount: 100,
      currency: 'BDT',
      reason: 'x',
    });
    expect(cmd.type).toBe('payment.refund.partial');
  });
});

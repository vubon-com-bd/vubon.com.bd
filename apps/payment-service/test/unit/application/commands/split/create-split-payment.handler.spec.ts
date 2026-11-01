/**
 * CreateSplitPaymentHandler — Unit Tests
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

import { CreateSplitPaymentHandler } from '@application/commands/split/create-split-payment.handler';
import { CreateSplitPaymentCommand } from '@application/commands/split/create-split-payment.command';
import type { ISplitPaymentService } from '@application/services/interfaces/split-payment.service.interface';

const PAYMENT_ID = '323e4567-e89b-42d3-a456-426614174002';

function makeMockService(): ISplitPaymentService {
  return {
    create: jest.fn(),
    execute: jest.fn(),
    getById: jest.fn(),
    listByPayment: jest.fn(),
    list: jest.fn(),
  };
}

describe('CreateSplitPaymentHandler', () => {
  let handler: CreateSplitPaymentHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new CreateSplitPaymentHandler(service);
  });

  it('should delegate to service.create', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'split-1' });
    const cmd = new CreateSplitPaymentCommand({
      paymentId: PAYMENT_ID,
      type: 'percentage' as never,
      totalAmount: 1000,
      currency: 'BDT',
      receivers: [
        { receiverId: 'a', percentage: 70 },
        { receiverId: 'b', percentage: 30 },
      ],
    });
    await handler.execute(cmd);
    expect(service.create).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should have correct type', () => {
    const cmd = new CreateSplitPaymentCommand({
      paymentId: PAYMENT_ID,
      type: 'percentage' as never,
      totalAmount: 1000,
      currency: 'BDT',
      receivers: [],
    });
    expect(cmd.type).toBe('payment.split.create');
  });
});

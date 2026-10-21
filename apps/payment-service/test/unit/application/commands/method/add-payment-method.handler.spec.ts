/**
 * AddPaymentMethodHandler — Unit Tests
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

import { AddPaymentMethodHandler } from '@application/commands/method/add-payment-method.handler';
import { AddPaymentMethodCommand } from '@application/commands/method/add-payment-method.command';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const USER_ID = '523e4567-e89b-42d3-a456-426614174004';

function makeMockService(): IPaymentMethodService {
  return {
    add: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    setDefault: jest.fn(),
    getById: jest.fn(),
    listByUser: jest.fn(),
  };
}

describe('AddPaymentMethodHandler', () => {
  let handler: AddPaymentMethodHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new AddPaymentMethodHandler(service);
  });

  it('should delegate to service.add', async () => {
    (service.add as jest.Mock).mockResolvedValue({ id: 'method-1' });
    const cmd = new AddPaymentMethodCommand(
      { method: 'card' as never, type: 'online' as never, gateway: 'stripe' as never },
      USER_ID,
    );
    await handler.execute(cmd);
    expect(service.add).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new AddPaymentMethodCommand(
      { method: 'card' as never, type: 'online' as never },
      USER_ID,
    );
    expect(cmd.type).toBe('payment.method.add');
  });
});

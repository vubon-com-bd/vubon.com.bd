/**
 * UpdatePaymentMethodHandler — Unit Tests
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

import { UpdatePaymentMethodHandler } from '@application/commands/method/update-payment-method.handler';
import { UpdatePaymentMethodCommand } from '@application/commands/method/update-payment-method.command';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const METHOD_ID = '623e4567-e89b-42d3-a456-426614174005';
const USER_ID = '723e4567-e89b-42d3-a456-426614174006';

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

describe('UpdatePaymentMethodHandler', () => {
  let handler: UpdatePaymentMethodHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new UpdatePaymentMethodHandler(service);
  });

  it('should delegate to service.update', async () => {
    (service.update as jest.Mock).mockResolvedValue({ id: METHOD_ID });
    const cmd = new UpdatePaymentMethodCommand({ methodId: METHOD_ID, label: 'New' }, USER_ID);
    await handler.execute(cmd);
    expect(service.update).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new UpdatePaymentMethodCommand({ methodId: METHOD_ID }, USER_ID);
    expect(cmd.type).toBe('payment.method.update');
  });
});

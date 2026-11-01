/**
 * DeletePaymentMethodHandler — Unit Tests
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

import { DeletePaymentMethodHandler } from '@application/commands/method/delete-payment-method.handler';
import { DeletePaymentMethodCommand } from '@application/commands/method/delete-payment-method.command';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const METHOD_ID = '823e4567-e89b-42d3-a456-426614174007';
const USER_ID = '923e4567-e89b-42d3-a456-426614174008';

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

describe('DeletePaymentMethodHandler', () => {
  let handler: DeletePaymentMethodHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new DeletePaymentMethodHandler(service);
  });

  it('should delegate to service.remove', async () => {
    (service.remove as jest.Mock).mockResolvedValue(undefined);
    const cmd = new DeletePaymentMethodCommand({ methodId: METHOD_ID }, USER_ID);
    const result = await handler.execute(cmd);
    expect(result).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new DeletePaymentMethodCommand({ methodId: METHOD_ID }, USER_ID);
    expect(cmd.type).toBe('payment.method.delete');
  });
});

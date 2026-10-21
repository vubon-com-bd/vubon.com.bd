/**
 * SetDefaultMethodHandler — Unit Tests
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

import { SetDefaultMethodHandler } from '@application/commands/method/set-default-method.handler';
import { SetDefaultMethodCommand } from '@application/commands/method/set-default-method.command';
import type { IPaymentMethodService } from '@application/services/interfaces/payment-method.service.interface';

const METHOD_ID = 'a23e4567-e89b-42d3-a456-426614174009';
const USER_ID = 'b23e4567-e89b-42d3-a456-42661417400a';

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

describe('SetDefaultMethodHandler', () => {
  let handler: SetDefaultMethodHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new SetDefaultMethodHandler(service);
  });

  it('should delegate to service.setDefault', async () => {
    (service.setDefault as jest.Mock).mockResolvedValue({ id: METHOD_ID });
    const cmd = new SetDefaultMethodCommand({ methodId: METHOD_ID }, USER_ID);
    await handler.execute(cmd);
    expect(service.setDefault).toHaveBeenCalledWith(cmd.dto, USER_ID);
  });

  it('should have correct type', () => {
    const cmd = new SetDefaultMethodCommand({ methodId: METHOD_ID }, USER_ID);
    expect(cmd.type).toBe('payment.method.set_default');
  });
});

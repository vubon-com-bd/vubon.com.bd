import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GenerateInvoiceHandler } from '@application/commands/invoice/generate-invoice.handler';
import { GenerateInvoiceCommand } from '@application/commands/invoice/generate-invoice.command';
import type { IInvoiceService } from '@application/services/interfaces/invoice.service.interface';

const USER_ID = 'a23e4567-e89b-42d3-a456-426614174009';

function makeMockService(): IInvoiceService {
  return {
    generate: jest.fn(), send: jest.fn(), void: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GenerateInvoiceHandler', () => {
  let handler: GenerateInvoiceHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GenerateInvoiceHandler(service);
  });

  it('should delegate to service.generate', async () => {
    (service.generate as jest.Mock).mockResolvedValue({ id: 'inv-1' });
    const cmd = new GenerateInvoiceCommand({
      userId: USER_ID,
      subtotal: 1000,
      taxAmount: 150,
      currency: 'BDT',
    });
    await handler.execute(cmd);
    expect(service.generate).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should have correct type', () => {
    const cmd = new GenerateInvoiceCommand({
      userId: USER_ID, subtotal: 1000, taxAmount: 150, currency: 'BDT',
    });
    expect(cmd.type).toBe('payment.invoice.generate');
  });
});

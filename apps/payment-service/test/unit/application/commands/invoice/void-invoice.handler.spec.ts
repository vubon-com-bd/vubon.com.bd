import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { VoidInvoiceHandler } from '@application/commands/invoice/void-invoice.handler';
import { VoidInvoiceCommand } from '@application/commands/invoice/void-invoice.command';
import type { IInvoiceService } from '@application/services/interfaces/invoice.service.interface';

const INVOICE_ID = 'c23e4567-e89b-42d3-a456-42661417400b';

function makeMockService(): IInvoiceService {
  return {
    generate: jest.fn(), send: jest.fn(), void: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('VoidInvoiceHandler', () => {
  let handler: VoidInvoiceHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new VoidInvoiceHandler(service);
  });

  it('should delegate to service.void', async () => {
    (service.void as jest.Mock).mockResolvedValue({ id: INVOICE_ID, status: 'void' });
    const cmd = new VoidInvoiceCommand({ invoiceId: INVOICE_ID, reason: 'duplicate' });
    await handler.execute(cmd);
    expect(service.void).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should have correct type', () => {
    const cmd = new VoidInvoiceCommand({ invoiceId: INVOICE_ID, reason: 'x' });
    expect(cmd.type).toBe('payment.invoice.void');
  });
});

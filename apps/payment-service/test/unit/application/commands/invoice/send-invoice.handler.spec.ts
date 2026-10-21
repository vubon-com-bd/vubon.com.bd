import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ CommandHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { SendInvoiceHandler } from '@application/commands/invoice/send-invoice.handler';
import { SendInvoiceCommand } from '@application/commands/invoice/send-invoice.command';
import type { IInvoiceService } from '@application/services/interfaces/invoice.service.interface';

const INVOICE_ID = 'b23e4567-e89b-42d3-a456-42661417400a';

function makeMockService(): IInvoiceService {
  return {
    generate: jest.fn(), send: jest.fn(), void: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('SendInvoiceHandler', () => {
  let handler: SendInvoiceHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new SendInvoiceHandler(service);
  });

  it('should delegate to service.send', async () => {
    (service.send as jest.Mock).mockResolvedValue({ id: INVOICE_ID });
    const cmd = new SendInvoiceCommand({ invoiceId: INVOICE_ID, channel: 'email' });
    await handler.execute(cmd);
    expect(service.send).toHaveBeenCalledWith(cmd.dto, undefined);
  });

  it('should have correct type', () => {
    const cmd = new SendInvoiceCommand({ invoiceId: INVOICE_ID, channel: 'email' });
    expect(cmd.type).toBe('payment.invoice.send');
  });
});

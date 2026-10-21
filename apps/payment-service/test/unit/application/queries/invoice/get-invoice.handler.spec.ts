import { describe, it, expect, beforeEach, jest } from '@jest/globals';
jest.mock('@nestjs/cqrs', () => ({ QueryHandler: () => (t: unknown) => t }));
jest.mock('@nestjs/common', () => ({
  Injectable: () => (t: unknown) => t,
  Inject: () => () => undefined,
  Logger: class { log(): void {} error(): void {} warn(): void {} debug(): void {} verbose(): void {} },
}));

import { GetInvoiceHandler } from '@application/queries/invoice/get-invoice.handler';
import { GetInvoiceQuery } from '@application/queries/invoice/get-invoice.query';
import type { IInvoiceService } from '@application/services/interfaces/invoice.service.interface';

const INVOICE_ID = '323e4567-e89b-42d3-a456-426614174002';

function makeMockService(): IInvoiceService {
  return {
    generate: jest.fn(), send: jest.fn(), void: jest.fn(),
    getById: jest.fn(), listByUser: jest.fn(), list: jest.fn(), getStats: jest.fn(),
  };
}

describe('GetInvoiceHandler', () => {
  let handler: GetInvoiceHandler;
  let service: ReturnType<typeof makeMockService>;

  beforeEach(() => {
    service = makeMockService();
    handler = new GetInvoiceHandler(service);
  });

  it('should delegate to service.getById', async () => {
    (service.getById as jest.Mock).mockResolvedValue({ id: INVOICE_ID });
    const result = await handler.execute(new GetInvoiceQuery(INVOICE_ID));
    expect(result).toEqual({ id: INVOICE_ID });
    expect(service.getById).toHaveBeenCalledWith(INVOICE_ID);
  });

  it('should have correct type', () => {
    expect(new GetInvoiceQuery(INVOICE_ID).type).toBe('payment.invoice.get');
  });
});

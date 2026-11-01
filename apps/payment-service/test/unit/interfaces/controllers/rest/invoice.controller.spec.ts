/**
 * InvoiceController — unit tests
 * @module payment-service/test/unit/interfaces/controllers/rest
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { InvoiceController } from '@interfaces/controllers/rest/invoice.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('InvoiceController', () => {
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };
  let controller: InvoiceController;
  const user = { userId: 'u1', roles: ['admin'] };

  beforeEach(() => {
    commandBus = { execute: jest.fn(async () => ({ id: 'i1' })) };
    queryBus = { execute: jest.fn(async () => ({ items: [], total: 0 })) };
    controller = new InvoiceController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus,
    );
  });

  it('generate dispatches GenerateInvoiceCommand', async () => {
    await controller.generate(
      {
        userId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        subtotal: 1000,
        taxAmount: 150,
        currency: 'BDT',
      },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('send dispatches SendInvoiceCommand', async () => {
    await controller.send(
      'i1',
      { channel: 'email', recipientEmail: 'a@b.com' },
      user,
    );
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('void dispatches VoidInvoiceCommand', async () => {
    await controller.void('i1', { reason: 'duplicate' }, user);
    expect(commandBus.execute).toHaveBeenCalledTimes(1);
  });

  it('list dispatches ListInvoicesQuery', async () => {
    await controller.list({ page: 1, limit: 20 });
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });

  it('getById dispatches GetInvoiceQuery', async () => {
    await controller.getById('i1');
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});

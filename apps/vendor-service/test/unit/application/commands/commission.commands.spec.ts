import { jest } from '@jest/globals';
import { ConfigureCommissionHandler } from '../../../../src/module/application/commands/commission/configure-commission.handler.js';
import { ConfigureCommissionCommand } from '../../../../src/module/application/commands/commission/configure-commission.command.js';
import { CalculateCommissionHandler } from '../../../../src/module/application/commands/commission/calculate-commission.handler.js';
import { CalculateCommissionCommand } from '../../../../src/module/application/commands/commission/calculate-commission.command.js';
import { CreateInvoiceHandler } from '../../../../src/module/application/commands/commission/create-invoice.handler.js';
import { CreateInvoiceCommand } from '../../../../src/module/application/commands/commission/create-invoice.command.js';
import { SendInvoiceHandler } from '../../../../src/module/application/commands/commission/send-invoice.handler.js';
import { SendInvoiceCommand } from '../../../../src/module/application/commands/commission/send-invoice.command.js';
import { MarkInvoicePaidHandler } from '../../../../src/module/application/commands/commission/mark-invoice-paid.handler.js';
import { MarkInvoicePaidCommand } from '../../../../src/module/application/commands/commission/mark-invoice-paid.command.js';
import type { IVendorCommissionService } from '../../../../src/module/application/services/interfaces/vendor-commission.service.interface.js';
import type { IVendorInvoiceService } from '../../../../src/module/application/services/interfaces/vendor-invoice.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeCommissionMock(): jest.Mocked<IVendorCommissionService> {
  return {
    configure: jest.fn().mockResolvedValue({ id: UUID } as never),
    calculate: jest.fn().mockResolvedValue({ totalCommission: 100 } as never),
    activate: jest.fn(),
    deactivate: jest.fn(),
    getById: jest.fn(),
    getActiveByVendorId: jest.fn(),
    listByVendor: jest.fn(),
  } as unknown as jest.Mocked<IVendorCommissionService>;
}

function makeInvoiceMock(): jest.Mocked<IVendorInvoiceService> {
  return {
    create: jest.fn().mockResolvedValue({ id: UUID } as never),
    send: jest.fn().mockResolvedValue({ id: UUID } as never),
    markViewed: jest.fn(),
    markPaid: jest.fn().mockResolvedValue({ id: UUID } as never),
    cancel: jest.fn(),
    getById: jest.fn(),
    listByVendor: jest.fn(),
    listUnpaidByVendor: jest.fn(),
  } as unknown as jest.Mocked<IVendorInvoiceService>;
}

describe('Commission command handlers', () => {
  it('ConfigureCommissionHandler delegates', async () => {
    const commission = makeCommissionMock();
    const handler = new ConfigureCommissionHandler(commission);
    await handler.execute(new ConfigureCommissionCommand({ vendorId: UUID } as never, UUID));
    expect(commission.configure).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('CalculateCommissionHandler delegates', async () => {
    const commission = makeCommissionMock();
    const handler = new CalculateCommissionHandler(commission);
    await handler.execute(new CalculateCommissionCommand({ vendorId: UUID } as never, UUID));
    expect(commission.calculate).toHaveBeenCalledWith({ vendorId: UUID });
  });

  it('CreateInvoiceHandler delegates', async () => {
    const invoice = makeInvoiceMock();
    const handler = new CreateInvoiceHandler(invoice);
    await handler.execute(new CreateInvoiceCommand({ vendorId: UUID } as never, UUID));
    expect(invoice.create).toHaveBeenCalledWith({ vendorId: UUID }, UUID);
  });

  it('SendInvoiceHandler delegates', async () => {
    const invoice = makeInvoiceMock();
    const handler = new SendInvoiceHandler(invoice);
    await handler.execute(new SendInvoiceCommand({ invoiceId: UUID, sentBy: UUID }, UUID));
    expect(invoice.send).toHaveBeenCalled();
  });

  it('MarkInvoicePaidHandler delegates', async () => {
    const invoice = makeInvoiceMock();
    const handler = new MarkInvoicePaidHandler(invoice);
    await handler.execute(new MarkInvoicePaidCommand({ invoiceId: UUID } as never, UUID));
    expect(invoice.markPaid).toHaveBeenCalledWith({ invoiceId: UUID }, UUID);
  });
});

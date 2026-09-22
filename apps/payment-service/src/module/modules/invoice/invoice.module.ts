import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InvoiceController } from '../../interfaces/controllers/rest/invoice.controller';
import { InvoiceService } from '../../application/services/impl/invoice.service';
import { InvoiceMapper } from '../../application/mappers/invoice.mapper';
import { GenerateInvoiceHandler } from '../../application/commands/invoice/generate-invoice.handler';
import { SendInvoiceHandler } from '../../application/commands/invoice/send-invoice.handler';
import { VoidInvoiceHandler } from '../../application/commands/invoice/void-invoice.handler';
import { GetInvoiceHandler } from '../../application/queries/invoice/get-invoice.handler';
import { ListInvoicesHandler } from '../../application/queries/invoice/list-invoices.handler';

@Module({
  imports: [CqrsModule],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    InvoiceMapper,
    GenerateInvoiceHandler,
    SendInvoiceHandler,
    VoidInvoiceHandler,
    GetInvoiceHandler,
    ListInvoicesHandler,
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}

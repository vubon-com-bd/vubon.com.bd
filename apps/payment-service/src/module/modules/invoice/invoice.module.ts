/**
 * InvoiceModule — feature wiring for invoices
 * @module payment-service/modules/invoice
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controller ─────────────────────────────
import { InvoiceController } from '@interfaces/controllers/rest/invoice.controller';

// ─── Handler arrays ─────────────────────────
import { INVOICE_COMMAND_HANDLERS } from './commands/index.js';
import { INVOICE_QUERY_HANDLERS } from './queries/index.js';

// ─── Service + interface token ──────────────
import { InvoiceService } from '@application/services/impl/invoice.service';
import { INVOICE_SERVICE } from '@application/services/interfaces/invoice.service.interface';

@Module({
  imports: [CqrsModule],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    { provide: INVOICE_SERVICE, useExisting: InvoiceService },
    ...(INVOICE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(INVOICE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [InvoiceService, INVOICE_SERVICE],
})
export class InvoiceModule {}

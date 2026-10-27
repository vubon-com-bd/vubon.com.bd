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

// ─── PDF Service ────────────────────────────
import { InvoicePdfService, INVOICE_PDF_SERVICE } from '@infrastructure/services/internal/invoice-pdf.service';
import { QrCodeService, QR_CODE_SERVICE } from '@infrastructure/services/internal/qr-code.service';

@Module({
  imports: [CqrsModule],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    { provide: INVOICE_SERVICE, useExisting: InvoiceService },
    InvoicePdfService,
    { provide: INVOICE_PDF_SERVICE, useExisting: InvoicePdfService },
    QrCodeService,
    { provide: QR_CODE_SERVICE, useExisting: QrCodeService },
    ...(INVOICE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(INVOICE_QUERY_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [InvoiceService, INVOICE_SERVICE],
})
export class InvoiceModule {}

/**
 * InvoiceGeneratorService — invoice number + PDF content builder
 * @module payment-service/infrastructure/services/internal
 *
 * Invoice number generation delegates to domain InvoiceNumberService.
 * PDF rendering is out of scope (would use puppeteer/pdfkit).
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InvoiceNumberService, INVOICE_NUMBER_SERVICE } from '@domain/services/invoice-number.service';

export const INVOICE_GENERATOR_SERVICE = Symbol('INVOICE_GENERATOR_SERVICE');

export interface InvoiceTemplateData {
  readonly invoiceNumber: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly issuedAt: string;
  readonly dueAt?: string;
  readonly notes?: string;
}

@Injectable()
export class InvoiceGeneratorService {
  constructor(
    @Inject(INVOICE_NUMBER_SERVICE)
    private readonly invoiceNumberService: InvoiceNumberService,
  ) {}
  private readonly logger = new Logger(InvoiceGeneratorService.name);

  async generateNumber(referenceDate: Date = new Date()): Promise<string> {
    return this.invoiceNumberService.generate(referenceDate);
  }

  /**
   * Render invoice as HTML (PDF rendering happens at external layer).
   */
  renderHtml(data: InvoiceTemplateData): string {
    this.logger.debug(`Rendering invoice ${data.invoiceNumber}`);
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Invoice ${data.invoiceNumber}</title></head>
<body style="font-family: sans-serif; max-width: 800px; margin: 24px auto;">
  <h1>Invoice ${data.invoiceNumber}</h1>
  <p><strong>Issued:</strong> ${data.issuedAt}</p>
  ${data.dueAt ? `<p><strong>Due:</strong> ${data.dueAt}</p>` : ''}
  <table width="100%" border="1" cellspacing="0" cellpadding="8">
    <tr><td>Subtotal</td><td align="right">${data.subtotal.toFixed(2)} ${data.currency}</td></tr>
    <tr><td>Tax</td><td align="right">${data.taxAmount.toFixed(2)} ${data.currency}</td></tr>
    <tr><th align="left">Total</th><th align="right">${data.total.toFixed(2)} ${data.currency}</th></tr>
  </table>
  ${data.notes ? `<p>${data.notes}</p>` : ''}
</body></html>`;
  }
}

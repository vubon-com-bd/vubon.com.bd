import { Injectable } from '@nestjs/common';
import { INVOICE_CONFIG } from '../../config/invoice.config';
import { InvoiceEntity } from '../../../domain/entities/invoice.entity';

export interface InvoiceDocument {
  readonly number: string;
  readonly html: string;
  readonly generatedAt: string;
}

@Injectable()
export class InvoiceGeneratorService {
  generate(entity: InvoiceEntity): InvoiceDocument {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Invoice ${entity.number.value}</title></head>
        <body>
          <h1>Invoice ${entity.number.value}</h1>
          <p>Amount: ${entity.amount.amount} ${entity.currency.value}</p>
          <p>Status: ${entity.status.value}</p>
          <p>Due: ${entity.dueAt?.toISOString() ?? 'N/A'}</p>
          <p>Issued by: ${INVOICE_CONFIG.prefix} — Payment Service</p>
        </body>
      </html>
    `;
    return {
      number: entity.number.value,
      html,
      generatedAt: new Date().toISOString(),
    };
  }
}

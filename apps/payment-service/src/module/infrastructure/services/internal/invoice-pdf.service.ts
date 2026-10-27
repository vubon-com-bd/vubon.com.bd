/**
 * InvoicePdfService — generates professional PDF invoices
 * @module payment-service/infrastructure/services/internal
 *
 * Uses pdfkit for PDF generation (pure JS, ARM64-friendly).
 * Supports QR code embedding for delivery/scan-to-drop.
 */
import { Injectable, Logger } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export const INVOICE_PDF_SERVICE = Symbol('INVOICE_PDF_SERVICE');

export interface InvoicePdfData {
  readonly invoiceNumber: string;
  readonly invoiceId: string;
  readonly orderId?: string;
  readonly userId: string;
  readonly status: string;
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly issuedAt: string;
  readonly dueAt?: string;
  readonly customerName?: string;
  readonly customerEmail?: string;
  readonly customerPhone?: string;
  readonly items?: readonly {
    readonly name: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly totalPrice: number;
  }[];
  readonly notes?: string;
}

@Injectable()
export class InvoicePdfService {
  private readonly logger = new Logger(InvoicePdfService.name);

  /**
   * Generate professional invoice PDF as Buffer
   */
  async generate(data: InvoicePdfData): Promise<Buffer> {
    this.logger.debug(`Generating PDF for invoice ${data.invoiceNumber}`);

    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          info: {
            Title: `Invoice ${data.invoiceNumber}`,
            Author: 'Vubon.com.bd',
            Subject: `Invoice for order ${data.orderId ?? 'N/A'}`,
            Keywords: `invoice,${data.invoiceNumber},${data.orderId ?? ''}`,
          },
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        this.renderInvoice(doc, data);

        doc.end();
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  /**
   * Generate invoice PDF with embedded QR code
   */
  async generateWithQr(data: InvoicePdfData, qrPayload: string): Promise<Buffer> {
    this.logger.debug(`Generating QR-enhanced PDF for invoice ${data.invoiceNumber}`);

    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 256,
      margin: 1,
    });
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          info: {
            Title: `Invoice ${data.invoiceNumber}`,
            Author: 'Vubon.com.bd',
          },
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        this.renderInvoice(doc, data, qrBuffer);

        doc.end();
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  private renderInvoice(doc: PDFKit.PDFDocument, data: InvoicePdfData, qrBuffer?: Buffer): void {
    const pageWidth = doc.page.width - 100; // margins
    const primaryColor = '#1a56db';
    const grayColor = '#6b7280';

    // ═══════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════
    doc
      .fontSize(24)
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .text('VUBON', 50, 50);

    doc
      .fontSize(10)
      .fillColor(grayColor)
      .font('Helvetica')
      .text('vubon.com.bd', 50, 80);

    // Invoice title (right)
    doc
      .fontSize(20)
      .fillColor(primaryColor)
      .font('Helvetica-Bold')
      .text('INVOICE', 400, 50, { width: 145, align: 'right' });

    doc
      .fontSize(10)
      .fillColor(grayColor)
      .font('Helvetica')
      .text(`#${data.invoiceNumber}`, 400, 80, { width: 145, align: 'right' });

    // Line separator
    doc
      .moveTo(50, 110)
      .lineTo(50 + pageWidth, 110)
      .strokeColor(primaryColor)
      .lineWidth(2)
      .stroke();

    // ═══════════════════════════════════════════════════════════
    // BILLING DETAILS
    // ═══════════════════════════════════════════════════════════
    const detailsY = 130;

    // Left: Bill To
    doc
      .fontSize(10)
      .fillColor(grayColor)
      .font('Helvetica-Bold')
      .text('BILL TO', 50, detailsY);

    doc
      .fontSize(11)
      .fillColor('#000')
      .font('Helvetica')
      .text(data.customerName ?? 'Customer', 50, detailsY + 18);

    let customerInfoY = detailsY + 35;
    if (data.customerEmail) {
      doc.fontSize(9).fillColor(grayColor).text(data.customerEmail, 50, customerInfoY);
      customerInfoY += 14;
    }
    if (data.customerPhone) {
      doc.fontSize(9).fillColor(grayColor).text(data.customerPhone, 50, customerInfoY);
    }

    // Right: Invoice Details
    doc
      .fontSize(10)
      .fillColor(grayColor)
      .font('Helvetica-Bold')
      .text('INVOICE DETAILS', 350, detailsY);

    const detailsX = 350;
    let detailY = detailsY + 18;

    doc.fontSize(9).fillColor(grayColor).font('Helvetica');
    doc.text('Issue Date:', detailsX, detailY);
    doc.text(new Date(data.issuedAt).toLocaleDateString('en-GB'), detailsX + 100, detailY, {
      width: 100,
      align: 'right',
    });
    detailY += 15;

    if (data.dueAt) {
      doc.text('Due Date:', detailsX, detailY);
      doc.text(new Date(data.dueAt).toLocaleDateString('en-GB'), detailsX + 100, detailY, {
        width: 100,
        align: 'right',
      });
      detailY += 15;
    }

    doc.text('Status:', detailsX, detailY);
    doc
      .fillColor(data.status === 'paid' ? '#059669' : primaryColor)
      .font('Helvetica-Bold')
      .text(data.status.toUpperCase(), detailsX + 100, detailY, {
        width: 100,
        align: 'right',
      });

    // ═══════════════════════════════════════════════════════════
    // ITEMS TABLE
    // ═══════════════════════════════════════════════════════════
    const tableY = detailsY + 120;

    // Table header
    doc
      .rect(50, tableY, pageWidth, 25)
      .fillColor(primaryColor)
      .fill();

    doc
      .fontSize(10)
      .fillColor('#fff')
      .font('Helvetica-Bold')
      .text('ITEM', 60, tableY + 8)
      .text('QTY', 350, tableY + 8, { width: 50, align: 'right' })
      .text('PRICE', 410, tableY + 8, { width: 70, align: 'right' })
      .text('TOTAL', 490, tableY + 8, { width: 60, align: 'right' });

    // Table rows
    let rowY = tableY + 30;
    const items = data.items ?? [
      {
        name: 'Order total',
        quantity: 1,
        unitPrice: data.subtotal,
        totalPrice: data.subtotal,
      },
    ];

    items.forEach((item, idx) => {
      if (idx % 2 === 0) {
        doc
          .rect(50, rowY - 5, pageWidth, 22)
          .fillColor('#f9fafb')
          .fill();
      }

      doc
        .fontSize(9)
        .fillColor('#000')
        .font('Helvetica')
        .text(item.name, 60, rowY, { width: 280 })
        .text(item.quantity.toString(), 350, rowY, { width: 50, align: 'right' })
        .text(
          `${item.unitPrice.toFixed(2)} ${data.currency}`,
          410,
          rowY,
          { width: 70, align: 'right' },
        )
        .text(
          `${item.totalPrice.toFixed(2)} ${data.currency}`,
          490,
          rowY,
          { width: 60, align: 'right' },
        );

      rowY += 22;
    });

    // Line separator
    doc
      .moveTo(50, rowY + 10)
      .lineTo(50 + pageWidth, rowY + 10)
      .strokeColor('#e5e7eb')
      .lineWidth(1)
      .stroke();

    // ═══════════════════════════════════════════════════════════
    // TOTALS
    // ═══════════════════════════════════════════════════════════
    let totalY = rowY + 20;
    const totalLabelX = 350;
    const totalValueX = 460;
    const totalWidth = 90;

    doc.fontSize(10).fillColor(grayColor).font('Helvetica');
    doc.text('Subtotal:', totalLabelX, totalY);
    doc.text(
      `${data.subtotal.toFixed(2)} ${data.currency}`,
      totalValueX,
      totalY,
      { width: totalWidth, align: 'right' },
    );
    totalY += 20;

    doc.text('Tax:', totalLabelX, totalY);
    doc.text(
      `${data.taxAmount.toFixed(2)} ${data.currency}`,
      totalValueX,
      totalY,
      { width: totalWidth, align: 'right' },
    );
    totalY += 25;

    // Grand total box
    doc
      .rect(totalLabelX - 10, totalY - 5, totalValueX + totalWidth - totalLabelX + 15, 30)
      .fillColor(primaryColor)
      .fill();

    doc
      .fontSize(12)
      .fillColor('#fff')
      .font('Helvetica-Bold')
      .text('TOTAL:', totalLabelX, totalY + 5)
      .text(
        `${data.total.toFixed(2)} ${data.currency}`,
        totalValueX,
        totalY + 5,
        { width: totalWidth, align: 'right' },
      );

    // ═══════════════════════════════════════════════════════════
    // QR CODE (if provided)
    // ═══════════════════════════════════════════════════════════
    if (qrBuffer) {
      const qrY = totalY + 50;
      doc
        .fontSize(9)
        .fillColor(grayColor)
        .font('Helvetica-Bold')
        .text('SCAN FOR DELIVERY', 50, qrY);

      doc.image(qrBuffer, 50, qrY + 15, { width: 100, height: 100 });

      doc
        .fontSize(8)
        .fillColor(grayColor)
        .font('Helvetica')
        .text(
          'Scan this QR code to verify and confirm delivery.',
          160,
          qrY + 30,
          { width: 300 },
        )
        .text(
          `Order: ${data.orderId ?? 'N/A'}`,
          160,
          qrY + 50,
          { width: 300 },
        );
    }

    // ═══════════════════════════════════════════════════════════
    // NOTES
    // ═══════════════════════════════════════════════════════════
    if (data.notes) {
      const notesY = qrBuffer ? totalY + 180 : totalY + 60;
      doc
        .fontSize(9)
        .fillColor(grayColor)
        .font('Helvetica-Oblique')
        .text(data.notes, 50, notesY, { width: pageWidth });
    }

    // ═══════════════════════════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════════════════════════
    const footerY = doc.page.height - 60;
    doc
      .moveTo(50, footerY)
      .lineTo(50 + pageWidth, footerY)
      .strokeColor('#e5e7eb')
      .lineWidth(1)
      .stroke();

    doc
      .fontSize(8)
      .fillColor(grayColor)
      .font('Helvetica')
      .text('Thank you for your business!', 50, footerY + 10, {
        width: pageWidth,
        align: 'center',
      })
      .text(
        'Vubon.com.bd — Bangladesh\'s Enterprise Marketplace',
        50,
        footerY + 22,
        { width: pageWidth, align: 'center' },
      );
  }
}

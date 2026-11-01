/**
 * ReceiptGeneratorService — payment receipt text/HTML builder
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';

export const RECEIPT_GENERATOR_SERVICE = Symbol('RECEIPT_GENERATOR_SERVICE');

export interface ReceiptData {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly gateway?: string;
  readonly gatewayReference?: string;
  readonly paidAt: string;
}

@Injectable()
export class ReceiptGeneratorService {
  private readonly logger = new Logger(ReceiptGeneratorService.name);

  renderText(data: ReceiptData): string {
    this.logger.debug(`Rendering receipt for payment ${data.paymentId}`);
    return [
      '════════════════════════════════════',
      '         PAYMENT RECEIPT',
      '════════════════════════════════════',
      `Payment ID:  ${data.paymentId}`,
      `Order ID:    ${data.orderId}`,
      `User ID:     ${data.userId}`,
      `Method:      ${data.method}${data.gateway ? ` (${data.gateway})` : ''}`,
      `Amount:      ${data.amount.toFixed(2)} ${data.currency}`,
      `Gateway Ref: ${data.gatewayReference ?? 'N/A'}`,
      `Paid At:     ${data.paidAt}`,
      '════════════════════════════════════',
      '  Thank you for your payment!',
      '════════════════════════════════════',
    ].join('\n');
  }

  renderHtml(data: ReceiptData): string {
    return `<!DOCTYPE html>
<html><body style="font-family: monospace; padding: 16px;">
  <h2>Payment Receipt</h2>
  <p><strong>Payment ID:</strong> ${data.paymentId}</p>
  <p><strong>Order ID:</strong> ${data.orderId}</p>
  <p><strong>Amount:</strong> ${data.amount.toFixed(2)} ${data.currency}</p>
  <p><strong>Paid at:</strong> ${data.paidAt}</p>
</body></html>`;
  }
}

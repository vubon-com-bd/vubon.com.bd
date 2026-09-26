import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../../../domain/entities/payment.entity';

export interface ReceiptDocument {
  readonly paymentId: string;
  readonly html: string;
  readonly generatedAt: string;
}

@Injectable()
export class ReceiptGeneratorService {
  generate(entity: PaymentEntity): ReceiptDocument {
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>Receipt ${entity.id.value}</title></head>
        <body>
          <h1>Payment Receipt</h1>
          <p>Payment ID: ${entity.id.value}</p>
          <p>Order ID: ${entity.orderId.value}</p>
          <p>Amount: ${entity.amount.amount} ${entity.currency.value}</p>
          <p>Status: ${entity.status.value}</p>
          <p>Date: ${entity.createdAt}</p>
        </body>
      </html>
    `;
    return {
      paymentId: entity.id.value,
      html,
      generatedAt: new Date().toISOString(),
    };
  }
}

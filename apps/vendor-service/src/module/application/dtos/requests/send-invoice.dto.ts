/**
 * SendInvoiceRequestDto — send invoice to vendor
 * @module vendor-service/application/dtos/requests
 */
export class SendInvoiceRequestDto {
  invoiceId!: string;
  sentBy!: string;
  recipientEmail?: string;
  idempotencyKey?: string;
}

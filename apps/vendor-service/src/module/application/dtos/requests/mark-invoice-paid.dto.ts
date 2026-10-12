/**
 * MarkInvoicePaidRequestDto
 * @module vendor-service/application/dtos/requests
 */
export class MarkInvoicePaidRequestDto {
  invoiceId!: string;
  markedBy!: string;
  note?: string;
  idempotencyKey?: string;
}

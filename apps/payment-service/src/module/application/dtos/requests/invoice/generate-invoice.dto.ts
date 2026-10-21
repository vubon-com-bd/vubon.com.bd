/**
 * GenerateInvoiceRequestDTO
 * @module payment-service/application/dtos/requests/invoice
 */
export interface GenerateInvoiceRequestDTO {
  readonly orderId?: string;
  readonly userId: string;
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly currency: string;
  readonly dueAt?: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;
}

export interface GenerateInvoiceContextDTO {
  readonly request: GenerateInvoiceRequestDTO;
  readonly actorId?: string;
}

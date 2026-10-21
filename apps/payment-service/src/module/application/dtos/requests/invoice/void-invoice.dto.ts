/**
 * VoidInvoiceRequestDTO
 * @module payment-service/application/dtos/requests/invoice
 */
export interface VoidInvoiceRequestDTO {
  readonly invoiceId: string;
  readonly reason: string;
}

export interface VoidInvoiceContextDTO {
  readonly request: VoidInvoiceRequestDTO;
  readonly actorId?: string;
}

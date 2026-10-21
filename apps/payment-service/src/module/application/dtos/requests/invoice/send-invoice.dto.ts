/**
 * SendInvoiceRequestDTO
 * @module payment-service/application/dtos/requests/invoice
 */
export interface SendInvoiceRequestDTO {
  readonly invoiceId: string;
  readonly channel: 'email' | 'sms' | 'link';
  readonly recipientEmail?: string;
  readonly recipientPhone?: string;
  readonly message?: string;
}

export interface SendInvoiceContextDTO {
  readonly request: SendInvoiceRequestDTO;
  readonly actorId?: string;
}

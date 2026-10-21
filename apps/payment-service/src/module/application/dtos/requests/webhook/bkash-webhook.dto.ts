/**
 * BkashWebhookRequestDTO
 * @module payment-service/application/dtos/requests/webhook
 *
 * bKash sends trxID, amount, status, signature.
 */
export interface BkashWebhookRequestDTO {
  readonly paymentID: string;
  readonly trxID: string;
  readonly amount: string;
  readonly currency?: string;
  readonly intent?: string;
  readonly merchantInvoiceNumber?: string;
  readonly transactionStatus: string;
  readonly signature?: string;
  readonly rawPayload: Readonly<Record<string, unknown>>;
}

export interface BkashWebhookContextDTO {
  readonly request: BkashWebhookRequestDTO;
  readonly headers?: Readonly<Record<string, string>>;
}

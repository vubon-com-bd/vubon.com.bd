/**
 * NagadWebhookRequestDTO
 * @module payment-service/application/dtos/requests/webhook
 */
export interface NagadWebhookRequestDTO {
  readonly orderId: string;
  readonly paymentRefId: string;
  readonly amount: string;
  readonly status: string;
  readonly message?: string;
  readonly issuerPaymentRefNo?: string;
  readonly signature?: string;
  readonly rawPayload: Readonly<Record<string, unknown>>;
}

export interface NagadWebhookContextDTO {
  readonly request: NagadWebhookRequestDTO;
  readonly headers?: Readonly<Record<string, string>>;
}

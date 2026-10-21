/**
 * StripeWebhookRequestDTO
 * @module payment-service/application/dtos/requests/webhook
 */
export interface StripeWebhookRequestDTO {
  readonly id: string;
  readonly type: string;
  readonly data: {
    readonly object: Readonly<Record<string, unknown>>;
  };
  readonly signature: string;
  readonly rawPayload: Readonly<Record<string, unknown>>;
}

export interface StripeWebhookContextDTO {
  readonly request: StripeWebhookRequestDTO;
  readonly headers: Readonly<Record<string, string>>;
}

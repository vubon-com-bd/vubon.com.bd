/**
 * SslcommerzWebhookRequestDTO
 * @module payment-service/application/dtos/requests/webhook
 */
export interface SslcommerzWebhookRequestDTO {
  readonly tran_id: string;
  readonly val_id: string;
  readonly amount: string;
  readonly status: string;
  readonly card_type?: string;
  readonly verify_sign?: string;
  readonly verify_key?: string;
  readonly rawPayload: Readonly<Record<string, unknown>>;
}

export interface SslcommerzWebhookContextDTO {
  readonly request: SslcommerzWebhookRequestDTO;
  readonly headers?: Readonly<Record<string, string>>;
}

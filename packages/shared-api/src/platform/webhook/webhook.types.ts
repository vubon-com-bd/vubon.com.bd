export type WebhookEvent =
  | 'order.created'
  | 'order.paid'
  | 'order.shipped'
  | 'payment.succeeded'
  | 'payment.refunded'
  | 'user.created';

export interface Webhook {
  readonly id: string;
  readonly url: string;
  readonly events: readonly WebhookEvent[];
  readonly active: boolean;
  readonly secret?: string;
  readonly createdAt: string;
}

export interface CreateWebhookRequest {
  readonly url: string;
  readonly events: readonly WebhookEvent[];
}

export interface UpdateWebhookRequest {
  readonly url?: string;
  readonly events?: readonly WebhookEvent[];
  readonly active?: boolean;
}

export interface WebhookListResponse {
  readonly webhooks: readonly Webhook[];
  readonly total: number;
}

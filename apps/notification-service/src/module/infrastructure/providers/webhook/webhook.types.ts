/**
 * Webhook Provider Types
 * @module notification-service/infrastructure/providers/webhook
 */
export type WebhookProviderName = 'http' | 'slack' | 'discord' | 'telegram';

export interface WebhookProviderConfig {
  readonly name: WebhookProviderName;
  readonly enabled: boolean;
  readonly priority: number;
}

export interface SignedWebhookHeaders {
  readonly signature: string;
  readonly timestamp: string;
  readonly [key: string]: string;
}

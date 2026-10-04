/**
 * IWebhookService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  ProcessWebhookRequestDTO,
  ListWebhookEventsRequestDTO,
} from '../../dtos/requests/webhook/webhook.dto.js';
import type {
  WebhookEventResponseDTO,
  WebhookProcessResponseDTO,
  WebhookListResponseDTO,
} from '../../dtos/responses/webhook-response.dto.js';

export const WEBHOOK_SERVICE = Symbol('WEBHOOK_SERVICE');

export interface IWebhookService {
  process(dto: ProcessWebhookRequestDTO): Promise<WebhookProcessResponseDTO>;
  getById(webhookId: string): Promise<WebhookEventResponseDTO>;
  list(options: ListWebhookEventsRequestDTO): Promise<WebhookListResponseDTO>;
  retryFailed(): Promise<{ processed: number; failed: number }>;
}

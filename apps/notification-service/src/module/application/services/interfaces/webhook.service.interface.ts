/**
 * IWebhookService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateWebhookRequestDTO,
  UpdateWebhookRequestDTO,
  GetWebhookRequestDTO,
  ListWebhooksRequestDTO,
  ActivateWebhookRequestDTO,
  DeactivateWebhookRequestDTO,
  DisableWebhookRequestDTO,
  TestWebhookRequestDTO,
  ListWebhookDeliveriesRequestDTO,
  RetryWebhookDeliveryRequestDTO,
} from '../../dtos/requests/webhook/index.js';
import type {
  WebhookResponseDTO,
  WebhookListResponseDTO,
  WebhookDeliveryResponseDTO,
  WebhookDeliveryListResponseDTO,
  WebhookTestResponseDTO,
} from '../../dtos/responses/webhook-response.dto.js';

export const WEBHOOK_SERVICE = Symbol('WEBHOOK_SERVICE');

export interface IWebhookService {
  create(dto: CreateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO>;
  update(dto: UpdateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO>;
  activate(dto: ActivateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO>;
  deactivate(dto: DeactivateWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO>;
  disable(dto: DisableWebhookRequestDTO, actorId?: string): Promise<WebhookResponseDTO>;
  test(dto: TestWebhookRequestDTO, actorId?: string): Promise<WebhookTestResponseDTO>;
  getById(dto: GetWebhookRequestDTO): Promise<WebhookResponseDTO>;
  list(dto: ListWebhooksRequestDTO): Promise<WebhookListResponseDTO>;
  listDeliveries(dto: ListWebhookDeliveriesRequestDTO): Promise<WebhookDeliveryListResponseDTO>;
  retryDelivery(dto: RetryWebhookDeliveryRequestDTO, actorId?: string): Promise<WebhookDeliveryResponseDTO>;
  triggerWebhooks(
    event: string,
    payload: Readonly<Record<string, unknown>>,
  ): Promise<readonly string[]>;
}

/**
 * IWebhookService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  CreateWebhookRequestDTO,
  UpdateWebhookRequestDTO,
  TestWebhookRequestDTO,
} from '@application/dtos/requests/webhook/index.js';
import type {
  WebhookResponseDTO,
  WebhookSummaryResponseDTO,
  WebhookListResponseDTO,
  WebhookDeliveryResponseDTO,
} from '@application/dtos/responses/webhook-response.dto.js';

export const WEBHOOK_SERVICE = Symbol('WEBHOOK_SERVICE');

export interface WebhookListFilterDTO {
  readonly type?: string;
  readonly status?: string;
  readonly event?: string;
  readonly url?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

export interface WebhookListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastTriggeredAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WebhookListFilterDTO;
}

export interface IWebhookService {
  // Commands
  create(
    dto: CreateWebhookRequestDTO,
    actorId?: string,
  ): Promise<WebhookResponseDTO>;

  update(
    dto: UpdateWebhookRequestDTO,
    actorId?: string,
  ): Promise<WebhookResponseDTO>;

  test(
    dto: TestWebhookRequestDTO,
    actorId?: string,
  ): Promise<WebhookDeliveryResponseDTO>;

  // Queries
  getById(id: string): Promise<WebhookResponseDTO>;
  list(options: WebhookListOptionsDTO): Promise<WebhookListResponseDTO>;
}

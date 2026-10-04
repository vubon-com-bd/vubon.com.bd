/**
 * WebhookControllerMapper
 * @module payment-service/interfaces/mappers
 */
import type { ListWebhookEventsHttpQueryDTO } from '../dtos/requests/webhook.request.dto.js';
import type { ListWebhookEventsRequestDTO } from '../../application/dtos/requests/webhook/webhook.dto.js';
import type { WebhookEventResponseDTO } from '../../application/dtos/responses/webhook-response.dto.js';
import type { WebhookEventHttpResponseDTO } from '../dtos/responses/webhook.response.dto.js';

export class WebhookControllerMapper {
  static toListAppDto(q: ListWebhookEventsHttpQueryDTO): ListWebhookEventsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      gateway: q.gateway,
      eventType: q.eventType,
      processed: q.processed,
      verified: q.verified,
      paymentId: q.paymentId,
      fromDate: q.fromDate,
      toDate: q.toDate,
    };
  }

  static toHttpResponse(app: WebhookEventResponseDTO): WebhookEventHttpResponseDTO {
    return app as unknown as WebhookEventHttpResponseDTO;
  }
}

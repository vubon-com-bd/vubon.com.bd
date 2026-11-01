/**
 * WebhookControllerMapper — HTTP DTO ↔ App DTO
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateWebhookHttpDTO,
  UpdateWebhookHttpDTO,
  TestWebhookHttpDTO,
  ListWebhooksHttpQueryDTO,
} from '@interfaces/dtos/requests/webhook.request.dto.js';
import type {
  CreateWebhookRequestDTO,
  UpdateWebhookRequestDTO,
  TestWebhookRequestDTO,
} from '@application/dtos/requests/webhook/index.js';
import type { WebhookListOptionsDTO } from '@application/services/interfaces/webhook.service.interface.js';
import type {
  WebhookResponseDTO,
  WebhookSummaryResponseDTO,
  WebhookListResponseDTO,
  WebhookDeliveryResponseDTO,
} from '@application/dtos/responses/webhook-response.dto.js';
import {
  WebhookHttpResponseDTO,
  WebhookSummaryHttpResponseDTO,
  WebhookListHttpResponseDTO,
  WebhookDeliveryHttpResponseDTO,
} from '@interfaces/dtos/responses/webhook.response.dto.js';

export class WebhookControllerMapper {
  static toCreateRequestDTO(dto: CreateWebhookHttpDTO): CreateWebhookRequestDTO {
    return {
      name: dto.name,
      url: dto.url,
      events: [...dto.events] as never,
      headers: dto.headers,
      secret: dto.secret,
    };
  }

  static toUpdateRequestDTO(
    webhookId: string,
    dto: UpdateWebhookHttpDTO,
  ): UpdateWebhookRequestDTO {
    return {
      webhookId,
      name: dto.name,
      url: dto.url,
      events: dto.events ? [...dto.events] as never : undefined,
      headers: dto.headers,
      secret: dto.secret,
      status: dto.status as never,
    };
  }

  static toTestRequestDTO(
    webhookId: string,
    dto: TestWebhookHttpDTO,
  ): TestWebhookRequestDTO {
    return {
      webhookId,
      event: dto.event as never,
      payload: dto.payload,
    };
  }

  static toListOptions(q: ListWebhooksHttpQueryDTO): WebhookListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: { status: q.status, event: q.event },
    };
  }

  static toHttpResponse(app: WebhookResponseDTO): WebhookHttpResponseDTO {
    return app as unknown as WebhookHttpResponseDTO;
  }

  static toSummaryHttp(app: WebhookSummaryResponseDTO): WebhookSummaryHttpResponseDTO {
    return app as unknown as WebhookSummaryHttpResponseDTO;
  }

  static toListHttp(app: WebhookListResponseDTO): WebhookListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toDeliveryHttp(app: WebhookDeliveryResponseDTO): WebhookDeliveryHttpResponseDTO {
    return app as unknown as WebhookDeliveryHttpResponseDTO;
  }
}

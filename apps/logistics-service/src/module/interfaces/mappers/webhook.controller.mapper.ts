/**
 * WebhookControllerMapper — HTTP DTO ↔ Application DTO
 * @module logistics-service/interfaces/mappers
 *
 * ⚠️ All providers share the same normalized shape:
 *    - HTTP: WebhookRequestHttpDTO
 *    - App:  <Provider>WebhookRequestDTO (interface same shape)
 */
import type { WebhookRequestHttpDTO } from '../dtos/requests/webhook/webhook.request.dto.js';

export class WebhookControllerMapper {
  /**
   * Normalize HTTP request → application DTO shape.
   * Type is structurally compatible across all providers.
   */
  static toAppDto(http: WebhookRequestHttpDTO): {
    signature?: string;
    timestamp?: string;
    body: {
      trackingNumber: string;
      status: string;
      occurredAt: string;
      location?: string;
      message?: string;
      raw?: Readonly<Record<string, unknown>>;
    };
  } {
    return {
      signature: http.signature,
      timestamp: http.timestamp,
      body: {
        trackingNumber: http.body.trackingNumber,
        status: http.body.status,
        occurredAt: http.body.occurredAt,
        location: http.body.location,
        message: http.body.message,
        raw: http.body.raw,
      },
    };
  }
}

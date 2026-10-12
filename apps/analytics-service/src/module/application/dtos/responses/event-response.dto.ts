/**
 * Event Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface EventResponseData {
  readonly id: string;
  readonly name: string;
  readonly source: string;
  readonly sessionId?: string;
  readonly userId?: string;
  readonly payloadKeys: number;
  readonly occurredAt: string;
  readonly status: string;
  readonly processedAt?: string | null;
}

export class EventResponseDTO extends BaseResponseDTO<EventResponseData> {
  static of(data: EventResponseData, message?: string): EventResponseDTO {
    return BaseResponseDTO.ok(data, message) as EventResponseDTO;
  }
}

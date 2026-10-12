/**
 * Event Controller Mapper
 * @module analytics-service/interfaces/mappers
 *
 * Application DTO → HTTP Response DTO transformation।
 */
import type { EventResponseData } from '../../application/dtos/responses/event-response.dto.js';
import { EventResponseDto } from '../dtos/responses/event.response.dto.js';

export class EventControllerMapper {
  static toHttp(data: EventResponseData): EventResponseDto {
    const dto = new EventResponseDto();
    dto.id = data.id;
    dto.name = data.name;
    dto.source = data.source;
    dto.sessionId = data.sessionId;
    dto.userId = data.userId;
    dto.payloadKeys = data.payloadKeys;
    dto.occurredAt = data.occurredAt;
    dto.status = data.status;
    dto.processedAt = data.processedAt ?? null;
    return dto;
  }

  static toHttpList(data: readonly EventResponseData[]): EventResponseDto[] {
    return data.map((d) => EventControllerMapper.toHttp(d));
  }
}

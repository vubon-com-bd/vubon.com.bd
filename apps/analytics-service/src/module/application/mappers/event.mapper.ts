/**
 * Event Mapper
 * @module analytics-service/application/mappers
 *
 * Domain Entity → Response DTO transformation।
 */
import type { EventEntity } from '../../domain/entities/event.entity.js';
import type { EventResponseData } from '../dtos/responses/event-response.dto.js';

export class EventMapper {
  static toResponse(entity: EventEntity): EventResponseData {
    return {
      id: entity.id,
      name: entity.event.name.value,
      source: entity.event.source.value,
      sessionId: entity.event.sessionId?.value,
      userId: entity.event.userId?.value,
      payloadKeys: entity.event.payload.keyCount(),
      occurredAt: entity.event.timestamp.toISOString(),
      status: entity.status,
      processedAt: entity.processedAt ?? undefined,
    };
  }

  static toResponseList(entities: readonly EventEntity[]): readonly EventResponseData[] {
    return entities.map((e) => EventMapper.toResponse(e));
  }
}

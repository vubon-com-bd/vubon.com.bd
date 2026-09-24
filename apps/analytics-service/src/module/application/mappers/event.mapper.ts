import { Injectable } from '@nestjs/common';
import { EventEntity } from '../../domain/entities/event.entity';
import type { EventResponseDTO } from '../dtos/responses';
import { toEventResponse } from '../dtos/responses';

@Injectable()
export class EventMapper {
  toResponse(entity: EventEntity): EventResponseDTO {
    return toEventResponse(entity);
  }

  toResponseList(entities: readonly EventEntity[]): readonly EventResponseDTO[] {
    return entities.map((e) => toEventResponse(e));
  }
}

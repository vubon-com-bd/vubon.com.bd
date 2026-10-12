/**
 * Event Payload Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { EventPayloadEntity } from '../../../domain/entities/event-payload.entity.js';
import type { EventPayloadRepository } from '../../../domain/repositories/event-payload.repository.interface.js';
import type { IEventPayloadService } from '../interfaces/event-payload.service.interface.js';
import { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo.js';

export class EventPayloadService extends BaseService<EventPayloadEntity, string> implements IEventPayloadService {
  readonly name = 'EventPayloadService';

  constructor(private readonly repository: EventPayloadRepository) {
    super();
  }

  async findByEventId(eventId: string): Promise<EventPayloadEntity | null> {
    return this.repository.findByEventId(EventIdVO.fromGeneric(eventId));
  }

  async deleteByEventId(eventId: string): Promise<void> {
    return this.repository.deleteByEventId(EventIdVO.fromGeneric(eventId));
  }
}

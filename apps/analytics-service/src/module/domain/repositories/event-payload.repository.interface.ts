import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EventPayloadEntity } from '../entities/event-payload.entity';
import { EventIdVO } from '../value-objects/primitives/event-id.vo';

export interface EventPayloadRepository
  extends BaseRepository<EventPayloadEntity, EventIdVO> {
  findByEventId(eventId: EventIdVO): Promise<EventPayloadEntity | null>;
}

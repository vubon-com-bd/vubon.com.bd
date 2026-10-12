/**
 * Event Payload Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { EventPayloadEntity } from '../entities/event-payload.entity.js';
import type { EventIdVO } from '../value-objects/primitives/event-id.vo.js';

export interface EventPayloadRepository extends BaseRepository<EventPayloadEntity, string> {
  findByEventId(eventId: EventIdVO): Promise<EventPayloadEntity | null>;
  findByEventIds(eventIds: readonly EventIdVO[]): Promise<readonly EventPayloadEntity[]>;
  deleteByEventId(eventId: EventIdVO): Promise<void>;
  deleteByEventIds(eventIds: readonly EventIdVO[]): Promise<number>;
}

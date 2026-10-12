/**
 * Event Payload Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { EventPayloadEntity } from '../../../domain/entities/event-payload.entity.js';

export interface IEventPayloadService extends BaseServiceInterface<EventPayloadEntity, string> {
  findByEventId(eventId: string): Promise<EventPayloadEntity | null>;
  deleteByEventId(eventId: string): Promise<void>;
}

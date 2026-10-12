/**
 * Event Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { EventEntity } from '../../../domain/entities/event.entity.js';
import type { TrackEventDto } from '../../dtos/requests/event/track-event.dto.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';

export interface IEventService extends BaseServiceInterface<EventEntity, string> {
  track(input: TrackEventDto, userId?: string): Promise<EventResponseData>;
  trackBatch(inputs: readonly TrackEventDto[], userId?: string): Promise<readonly EventResponseData[]>;
  findById(id: string): Promise<EventResponseData | null>;
  list(filter: { sessionId?: string; userId?: string; limit: number }): Promise<readonly EventResponseData[]>;
  process(id: string): Promise<EventResponseData>;
}

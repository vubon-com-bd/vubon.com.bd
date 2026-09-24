import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EventEntity } from '../../../domain/entities/event.entity';
import type { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo';
import type { TrackEventDTO, BatchTrackEventDTO } from '../../dtos/requests/event';
import type { EventResponseDTO } from '../../dtos/responses';

export interface EventServiceInterface
  extends BaseServiceInterface<EventEntity, EventIdVO> {
  trackEvent(input: TrackEventDTO): Promise<EventResponseDTO>;
  trackBatch(input: BatchTrackEventDTO): Promise<readonly EventResponseDTO[]>;
  markProcessed(eventId: string): Promise<void>;
}

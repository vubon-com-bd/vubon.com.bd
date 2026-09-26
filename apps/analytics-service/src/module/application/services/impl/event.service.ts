import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { EventEntity } from '../../../domain/entities/event.entity';
import { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo';
import { EventNameVO } from '../../../domain/value-objects/primitives/event-name.vo';
import { EventSourceVO } from '../../../domain/value-objects/primitives/event-source.vo';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo';
import { EventPayloadVO } from '../../../domain/value-objects/primitives/event-payload.vo';
import { EventIngestionService } from '../../../domain/services/event-ingestion.service';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface';
import type { EventServiceInterface } from '../interfaces/event.service.interface';
import type { TrackEventDTO, BatchTrackEventDTO } from '../../dtos/requests/event';
import {
  type EventResponseDTO,
  toEventResponse,
} from '../../dtos/responses';
import { dedupeBatchEvents } from '../../dtos/requests/event';

@Injectable()
export class EventService
  extends BaseService<EventEntity, EventIdVO>
  implements EventServiceInterface
{
  readonly name = 'EventService';

  constructor(
    private readonly eventRepo: EventRepository,
    private readonly ingestion: EventIngestionService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async trackEvent(input: TrackEventDTO): Promise<EventResponseDTO> {
    const entity = this.ingestion.ingest({
      name: input.name,
      source: input.source,
      timestamp: input.occurredAt ? new Date(input.occurredAt) : new Date(),
      payload: input.payload,
    });
    await this.eventRepo.save(entity);
    const events = entity.pullDomainEvents();
    for (const evt of events) this.eventBus.publish(evt as never);
    return toEventResponse(entity);
  }

  async trackBatch(input: BatchTrackEventDTO): Promise<readonly EventResponseDTO[]> {
    const deduped = dedupeBatchEvents(input);
    const results: EventResponseDTO[] = [];
    for (const dto of deduped.events) {
      results.push(await this.trackEvent(dto));
    }
    return results;
  }

  async markProcessed(eventId: string): Promise<void> {
    const entity = await this.eventRepo.findById(EventIdVO.create(eventId));
    if (!entity) return;
    const processed = entity.markProcessed();
    await this.eventRepo.save(processed);
    const events = processed.pullDomainEvents();
    for (const evt of events) this.eventBus.publish(evt as never);
  }
}

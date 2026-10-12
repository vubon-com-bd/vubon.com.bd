/**
 * Event Service Implementation
 * @module analytics-service/application/services/impl
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError, ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import type { EventEntity } from '../../../domain/entities/event.entity.js';
import { EventEntity as EventEntityClass } from '../../../domain/entities/event.entity.js';
import type { EventRepository } from '../../../domain/repositories/event.repository.interface.js';
import { EventVO } from '../../../domain/value-objects/composites/event.vo.js';
import { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo.js';
import { EventNameVO } from '../../../domain/value-objects/primitives/event-name.vo.js';
import { EventSourceVO } from '../../../domain/value-objects/primitives/event-source.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { EventPayloadVO } from '../../../domain/value-objects/primitives/event-payload.vo.js';
import { SessionIdVO } from '../../../domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import type { IEventService } from '../interfaces/event.service.interface.js';
import type { EventResponseData } from '../../dtos/responses/event-response.dto.js';
import type { TrackEventDto } from '../../dtos/requests/event/track-event.dto.js';

export class EventService extends BaseService<EventEntity, string> implements IEventService {
  readonly name = 'EventService';

  constructor(private readonly repository: EventRepository) {
    super();
  }

  async track(input: TrackEventDto, userId?: string): Promise<EventResponseData> {
    const now = new Date().toISOString();

    const eventVO = EventVO.create({
      id: EventIdVO.fromGeneric(`evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`),
      name: EventNameVO.create(input.name),
      source: EventSourceVO.create(input.source ?? 'direct'),
      timestamp: input.occurredAt
        ? EventTimestampVO.fromIso(input.occurredAt)
        : EventTimestampVO.now(),
      payload: input.properties
        ? EventPayloadVO.create(input.properties)
        : EventPayloadVO.empty(),
      sessionId: input.sessionId ? SessionIdVO.create(input.sessionId) : undefined,
      userId: userId ? UserIdVO.create(userId) : (input.userId ? UserIdVO.create(input.userId) : undefined),
    });

    const entity = EventEntityClass.receive({ event: eventVO, now });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async trackBatch(inputs: readonly TrackEventDto[], userId?: string): Promise<readonly EventResponseData[]> {
    if (inputs.length === 0) {
      throw new ApplicationValidationError('At least one event required', 'events');
    }
    if (inputs.length > 1000) {
      throw new ApplicationValidationError('Max 1000 events per batch', 'events');
    }

    const results: EventResponseData[] = [];
    for (const input of inputs) {
      results.push(await this.track(input, userId));
    }
    return results;
  }

  async findById(id: string): Promise<EventResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async list(filter: { sessionId?: string; userId?: string; limit: number }): Promise<readonly EventResponseData[]> {
    const filters: Parameters<EventRepository['findByFilters']>[0] = {
      sessionId: filter.sessionId ? SessionIdVO.create(filter.sessionId) : undefined,
      userId: filter.userId ? UserIdVO.create(filter.userId) : undefined,
    };
    const entities = await this.repository.findByFilters(filters);
    return entities.slice(0, filter.limit).map((e) => this.toResponse(e));
  }

  async process(id: string): Promise<EventResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Event', id);

    if (!entity.isReceived()) {
      throw new ApplicationValidationError(`Event already ${entity.status}`, 'status');
    }

    entity.markProcessed(new Date().toISOString());
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  private toResponse(entity: EventEntity): EventResponseData {
    return {
      id: entity.id,
      name: entity.event.name.value,
      source: entity.event.source.value,
      sessionId: entity.event.sessionId?.value,
      userId: entity.event.userId?.value,
      payloadKeys: entity.event.payload.keyCount(),
      occurredAt: entity.event.timestamp.toISOString(),
      status: entity.status,
      processedAt: entity.processedAt,
    };
  }
}

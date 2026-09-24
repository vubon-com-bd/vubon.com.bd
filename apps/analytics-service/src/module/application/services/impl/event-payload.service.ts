import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { EventPayloadEntity } from '../../../domain/entities/event-payload.entity';
import { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo';
import type { EventPayloadRepository } from '../../../domain/repositories/event-payload.repository.interface';
import type { EventPayloadServiceInterface } from '../interfaces/event-payload.service.interface';

@Injectable()
export class EventPayloadService
  extends BaseService<EventPayloadEntity, EventIdVO>
  implements EventPayloadServiceInterface
{
  readonly name = 'EventPayloadService';

  constructor(private readonly repo: EventPayloadRepository) {
    super();
  }

  async findByEventId(eventId: string): Promise<EventPayloadEntity | null> {
    return this.repo.findByEventId(EventIdVO.create(eventId));
  }
}

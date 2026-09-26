import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EventPayloadEntity } from '../../../domain/entities/event-payload.entity';
import type { EventIdVO } from '../../../domain/value-objects/primitives/event-id.vo';

export interface EventPayloadServiceInterface
  extends BaseServiceInterface<EventPayloadEntity, EventIdVO> {
  findByEventId(eventId: string): Promise<EventPayloadEntity | null>;
}

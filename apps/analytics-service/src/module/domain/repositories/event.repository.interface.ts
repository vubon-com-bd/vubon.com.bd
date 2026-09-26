import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EventEntity } from '../entities/event.entity';
import { EventIdVO } from '../value-objects/primitives/event-id.vo';
import { EventSourceVO } from '../value-objects/primitives/event-source.vo';
import { EventNameVO } from '../value-objects/primitives/event-name.vo';

export interface EventRepository extends BaseRepository<EventEntity, EventIdVO> {
  findByName(name: EventNameVO): Promise<readonly EventEntity[]>;
  findBySource(source: EventSourceVO): Promise<readonly EventEntity[]>;
  findUnprocessed(limit: number): Promise<readonly EventEntity[]>;
  countInWindow(source: EventSourceVO, startMs: number, endMs: number): Promise<number>;
}

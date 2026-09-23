import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TrackingEventEntity } from '../entities/tracking-event.entity';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';

export interface TrackingEventRepository
  extends BaseRepository<TrackingEventEntity, string> {
  findByTracking(trackingId: TrackingIdVO): Promise<readonly TrackingEventEntity[]>;
  findRecent(trackingId: TrackingIdVO, limit: number): Promise<readonly TrackingEventEntity[]>;
}

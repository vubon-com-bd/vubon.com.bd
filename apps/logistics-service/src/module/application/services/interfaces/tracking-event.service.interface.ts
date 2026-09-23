import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { TrackingEventEntity } from '../../../domain/entities/tracking-event.entity';

export interface TrackingEventServiceInterface
  extends BaseServiceInterface<TrackingEventEntity, string> {
  listByTracking(trackingId: string): Promise<readonly TrackingEventEntity[]>;
  listRecent(trackingId: string, limit: number): Promise<readonly TrackingEventEntity[]>;
}

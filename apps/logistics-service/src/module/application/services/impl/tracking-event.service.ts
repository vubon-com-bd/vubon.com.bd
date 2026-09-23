import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TrackingEventServiceInterface } from '../interfaces/tracking-event.service.interface';
import type { TrackingEventRepository } from '../../../domain/repositories/tracking-event.repository.interface';
import type { TrackingEventEntity } from '../../../domain/entities/tracking-event.entity';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo';

@Injectable()
export class TrackingEventService
  extends BaseService<TrackingEventEntity, string>
  implements TrackingEventServiceInterface
{
  readonly name = 'TrackingEventService';

  constructor(private readonly repo: TrackingEventRepository) {
    super();
  }

  async listByTracking(trackingId: string): Promise<readonly TrackingEventEntity[]> {
    return this.repo.findByTracking(TrackingIdVO.create(trackingId));
  }

  async listRecent(trackingId: string, limit: number): Promise<readonly TrackingEventEntity[]> {
    return this.repo.findRecent(TrackingIdVO.create(trackingId), limit);
  }
}

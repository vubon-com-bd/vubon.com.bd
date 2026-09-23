import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTrackingEventsQuery } from './list-tracking-events.query';
import type { TrackingEventRepository } from '../../../domain/repositories/tracking-event.repository.interface';
import type { TrackingEventEntity } from '../../../domain/entities/tracking-event.entity';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo';

@QueryHandler(ListTrackingEventsQuery)
export class ListTrackingEventsHandler
  extends BaseQueryHandler<ListTrackingEventsQuery, readonly TrackingEventEntity[]>
  implements IQueryHandler<ListTrackingEventsQuery>
{
  readonly queryType = 'logistics.tracking.list-events';

  constructor(private readonly repo: TrackingEventRepository) {
    super();
  }

  async execute(query: ListTrackingEventsQuery): Promise<readonly TrackingEventEntity[]> {
    return this.repo.findRecent(TrackingIdVO.create(query.trackingId), query.limit);
  }
}

import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { TrackingListOptionsDTO } from '@application/services/interfaces/tracking.service.interface';
export class ListTrackingsQuery extends BaseQuery {
  readonly type = 'logistics.tracking.list';
  constructor(public readonly options: TrackingListOptionsDTO) { super(); }
}

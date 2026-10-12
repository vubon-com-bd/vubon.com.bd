import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { TrackingListOptionsDTO } from '../../services/interfaces/tracking.service.interface.js';
export class ListTrackingQuery extends BaseQuery {
  readonly type = 'logistics.tracking.list';
  constructor(public readonly options: TrackingListOptionsDTO) { super(); }
}

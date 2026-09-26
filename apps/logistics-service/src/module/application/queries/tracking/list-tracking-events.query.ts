import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTrackingEventsQuery extends BaseQuery {
  readonly type = 'logistics.tracking.list-events';

  constructor(
    public readonly trackingId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}

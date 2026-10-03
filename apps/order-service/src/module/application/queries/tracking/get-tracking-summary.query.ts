import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTrackingSummaryQuery extends BaseQuery {
  readonly type = 'tracking.summary';
  constructor(public readonly orderId: string) { super(); }
}

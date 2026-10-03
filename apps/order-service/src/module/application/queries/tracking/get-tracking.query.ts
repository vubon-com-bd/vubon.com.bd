import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTrackingQuery extends BaseQuery {
  readonly type = 'tracking.get';
  constructor(public readonly trackingId: string) { super(); }
}

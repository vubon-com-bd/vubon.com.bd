import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetTrackingByNumberQuery extends BaseQuery {
  readonly type = 'logistics.tracking.get_by_number';
  constructor(public readonly trackingNumber: string) { super(); }
}

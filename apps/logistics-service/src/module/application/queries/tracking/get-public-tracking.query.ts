import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetPublicTrackingQuery extends BaseQuery {
  readonly type = 'logistics.tracking.get_public';
  constructor(public readonly trackingNumber: string) { super(); }
}

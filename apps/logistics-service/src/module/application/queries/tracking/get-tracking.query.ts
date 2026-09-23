import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTrackingQuery extends BaseQuery {
  readonly type = 'logistics.tracking.get';

  constructor(public readonly trackingNumber: string) {
    super();
  }
}

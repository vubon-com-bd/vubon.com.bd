import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListZonesQuery extends BaseQuery {
  readonly type = 'logistics.zone.list';

  constructor(public readonly zoneType?: string) {
    super();
  }
}

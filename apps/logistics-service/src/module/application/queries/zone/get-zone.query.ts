import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetZoneQuery extends BaseQuery {
  readonly type = 'logistics.zone.get';

  constructor(public readonly zoneId: string) {
    super();
  }
}

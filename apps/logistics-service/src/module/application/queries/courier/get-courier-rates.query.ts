import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCourierRatesQuery extends BaseQuery {
  readonly type = 'logistics.courier.get-rates';

  constructor(public readonly courierId: string) {
    super();
  }
}

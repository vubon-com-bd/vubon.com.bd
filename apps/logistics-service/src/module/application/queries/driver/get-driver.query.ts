import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDriverQuery extends BaseQuery {
  readonly type = 'logistics.driver.get';

  constructor(public readonly driverId: string) {
    super();
  }
}

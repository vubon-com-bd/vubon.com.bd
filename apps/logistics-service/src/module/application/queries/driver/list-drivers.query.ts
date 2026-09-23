import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDriversQuery extends BaseQuery {
  readonly type = 'logistics.driver.list';

  constructor(public readonly availableOnly: boolean = false) {
    super();
  }
}

import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListAvailableDriversQuery extends BaseQuery {
  readonly type = 'logistics.driver.list_available';
  constructor() { super(); }
}

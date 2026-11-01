import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DriverListOptionsDTO } from '@application/services/interfaces/driver.service.interface';
export class ListDriversQuery extends BaseQuery {
  readonly type = 'logistics.driver.list';
  constructor(public readonly options: DriverListOptionsDTO) { super(); }
}

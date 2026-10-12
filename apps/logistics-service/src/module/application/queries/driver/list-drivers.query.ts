import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DriverListOptionsDTO } from '../../services/interfaces/driver.service.interface.js';
export class ListDriversQuery extends BaseQuery {
  readonly type = 'logistics.driver.list';
  constructor(public readonly options: DriverListOptionsDTO) { super(); }
}

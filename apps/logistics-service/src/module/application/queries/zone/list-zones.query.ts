import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ZoneListOptionsDTO } from '../../services/interfaces/zone.service.interface.js';
export class ListZonesQuery extends BaseQuery {
  readonly type = 'logistics.zone.list';
  constructor(public readonly options: ZoneListOptionsDTO) { super(); }
}

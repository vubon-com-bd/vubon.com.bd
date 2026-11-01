import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListActiveZonesQuery extends BaseQuery {
  readonly type = 'logistics.zone.list_active';
  constructor() { super(); }
}

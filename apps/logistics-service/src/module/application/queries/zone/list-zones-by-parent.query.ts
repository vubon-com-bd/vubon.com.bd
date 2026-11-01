import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListZonesByParentQuery extends BaseQuery {
  readonly type = 'logistics.zone.list_by_parent';
  constructor(public readonly parentId: string) { super(); }
}

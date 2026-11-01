import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListCouriersByZoneQuery extends BaseQuery {
  readonly type = 'logistics.courier.list_by_zone';
  constructor(public readonly zone: string) { super(); }
}

import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetZoneByCodeQuery extends BaseQuery {
  readonly type = 'logistics.zone.by_code';
  constructor(public readonly code: string) { super(); }
}

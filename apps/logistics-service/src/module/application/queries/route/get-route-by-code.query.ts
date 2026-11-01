import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetRouteByCodeQuery extends BaseQuery {
  readonly type = 'logistics.route.by_code';
  constructor(public readonly code: string) { super(); }
}

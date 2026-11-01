import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetCourierByCodeQuery extends BaseQuery {
  readonly type = 'logistics.courier.by_code';
  constructor(public readonly code: string) { super(); }
}

import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListReturnReasonsByTypeQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.list_by_type';
  constructor(public readonly reasonType: string) { super(); }
}

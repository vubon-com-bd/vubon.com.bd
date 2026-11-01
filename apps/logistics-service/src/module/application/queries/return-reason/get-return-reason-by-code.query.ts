import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnReasonByCodeQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.by_code';
  constructor(public readonly code: string) { super(); }
}

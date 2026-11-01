import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnReasonQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.get';
  constructor(public readonly reasonId: string) { super(); }
}

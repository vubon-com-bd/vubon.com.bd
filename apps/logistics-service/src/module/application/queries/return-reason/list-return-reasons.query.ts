import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ReturnReasonListOptionsDTO } from '@application/services/interfaces/return-reason.service.interface';
export class ListReturnReasonsQuery extends BaseQuery {
  readonly type = 'logistics.return_reason.list';
  constructor(public readonly options: ReturnReasonListOptionsDTO) { super(); }
}

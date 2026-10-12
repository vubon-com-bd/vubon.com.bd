import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnByRmaQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.get_by_rma';
  constructor(public readonly rmaNumber: string) { super(); }
}

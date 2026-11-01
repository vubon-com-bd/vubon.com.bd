import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { InsuranceListOptionsDTO } from '@application/services/interfaces/insurance.service.interface';
export class ListInsurancesQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list';
  constructor(public readonly options: InsuranceListOptionsDTO) { super(); }
}

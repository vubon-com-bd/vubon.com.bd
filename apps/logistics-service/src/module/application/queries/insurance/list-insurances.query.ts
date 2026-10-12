import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { InsuranceListOptionsDTO } from '../../services/interfaces/insurance.service.interface.js';
export class ListInsurancesQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list';
  constructor(public readonly options: InsuranceListOptionsDTO) { super(); }
}

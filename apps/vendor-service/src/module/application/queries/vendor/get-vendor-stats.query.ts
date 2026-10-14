import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VendorListFilterDTO } from '../../services/interfaces/vendor.service.interface.js';

export class GetVendorStatsQuery extends BaseQuery {
  readonly type = 'vendor.vendor.stats';
  constructor(public readonly filter?: VendorListFilterDTO) {
    super();
  }
}

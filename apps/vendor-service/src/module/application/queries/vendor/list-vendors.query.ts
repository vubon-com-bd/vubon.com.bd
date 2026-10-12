import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VendorListOptionsDto } from '../../services/interfaces/vendor.service.interface.js';

export class ListVendorsQuery extends BaseQuery {
  readonly type = 'vendor.list';
  constructor(public readonly options: VendorListOptionsDto) { super(); }
}

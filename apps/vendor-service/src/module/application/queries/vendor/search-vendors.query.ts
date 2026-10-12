import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { VendorSearchInput } from '../../services/interfaces/vendor-search.service.interface.js';

export class SearchVendorsQuery extends BaseQuery {
  readonly type = 'vendor.search';
  constructor(public readonly input: VendorSearchInput) { super(); }
}

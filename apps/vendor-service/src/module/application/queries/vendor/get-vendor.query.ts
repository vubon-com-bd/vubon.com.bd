/**
 * GetVendorQuery
 * @module vendor-service/application/queries/vendor
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorQuery extends BaseQuery {
  readonly type = 'vendor.get';
  constructor(public readonly vendorId: string) { super(); }
}

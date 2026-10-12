import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorSettingsQuery extends BaseQuery {
  readonly type = 'vendor.settings.get';
  constructor(public readonly vendorId: string) { super(); }
}

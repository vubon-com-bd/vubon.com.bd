import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class CheckVendorSlugQuery extends BaseQuery {
  readonly type = 'vendor.check_slug';
  constructor(public readonly slug: string) { super(); }
}

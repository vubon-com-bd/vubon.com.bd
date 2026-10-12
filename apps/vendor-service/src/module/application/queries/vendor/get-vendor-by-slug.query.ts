import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorBySlugQuery extends BaseQuery {
  readonly type = 'vendor.get_by_slug';
  constructor(public readonly slug: string) { super(); }
}

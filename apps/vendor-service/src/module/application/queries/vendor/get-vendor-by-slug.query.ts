import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVendorBySlugQuery extends BaseQuery {
  readonly type = 'vendor.get-by-slug';

  constructor(public readonly slug: string) {
    super();
  }
}

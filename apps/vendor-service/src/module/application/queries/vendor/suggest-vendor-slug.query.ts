import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class SuggestVendorSlugQuery extends BaseQuery {
  readonly type = 'vendor.slug.suggest';
  constructor(public readonly name: string) { super(); }
}

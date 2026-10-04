import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetBrandQuery extends BaseQuery {
  readonly type = 'brand.get';
  constructor(public readonly brandId: string) { super(); }
}
